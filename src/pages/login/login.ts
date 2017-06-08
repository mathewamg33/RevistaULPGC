import { AdminPage } from './../admin/admin';
import { HomePage } from './../home/home';
import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  email: string;
  password: string;

  constructor(public navCtrl: NavController, private DbApiService: DbApiService,
    private toastController: ToastController, private alertCtrl: AlertController) {
      this.email = '';
      this.password = '';
    
  }

  ionViewDidLoad() {
    
  }

  login() {
    this.DbApiService.loginWithEmail(this.email, this.password).subscribe(data => {
      this.navCtrl.setRoot(AdminPage);
      let toast = this.toastController.create({
        message: 'Te has logueado con éxito',
        position: 'bottom',
        duration: 3000
      });
      toast.present();
    }, err => {
      this.showError(err);
    });
  }

  showError(text) {
    let prompt = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
  }
}

