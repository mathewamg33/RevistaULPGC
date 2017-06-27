import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
import { ShowNewsPage } from "../show-news/show-news";

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {
  notifications: boolean;

  constructor(public navCtrl: NavController, private DbApiService: DbApiService, private loadingController: LoadingController, public push: Push) {
    this.notifications = false;
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Por favor espera...'
    });
    loader.present().then(() => {
        loader.dismiss();
    });
  }

  changeNotifications(val) {
      if (val===true){
        this.registerToken();
        this.getNotifications();
      }
      else{
        this.push.unregister();
      }
	}

  registerToken(){
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t,{
        ignore_user: true
      });
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });
  }
  
  getNotifications(){
    this.push.rx.notification()
    .subscribe((msg) => {
      this.navCtrl.push(ShowNewsPage, msg.payload);
    });
  }
}

