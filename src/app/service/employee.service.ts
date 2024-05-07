import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../../models/Employee";

const API = "http://localhost:8080/api/"
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any> {
    return this.http.get(API + 'getAll')
  }
  removeEmployee(employeeId: number): Observable<any> {
    console.log("Delete")
    return this.http.delete(API + `deleteEmployee/${employeeId}`)
  }
  addEmployee(employee: Employee) {
    return this.http.post(API + "addEmployee", employee)
  }
  getEmployee(employeeId: number) {
    return this.http.get(API + `${employeeId}`)
  }

  equals(employee1: Employee, employee2: Employee): boolean{
    return (
      employee1.fullName === employee2.fullName &&
      employee1.salary === employee2.salary &&
      employee1.company === employee2.company
    );
  }

}
