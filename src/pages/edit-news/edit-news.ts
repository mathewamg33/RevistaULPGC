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
  image: any = null;
  
  constructor(public navCtrl: NavController, public navParams: NavParams ,private DbApiService: DbApiService, private loadingController: LoadingController, private toastController: ToastController) {
    this.news = navParams.data;
  }

  ionViewDidLoad() {
  
  }

  createImage(ev: any){
    this.image = ev.target.files[0];
    
  }

  editNews(){
    this.news.time = new Date().getTime();
    if(this.news.title ==""){
      let toast = this.toastController.create({
        message: 'Introduzca un título',
        position: 'top',
        duration: 5000
      });
      toast.present();
    }else if(this.news.author ==""){
      let toast = this.toastController.create({
        message: 'Introduzca un autor',
        position: 'top',
        duration: 5000
      });
      toast.present();
    }else if(this.news.content ==""){
      let toast = this.toastController.create({
        message: 'Introduzca contenido',
        position: 'top',
        duration: 5000
      });
      toast.present();
    }else if(this.news.section == ""){
      let toast = this.toastController.create({
        message: 'Introduzca una sección',
        position: 'top',
        duration: 5000
      });
      toast.present();
    }else if( this.image == null || this.image.size <= 1000000 ){
      this.DbApiService.fireEditNews(this.news, this.image);
      let toast = this.toastController.create({
        message: 'Noticia editada con éxito',
        position: 'top',
        duration: 5000
      });
      toast.present();
      this.navCtrl.pop();
    }else{
      let toast = this.toastController.create({
        message: 'La imagen seleccionada tiene un tamaño superior a 1Mb, seleccione otra imagen por favor',
        position: 'top',
        duration: 5000
      });
      toast.present();
    }
  }
}

