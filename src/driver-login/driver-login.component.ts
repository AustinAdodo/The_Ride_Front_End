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

  login(): void {
    const headers = {'content-type': 'application/x-www-form-urlencoded'};
    const body = `username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}`;
    this.http.post<any>(`${baseUri}/login`, body, {headers: headers})
      .subscribe({
        next: (response) => {
          if (response.token) {
            this.authService.login(response.token);
          }
          this.router.navigate(['/drive/home']).then(r => console.log("Navigation to /drive/home successful."))
            .catch(e => console.log("Navigation to /drive/home failed"));
        },
        error: (error) => {
          console.error('Driver Login failed', error);
          this.errorMessage = 'Driver Login failed: ' + (error.error.message || 'Unknown error');
        }
      });
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
