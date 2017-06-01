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
  
  fireCreateNews(news) {
    this.news.push({
      title: news.title, section: news.section, author: news.author, content: news.content
    });
  }

  fireDeleteNews(newsId){
    this.news.remove(newsId);
  }
}
