import { CreateNewsPage } from './../pages/create-news/create-news';
import { AdminPage } from './../pages/admin/admin';
import { DbApiService } from './../provider/db-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SportPage } from '../pages/sport/sport';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CulturePage } from "../pages/culture/culture";
import { SocietyPage } from "../pages/society/society";
import { InterviewPage } from "../pages/interview/interview";
import { ShowNewsPage } from "../pages/show-news/show-news";
import { ConfigPage } from "../pages/config/config";
import { EntrepreneurshipPage } from "../pages/entrepreneurship/entrepreneurship";
import { StudiesPage } from '../pages/studies/studies';
import { InternationalizationPage } from '../pages/internationalization/internationalization';
import { InvetigationPage } from "../pages/invetigation/invetigation";
import { LoginPage } from "../pages/login/login";

export const firebaseConfig = {
  apiKey: "AIzaSyA3GkJ2dwJeDbycrDPSoXUUxJf96s_4RUc",
  authDomain: "revistauplgc.firebaseapp.com",
  databaseURL: "https://revistauplgc.firebaseio.com",
  projectId: "revistauplgc",
  storageBucket: "revistauplgc.appspot.com",
  messagingSenderId: "1094799334255"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SportPage,
    CulturePage,
    SocietyPage,
    InterviewPage,
    ShowNewsPage,
    ConfigPage,
    EntrepreneurshipPage,
    StudiesPage,
    InternationalizationPage,
    InvetigationPage,
    LoginPage,
    AdminPage,
    CreateNewsPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SportPage,
    CulturePage,
    SocietyPage,
    InterviewPage,
    ShowNewsPage,
    ConfigPage,
    EntrepreneurshipPage,
    StudiesPage,
    InternationalizationPage,
    InvetigationPage,
    LoginPage,
    AdminPage,
    CreateNewsPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    DbApiService
  ]
})
export class AppModule {}
