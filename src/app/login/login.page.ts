import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from '../services/login.service';

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

      this.loginService.setAuthInfo({
        nickName: userInfo.nickName,
        avatar: userInfo.avatarUrl,
        mobile: userInfo.nickName,
        token: token,
      })

      this.navCtrl.navigateRoot('/tabs');
    })
  }
}
