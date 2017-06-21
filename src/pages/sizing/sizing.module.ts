import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Sizing } from './sizing';

@NgModule({
  declarations: [
    Sizing,
  ],
  imports: [
    IonicPageModule.forChild(Sizing),
  ],
  exports: [
    Sizing
  ]
})
export class SizingModule {}
