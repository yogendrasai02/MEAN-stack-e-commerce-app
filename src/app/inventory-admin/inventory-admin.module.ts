import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryAdminRoutingModule } from './inventory-admin-routing.module';
import { InventoryAdminComponent } from './inventory-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { InvNavComponent } from './inv-nav/inv-nav.component';
import { InvProfileComponent } from './inv-profile/inv-profile.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdCategoryComponent } from './upd-category/upd-category.component';
import { FormsModule } from '@angular/forms';
import { ShowProductsComponent } from './show-products/show-products.component';
import { AddProdComponent } from './add-prod/add-prod.component';
import { UpdProdComponent } from './upd-prod/upd-prod.component';

@NgModule({
  declarations: [InventoryAdminComponent, DashboardComponent, ProductsComponent, InvNavComponent, InvProfileComponent, AddCategoryComponent, UpdCategoryComponent, ShowProductsComponent, AddProdComponent, UpdProdComponent],
  imports: [
    CommonModule,
    FormsModule,
    InventoryAdminRoutingModule
  ]
})
export class InventoryAdminModule { }
