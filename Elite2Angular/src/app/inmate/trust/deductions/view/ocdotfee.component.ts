import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdotfeeService } from '../service/ocdotfee.service';
import { OffenderDeductions } from '@inmate/trust/trustaccounts/beans/OffenderDeductions';
import { OffenderDeductionReceipts } from '@inmate/trust/deductions/beans/OffenderDeductionReceipts';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderDeductionsCommitBean } from '@inmate/trust/deductions/beans/OffenderDeductionsCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OffenderDeductionReceiptsCommitBean } from '@inmate/trust/deductions/beans/OffenderDeductionReceiptsCommitBean';
import { GridComponent, ValidateRowReturn } from '@ui-components/grid/grid.component';
import { LovService } from '@ui-components/lov/lov.service';

@Component({
      selector: 'app-ocdotfee',
      templateUrl: './ocdotfee.component.html',
      styleUrls: []
})

export class OcdotfeeComponent implements OnInit {
      @ViewChild('offDrGrid', {static: true}) offDrGrid: GridComponent;
      user: string;
      caseloadId: string;
      msgs: any[] = [];
      offdedData: OffenderDeductions[] = [];
      offdedModel: OffenderDeductions = new OffenderDeductions();
      offdedInsertList: OffenderDeductions[] = [];
      offdedUpdatetList: OffenderDeductions[] = [];
      offdedDeleteList: OffenderDeductions[] = [];
      offdrData: OffenderDeductionReceipts[] = [];
      offdedCommitModel: OffenderDeductionsCommitBean = new OffenderDeductionsCommitBean();
      offdrModel: OffenderDeductionReceipts = new OffenderDeductionReceipts();
      offdrInsertList: OffenderDeductionReceipts[] = [];
      offdrUpdatetList: OffenderDeductionReceipts[] = [];
      offdrDeleteList: OffenderDeductionReceipts[] = [];
      offdrCommitModel: OffenderDeductionReceiptsCommitBean = new OffenderDeductionReceiptsCommitBean();
      offDrColumnDef: any[];
      offDedColumnDef: any[];
      offDedSelect = -1;
      offDrSelect = -1;
      vHeaderBlockModel: VTrustHeader = new VTrustHeader();
      lovServiceData: any;
      constructor(private ocdotfeeFactory: OcdotfeeService, private offenderSearchService: OffenderSearchService,
            public translateService: TranslateService, public sessionManager: UserSessionManager,
            private lovService: LovService) {
            this.offDrColumnDef = [];
            this.offDedColumnDef = [];
      }
      ngOnInit() {
            this.caseloadId = this.sessionManager.currentCaseLoad;
            this.user = this.sessionManager.getId();
            this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
            const offDrTitle = { code: this.trMsg('ocdotfee.dedondistype'), description: this.trMsg('common.description') };
            this.offDrColumnDef = [
                  {
                        fieldName: this.trMsg('ocdotfee.dedondistype', '*'), field: 'receiptTxnType', editable: true, width: 150,
                        datatype: 'lov', link: 'ocdotfee/cgfkOffDrReceiptTxnTypeRecordGroup', cellEditable: this.offDrEditable,source:'OCMDEDUT'
                  },
                  {
                        fieldName: this.trMsg('ocdotfee.percentage'), field: 'receiptPercentage', editable: true, width: 150,
                        datatype: 'number', maxValue: 100, whole: true
                  },
                  {
                        fieldName: this.trMsg('ocdotfee.flatfee'), field: 'flatRate', editable: true, datatype: 'number',
                         maxValue: 999999999.99, strictFP: true, whole: true
                  },
            ];
            const offDedTitle = { code: this.trMsg('common.type'), description: this.trMsg('common.description') };
            this.offDedColumnDef = [
                  {
                        fieldName: this.trMsg('common.type', '*'), field: 'deductionType', editable: true, width: 150, datatype: 'lov',
                        link: 'ocdotfee/cgfkOffDedDeductionTypeRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad,
                        titles: offDedTitle, cellEditable: this.offDedEditable,source:'OCMDEDUT'
                  },
                  {
                        fieldName: this.trMsg('common.status', '*'), field: 'deductionStatus', editable: true, width: 150, datatype: 'lov',
                        domain:'DED_STATUS'/*link: 'ocdotfee/cgfkOffDedDspDescriptionRecordGroup'*/
                  },
            ];
            if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
                  this.show(this.translateService.translate('common.pleasesearchforvalidoffender'));
                  return;
            }
      }
      show(vldmsg, type?) {
            type = type ? type : 'warn';
            vldmsg = this.translateService.translate(vldmsg);
            const msgval = [{ message: vldmsg, type: type }];
            this.msgs = [...msgval];
      }
      trMsg(msg, astr?) {
            return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
      }
      onRowClickoffded(event) {
            if (event) {
                  this.offdedModel = event;
                  this.ocdotfeePopulateDetails();
            } else {
                  this.offdedModel = new OffenderDeductions();
                  this.offdrData = [];
            }
      }
      onRowClickoffdr(event) {
            if (event) {
                  this.offdrModel = event;
            } else {
                  this.offdrModel = new OffenderDeductionReceipts();
            }
      }
      ok() {
      }
      no() {
      }
      onOffenderChange(offender) {
            if (offender) {
                  this.vHeaderBlockModel = offender;
                  this.ocdotfeeexecuteQuery();

            } else {
                  this.offdedModel=new OffenderDeductions();
                  this.offdedData = [];
                  this.offdrData = [];
            }
      }
      /**
      * This function loads the data into the Master Record and its child records
      */
      // execute query
      ocdotfeeexecuteQuery() {
            this.offDedSelect = -1;
            this.offdedModel.caseloadId = this.vHeaderBlockModel.caseloadId;
            this.offdedModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offdedModel.caseloadType = this.sessionManager.currentCaseLoadType;
            const serviceObj = this.ocdotfeeFactory.offDedExecuteQuery(this.offdedModel);
            serviceObj.subscribe(data => {
                  if (data.length === 0) {
                        this.offdedData = [];
                        this.offdrData = [];
                        this.offdedModel = new OffenderDeductions();

                  } else {
                        this.offdedData = data;
                        this.offDedSelect = 0;
                        this.offdedModel = this.offdedData[0];
                  }
            });

      }


      ocdotfeePopulateDetails() {
            this.offDrSelect = -1;
            const serviceObj = this.ocdotfeeFactory.offDrExecuteQuery(this.offdedModel);
            serviceObj.subscribe(data => {
                  if (data.length > 0) {
                        this.offdrData = data;
                        this.offDrSelect = 0;
                  } else {
                        this.offdrData = [];
                  }
            });
      }



      /**
       *  This function will be executed when commit event is
      * fired
      */
      ocdotfeeSaveoffdedForm(event) {
            if (!this.validOfDedRecord(this.offdedData)) {
                  return;
            }
            if (!this.isRecExist(event.added)) {
                  return;
            }
            this.offdedInsertList = event.added;
            this.offdedUpdatetList = event.updated;
            this.offdedDeleteList = event.removed;
            this.offdedCommitModel.insertList = [];
            this.offdedCommitModel.updateList = [];
            this.offdedCommitModel.deleteList = [];

            this.offdedInsertList.forEach(ele => {
                  ele.caseloadId = this.caseloadId;
                  ele.offenderId = this.vHeaderBlockModel.rootOffenderId;
                  ele.modifyUserId = this.user;
                  ele.deductionPriority = 1;
                  ele.modifyDate = DateFormat.getDate();
                  ele.effectiveDate = DateFormat.getDate();
            });

            this.offdedCommitModel.insertList = this.offdedInsertList;
            this.offdedCommitModel.updateList = this.offdedUpdatetList;
            this.offdedCommitModel.deleteList = this.offdedDeleteList;
            const offdedSaveData = this.ocdotfeeFactory.offDedCommit(this.offdedCommitModel);
            offdedSaveData.subscribe(data => {
                  if (String(data) === '1') {
                        this.show('common.addupdateremoverecordsuccess', 'success');
                  } else if (String(data).startsWith('ocdotfee')) {
                        this.show(data);
                        return;
                  } else if (String(data).includes('OFF_MD_OFF_DED_F1')) {
                        this.show('ocdotfee.cntdeltoffmonded');
                  } else if (String(data).includes('OFF_DS_OFF_DED_F1')) {
                        this.show('ocdotfee.cntdeltcntdltofffdedsh');
                  } else if (String(data).includes('OFF_DR_OFF_DED_F1')) {
                        this.show('ocdotfee.cntdetoffdedrecpt');
                  } else if (String(data).includes('OFF_BNC_OFF_DED_F1')) {
                        this.show('ocdotfee.cntdeltoffbenfi');
                  } else {
                        this.show('common.addupdateremoverecordfailed', 'error');
                  }
                  this.ocdotfeeexecuteQuery();
            });
      }

      validOfDedRecord(list: any[]): boolean {
            const is = { valid: true };
            if (list && Array.isArray(list)) {
                  list.forEach(data => {
                        if (!data.deductionType) {
                              this.show('ocdotfee.dedtpemstentr');
                              is.valid = false;
                              return;
                        }
                        if (!data.deductionStatus) {
                              this.show('common.statusmustbeentered');
                              is.valid = false;
                              return;
                        }
                  });
            }
            return is.valid;
      }

      onOffDedInsert = () => {
            if (!this.validOfDedRecord(this.offdedData)) {
                  return null;
            }
            return new OffenderDeductions();
      }

      offDedDelete = (data) => {
            if (!this.deductionCheck()) {
                  return false;
            } else {
                  if (this.offdrData && this.offdrData.length > 0) {
                        this.show('common.cannotdeletemasterchildrecord');
                        return false;
                  }
                  return true;
            }
      }

      isRecExist(list: any[]): boolean {
            const is = { valid: true };
            if (list && Array.isArray(list)) {
                  list.forEach(data => {
                        const count = list.filter(dupData => {
                              return data.deductionType === dupData.deductionType;
                        });
                        if (count.length > 1) {
                              this.show('ocdotfee.rwwithsamecase');
                              return;
                        }
                  });
            }
            return is.valid;
      }



      /**
       *  This function will be executed when commit event is
      * fired
      */
      ocdotfeeSaveoffdrForm(event) {
            if (!this.validateOffDr(this.offdrData)) {
                  return;
            }
            this.offdrInsertList = event.added;
            this.offdrUpdatetList = event.updated;
            this.offdrDeleteList = event.removed;
            this.offdrCommitModel.insertList = [];
            this.offdrCommitModel.updateList = [];
            this.offdrCommitModel.deleteList = [];

            this.offdrInsertList.forEach(ele => {
                  ele.offenderDeductionId = this.offdedModel.offenderDeductionId;
            });
            this.offdrCommitModel.insertList = this.offdrInsertList;
            this.offdrCommitModel.updateList = this.offdrUpdatetList;
            this.offdrCommitModel.deleteList = this.offdrDeleteList;
            const offdrSaveData = this.ocdotfeeFactory.offDrCommit(this.offdrCommitModel);
            offdrSaveData.subscribe(data => {
                  if (String(data) === '1') {
                        this.show('common.addupdateremoverecordsuccess', 'success');
                  } else if (String(data).startsWith('ocdotfee')) {
                        this.show(data);
                        return;
                  } else if (String(data).includes('OFF_MD_OFF_DED_F1')) {
                        this.show('ocdotfee.cntdeltoffmonded');
                  } else if (String(data).includes('OFF_DS_OFF_DED_F1')) {
                        this.show('ocdotfee.cntdeltcntdltofffdedsh');
                  } else if (String(data).includes('OFF_DR_OFF_DED_F1')) {
                        this.show('ocdotfee.cntdetoffdedrecpt');
                  } else if (String(data).includes('OFF_BNC_OFF_DED_F1')) {
                        this.show('ocdotfee.cntdeltoffbenfi');
                  } else {
                        this.show('common.addupdateremoverecordfailed', 'error');
                  }
                  this.ocdotfeePopulateDetails();
            });

      }

      get isOffDedAddEnable(): boolean {
            if (this.vHeaderBlockModel && this.vHeaderBlockModel.rootOffenderId && this.vHeaderBlockModel.trustAccount) {
                  return true;
            } else {
                  return false;
            }
      }

      get isOffDedRemEnable(): boolean {
            if (this.vHeaderBlockModel && this.vHeaderBlockModel.rootOffenderId && this.vHeaderBlockModel.trustAccount && this.offdedModel.offenderDeductionId) {
                  return true;
            } else {
                  return false;
            }
      }

      offDrValidateRow = (event) => {
            const rowdata = new ValidateRowReturn();
            rowdata.validated = true;
            const index = event.rowIndex;
            if (event.newValue && event.newValue !== event.oldValue) {
                  if (event.field === 'receiptTxnType') {
                        const count = this.offdrData.filter(data => {
                              return data.receiptTxnType === event.newValue;
                        });
                        if (count.length > 1) {
                              const masg = this.trMsg('ocdotfee.disbursetype').replace('%receipt%', event.newValue)
                              .replace('%deductionType%', this.offdedModel.deductionType)
                              .replace('%caseloadId%', this.caseloadId);
                              this.show(masg);
                              this.offDrGrid.setColumnData(event.field, index, null);
                        } else {
                              this.ocdotfeeFactory.getPercentageAndFlatRate(this.offdedModel.deductionType, this.caseloadId, event.newValue)
                              .subscribe(data => {
                                    if (data && data.length > 0) {
                                          const colData = data[0];
                                          if (this.isNull(colData.receiptPercentage) || this.isNull(colData.flatRate)) {
                                                this.offDrGrid.gridOptions.api.stopEditing();
                                                this.offDrGrid.setColumnData('receiptPercentage', index, colData.receiptPercentage);
                                                this.offDrGrid.setColumnData('flatRate', index, colData.flatRate);
                                          }
                                    }
                              });
                        }

                  } if (event.field === 'receiptPercentage') {
                        const percentage = Number(event.newValue);
                        if (!(percentage >= 0 && percentage <= 100)) {
                              this.show('ocdotfee.percentagemusbeen');
                              this.offDrGrid.setColumnData(event.field, index, null);
                        }
                  }
            }

            return rowdata;
      }

      isNull(value) {
            if (value === null || value === undefined || value === '' ) {
                  return true;
            }
            return false;
      }

      validateOffDr(list: any[]): boolean {
            const is = { valid: true };
            if (list && Array.isArray(list)) {
                  list.forEach(data => {
                        if (!data.receiptTxnType) {
                              this.show('ocdotfee.dedondismententr');
                              is.valid = false;
                              return;
                        }
                        if (!this.isNull(data.receiptPercentage) && !this.isNull(data.flatRate)) {
                              this.show('common.eitherperorreatenotboth');
                              is.valid = false;
                              return;
                        } else {
                              if (this.isNull(data.receiptPercentage) && this.isNull(data.flatRate)) {
                                    this.show('common.eitherpertagerratemstentr');
                                    is.valid = false;
                                    return;
                              }
                        }
                  });
            }
            return is.valid;
      }

      onOffDrInsert = () => {
            if (!this.validateOffDr(this.offdrData)) {
                  return null;
            }
            return new OffenderDeductionReceipts();
      }

      get isOffDrAddEnable(): boolean {
            if (this.vHeaderBlockModel && this.vHeaderBlockModel.rootOffenderId && this.vHeaderBlockModel.trustAccount && this.offdedModel.offenderDeductionId) {
                  return true;
            } else {
                  return false;
            }
      }

      get isOffDrRemEnable(): boolean {
            if (this.vHeaderBlockModel && this.vHeaderBlockModel.rootOffenderId && this.vHeaderBlockModel.trustAccount && this.offdrModel.offenderDeductionId) {
                  return true;
            } else { 
                  return false;
            }
      }

      deductionCheck() {
            if (this.offdedModel && this.offdedModel.deductionAmount && Number(this.offdedModel.deductionAmount) > 0) {
                  const masg = this.trMsg('ocdotfee.donotallowstarted').replace('%deductionType%', this.offdedModel.deductionType);
                  this.show(masg);
                  return false;
            } else {
                  return true;
            }
      }

      offDrEditable = (data: any, index: number, field: string) => {
            if (data.modifyDateTime) {
                  return false;
            }
            return true;
      }
      offDedEditable = (data: any, index: number, field: string) => {
            if (data.offenderDeductionId) {
            return false;
            }
            return true;
      }

}
