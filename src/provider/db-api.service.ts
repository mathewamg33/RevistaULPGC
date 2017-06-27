import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase,  } from 'angularfire2/database';
import { Platform } from 'ionic-angular';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

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

  cover(news){
    if(news.coverPage === true){
      this.getFireNews().take(1).subscribe(resp => {
        this.allNews = resp;
        for (let n of this.allNews){
            firebase.database().ref('news/'+ n.$key).update({
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
      }).catch(function(error) {
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
    if(image == null){
      firebase.database().ref('news/').push({
            title: news.title, 
            section: news.section, 
            author: news.author, 
            content: news.content, 
            time: news.time,  
            coverPage: news.coverPage,
            published: news.published, 
            image: ""
        })
          if(news.published == true){
            let body = {
              to : "ei7HRMoE43U:APA91bG7wEAu4Cu3RXijEfvqryTZey2mokiOTvJdc-CkXz1MA8QnCy6GqeBLuMt8MK2hVDXT8uRcDllqaKfWlt8mYVGrvFeyWaGCdlPZXZcSnZ9xx7WD3dE9Lx69j01QCYYh0t7DYW1g",
              notification: {
                title: news.title
              }
            }
            let headers = new Headers({'Content-Type': ' application/json'});

              headers.append('Authorization', 'key=' + 'AIzaSyA1OTMjOG4Jg8E-0sZ2loxBsDy2TFbyApA');  
            console.log("headers:" + headers[0], headers[1]);
            console.log(JSON.stringify(body));            
            this.http.post('https://fcm.googleapis.com/fcm/send', JSON.stringify(body), {headers: headers}).map(res => res.json());
           }
        
    }else{
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
        });
      });
    }
  }


  fireEditNews(news, image) {
    this.cover(news);
    if(image == null){
      firebase.database().ref('news/'+ news.$key).update({
            title: news.title,
            section: news.section,
            author: news.author,
            content: news.content,
            time: news.time,
            coverPage: news.coverPage,
            published: news.published  
      });
    }else{

      let storageRef = firebase.storage().ref();
      let imageName = image.name;
      let uploadTask = storageRef.child('news/'+ news.$key + imageName).put(image);
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
        firebase.database().ref('news/'+ news.$key).update({
            title: news.title,
            section: news.section,
            author: news.author,
            content: news.content,
            time: news.time,
            coverPage: news.coverPage,
            published: news.published,            
            image: imageUrl
        });
      });
    }
  }

  // firePublishNews(newsId, published){
  //    firebase.database().ref('news/'+ newsId).update({
  //           published: published,
  //    })
  // }


  fireDeleteNews(newsId){
    this.news.remove(newsId);
  }


  sendNotificationToUser(user, message) {
    firebase.database().ref('notifications/').push({
      title: user,
      section: message 
    });
  }
}

