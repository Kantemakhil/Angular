import { Component, OnInit, ViewChild} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CourseActivities } from '@instprogramswithoutschedulesbeans/CourseActivities';
import { CourseScheduleRules } from '../beans/CourseScheduleRules';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { CourseScheduleRulesCommitBean } from '../beans/CourseScheduleRulesCommitBean';
import { CourseActivitiesCommitBean } from '../beans/CourseActivitiesCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OcmsoschService } from '../service/ocmsosch.service';


@Component({
    selector: 'app-ocmschrc',
    templateUrl: './ocmschrc.component.html'

})

export class OcmschrcComponent implements OnInit {

    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('buildGrid', {static: true}) buildGrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    crsactData: CourseActivities [] = [];
    crsactDataTemp: CourseActivities[] = [];

    crsactModel: CourseActivities = new CourseActivities();
    crsactIndex: number ;
    crsactInsertList: CourseActivities[] = [];
    crsactUpdatetList: CourseActivities[] = [];
    crsactDeleteList: CourseActivities[] = [];
    crsschedulerulData: CourseScheduleRules [] = [];
    crsschedulerulDataTemp: CourseScheduleRules[] = [];

    crsschedulerulModel: CourseScheduleRules = new CourseScheduleRules();
    crsschedulerulIndex: number;
    crsschedulerulInsertList: CourseScheduleRules[] = [];
    crsschedulerulUpdatetList: CourseScheduleRules[] = [];
    crsschedulerulDeleteList: CourseScheduleRules[] = [];
    schlnsertList: CourseScheduleRules[] = [];
    schUpdateList: CourseScheduleRules[] = [];
    schDeleteList: CourseScheduleRules[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean ;
    crsScheduleRulColumnDef: any[];
    crsActReadOnly: boolean;
    crsScheduleRulReadOnly: boolean;
    msglist: any[];
    message: any;
    type: any;
    index: any;
    gridInsert: boolean;
    gridUpdate: boolean;
    gridDelete: boolean;


    crsactCommitModel: CourseActivitiesCommitBean = new CourseActivitiesCommitBean();
    crsactalertUpdateList: any;
    crsactmodel: any;

    genCourSchCommitModel: CourseScheduleRulesCommitBean = new CourseScheduleRulesCommitBean();
    crsschedulerulCommitModel: CourseScheduleRulesCommitBean = new CourseScheduleRulesCommitBean();
    excludeHolidays: boolean;
    holiday: string;
    noOfDays: any;
    okMsg: string;
    buildDisable: boolean;
    exitDisable: boolean;
    tableIndex: number;

      constructor(private ocmsoschFactory: OcmsoschService, public translateService: TranslateService,
            public sessionManager: UserSessionManager, public dialogService: DialogService) {

    this.crsScheduleRulColumnDef = [];

    }

    ngOnInit() {
        this.gridInsert = true;
        this.gridUpdate = true;
        this.gridDelete = true;
        this.crsactModel = this.dialog.data;
        this.holidayFlag();
        this.crsschedulerulModel.crsActyId = this.crsactModel.crsActyId;
        this.profileValues();
        this.prgSrvDetails();

    this.crsScheduleRulColumnDef = [
        { fieldName: this.translateService.translate('ocmschrc.startTime') + '*', field: 'startTime', datatype: 'time',
            editable: true, maxlength: 11, width: 150},
        { fieldName: this.translateService.translate('ocmschrc.endTime') + '*', field: 'endTime', datatype: 'time',
            editable: true, maxlength: 11, width: 150},
        { fieldName: this.translateService.translate('ocmschrc.monday'), field: 'monday', datatype: 'checkbox',
            maxlength: 1, editable: true, width: 150},
        { fieldName: this.translateService.translate('ocmschrc.tuesday'), field: 'tuesday', datatype: 'checkbox',
            maxlength: 1, editable: true, width: 150},
        { fieldName: this.translateService.translate('ocmschrc.wednesday'), field: 'wednesday', datatype: 'checkbox',
            maxlength: 1, editable: true, width: 150},
        { fieldName: this.translateService.translate('ocmschrc.thursday'), field: 'thursday', datatype: 'checkbox',
            maxlength: 1, editable: true, width: 150},
        { fieldName: this.translateService.translate('ocmschrc.friday'), field: 'friday', datatype: 'checkbox',
            maxlength: 1, editable: true, width: 150},
        { fieldName: this.translateService.translate('ocmschrc.saturday'), field: 'saturday', datatype: 'checkbox',
            maxlength: 1, editable: true, width: 150},
        { fieldName: this.translateService.translate('ocmschrc.sunday'), field: 'sunday', datatype: 'checkbox',
            maxlength: 1, editable: true, width: 150},

            { fieldName: '', field: 'holidayFlag', hide: true },
    ];

        this.crsschedulerulExecuteQuery();

    }
     /**
      * This function displays the messages
      */
    show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
    }

