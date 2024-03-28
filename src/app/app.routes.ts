import {Route} from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {HomeComponent} from "../home/home.component";
import {DriverLoginComponent} from '../driver-login/driver-login.component';
import {MapComponent} from "../map/map.component";
import {CreateDriverComponent} from "../create-driver/create-driver.component";


export const routes: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: 'index', component: HomeComponent},
  {path: 'drive/login', component: DriverLoginComponent},
  {path: 'drive/create', component: CreateDriverComponent},
  { path: 'usermap', component: MapComponent }
];
