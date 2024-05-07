import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EmployeeService} from "../../service/employee.service";
import {Employee} from "../../../models/Employee";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {AddEmployeeComponent} from "../add-employee/add-employee.component";
import {MatDialog} from "@angular/material/dialog";
import {TokenStorageService} from "../../service/token-storage.service";
import {EditEmployeeComponent} from "../edit-employee/edit-employee.component";
import {UserService} from "../../service/user.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-all-employee',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    FormsModule,
    MatIcon,
    MatFormField,
    MatLabel
  ],
  templateUrl: './all-employee.component.html',
  styleUrl: './all-employee.component.scss'
})

export class AllEmployeeComponent implements OnInit {
  constructor (
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenStorageService,
    private tokenStorage: TokenStorageService,
    private employeeService: EmployeeService) {
    if (this.tokenStorage.checkTokenExpiry()) {
      this.router.navigate(['/login'])
    }
  }
  isLoaded: boolean = false;
  employees!: Employee[];
  username: string = ""

  filteredEmployees: Employee[] = [];
  searchText: string = '';

  addEmployeeBtn() {
    this.dialog.open(AddEmployeeComponent, {width:'500px', height:'400px'});
  }
  editEmployeeBtn(id: number) {
    this.dialog.open(EditEmployeeComponent, {width:'500px', height:'400px', data: {id: id}});
  }
  delete(employeeId: number) {
    this.employeeService.removeEmployee(employeeId)
      .subscribe(() =>
      {
        this.getAllEmployees();
      });
  }
  searchEmployee() {
    this.filteredEmployees = this.employees.filter((employee) =>
      employee.fullName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  getAllEmployees() {
    this.employeeService.getAllEmployees()
      .subscribe(data => {
        this.employees = data;
        this.isLoaded = true;

        this.filteredEmployees = [...this.employees]
      })
  }

  logout() {
    this.tokenService.logout();
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.getAllEmployees();

    const tokenData = this.tokenStorage.decodeToken(this.tokenStorage.getToken());
    const id = tokenData.id;
    this.userService.getUser(id)
      .subscribe((user: any) => {
        this.username = user.username;
      },    error => {
        console.error("Error fetching current user:", error);
      })
  }
}
