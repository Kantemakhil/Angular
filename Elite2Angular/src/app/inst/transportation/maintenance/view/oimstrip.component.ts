import { Component, OnInit, ViewChild } from "@angular/core";
import { ScheduledTrips } from "../beans/ScheduledTrips";
import { OimstripService } from "../service/oimstrip.service";
import { Trips } from '../beans/Trips';
import { ScheduledTripAssignments } from '../beans/ScheduledTripAssignments';
import { TranslateService } from '@common/translate/translate.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from "@core/ui-components/datepicker/dateFormat";
import { DialogService } from "@core/ui-components/dialog/dialog.service";
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StaffMembers } from "@inst/incidents-oic/beans/StaffMembers";
import { _isNumberValue } from "@angular/cdk/coercion";
@Component({
    selector: 'app-oimstrip',
    templateUrl: './oimstrip.component.html',
})

export class OimstripComponent implements OnInit {
    @ViewChild('tripsGrid', { static: true }) grid: any;
    @ViewChild('schTripGrid', { static: true }) schTripGrid: any;
    @ViewChild('vehGrid', { static: true }) vehGrid: any;
    @ViewChild('staffGrid', { static: true }) staffGrid: any;
    msgs: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    disablegenerateschedule = true;
    enableInsertVehi: boolean;
    enableInsertStaff: boolean;
    tripsColumnDef: any[];
    scheduleTripsColumnDef: any[];
    vehicleColumnDef: any[];
    staffColumnDef: any[];
    tripsRowData: Trips[] = [];
    scheduledTripsRowData: ScheduledTrips[] = [];
    scheduledTripAssignmentsRowData: ScheduledTripAssignments[] = [];
    vehicleRowData: any[] = [];
    staffRowData: any[] = [];
    scheduledtripsModel: ScheduledTrips = new ScheduledTrips();
    tripsModel: Trips = new Trips();
    tripsIndex: number = 0;
    tripsInsertList: Trips[] = [];
    tripsUpdateList: Trips[] = [];
    tripsDeleteList: Trips[] = [];
    scheduledtripsData: ScheduledTrips[] = [];
    scheduledtripsDataTemp: ScheduledTrips[] = [];
    scheduledtripsUpdateList: any;
    scheduledtripsInsertList: any;
    scheduledtripsDeleteList: any;
    staffassignmentModel: ScheduledTripAssignments = new ScheduledTripAssignments();
    staffassignmentInsertList: any;
    staffassignmentUpdateList: any;
    staffassignmentDeleteList: any;
    global: any;
    staffType: StaffMembers = new StaffMembers();
    scheduledtripassignmentsModel: ScheduledTripAssignments = new ScheduledTripAssignments();
    scheduledtripassignmentsData: ScheduledTripAssignments[] = [];
    scheduledtripassignmentsInsertList: any;
    scheduledtripassignmentsUpdateList: any;
    scheduledtripassignmentsDeleteList: any;
    tableIndex: number;

