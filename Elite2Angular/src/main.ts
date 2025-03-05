import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';
import 'hammerjs';
import { environment } from './environments/environment';

import {LicenseManager} from '@ag-grid-enterprise/core';
LicenseManager.setLicenseKey("CompanyName=Syscon Justice Systems Inc,LicensedApplication=Elite V4,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=2,LicensedProductionInstancesCount=0,AssetReference=AG-026298,ExpiryDate=23_April_2023_[v2]_MTY4MjIwNDQwMDAwMA==e9fce68a36bb9026232700755ec730ce");

// Registering Syncfusion license key for 25.1.35
registerLicense('ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5Qd0xjXnpYcndVRWdU');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => {
    
  });
