import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {Payload} from "../payload/Payload";

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  baseUrl=  environment.baseUri;
  private driverData!:Payload;
  constructor() { }

  setDriverData(data: Payload): void {
    this.driverData = data;
  }

  getDriverData(): any {
    return this.driverData;
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
