import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../../app/request/LoginRequest";
import {RegisterRequest} from "../../app/request/RegisterRequest";
const API = "http://localhost:8080/api/auth/"
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }
  register(user: RegisterRequest) {
    return this.http.post(API + 'signup', user)
  }
  login(user: LoginRequest) {
    return this.http.post(API + 'login', user)
  }

  getUser(userId: number) {
    return this.http.get(API + `${userId}`)
  }
}
