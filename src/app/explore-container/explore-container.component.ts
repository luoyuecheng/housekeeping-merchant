import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {}

  handleRoute(route: string) {
    if (!route) {
      route = '/';
    }

    this.navCtrl.navigateForward(route);
  }
}
