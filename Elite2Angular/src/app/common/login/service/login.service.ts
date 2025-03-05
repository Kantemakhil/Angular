import { LoaderService } from './../../../core/loader/loader.service';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { RedirectUtil } from '@core/classes/redirectUtil';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { TranslateService } from '@common/translate/translate.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import {LovService} from '@core/ui-components/lov/lov.service';
import { UserSession } from '@core/domain/userSession';
import {ReferenceDomainService} from '@core/ui-components/lov/reference-domain.service';
import { CalendarProfile } from '@core/ui-components/schedule/calendar-profile';
import { OiiinlogService } from '../../../inst/incidents-oic/service/oiiinlog.service'; 
import { IncidentSearchService } from '../../../inst/incidents-oic/service/incident-search.service'; 
import { DynamicMenuService } from '@core/service/dynamic-menu.service';
import { Router } from '@angular/router';
import { OumsysetService } from '@sa/admin/service/oumsyset.service';
import { DashboardBiService } from 'app/dashboard-bi/dashboard-bi.service';
import { BehaviorSubject } from 'rxjs';
import { SsoService } from '@common/sso-logout/service/sso.service';
import { ScreenWorkFlowService } from '@core/ui-components/pane/screen-workflow.service';
import { RelatedScreensService } from '@core/ui-components/pane/relatedScreens.service';

@Injectable({providedIn: 'root'})
export class LoginService {

    loadMainColDefData() {
        this.http.get('ocmpconf/getDatatypes').subscribe(data=>{
            this.mainColDefData = data;
        });
    }
    
  
  private liveModeRemeber : boolean = false;
  private innerADToken:any;
  public userTaskCount=0;
  public interval : any = 0;
  public teamTaskCount=0;
    mainColDefData: any;
    msgs: any[];

    adminTokenDependency$ = new BehaviorSubject(false)
    adminTokenDependencySubscription:any;

  constructor(public screenflow: ScreenWorkFlowService, public  relatedFlow: RelatedScreensService, public dms: DynamicMenuService, private http: HttpService, private redirectUtil: RedirectUtil,private incidentService: IncidentSearchService,
    private sessionManager: UserSessionManager, private translate: TranslateService,private oiiinlogfactory:OiiinlogService,
    private offenderSearchService: OffenderSearchService, private refrenceDomainService: ReferenceDomainService, private dashboardBiService: DashboardBiService,
     private lovService: LovService,private loaderService:LoaderService, private router: Router, private oumsysetService: OumsysetService,public ssoService: SsoService) { }

  adAuthenticate(token) {
		const options = HttpService.getADAuthRequestOptions(token);
		const data = { 'grant_type': 'password', 'username': '', 'password': '' };
		return this.http.oauth('oauth/token', data, options);
  }
  
  adLoginParse(token) {
      const adToken = token?.split('&client_info');
      this.tokenBasedLogin(adToken[0]);
  }
  
  tokenBasedLogin(token) {
      this.adAuthenticate(token)
          .subscribe(res => {
              const list = res;
              //Adding session temproray to make call to get username.
              this.addTempUserSession(list,'');
              this.getUserName().subscribe((userName) => {
                this.ssoService.isSsoEnable = true;
				                 this.processResponse(list, userName);
			           });
          }, (err) => {
              
          });
  }
  
  getUserName() {
		return this.http.get('omss40/getUserName');
	}
  
  
  
  
  
