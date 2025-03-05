import {
  Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumcpassService } from '../service/oumcpass.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StaffMembers } from '@inst/incidents-oic/beans/StaffMembers';
import { PasswordComponent } from '@core/ui-components/password/password.component';
import { EVENT_ACTION_CLASS } from '@syncfusion/ej2-schedule/src/schedule/base/css-constant';
@Component({
  selector: 'app-oumcpass',
  templateUrl: './oumcpass.component.html'
})

export class OumcpassComponent implements OnInit {
  readonlyOldFlag = true;
  user: any;
  actionName: string;
  msgs: any[] = [];
  display: boolean;
  name: string;
  address: string;
  addressOne: string;
  addressTwo: string;
  staffmemberModel: StaffMembers = new StaffMembers();
  enterPassword: boolean;
  containSpecialChar: boolean;
  containsatleastChar: boolean;
  alphacharIcon: string;
  lowerCaseIcon: string;
  upperCaseIcon: string;
  numIcon: string;
  spclCharIcon: string;
  minLengthIcon: string;
  alphacharStyle: any;
  upperCaseStyle: any;
  lowerCaseStyle: any;
  numStyle: any;
  spclCharStyle: any;
  minLengthStyle: any;
  passMatch: string;

  defaultStyle = { 'color': 'blue', 'vertical-align': 'middle' }
  successStyle = { 'color': 'green', 'vertical-align': 'middle' }
  redStyle = { 'color': 'red', 'vertical-align': 'middle' }

  constructor(private oumcpassFactory: OumcpassService,
    public translateService: TranslateService, public sessionManager: UserSessionManager) {
  }
  ngOnInit() {
    this.enterPassword = true;
    this.name = this.sessionManager.getId();
    this.address = '';
    this.address = undefined;
    if (this.sessionManager.getId() === 'OMS_OWNER') {
      this.readonlyOldFlag = true;
    } else {
      this.readonlyOldFlag = false;
    }
  }
  get readonlyFlag() {
    if (this.sessionManager.getId() === 'OMS_OWNER') {
      return true;
    } else if (!this.address) {
      return true;
    }
    return false;
  }
  get readOnlyVerifyFlag () {
    if (this.sessionManager.getId() === 'OMS_OWNER') {
      return true;
    } else if (!this.address || !this.addressOne) {
      return true;
    }
    return false;
  }
  /**
 * This function displays the messages
 */
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  save() {
    if (this.name === 'OMS_OWNER') {
      this.show(this.translateService.translate('oumcpass.youcannotchangethepassword'));
      return;
    }
    if (!this.address) {
      this.show(this.translateService.translate('oumcpass.oldpasswordmustbeentered'));
      return;
    }
    if (!this.addressOne) {
      this.show(this.translateService.translate('oumcpass.newpasswordmustbeentered'));
      return;
    }
    if (!this.addressTwo) {
      this.show(this.translateService.translate('oumcpass.verificationmustbeentered'));
      return;
    }
    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&^#_])/;
    if (pattern.test(this.addressOne) && /^[(a-z)|(A-Z)]/.test(this.addressOne)) {
      this.authenticate();
    } else {
      this.show(this.translateService.translate('oumcpass.pleaseentervalidpassword'), 'warn');
    }
  }
  authenticate() {
    const pass = btoa(this.address);
    const result = this.oumcpassFactory.
      authenticate(this.name, pass);
    result.subscribe(isvalid => {
      if (isvalid) {
        if (!this.addressOne) {
          this.show(this.translateService.translate('oumcpass.newpasswordmustbeentered'));
          return;
        } else {
          this.validatePassword();
        }
      } else {
        this.show(this.translateService.translate('oumcpass.invalidoldpassword'));
        this.address = undefined;
        this.addressOne = undefined;
        this.addressTwo = undefined;
        this.enterPassword = true;
        return;
      }
    });
  }
  validatePassword() {
    if (this.address === this.addressOne) {
      this.show(this.translateService.translate('oumcpass.thenewpasswordcannotbethesameastheoldpassword'));
      this.addressOne = undefined;
      this.addressTwo = undefined;
      this.enterPassword = true;
      return;
    } else if (this.name === this.addressOne) {
      this.show(this.translateService.translate('oumcpass.thenewpasswordcannotbethesameastheuserid'));
      this.addressOne = undefined;
      this.addressTwo = undefined;
      this.enterPassword = true;
      return;
    } else if (!this.addressTwo) {
      this.show(this.translateService.translate('oumcpass.verificationmustbeentered'));
      return;
    } else if (this.addressOne !== this.addressTwo) {
      this.show(this.translateService.translate('oumcpass.passwordsarenotthesameretypepassword'));
      this.addressTwo = undefined;
      return;
    }
    const regex = new RegExp(PasswordComponent._passwordRegx);
    const valid = regex.test(this.addressOne);
    if (valid) {
      this.changePassword();
    } else {
      this.show(this.translateService.translate("oumcpass.pleaseentervalidpassword"), 'warn');
    }
  }

