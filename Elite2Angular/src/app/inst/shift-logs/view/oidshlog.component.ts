import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidshlogService } from '../service/oidshlog.service';
import { AgencyShiftLogs } from '@instshiftlogsbeans/AgencyShiftLogs';
import { AgencyShiftLogsCommitBean } from '@instshiftlogsbeans/AgencyShiftLogsCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { IWPPaneService } from '@core/ui-components/pane/iwppane.service';


@Component({
    selector: 'app-oidshlog',
    templateUrl: './oidshlog.component.html'
})

export class OidshlogComponent implements OnInit {
    @ViewChild('searchForm', { static: true }) form: any;
    @ViewChild('locationlov') locationlov: any;
    @ViewChild('grid', { static: true }) grid: any;
    staffId: number;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    agyshilData: AgencyShiftLogs[] = [];
    agyshilDataTemp: AgencyShiftLogs[] = [];
    agyshilModel: AgencyShiftLogs = new AgencyShiftLogs();
    agyshilModeTemp: AgencyShiftLogs = new AgencyShiftLogs();
    agyshilIndex = 0;
    agyshilInsertList: AgencyShiftLogs[] = [];
    agyshilUpdatetList: AgencyShiftLogs[] = [];
    agyshilDeleteList: AgencyShiftLogs[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    agyShilReadOnly = false;
    cgfkAgyshildspagylocid4Rg: any[] = [];
    cgfkAgyshilstaffidRg: any[] = [];
    cgfkAgyshildspagylocid3Rg: any[] = [];
    cgfkAgyshilagyactivitycodRg: any[] = [];
    agyshilSingleList: AgencyShiftLogs[] = [];
    agyshilDoubleList: AgencyShiftLogs[] = [];
    nextFlag: boolean;
    prevFlag: boolean;
    agyshilCommitModel: AgencyShiftLogsCommitBean = new AgencyShiftLogsCommitBean();
    caseLoadId: any;
    saveFlag: boolean;
    lstOfAgyShift: AgencyShiftLogs[];
    index = 0;
    reportingLink: any;
    facilityLink: any;
    activityLink: any;
    logFlagReadOnly: boolean; 
    addFlag: boolean;
    lockProceedFlag = false;
    iterationFlagCompleted = false;
    recordCount = 0;
    sequenceFlag = false;
    firstRetrieve = false;
    retrieveFlag = false;
    listSize = 0;
    verifyLockFlag: boolean;
    lvHours: number;
    lvCreateDate: Date;
    backDateMessage: any;
    clearEnabledFlag: boolean;
    retrievedClickedFlag = false;
    timeDesDisabledWhileRetrieve = false;
    isshowing = false;
    isLocationRequried = true;
    shLocId: boolean;
    updateFlag: boolean;
    flag: boolean;
    disableFlag: any;
    locationLink: any;
    agyshilColumnDef: any[];
    tableIndex: number;
    staffIdNew: any;
    deleteagyShilData: boolean;
    agyLocIdMap: Map<number, string> = new Map<number, string>();
    dateTemp: any;
    logDateTemp: any;
    durationTimeTemp: any[];
    agcylogResnTemp:any;
    showDocIcon:boolean = false;

    constructor(private oidshlogFactory: OidshlogService,
        public translateService: TranslateService, private sessionManager: UserSessionManager,
        private activatedRoute: ActivatedRoute, private router: Router,
        public dialogService: DialogService,private iwpPaneService :IWPPaneService) {
        this.lstOfAgyShift = [];
        this.agyshilColumnDef = [];
    }
    ngOnInit() {

        this.deleteagyShilData = false;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.agyshilModel.staffId = 0;
        this.facilityLink = 'oidshlog/cgfkAgyShilDspAgyLocId4RecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.reportingLink = 'oidshlog/cgfkAgyShilStaffIdRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.activityLink = 'oidshlog/cgfkAgyShilAgyActivityCodRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.locationLink = 'oidshlog/cgfkAgyShilDspAgyLocId3RecordGroup?agyLocId=';
        this.saveFlag = false;
        this.nextFlag = false;
        this.prevFlag = false;
        this.addFlag = false;
        this.verifyLockFlag = false;
        this.sequenceFlag = true;
        this.updateFlag = false;

        this.agyshilColumnDef = [
            {
                fieldName: this.translateService.translate('oidshlog.shiftlog'), field: 'shiftLogSeq', editable: false,
                width: 150, datatype: 'number', maxValue: '999999999', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('oidshlog.date'), field: 'logDate', editable: false, width: 150,
                required: 'true', datatype: 'date', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('oidshlog.time'), field: 'logTime', editable: false, width: 150,
                required: 'true', datatype: 'time', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('oidshlog.facility'), field: 'dspAgyLocId4',
                editable: false, width: 150, datatype: 'lov', cellEditable: this.canCellEdit, link: this.facilityLink, required: 'true', source: 'OUMAGLOC'
            },

            {
                fieldName: this.translateService.translate('oidshlog.location'), field: 'dspAgyLocId3',
                editable: false, width: 150, datatype: 'lov', link: this.locationLink, parentField: 'dspAgyLocId4', source: 'OIMULOCA',
                 required: 'true',  cellEditable: this.canCellEdit,

                titles: {
                    description: this.translateService.translate('common.description'),
                    internalLocationCode: this.translateService.translate('common.code')
                  }
            },

            {
                fieldName: this.translateService.translate('oidshlog.staffname'), field: 'staffId',
                editable: false, width: 150, datatype: 'lov', link: this.reportingLink, required: 'true', source: 'OIMPERSO', cellEditable: this.canCellEdit
            },

            {
                fieldName: this.translateService.translate('oidshlog.activitytype'), field: 'agyActivityCode',
                editable: false, width: 150, datatype: 'lov', domain: 'ACT_TYPE', required: 'true', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('oidshlog.reason'), field: 'reason',
                editable: true, width: 150, datatype: 'lov', domain: 'ACT_REAS', cellEditable: this.canAlertEdit,
            },
            {
                fieldName: this.translateService.translate('oidshlog.starttime'), field: 'startTime',
                editable: true, width: 150, datatype: 'time', cellEditable: this.canAlertEdit, required: 'true'
            },
            {
                fieldName: this.translateService.translate('oidshlog.endtime'), field: 'endTime',
                editable: true, width: 150, datatype: 'time', cellEditable: this.canAlertEdit, required: 'true'
            },
            {
                fieldName: this.translateService.translate('oidshlog.durationtime'), field: 'durationTime', datatype: 'text',
                editable: false, width: 150
            },

            {
                fieldName: this.translateService.translate('oidshlog.description'), field: 'observationDetails', editable: true,
                width: 150, datatype: 'text', uppercase: 'false', cellEditable: this.canAlertEdit
            },

            {
                fieldName: '', field: 'internalLocationId', hide: 'true'
            },
            {
                fieldName: '', field: 'test', hide: 'true'
            },
            {
                fieldName: this.translateService.translate('oidshlog.lock'), field: 'verifyLockFlag', editable: false,
                width: 150, datatype: 'checkbox', cellEditable: this.canAlertEditCheckbox, hide: 'true'
            },
            {
                fieldName: this.translateService.translate('oidshlog.relatedoffender') , field: 'button', datatype: 'hyperlink', displayas: 'href', dialogWidth: '80%',
                styleClass: 'launch', link: '/OIDSHLOGDIALOG', editable: true, width: 100, data: 'row', updateField: 'row',
                modal: true, height: 90, onLaunchClick: this.onDialogCick
            },
            {
                fieldName: this.translateService.translate('oidshlog.amend'), field: 'amendedFlag', editable: false,
                width: 150, datatype: 'checkbox',
            },

            {
                fieldName: this.translateService.translate('oidshlog.error'), field: 'errorFlag',
                width: 150, datatype: 'checkbox', cellEditable: this.canAlertEditCheckbox,
            },

            {
                fieldName: '', field: 'errorFlagTemp', hide: true

            },

        ];

        const checkboxHide = this.oidshlogFactory.checkBoxHideData();
        checkboxHide.subscribe(hideData => {
            if (hideData) {
                if (hideData === 'ON') {
                    this.isshowing = true;
                    this.agyshilColumnDef[this.agyshilColumnDef.length - 1].hide = 'false';
                    this.grid.prepareAgColumnDef();
                } else {
                    this.isshowing = false;
                }
            }
        });
        this.agyshilExecuteQuery();
        const cgfkAgyshildspagylocid4ServiceObj = this.oidshlogFactory.cgfkAgyShilDspAgyLocId4RecordGroup(this.caseLoadId);
        cgfkAgyshildspagylocid4ServiceObj.subscribe(cgfkAgyshildspagylocid4List => {
            if (cgfkAgyshildspagylocid4List.length === 0) {
                this.cgfkAgyshildspagylocid4Rg = [];
            } else {
                for (let i = 0; i < cgfkAgyshildspagylocid4List.length; i++) {
                    this.cgfkAgyshildspagylocid4Rg.push({
                        'text': cgfkAgyshildspagylocid4List[i].code + ' - ' +
                            cgfkAgyshildspagylocid4List[i].description, 'id': cgfkAgyshildspagylocid4List[i].code
                    });
                }
            }
        });
        const cgfkAgyshilstaffidServiceObj = this.oidshlogFactory.
            cgfkAgyShilStaffIdRecordGroup(this.caseLoadId);
        cgfkAgyshilstaffidServiceObj.subscribe(cgfkAgyshilstaffidList => {
            if (cgfkAgyshilstaffidList.length === 0) {
                this.cgfkAgyshilstaffidRg = [];
            } else {
                for (let i = 0; i < cgfkAgyshilstaffidList.length; i++) {
                    this.cgfkAgyshilstaffidRg.push({
                        'text': cgfkAgyshilstaffidList[i].code + ' - ' +
                            cgfkAgyshilstaffidList[i].description, 'id': cgfkAgyshilstaffidList[i].code
                    });
                }
            }
        });
        const cgfkAgyshilagyactivitycodServiceObj = this.oidshlogFactory.
            cgfkAgyShilAgyActivityCodRecordGroup();
        cgfkAgyshilagyactivitycodServiceObj.subscribe(cgfkAgyshilagyactivitycodList => {
            if (cgfkAgyshilagyactivitycodList.length === 0) {
                this.cgfkAgyshilagyactivitycodRg = [];
            } else {
                for (let i = 0; i < cgfkAgyshilagyactivitycodList.length; i++) {
                    this.cgfkAgyshilagyactivitycodRg.push({
                        'text': cgfkAgyshilagyactivitycodList[i].code + ' - ' +
                            cgfkAgyshilagyactivitycodList[i].description, 'id': cgfkAgyshilagyactivitycodList[i].code
                    });
                }
            }
        });
        const serviceObj = this.oidshlogFactory.agyShilWhenNewRecordInstance();
        serviceObj.subscribe(data => {
            if (data.staffId) {
                this.agyshilModel.logDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
                this.agyshilModel.logTime = DateFormat.getDate();
                this.agyshilModel.logTime.setSeconds(0);
                this.staffId = data.staffId;
                this.onReportingByWhenValidationItemTrigger();
            } else {
                this.agyshilModel.logDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
                this.agyshilModel.logTime = DateFormat.getDate();
                this.agyshilModel.logTime.setSeconds(0);
            }
        });

        const checkboxShlock = this.oidshlogFactory.checkBoxShlogData();
        checkboxShlock.subscribe(shLocData => {
            if (shLocData > 0) {
                this.shLocId = true;
                this.logFlagReadOnly = false;
            } else {
                this.shLocId = false;
                this.logFlagReadOnly = true;
            }
        });

        const serviceObjOne = this.oidshlogFactory.agyShilWhenNewRecordInstance();
        serviceObj.subscribe(data => {
            if (data.staffId) {
                this.staffIdNew = data.staffId;
            }
        });
    }

    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (this.agyShilReadOnly && data.shiftLogSeq) {
            return false;
        } if ((data.amendedFlag==='Y'|| data.amendedFlag=== true )||( data.errorFlag === 'Y' ||  data.errorFlag === true )) {
            return false;
        } else {
            return true;
        }
    }

    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.shiftLogSeq) {
            return false;
        } else {
            return true;
        }
    }

    canAlertEditCheckbox = (data: any, index: number, field: string): boolean => {
        if (field === 'errorFlag') {
            if(!data.createDatetime){
                return false;
            }
        return !data.errorFlagTemp;

        }
        if (this.isshowing) {
            return false;
        } else {
            return true;
        }
    }

    oidshlogOnClearDetailsTrigger() {
        this.isLocationRequried = true;
        this.agyshilData = [];
        this.lstOfAgyShift = [];
        this.agyshilModel = new AgencyShiftLogs();
        this.addFlag = false;
        this.nextFlag = true;
        this.prevFlag = true;
        this.saveFlag = true;
        this.agyShilReadOnly = false;
        this.sequenceFlag = false;
        this.firstRetrieve = true;
        this.staffId = undefined;
        this.agyshilIndex = 0;
        this.index = 0;
        this.retrieveFlag = false;
        this.verifyLockFlag = undefined;
        this.clearEnabledFlag = true;
        this.retrievedClickedFlag = false;
        this.timeDesDisabledWhileRetrieve = true;
        this.flag = false;
        if (this.locationlov && this.locationlov.options && this.locationlov.options.length > 0) {
            this.locationlov.options = [];
        }
        const dspAgyLocId3 = this.agyshilModel.dspAgyLocId3 === undefined ? '' : undefined;
        this.agyshilModel.dspAgyLocId3 = dspAgyLocId3;
        const agyLocId = this.agyshilModel.dspAgyLocId4 === undefined ? '' : undefined;
        this.agyshilModel.dspAgyLocId4 = agyLocId;
        if (this.isshowing && this.shLocId) {
            this.logFlagReadOnly = false;
        } else {
            this.logFlagReadOnly = true;
        }
    }
    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowClickoffbkgs(event) {
        if (event) {
            this.agyshilModel = event;
            if (this.agyshilModel.shiftLogSeq) {
                    this.showDocIcon=true;
                    this.iwpPaneService.objectId=this.agyshilModel.shiftLogSeq.toString();
                this.deleteagyShilData = true;
            } else {
                this.showDocIcon=false;
                this.deleteagyShilData = false;
            }
            if (event.agyActivityCode === 'LETGO' || event.agyActivityCode === 'LOCK') {
                this.grid.requiredOn('reason')
            } else {
                this.grid.requiredOff('reason')
            }
        }else{
            this.showDocIcon=false;
        }
    }
    agyshilExecuteQuery() {
        this.retrievedClickedFlag = true;
        this.isLocationRequried = true;
        this.agyshilIndex = 0;
        this.index = 0;
        if (!this.firstRetrieve) {
            this.agyshilModeTemp.globalCaseLoadId = this.caseLoadId;
        } else {
            this.agyshilModeTemp = this.agyshilModel;
            this.agyshilModeTemp.globalCaseLoadId = this.caseLoadId;
            if (!this.timeDesDisabledWhileRetrieve) {
                if (this.agyshilModeTemp.logDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.agyshilModeTemp.logDate), DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('oidshlog.logdateandtime'), 'error');
                        return;
                    }
                }
            }
            if (this.agyshilModeTemp.logDate && this.agyshilModeTemp.logTime) {
                if (DateFormat.compareDate(this.agyshilModeTemp.logDate, DateFormat.getDate()) === 0) {
                    this.agyshilModel.logTime.setSeconds(0);
                    if (!this.timeDesDisabledWhileRetrieve) {
                        if (DateFormat.compareTime(this.agyshilModeTemp.logTime, DateFormat.getDate()) === 1) {
                            this.show(this.translateService.translate('oidshlog.logdateandtime'), 'error');
                            return false;
                        }
                    }
                }
                if (this.agyshilModeTemp.logDate) {
                    this.agyshilModel.logTime.setSeconds(0);
                    this.agyshilModeTemp.logTime = TimeFormat.parse(TimeFormat.format(this.agyshilModeTemp.logTime),
                        DateFormat.getDate(this.agyshilModeTemp.logDate));
                } else {
                    this.agyshilModel.logTime.setSeconds(0);
                    this.agyshilModeTemp.logTime = TimeFormat.parse(TimeFormat.format(this.agyshilModeTemp.logTime),
                        DateFormat.getDate());
                }
            }
            if (this.agyshilModeTemp.logDate) {
                this.agyshilModeTemp.logDate = DateFormat.getDate(this.agyshilModeTemp.logDate);
            }
            if (this.verifyLockFlag) {
                this.agyshilModeTemp.lockFlag = 'Y';
            } else if (this.verifyLockFlag !== undefined && !this.verifyLockFlag) {
                this.agyshilModeTemp.lockFlag = 'N';
            }
            if (this.staffId) {
                this.agyshilModeTemp.staffId = Number(this.staffId);
            }
        }
        // this.agyshilModeTemp.dspAgyLocId4 = this.sessionManager.currentCaseLoad;
        const obj = this.oidshlogFactory.agyShilExecuteQuery(this.agyshilModeTemp);
        obj.subscribe(agyshilResultList => {
            if (agyshilResultList.length === 0) {
                this.show(this.translateService.translate('oidshlog.querycaused'), 'warn');
                this.agyshilData = [];
                this.lstOfAgyShift = [];
                this.agyshilModeTemp = new AgencyShiftLogs();
                this.nextFlag = true;
                this.prevFlag = true;
                this.addFlag = false;
                this.sequenceFlag = false;
                this.retrieveFlag = false;
                this.timeDesDisabledWhileRetrieve = true;
            } else {
                this.agyshilModeTemp = new AgencyShiftLogs();
                for (let i = 0; i < agyshilResultList.length; i++) {
                    if (agyshilResultList[i].logDate) {
                        agyshilResultList[i].logDate = DateFormat.getDate(agyshilResultList[i].logDate);
                    }
                    if (agyshilResultList[i].logTime) {
                        agyshilResultList[i].logTime = DateFormat.getDate(agyshilResultList[i].logTime);
                    }
                    if (agyshilResultList[i].startTime != null && agyshilResultList[i].endTime != null) {

                        var startTimeHours = DateFormat.getDate(agyshilResultList[i].startTime).getHours()

                        var startTimeMint = DateFormat.getDate(agyshilResultList[i].startTime).getMinutes();

                        var endTimeHours = DateFormat.getDate(agyshilResultList[i].endTime).getHours();
                        var endTimeMint = DateFormat.getDate(agyshilResultList[i].endTime).getMinutes();

                        if (endTimeMint < startTimeMint) {
                            endTimeHours = endTimeHours - 1;
                            endTimeMint = endTimeMint + 60;
                        }
                        var finallyStartTime = endTimeHours - startTimeHours;
                        var finallyendTimeMint = endTimeMint - startTimeMint;
                        if (startTimeHours === endTimeHours && startTimeMint === endTimeMint) {
                            agyshilResultList[i].durationTime = '00:00'
                        }
                        agyshilResultList[i].durationTime = (finallyStartTime < 10 ? '0' + finallyStartTime : finallyStartTime) + ':' + (finallyendTimeMint < 10 ? '0' + finallyendTimeMint : finallyendTimeMint)
                    } else {
                        agyshilResultList[i].durationTime = undefined;
                    }

                    agyshilResultList[i].verifyLockFlag = agyshilResultList[i].lockFlag === 'Y' ? true : false;
                    agyshilResultList[i].button = '..';

                    agyshilResultList[i].amendedFlag = agyshilResultList[i].amendedFlag === 'Y' ? true : false;
                    agyshilResultList[i].errorFlag = agyshilResultList[i].errorFlag === 'Y' ? true : false;
                    agyshilResultList[i]['errorFlagTemp'] = agyshilResultList[i].errorFlag;

                }
                
                this.agyshilDataTemp = JSON.parse(JSON.stringify(agyshilResultList));
                this.agyshilData = agyshilResultList;
                this.lstOfAgyShift = agyshilResultList;
                this.agyshilModel = agyshilResultList[0];
                this.staffId = this.agyshilModel.staffId;
                this.tableIndex = 0;
                if (this.agyshilModel.lockFlag === 'Y') {
                    this.verifyLockFlag = true;
                } else {
                    this.verifyLockFlag = false;
                }
                this.nextFlag = false;
                this.saveFlag = true;
                if ((this.isshowing && this.shLocId) || (!this.isshowing)) {
                    this.logFlagReadOnly = false;
                    this.agyShilReadOnly = false;
                } else {
                    this.logFlagReadOnly = true;
                    this.agyShilReadOnly = true;
                }
                this.addFlag = false;
                this.sequenceFlag = true;
                this.firstRetrieve = false;
                this.prevFlag = false;
                this.retrieveFlag = true;
                this.timeDesDisabledWhileRetrieve = false;
                this.flag = false;
                const backDatedHours = this.oidshlogFactory.getBackDateHours();
                backDatedHours.subscribe(backDatedHoursValue => {
                    if (backDatedHoursValue !== null) {
                        this.lvHours = Number(backDatedHoursValue);
                    }
                });
            }
        });
    }
    oidshlogSaveagyshilCommitForm(event) {
        this.agyshilInsertList = event.added;
        this.agyshilUpdatetList = event.updated;
        this.agyshilDeleteList = event.removed;
        this.agyshilCommitModel.insertList = [];
        this.agyshilCommitModel.updateList = [];
        this.agyshilCommitModel.deleteList = [];
        if (this.agyshilInsertList.length > 0 || this.agyshilUpdatetList.length > 0) {
            for (let i = 0; i < this.agyshilInsertList.length; i++) {

                if (this.agyshilInsertList[i].startTime && this.agyshilInsertList[i].endTime) {
                    if (DateFormat.compareTime(DateFormat.getDate(this.agyshilInsertList[i].startTime), DateFormat.getDate(this.agyshilInsertList[i].endTime)) === 1) {
                        this.show(this.translateService.translate('oidshlog.starttimecannotbegreaterthanendtime.'), 'warn');
                        return;
                    }
                }
                if (!this.agyshilInsertList[i].logDate) {
                    this.show(this.translateService.translate('Log Date must be entered'), 'warn');
                    return false;
                }

                if (!this.agyshilInsertList[i].logTime) {
                    this.show(this.translateService.translate('Log Time must be entered'), 'warn');
                    return false;
                }


                if (!this.agyshilInsertList[i].dspAgyLocId4) {
                    this.show(this.translateService.translate('Facility must be entered'), 'warn');
                    return false;
                }

                if (!this.agyshilInsertList[i].dspAgyLocId3) {
                    this.show(this.translateService.translate('Location must be entered'), 'warn');
                    return false;
                }
                if (!this.agyshilInsertList[i].staffId) {
                    this.show(this.translateService.translate('Reporting Staff must be entered'), 'warn');
                    return false;
                }

                if (!this.agyshilInsertList[i].agyActivityCode) {
                    this.show(this.translateService.translate('Activity Type must be entered'), 'warn');
                    return false;
                } else {
                    if (this.agyshilInsertList[i].agyActivityCode === 'LETGO' || this.agyshilInsertList[i].agyActivityCode === 'LOCK') {
                        if (!this.agyshilInsertList[i].reason) {
                            this.show(this.translateService.translate('oidshlog.reasonvalidation'), 'warn');
                            return false;
                        }
                    }

                }
                if (!this.agyshilInsertList[i].startTime) {
                    this.show(this.translateService.translate('oidshlog.starttimemustbeentered'), 'warn');
                    return false;
                   }
                if (!this.agyshilInsertList[i].endTime) {
                    this.show(this.translateService.translate('oidshlog.endtimemustbeentered'), 'warn');
                    return false;
                }

                this.agyshilInsertList[i].logDate = DateFormat.getDate(this.agyshilInsertList[i].logDate);
                if (DateFormat.compareDate(DateFormat.getDate(this.agyshilInsertList[i].logDate), DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidshlog.logdateandtime'), 'error');
                    return false;
                }
                if (DateFormat.compareDate(DateFormat.getDate(this.agyshilInsertList[i].logDate), DateFormat.getDate()) === 0) {
                    this.agyshilInsertList[i].logTime.setSeconds(0);
                    if (DateFormat.compareTime(this.agyshilInsertList[i].logTime, DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('oidshlog.logdateandtime'), 'error');
                        return false;
                    }
                }
                if (this.lvHours > 0) {
                    this.dateTemp = DateFormat.getDate();
                    this.dateTemp.setHours(this.dateTemp.getHours() - this.lvHours);
                    var hrs = DateFormat.getDate(this.agyshilInsertList[i].logTime).getHours();
                    var min = DateFormat.getDate(this.agyshilInsertList[i].logTime).getMinutes();
                    var sec = DateFormat.getDate(this.agyshilInsertList[i].logTime).getSeconds();
                    this.logDateTemp = DateFormat.getDate(this.agyshilInsertList[i].logDate.setHours(hrs, min, sec));
                    if ((this.dateTemp - this.logDateTemp) * 24 > this.lvHours) {
                        this.backDateMessage = this.translateService.translate('oidshlog.logdateandtimeback')
                            + ' ' + this.lvHours + ' ' + this.translateService.translate('oidshlog.logdateandtimebackdate');
                        this.show(this.backDateMessage, 'error');
                        return false;
                    }
                }
                if (this.agyshilInsertList[i].logDate) {
                    this.agyshilInsertList[i].logTime.setSeconds(0);
                    this.agyshilInsertList[i].logTime = TimeFormat.parse(TimeFormat.format(this.agyshilInsertList[i].logTime),
                        this.agyshilInsertList[i].logDate);
                }
                this.agyshilInsertList[i].lockFlag = this.agyshilInsertList[i].verifyLockFlag ? 'Y' : 'N';
                this.agyshilInsertList[i].amendedFlag = this.agyshilInsertList[i].amendedFlag ? 'Y' : 'N';
                this.agyshilInsertList[i].errorFlag = this.agyshilInsertList[i].errorFlag ? 'Y' : 'N';
                this.agyshilInsertList[i].internalLocationId = Number(this.agyshilInsertList[i].dspAgyLocId3);
            }
        }



        for (let i = 0; i < this.agyshilUpdatetList.length; i++) {

            if (this.agyshilUpdatetList[i].startTime && this.agyshilUpdatetList[i].endTime) {
                if (DateFormat.compareDateTime(DateFormat.getDate(this.agyshilUpdatetList[i].startTime), DateFormat.getDate(this.agyshilUpdatetList[i].endTime)) === 1) {
                    this.show(this.translateService.translate('oidshlog.starttimecannotbegreaterthanendtime'), 'warn');
                    return;
                }

            }
            if (!this.agyshilUpdatetList[i].logDate) {
                this.show(this.translateService.translate('Log Date must be entered'), 'warn');
                return false;
            }

            if (!this.agyshilUpdatetList[i].logTime) {
                this.show(this.translateService.translate('Log Time must be entered'), 'warn');
                return false;
            }


            if (!this.agyshilUpdatetList[i].dspAgyLocId4) {
                this.show(this.translateService.translate('Facility must be entered'), 'warn');
                return false;
            }

            if (!this.agyshilUpdatetList[i].dspAgyLocId3) {
                this.show(this.translateService.translate('Location must be entered'), 'warn');
                return false;
            }
            if (!this.agyshilUpdatetList[i].staffId) {
                this.show(this.translateService.translate('Reporting Staff must be entered'), 'warn');
                return false;
            }

            if (!this.agyshilUpdatetList[i].agyActivityCode) {
                this.show(this.translateService.translate('Activity Type must be entered'), 'warn');
                return false;
            } else {
                if (this.agyshilUpdatetList[i].agyActivityCode === 'LETGO' || this.agyshilUpdatetList[i].agyActivityCode === 'LOCK') {
                    if (!this.agyshilUpdatetList[i].reason) {
                        this.show(this.translateService.translate('oidshlog.reasonvalidation'), 'warn');
                        return false;
                    }
                }

            }
            if (!this.agyshilUpdatetList[i].startTime) {
                this.show(this.translateService.translate('oidshlog.starttimemustbeentered'), 'warn');
                return false;
               }
            if (!this.agyshilUpdatetList[i].endTime) {
                this.show(this.translateService.translate('oidshlog.endtimemustbeentered'), 'warn');
                return false;
            }
            let objList = this.agyshilDataTemp.filter(e => e.shiftLogSeq === this.agyshilUpdatetList[i].shiftLogSeq);
            if (objList && objList.length > 0) {
                if (objList[0].reason != this.agyshilUpdatetList[i].reason || objList[0].startTime?.toString() != this.agyshilUpdatetList[i].startTime?.toString() ||
                    objList[0].endTime?.toString() != this.agyshilUpdatetList[i].endTime?.toString() || objList[0].observationDetails != this.agyshilUpdatetList[i].observationDetails ||
                    objList[0].errorFlag != this.agyshilUpdatetList[i].errorFlag) {
                    this.agyshilUpdatetList[i].amendedFlag = 'Y';
                }
            }
            this.agyshilUpdatetList[i].logDate = DateFormat.getDate(this.agyshilUpdatetList[i].logDate);
            if (DateFormat.compareDate(DateFormat.getDate(this.agyshilUpdatetList[i].logDate), DateFormat.getDate()) === 1) {
                this.show(this.translateService.translate('oidshlog.logdateandtime'), 'error');
                return false;
            }
            if (DateFormat.compareDate(DateFormat.getDate(this.agyshilUpdatetList[i].logDate), DateFormat.getDate()) === 0) {
                DateFormat.getDate(this.agyshilUpdatetList[i].logTime).setSeconds(0);
                if (DateFormat.compareTime(DateFormat.getDate(this.agyshilUpdatetList[i].logTime), DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidshlog.logdateandtime'), 'error');
                    return false;
                }
            }
            if (this.lvHours > 0) {
                this.dateTemp = DateFormat.getDate();
                this.dateTemp.setHours(this.dateTemp.getHours() - this.lvHours);
                var hrs = DateFormat.getDate(this.agyshilUpdatetList[i].logTime).getHours();
                var min = DateFormat.getDate(this.agyshilUpdatetList[i].logTime).getMinutes();
                var sec = DateFormat.getDate(this.agyshilUpdatetList[i].logTime).getSeconds();
                this.logDateTemp = DateFormat.getDate(this.agyshilUpdatetList[i].logDate.setHours(hrs, min, sec));
                if ((this.dateTemp - this.logDateTemp) * 24 > this.lvHours) {
                    this.backDateMessage = this.translateService.translate('oidshlog.logdateandtimeback')
                        + ' ' + this.lvHours + ' ' + this.translateService.translate('oidshlog.logdateandtimebackdate');
                    this.show(this.backDateMessage, 'error');
                    return false;
                }
            }
            if (this.agyshilUpdatetList[i].logDate) {
                DateFormat.getDate(this.agyshilUpdatetList[i].logTime).setSeconds(0);
                this.agyshilUpdatetList[i].logTime = TimeFormat.parse(TimeFormat.format(this.agyshilUpdatetList[i].logTime),
                    this.agyshilUpdatetList[i].logDate);
            }
            this.agyshilUpdatetList[i].lockFlag = this.agyshilUpdatetList[i].verifyLockFlag ? 'Y' : 'N';
            this.agyshilUpdatetList[i].amendedFlag = this.agyshilUpdatetList[i].amendedFlag ? 'Y' : 'N';
            this.agyshilUpdatetList[i].errorFlag = this.agyshilUpdatetList[i].errorFlag ? 'Y' : 'N';
            this.agyshilUpdatetList[i].internalLocationId = Number(this.agyshilUpdatetList[i].dspAgyLocId3);
        }

        if ((this.isshowing && !this.shLocId) && (this.agyshilInsertList.length > 0 || this.agyshilUpdatetList.length > 0)) {
            const lockFlagMessage = {
                label: this.translateService.translate('oidshlog.shiftlogconfirmation'), yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/oidshlogconfirmationpopup', lockFlagMessage, 80).subscribe(result => {
                if (!result) {
                    for (let i = 0; i < this.agyshilInsertList.length; i++) {
                        this.grid.setColumnData('test', this.agyshilData.indexOf(this.agyshilInsertList[i]), undefined);
                        this.grid.setColumnData('test', this.agyshilData.indexOf(this.agyshilInsertList[i]), 'test');
                    }
                    return false;
                } else {
                    for (let i = 0; i < this.agyshilInsertList.length; i++) {
                        this.agyshilInsertList[i].lockFlag = 'Y';
                        this.agyshilInsertList[i].verifyLockFlag = true;



                    }
                    for (let i = 0; i < this.agyshilUpdatetList.length; i++) {
                        this.agyshilUpdatetList[i].lockFlag = 'Y';
                        this.agyshilUpdatetList[i].verifyLockFlag = true;
                        this.agyshilUpdatetList[i].amendedFlag = this.agyshilInsertList[i].amendedFlag ? 'Y' : 'N';
                        this.agyshilUpdatetList[i].errorFlag = this.agyshilInsertList[i].errorFlag ? 'Y' : 'N';



                    }
                    this.agyshilCommitModel.insertList = this.agyshilInsertList;
                    this.agyshilCommitModel.updateList = this.agyshilUpdatetList;
                    this.agyshilCommitModel.deleteList = this.agyshilDeleteList;
                    this.saveRecords();
                }
            });
        } else {
            for (let i = 0; i < this.agyshilInsertList.length; i++) {
                this.agyshilInsertList[i].lockFlag = 'N';
                this.agyshilInsertList[i].verifyLockFlag = false;
            }
            for (let i = 0; i < this.agyshilUpdatetList.length; i++) {
                this.agyshilUpdatetList[i].lockFlag = 'N';
                this.agyshilUpdatetList[i].verifyLockFlag = false;
            }
            this.agyshilCommitModel.insertList = this.agyshilInsertList;
            this.agyshilCommitModel.updateList = this.agyshilUpdatetList;
            this.agyshilCommitModel.deleteList = this.agyshilDeleteList;
            this.saveRecords();
        }
    }


    saveRecords() {
        const agyshilSaveData = this.oidshlogFactory.agyShilCommit(this.agyshilCommitModel);
        agyshilSaveData.subscribe(data => {
            if (data[0] && data[0].listSeq === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.agyshilExecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.agyshilExecuteQuery();
                return;
            }
        });
    }


    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidshlogSaveagyshilForm() {
        this.agyshilSingleList = [];
        this.agyshilInsertList = [];
        this.agyshilUpdatetList = [];
        this.agyshilDeleteList = [];
        this.agyshilCommitModel.insertList = [];
        this.agyshilCommitModel.updateList = [];
        this.agyshilCommitModel.deleteList = [];
        this.iterationFlagCompleted = false;
        this.lockProceedFlag = false;
        this.recordCount = 0;
        if (this.lstOfAgyShift === null || this.lstOfAgyShift.length === 0) {
            this.lstOfAgyShift.push(this.agyshilModel);
        }
        if ((this.agyshilModel.shiftLogSeq)) {
            if (this.verifyLockFlag === true) {
                this.agyshilModel.lockFlag = 'Y';
            } else {
                this.agyshilModel.lockFlag = 'N';
            }
            if (!this.isshowing) {
                this.lockFlagVerification(event);
            } else {
                this.agyshilUpdatetList.push(this.agyshilModel);
                this.agyshilCommitModel.updateList = this.agyshilUpdatetList;
                this.saveAgencyShiftLogs();
            }
        }
        if (this.lstOfAgyShift.length > 0) {
            for (let i = 0; i < this.lstOfAgyShift.length; i++) {
                if (!this.lstOfAgyShift[i].shiftLogSeq || (this.lstOfAgyShift[i].updatedRecord &&
                    this.lstOfAgyShift[i].updatedRecord === 'updated')) {
                    this.recordCount = this.recordCount + 1;
                    this.lstOfAgyShift[i].shiftLogSaveSeq = this.recordCount;
                    this.agyshilInsertList.push(this.lstOfAgyShift[i]);
                }
            }
        }
        if (this.agyshilInsertList.length > 0) {
            for (let i = 0; i < this.agyshilInsertList.length; i++) {
                if (!this.agyshilInsertList[i].logDate ||
                    !this.agyshilInsertList[i].logTime || !this.agyshilInsertList[i].dspAgyLocId4 ||
                    !this.agyshilInsertList[i].dspAgyLocId3 || !this.agyshilInsertList[i].staffId ||
                    !this.agyshilInsertList[i].agyActivityCode) {
                    this.show(this.translateService.translate('oidshlog.fieldmustentered'), 'warn');
                    return false;
                }
                this.agyshilInsertList[i].logDate = DateFormat.getDate(this.agyshilInsertList[i].logDate);
                if (DateFormat.compareDate(DateFormat.getDate(this.agyshilInsertList[i].logDate), DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidshlog.logdateandtime'), 'error');
                    return false;
                }
                if (DateFormat.compareDate(DateFormat.getDate(this.agyshilInsertList[i].logDate), DateFormat.getDate()) === 0) {
                    this.agyshilInsertList[i].logTime.setSeconds(0);
                    if (DateFormat.compareTime(this.agyshilInsertList[i].logTime, DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('oidshlog.logdateandtime'), 'error');
                        return false;
                    }
                }
                if (this.lvHours > 0) {
                    if ((DateFormat.getDate().getDate() - DateFormat.getDate(this.agyshilInsertList[i].logDate).getDate()) * 24 >
                        this.lvHours) {
                        this.backDateMessage = this.translateService.translate('oidshlog.logdateandtimeback')
                            + ' ' + this.lvHours + ' ' + this.translateService.translate('oidshlog.logdateandtimebackdate');
                        this.show(this.backDateMessage, 'error');
                        return false;
                    }
                }
                if (this.agyshilInsertList[i].logDate) {
                    this.agyshilInsertList[i].logTime.setSeconds(0);
                    this.agyshilInsertList[i].logTime = TimeFormat.parse(TimeFormat.format(this.agyshilInsertList[i].logTime),
                        this.agyshilInsertList[i].logDate);
                }
            }
            if (this.agyshilInsertList.length > 0) {
                const i = 0;
                this.lockFlagVerification(i);
            }

        }
    }

    lockFlagVerification(event) {
        this.listSize = this.agyshilInsertList.length;
        if (!this.verifyLockFlag) {
            this.agyshilModel.lockFlag = 'N';
        }
        if ((this.isshowing && !this.shLocId) || (!this.isshowing && this.agyshilModel.lockFlag === 'Y')) {
            const lockFlagMessage = {
                label: this.translateService.translate('oidshlog.shiftlogconfirmation'), yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/oidshlogconfirmationpopup', lockFlagMessage, 80).subscribe(result => {
                if (!result) {
                    if (this.agyshilInsertList.length > 0) {
                        this.agyshilInsertList[event].lockFlag = 'N';
                        this.lockProceedFlag = false;
                        // this.saveAgencyWithoutLockShiftLogs();
                        return;
                    } else {
                        this.agyshilModel.lockFlag = 'N';
                        this.verifyLockFlag = false;
                    }
                } else {
                    if (this.agyshilInsertList.length > 0) {
                        this.agyshilInsertList[event].lockFlag = 'Y';
                        this.lockProceedFlag = true;
                        this.agyshilSingleList.push(this.agyshilInsertList[event]);
                        if (this.agyshilSingleList.length === this.agyshilInsertList.length) {
                            this.agyshilCommitModel.insertList = this.agyshilSingleList;
                            this.saveAgencyShiftLogs();
                            return;
                        }
                        if (event < this.listSize) {
                            event = event + 1;
                            this.lockFlagVerification(event);
                        } else {
                            return;
                        }
                    } else {
                        if (!this.isshowing) {
                            this.agyshilModel.lockFlag = 'N';
                            this.verifyLockFlag = false;
                        } else {
                            this.agyshilModel.lockFlag = 'Y';
                            this.verifyLockFlag = true;
                        }
                        this.agyshilDoubleList.push(this.agyshilModel);
                        this.agyshilCommitModel.updateList = this.agyshilDoubleList;
                        this.saveAgencyShiftLogs();
                    }
                }
            });
        } else {
            if (this.agyshilInsertList.length > 0) {
                this.agyshilInsertList[event].lockFlag = 'Y';
                this.lockProceedFlag = true;
                this.agyshilSingleList.push(this.agyshilInsertList[event]);
                if (this.agyshilSingleList.length === this.agyshilInsertList.length) {
                    this.agyshilCommitModel.insertList = this.agyshilSingleList;
                    this.saveAgencyShiftLogs();
                    return;
                }
                if (event < this.listSize) {
                    event = event + 1;
                    this.lockFlagVerification(event);
                } else {
                    return;
                }
            } else {
                if (!this.isshowing) {
                    this.agyshilModel.lockFlag = 'N';
                } else {
                    this.agyshilModel.lockFlag = 'Y';
                }
                this.agyshilDoubleList.push(this.agyshilModel);
                this.agyshilCommitModel.updateList = this.agyshilDoubleList;
                this.saveAgencyShiftLogs();
            }
        }
    }

    /** This function will generate sequences and saves the records to the database  */
    saveAgencyShiftLogs() {
        const agyshilSaveData = this.oidshlogFactory.agyShilCommit(this.agyshilCommitModel);
        agyshilSaveData.subscribe(data => {
            if (data.length === this.agyshilSingleList.length) {
                for (let i = 0; i < this.lstOfAgyShift.length; i++) {
                    if (!this.lstOfAgyShift[i].shiftLogSeq || (this.lstOfAgyShift[i].updatedRecord &&
                        this.lstOfAgyShift[i].updatedRecord === 'updated')) {
                        for (let j = 0; j < data.length; j++) {
                            if (this.lstOfAgyShift[i].shiftLogSaveSeq === data[j].shiftLogSaveSeq) {
                                this.lstOfAgyShift[i].shiftLogSeq = data[j].shiftLogSeq;
                                if (this.lstOfAgyShift[i].lockFlag === 'Y') {
                                    this.verifyLockFlag = true;
                                } else {
                                    this.verifyLockFlag = false;
                                }
                                this.lstOfAgyShift[i].shiftLogSaveSeq = undefined;
                                this.lstOfAgyShift[i].updatedRecord = undefined;
                                break;
                            }
                        }
                    }
                }
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'info');
                this.sequenceFlag = true;
                if ((this.isshowing && this.shLocId) || (!this.isshowing)) {
                    this.logFlagReadOnly = false;
                    this.agyShilReadOnly = false;
                } else {
                    this.logFlagReadOnly = true;
                    this.agyShilReadOnly = true;
                }
                this.updateFlag = false;
                this.saveFlag = true;
                this.addFlag = false;
                this.flag = false;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            }
        });
    }
    /** This function is used to navigate next records */
    butOffendersKeyNextItemTrigger() {
        if (!this.agyshilModel.shiftLogSeq) {
            if (this.agyshilModel.logDate && this.agyshilModel.logTime && this.agyshilModel.staffId &&
                !this.agyshilModel.dspAgyLocId4 && !this.agyshilModel.dspAgyLocId3 && !this.agyshilModel.agyActivityCode
                && !this.agyshilModel.observationDetails) {
                this.show(this.translateService.translate('oidshlog.enterorremoved'), 'warn');
                return false;
            }
        }

        if (!this.agyshilModel.shiftLogSeq) {
            if (!this.agyshilModel.logDate || !this.agyshilModel.logTime || !this.agyshilModel.dspAgyLocId4 ||
                !this.agyshilModel.dspAgyLocId3 || !this.agyshilModel.staffId || !this.agyshilModel.agyActivityCode) {
                this.show(this.translateService.translate('oidshlog.fieldmustentered'), 'warn');
                return false;
            } else if ((!this.agyshilModel.dspAgyLocId4 || !this.agyshilModel.dspAgyLocId3 || !this.agyshilModel.agyActivityCode)
                && this.agyshilModel.observationDetails) {
                this.show(this.translateService.translate('oidshlog.fieldmustentered'), 'warn');
                return false;
            }
        }
        if (this.lstOfAgyShift.length === 0) {
            return;
        }
        if ((this.agyshilIndex) < this.lstOfAgyShift.length - 1) {
            this.agyshilIndex = this.index + 1;
            this.agyshilModel = this.lstOfAgyShift[this.agyshilIndex];
            this.staffId = this.agyshilModel.staffId;
            this.index = this.index + 1;
            this.prevFlag = false;
            if (this.agyshilModel.lockFlag === 'Y') {
                this.verifyLockFlag = true;
            } else {
                this.verifyLockFlag = false;
            }
            this.sequenceFlag = true;
            if ((this.isshowing && this.shLocId) || (!this.isshowing)) {
                this.logFlagReadOnly = false;
                this.agyShilReadOnly = false;
            } else {
                this.logFlagReadOnly = true;
                this.agyShilReadOnly = true;
            }
            this.prevFlag = false;
        } else {
            this.nextFlag = true;
            this.show(this.translateService.translate('common.lastrecordofquery'), 'warn');
        }


    }
    /** This function is used to navigate prev records */
    butOffendersKeyPrevItemTrigger() {

        if (this.agyshilIndex >= 1) {
            if (!this.agyshilModel.shiftLogSeq) {
                if (this.retrievedClickedFlag) {
                    if (this.agyshilModel.logDate && this.agyshilModel.logTime && this.agyshilModel.staffId &&
                        !this.agyshilModel.dspAgyLocId4 && !this.agyshilModel.dspAgyLocId3 && !this.agyshilModel.agyActivityCode
                        && !this.agyshilModel.observationDetails) {
                        this.show(this.translateService.translate('oidshlog.enterorremoved'), 'warn');
                        return false;
                    }

                }

                if (!this.agyshilModel.logDate || !this.agyshilModel.logTime || !this.agyshilModel.staffId) {
                    this.show(this.translateService.translate('oidshlog.fieldmustentered'), 'warn');
                    return false;
                } else if (this.agyshilModel.dspAgyLocId4 && (!this.agyshilModel.dspAgyLocId3 || !this.agyshilModel.agyActivityCode)) {
                    this.show(this.translateService.translate('oidshlog.fieldmustentered'), 'warn');
                    return false;
                } else if ((!this.agyshilModel.dspAgyLocId4 || !this.agyshilModel.agyActivityCode) && this.agyshilModel.dspAgyLocId3) {
                    this.show(this.translateService.translate('oidshlog.fieldmustentered'), 'warn');
                    return false;
                } else if ((!this.agyshilModel.dspAgyLocId4 || !this.agyshilModel.dspAgyLocId3) && this.agyshilModel.agyActivityCode) {
                    this.show(this.translateService.translate('oidshlog.fieldmustentered'), 'warn');
                    return false;
                } else if ((!this.agyshilModel.dspAgyLocId4 || !this.agyshilModel.dspAgyLocId3 || !this.agyshilModel.agyActivityCode)
                    && this.agyshilModel.observationDetails) {
                    this.show(this.translateService.translate('oidshlog.fieldmustentered'), 'warn');
                    return false;
                }

            }
            this.agyshilIndex = this.agyshilIndex - 1;
            this.index = this.agyshilIndex;
            this.agyshilModel = this.lstOfAgyShift[this.agyshilIndex];
            this.staffId = this.agyshilModel.staffId;
            this.nextFlag = false;
            if (this.agyshilModel.lockFlag === 'Y') {
                this.verifyLockFlag = true;
            } else {
                this.verifyLockFlag = false;
            }
            this.sequenceFlag = true;
            if ((this.isshowing && this.shLocId) || (!this.isshowing)) {
                this.logFlagReadOnly = false;
                this.agyShilReadOnly = false;
            } else {
                this.logFlagReadOnly = true;
                this.agyShilReadOnly = true;
            }
            this.nextFlag = false;
        } else {
            if (this.retrievedClickedFlag) {
                if (this.agyshilModel.logDate && this.agyshilModel.logTime && this.agyshilModel.staffId &&
                    !this.agyshilModel.dspAgyLocId4 && !this.agyshilModel.dspAgyLocId3 && !this.agyshilModel.agyActivityCode
                    && !this.agyshilModel.observationDetails) {
                    this.show(this.translateService.translate('oidshlog.enterorremoved'), 'warn');
                    return false;
                }

            }
            this.prevFlag = true;
            this.show(this.translateService.translate('oidshlog.atfirstrecord'), 'warn');
        }

    }
    onReportingStaffChange() {
        this.staffId = this.staffId === undefined ? undefined : undefined;
    }

    onLovMouseDown() {
        if (this.agyShilReadOnly && !this.shLocId) {
            this.show(this.translateService.translate('oidshlog.fieldisprotectedagainstupdate'), 'error');
            return false;
        }
    }

    onLocMouseDown() {
        if (this.agyShilReadOnly && !this.shLocId) {
            this.show(this.translateService.translate('oidshlog.fieldisprotectedagainstupdate'), 'error');
            return false;
        }
        if (this.cgfkAgyshildspagylocid3Rg.length === 0) {
            this.show(this.translateService.translate('oidshlog.listofvaluescontains'), 'error');
            return false;
        }

    }
    clickLogDate() {
        if (this.agyShilReadOnly && !this.shLocId) {
            this.show(this.translateService.translate('oidshlog.fieldisprotectedagainstupdate'), 'error');
            return false;
        }
    }

    clickLogTime() {
        if (this.agyShilReadOnly && !this.shLocId) {
            this.show(this.translateService.translate('oidshlog.fieldisprotectedagainstupdate'), 'error');
            return false;
        }
        if (this.agyshilModel.logDate && this.agyshilModel.logTime) {
            if (DateFormat.compareDate(DateFormat.getDate(this.agyshilModel.logDate), DateFormat.getDate()) === 0) {
                this.agyshilModel.logTime.setSeconds(0);
                if (DateFormat.compareTime(this.agyshilModel.logTime, DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidshlog.logdateandtime'), 'error');
                    return false;
                }
            }
        } else if (!this.agyshilModel.logDate && this.agyshilModel.logTime) {
            this.agyshilModel.logTime.setSeconds(0);
            if (DateFormat.compareTime(this.agyshilModel.logTime, DateFormat.getDate()) === 1) {
                this.show(this.translateService.translate('oidshlog.logdateandtime'), 'error');
                return false;
            }
        }
    }
    logSeqWhenValidateItemTrigger(event) {
        if (this.agyShilReadOnly) {
            this.show(this.translateService.translate('oidshlog.fieldisprotectedagainstupdate'), 'error');
            return false;
        }

    }

    commentInsertable() {
        if (this.agyShilReadOnly) {
            this.show(this.translateService.translate('oidshlog.fieldisprotectedagainstupdate'), 'error');
            return false;
        }
    }
    lockFlagValidation() {
        if (this.logFlagReadOnly) {
            this.updateFlag = false;
            return false;
        } else {
            this.saveFlag = false;
            this.updateFlag = true;
        }
    }
    /** This function is used to add the records */
    addShiftLogRecord() {
        this.nextFlag = false;
        this.prevFlag = false;
        this.isLocationRequried = true;
        this.timeDesDisabledWhileRetrieve = false;
        if (!this.clearEnabledFlag) {
            if (!this.agyshilModel.shiftLogSeq) {
                if (this.agyshilModel.logDate && this.agyshilModel.logTime && this.agyshilModel.staffId &&
                    !this.agyshilModel.dspAgyLocId4 && !this.agyshilModel.dspAgyLocId3
                    && !this.agyshilModel.agyActivityCode && !this.agyshilModel.observationDetails) {
                    this.show(this.translateService.translate('oidshlog.enterorremoved'), 'warn');
                    return false;
                }
            }
            if (!this.agyshilModel.shiftLogSeq) {
                if (!this.agyshilModel.logDate || !this.agyshilModel.logTime || !this.agyshilModel.dspAgyLocId4 ||
                    !this.agyshilModel.dspAgyLocId3 || !this.agyshilModel.staffId || !this.agyshilModel.agyActivityCode) {
                    this.show(this.translateService.translate('oidshlog.fieldmustentered'), 'warn');
                    return false;
                } else if ((!this.agyshilModel.dspAgyLocId4 || !this.agyshilModel.dspAgyLocId3 ||
                    !this.agyshilModel.agyActivityCode) && this.agyshilModel.observationDetails) {
                    this.show(this.translateService.translate('oidshlog.fieldmustentered'), 'warn');
                    return false;
                }
            }
            if (this.lstOfAgyShift === null || this.lstOfAgyShift.length === 0) {

                if (this.verifyLockFlag) {
                    this.agyshilModel.lockFlag = 'Y';
                } else {
                    this.agyshilModel.lockFlag = 'N';
                }
                this.lstOfAgyShift.push(this.agyshilModel);
            }
        } else {
        }
        this.clearEnabledFlag = false;
        this.sequenceFlag = true;
        this.agyshilModel = new AgencyShiftLogs();
        this.agyshilModel.logDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
        this.agyshilModel.logTime = DateFormat.getDate();
        this.agyshilModel.logTime.setSeconds(0);
        this.agyshilModel.lockFlag = 'N';
        this.verifyLockFlag = false;
        this.retrieveFlag = true;
        const serviceObj = this.oidshlogFactory.agyShilWhenNewRecordInstance();
        serviceObj.subscribe(data => {
            if (data.staffId) {
                this.staffId = data.staffId;
                this.agyshilModel.staffId = data.staffId;
                this.onReportingByWhenValidationItemTrigger();
            }
        });
        const totalLen = this.lstOfAgyShift.length;
        this.lstOfAgyShift.push(this.agyshilModel);
        this.addFlag = false;
        this.saveFlag = false;
        this.agyShilReadOnly = false;
        this.agyshilIndex = totalLen;
        this.flag = true;
        this.disableFlag = true;
    }

    shiftLogRecordInsert = () => {
        this.showDocIcon=false;
        return {
            logDate: DateFormat.parse(DateFormat.format(DateFormat.getDate())), logTime: DateFormat.getDate(),
            staffId: this.staffIdNew, startTime: DateFormat.getDate(),
        };
    }
    facilityWhenValidationItemTrigger() {
        this.locationLink = 'oidshlog/cgfkAgyShilDspAgyLocId3RecordGroup?agyLocId=' + this.agyshilModel.dspAgyLocId4;
    }

    onReportingByWhenValidationItemTrigger() {
        if (this.staffId) {
            this.agyshilModel.staffId = Number(this.staffId);
        }
    }
    /*
   *  This event is used to set the facility value in Shift Logs Block.
   */
    onFacilityChange() {
        this.agyshilModel.dspAgyLocId4 = this.agyshilModel.dspAgyLocId4 === undefined ? '' : undefined;
    }
    /*
     *  This event is used to set the Location value in Shift Logs Block.
     */
    onLocationChange() {
        this.agyshilModel.dspAgyLocId3 = this.agyshilModel.dspAgyLocId3 === undefined ? '' : undefined;
    }
    /*
     *  This event is used to set the Activity value in Shift Logs Block.
     */
    onActivityChange() {
        this.agyshilModel.agyActivityCode = this.agyshilModel.agyActivityCode === undefined ? '' : undefined;
    }


    logDateWhenValidateItemTrigger(event) {
        if (event) {
            if (!this.shLocId) {
                this.saveFlag = false;
            }
            if (!this.timeDesDisabledWhileRetrieve) {
                if (!this.lvHours || this.lvHours !== 0) {
                    if (DateFormat.compareDate(DateFormat.getDate(event), DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('oidshlog.logdateandtime'), 'error');
                        return;
                    }
                    if (this.lvHours > 0) {
                        if (event && this.agyshilModel.logTime) {
                            this.lvCreateDate = TimeFormat.parse(TimeFormat.format(DateFormat.getDate(this.agyshilModel.logTime)),
                                DateFormat.getDate(event));

                            if (DateFormat.compareTime(DateFormat.getDate(this.lvCreateDate), DateFormat.getDate()) === 1) {
                                this.show(this.translateService.translate('oidshlog.logdateandtime'), 'error');
                                return false;
                            }
                            if ((DateFormat.getDate().getDate() - event.getDate()) * 24 > this.lvHours) {
                                this.backDateMessage = this.translateService.translate('oidshlog.logdateandtimeback')
                                    + ' ' + this.lvHours + ' ' + this.translateService.translate('oidshlog.logdateandtimebackdate');
                                this.show(this.backDateMessage, 'error');
                                return false;
                            }
                        }
                    }
                }
            }
        }
    }
    saveButtonEnabled(event) {
        if ((event && this.shLocId) || (event && this.flag) || (!this.isshowing && event && !this.flag)) {
            this.saveFlag = false;
        }
        if (this.disableFlag) {
            this.saveFlag = true;
            this.disableFlag = false;
        }
    }

    onLocationClick(location) {
        if (location && location.options && location.options.length === 0) {
            this.show(this.translateService.translate('oidshlog.listofvaluescontains'), 'error');
        }
        if (this.agyShilReadOnly && !this.shLocId) {
            this.show(this.translateService.translate('oidshlog.fieldisprotectedagainstupdate'), 'error');
        }
    }
    locationLinkUrl() {
        return this.agyshilModel.dspAgyLocId4 ? 'oidshlog/cgfkAgyShilDspAgyLocId3RecordGroup?agyLocId=' + this.agyshilModel.dspAgyLocId4 :
            'None';
    }
    onLocChange(event) {
        if (event) {
            this.agyshilModel.internalLocationId = event.internalLocationId;
        }

    }

    validateShiftLogData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'logDate') {
            if (event.data.logDate) {
                if (!this.lvHours || this.lvHours !== 0) {
                    if (DateFormat.compareDate(DateFormat.getDate(event.data.logDate), DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('oidshlog.logdateandtime'), 'error');
                        rowdata.validated = true;
                        return rowdata;
                    }
                    if (this.lvHours > 0) {
                        if (event && this.agyshilModel.logTime) {
                            this.lvCreateDate = TimeFormat.parse(TimeFormat.format(DateFormat.getDate(this.agyshilModel.logTime)),
                                DateFormat.getDate(event.data.logDate));

                            if (DateFormat.compareTime(DateFormat.getDate(this.lvCreateDate), DateFormat.getDate()) === 1) {
                                this.show(this.translateService.translate('oidshlog.logdateandtime'), 'error');
                                rowdata.validated = true;
                                return rowdata;
                            }
                            if ((DateFormat.getDate().getDate() - event.getDate()) * 24 > this.lvHours) {
                                this.backDateMessage = this.translateService.translate('oidshlog.logdateandtimeback')
                                    + ' ' + this.lvHours + ' ' + this.translateService.translate('oidshlog.logdateandtimebackdate');
                                this.show(this.backDateMessage, 'error');
                                rowdata.validated = true;
                                return rowdata;
                            }
                        }
                    }
                }
            }
        }
         if (event.field === 'agyActivityCode') {
            console.log(event.data.oldValue);
            if(this.agcylogResnTemp){
                if(this.agcylogResnTemp!==event.data.agyActivityCode){
                    event.data.reason=undefined
                }
            }
            if (event.data.agyActivityCode === 'LETGO' || event.data.agyActivityCode === 'LOCK') {
                this.grid.requiredOn('reason');
            } else {
                this.grid.requiredOff('reason')
                event.data.reason=undefined
            }
            this.agcylogResnTemp=event.data.agyActivityCode;
            

        }
        if (event.field === 'startTime' || event.field === 'endTime') {
            if (event.data.startTime && event.data.endTime) {
                var startTimeHours = DateFormat.getDate(event.data.startTime).getHours();
                var startTimeMint = DateFormat.getDate(event.data.startTime).getMinutes();
                var endTimeHours = DateFormat.getDate(event.data.endTime).getHours();
                var endTimeMint = DateFormat.getDate(event.data.endTime).getMinutes();
                if (DateFormat.compareTime(DateFormat.getDate(event.data.startTime), DateFormat.getDate(event.data.endTime)) < 1) {
                   /*  if (startTimeHours === endTimeHours && startTimeMint === endTimeMint) {
                        this.grid.setColumnData('durationTime', rowIndex, '00:00');
                    }
                    else  */
                    if (endTimeMint < startTimeMint) {
                        endTimeHours = endTimeHours - 1;
                        endTimeMint = endTimeMint + 60;
                    }
                    var finallyStartTime = endTimeHours - startTimeHours;
                    var finallyendTimeMint = endTimeMint - startTimeMint;
                    this.grid.setColumnData('durationTime', rowIndex, (finallyStartTime < 10 ? '0' + finallyStartTime : finallyStartTime) + ':' + (finallyendTimeMint < 10 ? '0' + finallyendTimeMint : finallyendTimeMint))
                } else {
                    this.grid.setColumnData('durationTime', rowIndex, undefined);
                    this.show(this.translateService.translate('End Time must be grater then startTime'), 'warn');

                }
            } else {
                this.grid.setColumnData('durationTime', rowIndex, undefined);
            }
        }

        if (event.field === 'dspAgyLocId4') {
            const cgfkAgyshilagyactivitycodServiceObj = this.oidshlogFactory.
                cgfkAgyShilDspAgyLocId3RecordGroup(event.data.dspAgyLocId4);
            cgfkAgyshilagyactivitycodServiceObj.subscribe(cgfkAgyshilagyactivitycodList => {
                if (cgfkAgyshilagyactivitycodList.length === 0) {
                    this.cgfkAgyshilagyactivitycodRg = [];
                    rowdata.validated = true;
                    return rowdata;
                } else {
                    for (let i = 0; i < cgfkAgyshilagyactivitycodList.length; i++) {
                        this.cgfkAgyshilagyactivitycodRg.push({
                            'text': cgfkAgyshilagyactivitycodList[i].code + ' - ' +
                                cgfkAgyshilagyactivitycodList[i].description, 'id': cgfkAgyshilagyactivitycodList[i].code
                        });

                        this.agyLocIdMap.set(cgfkAgyshilagyactivitycodList[i].code, cgfkAgyshilagyactivitycodList[i].internalLocationId);
                    }
                    rowdata.validated = true;
                    return rowdata;

                }
            });
        }
        rowdata.validated = true;
        return rowdata;
    }

    agyShiftLogTimeValidation = () => {


    }


    agyShiftLogDelete = () => {
        if (this.agyshilModel.verifyLockFlag) {
            this.show(this.translateService.translate('common.youcannotdeletethisrecord'), 'warn');
            return false;
        }
        return true;
    }

    onDialogCick = (event) => {
        if (event.errorFlag) {
            return;
        }
        const index = this.agyshilData.indexOf(event);
        const dialogData = { internalLocationId: event.internalLocationId, shiftLogSeq: event.shiftLogSeq ,amendedFlag:event.amendedFlag };

        this.dialogService.openLinkDialog('/OIDSHLOGDIALOG', dialogData, 80).subscribe(result => {
            if (result) {

            } else {

            }
        });


        
    }
}
