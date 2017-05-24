import { DbApiService } from './../../provider/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';

@Component({
  selector: 'page-society',
  templateUrl: 'society.html'
})
export class SocietyPage {
  news: any[];
  private allNews: any;
  private societyNews: any;
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
        this.societyNews = _.chain(this.allNews).filter(['section', 'Society']).value();
        this.sortByWeight = _.chain(this.societyNews).sortBy('weight').value();
        this.news = this.societyNews;
        this.importantNews = this.sortByWeight[0];
        loader.dismiss();
        console.log(this.importantNews);
      });
    });
  }
}
