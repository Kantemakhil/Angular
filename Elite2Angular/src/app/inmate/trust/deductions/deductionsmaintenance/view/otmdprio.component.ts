import {
     Component,
     OnInit,
     ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmdprioService } from '../service/otmdprio.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CaseloadDeductionProfiles } from '@inmate/trust/checks/beans/CaseloadDeductionProfiles';
import { CaseloadDeductionProfilesCommitBean } from '@inmate/trust/checks/beans/CaseloadDeductionProfilesCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
// import required bean declarations

@Component({
     selector: 'app-otmdprio',
     templateUrl: './otmdprio.component.html'
})

export class OtmdprioComponent implements OnInit {
     // Variable declaration
     @ViewChild('grid', {static: true}) grid: any;
     actionName: string;
     lovModel: any[];
     msgs: any[] = [];
     nameOfLovPage: string;
     listToCompare: any[] = [];
     cslddpData: CaseloadDeductionProfiles[] = [];
     cslddpDataTemp: CaseloadDeductionProfiles[] = [];
     cslddpModel: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
     cslddpCommitModel: CaseloadDeductionProfilesCommitBean = new CaseloadDeductionProfilesCommitBean();
     cslddpIndex: number;
     cslddpInsertList: CaseloadDeductionProfiles[] = [];
     cslddpUpdatetList: CaseloadDeductionProfiles[] = [];
     cslddpDeleteList: CaseloadDeductionProfiles[] = [];
     minDate: Date;
     display: boolean;
     errorMessage: string;
     headerMessage: string;
     disabled: boolean;
     editable: boolean;
     csldDpColumnDef: any[];
     deductionIndex = -1;
     externalPriorityNo: number;
     indigientMandatoryflg: string;
     fifoFlag: string;
     buttonRetrieve: boolean;
     buttonClear: boolean;
     internalPriorityNo: number;
     expPriority: boolean;
     intPriority: boolean;
     flag: string;
     rowExists: boolean;
     constructor(private otmdprioFactory: OtmdprioService, public translateService: TranslateService,
          public sessionManager: UserSessionManager) {
          // TODO initilize data members here..!
          this.csldDpColumnDef = [];
     }
     ngOnInit() {
          this.buttonRetrieve = false;
          this.buttonClear = true;
          this.csldDpColumnDef = [
               { fieldName: this.translateService.translate('otmdprio.exp') + '*', field: 'externalPriorityNo', editable: true,
                width: 150,datatype: 'number',minValue: '1', maxValue: '999'},
               { fieldName: this.translateService.translate('otmdprio.inp') + '*', field: 'internalPriorityNo', editable: true,
                width: 150,datatype: 'number', minValue: '1', maxValue: '999' },
               { fieldName: this.translateService.translate('otmdprio.fio') , field: 'fifoFlag', editable: true,
                width: 150, datatype: 'checkbox' },
               { fieldName: this.translateService.translate('otmdprio.code'), field: 'deductionType', editable: false, width: 150 },
               { fieldName: this.translateService.translate('otmdprio.description'), field: 'deductionTypeDesc',
                editable: false, width: 150 },
               { fieldName: this.translateService.translate('otmdprio.calcon'), field: 'fromBalType', editable: false, width: 150 },
               { fieldName: this.translateService.translate('otmdprio.pct'), field: 'percentage', editable: false, width: 150 },
               { fieldName: this.translateService.translate('otmdprio.all'), field: 'foAlAllOffenderFlag',
                editable: false, width: 150, datatype: 'checkbox' },
               { fieldName:  this.translateService.translate('otmdprio.ind'), field: 'indigentMandatoryFlag', editable: true,
                width: 150, datatype: 'checkbox' },
          ];
          this.cslddpExecuteQuery();
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
     onRowClickcslddp(event) {
          if (event) {
               this.cslddpModel = event;

          }
     }
     isDublicateOffender(externalPriorityNo, internalPriorityNo): string {
          const gridData = JSON.parse(JSON.stringify(this.cslddpData));
          const flag = gridData.filter(ele => {
               return Number(ele.externalPriorityNo) === Number(externalPriorityNo) &&
                Number(ele.internalPriorityNo) === Number(internalPriorityNo);
          });
          if (flag.length > 1) {
               this.flag = 'Y';
          } else {
               this.flag = 'N';
          }
          return this.flag;

     }
     validateRowData = (event) => {
          this.rowExists = false;
          this.expPriority = false;
          this.intPriority = false;
          const rowdata = new ValidateRowReturn();
          const index = event.rowIndex;
          if (event.field === 'externalPriorityNo' && event.newValue) {
               this.isDublicateOffender(event.data.externalPriorityNo, event.data.internalPriorityNo);
               if (this.flag === 'Y') {
                    this.rowExists = true;
                    this.show(this.translateService.translate('otmdprio.rowexists'));

               }
               if (event.data.externalPriorityNo <= 0) {
                    this.expPriority = true;
                    this.show(this.translateService.translate('otmdprio.externalpriority'));
               }

          } else if (event.field === 'internalPriorityNo' && event.newValue) {
               this.isDublicateOffender(event.data.externalPriorityNo, event.data.internalPriorityNo);
               if (this.flag === 'Y') {
                    this.rowExists = true;
                    this.show(this.translateService.translate('otmdprio.rowexists'));

               }
               if (event.data.internalPriorityNo <= 0) {
                    this.intPriority = true;
                    this.show(this.translateService.translate('otmdprio.internalpriority'));
               }

          }
          if (event.field = 'indigentMandatoryFlag' && event.newValue) {
               if (event.data.indigentMandatoryFlag) {
                    this.grid.setColumnData('indigentMandatoryFlag', index, 'Y');
               } else {
                    this.grid.setColumnData('indigentMandatoryFlag', index, null);
               }

          }
          rowdata.validated = true;
          return rowdata;

     }
     ok() {
     }
     no() {
     }
     clear() {
          this.cslddpData = [];
          this.buttonRetrieve = false;
          this.buttonClear = true;
          this.fifoFlag = null;
          this.indigientMandatoryflg = null;
          this.externalPriorityNo = null;
          this.internalPriorityNo = null;

     }
     cslddpExecuteQuery() {
          this.cslddpModel = new CaseloadDeductionProfiles();
      //     if (this.externalPriorityNo) {
      //          this.cslddpModel.externalPriorityNo = this.externalPriorityNo;
      //     } else {
      //          this.cslddpModel.externalPriorityNo = null;
      //     }
      //     if (this.internalPriorityNo) {
      //          this.cslddpModel.internalPriorityNo = this.internalPriorityNo;
      //     } else {
      //          this.cslddpModel.internalPriorityNo = null;
      //     }

      //     if (this.fifoFlag) {
      //          this.cslddpModel.fifoFlag = 'Y';
      //     } else {
      //          this.cslddpModel.fifoFlag = null;
      //     }
      //     if (this.indigientMandatoryflg) {
      //          this.cslddpModel.indigentMandatoryFlag = 'Y';
      //     } else {
      //          this.cslddpModel.indigentMandatoryFlag = null;
      //     }
          this.cslddpModel.caseloadId = this.sessionManager.currentCaseLoad;
          const cslddpResult = this.otmdprioFactory.csldDpExecuteQuery(this.cslddpModel);
          cslddpResult.subscribe(data => {
               if (data.length === 0) {
                    this.cslddpData = [];
                    this.show(this.translateService.translate('common.querycaused'), 'warn');
                    this.buttonClear = false;
               } else {
                    data.forEach(element => {
                         if (element.percentage) {
                              element.percentage = element.percentage.toFixed(2);
                         }
                         if (element.fifoFlag === 'Y') {
                              element.fifoFlag = 'Y';
                         } else {
                              element.fifoFlag = null;
                         }
                         if (element.foAlAllOffenderFlag === 'Y') {
                              element.foAlAllOffenderFlag = 'Y';
                         } else {
                              element.foAlAllOffenderFlag = null;
                         }
                         if (element.indigentMandatoryFlag === 'Y') {
                              element.indigentMandatoryFlag = 'Y';
                         } else {
                              element.indigentMandatoryFlag = null;
                         }
                    });
                    this.cslddpData = data;
                    this.deductionIndex = 0;
                    this.buttonRetrieve = true;
                    this.buttonClear = false;
               }
          });
     }
     /**
      *  This function will be executed when commit event is
     * fired
     */
     otmdprioSavecslddpForm(event) {
          // TODO declare commit bean and add insert list to that object.
          this.cslddpInsertList = event.added;
          this.cslddpUpdatetList = event.updated;
          this.cslddpDeleteList = event.removed;
          this.cslddpCommitModel.insertList = [];
          this.cslddpCommitModel.updateList = [];
          this.cslddpCommitModel.deleteList = [];
          if (this.rowExists) {
               this.show(this.translateService.translate('otmdprio.rowexists'));
               return;
          }
          if (this.expPriority) {
               this.show(this.translateService.translate('otmdprio.externalpriority'));
               return;

          }
          if (this.intPriority) {
               this.show(this.translateService.translate('otmdprio.internalpriority'));
               return;
          }
          if (this.cslddpInsertList.length > 0) {
               for (let i = 0; i < this.cslddpInsertList.length; i++) {
               }
               this.cslddpCommitModel.insertList = this.cslddpInsertList;
          }
          if (this.cslddpUpdatetList.length > 0) {

               for (let i = 0; i < this.cslddpUpdatetList.length; i++) {
                    if (!this.cslddpUpdatetList[i].externalPriorityNo) {
                         this.show(this.translateService.translate('otmdprio.expmustbe'));
                         return;

                    }
                    if (this.cslddpUpdatetList[i].fifoFlag) {
                         this.cslddpUpdatetList[i].fifoFlag = 'Y';
                    } else {
                         this.cslddpUpdatetList[i].fifoFlag = 'N';
                    }
                    if (this.cslddpUpdatetList[i].indigentMandatoryFlag) {
                         this.cslddpUpdatetList[i].indigentMandatoryFlag = 'Y';
                    } else {
                         this.cslddpUpdatetList[i].indigentMandatoryFlag = 'N';
                    }
                    this.cslddpUpdatetList[i].caseloadId = this.sessionManager.currentCaseLoad;
               }
               this.cslddpCommitModel.updateList = this.cslddpUpdatetList;
          }
          if (this.cslddpDeleteList.length > 0) {
               for (let i = 0; i < this.cslddpDeleteList.length; i++) {
               }
               this.cslddpCommitModel.deleteList = this.cslddpDeleteList;
          }
          const cslddpSaveData = this.otmdprioFactory.csldDpCommit(this.cslddpCommitModel);
          cslddpSaveData.subscribe(data => {
               if (data === 1) {
                    this.show('common.addupdateremoverecordsuccess', 'success');
                    this.cslddpExecuteQuery();
                    return;
               } else {
                    this.show('common.addupdateremoverecordfailed', 'warn');
                    return;
               }
          });



     }
}
