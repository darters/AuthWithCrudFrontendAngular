import {Component, OnInit} from '@angular/core';
import {MatError, MatFormField, MatFormFieldModule, SubscriptSizing} from "@angular/material/form-field";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {LoginRequest} from "../../request/LoginRequest";
import {TokenStorageService} from "../../service/token-storage.service";
import {NgIf, NgStyle} from "@angular/common";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField, MatCardHeader, MatCardTitle, MatCard, MatCardContent, RouterLink, ReactiveFormsModule, NgIf, MatError, MatInput, MatFormFieldModule, NgStyle
  ],
  templateUrl: './login.component.html',
  styleUrl: './form.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
  }

  submit() {
    const logInRequest: LoginRequest = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.userService.login(logInRequest)
      .subscribe(
        (data: any) => {
          if (!data && data.token) {
            console.error("Token is missing in the response data.");
          }
          const token = data.token;
          this.tokenStorage.saveToken(token);
          const user = this.userService.getUser(3)
          this.tokenStorage.saveUser(user);
          const getUser = this.tokenStorage.getUser()
        },
        error => {
          console.log("Something went wrong during login:", error);
        }, () => {
          this.router.navigate(['/'])
        }
      );
  }

  register() {
    this.router.navigate(['/register'])
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
    });
  }
}
