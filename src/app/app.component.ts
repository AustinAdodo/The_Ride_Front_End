// second terminal window ng serve --port 4201
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../services/AuthService';
import { filter } from "rxjs/operators";
import { HttpClient, HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Ride';
  showMainContent: boolean = false;

  constructor(private router: Router, public authService: AuthService, private http: HttpClient) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showMainContent = event.url === '/' || event.url === '/index';
    });
  }

  ngOnInit() {
  }

  logout() {
    this.http.post('/logout', {}).subscribe(
      () => {
        this.authService.logout();
        this.router.navigate(['/login']).then(_ => {});
      },
      (error: any) => {
        console.error('Logout failed:', error);
      }
    );
  }
}
