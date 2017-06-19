import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';
import { ShowNewsPage } from "../show-news/show-news";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  news: any[];
  private allNews: any;
  private sortBy: any;
  
  constructor(public navCtrl: NavController, private DbApiService: DbApiService, private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
      this.DbApiService.getFireNews().subscribe(resp => {
        this.allNews = resp;
        this.sortBy = _.chain(this.allNews).sortBy('section').value();
        this.news = _.reverse(this.sortBy);  
      });
   
  }
  

  getItems(ev: any) {
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

  showNews($event, news){
    this.navCtrl.push(ShowNewsPage, news);
  }
}

