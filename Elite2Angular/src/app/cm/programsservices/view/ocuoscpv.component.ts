import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuoscpvService } from '../service/ocuoscpv.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CourseScheduleRules } from '@inst/institutional-activities/maintenance/beans/CourseScheduleRules';
import { CourseActivities } from '@instprogramswithoutschedulesbeans/CourseActivities';
import { VOffenderCourseEvents } from '@inst/institutional-activities/beans/VOffenderCourseEvents';
import { OffenderCourseApptGrp } from '../beans/OffenderCourseApptGrp';
import { OffenderCourseApptRule } from '../beans/OffenderCourseApptRule';
import { OffenderProgramProfiles } from '@instprogramswithoutschedulesbeans/OffenderProgramProfiles';
import { VOffenderCourseEventsCommitBean } from '@inst/institutional-activities/beans/VOffenderCourseEventsCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OffenderCourseApptGrpCommitBean } from '../beans/OffenderCourseApptGrpCommitBean';
import * as moment from 'moment';
import { OffenderCourseApptRulesCommitBean } from '../beans/OffenderCourseAppRuleCommitBean';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ThisReceiver } from '@angular/compiler';


@Component({
    selector: 'app-ocuoscpv',
    templateUrl: './ocuoscpv.component.html'
})

export class OcuoscpvComponent implements OnInit {
    viweFlag = false;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    msgs: any[] = [];
    crsactData: CourseActivities[] = [];
    crsactModel: CourseActivities = new CourseActivities();
    crsactIndex = 0;
    crsschedulerulData: CourseScheduleRules[] = [];
    crsschedulerulModel: CourseScheduleRules = new CourseScheduleRules();
    offschData: VOffenderCourseEvents[] = [];
    offschModel: VOffenderCourseEvents = new VOffenderCourseEvents();
    offschModelBean: VOffenderCourseEvents = new VOffenderCourseEvents();
    offschIndex = 0;
    offschInsertList: VOffenderCourseEvents[] = [];
    offschDeleteList: VOffenderCourseEvents[] = [];
    weeklydefData: OffenderCourseApptGrp[] = [];
    weeklydefRowData: OffenderCourseApptGrp[] = [];
    weeklydefModel: OffenderCourseApptGrp = new OffenderCourseApptGrp();
    weeklydefInsertList: OffenderCourseApptGrp[] = [];
    weeklydefUpdatetList: OffenderCourseApptGrp[] = [];
    weeklydefDeleteList: OffenderCourseApptGrp[] = [];
    offschdefData: OffenderCourseApptRule[] = [];
    offschdefModel: OffenderCourseApptRule = new OffenderCourseApptRule();
    offschdefInsertList: OffenderCourseApptRule[] = [];
    offschdefUpdatetList: OffenderCourseApptRule[] = [];
    offschdefDeleteList: OffenderCourseApptRule[] = [];
    offprgprofilesData: OffenderProgramProfiles[] = [];
    offprgprofilesModel: OffenderProgramProfiles = new OffenderProgramProfiles();
    display: boolean;
    disabled: boolean;
    editable = true;
    weeklyDefColumnDef: any[];
    offSchDefColumnDef: any[];
    crsScheduleRulColumnDef: any[];
    offSchColumnDef: any[];
    option = [{ code: 'All', description: 'All' }, { code: 'Pending', description: 'Pending' }];
    viewTitle = { description: this.translateService.translate('View') };
    holidayFlag: boolean;
    offSchCommitModel: VOffenderCourseEventsCommitBean = new VOffenderCourseEventsCommitBean();
    type: string;
    view: string;
    message: string;
    @ViewChild('offSchGrid', { static: true }) offSchGrid: any;
    @ViewChild('weekgrid', { static: true }) weekgrid: any;
    courseSheduleRuletableIndex: number;
    offSchtableIndex: number;
    weeklyDeftableIndex: number;
    offSchDeftableIndex: number;
    selecteddataOffSchDef: OffenderCourseApptRule = new OffenderCourseApptRule();
    selectedweeklyDefData: OffenderCourseApptGrp = new OffenderCourseApptGrp();
    conflictFlag = true;
    selectedOffSchData: VOffenderCourseEvents = new VOffenderCourseEvents();
    selectedCrsScheduleData: CourseScheduleRules = new CourseScheduleRules();
    weeklydefCommitModel: OffenderCourseApptGrpCommitBean = new OffenderCourseApptGrpCommitBean();
    @ViewChild('weeklyDefGrid', { static: true }) weeklyDefGrid: any;
    lvWeeklyStartDate: Date;
    weeklyDefEnddate: Date;
    noOfWeek: number;
    offschdefCommitModel: OffenderCourseApptRulesCommitBean = new OffenderCourseApptRulesCommitBean();
    @ViewChild('offSchDefGrid', { static: true }) offSchDefGrid: any;
    gridInsBtn = false;
    datemsg: string;
    gridDltBtn = true;
    gridDelOffSchDef = true;
    saveDisabled: boolean;
    selectedTabIndex = 0;
    weeklyDefGridFlag: boolean;
    isHolidayFlagChanged: boolean;
    index: number;

