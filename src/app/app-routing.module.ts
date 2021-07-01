import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'super-admin', loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule) },
  { path: 'inventory-admin', loadChildren: () => import('./inventory-admin/inventory-admin.module').then(m => m.InventoryAdminModule) },
  { path: 'delivery-admin', loadChildren: () => import('./delivery-admin/delivery-admin.module').then(m => m.DeliveryAdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
