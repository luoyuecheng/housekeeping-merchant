import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public messageList = [
    { id: 1, name: '热门推送', avatar: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y' },
    // { id: 2, name: '到家私厨', avatar: '到家' },
  ];


  constructor(
    private navCtrl: NavController,
  ) {}

  handleMessage(message) {
    const queryParams: Params = {
      ...message,
      key: 'message',
      title: message.name,
    }

    this.navCtrl.navigateForward('/modal', { queryParams });
  }
}
