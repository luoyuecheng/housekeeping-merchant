import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { loginInterface } from '../services/login.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  activeType;
  //
  modalType = {
    certification: {
      key: 'certification',
      title: '我的认证',
    },
    message: {
      key: 'message',
      title: '消息',
    },
    setting: {
      'key': 'setting',
      title: '设置',
    }
  }

  // 消息列表
  messages;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((param = {}) => {
      console.log('queryParams', param);
      const activeType = this.modalType[param.key];
      if (param.title) {
        activeType.title = param.title;
      }
      this.activeType = activeType;

      if (activeType.key === 'message') {
        this.getNotice();
      }
    })
  }

  // 获取通知
  getNotice() {
    this.loginService.getRequest(loginInterface.getNotice).subscribe((data:any) => {
      if (!data) {
        return void 0;
      }
      this.messages = data;
    })
  }

  // 去认证
  goCertification() {
    this.navCtrl.navigateForward('/certification');
  }

  // 退出登录
  signOut() {
    this.loginService.postRequest(loginInterface.logoutApi, {}).subscribe((data: any) => {
      // 退出登录，清除用户信息
      this.loginService.removeAntuInfo();
      this.loginService.alertTip({
        header: '退出成功',
      });

      this.navCtrl.navigateRoot('/login');
    })
  }

  handleBack() {
    this.navCtrl.back();
  }
}
