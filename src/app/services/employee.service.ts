import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { EmploymentDetails } from '../models/domains/employmentDetails.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url: string = "http://localhost:8080/api/employee"

  private employeeSource = new BehaviorSubject<EmploymentDetails>(new EmploymentDetails());
  public employeeObserver = this.employeeSource.asObservable();

  constructor(private _http: HttpClient) { }

  public getEmployeeDetails(identityNo: number): Observable<EmploymentDetails> {
    return this._http.get<EmploymentDetails>(this.url + '/' + identityNo);
  }
  public set employee(employee: EmploymentDetails) {
    this.employeeSource.next(employee);
  }
}
