import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { SsoService } from '@common/sso-logout/service/sso.service';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class SsoResolver implements Resolve<any> {
  constructor(private ssoService: SsoService, public translate: TranslateService,
  private router: Router, private sessionManager: UserSessionManager) {}

  resolve(): Observable<any> {
    this.translate.loadAdData();
    if(!this.isloggedin() && this.ssoService.isSsoEnable){
      this.router.navigate(['/logout']);
    }
    return this.ssoService.getSsoInfo().pipe(
        catchError(error => {
          console.log(error)
          return of([]);
        })
      );
  }

  isloggedin(): boolean {
  return this.sessionManager.isSessionValied();
}

   

}