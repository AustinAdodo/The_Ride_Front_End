import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {BehaviorSubject, Observable} from "rxjs";
import {UserDataPayload} from "../payload/UserDataPayload";

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  baseUrl=  environment.baseUri;
  private driverDataSubject = new BehaviorSubject<UserDataPayload | null>(null);
  constructor() { }

  setDriverData(data: UserDataPayload): void {
    this.driverDataSubject.next(data);
  }

  getDriverData(): Observable<UserDataPayload | null> {
    return this.driverDataSubject.asObservable();
  }

  async getDriversWithinBoundingBoxCoordinates(minLat: number, maxLat: number, minLon: number, maxLon: number): Promise<any> {
    const url = `${(this.baseUrl)}/drivers?minLat=${minLat}&maxLat=${maxLat}&minLon=${minLon}&maxLon=${maxLon}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Something went wrong or Network response was not ok');
      } else {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
