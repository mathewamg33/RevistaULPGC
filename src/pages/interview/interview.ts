import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';

@Component({
  selector: 'page-interview',
  templateUrl: 'interview.html'
})
export class InterviewPage {
  news: any[];
  private allNews: any;
  private interviewNews: any;
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
        this.interviewNews = _.chain(this.allNews).filter(['section', 'Interviews']).value();
        this.sortByWeight = _.chain(this.interviewNews).sortBy('weight').value();
        this.news = this.interviewNews;
        this.importantNews = this.sortByWeight[0];
        loader.dismiss();
        console.log(this.importantNews);
      });
    });
  }
}
