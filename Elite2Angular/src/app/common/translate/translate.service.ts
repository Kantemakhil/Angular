import { Global } from '@core/classes/Global';
/**
 * New typescript file
 */
import { Injectable } from '@angular/core';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { AppConstants } from '@core/classes/appConstants';
import { PhoneNumberUtils } from '@core/ui-components/phone/phone-number-utils';
import { MessageComponent } from '@core/ui-components/message/message.component';
import { CalendarProfile } from '@core/ui-components/schedule/calendar-profile';
import { PasswordComponent } from '@core/ui-components/password/password.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { HttpClient, HttpClientModule } from '@angular/common/http';

 
@Injectable({providedIn: 'root'})
export class TranslateService {
  private _currentLang: string;

  private _loginmsgs: any;

  private _langoptions: any[];

  private _appmsgs: any;

  constructor(private sessionManager: UserSessionManager, private http: HttpClient) { }

  public set appmsgs(appmsgs: any) {
    this._appmsgs = appmsgs;
  }

  public get langoptions(): any[] {
    return this._langoptions;
  }

  public set langoptions(options: any[]) {
    this._langoptions = options;
  }

  public set loginmsgs(loginmsgs: any) {
    this._loginmsgs = loginmsgs;
  }

  public get browserLanguage(): string {
    let lang = navigator.language;
    // ignore the locale for now
    if (lang.indexOf('-') > 0) {
      lang = lang.substring(0, lang.indexOf('-'));
    }
    return lang;
  }

  public hasloginMsgs(): boolean {
    if (this._loginmsgs) {
      return true;
    } else {
      if (typeof (Storage) !== 'undefined') {
        const langmsgsdata: string = sessionStorage.getItem('langmsgs');
        const calendarDisplayList = sessionStorage.getItem('calendarDisplay');
        if (langmsgsdata) {
          const localdata = JSON.parse(langmsgsdata);
          if (localdata) {
            this._langoptions = localdata.languages;
            this._loginmsgs = localdata.msgs;
            this._currentLang = localdata.lang;
            this.loadProfiles();
            if(calendarDisplayList){
              CalendarProfile.displayList=JSON.parse(calendarDisplayList);
            }
            return true;
          }
        }
      }
    }
    return false;
  }
 loadProfiles() {
    if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.DATE_KEY)) {
      DateFormat.dateFormat = this._loginmsgs[AppConstants.DATE_KEY];
    }
    if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.PHONE_KEY)) {
      PhoneNumberUtils.phoneFormat = this._loginmsgs[AppConstants.PHONE_KEY];
    }
    if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.PHONE_PREFIX_KEY)) {
      PhoneNumberUtils.phonePrefix = this._loginmsgs[AppConstants.PHONE_PREFIX_KEY];
    }
    if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.POPUP_DURATION_KEY)) {
      MessageComponent.duration = this._loginmsgs[AppConstants.POPUP_DURATION_KEY];
    }
    if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.MSG_TOAST_POS)) {
      MessageComponent._msgToastDefPosition = this._loginmsgs[AppConstants.MSG_TOAST_POS];
    }
    if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.PWD_REGX)) {
      PasswordComponent._passwordRegx = this._loginmsgs[AppConstants.PWD_REGX];
    }
    if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.PWD_VAL_MSG)) {
      PasswordComponent._validationMsg = this._loginmsgs[AppConstants.PWD_VAL_MSG];
    }

    this.loadAdData();

    // if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.AD_REDIRECT_URI)) {
    //   this.sessionManager.adRedirectUrl = this._loginmsgs[AppConstants.AD_REDIRECT_URI];
    // }
    // if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.AD_LINK_MAIN)) {
    //     console.log(this._loginmsgs[AppConstants.AD_LINK_MAIN])
    //     this.sessionManager.mainLink = this._loginmsgs[AppConstants.AD_LINK_MAIN];
    // }
    // if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.AD_SCOPE)) {
    //     this.sessionManager.scope = this._loginmsgs[AppConstants.AD_SCOPE];
    // }
    // if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.AD_CLIENT_ID)) {
    //     this.sessionManager.clientID = this._loginmsgs[AppConstants.AD_CLIENT_ID];
    // }
    // if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.AD_STATE)) {
    //     this.sessionManager.state = this._loginmsgs[AppConstants.AD_STATE];
    // }
    // if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.AD_NONCE)) {
    //     this.sessionManager.nonce = this._loginmsgs[AppConstants.AD_NONCE];
    // }
    // if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.AD_CLIENT_INFO)) {
    //     this.sessionManager.clientInfo = this._loginmsgs[AppConstants.AD_CLIENT_INFO];
    // }
    // if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.AD_CLIENT_REQ_ID)) {
    //     this.sessionManager.clientRequestId = this._loginmsgs[AppConstants.AD_CLIENT_REQ_ID];
    // }
    if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.GRANT_USER)) {
        PasswordComponent._grantUser = this._loginmsgs[AppConstants.GRANT_USER];
    }
    if (this._loginmsgs && this._loginmsgs.hasOwnProperty(AppConstants.SHOW_ICONS)) {
        Global.showTaskIcons= this._loginmsgs[AppConstants.SHOW_ICONS];
    }
  }
  public get currentLang() {
    return this._currentLang;
  }

  public set currentLang(lang: string) {
    this._currentLang = lang;
  }

  public loginTranslate(key: string): string {
    if (this._loginmsgs && this._loginmsgs.hasOwnProperty(key)) {
      return this._loginmsgs[key];
    }
    return key;
  }

  public translate(key: string): string {
    if (this._appmsgs && this._appmsgs.hasOwnProperty(key)) {
      return this._appmsgs[key];
    }
    return key;
  }

  public hasAppMsgs(): boolean {
    if (this._appmsgs) {
      return true;
    } else {
      return false;
    }
  }



  loadAdConfiguration(settingType,providerCode) {
    return this.http.get('/Elite2Web/api/getSysSetConfADData');
  }


  loadAdData(){
    // this.oumsysetModel.settingType = 'AD';
    // this.oumsysetModel.settingProviderCode = 'AZUREAD';
        this.loadAdConfiguration('AD','AZUREAD').subscribe((result:any) => {
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


}
