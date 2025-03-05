
import {
  Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdadjusService } from '../service/ocdadjus.service';
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
  selector: 'app-ocdadjus',
  templateUrl: './ocdadjus.component.html'
})
export class OcdadjusComponent implements OnInit {
  gridUpdate = true;
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
  offFeeTrxInsertAdjustList: OffFeeBillTransactions[] = [];
  offFeeTrxUpdateList: OffFeeBillTransactions[] = [];
  offFeeTrxDeleteList: OffFeeBillTransactions[] = [];
  offBillStmtInsertlist: offBillingStatements[] = [];
  offBillStmtModel: offBillingStatements = new offBillingStatements();
  offTrxCommitmodel: OffFeeBillTransactionsCommitBean = new OffFeeBillTransactionsCommitBean();
  amount = 0;
  trnsAmount : any;
  constructor(private ocdadjusFactory: OcdadjusService,
    public translateService: TranslateService, public sessionManager: UserSessionManager,
    private offenderSearchService: OffenderSearchService, public dialogService: DialogService,
    private amountFormat: AmountFormatUtil) {
    this.offFeesColumnDef = [];
  }
  ngOnInit() {
    this.trnsAmount = undefined;
    this.sessionManager.getId();
    this.vheaderBlockModel = this.offenderSearchService.selectedOffender;
    this.billEndDay = undefined;
    this.offFeeData = [];
    if (!this.offenderSearchService.selectedOffender || this.offenderSearchService.selectedOffender.offenderBookId === undefined) {
      this.show('common.pleasesearchforvalidoffender');
    } else {
      if (this.vheaderBlockModel && this.vheaderBlockModel.offenderBookId && this.vheaderBlockModel.trustAccount) {
        this.offFeeExecuteQuery();
        // this.getCasePlanId();
      }
    }
    this.offFeesColumnDef = [
      {
        fieldName: this.translateService.translate('ocdadjus.supervisionperiod'), field: 'supervisionPeriod',
        editable: false, width: 150, datatype: 'text',
      },
      {
        fieldName: this.translateService.translate('ocdadjus.caseload'), field: 'caseloadDesc',
        editable: false, width: 150, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocdadjus.feeid'), field: 'offenderFeeId', editable: false,
        datatype: 'number', width: 150
      },
      {
        fieldName: this.translateService.translate('ocdadjus.feecode'), field: 'feecodeDesc', editable: false,
        datatype: 'text', width: 150
      },
      {
        fieldName: this.translateService.translate('ocdadjus.billnumber'), field: 'billId', editable: false,
        datatype: 'string', width: 150
      },
      {
        fieldName: this.translateService.translate('ocdadjus.billdate'), field: 'billGenerateDatetime', editable: false,
        datatype: 'date', width: 150
      },
      {
        fieldName: this.translateService.translate('ocdadjus.billstatus'), field: 'billStatus', editable: false, width: 150,
        maxlength: 240, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocdadjus.billamount'), field: 'billGenerateAmount', editable: false,
        width: 150, datatype: 'number', format: '1.2-2', rightAlign: true,
      },
      {
        fieldName: this.translateService.translate('ocdadjus.balance'), field: 'balanceOwingAmount', editable: false,
        width: 150, datatype: 'number', format: '1.2-2', rightAlign: true,
      },
      {
        fieldName: this.translateService.translate('ocdadjus.amount'), field: 'adjustmentAmount', editable: true,
        width: 150,  datatype: 'number', rightAlign: true, format: '1.2-2',maxValue: 999999999.99, whole: true, strictFP: true, cellEditable: this.canCellEditrRestrictCaseload
      },
      {
        fieldName: this.translateService.translate('ocdadjus.transaction'), field: 'offAdjTxnIdTemp',
        width: 150, datatype: 'text',editable: false,
      },
      {
        fieldName: this.translateService.translate('ocdadjus.comments'), field: 'billTxnComment', editable: true,
        width: 150, datatype: 'text', maxlength: 240
      },
      { fieldName: '', field: 'hideValue', hide: true },
      { fieldName: '', field: 'offAdjTxnId', hide: true },

    ];


    const serviceObj = this.ocdadjusFactory.getbillEndDayPfVal();
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
    if (field === 'adjustmentAmount' && data.caseloadId && this.sessionManager.currentCaseLoad !== data.caseloadId) {
        return false;
    }
    return true;
}
  onOffenderChange(offender) {
    if (offender) {
      this.offFeeData = [];
      this.offFeeBillTranModel = new OffFeeBillTransactions();
      this.vheaderBlockModel = offender;
      this.trnsAmount = undefined;
      if (this.vheaderBlockModel && this.vheaderBlockModel.offenderBookId && this.vheaderBlockModel.trustAccount) {
        this.offFeeExecuteQuery();
        // this.getCasePlanId();
      }
    } else {
      this.offFeeData = [];
      this.offFeeBillTranModel = new OffFeeBillTransactions();
      this.gridUpdate = false;
      this.trnsAmount = undefined;
    }

  }
  getCasePlanId() {
    const serviceObj = this.ocdadjusFactory.getCasePlanId(this.vheaderBlockModel);
    serviceObj.subscribe(data => {
      if (data === undefined || data === 0) {
        this.caseplanId = undefined;
      } else {
        this.caseplanId = data;
      }
    });
  }
  canCellEdit = (data: any, index: number, field: string): boolean => {
    if (this.vheaderBlockModel && (!this.vheaderBlockModel.offenderBookId || !this.vheaderBlockModel.trustAccount)) {
      return false;
    }
    if (this.vheaderBlockModel && (this.vheaderBlockModel.statusDisplay === 'Inactive' ||
      this.vheaderBlockModel.inOutStatus === 'Historic'
      || this.vheaderBlockModel.statusDisplay === '[Closed]')) {
      return false;
    }
    if (!this.offFeeBillTranModel || !this.offFeeBillTranModel.billTxnAmount) {
      return false;
    }
    if (data.feeActStatus == 'C' || data.feeActStatus == 'S') {
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
  onRowClickOffFees(event) {
    if (event) {

    } else {
    }
  }

  // execute query
  offFeeExecuteQuery() {
    const serviceObj = this.ocdadjusFactory.offFeeExecuteQuery(this.vheaderBlockModel.offenderBookId);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.offFeeData = [];
        this.offFeeBillTranModel = new OffFeeBillTransactions();
        this.tableIndex = -1;
        this.amount = 0;
        this.trnsAmount = undefined;
      } else {
        data.forEach(element => {
          if(element.offAdjTxnId){
            element.offAdjTxnIdTemp = 'A'+element.offAdjTxnId;
          }else{
            element.offAdjTxnIdTemp = undefined;
          }
          element.billTxnAmount = element.billTxnAmount.toFixed(2);
          element.billGenerateAmount= element.billGenerateAmount.toFixed(2);
          element.supervisionPeriod = this.vheaderBlockModel.bookingNo;
          if (!element.offAdjTxnId || element.originalOffAdjTxnId) {
            element.billTxnComment = undefined;
           
          } 
        //  element.adjustmentAmount = 0;
         // element.adjustmentAmount = element.adjustmentAmount.toFixed(2);
        });
        this.offFeeData = data;
        this.tableIndex = 0;
        this.amount = 0;
      }
    });
  }
  savevalidationEvnt(event) {
    if (!this.offFeeBillTranModel.billTxnType) {
      this.show(this.translateService.translate('ocdadjus.adjustmenttypemustbeentered'), 'warn');
      return true;
    }
    if (this.offFeeBillTranModel.billTxnType === 'CCANCL' && !this.offFeeBillTranModel.offAdjCancRsn) {
      this.show(this.translateService.translate('ocdadjus.cancelreasonmustbeentered'), 'warn');
      return true;
    }
    if ((this.offFeeBillTranModel.offAdjCancRsn === 'DELAY' || this.offFeeBillTranModel.offAdjCancRsn === 'INCT')
      && !this.offFeeBillTranModel.offAdjSubRsn) {
      this.show(this.translateService.translate('ocdadjus.cancelsubsetreasonmustbeentered'), 'warn');
      return true;
    }
    if (!this.offFeeBillTranModel.billTxnAmount) {
      this.show(this.translateService.translate('ocdadjus.amountmustbeentered'), 'warn');
      return true;
    }
    if (this.offFeeBillTranModel.billTxnAmount <= 0) {
      this.show(this.translateService.translate('ocdadjus.adjustedamountmustbegreaterthanzero'));
      return;
  }
    const txnAmount = Number(this.offFeeBillTranModel.billTxnAmount);
    const adjAmount = Number(event.adjustmentAmount);
    const billTxnAmount = Number(event.balanceOwingAmount);
    
    const diffAmnt = Math.abs(Number(this.amount) - (Number(txnAmount)));
    
    if (adjAmount > billTxnAmount) {
      this.show(this.translateService.translate('The Adjust amount must match with the Transaction Amount or less than the Transaction amount'), 'warn');
      return true;
    }
    if (this.amount !== txnAmount) {
      this.show(this.translateService.translate('common.transactionisnotbalancedifferenceof') + ` ${diffAmnt.toFixed(2)}`, 'warn');
      return true;
    }
    return false;
  }
  adjustCommit(event) {

    this.offFeeTrxInsertList = [];
    this.offBillStmtInsertlist = [];
    this.offFeeTrxInsertAdjustList =[];
    this.offFeeTrxInsertList = event.updated;
    this.offTrxCommitmodel.insertList = [];
    this.offTrxCommitmodel = new OffFeeBillTransactionsCommitBean();
    if (this.offFeeTrxInsertList.length > 0) {
      for (let i = 0; i < this.offFeeTrxInsertList.length; i++) {
        this.offFeeTrxInsertList[i].billTxnType = this.offFeeBillTranModel.billTxnType;
        this.offFeeTrxInsertList[i].trustTxnId = undefined;
        this.offFeeTrxInsertList[i].trustTxnEntrySeq = undefined;
        this.offFeeTrxInsertList[i].originalOffAdjTxnId = undefined;
        this.offFeeTrxInsertList[i].originalBillTxnNo = undefined;
        this.offFeeTrxInsertList[i].originalBillId = undefined;
        if (this.offFeeBillTranModel.billTxnType === 'CCANCL') {
          this.offFeeTrxInsertList[i].offAdjCancRsn = this.offFeeBillTranModel.offAdjCancRsn
          if (this.offFeeBillTranModel.offAdjCancRsn === 'DELAY' || this.offFeeBillTranModel.offAdjCancRsn === 'INCT') {
            this.offFeeTrxInsertList[i].offAdjSubRsn = this.offFeeBillTranModel.offAdjSubRsn
          }
        }

        if (this.savevalidationEvnt(this.offFeeTrxInsertList[i])) {
          return;
        }
        // this.offFeeTrxInsertList[i].billTxnAmount = this.offFeeTrxInsertList[i].billTxnAmount - this.offFeeTrxInsertList[i].adjustmentAmount;
        this.offFeeTrxInsertList[i].billTxnAmount =  this.offFeeTrxInsertList[i].adjustmentAmount;
        
        

        // this.offFeeTrxInsertList[i].billId = this.offFeeData[this.tableIndex].billId;
        this.offFeeTrxInsertList[i].billTxnDatetime = DateFormat.getDate();
        this.offFeeTrxInsertList[i].billTxnUser = this.sessionManager.getId();
        const amount = this.offFeeTrxInsertList[i].balanceOwingAmount - this.offFeeTrxInsertList[i].adjustmentAmount;
        this.offFeeTrxInsertList[i].billAgingEndDate = DateFormat.getDate(this.offFeeTrxInsertList[i].billAgingEndDate);
        this.offFeeTrxInsertList[i].billGenerateDatetime = DateFormat.getDate(this.offFeeTrxInsertList[i].billGenerateDatetime);
        this.offFeeTrxInsertList[i].billAgingStartDate=  DateFormat.getDate(this.offFeeTrxInsertList[i].billAgingStartDate);
        this.offFeeTrxInsertList[i].billTxnDatetime=  DateFormat.getDate(this.offFeeTrxInsertList[i].billTxnDatetime);
       if (amount === 0) {
          this.offFeeTrxInsertList[i].billStatus = 'PAID';
        }
        //this.offFeeTrxInsertList[i].txnStatementGeneratedFlag = 'N';
        // this.offFeeTrxInsertList[i].txnStatementGeneratedFlag = 'Y';
        // this.date = DateFormat.getDate();
        // this.date.setDate( this.date.getDate() + 30 );
        // this.offFeeTrxInsertList[i].billAgingStartDate = DateFormat.getDate();
        // this.offFeeTrxInsertList[i].billAgingEndDate = this.date;
        // commented stmt data
        //   if(this.caseplanId) {
        //   this.offBillStmtModel = new offBillingStatements();
        //   this.offBillStmtModel.rootOffenderId = this.vheaderBlockModel.rootOffenderId;
        //   this.offBillStmtModel.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate);
        //   this.offBillStmtModel.billingCycleEndDate = DateFormat.getDate(this.billingCycleEndDate);
        //   this.offBillStmtModel.statementGenerateDatetime = DateFormat.getDate();
        //   this.offBillStmtModel.statementGenerateUser = this.sessionManager.getId();
        //   this.offBillStmtModel.beginingBalanceAmount = 0;
        //   this.offBillStmtModel.paymentsCreditsAmount = 0;
        //   this.offBillStmtModel.billingsAmount = this.offFeeTrxInsertList[i].adjustmentAmount;
        //   this.offBillStmtModel.endingBalanceAmount = 0;
        //   this.offBillStmtModel.offenderBookId = this.vheaderBlockModel.offenderBookId;
        //  this.offBillStmtModel.casePlanId = this.caseplanId;
        //  this.offBillStmtModel.billId =this.offFeeTrxInsertList[i].billId;
        //  this.offBillStmtModel.billTxnNo = this.offFeeTrxInsertList[i].billTxnNo;
        //  this.offBillStmtModel.caseloadId = this.sessionManager.currentCaseLoad;
        //  this.offBillStmtInsertlist.push(this.offBillStmtModel);
        //   }
      }
    }
    this.offFeeTrxInsertList.forEach(element => {
      if(element.adjustmentAmount){
        this.offFeeTrxInsertAdjustList.push(element);
      }
  
});
    this.offTrxCommitmodel.insertList = this.offFeeTrxInsertAdjustList;
    // this.offTrxCommitmodel.stmtInsertList = this.offBillStmtInsertlist;
    const result = this.ocdadjusFactory.adjustAmountCommit(this.offTrxCommitmodel);
    result.subscribe(data => {
      if (data === 1) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.offFeeBillTranModel = new OffFeeBillTransactions();
        this.trnsAmount = undefined;
        this.offFeeExecuteQuery();
        return;
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
        this.offFeeExecuteQuery();
        return;
      }
    });
  }

  validateRowData = (event) => {
    const rowdata = new ValidateRowReturn();
    const index = event.rowIndex;
    if (event.field === 'adjustmentAmount') {
      this.amount = 0;
      const dataObj = this.offFeeData.filter(ele => {
        if (ele['adjustmentAmount']) {
          this.amount += ele.adjustmentAmount ? Number(ele.adjustmentAmount) : 0;
         // ele.adjustmentAmount =Number(ele.adjustmentAmount).toFixed(2);
        }
      });
    }
    rowdata.validated = true;
    return rowdata;
  }
  onGridInsert = () => {

    return {};
  }
  onAdjTypeChange(event) {
    if (event && event !== 'CCANCL') {
      this.offFeeBillTranModel.offAdjCancRsn = undefined;
      this.offFeeBillTranModel.offAdjSubRsn = undefined;
    } else if (this.vheaderBlockModel && (this.vheaderBlockModel.statusDisplay === 'Inactive' ||
      this.vheaderBlockModel.inOutStatus === 'Historic'
      || this.vheaderBlockModel.statusDisplay === '[Closed]')) {
      return true;
    }
    if (event.code) {
      this.grid.setColumnData('hideValue', 0, true);
    }

  }
  onCanReasonEvent(event) {
    if (event && (event !== 'DELAY' || event !== 'INCT')) {
      this.offFeeBillTranModel.offAdjSubRsn = undefined;
    } else if (this.vheaderBlockModel && (this.vheaderBlockModel.statusDisplay === 'Inactive' ||
      this.vheaderBlockModel.inOutStatus === 'Historic'
      || this.vheaderBlockModel.statusDisplay === '[Closed]')) {
      return true;
    }
    if (event.code) {
      this.grid.setColumnData('hideValue', 0, true);
    }
  }
  onCanSubEvent(event) {
    if (!this.vheaderBlockModel || (this.vheaderBlockModel && !this.vheaderBlockModel.trustAccount)) {
      return true;
    } else if (this.vheaderBlockModel && (this.vheaderBlockModel.statusDisplay === 'Inactive' ||
      this.vheaderBlockModel.inOutStatus === 'Historic'
      || this.vheaderBlockModel.statusDisplay === '[Closed]')) {
      return true;
    }
    if (event.code) {
      this.grid.setColumnData('hideValue', 0, true);
    }
    return false;
  }
  get adjTypeReadOnly() {
    if (!this.vheaderBlockModel || (this.vheaderBlockModel && !this.vheaderBlockModel.trustAccount)) {
      return true;
    } else if (this.vheaderBlockModel && (this.vheaderBlockModel.statusDisplay === 'Inactive' ||
      this.vheaderBlockModel.inOutStatus === 'Historic'
      || this.vheaderBlockModel.statusDisplay === '[Closed]')) {
      return true;
    }
    return false;
  }
  get canReasonReadOnly() {
    if (!this.vheaderBlockModel || (this.vheaderBlockModel && !this.vheaderBlockModel.trustAccount)) {
      return true;
    } else if (this.vheaderBlockModel && (this.vheaderBlockModel.statusDisplay === 'Inactive' ||
      this.vheaderBlockModel.inOutStatus === 'Historic'
      || this.vheaderBlockModel.statusDisplay === '[Closed]')) {
      return true;
    } else if (this.offFeeBillTranModel.billTxnType && this.offFeeBillTranModel.billTxnType === 'CCANCL') {
      return false;
    }
    return true;
  }
  get canSubReadOnly() {
    if (!this.vheaderBlockModel || (this.vheaderBlockModel && !this.vheaderBlockModel.trustAccount)) {
      return true;
    } else if (this.vheaderBlockModel && (this.vheaderBlockModel.statusDisplay === 'Inactive' ||
      this.vheaderBlockModel.inOutStatus === 'Historic'
      || this.vheaderBlockModel.statusDisplay === '[Closed]')) {
      return true;
    } else if (this.offFeeBillTranModel.billTxnType && this.offFeeBillTranModel.billTxnType === 'CCANCL' &&
      (this.offFeeBillTranModel.offAdjCancRsn === 'DELAY' || this.offFeeBillTranModel.offAdjCancRsn === 'INCT')) {
      return false;
    }
    return true;
  }
  get amountReadOnly() {
    if (!this.vheaderBlockModel || (this.vheaderBlockModel && !this.vheaderBlockModel.trustAccount)) {
      return true;
    } else if (this.vheaderBlockModel && (this.vheaderBlockModel.statusDisplay === 'Inactive' ||
      this.vheaderBlockModel.inOutStatus === 'Historic'
      || this.vheaderBlockModel.statusDisplay === '[Closed]')) {
      return true;
    }
    return false;
  }
  amountKeyDown(event, comp) {
    if (!this.amountFormat.avoidKeys(event, this.offFeeBillTranModel.billTxnAmount)) {
      event.stopPropagation();
      return false;
    }
    // if (this.offFeeBillTranModel.billTxnAmount) {
    //   this.grid.setColumnData('hideValue', 0, true);
    // }
  }
  amountChange(event) {
    if (event) {
      this.grid.setColumnData('hideValue', 0, undefined);
      this.grid.setColumnData('hideValue', 0, true);
    }
  }
  onAmountBlur(amount) {
     this.amountFormat.amountFormatEvent(amount);
    this.offFeeBillTranModel.billTxnAmount = JSON.parse(JSON.stringify(this.amountFormat.amountFormat(amount)));
  }
  OnGridClear = () => {
    this.offFeeBillTranModel = new OffFeeBillTransactions();
    this.trnsAmount = undefined;
    this.offFeeExecuteQuery();
    return true;
  }

  get cancelReasonMadatory (){
    if(this.offFeeBillTranModel.billTxnType =='CCANCL'){
      return true;
    } else {
      return false;
    }
  }
get cancelSubsetReasonMandatory (){
  if(this.offFeeBillTranModel.offAdjCancRsn && (this.offFeeBillTranModel.offAdjCancRsn =='DELAY' || this.offFeeBillTranModel.offAdjCancRsn =='INCT')){
    return true;
  } else {
    return false;
  }
}
  
}
