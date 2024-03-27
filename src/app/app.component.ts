import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationEnd, provideRouter, RouterLink, RouterOutlet} from '@angular/router';
import {Router} from '@angular/router';
import {routes} from './app.routes';
import {filter} from "rxjs";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Ride';
  showMainContent: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showMainContent = event.url === '/' || event.url === '/home';
    });
  }

  ngOnInit() {
  }
}
