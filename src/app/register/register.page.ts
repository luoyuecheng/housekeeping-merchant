import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public phone: string;
  public password: string;
  public checkPassword: string;

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
  }

  handleBack() {
    this.navCtrl.back();
  }

  // 注册
  async handleLogin() {
    if (this.password !== this.checkPassword) {
      await this.loginService.alertTip({ subHeader: '密码输入不一致' });
      return void 0;
    }
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

    await this.loginService.alertTip({ subHeader: '注册成功，前往登录' });
    this.navCtrl.navigateRoot('/login');
  }
}
