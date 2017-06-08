import { DbApiService } from './../../provider/db-api.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import * as _ from 'lodash';
import { PopoverPage } from "../popover/popover";


@Component({
  selector: 'page-show-news',
  templateUrl: 'show-news.html'
})
export class ShowNewsPage {
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;

  news: any;
  relatedNews: any[];
  private allNews: any;
  private sectionNews: any;  
  private sortByWeight: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private DbApiService: DbApiService, private popoverCtrl: PopoverController) {
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
  
  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPage, {
      textEle: this.text.nativeElement
    });

    popover.present({
      ev: ev
    });
  }
}
