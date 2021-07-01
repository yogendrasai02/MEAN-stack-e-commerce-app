import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-inv-nav',
  templateUrl: './inv-nav.component.html',
  styleUrls: ['./inv-nav.component.css']
})
export class InvNavComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  logout() {
    this.employeeService.logout();
  }

}
