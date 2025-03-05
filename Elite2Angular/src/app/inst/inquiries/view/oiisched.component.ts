import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { VPimsNameSearch } from '@cm/searchassaign/beans/VPimsNameSearch';
import { OcinamesService } from '@cm/searchassaign/service/ocinames.service';
import { ReferenceCodes } from '@common/beans/ReferenceCodes';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { VOffenderAllSchedules } from '../../schedules/beans/VOffenderAllSchedules';
import { InternalScheduleReasons } from '../../schedules/maintenance/beans/InternalScheduleReasons';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OiischedService } from '../service/oiisched.service';
import { Router } from '@angular/router';
// import required bean declarations

@Component({
   selector: 'app-oiisched',
   templateUrl: './oiisched.component.html'
})

export class OiischedComponent implements OnInit {
   // Variable declaration
   @Input() namesearch: any;
   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   nameOfLovPage: string;
   listToCompare: any[] = [];
   offschData: VOffenderAllSchedules[] = [];
   offschDataTemp: VOffenderAllSchedules[] = [];
   // TODO angular.copy(this.offschData, thisoffschDataTemp);
   offschModel: VOffenderAllSchedules = new VOffenderAllSchedules();
   vOffenderAllSchedules: VOffenderAllSchedules = new VOffenderAllSchedules();
   vnsearchModelData: VPimsNameSearch = new VPimsNameSearch();
   offschIndex = 0;
   offschInsertList: VOffenderAllSchedules[] = [];
   offschUpdatetList: VOffenderAllSchedules[] = [];
   offschDeleteList: VOffenderAllSchedules[] = [];
   minDate: Date;
   display: boolean;
   errorMessage: string;
   headerMessage: string;
   disabled: boolean;
   editable = true;
   ctrlReadOnly = false;
   rgschfilterRg: any[] = [];
   rgtypeRg: any[] = [];
   rgsubtypeRg: any[] = [];
   tasksColumnDef: any[];
   @ViewChild('dialog', {static: true}) dialog: DialogComponent;
   scheduleFilter: ReferenceCodes = new ReferenceCodes();
   scheduleType: ReferenceCodes = new ReferenceCodes();
   scheduleReason: InternalScheduleReasons = new InternalScheduleReasons();
   scheduleFilterTitles = {
      description: this.translateService.translate('oiisched.schedule')
   };
   scheduleTypeTitles = {
      description: this.translateService.translate('oiisched.description'),
      code: this.translateService.translate('oiisched.code')
   };
   scheduleReasonTitles = {
      description: this.translateService.translate('oiisched.description'),
      code: this.translateService.translate('oiisched.code')
   };
   rgTypeRecordGroup: any;
   rgSubtypeRecordGroup: any;
   scheduleTypeReadOnly: boolean;
   scheduleReasonReadOnly: boolean;
   nbtOffenderName: string;
   offenderBookId: any;
   fromTime: string;
   fromDate: string;
   startTime: Date;
   endTime: Date;
   hoursFlag: boolean;
   offenderValidFlag: boolean;
   endTimeFlag: boolean;
   startTimeFlag: boolean;
   clearDisabled: boolean;
   fieldReadonly: boolean;
   searchDisabled: boolean;
   aosDisabled: boolean;
   exitLaunchBtn = false;
   vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
   onloadFlag: boolean;
   onloadFromDateFlag: boolean;
   onloadToDateFlag: boolean;
   offenderblurFlag: boolean;
   schType: any;
   domainScheduleType: string;
   domainScheduleReason:string;
   sourceScreen:string;
   constructor(private oiischedFactory: OiischedService,
      public translateService: TranslateService,
      public sessionManager: UserSessionManager,
      public dialogService: DialogService,
      public ocinamesFactory: OcinamesService,
      private router: Router) {
      // TODO initilize data members here..!
      this.tasksColumnDef = [];
   }
   ngOnInit() {
      // TODO all initializations here

      this.searchDisabled = false;
      this.fieldReadonly = false;
      this.aosDisabled = false;
      this.clearDisabled = true;
      this.scheduleTypeReadOnly = true;
      this.scheduleReasonReadOnly = true;
      this.vOffenderAllSchedules.fromDate = DateFormat.getDate();
      this.vOffenderAllSchedules.toDate = DateFormat.getDate();
      this.onloadFlag = true;
      this.onloadToDateFlag = true;
      this.onloadFromDateFlag = true;

      this.tasksColumnDef = [
         { fieldName: this.translateService.translate('oiisched.lastname'), field: 'offenderLastName', editable: false, width: 200 },
         { fieldName: this.translateService.translate('oiisched.firstname'), field: 'offenderFirstName', editable: false, width: 200 },
         { fieldName: this.translateService.translate('oiisched.aos'), field: 'offenderIdDisplay', editable: false, width: 200 },
         { fieldName: this.translateService.translate('oiisched.date'), field: 'nbtEventDate', editable: false, width: 200 },
         { fieldName: this.translateService.translate('oiisched.time'), field: 'nbtStartTime', editable: false, width: 200 },
         { fieldName: this.translateService.translate('oiisched.scheduletype'), field: 'eventTypeDesc', editable: false, width: 200 },
         { fieldName: this.translateService.translate('oiisched.schedulereason'), field: 'eventSubTypeDesc', editable: false, width: 200 },
         { fieldName: this.translateService.translate('oiisched.location'), field: 'toInternalLocationDesc', editable: false, width: 200 },
         {
            fieldName: this.translateService.translate('oiisched.appearanceType'), field: 'appearanceType',
            editable: false, width: 270,datatype: 'lov',domain: 'CRT_APP_TYPE'
         },
         {
            fieldName: this.translateService.translate('oiisched.appearanceLocation'), field: 'appearanceLocation',
            editable: false, width: 270
         },
         {
            fieldName: this.translateService.translate('oiisched.canceled'), field: 'cancelFlag', editable: false, width: 150, datatype: 'checkbox',
         },
         {
            fieldName: this.translateService.translate('oiisched.canceledreason'), field: 'cancelReason', editable: false, width: 150, datatype: 'text'
         }
      ];
      this.scheduleFilter.code = 'ALL';
      if (this.oiischedFactory.oidpactiFlag) {
         this.oiischedFactory.oidpactiFlag = false;
         this.vHeaderBlockModel = this.oiischedFactory.vHeaderBlockModel;
         if (this.vHeaderBlockModel) {
            if (this.vHeaderBlockModel.firstName && this.vHeaderBlockModel.lastName) {
               this.nbtOffenderName = this.vHeaderBlockModel.lastName + ',' + this.vHeaderBlockModel.firstName;
            }
            this.vOffenderAllSchedules.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
            this.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offschExecuteQuery();
         }
         this.exitLaunchBtn = true;
      }
      this.clearDisabled = true;
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
   openGo() {
      this.ocinamesFactory.oiiflag = true;
      this.dialogService.openLinkDialog('/oiinamesdialog', event, 80).subscribe(result => {
         if (result && result.offenderFirstName && result.offenderLastName) {
            this.nbtOffenderName = result.offenderLastName + ',' + result.offenderFirstName;
         }
         this.vOffenderAllSchedules.offenderIdDisplay = result.offenderIdDisplay;
         this.offenderBookId = result.offenderBookId;
         this.clearDisabled = false;
      });
   }

   offschExecuteQuery() {
      this.offschModel = this.vOffenderAllSchedules;
      const offschResult = this.oiischedFactory.offschExecuteQuery(this.offschModel);
      offschResult.subscribe(offschResultList => {
         if (offschResultList.length === 0) {
            this.clearDisabled = false;
            this.searchDisabled = false;
            this.fieldReadonly = false;
            this.aosDisabled = false;
            this.offschData = [];
            this.show(this.translateService.translate('oiisched.norecords'), 'warn');
            return;
         } else {
            this.clearDisabled = false;
            this.searchDisabled = true;
            this.fieldReadonly = true;
            this.scheduleReasonReadOnly = true;
            this.scheduleTypeReadOnly = true;
            this.aosDisabled = true;
            const datePipe = new DatePipe('en-US');
            this.offschData = offschResultList;
            this.offschModel = offschResultList[0];
            this.offschData.forEach(element => {
               if (!element.toInternalLocationDesc) {
                  element.toInternalLocationDesc = element.toLocDesc;
               }
               if (element.eventDate) {
                  element.nbtEventDate = datePipe.transform(element.eventDate, 'dd/MM/yyyy');
               }
               if (element && element.startTime) {
                  element.nbtStartTime = datePipe.transform(element.startTime, 'HH:mm');
               }
            });
            offschResultList.forEach(ele => {
               ele.cancelFlag = ele.eventStatus === 'CANC' ? true : false;
           });
         }
      });
   }
   changeScheduleFilter(event) {
      this.sourceScreen=null;
      this.domainScheduleReason=null; 
      if (this.scheduleFilter && this.scheduleFilter.code) {
         this.clearDisabled = false;
         this.rgTypeRecordGroup = 'oiisched/rgTypeRecordGroup?scheduleFilter=' + this.scheduleFilter.code;
         this.scheduleType.code = undefined;
            this.scheduleReason.code = undefined;
      }
      if (event && event.code === 'EXTERNAL') {
         this.vOffenderAllSchedules.eventClass = 'EXT_MOV';
         this.domainScheduleType = 'MOVE_TYPE'; 
      }
      if (event && event.code === 'INTERNAL') {
         this.vOffenderAllSchedules.eventClass = 'INT_MOV';
         this.domainScheduleType = 'INT_SCH_TYPE';
      }
      if (event && event.code === 'ALL') {
         this.domainScheduleType = null;
         this.scheduleReasonReadOnly = true;
         this.scheduleTypeReadOnly = true;
      } else {
         this.scheduleTypeReadOnly = false;
      }
      if (!event || !event.code) {
         this.scheduleReasonReadOnly = true;
         this.scheduleTypeReadOnly = true;
         this.scheduleType.code = undefined;
         this.scheduleReason.code = undefined;      
      }
   }
   changeFromDate(event) {
      if (event) {
         this.clearDisabled = false;
      }
   }
   changeToDate(event) {
      if (event) {
         this.clearDisabled = false;
      }
   }
   changeEndTime(event) {
      if (event) {
         this.clearDisabled = false;
      }

   }
   changeStartTime(event) {
      if (event) {
         this.clearDisabled = false;
      }
   }
   changeScheduleType(event) {
        if(event && event.code){
            this.schType = event.code;
            this.rgSubtypeRecordGroup = 'oiisched/rgSubtypeRecordGroup?scheduleFilter='
                + this.scheduleFilter.code + '&scheduleType=' + this.schType;
               if (this.scheduleFilter.code === 'EXTERNAL') {
                  this.domainScheduleReason='MOVE_RSN';
                  this.sourceScreen='OUMRCODE';      
               }
               if (this.scheduleFilter.code === 'INTERNAL') {
                  this.sourceScreen='OIMISREA';
                  this.domainScheduleReason=null; 
               }     
            this.rgScheduleReasonRecordGroup();
            this.vOffenderAllSchedules.eventType = this.schType;
            this.clearDisabled = false;
        }else{
            this.scheduleReason.code = undefined; 
            this.schType = undefined;
            this.scheduleReasonReadOnly = true
        }
    }
   rgScheduleReasonRecordGroup() {
      const rgWorksRecordGroup = this.oiischedFactory.rgSubtypeRecordGroup(this.scheduleFilter.code, this.scheduleType.code);
      rgWorksRecordGroup.subscribe(tasksResultList => {
         if (tasksResultList.length === 0) {
            this.scheduleReasonReadOnly = true;
         } else {
            this.scheduleReasonReadOnly = false;
         }
      });
   }
   changeScheduleReason(event) {
      if (event && event.code) {
         this.clearDisabled = false;
      } 
  this.vOffenderAllSchedules.eventSubType = event.code;
   }
   searchLaunchButtonClick(date?, dateOne?, time?, timeOne?) {
      const is = { valid: true };
      if (!this.scheduleFilter.code) {
         this.show(this.translateService.translate('oiisched.schedulefiltermsg'), 'warn');
         is.valid = false;
         return is.valid;
      }
      if (date) {
         if (date.lastValue === '0_/__/____') {
            this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
            return;
         }
         if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
            this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
            return;
         }
      }
      if (dateOne) {
         if (dateOne.lastValue === '0_/__/____') {
            this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
            return;
         }
         if (String(dateOne.lastValue).indexOf('_') >= 0 && dateOne.value === null) {
            this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
            return;
         }
      }
      this.startTimeFlag = false;
      if (time && time.value) {
         if (time.value.substring(0, 2) > 23) {
            this.startTimeFlag = true;
         } else if (time.value[3] === '_' || time.value[4] === '_') {
            if (time.value[3] === '_') {
               time.value = time.value.replace('_', '0');
            }
            if (time.value[4] === '_') {
               time.value = time.value.replace('_', '0');
            }
         }
         if (this.startTimeFlag) {
            this.show(this.translateService.translate('oiisched.hourmustmsg'), 'warn');
            return;
         }
      }
      this.endTimeFlag = false;
      if (timeOne && timeOne.value) {
         if (timeOne.value.substring(0, 2) > 23) {
            this.endTimeFlag = true;
         } else if (timeOne.value[3] === '_' || timeOne.value[4] === '_') {
            if (timeOne.value[3] === '_') {
               timeOne.value = timeOne.value.replace('_', '0');
            }
            if (timeOne.value[4] === '_') {
               timeOne.value = timeOne.value.replace('_', '0');
            }
         }
         if (this.endTimeFlag) {
            this.show(this.translateService.translate('oiisched.hourmustmsg'), 'warn');
            return;
         }
      }
      if (!this.vOffenderAllSchedules.fromDate) {
         this.show(this.translateService.translate('oiisched.fromdatemustmsg'), 'warn');
         return;
      }

      if (!this.vOffenderAllSchedules.toDate) {
         this.show(this.translateService.translate('oiisched.todatemustmsg'), 'warn');
         return;
      }
      if (this.vOffenderAllSchedules.fromDate && this.vOffenderAllSchedules.toDate) {
         if (DateFormat.compareDate(DateFormat.getDate(this.vOffenderAllSchedules.fromDate),
            DateFormat.getDate(this.vOffenderAllSchedules.toDate)) === 1) {
            this.show(this.translateService.translate('oiisched.fromdatelatermsg'), 'warn');
            return;
         }
      }
      if (!this.vOffenderAllSchedules.startTime && this.vOffenderAllSchedules.endTime) {
         this.show(this.translateService.translate('oiisched.starttimefirst'), 'warn');
         return;
      }
      if (this.vOffenderAllSchedules.endTime && this.vOffenderAllSchedules.startTime &&
         this.vOffenderAllSchedules.startTime.getTime() > this.vOffenderAllSchedules.endTime.getTime()) {
         this.show(this.translateService.translate('oiisched.starttimelaterthanend'), 'warn');
         return;
      }
      if (this.vOffenderAllSchedules.offenderIdDisplay) {
         this.offenderblurFlag = false;
         this.getOffenderBookId();
      } else {
         this.offschExecuteQuery();
      }
      this.fieldReadonly = true;
      this.aosDisabled = true;
      this.searchDisabled = true;
   }
   onRowClicktasks(event) {
   }
   //changeAos(offenderIdDisplay) {
    //  if (!offenderIdDisplay) {
     //    this.nbtOffenderName = '';
      //}
      //if (offenderIdDisplay) {
         //this.clearDisabled = false;
      //}
   //}
   clear() {
      this.scheduleFilter = new ReferenceCodes();
      this.scheduleType = new ReferenceCodes();
      this.scheduleReason = new InternalScheduleReasons();
      this.vOffenderAllSchedules = new VOffenderAllSchedules();
      this.scheduleFilter.code = '';
      this.nbtOffenderName = '';
      this.clearDisabled = true;
      this.searchDisabled = false;
      this.scheduleReasonReadOnly = true;
      this.scheduleTypeReadOnly = true;
      this.offschData = [];
      this.fieldReadonly = false;
      this.aosDisabled = false;
      this.domainScheduleType = null;
      this.sourceScreen=null;
      this.domainScheduleReason=null;
   }
   getOffenderBookId() {
      // for (let i = Number(String(this.vOffenderAllSchedules.offenderIdDisplay).length); i < 10; i++) {
      //    this.vOffenderAllSchedules.offenderIdDisplay = '0' + this.vOffenderAllSchedules.offenderIdDisplay;
      // }
      const bookIdResult = this.oiischedFactory.getOffenderBookId(
         this.vOffenderAllSchedules.offenderIdDisplay, this.sessionManager.currentCaseLoad);
      bookIdResult.subscribe(data => {
         if (data && data.offenderBookId) {
            if (data && data.firstName && data.lastName) {
               this.nbtOffenderName = data.lastName + ',' + data.firstName;
            }
            this.vOffenderAllSchedules.offenderIdDisplay = data.offenderIdDisplay;
            this.offenderBookId = data.offenderBookId;
            if (!this.offenderblurFlag) {
               this.offschExecuteQuery();
            }
         } else {
            for (let i = Number(String(this.vOffenderAllSchedules.offenderIdDisplay).length); i < 10; i++) {
               this.vOffenderAllSchedules.offenderIdDisplay = '0' + this.vOffenderAllSchedules.offenderIdDisplay;
            }
            this.show(this.vOffenderAllSchedules.offenderIdDisplay + ' ' +
               this.translateService.translate('oiisched.inactiveaosmsg') + this.sessionManager.currentCaseLoad, 'warn');
            return;
         }
      });
   }
   onoffenderIdDisplayBlur() {
      this.offenderblurFlag = true;
      this.getOffenderBookId();
   }
   onExitBtnClick = () => {
      if (this.oiischedFactory.exitFlag) {
         this.oiischedFactory.exitFlag = false;
         this.router.navigate(['/OIDPACTI']);
      }
      return true;
   }
   schedulefilterBlur() {
      if (!this.scheduleFilter.code) {
         this.scheduleFilter.code = this.scheduleFilter.code === undefined ? '' : undefined;
      }
   }
   scheduletypeBlur() {
      if (!this.scheduleType.code) {
         this.scheduleType.code = this.scheduleType.code === undefined ? '' : undefined;
      }
   }
   scheduleReasonBlur() {
      if (!this.scheduleReason.code) {
         this.scheduleReason.code = this.scheduleReason.code === undefined ? '' : undefined;
      }
   }

