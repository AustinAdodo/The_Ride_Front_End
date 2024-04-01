import {Component, OnInit} from '@angular/core';
import {WebSocketService} from "../services/WebSocketService";
import {MatIcon} from "@angular/material/icon";
import {Payload} from "../payload/Payload";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatTab, MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-driver-profile-dashboard',
  standalone: true,
  imports: [CommonModule,
    MatIcon,
    CurrencyPipe,
    MatButton,
    MatTabGroup,
    MatTab,
    MatTabsModule,
  ],
  templateUrl: './driver-profile-dashboard.component.html',
  styleUrl: './driver-profile-dashboard.component.css'
})
export class DriverProfileDashboardComponent implements OnInit {
  private webSocketService: WebSocketService;

  constructor(webSocketService: WebSocketService) {
    this.webSocketService = webSocketService;
  }

  //get the current logged in driver
  driver = {
    firstname: 'Lawrence',
    username: 'odia@example.com',
    rating: 4.5,
    totalEarnings: 12000,
    tips: 1500,
    totalTrips: 120,
    middleName: '',
    lastname: "Driver",
    carModel: 'Audi Rs7',
    vehiclePlateNumber: "XCC9-0",
    carColor: "Blue",
    vehicleRegistrationStatus: "Registered",
    registrationStatus: "Complete",
    taxID: "NMI555789",
  };

  notification = {
    type: 'New trip',
    message: 'A new trip request from City Center to Green Park.'
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

  ngOnInit(): void {
  }

  declineTrip() {
  }

  acceptTrip() {
    const driverPayload = new Payload();
    driverPayload.sex = 'male';
    // Send the acceptance message
    this.webSocketService.sendDriverAcceptance(driverPayload);
  }

}
