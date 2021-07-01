import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryAdminComponent } from './delivery-admin.component';

const routes: Routes = [{ path: '', component: DeliveryAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryAdminRoutingModule { }
