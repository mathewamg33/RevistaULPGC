import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';
import { ShowNewsPage } from "../show-news/show-news";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  news: any[];
  private allNews: any;
  private sortByTime: any;
  private published: any;
  private importantNews: any;
  coverPage: any;

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
        this.sortByTime = _.chain(this.allNews).sortBy('time').value();
        this.importantNews = _.chain(this.allNews).filter(['coverPage', true]).value();
        this.published = _.chain(this.sortByTime).filter(['published', true]).value();
        this.coverPage = this.importantNews[0];
        this.news = this.published;
        loader.dismiss();
      });
    });
  }

  showNews($event, news){
    this.navCtrl.push(ShowNewsPage, news);
  }
}
