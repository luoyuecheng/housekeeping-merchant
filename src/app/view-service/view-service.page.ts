import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { LoginService } from '../services/login.service';
import { loginInterface } from '../services/login.interface';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.page.html',
  styleUrls: ['./view-service.page.scss'],
})
export class ViewServicePage implements OnInit {
  @ViewChild('content', { static: true }) detailContent: ElementRef<HTMLElement>;

  goodsId: string;
  goods;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.goodsId = param.id;
      this.loginService.getRequest(loginInterface.getGoodsDetailApi,
        { id: this.goodsId }).subscribe((data: any) => {
        if (!data || data.errno) {
          return void 0;
        }

        const { data: goodsData = {} } = data;
        const { info = {} } = goodsData;

        this.goods = info;
        console.log('data', info);
        this.detailContent.nativeElement.innerHTML = info.detail;
      })
    })
    // this.goods = {"name":"test1","firstCategory":1005001,"categoryId":1005008,"address":"","retailPrice":"23","picUrl":"http://http://8f6042df.ngrok.io/download/5z0vd073wp2qtkt65ugj.jpeg","goodsSn":"test1","detail":"\n        <section>\n          <img src=\"http://http://8f6042df.ngrok.io/download/bf66lvsf1d3qf1gku6jk.jpeg\" />\n        </section>\n        <section>\n          <img src=\"http://http://8f6042df.ngrok.io/download/xozxl310wm4u27xwv5gr.jpeg\" />\n        </section>"};
    // this.detailContent.nativeElement.innerHTML = this.goods.detail
  }

  // 返回
  handleBack() {
    this.navCtrl.back();
  }
}
