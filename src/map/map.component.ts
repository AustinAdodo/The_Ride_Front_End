import {Component, OnInit, AfterViewInit, Inject, PLATFORM_ID} from '@angular/core';
//import {GoogleMap, MapMarker} from "@angular/google-maps";
import mapboxgl from 'mapbox-gl';
import {CommonModule} from "@angular/common";
import {DriverService} from '../services/DriverService';
import {environment} from '../environments/environment';
import {isPlatformBrowser} from '@angular/common';

const map_Box_key = environment.mapBoxGlAccessToken;

//User Longitude: 3.3574689546003924, Latitude: 6.615497989673585

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
  isDefaultMarkerDisplayed: boolean = false;
  map: mapboxgl.Map | undefined;
  styleURL = 'mapbox://styles/mapbox/streets-v11';
  accessToken = map_Box_key;
  cars: Car[] = [];

  /**
   * PLATFORM_ID to ensure parsed environments are detected
   */
  constructor(private driverService: DriverService, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  /**
   * Updates car positions periodically (replace with actual data fetching logic).
   *
   * latitude and longitude are randomly changed
   *
   */
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //this.initializeMap();
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
      setTimeout(() => { // I am using setTimeout to ensure it runs in the next event loop cycle after view initialization
        const marker = document.querySelector('.marker-class');
        if (marker) {
          const style = window.getComputedStyle(marker);
          const isVisible = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
          console.log('Is marker visible:', isVisible);
        } else {
          console.log('Marker not found');
        }
      }, 1000);
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
        center: [3.3574689546003924, 6.615497989673585],
        zoom: 16,
        accessToken: this.accessToken
      });
      this.map.on('load', () => {
        this.addCarsToMap();
        this.simulateCarMovement();
      });
     //Onclick Testing goes here, removed after dev.
    }
  }

  private createCarMarker(car: Car): mapboxgl.Marker {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDefaultMarkerDisplayed) {
        // pins: default Mapbox marker
        return new mapboxgl.Marker({color: car.color})
          .setLngLat([car.lng, car.lat])
          .setPopup(new mapboxgl.Popup({offset: 25})
            .setHTML('<h3>' + car.color + ' Car</h3>'));
      }
      //cars
      else {
        const el = document.createElement('div');
        if (this.cars.indexOf(car) === 0 || this.cars.indexOf(car) === 3) {
          el.innerHTML = `
     <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="fill: ${car.color};">
    <g transform="rotate(-25, 25, 25)">
        <rect x="10" y="20" width="30" height="10" rx="2.5"/>
        <circle cx="15" cy="35" r="5"/>
        <circle cx="35" cy="35" r="5"/>
        <circle cx="15" cy="15" r="5"/>
        <circle cx="35" cy="15" r="5"/>
    </g>
</svg>
    `;
        }
        if (this.cars.indexOf(car) === 1) {
          el.innerHTML = `
     <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="fill: ${car.color};">
    <g transform="rotate(45, 25, 25)">
        <rect x="10" y="20" width="30" height="10" rx="2.5"/>
        <circle cx="15" cy="35" r="5"/>
        <circle cx="35" cy="35" r="5"/>
        <circle cx="15" cy="15" r="5"/>
        <circle cx="35" cy="15" r="5"/>
    </g>
</svg>
    `;
        }
        if (this.cars.indexOf(car) === 2) {el.innerHTML = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="fill: ${car.color};">
    <g transform="rotate(225, 50, 50)">
        <rect x="10" y="20" width="30" height="10" rx="2.5"/>
        <circle cx="15" cy="35" r="5"/>
        <circle cx="35" cy="35" r="5"/>
        <circle cx="15" cy="15" r="5"/>
        <circle cx="35" cy="15" r="5"/>
    </g>
</svg>
    `;}
        el.style.backgroundSize = 'cover';
        el.style.width = '50px';
        el.style.height = '50px';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
        el.style.fontSize = '40px';
        el.style.textShadow = '0 0 3px #000';
        el.className = 'marker-class';
        el.style.color = car.color;
        return new mapboxgl.Marker(el).setLngLat([car.lng, car.lat]);
      }
    }
    return new mapboxgl.Marker();
  }

  private addCarsToMap() {
    const car1: Car = {lat: 6.614145429497498, lng: 3.355658052660914, color: this.getRandomColor()};
    const car2: Car = {lat: 6.615722304876897, lng: 3.3583180928660283, color: this.getRandomColor()};
    const car3: Car = {lat: 6.61420935697511, lng: 3.354960864704509, color: this.getRandomColor()};
    const car4: Car = {lat: 6.613761864455057, lng: 3.3616324171555334, color: this.getRandomColor()};
    this.cars.push(car1);
    this.cars.push(car2);
    this.cars.push(car3);
    this.cars.push(car4);
    car1.marker = this.createCarMarker(car1).addTo(this.map!);
    car2.marker = this.createCarMarker(car2).addTo(this.map!);
    car3.marker = this.createCarMarker(car3).addTo(this.map!);
    car4.marker = this.createCarMarker(car4).addTo(this.map!);
  }

  private simulateCarMovement() {
    const longitudes1 = [3.355658052660914, 3.3561514472160923, 3.356408870461337, 3.3566770196756863,
      3.3573420297261976, 3.357567275067055,
      3.357771068469731];
    const longitudes2 = [3.3583073668984014, 3.35841462658351, 3.358500434331944, 3.358672049828755,
      3.3588436653270435, 3.3592834300381753, 3.359766098624334];
    const longitudes3 = [3.354875056956132, 3.354746345332728, 3.3545854558035444, 3.3544245662758954,
      3.3543065806215964, 3.354081335280739, 3.353791734129686];
    const latitudes1 = [6.614145429497498, 6.614571612528692, 6.614827322170527, 6.614997795192309,
      6.615466595697541, 6.615573141205076,
      6.615732959422957];
    const latitudes2 = [6.615732959422957, 6.6155198684538306, 6.615328086503325,
      6.615061722560384, 6.614848631301712, 6.614188047817066, 6.6135274634493015];
    const latitudes3 = [6.614337211907028, 6.614518339669431, 6.614774049339587, 6.615019104315422,
      6.615253504614273, 6.615626413949855, 6.616063250242462];
    let i = 0;
    setInterval(() => {
      //this.cars.forEach(car => {});
      if (this.cars[0].marker && this.cars[1].marker && this.cars[2].marker ) {
        this.cars[0].marker.setLngLat([longitudes1[i], latitudes1[i]]);
        this.cars[1].marker.setLngLat([longitudes2[i], latitudes2[i]]);
        this.cars[2].marker.setLngLat([longitudes3[i], latitudes3[i]]);
      }
      i++; // Increment i
      if (i === longitudes1.length) {
        i = 0;
      }
    }, 2000);
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

  // getDrivers(): void {
  //   const minLat = 3.3575;
  //   const maxLat = 3.3585;
  //   const minLon = 6.6142;
  //   const maxLon = 6.6146;
  //
  //   this.driverService.getDriversWithinBoundingBoxCoordinates(minLat, maxLat, minLon, maxLon)
  //     .then(drivers => {
  //       console.log('Drivers:', drivers);
  //     })
  //     .catch(error => {
  //       console.error('Error: Close by Drivers could not be retrieved', error);
  //     });
  // }
}

interface Car {
  lat: number;
  lng: number;
  color: string;
  marker?: mapboxgl.Marker;
}
