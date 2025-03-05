import {
  Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdoalloService } from '../service/otdoallo.service';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OffenderDeductions } from '@inmate/trust/trustaccounts/beans/OffenderDeductions';
import { OffenderDeductionReceipts } from '@inmate/trust/deductions/beans/OffenderDeductionReceipts';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OffenderDeductionReceiptsCommitBean } from '@inmate/trust/deductions/beans/OffenderDeductionReceiptsCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderDeductionsCommitBean } from '@inmate/trust/deductions/beans/OffenderDeductionsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { LovService } from '@ui-components/lov/lov.service';

@Component({
  selector: 'app-otdoallo',
  templateUrl: './otdoallo.component.html'
})

export class OtdoalloComponent implements OnInit {
  isEmpty: boolean;
  offdedCommitModel: OffenderDeductionsCommitBean = new OffenderDeductionsCommitBean();
  @ViewChild('grid', {static: true}) grid: any;
  @ViewChild( 'gridDed', {static: true} )gridDed: any;
  offdrCommitModel: OffenderDeductionReceiptsCommitBean = new OffenderDeductionReceiptsCommitBean();
  offdedTotRows: any;
  deleteAllow: boolean;
  updateAllow: boolean;
  insetAllow: boolean;
  type = 'error';
  msglist = [];
  message = ' Invalid.';
  msgs: any[] = [];
  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  actionName: string;
  lovModel: any[];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  offdedData: OffenderDeductions[] = [];
  offdedDataTemp: OffenderDeductions[] = [];
  selAllowRow: OffenderDeductions = new OffenderDeductions();
  offdedModel: OffenderDeductions = new OffenderDeductions();
  offdedIndex = -1;
  offdedInsertList: OffenderDeductions[] = [];
  offdedUpdatetList: OffenderDeductions[] = [];
  offdedDeleteList: OffenderDeductions[] = [];
  offdrData: OffenderDeductionReceipts[] = [];
  offdrDataTemp: OffenderDeductionReceipts[] = [];
  chidSelect: OffenderDeductionReceipts = new OffenderDeductionReceipts();
  offdrModel: OffenderDeductionReceipts = new OffenderDeductionReceipts();
  offdrIndex = -1;
  offdrInsertList: OffenderDeductionReceipts[] = [];
  offdrUpdatetList: OffenderDeductionReceipts[] = [];
  offdrDeleteList: OffenderDeductionReceipts[] = [];
  syspflData: SystemProfiles[] = [];
  syspflDataTemp: SystemProfiles[] = [];
  syspflModel: SystemProfiles = new SystemProfiles();
  syspflIndex = -1;
  syspflInsertList: SystemProfiles[] = [];
  syspflUpdatetList: SystemProfiles[] = [];
  syspflDeleteList: SystemProfiles[] = [];
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  cmAcCodeColumnDef: any[];
  reconTxnColumnDef: any[];
  benTxnColumnDef: any[];
  offDedColumnDef: any[];
  reconsBlockColumnDef: any[];
  csldAlColumnDef: any[];
  bcrTmpColumnDef: any[];
  offOblHtyColumnDef: any[];
  securityThreatGroupsColumnDef: any[];
  bankRcColumnDef: any[];
  offTracColumnDef: any[];
  livUnitColumnDef: any[];
  glTxn1ColumnDef: any[];
  offDrColumnDef: any[];
  perColumnDef: any[];
  offBncColumnDef: any[];
  vCorpColumnDef: any[];
  vBcBenColumnDef: any[];
  vOffBkgColumnDef: any[];
  cgfkOffdeddeductionstatusRg: any[] = [];
  cgfkOffdrreceipttxntypeRg: any[] = [];
  cgfkOffdeddeductiontypeRg: any[] = [];
  allowDedInsert:boolean;
  constructor(private otdoalloFactory: OtdoalloService, private sessionManager: UserSessionManager,
    public translateService: TranslateService, public dialogService: DialogService, private offenderSearchService: OffenderSearchService,
    private lovService: LovService) {
      this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    }
  ngOnInit() {
    const deductionStatusTitle = { code: this.trMsg('common.status'), description: this.trMsg('common.description') };
    const allocProcCodeTitle = {code : this.trMsg('common.code'), description: this.trMsg('common.description')};
    const deductionTypeLink = `otdoallo/cgfkOffDedDeductionTypeRecordGroup?caseLoadId=${this.sessionManager.currentCaseLoad}`;
    this.lovService.clear(deductionTypeLink);
    this.offDedColumnDef = [
      {
        fieldName: this.trMsg('common.code', '*'), field: 'deductionType', editable: true, width: 150, cellEditable: this.offDedEditable,
        datatype: 'lov', link: deductionTypeLink,source:'OCMDEDUT',
        titles: allocProcCodeTitle
      },
      { fieldName: this.trMsg('otdoallo.clcon'), field: 'modifyUserId', editable: false, width: 150 },
      { fieldName: this.trMsg('otdoallo.exp'), field: 'processPriorityNumber', editable: false, width: 150 },
      { fieldName: this.trMsg('otdoallo.inp'), field: 'processPriorityNumb', editable: false, width: 150 },
      { fieldName: this.trMsg('otdoallo.oap', '*'), field: 'deductionPriority', cellEditable: this.offDedEditable,
       editable: false, width: 150, datatype: 'number', maxValue: 99, minValue: -99},
      {
        fieldName: this.trMsg('common.status', '*'), field: 'deductionStatus', editable: true, width: 150,
        datatype: 'lov', domain: 'DED_STATUS', titles: deductionStatusTitle
      },
      {
        fieldName: this.trMsg('otdoallo.monmax'), field: 'maxMonthlyAmount', editable: true, width: 150,
        datatype: 'number', format: '1.2-2', maxValue: 999999999.99,
        strictFP: true,
      },
      {
        fieldName: this.trMsg('otdoallo.totmax'), field: 'maxTotalAmount', editable: true, width: 150,
        datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true,
      },
      { fieldName: this.trMsg('otdoallo.ul'), field: 'nbtfifoFlag', editable: false, width: 150, datatype: 'checkbox' },
    ];

    this.offDrColumnDef = [
      {
        fieldName: this.trMsg('otdoallo.allconrecptype', '*'), field: 'receiptTxnType', width: 150,
        datatype: 'lov', link: 'otdoallo/cgfkOffDrReceiptTxnTypeRecordGroup',source:'OCMTRANS',
        titles: { code: this.trMsg('otdoallo.allconrecptype'), description: this.trMsg('common.description') },
        cellEditable: this.offDrEditable
      },
      { fieldName: this.trMsg('otdoallo.percentage'), field: 'receiptPercentage', editable: true, width: 150,
        'maxValue': 999, datatype: 'number', whole: true },
      {
        fieldName: this.trMsg('otdoallo.fltrage'), field: 'flatRate', editable: true, width: 150,
        datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true,
      },
    ];

    if (!this.vHeaderBlockModel) {
      this.show('common.pleasesearchforvalidoffender');
    }
  }
  onRowClickoffded(event) {
    if (event) {
      this.offdrData = [];
      const index = this.offdedData.indexOf(event);
      this.selAllowRow = event;
      this.offdedModel = event;
      this.offDrKeyDelrec(index);
      this.offdrExecuteQuery();
    } else {
      this.selAllowRow = new OffenderDeductions();
      this.offdedModel = new OffenderDeductions();
      this.offdrData = [];
    }
  }
  onRowClickoffdr(event) {
    if (event) {
      if (event.empty) {
        this.insertOnNotAvaliable();
        return;
      }
      this.offdrModel = event;
      this.chidSelect = event;
    } else {
      this.offdrModel = new OffenderDeductionReceipts();
      this.chidSelect = new OffenderDeductionReceipts();
    }
  }

