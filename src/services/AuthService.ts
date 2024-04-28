import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private tokenKey = 'auth_token';

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
      this.loggedIn.next(true);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  get isLoggedIn(): Observable<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      this.loggedIn.next(!!token);
    }
    return this.loggedIn.asObservable();
  }

  login(token: string): void {
    this.setToken(token);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      this.loggedIn.next(false);
    }
  }
}
