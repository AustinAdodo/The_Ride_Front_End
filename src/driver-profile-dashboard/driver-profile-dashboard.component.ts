import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from "../services/WebSocketService";
import {MatIcon} from "@angular/material/icon";
import {Payload} from "../payload/Payload";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatTab, MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DriverService} from "../services/DriverService";
import {UserDataPayload} from "../payload/UserDataPayload";

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
  public driverData!: UserDataPayload | null;
  private subscription!: Subscription;
  public driver!: {
    firstname: string,
    username: string,
    rating: number,
    totalEarnings: number,
    tips: number,
    totalTrips:number,
    middleName: string,
    lastname: string,
    carModel: string,
    vehiclePlateNumber: string,
    carColor:string,
    vehicleRegistrationStatus: string,
    registrationStatus: string,
    taxID: string,
  };

  constructor(webSocketService: WebSocketService, private driverService: DriverService,) {
    this.webSocketService = webSocketService;
  }

  ngOnInit(): void {
    this.messagesSubscription = this.webSocketService.userUpdateMessages.subscribe(
      (message: Payload) => {
        this.userMessage = message;
        console.log("Subscribed successfully via OnInit in DriverDashboardComponent");
        console.log(message);
        this.notification = {
          type: message.type,
          message: message.message
        };
      }
    );
    this.subscription = this.driverService.getDriverData().subscribe(data => {
      this.driverData = data;
      this.updateDriver(data);
      console.log("Driver data has been successfully updated here in the Driver dashboard component:",
        JSON.stringify(this.driverData, null, 2));
    });
  }

  //get the current logged in driver
  private updateDriver(data: UserDataPayload | null): void {
    this.driver = {
      firstname: data?.firstName ?? 'Austin',
      username: data?.email ?? 'odia@example.com',
      rating: data ? data.rating ?? 0.0 : 5.0,
      totalEarnings: data ? 0.0 : 12000,
      tips: data ? 0 : 1500,
      totalTrips: data ? 0 : 245,
      middleName: data?.middleName ?? 'Odia',
      lastname: data?.lastName ?? "Good-driver",
      carModel: data?.carModel ?? 'Audi Rs7',
      vehiclePlateNumber: data?.carPlateNumber ?? "XCC9-0",
      carColor: data?.carColor ?? "Blue",
      vehicleRegistrationStatus: data ? 'Newly Registered' : "Registered",
      registrationStatus: data ? 'Complete' : "Complete",
      taxID: data?.taxID ?? "NMI555789",
    };
  }

  notification = {
    type: this.userMessage.type,
    message: this.userMessage.message
  };

  recentTrips = this.driverData != null || undefined ? [] : [
    {destination: 'City Center to Eko Atlantic', date: '2023-04-01'},
    {destination: 'Maryland Mall to MM2 airport, Ikeja', date: '2023-06-22'},
    {destination: 'Fola Osibo, Lekki Ph1 to Sonibare Estate Ikeja', date: '2023-07-14'}
  ];

  incomingPayments = this.driverData != null || undefined ? [] : [
    {amount: 300, date: '2023-05-01'},
    {amount: 450, date: '2023-05-02'}
  ];

  /**
   *Trip Acceptance Form.
   */
  DriverAcceptanceForm: FormGroup = new FormGroup({
    firstName: new FormControl('Austin',),
    sex: new FormControl('male'),
    lastName: new FormControl('Good-Driver'),
    rating: new FormControl(5.0),
    photograph: new FormControl('/assets/Adodo_Austin.jpg')
  });

  declineTrip() {
    this.notification.type = "None";
    this.notification.message = "No new message";
    //driverService.Find_Next_Driver
  }

  acceptTrip() {
    const name = `${this.DriverAcceptanceForm.get('firstName')?.value} ${this.DriverAcceptanceForm.get('lastName')?.value}`;
    const sex = this.DriverAcceptanceForm.get('sex')?.value ?? "";
    const number = '09384721';
    const driverPayload: Payload = new Payload({
      sex: sex,
      message: `Driver is on ${sex === 'male' ? 'his' : 'her'} way. Call on ${number}`,
      name: name,
      phoneNumber: number,
      rating: this.DriverAcceptanceForm.get('rating')?.value ?? 0.0,
      photoUrl: this.DriverAcceptanceForm.get('photograph')?.value ?? '',
      type: 'None',
    });
    this.notification.type = "None";
    this.notification.message = "No Message";
    this.webSocketService.sendDriverAcceptance(driverPayload);
  }

  getRatingArray() {
    return Array(Math.round(this.driver.rating)).fill(0).map((_x, i) => i);
  }

  /**
   * Lifecycle to destroy listeners and free up memory
   */
  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
