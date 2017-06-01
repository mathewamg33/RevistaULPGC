import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController} from 'ionic-angular';


@Component({
  selector: 'page-create-news',
  templateUrl: 'create-news.html'
})
export class CreateNewsPage {
  news: {title: string, section: string, author: string, content: string} = {
    title: '',
    section: '',
    author: '',
    content: ''
  }
  image;
  
  constructor(public navCtrl: NavController, private DbApiService: DbApiService, private loadingController: LoadingController, private toastController: ToastController) {
  }

  ionViewDidLoad() {
   
  }


  FireCreateNews(){
    this.DbApiService.fireCreateNews(this.news);
    let toast = this.toastController.create({
      message: 'Noticia creada con éxito',
      position: 'top',
      duration: 5000
    });
    toast.present();
    this.navCtrl.pop();
  }

}

