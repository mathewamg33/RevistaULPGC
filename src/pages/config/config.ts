import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
import { ShowNewsPage } from "../show-news/show-news";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {
  notifications: boolean;

  constructor(public navCtrl: NavController, private DbApiService: DbApiService, private storage: Storage, private loadingController: LoadingController, public push: Push) {
    storage.get('notification').then((value)=>{
      this.notifications = value;
    });
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
        this.storage.set('notification', true);
      }
      else{
        this.push.unregister();
        this.storage.set('notification', false);
        
      }
	}

  registerToken(){
    this.push.register().then((t: PushToken) => {
      this.DbApiService.registerTokenToFB(t.token);
      return this.push.saveToken(t,{
      });
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });
  }
  
  
}

