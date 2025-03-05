import { OcmpconfService } from './../../sa/admin/service/ocmpconf.service';
import { PhoneNumberUtils } from './../../core/ui-components/phone/phone-number-utils';
import { Component, Renderer2, OnInit, AfterViewInit, Optional, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@environment/environment';
import { Images } from '@commonbeans/Images';
import { UserSession } from '@core/domain/userSession';
import { LoginService } from '@common/login/service/login.service';
import { RedirectUtil } from '@core/classes/redirectUtil';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ReferenceDomainService } from '@core/ui-components/lov/reference-domain.service';
import { LovService } from '@core/ui-components/lov/lov.service'
import { TranslateService } from '@common/translate/translate.service';
import { OffenderSearchService } from '../offender-records/service/offender-search.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { AppConstants } from '@core/classes/appConstants';
import { MessageComponent } from '@core/ui-components/message/message.component';
import { UiCustomizeService } from '@core/service/ui-customize.service';
import { PasswordComponent } from '@core/ui-components/password/password.component';
import { Global } from '@core/classes/Global';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { DynamicMenuService } from '@core/service/dynamic-menu.service';
import { OumsysetService } from '@sa/admin/service/oumsyset.service';
import { SsoService } from '@common/sso-logout/service/sso.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
    supportedLangs: any[];
    userName: string;
    userPass: string;
    lognBtnDisable: boolean;
    translateLabel: any;
    showLoginImage: string;
    bodyBgImage: any;
    public isInvalidPass: boolean;
    private loginErrMessage: string;
    selectedLang: string;
    displayDialogue: boolean;
    msgs: any[];
    loginImages: Images[];
    hasmsgs = false;
    liveMode: boolean = false;
    isDOJActive: boolean;
    isLangActive: boolean;
    @ViewChildren('loginId') userNames: QueryList<any>;
    refrehTime: number;
    interval: NodeJS.Timeout;
    sysPflModelTemp: SystemProfiles = new SystemProfiles();
    latestEliteVersion:any;
    oldEliteVersion:any;
    isDeploymentDone:boolean = false;

    constructor(public renderer: Renderer2,
        private router: Router,
        public translate: TranslateService,
        private loginService: LoginService,
        private redirectUtil: RedirectUtil,
        private sessionManager: UserSessionManager,
        private offenderSearchService: OffenderSearchService,
        private referenceDomainService: ReferenceDomainService,
        private lovService: LovService,
        private ocmpconfService: OcmpconfService,
        private uiCustomizeService: UiCustomizeService,
        private oumsysetService: OumsysetService,
        public dms: DynamicMenuService,
        private activatedRoute: ActivatedRoute,
        public ssoService: SsoService,
        @Optional() public dialog: MatDialog) {

    }

    ngOnInit() {
        if(this.ssoService.isSsoEnable == undefined){
            this.activatedRoute.data.subscribe((response: any) => {
                if (response && response.ssoInfo && response.ssoInfo.length > 0) {
                    let data = response.ssoInfo;
                    let DojIndex = data.findIndex(x => x.profileCode === 'DOJ_SUPPORT');
                    if(data[DojIndex] && data[DojIndex].profileValue && data[DojIndex].profileValue.toUpperCase() == 'Y'){
                        this.ssoService.isSsoEnable = true;
                    }
                    else{
                        this.ssoService.isSsoEnable = false;
                    }
                } 
                else {
                    this.ssoService.isSsoEnable = false;
                }
            });
        }
        
        if(this.ssoService.isSsoEnable && this.isloggedin){
            setTimeout(() => {
                this.dms.getMenu();
            }, 2000);
            return
        }
        else if(this.ssoService.isSsoEnable){
            this.setLanguage();
            this.adLogin();
            return
        }
        

        this.setLanguage();

        if (this.isloggedin) {
            this.afterLogin();
        } else {
            this.redirectUtil.clearUnauthorizeModule();
            this.offenderSearchService.clear();
            if (this.loginService.interval) {
                clearInterval(this.loginService.interval);
            }
        }
        this.liveMode = this.loginService.getLiveMode();
        this.lognBtnDisable = true;
        this.loadBackgroundBG();
        this.sysPflExecuteQuery();
        this.reloadLogo();
        this.msgs = this.sessionManager.msgs;
    }


    setLanguage(){
        if (this.dialog && this.dialog.openDialogs && this.dialog.openDialogs.length > 0) {
            this.dialog.closeAll();
        }
        if (this.translate.hasloginMsgs()) {
            let storageData = JSON.parse(sessionStorage.getItem('langmsgs'));
            if (storageData && storageData['msgs'] && storageData['msgs']['common.elite.version']) {
                let oldComplete = storageData['msgs']['common.elite.version'];
                let currentYear = new Date().getFullYear() + '-';
                this.oldEliteVersion = oldComplete.split(currentYear)[1];
            }

            this.supportedLangs = this.translate.langoptions;
            this.selectedLang = this.translate.currentLang;
            this.hasmsgs = true;
        } 
        else {
            this.hasmsgs = false;
            this.reloadLanguage(this.translate.browserLanguage);
        }
    }

    getLatestEliteVersion() {
        const serve = this.loginService.getLatestEliteVersion();
        serve.subscribe(res => {
            if (res) {
                let currentYear = new Date().getFullYear() + '-';
                this.latestEliteVersion = res.split(currentYear)[1];
                if (this.oldEliteVersion && this.oldEliteVersion !== this.latestEliteVersion) {
                    this.isDeploymentDone = true;
                }
                this.proceedLogin();
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


    ngAfterViewInit() {

        // if (!this.isloggedin && this.dms.navigationArr.length){
        //     sessionStorage.clear();
        //     window.location.reload();
        // }
        
        this.userNames.changes.subscribe((userNameElements: QueryList<any>) => {
            
            userNameElements.first["text"].nativeElement.focus();
        });
    }
    isValidLogin(event) {
        if (event.keyCode === 13) {
            this.login();
        }
        if (this.userName && this.userPass) {
            this.lognBtnDisable = false;
        } else {
            this.lognBtnDisable = true;
        }
    }

    adLogin = () => {
        this.loginService.adLogin();
    }


    processResponse(list) {
        const userSession = new UserSession();
        userSession.accessToken = list.access_token;
        userSession.tokenType = list.token_type;
        userSession.refreshToken = list.refresh_token;
        userSession.isLoggedin = true;
        userSession.id = this.userName;
        userSession.lang = this.selectedLang;
        userSession.randomid = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;
        this.sessionManager.addUserSession(userSession);
        this.clearOlderCache();
        this.afterLogin();
    }
    addTempUserSession(list) {
        const userSession = new UserSession();
        userSession.accessToken = list.access_token;
        userSession.tokenType = list.token_type;
        userSession.refreshToken = list.refresh_token;
        userSession.isLoggedin = true;
        userSession.id = this.userName;
        userSession.lang = this.selectedLang;
        userSession.randomid = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;
        this.sessionManager.addUserSession(userSession);
    }

    login() {
        this.getLatestEliteVersion();
    }




    proceedLogin(){
        if(this.isDeploymentDone){
            let errMsg = 'Please open new tab to avoid cache';
            if(this.translate.loginTranslate('login.deploymentcachemsg')){
                errMsg = this.translate.loginTranslate('login.deploymentcachemsg');
            }
            this.msgs = [];
            this.msgs.push({ message: errMsg, type: 'error' });
            return false;
        }

        this.lognBtnDisable = true;
        this.userName = this.userName.trim();

        this.loginService.authenticate(this.userName, this.userPass)
            .subscribe(res => {
                const list = res;
                if (list.expires_in < 3600) {
                    this.addTempUserSession(list);
                    this.loginService.flushOldToken().subscribe((response) => {
                        
                        this.sessionManager.removeUserSession();
                        this.loginService.authenticate(this.userName, this.userPass)
                            .subscribe(response => {
                                this.processResponse(response);
                            });
                    }, (err) => {
                        
                    });;

                } else {
                    this.processResponse(list);
                }

            }, (err) => {
                this.isInvalidPass = true;
                if (err.status === 401) {
                    if (err.error.error_description === 'Inactive_User') {
                        this.displayDialogue = true;
                        this.loginErrMessage = this.translate.loginTranslate('login.userisinactive');
                    }else{
                    this.displayDialogue = true;
                    this.loginErrMessage = this.translate.loginTranslate('login.invalid-password');
                    }
                } else {
                    this.loginErrMessage = this.translate.loginTranslate('login.invalid-server');
                }
                this.msgs = [];
                this.msgs.push({ message: this.loginErrMessage, type: 'error' });
                this.userPass = '';
                this.lognBtnDisable = true;
            });
    }

    clearOlderCache() {
        this.referenceDomainService.clearCache();
        this.lovService.clearCache();
        this.sessionManager.caseLoads = [];
    }

    selectLanguageChange(lang: any) {
        this.sessionManager.lang = lang;
        this.selectedLang = lang;
        this.hasmsgs = false;
        this.reloadLanguage(this.selectedLang);
    }

    afterLogin() {
        if(!this.dms.menuAvailable){
            this.dms.catchRouterChange()
        }
        if (this.sessionManager.caseLoads.length <= 0) {
            this.loginService.getCaseLoads().subscribe(data => {
                this.sessionManager.caseLoads = data;
            });
        }
        this.loginService.getTaskCount(this.userName, false);
        this.loadUiConfigData();
        this.loginService.getAppMsgs(this.selectedLang).subscribe(data => {
            this.translate.appmsgs = data;
        });

        this.loginService.getCurrentStaffDetail()
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
            this.loginService.getUserMenus()
                .subscribe(data => {
                    this.sessionManager.userRoles = data;
                    this.loginService.landingpage(this.sessionManager.currentCaseLoadType);
                });
        } else {
            this.loginService.landingpage(this.sessionManager.currentCaseLoadType);
        }

    }
    
    

    get isloggedin(): boolean {
        return this.sessionManager.isSessionValied();
    }

    get BASE64IMAGE(): string {
        return 'data:image/JPEG;base64,';
    }

    get BASE64PNG(): string {
        return 'data:image/PNG;base64,';
    }

    reloadLanguage(lang: string) {
        this.loginService.getLoginMsgs(lang)
            .subscribe((data) => {

                // remove the 'developer English' for production builds
                if (environment.production) {
                    data.languages = this.removeLanguage('dev', data.languages);
                }

                this.supportedLangs = data.languages;
                this.selectedLang = data.lang;
                this.sessionManager.lang = data.lang;
                this.translate.langoptions = data.languages;
                this.translate.currentLang = data.lang;
                this.translate.loginmsgs = data.msgs;
                this.loadProfiles(data);

                this.hasmsgs = true;
                this.loginService.getScheduleProfileData();
                if (data.msgs && data.msgs.hasOwnProperty(AppConstants.DATE_KEY)) {
                    DateFormat.dateFormat = data.msgs[AppConstants.DATE_KEY];
                }

                if (typeof (Storage) !== 'undefined') {
                    sessionStorage.setItem('langmsgs', JSON.stringify(data));
                }
                if (data.msgs && data.msgs.hasOwnProperty(AppConstants.PWD_REGX)) {
                    PasswordComponent._passwordRegx = data.msgs[AppConstants.PWD_REGX];
                }
                if (data.msgs && data.msgs.hasOwnProperty(AppConstants.PWD_VAL_MSG)) {
                    PasswordComponent._validationMsg = data.msgs[AppConstants.PWD_VAL_MSG];
                }
                if (data.msgs && data.msgs.hasOwnProperty(AppConstants.GRANT_USER)) {
                    PasswordComponent._grantUser = data.msgs[AppConstants.GRANT_USER];
                }
                if (data.msgs && data.msgs.hasOwnProperty(AppConstants.SHOW_ICONS)) {
                    Global.showTaskIcons = data.msgs[AppConstants.SHOW_ICONS];
                }
                if (data.msgs && data.msgs.hasOwnProperty(AppConstants.DEFAULT_THEME)) {
                    let theme = data.msgs[AppConstants.DEFAULT_THEME];
                    this.updateTheme(theme);
                }
            });
    }
    loadProfiles(data) {
        if (data.msgs && data.msgs.hasOwnProperty(AppConstants.DATE_KEY)) {
            DateFormat.dateFormat = data.msgs[AppConstants.DATE_KEY];
        }
        if (data.msgs && data.msgs.hasOwnProperty(AppConstants.PHONE_KEY)) {
            PhoneNumberUtils.phoneFormat = data.msgs[AppConstants.PHONE_KEY];
        }
        if (data.msgs && data.msgs.hasOwnProperty(AppConstants.PHONE_PREFIX_KEY)) {
            PhoneNumberUtils.phonePrefix = data.msgs[AppConstants.PHONE_PREFIX_KEY];
        }
        if (data.msgs && data.msgs.hasOwnProperty(AppConstants.POPUP_DURATION_KEY)) {
            MessageComponent.duration = data.msgs[AppConstants.POPUP_DURATION_KEY];
        }
        if (data.msgs && data.msgs.hasOwnProperty(AppConstants.MSG_TOAST_POS)) {
            MessageComponent._msgToastDefPosition = data.msgs[AppConstants.MSG_TOAST_POS];
        }
        this.loadSysConfData();
    }
    loadSysConfData(){
    // this.oumsysetModel.settingType = 'AD';
    // this.oumsysetModel.settingProviderCode = 'AZUREAD';
        this.loginService.loadSysConfData('AD','AZUREAD').subscribe((result) => {
            result.forEach(obj=>{
                if (obj && obj.hasOwnProperty('KEY_CODE') && obj.hasOwnProperty('VALUE') && obj['KEY_CODE'] == 'AD_STATE') {
                    this.sessionManager.state = atob(obj['VALUE']);
                } else if (obj && obj.hasOwnProperty('KEY_CODE') && obj.hasOwnProperty('VALUE') && obj['KEY_CODE'] == 'AD_RED_URI') {
                    this.sessionManager.adRedirectUrl = atob(obj['VALUE']);
                } else if (obj && obj.hasOwnProperty('KEY_CODE') && obj.hasOwnProperty('VALUE') && obj['KEY_CODE'] == 'AD_LINK_MAIN') {
                    this.sessionManager.mainLink = atob(obj['VALUE']);
                } else if (obj && obj.hasOwnProperty('KEY_CODE') && obj.hasOwnProperty('VALUE') && obj['KEY_CODE'] == 'AD_SCOPE') {
                    this.sessionManager.scope = atob(obj['VALUE']);
                } else if (obj && obj.hasOwnProperty('KEY_CODE') && obj.hasOwnProperty('VALUE') && obj['KEY_CODE'] == 'AD_CLIENT_ID') {
                    this.sessionManager.clientID = atob(obj['VALUE']);
                } else if (obj && obj.hasOwnProperty('KEY_CODE') && obj.hasOwnProperty('VALUE') && obj['KEY_CODE'] == 'AD_NONCE') {
                    this.sessionManager.nonce = atob(obj['VALUE']);
                } else if (obj && obj.hasOwnProperty('KEY_CODE') && obj.hasOwnProperty('VALUE') && obj['KEY_CODE'] == 'AD_CLI_INFO') {
                    this.sessionManager.clientInfo = atob(obj['VALUE']);
                } else if (obj && obj.hasOwnProperty('KEY_CODE') && obj.hasOwnProperty('VALUE') && obj['KEY_CODE'] == 'AD_CLIENT_REQ_ID') {
                    this.sessionManager.clientRequestId = atob(obj['VALUE']);
                }
                
                
            })
        });
    }
    updateTheme(theme: string) {
        const fieldElement = <HTMLBodyElement>(document.getElementsByTagName('body')[0]);
        fieldElement.classList.remove("s4-theme", "deeppurple-amber", "pink-bluegrey", "purple-green", "indigo-pink", "light-and-clean", "aqua-theme", "teal-color-theme", "orange-color-theme");
        fieldElement.classList.add(theme);
    }
    removeLanguage = (langid: string, langs: any[]): any[] => {
        langs = langs.filter(lang => lang.id !== 'dev');
        return langs;
    }

    changeMode() {
        this.loginService.setLiveMode(this.liveMode);
        this.referenceDomainService.setLiveMode(this.liveMode);
        this.referenceDomainService.clearCache();
        this.lovService.clearCache();
        this.lovService.setLiveMode(this.liveMode);
    }

    loadUiConfigData() {
        this.ocmpconfService.loadData().subscribe(data => {
            this.uiCustomizeService.setUiConfigData(data);
        });
    }
    sysPflExecuteQuery() {
        const syspflResult = this.loginService.specficPropertyType();
        syspflResult.subscribe(syspflResultList => {
            let DojIndex = syspflResultList.findIndex(x => x.profileCode === 'DOJ_SUPPORT');
            if(syspflResultList[DojIndex].profileValue && syspflResultList[DojIndex].profileValue.toUpperCase() == 'Y'){
                this.isDOJActive = true;
            } else {
                this.isDOJActive = false;
            }
            let langIndex = syspflResultList.findIndex(x => x.profileCode === 'LANG_SUPPORT'); //
            if(syspflResultList[langIndex].profileValue == 'Y'){
                this.isLangActive = true;
            } else {
                this.isLangActive = false;
            }
        });
      }
}
