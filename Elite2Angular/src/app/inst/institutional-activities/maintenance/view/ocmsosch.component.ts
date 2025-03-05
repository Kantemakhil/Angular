import { TimeFormat } from './../../../../core/ui-components/time/timeFormat';
import {
    Component, OnInit,

    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { CourseActivities } from '@instprogramswithoutschedulesbeans/CourseActivities';
import { OcmsoschService } from '../service/ocmsosch.service';
import { DialogService } from './../../../../core/ui-components/dialog/dialog.service';
import { CourseSchedules } from './../beans/CourseSchedules';
import { CourseSchedulesCommitBean } from './../beans/CourseSchedulesCommitBean';
// import required bean declarations

@Component({
    selector: 'app-ocmsosch',
    templateUrl: './ocmsosch.component.html'
})

export class OcmsoschComponent implements OnInit {
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    crsactData: CourseActivities[] = [];
    crsactDataTemp: CourseActivities[] = [];
    // TODO angular.copy(this.crsactData, thiscrsactDataTemp);
    crsactModel: CourseActivities = new CourseActivities();
    crsactIndex = 0;
    crsactInsertList: CourseActivities[] = [];
    crsactUpdatetList: CourseActivities[] = [];
    crsactDeleteList: CourseActivities[] = [];
    courseschedData: CourseSchedules[] = [];
    courseschedDataTemp: CourseSchedules[] = [];
    // TODO angular.copy(this.courseschedData, thiscourseschedDataTemp);
    courseschedModel: CourseSchedules = new CourseSchedules();
    courseschedIndex = 0;
    courseschedInsertList: CourseSchedules[] = [];
    courseschedUpdatetList: CourseSchedules[] = [];
    courseschedDeleteList: CourseSchedules[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    courseSchedColumnDef: any[];
    crsActReadOnly = false;
    courseSchedReadOnly = false;
    buttonBlockReadOnly = false;
    msglist: any;
    message: any;
    type: any;
    tableIndex: number;
    crsactCommitModel: CourseSchedulesCommitBean;
    crsactalertUpdateList: any;
    index: any;
    courseschedCommitModel: CourseSchedulesCommitBean;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('courseschedtab') buildGrid: any;
    crsschedulerulInsertList: any;
    crsschedulerulDeleteList: any;
    crsschedulerulUpdatetList: any;
    currentModel: CourseSchedules;
    cleaeDate: string;
    clearTime: string;
    disableClear: boolean;
    isDataSaved: boolean;
    delRow: boolean;
    retrivedata: boolean;
    scheduleDate: Date;
    schlnsertList: any[];
    schUpdateList: any[];
    schDeleteList: any[];
    disableRetrieve: boolean;
    disableSearchClear: boolean;
    isExit: boolean;
    dateReadOnly: boolean;
    constructor(
        private ocmsoschFactory: OcmsoschService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        public dialogService: DialogService) {
        // TODO initilize data members here..!
        this.courseSchedColumnDef = [];
    }
    ngOnInit() {
        this.courseSchedColumnDef = [
            { fieldName: this.translateService.translate('common.date'),
            required: true, field: 'scheduleDate', editable: true,
            width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocmsosch.weekday'),
            nonSavable: true, field: 'weekday', editable: false,
            width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('ocmsosch.starttime'),
            required: true, field: 'startTime', editable: true,
            width: 150, datatype: 'time' },
            { fieldName: this.translateService.translate('ocmsosch.endtime'),
            required: true, field: 'endTime', editable: true,
            width: 150, datatype: 'time' },
        ];
        this.crsactModel = this.dialog.data;
        // this.ocmsoschPopulateDetails();
        this.courseschedModel = new CourseSchedules();
        this.courseschedModel.crsActyId = this.crsactModel.crsActyId;
        this.courseschedExecuteQuery();
        this.disableClear = true;
        this.isDataSaved = true;
        this.prgSrvDetails();
        this.isExit = false;
        this.delRow = true;
        this.disableSearchClear = true;
        this.dateReadOnly = false;
    }
    payPlnExecuteQuery(datetwo, dateone) {

    }
    /**
     * This function displays the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    getDate(evt) {
        
    }
    allowNumbers(event) {
    }
    onGridInsert = () => {
        this.isDataSaved = false;
        this.delRow = true;
        if (this.schduleValidate(this.courseschedData)) {
            return {

            };
        }
    }
    onGridUpdate(event) {
        this.isDataSaved = false;
    }
    onRowClickcoursesched(event) {

        if (event.scheduleDate) {
            this.currentModel = event;
            this.cleaeDate = event.scheduleDate;
            this.clearTime = event.startTime;
            this.validateClearDate(event.endTime);
        }


    }
    onButClearclick() {
        if (this.isDataSaved && this.currentModel) {
            this.showClearPopUp();
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmsosch.savebeforeclear');
            this.show();
        }

    }
    validateClearDate(date: Date) {
        const sysdate = DateFormat.getDate();
        const effDate = DateFormat.getDate(date);
        if (DateFormat.compareDateTime(effDate, sysdate) <= 0) {
            this.disableClear = true;
            this.delRow = false;
        } else {
            this.disableClear = false;
            this.delRow = true;
        }
    }
    onSchBulderButtonClick = () => {
        if (this.isDataSaved) {
            this.dialogService.openLinkDialog('/OCMSCHRC', this.crsactModel, 80).subscribe(result => {
                this.courseschedExecuteQuery();
            });
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmsosch.savebeforebuild');
            this.show();
        }

    }
    onButExitclick() {
        this.dialog.close(null);
        /* if (this.isDataSaved) {
            this.dialog.close(null);
        } else {
            const data = {

                label: this.translateService.translate('ocmsosch.savechanges'),
                yesBtn: true, noBtn: true, cancelBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                if (result === true) {
                    this.isExit = true;
                    this.onBuildSchedule();
                } else if (result === false) {
                    this.dialog.close(null);
                }
            });
        } */

    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
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
        this.ocmschrcSavecrsschedulerulForm(null);
    }
    ocmschrcSavecrsschedulerulForm(event) {
        this.crsactUpdatetList[0] = this.crsactModel;
        this.crsactCommitModel = new CourseSchedulesCommitBean();
        this.genCourSchCommitBean();
        this.crsschedulerulInsertList = this.schlnsertList;
        this.crsschedulerulUpdatetList = this.schUpdateList;
        this.crsschedulerulDeleteList = this.schDeleteList;
        this.crsactCommitModel.insertList = [];
        this.crsactCommitModel.updateList = [];
        this.crsactCommitModel.deleteList = [];
        if (this.crsschedulerulInsertList.length > 0) {
            if (!this.schduleValidate(this.crsschedulerulInsertList)) {
                return;
            }

            for (let i = 0; i < this.crsschedulerulInsertList.length; i++) {
                this.crsschedulerulInsertList[i].crsActyId = this.crsactModel.crsActyId;
                this.crsschedulerulInsertList[i].capacity = this.crsactModel.capacity;
                this.crsschedulerulInsertList[i].sealFlag = this.crsactModel.sealFlag;
                this.crsschedulerulInsertList[i].weekNo = 1;
                if (this.crsschedulerulInsertList[i].startTime) {
                    this.crsschedulerulInsertList[i].startTime = DateFormat.getDate(DateFormat.getDate(this.crsschedulerulInsertList[i].startTime).setSeconds(0,0));
                }
                if (this.crsschedulerulInsertList[i].endTime) {
                    this.crsschedulerulInsertList[i].endTime = DateFormat.getDate(DateFormat.getDate(this.crsschedulerulInsertList[i].endTime).setSeconds(0,0));
                }
            }
            this.crsschedulerulInsertList = this.crsschedulerulInsertList;
            this.crsactCommitModel.insertList = this.crsschedulerulInsertList;
        }
        if (this.crsschedulerulUpdatetList.length > 0) {
            if (!this.schduleValidate(this.crsschedulerulUpdatetList)) {
                return;
            }
            this.crsschedulerulUpdatetList = this.crsschedulerulUpdatetList;
            for (let i = 0; i < this.crsschedulerulUpdatetList.length; i++) {
                if (this.crsschedulerulUpdatetList[i].startTime) {
                    this.crsschedulerulUpdatetList[i].startTime = DateFormat.getDate(DateFormat.getDate(this.crsschedulerulUpdatetList[i].startTime).setSeconds(0,0));
                }
                if (this.crsschedulerulUpdatetList[i].endTime) {
                    this.crsschedulerulUpdatetList[i].endTime = DateFormat.getDate(DateFormat.getDate(this.crsschedulerulUpdatetList[i].endTime).setSeconds(0,0));
                }
            }
            this.crsactCommitModel.updateList = this.crsschedulerulUpdatetList;
        }

        if (this.crsschedulerulDeleteList.length > 0) {
            this.crsactCommitModel.deleteList = this.crsschedulerulDeleteList;
        }

        const crsschedulerulSaveData = this.ocmsoschFactory.courseSchedCommit(this.crsactCommitModel);
        crsschedulerulSaveData.subscribe(data => {
            if (data === 1) {
                this.isDataSaved = true;
                this.courseschedExecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('ocmsosch.transactionCompleted')
                    .replace('%records%', '' +
                    (this.crsactCommitModel.deleteList.length +
                        this.crsactCommitModel.updateList.length + this.crsactCommitModel.insertList.length));
                this.show();
                this.disableClear = true;
                if (this.isExit) {
                    this.dialog.close(null);
                }
            } else if(data === 2) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmsosch.schedulehoursexceedsthemacallowedperday');
                this.show();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmsosch.transactionFaild');
                this.show();
            }
        });

    }

    onGridDelete = () => {
        this.isDataSaved = false;
        return true;
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'scheduleDate' && event.data.scheduleDate) {

            const prevWeekday = event.data.weekday;
            const date = DateFormat.getDate(event.data.scheduleDate);
            const weekday = date.getDay();
            const options = { weekday: 'long' };
            const updatedWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
            if (!prevWeekday || (prevWeekday && updatedWeek && prevWeekday.trim() != updatedWeek.trim())) {
                this.buildGrid.setColumnData('weekday', rowIndex, updatedWeek);
                rowdata.validated = true;
                return rowdata;
            }
           
        }
        if (event.data.scheduleDate && event.data.startTime) {
            let dateFormat = DateFormat.getDate(event.data.startTime);
            dateFormat.setDate(DateFormat.getDate(event.data.scheduleDate).getDate());
            dateFormat.setMonth(DateFormat.getDate(event.data.scheduleDate).getMonth());
            dateFormat.setFullYear(DateFormat.getDate(event.data.scheduleDate).getFullYear());
            event.data.startTime = dateFormat;
        }

        if (event.data.scheduleDate && event.data.endTime) {
            let dateFormat = DateFormat.getDate(event.data.endTime);
            dateFormat.setDate(DateFormat.getDate(event.data.scheduleDate).getDate());
            dateFormat.setMonth(DateFormat.getDate(event.data.scheduleDate).getMonth());
            dateFormat.setFullYear(DateFormat.getDate(event.data.scheduleDate).getFullYear());
            
            event.data.endTime = dateFormat;
        }

        rowdata.validated = true;
        return rowdata;
    }
    clearSearchModel() {
        this.scheduleDate = undefined;
        this.courseschedData = [];
        this.disableRetrieve = false;
        this.disableSearchClear = true;
        this.dateReadOnly = false;
    }
    onGridClear(event) {
        this.isDataSaved = true;
    }
    courseschedExecuteQuery() {
        this.courseschedModel.crsActyId = this.crsactModel.crsActyId;
        this.courseschedModel.scheduleDate = this.scheduleDate;
        const courseschedResult = this.ocmsoschFactory.
            courseSchedExecuteQuery(this.courseschedModel);
        courseschedResult.subscribe(data => {
            if (data.length === 0) {
                this.courseschedData = [];
                if (this.retrivedata) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimslevl.noRecord');
                    this.show();
                }
                //this.scheduleDate = undefined;
                this.disableRetrieve = false;
                this.disableClear = true;
                this.tableIndex = -1;
                this.disableSearchClear = true;
            } else {
                this.tableIndex = 0;
                this.courseschedData = data;
                this.courseschedModel = data[0];
                this.disableRetrieve = true;
                this.disableClear = false;
                this.disableSearchClear = false;
                this.dateReadOnly = true;
            }
        });
        if (this.scheduleDate)
            this.disableSearchClear = false;
        this.dateReadOnly = true;
    }
    schduleValidate(crsSchList: any) {
        try {
            crsSchList = crsSchList;
            crsSchList.forEach((element) => {
                if (!element.scheduleDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmsosch.datemust');
                    this.show();
                    throw new Error();
                }
                if (element.scheduleDate &&
                    this.crsactModel.scheduleStartDate &&
                    DateFormat.compareDate(
                        DateFormat.getDate(
                            this.crsactModel.scheduleStartDate),
                            DateFormat.getDate(element.scheduleDate)) > 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmsosch.validstartdate')
                    .replace('%start_date%', DateFormat.format(this.crsactModel.scheduleStartDate));
                    this.show();
                    throw new Error();
                }
                if (element.scheduleDate &&
                    this.crsactModel.scheduleEndDate &&
                    DateFormat.compareDate(
                        DateFormat.getDate(this.crsactModel.scheduleEndDate), DateFormat.getDate(element.scheduleDate)) < 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmsosch.validenddate')
                    .replace('%end_date%', DateFormat.format(this.crsactModel.scheduleEndDate));
                    this.show();
                    throw new Error();
                }
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
                if (DateFormat.compareDateTime(DateFormat.getDate(element.endTime), DateFormat.getDate(element.startTime)) < 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocmschrc.timeMsg');
                    this.show();
                    throw new Error();
                }
            });
        } catch (e) {
            return false;
        }
        return true;
    }

    showClearPopUp() {

        const data = {

            label: this.translateService.translate('ocmsosch.clearmsg').replace('%lv_date_char%',
            DateFormat.format(DateFormat.getDate(this.cleaeDate))).
                replace('%lv_time_char%', TimeFormat.format(DateFormat.getDate(this.clearTime))),
            yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
            if (result) {

                this.clearSchedules();
            } else {
            }
        });

    }
    clearSchedules() {
        this.ocmsoschFactory.clearSchedules(this.currentModel)
            .subscribe(data => {
                if (data == 1) {
                    this.courseschedExecuteQuery();
                    this.type = 'success';
                    this.message = this.translateService.translate('ocmsosch.cleardone')
                    .replace('%lv_date_char%', DateFormat.format(DateFormat.getDate(this.cleaeDate))).
                        replace('%lv_time_char%', TimeFormat.format(DateFormat.getDate(this.clearTime)));
                    this.show();
                }
            });
    }
    prgSrvDetails() {
        const ProfileValuesResult = this.ocmsoschFactory.getPrgSrvDetails(this.crsactModel.programId);
        ProfileValuesResult.subscribe(data => {
            if (data.programCode) {
                this.crsactModel.programIdVal = data.programCode;
            }
        });
    }
    assTypeExecuteQuery(date?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.disableRetrieve = false;
                this.disableSearchClear = true;
                this.disableClear = true;
                this.scheduleDate = undefined;
                this.type = 'warn';
                this.message = this.translateService.translate('common.leapyearnotallowed');
                this.show();
                return;
            } else {
                this.retrivedata = true;
                this.courseschedExecuteQuery();
                this.disableRetrieve = true;
                //this.disableSearchClear = false;
                this.disableClear = false;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.scheduleDate = undefined;
                this.disableRetrieve = false;
                this.disableSearchClear = true;
                this.disableClear = true;
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show();
                return;
            } else {
                this.retrivedata = true;
                this.courseschedExecuteQuery();
                this.disableRetrieve = true;
                //this.disableSearchClear = false;
                this.disableClear = false;
            }
        }
    }
}
