import {Component, OnInit} from '@angular/core';
import {GoogleMap, MapMarker} from "@angular/google-maps";
import mapboxgl, {baseApiUrl} from 'mapbox-gl';
import {NgForOf, NgIf} from "@angular/common";
import { DriverService } from '../services/DriverService';
import {environment} from '../environments/environment';

const apiKey = environment.googleMapsApiKey;
const map_Box_key = environment.mapBoxGlAccessToken;
//User lat: 3.3581 and long: 6.6144

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    MapMarker,
    GoogleMap,
    NgForOf,
    NgIf
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements OnInit {
  isMapBoxMapToBeDisplayed: boolean = true;
  isGoogleMapsToBeDisplayed: boolean = false;
  mapOptions: google.maps.MapOptions = {
    center: new google.maps.LatLng(3.3792, 6.5244), // default
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  //mapbox
  map: mapboxgl.Map | undefined;
  styleURL = 'mapbox://styles/mapbox/streets-v11';
  accessToken = map_Box_key;
  cars: { lat: number, lng: number, color: string }[] = [];

  constructor(private driverService: DriverService) {
  }

  /**
   * Updates car positions periodically (replace with actual data fetching logic).
   *
   * latitude and longitude are randomly changed
   *
   */

  ngOnInit(): void {
    this.getDrivers();
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.styleURL,
      center: [3.3581, 6.6144], // Lagos coordinates [3.3792, 6.5244],
      zoom: 13,
      accessToken: this.accessToken
    });

    // Generate
    for (let i = 0; i < 30; i++) {
      const randomLat = 6.45 + Math.random() * 0.2;
      const randomLng = 3.35 + Math.random() * 0.3;
      const randomColor = this.getRandomColor();
      this.cars.push({lat: randomLat, lng: randomLng, color: randomColor});
    }

    //add real drivers
    const uri: string = `${baseApiUrl}/drivers`;


    this.cars.forEach(car => {
      new mapboxgl.Marker({color: car.color})
        .setLngLat([car.lng, car.lat])
        .addTo(this.map!);
    });

    /**
     * simulates intervals for change in positions of cars.
     */

    setInterval(() => {
      this.cars.forEach(car => {
        car.lat += Math.random() * 0.001;
        car.lng += Math.random() * 0.001;
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
    const minLat = 0; // Set your minLat
    const maxLat = 0; // Set your maxLat
    const minLon = 0; // Set your minLon
    const maxLon = 0; // Set your maxLon

    this.driverService.getDriversWithinBoundingBoxCoordinates(minLat, maxLat, minLon, maxLon)
      .then(drivers => {
        console.log('Drivers:', drivers);
      })
      .catch(error => {
        console.error('Error: Close by Drivers could not be retrieved', error);
      });
  }
}
