import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidbsiapService } from '@inst/schedules/service/oidbsiap.service';
import { VOffenderAllSchedules2 } from '@instschedulebeans/VOffenderAllSchedules2';
import { OffenderIndSchedules } from '@instschedulebeans/OffenderIndSchedules';
import { OffenderIndSchedulesCommitBean } from '@instschedulebeans/OffenderIndSchedulesCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { Router } from '@angular/router';
import { OiinamesService } from '@inst/movement-external/service/oiinames.service';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { VNameSearch } from '@commonbeans/VNameSearch';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { AppConstants } from '@core/classes/appConstants';
//  import required bean declarations

@Component({
    selector: 'app-oidbsiap',
    templateUrl: './oidbsiap.component.html'
})

export class OidbsiapComponent implements OnInit {
    //  Variable declaration
    @ViewChild('grid', { static: true }) grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offschData: any[] = [];
    offschDataTemp: VOffenderAllSchedules2[] = [];
    offschModel: VOffenderAllSchedules2 = new VOffenderAllSchedules2();
    offschModelTemp: VOffenderAllSchedules2 = new VOffenderAllSchedules2();
    offschIndex = 0;
    offschInsertList: OffenderIndSchedules[] = [];
    offschUpdateList: OffenderIndSchedules[] = [];
    offschDeleteList: OffenderIndSchedules[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offSchColumnDef: any[];
    ctlSearchReadOnly = false;
    offSchReadOnly = false;
    rgschinternalscheduleRg: any[] = [];
    rgagylocRg: any[] = [];
    rginternalmovelocationsRg: any[] = [];
    offIndSchCommitBeanModel: OffenderIndSchedulesCommitBean = new OffenderIndSchedulesCommitBean();
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    offIndSchModel: OffenderIndSchedules = new OffenderIndSchedules();
    agyLocLink: string;
    appLocLink: any;
    routUrl: string;
    namesrchModel: VNameSearch = new VNameSearch();
    namesrchData: VNameSearch[] = [];
    intLocIdMap: Map<string, string> = new Map<string, string>();
    saveIntLocIdMap: Map<string, string> = new Map<string, string>();
    locVal: any;
    conflictFlag = true;
    index: number;
    selectedRow: number;
    idCheckFag = true;
    updateFlag = false;
    saveFlag = false;
    checkDate = false;
    checkTime = false;
    checkReason = false;
    checkLocation = false;
    checkOfId = false;
    rowIndex: number;
    conflictIndex: number;
    readOnlyFlag: boolean;
    disableRetrive: boolean;
    offschtabInsert: boolean;
    offenderIndSchedules: OffenderIndSchedules = new OffenderIndSchedules();
    offenderTemp: any[] = [];
    offschSaveData: any;
    nsoffId: any;
    names: string;
    labelMsg: { label: string; yesBtn: boolean; proceedWithNoConflictsBtn: boolean; cancelBtn: boolean; };
    name: string;
    offenderNames: string[] = [];
    vOffPrgOblDataTemp: OffenderIndSchedules[] = [];
    count: number = 0;
    cancelAll:boolean;
    outcomechange:string;
    disableCancelFlag:boolean;
    disableOutcome: boolean;
    cancelReason:string;
    applyToAllDisable: boolean;
    cancelCheckbox: boolean;
    reqCancelReason: boolean;
    constructor(private oidbsiapFactory: OidbsiapService, public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private router: Router, private oiinamesFactory: OiinamesService, public dialogService: DialogService) {
        //  TODO initilize data members here..!
        this.offSchColumnDef = [];
    }
    ngOnInit() {
        this.readOnlyFlag = false;
        this.disableRetrive = false;
        this.offschtabInsert = false;
        this.selectedRow = 0;
        this.checkDate = false;
        this.checkTime = false;
        this.checkReason = false;
        this.checkLocation = false;
        this.checkOfId = false;
        this.saveFlag = false;
        this.updateFlag = false;
        this.idCheckFag = true;
        this.conflictFlag = true;
        this.offschModel = new VOffenderAllSchedules2();
        this.routUrl = this.router.url;
        this.agyLocLink = '/oidbsiap/rgAgyLocRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.disableCancelFlag=true;
        this.disableOutcome=true;
        this.applyToAllDisable=true;
        this.offSchColumnDef = [
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150,
                /* cellEditable: this.canOffIdDisplayEdit, */ maxlength: 10, datatype: 'text', required: true
            },
            {
                fieldName: '', field: 'button', editable: true, width: 120, datatype: 'launchbutton', link: '/oiinamesdialog',
                data: 'row', updateField: 'row', modal: true,
            },
            { fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'),
                field: 'firstName', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.inst-agency'), field: 'agyLocId',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.date') + '*', field: 'eventDate', editable: true,
                width: 140, datatype: 'date', cellEditable: this.canEventDateEdit
            },
            {
                fieldName: this.translateService.translate('common.time') + '*', field: 'startTime', editable: true,
                width: 110, datatype: 'time', cellEditable: this.canOffIdDisplayEdit
            },
            {
                fieldName: this.translateService.translate('oidbsiap.appointmentreason') + '*', field: 'eventSubType',
                editable: true, width: 200, datatype: 'lov', link: 'oidbsiap/rgSchInternalScheduleRecordGroup',
                codeTitle: 'Reason Code', cellEditable: this.canOffIdDisplayEdit, maxlength: 40
            },
            {
                fieldName: this.translateService.translate('oidbsiap.appointmentlocation') + '*', field: 'toInternalLocationCode',
                editable: true, width: 250, datatype: 'lov', codeTitle: 'Location Code',
                cellEditable: this.canOffIdDisplayEdit, maxlength: 40
            },
            {
                fieldName: this.translateService.translate('common.comment'), field: 'commentText', editable: true, width: 150,
                cellEditable: this.canOffIdDisplayEdit, maxlength: 240
            },
            {
                fieldName: this.translateService.translate('oidbsiap.cancelflag'), field: 'cancelFlag', editable: false, width: 150,
                datatype: 'checkbox',cellEditable: this.canActiveEdit
            },
            {
                fieldName: this.translateService.translate('oidbsiap.cancelreason'), field: 'eventOutcome', editable: false, width: 150,
                datatype: 'lov', domain: 'APT_CAN_REA',cellEditable: this.cancelReasonEdit
            },
        ];
    }
    cancelAllChkboxChange(event) {
        if (event.checked) {
            this.cancelCheckbox = true;
            this.disableOutcome=false;
            this.applyToAllDisable = false;
            this.reqCancelReason=true;
        } else {
            this.disableOutcome=true;
            this.cancelCheckbox = false
            this.applyToAllDisable = true;
            this.outcomechange=undefined;
            this.cancelReason=undefined;
            this.reqCancelReason=false;
        }
    }
    cancelAllLovChange(event) {
        if (event.code) {
            // this.cancelReason = event.code;
            this.outcomechange = event.code;
        }
    }

    canActiveEdit = (data: any, index: number, field: string): boolean => {
        if (data.eventId ){
            return true;
        }else{
            return false;
        }
    }

    cancelReasonEdit = (data: any, index: number, field: string): boolean => {
        if (data.eventId && data.cancelFlag){
            return true;
        }else{
            return false;
        }
    }
    get disableClear() {
        if (this.offschModel.agyLocId || this.offschModel.eventDate || this.offschModel.startTime
            || this.offschModel.eventSubType || this.offschModel.toInternalLocationCode || this.offschModel.commentText) {
            return false;
        } else {
            return true;
        }
    }
    conflictEvent() {
        const schConflictServiceObj = this.oidbsiapFactory.
            offSchCheckScheduleConflict(this.offschModelTemp);
        schConflictServiceObj.subscribe(schConflictList => {
            if (schConflictList === 0) {
            } else {
                this.dialogService.openLinkDialog('/oiuscinq', this.offschModelTemp).subscribe(result => {
                    if (result !== null) {
                        this.conflictFlag = true;
                    } else {
                        this.conflictFlag = false;
                    }
                });
            }
        });
    }
    onClear = () => {
        this.conflictFlag = true;
        this.cancelReason = undefined;
        this.offschExecuteQuery();
        return true;
    }
    offschClearQuery() {
        this.checkDate = false;
        this.checkTime = false;
        this.checkReason = false;
        this.checkLocation = false;
        this.checkOfId = false;
        this.updateFlag = false;
        this.saveFlag = false;
        const agylocIdValue = this.offschModel.agyLocId === undefined ? '' : undefined;
        const toLocval = this.offschModel.toInternalLocationCode === undefined ? '' : undefined;
        const eventSubTypeValue = this.offschModel.eventSubType === undefined ? '' : undefined;
        this.offschModel = new VOffenderAllSchedules2;
        this.offschModel.agyLocId = agylocIdValue;
        this.offschModel.toInternalLocationCode = toLocval;
        this.offschModel.eventSubType = eventSubTypeValue;
        this.offschModel.commentText = undefined;
        this.offschData = [];
        this.conflictFlag = true;
        this.selectedRow = 0;
        this.offschModelTemp = new VOffenderAllSchedules2();
        this.conflictFlag = true;
        this.readOnlyFlag = false;
        this.disableRetrive = false;
        this.offschtabInsert = false;
        this.cancelAll = null;
        this.outcomechange = null;
        this.disableCancelFlag = true;
        this.disableOutcome = true;
        this.applyToAllDisable = true;
    }
    canEventDateEdit = (data: any, index: number, field: string): boolean => {
        if (data.eventId) {
            return true;
        } else {
            return false;
        }
    }
    /*
     * This function executed to disable Scheduled Offenders Grid ID# column
     */
    canOffIdDisplayEdit = (data: any, index: number, field: string): boolean => {
        const indexVal = this.offschData.indexOf(data);
        if (!this.conflictFlag && field === 'offenderIdDisplay' && this.conflictIndex === index) {
            return true;
        }
        if (!this.conflictFlag && this.conflictIndex !== index) {
            this.conflictEvent();
            return false;
        }
        if ((field !== 'offenderIdDisplay') && data.offenderIdDisplay) {
            this.namesrchModel.offenderIdDisplay = data.offenderIdDisplay;
            for (let i = Number(String(this.namesrchModel.offenderIdDisplay).length); i < 10; i++) {
                this.namesrchModel.offenderIdDisplay = '0' + this.namesrchModel.offenderIdDisplay;
            }
            if (!this.idCheckFag) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.offIdvalidation') + this.namesrchModel.offenderIdDisplay
                    + this.translateService.translate('oidbsiap.offiddisplayvalidation');
                this.show();
                if (field !== 'offenderIdDisplay') {
                    return false;
                }
            }
        }
        if (index === this.rowIndex) {
            return true;
        }
        if (this.checkDate) {
            if (field !== 'eventDate') {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.pleaseenterdate');
                this.show();
                return false;
            } else if (field === 'eventDate' && data.eventDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.pleaseenterdate');
                this.show();
                return false;
            } else {
                return true;
            }
        }
        if (this.checkTime) {
            if (field !== 'startTime') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.timemustbeentered');
                this.show();
                return false;
            } else if (field === 'startTime' && data.startTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.timemustbeentered');
                this.show();
                return false;
            } else {
                return true;
            }
        }
        if (this.checkReason) {
            if (field !== 'eventSubType') {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.appointmentreasonmustbeentered');
                this.show();
                return false;
            } else if (field === 'eventSubType' && data.eventSubType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.appointmentreasonmustbeentered');
                this.show();
                return false;
            } else {
                return true;
            }
        }
        if (this.checkLocation) {
            if (field !== 'toInternalLocationCode') {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.appointmentlocationmustbeentered');
                this.show();
                return false;
            } else if (field === 'toInternalLocationCode' && data.toInternalLocationCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.appointmentlocationmustbeentered');
                this.show();
                return false;
            } else {
                return true;
            }
        }
        if ((!data.eventId) && (this.offschModel.startTime || this.offschModel.commentText)) {
            this.grid.setColumnData('startTime', indexVal, this.offschModel.startTime);
        }
        if (data.eventId) {
            if (field === 'offenderIdDisplay') {
                return false;
            }
            if ((data.eventDate) && ((DateFormat.compareDate(DateFormat.getDate(),
                DateFormat.getDate(data.eventDate)) === 1))) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.datecannotbepat');
                this.show();
                if (field === 'eventDate') {
                    return true;
                }
                return false;
            }
            return true;
        }
        if (field === 'eventDate') {
            if ((data.eventDate) && ((DateFormat.compareDate(DateFormat.getDate(),
                DateFormat.getDate(data.eventDate)) === 1))) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.datecannotbepat');
                this.show();
                if (field === 'eventDate') {
                    return true;
                }
                return false;
            }
        }
        return true;
    }
    /**
     * To display the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];

    }
    allowNumbers(event) {
    }
    onRowClickoffsch(event) {
        if (event) {
            // if (!event.eventId) {
            //     if (this.offschModel.eventSubType) {
            //     //    this.grid.setColumnData('eventSubType', this.offschData.indexOf(event), this.offschModel.eventSubType);
            //     }
            //     if (this.offschModel.toInternalLocationCode) {
            //        this.grid.setColumnData('toInternalLocationCode', this.offschData.indexOf(event),
            //            this.offschModel.toInternalLocationCode);
            //     }

            // }

        }
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    offschExecuteQuery(event?) {
        this.offschModelTemp = new VOffenderAllSchedules2();
        this.conflictFlag = true;
        if (!this.offschModel.agyLocId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidbsiap.pleaseenterfacility');
            this.show();
            return;
        }
        if (event) {

            if (event.lastValue === '0_/__/____') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.leapyearnotallowed');
                this.show();
                return;
            }
            if (String(event.lastValue).indexOf('_') >= 0 && event.value === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show();
                return;
            }
        }
        if (!this.offschModel.eventDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidbsiap.pleaseenterdate');
            this.show();
            return;
        }
        // if (this.offschModel.eventDate) {
        //     if ((DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(this.offschModel.eventDate))) === 1) {
        //         this.type = 'warn';
        //         this.message = this.translateService.translate('oidbsiap.cannotquerypastschedules');
        //         this.show();
        //         return;
        //     }
        // }
        if (this.offschModel.startTime && this.offschModel.eventDate) {
            this.offschModel.startTime = DateFormat.getDate(this.offschModel.startTime);
            const strTimeValue = this.offschModel.startTime.getHours() + ':' + this.offschModel.startTime.getMinutes();
            this.offschModel.startTime = TimeFormat.parse(strTimeValue, this.offschModel.eventDate);
        }
        this.offschModel.caseloadId = this.sessionManager.currentCaseLoad;
        const offschResult = this.oidbsiapFactory.
            offSchExecuteQuery(this.offschModel);
        offschResult.subscribe(offschResultList => {
            if (this.saveFlag) {
                this.updateFlag = true;
            } else {
                this.updateFlag = false;
            }
            this.saveFlag = false;
            if (offschResultList.length === 0) {
                this.offschData = [];
                this.disableRetrive = true;
                this.readOnlyFlag = true;
                this.offschtabInsert = true;
                this.selectedRow = 0;
                this.cancelAll = false;
                this.outcomechange=null;
                this.disableCancelFlag=true;
                this.disableOutcome=true;
                this.applyToAllDisable=true;
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                return;
            } else {
                this.disableRetrive = true
                this.readOnlyFlag = true;
                this.offschtabInsert = true;
                this.disableCancelFlag=false;
                this.disableOutcome=false;
                this.applyToAllDisable=true;
                this.disableOutcome=true;
                this.selectedRow = 0;
                this.offschData = offschResultList;
                for (let i = 0; i < this.offschData.length; i++) {
                    this.locVal = this.offschData[i].toInternalLocationId;
                    this.offschData[i].toInternalLocationCode = this.intLocIdMap.get(this.locVal);
                }
                offschResultList.forEach(ele => {
                    ele.cancelFlag = ele.eventStatus === 'CANC' ? true : false;
                });
                this.cancelAll=null;
                this.outcomechange=null;
                
                this.offschModelTemp = offschResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidbsiapSaveoffschForm(event) {

        if (this.cancelAll && !this.outcomechange) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidbsiap.cancelreasonmand');
            this.show();
            return;
        }
        this.saveFlag = false;
        if (!this.conflictFlag) {
            this.conflictEvent();
            return;
        }
        event.updated.forEach(data => {
            this.name = data.lastName + " " + data.firstName;
            if (data.hasOwnProperty('isAdded')) {
                event.added.push(data);
                event.updated.splice(event.updated.indexOf(data), 1);
            }
        });
        this.offschInsertList = [];
        this.offschUpdateList = [];
        this.offschDeleteList = [];
        this.offIndSchCommitBeanModel.insertList = [];
        this.offIndSchCommitBeanModel.updateList = [];
        this.offIndSchCommitBeanModel.deleteList = [];
        for (let i = 0; i < event.updated.length; i++) {
            if (!event.updated[i].offenderIdDisplay) {
                this.updateFlag = false;
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.pleaseenteroffender');
                this.show();
                return;
            }
            if (!event.updated[i].eventDate) {
                this.updateFlag = false;
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentered');
                this.show();
                return;
            }
            // if ((event.updated[i].eventDate) && ((DateFormat.compareDate(DateFormat.getDate(),
            //     DateFormat.getDate(event.updated[i].eventDate)) === 1))) {
            //     this.updateFlag = false;
            //     this.type = 'warn';
            //     this.message = this.translateService.translate('oidbsiap.datecannotbepat');
            //     this.show();
            //     return;
            // }
            if (!event.updated[i].startTime) {
                this.updateFlag = false;
                this.type = 'warn';
                this.message = this.translateService.translate('common.timemustbeentered');
                this.show();
                return;
            }
            if (!event.updated[i].eventSubType) {
                this.updateFlag = false;
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.appointmentreasonmustbeentered');
                this.show();
                return;
            }
            if (!event.updated[i].toInternalLocationCode) {
                this.updateFlag = false;
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.appointmentlocationmustbeentered');
                this.show();
                return;
            }
            event.updated[i].toInternalLocationId = Number(this.saveIntLocIdMap.get(event.updated[i].toInternalLocationCode));
            if (!event.updated[i].toInternalLocationId) {
                this.updateFlag = false;
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.appointmentlocationmustbeentered');
                this.show();
                return;
            }
            if (this.updateFlag && event.updated[i].commentText === this.offschModel.commentText) {
                this.offschModelTemp.offenderBookId = event.updated[i].offenderBookId;
                this.offschModelTemp.eventDate = event.updated[i].eventDate;
                this.dialogService.openLinkDialog('/oiuscinq', this.offschModelTemp).subscribe(result => {
                    this.updateFlag = false;
                });
                return;
            }
            if (event.updated[i].cancelFlag) {
                if (!event.updated[i].eventOutcome) {
                    this.type = 'warn';
                    this.message=this.translateService.translate('oidbsiap.cancelreasonmustbeentered');
                    this.show();
                    return ;
                }
            }
            
            event.updated[i].cancelFlag=(event.updated[i].cancelFlag) ? 'Y' : 'N';
            this.offschUpdateList.push(event.updated[i]);

        }
        this.updateFlag = false;
        for (let i = 0; i < event.added.length; i++) {
            if (!event.added[i].offenderIdDisplay) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.pleaseenteroffender');
                this.show();
                return;
            }
            if (!event.added[i].eventDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentered');
                this.show();
                return;
            }
            if ((event.added[i].eventDate) && ((DateFormat.compareDate(DateFormat.getDate(),
                DateFormat.getDate(event.added[i].eventDate)) === 1))) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.datecannotbepat');
                this.show();
                return;
            }
            if (!event.added[i].startTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.timemustbeentered');
                this.show();
                return;
            }
            if (!event.added[i].eventSubType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.appointmentreasonmustbeentered');
                this.show();
                return;
            }
            if (!event.added[i].toInternalLocationCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.appointmentlocationmustbeentered');
                this.show();
                return;
            }
            event.added[i].toInternalLocationId = Number(this.saveIntLocIdMap.get(event.added[i].toInternalLocationCode));
            if (!event.added[i].toInternalLocationId) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.appointmentlocationmustbeentered');
                this.show();
                return;
            }
            this.offschInsertList.push(event.added[i]);
            this.name = event.added[i].lastName + " " + event.added[i].firstName;
        }
        if (this.offschInsertList.length > 0 || this.offschUpdateList.length > 0) {
            for (let i = 0; i < this.offschInsertList.length; i++) {
                this.offschInsertList[i].eventClass = 'INT_MOV';
                this.offschInsertList[i].eventType = 'APP';
                this.offschInsertList[i].eventStatus = 'SCH';
                this.offschInsertList[i].agyLocId = this.offschModel.agyLocId;
                this.offenderIndSchedules.offenderBookId = this.offschInsertList[i].offenderBookId;
                this.offenderIndSchedules.toInternalLocationId = this.offschInsertList[i].toInternalLocationId;
                if (DateFormat.compareDate(this.offschInsertList[i].eventDate, DateFormat.getDate()) === 0) {
                    if (DateFormat.compareDate(this.offschInsertList[i].eventDate, DateFormat.getDate()) === 0) {
                        const schTime = DateFormat.getDate(DateFormat.getDate(this.offschInsertList[i].startTime).setSeconds(0, 0));
                        const currentTime = DateFormat.getDate(DateFormat.getDate(DateFormat.getDate()).setSeconds(0, 0));
                        if (DateFormat.compareTime(schTime, currentTime) < 0) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('oidsiapp.eventdatetime');
                            this.show();
                            return false;
                        }
                    }
                    this.offschInsertList[i].startTime = DateFormat.getDate(this.offschInsertList[i].startTime);
                    const startTimeValue = this.offschInsertList[i].startTime.getHours() + ':' +
                        this.offschInsertList[i].startTime.getMinutes();
                    this.offschInsertList[i].startTime = TimeFormat.parse(startTimeValue, this.offschInsertList[i].eventDate);
                }
            }
            for (let i = 0; i < this.offschUpdateList.length; i++) {
                this.offenderIndSchedules.offenderBookId = this.offschUpdateList[i].offenderBookId;
                this.offenderIndSchedules.toInternalLocationId = this.offschUpdateList[i].toInternalLocationId;
                if (DateFormat.compareDate(DateFormat.getDate(this.offschUpdateList[i].eventDate), DateFormat.getDate()) === 0) {
                    const schTime = DateFormat.getDate(DateFormat.getDate(this.offschUpdateList[i].startTime).setSeconds(0, 0));
                    const currentTime = DateFormat.getDate(DateFormat.getDate(DateFormat.getDate()).setSeconds(0, 0));
                    if (DateFormat.compareTime(schTime, currentTime) < 0) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidsiapp.eventdatetime');
                        this.show();
                        return false;
                    }
                }
                this.offschUpdateList[i].startTime = DateFormat.getDate(this.offschUpdateList[i].startTime);
                const strTimeValue = this.offschUpdateList[i].startTime.getHours() + ':' + this.offschUpdateList[i].startTime.getMinutes();
                this.offschUpdateList[i].startTime = TimeFormat.parse(strTimeValue, this.offschUpdateList[i].eventDate);
                this.offIndSchCommitBeanModel.updateList = this.offschUpdateList;
                
            }
            this.offIndSchCommitBeanModel.insertList = this.offschInsertList;
            

        }
        if (this.offschDeleteList.length > 0) {
            for (let i = 0; i < this.offschDeleteList.length; i++) {
            }
        }
       
        this.vOffPrgOblDataTemp = this.offschInsertList;

        this.oidbsiapFactory.checkNonAssociationOffenders(this.offIndSchCommitBeanModel).subscribe(offData => {
            this.internalNonAssocationPopupByIndAndGang(this.vOffPrgOblDataTemp, offData, 0, 0);
        });

    }
    checkNonAssociation() {
        this.oidbsiapFactory.checkNonAssociationOffendersexternal(this.offIndSchCommitBeanModel).subscribe(offData => {
            if (offData) {
                offData.forEach(indData => {
                    this.count=0;
                    if(indData!==AppConstants.EMPTYDATA){
                    var msgOne = this.translateService.translate('oidbsiap.nonassociationconflictmsg');
                    var msgTwo = this.translateService.translate('oidbsiap.doyouwanttocontinue');
                    var msgThree = this.translateService.translate('oidbsiap.indinonassocconflict');
                    var msgfour = this.translateService.translate('oidbsiap.gangnonassocconflict');
                    indData = indData.replace('oidbsiap.nonassociationconflictmsg', msgOne);
                    indData = indData.replace('oidbsiap.doyouwanttocontinue', msgTwo);
                    indData = indData.replace('oidbsiap.indinonassocconflict', msgThree);
                    indData = indData.replace('oidbsiap.indinonassocconflict:', "");
                    indData = indData.replace('oidbsiap.gangnonassocconflict', msgfour);
                    var labelMsg = {
                        label: this.translateService.translate(indData), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
                    };
                    this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                        if (result) {
                          this.count=this.count+1;
                        } else {
                            this.grid.btnSavebtnDisable=false;
                        }
                        if(offData.length==this.count){
                            this.offSchCommitQuery();
                        }
                    });
                    }
                    else {
                        this.offSchCommitQuery();
                    }
                });
               
            } 
        });
    }

    offSchCommitQuery() {
        const offschSaveData = this.oidbsiapFactory.offSchCommit(this.offIndSchCommitBeanModel);
        offschSaveData.subscribe(data => {
            if (data === 2) {
                for (let i = 0; i < this.offschInsertList.length; i++) {
                    for (let j = i + 1; j < this.offschInsertList.length; j++) {
                        if (this.offschInsertList[i].offenderBookId === this.offschInsertList[j].offenderBookId) {
                            this.offschModelTemp.confirmFlag = 'true';
                            this.offschModelTemp.eventDate = this.offIndSchCommitBeanModel.insertList[i].eventDate;
                            this.offschModelTemp.startTime = this.offIndSchCommitBeanModel.insertList[i].startTime;
                            this.offschModelTemp.eventType = this.offIndSchCommitBeanModel.insertList[i].eventType;
                            this.offschModelTemp.eventSubType = this.offIndSchCommitBeanModel.insertList[i].eventSubType;
                        }
                    }
                }
                this.dialogService.openLinkDialog('/oiuscinq', this.offschModelTemp).subscribe(result => {
                    if (result !== null) {
                        for (let i = 0; i < this.offIndSchCommitBeanModel.insertList.length; i++) {
                            this.offIndSchCommitBeanModel.insertList[i].conflictFlag = true;
                        }
                        this.offSchCommitQuery();
                    } else {
                        for (let i = 0; i < this.offIndSchCommitBeanModel.insertList.length; i++) {
                            this.offIndSchCommitBeanModel.insertList[i].conflictFlag = false;
                        }
                    }
                });
            } else if (data === 1) {
                this.saveFlag = true;
                this.updateFlag = true;
                this.offschExecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();

            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    /*
     *  This event is used to do the validations when click Add button in Scheduled Offenders Block.
     */
    onGridInsert = () => {
        if (!this.conflictFlag) {
            this.conflictEvent();
            return;
        }
        this.disableCancelFlag=true;
        this.disableOutcome=true;
        this.outcomechange=null;
        this.cancelAll=null;
        this.outcomechange=null;
        this.applyToAllDisable=true;
        if (!this.offschModel.agyLocId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidbsiap.facilitymustbeentered');
            this.show();
            return;
        }
        if (!this.offschModel.eventDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidbsiap.pleaseenterdate');
            this.show();
            return;
        }
        if (this.offschModel.eventDate) {
            if ((DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(this.offschModel.eventDate))) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.cannotquerypastschedules');
                this.show();
                return;
            }
        }
        if (this.offschData.length === 0) {
            return {
                button: '..', eventDate: this.offschModel.eventDate, startTime: this.offschModel.startTime,
                eventSubType: this.offschModel.eventSubType, commentText: undefined,
                offenderBookId: this.offschModelTemp.offenderBookId, toInternalLocationCode: this.offschModel.toInternalLocationCode,
                lastName: '', firstName: '', offenderIdDisplay: ''
            };
        }
        for (let i = 0; i < this.offschData.length; i++) {
            if (!this.offschData[i].eventDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentered');
                this.show();
                return;
            }
            if (!this.offschData[i].startTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.timemustbeentered');
                this.show();
                return;
            }
            if (!this.offschData[i].eventSubType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.appointmentreasonmustbeentered');
                this.show();
                return;
            }
            if (!this.offschData[i].toInternalLocationCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.appointmentlocationmustbeentered');
                this.show();
                return;
            }
            if (!this.offschData[i].offenderIdDisplay) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidbsiap.pleaseenteroffender');
                this.show();
                return;
            }
        }
        return {
            button: '..', eventDate: this.offschModel.eventDate, startTime: this.offschModel.startTime,
            eventSubType: this.offschModel.eventSubType, commentText: undefined,
            offenderBookId: this.offschModelTemp.offenderBookId, toInternalLocationCode: this.offschModel.toInternalLocationCode,
            lastName: '', firstName: '', offenderIdDisplay: ''
        };
    }
    idChangeEvent = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        this.checkDate = false;
        this.checkTime = false;
        this.checkReason = false;
        this.checkLocation = false;
        this.checkOfId = false;

        if (event.data) {
            if ((!event.data.eventId) && (this.offschModel.startTime || this.offschModel.commentText)) {
            }
            if (event.data.cancelFlag) {
                this.grid.requiredOn('eventOutcome');
            } else {
                this.grid.requiredOff('eventOutcome')
                this.grid.setColumnData('eventOutcome', index, undefined);
            }
            if (!event.data.eventId) {
                if (this.offschModel.eventSubType) {
                    this.grid.setColumnData('eventSubType', index, this.offschModel.eventSubType);
                }
                if (this.offschModel.toInternalLocationCode) {
                   this.grid.setColumnData('toInternalLocationCode', index, this.offschModel.toInternalLocationCode);
                }

            }
            if(event.data.eventDate && event.data.startTime){
                let dateFormat = DateFormat.getDate(event.data.startTime);
                dateFormat.setDate(DateFormat.getDate(event.data.eventDate).getDate());
                dateFormat.setMonth(DateFormat.getDate(event.data.eventDate).getMonth());
                dateFormat.setFullYear(DateFormat.getDate(event.data.eventDate).getFullYear());
                event.data.startTime = dateFormat;

            }
            if ((event.field !== 'offenderIdDisplay') && event.data.offenderIdDisplay) {
                this.namesrchModel.offenderIdDisplay = event.data.offenderIdDisplay;
                /* for (let i = Number(String(this.namesrchModel.offenderIdDisplay).length); i < 10; i++) {
                    this.namesrchModel.offenderIdDisplay = '0' + this.namesrchModel.offenderIdDisplay;
                } */
                if (!this.idCheckFag) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidbsiap.offIdvalidation') + this.namesrchModel.offenderIdDisplay
                        + this.translateService.translate('oidbsiap.offiddisplayvalidation');
                    this.show();
                }
            }
            if (event.field === 'offenderIdDisplay' && event.data.offenderIdDisplay && Number(event.oldValue) !== Number(event.newValue)) {

                this.namesrchModel.offenderIdDisplay = event.data.offenderIdDisplay;
                /* for (let i = Number(String(this.namesrchModel.offenderIdDisplay).length); i < 10; i++) {
                    this.namesrchModel.offenderIdDisplay = '0' + this.namesrchModel.offenderIdDisplay;
                } */
                if (event.data.offenderIdDisplay === '0000000000') {
                    this.grid.setColumnData('offenderIdDisplay', index, undefined);
                    this.grid.setColumnData('lastName', index, undefined);
                    this.grid.setColumnData('firstName', index, undefined);
                    this.grid.setColumnData('agyLocId', index, undefined);
                    event.data.offenderBookId = undefined;
                    rowdata.validated = true;
                    return rowdata;
                }
                this.namesrchModel.caseloadId = this.sessionManager.currentCaseLoad;
                const namesrchResult = this.oiinamesFactory.
                    namesrchExecuteQuery(this.namesrchModel);
                namesrchResult.subscribe(data => {
                    if (data.length === 0) {
                        this.idCheckFag = false;
                        this.namesrchData = [];
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidbsiap.offIdvalidation') + this.namesrchModel.offenderIdDisplay
                            + this.translateService.translate('oidbsiap.offiddisplayvalidation');
                        this.show();
                        this.grid.setColumnData('offenderIdDisplay', index, this.namesrchModel.offenderIdDisplay);
                        this.grid.setColumnData('lastName', index, undefined);
                        this.grid.setColumnData('firstName', index, undefined);
                        this.grid.setColumnData('agyLocId', index, undefined);
                        event.data.offenderBookId = undefined;
                    } else {
                        this.idCheckFag = true;
                        this.offschModelTemp = new VOffenderAllSchedules2();
                        this.offschModelTemp.offenderBookId = data[0].offenderBookId;
                        this.offschModelTemp.eventDate = this.offschModel.eventDate;
                        const schConflictServiceObj = this.oidbsiapFactory.
                            offSchCheckScheduleConflict(this.offschModelTemp);
                        schConflictServiceObj.subscribe(schConflictList => {
                            if (schConflictList === 0) {
                                this.grid.setColumnData('offenderIdDisplay', index, data[0].offenderIdDisplay);
                                this.grid.setColumnData('lastName', index, data[0].lastName);
                                this.grid.setColumnData('firstName', index, data[0].firstName);
                                this.grid.setColumnData('agyLocId', index, data[0].livingUnitDescription);
                                this.grid.setColumnData('commentText', index, this.offschModel.commentText);
                                event.data.offenderBookId = data[0].offenderBookId;
                                this.conflictFlag = true;
                            } else {
                                this.dialogService.openLinkDialog('/oiuscinq', this.offschModelTemp).subscribe(result => {
                                    if (result !== null) {
                                        this.grid.setColumnData('offenderIdDisplay', index, data[0].offenderIdDisplay);
                                        this.grid.setColumnData('lastName', index, data[0].lastName);
                                        this.grid.setColumnData('firstName', index, data[0].firstName);
                                        this.grid.setColumnData('agyLocId', index, data[0].livingUnitDescription);
                                        this.grid.setColumnData('commentText', index, this.offschModel.commentText);
                                        event.data.offenderBookId = data[0].offenderBookId;
                                        this.conflictFlag = true;
                                    } else {
                                        this.grid.setColumnData('offenderIdDisplay', index, data[0].offenderIdDisplay);
                                        this.grid.setColumnData('lastName', index, data[0].lastName);
                                        this.grid.setColumnData('firstName', index, data[0].firstName);
                                        this.grid.setColumnData('agyLocId', index, data[0].livingUnitDescription);
                                        event.data.offenderBookId = data[0].offenderBookId;
                                        this.conflictIndex = this.offschData.indexOf(event.data);
                                        this.conflictFlag = false;
                                    }
                                });
                            }
                        });
                        this.namesrchData = data;
                    }
                });
                rowdata.validated = true;
            }
            for (let i = 0; i < this.offschData.length; i++) {
                this.rowIndex = this.offschData.indexOf(event.data);
                if (!this.offschData[i].eventDate) {
                    this.checkDate = true;
                    if (this.rowIndex === i) {
                        rowdata.validated = true;
                        return rowdata;
                    }
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.datemustbeentered');
                    this.show();
                    rowdata.validated = true;
                    return rowdata;
                }
                if (!this.offschData[i].startTime) {
                    this.checkTime = true;
                    if (this.rowIndex === i) {
                        rowdata.validated = true;
                        return rowdata;
                    }
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.timemustbeentered');
                    this.show();
                    rowdata.validated = true;
                    return rowdata;
                }
                if (!this.offschData[i].eventSubType) {
                    this.checkReason = true;
                    if (this.rowIndex === i) {
                        rowdata.validated = true;
                        return rowdata;
                    }
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidbsiap.appointmentreasonmustbeentered');
                    this.show();
                    rowdata.validated = true;
                    return rowdata;
                }
                if (!this.offschData[i].toInternalLocationCode) {
                    this.checkLocation = true;
                    if (this.rowIndex === i) {
                        rowdata.validated = true;
                        return rowdata;
                    }
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidbsiap.appointmentlocationmustbeentered');
                    this.show();
                    rowdata.validated = true;
                    return rowdata;
                }
                if (!this.offschData[i].offenderIdDisplay) {
                    this.checkOfId = true;
                    if (this.rowIndex === i) {
                        rowdata.validated = true;
                        return rowdata;
                    }
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidbsiap.pleaseenteroffender');
                    this.show();
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            rowdata.validated = true;
            return rowdata;
        }

    }
    nbtAgencyLocDescWhenValidateItemTrigger() {
        if (this.offschModel.agyLocId) {
            this.offSchColumnDef[8].link = '/oidbsiap/rgInternalMoveLocationsRecordGroup?agyLocId=' + this.offschModel.agyLocId;
            this.grid.prepareAgColumnDef();
            this.appLocLink = '/oidbsiap/rgInternalMoveLocationsRecordGroup?agyLocId=' + this.offschModel.agyLocId;
            const rginternalmovelocationsServiceObj = this.oidbsiapFactory.
                rgInternalMoveLocationsRecordGroup(this.offschModel.agyLocId);
            rginternalmovelocationsServiceObj.subscribe(rginternalmovelocationsList => {
                if (rginternalmovelocationsList.length === 0) {
                    this.rginternalmovelocationsRg = [];
                } else {
                    for (let i = 0; i < rginternalmovelocationsList.length; i++) {
                        this.rginternalmovelocationsRg.push({
                            'code': rginternalmovelocationsList[i].code, 'description': rginternalmovelocationsList[i].description,
                            'id': rginternalmovelocationsList[i].internalLocationId
                        });
                        this.intLocIdMap.set(rginternalmovelocationsList[i].internalLocationId, rginternalmovelocationsList[i].code);
                        this.saveIntLocIdMap.set(rginternalmovelocationsList[i].code, rginternalmovelocationsList[i].internalLocationId);
                    }
                }
            });
        } else {
            this.appLocLink = '';
        }
    }
    onKeyPressEvent() {
        if (this.checkDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.datemustbeentered');
            this.show();
            return;
        }
        if (this.checkTime) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.timemustbeentered');
            this.show();
            return;
        }
        if (this.checkReason) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidbsiap.appointmentreasonmustbeentered');
            this.show();
            return;
        }
        if (this.checkLocation) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidbsiap.appointmentlocationmustbeentered');
            this.show();
            return;
        }
        if (this.checkOfId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidbsiap.pleaseenteroffender');
            this.show();
            return;
        }
    }

    butAgencyLocDescWhenButtonPressedTrigger(event) {
        if (event) {
            this.offschModel.toInternalLocationCode = event.code;
        }
    }

    internalNonAssocationPopupByIndAndGang(bulkAssignList, nonAssList, x, y) {
        let i = x;
        let j = y;
        var msg = "";
        var msgGang = "";

        if (i == nonAssList.length ) {
            this.offIndSchCommitBeanModel.insertList = this.vOffPrgOblDataTemp;
            this.checkNonAssociation();
        }

        if (i == j && i < nonAssList.length) {
            var name;
            var id;
            var one = this.offIndSchCommitBeanModel.insertList[i].lastName + " " + this.offIndSchCommitBeanModel.insertList[i].firstName + " " + " " + this.offIndSchCommitBeanModel.insertList[i].offenderIdDisplay + this.translateService.translate('oidbsiap.nonassociationconflictmsg');
            if (bulkAssignList.length > 1 && nonAssList[i].offenderNonAssociationsByInd && nonAssList[i].offenderNonAssociationsByInd.length > 0 &&
                nonAssList[i].offenderNonAssociationsByGang && nonAssList[i].offenderNonAssociationsByGang.length > 0) {
                // individual details
                nonAssList[i].offenderNonAssociationsByInd.forEach(element => {
                    bulkAssignList.forEach(obj => {
                        if (obj.offenderBookId == element.offenderBookId) {
                            if (!msg) {
                                name = nonAssList[i].offenderName;
                                id = nonAssList[i].offenderIdDisplay;
                                msg = "INDIVIDUAL NON-ASSOCIATION CONFLICTS " + '\n';
                            }
                           let startTime =this.filteringDateTime(element.offenderBookId);
                            msg = msg + element.lastName + " " + element.firstName + " , " + element.offenderIdDisplay + " \n" +DateFormat.formatDateTimefromUTC(startTime)  +"\n";
                        }
                    });
                });
                // gang details 
                nonAssList[i].offenderNonAssociationsByGang.forEach(element => {
                    bulkAssignList.forEach(obj => {
                        if (obj.offenderBookId == element.offenderBookId) {
                            if (!msgGang) {
                                msgGang = "GANG NON-ASSOCIATION CONFLICTS" + '\n';
                            }
                            let startTime =this.filteringDateTime(element.offenderBookId);
                            msgGang = msgGang + element.lastName + " " + element.firstName + " , " + element.offenderIdDisplay + " \n" +DateFormat.formatDateTimefromUTC(startTime)  +"\n";
                        }
                    });
                });
                // both ind and Gang
                if (msg != null && msgGang != null) {
                    msg = one + '\n\n' + msg + "\n" + msgGang;
                    msg = msg.replace('offenderName', name);
                    msg = msg.replace('offenderId', 'id ' + id);
                    msg = msg + '  \n\n ' + this.translateService.translate('ociscata.doyouwanttoproceed');
                    const data = {
                        label: this.translateService.translate(msg), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                    j++;
                    this.dialogService.openLinkDialog('/OCUNAWRN', data, 30).subscribe(result => {
                        if (result) {
                            i++;
                            this.count = this.count + 1;
                            if (i < nonAssList.length) {
                                this.internalNonAssocationPopupByIndAndGang(bulkAssignList, nonAssList, i, j);
                            } else {
                                this.internalNonAssocationPopupByIndAndGang(bulkAssignList, nonAssList, i, j);
                            }
                        } else {
                            // this.vOffPrgOblDataTemp = bulkAssignList.filter((element) => (element.offenderBookId != nonAssList[i].offenderBookId));

                            // i++;
                            // this.internalNonAssocationPopupByIndAndGang(this.vOffPrgOblDataTemp, nonAssList, i, j);
                          this.grid.btnSavebtnDisable=false;
                        }
                    });
                } else {
                    j++;
                    i++;
                    this.internalNonAssocationPopupByIndAndGang(bulkAssignList, nonAssList, i, j);
                }


            }
            else if (bulkAssignList.length > 1 && nonAssList[i].offenderNonAssociationsByInd && nonAssList[i].offenderNonAssociationsByInd.length > 0) {
                // individual details
                nonAssList[i].offenderNonAssociationsByInd.forEach(element => {
                    bulkAssignList.forEach(obj => {
                        if (obj.offenderBookId == element.offenderBookId) {
                            if (!msg) {
                                name = nonAssList[i].offenderName;
                                id = nonAssList[i].offenderIdDisplay;
                                msg = "INDIVIDUAL NON-ASSOCIATION CONFLICTS " + '\n';
                            }
                            let startTime =this.filteringDateTime(element.offenderBookId);
                            msg = msg + element.lastName + " " + element.firstName + " , " + element.offenderIdDisplay + " \n" + DateFormat.formatDateTimefromUTC(startTime)   +"\n";
                        }
                    });
                });
                // for ind only 
                if (msg != null) {
                    msg = one + '\n\n' + msg + '\n\n' + this.translateService.translate('ociscata.doyouwanttoproceed');
                    msg = msg.replace('offenderName', name);
                    msg = msg.replace('offenderId', 'id ' + id);
                    const data = {
                        label: this.translateService.translate(msg), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                    j++;
                    this.dialogService.openLinkDialog('/OCUNAWRN', data, 30).subscribe(result => {
                        if (result) {
                            i++;
                            if (i < nonAssList.length) {
                                this.internalNonAssocationPopupByIndAndGang(bulkAssignList, nonAssList, i, j);
                            } else {
                                this.internalNonAssocationPopupByIndAndGang(bulkAssignList, nonAssList, i, j);
                            }
                        } else {
                            // this.vOffPrgOblDataTemp = bulkAssignList.filter((element) => (element.offenderBookId != nonAssList[i].offenderBookId));
                            // i++;
                            // this.internalNonAssocationPopupByIndAndGang(this.vOffPrgOblDataTemp, nonAssList, i, j);
                            this.grid.btnSavebtnDisable=false;
                        }
                    });
                } else {
                    j++;
                    i++;
                    this.internalNonAssocationPopupByIndAndGang(bulkAssignList, nonAssList, i, j);
                }


            }
            else if (bulkAssignList.length > 1 && nonAssList[i].offenderNonAssociationsByGang && nonAssList[i].offenderNonAssociationsByGang.length > 0) {
                // gang details 
                nonAssList[i].offenderNonAssociationsByGang.forEach(element => {
                    bulkAssignList.forEach(obj => {
                        if (obj.offenderBookId == element.offenderBookId) {
                            if (!msgGang) {
                                name = nonAssList[i].offenderName;
                                id = nonAssList[i].offenderIdDisplay;
                                msgGang = "GANG NON-ASSOCIATION CONFLICTS \n";
                            }
                            let startTime =this.filteringDateTime(element.offenderBookId);
                            msgGang = msgGang + element.lastName + " " + element.firstName + " , " + element.offenderIdDisplay + " \n" +DateFormat.formatDateTimefromUTC(startTime)  +"\n";
                        }
                    });
                });
                // for gang details 
                if (msgGang != null) {
                    msgGang = one + '\n\n' + msgGang + '  \n\n ' + this.translateService.translate('ociscata.doyouwanttoproceed');
                    msgGang = msgGang.replace('offenderName', name);
                    msgGang = msgGang.replace('offenderId', 'id ' + id);
                    const data = {
                        label: this.translateService.translate(msgGang), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                    j++;
                    this.dialogService.openLinkDialog('/OCUNAWRN', data, 30).subscribe(result => {
                        if (result) {
                            i++;
                            this.count = this.count + 1;
                            if (i < nonAssList.length) {
                                this.internalNonAssocationPopupByIndAndGang(bulkAssignList, nonAssList, i, j);
                            } else {
                                this.internalNonAssocationPopupByIndAndGang(bulkAssignList, nonAssList, i, j);
                            }
                            if (this.count === bulkAssignList.length) {
                            }
                        } else {
                            // this.vOffPrgOblDataTemp = bulkAssignList.filter((element) => (element.offenderBookId != nonAssList[i].offenderBookId));
                            // i++;
                            // this.internalNonAssocationPopupByIndAndGang(this.vOffPrgOblDataTemp, nonAssList, i, j);
                            this.grid.btnSavebtnDisable=false;
                        }
                    });
                } else {
                    j++;
                    i++;
                    this.internalNonAssocationPopupByIndAndGang(bulkAssignList, nonAssList, i, j);
                }


            }
            else {
                j++;
                i++;
                this.internalNonAssocationPopupByIndAndGang(bulkAssignList, nonAssList, i, j);
            }
        }


    }
     filteringDateTime(offenderBookId){
        var startTime;
        this.vOffPrgOblDataTemp.forEach(ele=>{
          if(ele.offenderBookId === offenderBookId){
            startTime= ele.startTime;
          }
        });
        return startTime;
    }
    onApplyToAllClick(){
        // if (!this.cancelReason)
        if (!this.outcomechange)
         {
            this.type = 'warn';
            this.message = this.translateService.translate('Cancel Reason must be entered');
            this.show();
            return;
        }
         this.cancelReason=this.outcomechange;
        this.offschData.forEach((e, i) => {
            if (this.cancelCheckbox && !e.cancelFlag )  {
                this.grid.setColumnData('cancelFlag', i, this.cancelCheckbox);
                this.grid.setColumnData('eventOutcome', i, this.cancelReason);
                }
        });
        this.disableOutcome=true;
        this.disableCancelFlag=true;
        this.applyToAllDisable=true;
    }
    outcomechangeChange() {
        this.outcomechange = this.outcomechange === undefined ? '' : undefined;
    }
}
