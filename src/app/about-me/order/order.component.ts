import { Component, OnInit, Input } from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  NavController,
} from '@ionic/angular';

// import {
//   OrderService
// } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() name: string;
  public title: string;
  public key: number;
  public navs = [
    { title: '待确认', id: 0 },
    { title: '待服务', id: 1 },
    { title: '待支付', id: 2 },
    { title: '待评价', id: 3 },
    { title: '全部', id: 4 },
  ]

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    // private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      console.log('queryParams', param)
      this.title = param.title || '全部';
      this.name = param.name;

      if (param.key !== void 0) {
        const nav = this.navs.find(item => item.id === param.key) || { title: '全部', id: 4 };
        this.title = nav.title;
        this.key = param.key;
      }
    })

    // this.orderService.getArticle(1);
  }

  handleBack() {
    this.navCtrl.back();
  }

  handleNav(nav) {
    this.title = nav.title;
  }
}
