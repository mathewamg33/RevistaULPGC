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
    this.DbApiService.fireCreateNews(this.news, this.image);
      let toast = this.toastController.create({
        message: 'Noticia creada con éxito',
        position: 'top',
        duration: 5000
      });
      toast.present();
      this.navCtrl.pop();
  }
  
  


}

