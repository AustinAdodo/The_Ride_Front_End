import {Component, OnInit, AfterViewInit, Inject, PLATFORM_ID} from '@angular/core';
//import {GoogleMap, MapMarker} from "@angular/google-maps";
import mapboxgl from 'mapbox-gl';
import {CommonModule} from "@angular/common";
import {DriverService} from '../services/DriverService';
import {environment} from '../environments/environment';
import {isPlatformBrowser} from '@angular/common';

const map_Box_key = environment.mapBoxGlAccessToken;

//User lat: 3.3581 and long: 6.6144

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, AfterViewInit {
  //Implement AfterViewInit
  isMapBoxMapToBeDisplayed: boolean = true;
  map: mapboxgl.Map | undefined;
  styleURL = 'mapbox://styles/mapbox/streets-v11';
  accessToken = map_Box_key;
  cars: Car[] = [];

  constructor(private driverService: DriverService, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  /**
   * Updates car positions periodically (replace with actual data fetching logic).
   *
   * latitude and longitude are randomly changed
   *
   */
  ngOnInit(): void {
    this.getDrivers();
  }

  ngAfterViewInit(): void {
    //this.initializeMap();
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
  }

  /**
   * map initialization
   */
  private initializeMap(): void {
    if (!this.map) {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.styleURL,
        center: [3.3581, 6.6144],
        zoom: 16,
        accessToken: this.accessToken
      });
      this.map.on('load', () => {
        this.addCarsToMap();
        this.simulateCarMovement();
      });
    }
  }

  private createCarMarker(car: Car): mapboxgl.Marker {
    if (isPlatformBrowser(this.platformId)) {
      const el = document.createElement('div');
      el.innerHTML = `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="fill: ${car.color};">
        <rect x="20" y="40" width="60" height="20" rx="5"/>
        <circle cx="30" cy="70" r="10"/>
        <circle cx="70" cy="70" r="10"/>
        <circle cx="30" cy="30" r="10"/>
        <circle cx="70" cy="30" r="10"/>
      </svg>
    `;
      //el.className = 'fa fa-car';
      // el.innerText = '🚗';
      el.style.fontSize = '40px';
      el.style.color = car.color;
      el.style.textShadow = '0 0 3px #000';
      el.style.backgroundSize = 'cover';
      el.style.width = '50px';
      el.style.height = '50px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      return new mapboxgl.Marker(el).setLngLat([car.lng, car.lat]);
    }
    return new mapboxgl.Marker();
  }

  private addCarsToMap() {
    const targetCar: Car = {lat: 3.3581, lng: 6.6144, color: this.getRandomColor()};
    targetCar.marker = this.createCarMarker(targetCar).addTo(this.map!);
    this.cars.push(targetCar);
    for (let i = 0; i < 15; i++) {
      const randomLat = 3.358 + ((Math.random() * 0.001) - 0.0005);
      const randomLng = 6.614 + ((Math.random() * 0.001) - 0.0005);
      const randomColor = this.getRandomColor();
      const car: Car = {lat: randomLat, lng: randomLng, color: randomColor};
      car.marker = this.createCarMarker(car).addTo(this.map!);
      this.cars.push(car);
    }
  }

  private simulateCarMovement() {
    setInterval(() => {
      this.cars.forEach(car => {
        const latAdjustment = (Math.random() - 0.5) * 0.002;
        const lngAdjustment = (Math.random() - 0.5) * 0.002;
        car.lat = Math.min(Math.max(car.lat + latAdjustment, 3.3580), 3.3581);
        car.lng = Math.min(Math.max(car.lng + lngAdjustment, 6.6143), 6.6145);

        // Update the marker position
        if (car.marker) {
          car.marker.setLngLat([car.lng, car.lat]);
        }
      });
    }, 1000);
  }

  /**
   * Generates random color for certain cars, for evaluation purposes only
   */

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getDrivers(): void {
    const minLat = 3.3575;
    const maxLat = 3.3585;
    const minLon = 6.6142;
    const maxLon = 6.6146;

    this.driverService.getDriversWithinBoundingBoxCoordinates(minLat, maxLat, minLon, maxLon)
      .then(drivers => {
        console.log('Drivers:', drivers);
      })
      .catch(error => {
        console.error('Error: Close by Drivers could not be retrieved', error);
      });
  }
}

interface Car {
  lat: number;
  lng: number;
  color: string;
  marker?: mapboxgl.Marker; // Optional marker property
}
