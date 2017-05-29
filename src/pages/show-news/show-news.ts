import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';


@Component({
  selector: 'page-show-news',
  templateUrl: 'show-news.html'
})
export class ShowNewsPage {
  news: any;
  relatedNews: any[];
  private allNews: any;
  private sectionNews: any;  
  private sortByWeight: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private DbApiService: DbApiService) {
    this.news = this.navParams.data;
  }

  ionViewDidLoad() {
    this.DbApiService.getFireNews().subscribe(resp => {
        this.allNews = resp;
        this.sectionNews = _.chain(this.allNews).filter(['section',  this.news.section]).value();
        this.sortByWeight = _.chain(this.sectionNews).sortBy('weight').value();
        this.relatedNews = this.sortByWeight.slice(0, 4);
        console.log(this.relatedNews[0]);
        console.log(this.news);
    });
  }
  showNews($event, news){
    this.navCtrl.push(ShowNewsPage, news);
  }
}
