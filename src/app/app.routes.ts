import {Route} from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {HomeComponent} from "../home/home.component";
import {DriverLoginComponent} from '../driver-login/driver-login.component';


export const routes: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: 'index', component: HomeComponent},
  {path: 'drive/login', component: DriverLoginComponent}
];
