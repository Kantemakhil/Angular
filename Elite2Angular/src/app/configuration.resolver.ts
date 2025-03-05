import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { OumsysetService } from '@sa/admin/service/oumsyset.service';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ConfigurationResolver implements Resolve<any> {
  constructor(public oumsysetService: OumsysetService) { }

  resolve(): Observable<any> {
    return this.getSystemSettingData().pipe(
      catchError(error => {
        console.log(error)
        return of([]);
      })
    );
  }

  getSystemSettingData() {
    let addPayload = {
      settingProviderCode: "ELITE_DOC",
      settingType: "EliteDoc"
    };
    return this.oumsysetService.loadJsonData(addPayload).pipe(delay(2000));
  }


}