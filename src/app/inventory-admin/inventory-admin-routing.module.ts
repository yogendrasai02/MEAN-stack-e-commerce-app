import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProdComponent } from './add-prod/add-prod.component';
import { InvProfileComponent } from './inv-profile/inv-profile.component';

import { InventoryAdminComponent } from './inventory-admin.component';
import { ProductsComponent } from './products/products.component';
import { ShowProductsComponent } from './show-products/show-products.component';
import { UpdCategoryComponent } from './upd-category/upd-category.component';
import { UpdProdComponent } from './upd-prod/upd-prod.component';

const routes: Routes = [
  { path: 'dashboard', component: InventoryAdminComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path:'products/show-products', component:ShowProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'add-product', component: AddProdComponent },
  { path: 'upd-product/:prodId', component: UpdProdComponent },
  { path: 'profile', component: InvProfileComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'upd-category/:categoryId', component: UpdCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryAdminRoutingModule { }