import {
   Component, OnInit, ViewChild, OnDestroy
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiigrievService } from '../service/oiigriev.service';
import { VGrievanceInquiry } from '@inst/offender-issues-tracking/beans/VGrievanceInquiry';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { Router } from '@angular/router';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
   selector: 'app-oiigriev',
   templateUrl: './oiigriev.component.html',
   styleUrls: []
})

export class OiigrievComponent implements OnInit, OnDestroy {
      lastIndex: number;
      index: number;
      selected = -1;
   msgs: any[] = [];
   @ViewChild('oiigrievForm', {static: true}) form: any;
   serviceData: any;
   griedetData: VGrievanceInquiry[] = [];
   grieinqModel: VGrievanceInquiry = new VGrievanceInquiry();
   supervisorReviewed: boolean;
   noSupervisorReviewed: boolean;
   assignedStaffId: string;
   facilityTitles = { 'agyLocId': 'Code', 'agencyLocationType': 'Description' };


   grieDetColumnDef: any[];
   issueServiceData: any;
   griDisabled: boolean;
   clearDisable: boolean;
   retDisable: boolean;
   rgGrieReasonRecordGroup='oiigriev/rgGrieReasonCodeRecordGroup';
   rgGrieTransactionRecordGroup='oiigriev/rgGrieTransactionTypeRecordGroup';
   constructor(private oiigrievFactory: OiigrievService,
      private translateService: TranslateService,
      private offenderSearchService: OffenderSearchService,
      private sessionManager: UserSessionManager,
      private router: Router) {

      this.grieDetColumnDef = [];

   }
   ngOnInit() {
      this.grieDetColumnDef = [
         { fieldName: this.trMsg('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150 },
         { fieldName: this.trMsg('common.name'), field: 'offName', editable: false, width: 150 },
         { fieldName: this.trMsg('common.date'), field: 'reportDate', datatype: 'date', editable: false, width: 150 },
         { fieldName: this.trMsg('common.location'), field: 'agyLocId', editable: false, width: 150 },
         {
            fieldName: this.trMsg('oiigriev.issuetype'), field: 'grievType', datatype: 'lov', link: 'oiigriev/rgGrieTypeRecordGroup',
            editable: false, width: 150
         },
         {
            fieldName: this.trMsg('oiigriev.issuereason'), field: 'grievReasonCodeDesc', datatype: 'text',
            editable: false, width: 150
         },
         {
            fieldName: 'Level', field: 'grievLevel', datatype: 'lov', domain: 'GRIEV_LEVEL',
            editable: false, width: 150
         },
         {
            fieldName: 'Staff Assigned', field: 'assignedStaffId', datatype: 'lov',
            link: 'oiigriev/rgStaffAsgRecordGroup',
            editable: false, width: 150
         },
         { fieldName: 'Days Remaining', field: 'daysRem', editable: false, width: 150 },
         {
            fieldName: '', field: 'butDet', data: 'row', datatype: 'launchbutton', link: '/OIDISSUE',
            onLaunchClick: this.launchClick, editable: false, width: 150
         },
         {
            fieldName: this.trMsg('oiigriev.tranaction'), field: 'txnTypeDesc', datatype: 'text',
            editable: false, width: 150
         },
      ];
      if (this.oiigrievFactory.serviceData) {
         this.grieinqModel = this.oiigrievFactory.serviceData['model'];
         this.noSupervisorReviewed = this.oiigrievFactory.serviceData['noSupervisorReviewed'];
         this.supervisorReviewed = this.oiigrievFactory.serviceData['supervisorReviewed'];
         this.assignedStaffId = this.oiigrievFactory.serviceData['assignedStaffId'];
             this.lastIndex = this.oiigrievFactory.serviceData['lastIndex'];
             this.oiigrievFactory.serviceData = undefined;
         this.ok();
      } 
      /* else {
         this.grieInqWhenNewRecordInstanceTrigger();
      } */
      // this.form.valueChanges.subscribe(data => {
      //    if (this.griedetData.length > 0) {
      //       this.griedetData = [];
      //    }
      // });
      this.griDisabled = false;
      this.clearDisable = true;
      this.retDisable = false;
   }
   allowNumbers(event) {
      if (String(this.grieinqModel.grievanceId).length >= 12) {
         const reg = /[0-9]/;
         if (reg.test(event.key)) {
            event.stopPropagation();
            return false;
         }
      } if (event.key === '.') {
         event.stopPropagation();
         return false;
      }
   }
   onRowClickgriedet(event) {
         this.index = this.griedetData.indexOf(event);
   }
   ok() {
      if ((this.grieinqModel.fromDate && this.grieinqModel.toDate) &&
         DateFormat.compareDate(this.grieinqModel.fromDate, this.grieinqModel.toDate) > 0) {
         this.show('oiigriev.todatecannotbelessthanfromdate');
         return;
      }
      if (this.grieinqModel.fromDate && DateFormat.compareDate(this.grieinqModel.fromDate, DateFormat.getDate()) > 0) {
         this.show('oiigriev.fromdatecannotbegreaterthantoday');
         return;
        }
       if (this.grieinqModel.fromDate && DateFormat.compareDate(this.grieinqModel.fromDate, DateFormat.getDate()) > 0) {
            this.show('From Date can not be greater than today');
            return;
       }
       if (this.grieinqModel.toDate && DateFormat.compareDate(this.grieinqModel.toDate, DateFormat.getDate()) > 0) {
            this.show('oiigriev.todatecannotbegreterthantoday');
            return;
       }
      this.griedetExecuteQuery();
   }
   no() {
      this.grieinqModel = new VGrievanceInquiry();
      this.noSupervisorReviewed = false;
      this.supervisorReviewed = false;
      this.assignedStaffId = this.assignedStaffId === undefined ? '' : undefined;
      this.griedetData = [];
      this.clearDisable = true;
      this.retDisable = false;
      this.griDisabled = false;
      this.rgGrieReasonRecordGroup='oiigriev/rgGrieReasonCodeRecordGroup';
      this.rgGrieTransactionRecordGroup='oiigriev/rgGrieTransactionTypeRecordGroup';
   }
   cancel() {
   }
   onOffenderChange(offender) {
   }
   fromDateBlur(event) {
      if (!this.grieinqModel.fromDate) {
         this.grieinqModel.fromDate = this.grieinqModel.fromDate === null ? undefined : null;
      } else {
         if ((this.grieinqModel.fromDate && this.grieinqModel.toDate) &&
            DateFormat.compareDate(this.grieinqModel.fromDate, this.grieinqModel.toDate) > 0) {
               this.show('oiigriev.fromdatecannotbegreaterthantodate');
         }
         if (this.grieinqModel.fromDate && DateFormat.compareDate(this.grieinqModel.fromDate, DateFormat.getDate()) > 0) {
               this.show('oiigriev.fromdatecannotbegreaterthantoday');
         }
      }
   }
   toDateBlur(event) {
      if (!this.grieinqModel.toDate) {
         this.grieinqModel.toDate = this.grieinqModel.toDate === null ? undefined : null;
      } else {
         if ((this.grieinqModel.fromDate && this.grieinqModel.toDate) &&
            DateFormat.compareDate(this.grieinqModel.fromDate, this.grieinqModel.toDate) > 0) {
            this.show('oiigriev.todatecannotbelessthanfromdate');
            return;
             }
             if (this.grieinqModel.toDate && DateFormat.compareDate(this.grieinqModel.toDate, DateFormat.getDate()) > 0) {
            this.show('oiigriev.todatecannotbegreterthantoday');
            return;
         }
      }
   }
   facilityBlur() {
      if (!this.grieinqModel.agyLocId) {
         this.grieinqModel.agyLocId = this.grieinqModel.agyLocId === undefined ? '' : undefined;
      }
   }
   typeBlur() {
      if (!this.grieinqModel.grievType) {
         this.grieinqModel.grievType = this.grieinqModel.grievType === undefined ? '' : undefined;
      }
   }
   levelBlur() {
      if (!this.grieinqModel.grievLevel) {
         this.grieinqModel.grievLevel = this.grieinqModel.grievLevel === undefined ? '' : undefined;
      }
   }
   assignedBlur() {
      if (!this.assignedStaffId) {
         this.assignedStaffId = this.assignedStaffId === undefined ? '' : undefined;
      }
   }
   involvedBlur() {
      if (!this.grieinqModel.userInvolvement) {
         this.grieinqModel.userInvolvement = this.grieinqModel.userInvolvement === undefined ? '' : undefined;
      }
   }
   launchClick = (data) => {
      const offender = {
         offenderIdDisplay: data.offenderIdDisplay, offenderBookId: data.offenderBookId,
         'agyLocId': this.sessionManager.currentCaseLoad+'OIIGRIEV'
      };
      this.oiigrievFactory.offbkgGlobalQuery(offender).subscribe(offenders => {
         if (offenders.length > 0) {
            this.offenderSearchService.selectedOffender = offenders[0];
         } else {
            this.offenderSearchService.selectedOffender = undefined;
         }
         this.serviceData = {};
         this.serviceData['model'] = this.grieinqModel;
         this.serviceData['noSupervisorReviewed'] = this.noSupervisorReviewed;
         this.serviceData['supervisorReviewed'] = this.supervisorReviewed;
             this.serviceData['assignedStaffId'] = this.assignedStaffId;
             this.serviceData['lastIndex'] = this.index;
         this.router.navigate(['/OIDISSUE']);
      });
      return false;

   }
   ngOnDestroy() {
      if (this.router.url !== '/OIDISSUE') {
         this.serviceData = undefined;
      }
      this.oiigrievFactory.serviceData = this.serviceData;
   }
   griedetExecuteQuery() {
         this.selected = -1;
      this.grieinqModel.supervisorReviewed = this.supervisorReviewed ? 'Y' : 'N';
      this.grieinqModel.noSupervisorReviewed = this.noSupervisorReviewed ? 'Y' : 'N';
      if (this.assignedStaffId) {
         this.grieinqModel.assignedStaffId = Number(this.assignedStaffId);
      } else {
         this.grieinqModel.assignedStaffId = null;
      }
      const griedetResult = this.oiigrievFactory.
         grieDetExecuteQuery(this.grieinqModel);
      griedetResult.subscribe(griedetResultList => {
         if (griedetResultList.length === 0) {
            this.griedetData = [];
            this.retDisable = false;
            this.griDisabled = false;
            this.clearDisable = true;
            this.show('common.querycaused');
         } else {
            griedetResultList.forEach(element => {
               element['assignedStaffIdTxt'] = element.assignedStaffId ? String(element.assignedStaffId) : undefined;
               element['butDet'] = 'Details';
            });
                  this.griedetData = griedetResultList;
                  if (this.lastIndex) {
                        this.selected = this.lastIndex;
                        this.lastIndex = 0;
                  } else {
                        this.selected = 0;
                  }
                  this.retDisable = true;
                  this.griDisabled = true;
                  this.clearDisable = false;
         }
      });
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

   butAgyWhenButtonPressedTrigger() {

   }

   fromDateWhenValidateItemTrigger() {

   }

   fromDateKeyListvalTrigger() {
   }

   toDateWhenValidateItemTrigger() {
   }


   igRevWhenCheckboxChangedTrigger(event) {
      if (event.checked) {
         this.noSupervisorReviewed = false;
      }
   }

   igRespWhenCheckboxChangedTrigger(event) {
      if (event.checked) {
         this.supervisorReviewed = false;
      }
   }

   isClearDisabled() {
      if (this.grieinqModel.agyLocId ||
          this.grieinqModel.fromDate ||
          this.grieinqModel.toDate ||
          this.grieinqModel.grievType ||
          this.grieinqModel.grievanceId ||
          this.grieinqModel.grievLevel ||
          this.assignedStaffId || this.grieinqModel.userInvolvement ||
          this.supervisorReviewed || this.noSupervisorReviewed || !this.clearDisable) {
              return false;
          }
          return true;
  }


   grieInqWhenNewRecordInstanceTrigger() {
      this.oiigrievFactory.whenNewRecordInstance().subscribe(agyLocId => {
         if (agyLocId !== null && typeof agyLocId === 'string') {
            this.grieinqModel.agyLocId = agyLocId;
         } else {
            this.grieinqModel.agyLocId = '';
         }

      });
   }

   // To Remove Zeros from Number
   issueIdBlur() {
      if (this.grieinqModel.grievanceId) {
         const id = this.grieinqModel.grievanceId;
         this.grieinqModel.grievanceId = undefined;
         this.grieinqModel.grievanceId = Number(id + 0.1);
      } else {
         this.grieinqModel.grievanceId = undefined;
      }
   }

   reasonBlur() {
      if (!this.grieinqModel.grievReasonCode) {
         this.grieinqModel.grievReasonCode = this.grieinqModel.grievReasonCode === undefined ? '' : undefined;
      }
   }

   typeChange(event) {
      if (event && event.code) {
        this.rgGrieReasonRecordGroup = 'oiigriev/rgGrieReasonCodeRecordGroup?grievType=' +event.code;
        this.rgGrieTransactionRecordGroup='oiigriev/rgGrieTransactionTypeRecordGroup?grievType=' +event.code;
        this.grieinqModel.grievReasonCode = null;
      }
    }

    txnTypeBlur() {
      if (!this.grieinqModel.txnType) {
         this.grieinqModel.txnType = this.grieinqModel.txnType === undefined ? '' : undefined;
      }
   }
}
