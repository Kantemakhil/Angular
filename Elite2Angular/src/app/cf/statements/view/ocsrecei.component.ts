import {
  Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcsreceiService } from '../service/ocsrecei.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OmsRequests } from '@inmatetrustaccountsbeans/OmsRequests';
import { OmsRequestsCommitBean } from '@inmatetrustaccountsbeans/OmsRequestsCommitBean';
import { OffenderTransactions } from '@inmate/trust/trustaccounts/beans/OffenderTransactions';
import { OffenderTransactionsCommitBean } from '@inmate/trust/trustaccounts/beans/OffenderTransactionsCommitBean';
import { PrintReceiptsTmp } from '@cf/statements/beans/PrintReceiptsTmp';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
  selector: 'app-ocsrecei',
  templateUrl: './ocsrecei.component.html'
})

export class OcsreceiComponent implements OnInit {
  msgs: any[] = [];
  omsReqData: OmsRequests[] = [];
  omsReqDataTemp: OmsRequests[] = [];
  omsReqModel: OmsRequests = new OmsRequests();
  omsReqIndex = 0;
  omsReqInsertList: OmsRequests[] = [];
  omsReqUpdateList: OmsRequests[] = [];
  omsReqDeleteList: OmsRequests[] = [];
  offTxnData: OffenderTransactions[] = [];
  offTxnDataTemp: OffenderTransactions[] = [];
  offTxnModel: OffenderTransactions = new OffenderTransactions();
  offTxnIndex = 0;
  offTxnInsertList: OffenderTransactions[] = [];
  offTxnUpdateList: OffenderTransactions[] = [];
  offTxnDeleteList: OffenderTransactions[] = [];
  minDate: any;
  offTxnColumnDef: any[];
  offTxnReadOnly = false;
  offTxnCommitModel: OffenderTransactionsCommitBean = new OffenderTransactionsCommitBean();
  omsReqCommitModel: OmsRequestsCommitBean = new OmsRequestsCommitBean();
  prtRecModel: PrintReceiptsTmp = new PrintReceiptsTmp();
  prtInsList: PrintReceiptsTmp[] = [];
  reportTitles = {'code': this.translateService.translate('common.report'),
  'description': this.translateService.translate('common.description')
  };
  fromDate: Date;
  constructor(private ocsreceiFactory: OcsreceiService, public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    this.offTxnColumnDef = [];
  }
  ngOnInit() {
    this.omsReqModel.printAllFlag = true;

    this.offTxnColumnDef = [
      {
        fieldName: this.translateService.translate('ocsrecei.print'),
        field: 'nbtReceiptPrintFlag', editable: true, datatype: 'checkbox', width: 150, required: true
      },
      { fieldName: this.translateService.translate('ocsrecei.receipt'), field: 'receiptNumber', editable: false, width: 150 },
      {
        fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'nbtOffenderIdDisplay', editable: false,
        width: 150
      },
      { fieldName: this.translateService.translate('common.name'), field: 'nbtNameText', editable: false, width: 150 },
      { fieldName: this.translateService.translate('ocsrecei.reference'), field: 'txnReferenceNumber', editable: false, width: 150 },
      { fieldName: this.translateService.translate('common.date'), field: 'txnEntryDate', editable: false, datatype: 'date', width: 150 },
      {
        fieldName: this.translateService.translate('ocsrecei.printed'), field: 'receiptPrintedFlag', editable: false, datatype: 'checkbox',
        width: 150
      },
    ];
    // TODO all initializations here
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
  onRowClickofftxn(event) {
  }
  onReportChange() {
    if (!this.omsReqModel.moduleName) {
      this.omsReqModel.moduleName = this.omsReqModel.moduleName === '' ? undefined : '';
    }
  }
  get reqFlag() {
    if (this.omsReqModel.displayFlag) {
      return false;
    }
    return true;
  }
  get retFlag() {
    if (this.offTxnData.length > 0) {
      return true;
    } else if (!this.omsReqModel.moduleName && this.offTxnData.length === 0 && !this.omsReqModel.numberOfCopy
       && this.omsReqModel.numberOfCopy !== 0) {
      return false;
    } else if (this.omsReqModel.moduleName || this.omsReqModel.numberOfCopy ||
    this.omsReqModel.numberOfCopy === 0 || this.omsReqModel.displayFlag || this.omsReqModel.printAllFlag ||
    this.omsReqModel.nbtDateFrom || this.omsReqModel.nbtDateTo || this.omsReqModel.nbtUserId) {
      return false;
    }
   return true;
  }
  get clearFlag() {
    if (this.offTxnData.length > 0 || this.omsReqModel.moduleName || this.omsReqModel.numberOfCopy ||
    this.omsReqModel.numberOfCopy === 0 || this.omsReqModel.displayFlag || this.omsReqModel.printAllFlag ||
    this.omsReqModel.nbtDateFrom || this.omsReqModel.nbtDateTo || this.omsReqModel.nbtUserId) {
      return false;
    }
    return true;
  }
  clear() {
    this.omsReqModel = new OmsRequests();
    this.offTxnData = [];
    this.omsReqModel.printAllFlag = false;
  }
  displayFlagEvent() {
    if (this.omsReqModel.displayFlag) {
      this.omsReqModel.numberOfCopy = 1;
    }
  }
  get readeOnlyCopyFlag() {
    if (this.omsReqModel.displayFlag) {
      return true;
    } else if (this.offTxnData.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  get readeOnlyFlag() {
    if (this.offTxnData.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  get readeOnlyFields() {
    if (this.omsReqModel.printAllFlag) {
      this.omsReqModel.nbtDateFrom = undefined;
      this.omsReqModel.nbtDateTo = undefined;
      this.omsReqModel.nbtUserId = undefined;
      return true;
    } else if (this.offTxnData.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  omsReqExecuteQuery() {
    const omsReqResult = this.ocsreceiFactory.
      omsReqExecuteQuery(this.omsReqModel);
    omsReqResult.subscribe(omsReqResultList => {
      if (omsReqResultList.length === 0) {
        this.omsReqData = [];
        this.show(this.translateService.translate('common.querycaused'));
      } else {
        this.omsReqData = omsReqResultList;
        this.omsReqModel = omsReqResultList[0];
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocsreceiSaveomsReqForm(event) {
    // TODO declare commit bean and add insert list to that object.
    this.omsReqInsertList = event.added;
    this.omsReqUpdateList = event.updated;
    this.omsReqDeleteList = event.removed;
    this.omsReqCommitModel.insertList = [];
    this.omsReqCommitModel.updateList = [];
    this.omsReqCommitModel.deleteList = [];
    if (this.omsReqInsertList.length > 0 || this.omsReqUpdateList.length > 0) {
      for (let i = 0; i < this.omsReqInsertList.length; i++) {
        this.omsReqInsertList[i].requestStatus = 'PRT';
        this.omsReqInsertList[i].displayFlag = 'N';
      }
      for (let i = 0; i < this.omsReqUpdateList.length; i++) {
      }
      this.omsReqCommitModel.insertList = this.omsReqInsertList;
      this.omsReqCommitModel.updateList = this.omsReqUpdateList;
    }
    if (this.omsReqDeleteList.length > 0) {
      for (let i = 0; i < this.omsReqDeleteList.length; i++) {
      }
      this.omsReqCommitModel.deleteList = this.omsReqDeleteList;
    }
    const omsReqSaveData = this.ocsreceiFactory.omsReqCommit(this.omsReqCommitModel);
    omsReqSaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        return;
      } else {
        this.show('common.addupdateremoverecordfailed');
        return;
      }
    });
  }
  offTxnExecuteQuery(fromDate?, tdate?) {
    if (!this.omsReqModel.moduleName) {
      this.show(this.translateService.translate('ocsrecei.reportmustbeentered'));
      return;
    }
    if (!this.omsReqModel.displayFlag && !this.omsReqModel.numberOfCopy && this.omsReqModel.numberOfCopy !== 0 ) {
      this.show(this.translateService.translate('ocsrecei.copymustbeentered'));
      return;
    }
    if (!this.omsReqModel.displayFlag &&  this.omsReqModel.numberOfCopy === 0 ) {
      this.show(this.translateService.translate('ocsrecei.copymustbeenteredzero'));
      return;
    }
    if (this.omsReqModel.nbtDateTo &&  this.omsReqModel.nbtDateFrom ) {
    if (DateFormat.compareDate
      (DateFormat.getDate(this.omsReqModel.nbtDateFrom), DateFormat.getDate(this.omsReqModel.nbtDateTo)) === 1) {
      this.show(this.translateService.translate('ocsreceifromdataevlidation'));
      return;
    }
  }

  if (String(fromDate.lastValue).indexOf('_') >= 0 && fromDate.value === null) {
    this.show( this.translateService.translate('ocsrecei.dateformate'));
    this.omsReqModel.nbtDateFrom = undefined; 
    return;
  }

  if (String(tdate.lastValue).indexOf('_') >= 0 && tdate.value === null) {
    this.show( this.translateService.translate('ocsrecei.dateformate'));
    this.omsReqModel.nbtDateTo = undefined;
     return;
  }
  
  
    this.omsReqModel.caseLoadId = this.sessionManager.currentCaseLoad;
    const offTxnResult = this.ocsreceiFactory.
      offTxnExecuteQuery(this.omsReqModel);
    offTxnResult.subscribe(offTxnResultList => {
      if (offTxnResultList.length === 0) {
        this.offTxnData = [];
        this.offTxnIndex = -1;
        this.show(this.translateService.translate('common.querycaused'));
      } else {
        this.offTxnData = [];
        offTxnResultList.forEach(element => {
          element.receiptPrintedFlag === 'Y' ? true : false;
          element.nbtReceiptPrintFlag === 'Y' ? true : false;
        });
        this.offTxnData = offTxnResultList;
        this.offTxnModel = offTxnResultList[0];
        this.offTxnIndex = 0;
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocsreceiSaveoffTxnForm(event) {
    const count = this.offTxnData.filter(e => e.nbtReceiptPrintFlag).length;
    if(count === 0){
      this.show('ocsrecei.atleastoneoffendershouldbeselected', 'warn');
      return;
    }
    this.offTxnUpdateList = [];
    this.offTxnCommitModel.updateList = [];
    this.offTxnCommitModel.printRcptInsertList = [];
    this.offTxnCommitModel.omsReqBean = new OmsRequests();
    this.prtInsList = [];
    this.offTxnData.forEach(element => {
      if (element.nbtReceiptPrintFlag) {
        this.prtRecModel = new PrintReceiptsTmp();
        this.prtRecModel.offenderId = element.offenderId;
        this.prtRecModel.txnId = element.txnId;
        this.prtRecModel.receiptNumber = element.receiptNumber;
        this.prtRecModel.sessionId = this.sessionManager.randomid;
        this.prtInsList.push(this.prtRecModel);
        this.offTxnUpdateList.push(element);
      }
  });
    if (this.offTxnUpdateList.length > 0) {
      this.offTxnCommitModel.updateList = this.offTxnUpdateList;
    }
    if (this.omsReqModel.displayFlag) {
      this.omsReqModel.displayFlag = 'Y';
    } else {
      this.omsReqModel.displayFlag = 'N';
    }
    this.omsReqModel.sessionId = this.sessionManager.randomid;
    this.offTxnCommitModel.omsReqBean = this.omsReqModel;
    this.offTxnCommitModel.printRcptInsertList = this.prtInsList;
    const offTxnSaveData = this.ocsreceiFactory.offTxnCommit(this.offTxnCommitModel);
    offTxnSaveData.subscribe(data => {
      if (data && data.length > 0 && data[0].report) {
        const base64pdf = 'data:application/pdf;base64,';
        const pdf = base64pdf + data[0].report;
        const win = window.open(pdf);
        win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
      }
      if (data && data.length > 0 && data[0].sealFlag === '1') {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.offTxnExecuteQuery();
        return;
      } else {
        this.show('common.addupdateremoverecordfailed');
        return;
      }
    });
  }
}
