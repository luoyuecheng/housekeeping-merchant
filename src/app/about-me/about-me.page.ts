import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { NavController } from '@ionic/angular';

import { LoginService, AuthInfo } from '../services/login.service';

@Component({
  selector: 'app-about-me',
  templateUrl: 'about-me.page.html',
  styleUrls: ['about-me.page.scss']
})
export class AboutMePage {
  public userInfo: AuthInfo;

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
  ) {
    this.userInfo = this.loginService.getAuthInfo();
  }

  // 选择查看的类型
  handleItem(key: number|string) {
    const queryParams: Params = {
      key,
      name: key,
      title: '全部',
    }

    switch (key) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
        this.navCtrl.navigateForward('/tabs/aboutMe/order', { queryParams });
        break;
      case 'certification':
        // 已认证时，查看认证信息
        if (this.userInfo && this.userInfo.authentication) {
          this.navCtrl.navigateForward('/certification');
          break;
        }
        this.navCtrl.navigateForward('/modal', { queryParams: { key } });
        break;
      case 'setting':
        this.navCtrl.navigateForward('/modal', { queryParams: { key } });
        break;
      default:
        this.navCtrl.navigateForward('/modal');
    }
  }
}