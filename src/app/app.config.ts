import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    HttpClientModule,
    BrowserAnimationsModule
  ]
};
