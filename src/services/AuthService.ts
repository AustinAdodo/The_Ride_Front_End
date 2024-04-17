import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private tokenKey = 'auth_token';

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get isLoggedIn() {
    // const token = this.getToken();
    // // Implement logic to check if token is not expired based on its expiry time
    // return !!token; // For simplicity, just checking if token exists
    return this.loggedIn.asObservable(); //allow components to subscribe to the login state
  }

  constructor() { }

  login() {
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
  }
}