  offDrKeyDelrec(index)  {
    this.offdedData[index]['isTransStart'] = true;
    this.offdedModel = this.offdedData[index];
    const offDrKeyDelrec = this.otdoalloFactory.offDrKeyDelrec(this.sessionManager.currentCaseLoad, this.vHeaderBlockModel.rootOffenderId,
    this.offdedModel.deductionType);
    offDrKeyDelrec.subscribe(ele => {
      if (ele) {
        if (ele.length > 0) {
          this.offdedData[index]['isTransStart'] = true;
          this.offdedModel = this.offdedData[index];
        } else {
          this.offdedData[index]['isTransStart'] = false;
          this.offdedModel = this.offdedData[index];
        }
      }
    });
  }

  offDrEditable = (data: any, index: number, field: string, originalIndex: number): boolean => {
    if (!data.createUserId) {
      return true;
    } else {
      return false;
    }
  }

  offDedEditable = (data: any, index: number, field: string, originalIndex: number): boolean => {
    const fields = ['deductionPriority', 'deductionType'];
    if (fields.includes(field) && data.offenderDeductionId) {
      return false;
    } else {
      return true;
    }
  }
  allowNumbers(event) {
  }
  ok() {
  }
  no() {
  }
  cancel() {
  }
  onOffenderChange(offender) {
    this.offdedData = [];
    this.offdrData = [];
    if (offender && offender.rootOffenderId && offender.trustAccount === true && offender.inOutStatus === "IN") {
      this.offdedData = [];
      this.offdrData = [];
      this.vHeaderBlockModel = offender;
      this.offdedExecuteQuery();
      this.insetAllow = true;
      this.updateAllow = true;
      this.deleteAllow = true;
      this.allowDedInsert = true;
    } else {
      this.offdedModel = new OffenderDeductions();
      this.offdrModel = new OffenderDeductionReceipts();
      this.offdedData = [];
      this.offdrData = [];
      this.insetAllow = false;
      this.updateAllow = false;
      this.deleteAllow = false;
      this.allowDedInsert = false;
    }  
  }

