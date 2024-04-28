import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import {environment} from "../environments/environment";
import {AuthService} from '../services/AuthService';

const baseUri: string = environment.baseUri;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    HttpClientModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  errorMessage: string = "";
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  /**
   * Login method.
   * <p></p>
   * NB: Spring Security expects (application/x-www-form-urlencoded).
   * <p></p>
   * @return {void}
   */

  login(): void {
    const headers = {'content-type': 'application/x-www-form-urlencoded'};
    const body = `username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}`;
    this.http.post<any>(`${baseUri}/login`, body, {headers: headers})
      .subscribe({
        next: (response) => {
          if (response.token) {
            this.authService.login(response.token);
          }
          this.router.navigate(['/home']).then(r => console.log("Navigation to Home Page Successful."));
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Login failed: ' + (error.error.message || 'Unknown error');
        }
      });
  }
}
