import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    FormsModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