    constructor(public translateService: TranslateService, private oimstripService: OimstripService, public dialogService: DialogService, private sessionManager: UserSessionManager) {
    }
    ngOnInit(): void {
        this.global = {};
        this.tripsColumnDef = [
            {
                fieldName: this.translateService.translate('oimstrip.tripcode'), field: 'tripCode',
                datatype: 'text', editable: true, required: true, cellEditable: this.canCellEdit,maxlength: 6
            },
            {
                fieldName: this.translateService.translate('oimstrip.description'), field: 'description',
                datatype: 'text', editable: true, required: true,maxlength: 40,uppercase: 'false',
            },
            {
                fieldName: this.translateService.translate('oimstrip.triptype'), field: 'tripType',
                datatype: 'lov', link: 'oimstrip/rgTripTypeRecordGroup', editable: true, required: true
            },
            {
                fieldName: this.translateService.translate('oimstrip.seq'), field: 'listSeq',
                datatype: 'number', editable: true, required: true,whole:"true", minValue: '1', maxValue: '999',
            },
            {
                fieldName: this.translateService.translate('oimstrip.act'), field: 'activeFlag',
                datatype: 'checkbox', editable: true,
            },
            {
                fieldName: this.translateService.translate('oimstrip.expirydate'), field: 'expiryDate',
                datatype: 'date', editable: false,
            },

        ];
        //Schedule trips
        this.scheduleTripsColumnDef = [
            {
                fieldName: this.translateService.translate('oimstrip.id'), field: 'scheduledTripId',
                datatype: 'text', editable: false,
            },
            {
                fieldName: this.translateService.translate('oimstrip.departuredate'), field: 'departureDate',
                datatype: 'date', editable: false,maxlength: 40
            },
            {
                fieldName: this.translateService.translate('oimstrip.departuretime'), field: 'estDepartureTime',
                datatype: 'time', editable: false,
            },
            {
                fieldName: this.translateService.translate('oimstrip.completiondate'), field: 'completionDate',
                datatype: 'date', editable: false,
            },
            {
                fieldName: this.translateService.translate('oimstrip.estcomptime'), field: 'estCompletionTime',
                datatype: 'time', editable: false,
            },
            {
                fieldName: this.translateService.translate('oimstrip.route'), field: 'routeName',
                datatype: 'text', editable: false,
            },
            {
                fieldName: this.translateService.translate('oimstrip.optcap'), field: 'optCap',
                datatype: 'text', editable: false,
            },
            {
                fieldName: this.translateService.translate('oimstrip.physcap'), field: 'physCap',
                datatype: 'text', editable: false,
            },
            {
                fieldName: this.translateService.translate('oimstrip.cancel'), field: 'cancelFlag',
                datatype: 'checkbox', editable: false, cellEditable: this.cancelCellEdit,
            },
            {
                fieldName: this.translateService.translate('oimstrip.cancelledby'), field: 'cancelBy',
                datatype: 'text', editable: false,
            },
            {
                fieldName: this.translateService.translate('oimstrip.canceldate'), field: 'cancelDate',
                datatype: 'date', editable: false,
            },
            { fieldName: '', field: 'btnStatus', hide: true },

        ];

        this.vehicleColumnDef = [
            {
                fieldName: this.translateService.translate('oimstrip.vehicleid'), field: 'assignedId', datatype: 'text', editable: false, required: true
            },
            {
                fieldName: '', field: 'goButton', displayas: 'href', datatype: 'hyperlink', editable: false, width: 100,
                data: 'row', updateField: 'row', styleClass: 'launch', modal: true, dialogWidth: 100, height: 90, onLaunchClick: this.openOiuselve,
            },
            {
                fieldName: this.translateService.translate('oimstrip.type'), field: 'type',
                datatype: 'text', editable: false,
            },
            {
                fieldName: this.translateService.translate('oimstrip.make'), field: 'make',
                datatype: 'text', editable: false,
            },
            {
                fieldName: this.translateService.translate('oimstrip.model'), field: 'modelNo',
                datatype: 'text', editable: false,
            },
            {
                fieldName: this.translateService.translate('oimstrip.description'), field: 'description',
                datatype: 'text', editable: false,
            },
            {
                fieldName: this.translateService.translate('oimstrip.optcap'), field: 'optimumCapacity',
                datatype: 'text', editable: false,
            },
            {
                fieldName: this.translateService.translate('oimstrip.physcap'), field: 'physicalCapacity',
                datatype: 'text', editable: false,
            },
        ];

        this.staffColumnDef = [
            {
                fieldName: this.translateService.translate('oimstrip.staffname'), field: 'assignedId',
                datatype: 'lov', editable: true, link: 'oimstrip/rgStaffIdRecordGroup'
            },
            { fieldName: '', field: '', hide: true },
            { fieldName: '', field: 'assignedIdTemp', hide: true },
        ];

        this.tripsexecuteQuery();
    }

    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'tripCode') {
            if (data.createDatetime) {
                return false;
            }
        }
        return true;
    }

    cancelCellEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'cancelFlag') {
            if (data.cancelFlag) {
                return false;
            }
            if (!this.tripsModel.activeFlag) {
                return false;
            }
         /*    if(DateFormat.compareDate(DateFormat.getDate(data.departureDate),DateFormat.getDate())=== -1){
                data.cancelFlag = false;
                this.type = 'warn';
                this.message = this.translateService.translate('oimstrip.thistripcodealreadyexist');
                if (data.cancelFlag) {
                    data.cancelFlag = false;
                }
                this.show();
                return;
            } */
        }
        return true;
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    validateTripsRowData = (event) => {
        // this.tripsModel = event;
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'tripCode') {
            const tripCodeVal = this.oimstripService.tagtransportCTrip(event.data.tripCode);
            tripCodeVal.subscribe(data => {
                if (data) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimstrip.thistripcodealreadyexist');
                    this.show();
                    rowdata.validated = true;
                    return rowdata;
                }
            });
        }
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.grid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;

    }

    //New screen opening 
    getOidgenst = () => { //scheduleGenerateOidgenst
        if (this.grid.addedMap.size > 0 || this.grid.updatedMap.size > 0 ||
            this.grid.removedMap.size > 0 || this.vehGrid.addedMap.size > 0 || this.vehGrid.updatedMap.size > 0 ||
            this.vehGrid.removedMap.size > 0 || this.staffGrid.addedMap.size > 0 || this.staffGrid.updatedMap.size > 0 ||
            this.staffGrid.removedMap.size > 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('oimstrip.pleasesaveyourchanges');
            this.show();
            return;
        }
        if (!this.tripsModel.activeFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('oimstrip.pleaseactivatethetriptogenerateaschedule');
            this.show();
            return;
        }
        if (!this.tripsModel.tripCode || this.tripsModel.tripCode === '') {
            this.type = 'warn';
            this.message = this.translateService.translate('oimstrip.pleaseprovidethevalidtripcodetogenerateschedule');
            this.show();
            return;
        }

        if (!this.tripsModel.description || this.tripsModel.description === '') {
            this.type = 'warn';
            this.message = this.translateService.translate('oimstrip.pleaseprovidethevaliddescriptiontogenerateschedule');
            this.show();
            return;
        }
        //create variables 
        const tripCodeVal = this.oimstripService.scheduleGenerateOidgenst(this.tripsModel.tripCode);
        tripCodeVal.subscribe(data => {
            if (data) {
                data.forEach(ele => {
                    ele.vFlag = ele.vFlag === 'Y' ? true : false;
                });
                this.scheduledtripsModel = data;
                if (this.scheduledtripsModel.vCount === 0) {
                    this.global['g_exist'] = 'N';
                    this.tripsModel.vSdate = DateFormat.getDate();
                    this.tripsModel.vEdate = DateFormat.getDate(DateFormat.getDate(this.tripsModel.startDate).setMonth(DateFormat.getDate().getMonth() + 1));
                    const data = {
                        label: this.translateService.translate("oimstrip.tripdoesnotexistdoyouwanttocreatethistrip"), yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                        if (result) {
                            const tripsSaveData = this.oimstripService.tripsOidgenstInsert(this.tripsModel);
                            tripsSaveData.subscribe(data => {
                                if (data === 1) {
                                    this.type = 'success';
                                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                                    this.show();
                                    this.openPopUp(this.scheduledtripsModel);
                                }
                            });
                        } else {
                            return;
                        }
                    });
                } else {
                    if (this.scheduledtripsModel.vMdate == null) {
                        this.global['g_exist'] = 'N';
                        this.tripsModel.vSdate = DateFormat.getDate();
                        this.tripsModel.vEdate = DateFormat.getDate(DateFormat.getDate(this.tripsModel.startDate).setMonth(DateFormat.getDate().getMonth() + 1));
                    } else if (DateFormat.compareDate(DateFormat.getDate(this.scheduledtripsModel.vMdate), DateFormat.getDate()) === -1) {
                        this.global['g_exist'] = 'Y';
                        this.tripsModel.vSdate = DateFormat.getDate();
                        this.tripsModel.vEdate = DateFormat.getDate(DateFormat.getDate(this.tripsModel.startDate).setMonth(DateFormat.getDate().getMonth() + 1));
                    } else if (this.scheduledtripsModel.vMdate1 == null) {
                        this.global['g_exist'] = 'Y';
                        this.tripsModel.vSdate = DateFormat.getDate();
                        this.tripsModel.vEdate = DateFormat.getDate(DateFormat.getDate(this.tripsModel.startDate).setMonth(DateFormat.getDate().getMonth() + 1));
                    } else {
                        this.global['g_exist'] = 'Y';
                        this.tripsModel.vSdate = DateFormat.getDate(DateFormat.getDate(this.scheduledtripsModel.vMdate1).setMonth(DateFormat.getDate().getMonth() + 1));
                        this.tripsModel.vEdate = DateFormat.getDate(DateFormat.getDate(this.tripsModel.startDate).setMonth(DateFormat.getDate().getMonth() + 1));
                    }
                    this.openPopUp(this.scheduledtripsModel);
                }
            }
        });
    }

    openPopUp(event) {

        let index = this.scheduledTripsRowData.length;
        if(index > 0){
            let dateVal = DateFormat.getDate(this.scheduledTripsRowData[index-1].departureDate);
            this.tripsModel.vSdate =   DateFormat.getDate(dateVal.setDate(dateVal.getDate() + 1));
            let endDate =  DateFormat.getDate(dateVal.setDate(dateVal.getDate() + 1));;
            this.tripsModel.vEdate  =  DateFormat.getDate(endDate.setMonth(endDate.getMonth()+1));
        }

        this.global['tripCode'] = this.tripsModel.tripCode;
        this.global['tripDesc'] = this.tripsModel.description;
        this.global['tripStartDate'] = this.tripsModel.vSdate
        this.global['tripEndDate'] = this.tripsModel.vEdate
        this.global['tripType'] = this.tripsModel.tripType;
        this.dialogService.openLinkDialog('/OIDGENST', this.global, 80).subscribe(result => {
            this.scheduledtripsexecuteQuery();
        });
    }

    onRowClickTrips(event) {
        if (event) {
            this.tripsModel = event;
            this.scheduledtripsexecuteQuery();
        } else {
            this.tripsModel = new Trips();
            this.scheduledTripsRowData = [];
            this.staffRowData = [];
            this.scheduledtripassignmentsData = [];
        }

    }

    tripsGridOnInsert = (event) =>  {
        this.disablegenerateschedule = true;   
        return { 'activeFlag': true };
    }

    vehicleAssigOnInsert() {
        return { 'goButton': '..' }
    }

    onRowClickSchTrips(event) {
        if (event) {   
            this.scheduledtripsModel = event;
            this.enableInsertVehi = true;
            this.enableInsertStaff = true;
            this.disablegenerateschedule = false;
            this.staffassignmentExecuteQuery();
            this.scheduledTripAssignmentsExecuteQuery();
        } else {
           
            this.scheduledtripsModel = new ScheduledTrips();
            this.staffRowData = [];
            this.scheduledtripassignmentsData = [];
          
           
        }
    }


    

    oimstripSavetripsForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.tripsInsertList = [];
        this.tripsInsertList = event.added
        this.tripsUpdateList = event.updated
        this.tripsDeleteList = event.removed
        const tripsCommitModel = { insertList: [], updateList: [], deleteList: [] };
        if (this.tripsInsertList.length > 0 || this.tripsUpdateList.length > 0) {
            for (let i = 0; i < this.tripsInsertList.length; i++) {
                if (this.tripsInsertList[i].tripCode) {
                    const duplicate = this.tripsRowData.filter(e => e.tripCode == this.tripsInsertList[i].tripCode);
                    if (duplicate.length > 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oimstrip.thistripcodealreadyexist');
                        this.show();
                        return;
                    }
                }
            }
            if (this.tripsUpdateList.length > 0 || this.tripsInsertList.length > 0) {
                this.tripsInsertList.forEach(data => {
                    data.activeFlag = (data.activeFlag) ? 'Y' : 'N';
                });
                this.tripsUpdateList.forEach(data => {
                    data.activeFlag = (data.activeFlag) ? 'Y' : 'N';
                });
                tripsCommitModel.insertList = this.tripsInsertList;
                tripsCommitModel.updateList = this.tripsUpdateList;
            }
        }
        if (this.tripsDeleteList.length > 0) {
            for (let i = 0; i < this.tripsDeleteList.length; i++) {
            }
            tripsCommitModel.deleteList = this.tripsDeleteList;
        }
        const tripsSaveData = this.oimstripService.tripsCommit(tripsCommitModel);
        tripsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.tripsexecuteQuery();
                this.disablegenerateschedule = false;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    tripsexecuteQuery() {
        const serviceObj = this.oimstripService.
            tripsExecuteQuery(this.tripsModel);
            
        serviceObj.subscribe(data => {
            if (data && data.length > 0) {
                this.disablegenerateschedule = false;
                data.forEach(ele => {
                    ele.activeFlag = ele.activeFlag === 'Y' ? true : false;
                });
                this.tripsRowData = data;         
                this.tableIndex = 0;
            } else {
                this.tripsRowData = [];
                this.scheduledTripsRowData = [];
                this.staffRowData = [];
                this.scheduledtripassignmentsData = [];
               
            }
        });
    }

    validateScheRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
     
        if (event.field === 'cancelFlag') {
            const data = {
                label: this.translateService.translate("oimstrip.doyouwanttocancelthistrip"), yesBtn: true, noBtn: true
            };
            if (event.data.cancelFlag) {
                if (this.tripsModel.tripType === 'INTER') {
                    if (event.data.vAction) {
                        data.label = this.translateService.translate('oimstrip.selectedtriphasastatusof" + event.data.vAction + "  . oimstrip.doyouwanttocancelthistrip');
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                            if (result) {
                                if (event.data.vNum > 0) {
                                    data.label = this.translateService.translate('oimstrip.atripthatoccursafterthetripyouaretryingtocancelha');
                                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result1 => {

                                        if (result1) {
                                            const schTrips = { added: [], updated: [], removed: [] };
                                            this.schTripGrid.updatedMap.forEach((value, keys) => { schTrips.updated.push(value); });
                                            this.oimstripSavescheduledtripsForm(schTrips);
                                        } else {
                                            this.schTripGrid.setColumnData('cancelBy', rowIndex, undefined);
                                            this.schTripGrid.setColumnData('cancelDate', rowIndex, undefined);
                                            this.schTripGrid.setColumnData('cancelFlag', rowIndex, false);
                                        }
                                    });
                                } else {
                                    const data = {
                                        label: this.translateService.translate("oimstrip.doyouwanttocontinuetheroutepatternforthetrip"), yesBtn: true, noBtn: true, cancelBtn: true
                                    };
                                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result2 => {
                                        if (result2 === null) { // cancel
                                            this.schTripGrid.setColumnData('cancelBy', rowIndex, undefined);
                                            this.schTripGrid.setColumnData('cancelDate', rowIndex, undefined);
                                            this.schTripGrid.setColumnData('cancelFlag', rowIndex, false);
                                        } else if (result2) { // true
                                            const schTrips = { added: [], updated: [], removed: [] };
                                            this.schTripGrid.setColumnData('cancelBy', rowIndex, this.sessionManager.getId());
                                            this.schTripGrid.setColumnData('cancelDate', rowIndex, DateFormat.getDate());
                                            this.schTripGrid.setColumnData('btnStatus', rowIndex, "Yes");
                                            this.schTripGrid.updatedMap.forEach((value, keys) => { schTrips.updated.push(value); });
                                            this.oimstripSavescheduledtripsForm(schTrips);
                                        } else { //no
                                            const schTrips = { added: [], updated: [], removed: [] };
                                            this.schTripGrid.setColumnData('cancelBy', rowIndex, undefined);
                                            this.schTripGrid.setColumnData('cancelDate', rowIndex, undefined);
                                            this.schTripGrid.setColumnData('cancelFlag', rowIndex, false);
                                            this.schTripGrid.setColumnData('btnStatus', rowIndex, "No");
                                            this.schTripGrid.updatedMap.forEach((value, keys) => { schTrips.updated.push(value); });
                                           // this.oimstripSavescheduledtripsForm(schTrips);
                                        }
                                    });
                                }
                            } else {
                                this.schTripGrid.setColumnData('cancelBy', rowIndex, undefined);
                                this.schTripGrid.setColumnData('cancelDate', rowIndex, undefined);
                                this.schTripGrid.setColumnData('cancelFlag', rowIndex, true);
                            }
                        });
                    } else {
                        if (event.data.vNum > 0) {
                            const data = {
                                label: this.translateService.translate("oimstrip.atripthatoccursafterthetripyouaretryingtocancelha"), yesBtn: true, noBtn: true, cancelBtn: true
                            };
                            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result1 => {
                                if (result1) { //ALERT_BUTTON2
                                    const schTrips = { added: [], updated: [], removed: [] };
                                    this.schTripGrid.setColumnData('cancelBy', rowIndex, this.sessionManager.getId());
                                    this.schTripGrid.setColumnData('cancelDate', rowIndex, DateFormat.getDate());
                                    this.schTripGrid.setColumnData('btnStatus', rowIndex, "Yes");
                                    this.schTripGrid.updatedMap.forEach((value, keys) => { schTrips.updated.push(value); });
                                    this.oimstripSavescheduledtripsForm(schTrips);
                                } else { //no
                                    this.schTripGrid.setColumnData('cancelBy', rowIndex, undefined);
                                    this.schTripGrid.setColumnData('cancelDate', rowIndex, undefined);
                                    this.schTripGrid.setColumnData('cancelFlag', rowIndex, false);
                                }
                            });

                        } else {
                            const data = {
                                label: this.translateService.translate("oimstrip.doyouwanttocontinuetheroutepatternforthetrip"), yesBtn: true, noBtn: true, cancelBtn: true
                            };
                            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result2 => {
                                if (result2 == null) {
                                    this.schTripGrid.setColumnData('cancelBy', rowIndex, undefined);
                                    this.schTripGrid.setColumnData('cancelDate', rowIndex, undefined);
                                    this.schTripGrid.setColumnData('cancelFlag', rowIndex, false);
                                } else if (result2) {
                                    const schTrips = { added: [], updated: [], removed: [] };
                                    this.schTripGrid.setColumnData('cancelBy', rowIndex, this.sessionManager.getId());
                                    this.schTripGrid.setColumnData('cancelDate', rowIndex, (DateFormat.getDate()));
                                    this.schTripGrid.setColumnData('btnStatus', rowIndex, "Yes");
                                    this.schTripGrid.updatedMap.forEach((value, keys) => { schTrips.updated.push(value); });
                                    this.oimstripSavescheduledtripsForm(schTrips);
                                } else {
                                    const schTrips = { added: [], updated: [], removed: [] };
                                    this.schTripGrid.setColumnData('cancelBy', rowIndex, undefined);
                                    this.schTripGrid.setColumnData('cancelDate', rowIndex,undefined);
                                    this.schTripGrid.setColumnData('cancelFlag', rowIndex, false);
                                    this.schTripGrid.setColumnData('btnStatus', rowIndex, "No");
                                    this.schTripGrid.updatedMap.forEach((value, keys) => { schTrips.updated.push(value); });
                                   // this.oimstripSavescheduledtripsForm(schTrips);
                                }
                            });
                        }
                    }
                } else if (this.tripsModel.tripType === 'LOCAL') {
                    this.cancelSchTrip(rowIndex);
                }

            } else {
                this.schTripGrid.setColumnData('cancelBy', rowIndex, undefined);
                this.schTripGrid.setColumnData('cancelDate', rowIndex, undefined);
                const schTrips = { added: [], updated: [], removed: [] };
                schTrips.updated = this.scheduledTripsRowData.filter(e => e.scheduledTripId === event.data.scheduledTripId);
                schTrips.updated[0].cancelFlag = false;
                if (!event.cancelFlag) {
                    this.schTripGrid.setColumnData('cancelBy', rowIndex, undefined);
                    this.schTripGrid.setColumnData('cancelDate', rowIndex, undefined);
                    rowdata.validated = true;
                    return rowdata;
                }
                this.oimstripSavescheduledtripsForm(schTrips);
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    cancelSchTrip(rowIndex :any) {
        if (DateFormat.compareDate(DateFormat.getDate(this.scheduledtripsModel.departureDate), DateFormat.getDate()) === -1) {
            this.scheduledtripsModel.cancelFlag === 'N';
            this.schTripGrid.setColumnData('cancelFlag', rowIndex, false);
            this.type = 'warn';
            this.message = this.translateService.translate('oimstrip.cannotcancelpasttrips');
            this.show();
            return;
        }
        const data = {
            label: this.translateService.translate('oimstrip.doyouwanttocontinuetheroutepatternforthetrip'), yesBtn: true, noBtn: true, cancelBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
            if (result == null) {

            } else if (result) {
                const schTrips = { added: [], updated: [], removed: [] };
                this.schTripGrid.setColumnData('btnStatus', "Yes");
                this.schTripGrid.updatedMap.forEach((value, keys) => { schTrips.updated.push(value); });
                this.oimstripSavescheduledtripsForm(schTrips);
                if (this.scheduledtripsModel.vNonAdt != null || this.scheduledtripsModel.vBkg != null) {
                    data.label = this.translateService.translate('oimstrip.oneormorescheduletripsthatyouaretryingtocancelhasoffenderassignedtothem');
                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result1 => {
                        if (result1 == null) {
                            this.schTripGrid.setColumnData('cancelBy', undefined);
                            this.schTripGrid.setColumnData('cancelDate', undefined);
                            this.schTripGrid.setColumnData('cancelFlag', false);
                        } else if (result1) {
                            const schTrips = { added: [], updated: [], removed: [] };
                            this.schTripGrid.setColumnData('btnStatus', "Yes");
                            this.schTripGrid.updatedMap.forEach((value, keys) => { schTrips.updated.push(value); });
                            this.oimstripSavescheduledtripsForm(schTrips);
                        } else {
                            this.schTripGrid.setColumnData('cancelBy', undefined);
                            this.schTripGrid.setColumnData('cancelDate', undefined);
                            this.schTripGrid.setColumnData('cancelFlag', false);
                        }
                    });
                } else {
                    const schTrips = { added: [], updated: [], removed: [] };
                    this.schTripGrid.updatedMap.forEach((value, keys) => { schTrips.updated.push(value); });
                    this.oimstripSavescheduledtripsForm(schTrips);
                }
            } else {
                const schTrips = { added: [], updated: [], removed: [] };
                this.schTripGrid.setColumnData('btnStatus', "No");
                this.schTripGrid.updatedMap.forEach((value, keys) => { schTrips.updated.push(value); });
                this.oimstripSavescheduledtripsForm(schTrips);
            }
        });
    }

    validateStaffRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        this.staffassignmentModel.assignedId = event.data.assignedId;
        if (event.field === 'assignedId' && event.data.assignedId) {
            let dupCountstStaff = this.staffRowData.filter((e, i) => (i != rowIndex && e.assignedId === event.data.assignedId)).length;
            if (dupCountstStaff > 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimstrip.samestaffmemberhasalreadybeenselectedforthescheduledtrip');
                this.show();
                this.vehGrid.setColumnData('assignedId', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    validateVhicleRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'assignedId' && event.data.assignedId) {
            let dupCountVehi = this.scheduledtripassignmentsData.filter((e, i) => (i != rowIndex && e.assignedId === event.data.assignedId)).length;
            if (dupCountVehi > 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimstrip.samevehiclehasalreadybeenselectedforthescheduledtrip');
                this.show();
                this.vehGrid.setColumnData('assignedId', rowIndex, undefined);
                this.vehGrid.setColumnData('type', rowIndex, undefined);
                this.vehGrid.setColumnData('make', rowIndex, undefined);
                this.vehGrid.setColumnData('modelNo', rowIndex, undefined);
                this.vehGrid.setColumnData('description', rowIndex, undefined);
                this.vehGrid.setColumnData('optimumCapacity', rowIndex, undefined);
                this.vehGrid.setColumnData('physicalCapacity', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    oimstripSavescheduledtripsForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.scheduledtripsInsertList = event.added
        this.scheduledtripsUpdateList = event.updated
        this.scheduledtripsDeleteList = event.removed
        const scheduledtripsCommitModel = { insertList: [], updateList: [], deleteList: [] };
        if (this.scheduledtripsInsertList.length > 0 || this.scheduledtripsUpdateList.length > 0) {
            for (let i = 0; i < this.scheduledtripsInsertList.length; i++) {
                if (this.scheduledtripsModel.scheduledTripId != undefined ||
                    this.scheduledtripsModel.scheduledTripId != null) {
                    return;
                }
                if (this.scheduledtripsModel.routeName != undefined ||
                    this.scheduledtripsModel.routeName != null) {
                    return;
                }
                if (this.scheduledtripsModel.cancelFlag != undefined ||
                    this.scheduledtripsModel.cancelFlag != null) {
                    return;
                }
                const hrs = DateFormat.getDate(this.scheduledtripsInsertList[i].departureTime).getHours();
                const min = DateFormat.getDate(this.scheduledtripsInsertList[i].departureTime).getMinutes();
                this.scheduledtripsInsertList[i].departureDate = DateFormat.getDate(DateFormat.getDate(this.scheduledtripsInsertList[i].departureDate).setHours(hrs, min, 0, 0));
            }
            for (let i = 0; i < this.scheduledtripsUpdateList.length; i++) {
                this.scheduledtripsUpdateList[i].cancelFlag = this.scheduledtripsUpdateList[i].cancelFlag ? 'Y' : 'N';
                this.scheduledtripsUpdateList[i].departureDate = DateFormat.getDate(this.scheduledtripsUpdateList[i].departureDate);
                this.scheduledtripsUpdateList[i].completionDate = DateFormat.getDate(this.scheduledtripsUpdateList[i].completionDate);
                this.scheduledtripsUpdateList[i].estCompletionTime = DateFormat.getDate(this.scheduledtripsUpdateList[i].estCompletionTime);
            }
            if (this.scheduledtripsUpdateList.length > 0 || this.scheduledtripsInsertList.length > 0) {
                scheduledtripsCommitModel.insertList = this.scheduledtripsInsertList;
                scheduledtripsCommitModel.updateList = this.scheduledtripsUpdateList;
            }
        }
        if (this.scheduledtripsDeleteList.length > 0) {
            for (let i = 0; i < this.scheduledtripsDeleteList.length; i++) {
            }
            scheduledtripsCommitModel.deleteList = this.scheduledtripsDeleteList;
        }
        const scheduledtripsSaveData = this.oimstripService.scheduledtripsCommit(scheduledtripsCommitModel);
        scheduledtripsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.scheduledtripsexecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    //execute query
    scheduledtripsexecuteQuery() {
        this.schTripGrid.showAllButton = false;
        this.scheduledtripsModel = new ScheduledTrips();
        this.scheduledtripsModel.tripCode = this.tripsModel.tripCode;
        const serviceObj = this.oimstripService.scheduledtripsExecuteQuery(this.scheduledtripsModel);
        serviceObj.subscribe(data => {
            if (data && data.length > 0) {
                
                data.forEach(ele => {
                    ele.cancelFlag = ele.cancelFlag === 'Y' ? true : false;
                    ele.departureTime = ele.departureDate;
                    ele.departureDate = DateFormat.getDate(ele.departureDate);
                    ele.completionDate = DateFormat.getDate(ele.completionDate);
                });
                this.scheduledTripsRowData = data;
            } else {
                this.enableInsertVehi = false;
                this.enableInsertStaff = false;
                this.scheduledTripsRowData = [];
                this.staffRowData = [];
                this.scheduledtripassignmentsData = [];
                
            }
        });
    }
    //vehicle assignment
    openOiuselve = (event) => {
        if (event && event.scheduledTripId == null) {
            const node = this.vehGrid.gridOptions.api.getSelectedNodes().length && this.vehGrid.gridOptions.api.getSelectedNodes()[0];
            const rowIndex = node.rowIndex;
            const vehicalModel = {};
            vehicalModel['scheduledTripId'] = this.scheduledtripsModel.scheduledTripId;
            vehicalModel['OIMSTRIP'] = 'OIMSTRIP';
            this.dialogService.openLinkDialog('/OIUSELVE', vehicalModel).subscribe(result => {
                if (result) {
                    this.vehGrid.setColumnData('assignedId', rowIndex, result.vehicleId);
                    this.vehGrid.setColumnData('type', rowIndex, result.type);
                    this.vehGrid.setColumnData('make', rowIndex, result.make);
                    this.vehGrid.setColumnData('modelNo', rowIndex, result.modelNo);
                    this.vehGrid.setColumnData('description', rowIndex, result.description);
                    this.vehGrid.setColumnData('optimumCapacity', rowIndex, result.optimumCapacity);
                    this.vehGrid.setColumnData('physicalCapacity', rowIndex, result.physicalCapacity);
                } else {
                    this.vehGrid.setColumnData('vehicleId', rowIndex, undefined);
                    this.vehGrid.setColumnData('type', rowIndex, undefined);
                    this.vehGrid.setColumnData('make', rowIndex, undefined);
                    this.vehGrid.setColumnData('model', rowIndex, undefined);
                    this.vehGrid.setColumnData('description', rowIndex, undefined);
                    this.vehGrid.setColumnData('optCap', rowIndex, undefined);
                    this.vehGrid.setColumnData('physCap', rowIndex, undefined);
                }
            });
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('oimstrip.cannotaddvehiclebecausenoscheduleexistfortheselectedtrip');
            this.show();
        }
        return false;
    }

    displaybtn = (data, index) => {
        if (data.createDatetime) {
            return true;
        }
        return false;
    }

    scheduledTripAssignmentsExecuteQuery() {
        const scheduledtripassignmentsResult = this.oimstripService.
            scheduledTripAssignmentsExecuteQuery(this.scheduledtripsModel);
        scheduledtripassignmentsResult.subscribe(data => {
            if (data.length === 0) {

                this.scheduledtripassignmentsData = [];
            } else {
                this.scheduledtripassignmentsData = data;
                this.scheduledtripassignmentsModel = data[0];
            }
        });
    }
    /**
    *  This function will be executed when commit event is
    * fired
    */
    oimstripSavescheduledtripassignmentsForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.scheduledtripassignmentsInsertList = event.added
        this.scheduledtripassignmentsUpdateList = event.updated
        this.scheduledtripassignmentsDeleteList = event.removed
        const scheduledtripassignmentsCommitModel = { insertList: [], updateList: [], deleteList: [] };
        if (this.scheduledtripassignmentsInsertList.length > 0 || this.scheduledtripassignmentsUpdateList.length > 0) {
            for (let i = 0; i < this.scheduledtripassignmentsInsertList.length; i++) {
                if (this.scheduledtripsModel.cancelFlag) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimstrip.cannotaddvehiclebecausenoscheduleexistfortheselectedtrip');
                    this.show();
                    return;
                }
                this.scheduledtripassignmentsInsertList[i].createUserId = this.sessionManager.getId();
                this.scheduledtripassignmentsInsertList[i].scheduledTripId = this.scheduledtripsModel.scheduledTripId;
                this.scheduledtripassignmentsInsertList[i].departureDate = this.scheduledtripsModel.departureDate;
                this.scheduledtripassignmentsInsertList[i].completionDate = this.scheduledtripsModel.completionDate;
                this.scheduledtripassignmentsInsertList[i].assignmentType = 'VEHICLE';
            }
            scheduledtripassignmentsCommitModel.insertList = this.scheduledtripassignmentsInsertList;
            scheduledtripassignmentsCommitModel.updateList = this.scheduledtripassignmentsUpdateList;
        }
        if (this.scheduledtripassignmentsDeleteList.length > 0) {
            for (let i = 0; i < this.scheduledtripassignmentsDeleteList.length; i++) {
            }
            scheduledtripassignmentsCommitModel.deleteList = this.scheduledtripassignmentsDeleteList;
        }
        const scheduledtripassignmentsSaveData = this.oimstripService.scheduledTripAssignmentsCommit(scheduledtripassignmentsCommitModel);
        scheduledtripassignmentsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.scheduledTripAssignmentsExecuteQuery();
                this.scheduledtripsexecuteQuery();
            } else if (data === 3) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimstrip.theselectedvehiclehasalreadybeenassignedtoacheduledtrip');
                this.show();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    //staff assignment
    staffassignmentExecuteQuery() {
        this.scheduledtripsModel.cancelDate = DateFormat.getDate(this.scheduledtripsModel.cancelDate);
        this.scheduledtripsModel.completionDate = DateFormat.getDate(this.scheduledtripsModel.completionDate);
        this.scheduledtripsModel.createDatetime = DateFormat.getDate(this.scheduledtripsModel.createDatetime);
        this.scheduledtripsModel.departureDate = DateFormat.getDate(this.scheduledtripsModel.departureDate);
        this.scheduledtripsModel.modifyDatetime = DateFormat.getDate(this.scheduledtripsModel.modifyDatetime);
        const staffassignmentResult = this.oimstripService.
            staffassignmentExecuteQuery(this.scheduledtripsModel);
        staffassignmentResult.subscribe(data => {
            if (data.length === 0) {
                this.staffRowData = [];
            } else {
                data.forEach(e => {
                    e['assignedIdTemp'] = e.assignedId;
                });
                this.staffRowData = data;
                this.staffassignmentModel = data;
            }
        });
    }
    /**
    *  This function will be executed when commit event is
    * fired
    */
    oimstripSavestaffassignmentForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.staffassignmentInsertList = event.added
        this.staffassignmentUpdateList = event.updated
        this.staffassignmentDeleteList = event.removed
       
        const staffassignmentCommitModel = { insertList: [], updateList: [], deleteList: [] };
        if (this.staffassignmentInsertList.length > 0 || this.staffassignmentUpdateList.length > 0) {
            for (let i = 0; i < this.staffassignmentInsertList.length; i++) {
                if (!this.staffassignmentInsertList[i].assignedId) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimstrip.pleaseenterstaffname');
                    this.show();
                    return;
                }
                this.staffassignmentInsertList[i].scheduledTripId = this.scheduledtripsModel.scheduledTripId;
                this.staffassignmentInsertList[i].assignmentType = 'STAFF';
                this.staffassignmentInsertList[i].createUserId = this.sessionManager.getId();

                

                if (this.staffassignmentInsertList[i].scheduledTripId == null) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimstrip.cannotassignstaffbecausenoscheduleexistfortheselectedtrip');
                    this.show();
                    return;
                }

                const index=this.staffRowData.indexOf(this.staffassignmentInsertList[i]);
                     for(let j=0;j<this.staffRowData.length;j++){
                        if(index != j && this.staffRowData[j].assignedId === this.staffassignmentInsertList[i].assignedId){
                            this.type = 'warn';
                            this.message = this.translateService.translate('oimstrip.samestaffmemberhasalreadybeenselectedforthescheduledtrip');
                            this.show();
                            return ;
                        }
                    }
                
            }
            for (let i = 0; i < this.staffassignmentUpdateList.length; i++) {
                this.staffassignmentUpdateList[i].assignedId = this.staffassignmentModel.assignedId;
                this.staffassignmentUpdateList[i].scheduledTripId = this.scheduledtripsModel.scheduledTripId;
                this.staffassignmentUpdateList[i].modifyUserId = this.sessionManager.getId();
            }
            staffassignmentCommitModel.insertList = this.staffassignmentInsertList;
            staffassignmentCommitModel.updateList = this.staffassignmentUpdateList;
        }
        if (this.staffassignmentDeleteList.length > 0) {
            staffassignmentCommitModel.deleteList = this.staffassignmentDeleteList;
        }
        const staffassignmentSaveData = this.oimstripService.staffassignmentCommit(staffassignmentCommitModel);
        staffassignmentSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.staffassignmentExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
}