    holidayFlag() {
        const hodidayFlagData = this.ocmsoschFactory.getHolidayFlag(this.crsactModel);
        hodidayFlagData.subscribe(data => {
            if (data.holidayFlag) {
                this.holiday = data.holidayFlag;
                this.crsactModel.holidayFlag = data.holidayFlag;
                if (this.holiday === 'Y') {
                    this.excludeHolidays = true;
                } else if (this.holiday === 'N') {
                    this.excludeHolidays = false;
                }
            }
        });
    }

    crsschedulerulExecuteQuery() {
        const crsschedulerulResult = this.ocmsoschFactory.crsschedulerulExecuteQuery(this.crsschedulerulModel);
        crsschedulerulResult.subscribe(data => {
            if (data.length === 0) {
                this.crsschedulerulData = [];
                this.tableIndex = -1;
            } else {
                this.tableIndex = 0;
                this.crsschedulerulData = data;
                this.crsschedulerulData.forEach((element) => {
                    if (element.sundayFlag === 'Y') {
                        element.sunday = true;
                    }
                    if (element.mondayFlag === 'Y') {
                        element.monday = true;
                    }
                    if (element.tuesdayFlag === 'Y') {
                        element.tuesday = true;
                    }
                    if (element.wednesdayFlag === 'Y') {
                        element.wednesday = true;
                    }
                    if (element.thursdayFlag === 'Y') {
                        element.thursday = true;
                    }
                    if (element.fridayFlag === 'Y') {
                        element.friday = true;
                    }
                    if (element.saturdayFlag === 'Y') {
                        element.saturday = true;
                    }
                });
                this.crsschedulerulModel = data[0];
            }
        });
    }

    ocmschrcSavecrsschedulerulForm(event) {
        this.crsactUpdatetList[0] = this.crsactModel;

        if (this.crsactUpdatetList.length > 0 ) {
            this.crsschedulerulCommitModel.actUpdate = this.crsactUpdatetList;
        }

        this.crsschedulerulInsertList  = event.added;
        this.crsschedulerulUpdatetList  = event.updated;
        this.crsschedulerulDeleteList  = event.removed;
        this.crsschedulerulCommitModel.insertList = [];
        this.crsschedulerulCommitModel.updateList = [];
        this.crsschedulerulCommitModel.deleteList = [];
        if ( this.crsschedulerulInsertList.length > 0) {
            if (!this.schduleValidate(this.crsschedulerulInsertList)) {
                    return;
            }

            for ( let i = 0; i < this.crsschedulerulInsertList.length; i++ ) {
                this.crsschedulerulInsertList[i].crsActyId = this.crsactModel.crsActyId;
                this.crsschedulerulInsertList[i].capacity = this.crsactModel.capacity;
                this.crsschedulerulInsertList[i].sealFlag = this.crsactModel.sealFlag;
                this.crsschedulerulInsertList[i].weekNo = 1;
            }

            this.crsschedulerulInsertList = this.flagConvertion(this.crsschedulerulInsertList);
            this.crsschedulerulCommitModel.insertList = this.crsschedulerulInsertList;
        }

        if (this.crsschedulerulUpdatetList.length > 0 ) {
            if (!this.schduleValidate(this.crsschedulerulUpdatetList)) {
                return;
            }

            this.crsschedulerulUpdatetList = this.flagConvertion(this.crsschedulerulUpdatetList);
            this.crsschedulerulCommitModel.updateList = this.crsschedulerulUpdatetList;
        }

        if ( this.crsschedulerulDeleteList.length > 0 ) {
            this.crsschedulerulCommitModel.deleteList = this.crsschedulerulDeleteList;
        }

        const crsschedulerulSaveData = this.ocmsoschFactory.crsschedulerulCommit(this.crsschedulerulCommitModel);
        this.exitDisable = true;
        this.buildDisable = true;
        crsschedulerulSaveData.subscribe( data => {
            this.exitDisable = false;
            this.buildDisable = false;
            if ( data.lireturn === 1 ) {
                this.crsschedulerulExecuteQuery();
                this.holidayFlag();
                this.type = 'success';
             // this.message = this.translateService.translate('ocmschrc.transactionCompleted').replace('%records%', data.totalRecords);
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else if(data.lireturn === 3) {
                this.type = 'warn';
                this.message = 'Scheduled hours exceeds the maximum allowed per day. Please see your system administrator';
                this.show();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmschrc.transactionFaild');
                this.show();
            }
        });

    }

    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        return rowdata;
    }

