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

  login() {
    console.log('inside login');
    const credentials = {
      username: this.username,
      password: this.password
    };
    this.http.post<any>(`${baseUri}/login`, credentials)
      .subscribe(
        () => {
          this.authService.login();
          console.log('Attempting to navigate to /app-map');
          this.router.navigate(['/usermap']).then(success => {
            if (success) {
              console.log('Navigation to /app-map successful');
            } else {
              console.log('Navigation to /app-map failed');
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
}
