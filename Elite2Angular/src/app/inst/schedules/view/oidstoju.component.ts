import {
    Component, OnInit
} from '@angular/core';

import { TranslateService } from '@common/translate/translate.service';
import { OidstojuService } from '@inst/schedules/service/oidstoju.service';
import { VOffenderAllSchedules } from '@instschedulebeans/VOffenderAllSchedules';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Offenders } from '@commonbeans/Offenders';
import { VOffenderAllSchedulesCommitBean } from '@instschedulebeans/VOffenderAllSchedulesCommitBean';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { SchedulerService } from '@core/ui-components/schedule/scheduler.service';
import { Router } from '@angular/router';
// import required bean declarations

@Component({
    selector: 'app-oidstoju',
    templateUrl: './oidstoju.component.html'
})

export class OidstojuComponent implements OnInit {
    // Variable declaration
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offschData: VOffenderAllSchedules[] = [];
    offschDataTemp: VOffenderAllSchedules[] = [];
    offschModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    offschIndex = 0;
    offschInsertList: VOffenderAllSchedules[] = [];
    offschUpdateList: VOffenderAllSchedules[] = [];
    offschDeleteList: VOffenderAllSchedules[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    crtEveColumnDef: any[];
    offSchColumnDef: any[];
    ctrlReadOnly = false;
    crtEveReadOnly = false;
    offSchReadOnly = false;
    rgLocationRg: any[] = [];
    rgEscortRg: any[] = [];
    offenderObj: Offenders = new Offenders();
    vHeaderBlockOffender: VHeaderBlock = new VHeaderBlock();
    // addFlag = false;
    tableIndex: any;
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    offschCommitModel: VOffenderAllSchedulesCommitBean = new VOffenderAllSchedulesCommitBean();
    saveFlag = false;
    inCountDup = 0;
    conflictFlag = false;
    datesFlag = false;
    dateTimeFlag = false;
    offschConflictModel: any;
    conflictInsertList: any[] = [];
    rgEventRg: any[] = [];
    eventId: any;
    checkFlag: any;
    backButton: Boolean;
    constructor(private oidstojuFactory: OidstojuService, public translateService: TranslateService, private router: Router,
        private offenderSearchService: OffenderSearchService, public dialogService: DialogService, private schedularService: SchedulerService) {
        // TODO initilize data members here..!
        this.crtEveColumnDef = [];
        this.offSchColumnDef = [];
    }
    ngOnInit() {

        if (this.schedularService.backBtnFlag) {
			this.backButton = true;
		 } else {
			this.backButton = false;
		 }

        this.checkFlag = false;
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.offSchColumnDef = [
            {
                fieldName: this.translateService.translate('oidstoju.releasedate'), field: 'eventDate',
                editable: true, width: 150, datatype: 'date', cellEditable: this.canEventDateEdit, maxlength: 11
            },
            {
                fieldName: this.translateService.translate('oidstoju.time'), maxlength: 5,
                field: 'startTime', editable: true, width: 150, datatype: 'time', cellEditable: this.canEventDateEdit
            },
            {
                fieldName: this.translateService.translate('oidstoju.state'),
                field: 'provStateCode', editable: true, width: 300, datatype: 'lov', domain:'PROV_STATE',
                optionWidth: 350, maxlength: 40, cellEditable: this.canEventDateEdit
            },
            {
                fieldName: this.translateService.translate('oidstoju.escort'),
                field: 'escortCode', editable: true, width: 300, datatype: 'lov', domain: 'ESCORT', optionWidth: 350,
                cellEditable: this.canEventDateEdit, maxlength: 40
            },
            {
                fieldName: this.translateService.translate('oidstoju.comment'),
                field: 'commentText', editable: true, width: 300, datatype: 'text', maxlength: 240, uppercase: 'false',
                cellEditable: this.canEventDateEdit
            },
            {
                fieldName: '',field: 'offenderBookId',hide: true
            },
            {
                fieldName: '',field: 'insertedFlag',hide: true
            },
        ];
        // TODO all initializations here

        const rglocationServiceObj = this.oidstojuFactory.rgLocationRecordGroup();
        rglocationServiceObj.subscribe(rgLocationList => {
            if (rgLocationList.length === 0) {
                this.rgLocationRg = [];
            } else {
                for (let i = 0; i < rgLocationList.length; i++) {
                    this.rgLocationRg.push({
                        'text': rgLocationList[i].code + ' - ' +
                            rgLocationList[i].description, 'id': rgLocationList[i].code
                    });
                }
            }
        });
        const rgescortServiceObj = this.oidstojuFactory.rgEscortRecordGroup();
        rgescortServiceObj.subscribe(rgEscortList => {
            if (rgEscortList.length === 0) {
                this.rgEscortRg = [];
            } else {
                for (let i = 0; i < rgEscortList.length; i++) {
                    this.rgEscortRg.push({
                        'text': rgEscortList[i].code + ' - ' +
                            rgEscortList[i].description, 'id': rgEscortList[i].code
                    });
                }
            }
        });

        const rgEventTypeServiceObj = this.oidstojuFactory.rgEventTypeSubTypeGroup();
        rgEventTypeServiceObj.subscribe(rgEventList => {
            if (rgEventList.length === 0) {
                this.rgEventRg = [];
            } else {
                for (let i = 0; i < rgEventList.length; i++) {
                    this.rgEventRg.push({
                        'text':
                            rgEventList[i].description, 'id': rgEventList[i].code
                    });
                }
            }
        });

        if (this.vHeaderBlockModel) {
            this.offschExecuteQuery();
        }
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.offenderObj.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offenderObj.offenderId = this.vHeaderBlockModel.offenderId;
            this.vHeaderBlockOffender = this.vHeaderBlockModel;
            if (this.vHeaderBlockModel.rootOffenderId) {
                this.offschExecuteQuery();
            }
        } else {
            this.offschData = [];
            this.display = true;
            this.conflictFlag = false;
            this.datesFlag = false;
            this.dateTimeFlag = false;
        }
    }
    get addFlag() {
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
            return true;
        } else {
            return false;
        }
    }
    canEventDateEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'provStateCode' || field === 'escortCode' || field === 'commentText') {
            if (this.datesFlag) {
                this.show(this.translateService.translate('oidstoju.releasedatealert'), 'warn');
                return false;
            } else if (this.dateTimeFlag) {
                this.show(this.translateService.translate('oidstoju.dateandtimealert'), 'warn');
                return false;
            }
        }
        if (field === 'startTime') {
            if (this.datesFlag) {
                this.show(this.translateService.translate('oidstoju.releasedatealert'), 'warn');
                return false;
            }
        }
        if (this.datesFlag || this.dateTimeFlag) {
            if (field === 'eventDate' && this.offschIndex !== this.offschData.indexOf(data)) {
                if (this.datesFlag) {
                    this.show(this.translateService.translate('oidstoju.releasedatealert'), 'warn');
                    return false;
                } else if (this.dateTimeFlag) {
                    this.show(this.translateService.translate('oidstoju.dateandtimealert'), 'warn');
                    return false;
                }
            }


        }

        if (this.conflictFlag && !this.checkFlag) {
            this.checkFlag = true;
            this.dialogService.openLinkDialog('/oiuscinq', this.offschModel).subscribe(result => {
                if (!result) {
                    this.conflictFlag = true;
                    this.checkFlag = false;
                    return false;
                } else {
                    this.conflictFlag = false;
                    this.checkFlag = true;
                    return true;
                }
            });
            return false;
        }
        return true;
    }

    updateOffenderSchValidator = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (this.datesFlag && event.data.eventId !== this.eventId) {
            this.show(this.translateService.translate('oidstoju.releasedatealert'), 'warn');
            rowdata.data = {
                eventDate: event.data.eventDate, offenderBookId: event.data.offenderBookId,
                startTime: event.data.startTime, provStateCode: event.data.provStateCode, escortCode: event.data.escortCode,
                commentText: event.data.commentText, insertedFlag: true
            };
            rowdata.validated = true;
            return rowdata;
        } else if (this.dateTimeFlag && event.data.eventId !== this.eventId) {
            this.show(this.translateService.translate('oidstoju.dateandtimealert'), 'warn');
            rowdata.data = {
                eventDate: event.data.eventDate, offenderBookId: event.data.offenderBookId,
                startTime: event.data.startTime, provStateCode: event.data.provStateCode, escortCode: event.data.escortCode,
                commentText: event.data.commentText, insertedFlag: true
            };
            rowdata.validated = true;
            return rowdata;
        }
        if (event.field === 'eventDate') {
            if (event.data.eventDate) {
                if (DateFormat.compareDate(DateFormat.getDate(event.data.eventDate), DateFormat.getDate()) < 0) {
                    this.datesFlag = true;
                    this.eventId = event.data.eventId;
                    this.offschIndex = rowIndex;
                    this.show(this.translateService.translate('oidstoju.releasedatealert'), 'warn');
                    rowdata.data = {
                        eventDate: event.data.eventDate, offenderBookId: event.data.offenderBookId,
                        startTime: event.data.startTime, provStateCode: event.data.provStateCode, escortCode: event.data.escortCode,
                        commentText: event.data.commentText, insertedFlag: true
                    };
                    rowdata.validated = true;
                    return rowdata;
                }
                this.datesFlag = false;
                if (!event.data.eventId || DateFormat.compareDate(DateFormat.getDate(event.oldValue),
                    DateFormat.getDate(event.newValue)) !== 0) {
                    const offschCheckConflit = this.oidstojuFactory.offSchCheckScheduleConflictBeforeSave(this.offschModel);
                    offschCheckConflit.subscribe(checkConflict => {
                        if (checkConflict > 0) {
                            this.dialogService.openLinkDialog('/oiuscinq', this.offschModel).subscribe(result => {
                                if (!result) {
                                    this.conflictFlag = true;
                                    return false;
                                } else {
                                    this.conflictFlag = false;
                                }
                            });
                        }
                    });
                }
            }
        }
        if (event.field === 'startTime') {
            if (event.data.eventDate && event.data.startTime) {
                if (DateFormat.compareDate(DateFormat.getDate(event.data.eventDate), DateFormat.getDate()) < 0) {
                    this.datesFlag = true;
                    this.eventId = event.data.eventId;
                    this.offschIndex = rowIndex;
                    this.show(this.translateService.translate('oidstoju.releasedatealert'), 'warn');
                    rowdata.data = {
                        eventDate: event.data.eventDate, offenderBookId: event.data.offenderBookId,
                        startTime: event.data.startTime, provStateCode: event.data.provStateCode, escortCode: event.data.escortCode,
                        commentText: event.data.commentText, insertedFlag: true
                    };
                    rowdata.validated = true;
                    return rowdata;
                } else if (DateFormat.compareDate(DateFormat.getDate(event.data.eventDate), DateFormat.getDate()) === 0) {
                    if (DateFormat.compareTime(event.data.startTime, DateFormat.getDate()) < 0) {
                        this.dateTimeFlag = true;
                        this.eventId = event.data.eventId;
                        this.offschIndex = rowIndex;
                        this.show(this.translateService.translate('oidstoju.dateandtimealert'), 'warn');
                        rowdata.data = {
                            eventDate: event.data.eventDate, offenderBookId: event.data.offenderBookId,
                            startTime: event.data.startTime, provStateCode: event.data.provStateCode, escortCode: event.data.escortCode,
                            commentText: event.data.commentText, insertedFlag: true
                        };
                        rowdata.validated = true;
                        return rowdata;
                    }
                }
                rowdata.data = {
                    eventDate: event.data.eventDate, offenderBookId: event.data.offenderBookId,
                    startTime: event.data.startTime, provStateCode: event.data.provStateCode, escortCode: event.data.escortCode,
                    commentText: event.data.commentText, insertedFlag: true
                };
                this.datesFlag = false;
                this.dateTimeFlag = false;
                rowdata.validated = true;
                return rowdata;
            }
        }

        if (event.oldValue !== event.newValue) {
            rowdata.data = {
                eventDate: event.data.eventDate, offenderBookId: event.data.offenderBookId,
                startTime: event.data.startTime, provStateCode: event.data.provStateCode, escortCode: event.data.escortCode,
                commentText: event.data.commentText, insertedFlag: true
            };
            rowdata.validated = true;
            return rowdata;
        }

    }
    onGridReady = () => {
        if (this.vHeaderBlockModel.statusDisplay == 'Inactive') {
            this.show(this.translateService.translate('oidstoju.thisactioncannotbeperformedforaninactiveoffender'), 'warn');
            return;
        }
        if (this.datesFlag) {
            this.show(this.translateService.translate('oidstoju.releasedatealert'), 'warn');
            return false;
        } else if (this.dateTimeFlag) {
            this.show(this.translateService.translate('oidstoju.dateTimeFlag'), 'warn');
            return false;
        }
        if (this.conflictFlag) {
            this.dialogService.openLinkDialog('/oiuscinq', this.offschModel).subscribe(result => {
                if (!result) {
                    this.conflictFlag = true;
                    return false;
                } else {
                    this.conflictFlag = false;
                }
            });
        }

        if (!this.conflictFlag) {
            for (let i = 0; i < this.offschData.length; i++) {

                if (!this.offschData[i].eventDate && this.offschData[i].startTime) {
                    this.show(this.translateService.translate('oidstoju.releasedateentered'), 'warn');
                    return false;
                }

                if (!this.offschData[i].eventDate) {
                    this.show(this.translateService.translate('oidstoju.releasedateentered'), 'warn');
                    return false;
                }
                if (!this.offschData[i].startTime) {
                    this.show(this.translateService.translate('oidstoju.timeentered'), 'warn');
                    return false;
                }
                if (!this.offschData[i].provStateCode) {
                    this.show(this.translateService.translate('oidstoju.statemandatory'), 'warn');
                    return false;
                }

            }
            this.display = true;
            const eventRg = this.rgEventRg.find(eventType =>
                eventType.id === 'TRN');
            const eventSubRg = this.rgEventRg.find(eventSubType =>
                eventSubType.id === 'OJ');
            return {
                offenderBookId: this.vHeaderBlockModel.offenderBookId, agyLocId: this.vHeaderBlockModel.agyLocId,
                eventSubTypeDesc: eventSubRg.text, eventTypeDesc: eventRg.text
            };
        }
    }

    offschExecuteQuery() {
        if (!this.conflictFlag) {
            this.offschModel = new VOffenderAllSchedules();
            this.offschModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            const offschResult = this.oidstojuFactory.offSchExecuteQuery(this.offschModel);
            offschResult.subscribe(offschResultList => {
                if (offschResultList.length === 0) {
                    this.offschData = [];
                    this.offschModel = new VOffenderAllSchedules();
                } else {
                    this.offschData = offschResultList;
                    this.offschModel = offschResultList[0];
                    this.tableIndex = 0;
                }
            });
        }
    }

    onRowClickoffsch(event) {
        if (event) {
            if (this.datesFlag) {
                this.show(this.translateService.translate('oidstoju.releasedatealert'), 'warn');
                return false;
            } else if (this.dateTimeFlag) {
                this.show(this.translateService.translate('oidstoju.dateandtimealert'), 'warn');
                return false;
            }
            if (this.conflictFlag) {
                if (!this.offschModel.eventId) {
                    this.conflictFlag = false;
                } else {
                    this.dialogService.openLinkDialog('/oiuscinq', this.offschModel).subscribe(result => {
                        if (!result) {
                            this.conflictFlag = true;
                            return false;
                        } else {
                            this.conflictFlag = false;
                        }
                    });
                }
            }
            if (!this.conflictFlag) {
                if (event) {
                    this.offschModel = event;
                    this.offschIndex = this.offschData.indexOf(event);
                    return true;
                }
            }
        }
        return false;
    }
    // * This function will be executed when commit event is fired*/
    oidstojuSaveoffschForm(event) {
        // TODO declare commit bean and add insert list to that object.

        this.offschInsertList = event.added;
        this.offschUpdateList = event.updated;
        this.offschDeleteList = event.removed;
        this.offschCommitModel.insertList = [];
        this.offschCommitModel.updateList = [];
        this.offschCommitModel.deleteList = [];
        if (this.offschInsertList.length > 0) {
            for (let i = 0; i < this.offschInsertList.length; i++) {
                if (!this.offschInsertList[i].eventDate && this.offschInsertList[i].startTime) {
                    this.show(this.translateService.translate('oidstoju.dateandtimealert'), 'warn');
                    return false;
                }
                this.offschInsertList[i].eventDate = DateFormat.getDate(this.offschInsertList[i].eventDate);

                if (this.offschInsertList[i].startTime) {
                    let startHours = DateFormat.getDate(this.offschInsertList[i].startTime).getHours();
                    let startMinutes = DateFormat.getDate(this.offschInsertList[i].startTime).getMinutes();
                    this.offschInsertList[i].startTime = DateFormat.getDate(DateFormat.getDate(this.offschInsertList[i].eventDate).setHours(startHours, startMinutes, 0, 0));
                }

                /* this.offschInsertList[i].startTime = TimeFormat.parse(TimeFormat.format(this.offschInsertList[i].startTime),
                    this.offschInsertList[i].eventDate); */

                if (DateFormat.compareDate(this.offschInsertList[i].eventDate, DateFormat.getDate()) < 0) {
                    this.show(this.translateService.translate('oidstoju.releasedatealert'), 'warn');
                    return false;
                } else if (DateFormat.compareDate(this.offschInsertList[i].eventDate, DateFormat.getDate()) === 0) {

                    if (DateFormat.compareTime(this.offschInsertList[i].startTime, DateFormat.getDate()) < 0) {
                        this.show(this.translateService.translate('oidstoju.dateandtimealert'), 'warn');
                        return false;
                    }
                }
            }
            this.offschCommitModel.insertList = this.offschInsertList;
        }
        if (this.offschUpdateList.length > 0) {
            for (let i = 0; i < this.offschUpdateList.length; i++) {
                this.offschUpdateList[i].eventDate = DateFormat.getDate(this.offschUpdateList[i].eventDate);
                if(this.offschUpdateList[i].startTime){
                    this.offschUpdateList[i].startTime = DateFormat.getDate(this.offschUpdateList[i].startTime);
                }
                if (this.offschUpdateList[i].startTime) {
                    let startHours = DateFormat.getDate(this.offschUpdateList[i].startTime).getHours();
                    let startMinutes = DateFormat.getDate(this.offschUpdateList[i].startTime).getMinutes();
                    this.offschUpdateList[i].startTime = DateFormat.getDate(DateFormat.getDate(this.offschUpdateList[i].eventDate).setHours(startHours, startMinutes, 0, 0));
                }
               /*  this.offschUpdateList[i].startTime = TimeFormat.parse(TimeFormat.format(this.offschUpdateList[i].startTime),
                    this.offschUpdateList[i].eventDate); */
                if (this.offschUpdateList[i].insertedFlag) {
                    if (DateFormat.compareDate(this.offschUpdateList[i].eventDate, DateFormat.getDate()) < 0) {
                        this.show(this.translateService.translate('oidstoju.releasedatealert'), 'warn');
                        return false;
                    } else if (DateFormat.compareDate(this.offschUpdateList[i].eventDate, DateFormat.getDate()) === 0) {
                        if (DateFormat.compareTime(this.offschUpdateList[i].startTime, DateFormat.getDate()) < 0) {
                            this.show(this.translateService.translate('oidstoju.dateandtimealert'), 'warn');
                            return false;
                        }
                    }
                }
                this.offschUpdateList[i].startTime = TimeFormat.parse(TimeFormat.format(this.offschUpdateList[i].startTime),
                    this.offschUpdateList[i].eventDate);
                if (this.conflictFlag) {
                    this.offschUpdateList[i].conflictFlag = false;
                } else {
                    this.offschUpdateList[i].conflictFlag = true;
                }

            }
            this.offschCommitModel.updateList = this.offschUpdateList;
        }
        if (this.offschDeleteList.length > 0) {
            for (let i = 0; i < this.offschDeleteList.length; i++) {
            }
            this.offschCommitModel.deleteList = this.offschDeleteList;
        }
        this.offSchCommitQuery();
    }

    offSchCommitQuery() {
        const offschedulesSaveData = this.oidstojuFactory.offSchCommit(this.offschCommitModel);
        offschedulesSaveData.subscribe(data => {
            if (data === null) {
                this.conflictFlag = false;
                this.saveFlag = false;
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            } else {
                if (data.offenderBookId > 0) {
                    if (!data.eventId) {
                        this.conflictInsertList = [];
                        for (let i = 0; i < this.offschInsertList.length; i++) {
                            if (DateFormat.compareDate(DateFormat.getDate(this.offschInsertList[i].eventDate),
                                DateFormat.getDate(data.eventDate)) === 0) {
                                this.conflictInsertList.push(this.offschInsertList[i]);
                            }
                        }
                        for (let i = 0; i < this.offschData.length; i++) {
                            if (this.offschData[i].eventId && DateFormat.compareDate(DateFormat.getDate(this.offschData[i].eventDate),
                                DateFormat.getDate(data.eventDate)) === 0) {
                                this.conflictInsertList.push(this.offschData[i]);
                            }
                        }
                        this.dialogService.openLinkDialog('/oiuscinq', this.conflictInsertList).subscribe(result => {
                            if (!result) {
                                this.conflictFlag = true;
                                return;
                            } else {
                                this.conflictFlag = false;
                                if (this.offschInsertList.length > 0) {
                                    for (let i = 0; i < this.offschInsertList.length; i++) {
                                        if (DateFormat.compareDate(DateFormat.getDate(this.offschInsertList[i].eventDate),
                                            DateFormat.getDate(data.eventDate)) === 0) {
                                            this.offschInsertList[i].conflictFlag = true;
                                        }
                                    }
                                    this.offschCommitModel.insertList = [];
                                    this.offschCommitModel.insertList = this.offschInsertList;
                                    this.offSchCommitQuery();
                                }
                            }
                        });
                    } else {
                        this.dialogService.openLinkDialog('/oiuscinq', data).subscribe(result => {
                            if (!result) {
                                this.conflictFlag = true;
                                return;
                            } else {
                                this.conflictFlag = false;
                                for (let i = 0; i < this.offschUpdateList.length; i++) {
                                    if (this.offschUpdateList[i].eventId === data.eventId) {
                                        this.offschUpdateList[i].conflictFlag = true;
                                    }
                                    this.offschCommitModel.updateList = [];
                                    this.offschCommitModel.updateList = this.offschUpdateList;
                                }
                                this.offSchCommitQuery();
                            }
                        });
                    }
                } else {
                    this.conflictFlag = false;
                    this.saveFlag = false;
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                    this.offschExecuteQuery();
                }
            }
        });
    }
    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onClearOffSchTrigger = () => {
        this.conflictFlag = false;
        this.datesFlag = false;
        this.dateTimeFlag = false;
        this.checkFlag = false;
        return true;
    }
    offSchOnDeleteTrigger = () => {
        if (this.offschModel.eventId) {
            if (this.datesFlag) {
                this.show(this.translateService.translate('oidstoju.releasedatealert'), 'warn');
                return false;
            } else if (this.dateTimeFlag) {
                this.show(this.translateService.translate('oidstoju.dateTimeFlag'), 'warn');
                return false;
            }
            if (this.conflictFlag) {
                this.dialogService.openLinkDialog('/oiuscinq', this.offschModel).subscribe(result => {
                    if (!result) {
                        this.conflictFlag = true;
                        return false;
                    } else {
                        this.conflictFlag = false;
                    }
                });
            }
            if (!this.conflictFlag) {
                for (let i = 0; i < this.offschData.length; i++) {
                    if (this.offschData[i].eventId) {
                        if (!this.offschData[i].eventDate && this.offschData[i].startTime) {
                            this.show(this.translateService.translate('oidstoju.dateandtimealert'), 'warn');
                            return false;
                        }
                        if (!this.offschData[i].eventDate) {
                            this.show(this.translateService.translate('oidstoju.releasedateentered'), 'warn');
                            return false;
                        }
                        if (!this.offschData[i].startTime) {
                            this.show(this.translateService.translate('oidstoju.timeentered'), 'warn');
                            return false;
                        }
                        if (!this.offschData[i].provStateCode) {
                            this.show(this.translateService.translate('oidstoju.statemandatory'), 'warn');
                            return false;
                        }

                    }
                }
                return true;
            }
        } else {
            this.conflictFlag = false;
            this.datesFlag = false;
            this.dateTimeFlag = false;
            return true;
        }
    }

    ngOnDestroy() {
		this.schedularService.backBtnFlag = false;
	  }

      onBack() {
		if(this.schedularService.backBtnFlag){
			this.schedularService.backBtnFlag = false;
			this.router.navigate(['/CALSCH']);
		} 
	}
}
