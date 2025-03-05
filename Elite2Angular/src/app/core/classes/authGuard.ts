import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserSessionManager } from '../classes/userSessionManager';
import { RedirectUtil } from './redirectUtil';
import { TranslateService } from '@common/translate/translate.service';
import { SsoService } from '@common/sso-logout/service/sso.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private redirectUtil: RedirectUtil,
    private sessionManager: UserSessionManager,
    public ssoService: SsoService,
    public translate: TranslateService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    let url: string = state.url;
    let allow = localStorage.getItem('storedInfo');

    
    if (url.startsWith('/')) {
      url = url.substring(1);
    }
    
    if (url === '' || url === 'login' || url === 'logout') {
      return true;
    }

    if (url === 'error' && sessionStorage.getItem('504')) {
       return true;
    }
    
    if (this.sessionManager.isSessionValied()) {
	    if (url === 'home') {
        return true;
      }
      if (url === 'UNAUTHORIZE' && sessionStorage.getItem('UNAUTHORIZE')) {
        return true;
      }
      if(this.sessionManager.currentCaseLoad === 'CC' && url === 'OCIPOWOF'){
		    return true;
	    }  
      if (this.sessionManager.userRoles || allow) {
        if(url.search('OWINTAKE')!==-1 || url.search('OWHEADER')!==-1 || url.search('OFFSCH')!==-1 || url.search('HOUSCLEAN')!==-1 || url.search('OISREPORT')!=-1 
        		|| url.search('OIEXPJRP')!=-1 || url.search('OIRREPORT')!=-1 || url.search('OIIMPJRP')!=-1 || url.search('OIRMREPOR')!=-1 || url.search('OIRMASSET')!=-1
                || url.search('OIDARFPL')!=-1 || url.search('OIDARHPL')!=-1 || url.search('EDITDOC')!=-1 || url.search('SIGNDOC')!=-1 || url.search('UPLOADDOC')!=-1 || url.search('PORTALAPP')!=-1 
                || url.search('OCUINCWP')!=-1 || url.search('OIDSTFRP')!=-1 || url.search('OCUINCFE')!=-1 || url.search('PORTALSCHAPP')!=-1 || url.search('OUMDTEMPDIALOG')!=-1 || url.search('OCDSENCH')!=-1) {
                 return true;
        }
        //Handle Parameter added url.
        if(url.indexOf("?")>0) {
            url = url.split("?")[0];
        } 
        if (this.sessionManager.userRoutes.hasOwnProperty(url) || 
          url == "INSIGHTS" ||
          url == "INSDSBVW" ||
          url == "DSHBVIEW" || 
          url == "DSHBEDIT" || 
          url == "DSHBCREATE" || 
          url == "BIDATASOURCE" ||
          url == "DTSREDIT" ||
          url == "DTSRCREATE" ||
          url == "DTSRVIEW" ||
          url == "OIEXPPRO" ||
          url == "OIEXPQAC" ||
          url == "OIIMPPRO" ||
          url == "OIIMPQAC") {
          return true;
        } 
        else {
          this.redirectUtil.redirectToUnauthorized(url);
        }
      } 
      else {
        this.redirectUtil.redirectToHome();
        return true;
      }
    } 
    else {
      
      this.sessionManager.removeUserSession();
      this.sessionManager.removeSsoSession();
      if(this.ssoService.isSsoEnable){
        this.redirectUtil.redirectToSsoLogin();
      }
      else{
        this.redirectUtil.redirectToLogin();
      }
      
      return false;
    }
  }
}