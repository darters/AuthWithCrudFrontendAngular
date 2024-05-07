import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../service/employee.service";
import {Employee} from "../../../models/Employee";
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {TrimFormControl} from "../helper/TrimFormControl";

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    NgIf
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit{
  form!: FormGroup
  employee!: any;
  employeeId!: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number}
  ) {
  }
  submit() {
    let originalEmployee: Employee;
    const updatedEmployee: Employee = {
      id: this.employee.id,
      fullName: this.form.value.fullName,
      salary: this.form.value.salary,
      company: this.form.value.company
    };

    const subscription: Subscription = this.employeeService.getEmployee(this.employeeId)
      .subscribe((employee: any) => {
        originalEmployee = employee;
        const compareEmployee = this.employeeService.equals(updatedEmployee, originalEmployee)

        if (compareEmployee) {
          console.log("Employee data was not changed");
        } else {
          this.employeeService.addEmployee(updatedEmployee)
            .subscribe(() => {
              this.router.navigate([''])
              console.log("Employee edited successfully");
              window.location.reload()
            });
        }
        subscription.unsubscribe();
      });
    this.closeDialog();
  }

  createForm() {
    return this.formBuilder.group({
      fullName: new TrimFormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(40)]),
      salary: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^\d+$/)]),
      company: new TrimFormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)])
    })
  }
  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.employeeId = this.data.id
    this.form = this.createForm();
    this.employeeService.getEmployee(this.employeeId)
      .subscribe(data => {
        this.employee = data;
      })
  }
}
