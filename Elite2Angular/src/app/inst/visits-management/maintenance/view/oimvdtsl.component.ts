import {
   Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimvdtslService } from '@inst/visits-management/maintenance/service/oimvdtsl.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AgencyVisitDays } from '@inst/visits-management/maintenance/beans/AgencyVisitDays';
import { AgencyVisitTimes } from '@inst/visits-management/maintenance/beans/AgencyVisitTimes';
import { AgencyVisitSlots } from '@inst/visits-management/maintenance/beans/AgencyVisitSlots';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { AgencyVisitDaysCommitBean } from '@inst/visits-management/maintenance/beans/AgencyVisitDaysCommitBean';
import { AgencyVisitTimesCommitBean } from '@inst/visits-management/maintenance/beans/AgencyVisitTimesCommitBean';
import { AgencyVisitSlotsCommitBean } from '@inst/visits-management/maintenance/beans/AgencyVisitSlotsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
// import required bean declarations

@Component({
   selector: 'app-oimvdtsl',
   templateUrl: './oimvdtsl.component.html'
})

export class OimvdtslComponent implements OnInit {
   @ViewChild('visitDaysgrid') visitDaysgrid: any;
   @ViewChild('visitTimeGrid') visitTimeGrid: any;
   @ViewChild('visitSlotgrid') visitSlotgrid: any;
   // Variable declaration
   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   nameOfLovPage: string;
   listToCompare: any[] = [];
   agyvisitdaysData: AgencyVisitDays[] = [];
   agyvisitdaysDataTemp: AgencyVisitDays[] = [];
   agyvisitdaysModel: AgencyVisitDays = new AgencyVisitDays();
   agyvisitdaysIndex: Number = 0;
   agyvisitdaysInsertList: AgencyVisitDays[] = [];
   agyvisitdaysUpdatetList: AgencyVisitDays[] = [];
   agyvisitdaysDeleteList: AgencyVisitDays[] = [];
   agyvisittimesData: AgencyVisitTimes[] = [];
   agyvisittimesDataTemp: AgencyVisitTimes[] = [];
   // TODO angular.copy(this.agyvisittimesData, thisagyvisittimesDataTemp);
   agyvisittimesModel: AgencyVisitTimes = new AgencyVisitTimes();
   agyvisittimesIndex: Number = 0;
   agyvisittimesInsertList: AgencyVisitTimes[] = [];
   agyvisittimesUpdatetList: AgencyVisitTimes[] = [];
   agyvisittimesDeleteList: AgencyVisitTimes[] = [];
   agyvisitslotsData: AgencyVisitSlots[] = [];
   agyvisitslotsDataTemp: AgencyVisitSlots[] = [];
   // TODO angular.copy(this.agyvisitslotsData, thisagyvisitslotsDataTemp);
   agyvisitslotsModel: AgencyVisitSlots = new AgencyVisitSlots();
   agyvisitslotsIndex: Number = 0;
   message = ' Invalid.';
   agyvisitslotsInsertList: AgencyVisitSlots[] = [];
   agyvisitslotsUpdatetList: AgencyVisitSlots[] = [];
   agyvisitslotsDeleteList: AgencyVisitSlots[] = [];
   minDate: Date;
   display: boolean;
   errorMessage: string;
   headerMessage: string;
   disabled: boolean;
   editable: Boolean = true;
   agyVisitDaysColumnDef: any[];
   agyVisitTimesColumnDef: any[];
   agyVisitSlotsColumnDef: any[];
   estCtrlReadOnly: Boolean = false;
   agyVisitDaysReadOnly: Boolean = false;
   agyVisitTimesReadOnly: Boolean = false;
   agyVisitSlotsReadOnly: Boolean = false;
   rgagyvisitdaysRg: any[] = [];
   rgagyintlocRg: any[] = [];
   rgagyvisitslotsRg: any[] = [];
   rgweekdayRg: any[] = [];
   index: any;
   agyvisitdaysCommitModel: AgencyVisitDaysCommitBean = new AgencyVisitDaysCommitBean();
   agyvisittimesCommitModel: AgencyVisitTimesCommitBean = new AgencyVisitTimesCommitBean();
   agyvisitslotsCommitModel: AgencyVisitSlotsCommitBean = new AgencyVisitSlotsCommitBean();
   tableIndex: number;
   tableIndexTimes: number;
   tableIndexLoc: number;
   agencyLink: string;
   agyLocId: any;
   countData: any;
   countDataSlot: any;
   visistDaysDelete: boolean;
   visitTimesDelete: boolean;
   visitSlotsDelete: boolean;
   enableInsert: boolean;
   agyvisitslotsInsert: boolean;
   val: boolean;
   retriveDisabled: boolean;
   clearDisabled: boolean;
   startTime: Date;
   endTime: Date;
   disableLov = true;
   checkFlag: any;
   enbleTimesGridInsert: boolean;
   agyLocTitle: { description: string; };
   constructor(private oimvdtslFactory: OimvdtslService,
      public translateService: TranslateService,
      public sessionManager: UserSessionManager,
      public dialogService: DialogService) {
      // TODO initilize data members here..!
      this.agyVisitDaysColumnDef = [];
      this.agyVisitTimesColumnDef = [];
      this.agyVisitSlotsColumnDef = [];
   }
   ngOnInit() {
      this.enbleTimesGridInsert = false;
      this.visistDaysDelete = false;
      this.visitTimesDelete = false;
      this.visitSlotsDelete = false;
      this.enableInsert = false;
      this.agyvisitslotsInsert = false;
      this.retriveDisabled = false;
      this.clearDisabled = true;
      this.disableLov = false;
      this.checkFlag = false;
      //this.agencyLink = '/oimvdtsl/rgAgyVisitSlotsRecordGroup?agyLocId=';
      this.agyLocTitle = {description: this.translateService.translate('oimvdtsl.lovDescription')};
      this.agyVisitDaysColumnDef = [
         {
            fieldName: this.translateService.translate('oimvdtsl.dayOfTheWeek') + '*',
            field: 'weekDay', editable: true, width: 150, datatype: 'lov', domain: 'WEEK_DAY', cellEditable: this.canAlertEdit
            , titles: { description: this.translateService.translate('oimvdtsl.lovweekday')}},
      ];
      this.agyVisitTimesColumnDef = [
         {
            fieldName: this.translateService.translate('oimvdtsl.timeSlot') + '*', field: 'timeSlotSeq',
            editable: true, width: 150, datatype : 'text',
            uppercase: 'false',  maxlength: 40
         },
         {
            fieldName: this.translateService.translate('oimvdtsl.startTime') + '*', field: 'startTime',
            editable: true, width: 150, datatype: 'time', cellEditable: this.canAlertEdit
         },
         {
            fieldName: this.translateService.translate('oimvdtsl.endTime') + '*', field: 'endTime',
            editable: true, width: 150, datatype: 'time'
         },
         {
            fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
            editable: true, width: 150, datatype: 'checkbox', nonSavable: this.nonSavable
         },
         {
            fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
            editable: false, width: 150, datatype: 'date'
         },
      ];

      this.agyVisitSlotsColumnDef = [
         {
            fieldName: this.translateService.translate('oimvdtsl.location') + '*', field: 'nbtLocationDesc',
            editable: this.disableLov, width: 150, cellEditable: this.canAlertEditForSlots, datatype: 'lov',source:'OIMILOCA',
             link: this.agencyLink, titles: { description: this.translateService.translate('oimvdtsl.lovDescription')}
         },
         {
            fieldName: this.translateService.translate('oimvdtsl.maxGroup'), field: 'maxGroups', editable: true,
            width: 150, minValue: '0', maxValue: '999', strictFP: true, whole: true, datatype: 'number',
            cellEditable: this.canAlertEditForMaxGroups
         },
         {
            fieldName: this.translateService.translate('oimvdtsl.maxAdultVisitors'), field: 'maxAdults', editable: true,
            width: 150, minValue: '0', maxValue: '999', strictFP: true, whole: true, datatype: 'number',
            cellEditable: this.canAlertEditForMaxGroups
         },
         { fieldName: this.translateService.translate('oimvdtsl.maxCapacity'), field: 'pCapacity', editable: false, width: 150 , datatype: 'number'},
      ];
   }
   sectionSlotlov() {
      const serviceObj = this.oimvdtslFactory.rgAgyVisitSlotsRecordGroup(this.agyvisitdaysModel.agyLocId,this.sessionManager.currentCaseLoad);
      serviceObj.subscribe(data => {
         this.disableLov = false;
         data.forEach(element => {
            if (element.sealFlag === 'true') {
               this.disableLov = true;
            }
         });
      });

   }
   /**
   * This function is used to not to edit the data for perticular
   */
   canAlertEdit = (data: any, index: number, field: string): boolean => {
      if (!data.createDatetime) {
         return true;
      } else {
         return false;
      }
   }
   /**
   * This function is used to not to save when checkbox value has not changed
   */
   nonSavable = (data: any, index: number, field: string): boolean => {
      if (!this.checkFlag && data.createDatetime) {
         return false;
      } else {
         return true;
      }
   }
/**
* This function is used to not to edit the data for perticular slot grid
*/
   canAlertEditForSlots = (data: any, index: number, field: string): boolean => {
      if (!data.createDatetime && this.disableLov) {
         return true;
      } else {
         return false;
      }
   }
/**
* This function is used to not to edit the data for when parent record active flag uncheck
*/
   canAlertEditForMaxGroups = (data: any, index: number, field: string): boolean => {
      if (this.agyvisittimesModel.activeFlag) {
         return true;
      } else {
         return false;
      }
   }
   /**
   * This function is used to validate the row
   */
   validateRow = (event) => {
      const rowdata = new ValidateRowReturn();
      return rowdata;
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
   /**
    * This function is used to validate the times grid rows
    */

   validateRowDataTimes = (event) => {
      this.val = true;
      const rowIndex = event.rowIndex;
      const rowdata = new ValidateRowReturn();

      if (event && event.field === 'activeFlag') {
         (event.data.activeFlag) ? this.visitTimeGrid.setColumnData('expiryDate', rowIndex, null) :
            this.visitTimeGrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate());
      }
      // if (event.field === 'activeFlag') {
      //    if (event.data.expiryDate && event.data.activeFlag) {
      //       const data = {
      //          label: this.translateService.translate('oimvdtsl.notEnabledOnceDesabled'), yesBtn: true, yesLabel: 'OK'
      //       };
      //       this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
      //          if (result) {
      //             this.visitTimeGrid.setColumnData('activeFlag', rowIndex, false);
      //             rowdata.validated = true;
      //             return rowdata;
      //          }
      //       });
      //    }
      //    if (event.oldValue && !event.data.expiryDate) {
      //       if(event.oldValue  === 'Y' || event.oldValue  === 'N') {
      //          event.oldValue  = event.oldValue  === 'Y' ? true : false;
      //       }
      //       if (event.oldValue != event.newValue && !event.data.expiryDate) {
      //       if (event.data.weekDay && event.data.timeSlotSeq && event.data.agyLocId) {
      //          const serviceObj = this.oimvdtslFactory.agyVisitTimescheckboxChange(event.data);
      //          serviceObj.subscribe(data => {
      //             if (data === 'Y') {
      //                const data = {
      //                   label: this.translateService.translate('oimvdtsl.notToDeactivateTimeSlot'), yesBtn: true,
      //                   yesLabel: 'Yes', noBtn: true
      //                };
      //                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
      //                   if (result) {
      //                      this.visitTimeGrid.setColumnData('expiryDate', rowIndex, null);
      //                      this.visitTimeGrid.setColumnData('activeFlag', rowIndex, true);
      //                      this.checkFlag = true;
      //                      rowdata.validated = true;
      //                      return rowdata;
      //                   } else {
      //                      this.visitTimeGrid.setColumnData('expiryDate', rowIndex, null);
      //                      this.visitTimeGrid.setColumnData('activeFlag', rowIndex, true);
      //                      this.checkFlag = false;
      //                      rowdata.validated = true;
      //                      return rowdata;
      //                   }

      //                });
      //             } else {
      //                const data = {
      //                   label: this.translateService.translate('oimvdtsl.deActivateConfirmation'), yesBtn: true, yesLabel: 'Yes',
      //                   noBtn: true
      //                };
      //                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
      //                   if (result) {
      //                      this.visitTimeGrid.setColumnData('expiryDate', rowIndex,
      //                      DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
      //                      this.visitTimeGrid.setColumnData('activeFlag', rowIndex, false);
      //                      this.checkFlag = true;
      //                      rowdata.validated = true;
      //                      return rowdata;
      //                   } else {
      //                      this.visitTimeGrid.setColumnData('expiryDate', rowIndex, null);
      //                      this.visitTimeGrid.setColumnData('activeFlag', rowIndex, true);
      //                      this.checkFlag = false;
      //                      rowdata.validated = true;
      //                      return rowdata;
      //                   }
      //                });
      //             }
      //          });
      //       } else {
      //          const data = {
      //             label: this.translateService.translate('oimvdtsl.deActivateConfirmation'), yesBtn: true, yesLabel: 'Yes',
      //             noBtn: true
      //          };
      //          this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
      //             if (result) {
      //                this.visitTimeGrid.setColumnData('expiryDate', rowIndex,
      //                DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
      //                this.visitTimeGrid.setColumnData('activeFlag', rowIndex, false);
      //                this.checkFlag = true;
      //                rowdata.validated = true;
      //                return rowdata;
      //             } else {
      //                this.visitTimeGrid.setColumnData('expiryDate', rowIndex, null);
      //                this.visitTimeGrid.setColumnData('activeFlag', rowIndex, true);
      //                this.checkFlag = true;
      //                rowdata.validated = true;
      //                return rowdata;
      //             }
      //          });
      //       }
      //    }
      //    }

      // }
      if (event.field === 'startTime' || event.field === 'endTime') {
         if (event.data.startTime && event.data.endTime && !event.data.createDatetime) {
            const timeStart = event.data.startTime;
            const timeEnd = event.data.endTime;
            const startTime = DateFormat.getDate(DateFormat.getDate(timeStart).setSeconds(0));
            const endTime = DateFormat.getDate(DateFormat.getDate(timeEnd).setSeconds(0));
            if (DateFormat.compareTime(startTime, endTime) === 1) {
               this.show(this.translateService.translate('oimvdtsl.endtimemustbegreaterthanstarttime'), 'warn');
               rowdata.validated = true;
               return rowdata;
            }
            if (DateFormat.compareTime(endTime, startTime) === 0) {
               this.show(this.translateService.translate('oimvdtsl.endtimemustequal'), 'warn');
               rowdata.validated = true;
               return rowdata;
            }
         }
      }
      rowdata.validated = true;
      return rowdata;
   }
   /**
    * This function is used to validate the slots grid rows
    */
   validateRowDataSlots = (event) => {
      const rowIndex = event.rowIndex;
      const rowdata = new ValidateRowReturn();
      if (event.field === 'nbtLocationDesc') {
         event.data.agyLocId = this.agyLocId;
         event.data.internalLocationId = event.data.nbtLocationDesc;
         const serviceObj = this.oimvdtslFactory.agyGetCapaityFrom(event.data);
         serviceObj.subscribe(data => {
            if (data && data.pCapacity !== null) {
               this.visitSlotgrid.setColumnData('pCapacity', rowIndex, data.pCapacity);
               rowdata.validated = true;
               return rowdata;
            }
         });
      }
         if (Number(event.data.maxGroups) > Number(event.data.maxAdults)) {
            this.show(this.translateService.translate('oimvdtsl.maxGroupExceed'));
            rowdata.validated = true;
            return rowdata;
         }
         if (Number(event.data.maxAdults) > Number(event.data.pCapacity)) {
            this.show(this.translateService.translate('oimvdtsl.maxAdultsExceed'));
            rowdata.validated = true;
            return rowdata;
         }
         if (Number(event.data.maxAdults) < Number(event.data.maxGroups)) {
            this.show(this.translateService.translate('oimvdtsl.maxAdultsLessThanGroup'));
            rowdata.validated = true;
            return rowdata;
         }
      rowdata.validated = true;
      return rowdata;
   }
   /**
    * This function is called when clicked on agencyvisitdays grid
    */
   onRowClickagyvisitdays(event) {
      if (event) {
         this.agyvisitdaysModel = event;
         this.agyvisittimesModel = new AgencyVisitTimes();
         this.agyvisitslotsModel = new AgencyVisitSlots();
         if (this.agyvisitdaysModel.agyLocId && this.agyvisitdaysModel.weekDay) {
            this.agyvisittimesModel.agyLocId = this.agyLocId;
            this.agyvisittimesModel.weekDay = this.agyvisitdaysModel.weekDay;
            if (this.agyLocId && this.agyvisitdaysModel.weekDay) {
               this.keyDeleteRecordValidation();
            }
            this.agyvisittimesexecuteQuery();
         }
         if (this.agyvisitdaysModel.createDatetime) {
            this.visistDaysDelete = true;
            this.enableInsert = true;
         } else {
            this.visistDaysDelete = false;
            this.enableInsert = false;
            this.agyvisittimesData = [];
            this.agyvisittimesModel = new AgencyVisitTimes();
            this.agyvisitslotsData = [];
            this.agyvisitslotsModel = new AgencyVisitSlots();
         }
      } else {
         this.enableInsert = false;
      }

   }
   /*This function will be executed when grid clear event is
   * fired
   */
   onGridClear = () => {
      this.agyvisittimesexecuteQuery();
      return true;
   }
   /**
   * This function is called when clicked on agency vist times grid
   */
   onRowClickagyvisittimes(event) {
      if (event) {
         this.agyvisittimesModel = event;
         this.agyvisitslotsModel = new AgencyVisitSlots();
         this.agyvisitslotsModel.agyLocId = this.agyLocId;
         this.agyvisitslotsModel.weekDay = this.agyvisittimesModel.weekDay;
         this.agyvisitslotsModel.timeSlotSeq = this.agyvisittimesModel.timeSlotSeq;
         this.agyvisitslotsExecuteQuery();
         if (this.agyvisittimesModel.agyLocId && this.agyvisittimesModel.weekDay && this.agyvisittimesModel.timeSlotSeq) {
            this.keyDeleteRecordSlotValidation();
         }
         if (this.agyvisittimesModel.createDatetime) {
            this.visitTimesDelete = true;
            if(this.agyvisittimesModel.activeFlag)
            {
            this.agyvisitslotsInsert = true;
            this.visitSlotsDelete = true;
            } else{
               this.agyvisitslotsInsert = false;
               this.visitSlotsDelete = false;
            }
         } else {
            this.visitTimesDelete = false;
            this.agyvisitslotsInsert = false;
         }
      } else {
         this.agyvisitslotsInsert = false;
      }
   }
   /**
   * This function is called when clicked on visit days grid a row to get the child
   * record count to not to delete if count exists more than zero
   */
   keyDeleteRecordValidation() {
      const serviceObj = this.oimvdtslFactory.agyVisitDaysOnCheckDeleteMaster(this.agyvisittimesModel);
      serviceObj.subscribe(data => {
         if (data > 0) {
            this.countData = data;
         } else {
            this.countData = data;
         }
      });
   }
   /**
   * This function is called when clicked on visit slots grid a row
   */
   onRowClickagyvisitslots(event) {

      if (event) {
         this.agyvisitslotsModel = event;
         if (this.agyvisitslotsModel.createDatetime && this.agyvisittimesModel.activeFlag) {
            this.visitSlotsDelete = true;
         } else {
            this.visitSlotsDelete = false;
         }
      }

   }
   /**
   * This function is called when agency chenged location lov selected
   */
   onStatusBlur() {
      if (!this.agyLocId) {
        this.agyLocId = this.agyLocId === '' ? undefined : '';
      }
    }
   /**
   * This function is called when clicked on visit slots grid a row to get the child
   * record count to not to delete if count exists more than zero
   */
   keyDeleteRecordSlotValidation() {
      const serviceObj = this.oimvdtslFactory.agyVisitTimesOnCheckDeleteMaster(this.agyvisittimesModel);
      serviceObj.subscribe(data => {
         if (data > 0) {
            this.countDataSlot = data;
         } else {
            this.countDataSlot = data;
         }
      });
   }
   /**
   * This function is called when clicked on clear button to clear the data
   */
   clear() {
      this.agyvisitdaysModel = new AgencyVisitDays();
      this.agyvisitdaysData = [];
      this.agyvisittimesData = [];
      this.agyvisitslotsData = [];
      this.agyLocId = undefined;
      this.retriveDisabled = false;
      this.clearDisabled = true;
      this.agyvisitslotsInsert=false;
   }
   /**
      * This function is called when selected the agency locs
      * lov to get the information of its childs
      */
   agyLocChangeEvent(event) {
      if (event && event.code) {
         this.agyvisitdaysModel.agyLocId = event.code;
         this.enbleTimesGridInsert=true;
         //this.agencyLink = '/oimvdtsl/rgAgyVisitSlotsRecordGroup?agyLocId='
         this.agyVisitSlotsColumnDef[0].link = 'oimvdtsl/rgAgyVisitSlotsRecordGroup?agyLocId=' + this.agyvisitdaysModel.agyLocId + '&caseLoadId=' + this.sessionManager.currentCaseLoad;
         this.visitSlotgrid.prepareAgColumnDef();
         this.sectionSlotlov();
         this.oimvdtslexecuteQuery();
      } else {
         this.enbleTimesGridInsert = false;
         this.agyvisitdaysModel = new AgencyVisitDays();
         this.agyvisitdaysData = [];
         this.agyvisittimesData = [];
         this.agyvisitslotsData = [];
         this.agyLocId = undefined;
         this.retriveDisabled = false;
         this.clearDisabled = true;
         this.agyvisitslotsInsert = false;
      }
   }
   /**
    *This function will be executed when commit event is
   * fired
   */
   oimvdtslSaveagyvisitdaysForm(event) {
      // TODO declare commit bean and add insert list to that object.
      if (!this.oimvdtslSaveagyvisitDaysValidations()) {
         return;
      }
      this.agyvisitdaysInsertList = event.added;
      this.agyvisitdaysUpdatetList = event.updated;
      this.agyvisitdaysDeleteList = event.removed;
      this.agyvisitdaysCommitModel.insertList = [];
      this.agyvisitdaysCommitModel.updateList = [];
      this.agyvisitdaysCommitModel.deleteList = [];
      if (this.agyvisitdaysInsertList.length > 0 || this.agyvisitdaysUpdatetList.length > 0) {
         for (let i = 0; i < this.agyvisitdaysInsertList.length; i++) {
            this.agyvisitdaysInsertList[i].agyLocId = this.agyLocId;
            this.agyvisitdaysCommitModel.insertList = this.agyvisitdaysInsertList;
         }
         for (let i = 0; i < this.agyvisitdaysUpdatetList.length; i++) {
            this.agyvisitdaysUpdatetList[i].agyLocId = this.agyLocId;
            this.agyvisitdaysCommitModel.updateList = this.agyvisitdaysUpdatetList;
         }

      }
      if (this.agyvisitdaysDeleteList.length > 0) {
         for (let i = 0; i < this.agyvisitdaysDeleteList.length; i++) {
            this.agyvisitdaysDeleteList[i].agyLocId = this.agyLocId;
            this.agyvisitdaysCommitModel.deleteList = this.agyvisitdaysDeleteList;
         }
      }
      const agyvisitdaysSaveData = this.oimvdtslFactory.agyVisitDaysCommit(this.agyvisitdaysCommitModel);
      agyvisitdaysSaveData.subscribe(data => {
         if (String(data[0].errorMessage).indexOf('AGENCY_VISIT_DAYS_PK') > 0) {
            this.show(this.translateService.translate('oimvdtsl.visitDayPrimaryKeyViolation'));
            this.oimvdtslexecuteQuery();
            return;
         }
         if (data[0] && data[0].returnValue === 1) {
            this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            this.oimvdtslexecuteQuery();
            return;
         } else {
            this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            this.oimvdtslexecuteQuery();
            return;
         }
      });
   }
   /**
   * This function is called when clicked on save button to validate the mandetory fields 
   */
   oimvdtslSaveagyvisitDaysValidations() {
      const is = { valid: true };
      if (this.agyvisittimesData && this.agyvisitdaysData) {
         this.agyvisitdaysData.forEach(element => {
            if (!element.weekDay) {
               this.show(this.translateService.translate('oimvdtsl.visitDayWeekdayMandatory'), 'warn');
               is.valid = false;
               return is.valid;
            }
         });
      }
      return is.valid;
   }

