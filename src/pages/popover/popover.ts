import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';


@Component({
  template: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {
  textEle: any;
  text: any;
  fontFamily;

  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    if (this.navParams.data) {
      this.textEle = this.navParams.data.textEle;

      this.setFontFamily();
    }
  }


  setFontFamily() {
    if (this.textEle.style.fontFamily) {
      this.fontFamily = this.textEle.style.fontFamily.replace(/'/g, "");
    }
  }

  changeFontSize() {
    console.log(this.text);
    this.textEle.style.fontSize = this.text + 'px';
  }

  changeFontFamily() {
    if (this.fontFamily) this.textEle.style.fontFamily = this.fontFamily;
  }
}
