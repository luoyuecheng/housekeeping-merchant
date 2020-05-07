import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private alertCtrl: AlertController,
    private http: HttpClient,
  ) { }

  async alertTip(option: { header?: string, message?: string, subHeader?: string, [key: string]: any }) {
    let param = {
      buttons: ['确认'],
      ...option,
    }
    let alert: HTMLIonAlertElement = await this.alertCtrl.create(param);
    await alert.present();
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
      case 'password':
        reg = /^[a-zA-Z\d]{8,16}$/;
        break;
      default:
        reg = option.reg;
    }

    if (!reg.test(option.value)) {
      alert = await this.alertCtrl.create({
        header: '验证失败',
        message: option.tip || `请检查输入的${option.type}`,
        buttons: ['确认']
      });

      await alert.present();
      return false;
    }
    return true;
  }
}
