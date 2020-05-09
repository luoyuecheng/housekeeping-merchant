import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderComponent } from './order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      { path: 'order', component: OrderComponent },
    ])
  ],
  declarations: [OrderComponent],
  exports: [OrderComponent]
})
export class OrderComponentModule {}
