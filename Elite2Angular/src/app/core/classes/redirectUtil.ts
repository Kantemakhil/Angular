import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SsoService } from '@common/sso-logout/service/sso.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RedirectUtil {

  currentActivatedRoute:any;
  moduleNameArr = [];
  moduleNameArr$ = new BehaviorSubject([]);

  constructor(private router: Router, private ssoService: SsoService) { 
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
          this.currentActivatedRoute = e.url;
      }
    });
  }

  redirectToSsoLogin(){
    this.router.navigate(['/logout']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  redirectToHome() {
    this.router.navigate(['/home']);
  }
  redirectToIWp(screenId) {
      this.router.navigate( ['/EOFFENDER'], { queryParams: { ['SCREEN'] : screenId } } );
  }
  redirectToAddress() {
      this.router.navigate(['/OCDADDRE']);
  }

 redirectToUploadDoc(screenId) {
    //  this.router.navigate(['/UPLOADDOC']);
      this.router.navigate( ['/UPLOADDOC'], { queryParams: { ['SCREEN'] : screenId } } );
  }

  redirectToEditor(){
    this.router.navigate(['/EDITDOC']);
  }
 
    redirectToGenerateDialog() {
      this.router.navigate(['/generateDialog']);
    }
    
    redirectToCancelDialog() {
        this.router.navigate(['/canceldialog']);
      }

      redirectTostaffReport() {
        this.router.navigate(['/oidstfrp']);
      }
      redirectToCasePlan() {
        this.router.navigate(['/OCIPOWOF'], {queryParams: { O: 1}});
      }
      redirectToOwHeader() {
        this.router.navigate(['/OWHEADER']);
      }
      redirectToBookSumm() {
        this.router.navigate(['/OIIBOOKS']);
      }
      redirectToSignDoc() {
        this.router.navigate( ['/SIGNDOC']);
      }

      
      redirectToServerError() {
        
        if(this.currentActivatedRoute != '/error'){
          sessionStorage.setItem('504','Y')
          this.router.navigate( ['/error']);
        }
      }

      redirectToUnauthorized(api) {
        this.addNewAunthorizeModule(api);
        if (this.currentActivatedRoute != '/UNAUTHORIZE' && this.currentActivatedRoute != '/login') {
          sessionStorage.setItem('UNAUTHORIZE','Y')
          this.router.navigateByUrl('/UNAUTHORIZE', {  replaceUrl: true });
        }
      }

      addNewAunthorizeModule(api){
        let moduleName;
        if(api && api.toUpperCase().trim() == 'UNAUTHORIZE'){
          return false;
        }
        else if(api.includes('api//')){
           moduleName = api.split('/api//')[1].split('/')[0];
        }
        else if(!api.includes('api')){
          moduleName = api;
        }
        else{
           moduleName = api.split('/api/')[1].split('/')[0];
        }
        if(!this.moduleNameArr.includes(moduleName)){
          this.moduleNameArr.push(moduleName);
          this.moduleNameArr$.next(this.moduleNameArr);
        }
      }

      clearUnauthorizeModule(){
        this.moduleNameArr = [];
        this.moduleNameArr$.next(this.moduleNameArr);
      }

}
