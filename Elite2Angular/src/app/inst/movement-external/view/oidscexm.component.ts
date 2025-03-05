import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OidscexmService } from '../service/oidscexm.service';
import { VOffenderAllSchedules } from '@instschedulebeans/VOffenderAllSchedules';
import { VOffenderAllSchedulesCommitBean } from '@instschedulebeans/VOffenderAllSchedulesCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';

@Component({
    selector: 'app-oidscexm',
    templateUrl: './oidscexm.component.html'
})

export class OidscexmComponent implements OnInit {
    offSchIndex = -1;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offschData: VOffenderAllSchedules[] = [];
    offschDataTemp: VOffenderAllSchedules[] = [];
    offschModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    offschRowClickModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    offschInsertList: VOffenderAllSchedules[] = [];
    offschUpdatetList: VOffenderAllSchedules[] = [];
    offschUpdatetListForSave: VOffenderAllSchedules[] = [];
    offschDeleteList: VOffenderAllSchedules[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    vhbColumnDef: any[];
    offSchColumnDef: any[];
    qryBlkReadOnly = false;
    vhbReadOnly = false;
    commonBlkReadOnly = false;
    dummyBlkReadOnly = false;
    movementReadOnly = false;
    offSchReadOnly = false;
    rgmovetypeRg: any[] = [];
    rgbuildingRg: any[] = [];
    rgagyidRg: any[] = [];
    rgtierRg: any[] = [];
    type = 'error';
    msglist = [];
    directionCodeCheck: boolean;
    prisonactivities: boolean;
    message = ' Invalid.';
    externalMoveDirectionCode: any;
    @ViewChild('grid') grid: any;
    offschCommitModel: VOffenderAllSchedulesCommitBean = new VOffenderAllSchedulesCommitBean();
    movementModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    suspendModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    namesReadOnly: boolean;
    retrieveDisabeld: boolean;
    clearDisabeld: boolean;
    vHeaderBlockModel: VHeaderBlock;

    constructor(private oidscexmFactory: OidscexmService, public translateService: TranslateService,
        private sessionManager: UserSessionManager, public dialogService: DialogService,private offenderSearchService: OffenderSearchService) {
            this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    }
    ngOnInit() {
        this.namesReadOnly = false;
        this.retrieveDisabeld = false;
        this.disabled = true;
        this.offSchColumnDef = [
            {
                fieldName: this.translateService.translate('oiddprop.confirm'), field: 'confirmMove', editable: true,
                datatype: 'checkbox', width: 120
            },
            {
                fieldName: this.translateService.translate('common.type'), field: 'eventTypeDesc', editable: false,
                datatype: 'text', width: 100
            },
            {
                fieldName: this.translateService.translate('common.reason'), field: 'eventSubTypeDesc', editable: false,
                datatype: 'text', width: 150
            },
            {
                fieldName: this.translateService.translate('common.inout'), field: 'directionCode', editable: false,
                width: 120
            },
            {
                fieldName: this.translateService.translate('common.date'), field: 'eventDate', editable: false,
                datatype: 'date', width: 150
            },
            {
                fieldName: this.translateService.translate('common.time'), field: 'scheduleMovementTime', editable: false,
                width: 100, datatype: 'time'
            },
            {
                fieldName: this.translateService.translate('oidscexm.returnDate'), field: 'returnDate', editable: false,
                datatype: 'date', width: 150
            },
            {
                fieldName: this.translateService.translate('oidscexm.returnTime'), field: 'returnTime', editable: false,
                width: 100, datatype: 'time'
            },
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay',
                editable: false, width: 150, maxlength: 10
            },
            {
                fieldName: this.translateService.translate('system-profile.name-last'), field: 'offenderLastName',
                editable: false, width: 150, maxlength: 35
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'offenderFirstName',
                editable: false, width: 150, maxlength: 35
            },
            { fieldName: this.translateService.translate('common.location'), field: 'livingUnitDesc', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.to'), field: 'toAgyLocDesc', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.comment'), field: 'commentText', editable: false,
                width: 150
            },

        ];
        this.movementModel.fromDate = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
        this.movementModel.toDate = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
        this.movementModel.fMDate = DateFormat.getDate();
        this.movementModel.fMTime = DateFormat.getDate();
    }

    allowNumbers() {
        this.type = 'info';
        this.message = 'please use the select button to select the trip ';
        this.show();
        return;
    }
    onButSelectclick() {
        this.type = 'info';
        this.message = 'This button currently out of scope';
        this.show();
        return;
    }
    onButClearClick() {
        const eventTypeVal = this.movementModel.eventType === undefined ? '' : undefined;
        this.movementModel.eventType = eventTypeVal;
        const arrestLocValue = this.movementModel.toAgyLocId === undefined ? '' : undefined;
        this.movementModel.toAgyLocId = arrestLocValue;
        this.movementModel.fromDate = DateFormat.getDate();
        this.movementModel.toDate = DateFormat.getDate();
        this.movementModel = new VOffenderAllSchedules();
        this.offschData = [];
        this.namesReadOnly = false;
        this.retrieveDisabeld = false;
        this.clearDisabeld = true;
        this.movementModel.toAgyLocId = undefined;
    }
    onRowClickoffsch(event) {
        const hh = DateFormat.getDate(this.movementModel.fMTime).getHours();
        const mm = DateFormat.getDate(this.movementModel.fMTime).getMinutes();
        const lvEventTime = DateFormat.getDate(DateFormat.getDate(this.movementModel.fMDate).setHours(hh, mm, 0));
        this.externalMoveDirectionCode = null;
        this.display = false;
        this.directionCodeCheck = false;
        this.prisonactivities = false;
        this.offschRowClickModel = event;
        const offenderBookId = event && event.offenderBookId;
        const lastMove = this.oidscexmFactory.getLastMovementDateTime(this.offschRowClickModel);
        lastMove.subscribe(lastMoveResult => {
            this.externalMoveDirectionCode = lastMoveResult.directionCode;
            if (lastMoveResult.commentText === 'ConfimMsg') {
                const data = {
                    label: this.translateService.translate('oidscexm.notificationsmessage'), yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                    if (result) {
                        //  oidscexm.update_off_not_completions ( v_off_book_id,
                        //  v_noti_s,
                        //  v_noti_move_s );
                    } else {
                        // RAISE form_trigger_failure;
                    }
                });
            }
            if (lastMoveResult) {
                if (lastMoveResult.directionCode === event.directionCode) {
                    // this.directionCodeCheck = true;
                }
                const lvLastMoveDatetime = DateFormat.getDate(lastMoveResult.movementTime);
                if (lvLastMoveDatetime >= lvEventTime  /*event.eventDate*/) {
                    this.display = true;
                }
                if (lastMoveResult.dspDescription) {
                    if (Number(lastMoveResult.dspDescription) > 0) {
                        this.prisonactivities = true;
                    }
                }
            } else {
                this.display = false;
            }
        });
    }

    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    /**
       *  This event is fired when movement type is clicked
      */
    movementTypeClick(event) {
        if(event && event.code){
            this.movementModel.eventType = event.code;
        }else {
            const typeValue = this.movementModel.eventType === undefined ? '' : undefined;
            this.movementModel.eventType = typeValue;
        }
    }
    /**
       *  This event is fired when facility is clicked
      */
    fromToFacilityClick(event) {
        this.movementModel.toAgyLocId = event.code;
    }
    // onFromDateBlur() {
    //     if (!this.movementModel.fromDate) {
    //         this.movementModel.fromDate = this.movementModel.fromDate === undefined ? null : undefined;
    //     }

    // }
    // onToDateBlur() {
    //     if (!this.movementModel.toDate) {
    //         this.movementModel.toDate = this.movementModel.toDate === undefined ? null : undefined;
    //     }
    // }
    retriveBeforevlidations(date?, dateOne?) {
        const is = { valid: true };
        if (date) {
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show();
                is.valid = false;
                return is.valid;
            }
        }
        if (dateOne) {
            if (String(dateOne.lastValue).indexOf('_') >= 0 && dateOne.value === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show();
                is.valid = false;
                return is.valid;
            }
        }
        if (!this.movementModel.fromDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidscexm.fromdatemandatoryvalidation');
            this.show();
            is.valid = false;
            return is.valid;
        }
        if (!this.movementModel.toDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidscexm.todatemandatoryvalidation');
            this.show();
            is.valid = false;
            return is.valid;
        }
        return is.valid;
    }
    onButSearchclick(date?, dateOne?) {
        if (!this.retriveBeforevlidations(date,dateOne)) {
            return;
        }
        this.offschModel.fromDate = this.movementModel.fromDate;
        this.offschModel.toDate = this.movementModel.toDate;
        this.offschModel = this.movementModel;

        if (this.movementModel.fromDate && this.movementModel.toDate) {
            if (DateFormat.compareDate(this.movementModel.fromDate, this.movementModel.toDate) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidscexm.fromdatecannotbegreaterthantodate');
                this.show();
                return;
            }
        }
        this.offschExecuteQuery();
    }

    /**
     *  This function will be executed when search event is
     *  fired
     */
    offschExecuteQuery() {
        this.offschModel.caseLoadId = this.sessionManager.currentCaseLoad;
        this.offschModel.toAgyLocId = this.movementModel.toAgyLocId;
        const offschResult = this.oidscexmFactory.offSchExecuteQuery(this.offschModel);
        offschResult.subscribe(offschResultList => {
            if (offschResultList.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidscexm.querycausednorecords');
                this.show();
                this.offschData = [];
                if(this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId){
                    this.offenderSearchService.selectedOffender = [];
                }
            } else {
                if(offschResultList.length > 0 ){
                    offschResultList.forEach(element => {
                        if(element && element.eventTypeDesc){
                            element.eventTypeDesc = element.eventTypeDesc.toUpperCase();
                        }
                        if(element && element.eventSubTypeDesc){
                            element.eventSubTypeDesc = element.eventSubTypeDesc.toUpperCase();
                        }
                        if (element.directionCode == 'IN') {
                            let loc = element.toAgyLocDesc;
                            let toloc = element.livingUnitDesc;
                            element.livingUnitDesc = loc;
                            element.toAgyLocDesc = toloc;
                        }
                    });
                }
                this.offschData = offschResultList;
                this.offSchIndex = 0;
                this.offschModel = offschResultList[0];
                this.namesReadOnly = true;
                this.retrieveDisabeld = true;
                this.clearDisabeld = false;
                if(this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId){
                    this.offenderSearchService.selectedOffender = [];
                }
            }
        });
    }

    /**
     * This function will be executed when commit event is
     * fired
     */
    oidscexmSaveoffschForm(event) {
        this.offschUpdatetListForSave = [];
        this.offschUpdatetList = event.updated;
        this.offschCommitModel.updateList = [];
        if (this.offschUpdatetList.length > 0) {
            for (let i = 0; i < this.offschUpdatetList.length; i++) {
                if (this.offschUpdatetList[i].confirmMove) {
                    this.offschUpdatetList[i].activeFlag = 'N';
                    if(this.movementModel.fMTime){
                        this.offschUpdatetList[i].fMTime = DateFormat.getDate(this.movementModel.fMTime.setSeconds(0));
                        this.offschUpdatetList[i].fMDate = DateFormat.getDate(this.movementModel.fMDate.setHours(this.movementModel.fMTime.getHours(),this.movementModel.fMTime.getMinutes(),0,0));;
                    }else{
                        this.offschUpdatetList[i].fMDate = this.movementModel.fMDate;
                    }
                    this.offschUpdatetList[i].caseLoadId = this.sessionManager.currentCaseLoad;
                    this.offschUpdatetListForSave.push(this.offschUpdatetList[i]);
                }
                if (this.offschUpdatetList[i].directionCode === this.offschUpdatetList[i].inOutStatus) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidscexm.validationShow');
                    this.show();
                    return;
                }
            }
            if (this.offschUpdatetListForSave.length > 0) {
                this.offschCommitModel.updateList = this.offschUpdatetListForSave;
                this.processExternalMovement();
            }else{
                this.onButSearchclick();
            }
        }
    }

    whenCheckboxChanged = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'confirmMove') {
            if (this.display) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidscexm.movementdatetimecheck');
                this.show();
                rowdata.validated = true;
                rowdata.data = { confirmMove: false };
                event.data.confirmMove = false;
                return rowdata;
            } else if (this.directionCodeCheck) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidscexm.verifyduplicatemovement') + ' ' +
                    this.offschRowClickModel.offenderIdDisplay + ' ' +
                    this.translateService.translate('oidscexm.isalready') + ' ' + this.externalMoveDirectionCode;
                this.show();
                rowdata.validated = true;
                rowdata.data = { confirmMove: false };
                return rowdata;
            } else if (this.prisonactivities) {
                /*
                 *  confirmation dialauge for prisonactivities
                 */
                const data = {
                    label: this.translateService.translate('oidscexm.prisonactivities'), yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                    if (result) {
                        this.suspendModel.commentText = 'suspend';
                        this.suspendModel.offenderBookId = event.data.offenderBookId;
                        this.suspendModel.eventDate = event.data.eventDate;
                        const suspendObj = this.oidscexmFactory.suspendAllocations(this.suspendModel);
                        suspendObj.subscribe(suspend => {
                        });
                    } else {
                        this.suspendModel.offenderBookId = event.data.offenderBookId;
                        this.suspendModel.eventDate = event.data.eventDate;
                        const suspendObj = this.oidscexmFactory.suspendAllocations(this.suspendModel);
                        suspendObj.subscribe(suspend => {
                        });
                    }
                });
                rowdata.validated = true;
                rowdata.data = { confirmMove: true };
                return rowdata;
            } else {
                rowdata.data = { confirmMove: event.data.confirmMove };
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    processExternalMovement() {
        const offschSaveData = this.oidscexmFactory.processExternalMovement(this.offschCommitModel);
        offschSaveData.subscribe(data => {
            const count = data.checkSum;
            if (count) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.onButSearchclick(); 
                this.offschDataTemp = [];
                for (let j = 0; j < this.offschUpdatetList.length; j++) {
                    for (let i = 0; i < this.offschData.length; i++) {
                        if (this.offschData[i].eventId === this.offschUpdatetList[j].eventId) {
                            this.offschData.splice(i, 1);
                        }
                    }
                }
                for (let i = 0; i < this.offschData.length; i++) {
                    this.offschDataTemp.push(this.offschData[i]);
                }
                this.offschData = this.offschDataTemp;
            } else {
                this.type = 'warn';
                this.offschDataTemp = [];
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.onButSearchclick()
            }
        });
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    isInsertable() {
        if (this.movementModel.fromDate || this.movementModel.toDate || this.movementModel.fMDate
            || this.movementModel.fMTime || this.movementModel.eventType || this.movementModel.toAgyLocId
            || this.namesReadOnly) {
            this.clearDisabeld = false;
        } else {
            this.clearDisabeld = true;
        }
    }
}
