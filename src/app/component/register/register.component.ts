import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {RegisterRequest} from "../../request/RegisterRequest";
import {NgIf} from "@angular/common";
import {TrimFormControl} from "../helper/TrimFormControl";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: '../login/form.component.scss'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
  }

  submit() {
    const registerRequest: RegisterRequest = {
      fullName: this.form.value.fullName,
      email: this.form.value.email,
      password: this.form.value.password,
    }

    this.userService.register(registerRequest)
      .subscribe(data => {
        console.log(data)
        console.log("Successfully registered")
        this.router.navigate(['/login'])
      }, error => {
        console.log("Something went wrong during registration" + JSON.stringify(error))
      })
  }
  login() {
    this.router.navigate(['/login'])
  }

  ngOnInit() {
    this.form = new FormGroup({
      fullName: new TrimFormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new TrimFormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
}
