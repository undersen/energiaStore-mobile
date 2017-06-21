import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { EnergiaStore } from './app.component';

// Pages
import { Introduction } from '../pages/introduction/introduction';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Sizing } from '../pages/sizing/sizing';
import { Welcome } from '../pages/welcome/welcome';
import { Dashboard } from '../pages/dashboard/dashboard';
import { FactorPenalty } from '../pages/factor-penalty/factor-penalty';
import { Walkthrough } from '../pages/walkthrough/walkthrough';

@NgModule({
  declarations: [
    EnergiaStore,
    Introduction,
    Login,
    Register,
    Sizing,
    Welcome,
    Dashboard,
    FactorPenalty,
    Walkthrough

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(EnergiaStore)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    EnergiaStore,
    Introduction,
    Login,
    Register,
    Sizing,
    Welcome,
    Dashboard,
    FactorPenalty,
    Walkthrough
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
