import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialog, MatDialogActions, MatDialogContent} from '@angular/material/dialog';
import {DriverModalComponent} from '../driver-modal/driver-modal.component';
import {WebSocketService} from "../services/WebSocketService";
import {Payload} from "../payload/Payload";
import {Subscription} from "rxjs";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";

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
    CommonModule,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './user-profile-dashboard.component.html',
  styleUrls: ['./user-profile-dashboard.component.css']
})

export class UserProfileDashboardComponent implements OnInit, OnDestroy {
  userHasNotBooked: boolean = true;
  private messagesSubscription!: Subscription;
  recentTrips: RecentTrip[] = [];
  favoritePlaces: FavoritePlace[] = [];
  showForm: boolean = false;
  mastercard: string = '/assets/mastercard.png';
  shouldBeHidden: boolean = true;
  private userdata: Payload = new Payload({sex:'male',rating:5.0,name:'Adodo Austin'});

  UserForm = new FormGroup({
    firstName: new FormControl('Austin',),
    Location: new FormControl('Ikeja City Mall'),
    Destination: new FormControl('', Validators.required),
    sex: new FormControl('male'),
    lastName: new FormControl('Adodo'),
    rating: new FormControl(5.0),
    photograph: new FormControl('/assets/Adodo_Austin.jpg')
  });

  constructor(private webSocketService: WebSocketService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadRecentTrips();
    this.loadFavoritePlaces();
    this.messagesSubscription = this.webSocketService.driverUpdateMessages.subscribe(
      (message: Payload) => {
        //each message updates from driver are shown in real time.
        console.log('Message received:', message);
        console.log('Attempting to open modal');
        this.showDriverModal(message);
      }
    );
  }

  loadRecentTrips(): void {
    this.recentTrips = [
      {destination: 'Park-Lane', date: '2024-03-22', status: 'Completed'},
      {destination: 'Country Club', date: '2024-02-15', status: 'Completed'}
    ];
  }

  loadFavoritePlaces(): void {
    this.favoritePlaces = [
      {name: 'Ikeja City Mall', location: 'Lagos'},
      {name: 'Black bell Restaurant', location: 'Lagos'}
      // Add more places here
    ];
  }

  showDriverModal(driverData: Payload) {
    this.dialog.open(DriverModalComponent, {
      width: '250px',
      data: driverData,
      position: {top: '10px'},
      disableClose: true
    });
  }

  sendCustomerTripRequest() {
    const name = `${this.UserForm.get('firstName')?.value} ${this.UserForm.get('lastName')?.value}`;
    const address = this.UserForm.get('Location')?.value ?? ''
    const currentUserPayload: Payload = new Payload({
      sex: this.UserForm.get('sex')?.value ?? "",
      message: `You have a new request from ${name}, currently at ${address}.
        Hey!, I Would be glad if you could pick me up.`,
      name: name,
      phoneNumber: '09384721',
      rating: this.UserForm.get('rating')?.value ?? 0.0,
      photoUrl: this.UserForm.get('photograph')?.value ?? '',
      type: 'New trip',
      location: address
    });
    this.showForm = !this.showForm;
    return this.webSocketService.sendCustomerTripRequest(currentUserPayload);
  }

  getRatingArray() {
    return Array(Math.round(this.userdata.rating)).fill(0).map((x, i) => i);
  }

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

}
