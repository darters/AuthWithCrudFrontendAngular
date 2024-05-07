import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  constructor() {
  }

  public checkTokenExpiry(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      const expiryDate = decodedToken.exp * 1000;
      return expiryDate < Date.now();
    }
    return true;
  }
  public decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    // @ts-ignore
    return sessionStorage.getItem(TOKEN_KEY);
  }

  // @ts-ignore
  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    // @ts-ignore
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  logout(): void{
    window.sessionStorage.clear();
  }
}
