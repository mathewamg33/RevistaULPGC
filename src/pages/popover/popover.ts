import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';


@Component({
  template: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {
  textEle: any;
  contentEle: any;
  text: any;
  fontFamily;

  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      this.textEle = this.navParams.data.textEle;
      console.log(this.textEle[0]);
      this.setFontFamily();
    }
  }


  setFontFamily() {
    if (this.contentEle.style.fontFamily) {
      this.fontFamily = this.contentEle.style.fontFamily.replace(/'/g, "");
    }
  }

  changeFontSize() {
    console.log(this.text);
    console.log("esto es: " + this.textEle[0] + " segundo: " + this.textEle[1]);
    for (let p of this.textEle){
      p.style.fontSize = this.text + 'px';
    }
  }

  changeFontFamily() {
    if (this.fontFamily) this.contentEle.style.fontFamily = this.fontFamily;
  }
}
