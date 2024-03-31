import {Route} from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {HomeComponent} from "../home/home.component";
import {DriverLoginComponent} from '../driver-login/driver-login.component';
import {MapComponent} from "../map/map.component";
import {CreateDriverComponent} from "../create-driver/create-driver.component";
import {CreateCustomerComponent} from "../create-customer/create-customer.component";
import {DriverProfileDashboardComponent} from "../driver-profile-dashboard/driver-profile-dashboard.component";


export const routes: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: 'index', component: HomeComponent},
  {path: 'drive/login', component: DriverLoginComponent},
  {path: 'drive/create', component: CreateDriverComponent},
  {path: 'drive/home', component: DriverProfileDashboardComponent},
  {path: 'user/create', component: CreateCustomerComponent},
  {path: 'home', component: HomeComponent},
  { path: 'usermap', component: MapComponent }
];
