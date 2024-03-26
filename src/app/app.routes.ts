import { Route } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";

export const routes: Route[] = [
  { path: 'login', component: LoginComponent},
  { path: 'index', component: HomeComponent }
];
