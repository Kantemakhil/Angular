import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidacselService } from '../service/oidacsel.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VPrisonActivities } from '../beans/VPrisonActivities';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
    selector: 'app-oidacsel',
    templateUrl: './oidacsel.component.html'

})

export class OidacselComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    scheduledactivitiesData: VPrisonActivities [] = [];
    scheduledactivitiesDataTemp: VPrisonActivities[] = [];
    // TODO angular.copy(this.scheduledactivitiesData, thisscheduledactivitiesDataTemp);
    scheduledActivitiesModel: VPrisonActivities = new VPrisonActivities();
    scheduledActivitiesTempModel: VPrisonActivities = new VPrisonActivities();
    scheduledActivitiesDupModel: VPrisonActivities = new VPrisonActivities();
    scheduledactivitiesIndex: number;
    scheduledactivitiesInsertList: VPrisonActivities[] = [];
    scheduledactivitiesUpdatetList: VPrisonActivities[] = [];
    scheduledactivitiesDeleteList: VPrisonActivities[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean ;
    scheduledActivitiesColumnDef: any[];
    ctlBlkReadOnly: boolean;
    scheduledActivitiesReadOnly: boolean;
    ctlButReadOnly: boolean;
    type = 'error';
    message = ' Invalid.';
    msglist = [];
    tableIndex = -1;
    facility: string;
    service: string;
    clearDisable: boolean;
    selectDisable: boolean;
    retriveDisable: boolean;
    cancelDisable: boolean;
    namesReadOnly: boolean;
    serviceReadOnly: boolean;
    onaddfalg = true;
    constructor(private oidacselFactory: OidacselService , public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
        // TODO initilize data members here..!
    this.scheduledActivitiesColumnDef = [];
    }
    ngOnInit() {
        this.retriveDisable = false;
        this.selectDisable = true;
        this.cancelDisable = false;
        this.namesReadOnly = false;
        this.serviceReadOnly = false;
        this.scheduledActivitiesModel.programId = this.dialog.data.programId;
        this.scheduledActivitiesModel.agyLocId =  this.dialog.data.agyLocId;
        this.facility = this.dialog.data.faciltyDesc;
        this.service = this.dialog.data.servicdDesc;
        if (this.dialog.data.facilityDescription) {
            this.facility = this.dialog.data.facilityDescription;
        }
        if (this.dialog.data.programDescription) {
            this.service = this.dialog.data.programDescription;
        }

        this.scheduledActivitiesDupModel = JSON.parse(JSON.stringify(this.scheduledActivitiesModel));

if (this.dialog.data.moduleName === 'OIDPACTI') {
    this.facility = this.dialog.data.facilityDescription;
    this.service = this.dialog.data.programDescription;
    this.scheduledactivitiesExecuteQuery();
}


    this.scheduledActivitiesColumnDef = [
        { fieldName: 'Activity Description', field: 'activity', editable: false, cellEditable: this.canNameSearchEdit,
          datatype: 'text', width: 150},
        { fieldName: 'Start Date', field: 'scheduleStartDate', editable: false, datatype: 'date', cellEditable: this.canNameSearchEdit,
         width: 150},
        { fieldName: 'End Date', field: 'scheduleEndDate', editable: false, datatype: 'date', cellEditable: this.canNameSearchEdit,
        width: 150},
        { fieldName: 'Internal Location', field: 'internalLocationDesc', datatype: 'text', editable: false,
        cellEditable: this.canNameSearchEdit, width: 150},


    ];

    this.scheduledactivitiesExecuteQuery();
    }

    show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
    }
    canNameSearchEdit = ( data: any, index: number, field: string ): boolean => {
        return this.onaddfalg;
    }
    onRowClickActivity(event) {
        if (event) {
            this.scheduledActivitiesTempModel = event;
        }
    }


       onOffenderChange() {

        this.dialog.close({
            'activity': this.scheduledActivitiesTempModel.activity,
            'scheduleStartDate': this.scheduledActivitiesTempModel.scheduleStartDate,
            'scheduleEndDate': this.scheduledActivitiesTempModel.scheduleEndDate,
            'internalLocationDesc': this.scheduledActivitiesTempModel.internalLocationDesc,
            'crsActyId': this.scheduledActivitiesTempModel.crsActyId

        });

    }

    ok(event?) {
        this.scheduledactivitiesExecuteQuery();
    }

    cancel() {
        this.dialog.close(null);
   }

   isInsertable() {

 /*    const strDate: Date = DateFormat.getDate(this.scheduledActivitiesModel.scheduleStartDate);
    const endDate: Date = DateFormat.getDate(this.scheduledActivitiesModel.scheduleEndDate);
    this.scheduledActivitiesModel.scheduleStartDate = strDate;
    this.scheduledActivitiesModel.scheduleEndDate = endDate; */
    if (this.scheduledActivitiesModel.activity || DateFormat.getDate(this.scheduledActivitiesModel.scheduleStartDate) ||
        this.scheduledActivitiesModel.scheduleEndDate || DateFormat.getDate(this.scheduledActivitiesModel.scheduleEndDate)) {

        this.clearDisable = false;
    } else {
        this.clearDisable = true;
    }
}
   clearQuery() {
    this.scheduledactivitiesData = [];
    this.scheduledActivitiesTempModel = new VPrisonActivities();
    this.scheduledActivitiesModel = new VPrisonActivities();
    this.onaddfalg = true;
    this.clearDisable = true;
    this.selectDisable = true;
    this.retriveDisable = false;
    this.cancelDisable = false;
    this.namesReadOnly = false;
    this.serviceReadOnly = true;
}

    scheduledactivitiesExecuteQuery() {
        this.scheduledActivitiesModel.programId = this.dialog.data.programId;
        this.scheduledActivitiesModel.agyLocId =  this.dialog.data.agyLocId;
                 const scheduledactivitiesResult = this.oidacselFactory.
                 scheduledActivitiesExecuteQuery(this.scheduledActivitiesModel);
                     scheduledactivitiesResult.subscribe(data => {
                    if (data.length === 0) {
                        this.scheduledactivitiesData = [];
           if (this.scheduledActivitiesModel.activity || this.scheduledActivitiesModel.scheduleStartDate ||
            this.scheduledActivitiesModel.internalLocationDesc || this.scheduledActivitiesModel.scheduleEndDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                this.scheduledActivitiesModel = new VPrisonActivities();
            } } else {
                data.forEach(element => {
                    if (element.scheduleStartDate) {
                        element.scheduleStartDate = DateFormat.formatMDY(DateFormat.getDate(element.scheduleStartDate));
                         }
                         if (element.scheduleEndDate) {
                            element.scheduleEndDate = DateFormat.formatMDY(DateFormat.getDate(element.scheduleEndDate));
                             }
                                     });

                        this.scheduledactivitiesData = data;
                        this.onaddfalg = false;
                        this.tableIndex = 0;
                        this.retriveDisable = true;
                        this.selectDisable = false;
                        this.cancelDisable = false;
                        this.clearDisable = false;
                        this.namesReadOnly = true;
                        this.serviceReadOnly = true;

                    }
                });
            }

        }