import {Component, OnInit} from '@angular/core';
import {WebSocketService} from "../services/WebSocketService";
import {MatIcon} from "@angular/material/icon";
import {Payload} from "../payload/Payload";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatTab, MatTabGroup, MatTabsModule} from "@angular/material/tabs";

@Component({
  selector: 'app-driver-profile-dashboard',
  standalone: true,
  imports: [
    MatIcon,
    CurrencyPipe,
    MatButton,
    NgIf,
    NgForOf,
    MatTabGroup,
    MatTab,
    MatTabsModule
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
    firstname: 'John',
    username: 'johnDoe',
    rating: 4.5,
    totalEarnings: 12000,
    tips: 1500,
    totalTrips: 120,
    middleName: '',
    lastname: "",
    carModel: '',
    vehiclePlateNumber: "",
    carColor: "",
    vehicleRegistrationStatus: "",
    registrationStatus: "",
    taxID: "",
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
    { amount: 300, date: '2023-05-01' },
    { amount: 450, date: '2023-05-02' }
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