  authenticate(userName: String, password: String) {

    const options = HttpService.getAuthRequestOptions();
    const data = { 'grant_type': 'password', 'username': userName, 'password': password };
    return this.http.oauth('oauth/token', data, options);
  }
  adLogin() {
      let redirectUrl = this.sessionManager.adRedirectUrl;
      let mainLink = this.sessionManager.mainLink;
      let scope = this.sessionManager.scope ;
      let clientID = this.sessionManager.clientID;
      let state = this.sessionManager.state ;
      let nonce = this.sessionManager.nonce ;
      let clientInfo = this.sessionManager.clientInfo;
      let clientRequestId = this.sessionManager.clientRequestId;
      let adUrl = mainLink+'&scope='+scope+'&client_id='+clientID+'&redirect_uri='+redirectUrl+'&state='+state+'&nonce='+nonce+'&client_info='+clientInfo+'&client-request-id='+clientRequestId+'&response_mode=fragment';
      window.location.href = adUrl;
      //return this.http.oauth('msal4jsample/',null,null).subscribe(result=>
      //window.location.href="https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?response_type=id_token&scope=openid%20profile%20user.read&client_id=66c7ee39-3bf8-451f-b275-423c686232ff&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F&state=eyJpZCI6IjZkNzViMzVlLTdkMzAtNGIzOC04NGFhLTcyYjVlMTZiZDM4YSIsInRzIjoxNjA2MTIzNDI1LCJtZXRob2QiOiJwb3B1cEludGVyYWN0aW9uIn0%3D&nonce=ab00097a-29ac-4895-87f8-7e8ab5bd1ac7&client_info=1&x-client-SKU=MSAL.JS&x-client-Ver=1.4.0&client-request-id=fdb0dae2-9f46-492b-875d-c1b3108766c4&response_mode=fragment";
  }
  
  flushOldToken() {  
      return this.http.post('/logout/revoke', null);
   }

  getCurrentCaseload() {
    return this.http.get('omss40/getCurrentCaseload');
  }
     setCurrentCaseload(obj) {

    return this.http.post('omss40/changeWorkingCaseLoad', obj);
  }

  getUserMenus(displayLoader = true) {
    return this.http.get('omss40/UserRoleInfo',null, displayLoader);
  }

  getCaseLoads() {
    return this.http.get('omss40/getCaseLoads');
  }

  getCaseLoadAgencies() {
    return this.http.get('omss40/getCaseLoadAgencies');
  }

  getCurrentCaseloadType() {
    return this.http.get('omss40/getCurrentCaseloadType');
  }

  getCurrentStaffDetail() {
    return this.http.get('omss40/getCurrentStaffDetail');
  }
  
  getLoginLogo(){
      return this.http.get('/getLoginLogo');
  }

  getLatestEliteVersion(){
    return this.http.get('app/version');
  }

  logout() {
    this.http.post('logout/revoke', null)
      .subscribe((response) => {
        this.sessionManager.addMessage({ message: this.translate.loginTranslate('login.logout-success'), type: 'info' });
        this.sessionManager.removeUserSession();
        this.sessionManager.removeSsoSession();
        if(this.ssoService.isSsoEnable){
            this.redirectUtil.redirectToSsoLogin();
        }
        else{
            this.redirectUtil.redirectToLogin();
        }
        this.offenderSearchService.clear();
        this.refrenceDomainService.clearCache();
        this.refrenceDomainService.setLiveMode(this.liveModeRemeber);
        this.lovService.clearCache();
        this.oiiinlogfactory.clear();
        this.incidentService.clear();
        this.lovService.setLiveMode(this.liveModeRemeber); 
      }, (err) => {
        this.sessionManager.addMessage({ message: this.translate.loginTranslate('login.logout-fail'), type: 'warn' });
        this.sessionManager.removeUserSession();
        this.sessionManager.removeSsoSession();
        if(this.ssoService.isSsoEnable){
            this.redirectUtil.redirectToSsoLogin();
        }
        else{
            this.redirectUtil.redirectToLogin();
        }
        this.offenderSearchService.clear();
        this.oiiinlogfactory.clear();
        this.incidentService.clear();
        
      });
  }
    
    

  getLoginMsgs(lang: string) {
    return this.http.get('getLoginMsgResources?lang=' + lang);
  }

  getAppMsgs(lang: string) {
    return this.http.get('getAppMsgResources?lang=' + lang);
  }

  getServerTime() {
    return this.http.get('omss40/getServeTime');
  }
  
