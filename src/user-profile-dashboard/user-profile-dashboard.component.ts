import { Component, OnInit } from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

interface RecentTrip {
  destination: string;
  date: string;
  status: string;
}

interface FavoritePlace {
  name: string;
  location: string;
}

@Component({
  selector: 'app-user-profile-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage,
    CommonModule
  ],
  templateUrl: './user-profile-dashboard.component.html',
  styleUrls: ['./user-profile-dashboard.component.css']
})
export class UserProfileDashboardComponent implements OnInit {
  recentTrips: RecentTrip[] = [];
  favoritePlaces: FavoritePlace[] = [];
  showForm: boolean = false;
  Rating : string = '/assets/5stars.png';
  mastercard :string= '/assets/mastercard.png';

  constructor() { }

  ngOnInit(): void {
    this.loadRecentTrips();
    this.loadFavoritePlaces();
  }

  loadRecentTrips(): void {
    this.recentTrips = [
      { destination: 'Park-Lane', date: '2024-03-22', status: 'Completed' },
      { destination: 'Country Club', date: '2024-02-15', status: 'Completed' }
    ];
  }

  loadFavoritePlaces(): void {
    this.favoritePlaces = [
      { name: 'Ikeja City Mall', location: 'Lagos' },
      { name: 'Black bell Restaurant', location: 'Lagos' }
      // Add more places here
    ];
  }
  onSubmit() {
    // Handle form submission here
    console.log('Form submitted');
    this.showForm = false;
  }
}
