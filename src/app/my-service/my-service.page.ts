import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-my-service',
  templateUrl: './my-service.page.html',
  styleUrls: ['./my-service.page.scss'],
})
export class MyServicePage implements OnInit {
  @ViewChild('file', { static: true })
  fileButton: ElementRef<HTMLInputElement>;

  public uri: string = '';
  public pickerList = ['file:///D:/backup\ linux/photo.jpeg'];

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private http: HttpClient,
  ) { }

  ngOnInit() {
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

  handleFileButton() {
    this.fileButton.nativeElement.click();
  }

  // 上传文件
  uploadFile() {
    const fileButton = this.fileButton.nativeElement;
    const files = fileButton.files;
    const formData = new FormData();

    for (let i = 0, len = files.length; i < len; i++) {
      formData.append('file[]', files.item(i));
      console.log('files.item(i).name', files.item(i).name);
    }

    // 清空选择的文件
    fileButton.value = '';

    console.log(formData);
    this.http.post(this.uri, formData).pipe().subscribe((data) => {
    });
  }
}
