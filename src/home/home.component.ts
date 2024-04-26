import { Component } from '@angular/core';
import {MapComponent} from "../map/map.component";
import {UserProfileDashboardComponent} from "../user-profile-dashboard/user-profile-dashboard.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MapComponent,
    UserProfileDashboardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
