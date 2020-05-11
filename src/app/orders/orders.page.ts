import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Params, ActivatedRoute } from '@angular/router';
import { LoginService, OrderStatus } from '../services/login.service';
import { loginInterface } from '../services/login.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  public category;
  public orders;

  orderStatus = OrderStatus;

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
    this.loginService.getRequest(loginInterface.queryOrder, { orderStatus: this.orderStatus.unpaid }).
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
  handleOrder(order, status: OrderStatus) {
    const url = `${loginInterface.updateOrderStatus}?orderStatus=${status}&id=${order.id}`;

    this.loginService.putRequest(url).subscribe((data: any) => {
      if (!data || data.errno) {
        return void 0;
      }

      if (status === this.orderStatus.unserved) {
        this.navCtrl.navigateRoot('/tabs/tab3');
      }

      this.searchOrders();
    })
  }
}