    onGridInsert = () => {
        if (this.schduleValidate(this.crsschedulerulData)) {
            return {};
        }
    }

    onGridClear = () => {
        this.holidayFlag();
        this.crsschedulerulExecuteQuery();
        return true;
    }

    schduleValidate(crsSchList: any) {
        try {
        crsSchList = this.flagConvertionBool(crsSchList);
        crsSchList.forEach((element) => {
            if (!element.startTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmschrc.enterStartTime');
                this.show();
                throw new Error();
            }
            if (!element.endTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmschrc.enterEndTime');
                this.show();
                throw new Error();
            }
            if (DateFormat.compareDateTime(DateFormat.getDate(element.startTime), DateFormat.getDate(element.endTime)) === 1 ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmschrc.timeMsg');
                this.show();
                throw new Error();
            }
            if ((element.sunday === false && element.monday === false && element.tuesday === false &&
                element.wednesday === false && element.thursday === false && element.friday === false &&
                element.saturday === false)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmschrc.checkAtleastADay');
                this.show();
                throw new Error();
            }
        });
    } catch (e) {
        return false;
    }
        return true;
    }

    flagConvertion(crsSchList: any) {
        crsSchList.forEach((element) => {
            element.sundayFlag = element.sunday ? 'Y' : 'N';
            element.mondayFlag = element.monday ? 'Y' : 'N';
            element.tuesdayFlag = element.tuesday ? 'Y' : 'N';
            element.wednesdayFlag = element.wednesday ? 'Y' : 'N';
            element.thursdayFlag = element.thursday ? 'Y' : 'N';
            element.fridayFlag = element.friday ? 'Y' : 'N';
            element.saturdayFlag = element.saturday ? 'Y' : 'N';
        });
        return crsSchList;
    }

    flagConvertionBool(crsSchList: any) {
        crsSchList.forEach((element) => {
            element.sunday = !!element.sunday ;
            element.monday = !!element.monday ;
            element.tuesday = !!element.tuesday ;
            element.wednesday = !!element.wednesday ;
            element.thursday = !!element.thursday ;
            element.friday = !!element.friday ;
            element.saturday = !!element.saturday ;
        });
        return crsSchList;
    }

    checkHolidays() {
        const rowIndex = this.crsschedulerulData.indexOf(this.crsschedulerulModel);
        if (this.excludeHolidays === true) {
            this.crsactModel.holidayFlag = 'Y';
            this.buildGrid.setColumnData('holidayFlag', rowIndex, this.crsactModel.holidayFlag);
        } else {
            this.crsactModel.holidayFlag = 'N';
            this.buildGrid.setColumnData('holidayFlag', rowIndex, this.crsactModel.holidayFlag);
        }
    }

    genCourSchCommitBean() {
        this.schlnsertList = [];
        this.schUpdateList = [];
        this.schDeleteList = [];
        this.buildGrid.addedMap.forEach(
          (v: any, k: number) => {
            this.schlnsertList.push(v);
          }
        );
        this.buildGrid.updatedMap.forEach(
          (v: any, k: number) => {
            this.schUpdateList.push(v);
          }
        );
        this.buildGrid.removedMap.forEach(
          (v: any, k: number) => {
            this.schDeleteList.push(v);
          }
        );
    }

    onBuildSchedule() {
        this.genCourSchCommitBean();
        this.save();
    }

