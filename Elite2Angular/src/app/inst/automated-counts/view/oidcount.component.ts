import {
    Component, OnInit, ViewChild, OnDestroy
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidcountService } from '@inst/automated-counts/service/oidcount.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AgencyCountTypes } from '@automatedbeans/AgencyCountTypes';
import { TempOidcount } from '@automatedbeans/TempOidcount';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { AgencyCounts } from '@automatedbeans/AgencyCounts';
import { Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OiddisreService } from '@inst/automated-counts/service/oiddisre.service';
import { RedirectUtil } from '@core/classes/redirectUtil';
@Component({
    selector: 'app-oidcount',
    templateUrl: './oidcount.component.html',
    styleUrls: []
})

export class OidcountComponent implements OnInit, OnDestroy {
    @ViewChild('grid', {static: true}) grid: any;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    msgs: any[] = [];
    listToCompare: any[] = [];
    display: boolean;
    disabled: boolean;
    ishide = true;
    editable: boolean;
    tempOidcountColumnDef: any[];
    agencyCountTypesReadOnly: boolean;
    tempOidcountReadOnly: boolean;
    agencyCountsReadOnly: boolean;
    statusBlockReadOnly: boolean;
    agencyCountTypesModel: AgencyCountTypes = new AgencyCountTypes();
    tempOidcountModel: TempOidcount = new TempOidcount();
    agencyCountsModel: AgencyCounts = new AgencyCounts();
    tempOidcountData: TempOidcount[] = [];
    pinnedTempOidcountData: any[] = [];
    tempOidcountDataTemp: TempOidcount[] = [];
    cgfkAgylocidRg: any[] = [];
    cgfkCounttypesRg: any[] = [];
    cgfkScheduledtimeRg: any[] = [];
    locationLink: any;
    countTypeLink: any;
    scheduleTimeLink: any;
    sessionId: any;
    conductBlkDisable: boolean;
    initiateBtnDisable: boolean;
    cancelBtnDisable: boolean;
    enterRemoteBtnDisable: boolean;
    clearBtnDisable: boolean;
    reCountBtnDisable: boolean;
    refreshBtnDisable: boolean;
    message = ' Invalid.';
    type = 'error';
    colorClass: string;
    msglist = [];
    progressStatus: any;
    globalSessionId: any;
    scheduleTimeTemp: string;
    discrepancyCount: number;
    agencyData: any[] = [];
    locationTitles = { code: 'Agency Location Code', description: 'Description' };
    countTypeTitles = { code: 'Count Code', description: 'Description' };
    scheduleTimeTitles = { description: 'Scheduled Time', agyLocId: 'Agency Code', countTypeCode: 'Count Code' };
    checkInitiateBtnStatus: boolean;
    userCancelledFlag: string;
    timer: any;
    sub: Subscription;
    cancelFlag: boolean;
    checkTimerFlag: boolean;
    countTypeIdTemp: string;
    checkExistsTime: boolean;
    checkEnterRemoteFlag: boolean;
    checkRecountFlag: boolean;
    checkCountFlag: boolean;
    tempCountTypeCode: string;
    tempScheduledTime: string;
    refreshTimerValue: number;
    counttypeDisable: boolean;
    scheduledtimeDisable: boolean;
    requiredTime: boolean;
    constructor(private oidcountFactory: OidcountService, public oiddisreFactory: OiddisreService,
        private sessionManager: UserSessionManager,
        public dialogService: DialogService,
        public translateService: TranslateService,
        private router: Router,
        private redirectUtil: RedirectUtil) {
        this.tempOidcountColumnDef = [];
    }
    ngOnInit() {
        this.checkCountFlag = false;
        this.checkRecountFlag = false;
        this.checkEnterRemoteFlag = false;
        this.checkExistsTime = false;
        this.countTypeIdTemp = undefined;
        this.cancelFlag = false;
        this.checkInitiateBtnStatus = false;
        this.discrepancyCount = undefined;
        this.progressStatus = undefined;
        this.conductBlkDisable = false;
        this.initiateBtnDisable = true;
        this.cancelBtnDisable = true;
        this.enterRemoteBtnDisable = true;
        this.clearBtnDisable = true;
        this.reCountBtnDisable = true;
        this.refreshBtnDisable = true;
        this.checkTimerFlag = false;
        this.counttypeDisable = true;
        this.scheduledtimeDisable = true;
        this.agencyCountTypesModel = new AgencyCountTypes();
        this.agencyCountTypesModel.caseLoadId = this.sessionManager.currentCaseLoad;
        this.globalSessionId = this.sessionManager.randomid;
        this.agencyCountTypesModel.sessionId = this.globalSessionId;
        this.locationLink = 'oidcount/cgfkAgyLocIdRecordGroup?caseLoadId=' + this.sessionManager.currentCaseLoad;
        const user = this.sessionManager.getId();
        const getTimerVal = this.oidcountFactory.getTimerValue().subscribe(data => {
            if (data) {
                this.refreshTimerValue = data;
            } else {
                this.refreshTimerValue = 30000;
            }
        });
        const sessionIdService = this.oidcountFactory.cgwhenNewFormInstanceCgPsessionId(this.sessionManager.currentCaseLoad);
        sessionIdService.subscribe(idVal => {
            if (idVal && idVal.length > 0) {
                const oidTempCount = idVal[0];
                
                if (oidTempCount.userId === user && oidTempCount.sessionId) {
                    const data = {
                        label: 'User: ' + user + ' ' + this.translateService.translate('oidcount.countinprogress')
                    };
                    this.dialogService.openLinkDialog('/oidcountpopup', data, 50).subscribe(result => {
                        if (result === 'continue') {
                            this.checkEnterRemoteFlag = true;
                            this.checkExistsTime = true;
                            this.globalSessionId = oidTempCount.sessionId;
                            this.agencyCountTypesModel.sessionId = this.globalSessionId;
                            this.checkInitiateBtnStatus = true;
                            this.initiateBtnDisable = true;
                            this.cancelBtnDisable = false;
                            this.conductBlkDisable = true;
                            this.counttypeDisable = true;
                            this.scheduledtimeDisable = true;
                            this.checkExistingCountSessionMethod();
                        } else if (result === 'start') {
                            this.globalSessionId = oidTempCount.sessionId;
                            this.agencyCountTypesModel.sessionId = this.globalSessionId;
                            this.cancelCount();
                        } else if (typeof result === 'boolean' && !result) {
                            this.router.navigate(['/home']);
                        } else {
                            this.router.navigate(['/home']);
                        }
                    });
                } else if (oidTempCount.sessionId && oidTempCount.userId !== user) {
                    const data = {
                        label: (this.translateService.translate('oidcount.countiscurrentlyunderway').replace('#user', oidTempCount.userId))
                        .replace('#location', oidTempCount.agyLocId), yesBtn: true, noBtn: false,
                        yesLabel: this.translateService.translate('common.ok')
                    };
                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                        if (result) {
                            this.initiateBtnDisable = true;
                            this.agencyCountTypesModel.agyLocId = undefined;
                            this.agencyCountTypesModel.countTypeCode = undefined;
                            this.countTypeIdTemp = undefined;
                            this.agencyCountTypesModel.scheduledTime = undefined;
                            this.agencyCountTypesModel.countTypeId = undefined;
                        } else {
                            this.agencyCountTypesModel.countTypeId = undefined;
                            this.initiateBtnDisable = true;
                            this.agencyCountTypesModel.agyLocId = undefined;
                            this.agencyCountTypesModel.countTypeCode = undefined;
                            this.countTypeIdTemp = undefined;
                            this.agencyCountTypesModel.scheduledTime = undefined;
                        }
                    });
                }
            } else {
                /* TODO 
                1. There is no count initiated
                2. The location is not configured
                    a) show message -> The location is not configured
            */
            }
        });
        this.tempOidcountColumnDef = [
            { fieldName: this.translateService.translate('common.description'), field: 'locationDescription', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oidcount.actual'), field: 'actualCount', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oidcount.reported'), field: 'reportedCount', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oidcount.discrepancy'), field: 'discrepancyCount', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('oidcount.timesubmitted'), field: 'dateSubmitted',
                datatype: 'time', editable: false, width: 150
            },
            { fieldName: this.translateService.translate('oidcount.staffid'), field: 'enteredByUserid', editable: false, width: 200 },
        ];
    }

    checkTimer() {
        this.checkTimerFlag = true;
        this.timer = timer(0, 10000);
        this.sub = this.timer.subscribe(t => {
            this.refreshCountmethod();
        });
    }

    /**
     *
     */
    afterReCountClosed(event) {
        if (event) {
            this.agencyCountsModel = new AgencyCounts();
            this.discrepancyCount = undefined;
            this.agencyCountTypesModel.inserted = event;
            this.agencyCountTypesModel.reportingLocId = event;
            this.agencyCountTypesModel.checkInitiate = 'false';
            this.checkRecountFlag = true;
            this.reCountBtnDisable = true;
            this.clearBtnDisable = true;
            this.pinnedTempOidcountData = [];
            this.checkEnterRemoteFlag = false;
            this.initiateTempOidCountRecords();
        }
    }
    /**
     * event is fired when close the enter remote dialog.
     * @param event
     */
    afterEnterRemoteClosed(event) {
        if (event) {
            this.checkEnterRemoteFlag = true;
        }
        this.refreshCountmethod();
    }

    /**
     * event is fired while opening the screen.
     * method will be called when click continue old count button, displays the data in the grid.
     */
    checkExistingCountSessionMethod() {
        const existingCounts = this.oidcountFactory.checkExistingCountSession(this.globalSessionId,
            this.sessionManager.currentCaseLoad);
        existingCounts.subscribe(existsCount => {
            if (existsCount.length > 0) {
                //this.enterRemoteBtnDisable = false;
                this.cancelBtnDisable = false;
                this.checkEnterRemoteFlag = true;
                this.checkExistsTime = true;
                this.colorClass = 'countRed';
                this.progressStatus = this.translateService.translate('oidcount.countin');
                this.agencyCountTypesModel.agyLocId = existsCount[0].agyLocId;
                this.agencyCountTypesModel.countTypeCode = existsCount[0].countTypeCode;
                this.countTypeIdTemp = String(existsCount[0].countTypeId);
                this.agencyCountTypesModel.countTypeId = existsCount[0].countTypeId;
                this.agencyCountTypesModel.scheduledTime = existsCount[0].scheduledTime;
                this.agencyCountTypesModel.inserted = existsCount[0].reportingLocId;
                this.agencyCountTypesModel.reportingLocId = existsCount[0].reportingLocId;
                this.agencyData = [];
                this.agencyData.push(this.agencyCountTypesModel);
                for (let i = 0; i < existsCount.length; i++) {
                    this.tempOidcountModel = new TempOidcount();
                    this.tempOidcountModel.locationDescription = existsCount[i].locationDescription;
                    this.tempOidcountModel.actualCount = existsCount[i].actualCount;
                    this.tempOidcountDataTemp.push(this.tempOidcountModel);
                }
                this.tempOidcountData = this.tempOidcountDataTemp;
                if (this.tempOidcountData && this.tempOidcountData.length > 0) {
                    this.conductBlkDisable = true;
                    this.counttypeDisable = true;
                    this.scheduledtimeDisable = true;
                    this.refreshBtnDisable = false;
                    this.tempOidcountData.forEach(data => {
                        if (data.actualCount || data.actualCount === 0) {
                            this.enterRemoteBtnDisable = false;
                        }
                    });
                }
                this.refreshCountmethod();
                this.checkTimer();
            } else {
                this.tempOidcountData = [];
                this.pinnedTempOidcountData = [];
                this.checkCountFlag = false;
                this.checkEnterRemoteFlag = false;
                this.checkExistsTime = false;
                this.cancelFlag = false;
                this.checkInitiateBtnStatus = false;
                this.initiateBtnDisable = true;
                this.cancelBtnDisable = true;
                this.enterRemoteBtnDisable = true;
                this.checkRecountFlag = false;
                this.progressStatus = undefined;
                this.conductBlkDisable = false;
                this.agencyCountTypesModel.agyLocId = undefined;
                this.agencyCountTypesModel.countTypeCode = undefined;
                this.agencyCountTypesModel.scheduledTime = undefined;
                this.countTypeIdTemp = undefined;
                this.agencyCountsModel = new AgencyCounts();
                this.discrepancyCount = undefined;
                this.refreshBtnDisable = true;
                this.clearBtnDisable = true;
                this.reCountBtnDisable = true;
                if (this.tempOidcountData.length === 0) {
                    this.sub.unsubscribe();
                }
            }
        });
    }
    /*
    * This method is used to show popup messages.
    */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    ngOnDestroy() {
        if (this.checkTimerFlag) {
            this.sub.unsubscribe();
        }
    }
    /**
     * event is fired when change the value from the Location drop down.
     * @param event
     */
    locationValueChange(event) {
        setTimeout(() => {
            if (event) {
                this.agencyCountTypesModel.agyLocId = event.code;
                if (this.tempOidcountData && this.tempOidcountData.length > 0) {
                    this.tempCountTypeCode = this.agencyCountTypesModel.countTypeCode;
                    this.tempScheduledTime = this.agencyCountTypesModel.scheduledTime;
                } else {
                    this.tempCountTypeCode = undefined;
                    this.tempScheduledTime = undefined;
                }

                this.agencyCountTypesModel.countTypeCode = undefined;
                this.agencyCountTypesModel.scheduledTime = undefined;
                this.countTypeIdTemp = undefined;
                this.countTypeLink = 'oidcount/cgfkCountTypesRecordGroup?agyLocId=' + event.code;
                const scheduleTimeVal = this.oidcountFactory.cgfkCountTypesRecordGroup(event.code);
                scheduleTimeVal.subscribe(scheduleTimeList => {
                    if (scheduleTimeList.length > 0) {
                        if (!this.conductBlkDisable) {
                            this.counttypeDisable = false;
                        } else {
                            this.counttypeDisable = true;
                        }
                        this.scheduledtimeDisable = true;
                    } else {
                        this.counttypeDisable = true;
                        this.scheduledtimeDisable = true;
                    }
                });
                setTimeout(() => {
                    if (this.tempCountTypeCode) {
                        this.agencyCountTypesModel.countTypeCode = this.tempCountTypeCode
                    }
                }, 2000);
            } else {
                this.counttypeDisable = true;
                this.scheduledtimeDisable = true;
                this.agencyCountTypesModel.countTypeCode = undefined;
                this.countTypeIdTemp = undefined;
                this.counttypeDisable = true;
                this.scheduledtimeDisable = true;
            }
        }, 1000);

    }
    /**
     * event is fired when change the value from Count Type drop down.
     * @param event
     */
    countTypeChange(event) {
        if (event) {
            this.agencyCountTypesModel.countTypeCode = event.code;
            //this.agencyCountTypesModel.scheduledTime = undefined;
            this.countTypeIdTemp = undefined;
            if (this.agencyCountTypesModel.countTypeCode !== 'SCH') {
                this.requiredTime = false;
                this.scheduledtimeDisable = true;
                if (!this.checkInitiateBtnStatus && !(this.tempOidcountData && this.tempOidcountData.length > 0)) {
                    const scheduleTimeVal = this.oidcountFactory.cgfkScheduledtimeRecordGroup(this.agencyCountTypesModel.agyLocId, event.code);
                    scheduleTimeVal.subscribe(scheduleTimeList => {
                        if (scheduleTimeList && scheduleTimeList.length > 0) {
                            for (let i = 0; i < scheduleTimeList.length; i++) {
                                if (scheduleTimeList[i].description) {
                                    this.initiateBtnDisable = false;
                                    return;
                                } else {
                                    this.initiateBtnDisable = false;
                                }
                            }
                        }
                    });
                }
                const countTypeIdVal = this.oidcountFactory.getCountTypeIdFromDb(this.agencyCountTypesModel);
                countTypeIdVal.subscribe(idVal => {
                    this.agencyCountTypesModel.countTypeId = idVal;
                });

            } else {
                this.initiateBtnDisable = true;
                this.scheduledtimeDisable = false;
                this.requiredTime = true;
            }
            this.scheduleTimeLink = 'oidcount/cgfkScheduledTimeRecordGroup?agyLocId=' +
                this.agencyCountTypesModel.agyLocId + '&countTypeId=' + event.code;
            const scheduleTime = this.oidcountFactory.cgfkScheduledtimeRecordGroup(this.agencyCountTypesModel.agyLocId, event.code);
            scheduleTime.subscribe(scheduleTimeList => {
                if (scheduleTimeList.length > 0) {
                    // if (!this.conductBlkDisable) {
                    //     this.scheduledtimeDisable = false;
                    // } else {
                    //     this.scheduledtimeDisable = true;
                    // }
                    if (scheduleTimeList.length = 1) {
                        scheduleTimeList.forEach(element => {
                            if (!element.description || element.description === "") {
                                this.scheduledtimeDisable = true;
                            }
                        });
                    }
                    if (this.checkExistsTime) {
                        this.countTypeIdTemp = String(this.agencyCountTypesModel.countTypeId);
                    }
                } else {
                    this.scheduledtimeDisable = true;
                }
            });
            setTimeout(() => {
                if (this.tempScheduledTime) {
                    this.agencyCountTypesModel.countTypeCode = this.tempScheduledTime
                }
            }, 2000);
            
        } else {
            this.countTypeIdTemp = undefined;
            this.scheduledtimeDisable = true;
        }
    }
    /**
     * event is fired when change the value from Time drop down.
     * @param event
     */
    scheduleTimeChange(event) {
        if (event && event.code) {
            if (event.description) {
                if (!this.checkInitiateBtnStatus && !(this.tempOidcountData && this.tempOidcountData.length > 0)) {
                    this.initiateBtnDisable = false;
                }
                this.agencyCountTypesModel.scheduledTime = event.description;
                this.agencyCountTypesModel.countTypeId = event.code;
                this.countTypeIdTemp = event.code;
            } else {
                this.initiateBtnDisable = false;
            }
        } else {
            this.initiateBtnDisable = true;
        }
    }
    /**
     * event is fired when click initiate count button.
     * it shows validation messages if condition does not satisfy.
     * if all conditions are satisfy then data dispalys in the grid.
     */
    onButInitiateCountclick() {
        this.checkEnterRemoteFlag = false;
        this.globalSessionId = Math.floor((Math.random()/10000000)*10000000*10000000);
        this.agencyCountTypesModel.sessionId = this.globalSessionId;
        this.initiateBtnDisable = true;
        this.cancelFlag = true;
        this.ishide = false;
        this.pinnedTempOidcountData = [];
        const getCount = this.oidcountFactory.countLockedMoulesCursor(this.agencyCountTypesModel);
        getCount.subscribe(data => {
            if (data && data.lockedCount === 1 && data.lockedUserId) {
                const msg = {
                    label: (this.translateService.translate('oidcount.countiscurrentlyunderway').replace('#user', data.lockedUserId))
                        .replace('#location', this.agencyCountTypesModel.agyLocId), yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('common.ok')
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', msg, 50).subscribe(result => {
                    if (result) {
                        this.initiateBtnDisable = true;
                        this.agencyCountTypesModel.agyLocId = undefined;
                        this.agencyCountTypesModel.countTypeCode = undefined;
                        this.agencyCountTypesModel.scheduledTime = undefined;
                        this.countTypeIdTemp = undefined;
                    } else {
                        this.initiateBtnDisable = true;
                        this.agencyCountTypesModel.agyLocId = undefined;
                        this.agencyCountTypesModel.countTypeCode = undefined;
                        this.agencyCountTypesModel.scheduledTime = undefined;
                        this.countTypeIdTemp = undefined;
                    }
                });
            } else if (data.lockedCount === 2) {
                if (!this.agencyCountTypesModel.scheduledTime) {
                    this.scheduleTimeTemp = 'NA';
                } else {
                    this.scheduleTimeTemp = this.agencyCountTypesModel.scheduledTime;
                }
                const data = {
                    label: this.translateService.translate('oidcount.countlocation') + ' ' + this.agencyCountTypesModel.agyLocId + ' ' +
                        ')' + ' ' + this.translateService.translate('common.counttype') + '' + '(' + ' ' +
                        this.agencyCountTypesModel.countTypeCode + ' ' + ')' + ' ' +
                        this.translateService.translate('oidcount.scheduledtime') + '' + '(' + ' '
                        + this.scheduleTimeTemp + ' ' +
                        this.translateService.translate('oidcount.cannotinitiatewithoutlocationrecords'), yesBtn: true, noBtn: false,
                        yesLabel: this.translateService.translate('common.ok')
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                    if (result) {
                        this.initiateBtnDisable = true;
                        this.agencyCountTypesModel.agyLocId = undefined;
                        this.agencyCountTypesModel.countTypeCode = undefined;
                        this.agencyCountTypesModel.scheduledTime = undefined;
                        this.countTypeIdTemp = undefined;
                    } else {
                        this.initiateBtnDisable = true;
                        this.agencyCountTypesModel.agyLocId = undefined;
                        this.agencyCountTypesModel.countTypeCode = undefined;
                        this.agencyCountTypesModel.scheduledTime = undefined;
                        this.countTypeIdTemp = undefined;
                    }
                });
            } else if (data.lockedCount === 3) {
                if (!this.agencyCountTypesModel.scheduledTime) {
                    this.scheduleTimeTemp = 'NA';
                } else {
                    this.scheduleTimeTemp = this.agencyCountTypesModel.scheduledTime;
                }
                const data = {
                    label: this.translateService.translate('oidcount.countlocation') + ' ' + this.agencyCountTypesModel.agyLocId + ' ' +
                        ')' + ' ' + this.translateService.translate('common.counttype') + '' +
                        '(' + ' ' + this.agencyCountTypesModel.countTypeCode + ' ' +
                        ')' + ' ' + this.translateService.translate('oidcount.scheduledtime') + '' +
                        '(' + ' ' + this.scheduleTimeTemp + ' ' +
                        this.translateService.translate('oidcount.clearfortoday'), yesBtn: true, noBtn: false,
                        yesLabel: this.translateService.translate('common.ok')
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                    if (result) {
                        this.initiateBtnDisable = true;
                        this.agencyCountTypesModel.agyLocId = undefined;
                        this.agencyCountTypesModel.countTypeCode = undefined;
                        this.agencyCountTypesModel.scheduledTime = undefined;
                        this.countTypeIdTemp = undefined;
                    } else {
                        this.initiateBtnDisable = true;
                        this.agencyCountTypesModel.agyLocId = undefined;
                        this.agencyCountTypesModel.countTypeCode = undefined;
                        this.agencyCountTypesModel.scheduledTime = undefined;
                        this.countTypeIdTemp = undefined;
                    }
                });
            } else if (data.lockedCount === 4) {
                if (!this.agencyCountTypesModel.scheduledTime) {
                    this.scheduleTimeTemp = 'NA';
                } else {
                    this.scheduleTimeTemp = this.agencyCountTypesModel.scheduledTime;
                }
                const data = {
                    label: this.translateService.translate('oidcount.countlocation') + ' ' + this.agencyCountTypesModel.agyLocId + ' ' +
                        ')' + ' ' + this.translateService.translate('common.counttype') + '' + '(' + ' ' +
                        this.agencyCountTypesModel.countTypeCode + ' ' + ')' + ' ' +
                        this.translateService.translate('oidcount.scheduledtime') + '' + '(' + ' '
                        + this.scheduleTimeTemp + ' ' +
                        this.translateService.translate('oidcount.cannotinitiatewithoutlocationrecords'), yesBtn: true, noBtn: false,
                        yesLabel: this.translateService.translate('common.ok')
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                    if (result) {
                        this.initiateBtnDisable = true;
                        this.agencyCountTypesModel.agyLocId = undefined;
                        this.agencyCountTypesModel.countTypeCode = undefined;
                        this.agencyCountTypesModel.scheduledTime = undefined;
                        this.countTypeIdTemp = undefined;
                    } else {
                        this.initiateBtnDisable = true;
                        this.agencyCountTypesModel.agyLocId = undefined;
                        this.agencyCountTypesModel.countTypeCode = undefined;
                        this.agencyCountTypesModel.scheduledTime = undefined;
                        this.countTypeIdTemp = undefined;
                    }
                });
            } else {
                const reportingLocId = data.lockedCount;
                this.agencyCountTypesModel.agencyCounts = data.acReturnValues;
                this.agencyCountTypesModel.inserted = data.lockedCount;
                this.agencyCountTypesModel.reportingLocId = data.lockedCount;
                this.agencyData.push(this.agencyCountTypesModel);
                this.agencyCountTypesModel.checkInitiate = 'true';
                this.initiateTempOidCountRecords();
            }

        });
    }
    /**
     * This event is used to get the data from DB and displays the data in Grid.
     */
    initiateTempOidCountRecords() {
        this.pinnedTempOidcountData = [];
        const initiateRecords = this.oidcountFactory.initiateCountSetup(this.agencyCountTypesModel);
        initiateRecords.subscribe(data => {
            this.initiateBtnDisable = true;
            this.conductBlkDisable = true;
            this.counttypeDisable = true;
            this.scheduledtimeDisable = true;
            this.cancelBtnDisable = false;
            this.checkRecountFlag = false;
            this.checkEnterRemoteFlag = false;
            this.tempOidcountDataTemp = [];
            for (let i = 0; i < data.length; i++) {
                this.tempOidcountModel = new TempOidcount();
                this.tempOidcountModel.locationDescription = data[i].locationDescription;
                this.tempOidcountModel.actualCount = data[i].actualCount;
                this.tempOidcountDataTemp.push(this.tempOidcountModel);
            }
            this.tempOidcountData = [];
            this.tempOidcountData = this.tempOidcountDataTemp;
            if (data.length > 0) {
                const Dialogdata = {
                    globalSessionId: this.globalSessionId, tempOidcountData: this.tempOidcountData
                };
                    this.checkCountFlag = true;
                    this.agencyCountsModel.totalActual = undefined;
                    this.agencyCountsModel.totalReported = undefined;
                    this.discrepancyCount = undefined;
                    this.colorClass = 'countRed';
                    this.progressStatus = undefined;
                    this.progressStatus = this.translateService.translate('oidcount.countin');
                    if (this.tempOidcountData && this.tempOidcountData.length > 0) {
                        this.refreshBtnDisable = false;
                        this.tempOidcountData.forEach(data => {
                            if (data.actualCount || data.actualCount === 0) {
                                this.enterRemoteBtnDisable = false;
                            }
                        });
                    }
                    this.refreshCountmethod();
                    this.checkTimer();

                // });
            } else {
                this.tempOidcountData = [];
                this.progressStatus = undefined;
            }

        });
    }
    
    cancelCount() {
        const refactLocId = this.oidcountFactory.deleteInitiateRecords(this.agencyCountTypesModel);
        refactLocId.subscribe(refLocValue => {
            this.tempOidcountData = [];
            this.pinnedTempOidcountData = [];
            this.checkCountFlag = false;
            this.checkEnterRemoteFlag = false;
            this.checkExistsTime = false;
            this.cancelFlag = false;
            this.checkInitiateBtnStatus = false;
            this.initiateBtnDisable = true;
            this.cancelBtnDisable = true;
            this.enterRemoteBtnDisable = true;
            this.checkRecountFlag = false;
            this.progressStatus = undefined;
            this.conductBlkDisable = false;
            this.agencyCountTypesModel.agyLocId = undefined;
            this.agencyCountTypesModel.countTypeCode = undefined;
            this.agencyCountTypesModel.scheduledTime = undefined;
            this.countTypeIdTemp = undefined;
            this.agencyCountsModel = new AgencyCounts();
            this.discrepancyCount = undefined;
            this.refreshBtnDisable = true;
            this.clearBtnDisable = true;
            this.reCountBtnDisable = true;
            if (this.tempOidcountData.length === 0) {
                this.sub.unsubscribe();
            }
        });
    }
    
    /**
     * event is fired when click on Cancel Count button.
     * does some DB operations.
     */
    onButCancelCountclick() {
        const data = {
            label: this.translateService.translate('oidcount.cancelwillstopthiscount'), yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
            if (result) {
                this.cancelCount();
            } else {
                //TODO 
                //Show message and reason if Cancel operation fails.
            }
        });
    }
    /**
     * event is fired when click on Clear Count button.
     */
    onButClearCountclick = () => {
        if (this.pinnedTempOidcountData.length > 0) {
            if (this.pinnedTempOidcountData[0].reportedCount === this.pinnedTempOidcountData[0].actualCount &&
                this.pinnedTempOidcountData[0].discrepancyCount === 0) {
                const refactLocId = this.oiddisreFactory.agencyCountsCommit(this.agencyCountTypesModel);
                refactLocId.subscribe(data => {
                    if (data === 1) {
                        this.clearForm();
                        this.type = 'success';
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.show();
                    } else {
                        this.type = 'error';
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.show();
                    }
                });
                return false;
            } else {
                const data = {
                    label: this.translateService.translate('oidcount.thereportedtotalsdonotmatchthecurrent'), yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                    if (result) {
                        this.dialogService.openLinkDialog('/OIDDISRE', this.agencyCountTypesModel, 80).subscribe(dlgResult => {
                            if (dlgResult === 'success') {
                                this.clearForm();
                            }
                        });
                    } else {
                        return false;
                    }
                });
            }
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('oidcount.cannotperformclearcount');
            this.show();
        }
    }

    onButReCountclick = () => {
        if (this.pinnedTempOidcountData.length > 0) {
            this.dialogService.openLinkDialog('/OIDRECOR', this.agencyCountTypesModel, 80).subscribe(result => {
                if (result) {
                    this.agencyCountsModel = new AgencyCounts();
                    this.discrepancyCount = undefined;
                    this.agencyCountTypesModel.inserted = result.reportingLocId;
                    this.agencyCountTypesModel.reportingLocId = result.reportingLocId;
                    this.agencyCountTypesModel.checkInitiate = 'false';
                    this.checkRecountFlag = true;
                    this.pinnedTempOidcountData = [];
                    this.checkEnterRemoteFlag = false;
                    this.globalSessionId = result.sessionId;
                    this.agencyCountTypesModel.sessionId = this.globalSessionId;
                    this.initiateTempOidCountRecords();
                }
            });
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('oidcount.cannotperformrecount');
            this.show();
        }
    }
    clearForm() {
        this.checkCountFlag = false;
        this.checkEnterRemoteFlag = false;
        this.checkExistsTime = false;
        this.cancelFlag = false;
        this.checkInitiateBtnStatus = false;
        this.initiateBtnDisable = true;
        this.cancelBtnDisable = true;
        this.enterRemoteBtnDisable = true;
        this.checkRecountFlag = false;
        this.progressStatus = undefined;
        this.conductBlkDisable = false;
        this.counttypeDisable = true;
        this.scheduledtimeDisable = true;
        this.agencyCountTypesModel.agyLocId = undefined;
        this.agencyCountTypesModel.countTypeCode = undefined;
        this.agencyCountTypesModel.scheduledTime = undefined;
        this.countTypeIdTemp = undefined;
        this.tempOidcountData = [];
        this.agencyCountsModel = new AgencyCounts();
        this.discrepancyCount = undefined;
        this.pinnedTempOidcountData = [];
        this.refreshBtnDisable = true;
        this.clearBtnDisable = true;
        this.reCountBtnDisable = true;
        if (this.tempOidcountData.length === 0) {
            this.sub.unsubscribe();
        }
    }

    refreshCountmethod() {
        const refreshService = this.oidcountFactory.refreshCount(this.globalSessionId);
        refreshService.subscribe(refreshTemp => {
            //if (this.checkEnterRemoteFlag) {
            if (refreshTemp.actualCountTemp === refreshTemp.reportedCountTemp && refreshTemp.reportedCountTemp > 0) {
                this.enterRemoteBtnDisable = true;
                this.clearBtnDisable = false;
                this.reCountBtnDisable = false;
                this.colorClass = 'countBlack';
                this.progressStatus = this.translateService.translate('oidcount.countcomplete');
                if (this.agencyCountsModel.totalActual !== refreshTemp.actualCount) {
                    this.agencyCountsModel.totalActual = refreshTemp.actualCount;
                    this.agencyCountTypesModel.totalActual = refreshTemp.actualCount;
                }
                if (this.agencyCountsModel.totalMale !== refreshTemp.totalMale) {
                    this.agencyCountsModel.totalMale = refreshTemp.totalMale;
                    this.agencyCountTypesModel.totalMale = refreshTemp.totalMale;
                }
                if (this.agencyCountsModel.totalFemale !== refreshTemp.totalFemale) {
                    this.agencyCountsModel.totalFemale = refreshTemp.totalFemale;
                    this.agencyCountTypesModel.totalFemale = refreshTemp.totalFemale;
                }
                if (this.agencyCountsModel.totalOther !== refreshTemp.totalOther) {
                    this.agencyCountsModel.totalOther = refreshTemp.totalOther;
                    this.agencyCountTypesModel.totalOther = refreshTemp.totalOther;
                }
                if (this.agencyCountsModel.totalReported !== refreshTemp.reportedCount) {
                    this.agencyCountsModel.totalReported = refreshTemp.reportedCount;
                    this.agencyCountTypesModel.totalReported = refreshTemp.reportedCount;
                    this.discrepancyCount = refreshTemp.discrepancyCount;
                }
                if (this.agencyCountsModel.outTotal !== refreshTemp.outTotal) {
                    this.agencyCountsModel.outTotal = refreshTemp.outTotal;
                    this.agencyCountTypesModel.outTotal = refreshTemp.outTotal;
                }
                if (this.agencyCountsModel.totalMaleOut !== refreshTemp.totalMaleOut) {
                    this.agencyCountsModel.totalMaleOut = refreshTemp.totalMaleOut;
                    this.agencyCountTypesModel.totalMaleOut = refreshTemp.totalMaleOut;
                }
                if (this.agencyCountsModel.totalFemaleOut !== refreshTemp.totalFemaleOut) {
                    this.agencyCountsModel.totalFemaleOut = refreshTemp.totalFemaleOut;
                    this.agencyCountTypesModel.totalFemaleOut = refreshTemp.totalFemaleOut;
                }
                if (this.agencyCountsModel.totalOtherOut !== refreshTemp.totalOtherOut) {
                    this.agencyCountsModel.totalOtherOut = refreshTemp.totalOtherOut;
                    this.agencyCountTypesModel.totalOtherOut = refreshTemp.totalOtherOut;
                }
                const alltot = {
                    locationDescription: 'Totals', actualCount: this.agencyCountsModel.totalActual,
                    reportedCount: this.agencyCountsModel.totalReported,
                    discrepancyCount: this.discrepancyCount
                };
                const totbal = [];
                totbal.push(alltot);
                this.pinnedTempOidcountData = totbal;
                if (this.tempOidcountData.length === 0) {
                    this.pinnedTempOidcountData = []
                    this.clearBtnDisable = true;
                    this.reCountBtnDisable = true;
                    this.progressStatus = undefined;
                }
            } else {
                if (this.tempOidcountData && this.tempOidcountData.length > 0) {
                    this.pinnedTempOidcountData = [];
                    this.colorClass = 'countRed';
                    this.clearBtnDisable = true;
                    this.reCountBtnDisable = true;
                    this.progressStatus = this.translateService.translate('oidcount.countin');
                }
            }
            if (refreshTemp.countTemp === 0) {
                if (this.tempOidcountData[0].locationDescription) {
                    this.userCancelledFlag = null;
                    const userId = this.sessionManager.getId();
                    const userCancel = this.oidcountFactory.refreshCountUserCancelledCur(this.globalSessionId, userId);
                    userCancel.subscribe(cancelCur => {
                        this.userCancelledFlag = cancelCur;
                        this.sub.unsubscribe();
                        if ((this.userCancelledFlag && this.userCancelledFlag === 'Y') || !this.userCancelledFlag) {
                            const data = {
                                label: this.translateService.translate('oidcount.counthasbeenterminated') + ' ' +
                                    userId + ' ' + this.translateService.translate('oidcount.differentsession'), yesBtn: true,
                                    yesLabel: this.translateService.translate('common.ok'), noBtn: false
                            };
                            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                                if (typeof result === 'boolean' && result) {
                                    this.router.navigate(['/home']);
                                } else {
                                    this.router.navigate(['/home']);
                                }
                            });

                        } else {
                            this.cancelFlag = false;
                        }
                    });
                }
                if (this.tempOidcountData.length === 0) {
                    this.pinnedTempOidcountData = [];
                    this.progressStatus = undefined;
                    this.clearBtnDisable = true;
                    this.reCountBtnDisable = true;
                }
            } else {
                if (this.tempOidcountData[0].locationDescription === null) {
                    this.initiateTempOidCountRecords();
                }
                if (this.checkEnterRemoteFlag || this.checkCountFlag) {
                    const refrTemp = this.oidcountFactory.refreshCountOfTempOidCount(this.globalSessionId);
                    refrTemp.subscribe(gridData => {
                        if (gridData.length > 0) {
                            for (let i = 0; i < gridData.length; i++) {
                                for (let j = 0; j < this.tempOidcountData.length; j++) {
                                    if (gridData[i].locationDescription === this.tempOidcountData[j].locationDescription) {
                                        if (!this.tempOidcountData[j].actualCount && (gridData[i].actualCount ||
                                            gridData[i].actualCount === 0)) {
                                            this.grid.setColumnData('actualCount', i, gridData[i].actualCount);
                                            this.enterRemoteBtnDisable = false;
                                        }
                                        if (!this.tempOidcountData[j].totalMale && gridData[i].totalMale) {
                                            this.tempOidcountData[j].totalMale = gridData[i].totalMale;
                                        }
                                        if (!this.tempOidcountData[j].totalFemale && gridData[i].totalFemale) {
                                            this.tempOidcountData[j].totalFemale = gridData[i].totalFemale;
                                        }
                                        if (!this.tempOidcountData[j].totalOther && gridData[i].totalOther) {
                                            this.tempOidcountData[j].totalOther = gridData[i].totalOther;
                                        }
                                        if (this.tempOidcountData[j].reportedCount !== gridData[i].reportedCount) {
                                            this.grid.setColumnData('reportedCount', i, gridData[i].reportedCount);
                                            this.grid.setColumnData('discrepancyCount', i, gridData[i].discrepancyCount);
                                            this.grid.setColumnData('dateSubmitted', i, gridData[i].dateSubmitted);
                                            this.grid.setColumnData('enteredByUserid', i, gridData[i].enteredByUserid);
                                        }
                                    }
                                    this.agencyCountTypesModel.agyLocId = gridData[i].agyLocId;
                                    this.agencyCountTypesModel.countTypeCode = gridData[i].countTypeCode;
                                    //this.countTypeIdTemp = gridData[i].scheduledTime;
                                }
                            }
                        }
                    });
                }
                if (this.tempOidcountData.length === 0) {
                    this.pinnedTempOidcountData = [];
                    this.progressStatus = undefined;
                    this.clearBtnDisable = true;
                    this.reCountBtnDisable = true;
                }
            }
            this.grid.columnApi.autoSizeColumns(['enteredByUserid']);
            if (this.tempOidcountData.length === 0) {
                this.pinnedTempOidcountData = [];
                this.progressStatus = undefined;
                this.clearBtnDisable = true;
                this.reCountBtnDisable = true;
            }
        });
    }

    onButEnterRemoteclick = () => {
        const refreshService = this.oidcountFactory.refreshCount(this.globalSessionId);
        refreshService.subscribe(refreshTemp => {
            if (!(refreshTemp.actualCountTemp === refreshTemp.reportedCountTemp && refreshTemp.reportedCountTemp > 0)) {
                this.dialogService.openLinkDialog('/OIDREMCS', this.agencyCountTypesModel).subscribe(result => {
                    if (result) {
                        this.checkEnterRemoteFlag = true;
                        this.refreshCountmethod();
                    }
                });
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcount.countalreadycompleted');
                this.show();
            }
        });
    }
}
