
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmbaccoService } from '../service/otmbacco.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CaseloadCurrentAccountsBase } from '@inmate/trust/checks/beans/CaseloadCurrentAccountsBase';
import { BankAccountsMaintenances } from '@inmate/trust/checks/beans/BankAccountsMaintenances';
import { BankAccountsMaintenancesCommitBean } from '@inmate/trust/checks/beans/BankAccountsMaintenancesCommitBean';
import { CaseloadCurrentAccountsBaseCommitBean } from '@inmate/trust/checks/beans/CaseloadCurrentAccountsBaseCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';

@Component({
  selector: 'app-otmbacco',
  templateUrl: './otmbacco.component.html'
})

export class OtmbaccoComponent implements OnInit {
  @ViewChild('grid') grid: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  csldcabData: CaseloadCurrentAccountsBase[] = [];
  csldcabDataTemp: CaseloadCurrentAccountsBase[] = [];
  csldcabModel: CaseloadCurrentAccountsBase = new CaseloadCurrentAccountsBase();
  csldcabCommitModel: CaseloadCurrentAccountsBaseCommitBean = new CaseloadCurrentAccountsBaseCommitBean();
  bankamCommitModel: BankAccountsMaintenancesCommitBean = new BankAccountsMaintenancesCommitBean();
  csldcabInsertList: CaseloadCurrentAccountsBase[] = [];
  csldcabUpdatetList: CaseloadCurrentAccountsBase[] = [];
  csldcabDeleteList: CaseloadCurrentAccountsBase[] = [];
  bankamData: BankAccountsMaintenances[] = [];
  bankamDataTemp: BankAccountsMaintenances[] = [];
  bankamModel: BankAccountsMaintenances = new BankAccountsMaintenances();
  bankamInsertList: BankAccountsMaintenances[] = [];
  bankamUpdatetList: BankAccountsMaintenances[] = [];
  bankamDeleteList: BankAccountsMaintenances[] = [];
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  csldCabColumnDef: any[];
  type = 'error';
  msglist = [];
  message = ' Invalid.';
  accountCode: any;
  tableIndex = -1;
  payeeCorporateId: any;
  insertFlag: boolean;
  savedisabled: any;
  isLoading: boolean;
  namesReadOnly: boolean;
  retriveDisable: boolean;
  bankamaccountCode: any;
  validFlag: boolean;
  titles = {'code' : this.trMsg('otmbacco.glcode'), 'description' : this.trMsg('common.accountname')};
  constructor(private otmbaccoFactory: OtmbaccoService,
    public translateService: TranslateService,
    public sessionManager: UserSessionManager,
    public dialogService: DialogService) {
    this.csldCabColumnDef = [];
  }
  ngOnInit() {
    this.namesReadOnly = false;
    this.retriveDisable = false;
    this.savedisabled = true;
    this.csldCabColumnDef = [
      {
        fieldName: this.trMsg('otmbacco.glcodemandatory'), field: 'accountCode', datatype: 'lov',
        link: 'otmbacco/cgfkCsldCabAccountCodeRecordGroup', editable: false, width: 150
      },
      {
        fieldName: this.trMsg('common.type'), field: 'bankAccountType', datatype: 'lov', domain: 'BANK_AC_TYPE',
        editable: true, width: 150, titles: { code: 'Type', description: 'Description' }
      },
      {
        fieldName: this.trMsg('otmbacco.bankacct'), field: 'bankAccountNumber', datatype: 'text',
        editable: true, width: 150, maxlength: 25, uppercase: 'false'
      },
      {
        fieldName: this.trMsg('otmbacco.routeno'), field: 'routingNumber', datatype: 'number',
        maxValue: 999999999, strictFP: true, whole: true, editable: true, width: 150, minValue: -999999999
      },
      {
        fieldName: this.trMsg('otmbacco.bank'), field: 'payeeCorporateId', editable: true, datatype: 'number',
        maxValue: 999999999, strictFP: true, whole: true, width: 150
      },
      {
        fieldName: '', field: 'goButton', datatype: 'launchbutton', modal: true, data: 'row', updateField: 'row',
        onLaunchClick: this.caGoBtnClick, editable: true, width: 150
      },
      { fieldName: this.trMsg('common.name'), field: 'corporateName', editable: false, width: 150 },
    ];
    this.otmbaccoexecuteQuery();
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
  trMsg(msg, astr?) {
    return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
  }
  onRowClickcsldcab(event) {
    if (event) {
      this.csldcabModel = event;
      if (this.csldcabModel.accountCode) {
        this.bankamModel = new BankAccountsMaintenances();
        this.bankamExecuteQuery();
      }
    }
  }
 
  caGoBtnClick = (event) => {
    this.dialogService.openLinkDialog('/OTUCPAYE', event, 80).subscribe(dlgData => {
      if (dlgData && dlgData.corporateId) {
        this.grid.setColumnData('payeeCorporateId', this.csldcabData.indexOf(event), dlgData.corporateId);
        this.grid.setColumnData('corporateName', this.csldcabData.indexOf(event), dlgData.corpName);
      }
    });
    return true;
  }
  allowNumbers(event) {
  }
  ok() {
  }
  no() {
    this.bankamModel = new BankAccountsMaintenances();
    this.payeeCorporateId = null;
  }
  
  onOffenderChange(offender) {
  }

  /**
   *  This function will be executed when commit event is
  * fired
  */
  otmbaccoSavecsldcabForm(event) {
    this.csldcabInsertList = event.added;
    this.csldcabUpdatetList = event.updated;
    this.csldcabDeleteList = event.removed;
    this.csldcabCommitModel.insertList = [];
    this.csldcabCommitModel.updateList = [];
    this.csldcabCommitModel.deleteList = [];
    if (this.csldcabInsertList.length > 0) {
      for (let i = 0; i < this.csldcabInsertList.length; i++) {
        this.csldcabUpdatetList[i].accountCode = Number(this.csldcabUpdatetList[i].accountCode);
        this.csldcabUpdatetList[i].modifyDate = DateFormat.getDate();
        this.csldcabUpdatetList[i].caseloadId = this.sessionManager.currentCaseLoad;
        this.csldcabCommitModel.insertList = this.csldcabInsertList;
      }
    }
    if (this.csldcabUpdatetList.length > 0) {
      for (let i = 0; i < this.csldcabUpdatetList.length; i++) {
        this.csldcabUpdatetList[i].accountCode = Number(this.csldcabUpdatetList[i].accountCode);
        if (!this.csldcabUpdatetList[i].bankAccountType) {
          this.csldcabUpdatetList[i].bankAccountNumber = null;
          this.csldcabUpdatetList[i].payeeCorporateId = null;
          this.csldcabUpdatetList[i].corporateName = null;
        }
        this.csldcabCommitModel.updateList = this.csldcabUpdatetList;
      }
    }
    if (this.csldcabDeleteList.length > 0) {
      for (let i = 0; i < this.csldcabDeleteList.length; i++) {
      }
      this.csldcabCommitModel.deleteList = this.csldcabDeleteList;
    }
    const csldcabSaveData = this.otmbaccoFactory.csldCabCommit(this.csldcabCommitModel);
    csldcabSaveData.subscribe(data => {
      if (data === 3) {
        this.show('otmbacco.accountperiodidnotfound');
        return;
      } else if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.csldcabModel = new CaseloadCurrentAccountsBase();
        this.otmbaccoexecuteQuery();
        return;
      } else {
        this.show('common.addupdateremoverecordfailed');
        this.csldcabModel = new CaseloadCurrentAccountsBase();
        this.otmbaccoexecuteQuery();
        return;
      }
    });
  }
  otmbaccoexecuteQuery() {
    this.csldcabModel.caseloadId = this.sessionManager.currentCaseLoad;
    this.csldcabModel.caseloadType = this.sessionManager.currentCaseLoadType;
    const serviceObj = this.otmbaccoFactory.csldCabExecuteQuery(this.csldcabModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.csldcabData = [];
        this.bankamData = [];
        this.payeeCorporateId = null;
        this.savedisabled = true;
        this.show('common.querycaused');
        return;
      } else {
        data.forEach(element => {
          element['goButton'] = '...';
          element.accountCode = String(element.accountCode);
        });
        this.csldcabData = data;
        this.namesReadOnly = true;
        this.retriveDisable = true;
        this.tableIndex = 0;
      }
    });
  }

  bankamExecuteQuery() {
    this.bankamModel.accountCode = Number(this.csldcabModel.accountCode);
    this.bankamaccountCode = this.csldcabModel.accountCode;
    this.bankamModel.caseloadId = this.csldcabModel.caseloadId;
    const bankamResult = this.otmbaccoFactory.bankAmExecuteQuery(this.bankamModel);
    bankamResult.subscribe(data => {
      if (data.length === 0) {
        this.bankamData = [];
        this.bankamModel = new BankAccountsMaintenances();
        this.bankamModel.accountCode = this.csldcabModel.accountCode;
        this.bankamModel.caseloadId = this.csldcabModel.caseloadId;
        this.payeeCorporateId = this.csldcabModel.corporateName;
        this.insertFlag = true;
      } else {
        this.bankamData = data;
        this.bankamModel = this.bankamData[0];
        this.payeeCorporateId = this.csldcabModel.corporateName;
        this.insertFlag = false;
      }
    });
  }

  onButSave() {
    this.bankamInsertList = [];
    this.bankamUpdatetList = [];
    this.bankamCommitModel.updateList = [];
    this.bankamCommitModel.insertList = [];
    this.bankamModel.createUserId = this.sessionManager.getId();
    this.bankamModel.modifyUserId = this.sessionManager.getId();
    this.bankamModel.createDatetime = DateFormat.getDate();
    this.bankamModel.modifyDatetime = DateFormat.getDate();
    this.bankamModel.accountCode = Number(this.bankamaccountCode);
    if (this.insertFlag) {
      this.bankamModel.activeFlag = this.bankamModel.activeFlag ? 'Y' : 'N';
      this.bankamInsertList.push(this.bankamModel);
      this.bankamCommitModel.insertList = this.bankamInsertList;
    } else {
      this.bankamModel.activeFlag = this.bankamModel.activeFlag ? 'Y' : 'N';
      this.bankamUpdatetList.push(this.bankamModel);
      this.bankamCommitModel.updateList = this.bankamUpdatetList;
    }
    if (!this.savedisabled && !this.isLoading) {
      this.isLoading = true;
      const alertSaveData = this.otmbaccoFactory.bankAmCommit(this.bankamCommitModel);
      alertSaveData.subscribe(alertSaveResult => {
        this.isLoading = false;
        if (alertSaveResult === 1) {
          this.insertFlag = false;
          this.savedisabled = true;
          this.show('common.addupdateremoverecordsuccess', 'success');
          return;
        }
      }, err => {
        this.isLoading = false;
      });
    }
  }
  isInsertable() {
    if (this.bankamModel.clientId || this.bankamModel.originatorId || this.bankamModel.bkAccountDesc
      || this.bankamModel.commentText) {
      this.savedisabled = false;
    } else {
      this.savedisabled = true;
    }
  }
  validateRowData = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    rowdata.validated = true;
    if (event.field === 'bankAccountType' && !event.data.bankAccountType) {
      this.grid.setColumnData('bankAccountNumber', rowIndex, null);
      this.grid.setColumnData('payeeCorporateId', rowIndex, null);
      this.grid.setColumnData('corporateName', rowIndex, null);
      return rowdata;
    }
    this.validFlag = true;
    if (event.field === 'payeeCorporateId' && (event.newValue !== event.oldValue) && event.newValue && this.validFlag) {
      this.validFlag = false;
      const corporeteName = this.otmbaccoFactory.corporeteNameData(event.data.payeeCorporateId);
      corporeteName.subscribe(corpName => {
        if (corpName !== 'X') {
          this.grid.setColumnData('corporateName', rowIndex, corpName);
        } else {
          this.grid.setColumnData('corporateName', rowIndex, null);
          this.grid.setColumnData('payeeCorporateId', rowIndex, null);
          this.show('otmbacco.payeecorporateidenteredcannotbefound');
          return rowdata;
        }
      });
    } else if (event.data.payeeCorporateId === 0) {
      this.grid.setColumnData('corporateName', rowIndex, null);
      this.grid.setColumnData('payeeCorporateId', rowIndex, null);
      this.show('otmbacco.payeecorporateidenteredcannotbefound');
      return rowdata;
    }
    return rowdata;
  }
  clearDisable() {
    if (this.accountCode || this.csldcabData.length > 0) {
            return false;
        }
        return true;
}
}
