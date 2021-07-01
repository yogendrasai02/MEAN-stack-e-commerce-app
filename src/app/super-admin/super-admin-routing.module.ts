import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperAdminComponent } from './super-admin.component';

const routes: Routes = [
  { path: 'dashboard', component: SuperAdminComponent },
  { path: '', redirectTo:'dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
