import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';
import { ShowNewsPage } from "../show-news/show-news";

@Component({
  selector: 'page-interview',
  templateUrl: 'interview.html'
})
export class InterviewPage {
  published: any;
  news: any[];
  private allNews: any;
  private interviewNews: any;
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
        this.interviewNews = _.chain(this.allNews).filter(['section', 'Entrevistas']).value();
        this.sortByTime = _.chain(this.interviewNews).sortBy('time').value();
        this.sortByTime = _.reverse(this.sortByTime);
        this.published = _.chain(this.sortByTime).filter(['published', true]).value();
        this.news = _.drop(this.published);
        this.importantNews = _.head(this.published);
        loader.dismiss();
      });
    });
  }

  showNews($event, news){
    this.navCtrl.push(ShowNewsPage, news);
  }
  
}
