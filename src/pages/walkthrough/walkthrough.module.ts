import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Walkthrough } from './walkthrough';

@NgModule({
  declarations: [
    Walkthrough,
  ],
  imports: [
    IonicPageModule.forChild(Walkthrough),
  ],
  exports: [
    Walkthrough
  ]
})
export class WalkthroughModule {}
