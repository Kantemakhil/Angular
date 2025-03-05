import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdreverService } from '../service/ocdrever.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { OffFeeBillTransactions } from '@cf/deductions/beans/OffFeeBillTransactions';
import { OffFeeBillTransactionsCommitBean } from '@cf/deductions/beans/OffFeeBillTransactionsCommitBean';
import { offBillingStatements } from '@cf/offendertransactions/beans/offBillingStatements';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';

@Component({
  selector: 'app-ocdrever',
  templateUrl: './ocdrever.component.html'
})
export class OcdreverComponent implements OnInit {
  caseplanId: number;
  billingCycleEndDate: Date;
  billingCycleStartDate: Date;
  billEndDay: any;
  date: Date;
  @ViewChild('grid', { static: true }) grid: any;
  offFeesColumnDef: any[];
  msgs: any[] = [];
  vheaderBlockModel: VTrustHeader = new VTrustHeader();
  display: boolean;
  offFeeBillTranModel: OffFeeBillTransactions = new OffFeeBillTransactions();
  offFeeData: OffFeeBillTransactions[] = [];
  tableIndex = -1;
  offFeeTrxInsertList: OffFeeBillTransactions[] = [];
  offFeeTrxUpdateList: OffFeeBillTransactions[] = [];
  offFeeTrxDeleteList: OffFeeBillTransactions[] = [];
  offBillStmtInsertlist: offBillingStatements[] = [];
  offBillStmtModel: offBillingStatements = new offBillingStatements();
  offTrxCommitmodel: OffFeeBillTransactionsCommitBean = new OffFeeBillTransactionsCommitBean();
  currentRowINdex: number = -1;
  editedIndex: any = -1;
  constructor(private ocdreverService: OcdreverService,
    public translateService: TranslateService, public sessionManager: UserSessionManager,
    private offenderSearchService: OffenderSearchService, public dialogService: DialogService,
    private amountFormat: AmountFormatUtil,) {
    this.offFeesColumnDef = [];
  }
  ngOnInit() {
    this.sessionManager.getId();
    this.vheaderBlockModel = this.offenderSearchService.selectedOffender;
    this.billEndDay = undefined;
    if (!this.offenderSearchService.selectedOffender || this.offenderSearchService.selectedOffender.offenderBookId === undefined) {
      this.show('common.pleasesearchforvalidoffender');
    }
    this.offFeesColumnDef = [
      {
        fieldName: this.translateService.translate('ocdrever.reversal'), field: 'reversal',
        editable: false, width: 150, datatype: 'checkbox',
      },
      {
        fieldName: this.translateService.translate('common.caseload'), field: 'caseloadId',
        editable: false, width: 150, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocdrever.feeid'), field: 'offenderFeeId', editable: false,
        datatype: 'number', width: 150
      },
      {
        fieldName: this.translateService.translate('ocdrever.feecode'), field: 'feecodeDesc', editable: false,
        datatype: 'text', width: 150
      },
      {
        fieldName: this.translateService.translate('ocdrever.billnumber'), field: 'billId', editable: false,
        datatype: 'text', width: 150
      },

      {
        fieldName: this.translateService.translate('ocdrever.billstatus'), field: 'billStatus', editable: false, width: 150,
        maxlength: 240, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('common.amount'), field: 'adjustmentAmount', editable: false,rightAlign: true,
        width: 150, datatype: 'number', format: '1.2-2', maxValue: 999999999.99, whole: true, strictFP: true, cellEditable: this.canCellEditrRestrictCaseload
      },
      {
        fieldName: this.translateService.translate('ocdrever.transaction'), field: 'offAdjTxnIdTemp', editable: false,
        width: 150, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocdrever.transactiontype'), field: 'billTxnTypeDescripton', editable: false,
        width: 150, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocdrever.postingdate'), field: 'billTxnDatetime', editable: false,
        width: 150, datatype: 'date'
      },

      {
        fieldName: this.translateService.translate('ocdrever.originaltransaction'), field: 'originalOffAdjTxnIdTemp',
        width: 150, datatype: 'text', editable: false
      },
      {
        fieldName: this.translateService.translate('ocdrever.reversalamount'), field: 'offAdjRevAmount', editable: true,rightAlign: true,
        width: 150, datatype: 'number', format: '1.2-2', maxValue: 999999999.99, whole: true, strictFP: true, cellEditable: this.canCellEdit
      },
      {
        fieldName: '', field: 'offAdjRevRsn', hide: true
      },
      {
        fieldName: '', field: 'billTxnComment', hide: true
      }
    ];


    const serviceObj = this.ocdreverService.getbillEndDayPfVal();
    serviceObj.subscribe(data => {
      if (data === undefined || data === null) {
        this.billEndDay = undefined;
      } else {
        this.billEndDay = data;
        this.billingCycleEndDate = DateFormat.getDate();
        this.billingCycleEndDate = DateFormat.getDate(this.billingCycleEndDate.setDate(this.billEndDay));
        this.billingCycleStartDate = DateFormat.getDate();
        this.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate.setDate(this.billEndDay + 1));
        this.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate.setMonth(DateFormat.getDate().getMonth() - 1));
        if (DateFormat.getDate().getMonth() === 1) {
          this.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate.setFullYear(DateFormat.getDate().getFullYear() - 1))
        }
      }
    });
  }
  canCellEditrRestrictCaseload = (data: any, index: number, field: string): boolean => {
    if (field === 'amount' && data.caseloadId && this.sessionManager.currentCaseLoad !== data.caseloadId) {
        return false;
    }
    return true;
}
  onOffenderChange(offender) {
    if (offender) {
      this.offFeeData = [];
      this.offFeeBillTranModel = new OffFeeBillTransactions();
      this.editedIndex = -1;
      this.vheaderBlockModel = offender;
      if (this.vheaderBlockModel && this.vheaderBlockModel.offenderBookId && this.vheaderBlockModel.trustAccount) {
        this.offFeeTxnExecuteQuery();
        this.getCasePlanId();
      }
    } else {
      this.offFeeData = [];
      this.offFeeBillTranModel = new OffFeeBillTransactions();
      this.editedIndex = -1;
    }

  }
  getCasePlanId() {
    const serviceObj = this.ocdreverService.getCasePlanId(this.vheaderBlockModel);
    serviceObj.subscribe(data => {
      if (data === undefined || data === 0) {
        this.caseplanId = undefined;
      } else {
        this.caseplanId = data;
      }
    });
  }
  canCellEdit = (data: any, index: number, field: string): boolean => {
    if (field === 'offAdjRevAmount' && data.caseloadId && this.sessionManager.currentCaseLoad !== data.caseloadId) {
      return false;
  }
    if (data.reversal) {
      return false;
    } else if (this.editedIndex != -1 && this.editedIndex != index) {
      return false;
    }
    return true;
  }
  /**
    * To display the messages
    */
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  onRowClickOffRevAdj(event) {
    if (event) {
      this.currentRowINdex = this.offFeeData.findIndex(e => e.offAdjTxnIdTemp == event.offAdjTxnIdTemp);
      this.offFeeBillTranModel = event;
    } else {
      this.offFeeBillTranModel = new OffFeeBillTransactions();
      this.offFeeBillTranModel.offAdjRevRsn = undefined;
      this.offFeeBillTranModel.billTxnComment = undefined;
      this.currentRowINdex = -1;
    }
  }

  // execute query
  offFeeTxnExecuteQuery() {
    const serviceObj = this.ocdreverService.offFeeTxnExecuteQuery(this.vheaderBlockModel.offenderBookId);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.offFeeData = [];
        this.offFeeBillTranModel = new OffFeeBillTransactions();
        this.tableIndex = -1;
      } else {
        data.forEach(element => {
          element.supervisionPeriod = this.vheaderBlockModel.bookingNo;
          element.offAdjTxnIdTemp = 'A' + element.offAdjTxnId;
          if(element.offAdjTxnId && !element.originalOffAdjTxnId){
              element.billTxnComment = undefined;
              element.offAdjRevRsn = undefined;
          }
          if (element.originalOffAdjTxnId) {
            element.originalOffAdjTxnIdTemp = 'A' + element.originalOffAdjTxnId;
            data.forEach(e => {
              if (element.originalOffAdjTxnId === e.offAdjTxnId && element.billId === e.billId) {
                element.adjustmentAmount = e.adjustmentAmount;
                e.reversal = true;
                e.offAdjRevAmount = -Math.abs(e.adjustmentAmount);
                element.reversal = true;
              }
            });
          }
        });
        this.offFeeData = data;
        this.tableIndex = 0;
      }
    });
  }
  savevalidationEvent(event) {
    if (!event.offAdjRevAmount) {
      this.show(this.translateService.translate('ocdrever.amountmustbeentered'), 'warn');
      return true;
    }
    if (Number(event.offAdjRevAmount) !== Number(event.adjustmentAmount)) {
      this.show(this.translateService.translate('ocdrever.theamountsenteredmustmatchwithadjtxnamount'), 'warn');
      return true;
    }
    return false;
  }
  adjustRevCommit(event) {
    this.offFeeTrxInsertList = [];
    this.offBillStmtInsertlist = [];
    this.offFeeTrxInsertList = event.updated;
    this.offTrxCommitmodel = new OffFeeBillTransactionsCommitBean();
    if (this.offFeeTrxInsertList.length > 0) {
      if (!this.offFeeBillTranModel.offAdjRevRsn) {
        this.show(this.translateService.translate('ocdrever.reasonmustbe'), 'warn');
        return;
      }
      for (let i = 0; i < this.offFeeTrxInsertList.length; i++) {
        if (this.savevalidationEvent(this.offFeeTrxInsertList[i])) {
          return;
        }
        this.offFeeTrxInsertList[i].billTxnDatetime = DateFormat.getDate();
        this.offFeeTrxInsertList[i].billTxnUser = this.sessionManager.getId();
        /*  if (this.offFeeTrxInsertList[i].billTxnAmount === 0) {
           this.offFeeTrxInsertList[i].billStatus = 'PAID';
         } else {
           this.offFeeTrxInsertList[i].billStatus = 'AR';
         } */
        //this.offFeeTrxInsertList[i].txnStatementGeneratedFlag = 'N';
        this.offFeeTrxInsertList[i].originalBillId = this.offFeeTrxInsertList[i].billId;
        this.offFeeTrxInsertList[i].originalBillTxnNo = this.offFeeTrxInsertList[i].billTxnNo;
        this.offFeeTrxInsertList[i].originalOffAdjTxnId = this.offFeeTrxInsertList[i].offAdjTxnId;
        this.offFeeTrxInsertList[i].offAdjCancRsn = undefined;
        this.offFeeTrxInsertList[i].offAdjSubRsn = undefined;
        this.offFeeTrxInsertList[i].billAgingEndDate = DateFormat.getDate(this.offFeeTrxInsertList[i].billAgingEndDate);
        this.offFeeTrxInsertList[i].billGenerateDatetime = DateFormat.getDate(this.offFeeTrxInsertList[i].billGenerateDatetime);
        this.offFeeTrxInsertList[i].billAgingStartDate=  DateFormat.getDate(this.offFeeTrxInsertList[i].billAgingStartDate);
        this.offFeeTrxInsertList[i].billTxnDatetime=  DateFormat.getDate(this.offFeeTrxInsertList[i].billTxnDatetime);
        this.offFeeTrxInsertList[i].billArDueDate =  DateFormat.getDate( this.offFeeTrxInsertList[i].billArDueDate);
        this.offFeeTrxInsertList[i].billLdppEndDate= DateFormat.getDate( this.offFeeTrxInsertList[i].billLdppEndDate);
        this.offFeeTrxInsertList[i].billLdppStartDate = DateFormat.getDate(this.offFeeTrxInsertList[i].billLdppStartDate);
        // this.offFeeTrxInsertList[i].txnStatementGeneratedFlag = 'Y';
        // this.date = DateFormat.getDate();
        // this.date.setDate( this.date.getDate() + 30 );
        // this.offFeeTrxInsertList[i].billAgingStartDate = DateFormat.getDate();
        // this.offFeeTrxInsertList[i].billAgingEndDate = this.date;
        if (this.caseplanId) {
          this.offBillStmtModel = new offBillingStatements();
          this.offBillStmtModel.rootOffenderId = this.vheaderBlockModel.rootOffenderId;
          this.offBillStmtModel.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate);
          this.offBillStmtModel.billingCycleEndDate = DateFormat.getDate(this.billingCycleEndDate);
          this.offBillStmtModel.statementGenerateDatetime = DateFormat.getDate();
          this.offBillStmtModel.statementGenerateUser = this.sessionManager.getId();
          this.offBillStmtModel.beginingBalanceAmount = 0;
          this.offBillStmtModel.paymentsCreditsAmount = 0;
          this.offBillStmtModel.billingsAmount = this.offFeeTrxInsertList[i].offAdjRevAmount;
          this.offBillStmtModel.endingBalanceAmount = 0;
          this.offBillStmtModel.offenderBookId = this.vheaderBlockModel.offenderBookId;
          this.offBillStmtModel.casePlanId = this.caseplanId;
          this.offBillStmtModel.billId = this.offFeeTrxInsertList[i].billId;
          this.offBillStmtModel.billTxnNo = this.offFeeTrxInsertList[i].billTxnNo;
          this.offBillStmtModel.caseloadId = this.sessionManager.currentCaseLoad; 
          this.offBillStmtInsertlist.push(this.offBillStmtModel);
        }
      }
    }

    this.offTrxCommitmodel.insertList = this.offFeeTrxInsertList;
    this.offTrxCommitmodel.stmtInsertList = this.offBillStmtInsertlist;
    const result = this.ocdreverService.adjustRevCommit(this.offTrxCommitmodel);
    result.subscribe(data => {
      if (data === 1) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.offFeeBillTranModel = new OffFeeBillTransactions();
        //this.offTrxCommitmodel = new OffFeeBillTransactionsCommitBean();
        this.editedIndex = -1;
        this.offFeeTxnExecuteQuery();
        return;
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
        this.offFeeBillTranModel = new OffFeeBillTransactions();
        this.editedIndex = -1;
        this.offFeeTxnExecuteQuery();
        return;
      }
    });
  }

  validateRowData = (event) => {
    const rowdata = new ValidateRowReturn();
    if (event.field === 'offAdjRevAmount' && event.data && event.data.offAdjRevAmount) {
      this.editedIndex = event.rowIndex;
    }
    else{
      this.offFeeBillTranModel = new OffFeeBillTransactions();

    }

    rowdata.validated = true;
    return rowdata;
  }
  onReasonChange(event) {
    if (event && !this.offFeeBillTranModel.reversal) {
      this.grid.setColumnData('offAdjRevRsn', this.currentRowINdex, event.code);
    }
  }
  get fieldsReadOnly() {
    if (!this.vheaderBlockModel || (this.vheaderBlockModel && !this.vheaderBlockModel.trustAccount)) {
      return true;
    } else if ((this.offFeeData && this.offFeeData.length === 0) || (this.offFeeBillTranModel && this.offFeeBillTranModel.reversal)) {
      return true;
    }
    return false;
  }

  get billTxnCommentReadOnly() {
    if (!this.vheaderBlockModel || (this.vheaderBlockModel && !this.vheaderBlockModel.trustAccount)) {
      return true;
    } else if (this.offFeeData && this.offFeeData.length === 0) {
      return true;
    } else if (this.offFeeBillTranModel.reversal || !this.offFeeBillTranModel.offAdjRevRsn) {
      return true;
    }
    return false;
  }

  onbillTxnCommentBlur(event) {
    if (event && event.innerValue && event.innerValue != '') {
      this.grid.setColumnData('billTxnComment', this.currentRowINdex, this.offFeeBillTranModel.billTxnComment);
    }
  }

  onOffFeeClear = () => {
    this.editedIndex = -1;
    return true;
  }
}
