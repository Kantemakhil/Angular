import {
Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OuiauactService } from '../service/ouiauact.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { SysTagAuditFormGetUserDetail } from '@sa/audit/beans/SysTagAuditFormGetUserDetail';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { TimeFormat } from '@ui-components/time/timeFormat';
// import required bean declarations

@Component({
selector: 'app-ouiauact',
templateUrl: './ouiauact.component.html',

})

export class OuiauactComponent implements OnInit {
// Variable declaration
actionName: string;
lovModel: any[];
msgs: any[] = [];
nameOfLovPage: string;
listToCompare: any[] = [];
getuserdetailData: SysTagAuditFormGetUserDetail[] = [];
getuserdetailDataTemp: SysTagAuditFormGetUserDetail[] = [];
// TODO angular.copy(this.getuserdetailData, thisgetuserdetailDataTemp);
getuserdetailModel: SysTagAuditFormGetUserDetail = new SysTagAuditFormGetUserDetail();
getuserdetailIndex = 0;
getuserdetailInsertList: SysTagAuditFormGetUserDetail[] = [];
getuserdetailUpdatetList: SysTagAuditFormGetUserDetail[] = [];
getuserdetailDeleteList: SysTagAuditFormGetUserDetail[] = [];
ctrlblockModel = new SysTagAuditFormGetUserDetail();
display: boolean;
errorMessage: string;
headerMessage: string;
disabled: boolean;
editable = true;
getUserDetailColumnDef: any[];
ctrlBlockReadOnly = false;
getUserDetailReadOnly = false;
rgstfmemberRg: any[] = [];
type: string;
message: any;
retriveDisable = false;
detailBtnDis = true;
tableIndex: number;
startTimeFlag: boolean;
constructor(private ouiauactFactory: OuiauactService,
public translateService: TranslateService,
public sessionManager: UserSessionManager,
private dialogService: DialogService) {
// TODO initilize data members here..!
this.getUserDetailColumnDef = [];
}
ngOnInit() {
this.getUserDetailColumnDef = [
{ fieldName: this.translateService.translate('ouiadact.dbsessionid'), field: 'sessionId', editable: false, width: 150 },
{ fieldName: this.translateService.translate('ouiadact.date'), field: 'stamp', editable: false, width: 150, datatype: 'date' },
{ fieldName: this.translateService.translate('ouiadact.time'), field: 'time', editable: false, width: 100, datatype: 'time' },
{ fieldName: this.translateService.translate('ouiadact.osusername'), field: 'osUsername', editable: false, width: 150 },
{ fieldName: this.translateService.translate('ouiadact.clienthost'), field: 'clientHost', editable: false, width: 150 },
];
this.ctrlblockModel.toDate = DateFormat.getDate();
this.ctrlblockModel.fromDate = DateFormat.getDate();
this.ctrlblockModel.fromDate.setDate(this.ctrlblockModel.fromDate.getDate() - 1);
this.ctrlblockModel.fromTime = DateFormat.getDate();
this.ctrlblockModel.toTime = DateFormat.getDate();
}
// TODO all initializations here

validateRow = (event) => {
const rowdata = new ValidateRowReturn();
return rowdata;
} /** 
* This function displays the messages
*/
show(vldmsg, type?) {
type = type ? type : 'warn';
vldmsg = this.translateService.translate(vldmsg);
const msgval = [{ message: vldmsg, type: type }];
this.msgs = [...msgval];
}
startDateBlur() {
if (!this.ctrlblockModel.fromDate) {
this.ctrlblockModel.fromDate = this.ctrlblockModel.fromDate === null ? undefined : null;
}
}
endDateBlur() {
if (!this.ctrlblockModel.toDate) {
this.ctrlblockModel.toDate = this.ctrlblockModel.toDate === null ? undefined : null;
}
}
get clrBtnFlag() {
if (this.getuserdetailData.length === 0 && !this.ctrlblockModel.fromDate &&
!this.ctrlblockModel.toDate && !this.ctrlblockModel.fromTime && !this.ctrlblockModel.toTime &&
!this.ctrlblockModel.staffName) {
return true;
} else {
return false;
}
}
get readeOnlyFields() {
if (this.getuserdetailData.length === 0) {
return false;
} else {
return true;
}
}
onFromDateBlur() {
if (!this.ctrlblockModel.fromDate) {
this.ctrlblockModel.fromDate = this.ctrlblockModel.fromDate === null ? undefined : null;
}

}
onToDateBlur() {
if (!this.ctrlblockModel.toDate) {
this.ctrlblockModel.toDate = this.ctrlblockModel.toDate === null ? undefined : null;
}
}

startTimeBlur(time?) {
this.startTimeFlag = false;
if (time && time.value) {
if (time.value.substring(0, 2) > 23) {
    
if (time.value.substring(0, 1) == 2 && time.value.substring(1, 2) > 3) {
time.value = time.value.replace(time.value[1], '3').replace(time.value[3], '5').replace(time.value[4], '9');
}

} else {
    if(time.value[1] === '_' && time.value[3] === '_'  && time.value[4] === '_' ){
      time.value = time.value.replace(time.value[1], time.value[0]).replace(time.value[0], '0').replace(time.value[3], '0')
      .replace(time.value[4], '0');
    } else if (time.value[3] === '_'  && time.value[4] === '_'){
      time.value = time.value.replace(time.value[3], '0').replace(time.value[4], '0');
    }

}
}
}
endTimeBlur(time?) {
this.startTimeFlag = false;
if (time && time.value) {
if (time.value.substring(0, 2) > 23) {
if (time.value.substring(0, 1) == 2 && time.value.substring(1, 2) > 3) {
    time.value = time.value.replace(time.value[1], '3').replace(time.value[3], '5').replace(time.value[4], '9');

}
} else {
    if(time.value[1] === '_' && time.value[3] === '_'  && time.value[4] === '_' ){
      time.value = time.value.replace(time.value[1], time.value[0]).replace(time.value[0], '0').replace(time.value[3], '0')
      .replace(time.value[4], '0');
    } else if (time.value[3] === '_'  && time.value[4] === '_'){
      time.value = time.value.replace(time.value[3], '0').replace(time.value[4], '0');
    }

}
}

}
validateDates() {

if (this.ctrlblockModel.fromDate && this.ctrlblockModel.toDate) {
if (DateFormat.compareDate(DateFormat.getDate(this.ctrlblockModel.fromDate),
DateFormat.getDate(this.ctrlblockModel.toDate)) > 0) {
this.show('ouiauact.dateerror');
return false;
}

if (DateFormat.compareDate(DateFormat.getDate(this.ctrlblockModel.fromDate),DateFormat.getDate(this.ctrlblockModel.toDate)) === 0 
&&  DateFormat.compareTime(DateFormat.getDate(this.ctrlblockModel.fromTime), DateFormat.getDate(this.ctrlblockModel.toTime)) > 0 ) {
    this.show('ouiauact.dateerror');
    return false;
}
}

return true;
}
onRowClickgetuserdetail(event) {
if (event) {
this.getuserdetailModel = event;
this.getuserdetailModel.staffName = this.ctrlblockModel.staffName;
}
}


getuserdetailExecuteQuery() {
if (this.ctrlblockModel.fromTime && this.ctrlblockModel.fromDate) {
this.ctrlblockModel.fromTime = DateFormat.getDate(this.ctrlblockModel.fromTime);
const strTimeValue = this.ctrlblockModel.fromTime.getHours() + ':' + this.ctrlblockModel.fromTime.getMinutes();
this.ctrlblockModel.fromTime = TimeFormat.parse(strTimeValue, this.ctrlblockModel.fromDate);
}
if (this.ctrlblockModel.toTime && this.ctrlblockModel.toDate) {
this.ctrlblockModel.toTime = DateFormat.getDate(this.ctrlblockModel.toTime);
const strTimeValue = this.ctrlblockModel.toTime.getHours() + ':' + this.ctrlblockModel.toTime.getMinutes();
this.ctrlblockModel.toTime = TimeFormat.parse(strTimeValue, this.ctrlblockModel.toDate);
}
const getuserdetailResult = this.ouiauactFactory.getUserDetailExecuteQuery(this.ctrlblockModel);
getuserdetailResult.subscribe(getuserdetailResultList => {
if (getuserdetailResultList.length === 0) {
this.getuserdetailData = [];
this.detailBtnDis = true;
this.show(this.translateService.translate('common.querycaused'));
} else {
this.getuserdetailData = getuserdetailResultList;
getuserdetailResultList.forEach(element => {
if (element.stamp) {
element.stamp = DateFormat.getDate(element.stamp);
element.time = element.stamp;

}

});
this.getuserdetailModel = getuserdetailResultList[0];
this.retriveDisable = true;
this.detailBtnDis = false;
this.tableIndex = 0;
}
});
}

getDetails(fromDate?, toDate?) {
if (fromDate) {
if (String(fromDate.lastValue).indexOf('_') >= 0 && fromDate.value === null) {
this.type = 'info';
this.message = this.translateService.translate('common.datemustbeentervalidformat');
this.show(this.message, this.type);
return false;
}
}
if (toDate) {
if (String(toDate.lastValue).indexOf('_') >= 0 && toDate.value === null) {
this.type = 'info';
this.message = this.translateService.translate('common.datemustbeentervalidformat');
this.show(this.message, this.type);
return false;
}
}
if (!this.ctrlblockModel.fromDate) {
this.show(this.translateService.translate('ouiauact.fromdatemust'));
return false;
}
if (!this.ctrlblockModel.toDate) {
this.show(this.translateService.translate('ouiauact.todatemust'));
return false;
}
if (!this.validateDates()) {
return false;
}
if (!this.ctrlblockModel.fromTime || !this.ctrlblockModel.toTime) {
this.show('ouiauact.timemust');
return false;
}
if (!this.ctrlblockModel.staffName) {
this.show('ouiauact.staffmembermust');
return false;
}
this.getuserdetailExecuteQuery();


}
onClear() {
this.ctrlblockModel = new SysTagAuditFormGetUserDetail();
this.getuserdetailData = [];
this.retriveDisable = false;
this.detailBtnDis = true;

}
onStaffMemberClick = () => {
this.dialogService.openLinkDialog('/OIUSMSEL', this.ctrlblockModel, 80).subscribe(result => {
if (result && result.staffmembers) {
this.ctrlblockModel.userId = result.staffmembers.userId;
this.ctrlblockModel.staffName = result.staffmembers.lastName + ',' + result.staffmembers.firstName;
}
});
}
onGetDetailsClick = () => {
this.dialogService.openLinkDialog('/OUIAUSES', this.getuserdetailModel, 80).subscribe(result => {
if (result) {

}
});
}

}
