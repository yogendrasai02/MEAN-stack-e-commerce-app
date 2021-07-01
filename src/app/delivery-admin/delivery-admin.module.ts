import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryAdminRoutingModule } from './delivery-admin-routing.module';
import { DeliveryAdminComponent } from './delivery-admin.component';


@NgModule({
  declarations: [DeliveryAdminComponent],
  imports: [
    CommonModule,
    DeliveryAdminRoutingModule
  ]
})
export class DeliveryAdminModule { }
