import {
  Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdrttfuService } from '../service/otdrttfu.service';
import { OffenderTrustTransfers } from '@inmatetrustaccountsbeans/OffenderTrustTransfers';
import { OffenderTransactions } from '@inmatetrustaccountsbeans/OffenderTransactions';
import { OffenderTransactionsCommitBean } from '@inmatetrustaccountsbeans/OffenderTransactionsCommitBean';
import { OffenderTrustTransfersCommitBean } from '@inmatetrustaccountsbeans/OffenderTrustTransfersCommitBean';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
  selector: 'app-otdrttfu',
  templateUrl: './otdrttfu.component.html'
})

export class OtdrttfuComponent implements OnInit {
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  offttData: OffenderTrustTransfers[] = [];
  offttDataTemp: OffenderTrustTransfers[] = [];
  offttModel: OffenderTrustTransfers = new OffenderTrustTransfers();
  offttIndex = -1;
  offttInsertList: OffenderTrustTransfers[] = [];
  offttUpdatetList: OffenderTrustTransfers[] = [];
  offttDeleteList: OffenderTrustTransfers[] = [];
  offtxnData: OffenderTransactions[] = [];
  offtxnDataTemp: OffenderTransactions[] = [];
  offtxnModel: OffenderTransactions = new OffenderTransactions();
  offtxnIndex = 0;
  offtxnInsertList: OffenderTransactions[] = [];
  offtxnUpdatetList: OffenderTransactions[] = [];
  offtxnDeleteList: OffenderTransactions[] = [];
  syspflData: SystemProfiles[] = [];
  syspflDataTemp: SystemProfiles[] = [];
  syspflModel: SystemProfiles = new SystemProfiles();
  syspflIndex = 0;
  syspflInsertList: SystemProfiles[] = [];
  syspflUpdatetList: SystemProfiles[] = [];
  syspflDeleteList: SystemProfiles[] = [];
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable = true;
  offTtColumnDef: any[];
  offTxnColumnDef: any[];
  offTtReadOnly = false;
  offTxnReadOnly = false;
  sysPflReadOnly = false;
  offtxnCommitModel: OffenderTransactionsCommitBean = new OffenderTransactionsCommitBean();
  offttCommitModel: OffenderTrustTransfersCommitBean = new OffenderTrustTransfersCommitBean();
  sta: any;
  profileValue2: string;
  constructor(private otdrttfuFactory: OtdrttfuService, public translateService: TranslateService,
     private sessionManager: UserSessionManager) {
    this.offTtColumnDef = [];
    this.offTxnColumnDef = [];

  }
  ngOnInit() {
    this.offttExecuteQuery();
    this.offTtColumnDef = [
      {
        fieldName: this.translateService.translate('otdrttfu.rec'), field: 'postedFlag', datatype: 'checkbox', editable: true,
        width: 150, maxlength: 1
      },
      {
        fieldName: this.translateService.translate('otdrttfu.from'), field: 'fromCaseload', datatype: 'text', editable: false,
        width: 150, maxlength: 6
      },
      {
        fieldName: this.translateService.translate('otdrttfu.caseload'), field: 'dspDescription', datatype: 'text', editable: false,
        width: 150, maxlength: 40
      },
      {
        fieldName: this.translateService.translate('otdrttfu.check'), field: 'checkNo', datatype: 'text', editable: false,
        width: 150, maxlength: 6
      },
      {
        fieldName: this.translateService.translate('otdrttfu.issuedate'), field: 'transferDate', datatype: 'date', editable: false,
        width: 150, maxlength: 10
      },
      {
        fieldName: this.translateService.translate('otdrttfu.checktotal'), field: 'amount', datatype: 'number',
         format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true
      },
    ];
    this.offTxnColumnDef = [
      { fieldName: this.translateService.translate('otdrttfu.id'), field: 'offenderIdDisplay', editable: false, datatype: 'text',
      width: 150, maxlength: 11 },
      { fieldName: this.translateService.translate('otdrttfu.lastname'), field: 'lastName', datatype: 'text', editable: false,
       width: 150, maxlength: 40 },
      { fieldName: this.translateService.translate('otdrttfu.firstname'), field: 'firstName', datatype: 'text', editable: false,
       width: 150, maxlength: 40 },
      { fieldName: this.translateService.translate('otdrttfu.offstatus'), field: 'activeFlag', datatype: 'text', editable: false,
       width: 150, maxlength: 1 },
      { fieldName: this.translateService.translate('otdrttfu.accstatus'), field: 'accountClosedFlag', datatype: 'text', editable: false,
       width: 150, maxlength: 1 },
      { fieldName: this.translateService.translate('otdrttfu.transfamt'), field: 'txnEntryAmount',
       datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true },
    ];
  }
  onRowClickofftt(event) {
    if (event) {
      this.offtxnExecuteQuery(event);

    }
  }
  show(vldmsg, type) {
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  offttExecuteQuery() {
    this.offttModel.toCaseload = this.sessionManager.currentCaseLoad;
    const offttResult = this.otdrttfuFactory.offTtExecuteQuery(this.offttModel);
    offttResult.subscribe(offttResultList => {
      if (offttResultList.length === 0) {
        this.offttData = [];
        this.offtxnData = [];
        this.offtxnModel = new OffenderTransactions();
        this.profileValue2 = null;
        this.show(this.translateService.translate('common.querycaused'), 'warn');
        return;
      } else {
        offttResultList.forEach(element => {
          element.postedFlag = element.postedFlag === 'Y' ? 'Y' : null;
        });
        this.offttData = offttResultList;
        this.offttIndex = 0;
        this.offtxnModel = new OffenderTransactions();
        this.profileValue2 = null;
      }
    });
  }
  offtxnExecuteQuery(event) {
    this.offtxnModel.caseloadType = this.sessionManager.currentCaseLoadType;
    const reqData = event;
      reqData.caseloadType = this.sessionManager.currentCaseLoadType;
      reqData.fromCaseloadId = event.fromCaseload;
      reqData.toCaseloadId = event.toCaseload;
       const offtxnResult = this.otdrttfuFactory.offTxnExecuteQuery(reqData);
    offtxnResult.subscribe(offtxnResultList => {
      if (offtxnResultList.length === 0) {
        this.offtxnData = [];
      } else {
        offtxnResultList.forEach(element => {
          if(element.activeFlag){
            const index = element.activeFlag.indexOf('-');
            element.activeFlag = element.activeFlag.substring(0, index).trim();
          }
          if(element.sta){
            this.sta = element.sta;
          }
        });
        this.offtxnData = offtxnResultList;
      }
    });
  }

  /**
   *  This function will be executed when commit event is
  * fired
  */
  otdrttfuSaveoffttForm(event) {
    this.offttInsertList = event.added;
    this.offttUpdatetList = event.updated;
    this.offttDeleteList = event.removed;
    this.offttCommitModel.insertList = [];
    this.offttCommitModel.updateList = [];
    this.offttCommitModel.deleteList = [];
    if (this.offttUpdatetList.length > 0) {
      for (let i = 0; i < this.offttUpdatetList.length; i++) {
        if (this.offttUpdatetList[i].postedFlag) {
          this.offttUpdatetList[i].caseloadId = this.sessionManager.currentCaseLoad;
          this.offttModel.caseloadType = this.sessionManager.currentCaseLoadType;
          this.offttUpdatetList[i].sta = this.sta;

        }
      }
      this.offttCommitModel.updateList = this.offttUpdatetList;
    }
    const offttSaveData = this.otdrttfuFactory.offTtCommit(this.offttCommitModel);
    offttSaveData.subscribe(data => {
      if (data && data.length > 0 && !data[0].errorMessage) {
        this.profileValue2 = `${data.length}`;
        this.offtxnData = data;
        this.offtxnModel.txnId = data[0].txnId;
        setTimeout(ele => {
        }, 1500);
        this.offttExecuteQuery();
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');

      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  otdrttfuSaveofftxnForm(event) {
    // TODO declare commit bean and add insert list to that object.
    this.offtxnInsertList = event.added;
    this.offtxnUpdatetList = event.updated;
    this.offtxnDeleteList = event.removed;
    this.offtxnCommitModel.insertList = [];
    this.offtxnCommitModel.updateList = [];
    this.offtxnCommitModel.deleteList = [];
    if (this.offtxnInsertList.length > 0) {
      for (let i = 0; i < this.offtxnInsertList.length; i++) {
      }
      for (let i = 0; i < this.offtxnUpdatetList.length; i++) {
      }
      this.offtxnCommitModel.insertList = this.offtxnInsertList;
      this.offtxnCommitModel.updateList = this.offtxnUpdatetList;
    }
    if (this.offtxnDeleteList.length > 0) {
      for (let i = 0; i < this.offtxnDeleteList.length; i++) {
      }
      this.offtxnCommitModel.deleteList = this.offtxnDeleteList;
    }
    const offtxnSaveData = this.otdrttfuFactory.offTxnCommit(this.offtxnCommitModel);
    offtxnSaveData.subscribe(data => {
      if (data === 1) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
      }
    });
  }
  syspflExecuteQuery() {
    const syspflResult = this.otdrttfuFactory.
      sysPflExecuteQuery(this.syspflModel);
    syspflResult.subscribe(syspflResultList => {
      if (syspflResultList.length === 0) {
        this.syspflData = [];
      } else {
        this.syspflData = syspflResultList;
        this.syspflModel = syspflResultList[0];
      }
    });
  }


}