   /**
    * This function is called to retrive the data in the grids
    */
   oimvdtslexecuteQuery() {
      this.agyvisitdaysModel.agyLocId =this.agyLocId;
      const serviceObj = this.oimvdtslFactory.agyVisitDaysExecuteQuery(this.agyvisitdaysModel);
      serviceObj.subscribe(data => {
         if (data.length === 0) {
            this.agyvisitdaysData = [];
            this.retriveDisabled = false;
            this.show(this.translateService.translate('common.querycaused'));
            this.agyvisitdaysModel = new AgencyVisitDays();
            this.agyvisitdaysData = [];
            this.agyvisittimesData = [];
            this.agyvisitslotsData = [];
            this.retriveDisabled = false;
            this.clearDisabled = true;
            this.agyvisitslotsInsert = false;

         } else {
            this.agyvisitdaysData = data;
            this.agyvisitdaysModel = this.agyvisitdaysData[0];
            this.tableIndex = 0;
            this.agyvisittimesexecuteQuery();
            this.retriveDisabled = true;
            this.clearDisabled = false;
         }
      });
   }
   /*
   * This function converts the given date from MM/dd/yyyy to
   * yyyy/MM/dd format, If input data is not as expected
   * format then it will return input value
   */
   oimvdtsldateFormat(dateValue) {
      if (dateValue !== undefined && dateValue.length > 0) {
         const newdate = dateValue.split('/');
         return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
      } else {
         return dateValue;
      }
   }
   /**
    *This function will be executed when commit event is
   * fired
   */
   oimvdtslSaveagyvisittimesForm(event) {
      // TODO declare commit bean and add insert list to that object.
      if (!this.oimvdtslSaveagyvisittimesValidations()) {
         return;
      }
      this.agyvisittimesInsertList = event.added;
      this.agyvisittimesUpdatetList = event.updated;
      this.agyvisittimesDeleteList = event.removed;
      this.agyvisittimesCommitModel.insertList = [];
      this.agyvisittimesCommitModel.updateList = [];
      this.agyvisittimesCommitModel.deleteList = [];
      if (this.agyvisittimesInsertList.length > 0 || this.agyvisittimesUpdatetList.length > 0) {
         for (let i = 0; i < this.agyvisittimesInsertList.length; i++) {
            this.agyvisittimesInsertList[i].agyLocId = this.agyLocId;
            this.agyvisittimesInsertList[i].weekDay = this.agyvisitdaysModel.weekDay;
            this.agyvisittimesInsertList[i].activeFlag = this.agyvisittimesInsertList[i].activeFlag ? 'Y' : 'N';
            this.agyvisittimesCommitModel.insertList = this.agyvisittimesInsertList;
            if (this.agyvisittimesInsertList[i].startTime && this.agyvisittimesInsertList[i].endTime) {
               const timeStart = this.agyvisittimesInsertList[i].startTime;
               const timeEnd = this.agyvisittimesInsertList[i].endTime;
               const startTime = DateFormat.getDate(DateFormat.getDate(timeStart).setSeconds(0));
               const endTime = DateFormat.getDate(DateFormat.getDate(timeEnd).setSeconds(0));
               if (DateFormat.compareTime(startTime, endTime) === 1) {
                  this.show(this.translateService.translate('oimvdtsl.endtimemustbegreaterthanstarttime'), 'warn');
                  return;
               }
               if (DateFormat.compareTime(startTime, endTime) === 0) {
                  this.show(this.translateService.translate('oimvdtsl.endtimemustequal'), 'warn');
                  return;
               }
            }
         }
         for (let i = 0; i < this.agyvisittimesUpdatetList.length; i++) {
            this.agyvisittimesUpdatetList[i].agyLocId = this.agyLocId;
            this.agyvisittimesUpdatetList[i].weekDay = this.agyvisitdaysModel.weekDay;
            this.agyvisittimesUpdatetList[i].activeFlag = this.agyvisittimesUpdatetList[i].activeFlag ? 'Y' : 'N';
            this.agyvisittimesCommitModel.updateList = this.agyvisittimesUpdatetList;
         }
      }
      if (this.agyvisittimesDeleteList.length > 0) {
         for (let i = 0; i < this.agyvisittimesDeleteList.length; i++) {
            this.agyvisittimesDeleteList[i].agyLocId = this.agyLocId;
            this.agyvisittimesDeleteList[i].weekDay = this.agyvisitdaysModel.weekDay;
            this.agyvisittimesDeleteList[i].activeFlag = this.agyvisittimesDeleteList[i].activeFlag ? 'Y' : 'N';
            this.agyvisittimesCommitModel.deleteList = this.agyvisittimesDeleteList;
         }

      }
      const agyvisittimesSaveData = this.oimvdtslFactory.agyVisitTimesCommit(this.agyvisittimesCommitModel);
      agyvisittimesSaveData.subscribe(data => {
         if (String(data[0].errorMessage).indexOf('AGENCY_VISIT_TIMES_PK') > 0) {
            this.show(this.translateService.translate('oimvdtsl.visitTimePrimaryKeyViolation'));
            this.agyvisittimesexecuteQuery();
            return;
         }
         if (String(data[0].errorMessage)==='"AGENCY_VISIT_TIMES_UK1"') {
            this.show(this.translateService.translate('oimvdtsl.recordwithsamefacilitydaystartandendtimeexists'));
            this.agyvisittimesexecuteQuery();
            return;
         }
         if (String(data[0].errorMessage).indexOf('AGENCY_VISIT_TIMES_UK') > 0) {
            this.show(this.translateService.translate('oimvdtsl.visitTimeUniqueKeyViolation'));
            this.agyvisittimesexecuteQuery();
            return;
         }
         if (String(data[0].errorMessage).indexOf('AGY_VIS_SLOT_AGY_VIS_DT_FK') > 0) {
            this.show(this.translateService.translate('oimvdtsl.thisvisittimealreadyassignedtotheslotsocannotbemodifiedordeleted'));
            this.agyvisittimesexecuteQuery();
            return;
         }
         if (data[0] && data[0].sealFlag && data[0].serverCode === 2292) {
            this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
            this.message = String(this.message).replace('%tablename%', data[0].sealFlag);
            this.show(this.message, 'warn');
            this.agyvisittimesexecuteQuery();
            return;
         }
         if (data[0] && data[0].returnValue === 1) {
            this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            this.agyvisittimesexecuteQuery();
            return;
         } else if (data[0] && data[0].returnValue === 2) {
            this.show(this.translateService.translate('oimvdtsl.sequenceValidation'), 'error');
            this.agyvisittimesexecuteQuery();
            return;
         } else {
            this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            return;
         }

      });

   }
   /**
    * This function is called on delete on visit days grid cliked on delete button
    */
   onGridDaysDelete = () => {
      if (this.agyvisittimesData.length > 0) {
         this.show(this.translateService.translate('common.cannotdeletemaster'), 'warn');
         return false;
      }
      return true;
   }


