import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { OcupayplService } from '@cf/offendertransactions/service/ocupaypl.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderPaymentPlans } from '@cf/offendertransactions/beans/OffenderPaymentPlans';
import { VOffenderPaymentSchedules } from '@cf/offendertransactions/beans//VOffenderPaymentSchedules';
import { PaymentPlanTransactions } from '@cf/offendertransactions/beans//PaymentPlanTransactions';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderPaymentPlanCommitBean } from '@cf/offendertransactions/beans/OffenderPaymentPlanCommitBean';
import { DialogService } from '@core/ui-components/dialog/dialog.service';

@Component({
  selector: 'app-ocupaypl',
  templateUrl: './ocupaypl.component.html'
})

export class OcupayplComponent implements OnInit {
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  @ViewChild('planGrid', {static: true}) planGrid: any;
  msgs: any[] = [];
  payplnData: OffenderPaymentPlans[] = [];
  payplnDataTemp: OffenderPaymentPlans[] = [];
  payplnModel: OffenderPaymentPlans = new OffenderPaymentPlans();
  payplnSearchModel: OffenderPaymentPlans = new OffenderPaymentPlans();
  payplnHistoryModel: OffenderPaymentPlans = new OffenderPaymentPlans();
  payplnInsertList: OffenderPaymentPlans[] = [];
  payplnRowData: OffenderPaymentPlans[] = [];
  payplnUpdateRow: OffenderPaymentPlans[] = [];
  payplnRemoveRow: OffenderPaymentPlans[] = [];
  payplnUpdatetList: OffenderPaymentPlans[] = [];
  payplnDeleteList: OffenderPaymentPlans[] = [];
  payplnCommitModel: OffenderPaymentPlanCommitBean = new OffenderPaymentPlanCommitBean();
  payschData: VOffenderPaymentSchedules[] = [];
  payschDataTemp: VOffenderPaymentSchedules[] = [];
  payschModel: VOffenderPaymentSchedules = new VOffenderPaymentSchedules();
  payschInsertList: VOffenderPaymentSchedules[] = [];
  payschUpdatetList: VOffenderPaymentSchedules[] = [];
  payschDeleteList: VOffenderPaymentSchedules[] = [];
  pptxnData: PaymentPlanTransactions[] = [];
  pptxnDataTemp: PaymentPlanTransactions[] = [];
  pptxnModel: PaymentPlanTransactions = new PaymentPlanTransactions();
  notifctnMaps: Map<string, string> = new Map<string, string>();
  infoMaps: Map<string, string> = new Map<string, string>();
  pptxnInsertList: PaymentPlanTransactions[] = [];
  pptxnUpdatetList: PaymentPlanTransactions[] = [];
  pptxnDeleteList: PaymentPlanTransactions[] = [];
  syspflData: SystemProfiles[] = [];
  syspflDataTemp: SystemProfiles[] = [];
  syspflModel: SystemProfiles = new SystemProfiles();
  syspflInsertList: SystemProfiles[] = [];
  syspflUpdatetList: SystemProfiles[] = [];
  syspflDeleteList: SystemProfiles[] = [];
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  ppTxnColumnDef: any[];
  payPlnColumnDef: any[];
  paySchColumnDef: any[];
  payplnIndex = -1;
  payschIndex = -1;
  pptxnIndex = -1;
  type = 'error';
  message = ' Invalid.';
  checkConstOne = '1';
  checkConstTwo = '2';
  checkConstA = 'A';
  checkConstB = 'B';
  msglist = [];
  tableIndex: number;
  description: any;
  code: any;
  infoLink: string;
  retriveDisabled: boolean;
  info: string;
  clearDisabled: boolean;
  namesReadOnly: boolean;
  deleData: boolean;
  disableGener: boolean;
  disableDistr: boolean;
  buttonsOnly: boolean;
  disableJsFlag: boolean;
  disableScreen: boolean;
  link: string;
  isInsert: boolean;
  paidCheck: boolean;
  lenCheck: boolean;
  closeCheck: boolean;
  schCheck: boolean;
  planDisable: boolean;
  dollarAmt: string;
  amount: string;
  dollarAmount: string;
  dataFlag: boolean;
  addFlag: boolean;
  lpaymentDis: boolean;
  printDis: boolean;
  exitDis: boolean;
  planHist: boolean;
  infoTitles = {
    description: this.translateService.translate('ocupaypl.gridCase'),
    caseloadId: this.translateService.translate('ocupaypl.gridGrp')

  };
  totaree: boolean;
  planInsert: boolean;
  planUpdate: boolean;

