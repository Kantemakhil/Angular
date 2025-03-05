import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdsdeduService } from '@inmate/trust/deductions/service/otdsdedu.service';
import { SuspendDeductions } from '@inmate/trust/deductions/beans/SuspendDeductions';
import { SuspendDeductionTypes } from '@inmate/trust/deductions/beans/SuspendDeductionTypes';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { SuspendDeductionsCommitBean } from '@inmate/trust/deductions/beans/SuspendDeductionsCommitBean';
import { SuspendDeductionTypesCommitBean } from '@inmate/trust/deductions/beans/SuspendDeductionTypesCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn, GridComponent } from '@ui-components/grid/grid.component';
import { el } from 'date-fns/locale';

@Component({
  selector: 'app-otdsdedu',
  templateUrl: './otdsdedu.component.html'
})

export class OtdsdeduComponent implements OnInit {
  actionName: string;
  @ViewChild('susDedGrid', {static: true}) susDedGrid: any;
  @ViewChild('susDtgrid', {static: true}) susDtgrid: GridComponent;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  susdedData: SuspendDeductions[] = [];
  susdedDataTemp: SuspendDeductions[] = [];
  susdedModel: SuspendDeductions = new SuspendDeductions();
  susdedModelQ: SuspendDeductions = new SuspendDeductions();
  susdedCommitModel: SuspendDeductionsCommitBean = new SuspendDeductionsCommitBean();
  susdedIndex: number;
  susdedInsertList: SuspendDeductions[] = [];
  susdedUpdateList: SuspendDeductions[] = [];
  susdedDeleteList: SuspendDeductions[] = [];
  susdtData: SuspendDeductionTypes[] = [];
  susdtDataTemp: SuspendDeductionTypes[] = [];
  susdtModel: SuspendDeductionTypes = new SuspendDeductionTypes();
  susdtCommitModel: SuspendDeductionTypesCommitBean = new SuspendDeductionTypesCommitBean();
  susdtIndex: number;
  susdtInsertList: SuspendDeductionTypes[] = [];
  susdtUpdateList: SuspendDeductionTypes[] = [];
  susdtDeleteList: SuspendDeductionTypes[] = [];
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: boolean;
  glTxn2ColumnDef: any[];
  offDrColumnDef: any[];
  susDedColumnDef: any[];
  offDedColumnDef: any[];
  omsModulesColumnDef: any[];
  glTxnColumnDef: any[];
  susDtColumnDef: any[];
  offTxnColumnDef: any[];
  offBncColumnDef: any[];
  offDedReadOnly: boolean;
  offBncReadOnly: boolean;
  offDrReadOnly: boolean;
  sysPflReadOnly: boolean;
  offDed1ReadOnly: boolean;
  cg$ctrlReadOnly: boolean;
  omsModulesReadOnly: boolean;
  glTxnReadOnly: boolean;
  glTxn1ReadOnly: boolean;
  glTxn2ReadOnly: boolean;
  glTxn3ReadOnly: boolean;
  offTxnReadOnly: boolean;
  susDedReadOnly: boolean;
  susDtReadOnly: boolean;
  cgfkSusdedcaseloadidRg: any[] = [];
  cgfkSusdtdeductiontypeRg: any[] = [];
  codeTitle = { 'code': this.trMsg('common.caseload'), 'description': this.trMsg('common.description') };
  codeTitleTypes = {
    'code': this.trMsg('otdsdedu.obligation'), 'description': this.trMsg('common.description'),
    'deductionCategory': this.trMsg('otdsdedu.dedtioncat')
  };
  tableIndex = -1;
  susdttableIndex = -1;
  caseloadType: any;
  message = ' Invalid.';
  type = 'error';
  msglist = [];
  retrieveDisabled: boolean;
  clickaccept: boolean;
  constructor(private otdsdeduFactory: OtdsdeduService,
    public translateService: TranslateService,
    private sessionManager: UserSessionManager) {
    this.glTxn2ColumnDef = [];
    this.offDrColumnDef = [];
    this.susDedColumnDef = [];
    this.offDedColumnDef = [];
    this.omsModulesColumnDef = [];
    this.glTxnColumnDef = [];
    this.susDtColumnDef = [];
    this.offTxnColumnDef = [];
    this.offBncColumnDef = [];
  }
  onGridReady(event) {
  }
  ngOnInit() {
    this.retrieveDisabled = false;
    this.caseloadType = this.sessionManager.currentCaseLoadType;
    this.otdsdeduexecuteQuery();
    this.susDedColumnDef = [
      {
        fieldName: this.translateService.translate('otdsdedu.caseload'), field: 'caseloadId', editable: true, datatype: 'lov', required: true,
        link: 'otdsdedu/cgfkSusDedCaseloadIdRecordGroup', titles: this.codeTitle, width: 150, cellEditable: this.canSusDedGridEdit,source:'OUMACASE'
      },
      {
        fieldName: this.translateService.translate('otdsdedu.startdate'), field: 'startDate', editable: true,required: true,
        width: 120, datatype: 'date', cellEditable: this.canSusDedGridEdit 
      },
      {
        fieldName: this.translateService.translate('otdsdedu.enddate'), field: 'endDate', editable: true,required: true,
        datatype: 'date', width: 120, cellEditable: this.canSusDedGridEdit
      },
    ];
    this.susDtColumnDef = [
      {
        fieldName: this.translateService.translate('otdsdedu.obligationsmandatory'), field: 'deductionType', editable: true,
        link: 'otdsdedu/cgfkSusDtDeductionTypeRecordGroup?caseloadType=' + this.caseloadType, datatype: 'lov', width: 150,
        titles: this.codeTitleTypes, cellEditable: this.canSusDtGridEdit,source:'OCMTRANS'
      },
      {
        fieldName: this.translateService.translate('otdsdedu.suspend'), field: 'suspendedFlag', editable: true, width: 150,
        datatype: 'checkbox', cellEditable: this.canSusDtGridEditOne
      },
    ];
  }
  onRowClicksusded(event) {
    if (event && event.suspendDeductionId) {
      this.susdedModel = event;
      this.susdtModel = new SuspendDeductionTypes();
      if (this.susdedModel.suspendDeductionId) {
        this.susdtModel.suspendDeductionId = this.susdedModel.suspendDeductionId;
        this.susdtExecuteQuery();
      }
    } else {
      this.susdedModel = new SuspendDeductions();
      this.susdtData = [];
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
  onRowClicksusdt(event) {
    if (event) {
      this.susdtModel = event;
    }
  }
  ok() {
  }
  no() {
  }
  cancel() {
    this.susdedData = [];
    this.susdedModel = new SuspendDeductions();
    this.susdedModelQ = new SuspendDeductions();
    this.susdtData = [];
    this.susdtModel = new SuspendDeductionTypes();
    this.retrieveDisabled = false;
  }
  onOffenderChange(offender) {
  }
  /**
   *  This function will be executed when commit event is fired
   */
  otdsdeduSavesusdedForm(event) {
    if (!this.validateSusDed(event.added)) {
      return;
    }
    if (!this.validateSusDed(event.updated)) {
      return;
    }
    this.susdedInsertList = event.added;
    this.susdedUpdateList = event.updated;
    this.susdedDeleteList = event.removed;
    this.susdedCommitModel.insertList = [];
    this.susdedCommitModel.updateList = [];
    this.susdedCommitModel.deleteList = [];
    this.susdedCommitModel.insertList = this.susdedInsertList;
    
    this.susdedCommitModel.updateList = this.susdedUpdateList;
    this.susdedCommitModel.deleteList = this.susdedDeleteList;
    const susdedSaveData = this.otdsdeduFactory.susDedCommit(this.susdedCommitModel);
    susdedSaveData.subscribe(data => {
      if (String(data) === '1') {
        this.show('common.addupdateremoverecordsuccess', 'success');
      } else if (String(data).includes('suspend_deductions_pk')) {
        this.show('otdsdedu.rowextalredydedId');
        return;
      } else if (String(data).includes('suspend_deductions_uk')) {
        this.show('otdsdedu.rowexstalrdycaselod');
        return;
      } else if (String(data).includes('suspend_deduction_types_pk')) {
        this.show('otdsdedu.rwexstalrdywithobj');
        return;
      } else {
        this.show('common.addupdateremoverecordfailed');
        return;
      }
      this.susdedModelQ = new SuspendDeductions();
      this.otdsdeduexecuteQuery();
    });
  }
  otdsdeduexecuteQuery(isRetreve?) {
    const serviceObj = this.otdsdeduFactory.susDedExecuteQuery(this.susdedModelQ);
    serviceObj.subscribe(data => {
      if (data.length <= 0) {
        this.susdedData = [];
        if (isRetreve) {
          this.show('common.querycaused');
        }
      } else {
        data.forEach(ele => {
          ele.tStartDate = ele.startDate;
          ele.tEndDate = ele.endDate;
        });
        this.susdedData = data;
        this.tableIndex = 0;
        this.retrieveDisabled = true;
      }
    });
  }
  susdtExecuteQuery() {
    this.susdttableIndex = -1;
    const susdtResult = this.otdsdeduFactory.susDtExecuteQuery(this.susdtModel);
    susdtResult.subscribe(susdtResultList => {
      if (susdtResultList.length === 0) {
        this.susdtData = [];
      } else {
        susdtResultList.forEach(element => {
          element.suspendedFlag = element.suspendedFlag === 'Y' ? 'Y' : null;
        });
        this.susdtData = susdtResultList;
        this.susdtModel = susdtResultList[0];
        this.susdttableIndex = 0;
      }
    });
  }
  /**
   *  This function will be executed when commit event is fired
   */
  otdsdeduSavesusdtForm(event) {
    if (this.clickaccept) {
      this.show('common.fieldisprotectedagainstupdated');
      return;

    }
    if (!this.validateSusDet(this.susdtData)) {
      return false;
    }
    this.susdtInsertList = event.added;
    this.susdtUpdateList = event.updated;
    this.susdtDeleteList = event.removed;
    this.susdtCommitModel.insertList = [];
    this.susdtCommitModel.updateList = [];
    this.susdtCommitModel.deleteList = [];

    this.susdtInsertList.forEach(ele => {
      ele.suspendDeductionId = this.susdedModel.suspendDeductionId;
      ele.suspendedFlag = ele.suspendedFlag ? 'Y' : 'N';
    });

    this.susdtUpdateList.forEach(ele => {
      ele.suspendedFlag = ele.suspendedFlag ? 'Y' : 'N';
    });

    this.susdtCommitModel.insertList = this.susdtInsertList;
    this.susdtCommitModel.updateList = this.susdtUpdateList;
    this.susdtCommitModel.deleteList = this.susdtDeleteList;
    const susdtSaveData = this.otdsdeduFactory.susDtCommit(this.susdtCommitModel);
    susdtSaveData.subscribe(data => {
      if (String(data) === '1') {
        this.show('common.addupdateremoverecordsuccess', 'success');
      } else if (String(data).includes('suspend_deductions_pk')) {
        this.show('otdsdedu.rowextalredydedId');
      } else if (String(data).includes('suspend_deductions_uk')) {
        this.show('otdsdedu.rowexstalrdycaselod');
      } else if (String(data).includes('suspend_deduction_types_pk')) {
        this.show('otdsdedu.rwexstalrdywithobj');
      } else {
        this.show('common.addupdateremoverecordfailed');
      }
      this.susdtExecuteQuery();
    });
  }
  onSubDedDelete = (data) => {
    if (data && data.length > 0) {
      if (!data[0].createDatetime) {
        return true;
      }
      if (data[0].startDate && data[0].endDate) {
        const sysdate = DateFormat.getDate();
        const startDate = DateFormat.getDate(data[0].startDate);
        const endDate = DateFormat.getDate(data[0].endDate);
        if (DateFormat.compareDate(startDate, sysdate) <= 0 && DateFormat.compareDate(endDate, sysdate) >= 0) {
          this.show('otdsdedu.objstrtcntdlt');
        } else {
          return true;
        }
      }
    }
    return false;
  }

  onSubDtDelete = (data) => {
    if (data && data.length > 0) {
      if (this.susdedModel.startDate && this.susdedModel.endDate) {
        const sysdate = DateFormat.getDate();
        const startDate = DateFormat.getDate(this.susdedModel.startDate);
        const endDate = DateFormat.getDate(this.susdedModel.endDate);
        if (DateFormat.compareDate(startDate, sysdate) <= 0 && DateFormat.compareDate(endDate, sysdate) >= 0) {
          this.show('otdsdedu.objstrtbtunsup');
        } else {
          return true;
        }
      }
    }
    return false;
  }
  validateSusDed(data: any[]) {
    const valid = { isValid: true };
    if (data != null && Array.isArray(data)) {
      data.forEach(ele => {
        if (!ele.caseloadId) {
          this.show('otdsdedu.cseldmstbeentr');
          valid.isValid = false;
          return;
        }
        if (!ele.startDate) {
          this.show('otdsdedu.strdtemstentr');
          valid.isValid = false;
          return;
        }
        if (!ele.endDate) {
          this.show('otdsdedu.eddtemstbentr');
          valid.isValid = false;
          return;
        }
        if (DateFormat.compareDate(DateFormat.getDate(ele.startDate), DateFormat.getDate()) < 0) {
          this.show('otdsdedu.stdtmsttdyrftr');
          valid.isValid = false;
          return;
        }
        if (DateFormat.compareDate(DateFormat.getDate(ele.endDate), DateFormat.getDate(ele.startDate)) < 0) {
          this.show('otdsdedu.eddtemstgrtreql');
          valid.isValid = false;
          return;
        }
      });
    }
    return valid.isValid;
  }

  validateSusDet(data: any[]) {
    const valid = { isValid: true };
    if (data != null && Array.isArray(data)) {
      data.forEach(ele => {
        if (!ele.deductionType) {
          this.show('otdsdedu.objmstentr');
          valid.isValid = false;
          return;
        }
      });
    }
    return valid.isValid;
  }

   canSusDedGridEdit = (data: any, index: number, field: string): boolean => {
    if (data.suspendDeductionId) {

      if (DateFormat.compareDate(DateFormat.getDate(data.tStartDate), DateFormat.getDate()) > 0) {
        if (field !== 'caseloadId') {
          return true;
        }
      }
      return true;
    }
    return true;
  } 

  canSusDtGridEdit = (data: any, index: number, field: string): boolean => {
    if (this.susDtAddble) {
      if (field === 'deductionType' && !data.createDatetime) {
        return true;
      }
       if (field === 'suspendedFlag') {
        if ( DateFormat.compareDate(DateFormat.getDate(this.susdedModel.endDate), DateFormat.getDate()) === -1) {
          return true;
        }
      }
    }
    return false;
  }

  canSusDtGridEditOne = (data: any, index: number, field: string): boolean => {
    if (!this.susDtAddble) {
      return true;
    }
    return false;
  }

  chkOverlapDate(pCaseloadId, pStartDate, pEndDate, pFlag, pIndex) {
    this.otdsdeduFactory.chkOverlapDate(pCaseloadId, pStartDate, pEndDate, pFlag)
      .subscribe(overlapCount => {
        if (overlapCount > 0) {
          const ms = this.trMsg('otdsdedu.dteetriovlp').replace('%pCaseloadId%', pCaseloadId);
          this.show(ms);
          if (pFlag === 'S') {
            this.susDedGrid.setColumnData('startDate', pIndex, null);
          } else {
            this.susDedGrid.setColumnData('endDate', pIndex, null);
          }
        }
      });
  }

  susDedRowValidation = (event) => {
    const rowdata = new ValidateRowReturn();
    rowdata.validated = true;
    const index = event.rowIndex;
    if (event.field === 'startDate' && event.newValue) {
      if (event.oldValue && DateFormat.compareDate(DateFormat.getDate(event.newValue), DateFormat.getDate(event.oldValue)) === 0) {
        return rowdata;
      }
      if (event.oldValue && DateFormat.compareDate(DateFormat.getDate(event.data.startDate),
        DateFormat.getDate(event.data.tStartDate)) === 0) {
        return rowdata;
      }
      if (DateFormat.compareDate(DateFormat.getDate(event.newValue), DateFormat.getDate()) < 0) {
        this.show('otdsdedu.stdtmsttdyrftr');
        this.susDedGrid.setColumnData('startDate', index, null);
        return rowdata;
      }
      if (event.data.endDate) {
        if (DateFormat.compareDate(DateFormat.getDate(event.newValue), DateFormat.getDate(event.data.endDate)) > 0) {
         // this.show('otdsdedu.eddtemstgrtreql');
         // this.susDedGrid.setColumnData('startDate', index, null);
          return rowdata;
        }
      }
      const startDate = event.data.startDate ? DateFormat.format(event.data.startDate) : null;
      const endDate = event.data.endDate ? DateFormat.format(event.data.endDate) : null;
      this.chkOverlapDate(event.data.caseloadId, startDate, endDate, 'S', index);
    }
    if (event.field === 'endDate' && event.newValue) {
      if (event.oldValue && DateFormat.compareDate(DateFormat.getDate(event.newValue), DateFormat.getDate(event.oldValue)) === 0) {
        return rowdata;
      }
      if (event.oldValue && DateFormat.compareDate(DateFormat.getDate(event.data.endDate),
        DateFormat.getDate(event.data.tEndDate)) === 0) {
        return rowdata;
      }
      if (event.data.endDate) {
        if (DateFormat.compareDate(DateFormat.getDate(event.data.startDate), DateFormat.getDate(event.data.endDate)) > 0) {
          this.show('otdsdedu.eddtemstgrtreql');
          this.susDedGrid.setColumnData('endDate', index, null);
          return rowdata;
        }
      }
      if (DateFormat.compareDate(DateFormat.getDate(event.newValue), DateFormat.getDate()) < 0) {
        this.show('otdsdedu.eddtemstgrtreql');
        this.susDedGrid.setColumnData('endDate', index, null);
        return rowdata;
      }
      if (event.data.startDate) {
        const startDate = event.data.startDate ? DateFormat.format(event.data.startDate) : null;
        const endDate = event.data.endDate ? DateFormat.format(event.data.endDate) : null;
        this.chkOverlapDate(event.data.caseloadId, startDate, endDate, 'E', index);
      }
    }

    return rowdata;
  }
  susDtRowValidation = (event) => {
    const index = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    const endDate = DateFormat.getDate(this.susdedModel.endDate);
    if (event.field === 'suspendedFlag' && event.oldValue === 'Y') {
      if ( DateFormat.compareDate(endDate, DateFormat.getDate()) === 1) {
        this.clickaccept = false;
        this.susDtgrid.setColumnData('suspendedFlag', index, null);
        rowdata.validated = true;
        return rowdata;
      }else  if ( DateFormat.compareDate(endDate, DateFormat.getDate()) === 0) {
        this.clickaccept = false;
        rowdata.validated = true;
        return rowdata;
      } else {
        this.clickaccept = true;
      this.susDtgrid.setColumnData('suspendedFlag', index, 'Y');
      rowdata.validated = true;
      return rowdata;
      }
    }
      if (event.newValue !== 'Y' || event.newValue === false) {
      if ( DateFormat.compareDate(endDate, DateFormat.getDate()) === -1) {
        this.clickaccept = true;
        this.susDtgrid.setColumnData('suspendedFlag', index, null);
        rowdata.validated = true;
        return rowdata;

      }else if ( DateFormat.compareDate(endDate, DateFormat.getDate()) === 0) {
        this.clickaccept = false;
        rowdata.validated = true;
        return rowdata;
      }
    }

    rowdata.validated = true;
    return rowdata;
  }

  get susDedDeletable() {
    if (this.susdtData.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  get susDtAddble() {
    if (this.susdedModel.startDate && this.susdedModel.endDate && this.susdedModel.suspendDeductionId) {
      const startDate = DateFormat.getDate(this.susdedModel.startDate);
      const endDate = DateFormat.getDate(this.susdedModel.endDate);
      const sysDate = DateFormat.getDate();
      if ((DateFormat.compareDate(endDate, sysDate) === 1)) {
        return true;
      } else if ((DateFormat.compareDate(endDate, sysDate) === 0)) {
        return true;
      }
    }
    return false;
  }

  onSusDtInsert = () => {
    if (!this.validateSusDet(this.susdtData)) {
      return null;
    }
    const data = {
      'suspendedFlag': 'Y',
      'startDate': this.susdedModel.startDate,
      'caseloadId': this.susdedModel.caseloadId,
    };
    return data;
  }

  onSusDedInsert = () => {
    if (this.susDedGrid) {
      const added = [];
      this.susDedGrid.addedMap.forEach((value) => { added.push(value); });
      const updated = [];
      this.susDedGrid.updatedMap.forEach((value) => { updated.push(value); });

      if (added.length > 0) {
        if (!this.validateSusDed(added)) {
          return null;
        }

      }
      if (updated.length > 0) {
        if (!this.validateSusDed(updated)) {
          return null;
        }
      }
    }
    const data = { 'caseloadId': '', 'startData': null, 'endDate': null };
    return data;
  }

  get clearDisabled(): boolean {
    if (this.susdedModelQ.caseloadId || this.susdedModelQ.startDate || this.susdedModelQ.endDate || this.susdedData.length > 0) {
      return false;
    }
    return true;
  }

  caseloadBlur() {
    if (!this.susdedModelQ.caseloadId) {
      this.susdedModelQ.caseloadId = this.susdedModelQ.caseloadId === undefined ? '' : undefined;
    }
  }
  startDateBlur() {
    if (!this.susdedModelQ.startDate) {
      this.susdedModelQ.startDate = this.susdedModelQ.startDate === null ? undefined : null;
    }
  }
  endDateBlur() {
    if (!this.susdedModelQ.endDate) {
      this.susdedModelQ.endDate = this.susdedModelQ.endDate === null ? undefined : null;
    }
  }


}
