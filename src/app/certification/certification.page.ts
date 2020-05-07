import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.page.html',
  styleUrls: ['./certification.page.scss'],
})
export class CertificationPage implements OnInit {
  public title: string = '我的认证';
  // 认证时，type 为 certification
  public type: string;

  // 认证信息
  public name: string;
  public identity: string;
  public phone: string;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
  }

  handleBack() {
    if (this.type === 'certification') {
      this.type = '';
      this.title = '我的认证';
      return void 0;
    }
    this.navCtrl.back();
  }

  //
  goCerfication() {
    this.type = 'certification';
    this.title = '实名认证';
  }

  async handleCerfication() {
    const verification = [
      { type: 'name', value: this.name, tip: '姓名' },
      { type: 'identity', value: this.identity, tip: '份证号' },
      { type: 'phone', value: this.phone, tip: '手机号' },
    ];
    let result: boolean;

    for (let item of verification) {
      result = await this.verification(item);
      if (!result) {
        return void 0;
      }
    }
    console.log('认证成功');
  }

  async verification(option: { type?: string, value: string, tip: string, reg?: RegExp }) {
    let reg: RegExp;
    let alert: HTMLIonAlertElement;

    switch (option.type) {
      case 'name':
        // 验证姓名
        reg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/;
        break;
      case 'identity':
        // 验证身份证号
        reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
        break;
      case 'phone':
        reg = /^1[3456789]\d{9}$/;
        break;
      default:
        reg = option.reg;
    }

    if (!reg.test(option.value)) {
      alert = await this.alertCtrl.create({
        header: '认证失败',
        message: `请输入正确的${option.tip}`,
        buttons: ['确认']
      });

      await alert.present();
      return false;
    }
    return true;
  }
}