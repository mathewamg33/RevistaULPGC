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
  published: any;
  news: any[];
  private allNews: any;
  private entrepreneurshipNews: any;
  private sortByTime: any;
  importantNews: any;

  constructor(public navCtrl: NavController, private DbApiService: DbApiService, private loadingController: LoadingController) {

  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Por favor espera...'
    });
    loader.present().then(() => {
      this.DbApiService.getFireNews().subscribe(resp => {
        this.allNews = resp;
        this.entrepreneurshipNews = _.chain(this.allNews).filter(['section', 'Emprendimiento']).value();
        this.sortByTime = _.chain(this.entrepreneurshipNews).sortBy('time').value();
        this.sortByTime = _.reverse(this.sortByTime);
        this.published = _.chain(this.sortByTime).filter(['published', true]).value();
        this.news = _.drop(this.published);
        this.importantNews = _.head(this.published);
        loader.dismiss();
        console.log(this.importantNews);
      });
    });
  }

  showNews($event, news){
    this.navCtrl.push(ShowNewsPage, news);
  }

}
