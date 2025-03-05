import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmcoactService } from '../service/ocmcoact.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AccountCodes } from '@inmate/trust/trustaccounts/beans/AccountCodes';
import { AccountCodesCommitBean } from '@inmate/trust/trustaccounts/beans/AccountCodesCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { LovService } from '@ui-components/lov/lov.service';

@Component({
  selector: 'app-ocmcoact',
  templateUrl: './ocmcoact.component.html'
})

export class OcmcoactComponent implements OnInit {
  @ViewChild('grid', {static: true}) grid: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  accodeData: AccountCodes[] = [];
  accodeDataTemp: AccountCodes[] = [];
  accodeModel: AccountCodes = new AccountCodes();
  accodeModelNew: AccountCodes = new AccountCodes();
  accodeCommitModel: AccountCodesCommitBean = new AccountCodesCommitBean();
  accodeIndex: number;
  accodeInsertList: AccountCodes[] = [];
  accodeUpdateList: AccountCodes[] = [];
  accodeDeleteList: AccountCodes[] = [];
  csldacd1Index: number;
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: boolean;
  acCodeColumnDef: any[];
  csldAcdColumnDef: any[];
  acCodeReadOnly: boolean;
  csldAcd1ReadOnly: boolean;
  csldAcdReadOnly: boolean;
  cgfkAccoderecaccountcodeRg: any[] = [];
  cgfkAccodeparentcodeRg: any[] = [];
  cgfkCsldacdcaseloadidRg: any[] = [];
  cgfkAccodeaccounttypeRg: any[] = [];
  cgfkAccodetxnpostingtypeRg: any[] = [];
  cgfkAccodesubaccounttypeRg: any[] = [];
  caseloadType: string;
  tableIndex = -1;
  recCodeLink: any;
  parentCodeLink: any;
  actype: any;
  acnTypeCur: any;
  accountCodeValid: boolean;
  caseloadAccountCodeValid: boolean;
  deleteOne: boolean;
  deleteTwo: boolean;
  deleteThree: boolean;
  deleteFour: boolean;
  deleteFive: boolean;
  deleteSix: boolean;
  deleteSeven: boolean;
  deleteEight: boolean;
  deleteNine: boolean;
  deleteTen: boolean;
  deleteEleven: boolean;
  deleteTwelve: boolean;
  deleteThirteen: boolean;
  deleteFourteen: boolean;
  accountCodesInsert: boolean;
  constructor(private ocmcoactFactory: OcmcoactService,
    public translateService: TranslateService,
    public sessionManager: UserSessionManager,
    public lovService: LovService) {
    this.acCodeColumnDef = [];
    this.csldAcdColumnDef = [];
  }
  ngOnInit() {
    this.recCodeLink = 'ocmcoact/cgfkAcCodeRecAccountCodeRecordGroup';
    this.parentCodeLink = 'ocmcoact/cgfkAcCodeParentCodeRecordGroup';
    this.accountCodesInsert = false;
    this.caseloadType = this.sessionManager.currentCaseLoadType;
    this.acCodeColumnDef = [
      {
        fieldName: this.trMsg('ocmcoact.actcodemandatory'), field: 'accountCode', datatype: 'number',
        editable: true, cellEditable: this.canAlertEdit, whole: true, width: 150, maxlength: 7, maxValue: 9999999, strictFP: true,required:true
      },
      { fieldName: this.trMsg('ocmcoact.accountnamemandatory'), field: 'accountName', editable: true, width: 150, datatype: 'text', maxlength: 40 ,required:true,uppercase: 'false'},
      { fieldName: this.trMsg('ocmcoact.post'), field: 'postingStatusFlag', editable: true, datatype: 'checkbox', width: 150 },
      {
        fieldName: this.trMsg('ocmcoact.acttypemandatory'), field: 'accountType', datatype: 'lov', domain: 'ACCOUNT_TYPE',required:true,
        editable: true, width: 150, titles: { code: this.trMsg('ocmcoact.acttype'), description: this.trMsg('common.description') }
      },
      {
        fieldName: this.trMsg('ocmcoact.posttype'), field: 'txnPostingType', editable: true, datatype: 'lov', domain: 'AC_TXN_POST',
        width: 150, titles: { code: this.trMsg('ocmcoact.posttype'), description: this.trMsg('common.description') }
      },
      {
        fieldName: this.trMsg('ocmcoact.subactype'), field: 'subAccountType', editable: true, datatype: 'lov', domain: 'SUB_AC_TYPE',
        width: 150, titles: { code: this.trMsg('ocmcoact.subactype'), description: this.trMsg('common.description') }
      },
      {
        fieldName: this.trMsg('ocmcoact.recvblecode'), field: 'recAccountCode', datatype: 'lov',
        link: 'ocmcoact/cgfkAcCodeRecAccountCodeRecordGroup', editable: true, width: 150,source:"OCMCOACT",
        titles: {
          code: this.trMsg('ocmcoact.recvblecode'), description: this.trMsg('common.accountname')
        }
      },
      {
        fieldName: this.trMsg('ocmcoact.parentcode'), field: 'parentAccountCode', datatype: 'lov',
        link: 'ocmcoact/cgfkAcCodeParentCodeRecordGroup', editable: true, width: 150, source:"OCMCOACT",
        titles: { code: this.trMsg('ocmcoact.parentcode'), description: this.trMsg('common.accountname') }
      },
      { fieldName: this.trMsg('ocmcoact.allquestionmark'), field: 'allCaseloadFlag', editable: true, datatype: 'checkbox', width: 150 },
    ];
    this.acCodeExecuteQuery();
  }
  canAlertEdit = (data: any, index: number, field: string): boolean => {
    if (!data.modifyDate) {
      return true;
    } else {
      return false;
    }
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

  allowNumbers(event) {
  }
  onRowClickcsldacd(event) {
  }
  ok() {
  }
  no() {
  }
 
  onOffenderChange(offender) {
  }
  onGridInsert = () => {
    for (let i = 0; i < this.accodeData.length; i++) {
      if (!this.accodeData[i].accountCode) {
        this.show('ocmcoact.actcodemustbeentered');
        return;
      }
      if (!this.accodeData[i].accountName) {
        this.show('ocmcoact.accountnamemustbeentered');
        return;
      }
      if (!this.accodeData[i].accountType) {
        this.show('ocmcoact.acttypemustbeentered');
        return;
      }
    }
    return {
      allCaseloadFlag: true, postingStatusFlag: true
    };
  }
  validateRowPayeesData = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    rowdata.validated = true;
    if (event.field === 'accountCode' && (event.newValue !== event.oldValue)) {
      const txntypeSaveData = this.ocmcoactFactory.accountCodeValidation(event.data.accountCode);
      txntypeSaveData.subscribe(data => {
        if (data && data === 'Y') {
          this.accountCodeValid = true;
        } else {
          this.accountCodeValid = false;
        }
      });
      const csldtypeSaveData = this.ocmcoactFactory.caseloadAccountCodeValidation(event.data.accountCode);
      csldtypeSaveData.subscribe(dataOne => {
        if (dataOne && dataOne === 'Y') {
          this.caseloadAccountCodeValid = true;
        } else {
          this.caseloadAccountCodeValid = false;
        }
      });
    }
    if (event.field === 'allCaseloadFlag' && (event.newValue !== event.oldValue) && event.newValue) {
      if (event.data.allCaseloadFlag === true && event.data.allCaseloadFlag === false) {
        const caseloadAcCodes = this.ocmcoactFactory.caselaodAccountCodes(event.data.accountCode, this.sessionManager.currentCaseLoad);
        caseloadAcCodes.subscribe(caseloadCodesResult => {
          if (caseloadCodesResult.length > 1) {
            this.show('ocmcoact.therearecaseloadsthisaccountcode');
            return rowdata;
          }
        });
      }
    } else if (event.field === 'subAccountType' && event.newValue !== event.oldValue) {
      const subAccountTypeDet = this.ocmcoactFactory.chkSubAcTypeTxnCur(event.data.accountCode, this.sessionManager.currentCaseLoad);
      subAccountTypeDet.subscribe(subAccountTypeResult => {
        if (subAccountTypeResult === 'AB') {
          this.actype = null;
        } else {
          this.actype = subAccountTypeResult;
        }
        const caseloadAcCodes = this.ocmcoactFactory.chkDupSubAcTypeCur(this.sessionManager.currentCaseLoad, event.data.subAccountType);
        caseloadAcCodes.subscribe(caseloadCodeResult => {
          if (caseloadCodeResult && (caseloadCodeResult !== event.data.accountCode) && caseloadCodeResult !== 11) {
            this.acnTypeCur = caseloadCodeResult;
            const msgs = this.trMsg('ocmcoact.subaccounttypehasalreadyassociated').replace('%accountCode%', event.data.subAccountType)
              .replace('%acnTypeCur%', this.acnTypeCur);
            this.show(msgs);
            this.acnTypeCur = null;
            this.grid.setColumnData('subAccountType', rowIndex, event.oldValue);
            return rowdata;
          }
          if (this.actype) {
            if ((!(!event.newValue) !== !(!event.oldValue)) && (!event.data.subAccountType &&
              this.actype) || event.data.subAccountType !== this.actype) {
              const msgg = this.trMsg('ocmcoact.transactionsexistedwithsubaccount').replace('%actype%', this.actype);
              this.show(msgg);
              this.grid.setColumnData('subAccountType', rowIndex, event.oldValue);
              return rowdata;
            }
          }
        });
      });
    }
    return rowdata;
  }
  onGridDelete = () => {
    if (this.deleteThirteen) {
      this.show('ocmcoact.accountcodeusedintransactionoperationscannotdelete');
      return;
    } else if (this.deleteFourteen) {
      this.show('ocmcoact.gltransactionsexistscannotdelete');
      return;
    } else if (this.deleteOne) {
      this.show('ocmcoact.deletevalidationone');
      return;
    } else if (this.deleteTwo) {
      this.show('ocmcoact.deletevalidationone');
      return;
    } else if (this.deleteThree) {
      this.show('ocmcoact.deletevalidationone');
      return;
    } else if (this.deleteFour) {
      this.show('ocmcoact.deletevalidationone');
      return;
    } else if (this.deleteFive) {
      this.show('ocmcoact.deletevalidationtwo');
      return;
    } else if (this.deleteSix) {
      this.show('ocmcoact.deletevalidationthree');
      return;
    } else if (this.deleteSeven) {
      this.show('ocmcoact.deletevalidationfour');
      return;
    } else if (this.deleteEight) {
      this.show('ocmcoact.deletevalidationfive');
      return;
    } else if (this.deleteNine) {
      this.show('ocmcoact.deletevalidationsix');
      return;
    } else if (this.deleteTen) {
      this.show('ocmcoact.deletevalidationseven');
      return;
    } else if (this.deleteEleven) {
      this.show('ocmcoact.deletevalidationeight');
      return;
    } else if (this.deleteTwelve) {
      this.show('ocmcoact.deletevalidationnine');
      return;
    }
    return true;
  }
  ocmcoactSaveaccodeForm(event) {
    this.accodeInsertList = JSON.parse(JSON.stringify(event.added));
    this.accodeUpdateList = JSON.parse(JSON.stringify(event.updated));
    this.accodeDeleteList = JSON.parse(JSON.stringify(event.removed));
    this.accodeCommitModel.insertList = [];
    this.accodeCommitModel.updateList = [];
    this.accodeCommitModel.deleteList = [];
    if (this.accodeInsertList.length > 0 || this.accodeUpdateList.length > 0) {
      for (let i = 0; i < this.accodeInsertList.length; i++) {
        if (!this.accodeInsertList[i].accountCode) {
          this.show('ocmcoact.actcodemustbeentered');
          return;
        }
        if (!this.accodeInsertList[i].accountName) {
          this.show('ocmcoact.accountnamemustbeentered');
          return;
        }
        if (!this.accodeInsertList[i].accountType) {
          this.show('ocmcoact.acttypemustbeentered');
          return;
        }
        if (this.accountCodeValid) {
          this.show('ocmcoact.rowexistsalreadywithsameactcode');
          return;
        }
        if (this.caseloadAccountCodeValid) {
          this.show('ocmcoact.rowexistsalreadywithsamecaseloadcode');
          return;
        }
        this.accodeInsertList[i].listSeq = 99;
        this.accodeInsertList[i].parentAccountCode = Number(this.accodeInsertList[i].parentAccountCode);
        this.accodeInsertList[i].recAccountCode = Number(this.accodeInsertList[i].recAccountCode);
        this.accodeInsertList[i].postingStatusFlag = this.accodeInsertList[i].postingStatusFlag ? 'Y' : 'N';
        this.accodeInsertList[i].allCaseloadFlag = this.accodeInsertList[i].allCaseloadFlag ? 'Y' : 'N';
        this.accodeInsertList[i].caseloadType = this.sessionManager.currentCaseLoadType;
        this.accodeInsertList[i].caseloadId = this.sessionManager.currentCaseLoad;
        this.accodeInsertList[i].modifyDate = DateFormat.getDate();
        this.accodeInsertList[i].createDatetime = DateFormat.getDate();
        this.accodeInsertList[i].createUserId = this.sessionManager.getId();
        this.accodeInsertList[i].modifyUserId = this.sessionManager.getId();
        this.accodeCommitModel.insertList = this.accodeInsertList;
      }
      for (let i = 0; i < this.accodeUpdateList.length; i++) {
        if (!this.accodeUpdateList[i].accountCode) {
          this.show('ocmcoact.actcodemustbeentered');
          return;
        }
        if (!this.accodeUpdateList[i].accountName) {
          this.show('ocmcoact.accountnamemustbeentered');
          return;
        }
        if (!this.accodeUpdateList[i].accountType) {
          this.show('ocmcoact.acttypemustbeentered');
          return;
        }
        this.accodeUpdateList[i].postingStatusFlag = this.accodeUpdateList[i].postingStatusFlag ? 'Y' : 'N';
        this.accodeUpdateList[i].allCaseloadFlag = this.accodeUpdateList[i].allCaseloadFlag ? 'Y' : 'N';
        this.accodeCommitModel.updateList = this.accodeUpdateList;
      }
    }
    if (this.accodeDeleteList.length > 0) {
      for (let i = 0; i < this.accodeDeleteList.length; i++) {
        this.accodeDeleteList[i].postingStatusFlag = this.accodeDeleteList[i].postingStatusFlag ? 'Y' : 'N';
        this.accodeDeleteList[i].allCaseloadFlag = this.accodeDeleteList[i].allCaseloadFlag ? 'Y' : 'N';
        this.accodeCommitModel.deleteList = this.accodeDeleteList;
      }
    }
    const accodeSaveData = this.ocmcoactFactory.acCodeCommit(this.accodeCommitModel);
    accodeSaveData.subscribe(data => {
      if (data && String(data) === '1' || typeof data === 'object') {
        this.accodeData = [];
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.lovService.clear(this.recCodeLink);
        this.lovService.clear(this.parentCodeLink);
        this.accodeModel = new AccountCodes();
        this.acCodeExecuteQuery();
        return;
      } else if (String(data).includes('ACCOUNT_CODES_PK')) {
        this.show('ocmcoact.rowexistsalreadywithsameactcode');
      } else if (String(data).includes('CASELOAD_ACCOUNT_CODES_PK')) {
        this.show('ocmcoact.rowexistsalreadywithsamecaseloadcode');
      } else if (String(data).includes('CSLD_CAB_AC_CODE_F1')) {
        this.show('ocmcoact.childrecordfound');
      }  else if (String(data).includes('MIN_PB_AC_CODE_F1')) {
        this.show('Cannot delete Chart of while dependent MINIMUM_PAYABLE_BALANCES exists');
      }else if (String(data).includes('AC_CODE_AC_CODE_F5')) {
        this.show('Cannot delete Chart of account while dependent ACCOUNT_CODES exists');
      }else {
        this.show('common.addupdateremoverecordfailed');
        this.acCodeExecuteQuery();
        return;
      }
    });
  }
  acCodeExecuteQuery() {
    this.accodeModel.caseloadType = this.caseloadType;
    const reqData = JSON.parse(JSON.stringify(this.accodeModel));
    const serviceObj = this.ocmcoactFactory.acCodeExecuteQuery(reqData);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.accodeData = [];
        this.show('common.querycaused');
        return;
      } else {
        data.forEach(element => {
          element.postingStatusFlag = element.postingStatusFlag === 'Y' ? true : null;
          element.allCaseloadFlag = element.allCaseloadFlag === 'Y' ? true : null;
          element.parentAccountCode = String(element.parentAccountCode);
          element.recAccountCode = String(element.recAccountCode);
        });
        this.accodeData = data;
        this.tableIndex = 0;
      }
    });
  }
  onRowClickaccode(event) {
    if (event) {
      if (!event.modifyDate) {
        this.accountCodesInsert = false;
      } else {
        this.accountCodesInsert = true;
      }
      this.accodeModelNew = event;
      if (this.accodeModelNew.modifyDate) {

      }
      if (this.accodeModelNew.accountCode) {
        const deleteTxnType = this.ocmcoactFactory.txnTypeOnCheckDeleteMaster(this.accodeModelNew.accountCode);
        deleteTxnType.subscribe(deleteData => {
          if (deleteData === 1) {
            this.deleteOne = true;
          } else {
            this.deleteOne = false;
          }
          if (deleteData === 2) {
            this.deleteTwo = true;
          } else {
            this.deleteTwo = false;
          }
          if (deleteData === 3) {
            this.deleteThree = true;
          } else {
            this.deleteThree = false;
          }
          if (deleteData === 4) {
            this.deleteFour = true;
          } else {
            this.deleteFour = false;
          }
          if (deleteData === 5) {
            this.deleteFive = true;
          } else {
            this.deleteFive = false;
          }
          if (deleteData === 6) {
            this.deleteSix = true;
          } else {
            this.deleteSix = false;
          }
          if (deleteData === 7) {
            this.deleteSeven = true;
          } else {
            this.deleteSeven = false;
          }
          if (deleteData === 8) {
            this.deleteEight = true;
          } else {
            this.deleteEight = false;
          }
          if (deleteData === 9) {
            this.deleteNine = true;
          } else {
            this.deleteNine = false;
          }
          if (deleteData === 10) {
            this.deleteTen = true;
          } else {
            this.deleteTen = false;
          }
          if (deleteData === 11) {
            this.deleteEleven = true;
          } else {
            this.deleteEleven = false;
          }
          if (deleteData === 12) {
            this.deleteTwelve = true;
          } else {
            this.deleteTwelve = false;
          }
          if (deleteData === 13) {
            this.deleteThirteen = true;
          } else {
            this.deleteThirteen = false;
          }
          if (deleteData === 14) {
            this.deleteFourteen = true;
          } else {
            this.deleteFourteen = false;
          }
        });
      }
    }
  }
  getMask = (index, col, data) => {
    return {
      mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
      placeholderChar: '0'
    };
  }
}
