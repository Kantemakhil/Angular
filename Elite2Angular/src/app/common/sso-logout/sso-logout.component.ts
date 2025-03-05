import { Component, OnInit } from '@angular/core';
import { SsoService } from './service/sso.service';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { LoginService } from '@common/login/service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Images } from '@common/beans/Images';

@Component({
  selector: 's4-sso-logout',
  templateUrl: './sso-logout.component.html',
  styleUrls: ['./sso-logout.component.scss']
})
export class SsoLogoutComponent implements OnInit {


  showLoginImage: string;
  loginImages: Images[];
  bodyBgImage: any;
  msgs: any[];

  constructor(public translate: TranslateService, public sessionManager: UserSessionManager, 
    public ssoService: SsoService, private loginService: LoginService,private router: Router,private activatedRoute: ActivatedRoute) {
    
   }

  ngOnInit(): void {
    console.log("SsoLogoutComponent")
    
    // let isSsoEnable = false;
    // this.activatedRoute.data.subscribe((response: any) => {
    //   if (response && response.ssoInfo && response.ssoInfo.length > 0) {
    //     let data = response.ssoInfo;
    //     let DojIndex = data.findIndex(x => x.profileCode === 'DOJ_SUPPORT');
    //     if (data[DojIndex] && data[DojIndex].profileValue && data[DojIndex].profileValue.toUpperCase() == 'Y') {
    //       isSsoEnable = true;
    //     }
    //     else {
    //       isSsoEnable = false;
    //     }
    //   }
    //   else {
    //     isSsoEnable = false;
    //   }
    // },
    //   (error) => {
    //     isSsoEnable = false;
    //   });
    // console.log(isSsoEnable)
    
    if(this.ssoService.isSsoEnable){
      if(this.loginService.interval){
        clearInterval(this.loginService.interval);
      }
      this.loadBackgroundBG();
      this.reloadLogo();
      this.translate.loadAdData();
    }
    else{
      this.router.navigate(['/login']);
    }
  }


  login() {
    if (this.sessionManager.isDeployementHappen) {
      let errMsg = 'Please open new tab to avoid cache';
      if (this.translate.loginTranslate('login.deploymentcachemsg')) {
        errMsg = this.translate.loginTranslate('login.deploymentcachemsg');
      }
      this.msgs = [];
      this.msgs.push({ message: errMsg, type: 'error' });
      return false;
    }
    let redirectUrl = this.sessionManager.adRedirectUrl;
    let mainLink = this.sessionManager.mainLink;
    let scope = this.sessionManager.scope;
    let clientID = this.sessionManager.clientID;
    let state = this.sessionManager.state;
    let nonce = this.sessionManager.nonce;
    let clientInfo = this.sessionManager.clientInfo;
    let clientRequestId = this.sessionManager.clientRequestId;
    let adUrl = mainLink + '&scope=' + scope + '&client_id=' + clientID + '&redirect_uri=' + redirectUrl + '&state=' + state + '&nonce=' + nonce + '&client_info=' + clientInfo + '&client-request-id=' + clientRequestId + '&response_mode=fragment';
    window.location.href = adUrl;
  }


  reloadLogo() {
    const serve = this.loginService.getLoginLogo();
    serve.subscribe(resp => {
        if (resp != null) {
            this.loginImages = resp;
            for (let i = 0; i < this.loginImages.length; i++) {
                if (this.loginImages[i].imageObjectSeq == 1 && this.loginImages[i].imageThumbnail) {
                    this.showLoginImage = this.BASE64IMAGE + this.loginImages[i].imageThumbnail;
                    this.loginImages[i]['imageFull'] = this.showLoginImage;
                }
            }

        }
    });
}

loadBackgroundBG(){
  const serve = this.loginService.getLoginLogo();
  serve.subscribe(resp => {
      if (resp !== null) {
          const bodyBgImage = resp;
          for (let i = 0; i < bodyBgImage.length; i++) {
              if (bodyBgImage[i].imageObjectSeq == 3 && bodyBgImage[i].imageThumbnail) {
                  this.bodyBgImage = this.BASE64IMAGE + bodyBgImage[i].imageThumbnail;
                  bodyBgImage[i]['imageFull'] = this.bodyBgImage;
              }
          }
      }
  });
}


get BASE64IMAGE(): string {
  return 'data:image/JPEG;base64,';
}

get BASE64PNG(): string {
  return 'data:image/PNG;base64,';
}


}
