import {
Component, OnInit,
ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmdeftmService } from '../service/ocmdeftm.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AgyLocTeamFunctions } from '../beans/AgyLocTeamFunctions';
import { AgyLocTeamFunctionsCommitBean } from '../beans/AgyLocTeamFunctionsCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { AgencyLocations } from '../../../../sa/admin/beans/AgencyLocations';
import { DialogService } from '@ui-components/dialog/dialog.service';


// import required bean declarations

@Component({
selector: 'app-ocmdeftm',
templateUrl: './ocmdeftm.component.html'
// styleUrls: ['./ocmdeftm.component.css']
})

export class OcmdeftmComponent implements OnInit {
// Variable declaration
@ViewChild('grid') grid: any;
actionName: string;
lovModel: any[];
msgs: any[] = [];
nameOfLovPage: string;
statusOption: any[] = [];
listToCompare: any[] = [];
agytmfnData: AgyLocTeamFunctions[] = [];
agytmfnDataTemp: AgyLocTeamFunctions[] = [];
agytmfnModel: AgyLocTeamFunctions = new AgyLocTeamFunctions();
agytmfnIndex = 0;
agytmfnCommitModel: AgyLocTeamFunctionsCommitBean = new AgyLocTeamFunctionsCommitBean();
agytmfnInsertList: AgyLocTeamFunctions[] = [];
agytmfnUpdatetList: AgyLocTeamFunctions[] = [];
agytmfnDeleteList: AgyLocTeamFunctions[] = [];
locationModel: AgencyLocations = new AgencyLocations();
display: boolean;
errorMessage: string;
headerMessage: string;
disabled: boolean;
editable = true;
agyTmFnColumnDef: any[];
locationReadOnly = false;
agyTmFnReadOnly = false;
teamInsert = false;
rgagylocRg: any[] = [];
rgagyloctypeRg: any[] = [];
rgfunctionRg: any[] = [];
rgynRg: any[] = [];
cellvalues: string;
tableIndex: number;
retriveDisable: boolean;
clearDisable: boolean;
caseLoadId: string;
caseLoadType: string;
flagTitle = {
'description': this.translateService.translate('common.description'),
};
isLoading: boolean;
    clrBtnFlag: boolean;
constructor(private ocmdeftmFactory: OcmdeftmService,
public translateService: TranslateService
, public sessionManager: UserSessionManager,
public dialogService: DialogService) {
this.agyTmFnColumnDef = [];
}
ngOnInit() {
this.clearDisable = true;
this.retriveDisable = false;
this.clrBtnFlag = true;
this.statusOption.push(
{ 'id': 'Y', 'text': 'Yes', },
{ 'id': 'N', 'text': 'No', },
);
this.agyTmFnColumnDef = [
{
fieldName: this.translateService.translate('ocmdeftm.function'), field: 'functionType',
cellEditable: this.canFunctionEdit, width: 150, datatype: 'lov', domain: 'FUNCTION'
},

{ fieldName: this.translateService.translate('ocmdeftm.teamresponsible'), field: 'teamIdDesc', editable: false, width: 150 },
{
    fieldName: '', field: 'button', datatype: 'launchbutton', link: '/OCUTASAT', cellEditable: this.canAlertEdit,
    width: 100, data: 'row', updateField: 'row', modal: true, dialogWidth: 70, onLaunchClick: this.teamLaunchClick,
    },
{
fieldName: this.translateService.translate('ocmdeftm.overwrite'), field: 'overwrittenFlag', editable: true,
width: 150, datatype: 'lov', titles: this.flagTitle, link: 'ocmdeftm/getWrittenFlagCodes'
},

{ fieldName: '', field: 'butOverwrittenFlag', editable: false, width: 150 },

{
fieldName: this.translateService.translate('ocmdeftm.effectivedate'), field: 'effectiveDate',
editable: false, width: 150, datatype: 'date'
},

{ fieldName: this.translateService.translate('ocmdeftm.active'), field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox' },

{
fieldName: this.translateService.translate('ocmdeftm.expirydate'), field: 'expiryDate',
editable: false, width: 150, datatype: 'date'
},

{ fieldName: '', field: 'teamId', hide: true },
];

this.caseLoadId = this.sessionManager.currentCaseLoad;
this.caseLoadType = this.sessionManager.currentCaseLoadType;
if (this.caseLoadType) {
this.locationModel.agencyLocationType = this.caseLoadType ;
}
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

isInsertable(date?) {
    if (this.locationModel.agyLocId || this.locationModel.agencyLocationType) {
        this.clrBtnFlag = false;
    } else {
        this.clrBtnFlag = true;
    }
}

agytmfnExecuteQuery() {
if (!this.ocmdeftmSeachValidations()) {
return;
}
const agytmfnResult = this.ocmdeftmFactory.agyTmFnExecuteQuery(this.locationModel);
agytmfnResult.subscribe(agytmfnResultList => {
if (agytmfnResultList.length === 0) {
this.agytmfnData = [];
this.clearDisable = false;
this.retriveDisable = true;
this.show(this.translateService.translate('common.querycaused'));
this.teamInsert = true;
} else {

this.agytmfnData = agytmfnResultList;
agytmfnResultList.forEach(obj => {
obj.sealFlag = obj.activeFlag ;
obj.activeFlag = obj.activeFlag === 'Y' ? true : false;

obj['button'] = '..';
});
this.tableIndex = 0;
this.clrBtnFlag = false;
this.clearDisable = false;
this.retriveDisable = true;
this.teamInsert = true;
}
});
}
onClear() {
this.agytmfnData = [];
this.locationModel = new AgencyLocations();
this.retriveDisable = false;
this.clearDisable = true;
this.teamInsert = false;
this.clrBtnFlag = true;

}
get readeOnlyFields() {
    if (this.agytmfnData.length === 0) {
        return false;
    } else {
        return true;
    }
}
onGridClear = () => {
    this.agytmfnExecuteQuery();
    return true;
}

teamLaunchClick = (data) => {

if (!this.validateTeamButton(data)) {
return;
}
this.isLoading = true;
this.dialogService.openLinkDialog('/OCUTASAT', this.agytmfnModel, 80).subscribe(res => {
if (res) {
this.isLoading = false;
this.grid.setColumnData('teamId', this.agytmfnData.indexOf(data), res.teamId);
this.grid.setColumnData('teamIdDesc', this.agytmfnData.indexOf(data), res.teamIdDesc);

}
});
}
validateTeamButton(data) {
if (!data.createDatetime) {
if (!data.functionType || !data.functionType.trim()) {
this.show('ocmdeftm.functionerror', 'warn');
return false;
}
} else {
return false;
}
return true;


}
onRowClick(event) {
if (event) {
this.agytmfnModel = event;

}

}

onagyLocTypeChange (){
    if (!this.locationModel.agencyLocationType) {
        this.locationModel.agencyLocationType = this.locationModel.agencyLocationType === '' ? undefined : '';
        this.locationModel.agyLocId = '';
        
    }
}
onagyLocChange () {
    if (!this.locationModel.agyLocId) {
        this.locationModel.agyLocId = this.locationModel.agyLocId === '' ? undefined : '';
        
    }

}
ocmdeftmSeachValidations() {
const is = { valid: true };
if (!this.locationModel.agencyLocationType || !this.locationModel.agencyLocationType.trim()) {
this.show('ocmdeftm.locationtypeerror', 'warn');
is.valid = false;
return is.valid;

}
if (!this.locationModel.agyLocId || !this.locationModel.agyLocId.trim()) {
this.show('ocmdeftm.locationerror', 'warn');
is.valid = false;
return is.valid;

}
return is.valid;

}

ocmdeftmValidations() {
const is = { valid: true };
this.agytmfnData.forEach(data => {
if (is.valid) {
if (!data.functionType || !data.functionType.trim()) {
this.show('ocmdeftm.functionvaliderror', 'warn');
is.valid = false;
return;
}

if (!data.teamIdDesc || !data.teamIdDesc.trim()) {
this.show('ocmdeftm.teamerror', 'warn');
is.valid = false;
return;
}
if (!data.overwrittenFlag || !data.overwrittenFlag.trim()) {
    this.show('ocmdeftm.overwritenerror', 'warn');
    is.valid = false;
    return;
    }
}
});
return is.valid;
}
validateRowData = (event) => {
const rowIndex = this.agytmfnData.indexOf(event.data);
const rowdata = new ValidateRowReturn();
if (event.field === 'activeFlag') {
if (event.data.activeFlag) {
this.grid.setColumnData('expiryDate', rowIndex, undefined);
rowdata.validated = true;
return rowdata;
} else if (!event.data.activeFlag) {
this.grid.setColumnData('expiryDate', rowIndex,
DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
rowdata.validated = true;
return rowdata;
}
}

rowdata.validated = true;
return rowdata;

}

canAlertEdit = (data: any, index: number, field: string): boolean => {
if (!data.createDatetime) {
return true;
} else {
return false;
}
}
canFunctionEdit = (data: any, index: number, field: string): boolean => {
data.teamIdDesc = '';
data.teamId = 0;
if (!data.createDatetime) {
return true;
} else {
return false;
}

}
changeCellBlock(event) {
if (event) {
this.cellvalues = 'ocmdeftm/rgAgyLocRecordGroup?agencyLocationType=' + this.locationModel.agencyLocationType
+ '&caseloadId=' + this.sessionManager.currentCaseLoad;


}
}
onGridInsert = () => {
if (!this.ocmdeftmValidations()) {
return false;
}
return {
button: '..', teamIdDesc: '', teamId: '', activeFlag: true, overwrittenFlag: 'Y',
effectiveDate: DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)),
};

}
/**
 *  This function will be executed when commit event is
* fired
*/
ocmdeftmSaveagytmfnForm(event) {

if (!this.ocmdeftmValidations()) {
return;
}
this.agytmfnInsertList = event.added;
this.agytmfnUpdatetList = event.updated;
this.agytmfnDeleteList = event.removed;
this.agytmfnCommitModel.insertList = [];
this.agytmfnCommitModel.updateList = [];
if (this.agytmfnInsertList.length > 0 || this.agytmfnUpdatetList.length > 0) {
for (let i = 0; i < this.agytmfnInsertList.length; i++) {
this.agytmfnInsertList[i].activeFlag = this.agytmfnInsertList[i].activeFlag ? 'Y' : 'N';
this.agytmfnInsertList[i].agyLocId = this.locationModel.agyLocId;
this.agytmfnInsertList[i].createUserId = this.sessionManager.getId();
this.agytmfnInsertList[i].modifyUserId = this.sessionManager.getId();
}
for (let i = 0; i < this.agytmfnUpdatetList.length; i++) {
this.agytmfnUpdatetList[i].activeFlag = this.agytmfnUpdatetList[i].activeFlag ? 'Y' : 'N';
this.agytmfnUpdatetList[i].agyLocId = this.locationModel.agyLocId;
this.agytmfnUpdatetList[i].modifyUserId = this.sessionManager.getId();
}
this.agytmfnCommitModel.insertList = this.agytmfnInsertList;
this.agytmfnCommitModel.updateList = this.agytmfnUpdatetList;
}
const agytmfnSaveData = this.ocmdeftmFactory.agyTmFnCommit(this.agytmfnCommitModel);
agytmfnSaveData.subscribe(data => {
if (data === 1) {
this.show('common.addupdateremoverecordsuccess', 'success');
this.agytmfnExecuteQuery();
} else if (data === 2) {
this.show('ocmdeftm.functionexist', 'warn');
} else {
this.show('common.addupdateremoverecordfailed', 'warn');
}
});

}

}
