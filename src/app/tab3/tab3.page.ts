import { Component } from '@angular/core';
import { LoginService, OrderStatus } from '../services/login.service';
import { loginInterface } from '../services/login.interface';

export interface Nav {
  title: string;
  key: OrderStatus;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  orderStatus = OrderStatus;
  // nav 导航配置
  navs: Array<Nav> = [
    { title: '待服务', key: this.orderStatus.unserved },
    { title: '服务中', key: this.orderStatus.serving },
    { title: '已完成', key: this.orderStatus.userCompleted },
    { title: '全部', key: this.orderStatus.all },
  ]

  // 当前选择的导航项
  activeNav: Nav;

  // 订单管理
  orders;

  constructor(
    private loginService: LoginService,
  ) {
    this.activeNav = this.navs[0];
    this.queryOrderList(this.orderStatus.unserved);
  }

  // 查询订单
  queryOrderList(status: OrderStatus) {
    this.loginService.getRequest(loginInterface.queryOrder, { orderStatus: status }).subscribe((data: any) => {
      if (!data || data.errno) {
        return void 0;
      }

      const { data: orderData = {} } = data;
      const { list = [] } = orderData;
      this.orders = list;
    })
  }

  // 用户退款
  handleOrderStatus(order, status: OrderStatus) {
    const url = `${loginInterface.updateOrderStatus}?orderStatus=${status}&id=${order.id}`;

    this.loginService.putRequest(url).subscribe((data: any) => {
      if (!data || data.errno) {
        return void 0;
      }

      this.queryOrderList(this.activeNav.key);
    })
  }

  // 选择查看 nav 类型
  handleNav(nav: Nav) {
    // 重新查询订单
    this.queryOrderList(nav.key);

    if (this.activeNav.key === nav.key) {
      return void 0;
    }
    this.activeNav = nav;
  }
}
