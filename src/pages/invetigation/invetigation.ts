import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';
import { ShowNewsPage } from "../show-news/show-news";

@Component({
  selector: 'page-invetigation',
  templateUrl: 'invetigation.html'
})
export class InvetigationPage {
  news: any[];
  private allNews: any;
  private invetigationNews: any;
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
        this.invetigationNews = _.chain(this.allNews).filter(['section', 'Investigación']).value();
        this.sortByWeight = _.chain(this.invetigationNews).sortBy('weight').value();
        this.news = this.invetigationNews;
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
