import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase,  } from 'angularfire2/database';
import { Platform } from 'ionic-angular';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class DbApiService {
  news: FirebaseListObservable<any[]>;
  auth: any;
  

  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth, private platform: Platform) {
    console.log(this.afAuth); 
  }


  getFireNews(): FirebaseListObservable<any[]> {
    this.news = this.af.list('/news');
    return this.news;
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
        console.log(error);
      });
    });
  }

  fireLogout() {
    this.afAuth.auth.signOut();
  }
  
  fireCreateNews(news, image) {
    if(image == null){
      firebase.database().ref('news/'+ news.$key).push({
            title: news.title, section: news.section, author: news.author, content: news.content, weight: news.weight, time: news.time, image: ""
        });
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
        console.log(imageUrl);
        firebase.database().ref('news/').push({
            title: news.title, section: news.section, author: news.author, content: news.content, weight: news.weight, time: news.time, image: imageUrl
        });
      });
    }
  }


  fireEditNews(news, image) {
    if(image == null){
      firebase.database().ref('news/'+ news.$key).update({
            title: news.title, section: news.section, author: news.author, content: news.content, weight: news.weight, time: news.time
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
            title: news.title, section: news.section, author: news.author, content: news.content, weight: news.weight, time: news.time, image: imageUrl
        });
      });
    }
  }

  fireDeleteNews(newsId){
    this.news.remove(newsId);
  }
}
