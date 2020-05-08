import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';

import { LoginService } from '../services/login.service';
import { loginInterface } from '../services/login.interface';

@Component({
  selector: 'app-my-service',
  templateUrl: './my-service.page.html',
  styleUrls: ['./my-service.page.scss'],
})
export class MyServicePage implements OnInit {
  @ViewChild('file', { static: true })
  fileButton: ElementRef<HTMLInputElement>;

  // true - 我发布的服务列表, false - 发布服务表单
  release: boolean = true;
  // 一级类目
  firstCategoryList = [];
  // 二级类目
  secondCategoryList = [];
  // 商品列表(我发布的服务列表)
  goods = [];
  // 上传图片类型: avatar - 上传头像
  uploadType: string;

  public serviceForm = {
    name: '', // 商品名
    firstCategory: '', // 一级类目
    categoryId: '', // 类目 ID(二级类目)
    address: '',
    retailPrice: '', // 价格
    picUrl: '', // 服务头像
    pickerList: [], // 描述图片
  };
  public pickerList = [];

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private http: HttpClient,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    // 查询所有服务
    this.queryGoods();
    // 查询一级类目
    this.loginService.getRequest(loginInterface.getfirstcategory).subscribe((data: any) => {
      if (!data && data.errno) {
        return void 0;
      }

      const { data: firstCategory = [] } = data;

      this.firstCategoryList = firstCategory;
    })
  }

  // 搜索商品列表
  queryGoods() {
    this.loginService.getRequest(loginInterface.queryGoodsApi).subscribe((data: any) => {
      if (!data) {
        return void 0;
      }

      this.goods = data;
    })
  }

  // 提交表单数据
  async onSubmit() {
    if (this.release) {
      this.release = false;
      return void 0;
    }

    const checkoutList = [
      { value: this.serviceForm.name, tip: '请输入服务名称', type: 'required' },
      { value: this.serviceForm.categoryId, tip: '请选择服务类型', type: 'required' },
      // { value: this.serviceForm.address, tip: '请输入服务地址', type: 'required' },
      { value: this.serviceForm.retailPrice, tip: '请输入价格，只能输入数字', reg: /^\d+$/ },
    ];

    for (let item of checkoutList) {
      const result = await this.loginService.verification(item);
      if (!result) {
        return void 0;
      }
    }

    const data = {};

    for (let item of Object.keys(this.serviceForm)) {
      if (item === 'pickerList') {
        continue;
      }
      data[item] = this.serviceForm[item];
    }

    // 商品编号必填，用商品名称填充
    data['goodsSn'] = this.serviceForm.name;

    // 构建详情描述图片
    data['detail'] = '';
    for (let item of this.serviceForm.pickerList) {
      data['detail'] += `
        <section>
          <img src="${item}" />
        </section>`
    }

    this.loginService.postRequest(loginInterface.addGoodsApi, data).subscribe(async (data: any) => {
      if (!data || data.errno) {
        return void 0;
      }

      // 查询所有商品
      this.queryGoods();

      const result = await this.loginService.alertTip({
        header: '服务发布成功',
        message: '可前往商品列表查看',
      })

      this.handleBack();
    })
  }

  // 加载二级类目
  loadCategory() {
    const firstCategory = this.serviceForm.firstCategory;
    console.log('firstCategory', firstCategory)

    this.loginService.getRequest(loginInterface.getsecondcategory, { id: firstCategory }).
      subscribe((data: any) => {
        if (!data || data.errno) {
          return void 0;
        }

        this.secondCategoryList = data.data || [];
      })
  }

  // 返回
  handleBack() {
    if (!this.release) {
      this.release = true;
      this.serviceForm = {
        name: '',
        firstCategory: '',
        categoryId: '',
        address: '',
        retailPrice: '',
        picUrl: '',
        pickerList: [],
      };
      return void 0;
    }

    this.navCtrl.back();
  }

  // 查看服务详情
  viewService() {
    this.navCtrl.navigateForward('/view-service');
  }

  async handleOrder(operate: string) {
    let alert: HTMLIonAlertElement;
    switch (operate) {
      case 'refuse':
      case 'receive':
      default:
    }

    alert = await this.alertCtrl.create({
      header: '请确认',
      message: '接单成功后可以在"我换订单-待服务"中查看',
      buttons: [
        {
          text: '确定',
          handler: () => {
            console.log('Confirm Cancel');
            this.navCtrl.navigateRoot('/orders');
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
      ]
    });

    await alert.present();
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

      switch (this.uploadType) {
        case 'avatar':
          this.serviceForm.picUrl = fileMap.url;
          break;
        default:
          this.serviceForm.pickerList.push(fileMap.url);
      }

    });
  }
}
