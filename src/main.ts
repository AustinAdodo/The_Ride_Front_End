//(window as any).global = window; //polyfill work-around
//import './global-shim';

import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {environment} from "./environments/environment";
import {enableProdMode, importProvidersFrom} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

if (environment.production) {
  enableProdMode();
}

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom([BrowserAnimationsModule]),...appConfig.providers,]
}).catch((err) => console.error(err));
