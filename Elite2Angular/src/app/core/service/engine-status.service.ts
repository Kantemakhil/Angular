import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Observable, ReplaySubject, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EngineStatusService {

  enginesStatus$ = new ReplaySubject(1);
  constructor(private http: HttpService) {}

   getSystemStatus() {
      this.http.get('omss40/getApplicationStatus', null, false).subscribe((res) => {
         if (res) {
            this.enginesStatus$.next(res);
         }
      })
   }

   isObject(object) {
      return object != null && typeof object === 'object';
   }
  
}