   /**
      * This function is called on delete on visit times grid cliked on delete button
      */
   onGridTimesDelete = () => {
      if (this.agyvisitslotsData.length > 0) {
         this.show(this.translateService.translate('common.cannotdeletemaster'), 'warn');
         return false;
      }
      return true;
   }

   /**
   * This function is called when clicked on visit times grid save button to validate the mandetory fields
   */

   oimvdtslSaveagyvisittimesValidations() {
      const is = { valid: true };
      if (this.agyvisittimesData && this.agyvisittimesData) {
         this.agyvisittimesData.forEach(element => {
            if (!element.timeSlotSeq) {
               this.show(this.translateService.translate('oimvdtsl.mandetoryTimeSlotSeq'), 'warn');
               is.valid = false;
               return is.valid;
            }
            if (!element.startTime) {
               this.show(this.translateService.translate('oimvdtsl.mandetoryStartTime'), 'warn');
               is.valid = false;
               return is.valid;
            }
            if (!element.endTime) {
               this.show(this.translateService.translate('oimvdtsl.mandetoryEndTime'), 'warn');
               is.valid = false;
               return is.valid;
            }
         });
      }

      return is.valid;
   }

   /**
      * This function is called when clicked on visit times on insert
      */
   validateTimeInsert = () => {
      this.agyvisitslotsData = [];
      this.agyvisitslotsModel = new AgencyVisitSlots();
      if (!this.oimvdtslSaveagyvisittimesValidations()) {
         return;
      }
      return { activeFlag: true };
   }


