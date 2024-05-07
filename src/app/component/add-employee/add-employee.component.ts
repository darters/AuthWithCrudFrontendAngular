import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmployeeService} from "../../service/employee.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {TrimFormControl} from "../helper/TrimFormControl";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    NgIf
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: '../edit-employee/edit-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit{
  form!: FormGroup
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<AddEmployeeComponent>
  ) {
  }
  submit() {
    const employee: any = {
      fullName: this.form.value.fullName,
      salary: this.form.value.salary,
      company: this.form.value.company
    };
    this.employeeService.addEmployee(employee)
      .subscribe(() => {
        console.log("New User")
        window.location.reload();
      })
    this.router.navigate(['']);
    this.closeDialog()
  }

  createForm() {
    return this.formBuilder.group({
      fullName: new TrimFormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(40)]),
      salary: new TrimFormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^\d+$/)]),
      company: new TrimFormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)])
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.form = this.createForm();
  }
}
