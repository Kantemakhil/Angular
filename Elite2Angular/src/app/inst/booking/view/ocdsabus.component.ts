import {
Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdsabusService } from '../service/ocdsabus.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderSubstanceUses } from '@inst/booking/beans/OffenderSubstanceUses';
import { OffenderSubstanceDetails } from '@inst/booking/beans/OffenderSubstanceDetails';
import { OffenderSubstanceTreatments } from '@inst/booking/beans/OffenderSubstanceTreatments';
import { OffenderSubstanceDetailsCommitBean } from '@inst/booking/beans/OffenderSubstanceDetailsCommitBean';
import { OffenderSubstanceTreatmentsCommitBean } from '@inst/booking/beans/OffenderSubstanceTreatmentsCommitBean';
import { OffenderSubstanceUsesCommitBean } from '@inst/booking/beans/OffenderSubstanceUsesCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
@Component({
selector: 'app-ocdsabus',
templateUrl: './ocdsabus.component.html'
// styleUrls: ['./ocdsabus.component.css']
})

export class OcdsabusComponent implements OnInit {
// Variable declaration
actionName: string;
lovModel: any[];
msgs: any[] = [];
nameOfLovPage: string;
listToCompare: any[] = [];
offsuData: OffenderSubstanceUses[] = [];
offsuDataTemp: OffenderSubstanceUses[] = [];
// TODO angular.copy(this.offsuData, thisoffsuDataTemp);
offsuModel: OffenderSubstanceUses = new OffenderSubstanceUses();
offsuIndex = 0;
offsdCommitModel: OffenderSubstanceDetailsCommitBean = new OffenderSubstanceDetailsCommitBean();
offsuCommitModel: OffenderSubstanceUsesCommitBean = new OffenderSubstanceUsesCommitBean();
offsuInsertList: OffenderSubstanceUses[] = [];
offsuUpdatetList: OffenderSubstanceUses[] = [];
offsuDeleteList: OffenderSubstanceUses[] = [];
offsdData: OffenderSubstanceDetails[] = [];
offsdDataTemp: OffenderSubstanceDetails[] = [];
// TODO angular.copy(this.offsdData, thisoffsdDataTemp);
offsdModel: OffenderSubstanceDetails = new OffenderSubstanceDetails();
offsdIndex = 0;
offsdInsertList: OffenderSubstanceDetails[] = [];
offsdUpdatetList: OffenderSubstanceDetails[] = [];
offsdDeleteList: OffenderSubstanceDetails[] = [];
offstData: OffenderSubstanceTreatments[] = [];
offstDataTemp: OffenderSubstanceTreatments[] = [];
// TODO angular.copy(this.offstData, thisoffstDataTemp);
offstModel: OffenderSubstanceTreatments = new OffenderSubstanceTreatments();
offstIndex = 0;
offstCommitModel: OffenderSubstanceTreatmentsCommitBean = new OffenderSubstanceTreatmentsCommitBean();
offstInsertList: OffenderSubstanceTreatments[] = [];
offstUpdatetList: OffenderSubstanceTreatments[] = [];
offstDeleteList: OffenderSubstanceTreatments[] = [];
display: boolean;
errorMessage: string;
headerMessage: string;
disabled: boolean;
offSdInsert: boolean;
offSdDelete: boolean;
offSdUpdate: boolean;
offStInsert: boolean;
ofStDelete: boolean;
offStUpdate: boolean;
editable = true;
offSdColumnDef: any[];
offStColumnDef: any[];
offSuColumnDef: any[];
offSuReadOnly = false;
offSdReadOnly = false;
offStReadOnly = false;
ageRg: any[] = [];
lsourceinfoRg: any[] = [];
cgfkOffsudspdescriptionRg: any[] = [];
cgfkOffstdspdescription3Rg: any[] = [];
cgfkOffstdspdescriptionRg: any[] = [];
cgfkOffsddspdescriptionRg: any[] = [];
type: string;
message: string;
index: any;
offStGridDelete = false;
offSdGridDelete = false;
offSuGridDelete = false;
offSuInsert = false;
treatmentTitles = {
'code': this.translateService.translate('ocdsabus.treatmenlov'),
'description': this.translateService.translate('ocdsabus.treatment')
};


levelTitles = {
'code': this.translateService.translate('ocdsabus.levelov'),
'description': this.translateService.translate('ocdsabus.levelovcode')
};

substanceTitle = {
'description': this.translateService.translate('common.description'),
};

vHeaderBlockModel: VTrustHeader = new VTrustHeader();
constructor(private ocdsabusFactory: OcdsabusService,
public translateService: TranslateService,
public sessionManager: UserSessionManager,
private offenderSearchService: OffenderSearchService) {
this.offSdColumnDef = [];
this.offStColumnDef = [];
this.offSuColumnDef = [];
}
ngOnInit() {
this.offSdColumnDef = [
{ fieldName: this.translateService.translate('ocdsabus.line'), field: 'seqNumber', editable: false, width: 150, },
{
fieldName: this.translateService.translate('ocdsabus.period'), field: 'usePeriod', editable: true, width: 150
, datatype: 'text', maxlength: 32, uppercase: 'false'
},
{
fieldName: this.translateService.translate('ocdsabus.levelofuse'), field: 'useLevel', editable: true, width: 150,
datatype: 'lov', domain: 'CONSUMPTION', titles: this.levelTitles
},
{
fieldName: this.translateService.translate('ocdsabus.sourceofinform'), field: 'sourceOfInfo',
editable: true, width: 150, datatype: 'lov', domain: 'SUBSTAN_INFO'
},
{
fieldName: this.translateService.translate('ocdsabus.comment'), field: 'commentText', editable: true, width: 150,
datatype: 'text', maxlength: 240, uppercase: 'false'
},
{ fieldName: this.translateService.translate('ocdsabus.caseload'), field: 'nbtCaseloadType', editable: false, width: 150 },

{ fieldName: this.translateService.translate('ocdsabus.caseload'), field: 'caseloadType', editable: false, width: 150, hide: true },


];
this.offStColumnDef = [
{
fieldName: this.translateService.translate('ocdsabus.treatmentrec'), field: 'treatmentCode', editable: true, width: 150
, datatype: 'lov', domain: 'SUBS_TREAT', titles: this.treatmentTitles
},
{
fieldName: this.translateService.translate('ocdsabus.provider'), field: 'treatmentPlace', editable: true, width: 150
, datatype: 'text', maxlength: 40, uppercase: 'false'
},

{
fieldName: this.translateService.translate('ocdsabus.fromdate'), field: 'treatmentFromDate',
editable: true, width: 150, datatype: 'date'
},
{
fieldName: this.translateService.translate('ocdsabus.todate'), field: 'treatmentToDate',
editable: true, width: 150, datatype: 'date'
},

{
fieldName: this.translateService.translate('ocdsabus.comment'), field: 'commentText', editable: true, width: 150
, datatype: 'text', maxlength: 240, uppercase: 'false'
},
{ fieldName: this.translateService.translate('ocdsabus.caseload'), field: 'nbtCaseloadType', editable: false, width: 150 },

{ fieldName: this.translateService.translate('ocdsabus.caseload'), field: 'caseloadType', editable: false, width: 150, hide: true },


];
this.offSuColumnDef = [
{
fieldName: this.translateService.translate('ocdsabus.substance'), field: 'substanceType', editable: true, width: 150,
datatype: 'lov', domain: 'SUBSTANCE', cellEditable: this.canSubstanceTypeEdit
},
{
fieldName: this.translateService.translate('ocdsabus.agefirst'), field: 'ageUsed', editable: true,
width: 150, maxValue: '999', strictFP: true, whole: true, datatype: 'number'
},
{ fieldName: this.translateService.translate('ocdsabus.caseload'), field: 'nbtCaseloadType', editable: false, width: 150 },

{ fieldName: this.translateService.translate('ocdsabus.caseload'), field: 'caseloadType', editable: false, width: 150, hide: true },

];
this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
if (!this.offenderSearchService.selectedOffender || this.offenderSearchService.selectedOffender.offenderBookId === undefined) {
this.show('common.pleasesearchforvalidoffender');
}
// TODO all initializations here
}


validateRow = (event) => {
const rowdata = new ValidateRowReturn();
return rowdata;
}  /**
  * This function displays the messages
  */
show(vldmsg, type?) {
type = type ? type : 'warn';
vldmsg = this.translateService.translate(vldmsg);
const msgval = [{ message: vldmsg, type: type }];
this.msgs = [...msgval];
}

enableInsert() {
if (this.offsuModel.createDatetime) {
this.offSdInsert = true;
this.offStInsert = true;
} else {
this.offSdInsert = false;
this.offStInsert = false;
}
}

onRowClickoffsu(event) {
if (event) {
this.offsuModel = event;
this.offsdData = [];
this.offstData = [];
if (event.createDatetime) {
this.offSdExecuteQuery();
this.offstExecuteQuery();
this.offSuGridDelete = true;
} else {
this.offSuGridDelete = false;
}
this.enableInsert();
} else {
  this.offSdInsert = false;
  this.offStInsert = false;
}
}
onRowClickoffsd(event) {
if (event) {
this.offsdModel = event;
if (event.createDatetime) {
this.offSdGridDelete = true;
} else {
this.offSdGridDelete = false;
}
}
}
onRowClickoffst(event) {
if (event) {
this.offstModel = event;
if (event.createDatetime) {
this.offStGridDelete = true;
} else {
this.offStGridDelete = false;
}
}
}
onOffSuGridInsert = () => {
// if (!this.offSuGridValidation()) {
// return;
// }
return {};
}

onOffSdGridInsert = () => {
if (!this.offSdGridValidation()) {
return;
}
return {};
}


onOffStGridInsert = () => {
if (!this.offStGridValidation()) {
return;
}
return {};
}

canSubstanceEdit = (data: any, index: number, field: string): boolean => {
if (!data.createDatetime) {
return true;
} else {
return false;
}
}
canSubstanceTypeEdit = (data: any, index: number, field: string): boolean => {
  if (!data.createDatetime) {
  return true;
  } else {
    if(this.offsdData.length === 0 && this.offstData.length === 0){
      return true;
    } 
  return false;
  }
  }

offStGridValidation() {
const is = { valid: true };
this.offstData.forEach(data => {
if (is.valid) {
if (!data.treatmentCode) {
this.type = 'warn';
this.message = this.translateService.translate('ocdsabus.treatmentmust');
this.show(this.message, this.type);
is.valid = false;
return;
}
if (!data.treatmentPlace) {
this.type = 'warn';
this.message = this.translateService.translate('ocdsabus.providermust');
this.show(this.message, this.type);
is.valid = false;
return;
}
if (!data.treatmentFromDate) {
this.type = 'warn';
this.message = this.translateService.translate('ocdsabus.fromdatemust');
this.show(this.message, this.type);
is.valid = false;
return;
}
if (data.treatmentFromDate) {
if (!this.validateDate(data.treatmentFromDate, data.treatmentToDate)) {
is.valid = false;
return;
}
}
}
});
return is.valid;
}
offSdGridValidation() {
const is = { valid: true };
this.offsdData.forEach(data => {
if (is.valid) {
if (!data.useLevel) {
this.type = 'warn';
this.message = this.translateService.translate('ocdsabus.uselevelmust');
this.show(this.message, this.type);
is.valid = false;
return;
}
}
});
return is.valid;

}

validateOffSuRowData = (event) => {
const rowIndex = event.rowIndex;
const rowdata = new ValidateRowReturn();
if (event.field === 'ageUsed') {
if ( (event.data.ageUsed === 0) || (event.data.ageUsed > this.vHeaderBlockModel.age)) {
this.type = 'warn';
this.message = this.translateService.translate('ocdsabus.ageerror') + ' ' + this.vHeaderBlockModel.age;
this.show(this.message, this.type);
}

}
this.enableInsert();
rowdata.validated = true;
return rowdata;
}
offSuGridValidation(event) {
const is = { valid: true };
event.forEach(data => {
if (is.valid) {
if (!data.substanceType) {
this.type = 'warn';
this.message = this.translateService.translate('ocdsabus.substancemust');
this.show(this.message, this.type);
is.valid = false;
return;
}
if ( (data.ageUsed === 0 || data.ageUsed > this.vHeaderBlockModel.age)) {
this.type = 'warn';
this.message = this.translateService.translate('ocdsabus.ageerror') + ' ' + this.vHeaderBlockModel.age;
this.show(this.message, this.type);
is.valid = false;
return;

}
}
});
return is.valid;
}

onOffenderChange(offender) {
this.vHeaderBlockModel = offender;
this.offsuData = [];
this.offsdData = [];
this.offstData = [];
this.offSuInsert = false;
this.offSdInsert = false;
this.offStInsert = false;

if (offender) {
this.offsuModel = new OffenderSubstanceUses();
this.offsdModel = new OffenderSubstanceDetails();
this.offstModel = new OffenderSubstanceTreatments();
this.offsuData = [];
this.offsdData = [];
this.offstData = [];
this.offSuInsert = true;
this.offsuModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
this.offsuModel.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
this.offsuModel.caseloadType = this.sessionManager.currentCaseLoadType;

this.offsdModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
this.offsdModel.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
this.offsdModel.caseloadType = this.sessionManager.currentCaseLoadType;
this.offstModel.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
this.offstModel.caseloadType = this.sessionManager.currentCaseLoadType;
this.offstModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;


this.offSuExecuteQuery();

} else {
this.offsuModel = new OffenderSubstanceUses();
this.offsdModel = new OffenderSubstanceDetails();
this.offstModel = new OffenderSubstanceTreatments();
this.offsuData = [];
this.offsdData = [];
this.offstData = [];
}
}

/**
 *  This function will be executed when commit event is
* fired
*/
offSuComitt(event) {
// TODO declare commit bean and add insert list to that object.
this.offsuInsertList = event.added;
this.offsuUpdatetList = event.updated;
this.offsuDeleteList = event.removed;
this.offsuCommitModel.insertList = [];
this.offsuCommitModel.updateList = [];
this.offsuCommitModel.deleteList = [];
  if (this.offsuInsertList.length > 0) {
    if (!this.offSuGridValidation(this.offsuInsertList)) {
      return;
    }
    for (let i = 0; i < this.offsuInsertList.length; i++) {
      this.offsuInsertList[i].createUserId = this.sessionManager.getId();
      this.offsuInsertList[i].offenderBookId = this.offsdModel.offenderBookId;
      this.offsuInsertList[i].rootOffenderId = this.offsdModel.rootOffenderId;
      this.offsuInsertList[i].caseloadType = this.offsdModel.caseloadType;
    }
    this.offsuCommitModel.insertList = this.offsuInsertList;
  }

  if (this.offsuUpdatetList.length > 0) {
    if (!this.offSuGridValidation(this.offsuUpdatetList)) {
      return;
    }
    for (let i = 0; i < this.offsuUpdatetList.length; i++) {
      this.offsuUpdatetList[i].modifyUserId = this.sessionManager.getId();
      this.offsuUpdatetList[i].modifyDatetime = DateFormat.getDate();
    }
    this.offsuCommitModel.updateList = this.offsuUpdatetList;
  }

this.offsuCommitModel.deleteList = this.offsuDeleteList;
const offsuSaveData = this.ocdsabusFactory.offSuCommit(this.offsuCommitModel);
offsuSaveData.subscribe(data => {
if (String(data.errorMessage).indexOf('OFFENDER_SUBSTANCE_USES_PK') > 0) {
this.message = this.translateService.translate('ocdsabus.surowexisterror');
this.show(this.message, 'warn');
return;
}
if (data.sealFlag === '1') {
this.show('common.addupdateremoverecordsuccess', 'success');
this.offSuExecuteQuery();
} else if (data.sealFlag === '2') {
this.show('ocdsabus.sdtablerror');
return;
} else if (data.sealFlag === '3') {
this.show('ocdsabus.sttableerror');
return;
} else {
this.show('common.addupdateremoverecordfailed');
}
});

}
// execute query
validateSearchFileds() {
if (this.offsuModel.offenderBookId != null || this.offsuModel.rootOffenderId != null ||
this.offsuModel.caseloadType != null) {
return true;
}
return false;
}
offSuExecuteQuery() {
if (!this.validateSearchFileds()) {
return;
}
const serviceObj = this.ocdsabusFactory.
offSuExecuteQuery(this.offsuModel);
serviceObj.subscribe(data => {
if (data.length === 0) {
this.offsuData = [];
} else {
this.offsuData = data;
data.forEach(obj => {
if (obj.caseloadType && obj.caseloadType === 'COMM') {
obj.nbtCaseloadType = 'C';
} else if (obj.caseloadType && obj.caseloadType === 'INST') {
obj.nbtCaseloadType = 'I';
}
});


this.offsuModel = this.offsuData[0];
this.offsuIndex = 0;
this.offSdExecuteQuery();
this.offstExecuteQuery();
this.enableInsert();
// this.populateDetails();
}
});
}









offSdExecuteQuery() {
this.offsdModel.substanceType = this.offsuModel.substanceType;
const offsdResult = this.ocdsabusFactory.offSdExecuteQuery(this.offsdModel);
offsdResult.subscribe(offsdResultList => {
if (offsdResultList.length === 0) {
this.offsdData = [];
} else {
this.offsdData = offsdResultList;
offsdResultList.forEach(obj => {
if (obj.caseloadType && obj.caseloadType === 'COMM') {
obj.nbtCaseloadType = 'C';
} else if (obj.caseloadType && obj.caseloadType === 'INST') {
obj.nbtCaseloadType = 'I';
}
});
this.offsdModel = offsdResultList[0];
this.offsdIndex = 0;

}
});
}
/**
 *  This function will be executed when commit event is
* fired
*/
offSdComitt(event) {
// TODO declare commit bean and add insert list to that object.
if (!this.offSdGridValidation()) {
return;
}
this.offsdInsertList = event.added;
this.offsdUpdatetList = event.updated;
this.offsdDeleteList = event.removed;
this.offsdCommitModel.insertList = [];
this.offsdCommitModel.updateList = [];
this.offsdCommitModel.deleteList = [];

if (this.offsdInsertList.length > 0 || this.offsdUpdatetList.length > 0) {
for (let i = 0; i < this.offsdInsertList.length; i++) {
this.offsdInsertList[i].createUserId = this.sessionManager.getId();
this.offsdInsertList[i].modifyUserId = this.sessionManager.getId();
this.offsdInsertList[i].substanceType = this.offsuModel.substanceType;
this.offsdInsertList[i].offenderBookId = this.offsuModel.offenderBookId;
this.offsdInsertList[i].rootOffenderId = this.offsuModel.rootOffenderId;
this.offsdInsertList[i].caseloadType = this.offsuModel.caseloadType;


}
for (let i = 0; i < this.offsdUpdatetList.length; i++) {
this.offsdUpdatetList[i].modifyUserId = this.sessionManager.getId();
this.offsdUpdatetList[i].modifyDatetime = DateFormat.getDate();
}
this.offsdCommitModel.insertList = this.offsdInsertList;
this.offsdCommitModel.updateList = this.offsdUpdatetList;
}
if (this.offsdDeleteList.length > 0) {
for (let i = 0; i < this.offsdDeleteList.length; i++) {
}
this.offsdCommitModel.deleteList = this.offsdDeleteList;
}
const offsdSaveData = this.ocdsabusFactory.offSdCommit(this.offsdCommitModel);
offsdSaveData.subscribe(data => {
if (String(data.errorMessage).indexOf('OFFENDER_SUBSTANCE_DETAILS_PK') > 0) {
this.message = this.translateService.translate('ocdsabus.sdrowexisterror');
this.show(this.message, 'warn');
return;
}
if (data.sealFlag === '1') {
this.show('common.addupdateremoverecordsuccess', 'success');
this.offSdExecuteQuery();
} else {
this.show('common.addupdateremoverecordfailed');
}
});
}
offstExecuteQuery() {

this.offstModel.substanceType = this.offsuModel.substanceType;
const offstResult = this.ocdsabusFactory.offStExecuteQuery(this.offstModel);
offstResult.subscribe(offstResultList => {
if (offstResultList.length === 0) {
this.offstData = [];
} else {
this.offstData = offstResultList;
offstResultList.forEach(obj => {
if (obj.caseloadType && obj.caseloadType === 'COMM') {
obj.nbtCaseloadType = 'C';
} else if (obj.caseloadType && obj.caseloadType === 'INST') {
obj.nbtCaseloadType = 'I';
}
});
this.offstModel = offstResultList[0];
this.offstIndex = 0;
}
});
}


validateStRowData = (event) => {
const rowIndex = event.rowIndex;
const rowdata = new ValidateRowReturn();
if (event.field === 'treatmentFromDate' || event.field === 'treatmentToDate') {
this.validateDate(event.data.treatmentFromDate, event.data.treatmentToDate);
}
rowdata.validated = true;
return rowdata;
}
validateDate(fromDate?, toDate?) {
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
if (fromDate) {
  if (DateFormat.compareDate(DateFormat.getDate(fromDate), DateFormat.getDate()) > 0){
    this.show('ocdsabus.datecannotfuture');
    return false;
  }

}
if (fromDate && toDate) {
if (DateFormat.compareDate(DateFormat.getDate(fromDate), DateFormat.getDate(toDate)) > 0) {
this.show('ocdsabus.fromdatecannotbelater');
return false;
}
}

return true;
}
/**
 *  This function will be executed when commit event is
* fired
*/
offStComitt(event) {
// TODO declare commit bean and add insert list to that object.
if (!this.offStGridValidation()) {
return;
}
this.offstInsertList = event.added;
this.offstUpdatetList = event.updated;
this.offstDeleteList = event.removed;
this.offstCommitModel.insertList = [];
this.offstCommitModel.updateList = [];
this.offstCommitModel.deleteList = [];

if (this.offstInsertList.length > 0 || this.offstUpdatetList.length > 0) {
for (let i = 0; i < this.offstInsertList.length; i++) {
this.offstInsertList[i].createUserId = this.sessionManager.getId();
this.offstInsertList[i].modifyUserId = this.sessionManager.getId();
this.offstInsertList[i].substanceType = this.offsuModel.substanceType;
this.offstInsertList[i].offenderBookId = this.offsuModel.offenderBookId;
this.offstInsertList[i].rootOffenderId = this.offsuModel.rootOffenderId;
this.offstInsertList[i].caseloadType = this.offsuModel.caseloadType;
this.offstInsertList[i].fromDateFlag = 'Y';
this.offstInsertList[i].toDateFlag = 'y';
}
for (let i = 0; i < this.offstUpdatetList.length; i++) {
this.offstUpdatetList[i].modifyUserId = this.sessionManager.getId();
this.offstUpdatetList[i].modifyDatetime = DateFormat.getDate();
}
this.offstCommitModel.insertList = this.offstInsertList;
this.offstCommitModel.updateList = this.offstUpdatetList;
}

this.offstCommitModel.deleteList = this.offstDeleteList;
const offstSaveData = this.ocdsabusFactory.offStCommit(this.offstCommitModel);
offstSaveData.subscribe(data => {
if (String(data.errorMessage).indexOf('OFFENDER_SUBS_TREATMENTS_PK') > 0) {
this.message = this.translateService.translate('ocdsabus.strowexisterror');
this.show(this.message, 'warn');
return;
}
if (data.sealFlag === '1') {
this.show('common.addupdateremoverecordsuccess', 'success');
this.offstExecuteQuery();
} else {
this.show('common.addupdateremoverecordfailed');
}
});



}

offsutabDelete = () => {
  if (this.offsuData.length !== 0 && this.offsdData.length !== 0){
      const offsuSaveData = this.ocdsabusFactory.onDeleteOfSuAbHistory(this.offsuModel);
      offsuSaveData.subscribe(data => {
          if (data.sealFlag === '2') {
            this.show('ocdsabus.sdtablerror');
            return false;
            }
      });
      return false;
    }
    else if (this.offsuData.length !== 0 && this.offstData.length !== 0) {
      this.show('ocdsabus.sttablerror');
      return false;
    }
   return true;
  }
  
  onGridClear = () => {
    this.offstExecuteQuery();
    return true;
   }

}
