import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { NavController } from '@ionic/angular';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public isCertification = false;

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
  ) {
    const authInfo = this.loginService.getAuthInfo();

    if (authInfo) {
      this.isCertification = authInfo.authentication;
    }
  }

  goCertification() {
    this.navCtrl.navigateForward('/certification');
  }
}