    constructor(private ocuoscpvFactory: OcuoscpvService, public translateService: TranslateService,

        public sessionManager: UserSessionManager, public dialogService: DialogService) {
        this.weeklyDefColumnDef = [];
        this.offSchDefColumnDef = [];
        this.crsScheduleRulColumnDef = [];
        this.offSchColumnDef = [];
    }
    ngOnInit() {
        this.viweFlag = false;
        this.selectedTabIndex = 0;
        this.saveDisabled = true; 
         this.weekDef();
        this.crsScheduleRulColumnDef = [
            {
                fieldName: this.translateService.translate('ocuoscpv.monday'), field: 'mondayFlag', editable: false, width: 150,
                datatype: 'checkbox'
            },

            { fieldName: this.translateService.translate('ocuoscpv.tuesday'), field: 'tuesdayFlag', editable: false, width: 150, datatype: 'checkbox' },

            {
                fieldName: this.translateService.translate('ocuoscpv.wednesday'), field: 'wednesdayFlag', editable: false, width: 150,
                datatype: 'checkbox'
            },

            { fieldName: this.translateService.translate('ocuoscpv.thursday'), field: 'thursdayFlag', editable: false, width: 150, datatype: 'checkbox' },

            { fieldName: this.translateService.translate('ocuoscpv.friday'), field: 'fridayFlag', editable: false, width: 150, datatype: 'checkbox' },

            { fieldName: this.translateService.translate('ocuoscpv.saturday'), field: 'saturdayFlag', editable: false, width: 150, datatype: 'checkbox' },

            { fieldName: this.translateService.translate('ocuoscpv.sunday'), field: 'sundayFlag', editable: false, width: 150, datatype: 'checkbox' },

            { fieldName: this.translateService.translate('common.startTime'), field: 'startTime', editable: false, width: 150, datatype: 'time' },

            {
                fieldName: this.translateService.translate('common.endTime'), field: 'endTime', editable: false, width: 150,
                datatype: 'time'
            },
        ];
        this.offSchColumnDef = [
            {
                fieldName: '', field: 'test', hide: true
            },
            { fieldName: this.translateService.translate('common.date') + '*', field: 'eventDate', editable: true, width: 150, datatype: 'date', cellEditable: this.canCellEditOffSchGrid, },
            {
                fieldName: this.translateService.translate('ocuoscpv.weekday'), field: 'weekday', editable: false, width: 150,
                datatype: 'day'
            },
            {
                fieldName: this.translateService.translate('common.startTime') + '*', field: 'startTime', editable: true, width: 150,
                datatype: 'time', cellEditable: this.canCellEditOffSchGrid,
            },
            {
                fieldName: this.translateService.translate('common.endTime') + '*', field: 'endTime', editable: true, width: 150,
                datatype: 'time', cellEditable: this.canCellEditOffSchGrid,
            },
        ];
        this.weeklyDefColumnDef = [

            {
                fieldName: this.translateService.translate('common.startdate') + '*', field: 'startDate', editable: true, width: 150,
                datatype: 'date', cellEditable: this.canCellEdit
            },
            { fieldName: this.translateService.translate('ocuoscpv.noofweeks'), field: 'noOfWeek', editable: true, width: 150, datatype: 'number', whole: true },
            { fieldName: this.translateService.translate('common.enddate') + '*', field: 'endDate', editable: true, width: 150, datatype: 'date' },
            {
                fieldName: '', field: 'test', hide: true
            },



        ];
        this.offSchDefColumnDef = [
            {
                fieldName: '', field: 'test', hide: true
            },
            {
                fieldName: this.translateService.translate('ocuoscpv.monday'), field: 'mondayFlag', editable: true, width: 150,
                datatype: 'checkbox'
            },

            { fieldName: this.translateService.translate('ocuoscpv.tuesday'), field: 'tuesdayFlag', editable: true, width: 150, datatype: 'checkbox' },

            {
                fieldName: this.translateService.translate('ocuoscpv.wednesday'), field: 'wednesdayFlag', editable: true, width: 150,
                datatype: 'checkbox'
            },

            { fieldName: this.translateService.translate('ocuoscpv.thursday'), field: 'thursdayFlag', editable: true, width: 150, datatype: 'checkbox' },

            { fieldName: this.translateService.translate('ocuoscpv.friday'), field: 'fridayFlag', editable: true, width: 150, datatype: 'checkbox' },

            { fieldName: this.translateService.translate('ocuoscpv.saturday'), field: 'saturdayFlag', editable: true, width: 150, datatype: 'checkbox' },

            { fieldName: this.translateService.translate('ocuoscpv.sunday'), field: 'sundayFlag', editable: true, width: 150, datatype: 'checkbox' },

            {
                fieldName: this.translateService.translate('common.startTime') + '*', field: 'startTime', editable: true, width: 150,
                datatype: 'time'
            },

            {
                fieldName: this.translateService.translate('common.endTime') + '*', field: 'endTime', editable: true, width: 150,
                datatype: 'time'
            },
        ];

        this.crsActexEcuteQuery();
        this.crsSchedulerulExecuteQuery();
        this.weeklyDefExecuteQuery();
        this.offprgprofilesExecuteQuery();
        this.weeklydefModel.offPrgrefId = this.dialog.data.offPrgrefId;
        // const weeklyDef = this.ocuoscpvFactory.weeklyDefGettingStartDate(this.weeklydefModel);
        // weeklyDef.subscribe(data => {
        //     this.lvWeeklyStartDate = DateFormat.getDate(data);
        // });

        this.view = 'Pending';
        this.offschModel.actionCode = this.view;
        // this.offschExecuteQuery();

    }
    canCellEditOffSchGrid = (data: any, index: number, field: string): boolean => {
        if(!this.conflictFlag && !data.weekday && field !== 'eventDate') {
            this.offschModelBean = data;
            this.conflictEvent();
            return false;
          }
        if (data.recordStatus) {
            return false;
        }
        return true;
    }
    canCellEdit = (data: any) => {
        if (data.createDatetime) {
            return false;
        }
        return true;
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    onRowClickcrsschedulerul(event) {
        this.selectedCrsScheduleData = event;
    }
    onRowClickoffsch(event) {
        this.selectedOffSchData = event;
    }

    onButCopyFromProviderclick() {
       /*  if(this.validationOfWeeklyDefData(this.selectedweeklyDefData)) {
           return;
        } */
        if (!this.selectedweeklyDefData.startDate) {
            this.message = this.translateService.translate('ocuoscpv.startdatemustbeenter');
            this.type = 'warn';
            this.show(this.message, this.type);
            return true;
        }
        if (!this.selectedweeklyDefData.endDate) {
            this.message = this.translateService.translate('ocuoscpv.enddatemustbeenter');
            this.type = 'warn';
            this.show(this.message, this.type);
            return true;
        }
        if (this.selectedweeklyDefData.startDate != null && this.selectedweeklyDefData.endDate != null) {
            this.crsschedulerulModel.crsActyId = this.dialog.data.crsActyId;
            const crsschedulerulResult = this.ocuoscpvFactory.copyFromProviderAvailability(this.crsschedulerulModel);
            crsschedulerulResult.subscribe(data => {
                if (data.length > 0) {
                    data.forEach(elements => {
                        this.offSchDefGrid.addRecord();
                        const mondayFlag = elements.mondayFlag === 'Y' ? true : false;
                        const tuesdayFlag = elements.tuesdayFlag === 'Y' ? true : false;
                        const wednesdayFlag = elements.wednesdayFlag === 'Y' ? true : false;
                        const thursdayFlag = elements.thursdayFlag === 'Y' ? true : false;
                        const fridayFlag = elements.fridayFlag === 'Y' ? true : false;
                        const saturdayFlag = elements.saturdayFlag === 'Y' ? true : false;
                        const sundayFlag = elements.sundayFlag === 'Y' ? true : false;
                        this.offSchDefGrid.setColumnData('test', this.offschdefData.length - 1, undefined);
                        this.offSchDefGrid.setColumnData('mondayFlag', this.offschdefData.length - 1, mondayFlag);
                        this.offSchDefGrid.setColumnData('tuesdayFlag', this.offschdefData.length - 1, tuesdayFlag);
                        this.offSchDefGrid.setColumnData('wednesdayFlag', this.offschdefData.length - 1, wednesdayFlag);
                        this.offSchDefGrid.setColumnData('thursdayFlag', this.offschdefData.length - 1, thursdayFlag);
                        this.offSchDefGrid.setColumnData('fridayFlag', this.offschdefData.length - 1, fridayFlag);
                        this.offSchDefGrid.setColumnData('saturdayFlag', this.offschdefData.length - 1, saturdayFlag);
                        this.offSchDefGrid.setColumnData('sundayFlag', this.offschdefData.length - 1, sundayFlag);
                        this.offSchDefGrid.setColumnData('startTime', this.offschdefData.length - 1, elements.startTime);
                        this.offSchDefGrid.setColumnData('endTime', this.offschdefData.length - 1, elements.endTime);
                        });
                }
            });
        }
    }
    get copyButtonDisabled() {
        if ((this.selecteddataOffSchDef && this.selecteddataOffSchDef.offenderCourseApptRuleId) ||this.weeklydefData.length==0) {
            return true;
        }
        return false;
    }
    onRowClickoffschdef(event) {
        if (event) {
            this.selecteddataOffSchDef = event;
        }
        if (event.offenderCourseApptRuleId) {
            this.gridDelOffSchDef = true;
        } else {
            this.gridDelOffSchDef = false;
        }
    }
    onButCancelclick() {
        this.dialog.close(null);
    }
    onOffenderChange(offender) {
    }
    validateRowDataOffScgDef = (event) => {
        this.saveDisabled = false;
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        return rowdata;
    }
    onOffSchDefGridDelete = () => {
        this.saveDisabled = false;
        return true;

    }

    validationOfStartTime() {
        const is = { valid: true };
        if (DateFormat.compareTime(DateFormat.getDate(this.selecteddataOffSchDef.startTime)
            , DateFormat.getDate(this.selecteddataOffSchDef.endTime)) === 1) {
            this.message = this.translateService.translate('ocuoscpv.starttimecannotbelater');
            this.type = 'warn';
            this.show(this.message, this.type);
            is.valid = false;
            return is.valid;
        }
        if (DateFormat.compareTime(DateFormat.getDate(this.selecteddataOffSchDef.endTime)
            , DateFormat.getDate(this.selecteddataOffSchDef.startTime)) === -1) {
            this.message = this.translateService.translate('ocuoscpv.endtimecannotbeearlier');
            this.type = 'warn';
            this.show(this.message, this.type);
            is.valid = false;
            return is.valid;
        }
        return is.valid;
    }
    validateRowDataWeeklyDef = (event) => {
        this.gridInsBtn = true;
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        this.saveDisabled = false;
        if (!this.validationOfStartDate()) {

            rowdata.validated = true;
            return rowdata;
        }
        if (event.field === 'noOfWeek') {
            if (event.data.noOfWeek && (!event.data.test || (event.newValue !== event.oldValue && event.oldValue))) {
                if (event.data.startDate && event.data.noOfWeek) {
                    const fd = moment(DateFormat.getDate(event.data.startDate)).add(event.data.noOfWeek * 7, 'days');
                    this.weeklyDefEnddate = DateFormat.getDate(fd);
                    this.weeklyDefGrid.setColumnData('endDate', rowIndex, this.weeklyDefEnddate);
                    this.weeklyDefGrid.setColumnData('test', rowIndex, false);
                    rowdata.validated = true;
                    return rowdata;
                }
            }
        }
        if (event.field === 'startDate') {
            if (event.data.startDate) {
                if (event.data.startDate && event.data.noOfWeek && !event.data.endDate) {
                    const fd = moment(DateFormat.getDate(event.data.startDate)).add(event.data.noOfWeek * 7, 'days');
                    this.weeklyDefEnddate = DateFormat.getDate(fd);
                    this.weeklyDefGrid.setColumnData('endDate', rowIndex, this.weeklyDefEnddate);
                    rowdata.validated = true;
                    return rowdata;
                }
                if (event.data.startDate && event.data.endDate) {
                    const c1 = moment(DateFormat.getDate(event.data.startDate));
                    const c2 = moment(DateFormat.getDate(event.data.endDate));
                    this.noOfWeek = c2.diff(c1, 'weeks');
                    this.weeklyDefGrid.setColumnData('noOfWeek', rowIndex, this.noOfWeek);
                    this.weeklyDefGrid.setColumnData('test', rowIndex, true);
                    rowdata.validated = true;
                    return rowdata;
                }
            }

        }
        if (event.field === 'endDate') {
            if (event.data.endDate &&
                DateFormat.compareDateTime(DateFormat.getDate(event.oldValue), DateFormat.getDate(event.newValue)) === -1) {

                if (event.data.startDate && event.data.endDate) {
                    const c1 = moment(DateFormat.getDate(event.data.startDate));
                    const c2 = moment(DateFormat.getDate(event.data.endDate));
                    var days=c2.diff(c1, 'week');

                    const c3 = moment(DateFormat.getDate(event.data.startDate)).diff(moment(DateFormat.getDate(event.data.endDate)));
                    this.noOfWeek = c2.diff(c1, 'weeks');
                    const dsf = Math.abs(moment(DateFormat.getDate(event.data.startDate)).
                    diff(moment(DateFormat.getDate(event.data.endDate)), 'weeks'));
                    this.weeklyDefGrid.setColumnData('noOfWeek', rowIndex, this.noOfWeek>0 ? this.noOfWeek : 0);
                    this.weeklyDefGrid.setColumnData('test', rowIndex, true);
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            else{
                if (event.data.startDate && event.data.endDate) {
                    const c1 = moment(DateFormat.getDate(event.data.startDate));
                    const c2 = moment(DateFormat.getDate(event.data.endDate));
                    const c3 = moment(DateFormat.getDate(event.data.startDate)).diff(moment(DateFormat.getDate(event.data.endDate)));

                    this.noOfWeek = c2.diff(c1, 'weeks');
                    this.weeklyDefGrid.setColumnData('noOfWeek', rowIndex, this.noOfWeek >0 ? this.noOfWeek: 0);
                    this.weeklyDefGrid.setColumnData('test', rowIndex, true);
                    rowdata.validated = true;
                    return rowdata;


            }
        }
    }

        rowdata.validated = true;
        return rowdata;
    }

    validationOfStartDate() {
        const is = { valid: true };
        if (!this.selectedweeklyDefData.offenderCourseApptGrpId && this.selectedweeklyDefData.startDate && this.dialog.data.offenderStartDate) {
            if (DateFormat.compareDateTime(DateFormat.getDate(this.selectedweeklyDefData.startDate),
                DateFormat.getDate(this.dialog.data.offenderStartDate)) === -1) {
                let msg = this.translateService.translate('ocuoscpv.startdatecannotbeearlier') + '[' +
                    DateFormat.format(this.dialog.data.offenderStartDate) + ']';
                msg = String(msg);
                this.type = 'warn';
                this.show(msg);
                is.valid = false;
                return is.valid;
            }
        }
        if (!this.selectedweeklyDefData.offenderCourseApptGrpId && this.selectedweeklyDefData.startDate != null && this.lvWeeklyStartDate != null) {
            if (DateFormat.compareDateTime(DateFormat.getDate(this.selectedweeklyDefData.startDate),
                DateFormat.getDate(this.lvWeeklyStartDate)) === -1) {
                let msg = this.translateService.translate('ocuoscpv.errorstartdateshouldbegreater') + '- [' +
                    DateFormat.format(this.lvWeeklyStartDate) + '] - ' +
                    this.translateService.translate('ocuoscpv.toavoidoverlappingofdates');
                msg = String(msg);
                this.type = 'warn';
                this.show(msg);
                is.valid = false;
                return is.valid;
            }
        }
         if (!this.selectedweeklyDefData.offenderCourseApptGrpId && this.selectedweeklyDefData.startDate != null && this.dialog.data.offenderEndDate != null) {
            if (DateFormat.compareDateTime(DateFormat.getDate(this.selectedweeklyDefData.startDate),
                DateFormat.getDate(this.dialog.data.offenderEndDate)) === 1) {
                let msg = this.translateService.translate('ocuoscpv.startdatecannotbelater') + '- [' +
                    DateFormat.format(this.dialog.data.offenderEndDate) + ']';
                msg = String(msg);
                this.type = 'warn';
                this.show(msg);
                is.valid = false;
                return is.valid;
            }
        }
        if (!this.selectedweeklyDefData.offenderCourseApptGrpId && DateFormat.compareDateTime(DateFormat.getDate(this.selectedweeklyDefData.startDate),
            DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0))) === -1) {
            this.message = this.translateService.translate('ocuoscpv.startdateshouldbecurrent');
            this.type = 'warn';
            this.show(this.message, this.type);
            is.valid = false;
            return is.valid;
        }
       
        if (this.dialog.data.offenderEndDate != null) {
            if (DateFormat.compareDateTime(DateFormat.getDate(this.selectedweeklyDefData.endDate),
                DateFormat.getDate(this.dialog.data.offenderEndDate)) === 1) {
                let msg = this.translateService.translate('ocuoscpv.enddatecannotbelaterthanoffender') + '- [' +
                    DateFormat.format(this.dialog.data.offenderEndDate) + ']';
                msg = String(msg);
                this.type = 'warn';
                this.show(msg);
                is.valid = false;
                return is.valid;
            }
        }
          var currentDate = new Date()
          var day = currentDate.getDate()
        if (DateFormat.compareDateTime(DateFormat.getDate(this.selectedweeklyDefData.endDate),
            DateFormat.getDate(day)) === -1) {
            this.message = this.translateService.translate('ocuoscpv.enddateshouldbecurrent');
            this.type = 'warn';
            this.show(this.message, this.type);
            is.valid = false;
            return is.valid;
        }

        return is.valid;
    }

    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'startTime' && event.data.startTime && !event.data.eventDate) {
            this.show('ocuoscpv.youhavetoeneteroffschstardtdate');
            this.offSchGrid.setColumnData('startTime', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        }
        if (event.field === 'endTime' && event.data.endTime && !event.data.eventDate) {
            this.show('ocuoscpv.youhavetoenterend');
            this.offSchGrid.setColumnData('endTime', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        }
        if (event.field === 'eventDate') {
            if (event.data.eventDate) {
                 this.offschModelBean.eventDate = event.data.eventDate;
                this.conflictEvent();
                const offschResult = this.ocuoscpvFactory.offSchGettingWeekDay(event.data);
                offschResult.subscribe(data => {
                    if (data) {
                        this.conflictFlag = true;
                        this.offSchGrid.setColumnData('weekday', rowIndex, data);
                        rowdata.validated = true;
                        return rowdata;
                    }
                });
            }

        }
        rowdata.validated = true;
        return rowdata;

    }
    conflictFlagvalidation() {
        if (this.conflictFlag === false) {
            const rowIndex = this.offschData.indexOf(this.selectedOffSchData);
            this.offSchGrid.setColumnData('weekday', rowIndex, '');
            // this.offSchGrid.setColumnData('eventDate', rowIndex, '');
        }
    }
    conflictEvent() {
        const rowIndex = this.offschData.indexOf(this.offschModel);
        this.offschModelBean.offenderBookId = this.dialog.data.offenderBookId;
        this.offschModelBean.eventDate = DateFormat.getDate(this.offschModelBean.eventDate);
        this.conflictFlag = true;
        const schConflictServiceObj = this.ocuoscpvFactory.offSchCheckScheduleConflict(this.offschModelBean);
        schConflictServiceObj.subscribe(data => {
            if (data === 0) {
            } else {
                this.dialogService.openLinkDialog('/oiuscinq', this.offschModelBean).subscribe(result => {
                    if (result !== null) {
                        this.conflictFlag = true;
                        const offschResult = this.ocuoscpvFactory.offSchGettingWeekDay(this.offschModelBean);
                        offschResult.subscribe(data => {
                            if (data) {
                                this.offSchGrid.setColumnData('weekday', rowIndex, data);
                            }
                        });
                    } else {
                        this.conflictFlag = false;
                        this.conflictFlagvalidation();
                    }
                });
            }

        });
    }
    validattionOfEventDate() {
        const is = { valid: true };
        if (this.selectedOffSchData.eventDate != null && this.crsactModel.scheduleStartDate != null) {
            if (DateFormat.compareDateTime(DateFormat.getDate(this.selectedOffSchData.eventDate),
                DateFormat.getDate(this.crsactModel.scheduleStartDate)) === -1) {
                this.message = this.translateService.translate('ocuoscpv.datecannotbebeforeproject');
                this.type = 'warn';
                this.show(this.message, this.type);
                is.valid = false;
                return is.valid;

            }
        } if (this.selectedOffSchData.eventDate != null && this.crsactModel.scheduleEndDate != null) {
            if (DateFormat.compareDateTime(DateFormat.getDate(this.selectedOffSchData.eventDate)
                , DateFormat.getDate(this.crsactModel.scheduleEndDate)) === 1) {
                this.message = this.translateService.translate('ocuoscpv.datecannotbeafterproject');
                this.type = 'warn';
                this.show(this.message, this.type);
                is.valid = false;
                return is.valid;

            }
        }
        if (DateFormat.compareDateTime(DateFormat.getDate(this.selectedOffSchData.eventDate)
            , DateFormat.getDate(this.dialog.data.offenderStartDate)) === -1) {
            this.message = this.translateService.translate('ocuoscpv.datecannotbebeforeoffenderstartdate');
            this.type = 'warn';
            this.show(this.message, this.type);
            is.valid = false;
            return is.valid;

        }
        if (this.selectedOffSchData.eventDate != null && this.dialog.data.offenderEndDate != null) {
            if (DateFormat.compareDateTime(DateFormat.getDate(this.selectedOffSchData.eventDate)
                , DateFormat.getDate(this.dialog.data.offenderEndDate)) === 1) {
                this.message = this.translateService.translate('ocuoscpv.datecannotbeafteroffenderend');
                this.type = 'warn';
                this.show(this.message, this.type);
                is.valid = false;
                return is.valid;


            }
        }
        return is.valid;

    }

    validattionOfStartTime() {
        const is = { valid: true };
        if (this.selectedOffSchData.startTime && !this.selectedOffSchData.eventDate) {
            this.message = this.translateService.translate('ocuoscpv.youhavetoenteroffenderschedulestartdate');
            this.type = 'warn';
            this.show(this.message, this.type);
            is.valid = false;
            return is.valid;
        }

        if (this.selectedOffSchData.startTime != null && this.selectedOffSchData.endTime != null) {
            if (DateFormat.compareTime(DateFormat.getDate(this.selectedOffSchData.startTime)
                , DateFormat.getDate(this.selectedOffSchData.endTime)) === 1) {
                this.message = this.translateService.translate('ocuoscpv.starttimecannotbelater');
                this.type = 'warn';
                this.show(this.message, this.type);
                is.valid = false;
                return is.valid;
            }
        }

        return is.valid;

    }
    validationOfEndTime() {
        const is = { valid: true };
        if (this.selectedOffSchData.endTime && !this.selectedOffSchData.eventDate) {
            this.message = this.translateService.translate('ocuoscpv.youhavetoenteroffenderschedulestartdate');
            this.type = 'warn';
            this.show(this.message, this.type);
            is.valid = false;
            return is.valid;
        }

        if (this.selectedOffSchData.endTime != null && this.selectedOffSchData.startTime != null) {
            if (DateFormat.compareTime(DateFormat.getDate(this.selectedOffSchData.endTime)
                , DateFormat.getDate(this.selectedOffSchData.startTime)) === -1) {
                this.message = this.translateService.translate('ocuoscpv.endtimecannotbeearlier');
                this.type = 'warn';
                this.show(this.message, this.type);
                is.valid = false;
                return is.valid;
            }
        }

        return is.valid;
    }

    changeScreenCode(event) {
        if (event) {
            this.offschModel.actionCode = event.code;
            this.offschExecuteQuery();
        } else {
        }
    }

    crsActexEcuteQuery() {
        this.crsactModel.crsActyId = this.dialog.data.crsActyId;
        const serviceObj = this.ocuoscpvFactory.crsActExecuteQuery(this.crsactModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.crsactData = [];
            } else {
                this.crsactData = data;
                this.crsactModel = this.crsactData[0];

            }

        });
    }
    crsSchedulerulExecuteQuery() {
        this.crsschedulerulModel.crsActyId = this.dialog.data.crsActyId;
        const crsschedulerulResult = this.ocuoscpvFactory.crsScheduleRulExecuteQuery(this.crsschedulerulModel);
        crsschedulerulResult.subscribe(data => {
            if (data.length === 0) {
                this.crsschedulerulData = [];
            } else {
                data.forEach(element => {
                    element.mondayFlag = element.mondayFlag === 'Y' ? true : false;
                    element.tuesdayFlag = element.tuesdayFlag === 'Y' ? true : false;
                    element.wednesdayFlag = element.wednesdayFlag === 'Y' ? true : false;
                    element.thursdayFlag = element.thursdayFlag === 'Y' ? true : false;
                    element.fridayFlag = element.fridayFlag === 'Y' ? true : false;
                    element.saturdayFlag = element.saturdayFlag === 'Y' ? true : false;
                    element.sundayFlag = element.sundayFlag === 'Y' ? true : false;

                });
                this.crsschedulerulData = data;
                this.crsschedulerulModel = data[0];
                this.courseSheduleRuletableIndex = 0;
            }
        });
    }

    offschExecuteQuery() {
        this.offschModel.offenderBookId = this.dialog.data.offenderBookId;
        this.offschModel.crsActyId = this.dialog.data.crsActyId;
        this.offschModel.offPrgrefId = this.dialog.data.offPrgrefId;
        const offschResult = this.ocuoscpvFactory.offSchExecuteQuery(this.offschModel);
        offschResult.subscribe(data => {
            if (data.length === 0) {
                this.offschData = [];
                if(this.viweFlag && this.selectedTabIndex == 0) {
                    this.message = this.translateService.translate('common.querycaused');
                    this.type = 'warn';
                    this.show(this.message, this.type);
                    return;
                }
                this.viweFlag = true;
            } else {
                this.offschData = data;
                this.offschModel = data[0];
                this.offSchtableIndex = 0;
            }
        });
    }

    weeklyDefExecuteQuery() {
        this.weeklydefModel.offPrgrefId = this.dialog.data.offPrgrefId;
        const serviceObj = this.ocuoscpvFactory.weeklyDefExecuteQuery(this.weeklydefModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.weeklydefData = [];
                this.weeklydefModel = new OffenderCourseApptGrp();
                this.selectedweeklyDefData = new OffenderCourseApptGrp();
                this.gridInsBtn = false;
            } else {
                this.weeklydefData = data;
                this.weeklydefModel = this.weeklydefData[0];
                this.weeklyDeftableIndex = 0;
            }
        });
    }
    onRowClickweeklydef(event) {
        if (event) {
            if (event.offenderCourseApptGrpId) {
                this.gridInsBtn = true;
                this.gridDltBtn = true;
            } else {
                this.gridInsBtn = false;
                this.gridDltBtn = false;
                // this.saveDisabled = false;
            }
            this.selectedweeklyDefData = event;
            this.offschdefModel.offenderCourseApptGrpId = event.offenderCourseApptGrpId;
            this.offschdefExecuteQuery();
        } else {
            this.gridInsBtn = false;
            this.selectedweeklyDefData = new OffenderCourseApptGrp();
        }

    }
    offschdefExecuteQuery() {

        const offschdefResult = this.ocuoscpvFactory.offSchDefExecuteQuery(this.offschdefModel);
        offschdefResult.subscribe(data => {
            if (data.length === 0) {
                this.offschdefData = [];
                this.selecteddataOffSchDef = new OffenderCourseApptRule();
            } else {
                data.forEach(element => {
                    element.mondayFlag = element.mondayFlag === 'Y' ? true : false;
                    element.tuesdayFlag = element.tuesdayFlag === 'Y' ? true : false;
                    element.wednesdayFlag = element.wednesdayFlag === 'Y' ? true : false;
                    element.thursdayFlag = element.thursdayFlag === 'Y' ? true : false;
                    element.fridayFlag = element.fridayFlag === 'Y' ? true : false;
                    element.saturdayFlag = element.saturdayFlag === 'Y' ? true : false;
                    element.sundayFlag = element.sundayFlag === 'Y' ? true : false;

                });
                this.offschdefData = data;
                this.offschdefModel = data[0];
                this.offSchDeftableIndex = 0;
            }
        });
    }

    offprgprofilesExecuteQuery() {
        this.offprgprofilesModel.crsActyId = this.dialog.data.crsActyId;
        this.offprgprofilesModel.programId = this.dialog.data.programId;
        this.offprgprofilesModel.offenderBookId = this.dialog.data.offenderBookId;
        this.offprgprofilesModel.offPrgrefId = this.dialog.data.offPrgrefId;
        const offprgprofilesResult = this.ocuoscpvFactory.offPrgProfilesExecuteQuery(this.offprgprofilesModel);
        offprgprofilesResult.subscribe(data => {
            if (data.length === 0) {
                this.offprgprofilesData = [];
                this.holidayFlag = undefined;
            } else {
                this.offprgprofilesData = data;
                this.offprgprofilesModel = data[0];
                this.holidayFlag = this.offprgprofilesModel.holidayFlag === 'Y' ? true : false;
            }
        });
    }

    onOffSchGridInsert = () => {
        if (this.crsschedulerulData.length == 0) {
            this.message = this.translateService.translate('ocuoscpv.offenderscheduledefinitionmustfall');
            this.type = 'warn';
            this.show(this.message, this.type);
            return ;
        }
        this.saveDisabled = false;
        if (!this.offSchValidation()) {
            return;
        }

        return {
            crsActyId: this.selectedCrsScheduleData.crsActyId,
            courseScheduleRuleId: this.selectedCrsScheduleData.courseScheduleRuleId
        };

    }
    onOffSchClear = () => {
        this.saveDisabled = true;
        return true;
    }
    onWeeklyDefClear = () => {
        this.saveDisabled = true;
        this.selectedweeklyDefData = new OffenderCourseApptGrp();
        this.weeklyDefExecuteQuery();
        return true;
    }

    
    onWeeklyDefGridInsert = () => {

        if(this.weeklydefData && this.weeklydefData.length > 0){
            let endDate = null;
             this.weeklydefData.forEach(e => {
                if(endDate == null){
                    endDate = DateFormat.getDate(e.endDate);
                }else{
                    if(DateFormat.compareDate(DateFormat.getDate(e.endDate),endDate) === 1){
                        endDate = DateFormat.getDate(e.endDate);
                    }
                }
            });
            this.lvWeeklyStartDate = DateFormat.getDate(endDate.setDate(endDate.getDate()+1));
        } 
        if (this.crsschedulerulData.length == 0) {
            this.message = this.translateService.translate('ocuoscpv.offenderscheduledefinitionmustfall');
            this.type = 'warn';
            this.show(this.message, this.type);
            return ;
        }
        this.saveDisabled = false;
        /*this.weeklydefRowData = [];
        this.weeklyDefGrid.addedMap.forEach(
            (v: any, k: number) => {
                this.weeklydefRowData.push(v);
            }
        );
        this.weeklyDefGrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.weeklydefRowData.push(v);
            }
        );*/
       /* for (let i = 0; i < this.weeklydefRowData.length; i++) {
            if (!this.weeklydefRowData[i].startDate) {
                this.message = this.translateService.translate('ocuoscpv.startdatemustbeenter');
                this.type = 'warn';
                this.show(this.message, this.type);
                return;
            }
            if (!this.weeklydefRowData[i].endDate) {
                this.message = this.translateService.translate('ocuoscpv.enddatemustbeenter');
                this.type = 'warn';
                this.show(this.message, this.type);
                return;
            }
        }*/
        if (!this.lvWeeklyStartDate &&
         DateFormat.compareDate(DateFormat.getDate(this.dialog.data.offenderStartDate)
         ,DateFormat.getDate()) === 1) {
            return { startDate: this.dialog.data.offenderStartDate };
        } else if(!this.lvWeeklyStartDate) {
            return { startDate: DateFormat.getDate() };
        } else {
            return { startDate: this.lvWeeklyStartDate };
        }

    }
    validationOfWeeklyDefData(event) {
        if (!event.startDate) {
            this.message = this.translateService.translate('ocuoscpv.startdatemustbeenter');
            this.type = 'warn';
            this.show(this.message, this.type);
            return true;
        }
        if (!event.endDate) {
            this.message = this.translateService.translate('ocuoscpv.enddatemustbeenter');
            this.type = 'warn';
            this.show(this.message, this.type);
            return true;
        }
        if (event.startDate != null && this.lvWeeklyStartDate != null) {
            if (DateFormat.compareDateTime(DateFormat.getDate(event.startDate),
                DateFormat.getDate(this.lvWeeklyStartDate)) === -1) {
                let msg = this.translateService.translate('ocuoscpv.errorstartdateshouldbegreater') + '- [' +
                    DateFormat.format(this.lvWeeklyStartDate) + '] - ' +
                    this.translateService.translate('ocuoscpv.toavoidoverlappingofdates');
                msg = String(msg);
                this.type = 'warn';
                this.show(msg);
                return true;
            }
        }
        if (event.startDate && this.dialog.data.offenderStartDate) {
            if (DateFormat.compareDateTime(DateFormat.getDate(event.startDate),
                DateFormat.getDate(this.dialog.data.offenderStartDate)) === -1) {
                let msg = this.translateService.translate('ocuoscpv.startdatecannotbeearlier') + '[' +
                    DateFormat.format(this.dialog.data.offenderStartDate) + ']';
                msg = String(msg);
                this.type = 'warn';
                this.show(msg);
                return true;
            }
        } if (event.startDate != null && this.dialog.data.offenderEndDate != null) {
            if (DateFormat.compareDateTime(DateFormat.getDate(event.startDate),
                DateFormat.getDate(this.dialog.data.offenderEndDate)) === 1) {
                let msg = this.translateService.translate('ocuoscpv.startdatecannotbelater') + '- [' +
                    DateFormat.format(this.dialog.data.offenderEndDate) + ']';
                msg = String(msg);
                this.type = 'warn';
                this.show(msg);
                return true;
            }
        }
        if (DateFormat.compareDateTime(DateFormat.getDate(event.startDate),
            DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0))) === -1) {
            this.message = this.translateService.translate('ocuoscpv.startdateshouldbecurrent');
            this.type = 'warn';
            this.show(this.message, this.type);
            return true;
        }
        if (event.startDate != null && this.lvWeeklyStartDate != null) {
            if (DateFormat.compareDateTime(DateFormat.getDate(event.startDate),
                DateFormat.getDate(this.lvWeeklyStartDate)) === -1) {
                let msg = this.translateService.translate('ocuoscpv.errorstartdateshouldbegreater') + '- [' +
                    DateFormat.format(this.lvWeeklyStartDate) + '] - to avoid overlapping of dates';
                msg = String(msg);
                this.type = 'warn';
                this.show(msg);
                return true;
            }
        }
        if (this.dialog.data.offenderEndDate != null) {
            if (DateFormat.compareDateTime(DateFormat.getDate(event.endDate),DateFormat.getDate(this.dialog.data.offenderEndDate)) === 1) {
                let msg = this.translateService.translate('ocuoscpv.enddatecannotbelaterthanoffender') + '- [' +
                    DateFormat.format(this.dialog.data.offenderEndDate) + ']';
                msg = String(msg);
                this.type = 'warn';
                this.show(msg);
                return true;
            }
        }
        if (DateFormat.compareDate(DateFormat.getDate(),
            DateFormat.getDate(event.endDate)) === 1) {
            this.message = this.translateService.translate('ocuoscpv.enddateshouldbecurrent');
            this.type = 'warn';
            this.show(this.message, this.type);
            return true;
        }
        if (DateFormat.compareDate(DateFormat.getDate(event.startDate),
        DateFormat.getDate(event.endDate)) === 1) {
        this.message = this.translateService.translate('Start Date cannot be later than End Date');
        this.type = 'warn';
        this.show(this.message, this.type);
        return true;
    }
        return false;
    }
    onWeeklyDefGridDelete = () => {
        this.saveDisabled = false;
        return true;
    }
    offSchValidation() {
        const is = { valid: true };
        this.offschData.forEach(data => {
            if (!data.eventDate) {
                this.message = this.translateService.translate('common.datemustbeentereddate');
                this.type = 'warn';
                this.show(this.message, this.type);
                is.valid = false;
                return is.valid;
            }
            if (!data.startTime) {
                this.message = this.translateService.translate('ocuoscpv.starttimemustbeentered');
                this.type = 'warn';
                this.show(this.message, this.type);
                is.valid = false;
                return is.valid;
            }
            if (!data.endTime) {
                this.message = this.translateService.translate('ocuoscpv.endtimemustbeentered');
                this.type = 'warn';
                this.show(this.message, this.type);
                is.valid = false;
                return is.valid;
            }

        });
        return is.valid;
    }
    onOffSchDefGridInsert = () => {
        this.saveDisabled = false;
        if (!this.offSchDefValidation()) {
            return;
        }
        return {};
    }
    onOffSchDefClear = () => {
        this.saveDisabled = true;
        this.offschdefExecuteQuery();
        return true;
    }
    offSchDefValidation() {
        const is = { valid: true };
        this.offschdefData.forEach(data => {
            if (!data.startTime) {
                this.message = this.translateService.translate('ocuoscpv.starttimemustbeentered');
                this.type = 'warn';
                this.show(this.message, this.type);
                is.valid = false;
                return is.valid;
            }
            if (!data.endTime) {
                this.message = this.translateService.translate('ocuoscpv.endtimemustbeentered');
                this.type = 'warn';
                this.show(this.message, this.type);
                is.valid = false;
                return is.valid;
            }
        });
        return is.valid;
    }
    whenTabChangedTrigger(event) {
        this.selectedTabIndex = event.index;
        if (this.selectedTabIndex === 1) {
            this.weeklyDefExecuteQuery();
        }

    }

    onSave() {
        if (this.selectedTabIndex === 0) {
            this.offSchCommitModel.insertList = [];
            this.offSchCommitModel.deleteList = [];
            this.offschInsertList = [];

            this.offSchGrid.addedMap.forEach(
                (v: any, k: number) => {
                    this.offschInsertList.push(v);
                }
            );
            if (this.offschInsertList.length > 0) {
                for (let i = 0; i < this.offschInsertList.length; i++) {
                    if(!this.offSchValidation()) {
                        return;
                    }
                    if(!this.validationOfStartTime()) {
                        return;
                    }
                    if(!this.validationOfEndTime()) {
                        return;
                    }
                    if (!this.validattionOfEventDate() ) {
                        return;
                    }
                   
                    this.offschInsertList[i].offenderCourseApptGrpId = this.selecteddataOffSchDef.offenderCourseApptRuleId;
                    if (this.offschInsertList[i].startTime) {
                        let startHours = DateFormat.getDate(this.offschInsertList[i].startTime).getHours();
                        let startMinutes = DateFormat.getDate(this.offschInsertList[i].startTime).getMinutes();
                        this.offschInsertList[i].startTime = DateFormat.getDate(DateFormat.getDate(this.offschInsertList[i].eventDate).setHours(startHours, startMinutes, 0, 0));
                    }
                    if (this.offschInsertList[i].endTime) {
                        let startHours = DateFormat.getDate(this.offschInsertList[i].endTime).getHours();
                        let startMinutes = DateFormat.getDate(this.offschInsertList[i].endTime).getMinutes();
                        this.offschInsertList[i].endTime = DateFormat.getDate(DateFormat.getDate(this.offschInsertList[i].eventDate).setHours(startHours, startMinutes, 0, 0));
                    }

                   // this.offschInsertList[i].startDate = this.selectedweeklyDefData.startDate;
                    this.offschInsertList[i].offenderBookId = this.dialog.data.offenderBookId;
                    this.offschInsertList[i].offPrgrefId = this.dialog.data.offPrgrefId;
                    this.offschInsertList[i].programCategory = this.dialog.data.programCategory ? this.dialog.data.programCategory :this.dialog.data.programDescription
                    if (this.crsschedulerulData.length > 0) {
                        this.offschInsertList[i].crsActyId = this.selectedCrsScheduleData.crsActyId;
                        this.offschInsertList[i].courseScheduleRuleId = this.selectedCrsScheduleData.courseScheduleRuleId;
                    }
                    this.offSchCommitModel.insertList = this.offschInsertList;

                }
            }

            if (this.offschInsertList.length > 0 || this.offschDeleteList.length > 0) {
                const offschSaveData = this.ocuoscpvFactory.offSchCommit(this.offSchCommitModel);
                offschSaveData.subscribe(data => {
                    if (data === 3) {
                        this.show(this.translateService.translate('ocuoscpv.youcannotcreateascheduleonpublicholiday'));
                        return;
                    }
                    if (data === 2) {
                        this.show(this.translateService.translate('ocuoscpv.offenderscheduledefinitionmustfall'));
                        return;
                    }
                    if (data === 1) {
                        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                        this.offschExecuteQuery();
                        return;
                    } else {
                        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
                        this.offschExecuteQuery();
                        return;
                    }
                });
            }
        } else {
            this.offschdefInsertList = [];
            this.offschdefUpdatetList = [];
            this.offschdefDeleteList = [];
            this.weeklydefInsertList = [];
            this.weeklydefDeleteList = [];
            this.weeklydefUpdatetList = [];
            this.weeklydefCommitModel.insertList = [];
            this.weeklydefCommitModel.updateList = [];
            this.weeklydefCommitModel.deleteList = [];
            this.weeklydefCommitModel.offschInsertList = [];
            this.weeklydefCommitModel.offschUpdateList = [];
            this.weeklydefCommitModel.offschDeleteList = [];
            this.weeklydefCommitModel.updateOffPrgList = [];
            this.offschdefCommitModel.insertList = [];
            this.offschdefCommitModel.deleteList = [];
            this.offschdefCommitModel.updateList = [];
            this.weeklyDefGridFlag = false;
            this.weeklyDefGrid.addedMap.forEach(
                (v: any, k: number) => {
                    this.weeklydefInsertList.push(v);
                }
            );
            this.weeklyDefGrid.updatedMap.forEach(
                (v: any, k: number) => {
                    this.weeklydefUpdatetList.push(v);
                }
            );
            this.weeklyDefGrid.removedMap.forEach(
                (v: any, k: number) => {
                    this.weeklydefDeleteList.push(v);
                }
            );
            this.offSchDefGrid.addedMap.forEach(
                (v: any, k: number) => {
                    this.offschdefInsertList.push(v);
                }
            );
            this.offSchDefGrid.removedMap.forEach(
                (v: any, k: number) => {
                    this.offschdefDeleteList.push(v);
                }
            );
            this.offSchDefGrid.updatedMap.forEach(
                (v: any, k: number) => {
                    this.offschdefUpdatetList.push(v);
                }
            );
            if (this.weeklyDefGrid && this.weeklyDefGrid.removedMap.size > 0) {
                const deleteList = [];
                this.weeklyDefGrid.removedMap.forEach((value, keys) => { deleteList.push(value); });
                if (deleteList.length > 0) {
                    deleteList.forEach(element => {
                        if (DateFormat.compareDateTime(DateFormat.getDate(element.startDate), DateFormat.getDate()) === -1) {
                            this.weeklyDefGridFlag = true;
                        }
                    });
                }
                if (this.weeklyDefGridFlag) {
                    this.message = this.translateService.translate('ocuoscpv.youareonlyallowedtodeleteweeklydefinition');
                    this.type = 'warn';
                    this.weeklyDefExecuteQuery();
                    this.show(this.message, this.type);
                    return;
                }
            }
            // if (this.weeklydefInsertList.length > 0 && this.offschdefInsertList.length > 0
            //     && !this.offschdefInsertList[0].offenderCourseApptRuleId) {

            // }
            // if (this.weeklydefInsertList.length > 0 || this.weeklydefDeleteList.length > 0 || this.weeklydefUpdatetList.length > 0) {
                this.ocuoscpvSaveweeklydefForm();
            // }

            // if (this.offschdefInsertList.length > 0 || this.offschdefDeleteList.length > 0 || this.offschdefUpdatetList.length > 0) {
            //     this.ocuoscpvSaveoffschdefForm();
            // }
        }
    }
    validateRowDataOffSch = (event) => {
        this.saveDisabled = false;
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        return rowdata;
    }
    ocuoscpvSaveweeklydefForm() {
        if (this.weeklydefInsertList.length > 0) {
            for (let i = 0; i < this.weeklydefInsertList.length; i++) {
                if (this.validationOfWeeklyDefData(this.weeklydefInsertList[i])) {
                    return;
                }
                if(this.crsschedulerulData.length === 0){
                    this.show(this.translateService.translate('ocuoscpv.offenderscheduledefinitionmustfall'));
                    return;
                }
                this.weeklydefInsertList[i].offPrgrefId = this.dialog.data.offPrgrefId;
                this.weeklydefCommitModel.insertList = this.weeklydefInsertList;
            }
        }
        if (this.weeklydefUpdatetList.length > 0) {
            for (let i = 0; i < this.weeklydefUpdatetList.length; i++) {
                if (this.validationOfWeeklyDefData(this.weeklydefUpdatetList[i])) {
                    return;
                }
                if(this.crsschedulerulData.length === 0){
                    this.show(this.translateService.translate('ocuoscpv.offenderscheduledefinitionmustfall'));
                    return;
                }
                this.weeklydefCommitModel.updateList = this.weeklydefUpdatetList;
            }

        }
        if (this.weeklydefDeleteList.length > 0) {
            for (let i = 0; i < this.weeklydefDeleteList.length; i++) {
                this.weeklydefCommitModel.deleteList = this.weeklydefDeleteList;
            }

        }
        //offschdef
        if (this.offschdefInsertList.length > 0 || this.offschdefUpdatetList.length > 0) {
            for (let i = 0; i < this.offschdefInsertList.length; i++) {
                if (this.offSchDefValidations(this.offschdefInsertList[i])) {
                    return;
                }
                if(this.crsschedulerulData.length === 0){
                    this.show(this.translateService.translate('ocuoscpv.offenderscheduledefinitionmustfall'));
                    return;
                }
                /* if( (this.offschdefInsertList[i].mondayFlag    && !this.selectedCrsScheduleData.mondayFlag)    || 
                    (this.offschdefInsertList[i].tuesdayFlag   && !this.selectedCrsScheduleData.tuesdayFlag)   || 
                    (this.offschdefInsertList[i].wednesdayFlag && !this.selectedCrsScheduleData.wednesdayFlag) || 
                    (this.offschdefInsertList[i].thursdayFlag  && !this.selectedCrsScheduleData.thursdayFlag)  || 
                    (this.offschdefInsertList[i].fridayFlag    && !this.selectedCrsScheduleData.fridayFlag)    || 
                    (this.offschdefInsertList[i].saturdayFlag  && !this.selectedCrsScheduleData.saturdayFlag)  || 
                    (this.offschdefInsertList[i].sundayFlag    && !this.selectedCrsScheduleData.sundayFlag)    ||
                    (DateFormat.compareTime(DateFormat.getDate(this.offschdefInsertList[i].startTime),DateFormat.getDate(this.selectedCrsScheduleData.startTime)) === 1 && 
                     DateFormat.compareTime(DateFormat.getDate(this.offschdefInsertList[i].startTime),DateFormat.getDate(this.selectedCrsScheduleData.endTime)) === -1) || 
                    (DateFormat.compareTime(DateFormat.getDate(this.offschdefInsertList[i].endTime),DateFormat.getDate(this.selectedCrsScheduleData.startTime)) === 1 && 
                     DateFormat.compareTime(DateFormat.getDate(this.offschdefInsertList[i].endTime),DateFormat.getDate(this.selectedCrsScheduleData.endTime)) === -1)){

                        this.show(this.translateService.translate('ocuoscpv.offenderscheduledefinitionmustfall'));
                        return;
                } */
                this.offschdefInsertList[i].offenderCourseApptGrpId = this.selectedweeklyDefData.offenderCourseApptGrpId;
                this.offschdefInsertList[i].mondayFlag = this.offschdefInsertList[i].mondayFlag === true ? true : false;

                this.weeklydefCommitModel.offschInsertList = this.offschdefInsertList;
            }
            for (let i = 0; i < this.offschdefUpdatetList.length; i++) {
                if (this.offSchDefValidations(this.offschdefUpdatetList[i])) {
                    return;
                }
                if(this.crsschedulerulData.length === 0){
                    this.show(this.translateService.translate('ocuoscpv.offenderscheduledefinitionmustfall'));
                    return;
                }
                /* if( (this.offschdefUpdatetList[i].mondayFlag    && !this.selectedCrsScheduleData.mondayFlag)    || 
                    (this.offschdefUpdatetList[i].tuesdayFlag   && !this.selectedCrsScheduleData.tuesdayFlag)   || 
                    (this.offschdefUpdatetList[i].wednesdayFlag && !this.selectedCrsScheduleData.wednesdayFlag) || 
                    (this.offschdefUpdatetList[i].thursdayFlag  && !this.selectedCrsScheduleData.thursdayFlag)  || 
                    (this.offschdefUpdatetList[i].fridayFlag    && !this.selectedCrsScheduleData.fridayFlag)    || 
                    (this.offschdefUpdatetList[i].saturdayFlag  && !this.selectedCrsScheduleData.saturdayFlag)  || 
                    (this.offschdefUpdatetList[i].sundayFlag    && !this.selectedCrsScheduleData.sundayFlag)    ||
                    (DateFormat.compareTime(DateFormat.getDate(this.offschdefUpdatetList[i].startTime),DateFormat.getDate(this.selectedCrsScheduleData.startTime)) === 1 && 
                     DateFormat.compareTime(DateFormat.getDate(this.offschdefUpdatetList[i].startTime),DateFormat.getDate(this.selectedCrsScheduleData.endTime)) === -1) || 
                    (DateFormat.compareTime(DateFormat.getDate(this.offschdefUpdatetList[i].endTime),DateFormat.getDate(this.selectedCrsScheduleData.startTime)) === 1 && 
                     DateFormat.compareTime(DateFormat.getDate(this.offschdefUpdatetList[i].endTime),DateFormat.getDate(this.selectedCrsScheduleData.endTime)) === -1)){

                        this.show(this.translateService.translate('ocuoscpv.offenderscheduledefinitionmustfall'));
                        return;
                } */
               // this.offschdefUpdatetList[i].offenderCourseApptRuleId = this.selecteddataOffSchDef.offenderCourseApptRuleId;
                this.weeklydefCommitModel.offschUpdateList = this.offschdefUpdatetList;
            }

        }
        if (this.offschdefDeleteList.length > 0) {
            for (let i = 0; i < this.offschdefDeleteList.length; i++) {
                this.weeklydefCommitModel.offschDeleteList = this.offschdefDeleteList;
            }

        }
        //Holiday flag in Offender Program Files
        if(this.isHolidayFlagChanged){
            this.offprgprofilesModel.holidayFlag = this.offprgprofilesModel.holidayFlag ? 'Y':'N';
            this.weeklydefCommitModel.updateOffPrgList.push(this.offprgprofilesModel);
        }
        const weeklydefSaveData = this.ocuoscpvFactory.weeklyDefCommit(this.weeklydefCommitModel);
        weeklydefSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.saveDisabled = true;
                this.isHolidayFlagChanged = false;
                this.offschExecuteQuery();
                this.weeklyDefExecuteQuery();
              

                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
                this.isHolidayFlagChanged = false;
                return;
            }
        });
    }
    offSchDefValidations(event) {
        if (!event.startTime) {
            this.message = this.translateService.translate('ocuoscpv.starttimemustbeentered');
            this.type = 'warn';
            this.show(this.message, this.type);
            return true;
        }
        if (!event.endTime) {
            this.message = this.translateService.translate('ocuoscpv.endtimemustbeentered');
            this.type = 'warn';
            this.show(this.message, this.type);
            return true;
        }
        if (DateFormat.compareTime(DateFormat.getDate(event.startTime)
            , DateFormat.getDate(event.endTime)) === 1) {
            this.message = this.translateService.translate('ocuoscpv.starttimecannotbelater');
            this.type = 'warn';
            this.show(this.message, this.type);
            return true;
        }
        if (DateFormat.compareTime(DateFormat.getDate(event.endTime)
            , DateFormat.getDate(event.startTime)) === -1) {
            this.message = this.translateService.translate('ocuoscpv.endtimecannotbeearlier');
            this.type = 'warn';
            this.show(this.message, this.type);
            return true;
        }
        return false;
    }
    ocuoscpvSaveoffschdefForm() {
        if (this.offschdefInsertList.length > 0 || this.offschdefUpdatetList.length > 0) {
            for (let i = 0; i < this.offschdefInsertList.length; i++) {
                if (this.offSchDefValidations(this.offschdefInsertList[i])) {
                    return;
                }
                this.offschdefInsertList[i].offenderCourseApptGrpId = this.selectedweeklyDefData.offenderCourseApptGrpId;
                this.offschdefInsertList[i].mondayFlag = this.offschdefInsertList[i].mondayFlag === true ? true : false;

                this.offschdefCommitModel.insertList = this.offschdefInsertList;
            }
            for (let i = 0; i < this.offschdefUpdatetList.length; i++) {
                this.offschdefUpdatetList[i].offenderCourseApptRuleId = this.selecteddataOffSchDef.offenderCourseApptRuleId;
                this.offschdefCommitModel.updateList = this.offschdefUpdatetList;
            }

        }
        if (this.offschdefDeleteList.length > 0) {
            for (let i = 0; i < this.offschdefDeleteList.length; i++) {

                this.offschdefCommitModel.deleteList = this.offschdefDeleteList;
            }

        }
        const offschdefSaveData = this.ocuoscpvFactory.offSchDefCommit(this.offschdefCommitModel);
        offschdefSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.offschdefExecuteQuery();

                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));

                return;
            }
        });
    }

    holidayFlagChange(event){
		this.isHolidayFlagChanged = true;
        this.saveDisabled = false;
        this.offprgprofilesModel.holidayFlag = event.checked
	}

weekDef(){
    this.weeklydefModel.offPrgrefId = this.dialog.data.offPrgrefId;
    const weeklyDef = this.ocuoscpvFactory.weeklyDefGettingStartDate(this.weeklydefModel);
    weeklyDef.subscribe(data => {
        this.lvWeeklyStartDate = DateFormat.getDate(data);
    });
}

}

