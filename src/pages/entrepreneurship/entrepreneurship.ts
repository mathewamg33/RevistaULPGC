import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';
import { ShowNewsPage } from "../show-news/show-news";

@Component({
  selector: 'page-entrepreneurship',
  templateUrl: 'entrepreneurship.html'
})
export class EntrepreneurshipPage {
  news: any[];
  private allNews: any;
  private entrepreneurshipNews: any;
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
        this.entrepreneurshipNews = _.chain(this.allNews).filter(['section', 'Emprendimiento']).value();
        this.sortByWeight = _.chain(this.entrepreneurshipNews).sortBy('weight').value();
        this.news = this.entrepreneurshipNews;
        this.importantNews = this.sortByWeight[this.sortByWeight.length-1];
        loader.dismiss();
        console.log(this.importantNews);
      });
    });
  }

  showNews($event, news){
    this.navCtrl.push(ShowNewsPage, news);
  }

}
