import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized, CanActivate } from '@angular/router';

import { AuthGuard } from '@core/classes/authGuard';
import { RedirectUtil } from '@core/classes/redirectUtil';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { LoginService } from '@common/login/service/login.service';
import { filter } from 'rxjs/operators';
import { SplashScreenService } from '@common/splash-screen/splash-screen.service';
import { OumsysetService } from '@sa/admin/service/oumsyset.service';
//declare let gtag: Function;

@Component({
  selector: 'app-root',
  template: `
  <app-splash-screen></app-splash-screen>
  <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(public renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private authGuard: AuthGuard,
    private redirectUtil: RedirectUtil,
    private splashScreenService: SplashScreenService,
    private oumsysetService: OumsysetService,
    private sessionManager: UserSessionManager,private loginService: LoginService) {
    }

  ngOnInit() {
    setTimeout(() => {
      this.splashScreenService.stop();
    }, 9000);
    const urlFragments = window.location.href.split('#id_token=');
    if(urlFragments && urlFragments.length>1) {
        this.loginService.adLoginParse(urlFragments[1]);
    } else {
        this.router.events
        .pipe(filter(event => event instanceof RoutesRecognized))
        .subscribe((event: RoutesRecognized) => {
          const auth: boolean = this.sessionManager.isSessionValied();
        // Public pages don't require authentication.
          const url = event.urlAfterRedirects;
          //if(url.search('id_token')!==-1) {
            //  
              // this.redirectUtil.redirectToHome();
          //}
          
          if (this.isSubPage(event, '/login')) {
            if (auth) {
              if (this.sessionManager.currentCaseLoadType){
                this.loginService.getLanPgConfigData(this.sessionManager.currentCaseLoadType);
              } else {
                this.redirectUtil.redirectToHome();
              }
            } 
            return;
          }
          // All other requests MUST be done through an
          // authenticated connection.  The guard performs
          // the redirection for us.
          if (!this.callCanActivate(event, this.authGuard)) {
            return;
          }
      });
    }
    // this.splashScreenService.stop();
  }

  callCanActivate(event: RoutesRecognized, guard: CanActivate) {
    return guard.canActivate(this.route.snapshot, event.state);
  }

  isSubPage(event: RoutesRecognized, parent: string) {
    const url = event.urlAfterRedirects;
    return (url === parent
      || url.startsWith(parent + '/')
      || url.startsWith(parent + '?'));
  }


}
