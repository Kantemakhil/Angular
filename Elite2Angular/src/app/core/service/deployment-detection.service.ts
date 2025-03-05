import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Observable, ReplaySubject, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DeploymentDetectionService {

  deploymentStatus$ = new ReplaySubject(1);
  constructor(private http: HttpService) {}

   getDeploymentStatus() {
      this.http.get('app/version', null, false).subscribe((res) => {
         if (res) {
            this.deploymentStatus$.next(res);
         }
      })
   }

 
  
}
