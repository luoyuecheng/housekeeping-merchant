import { Component } from '@angular/core';

export interface Nav {
  title: string;
  key: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  // nav 导航配置
  navs: Array<Nav> = [
    { title: '待服务', key: 'toBeServed' },
    { title: '服务中', key: 'serving' },
    { title: '已完成', key: 'completed' },
    { title: '全部', key: 'all' },
  ]

  // 当前选择的导航项
  activeNav: Nav;

  // 订单管理
  orders;

  constructor() {
    this.activeNav = this.navs[0];
  }

  // 选择查看 nav 类型
  handleNav(nav: Nav) {
    if (this.activeNav.key === nav.key) {
      return void 0;
    }

    this.activeNav = nav;
  }
}
