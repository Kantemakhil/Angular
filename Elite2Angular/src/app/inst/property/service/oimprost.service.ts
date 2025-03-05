import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class OimprostService {
  constructor(private http: HttpService) { }

  getPropertySettingData(propertySettings) {
    return this.http.post('oimprost/getPropertySettingData', propertySettings);
  }

  updatePropertySettingData(propertySettings) {
    return this.http.post('oimprost/updatePropertySettingData', propertySettings);
  }
}