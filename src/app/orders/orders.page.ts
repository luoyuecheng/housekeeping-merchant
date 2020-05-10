import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Params, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { loginInterface } from '../services/login.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  public category;
  public orders;

  constructor(
    private loginService: LoginService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.category = param;

      this.searchOrders();
    })
  }

  // 搜索订单
  searchOrders() {
    this.loginService.getRequest(loginInterface.getGoodsByParam, { categoryId: this.category.id }).
      subscribe((data: any) => {
        if (!data || data.errno) {
          return void 0;
        }
        const { data: orderData = {} } = data;
        const { list = [] } = orderData;
      this.orders = list;
    })
  }

  // 返回
  handleBack() {
    this.navCtrl.back();
  }

  // 接单 / 拒单
  handleOrder(type: string) {
    switch (type) {
      // 拒单
      case 'refuse':
        this.loginService.postRequest(loginInterface.refuseApi, {}).subscribe((data: any) => {
          // 拒单后，重新检索订单
          this.searchOrders();
        })
        break;
      // 接单
      case 'receive':
        this.loginService.postRequest(loginInterface.receiveApi, {}).subscribe((data: any) => {
          this.navCtrl.navigateRoot('/tabs/tab3');
        })
        break;
      default:
    }
  }
}
