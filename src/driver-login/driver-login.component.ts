import {Component} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-driver-login',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './driver-login.component.html',
  styleUrl: './driver-login.component.css'
})
export class DriverLoginComponent {
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