    save() {
        this.crsschedulerulInsertList  = this.schlnsertList;
        this.crsschedulerulUpdatetList = this.schUpdateList;
        this.crsschedulerulDeleteList  = this.schDeleteList;
        this.crsschedulerulCommitModel.insertList = [];
        this.crsschedulerulCommitModel.updateList = [];
        this.crsschedulerulCommitModel.deleteList = [];

        this.crsactUpdatetList[0] = this.crsactModel;

        if (this.crsactUpdatetList.length > 0 ) {
            this.crsschedulerulCommitModel.actUpdate = this.crsactUpdatetList;
        }

        if ( this.crsschedulerulInsertList.length > 0) {
            if (!this.schduleValidate(this.crsschedulerulInsertList)) {
                    return;
            }

            for ( let i = 0; i < this.crsschedulerulInsertList.length; i++ ) {
                this.crsschedulerulInsertList[i].crsActyId = this.crsactModel.crsActyId;
                this.crsschedulerulInsertList[i].capacity = this.crsactModel.capacity;
                this.crsschedulerulInsertList[i].sealFlag = this.crsactModel.sealFlag;
                this.crsschedulerulInsertList[i].weekNo = 1;
            }

            this.crsschedulerulInsertList = this.flagConvertion(this.crsschedulerulInsertList);
            this.crsschedulerulCommitModel.insertList = this.crsschedulerulInsertList;
        }

        if (this.crsschedulerulUpdatetList.length > 0 ) {
            if (!this.schduleValidate(this.crsschedulerulUpdatetList)) {
                return;
            }

            this.crsschedulerulUpdatetList = this.flagConvertion(this.crsschedulerulUpdatetList);
            this.crsschedulerulCommitModel.updateList = this.crsschedulerulUpdatetList;
        }

        if ( this.crsschedulerulDeleteList.length > 0 ) {
            this.crsschedulerulCommitModel.deleteList = this.crsschedulerulDeleteList;
        }

        const crsschedulerulSave = this.ocmsoschFactory.crsschedulerulCommit(this.crsschedulerulCommitModel);
        this.gridInsert = false;
        this.gridUpdate = false;
        this.gridDelete = false;
        this.exitDisable = true;
        crsschedulerulSave.subscribe( data => {
            this.gridInsert = true;
            this.gridUpdate = true;
            this.gridDelete = true;
            this.exitDisable = false;
            if ( data.lireturn === 1 || data.lireturn === 2) {
                this.crsschedulerulExecuteQuery();
                this.holidayFlag();
                this.buildSchedule();
            } else if(data.lireturn === 3) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmschrc.schedulehoursexceedsthemacallowedperday');
                this.show();
            }  else {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmschrc.transactionFaild');
                this.show();
            }
        });

    }

    buildSchedule() {
        this.crsschedulerulModel.crsActyId = this.crsactModel.crsActyId;
        this.crsschedulerulModel.noOfDays = this.noOfDays;
        const buildRecurringScheduleResult = this.ocmsoschFactory.buildRecurringSchedule(this.crsschedulerulModel );
        this.gridInsert = false;
        this.gridUpdate = false;
        this.gridDelete = false;
        this.exitDisable = true;
        buildRecurringScheduleResult.subscribe( data => {
            this.gridInsert = true;
            this.gridUpdate = true;
            this.gridDelete = true;
            this.exitDisable = false;
            if (data.noBuilt != null) {
                if (data.noBuilt > 0) {
                    this.okMsg = this.translateService.translate('ocmschrc.recordsCreated').
                    replace('%records%', data.noBuilt).replace('%date%', data.lastDate);
                } else {
                    this.okMsg = this.translateService.translate('ocmschrc.noRecords');
                }
            } else {
            this.okMsg = this.translateService.translate('ocmschrc.noBuildRules');
            }

            const okData = {
                label: this.okMsg,
                yesBtn: true , yesLabel: 'Ok'
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', okData, 50).subscribe(result => {
                if (result) {
                    this.dialog.close(null);
                }
            });
        });
    }

    prgSrvDetails() {
        const ProfileValuesResult = this.ocmsoschFactory.getPrgSrvDetails(this.crsactModel.programId);
        ProfileValuesResult.subscribe( data => {
            if (data.programCode) {
                this.crsactModel.programIdVal = data.programCode;
            }
        });
    }

    profileValues() {
        const ProfileValuesResult = this.ocmsoschFactory.getProfileValues();
        ProfileValuesResult.subscribe( data => {
            if (data.noOfDays) {
                this.noOfDays = data.noOfDays;
            }
        });
    }

    onButExitclick() {
        this.genCourSchCommitBean();
        if (this.schlnsertList.length > 0 || this.schUpdateList.length > 0 || this.schDeleteList.length > 0 ||
            this.holiday !== this.crsactModel.holidayFlag) {
            const data = {
                label: this.translateService.translate('ocmschrc.exit'),
                yesBtn: true, noBtn: true, cancelBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                if (result) {
                    this.onBuildSchedule();
                } else if (result == null) {
                } else {
                    this.dialog.close(null);
                }
            });
        } else {
            this.dialog.close(null);
        }
    }
    get excludeDisabled() {
        if(this.crsschedulerulData.length === 0) {
          return true;
        }
        return false;
    }
}
