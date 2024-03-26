import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import { HttpClientModule } from '@angular/common/http';

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

  constructor(private http: HttpClient, private router: Router) {
  }

  login() {
    const credentials = {
      username: this.username,
      password: this.password
    };
    this.http.post<any>('/login', credentials)
      .subscribe(
        () => {
          this.router.navigate(['/app-map']);
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
  }

  logout() {
    this.http.post('/logout', {}).subscribe(
      () => {
        this.router.navigate(['/login']).then(r => this.isLoggedIn = false);
      },
      (error: any) => {
        // Handle error
        console.error('Logout failed:', error);
        this.errorMessage = 'Logout failed';
      }
    );
  }
}
