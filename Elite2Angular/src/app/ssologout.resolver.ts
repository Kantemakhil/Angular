import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SsoService } from '@common/sso-logout/service/sso.service';
import { TranslateService } from '@common/translate/translate.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class SsologoutResolver implements Resolve<any> {
  constructor(private ssoService: SsoService, public translate: TranslateService,private httpClient: HttpClient) {}

  resolve(): Observable<any> {
    console.log("logoutresolve start")
    return this.httpClient.get(this.getBaseUrl()+'/Elite2Web/api/configuration');
  }


  getBaseUrl(){
    var baseUrl = window.location.origin;
    if (!window.location.origin) {
        baseUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }
    return baseUrl;
}

}