  getAdToken():any {
     return this.innerADToken;
  }
  setADToken(adToken: any) {
      this.innerADToken = adToken;
  }
  
  getLiveMode():boolean {
      return this.liveModeRemeber;
  }
  
  setLiveMode(option) {
      this.liveModeRemeber = option;
  }
  
  
  getUserProfiles() {
    return this.http.get('schprofile');
  }
  specficPropertyType() {
    return this.http.get('configuration');
  }
  
  getScheduleProfileData(){
    this.getUserProfiles().subscribe(result=>{
        
        CalendarProfile.displayList = result;
        if (typeof (Storage) !== 'undefined') {
            sessionStorage.setItem('calendarDisplay', JSON.stringify(result));
        }
    });

}
  clearOlderCache() {
      this.refrenceDomainService.clearCache();
      this.lovService.clearCache();
  }
  private selectedLang:string = 'en';
  processResponse(list, userName) {
      const userSession = new UserSession();
      userSession.accessToken = list.access_token;
      userSession.tokenType = list.token_type;
      userSession.refreshToken = list.refresh_token;
      userSession.isLoggedin = true;
      userSession.id = userName;
      userSession.lang = this.selectedLang;
      userSession.randomid = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;
      this.sessionManager.addUserSession(userSession);
      this.clearOlderCache();
      this.afterLogin();
  }
  addTempUserSession(list, userName) {
      const userSession = new UserSession();
      userSession.accessToken = list.access_token;
      userSession.tokenType = list.token_type;
      userSession.refreshToken = list.refresh_token;
      userSession.isLoggedin = true;
      userSession.id = userName;
      userSession.lang = this.selectedLang;
      userSession.randomid = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;
      this.sessionManager.addUserSession(userSession);
  }
  
