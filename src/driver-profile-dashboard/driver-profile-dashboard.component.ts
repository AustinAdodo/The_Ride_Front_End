import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from "../services/WebSocketService";
import {MatIcon} from "@angular/material/icon";
import {Payload} from "../payload/Payload";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatTab, MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-driver-profile-dashboard',
  standalone: true,
  imports: [CommonModule,
    MatIcon,
    CurrencyPipe,
    MatButton,
    MatTabGroup,
    MatTab,
    MatTabsModule, ReactiveFormsModule,
  ],
  templateUrl: './driver-profile-dashboard.component.html',
  styleUrl: './driver-profile-dashboard.component.css'
})

export class DriverProfileDashboardComponent implements OnInit, OnDestroy {
  private webSocketService: WebSocketService;
  private messagesSubscription!: Subscription;
  public userMessage = new Payload();
  protected shouldBeHidden: boolean = true;

  constructor(webSocketService: WebSocketService) {
    this.webSocketService = webSocketService;
  }

  ngOnInit(): void {
    this.messagesSubscription = this.webSocketService.userUpdateMessages.subscribe(
      (message: Payload) => {
        this.userMessage = message;
        console.log("Subscribed successfully via OnInit in DriverDashboardComponent")
        console.log(message);
        this.notification = {
          type: message.type,
          message: message.message
        };
      }
    );
  }

  //get the current logged in driver
  driver = {
    firstname: 'Austin',
    username: 'odia@example.com',
    rating: 5.0,
    totalEarnings: 12000,
    tips: 1500,
    totalTrips: 245,
    middleName: '',
    lastname: "Good-driver",
    carModel: 'Audi Rs7',
    vehiclePlateNumber: "XCC9-0",
    carColor: "Blue",
    vehicleRegistrationStatus: "Registered",
    registrationStatus: "Complete",
    taxID: "NMI555789",
  };

  //A new trip request from City Center to Green Park.
  notification = {
    type: this.userMessage.type,
    message: this.userMessage.message
  };

  recentTrips = [
    {destination: 'City Center to Eko Atlantic', date: '2023-04-01'},
    {destination: 'Maryland Mall to MM2 airport, Ikeja', date: '2023-06-22'},
    {destination: 'Fola Osibo, Lekki Ph1 to Sonibare Estate Ikeja', date: '2023-07-14'}
  ];

  incomingPayments = [
    {amount: 300, date: '2023-05-01'},
    {amount: 450, date: '2023-05-02'}
  ];

  DriverForm: FormGroup = new FormGroup({
    firstName: new FormControl('Austin',),
    sex: new FormControl('male'),
    lastName: new FormControl('Good-Driver'),
    rating: new FormControl(5.0),
    photograph: new FormControl('/assets/Adodo_Austin.jpg')
  });

  declineTrip() {
    this.notification.type = "None";
    this.notification.message="No new message";
    //driverService.Find_Next_Driver
  }

  acceptTrip() {
    const name = `${this.DriverForm.get('firstName')?.value} ${this.DriverForm.get('lastName')?.value}`;
    const sex = this.DriverForm.get('sex')?.value ?? "";
    const number = '09384721';
    const driverPayload: Payload = new Payload({
      sex: sex,
      message: `Driver is on ${sex === 'male' ? 'his' : 'her'} way. Call on ${number}`,
      name: name,
      phoneNumber:number,
      rating: this.DriverForm.get('rating')?.value ?? 0.0,
      photoUrl: this.DriverForm.get('photograph')?.value ?? '',
      type: 'None',
    });
    this.notification.type = "None";
    this.notification.message ="No Message";
    this.webSocketService.sendDriverAcceptance(driverPayload);
  }

  getRatingArray() {
    return Array(Math.round(this.driver.rating)).fill(0).map((x, i) => i);
  }

 /**
 * Lifecycle to destroy listeners and free up memory
  */
  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }
}
