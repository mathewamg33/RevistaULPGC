import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {
  notifications: boolean;

  constructor(public navCtrl: NavController, private DbApiService: DbApiService, private loadingController: LoadingController) {
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
       if (val===true)
        console.log("activo: " + this.notifications);
      else
        console.log("desactivado: " + this.notifications);

	}
}

