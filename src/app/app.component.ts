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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private DbApiService: DbApiService) {
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
      //orden alfabetico
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  openLoginPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(LoginPage);
  }

  openConfigPage(){
    this.nav.setRoot(ConfigPage);
  }

  openHomePage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(HomePage);
  }
}
