import { CreateNewsPage } from './../pages/create-news/create-news';
import { AdminPage } from './../pages/admin/admin';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DbApiService } from './../provider/db-api.service';

import { HomePage } from '../pages/home/home';
import { SportPage } from '../pages/sport/sport';
import { CulturePage } from "../pages/culture/culture";
import { SocietyPage } from "../pages/society/society";
import { InterviewPage } from "../pages/interview/interview";
import { ConfigPage } from "../pages/config/config";
import { EntrepreneurshipPage } from "../pages/entrepreneurship/entrepreneurship";
import { StudiesPage } from "../pages/studies/studies";
import { InternationalizationPage } from "../pages/internationalization/internationalization";
import { InvetigationPage } from "../pages/invetigation/invetigation";
import { LoginPage } from "../pages/login/login";
import { SearchPage } from "../pages/search/search";

import { Push, PushToken } from '@ionic/cloud-angular';
import { ShowNewsPage } from "../pages/show-news/show-news";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private DbApiService: DbApiService, public push: Push) {
    this.initializeApp();

    this.pages = [
      { title: 'Cultura', component: CulturePage },
      { title: 'Deportes', component: SportPage },
      { title: 'Emprendimiento', component: EntrepreneurshipPage },
      { title: 'Entrevistas', component: InterviewPage },
      { title: 'Estudios', component:  StudiesPage},
      { title: 'Internacionalización', component: InternationalizationPage },
      { title: 'Investigación', component: InvetigationPage },
      { title: 'Sociedad', component: SocietyPage }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByName("black");
      this.splashScreen.hide();
    });
    // this.getNotifications();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
  
  openLoginPage() {
    this.nav.setRoot(LoginPage);
  }

  openConfigPage(){
    this.nav.setRoot(ConfigPage);
  }

  openHomePage() {
    this.nav.setRoot(HomePage);
  }

  openSearchPage(){
    this.nav.setRoot(SearchPage);
  }

  // getNotifications(){
  //   this.push.rx.notification()
  //   .subscribe((msg) => {
  //     this.nav.push(ShowNewsPage, msg.payload);
  //   });
  // }

}
