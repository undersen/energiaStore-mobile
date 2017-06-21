import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FactorPenalty } from './factor-penalty';

@NgModule({
  declarations: [
    FactorPenalty,
  ],
  imports: [
    IonicPageModule.forChild(FactorPenalty),
  ],
  exports: [
    FactorPenalty
  ]
})
export class FactorPenaltyModule {}
