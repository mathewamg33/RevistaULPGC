import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController} from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-create-news',
  templateUrl: 'create-news.html'
})
export class CreateNewsPage {
  news: {
    title: string, section: string, author: string, content: string, time: number, published: boolean, coverPage: boolean } = 
    {
      title: '',
      section: '',
      author: '',
      content: '',
      time: 0,
      published: false,
      coverPage: false
    }
  image: any = null;
  
  constructor(public navCtrl: NavController, private DbApiService: DbApiService, private loadingController: LoadingController, private toastController: ToastController) {
  }


  createImage(ev: any){
    this.image = ev.target.files[0];
   
  }

  createNews(){
    console.log(this.news.coverPage);
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
      this.DbApiService.fireCreateNews(this.news, this.image);
      let toast = this.toastController.create({
        message: 'Noticia creada con éxito',
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

