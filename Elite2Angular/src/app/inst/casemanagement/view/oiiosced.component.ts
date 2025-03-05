import {
    Component, OnInit, OnDestroy
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { VOffenderAllSchedules } from '@inst/schedules/beans/VOffenderAllSchedules';
import { OiioscedService } from '@inst/casemanagement/service/oiiosced.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { TimeFormat } from '@core/ui-components/time/timeFormat';
import { Location } from '@angular/common';
import { OidcnoteService } from '@inst/casemanagement/service/oidcnote.service';
import { OcdiplanService } from '../service/ocdiplan.service';

@Component({
    selector: 'app-oiiosced',
    templateUrl: './oiiosced.component.html'
})

export class OiioscedComponent implements OnInit, OnDestroy {
    disabledSchFilter: boolean;
    schReasonLink: string;
    schTypeLink: string;
    disabledSchReason: boolean;
    disabledSchType: boolean;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    type = 'error';
    message = ' Invalid.';
    msglist = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    vHeaderBlockModel: VHeaderBlock;
    voffenderallschedulesData: VOffenderAllSchedules[] = [];
    voffenderallschedulesDataTemp: VOffenderAllSchedules[] = [];
    voffenderallschedulesModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    voffenderallschedulesIndex = 0;
    voffenderallschedulesInsertList: VOffenderAllSchedules[] = [];
    voffenderallschedulesUpdatetList: VOffenderAllSchedules[] = [];
    voffenderallschedulesDeleteList: VOffenderAllSchedules[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    vOffenderAllSchedulesColumnDef: any[];
    rgschfilterRg: any[] = [];
    rgschtypeRg: any[] = [];
    rgschreaextRg: any[] = [];
    rgschreaintRg: any[] = [];
    option = [{ id: 'All', text: 'All' }, { id: 'Internal', text: 'Internal' }, { id: 'External', text: 'External' }];
    cntrlblkModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    exitLaunchBtn = false;
    saveBtnDisable: Boolean;
    readOnlyForAll: Boolean;
    schFilterLovTitles = {
        description: this.translateService.translate('oiiosced.values')
     };
    constructor(private oiioscedFactory: OiioscedService, public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService, private oidcnoteFactory: OidcnoteService,
        private location: Location, private ocdiplanFactory: OcdiplanService) {
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    }
    ngOnInit() {
        if ( this.oidcnoteFactory.exitFlag) {
            this.exitLaunchBtn = true;
            this.oidcnoteFactory.exitFlag = false;
        }
        this.disabledSchFilter = true;
        this.disabled = true;
        this.disabledSchType = true;
        this.disabledSchReason = true;
        this.saveBtnDisable = true;
        this.vOffenderAllSchedulesColumnDef = [
            {
                fieldName: this.translateService.translate('oiiosced.eventDate'), field: 'eventDate',
                datatype: 'date', editable: false, width: 180
            },
            {
                fieldName: this.translateService.translate('oiiosced.time'), field: 'startTime',
                datatype: 'time', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oiiosced.court'), field: 'toAgyLocDesc',
                editable: false, width: 350
            },
            {
                fieldName: this.translateService.translate('oiiosced.scheduletype'), field: 'eventTypeDesc',
                editable: false, width: 270
            },
            {
                fieldName: this.translateService.translate('oiiosced.schedulereason'), field: 'eventSubTypeDesc',
                editable: false, width: 270
            },
            {
                fieldName: this.translateService.translate('oiiosced.appearanceType'), field: 'appearanceType',
                editable: false, width: 270,datatype: 'lov',domain: 'CRT_APP_TYPE'
            },
            {
                fieldName: this.translateService.translate('oiiosced.appearanceLocation'), field: 'appearanceLocation',
                editable: false, width: 270
            },
            {
                fieldName: this.translateService.translate('oiiosced.cancelFlag'), field: 'cancelEventFalg',
                editable: false, width: 270,datatype:'checkbox'
            },
            {
                fieldName: this.translateService.translate('oiiosced.cancelReason'), field: 'cancelReason',
                editable: false, width: 270,
            },
           
        ];

    }

    /*
    retriving data to lov of schedule type based on filter
    */
    onClickFilter(event) {
        this.cntrlblkModel.eventType = null;
        this.cntrlblkModel.eventSubType = null;
        if (this.cntrlblkModel.eventClass === 'All') {
            this.disabledSchType = true;
            this.disabledSchReason = true;
        } else if (this.cntrlblkModel.eventClass === 'Internal') {
            this.disabledSchType = false;
            this.disabledSchReason = false;
            this.schTypeLink = 'oiiosced/rgSchTypeRecordGroup?domain=INT_SCH_TYPE';
        } else if (this.cntrlblkModel.eventClass === 'External') {
            this.disabledSchType = false;
            this.disabledSchReason = false;
            this.schTypeLink = 'oiiosced/rgSchTypeRecordGroup?domain=MOVE_TYPE';
        }
    }

    /*
    retriving data to lov of schedule reason based on filter and schedule type
    */
    onClickSchType($event) {
        this.cntrlblkModel.eventSubType = null;
        if (this.cntrlblkModel.eventClass === 'Internal') {
            this.schReasonLink = 'oiiosced/rgSchReaIntRecordGroup?schTypeCode=' + this.cntrlblkModel.eventType;
        } else if (this.cntrlblkModel.eventClass === 'External') {
            this.schReasonLink = 'oiiosced/rgSchReaExtRecordGroup?schTypeCode=' + this.cntrlblkModel.eventType;
        }

    }

    ok() {
    }
    no() {
    }
    cancel() {
    }

    typeClick(event) {
        const typeValue = this.cntrlblkModel.eventType === undefined ? '' : undefined;
        this.cntrlblkModel.eventType = typeValue;
    }

    reasonClick(event) {
        const typeValue = this.cntrlblkModel.eventSubType === undefined ? '' : undefined;
        this.cntrlblkModel.eventSubType = typeValue;
    }

    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.voffenderallschedulesData = [];
            this.cntrlblkModel.eventClass = 'All';
            this.disabledSchFilter = false;
            this.disabled = false;
            this.disabledSchType = true;
            this.disabledSchReason = true;
            this.cntrlblkModel.fromDate = DateFormat.getDate();
            this.cntrlblkModel.toDate = DateFormat.getDate();
            this.saveBtnDisable = false;
        } else {
            this.voffenderallschedulesData = [];
            this.disabledSchFilter = true;
            this.disabledSchType = true;
            this.disabledSchReason = true;
            this.saveBtnDisable = true;
            this.disabled = true;
            this.cntrlblkModel.eventClass = undefined;
            this.cntrlblkModel.fromDate = undefined;
            this.cntrlblkModel.toDate = undefined;
        }
    }
    voffenderallschedulesExecuteQuery() {
        const voffenderallschedulesResult = this.oiioscedFactory.vOffenderAllSchedulesExecuteQuery(this.voffenderallschedulesModel);
        voffenderallschedulesResult.subscribe(data => {
            if (data.length === 0) {
                this.saveBtnDisable = false;
                this.readOnlyForAll = false;
                this.voffenderallschedulesData = [];
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
            } else {
                this.voffenderallschedulesDataTemp = data;
                for (let i = 0; i < data.length; i++) {
                    this.voffenderallschedulesDataTemp[i].cancelEventFalg = (data[i].eventStatus === 'CANC') ? true : false;
                    if (data[i].toAgyLocDesc) {
                        this.voffenderallschedulesDataTemp[i].toAgyLocDesc = data[i].toAgyLocDesc;
                    } else if (data[i].toCityName) {
                        this.voffenderallschedulesDataTemp[i].toAgyLocDesc = data[i].toCityName;
                    } else if (data[i].toInternalLocationDesc) {
                        this.voffenderallschedulesDataTemp[i].toAgyLocDesc = data[i].toInternalLocationDesc;
                    } else if (data[i].toAddressOwnerClass) {
                        this.voffenderallschedulesDataTemp[i].toAgyLocDesc = data[i].toAddressOwnerClass;
                    }
                }
                this.voffenderallschedulesData = this.voffenderallschedulesDataTemp;
                this.voffenderallschedulesModel = data[0];
                this.saveBtnDisable = true;
                this.readOnlyForAll = true;
            }
        });
    }

    onButSearchclick(fromDate,toDate) {
        this.voffenderallschedulesModel.fromDate = DateFormat.getDate(DateFormat.getDate(this.cntrlblkModel.fromDate).setHours(0, 0, 0, 0));
        this.voffenderallschedulesModel.toDate = DateFormat.getDate(DateFormat.getDate(this.cntrlblkModel.toDate).setHours(0, 0, 0, 0));
        if (this.cntrlblkModel.startTime) {
            const startHour = this.cntrlblkModel.startTime.getHours();
            const startMin= this.cntrlblkModel.startTime.getMinutes();
           // this.cntrlblkModel.startTime = TimeFormat.parse(strTimeValue, this.cntrlblkModel.fromDate);
           this.cntrlblkModel.startTime = DateFormat.getDate(DateFormat.getDate(this.cntrlblkModel.fromDate).setHours(startHour, startMin, 0, 0));
        }
        if (this.cntrlblkModel.endTime) {
            const endTimeHour = this.cntrlblkModel.endTime.getHours() ;
           const endTimeMin =this.cntrlblkModel.endTime.getMinutes();
            //this.cntrlblkModel.endTime = TimeFormat.parse(endTimeValue, this.cntrlblkModel.toDate);
            this.cntrlblkModel.endTime = DateFormat.getDate(DateFormat.getDate(this.cntrlblkModel.toDate).setHours(endTimeHour, endTimeMin, 0, 0));
        }
        this.voffenderallschedulesModel.startTime = this.cntrlblkModel.startTime;
        this.voffenderallschedulesModel.endTime = this.cntrlblkModel.endTime;
        this.voffenderallschedulesModel.eventSubType = this.cntrlblkModel.eventSubType;
        this.voffenderallschedulesModel.eventType = this.cntrlblkModel.eventType;
        if (this.cntrlblkModel.eventClass === 'All') {
            this.voffenderallschedulesModel.eventClass = null;
        } else if (this.cntrlblkModel.eventClass === 'Internal') {
            this.voffenderallschedulesModel.eventClass = 'INT_MOV';
        } else if (this.cntrlblkModel.eventClass === 'External') {
            this.voffenderallschedulesModel.eventClass = 'EXT_MOV';
        }
        if (!this.cntrlblkModel.eventClass) {
            this.type = 'warn';
            this.message = this.translateService.translate('oiiosced.filtermustbeentered');
            this.show();
            return;
        }
        if (String(fromDate.lastValue).indexOf('_') >= 0 && fromDate.value === null) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdclogs.dateformate');
            this.show();
            this.cntrlblkModel.fromDate = undefined;
            return;
        }

        if (!this.cntrlblkModel.fromDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.formdatevalidation');
            this.show();
            return;
        }

        if (String(toDate.lastValue).indexOf('_') >= 0 && toDate.value === null) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdclogs.dateformate');
            this.show();
            this.cntrlblkModel.toDate = undefined;
            return;
        }

        if (!this.cntrlblkModel.toDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oiiosced.todatevalidation');
            this.show();
            return;
        }
        if (DateFormat.compareDate(this.cntrlblkModel.fromDate, this.cntrlblkModel.toDate) === 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('oiiosced.todatecannotbelessthanfromdate');
            this.show();
            return;
        }
        if (this.cntrlblkModel.startTime && this.cntrlblkModel.endTime) {
            if (DateFormat.compareDate(this.cntrlblkModel.startTime, this.cntrlblkModel.endTime) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oiiosced.endtimemustbegreaterthanstarttime');
                this.show();
                return;
            }
        }
        this.voffenderallschedulesModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.voffenderallschedulesExecuteQuery();
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onExitBtnClick = () => {
        this.ocdiplanFactory.ocdnoqueFlag = true;
        this.oidcnoteFactory.tempFlag = true;
        this.location.back();
    }

    checkVal(event) {
        if (event && event.innerOptions) {
            if (event.innerOptions.length === 0) {
                this.type = 'info';
                this.message = 'List of Values contains no entries.';
                this.show();
            }
        }
    }
    ngOnDestroy() {
        this.oidcnoteFactory.exitFlag = undefined;
    }
    onButClearclick(){
        this.saveBtnDisable = false;
        this.readOnlyForAll = false;
        this.cntrlblkModel = new VOffenderAllSchedules();
        this.voffenderallschedulesData = []; 
    }

    get clearDisabled(){
        if(this.cntrlblkModel.eventClass ||this.cntrlblkModel.fromDate ||
            this.cntrlblkModel.toDate ||this.cntrlblkModel.startTime ||
            this.cntrlblkModel.endTime ||this.cntrlblkModel.eventType ||
            this.cntrlblkModel.eventSubType || this.voffenderallschedulesData.length > 0){
            return false;
        }else{
            return true;
        }
    }
}
