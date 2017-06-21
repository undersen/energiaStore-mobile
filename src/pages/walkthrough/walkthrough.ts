import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
import { Welcome } from '../welcome/welcome';

/**
* Generated class for the Walkthrough page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-walkthrough',
  templateUrl: 'walkthrough.html',
})
export class Walkthrough {
  @ViewChild(Slides) slides: Slides;
  welcomePage = Welcome;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Walkthrough');
  }


  goToSlide(slide : number){
    this.slides.slideTo(slide, 500);
  }




}
