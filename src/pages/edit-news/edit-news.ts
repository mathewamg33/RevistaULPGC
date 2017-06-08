import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-edit-news',
  templateUrl: 'edit-news.html'
})
export class EditNewsPage {
  news: any;
  fakeweight: string;
  image: any = null;
  
  constructor(public navCtrl: NavController, public navParams: NavParams ,private DbApiService: DbApiService, private loadingController: LoadingController, private toastController: ToastController) {
    this.news = navParams.data;
    this.fakeweight = this.news.weight.toString();
    console.log(this.fakeweight);
  }

  ionViewDidLoad() {
  
  }

  createImage(ev: any){
    this.image = ev.target.files[0];
    
  }

  editNews(){
    console.log("imagen sin cambiar: " + this.image);
    this.news.time = new Date().getTime();
    this.news.weight = parseInt(this.fakeweight);
    this.DbApiService.fireEditNews(this.news, this.image);
    let toast = this.toastController.create({
        message: 'Noticia editada con éxito',
        position: 'top',
        duration: 5000
    });
    toast.present();
    this.navCtrl.pop();
  }

}

