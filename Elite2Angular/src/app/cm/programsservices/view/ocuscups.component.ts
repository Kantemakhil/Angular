import {
   Component, OnInit,
   ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuscupsService } from '../service/ocuscups.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderCourseAttendance } from '@cm/programsservices/beans/OffenderCourseAttendance';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { CourseSchedules } from '@inst/institutional-activities/maintenance/beans/CourseSchedules';
import { OffenderCourseAttendancesCommitBean } from '@cm/programsservices/beans/OffenderCourseAttendancesCommitBean';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
   selector: 'app-ocuscups',
   templateUrl: './ocuscups.component.html'
})

export class OcuscupsComponent implements OnInit {
   // Variable declaration
   @ViewChild('dialog', { static: true }) dialog: DialogComponent;
   @ViewChild('attendanceGrid', { static: true }) attendanceGrid: any;
   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   nameOfLovPage: string;
   listToCompare: any[] = [];
   offcrsattendData: OffenderCourseAttendance[] = [];
   offcrsattendDataTemp: OffenderCourseAttendance[] = [];
   // TODO angular.copy(this.offcrsattendData, thisoffcrsattendDataTemp);
   offcrsattendModel: OffenderCourseAttendance = new OffenderCourseAttendance();
   offcrsattendanceModel: OffenderCourseAttendance = new OffenderCourseAttendance();
   offcrsattendIndex: number;
   offcrsattendInsertList: OffenderCourseAttendance[] = [];
   offcrsattendUpdatetList: OffenderCourseAttendance[] = [];
   offcrsattendDeleteList: OffenderCourseAttendance[] = [];
   display: boolean;
   errorMessage: string;
   headerMessage: string;
   disabled: boolean;
   editable: boolean;
   offCrsAttendColumnDef: any[];
   ctlBlkReadOnly: boolean;
   offCrsAttendReadOnly: boolean;
   tableIndex: number;
   cscheduleDateDisable: boolean;
   startTimeDisable: boolean;
   endTimeDisable: boolean;
   offcrsattendCommitModel: OffenderCourseAttendancesCommitBean = new OffenderCourseAttendancesCommitBean();
   msglist: any[];
   message: any;
   type: any;
   courseScheduleModel: CourseSchedules = new CourseSchedules();
   courseSchedulesaveModel: CourseSchedules = new CourseSchedules();
   disableClear: boolean;
   disableGoBut: boolean;
   cellEditable: boolean;

   constructor(private ocuscupsFactory: OcuscupsService, public translateService: TranslateService,
      public sessionManager: UserSessionManager
      , public dialogService: DialogService) {
      // TODO initilize data members here..!
      this.offCrsAttendColumnDef = [];
   }
   ngOnInit() {
      this.cscheduleDateDisable = false;
      this.startTimeDisable = false;
      this.endTimeDisable = false;
      this.cellEditable = true;



      this.courseScheduleModel.moduleDesc = this.dialog.data.moduleDesc;
      this.courseScheduleModel.sessionNo = this.dialog.data.sessionNo;
      this.offCrsAttendColumnDef = [
         {
            fieldName: this.translateService.translate('common.select'), field: 'select', width: 150,
            datatype: 'checkbox', cellEditable:this.omrecordGrCellEdit
         },
         { fieldName: this.translateService.translate('common.name'), field: 'offenderName',editable:false, width: 150 },
         {
            fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false,
            width: 150
         },
         { fieldName: this.translateService.translate('ocuscups.attendance'), field: 'eventOutcome', editable: false, width: 150 },
      ];
      this.offcrsattendExecuteQuery();

   }

   show() {
      this.msglist = [];
      this.msglist.push({ message: this.message, type: this.type });
      this.msgs = [...this.msglist];
   }
   onButExitclick() {
      this.dialog.close(null);
   }

   onRowClickoffcrsattend(event) {
      this.offcrsattendData.forEach

   }

