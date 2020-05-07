import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public isCertification = true;

  constructor(
    private navCtrl: NavController,
  ) {}

  goCertification() {
    this.navCtrl.navigateForward('/certification');
  }
}
