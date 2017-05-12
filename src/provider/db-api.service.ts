import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase,  } from 'angularfire2/database';
import { Platform } from 'ionic-angular';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

@Injectable()
export class DbApiService {
  news: FirebaseListObservable<any[]>;
  auth: any;
  

  constructor(private af: AngularFireDatabase, private afAuth: AngularFireAuthModule, private platform: Platform) {
    console.log(this.afAuth); 
  }


  getFireNews(): FirebaseListObservable<any[]> {
    this.news = this.af.list('/news');
    return this.news;
  }
  
}
