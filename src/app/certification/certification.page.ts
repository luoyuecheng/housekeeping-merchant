import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NavController, AlertController } from '@ionic/angular';

import { LoginService, AuthInfo } from '../services/login.service';
import { loginInterface, imgHost } from '../services/login.interface';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.page.html',
  styleUrls: ['./certification.page.scss'],
})
export class CertificationPage implements OnInit {
  public title: string = '我的认证';
  // 认证时，type 为 certification
  public type: string;
  // 用户信息
  public authentication;

  // 认证信息
  public name: string;
  public idCard: string;
  public phone: string;
  // 身份证照片地址
  public imgUrl: Array<string> = [];

  // 上传图片类型
  uploadType: string;
  @ViewChild('file', { static: true }) fileButton: ElementRef<HTMLInputElement>;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    // 获取用户信息
    const authInfo: AuthInfo = this.loginService.getAuthInfo();

    // 已认证
    if (authInfo && authInfo.authentication) {
      this.type = 'authentication';
      // 已认证时，直接获取认证信息
      this.getAuthentication();
    }
  }

  handleBack() {
    if (this.type === 'certification') {
      this.type = '';
      this.title = '我的认证';
      return void 0;
    }
    this.navCtrl.back();
  }

  // 获取认证信息
  getAuthentication() {
    this.loginService.postRequest(loginInterface.getAuthentication).subscribe((data: any) => {
      if (!data || data.errno) {
        return void 0;
      }

      if (Array.isArray(data) && !data.length) {
        return void 0;
      }

      const authentication = data[0];
      // 身份证照片链接，转化为 list
      if (authentication.imgUrl) {
        authentication.imgUrl = authentication.imgUrl.split(',');
      }
      console.log('authentication', authentication)

      // 设置用户信息为已认证
      const authInfo: AuthInfo = this.loginService.getAuthInfo();
      if (authInfo) {
        // 是否认证成功
        authInfo.checkSuccess = authentication.checkSuccess;
        authInfo.idCard = authentication.idCard;
        authInfo.imgUrl = authentication.imgUrl;
        authInfo.name = authentication.name;

        this.loginService.setAuthInfo(authInfo);
      }

      this.authentication = authentication;
    })
  }

  // 去认证
  goCerfication() {
    this.type = 'certification';
    this.title = '实名认证';
  }

  async handleCerfication() {
    const verification = [
      { type: 'name', value: this.name, tip: '请输入正确姓名' },
      { type: 'idCard', value: this.idCard, tip: '请输入正确的身份证号' },
    ];
    let result: boolean;

    for (let item of verification) {
      result = await this.loginService.verification(item);
      if (!result) {
        return void 0;
      }
    }

    if (!this.imgUrl || this.imgUrl.length !== 2) {
      await this.loginService.alertTip({
        header: '警告',
        message: `请上传身份证正反面照`,
      });

      return void 0;
    }

    const data = {
      idCard: this.idCard,
      name: this.name,
      imgUrl: this.imgUrl.join(','),
    };

    this.loginService.postRequest(loginInterface.postAuthentication, data).
      subscribe(async (data: any) => {
      if (!data || data.errno) {
        return void 0;
      }

      // 认证完成后，获取认证信息
      this.getAuthentication();

      await this.loginService.alertTip({
        header: '认证成功',
      });

      this.handleBack();
    });
  }

  handleFileButton(type: string) {
    this.uploadType = type;
    this.fileButton.nativeElement.click();
  }

  // 上传文件
  async uploadFile() {
    const fileButton = this.fileButton.nativeElement;
    const files = fileButton.files;

    if (!files.length) {
      return void 0;
    }

    const formData = new FormData();

    formData.append('file', files.item(0));

    // 清空选择的文件
    fileButton.value = '';

    this.http.post(loginInterface.uploadApi, formData).pipe().subscribe((data: any) => {
      if (!data || data.errno) {
        return void 0;
      }

      const { data: fileMap = {} } = data;

      this.imgUrl.push(`${imgHost}${fileMap.url}`);
    });
  }
}