  constructor(private ocupayplFactory: OcupayplService, public translateService: TranslateService, private currencyPipe: CurrencyPipe,
    public sessionManager: UserSessionManager,
    public dialogService: DialogService) {
    this.ppTxnColumnDef = [];
    this.payPlnColumnDef = [];
    this.paySchColumnDef = [];

  }
  ngOnInit() {

    this.lpaymentDis = false;
    this.printDis = false;

    this.planHist = false;
    this.addFlag = false;
    this.dataFlag = false;
    this.isInsert = true;
    this.schCheck = false;
    this.disableScreen = false;
    this.paidCheck = false;
    this.schCheck = false;


    if (this.dialog.data.rootOffenderId) {
      this.payplnHistoryModel.offenderId = this.dialog.data.rootOffenderId;
      this.planDisable = true;
      this.lenCheck = false;
      this.closeCheck = false;
      this.namesReadOnly = true;
      this.deleData = false;
      this.planInsert = false;
      this.planUpdate = false;

    } else if (this.dialog.data.offenderId) {
      this.planDisable = false;
      this.lenCheck = true;
      this.closeCheck = true;
      this.deleData = true;
      this.planInsert = true;
      this.planUpdate = true;

      this.payplnHistoryModel.offenderId = this.dialog.data.offenderId;
    }

    this.disableJsFlag = true;
    this.clearDisabled = true;
    this.namesReadOnly = false;
    this.retriveDisabled = false;

    this.buttonsOnly = true;
    if (this.dialog.data.rootOffenderId) {
      this.infoLink = 'ocupaypl/cgfkPayPlnInformationNumbeRecordGroup?offenderId=' + this.dialog.data.rootOffenderId
      + '&caseLoadId=' + this.sessionManager.currentCaseLoad;
      this.link = 'ocupaypl/cgfkPayPlnInformationNumbeRecordGroup?offenderId=' + this.dialog.data.rootOffenderId
      + '&caseLoadId=' + this.sessionManager.currentCaseLoad;
    } else if (this.dialog.data.offenderId) {
      this.infoLink = 'ocupaypl/cgfkPayPlnInformationNumbeRecordGroup?offenderId=' + this.dialog.data.offenderId
      + '&caseLoadId=' + this.sessionManager.currentCaseLoad;
      this.link = 'ocupaypl/cgfkPayPlnInformationNumbeRecordGroup?offenderId=' + this.dialog.data.offenderId
      + '&caseLoadId=' + this.sessionManager.currentCaseLoad;

    }






    this.payPlnColumnDef = [

      {
        fieldName: this.translateService.translate('ocupaypl.gridCase'), field: 'grpId', editable: true, width: 150, datatype: 'lov',
        cellEditable: this.canCellEdit, link: this.link, titles: this.infoTitles
      },
      {
        fieldName: this.translateService.translate('ocupaypl.gridGrp'), field: 'groupId', editable: true, width: 150,
        cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('ocupaypl.gridCode'), field: 'code', editable: true, width: 150,
        cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('ocupaypl.gridStart'), field: 'startDate', editable: true, datatype: 'date',
        cellEditable: this.canCellEdit, width: 150
      },
      {
        fieldName: this.translateService.translate('ocupaypl.gridDate'), field: 'endDate', editable: true, datatype: 'date',
        width: 150, cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('ocupaypl.gridFreq'), field: 'frequency', datatype: 'lov', domain: 'CF_FREQ',
        editable: true, width: 150,
        cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('ocupaypl.gridMonth'), field: 'monthly', editable: true, datatype: 'number',
        width: 150, cellEditable: this.canCellEditMonthly
      },
      {
        fieldName: this.translateService.translate('ocupaypl.gridAmt'), field: 'amount', editable: true, width: 150,
        cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('ocupaypl.gridLen'), field: 'leniencyFlag', editable: this.lenCheck,
        datatype: 'checkbox', width: 150
      },
      {
        fieldName: this.translateService.translate('ocupaypl.gridClose'), field: 'paymentClosedFlag', editable: this.closeCheck,
        datatype: 'checkbox', width: 150
      },
      {
        fieldName: this.translateService.translate('ocupaypl.gridPaid'), field: 'paidFlag', editable: this.paidCheck,
        datatype: 'checkbox', width: 150
      },
      { fieldName: '', field: 'offenderId', hide: true },
      { fieldName: '', field: 'parentInfoId', hide: true },





    ];
    this.paySchColumnDef = [
      {
        fieldName: this.translateService.translate('ocupaypl.gridSchPaymt'), field: 'paymentDate', datatype: 'date',
        editable: true, width: 150
      },
      { fieldName: this.translateService.translate('ocupaypl.gridSchAmt'), field: 'paymentAmount', editable: true, width: 150 },
      {
        fieldName: this.translateService.translate('ocupaypl.gridSchMost'), field: 'modifyDatetime', datatype: 'date',
        editable: true, width: 150
      },
      { fieldName: this.translateService.translate('ocupaypl.gridSchPaid'), field: 'paidAmount', editable: true, width: 150 },
      {
        fieldName: this.translateService.translate('ocupaypl.gridSchClose'), field: 'paymentClosedFlag', datatype: 'checkbox',
        editable: this.schCheck, width: 150
      },


    ];
    this.ppTxnColumnDef = [
      {
        fieldName: this.translateService.translate('ocupaypl.gridTxnPaymt'), field: 'transactionDate', datatype: 'date',
        editable: true, width: 150
      },
      { fieldName: this.translateService.translate('ocupaypl.gridTxnPaid'), field: 'transactionAmount', editable: true, width: 150 },

    ];

    this.infoLov();
    this.payPlnExecuteQuery();



  }