  /**
   *  This function will be executed when commit event is
  * fired
  */
  otdoalloSaveoffdedForm(event) {
    this.offdedInsertList = event.added;
    this.offdedUpdatetList = event.updated;
    this.offdedDeleteList = event.removed;
    this.offdedCommitModel.insertList = [];
    this.offdedCommitModel.updateList = [];
    this.offdedCommitModel.deleteList = [];
    const rowData = this.offdedData;
    for (const element of  rowData) {
      if (!element.deductionType) {
        this.show('otdoallo.alloctypemstbenter');
        return;
      }
      if (!element.maxMonthlyAmount && !element.maxTotalAmount && !element.fifoFlag) {
        this.show('otdoallo.amonthmaxorttmstbeenter');
        return;
      } else if (this.isNull(element.deductionPriority)) {
        this.show('otdoallo.oapmstbentr');
        return;
      } else if (!(Number(element.deductionPriority) >= -99 && Number(element.deductionPriority) <= 99)) {
        this.show('otdoallo.oaprange');
        return;
      } else if (!element.deductionStatus) {
        this.show('otdoallo.smstbentr');
        return;
      } else if (element.maxMonthlyAmount && element.maxTotalAmount) {
        this.show('otdoallo.amonthortotnotboth');
        return;
      }

      const repeat = rowData.filter(dup => dup.deductionType === element.deductionType &&
         Number(element.deductionPriority)  === Number(dup.deductionPriority));
      if (repeat && repeat.length > 1) {
        this.show('otdoallo.rowwthsamecasepoap');
        return;
      }
      if (element.fifoFlag && String(element.fifoFlag) === 'true' ) {
        element.fifoFlag = 'Y';
      } else {
        element.fifoFlag = 'N';
      }
    }

    if (this.offdedInsertList.length > 0 || this.offdedUpdatetList.length > 0) {
      for (let i = 0; i < this.offdedInsertList.length; i++) {
        if (!this.offdedInsertList[i].deductionType ) {
          return;
        }
        if (!this.offdedInsertList[i].deductionPriority ) {
          return;
        }
        if (!this.offdedInsertList[i].deductionStatus) {
          return;
        }
      }

      this.offdedCommitModel.insertList = this.offdedInsertList;
      this.offdedCommitModel.updateList = this.offdedUpdatetList;
    }
    if (this.offdedDeleteList.length > 0) {
          this.offdedCommitModel.deleteList = this.offdedDeleteList;
    }
    const offdedSaveData = this.otdoalloFactory.offDedCommit(this.offdedCommitModel);
    offdedSaveData.subscribe(data => {
      if (String(data) === '1') {
        this.offdedData = data;
        this.offdedExecuteQuery();
        this.show('common.addupdateremoverecordsuccess', 'success');
      } else if (String(data) === '2661') {
        const message = this.trMsg('otdoallo.allocprophsntext').replace('%deductionType%', this.offdedModel.deductionType);
        this.show(message);
      } else {
        this.show('common.addupdateremoverecordfailed', 'error');
      }
    });
  }