   validateRowData = (event) => {
      const rowdata = new ValidateRowReturn();
      const rowIndex = event.rowIndex;
      if (event) {
         if (!this.courseScheduleModel.scheduleDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuscups.scheduledatevalid');//ocuscups.scheduledatevalid
            this.show();
            this.attendanceGrid.setColumnData('select', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
         }
         if (this.courseScheduleModel.scheduleDate < this.dialog.data.scheduleDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuscups.scheduledateval');
            this.show();
            this.attendanceGrid.setColumnData('select', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
         }

         if (!this.courseScheduleModel.startTime) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuscups.starttime');
            this.show();
            this.attendanceGrid.setColumnData('select', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
         }
         if (!this.courseScheduleModel.endTime) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuscups.endtime');
            this.show();
            this.attendanceGrid.setColumnData('select', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
         }
         if (this.courseScheduleModel.endTime <= this.courseScheduleModel.startTime) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuscups.endtimeval');
            this.show();
            this.attendanceGrid.setColumnData('select', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
         }
         if (this.courseScheduleModel.scheduleDate && this.courseScheduleModel.startTime) {
            let dateFormat = DateFormat.getDate(this.courseScheduleModel.startTime);
            dateFormat.setDate(DateFormat.getDate(this.courseScheduleModel.scheduleDate).getDate());
            dateFormat.setMonth(DateFormat.getDate(this.courseScheduleModel.scheduleDate).getMonth());
            dateFormat.setFullYear(DateFormat.getDate(this.courseScheduleModel.scheduleDate).getFullYear());
            this.courseScheduleModel.startTime = dateFormat;
         }
         if (this.courseScheduleModel.scheduleDate && this.courseScheduleModel.endTime) {
            let dateFormat = DateFormat.getDate(this.courseScheduleModel.endTime);
            dateFormat.setDate(DateFormat.getDate(this.courseScheduleModel.scheduleDate).getDate());
            dateFormat.setMonth(DateFormat.getDate(this.courseScheduleModel.scheduleDate).getMonth());
            dateFormat.setFullYear(DateFormat.getDate(this.courseScheduleModel.scheduleDate).getFullYear());
            this.courseScheduleModel.endTime = dateFormat;
         }
      }
      rowdata.validated = true;
      return rowdata;
   }

   searchGoButtonClick() {
      if (this.courseScheduleModel.scheduleDate || this.courseScheduleModel.startTime || this.courseScheduleModel.endTime) {
         this.disableClear = false;
      } else {
         this.disableClear = true;
      }

      if (!this.courseScheduleModel.scheduleDate) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocuscups.scheduledatevalid');
         this.show();
         return;
      } else if (!this.courseScheduleModel.startTime) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocuscups.starttime');
         this.show();
         return;
      } else if (!this.courseScheduleModel.endTime) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocuscups.endtime');
         this.show();
         return;
      } 

   }
   onSelectscheduleDate(event) {
      if (this.courseScheduleModel.scheduleDate || event) {
         this.courseScheduleModel.scheduleDate = event;
         this.disableClear = false;
      } else if (!event) {
         this.courseScheduleModel.scheduleDate = undefined;
         this.disableClear = true;
      }
      if (this.courseScheduleModel.scheduleDate || this.courseScheduleModel.startTime || this.courseScheduleModel.endTime) {
         this.disableClear = false;
      } else {
         this.disableClear = true;
      }
      if (this.courseScheduleModel.scheduleDate < this.dialog.data.scheduleDate) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocuscups.scheduledateval');
         this.show();
      }
   }

   clickStartTime() {
      if (this.courseScheduleModel.startTime) {
         this.disableClear = false;
      }
      if (this.courseScheduleModel.scheduleDate || this.courseScheduleModel.startTime || this.courseScheduleModel.endTime) {
         this.disableClear = false;
      } else {
         this.disableClear = true;
      }

      if (!this.courseScheduleModel.scheduleDate) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocuscups.scheduledatevalid');
         this.show();
      }
      if (this.courseScheduleModel.scheduleDate === this.dialog.data.scheduleDate) {
         if (this.courseScheduleModel.startTime <= this.dialog.data.startTime) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuscups.starttimeval');
            this.show();
         }
      }
   }

   clickEndTime() {
      if (this.courseScheduleModel.endTime) {
         this.disableClear = false;
      }
      if (this.courseScheduleModel.scheduleDate || this.courseScheduleModel.startTime || this.courseScheduleModel.endTime) {
         this.disableClear = false;
      } else {
         this.disableClear = true;
      }
      if (this.courseScheduleModel.endTime <= this.courseScheduleModel.startTime) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocuscups.endtimeval');
         this.show();
         return;
      }
   }
   attendanceGridClear = () =>{
      this.offcrsattendExecuteQuery();
      this.courseScheduleModel.scheduleDate = undefined;
      this.courseScheduleModel.startTime = undefined;
      this.courseScheduleModel.endTime = undefined;
   }

   offcrsattendExecuteQuery() {
      this.disableGoBut = true;
      this.disableClear = true;
      this.offcrsattendanceModel.crsSchId = this.dialog.data.crsSchId;
      const offcrsattendResult = this.ocuscupsFactory.
         offCrsAttendExecuteQuery(this.offcrsattendanceModel);
      offcrsattendResult.subscribe(data => {
         if (data.length === 0) {
            this.disableGoBut = false;
            this.disableClear = false;
            this.offcrsattendData = [];
            if (this.offcrsattendData.length === 0) {
               this.type = 'warn';
               this.message = this.translateService.translate('common.querycaused');
               this.show();
               return;
            }
         } else {
            this.disableGoBut = false;
            this.disableClear = false;
            
            if(!this.offcrsattendDataTemp || this.offcrsattendDataTemp.length === 0){
               data.forEach(e => {
                  e['isEdit'] = true;
               });
               this.offcrsattendDataTemp = JSON.parse(JSON.stringify(data));
            }else{
               data.forEach(e => {
                  const selectedRecord = this.offcrsattendDataTemp.filter(ele => (ele.eventId === e.eventId && ele.select)).length;
                  if(selectedRecord > 0){
                     e['isEdit'] = false;
                  }else{
                     e['isEdit'] = true;
                  }
               });
            }
            this.offcrsattendData = data;
            this.offcrsattendModel = data[0];
            this.tableIndex = 0;
         }
      });
   }
   omrecordGrCellEdit = (data: any, index: number, field: string): boolean => {
		//  if (this.cellEditable==true) {
		// 	return true;
		// } else {
		// 	return false;
		// } 
      return data.isEdit;
	}

   ocuscupsSaveoffcrsattendForm(event) {
      this.searchGoButtonClick();
      this.offcrsattendInsertList = event.added;
      this.offcrsattendUpdatetList = event.updated;
      this.offcrsattendDeleteList = event.removed;
      this.offcrsattendCommitModel.insertList = [];
      this.offcrsattendCommitModel.updateList = [];
      this.offcrsattendCommitModel.deleteList = [];
      if (this.ocuscupsSaveoffcrsattendForm.length > 0) {
         for (let i = 0; i < this.offcrsattendUpdatetList.length; i++) {
            if (this.offcrsattendUpdatetList[i].select && this.offcrsattendUpdatetList[i].select === true) {
               this.offcrsattendUpdatetList[i].catchUpCrsSchId = this.dialog.data.crsSchId;
               this.offcrsattendUpdatetList[i].scheduleDate = this.courseScheduleModel.scheduleDate;
               this.offcrsattendUpdatetList[i].startTime = this.courseScheduleModel.startTime;
               this.offcrsattendUpdatetList[i].endTime = this.courseScheduleModel.endTime;
            } else {
               this.type = 'warn'; 
               this.message = this.translateService.translate('ocuscups.nooffendermsg');
               this.show();
               return;
            }
         }
         this.offcrsattendCommitModel.updateList = this.offcrsattendUpdatetList;
         this.courseSchedulesaveModel.scheduleDate = DateFormat.getDate(this.dialog.data.startTime);
         this.courseSchedulesaveModel.startTime = this.courseScheduleModel.startTime;
         this.courseSchedulesaveModel.endTime = this.courseScheduleModel.endTime;
         this.offcrsattendCommitModel.courseSchedules = this.courseSchedulesaveModel;
      }
      if (!this.courseScheduleModel.scheduleDate) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocuscups.scheduledatevalid');
         this.show();
         return;
      } else if (!this.courseScheduleModel.startTime) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocuscups.starttime');
         this.show();
         return;
      } else if (!this.courseScheduleModel.endTime) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocuscups.endtime');
         this.show();
         return;
      } else if (this.offcrsattendCommitModel.updateList && this.offcrsattendCommitModel.updateList.length === 0) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocuscups.nooffendermsg');
         this.show();
         return;
      } else {
         const data = {
            label: this.translateService.translate('Warning: You cannot make changes after the record has been saved. Do you want to continue?'),yesBtn: true, noBtn: true
         };
         this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
            if (result) {
               const offcrsattendSaveData = this.ocuscupsFactory.offCrsAttendCommit(this.offcrsattendCommitModel);
               offcrsattendSaveData.subscribe(data => {
                  if (data === 1) {
                     this.type = 'success';
                     this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                     this.show();
                     this.offcrsattendDataTemp.forEach(e => {
                        const selectedRecord = this.offcrsattendCommitModel.updateList.filter(ele => (ele.eventId === e.eventId && ele.select)).length;
                        if(selectedRecord > 0){
                           e.select= true;
                        }
                     });

                     // const selectedRecorsCount = this.offcrsattendCommitModel.updateList.filter(e => e.select).length;
                     // if(this.offcrsattendData.length === this.offcrsattendCommitModel.updateList.length){
                     //    this.cellEditable = false;
                     // }else{
                     //    this.cellEditable = true;
                     // }
                     this.disableClear = false;
                     this.cscheduleDateDisable = true;
                     this.startTimeDisable = true;
                     this.endTimeDisable = true;
                     this.offcrsattendExecuteQuery();
                  } else {
                     this.type = 'warn';
                     this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                     this.show();
                     this.cellEditable = false;
                     this.offcrsattendExecuteQuery();
                     
                  }
               });
            } else{
               return;
            }

         });
      }
   }
}