  changePassword() {
    this.addressOne = btoa(this.addressOne);
    this.address = btoa(this.address);
    const saveResult = this.oumcpassFactory.
      changePassword(this.name, this.address, this.addressOne);
    saveResult.subscribe(result => {
      if (result === 1) {
        this.show(this.translateService.translate('common.passwordchangedsuccessfully'), 'success');
        this.clear();
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
      }
    });
    this.enterPassword = true;
  }
  clear() {
    this.enterPassword = true;
    this.passMatch = '';
    this.name = this.sessionManager.getId();
    this.address = undefined;
    this.addressOne = undefined;
    this.addressTwo = undefined;
  }
  get clearDisable() {
    if (this.address || this.addressOne || this.addressTwo) {
      return false;
    } else {
      return true;
    }
  }

  chngValue(event) {
    this.enterPassword = false;
    if ((!this.addressOne || this.addressOne.trim() === '') && this.addressTwo) {
      this.addressTwo = undefined;
    }
    this.lowerCaseIcon = /[a-z]/.test(event) ? 'done' : 'error';
    this.upperCaseIcon = /[A-Z]/.test(event) ? 'done' : 'error';
    this.numIcon = /[0-9]/.test(event) ? 'done' : 'error';
    this.spclCharIcon = /[@$!%*?&^#_]/.test(event) ? 'done' : 'error';
    this.minLengthIcon = event.length > 5 ? 'done' : 'error';
    this.alphacharIcon = /^[(a-z)|(A-Z)]/.test(event) ? 'done' : 'error';

    this.upperCaseStyle = /[A-Z]/.test(event) ? this.successStyle : this.redStyle;
    this.lowerCaseStyle = /[a-z]/.test(event) ? this.successStyle : this.redStyle;
    this.numStyle = /[0-9]/.test(event) ? this.successStyle : this.redStyle;
    this.spclCharStyle = /[@$!%*?&^#_]/.test(event) ? this.successStyle : this.redStyle;
    this.minLengthStyle = event.length > 5 ? this.successStyle : this.redStyle;
    this.alphacharStyle = /^[a-z|A-Z]/.test(event) ? this.successStyle : this.redStyle;
    if (this.addressTwo && (this.addressOne !== this.addressTwo)) {
      this.passMatch = 'Password did not match'
    } else if (this.addressTwo) {
      this.passMatch = 'Password matched';
    }
  }

  verifyValue(event) {
    if (this.addressOne === event) {
      this.passMatch = 'Password matched';
    } else {
      this.passMatch = 'Password did not match'
    }
  }
  oldPassChange(event) {
    if ((!this.address || this.address.trim() === '') && (this.addressOne || this.addressTwo)) {
      this.addressOne = undefined;
      this.addressTwo = undefined;
      this.enterPassword = true;
    }
  }
  changePassKey(event) {
    if (event.keyCode === 32) {
      return false;
    }
  }
}