  canCellEdit = (data: any, index: number, field: string): boolean => {
    if (field === 'monthly' && data.frequency === 'LUMPSUM') {
      return false;
    }

    if (!data.createDatetime) {
      return true;
    } else {
      return false;
    }


  }
  canCellEditMonthly = (data: any, index: number, field: string): boolean => {
    if (field === 'monthly' && ((data.frequency === 'LUMPSUM' && DateFormat.compareDate(DateFormat.getDate(data.startDate), DateFormat.getDate(data.endDate)) === 0) || (data.frequency === 'MONTHLY'))) {
      return true;
    } else {
      return false;
    } 

  }

  canCLoseEdit = (data: any, index: number, field: string): boolean => {
    if (!data.paymentClosedFlag) {
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
  onButExitclick() {
    this.dialog.close(null);
  }

  infoLov() {
    const serviceObj = this.ocupayplFactory.
      cgfkPayPlnInformationNumbeRecordGroup(this.payplnHistoryModel.offenderId,this.sessionManager.currentCaseLoad);
    serviceObj.subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.code = data[i].code;
        this.description = data[i].description;
        this.notifctnMaps.set(this.code, this.description);
        this.infoMaps.set(this.description, this.code);

      }
      this.payPlnColumnDef = data;


    });

  }




  isInsertable() {
    if (this.payplnSearchModel.informationNumber || this.payplnSearchModel.groupId || this.payplnSearchModel.startDate ||
      this.payplnSearchModel.endDate || this.payplnSearchModel.monthly || this.payplnSearchModel.amount ||
      this.payplnSearchModel.frequency) {
      this.clearDisabled = false;
    } else {
      this.clearDisabled = true;
    }

  }

  get clearDisabledEvent() {

    if (this.payplnSearchModel.informationNumber || this.payplnSearchModel.groupId || this.payplnSearchModel.startDate ||
      this.payplnSearchModel.endDate || this.payplnSearchModel.monthly || this.payplnSearchModel.amount ||
      this.payplnSearchModel.frequency || this.payplnData.length > 0) {

      return false;
    }

    return true;
  }
  get clearDisabledEventGN() {
    if ((this.disableDistr && this.disableGener) || (!this.disableDistr && this.disableGener)) {
      return true;
    }
    return false;
  }

  get clearDisabledEventDD() {
    if (this.payplnData.length ===  0 ) {
      return true;
    } else if (this.disableDistr && this.disableGener) {
    return true;
    }
  return false;
  }
  clear() {
    this.lpaymentDis = true;
    this.printDis = true;
    this.planHist = true;
    this.clearDisabled = true;
    this.payplnSearchModel.informationNumber = undefined;
    this.payplnSearchModel.groupId = undefined;
    this.payplnSearchModel.startDate = undefined;
    this.payplnSearchModel.endDate = undefined;
    this.payplnSearchModel.monthly = undefined;
    this.payplnSearchModel.amount = undefined;
    this.namesReadOnly = false;
    this.retriveDisabled = false;
    this.payplnData = [];
    this.payplnSearchModel = new OffenderPaymentPlans();
    this.payplnModel = new OffenderPaymentPlans();
    this.payschData = [];
    this.payschModel = new VOffenderPaymentSchedules();
    this.pptxnData = [];
    this.pptxnModel = new PaymentPlanTransactions();

  }

  infoBlur() {

    if (!this.payplnSearchModel.informationNumber) {
      this.payplnSearchModel.informationNumber = this.payplnSearchModel.informationNumber === '' ? undefined : '';
    }


  }

  freqBlur() {
    if (!this.payplnSearchModel.frequency) {
      this.payplnSearchModel.frequency = this.payplnSearchModel.frequency === '' ? undefined : '';
    }

  }
  validateRowData = (event) => {

    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'paymentClosedFlag' && event.data.closedFlag === 'Y') {
      this.planGrid.setColumnData('paymentClosedFlag', rowIndex, event.data.closedFlag);
      rowdata.validated = true;
      return rowdata;
    }
    if (event.field === 'grpId' && event.data.grpId) {

      const offenderPaymentPlan = new OffenderPaymentPlans();
      offenderPaymentPlan.offenderId = this.dialog.data.offenderId;
      offenderPaymentPlan.informationNumber = event.data.grpId;
      offenderPaymentPlan.caseLoadId = this.sessionManager.currentCaseLoad;

      const wffolderRowData = this.ocupayplFactory.gettingGroupId(offenderPaymentPlan);
      wffolderRowData.subscribe(data => {
        if (data) {
          this.planGrid.setColumnData('groupId', rowIndex, data);
          rowdata.validated = true;
          return rowdata;
        }
      });
    }
    if (event.field === 'monthly') {
      if (event.data.monthly < 1 || event.data.monthly > 31) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocupaypl.monthValidn');
        this.show();
        rowdata.validated = true;
         return rowdata;
      }


    }


    if (event.field === 'groupId') {
      event.data.informationNumber = event.data.grpId;
      event.data.offenderId = this.dialog.data.offenderId;
      event.data.parentInfoId = this.dialog.data.informationNumber;
      const wffolderRowData = this.ocupayplFactory.whenValidateItem(event.data);

      wffolderRowData.subscribe(data => {
        if (data) {

          this.payplnModel = data;
        }
        if (this.payplnModel.code) {
         this.planGrid.setColumnData('code', rowIndex, this.payplnModel.code);
          if (this.payplnModel.groupDifference <= 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocupaypl.grpOblig');
            this.show();
            return;
          }

          rowdata.validated = true;
          return rowdata;
        }
      });

    }

    if (event.field === 'startDate' || event.field === 'endDate' || event.field === 'monthly' || event.field === 'frequency') {
      if ((event.data.startDate && event.data.endDate && event.data.monthly) ||
        (event.data.startDate && event.data.endDate && event.data.lumpsum)) {


        event.data.offenderId = this.dialog.data.offenderId;
        event.data.amount = this.dialog.data.maxTotalAmount;
        event.data.groupDifference = this.payplnModel.groupDifference;
        event.data.groupUnpaidAmount = this.payplnModel.groupUnpaidAmount;

        const wffolderRowData = this.ocupayplFactory.whenValidateItem(event.data);

        wffolderRowData.subscribe(data => {
          if (data) {
            
            this.payplnModel = data;
          }
          if (this.payplnModel) {
            
            this.planGrid.setColumnData('amount', rowIndex, Number(this.payplnModel.amount).toFixed(2));

            rowdata.validated = true;
            return rowdata;
          }
        });

      }
    }
    if (event.field === 'paymentClosedFlag') {
      const data = {
        label: this.translateService.translate('ocupaypl.closeSchedule'),
        yesBtn: true, noBtn: true
      };
      this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
        if (result) {
          this.whenCheckboxChanged();

        } else {
          this.payPlnExecuteQuery();
        }
      });
      rowdata.validated = true;
      return rowdata;
    }
    if (event.field === 'endDate') {
      if (event.data.startDate > event.data.endDate) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocupaypl.validEndDate');
        this.show();
        return;
      }
    }
    if (event.field === 'startDate') {
      if (event.data.startDate > event.data.endDate) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocupaypl.validStartDate');
        this.show();
        return;
      }
    }
    if ((event.field === 'startDate' || event.field === 'endDate' || event.field === 'frequency') && (event.data.frequency === 'LUMPSUM')) {
      if (((DateFormat.compareDate(DateFormat.getDate(event.data.endDate), DateFormat.getDate(event.data.startDate)) === 1)) ||
        ((DateFormat.compareDate(DateFormat.getDate(event.data.startDate), DateFormat.getDate(event.data.endDate)) === 1))) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocupaypl.lumpsumDate');
        this.show();
        rowdata.validated = true;
        return rowdata;
      }
    }
    rowdata.validated = true;
    return rowdata;
  }


  printPlanClick() {
    this.payplnModel.caseLoadId = this.sessionManager.currentCaseLoad;
    this.payplnModel.caseloadType = this.sessionManager.currentCaseLoadType;
    this.payplnModel.id = this.sessionManager.getId();

    const printData = this.ocupayplFactory.printPlan(this.payplnModel);
    printData.subscribe(data => {
      if (data && data.report) {
        const base64pdf = 'data:application/pdf;base64,';
        const pdf = base64pdf + data.report;
        const win = window.open(pdf);
        win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
        this.type = 'success';
        this.message = this.translateService.translate('success');
        this.show();
      } else {
        this.type = 'warn';
        this.message = this.translateService.translate('fail');
        this.show();
      }
    });

  }


  distributeClick() {
    this.payplnModel.distribute = 'BUT_RESCH';
    this.generateSceduleClick();
   // this.generateSchedule();
  }

  generateSceduleClick() {
    this.payplnRowData = [];
    this.payplnUpdateRow = [];
    this.payplnRemoveRow = [];
    this.planGrid.addedMap.forEach(
      (v: any, k: number) => {
        this.payplnRowData.push(v);
      }
    );
    this.planGrid.updatedMap.forEach(
      (v: any, k: number) => {
        this.payplnUpdateRow.push(v);
      }
    );
    this.planGrid.removedMap.forEach(
      (v: any, k: number) => {
        this.payplnRemoveRow.push(v);
      }
    );

    for (let i = 0; i < this.payplnRowData.length; i++) {

      if (this.payplnRowData[i].informationNumber) {
        if (this.payplnModel.groupDifference <= 0) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocupaypl.grpOblig');
          this.show();
          return;
        }
      }
      if (!this.payplnRowData[i].informationNumber || !this.payplnRowData[i].groupId) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocupaypl.InfoWarn');
        this.show();
        return;
      }
      if (!this.payplnRowData[i].startDate) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocupaypl.startDate');
        this.show();
        return;
      }
      if (this.payplnRowData[i].monthly < 1 || this.payplnRowData[i].monthly > 31) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocupaypl.monthValidn');
        this.show();
        return;
      }

      if (!this.payplnRowData[i].endDate) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocupaypl.endDate');
        this.show();
        return;
      }
      if (this.payplnRowData[i].endDate) {
        if (this.payplnRowData[i].startDate > this.payplnRowData[i].endDate) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocupaypl.validEndDate');
          this.show();
          return;
        }
      }



      if (this.payplnRowData[i].frequency === 'LUMPSUM') {
          if(DateFormat.compareDate(DateFormat.getDate(this.payplnRowData[i].startDate), DateFormat.getDate(this.payplnRowData[i].endDate)) !== 0){
          this.type = 'warn';
          this.message = this.translateService.translate('ocupaypl.lumpsumDate');
          this.show();
          return;
        }
      }

      if (!this.payplnRowData[i].frequency) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocupaypl.freq');
        this.show();
        return;
      }
      if (!this.payplnRowData[i].monthly) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocupaypl.monthly');
        this.show();
        return;
      }


    }



    this.payplnUpdatetList = [];
    this.payplnInsertList = [];
    this.payplnDeleteList = [];
    this.payplnCommitModel.insertList = [];
    this.payplnCommitModel.updateList = [];
    this.payplnCommitModel.deleteList = [];
    if (this.payplnRowData.length > 0) {
      for (let i = 0; i < this.payplnRowData.length; i++) {
        this.payplnInsertList[i] = this.payplnRowData[i];
      }

    }

    if (this.payplnUpdateRow.length > 0) {
      for (let i = 0; i < this.payplnUpdateRow.length; i++) {
        this.payplnUpdatetList[i] = this.payplnUpdateRow[i];
      }

    }

    if (this.payplnRemoveRow.length > 0) {
      for (let i = 0; i < this.payplnRemoveRow.length; i++) {
        this.payplnDeleteList[i] = this.payplnRemoveRow[i];
      }

    }

    if (this.payplnInsertList.length > 0) {
      for (let i = 0; i < this.payplnInsertList.length; i++) {
        this.payplnModel.informationNumber = this.notifctnMaps.get(this.code);
        this.payplnInsertList[i].informationNumber = this.payplnInsertList[i].grpId;
        this.payplnInsertList[i].offenderId = this.dialog.data.offenderId;
        this.payplnInsertList[i].groupDifference = this.payplnModel.groupDifference;
        this.payplnInsertList[i].groupUnpaidAmount = this.payplnModel.groupUnpaidAmount;

        this.payplnModel.informationNumber = this.dialog.data.informationNumber;

      }

      this.payplnCommitModel.insertList = this.payplnInsertList;

    }
    if (this.payplnUpdatetList.length > 0) {

      for (let i = 0; i < this.payplnUpdatetList.length; i++) {
        this.payplnUpdatetList[i].leniencyFlag = this.payplnUpdatetList[i].leniencyFlag ? 'Y' : 'N';
        this.payplnUpdatetList[i].paymentClosedFlag = this.payplnUpdatetList[i].paymentClosedFlag ? 'Y' : 'N';
        this.payplnUpdatetList[i].regenerationFlag = this.payplnUpdatetList[i].regenerationFlag ? 'Y' : 'N';
        this.payplnUpdatetList[i].paidFlag = this.payplnUpdatetList[i].paidFlag ? 'Y' : 'N';
        if (this.payplnModel.paymentClosedDate != null) {
          this.payplnUpdatetList[i].paymentClosedDate = this.payplnModel.paymentClosedDate;

        }

      }

      this.payplnCommitModel.updateList = this.payplnUpdatetList;

    }
    if (this.payplnDeleteList.length > 0) {

      this.payplnCommitModel.deleteList = this.payplnDeleteList;
    }
    const payplnSaveData = this.ocupayplFactory.payPlnCommit(this.payplnCommitModel);
    payplnSaveData.subscribe(data => {
      if (data[0] && data[0].count >= 1) {
        this.isInsert = false;
        this.payplnModel = data[0];

        this.type = 'success';
        this.message = this.translateService.translate('ocupaypl.success').replace('%count%', data[0].count);
        this.show();
        this.description = undefined;
        this.payPlnExecuteQuery();

        if (this.planGrid.updatedMap.size > 0) {

          this.payplnData.forEach(element => {
            if (element.leniencyFlag) {
              this.payPlnExecuteQuery();
            }

          });
        }
        this.generateSchedule();

      } else if (data[0] && data[0].listSeq === 5) {
        this.type = 'success';
        this.type = 'warn';
        this.message = this.translateService.translate('ocupaypl.masterRecord');
        this.show();
        this.payPlnExecuteQuery();
      } else if (this.payplnModel.distribute === 'BUT_RESCH' || this.payplnModel.distribute === null) {
        this.payPlnExecuteQuery();
      } else {
        this.type = 'warn';
        this.message = this.translateService.translate('ocupaypl.recordFail');
        this.show();
        this.payPlnExecuteQuery();

      }


    });

  }

  generateSchedule() {
    const payplnKeyComit = this.ocupayplFactory.keyCommit(this.payplnModel);
    payplnKeyComit.subscribe(payPlan => {

      if (payPlan.sealFlag === this.checkConstTwo) {
        this.payplnModel.groupDifference = payPlan.groupDifference;
        this.payplnModel.groupUnpaidAmount = payPlan.groupUnpaidAmount;
        this.payplnModel.paymentPlanId = payPlan.paymentPlanId;
        this.payplnModel.informationNumber = payPlan.informationNumber;
        const data = {
          label: this.translateService.translate('ocupaypl.residual'),
          yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
          if (result) {
            this.adjustForRoundoffs();


          } else {
            this.adjustForRoundoffs();
          }
        });
      }

    });


  }

  lastPaymentClick() {

    this.adjustForRoundoffs();

  }


  adjustForRoundoffs() {


    const payShedulesd = this.ocupayplFactory.adjustForRoundoffs(this.payplnModel);
    payShedulesd.subscribe(payShedules => {
      this.payplnModel = payShedules;
      if (payShedules.sealFlag === this.checkConstOne) {
        this.paySchExecuteQuery();
        this.payPlnExecuteQuery();
      }

    });
  }


  whenCheckboxChanged() {

    this.payplnModel.paymentClosedFlag = 'Y';
    const wffolderRowData = this.ocupayplFactory.whenCheckboxChanged(this.payplnModel);
    wffolderRowData.subscribe(data => {
      if (data) {
        this.payplnModel = data;
        this.distributeClick();
        this.payPlnExecuteQuery();
        this.paySchExecuteQuery();

      }


    });
  }

  ocupayplSavepayplnForm(event) {

    this.generateSceduleClick();

  }

  onGridInsert = () => {
    if (this.planGrid.addedMap.size === 0) {
      this.addFlag = false;
    }
    this.payschData = [];
    this.pptxnData = [];
    if (this.planGrid.addedMap.size > 0) {
      this.type = 'warn';
      this.message = this.translateService.translate('ocupaypl.pressGenerate');
      this.show();
      return;
    }

    this.deleData = false;
    return {
      parentInfoId : ''
    };


  }



  ocuPayplValidations() {
    const is = { valid: true };

    if (this.payplnData.length > 0) {
      this.payplnData.forEach(data => {

        if (!data.startDate) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocupaypl.startDate');
          this.show();
          return;
        }


        if (!data.endDate) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocupaypl.endDate');
          this.show();
          return;
        }
        if (data.endDate) {
          if (data.startDate > data.endDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocupaypl.validEndDate');
            this.show();
            return;
          }
        }



        if (data.frequency === 'LUMPSUM') {
          if (data.startDate !== data.endDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocupaypl.lumpsumDate');
            this.show();
            return;
          }
        }

        if (!data.frequency) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocupaypl.freq');
          this.show();
          return;
        }
        if (!data.monthly) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocupaypl.monthly');
          this.show();
          return;
        }

      });
    }

    return is.valid;

  }

  payPlnExecuteQuery(datetwo?, dateone?) {


    if (datetwo) {
      if (datetwo.lastValue === '0_/__/____') {
        this.type = 'warn';
        this.message = this.translateService.translate('common.leapyearnotallowed');
        this.show();
        this.clearDisabled = true;
        return;
      }
      if (String(datetwo.lastValue).indexOf('_') >= 0 && datetwo.value === null) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.datemustbeentervalidformat');
        this.show();

        this.clearDisabled = true;
        return;
      }
    }

    if (dateone) {
      if (dateone.lastValue === '0_/__/____') {
        this.type = 'warn';
        this.message = this.translateService.translate('common.leapyearnotallowed');
        this.show();
        this.clearDisabled = true;
        return;
      }
      if (String(dateone.lastValue).indexOf('_') >= 0 && dateone.value === null) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.datemustbeentervalidformat');
        this.show();

        this.clearDisabled = true;
        return;
      }
    }


    if (this.dialog.data.offenderId) {
      this.payplnSearchModel.offenderId = this.dialog.data.offenderId;
    } else if (this.dialog.data.rootOffenderId) {
      this.payplnSearchModel.offenderId = this.dialog.data.rootOffenderId;
    }
    this.payplnSearchModel.paymentPlanId = this.payplnModel.paymentPlanId;
    this.payplnSearchModel.paymentClosedDate = this.payplnModel.paymentClosedDate;
    const serviceObj = this.ocupayplFactory.
      payPlnExecuteQuery(this.payplnSearchModel);
      if (this.dialog.data.offenderId) {
      this.deleData = true;
      }
      if (this.dialog.data.rootOffenderId) {
        this.deleData = false;
        }
    serviceObj.subscribe(ppplnResultList => {
      if (ppplnResultList.length === 0) {
        this.payplnData = [];
        if ((this.payplnSearchModel.startDate
          || this.payplnSearchModel.informationNumber || this.payplnSearchModel.endDate || this.payplnSearchModel.groupId
          || this.payplnSearchModel.monthly ||  this.payplnSearchModel.amount )) {

          this.type = 'warn';
          this.message = this.translateService.translate('oumwmenu.noRecord');
          this.show();
          this.payplnSearchModel = new OffenderPaymentPlans();
        }
      } else {

        ppplnResultList.forEach(element => {
          this.lpaymentDis = false;
          this.printDis = false;
          this.planHist = false;

          if (element.paymentClosedFlag === 'Y' || element.paidFlag === 'Y') {
            element.sealFlag = this.checkConstA;
          }
          if (!element.paidFlag) {
            element.paidFlag = 'N';
          }
          if (element.paymentClosedFlag === 'N' && element.paidFlag === 'N') {
            element.sealFlag = this.checkConstB;
          }
          element.leniencyFlag = element.leniencyFlag === 'Y' ? true : false;
          element.regenerationFlag = element.regenerationFlag === 'Y' ? true : false;
          if (element.paymentCompletionDate !== null) {
            element.paidFlag = true;
          } else {
            element.paidFlag = false;
          }
          element.paymentClosedFlag = element.paymentClosedFlag === 'Y' ? true : false;
         element.grpId = String(element.informationNumber);
          element.amount = element.amount.toFixed(2);
          if (element.paymentPlanSeq) {
            this.dataFlag = false;
          }

        });
        this.clearDisabled = false;
        this.retriveDisabled = true;
        this.namesReadOnly = true;
        this.payplnData = ppplnResultList;
        this.payplnModel = this.payplnData[0];
        this.payplnIndex = 0;

      }
    });

  }


  onRowClickpaypln(event) {
    if (event) {

      this.payplnModel = event;
      if (this.payplnModel.sealFlag === this.checkConstA) {
        this.disableDistr = true;
        this.disableGener = true;
      } else if (this.payplnModel.sealFlag === this.checkConstB) {
        this.disableGener = true;
        this.disableDistr = false;
      } else {
        this.disableGener = false;
        this.disableDistr = false;
      }
      if (event.paymentClosedFlag === 'Y' || event.paymentClosedFlag === true) {
        this.closeCheck = false;
      } else {
        this.closeCheck = true;
      }

      this.payplnHistoryModel.informationNumber = this.payplnModel.informationNumber;
      this.payschData = [];

      if (this.payplnModel.paymentPlanId) {
        this.paySchExecuteQuery();
      }
    }

  }

  OnGridClearPlan = () => {

    this.description = undefined;
    return true;

  }



  paySchExecuteQuery() {
    this.payschModel.paymentPlanId = this.payplnModel.paymentPlanId;
    const serviceObj = this.ocupayplFactory.
      paySchExecuteQuery(this.payschModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.payschData = [];
      } else {
        data.forEach(element => {
          element.paymentClosedFlag = element.paymentClosedFlag === 'Y' ? true : false;
          element.paymentAmount = Number(element.paymentAmount).toFixed(2);
          element.paidAmount = element.paidAmount.toFixed(2);

        });
        this.payschData = data;
        this.payschModel = this.payschData[0];
        this.postBlockPlan();
        this.payschIndex = 0;

      }


    });
  }

  postBlockPlan() {
    const serviceObj = this.ocupayplFactory.
      postBlockPlan(this.payplnModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.payschData = [];
      } else {
        this.payplnModel = data;
      }
    });

  }

  onRowClickpaysch(event) {

    if (event) {
      this.payschModel = event;
      if (this.payschModel.paymentPlanId) {
        this.pptxnExecuteQuery();
      }
    }
  }

  pptxnExecuteQuery() {
    this.pptxnModel.paymentPlanId = this.payschModel.paymentPlanId;
    this.pptxnModel.paymentPlanSeq = this.payschModel.paymentPlanSeq;
    const effectiveDate = DateFormat.getDate(this.payschModel.paymentDate);
    this.pptxnModel.paymentDate = effectiveDate;
    const pptxnResult = this.ocupayplFactory.
      pptxnExecuteQuery(this.pptxnModel);
    pptxnResult.subscribe(pptxnResultList => {
      if (pptxnResultList.length === 0) {
        this.pptxnData = [];
      } else {
        pptxnResultList.forEach(element => {
          element.transactionAmount = Number(element.transactionAmount).toFixed(2);

        });
        this.pptxnData = pptxnResultList;
        this.pptxnModel = pptxnResultList[0];
        this.pptxnIndex = 0;
      }

    });
  }

  sysPflExecuteQuery() {
    const syspflResult = this.ocupayplFactory.
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
