import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {provideRouter, RouterLink, RouterOutlet} from '@angular/router';
import {Router} from '@angular/router';
import {routes} from './app.routes';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Ride';

  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}
