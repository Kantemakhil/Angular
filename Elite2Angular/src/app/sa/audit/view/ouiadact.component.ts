import {
Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OuiadactService } from '../service/ouiadact.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { TagAuditFormGettabledetail } from '../beans/TagAuditFormGettabledetail';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
// import required bean declarations

@Component({
selector: 'app-ouiadact',
templateUrl: './ouiadact.component.html'
})

export class OuiadactComponent implements OnInit {
// Variable declaration
msgs: any[] = [];
gettabledetailData: TagAuditFormGettabledetail[] = [];
gettabledetailModel: TagAuditFormGettabledetail = new TagAuditFormGettabledetail();
gettabledetailModelSearch: TagAuditFormGettabledetail = new TagAuditFormGettabledetail();
gettabledetailIndex: Number = 0;
gettabledetailInsertList: TagAuditFormGettabledetail[] = [];
gettabledetailUpdatetList: TagAuditFormGettabledetail[] = [];
gettabledetailDeleteList: TagAuditFormGettabledetail[] = [];
statColumnDef: any[];
resCodColumnDef: any[];
getTableDetailColumnDef: any[];
resCodReadOnly: Boolean = false;
statReadOnly: Boolean = false;
ctrlBlockReadOnly: Boolean = false;
getTableDetailReadOnly: Boolean = false;
msglist: any[];
message: any;
type: any;
retriveDisable: boolean;
clearDisable: boolean;
selectedRow: number;
btnDisable: boolean;
parentCodeTitle = { 'description': this.translateService.translate('ouiadact.tableName') };
namesReadOnly: boolean;
    endTimeFlag: boolean;
    startTimeFlag: any;
constructor(private ouiadactFactory: OuiadactService, public translateService: TranslateService,
public sessionManager: UserSessionManager, public dialogService: DialogService) {
this.statColumnDef = [];
this.resCodColumnDef = [];
this.getTableDetailColumnDef = [];

}
ngOnInit() {
this.namesReadOnly = false;
this.retriveDisable = false;
this.btnDisable = true;
this.clearDisable = false;
this.getTableDetailColumnDef = [
{ fieldName: this.translateService.translate('ouiadact.dbsessionid'), field: 'sessionId', editable: false, width: 150 },
{ fieldName: this.translateService.translate('ouiadact.date'), field: 'stamp', editable: false, width: 150, datatype: 'date' },
{ fieldName: this.translateService.translate('ouiadact.time'), field: 'stamp', editable: false, width: 150, datatype: 'time' },
{ fieldName: this.translateService.translate('ouiadact.osusername'), field: 'osUser', editable: false, width: 150 },
{ fieldName: this.translateService.translate('ouiadact.dbusernama'), field: 'dbUser', editable: false, width: 150 },
{ fieldName: this.translateService.translate('ouiadact.clienthost'), field: 'clientip', editable: false, width: 150 },
];
this.gettabledetailModelSearch.pDateTo = DateFormat.getDate();
this.gettabledetailModelSearch.pDateFrom = DateFormat.getDate();
this.gettabledetailModelSearch.pDateFrom.setDate(this.gettabledetailModelSearch.pDateFrom.getDate() - 1);
this.gettabledetailModelSearch.pTimeFrom = DateFormat.getDate();
this.gettabledetailModelSearch.pTimeTo = DateFormat.getDate();
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
onRowClickgettabledetail(event) {
if(event){
this.btnDisable = false;
this.gettabledetailModel = event;
}

}
cancel() {
this.gettabledetailData = [];
this.gettabledetailModelSearch = new TagAuditFormGettabledetail();
this.retriveDisable = false;
this.clearDisable = true;
this.btnDisable = true;
this.namesReadOnly = false;
}
retriveBeforevlidations() {
const is = { valid: true };
if (!this.gettabledetailModelSearch.pDateFrom || this.gettabledetailModelSearch.pDateFrom === undefined) {
this.type = 'warn';
this.message = this.translateService.translate('ouiadact.fromdatemandatoryvalidation');
this.show(this.message);
is.valid = false;
return is.valid;
}
if (!this.gettabledetailModelSearch.pDateTo || this.gettabledetailModelSearch.pDateTo === undefined) {
this.type = 'warn';
this.message = this.translateService.translate('ouiadact.todatemandatoryvalidation');
this.show(this.message);
is.valid = false;
return is.valid;
}
if ((!this.gettabledetailModelSearch.pTimeFrom || this.gettabledetailModelSearch.pTimeFrom === undefined)
 || (!this.gettabledetailModelSearch.pTimeTo || this.gettabledetailModelSearch.pTimeTo === undefined)) {
this.type = 'warn';
this.message = this.translateService.translate('ouiadact.timemandatoryvalidation');
this.show(this.message);
is.valid = false;
return is.valid;
}
if (!this.gettabledetailModelSearch.pTableName || this.gettabledetailModelSearch.pTableName === undefined) {
this.type = 'warn';
this.message = this.translateService.translate('ouiadact.tablenamemandatoryvalidation');
this.show(this.message);
is.valid = false;
return is.valid;
}
return is.valid;
}
gettabledetailExecuteQuery(date?, dateOne?, time?, timeOne?) {
if (!this.retriveBeforevlidations()) {
return;
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
            this.show(this.translateService.translate('ouiadact.hourmustmsg'), 'warn');
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
            this.show(this.translateService.translate('ouiadact.hourmustmsg'), 'warn');
            return;
         }
      }
      if (this.gettabledetailModelSearch.pDateFrom && this.gettabledetailModelSearch.pDateTo &&
         (DateFormat.compareDate(this.gettabledetailModelSearch.pDateFrom,
         this.gettabledetailModelSearch.pDateTo) === 1)) {
         this.type = 'warn';
         this.message = this.translateService.translate('ouiadact.datesvalidationmsg');
         this.show(this.message);
         return;
         }
const gettabledetailResult = this.ouiadactFactory.
getTableDetailExecuteQuery(this.gettabledetailModelSearch);
gettabledetailResult.subscribe(gettabledetailResultList => {
if (gettabledetailResultList.length === 0) {
this.gettabledetailData = [];
this.retriveDisable = false;
this.namesReadOnly = false;
this.clearDisable = false;
this.show('common.querycaused');
} else {
this.gettabledetailData = gettabledetailResultList;
this.gettabledetailModel = gettabledetailResultList[0];
this.selectedRow = 0;
this.retriveDisable = true;
this.clearDisable = false;
this.namesReadOnly = true;
}
});
}

startDateBlur() {
if (!this.gettabledetailModelSearch.pDateFrom) {
this.gettabledetailModelSearch.pDateFrom = this.gettabledetailModelSearch.pDateFrom === null ? undefined : null;
}
}
endDateBlur() {
if (!this.gettabledetailModelSearch.pDateTo) {
this.gettabledetailModelSearch.pDateTo = this.gettabledetailModelSearch.pDateTo === null ? undefined : null;
}
}

tableNameBlur() {
if (!this.gettabledetailModelSearch.pTableName) {
this.gettabledetailModelSearch.pTableName = this.gettabledetailModelSearch.pTableName === undefined ? '' : undefined;
}
}
startTimeBlur(time?) {
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
endTimeBlur(time?) {
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

ouiauses = () => {
const object = this.ouiadactFactory.getStaffName(this.gettabledetailModel);
object.subscribe(data => {
if (data) {
this.dialogService.openLinkDialog('/OUIAUSES', data, 80).subscribe(result => {
if (result) {
}
});
}

});
}

validateDates() {
if (this.gettabledetailModelSearch.pDateFrom && this.gettabledetailModelSearch.pDateTo &&
(DateFormat.compareDate(this.gettabledetailModelSearch.pDateFrom,
this.gettabledetailModelSearch.pDateTo) === 1)) {
this.type = 'warn';
this.message = this.translateService.translate('ouiadact.datesvalidationmsg');
this.show(this.message);
}
}

}
