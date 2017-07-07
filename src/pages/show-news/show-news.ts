import { SocialSharing } from '@ionic-native/social-sharing';
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
  base64img: any;
  img: any;
  relatedNews: any[];
  private allNews: any;
  private sectionNews: any;  
  
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private DbApiService: DbApiService, private popoverCtrl: PopoverController, private socialSharing: SocialSharing) {
    this.news = this.navParams.data;
    this.img = this.news.image;
    
    
  }

  ionViewDidLoad() {
    this.DbApiService.getFireNews().subscribe(resp => {
        this.allNews = resp;
        this.sectionNews = _.chain(this.allNews).filter(['section',  this.news.section]).value();
        this.relatedNews = this.sectionNews.slice(0, 4);
    });
    let image = new Image();
    image.src = this.img;
    this.base64img = this.getBase64Image(image);
    
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

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  
  share(){
    let options = {
                    message: this.news.title, // not supported on some apps (Facebook, Instagram)
                    subject: null, // fi. for email
                    files: null, // an array of filenames either locally or remotely
                    url: this.news.image,
                    chooserTitle: 'Selecciona una app' // Android only, you can override the default share sheet title
                  }
    this.socialSharing.shareWithOptions(options);
  }
  

}
