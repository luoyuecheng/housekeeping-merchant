import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMePage } from './about-me.page';

const routes: Routes = [
  {
    path: '',
    component: AboutMePage,
    children: [
      {
        path: '',
        loadChildren: () => import('./order/order.module').then(m => m.OrderComponentModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutMePageRoutingModule {}