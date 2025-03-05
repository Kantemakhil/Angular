
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumbadmiService } from '../service/oumbadmi.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderBookingsCommitBean } from '@inst/demographics-biometrics/beans/OffenderBookingsCommitBean';
import { OffenderBookings } from '@inst/demographics-biometrics/beans/OffenderBookings';
import { VBookAdmin } from '@sa/recordmaintenance/beans/VBookAdmin';

@Component({
selector: 'app-oumbadmi',
templateUrl: './oumbadmi.component.html'
})

export class OumbadmiComponent implements OnInit {
@ViewChild('grid', {static: true}) grid: any;
@ViewChild('gridOne', {static: true}) gridOne: any;
actionName: string;
lovModel: any[];
msgs: any[] = [];
nameOfLovPage: string;
listToCompare: any[] = [];
vbookadmData: VBookAdmin[] = [];
vbookadmModel: VBookAdmin = new VBookAdmin();
vbookadmModelSearch: VBookAdmin = new VBookAdmin();

vbookadmInsertList: VBookAdmin[] = [];
vbookadmUpdatetList: VBookAdmin[] = [];
vbookadmDeleteList: VBookAdmin[] = [];
offcontactsData: OffenderBookings[] = [];
offcontactsModel: OffenderBookings = new OffenderBookings();
offcontactsInsertList: OffenderBookings[] = [];
offcontactsUpdatetList: OffenderBookings[] = [];
offcontactsDeleteList: OffenderBookings[] = [];
display: boolean;
errorMessage: string;
headerMessage: string;
disabled: boolean;
offContactsColumnDef: any[];
vBookAdmColumnDef: any[];
offContactsReadOnly: false;
cgfkOffcontactsbookingstatRg: any[] = [];
msglist: any[];
offcontactsCommitModel: OffenderBookingsCommitBean = new OffenderBookingsCommitBean();
statusLov = {
code: this.translateService.translate('common.code'),
description: this.translateService.translate('common.description')
};
tableIndex: number;
clearDisabled: boolean;
retriveDisabled: boolean;
namesReadOnly: boolean;
constructor(private oumbadmiFactory: OumbadmiService, public translateService: TranslateService,
public sessionManager: UserSessionManager) {
this.offContactsColumnDef = [];
}
ngOnInit() {
this.retriveDisabled = false;
this.clearDisabled = true;
this.namesReadOnly = false;

this.vBookAdmColumnDef = [
{
fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false,
width: 150
},
{
fieldName: this.translateService.translate('common.lastname'), field: 'lastName', editable: false, width: 150,
datatype: 'text', maxlength: 35
},
{
fieldName: this.translateService.translate('common.firstname'), field: 'firstName', editable: true, width: 150,
datatype: 'text', maxlength: 35
},
{
fieldName: this.translateService.translate('common.middlename'), field: 'middleName', editable: false, width: 150,
datatype: 'text', maxlength: 35
},
{
fieldName: this.translateService.translate('oumbadmi.suffix'), field: 'suffix', editable: false, width: 150,
datatype: 'text', maxlength: 35
},
{
fieldName: this.translateService.translate('oumbadmi.dateofbirth'), field: 'birthDate', editable: false, width: 150,
datatype: 'date'
},
];

this.offContactsColumnDef = [
{
fieldName: this.translateService.translate('common.createdate'), field: 'bookingBeginDate', editable: false, width: 150,
datatype: 'date'
},
{
fieldName: this.translateService.translate('system-profile.book-id'), field: 'bookingNo', editable: false, width: 150
},
{
fieldName: this.translateService.translate('oumbadmi.bookingstatus'), field: 'bookingStatus', editable: true, width: 150,
datatype: 'lov', domain: 'BOOK_STS',
titles: this.statusLov
},
{ fieldName: this.translateService.translate('oumbadmi.activeinstitution'), field: 'activeFlag', editable: false, width: 150 },
{
fieldName: this.translateService.translate('oumbadmi.activecommunity'), field: 'communityActiveFlag', editable: false,
width: 150, datatype: 'text'
},
{
fieldName: this.translateService.translate('oumbadmi.institution'), field: 'agyLocId', editable: false, width: 150,
datatype: 'text'
},
{
fieldName: this.translateService.translate('oumbadmi.community'), field: 'intakeAgyLocId', editable: false, width: 150,
datatype: 'text'
},
];
//this.vbookadmExecuteQuery();

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
onRowClickBookAdm(event) {
if (event) {
this.vbookadmModel = event;
this.offcontactsModel.rootOffenderId = this.vbookadmModel.rootOffenderId;
}
if (this.offcontactsModel.rootOffenderId) {
this.offcontactsExecuteQuery();

}
}
vbookadmExecuteQuery(date?) {
if (!this.vbookadmModelSearch.offenderIdDisplay && !this.vbookadmModelSearch.lastName
&& !this.vbookadmModelSearch.firstName && !this.vbookadmModelSearch.birthDate) {
this.show(this.translateService.translate('oumbadmi.anyonefieldmandatory'), 'warn');
return;
}
if (date) {
if (date.lastValue === '0_/__/____') {
this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
this.vbookadmModelSearch.birthDate = null;
this.clearDisabled = false;
return;
}
if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
this.vbookadmModelSearch.birthDate = null;
this.clearDisabled = false;
return;
}
}
const vbookadmResult = this.oumbadmiFactory.vBookAdmExecuteQuery(this.vbookadmModelSearch);
vbookadmResult.subscribe(data => {
if (data.length === 0) {
this.vbookadmData = [];
this.retriveDisabled = false;
this.namesReadOnly = false;
this.show('common.querycaused');
this.clear();
} else {
this.vbookadmData = data;
this.vbookadmModel = data[0];
this.tableIndex = 0;
this.retriveDisabled = true;
this.clearDisabled = false;
this.namesReadOnly = true;
}
});
}
clear() {
this.vbookadmData = [];
this.vbookadmModelSearch = new VBookAdmin();
this.vbookadmModel = new VBookAdmin();
this.offcontactsData = [];
this.offcontactsModel = new OffenderBookings();
this.retriveDisabled = false;
this.clearDisabled = true;
this.namesReadOnly = false;
/*  this.senupdData = [];
 this.senupdModel = new SentenceUpdateReasons();
 this.retriveDisabled = false;
 this.clearDisabled = true;
 this.namesReadOnly = false;
 this.delRecVar = false;
 this.expiryDate = undefined;
 this.enableIfRowDatExist = false; */
}

isInsertable(date?) {
if (this.vbookadmModelSearch.offenderIdDisplay || this.vbookadmModelSearch.lastName || this.vbookadmModelSearch.firstName
|| this.vbookadmModelSearch.birthDate) {
this.clearDisabled = false;
} else {
this.clearDisabled = true;
}
// if (date) {
//     this.clearDisabled = false;
// }
}

offcontactsExecuteQuery() {
this.vbookadmModel.rootOffenderId = this.offcontactsModel.rootOffenderId;
const offcontactsResult = this.oumbadmiFactory.offContactsExecuteQuery(this.offcontactsModel);
offcontactsResult.subscribe(data => {
if (data.length === 0) {
this.offcontactsData = [];
} else {
this.offcontactsData = data;
this.offcontactsModel = data[0];
this.tableIndex = 0;
}
});
}

oumformsValidationsFaf() {
const is = { valid: true };
for (let i = 0; i < this.offcontactsData.length; i++) {
for (let j = 0; j < this.offcontactsData.length; j++) {
if (i !== j && this.offcontactsData[i].offenderId === this.offcontactsData[j].offenderId &&
this.offcontactsData[i].bookingStatus === 'O' && this.offcontactsData[j].bookingStatus === 'O') {
this.show('oumbadmi.onlyonebookinginstancetime');
is.valid = false;
return is.valid;
}
}
}
}
/**
 *  This function will be executed when commit event is
* fired
*/
oumbadmiSaveoffcontactsForm(event) {
// if (!this.oumformsValidationsFaf()) {
// return;
// }
this.offcontactsInsertList = event.added;
this.offcontactsUpdatetList = event.updated;
this.offcontactsDeleteList = event.removed;
this.offcontactsCommitModel.insertList = [];
this.offcontactsCommitModel.updateList = [];
this.offcontactsCommitModel.deleteList = [];
if (this.offcontactsInsertList.length > 0 || this.offcontactsUpdatetList.length > 0) {
for (let i = 0; i < this.offcontactsInsertList.length; i++) {
}
for (let i = 0; i < this.offcontactsUpdatetList.length; i++) {
}
this.offcontactsCommitModel.insertList = this.offcontactsInsertList;
this.offcontactsCommitModel.updateList = this.offcontactsUpdatetList;
}
if (this.offcontactsDeleteList.length > 0) {
for (let i = 0; i < this.offcontactsDeleteList.length; i++) {

}
this.offcontactsCommitModel.deleteList = this.offcontactsDeleteList;
}
const offcontactsSaveData = this.oumbadmiFactory.offContactsCommit(this.offcontactsCommitModel);
offcontactsSaveData.subscribe(data => {
if (data === 3) {
this.show('oumbadmi.onlyonebookinginstancetime');
this.offcontactsExecuteQuery();
return;
} else
if (data === 1) {
this.show('common.addupdateremoverecordsuccess', 'success');
this.offcontactsExecuteQuery();
return;
} else {
this.show('common.addupdateremoverecordfailed');
this.offcontactsExecuteQuery();
return;
}
});
}

onlyAlphabetallowed(event:any){
    let charcode = event.keyCode;
    if (charcode == 39  || charcode == 32 || charcode == 45 || (charcode >= 65 && charcode <= 90) || (charcode >= 97 && charcode <= 122)){
        return true; //validation for " ' , a-z , A-Z "
    }  
    return false;
}
}

