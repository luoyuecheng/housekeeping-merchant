import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
  ) { }

  ngOnInit() {}

  handleRoute(route: string) {
    if (!route) {
      // route = '/';
      this.loginService.alertTip({
        header: '此功能程序员正在开发中，请稍等...'
      });
      return void 0;
    }

    this.navCtrl.navigateForward(route);
  }
}
