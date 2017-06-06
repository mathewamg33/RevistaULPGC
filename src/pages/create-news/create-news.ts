import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController} from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-create-news',
  templateUrl: 'create-news.html'
})
export class CreateNewsPage {
  news: {title: string, section: string, author: string, content: string, fakeweight: string, weight: number, time: number} = {
    title: '',
    section: '',
    author: '',
    content: '',
    fakeweight: '',
    weight: 0,
    time: 0
  }
  image;
  
  constructor(public navCtrl: NavController, private DbApiService: DbApiService, private loadingController: LoadingController, private toastController: ToastController) {
  }

  ionViewDidLoad() {
  //  tinymce.init({
  //   selector: '#createNews',
  //   theme: 'modern',
  //   width: 600,
  //   height: 300,
  //   plugins: [
  //     'advlist autolink link lists charmap print preview hr anchor pagebreak spellchecker',
  //     'searchreplace wordcount visualblocks visualchars code insertdatetime media nonbreaking',
  //     'save table contextmenu directionality emoticons template paste textcolor'
  //   ],
  //   toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons'
  //   });
  }
  createImage(ev: any){
    this.image = ev.target.files[0];
  }

  createNews(){
    this.news.time = new Date().getTime();
    this.news.weight = parseInt(this.news.fakeweight);
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

