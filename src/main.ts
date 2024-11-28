const currentEnvironment = process.env['NODE_ENV'] as string;
console.info("Current Detected Environment is:", currentEnvironment);

import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import { environment } from "./environments/environment";
import {enableProdMode, importProvidersFrom} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom([BrowserAnimationsModule]),...appConfig.providers,]
}).catch((err) => console.error(err));


//(window as any).global = window; //polyfill work-around
//import './global-shim';
// const mapBoxGlAccessToken = process.env['MAPBOX_GL_ACCESS_TOKEN'] as string;
// if (!mapBoxGlAccessToken) {
//   console.error("MAPBOX_GL_ACCESS_TOKEN is not defined.");
// } else {
//   console.log("MAPBOX_GL_ACCESS_TOKEN loaded:", mapBoxGlAccessToken);
// }