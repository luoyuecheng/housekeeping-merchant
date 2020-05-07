import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyServicePageRoutingModule } from './my-service-routing.module';

import { MyServicePage } from './my-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyServicePageRoutingModule
  ],
  declarations: [MyServicePage]
})
export class MyServicePageModule {}
