import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyServicePage } from './my-service.page';

const routes: Routes = [
  {
    path: '',
    component: MyServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyServicePageRoutingModule {}
