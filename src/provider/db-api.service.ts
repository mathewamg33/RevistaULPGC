import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Platform } from 'ionic-angular';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Injectable()
export class DbApiService {
  news: FirebaseListObservable<any[]>;
  auth: any;
  allNews: any;

  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth, private platform: Platform, public http: Http) {
  }


  getFireNews(): FirebaseListObservable<any[]> {
    this.news = this.af.list('/news');
    return this.news;
  }

  cover(news) {
    if (news.coverPage === true) {
      this.getFireNews().take(1).subscribe(resp => {
        this.allNews = resp;
        for (let n of this.allNews) {
          firebase.database().ref('news/' + n.$key).update({
            coverPage: false
          });
        }
      });
    }
  }

  loginWithEmail(email, password) {
    return Observable.create(observer => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then((authData) => {
        observer.next(authData);
      }).catch(function (error) {
        var errorCode = error.message;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
      });
    });
  }

  fireLogout() {
    this.afAuth.auth.signOut();
  }

  fireCreateNews(news, image) {
    this.cover(news);
    if (image == null) {
      firebase.database().ref('news/').push({
        title: news.title,
        section: news.section,
        author: news.author,
        content: news.content,
        time: news.time,
        coverPage: news.coverPage,
        published: news.published,
        image: ""
      }).then(() => {

        if (news.published == true) {
          let tokensList = [];
          this.af.list('/tokens')
            .subscribe(tokens => {
              _.forEach(tokens, (value, key) => {
                tokensList.push(value.$value);
              });
            });
          _.forEach(tokensList, token => {
            let url = 'https://fcm.googleapis.com/fcm/send';
            let body =
              {
                "notification": {
                  "title": "RevistaULPGC",
                  "body": news.title


                },
                "to": token
              };

            let headers: Headers = new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'key=' + 'AIzaSyA1OTMjOG4Jg8E-0sZ2loxBsDy2TFbyApA'
            });
            let options = new RequestOptions({ headers: headers });

            console.log(JSON.stringify(headers));

            this.http.post(url, body, options).map(response => {
              return response;
            }).subscribe(data => {
              console.log(data);
            });
          });
        }
      });
    } else {
      let http = this.http;
      let storageRef = firebase.storage().ref();
      let imageName = image.name;
      let uploadTask = storageRef.child('news/' + imageName).put(image);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function (error) {
          switch (error.message) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, function () {
          // Upload completed successfully, now we can get the download URL
          let imageUrl = uploadTask.snapshot.downloadURL;
          //console.log("downloadURL: " + downloadURL);
          firebase.database().ref('news/').push({
            title: news.title,
            section: news.section,
            author: news.author,
            content: news.content,
            time: news.time,
            coverPage: news.coverPage,
            published: news.published,
            image: imageUrl
          }).then(() => {

            if (news.published == true) {
              let tokensList = [];
              this.af.list('/tokens')
                .subscribe(tokens => {
                  _.forEach(tokens, (value, key) => {
                    tokensList.push(value.$value);
                  });
                });
              _.forEach(tokensList, token => {
                let url = 'https://fcm.googleapis.com/fcm/send';

                let body =
                  {
                    "notification": {
                      "title": "RevistaULPGC",
                      "body": news.title
                    },
                    "to": token
                  };

                let headers: Headers = new Headers({
                  'Content-Type': 'application/json',
                  'Authorization': 'key=' + 'AIzaSyA1OTMjOG4Jg8E-0sZ2loxBsDy2TFbyApA'
                });
                let options = new RequestOptions({ headers: headers });

                http.post(url, body, options).map(response => {
                  return response;
                }).subscribe(data => {
                  console.log(data);
                });
              });
            }
          });
        });
    }
  }


  fireEditNews(news, image) {
    this.cover(news);
    if (image == null) {
      firebase.database().ref('news/' + news.$key).update({
        title: news.title,
        section: news.section,
        author: news.author,
        content: news.content,
        time: news.time,
        coverPage: news.coverPage,
        published: news.published
      }).then(()=> {
          if (news.published == true) {
            let tokensList = [];
            this.af.list('/tokens')
              .subscribe(tokens => {
                _.forEach(tokens, (value, key) => {
                  tokensList.push(value.$value);
                });
              });
            _.forEach(tokensList, token => {
              let url = 'https://fcm.googleapis.com/fcm/send';

              let body =
                {
                  "notification": {
                    "title": "RevistaULPGC",
                    "body": news.title
                    
                  },
                  "to": token
                };

              let headers: Headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'key=' + 'AIzaSyA1OTMjOG4Jg8E-0sZ2loxBsDy2TFbyApA'
              });
              let options = new RequestOptions({ headers: headers });

              this.http.post(url, body, options).map(response => {
                return response;
              }).subscribe(data => {
                console.log(data);
              });
            });
          }
        });
    } else {
      let http = this.http;
      let storageRef = firebase.storage().ref();
      let imageName = image.name;
      let uploadTask = storageRef.child('news/' + news.$key + imageName).put(image);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function (error) {
          switch (error.message) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, function () {
          // Upload completed successfully, now we can get the download URL
          let imageUrl = uploadTask.snapshot.downloadURL;
          //console.log("downloadURL: " + downloadURL);
          console.log(news.$key);
          console.log(imageUrl);
          firebase.database().ref('news/' + news.$key).update({
            title: news.title,
            section: news.section,
            author: news.author,
            content: news.content,
            time: news.time,
            coverPage: news.coverPage,
            published: news.published,
            image: imageUrl
          }).then(() => {

            if (news.published == true) {
              let tokensList = [];
              this.af.list('/tokens')
                .subscribe(tokens => {
                  _.forEach(tokens, (value, key) => {
                    tokensList.push(value.$value);
                  });
                });
              _.forEach(tokensList, token => {
                let url = 'https://fcm.googleapis.com/fcm/send';

                let body =
                  {
                    "notification": {
                      "title": "RevistaULPGC",
                      "body": news.title
                    },
                    "to": token
                  };

                let headers: Headers = new Headers({
                  'Content-Type': 'application/json',
                  'Authorization': 'key=' + 'AIzaSyA1OTMjOG4Jg8E-0sZ2loxBsDy2TFbyApA'
                });
                let options = new RequestOptions({ headers: headers });

                http.post(url, body, options).map(response => {
                  return response;
                }).subscribe(data => {
                  console.log(data);
                });
              });
            }
          });
        });
    }
  }


  fireDeleteNews(newsId) {
    this.news.remove(newsId);
  }


  registerTokenToFB(token) {
    console.log(token);
    let aux = {};
    aux[token] = token;
    firebase.database().ref('tokens/').update(aux);

  }

}



