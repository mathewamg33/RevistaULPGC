import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';
import { ShowNewsPage } from "../show-news/show-news";

@Component({
  selector: 'page-sport',
  templateUrl: 'sport.html'
})
export class SportPage {
  news: any[];
  private allNews: any;
  private sportNews: any;
  private sortByWeight: any;
  importantNews: any;

  constructor(public navCtrl: NavController, private DbApiService: DbApiService, private loadingController: LoadingController) {

  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Por favor espera...'
    });
    loader.present().then(() => {
      //this.DbApiService.fireLogin();
      this.DbApiService.getFireNews().subscribe(resp => {
        this.allNews = resp;
        this.sportNews = _.chain(this.allNews).filter(['section', 'Deportes']).value();
        this.sortByWeight = _.chain(this.sportNews).sortBy('weight').value();
        this.news = this.sportNews;
        this.importantNews = this.sortByWeight[0];
        loader.dismiss();
        console.log(this.importantNews);
      });
    });
  }

  showNews($event, news){
    this.navCtrl.push(ShowNewsPage, news);
  }

}
