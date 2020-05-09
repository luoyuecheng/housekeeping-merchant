import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  activeType;
  //
  modalType = {
    certification: {
      key: 'certification',
      title: '我的认证',
    }
  }

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      console.log('queryParams', param)
      this.activeType = this.modalType[param.key];
    })
  }

  // 去认证
  goCertification() {
    this.navCtrl.navigateForward('/certification');
  }

  handleBack() {
    this.navCtrl.back();
  }
}
