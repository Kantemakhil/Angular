import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidschacService } from '../service/oidschac.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VSchdPrisonActivities } from '@inst/institutional-activities/beans/VSchdPrisonActivities';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
    selector: 'app-oidschac',
    templateUrl: './oidschac.component.html'
})

export class OidschacComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;

    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    schactData: VSchdPrisonActivities[] = [];
    schactDataTemp: VSchdPrisonActivities[] = [];
    schactModel: VSchdPrisonActivities = new VSchdPrisonActivities();
    schactTempModel: VSchdPrisonActivities = new VSchdPrisonActivities();
    schactInsertList: VSchdPrisonActivities[] = [];
    schactUpdatetList: VSchdPrisonActivities[] = [];
    schactDeleteList: VSchdPrisonActivities[] = [];
    schActResultList: VSchdPrisonActivities[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    schActColumnDef: any[];
    ctlBlkReadOnly: boolean;
    schActReadOnly: boolean;
    ctlButReadOnly: boolean;
    tableIndex = -1;
    type = 'error';
    message = ' Invalid.';
    msglist = [];
    onaddfalg: boolean;
    clearDisable: boolean;
    selectDisable: boolean;
    retriveDisable: boolean;
    cancelDisable: boolean;
    namesReadOnly: boolean;
    service: string;
    serviceReadOnly: boolean;
    retrieve: boolean;
    constructor(private oidschacFactory: OidschacService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        // TODO initilize data members here..!
        this.schActColumnDef = [];

    }
    ngOnInit() {
        this.retriveDisable = false;
        this.selectDisable = true;
        this.clearDisable = true;
        this.cancelDisable = false;
        this.namesReadOnly = false;
        this.serviceReadOnly = true;
        this.schactModel.programId = this.dialog.data.programId;
        this.schactModel.agyLocId = this.dialog.data.agyLocId;
        this.schactModel.scheduleDate = this.dialog.data.scheduleDate;
        if (this.dialog.data.code === '') {
            this.service = undefined;
        } else {
        this.service = this.dialog.data.description;
        }



        this.schActColumnDef = [
            { fieldName: 'Activity Description', field: 'activity', editable: false, datatype: 'text', width: 150 },
            { fieldName: 'Start Time', field: 'startTime', editable: false, datatype: 'time', width: 150 },
            { fieldName: 'End Time', field: 'endTime', editable: false, datatype: 'time', width: 150 },
            { fieldName: 'Internal Location', field: 'internalLocationDesc', editable: false, datatype: 'text', width: 150 },
        ];
        this.schactExecuteQuery();
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    allowNumbers(event) {
    }
    onRowClickschact(event) {
        if (event) {
            this.schactTempModel = event;
        }
    }


    onOffenderChange() {


        const strtime: Date = DateFormat.getDate(this.schactTempModel.startTime);
        const endTime: Date = DateFormat.getDate(this.schactTempModel.endTime);
        this.schactTempModel.startTime = strtime;
        this.schactTempModel.endTime = endTime;



        this.dialog.close({
            'activity': this.schactTempModel.activity,
            'startTime': this.schactTempModel.startTime,
            'endTime': this.schactTempModel.endTime,
            'internalLocationDesc': this.schactTempModel.internalLocationDesc,
            'crsActyId': this.schactTempModel.crsActyId


        });

    }

    ok(event?) {
        this.retrieve = true;
        this.schactExecuteQuery();
    }

    cancel() {
        this.dialog.close(null);
    }
    isInsertable() {
        if (this.schactModel.activity || this.schactModel.startTime || this.schactModel.endTime ||
            this.schactModel.internalLocationDesc) {

            this.clearDisable = false;
        } else {
            this.clearDisable = true;
        }
    }

    clearQuery() {
        this.schactData = [];
        this.schactTempModel = new VSchdPrisonActivities();
        this.schactModel = new VSchdPrisonActivities();
        this.onaddfalg = true;
        this.clearDisable = true;
        this.selectDisable = true;
        this.retriveDisable = false;
        this.cancelDisable = false;
        this.namesReadOnly = false;
    }
    schactExecuteQuery() {
        this.schactModel.programId = this.dialog.data.programId;
        this.schactModel.agyLocId = this.dialog.data.agyLocId;
        this.schactModel.scheduleDate = this.dialog.data.scheduleDate;

        const selectedDate: Date = DateFormat.getDate(this.schactModel.scheduleDate);
        selectedDate.setHours(0);
        selectedDate.setMinutes(0);
        selectedDate.setSeconds(0);
        this.schactModel.scheduleDate = selectedDate;
        const schactResult = this.oidschacFactory.
            schActExecuteQuery(this.schactModel);
        schactResult.subscribe(schActResultList => {
            if (schActResultList.length === 0) {
                this.schactData = [];
                if (this.schactModel.activity || this.schactModel.startTime || this.schactModel.endTime ||
                     this.schactModel.internalLocationDesc) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.querycaused');
                    this.show();
                    this.schactModel = new VSchdPrisonActivities();
                } else if ( this.retrieve) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.querycaused');
                    this.show();
                }
            } else {
                if (this.service === undefined) {
                    this.schactModel = new VSchdPrisonActivities();
                } else {
                this.schactData = schActResultList;
                this.tableIndex = 0;
                this.retriveDisable = true;
                this.selectDisable = false;
                this.cancelDisable = false;
                this.clearDisable = false;
                this.onaddfalg = false;
                this.namesReadOnly = true;
                }
            }
        });

    }


}
