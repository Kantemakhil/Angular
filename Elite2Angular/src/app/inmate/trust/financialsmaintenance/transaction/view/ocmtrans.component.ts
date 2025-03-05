import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmtransService } from '../service/ocmtrans.service';
import { TransactionTypes } from '@inmate/trust/checks/beans/TransactionTypes';
import { CaseloadTransactionTypes } from '@inmate/beans/CaseloadTransactionTypes';
import { TransactionPayees } from '@inmate/trust/financialsmaintenance/transaction/beans/TransactionPayees';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { TransactionTypesCommitBean } from '@inmate/trust/checks/beans/TransactionTypesCommitBean';
import { TransactionPayeesCommitBean } from '@inmate/trust/financialsmaintenance/transaction/beans/TransactionPayeesCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
  selector: 'app-ocmtrans',
  templateUrl: './ocmtrans.component.html'
})

export class OcmtransComponent implements OnInit {
  @ViewChild('grid', { static: true }) grid: any;
  @ViewChild('payeegrid') payeegrid: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  txntypeData: TransactionTypes[] = [];
  txntypeDataTemp: TransactionTypes[] = [];
  txntypeModel: TransactionTypes = new TransactionTypes();
  txntypeModelTemp: TransactionTypes = new TransactionTypes();
  txntypeCommitModel: TransactionTypesCommitBean = new TransactionTypesCommitBean();
  txntypeInsertList: TransactionTypes[] = [];
  txntypeUpdateList: TransactionTypes[] = [];
  txntypeDeleteList: TransactionTypes[] = [];
  csldttData: CaseloadTransactionTypes[] = [];
  txnpayeeData: TransactionPayees[] = [];
  txnpayeeModel: TransactionPayees = new TransactionPayees();
  txnpayeeCommitModel: TransactionPayeesCommitBean = new TransactionPayeesCommitBean();
  txnpayeeInsertList: TransactionPayees[] = [];
  txnpayeeUpdateList: TransactionPayees[] = [];
  txnpayeeDeleteList: TransactionPayees[] = [];
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: boolean;
  cgfkTxntypecreditobligatioRg: any[] = [];
  cgfkTxnpayeepayeepersonidRg: any[] = [];
  cgfkTxnpayeepayeecorporateRg: any[] = [];
  cgfkCsldttcaseloadidRg: any[] = [];
  cgfkTxntypetxnusageRg: any[] = [];
  transColumnDefs: any[];
  txnpayeeColumnDefs: any[];
  type = 'error';
  msglist = [];
  message = ' Invalid.';
  clearDisable: boolean;
  retriveDisable: boolean;
  tableIndex = -1;
  payeesIndex = -1;
  namesReadOnly: boolean;
  ckeckboxReadOnly: boolean;
  txntypeTemp: string;
  txnInsert: boolean;
  txnPayeeInsert: boolean;
  txnUsageLink: any;
  creditObligationTypeLink: any;
  txnUsageTitle = { 'description': 'Txn Usg', 'domain': 'Description', 'listSeq': 'Order' };
  creditObligationTypeTitle = { 'description': 'CROB Type', 'deductionCategory': 'Description' };
  deleteOne: boolean;
  deleteThree: boolean;
  deleteFour: boolean;
  deleteFive: boolean;
  deleteSix: boolean;
  deleteTwo: boolean;
  expiryDate: Date;
  activeflag: boolean;
  txnTypeValid: boolean;
  activeFlag: any;
  allCaseloadFlag: any;
  updateAllowedFlag: any;
  constructor(private ocmtransFactory: OcmtransService,
    public translateService: TranslateService,
    private sessionManager: UserSessionManager) {
  }
  onGridReady(event) {
  }
  ngOnInit() {
    this.txnUsageLink = 'ocmtrans/cgfkTxnTypeTxnUsageRecordGroup';
    this.creditObligationTypeLink = 'ocmtrans/cgfkTxnTypeCreditObligatioRecordGroup';
    this.retriveDisable = false;
    this.namesReadOnly = false;
    this.ckeckboxReadOnly = false;
    this.txnInsert = false;
    this.txnPayeeInsert = false;
    this.activeflag = false;
    this.activeFlag = 'true';
    this.allCaseloadFlag = 'true';
    this.updateAllowedFlag = 'true';
    this.transColumnDefs = [
      {
        fieldName: this.translateService.translate('ocmtrans.txntype'), field: 'txnType', editable: true,
        width: 180, datatype: 'text', maxlength: 6, cellEditable: this.canAlertEdit, required: true
      },
      {
        fieldName: this.translateService.translate('ocmtrans.description'), field: 'description', editable: true,
        width: 220, datatype: 'text', maxlength: 40, required: true,uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('ocmtrans.txnusg'), field: 'txnUsage', editable: true, required: true,
        width: 150, datatype: 'lov', domain: 'AC_TXN_USG'/* link: 'ocmtrans/cgfkTxnTypeTxnUsageRecordGroup'*/, maxlength: 12,
        titles: { description: 'Txn Usg', domain: 'Description', listSeq: 'Order' }
      },
      {
        fieldName: this.translateService.translate('ocmtrans.crobtype'), field: 'creditObligationType', source: 'OTMCOPRO',
        datatype: 'lov', link: 'ocmtrans/cgfkTxnTypeCreditObligatioRecordGroup', maxlength: 6,
        titles: { description: 'CROB Type', deductionCategory: 'Description' },
        editable: true, width: 180
      },
      {
        fieldName: this.translateService.translate('ocmtrans.days'), field: 'days', editable: true,
        width: 150, cellEditable: this.canTxnsEdit, datatype: 'number', maxlength: 10
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
        datatype: 'checkbox', width: 180
      },
      {
        fieldName: this.translateService.translate('common.all'), field: 'allCaseloadFlag', editable: true,
        datatype: 'checkbox', width: 150
      },
      {
        fieldName: this.translateService.translate('common.sequence'), field: 'listSeq', editable: true,
        width: 150, whole: true, datatype: 'number', maxValue: '999', strictFP: true
      },
      {
        fieldName: this.translateService.translate('ocmtrans.update'), field: 'updateAllowedFlag', editable: true,
        datatype: 'checkbox', width: 200
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
        datatype: 'date', width: 200, maxlength: 10
      },
    ];
    this.txnpayeeColumnDefs = [
      {
        fieldName: this.translateService.translate('ocmtrans.def'), field: 'defaultPayeeFlag', editable: true,
        datatype: 'checkbox', width: 50
      },
      {
        fieldName: this.translateService.translate('common.person'), field: 'payeePersonId', editable: true,
        datatype: 'lov', link: 'ocmtrans/cgfkTxnPayeePayeePersonIdRecordGroup', width: 80, maxlength: 11,
        titles: { description: 'Person', lastName: 'Pay to the Order of', firstName: 'FirstName', middleName: 'MiddleName' }
      },
      {
        fieldName: this.translateService.translate('ocmtrans.paytotheorderof'), field: 'lastName', editable: false,
        width: 120, maxlength: 20
      },
      {
        fieldName: this.translateService.translate('common.corporate'), field: 'payeeCorporateId', editable: true,
        datatype: 'lov', link: 'ocmtrans/cgfkTxnPayeePayeeCorporateRecordGroup', width: 80,
        titles: { description: 'Corporate', corporateName: 'Pay to the Order of' }, maxlength: 11
      },
      {
        fieldName: this.translateService.translate('ocmtrans.paytotheorderof'), field: 'corporateName', editable: false,
        width: 120, maxlength: 40
      },
    ];
    this.ocmtransexecuteQuery();
  }
  canAlertEdit = (data: any, index: number, field: string): boolean => {
    if (!data.createDatetime) {
      return true;
    } else {
      return false;
    }
  }
  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }
  onRowClick(event) {
    if (event) {
      if (!event.modifyDate) {
        this.txnPayeeInsert = false;
      } else {
        this.txnPayeeInsert = true;
      }
      this.txntypeModelTemp = event;
      this.txnpayeeModel = new TransactionPayees();
      if (this.txntypeModelTemp.txnType) {
        const deleteTxnType = this.ocmtransFactory.txnTypeOnCheckDeleteMaster(this.txntypeModelTemp.txnType);
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
        });
        this.txnpayeeModel.txnType = this.txntypeModelTemp.txnType;
        this.txnpayeeExecuteQuery();
      }
    }
  }
  onRowPayeeClick(event) {
    if (event) {
      //this.txnpayeeModel = event;
    }
  }
  clearQuery() {
    this.txntypeData = [];
    this.txntypeModelTemp = new TransactionTypes();
    this.txnpayeeModel = new TransactionPayees();
    this.txntypeModel = new TransactionTypes();
    // this.txntypeModel.txnType = null;
    // this.txntypeModel.description = null;
    // this.txntypeModel.txnUsage = null;
    // this.txntypeModel.creditObligationType = null;
    // this.txntypeModel.days = null;
    // this.txntypeModel.listSeq = null;
    this.expiryDate = null;
    this.txnpayeeData = [];
    this.retriveDisable = false;
    this.namesReadOnly = false;
    this.ckeckboxReadOnly = false;
    this.txnInsert = false;
    this.txnPayeeInsert = false;
    this.activeflag = false;
    this.activeFlag = 'true';
    this.allCaseloadFlag = 'true';
    this.updateAllowedFlag = 'true';
    this.clearDisable = true;
  }
  onGridInsert = () => {
    this.txnPayeeInsert = false;
    for (let i = 0; i < this.txntypeData.length; i++) {
      if (!this.txntypeData[i].txnType) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocmtrans.txntypemustbeentered');
        this.show();
        return;
      }
      if (!this.txntypeData[i].description) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocmtrans.descriptionmustbeentered');
        this.show();
        return;
      }
      if (!this.txntypeData[i].txnUsage) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocmtrans.txnusgmustbeentered');
        this.show();
        return;
      }
    }
    this.txntypeModel = new TransactionTypes();
    this.txntypeModelTemp = new TransactionTypes();
    this.txnpayeeData = [];
    return { activeFlag: true, allCaseloadFlag: true, updateAllowedFlag: true, listSeq: 99 };
  }
  onGridInsertPayee = () => {
    for (let i = 0; i < this.txnpayeeData.length; i++) {
      if (this.txnpayeeData[i].defaultPayeeFlag || this.txnpayeeData[i].payeePersonId ||
        this.txnpayeeData[i].payeeCorporateId) {
      } else {
        return false;
      }
    }
    return {};
  }
  onGridClearPayee = () => {
    this.ocmtransexecuteQuery();
    return true;
  }
  validateRowData = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    rowdata.validated = true;
    if (event.field === 'txnType' && (event.newValue !== event.oldValue || event.newValue.trim() === event.oldValue)) {
      const txntypeSaveData = this.ocmtransFactory.txnTypeValidation(event.data.txnType.trim());
      txntypeSaveData.subscribe(data => {
        if (data && data === 'Y') {
          this.txnTypeValid = true;
          this.type = 'warn';
          this.message = this.translateService.translate('ocmtrans.alreadyexist');
          this.message = String(this.message).replace('%txnId%', event.data.txnType);
          this.show();
          return;
        } else {
          this.txnTypeValid = false;
        }
      });
    }
    if (event.field === 'activeFlag') {
      if (event.field === 'activeFlag' && event.data.activeFlag === false && event.newValue !== event.oldValue) {
        event.data.expiryDate = DateFormat.getDate();
        this.grid.setColumnData('activeFlag', rowIndex,
          event.data.activeFlag);
      } else {
        event.data.expiryDate = null;
        this.grid.setColumnData('activeFlag', rowIndex,
          event.data.activeFlag);
      }
    }
    return rowdata;
  }
  validateRowPayeesData = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    rowdata.validated = true;
    if (event.field === 'defaultPayeeFlag') {
      const validation = { repeat: 0, validate: true };
      // this.txnpayeeData.forEach(element => {
      validation.repeat = 0;
      this.txnpayeeData.forEach(dataTemp => {
        if (dataTemp.defaultPayeeFlag && event.data.defaultPayeeFlag) {
          validation.repeat++;
        }
        if (validation.repeat > 1) {
          validation.validate = false;
          return;
        }
      });
      // });
      if (!validation.validate) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocmtrans.defaultpayeeisalreadyexists');
        this.message = String(this.message).replace('%txnType%', this.txntypeModelTemp.txnType);
        this.payeegrid.setColumnData('defaultPayeeFlag', rowIndex,
          event.data.defaultPayeeFlag);
        this.show();
      }
    }
    if (event.field === 'payeePersonId' && event.data.payeePersonId && event.newValue !== event.oldValue) {
      const serviceObj = this.ocmtransFactory.cgfkchkTxnPayeeTxnPayeePerson(event.data.payeePersonId);
      serviceObj.subscribe(payeePaersonIdData => {
        if (payeePaersonIdData) {
          event.data.lastName = payeePaersonIdData;
          event.data.payeeCorporateId = null;
          event.data.corporateName = null;
          this.payeegrid.setColumnData('payeePersonId', rowIndex,
            event.data.payeePersonId);
        }
      });
    }
    if (event.field === 'payeeCorporateId' && event.data.payeeCorporateId && event.newValue !== event.oldValue) {
      const serviceObj = this.ocmtransFactory.cgfkchkTxnPayeeTxnPayeeCorporate(event.data.payeeCorporateId);
      serviceObj.subscribe(payeeCorporateIdData => {
        if (payeeCorporateIdData) {
          event.data.corporateName = payeeCorporateIdData;
          event.data.payeePersonId = null;
          event.data.lastName = null;
          this.payeegrid.setColumnData('payeeCorporateId', rowIndex,
            event.data.payeeCorporateId);
        }
      });
    }
    return rowdata;
  }
  canTxnsEdit = (data: any, index: number, field: string): boolean => {
    if (data.txnUsage === 'R') {
      return true;
    } else {
      return false;
    }
  }
  onGridDelete = () => {
    if (this.deleteOne) {
      this.type = 'info';
      this.message = this.translateService.translate('ocmtrans.cannotdeletetransactiona');
      this.show();
      return;
    } else if (this.deleteTwo) {
      this.type = 'info';
      this.message = this.translateService.translate('ocmtrans.cannotdeletetransactionb');
      this.show();
      return;
    } else if (this.deleteThree) {
      this.type = 'info';
      this.message = this.translateService.translate('ocmtrans.cannotdeletetransactionc');
      this.show();
      return;
    } else if (this.deleteFour) {
      this.type = 'info';
      this.message = this.translateService.translate('ocmtrans.cannotdeletetransactiond');
      this.show();
      return;
    } else if (this.deleteFive) {
      this.type = 'info';
      this.message = this.translateService.translate('ocmtrans.cannotdeletetransactione');
      this.show();
      return;
    } else if (this.deleteSix) {
      this.type = 'info';
      this.message = this.translateService.translate('ocmtrans.cannotdeletetransactionf');
      this.show();
      return;
    }
    if (this.txnpayeeData && this.txnpayeeData.length > 0) {
      this.type = 'info';
      this.message = this.translateService.translate('common.cannotdeletemaster');
      this.show();
      return;
    }
    return true;
  }
  ocmtransSavetxntypeForm(event) {
    // if (this.txnTypeValid) {
    //   this.type = 'warn';
    //   this.message = this.translateService.translate('ocmtrans.alreadyexist');
    //   this.message = String(this.message).replace('%txnId%', this.txntypeModelTemp.txnType);
    //   this.show();
    //   return;
    // }

    for (let i = 0; i < this.txntypeData.length; i++) {
      for (let j = 0; j < this.txntypeData.length; j++) {
        if (i !== j && (this.txntypeData[i].txnType.trim() === this.txntypeData[j].txnType.trim())) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmtrans.alreadyexist');
          this.message = String(this.message).replace('%txnId%', this.txntypeData[j].txnType);
          this.show();
          return;
        }
      }
    }
    this.txntypeInsertList = event.added;
    this.txntypeUpdateList = event.updated;
    this.txntypeDeleteList = event.removed;
    this.txntypeCommitModel.insertList = [];
    this.txntypeCommitModel.updateList = [];
    this.txntypeCommitModel.deleteList = [];
    if (this.txntypeInsertList.length > 0) {
      for (let i = 0; i < this.txntypeInsertList.length; i++) {
        if (!this.txntypeInsertList[i].txnType) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmtrans.txntypemustbeentered');
          this.show();
          return;
        }
        if (!this.txntypeInsertList[i].description) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmtrans.descriptionmustbeentered');
          this.show();
          return;
        }
        if (!this.txntypeInsertList[i].txnUsage) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmtrans.txnusgmustbeentered');
          this.show();
          return;
        }
        this.txntypeInsertList[i].grossNetFlag = 'N';
        this.txntypeInsertList[i].modifyDate = DateFormat.getDate();
        this.txntypeInsertList[i].createDatetime = DateFormat.getDate();
        this.txntypeInsertList[i].createUserId = this.sessionManager.getId();
        this.txntypeInsertList[i].modifyUserId = this.sessionManager.getId();
        this.txntypeInsertList[i].caseloadType = this.sessionManager.currentCaseLoadType;
      }
      this.txntypeCommitModel.insertList = this.txntypeInsertList;

    }
    if (this.txntypeUpdateList.length > 0) {
      for (let i = 0; i < this.txntypeUpdateList.length; i++) {
        if (!this.txntypeUpdateList[i].txnType) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmtrans.txntypemustbeentered');
          this.show();
          return;
        }
        if (!this.txntypeUpdateList[i].description) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmtrans.descriptionmustbeentered');
          this.show();
          return;
        }
        if (!this.txntypeUpdateList[i].txnUsage) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmtrans.txnusgmustbeentered');
          this.show();
          return;
        }

        this.txntypeUpdateList[i].modifyDate = DateFormat.getDate();
        this.txntypeUpdateList[i].modifyUserId = this.sessionManager.getId();
        this.txntypeCommitModel.updateList = this.txntypeUpdateList;
      }
    }

    if (this.txntypeDeleteList.length > 0) {
      for (let i = 0; i < this.txntypeDeleteList.length; i++) {
      }
      this.txntypeCommitModel.deleteList = this.txntypeDeleteList;
    }
    const txntypeSaveData = this.ocmtransFactory.txnTypeCommit(this.txntypeCommitModel);
    txntypeSaveData.subscribe(data => {
      if (data === 1) {
        this.type = 'success';
        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
        this.show();
        this.ocmtransexecuteQuery();
        return;
      } else {
        this.type = 'warn';
        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
        this.show();
        this.ocmtransexecuteQuery();
        return;
      }
    });
  }
  ocmtransexecuteQuery() {
    if (this.expiryDate) {
      this.txntypeModel.expiryDate = this.expiryDate;
    } else {
      this.txntypeModel.expiryDate = null;
    }
    const reqData = JSON.parse(JSON.stringify(this.txntypeModel));
    // if (reqData.activeFlag) {
    reqData.activeFlag = this.activeFlag ? 'Y' : 'N';
    // }
    // if (reqData.allCaseloadFlag) {
    reqData.allCaseloadFlag = this.allCaseloadFlag ? 'Y' : 'N';
    // }
    // if (reqData.updateAllowedFlag) {
    reqData.updateAllowedFlag = this.updateAllowedFlag ? 'Y' : 'N';
    // }
    const serviceObj = this.ocmtransFactory.txnTypeExecuteQuery(reqData);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.txntypeData = [];
        this.clearDisable = false;
        this.type = 'warn';
        this.message = this.translateService.translate('common.querycaused');
        this.show();
        return;
      } else {
        data.forEach(element => {
          element.activeFlag = element.activeFlag === 'Y' ? true : false;
          element.allCaseloadFlag = element.allCaseloadFlag === 'Y' ? true : false;
          element.updateAllowedFlag = element.updateAllowedFlag === 'Y' ? true : false;
          if (element.payeeCorporateId === 'CorporateValidate') {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmtrans.thiscorporatedoesnotexist');
            this.show();
            return;
          }
          if (element.payeeCorporateId === 'PersonValidate') {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmtrans.thispersondoesnotexist');
            this.show();
            return;
          }
        });
        this.txntypeData = data;
        this.txntypeDataTemp = data;
        this.txntypeModelTemp = this.txntypeData[0];
        this.clearDisable = false;
        this.retriveDisable = true;
        this.namesReadOnly = true;
        this.ckeckboxReadOnly = true;
        this.txnInsert = true;
        this.txnPayeeInsert = true;
        this.tableIndex = 0;
      }
    });
  }
  txnpayeeExecuteQuery() {
    const txnpayeeResult = this.ocmtransFactory.txnPayeeExecuteQuery(this.txnpayeeModel);
    txnpayeeResult.subscribe(txnpayeeResultList => {
      if (txnpayeeResultList.length === 0) {
        this.txnpayeeData = [];
      } else {
        txnpayeeResultList.forEach(element => {
          if (element.defaultPayeeFlag) {
            element.defaultPayeeFlag = element.defaultPayeeFlag === 'Y' ? true : false;
          }
          if (element.payeePersonId) {
            element.payeePersonId = String(element.payeePersonId);
          }
          if (element.payeeCorporateId) {
            element.payeeCorporateId = String(element.payeeCorporateId);
          }
        });
        this.txnpayeeData = txnpayeeResultList;
        this.txnpayeeModel = txnpayeeResultList[0];
        this.payeesIndex = 0;
      }
    });
  }
  ocmtransSavetxnpayeeForm(event) {
    // const validation = { repeat: 0, validate: true };
    // // this.txnpayeeData.forEach(element => {
    //   validation.repeat = 0;
    //   this.txnpayeeData.forEach(data => {
    //     if (data.defaultPayeeFlag && event.updated.defaultPayeeFlag) {
    //       validation.repeat++;
    //     }
    //     if (validation.repeat > 1) {
    //       validation.validate = false;
    //       return;
    //     }
    //   });
    // // });
    // if (!validation.validate) {
    //   this.type = 'warn';
    //   this.message = this.translateService.translate('ocmtrans.defaultpayeeisalreadyexists');
    //   this.message = String(this.message).replace('%txnType%', this.txntypeModelTemp.txnType);
    //   this.show();
    //   return;
    // }
    this.txnpayeeInsertList = event.added;
    this.txnpayeeUpdateList = event.updated;
    this.txnpayeeDeleteList = event.removed;
    this.txnpayeeCommitModel.insertList = [];
    this.txnpayeeCommitModel.updateList = [];
    this.txnpayeeCommitModel.deleteList = [];
    if (this.txnpayeeInsertList.length > 0 || this.txnpayeeUpdateList.length > 0) {
      for (let i = 0; i < this.txnpayeeInsertList.length; i++) {
        const validation = { repeat: 0, validate: true };
        // this.txnpayeeData.forEach(element => {
        validation.repeat = 0;
        this.txnpayeeData.forEach(data => {
          if (data.defaultPayeeFlag && this.txnpayeeInsertList[i].defaultPayeeFlag) {
            validation.repeat++;
          }
          if (validation.repeat > 1) {
            validation.validate = false;
            return;
          }
        });
        // });
        if (!validation.validate) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmtrans.defaultpayeeisalreadyexists');
          this.message = String(this.message).replace('%txnType%', this.txntypeModelTemp.txnType);
          this.show();
          return;
        }
        if (!this.txnpayeeInsertList[i].payeePersonId && !this.txnpayeeInsertList[i].payeeCorporateId) {
          this.type = 'warn';
          this.message = this.translateService.translate('Person or Corporate must be entered');
          this.show();
          return;
        }

        if (this.txnpayeeInsertList[i].defaultPayeeFlag || this.txnpayeeInsertList[i].payeePersonId
          || this.txnpayeeInsertList[i].payeeCorporateId) {
          this.txnpayeeInsertList[i].createDatetime = DateFormat.getDate();
          this.txnpayeeInsertList[i].createUserId = this.sessionManager.getId();
          this.txnpayeeInsertList[i].modifyUserId = this.sessionManager.getId();
          this.txnpayeeInsertList[i].modifyDate = DateFormat.getDate();
          this.txnpayeeInsertList[i].txnType = this.txntypeModelTemp.txnType;
          this.txnpayeeCommitModel.insertList = this.txnpayeeInsertList;
        }
      }
      for (let i = 0; i < this.txnpayeeUpdateList.length; i++) {
        const validation = { repeat: 0, validate: true };
        // this.txnpayeeData.forEach(element => {
        validation.repeat = 0;
        this.txnpayeeData.forEach(data => {
          if (data.defaultPayeeFlag && this.txnpayeeUpdateList[i].defaultPayeeFlag) {
            validation.repeat++;
          }
          if (validation.repeat > 1) {
            validation.validate = false;
            return;
          }
        });
        // });
        if (!validation.validate) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocmtrans.defaultpayeeisalreadyexists');
          this.message = String(this.message).replace('%txnType%', this.txntypeModelTemp.txnType);
          this.show();
          return;
        }
        if (!this.txnpayeeUpdateList[i].payeePersonId && !this.txnpayeeUpdateList[i].payeeCorporateId) {
          this.type = 'warn';
          this.message = this.translateService.translate('Person or Corporate must be entered');
          this.show();
          return;
        }

        this.txnpayeeCommitModel.updateList = this.txnpayeeUpdateList;
      }
    }
    if (this.txnpayeeDeleteList.length > 0) {
      for (let i = 0; i < this.txnpayeeDeleteList.length; i++) {
      }
    }
    const txnpayeeSaveData = this.ocmtransFactory.txnPayeeCommit(this.txnpayeeCommitModel);
    txnpayeeSaveData.subscribe(data => {
      if (data === 1) {
        this.type = 'success';
        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
        this.show();
        this.txnpayeeExecuteQuery();
        return;
      } else {
        this.type = 'warn';
        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
        this.show();
        this.txnpayeeExecuteQuery();
        return;
      }
    });
  }
  activeFlagChange(event) {
    if (!event) {
      this.expiryDate = DateFormat.getDate();
      this.activeflag = true;
    } else {
      this.activeflag = true;
      this.expiryDate = null;
    }
  }

  onGridClear = () => {
    this.txnpayeeExecuteQuery();
    return true;
  }
}
