import { HomePage } from './../home/home';
import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController} from 'ionic-angular';
import * as _ from 'lodash';
import { FormControl } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import { CreateNewsPage } from "../create-news/create-news";

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  news: any[];
  private allNews: any;
  private sortByTime: any;
  searchTerm: string = '';
  searchControl: FormControl;
  
  constructor(public navCtrl: NavController, private DbApiService: DbApiService, private loadingController: LoadingController, private toastController: ToastController) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
      this.DbApiService.getFireNews().subscribe(resp => {
        this.allNews = resp;
        this.sortByTime = _.chain(this.allNews).sortBy('title').value();
        this.news = this.sortByTime;  
      });

      this.searchControl.valueChanges.debounceTime(100).subscribe(search => {
            this.filterBySection();           
      });
   
  }
  
  logout() {
    this.DbApiService.fireLogout();
    let toast = this.toastController.create({
      message: 'Hasta pronto!',
      position: 'bottom',
      duration: 3000
    });
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }

  filterByTitle(ev: any) {
    // Reset items back to all of the items
    this.ionViewDidLoad();
    // set val to the value of the searchbar
    let val = ev.target.value;
    
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.news = this.news.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  filterBySection() {
    // Reset items back to all of the items
    this.ionViewDidLoad();

    if (this.searchTerm && this.searchTerm.trim() != 'Todos') {
      this.news = this.news.filter((item) => {
        return (item.section.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
      })
    }
  }
  goCreateNews(){
    this.navCtrl.push(CreateNewsPage);
  }

  goEditNews(){
   
  }

  deleteNews(news){
    console.log(news.$key);
    this.DbApiService.fireDeleteNews(news.$key);
  }
}

