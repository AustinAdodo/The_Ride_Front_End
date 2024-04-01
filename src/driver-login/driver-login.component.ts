import {Component} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {environment} from "../environments/environment";
import {AuthService} from "../services/AuthService";

const baseUri: string = environment.baseUri;

@Component({
  selector: 'app-driver-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './driver-login.component.html',
  styleUrl: './driver-login.component.css'
})
export class DriverLoginComponent {
  username: string = "";
  password: string = "";
  errorMessage: string = "";
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  login() {
    const credentials = {
      username: this.username,
      password: this.password
    };
    this.http.post<any>(`${baseUri}/login`, credentials)
      .subscribe(
        () => {
          this.authService.login();
          console.log('Attempting to navigate to /drive/home');
          this.router.navigate(['/drive/home']).then(success => {
            if (success) {
              console.log('Navigation to /drive/home successful');
            } else {
              console.log('Navigation to /drive/home failed');
            }
          }).catch(error => {
            console.error('Navigation error:', error);
          });
        },
        (error) => {
          this.errorMessage = error.error.message || 'An error occurred during login.';
        }
      );
  }

  logout() {
    this.http.post('/logout', {}).subscribe(
      () => {
        this.router.navigate(['/drive/login']).then(r => this.isLoggedIn = false);
      },
      (error: any) => {
        // Handle error
        console.error('Logout failed:', error);
        this.errorMessage = 'Logout failed';
      }
    );
  }
}