  afterLogin() {
    if(!this.dms.menuAvailable){
        this.dms.catchRouterChange()
    }
      if (!this.sessionManager.caseLoads) {
          this.getCaseLoads().subscribe(data => {
              this.sessionManager.caseLoads = data;
          });
      }
      this.getAppMsgs(this.selectedLang).subscribe(data => {
          this.translate.appmsgs = data;
      });
      if (!this.sessionManager.currentCaseLoad) {
          this.getCurrentCaseload()
              .subscribe(data => {
                  if (data === 'Error') {
                      data = 'Change Caseload';
                  }
                  this.offenderSearchService.currentCaseLoad = data;
                  this.sessionManager.currentCaseLoad = data;
                  this.getCurrentCaseloadType()
                  .subscribe(caseLoadType => {
                      if (caseLoadType) {
                          this.sessionManager.currentCaseLoadType = caseLoadType;
                         
                      }
                  });
              });
      }
      this.getCurrentStaffDetail()
          .subscribe(staff => {
              const userSession = JSON.parse(sessionStorage.UserInfo);
              if (staff) {
                  const staffDetail = {
                      'lastName': staff.lastName,
                      'firstName': staff.firstName,
                      'staffId': staff.staffId
                  };

                  userSession['staff'] = staffDetail;
              }
              sessionStorage.setItem('UserInfo', JSON.stringify(userSession));
              this.sessionManager.addUserSession(userSession);
          });


      if (!this.sessionManager.userRoles) {
          this.getUserMenus()
              .subscribe(data => {
                  this.sessionManager.userRoles = data;
                  //this.redirectUtil.redirectToHome();
                  this.landingpage(this.sessionManager.currentCaseLoadType);
              });
      } else {
          //this.redirectUtil.redirectToHome();
          this.landingpage(this.sessionManager.currentCaseLoadType);
      }

  }
  
  
  login(userName, userPass) {
      this.authenticate(userName, userPass)
          .subscribe(res => {
              const list = res;
              if(list.expires_in<3600) {
                      this.addTempUserSession(list, userName);
                      this.flushOldToken().subscribe((response) => {
                          
                          this.sessionManager.removeUserSession();
                          this.authenticate(userName, userPass)
                          .subscribe(response => {
                                  this.processResponse(response, userName);
                          });
                       }, (err) => {
                           
                       });;
                      
              } else {
                  this.processResponse(list, userName);
              }
              
          }, (err) => {
              /*this.isInvalidPass = true;
              if (err.status === 401) {
                  this.displayDialogue = true;
                  this.loginErrMessage = this.translate.loginTranslate('login.invalid-password');
              } else {
                  this.loginErrMessage = this.translate.loginTranslate('login.invalid-server');
              }
              this.msgs = [];
              this.msgs.push({ message: this.loginErrMessage, type: 'error' });
              this.userPass = '';
              this.lognBtnDisable = true;*/
              
          });
  }
  getTaskCount(user,displayLoader) {
        this.http.get('oumcamtask/getTaskCount',null,displayLoader).subscribe(data=>{
            if(data){
              this.userTaskCount=data.userTask;
              this.teamTaskCount=data.teamTask;
            }
        });
    
    }
    loadSysConfData(settingType,providerCode) {
        return this.http.get('getSysSetConfADData');
    }
    
    
    landingpage(clType) {
        if (!clType) {
            this.getCurrentCaseload()
                .subscribe(data => {
                    if (data === 'Error') {
                        data = 'Change Caseload';
                    }
                    this.offenderSearchService.currentCaseLoad = data;
                    this.sessionManager.currentCaseLoad = data;
                    this.getCurrentCaseloadType()
                        .subscribe(caseLoadType => {
                            if (caseLoadType) {
                                this.sessionManager.currentCaseLoadType = caseLoadType;
                                this.getLanPgConfigData(caseLoadType);
                                // if (caseLoadType == "INST") {
                                //     this.redirectUtil.redirectToHome();
                                // } else {
                                //     if(this.sessionManager.userRoutes.hasOwnProperty('OCIPOWOF')){
                                //             this.redirectUtil.redirectToCasePlan();
                                //     } else {
                                //         this.msgs = [];
                                //         this.msgs.push({ message: this.translate.loginTranslate('login.unauthorized.access'), type: 'error' });
                                //         this.sessionManager.removeUserSession();
                                //         return;
                                //     }
                                // }
                            }
                        });
                });
        } else {
            this.getLanPgConfigData(clType);
            // if (clType == "INST") {
            //     this.redirectUtil.redirectToHome();
            // } else {
            //     if(this.sessionManager.userRoutes.hasOwnProperty('OCIPOWOF')){
            //             this.redirectUtil.redirectToCasePlan();
            //         }else{
            //             this.msgs = [];
            //             this.msgs.push({ message: this.translate.loginTranslate('login.unauthorized.access'), type: 'error' });
            //             this.sessionManager.removeUserSession();
            //             return;
            //         }
            // }
        }
    }


