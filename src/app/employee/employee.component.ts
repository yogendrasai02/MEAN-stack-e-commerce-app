import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @ViewChild('formRef') formRef!: NgForm;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    let submittedEmail = this.formRef.value.email;
    let submittedPassword = this.formRef.value.password;
    let empObj = {
      empMail: submittedEmail,
      password: submittedPassword
    };
    this.employeeService.login(empObj).subscribe(result => {
      if (result["status"] === "ok") {
        sessionStorage.removeItem("empSessionId");
        sessionStorage.removeItem("empObj");
        let empObj = JSON.parse(JSON.stringify(result["empObj"]));
        sessionStorage.setItem("empSessionId", result["empSessionId"]);
        sessionStorage.setItem("empObj", empObj.toString());
        let role = empObj["role"].toLowerCase();
        let url;
        if (role === "super admin") {
          url = "super-admin";
        }
        else if (role === "inventory admin") {
          url = "inventory-admin";
        }
        else if (role === "delivery admin") {
          url = "delivery-admin";
        }
        else {
          url = 'employee';
        }
        this.router.navigate([url]);
      }
      else {
        if (result["status"] === "failed")
          alert("Invalid username or password");
        else
          alert("There is an issue with the website, kindly try after sometime");
      }
    }, err => {
      console.log(err);
    });
  }
}
