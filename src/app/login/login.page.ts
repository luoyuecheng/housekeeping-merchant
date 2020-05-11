import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { loginInterface } from '../services/login.interface';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public phone: string;
  public password: string;

  constructor(
    private loginService: LoginService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    const antuInfo = this.loginService.authInfo;
    if (antuInfo && antuInfo.token) {
      this.navCtrl.navigateRoot('/tabs');
    }
  }

  // 登录
  async handleLogin() {
    const verification = [
      { type: 'phone', value: this.phone, tip: '请输入正确的手机号' },
      { type: 'password', value: this.password, tip: '请输入正确的密码' },
    ];
    let result: boolean;

    for (let item of verification) {
      result = await this.loginService.verification(item);
      if (!result) {
        return void 0;
      }
    }

    this.loginService.login({
      mobile: this.phone,
      password: this.password,
      username: this.phone,
    }).subscribe(async (data: any) => {
      console.log(data)
      if (data && data.errno) {
        await this.loginService.alertTip({
          header: '登录失败',
          message: data.errmsg,
        })
        return void 0;
      }

      const { userInfo = {}, token = '' } = data.data || {};

      const authInfo = {
        nickName: userInfo.nickName,
        avatar: userInfo.avatarUrl,
        mobile: userInfo.nickName,
        token: token,
        authentication: false,
      };

      this.loginService.setAuthInfo(authInfo);

      await this.loginService.postRequest(loginInterface.getAuthentication, {}).pipe(
        tap(_ => _, error => {
          console.log('error', '错误');
          // 获取权限信息失败时，直接跳转
          this.navCtrl.navigateRoot('/tabs');
        })
      ).subscribe((data: any) => {
        if (!data || data.errno) {
          return void 0;
        }

        if (Array.isArray(data) && !data.length) {
          this.navCtrl.navigateRoot('/tabs');
          return void 0;
        }

        authInfo.authentication = true;
        this.loginService.setAuthInfo(authInfo);
        this.navCtrl.navigateRoot('/tabs');
      })
    })
  }
}