    getLanPgConfigData(caseLoad) {
        let obj = {
            settingType: 'PAGE_CONFIG',
            settingProviderCode: 'PAGE_CONFIG',
        };
        this.oumsysetService.loadJsonData(obj).subscribe((result) => {
          const rowData = JSON.parse(result.settingValue);
          if(rowData && rowData.length > 0) {
            if (caseLoad == "INST"){
                let getcaseLoadINST = rowData.find(x => x.KEY_CODE === 'INSTLP');
                if (getcaseLoadINST.caseLoadSpefic  &&  getcaseLoadINST.VALUE    && (getcaseLoadINST.VALUE !== 'APP_DEFAULT') && getcaseLoadINST.caseLoadSpefic=='Y') { 
                    this.router.navigate(['/'+getcaseLoadINST.VALUE]);
                }
                else if (getcaseLoadINST.VALUE  && (getcaseLoadINST.VALUE !== 'APP_DEFAULT')  ) {
                    this.getDetails();
                   this.adminTokenDependencyRoute(getcaseLoadINST.VALUE);
                }
                else {
                    this.redirectUtil.redirectToHome();
                }
            } else if (caseLoad == "COMM"){
                let getcaseLoadCOMM = rowData.find(x => x.KEY_CODE === 'COMMLP');
                if (getcaseLoadCOMM.caseLoadSpefic  &&  getcaseLoadCOMM.VALUE    && (getcaseLoadCOMM.VALUE !== 'APP_DEFAULT') && getcaseLoadCOMM.caseLoadSpefic=='Y') { 
                    this.router.navigate(['/'+getcaseLoadCOMM.VALUE]);
                }
                else if (getcaseLoadCOMM.VALUE  && (getcaseLoadCOMM.VALUE !== 'APP_DEFAULT')) {
                    this.getDetails();
                    this.adminTokenDependencyRoute(getcaseLoadCOMM.VALUE);
                }
                else {
                    this.router.navigate(['/OCIPOWOF'], { queryParams: { O: 1 } });
                }
            }
          } else {
            if (caseLoad == "INST") {
                this.redirectUtil.redirectToHome();
            } else {
                if(this.sessionManager.userRoutes.hasOwnProperty('OCIPOWOF')){
                    this.redirectUtil.redirectToCasePlan();
                } else {
                    this.msgs = [];
                    this.msgs.push({ message: this.translate.loginTranslate('login.unauthorized.access'), type: 'error' });
                    this.sessionManager.removeUserSession();
                    return;
                }
            }
          }
          this.resetScreenAndRelatedFlow();
        });
      }


    getDetails() {
        let obj = {
            settingType: 'INSIGHTS',
            settingProviderCode: 'INSIGHTS',
        };
        this.oumsysetService.loadJsonData(obj).subscribe((result) => {
            const rowData = JSON.parse(result.settingValue);
            this.dashboardBiService.environment = this.getKeyCodeValue("INS_ENV", rowData);
            this.dashboardBiService.siteIdentifier = this.getKeyCodeValue("INS_SITE_IDF", rowData);
            this.dashboardBiService.embedSecret = this.getKeyCodeValue("INS_EMB_SEC", rowData);
            this.dashboardBiService.InsightRoolUrl = this.getKeyCodeValue("INSI_SER_URL", rowData);
            this.dashboardBiService.insightUserId = this.getKeyCodeValue("INS_USER_ID", rowData);
            this.getAdminDetails();
        });
    }


    getAdminDetails() {
        let obj = {
            settingType: 'INSIGHTS',
            settingProviderCode: 'AUTH',
        };
        this.oumsysetService.loadJsonData(obj).subscribe((result) => {
            const rowData = JSON.parse(result.settingValue);
            this.dashboardBiService.userAuthEmail = this.getKeyCodeValue("USERNAME", rowData);
            this.getAdminToken(this.dashboardBiService.userAuthEmail);
        });
    }

    getAdminToken(email) {
        this.dashboardBiService.getAdminToken(email).subscribe(data => {
            if(data == null || data == undefined || data == ''){
                this.dashboardBiService.adminToken = undefined;
                this.adminTokenDependency$.next(true);
            }
            else{
                const result: any = data;
                this.dashboardBiService.adminToken = result.access_token;
                this.adminTokenDependency$.next(true);
            }
            
        });
    }

    getKeyCodeValue(keycode, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].KEY_CODE == keycode) {
                return arr[i].VALUE;
            }
        }
        return null
    }


    adminTokenDependencyRoute(v){
        this.adminTokenDependencySubscription = this.adminTokenDependency$.subscribe(res => {
            if(res === true){
                this.router.navigate(['/INSDSBVW'], {queryParams: {form: v}});  
                if (this.adminTokenDependencySubscription) {
                    this.adminTokenDependencySubscription.unsubscribe();
                }
            }   
        })
    }

    resetScreenAndRelatedFlow(){
        this.screenflow.resetService();
        this.relatedFlow.resetService();
    }


}