  // execute query
  offdedExecuteQuery() {
    this.offdedModel.caseloadId = this.sessionManager.currentCaseLoad;
    this.offdedModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
    if ( this.offdedModel.caseloadId  && this.offdedModel.offenderId ) {
      const serviceObj = this.otdoalloFactory.offDedExecuteQuery(this.offdedModel);
      serviceObj.subscribe(data => {
        if (data.length === 0) {
          this.offdedData = [];
          this.offdedIndex = -1;
        } else {
          data.forEach (ele  => {
            const totalMax = ele.maxTotalAmount;
            const monthMax = ele.maxMonthlyAmount;
        if ((!this.isNull(monthMax) !== !this.isNull(totalMax))) {
          ele.nbtfifoFlag = false;
        } else  {
          ele.nbtfifoFlag = true;
        }
          });
          this.offdedModel = this.offdedData[0];
          this.offdedData = data;
          this.offdedIndex = 0;
          this.offdedTotRows = data.length;
        }
      });
    } else {
      this.offdedData = [];
      this.offdedIndex = -1;
    }
  }

  offdrExecuteQuery() {
    if (this.offdedModel.offenderDeductionId) {
      this.offdrModel.offenderDeductionId = this.offdedModel.offenderDeductionId;
      const offdrResult = this.otdoalloFactory.offDrExecuteQuery(this.offdrModel);
      offdrResult.subscribe(offdrResultList => {
        if (offdrResultList.length === 0) {
          this.isEmpty = true;
          // const empty = {'empty': true};
          // const listRec = [];
          // listRec.push(empty);
          this.offdrData = [];
          this.offdrIndex = -1;
        } else {
          this.isEmpty = false;
          offdrResultList.forEach(ele => {
            ele.isRemovable = this.offdedModel['isTransStart'];
          });
          this.offdrData = offdrResultList;
          this.offdrModel = offdrResultList[0];
          this.offdrIndex = 0;
        }
        this.cntDedRcpt(this.offdedModel);
      });
    } else {
      this.offdrData = [];
      this.offdrIndex = -1;
    }
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  otdoalloSaveoffdrForm(event) {
    this.offdrInsertList = event.added;
    this.offdrUpdatetList = event.updated;
    this.offdrDeleteList = event.removed;
    this.offdrCommitModel.insertList = [];
    this.offdrCommitModel.updateList = [];
    this.offdrCommitModel.deleteList = [];
    for (const ele of  this.offdrData) {
      if (!ele.receiptTxnType) {
        this.show('otdoallo.receptmstbentr');
        return;
      }
      if (this.isNull(ele.receiptPercentage) && this.isNull(ele.flatRate)) {
        this.show('otdoallo.prcnfltrate');
        return;
      }
      if (!this.isNull(ele.receiptPercentage) && !this.isNull(ele.flatRate)) {
        this.show('common.eitherperorreatenotbotha');
        return;
      }
      if (!this.isNull(ele.receiptPercentage) &&
        !(Number(ele.receiptPercentage) >= 0 &&  Number(ele.receiptPercentage) <= 100)) {
        this.show('otdoallo.mstinrng');
        return;
      }
      if (this.offdrData.length > 0) {
        const updCount = { repeat: 0, invalid: false };
        this.offdrData.forEach(element => {
            if (ele.receiptTxnType === element.receiptTxnType) {
                updCount.repeat++;
            }
            if (updCount.repeat > 1) {
                updCount.invalid = true;
                return;
            }
        });
        if (updCount.invalid) {
               const message = 'Receipt type ' + ele.receiptTxnType + ' already exist for '
               + this.offdedModel.deductionType + ' on ' + this.sessionManager.currentCaseLoad;
               this.show(message);
                return;
              }
        }
      }
    if (this.offdrInsertList.length > 0 || this.offdrUpdatetList.length > 0) {
      for (let i = 0; i < this.offdrInsertList.length; i++) {
        if ( !this.offdrInsertList[i].receiptTxnType ) {
          this.show('otdoallo.receptmstbentr');
          return;
        }
        if ( !this.offdrInsertList[i].offenderDeductionId ) {
          this.offdrInsertList[i].offenderDeductionId = this.offdedModel.offenderDeductionId;
        }
      }
      this.offdrCommitModel.insertList = this.offdrInsertList;
      this.offdrCommitModel.updateList = this.offdrUpdatetList;
    }
    if (this.offdrDeleteList.length > 0) {
       this.offdrCommitModel.deleteList = this.offdrDeleteList;
    }
    const offdrSaveData = this.otdoalloFactory.offDrCommit(this.offdrCommitModel);
    offdrSaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.offdrData = data;
        this.offdrExecuteQuery();
      }  else {
        this.show('common.addupdateremoverecordfailed', 'error');
      }
    });
  }


  validateOffDrRowChange = (event) => {
    const rowdata = new ValidateRowReturn();
    const index = event.rowIndex;
    if (event.field === 'receiptTxnType' && event.newValue !== event.oldValue && event.data.receiptTxnType ) {
      for (let i = 0; i < this.offdrData.length; i++) {
        if (this.offdrData[i].receiptTxnType === event.data.receiptTxnType && index !== i ) {
          const message = this.trMsg('otdoallo.rcptalrdexst')
          .replace('%receiptTxnType%', event.data.receiptTxnType).replace('%deductionType%', this.offdedModel.deductionType)
          .replace('%caseLoad%', this.sessionManager.currentCaseLoad);
          this.show(message);
          rowdata.validated = true;
          return rowdata;
        }
      }
      event.data.caseloadId = this.sessionManager.currentCaseLoad;
      event.data.deductionType = this.offdedModel.deductionType;
      const offDrValidateResult = this.otdoalloFactory.offDrValidateRecieptTxnType(event.data);
      offDrValidateResult.subscribe(offDrValidate => {
        if (!offDrValidate) {
          rowdata.validated = true;
        } else {
          rowdata.validated = true;
            this.grid.setColumnData('receiptPercentage', index, offDrValidate.receiptPercentage);
            this.grid.setColumnData('flatRate', index, offDrValidate.flatRate);
        }
        return rowdata;
      });
    } else {
      rowdata.validated = true;
      return rowdata;
    }
    rowdata.validated = true;
    return rowdata;
  }

  onOffDrInsert = () => {
    for (const element of this.offdrData) {
      if (!element.receiptTxnType) {
        this.show('otdoallo.receptmstbentr');
        return;
      }
      if (this.isNull(element.receiptPercentage) && this.isNull(element.flatRate)) {
        this.show('otdoallo.prcnfltrate');
        return;
      }
      if (!this.isNull(element.receiptPercentage) && !this.isNull(element.flatRate)) {
        this.show('common.eitherperorreatenotbotha');
        return;
      }
      if (element.receiptPercentage &&
        !(element.receiptPercentage >= 0 &&  element.receiptPercentage <= 100)) {
        this.show('otdoallo.mstinrng');
        return;
      }
      }
      return {};
  }

  onOffDedInsert = () => {
    for (let i = 0; i < this.offdedData.length; i++) {
      if (!this.offdedData[i].deductionType) {
        this.show('otdoallo.alloctypemstbenter');
        return;
      }
      if (!this.offdedData[i].maxMonthlyAmount && !this.offdedData[i].maxTotalAmount && !this.offdedData[i].fifoFlag) {
        this.show('otdoallo.amonthmaxorttmstbeenter');
        return;
      } else if (this.offdedData[i].maxMonthlyAmount && this.offdedData[i].maxTotalAmount) {
        this.show('otdoallo.amonthortotnotboth');
        return;
      }
    }
    return { nbtfifoFlag: true, fifoFlag: true , caseloadId: this.sessionManager.currentCaseLoad,
    offenderId: this.vHeaderBlockModel.rootOffenderId, modifyDate: DateFormat.getDate(),
    effectiveDate: DateFormat.getDate(), collectAgencyFlag: 'N', deductionAmount: 0 };
  }

  validateOffDedRowChange = (event) => {
    const rowdata = new ValidateRowReturn();
    const index = event.rowIndex;
    if ( event.field === 'deductionType' && event.newValue !== event.oldValue && event.data.deductionType ) {
      const offDedValidateResult = this.otdoalloFactory.offDedValidateDeductionType(event.data);
      offDedValidateResult.subscribe(offDedValidate => {
        if (!offDedValidate) {
          rowdata.validated = true;
        } else {
          rowdata.validated = true;
            this.gridDed.setColumnData('maxTotalAmount', index, offDedValidate.maxTotalAmount);
            this.gridDed.setColumnData('maxMonthlyAmount', index, offDedValidate.maxMonthlyAmount);
            this.gridDed.setColumnData('processPriorityNumber', index, offDedValidate.processPriorityNumber);
            this.gridDed.setColumnData('processPriorityNumb', index, offDedValidate.processPriorityNumb);
            this.gridDed.setColumnData('modifyUserId', index, offDedValidate.modifyUserId);
            this.gridDed.setColumnData('deductionStatus', index, 'A');
            this.gridDed.setColumnData('deductionPriority', index, 1);
        }
        return rowdata;
      });
    }
    if(event.field ==='maxMonthlyAmount'){
      if(event.data.maxMonthlyAmount && event.data.maxTotalAmount){
        this.show('otdoallo.amonthortotnotboth');
        this.gridDed.setColumnData('maxMonthlyAmount', index,undefined);
      }
    }
    if(event.field ==='maxTotalAmount'){
      if(event.data.maxMonthlyAmount && event.data.maxTotalAmount){
        this.show('otdoallo.amonthortotnotboth');
        this.gridDed.setColumnData('maxTotalAmount', index,undefined);
      }
    }
  
    if ( event.field === 'maxMonthlyAmount' && event.newValue !== event.oldValue && !this.isNull(event.data.maxMonthlyAmount)) {
      rowdata.validated = true;
      rowdata.data = { nbtfifoFlag: false};
      return rowdata;
    }
    if ( event.field === 'maxTotalAmount' && event.newValue !== event.oldValue && !this.isNull(event.data.maxTotalAmount)) {
      rowdata.validated = true;
      rowdata.data = { nbtfifoFlag: false};
      return rowdata;
    }
    if ( this.isNull(event.data.maxTotalAmount) && this.isNull(event.data.maxMonthlyAmount)) {
      rowdata.validated = true;
      rowdata.data = { nbtfifoFlag: true};
      return rowdata;
    }
    rowdata.validated = true;
    return rowdata;
  }

  cntDedRcpt(data) {
    const index = this.offdedData.indexOf(data);
    this.offdedData[index]['isRemovable'] = true;
    if (data && String(index)) {
    this.otdoalloFactory.cntDedRcpt(data.offenderDeductionId).subscribe(element => {
      if (element > 0) {
        this.offdedData[index]['isRemovable'] = false;
      } else {
        this.offdedData[index]['isRemovable'] = true;
      }
  });
}
  }

  offDedDelete = (data) => {

    if (data[0].isTransStart) {
      this.show(this.trMsg('otdoallo.dontallwdelte').replace('%deductionType%', this.offdedModel.deductionType));
      return false;
    }

    if (data && data.length > 0 && !data[0].isRemovable) {
      this.show('otdoallo.cntdltrerd');
      return false;
    } else {
      return true;
    }
  }

  offDrDelete = (data) => {
    if (this.offdedModel['isTransStart']) {
      this.show(this.trMsg('otdoallo.dontallwdelte').replace('%deductionType%', this.offdedModel.deductionType));
      return false;
    }
    return true;
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
  isNull = (value) => {
   return !(!!value || String(value) === '0');
  }
 /*  get allowDedInsert(): boolean {
    if (this.vHeaderBlockModel && this.vHeaderBlockModel.rootOffenderId && this.vHeaderBlockModel.trustAccount === true ) {
      return true;
    }
    else {
      return false;
    }
  } */
  get allowDerInsert(): boolean {
    if ( this.offdedData.length == 0) {
      return false;
    }
    if(!this.offdedData[0].createDateTime){
      return false;
    }
    if (this.offdedModel && this.offdedModel.offenderDeductionId && this.offdedData.length > 0) {
      return true;
    } 
    else {
      return false;
    }
  }

  insertOnNotAvaliable() {
    this.otdoalloFactory.insertOnNotAvaliable(this.offdedModel).subscribe(data => {
      if (String(data) === '1') {
        this.offdrExecuteQuery();
      }
    });
  }
}

