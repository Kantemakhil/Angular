import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SsoService {

  isSsoEnable:boolean;

  constructor(private httpClient: HttpClient) {}

   getSsoInfo() {
    if(this.isSsoEnable == undefined){
       return this.httpClient.get(this.getBaseUrl()+'/Elite2Web/api/configuration').pipe(delay(2000));
    }
    else if(this.isSsoEnable){
      
    }
    else{
      let delayedObservable = of([]);
      return delayedObservable;
    } 
  }


  getBaseUrl(){
    var baseUrl = window.location.origin;
    if (!window.location.origin) {
        baseUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }
    return baseUrl;
}



}