   fromDateBlur() {
      if (!this.vOffenderAllSchedules.fromDate) {
         this.vOffenderAllSchedules.fromDate = this.vOffenderAllSchedules.fromDate === undefined ? null : undefined;
      }
   }
   toDateBlur() {
      if (!this.vOffenderAllSchedules.toDate) {
         this.vOffenderAllSchedules.toDate = this.vOffenderAllSchedules.toDate === undefined ? null : undefined;
      }
   }

   startDateBlur(time?) {
      this.startTimeFlag = false;
      if (time && time.value) {
         if (time.value.substring(0, 2) > 23) {
            if (time.value.substring(0, 1) == 2 && time.value.substring(1, 2) > 3) {
               time.value = time.value.replace(time.value[1], '3');
               if (time.value[3] === '_' || time.value[4] === '_') {
                  if (time.value[3] === '_') {
                     time.value = time.value.replace('_', '0');
                  }
                  if (time.value[4] === '_') {
                     time.value = time.value.replace('_', '0');
                  }
               }
            }
         }
      }
   }
   endDateBlur(timeOne?) {
      this.endTimeFlag = false;
      if (timeOne && timeOne.value) {
         if (timeOne.value.substring(0, 2) > 23) {
            if (timeOne.value.substring(0, 1) == 2 && timeOne.value.substring(1, 2) > 3) {
               timeOne.value = timeOne.value.replace(timeOne.value[1], '3');
               if (timeOne.value[3] === '_' || timeOne.value[4] === '_') {
                  if (timeOne.value[3] === '_') {
                     timeOne.value = timeOne.value.replace('_', '0');
                  }
                  if (timeOne.value[4] === '_') {
                     timeOne.value = timeOne.value.replace('_', '0');
                  }
               }
            }
         }
      }
   }

}
