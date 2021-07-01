import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(empObj: { empMail: string, password: string }): Observable<any>{
    return this.httpClient.post("employee/login", empObj);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/employee']);
  }

}