   onGridDaysInsert = () => {
      this.agyvisitslotsData = [];
      this.agyvisitslotsModel = new AgencyVisitSlots();
      this.agyvisittimesData = [];
      this.agyvisittimesModel = new AgencyVisitTimes();
      if (!this.oimvdtslSaveagyvisitDaysValidations()) {
         return;
      }
      return {};
   }

   /**
    * This function is used to retrive the information of agency visit times grid
    */
   agyvisittimesexecuteQuery() {
      if (this.agyvisittimesModel.weekDay) {
         const serviceObj = this.oimvdtslFactory.agyVisitTimesExecuteQuery(this.agyvisittimesModel);
         serviceObj.subscribe(data => {
            if (data.length == 0) {
               this.agyvisittimesData = [];
               this.agyvisitslotsData = [];
            } else {
               data.forEach(element => {
                  element.activeFlag = element.activeFlag === 'Y' ? true : false;
               });
               this.agyvisittimesData = data;
               this.agyvisittimesModel = this.agyvisittimesData[0];
               this.tableIndexTimes = 0;
               this.agyvisitslotsExecuteQuery();
            }
         });
      }
   }


   /*
   * This function converts the given date from MM/dd/yyyy to
   * yyyy/MM/dd format, If input data is not as expected
   * format then it will return input value
   */
   agyvisitslotsExecuteQuery() {
      if (this.agyvisitslotsModel.weekDay && this.agyvisitslotsModel.timeSlotSeq) {
         const agyvisitslotsResult = this.oimvdtslFactory.agyVisitSlotsExecuteQuery(this.agyvisitslotsModel);
         agyvisitslotsResult.subscribe(agyvisitslotsResultList => {
            if (agyvisitslotsResultList.length === 0) {
               this.agyvisitslotsData = [];
            } else {
               agyvisitslotsResultList.forEach(element => {
                  if (element.internalLocationId) {
                     element.nbtLocationDesc = String(element.internalLocationId);
                  }
               });
               this.agyvisitslotsData = agyvisitslotsResultList;
               this.agyvisitslotsModel = agyvisitslotsResultList[0];
               this.tableIndexLoc = 0;
            }
         });
      }
   }
   /**
   * This function is used to called  on insert button to validation
   */
   onGridSlotInsert = () => {
      if (!this.agyvisittimesModel.activeFlag) {
         this.show(this.translateService.translate('oimvdtsl.nottocreaterecords'), 'warn');
         return false;
      }
      if (!this.oimvdtagyvisitSlotValidations()) {
         return;
      }
      return {};
   }
   get readeOnlyFields() {
      if (this.agyLocId === undefined || this.agyLocId === '') {
        return false;
      } else {
        return true;
      }
    }
   oimvdtagyvisitSlotValidations() {
      const is = { valid: true };
      if (this.agyvisitslotsData && this.agyvisitslotsData) {
         this.agyvisitslotsData.forEach(element => {
            if (!element.nbtLocationDesc) {
               this.show(this.translateService.translate('oimvdtsl.mandetorylocation'), 'warn');
               is.valid = false;
               return is.valid;
            }
         });
      }

      return is.valid;
   }
   /**
    *This function will be executed when commit event is
   * fired
   */
   oimvdtslSaveagyvisitslotsForm(event) {
      if (!this.oimvdtagyvisitSlotValidations()) {
         return;
      }
      // TODO declare commit bean and add insert list to that object.
      this.agyvisitslotsInsertList = event.added;
      this.agyvisitslotsUpdatetList = event.updated;
      this.agyvisitslotsDeleteList = event.removed;
      this.agyvisitslotsCommitModel.insertList = [];
      this.agyvisitslotsCommitModel.updateList = [];
      this.agyvisitslotsCommitModel.deleteList = [];
      if (this.agyvisitslotsInsertList.length > 0 || this.agyvisitslotsUpdatetList.length > 0) {
         for (let i = 0; i < this.agyvisitslotsInsertList.length; i++) {
            this.agyvisitslotsInsertList[i].agyLocId = this.agyLocId;
            this.agyvisitslotsInsertList[i].weekDay = this.agyvisitdaysModel.weekDay;
            this.agyvisitslotsInsertList[i].timeSlotSeq = this.agyvisittimesModel.timeSlotSeq;
            this.agyvisitslotsInsertList[i].startTime = this.agyvisittimesModel.startTime;
            this.agyvisitslotsInsertList[i].internalLocationId = Number(this.agyvisitslotsInsertList[i].nbtLocationDesc);
            this.agyvisitslotsCommitModel.insertList = this.agyvisitslotsInsertList;
               if (Number(this.agyvisitslotsInsertList[i].maxGroups) > Number(this.agyvisitslotsInsertList[i].maxAdults)) {
                  this.show(this.translateService.translate('oimvdtsl.maxGroupExceed'));
                  return;
               }
               if (Number(this.agyvisitslotsInsertList[i].maxAdults) > Number(this.agyvisitslotsInsertList[i].pCapacity)) {
                  this.show(this.translateService.translate('oimvdtsl.maxAdultsExceed'));
                  return;
               }
               if (Number(this.agyvisitslotsInsertList[i].maxAdults) < Number(this.agyvisitslotsInsertList[i].maxGroups)) {
                  this.show(this.translateService.translate('oimvdtsl.maxAdultsLessThanGroup'));
                  return;
               }
         }
         for (let i = 0; i < this.agyvisitslotsUpdatetList.length; i++) {
            this.agyvisitslotsUpdatetList[i].agyLocId = this.agyLocId;
            this.agyvisitslotsUpdatetList[i].weekDay = this.agyvisitdaysModel.weekDay;
            this.agyvisitslotsUpdatetList[i].timeSlotSeq = this.agyvisittimesModel.timeSlotSeq;
            this.agyvisitslotsCommitModel.updateList = this.agyvisitslotsUpdatetList;
               if (Number(this.agyvisitslotsUpdatetList[i].maxGroups) > Number(this.agyvisitslotsUpdatetList[i].maxAdults)) {
                  this.show(this.translateService.translate('oimvdtsl.maxGroupExceed'));
                  return;
               }
               if (Number(this.agyvisitslotsUpdatetList[i].maxAdults) > Number(this.agyvisitslotsUpdatetList[i].pCapacity)) {
                  this.show(this.translateService.translate('oimvdtsl.maxAdultsExceed'));
                  return;
               }
               if (Number(this.agyvisitslotsUpdatetList[i].maxAdults) < Number(this.agyvisitslotsUpdatetList[i].maxGroups)) {
                  this.show(this.translateService.translate('oimvdtsl.maxAdultsLessThanGroup'));
                  return;
               }
         }
      }
      if (this.agyvisitslotsDeleteList.length > 0) {
         for (let i = 0; i < this.agyvisitslotsDeleteList.length; i++) {
            this.agyvisitslotsDeleteList[i].agyLocId = this.agyLocId;
            this.agyvisitslotsDeleteList[i].weekDay = this.agyvisitdaysModel.weekDay;
            this.agyvisitslotsDeleteList[i].timeSlotSeq = this.agyvisittimesModel.timeSlotSeq;
            this.agyvisitslotsCommitModel.deleteList = this.agyvisitslotsDeleteList;

         }

      }
      const agyvisitslotsSaveData = this.oimvdtslFactory.agyVisitSlotsCommit(this.agyvisitslotsCommitModel);
      agyvisitslotsSaveData.subscribe(data => {
         if (data[0] && data[0].returnValue === 1) {
            this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            this.agyvisitslotsExecuteQuery();
            return;
         } else if (data[0] && data[0].returnValue === 0) {
            this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
            this.agyvisitslotsExecuteQuery();
            return;
         } else if (data[0] && data[0].returnValue === 2) {
            this.show(this.translateService.translate('oimvdtsl.sequenceValidation'));
            return;
         } else if (String(data[0].errorMessage).indexOf('AGENCY_VISIT_SLOTS_UK') > 0) {
            this.show(this.translateService.translate('oimvdtsl.visitSlotUniqueKeyViolation'));
            this.agyvisitslotsExecuteQuery();
            return;
         } else {
            if (data[0] && data[0].sealFlag && data[0].serverCode === 2292) {
               this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
               this.message = String(this.message).replace('%tablename%', data[0].sealFlag);
               this.show(this.message, 'warn');
               this.agyvisitslotsExecuteQuery();
               return;
            }
         }
      });
   }
}
