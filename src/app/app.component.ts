import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { Introduction } from '../pages/introduction/introduction';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Sizing } from '../pages/sizing/sizing';
import { Welcome } from '../pages/welcome/welcome';
import { Dashboard } from '../pages/dashboard/dashboard';
import { FactorPenalty } from '../pages/factor-penalty/factor-penalty';

@Component({
  templateUrl: 'app.html'
})
export class EnergiaStore {
  rootPage:any = Introduction;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
