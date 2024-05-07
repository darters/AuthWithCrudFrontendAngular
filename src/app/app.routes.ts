import {Routes} from '@angular/router';
import {AddEmployeeComponent} from "./component/add-employee/add-employee.component";
import {AppComponent} from "./app.component";
import {AllEmployeeComponent} from "./component/all-employee/all-employee.component";
import {EditEmployeeComponent} from "./component/edit-employee/edit-employee.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {AuthGuardService} from "./guards/auth-guard.service";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: AppComponent, children:[
      {path: '', component: AllEmployeeComponent, canActivate: [AuthGuardService]},
      {path: 'addEmployee', component: AddEmployeeComponent, canActivate: [AuthGuardService]},
      {path: 'editEmployee', component: EditEmployeeComponent, canActivate: [AuthGuardService]},
      {path: 'editEmployee/:id', component: EditEmployeeComponent, canActivate: [AuthGuardService]}
    ], canActivate: [AuthGuardService]}
];
