import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { loginInterface } from './login.interface';

export interface AuthInfo {
  gender?: number;
  nickName: string;
  mobile: string;
  avatar: string;
  token: string;
  authentication: boolean; // 是否认证, 默认为 false
  checkSuccess?: boolean; // 是否认证成功
  name?: string;
  idCard?: string;
  imgUrl?: string;
  [key: string]: any;
}

// 订单状态: 枚举
export enum OrderStatus {
  all = 0, // 全部订单
  unpaid = 101, // 未接单(新订单)
  unpaidUserCancel = 102, // 订单未支付，用户取消 (无)
  unpaidSysCancen = 103, // 订单未支付，超期系统取消 (无)
  unserved = 201, // 待服务
  userRefund = 202, // 用户申请退款 (商家未接单，申请退款/取消订单)
  adminRefund = 203, // 管理员执行退款，确认退款成功 (商家确认退款 / 商家拒单 / 超时未接单自动退单)
  serving = 301, // 服务中
  userCompleted = 401, // 用户确认服务完成
  adminCompleted = 402, // 用户未确认，自动完成
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public authInfo: AuthInfo;

  constructor(
    private alertCtrl: AlertController,
    private http: HttpClient,
  ) {
    this.authInfo = this.getAuthInfo();
  }

  // 获取用户信息
  getAuthInfo(): AuthInfo {
    return JSON.parse(localStorage.getItem('auth'));
  }

  // 存储用户信息
  setAuthInfo(authInfo: AuthInfo) {
    this.authInfo = authInfo;
    localStorage.setItem('auth', JSON.stringify(authInfo));
  }

  // 退出登录，清除用户信息
  removeAntuInfo() {
    this.authInfo = undefined;
    localStorage.removeItem('auth');
  }

  async alertTip(option: { header?: string, message?: string, subHeader?: string, [key: string]: any }) {
    let param = {
      buttons: ['确认'],
      ...option,
    }
    let alert: HTMLIonAlertElement = await this.alertCtrl.create(param);
    return await alert.present();
  }

  async verification(option: { type?: string, value: string, tip: string, reg?: RegExp }) {
    let reg: RegExp;
    let alert: HTMLIonAlertElement;

    switch (option.type) {
      case 'name':
        // 验证姓名
        reg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/;
        break;
      case 'idCard':
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
      case 'required':
        option.value = option.value.toString().trim();
        reg = /^.+?$/;
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

  // 登录
  login(data) {
    return this.http.post(loginInterface.loginApi, { ...data }).pipe(
      tap(_ => {
        console.log('adfa', _)
        // this.alertTip()
        console.log(`登录, 请求接口: ${loginInterface.loginApi}`);
      })
    )
  }

  // 注册
  register(data) {
    return this.http.post(loginInterface.register, { ...data }).pipe(
      tap(_ => console.log(`注册, 请求接口: ${loginInterface.register}`))
    )
  }

  // 普通 GET 接口
  getRequest(url: string, data?: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authInfo.token,
      }),
      params: {
        ...data,
      }
    }
    return this.http.get(url, httpOptions).pipe(
      tap((_: any) => {
        if (!_) {
          this.alertTip({
            header: '请求失败',
            message: '接口调用出错',
          })
          return void 0;
        }
        if (_.errno) {
          this.alertTip({
            header: '请求失败',
            message: _.errmsg,
          })
          return void 0;
        }
      })
    );
  }

  // 普通的 POST 接口
  postRequest(url: string, data?: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authInfo.token,
      }),
    }

    return this.http.post(url, { ...data }, httpOptions).pipe(
      tap((_: any) => {
        if (!_) {
          this.alertTip({
            header: '请求失败',
            message: '接口调用出错',
          })
          return void 0;
        }
        if (_.errno) {
          this.alertTip({
            header: '请求失败',
            message: _.errmsg,
          })
          return void 0;
        }
      })
    );
  }

  // PUT 接口
  putRequest(url: string, data?: any) {
    return this.http.put(url, { ...data }).pipe(
      tap((_: any) => {
        if (!_) {
          this.alertTip({
            header: '请求失败',
            message: '接口调用出错',
          })
          return void 0;
        }
        if (_.errno) {
          this.alertTip({
            header: '请求失败',
            message: _.errmsg,
          })
          return void 0;
        }
      })
    );
  }
}
