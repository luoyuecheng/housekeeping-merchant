import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

import { LoginService } from '../services/login.service';
import { loginInterface } from '../services/login.interface';
import { Params } from '@angular/router';

export interface Category {
  id: string | number;
  name: string;
  [key: string]: any;
}

@Component({
  selector: 'app-direct',
  templateUrl: './direct.page.html',
  styleUrls: ['./direct.page.scss'],
})
export class DirectPage implements OnInit {
  // 一级类目
  firstCategoryList: Array<Category> = [];
  // 二级类目
  secondCategoryList: Array<Category> = [];
  // 选择的一级类型
  activeCategory: Category;

  constructor(
    private loginService: LoginService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    // 查询一级类目
    this.loginService.getRequest(loginInterface.getfirstcategory).subscribe((data: any) => {
      if (!data && data.errno) {
        return void 0;
      }

      const { data: firstCategory = [] } = data;

      if (firstCategory.length) {
        this.activeCategory = firstCategory[0];
        this.loadCategory(this.activeCategory);
      }

      this.firstCategoryList = firstCategory;
    })
  }

  // 加载二级类目
  loadCategory(firstCategory: Category) {
    if (!firstCategory) {
      return void 0;
    }

    this.activeCategory = firstCategory;

    this.loginService.getRequest(loginInterface.getsecondcategory, { id: firstCategory.id }).
      subscribe((data: any) => {
        if (!data || data.errno) {
          return void 0;
        }

        this.secondCategoryList = data.data || [];
      })
  }

  // 点击二级类型，查看订单
  handleCategory(category: Category) {
    const queryParams: Params = {
      ...category
    }
    this.navCtrl.navigateForward('/orders', { queryParams });
  }
}
