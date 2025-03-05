import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from "@common/translate/translate.service";
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { TimeFormat } from '@core/ui-components/time/timeFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { interval, Subscription, timer } from 'rxjs';
import { IncidentStaffReport } from '../beans/IncidentStaffReport';
import { IncidentStaffReportCommitBean } from '../beans/InidentStaffReportCommitBean';
import { OidstfrpCommonCommitBean } from '../beans/OidstfrpCommonCommitBean';
import { StaffEquipment } from '../beans/StaffEquipment';
import { StaffEquipmentCommitBean } from '../beans/StaffEquipmentCommitBean';
import { StaffForce } from '../beans/StaffForce';
import { StaffForceCommitBean } from '../beans/StaffForceCommitBean';
import { IncidentSearchService } from '../service/incident-search.service';
import { OidstfrpService } from '../service/oidstfrp.service';

@Component({
    selector: 'app-oidstfrpdialog',
    templateUrl: './oidstfrpdialog.component.html',
    styleUrls: ['./oidstfrpdialog.component.css']
})
export class OidstfrpdialogComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    @ViewChild('forcegrid', { static: true }) forcegrid: any;
    @ViewChild('equipmentgrid', { static: true }) equipmentgrid: any;
    staffmemberClm: any[];
    staffmemberrcd: any[];
    staffMemberData: any[];
    visible: boolean = false;
    lockedFlag: boolean;
    flag: boolean = false;
    Appflag: boolean;
    staffReportCommitBean: IncidentStaffReportCommitBean = new IncidentStaffReportCommitBean();
    listStaffReport: IncidentStaffReport[] = [];
    type = 'error';
    msglist = [];
    msgs: any[] = [];
    incidentReportId: any;
    message = ' Invalid.';
    readonlyReqiured: boolean = false;
    StaffDataModel = new IncidentStaffReport();
    tableIndex = 0;
    agencyIncidentId: any;
    incidentStaffReportTemp: any;
    incidentStaffReport: IncidentStaffReport;
    staffempty: any;
    incidentReport = new IncidentStaffReport();
    useOfForceclm: any[];
    equipmentUsedcln: any[];
    StaffForceInsertList: StaffForce[] = [];
    StaffForceUpdatetList: StaffForce[] = [];
    StaffForceDeleteList: StaffForce[] = [];
    StaffEquipmentInsertList: StaffEquipment[] = [];
    StaffEquipmentUpdatetList: StaffEquipment[] = [];
    StaffEquipmentDeleteList: StaffEquipment[] = [];
    StaffForceCommitBean = new StaffForceCommitBean();
    StaffEquipmentCommitBean = new StaffEquipmentCommitBean();
    reportTypeDisable: boolean;
    incidentReportIdDisable: boolean;
    reportDateDisable: boolean;
    reportTimeDisable: boolean;
    incidentDetailsDisable: boolean;
    lockedFlagDisable: boolean = false;
    useOfForceRowData: StaffForce[] = [];
    equipementRowData: StaffEquipment[] = [];
    StaffForceModel = new StaffForce();
    StaffEquipementModel = new StaffEquipment();
    forceUsedTemp: any[] = [];
    staffId: any;
    sequenceNumber: any;
    currenDateTime: any;
    staffFullName: any;
    staffobj: any;
    userID: any;
    EquCheck: boolean;
    incidentStaffReportTempData: IncidentStaffReport = new IncidentStaffReport();
    commonCommitBean: OidstfrpCommonCommitBean = new OidstfrpCommonCommitBean();
    completeChanged: boolean = false; date: Date;
    now: number;
    staffIdLog: boolean;
    enhanceStaff: boolean;
    lockIncidentField: boolean;
    incidentPartySeq: number;
    public dateNow = new Date();
    public dDay = new Date();
    milliSecondsInASecond = 1000;
    hoursInADay = 24;
    minutesInAnHour = 60;
    SecondsInAMinute = 60;

    public timeDifference;
    public secondsToDday;
    public minutesToDday;
    public hoursToDday;
    public daysToDday: number = 0;
    public months;
    subscription: Subscription;
    current: any;
    targetTime: any;
    hours: number;
    monthsCheck: any;
    month: number;
    monthsInYear: any;
    count: number = 0;
    displayTimer : boolean = true;
    lockFlagChange: boolean;
    stafftReportModel:IncidentStaffReport=new IncidentStaffReport();
    flagChange: boolean;
    constructor(public translateService: TranslateService, public dialogService: DialogService,
        private oidstfrpservice: OidstfrpService, private incidentSearchService: IncidentSearchService, private location: Location, private sessionManager: UserSessionManager,) {
    }

    ngOnInit() {
        this.staffobj = this.sessionManager.userSessionDetails().staff;
        this.staffFullName = this.staffobj.firstName + "_" + this.staffobj.lastName;
        this.incidentStaffReport = new IncidentStaffReport();
        this.incidentStaffReport.reportDate = DateFormat.getDate();
        this.incidentStaffReport.reportTime = TimeFormat.parse(TimeFormat.format(DateFormat.getDate()));
        this.incidentStaffReport.reportType = this.dialog.data.data.reportType;
        if (this.staffobj.staffId === this.dialog.data.data.staffId) {
            this.staffIdLog = true;
            this.readonlyReqiured = true;
        }
        else{
            this.staffIdLog = false;
            this.readonlyReqiured = true;
        }
        let queryDocumentId = this.dialog.data.data.reportParam;
        this.enhanceStaff = this.dialog.data.data.enhancUser;
        this.incidentPartySeq = this.dialog.data.data.partySeq;
        if(this.dialog.data.maintData.automaticFlag === 'Y') {
            this.displayTimer = true;
            this.current = DateFormat.getDate(DateFormat.getDate(this.dialog.data.maintData.createDatetime));
        } else {
            this.displayTimer = false;
        }
        if (queryDocumentId) {
            let queryParams = queryDocumentId.split("~");
            this.agencyIncidentId = queryParams[0]
            this.staffId = queryParams[1];
            this.getStaffReportById();
            this.StaffForceDetails();
            this.StaffEquipementDetails();

        }
        this.useOfForceclm = [
            {
                fieldName: this.translateService.translate('oidstfrp.sequence'), field: 'listSeq', cellEditable: this.canSqeEdit,
                width: 150, datatype: 'number', minValue: 1, strictFP: true, whole: true,  required: true, editable: true
            },
            {
                fieldName: this.translateService.translate('oidstfrp.forceused'), field: 'forceUsed', datatype: 'lov', domain: 'INC_STF_FRCE', 
                cellEditable: this.canSqeEdit,
                editable: true, width: 100, required: true

            },
            {
                fieldName: this.translateService.translate('oidstfrp.reasonforceused'), field: 'reasonForceUsed', datatype: 'lov', domain: 'INC_FRC_REA',
                 cellEditable: this.canSqeEdit,
                editable: true, width: 100, required: true

            },
            {
                fieldName: this.translateService.translate('oidstfrp.details'), maxlength:240,
                field: 'forceDetail', datatype: 'text', uppercase: 'false', editable: false, width: 150, tooltip: true,
                wrapText: true, maxWidth: 500,
            },

            {
                fieldName: '', field: 'edit', displayas: 'image',
                editable: true, width: 150, datatype: 'hyperlink', modal: true, data: 'row', updateField: 'row',
                onLaunchClick: this.queryLaunchClick
            },

        ];
        this.equipmentUsedcln = [
            {
                fieldName: this.translateService.translate('oidstfrp.equipmenrusedcolumn') + '*', field: 'equipmentUsed', datatype: 'lov', domain: 'INC_STF_EQUP',
                editable: true, width: 250, cellEditable: this.canEquEdit
            },
            {
                fieldName: this.translateService.translate('oidstfrp.details'),
                field: 'equipmentDetail',uppercase: 'false', editable: false, tooltip: true, maxWidth:500,
                wrapText: true, width: 150, datatype: 'text', maxlength: 240
            },
            {
                fieldName: '', field: 'edit', displayas: 'image', 
                editable: true, width: 150, datatype: 'hyperlink', modal: true, data: 'row', updateField: 'row',
                onLaunchClick: this.equipemntLaunchClick 
            },
        ];

        this.subscription = interval(1000)
            .subscribe(x => { this.getTimeDifference(); });


    }
    get daysToDdays() {
        this.getCountDown();
        return this.daysToDday;
    }
    getCountDownTime() {
        if(this.displayTimer){
            this.oidstfrpservice.getCountDownTime(this.incidentStaffReport).subscribe(data => {
                if (data) {
                    // this.displayTimer = true;
                        if (data.createDatetime) {
                            this.current = DateFormat.getDate(data.createDatetime);
                        }
                }
    
            });
        }
    }


    canEquEdit = (data: any, index: number, field: string) => {
        if (this.staffIdLog && !this.lockedFlagDisable) {
            return true;
        }
        if (this.staffIdLog && field === 'equipmentUsed' && !data.incidentReportId) {
            return true;
        }
        return false;
    }
    canSqeEdit = (data: any, index: number, field: string) => {
        if (this.staffIdLog && !this.lockedFlagDisable && !data.createDateTime) {
            return true;
        }

        if (this.staffIdLog && field === 'listSeq' && !data.incidentReportId && !data.createDateTime) {
            return true;
        }
        return false;
    }
    appendReportDialog() {
        this.dialogService.openLinkDialog('/OIUIRAME', 50, 40).subscribe(result => {
            if (result != null && !(result == "Y")) {
                this.userID = this.sessionManager.getId();
                this.currenDateTime = DateFormat.getDate();
                const dateFormated = DateFormat.format(this.currenDateTime);
                const appenTtime = TimeFormat.format(this.currenDateTime);
                if (this.incidentStaffReport.reportDetails == null) {
                    this.incidentStaffReport.reportDetails = '';

                }
                this.incidentStaffReport.reportDetails += " [" + this.userID + " " + dateFormated + " " + appenTtime + "]" + " " + result;

                this.getCommitStaffReport('append');
            }
        });
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    lockedChange(event) {

        if (event.checked) {
            if (!this.incidentStaffReport.reportType == null) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstfrp.incidentdetailsmustbeentered');
                this.show();
                event.checked = false;
                return;
            }
            if (this.readonlyReqiured && (this.incidentStaffReport.reportDetails === undefined || this.incidentStaffReport.reportDetails == null
                || this.incidentStaffReport.reportDetails.trim().length === 0)) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstfrp.incidentdetailsrequired');
                this.show();
                event.checked = false;
                return;
            }
            this.completeChanged = true;
            this.incidentStaffReport.lockFlag = 'Y'
            this.flagChange = true;
        } else {
            event.checked = false;
            this.completeChanged = false;
            this.incidentStaffReport.lockFlag = 'N'
            this.lockFlagChange = false;
        }
    }

    getStaffReportById() {
        this.flagChange=false;
        this.StaffDataModel.agencyIncidentId = this.agencyIncidentId;
        this.StaffDataModel.staffId = this.staffId;
        this.StaffDataModel.partySeq = this.incidentPartySeq;
        const serviceObj = this.oidstfrpservice.staffReportExecuteQuery(this.StaffDataModel);
        serviceObj.subscribe(data => {
            if (data.length > 0) {

                this.incidentStaffReportTemp = data;
                for (let i = 0; i < this.incidentStaffReportTemp.length; i++) {
                    this.incidentStaffReport.incidentReportId = this.incidentStaffReportTemp[i].incidentReportId;
                    this.incidentStaffReport.reportDate = this.incidentStaffReportTemp[i].reportTime;
                    this.incidentStaffReport.reportDetails = this.incidentStaffReportTemp[i].reportDetails;
                    this.incidentStaffReport.reportType = this.incidentStaffReportTemp[i].reportType;
                    this.incidentStaffReport.staffId = this.incidentStaffReportTemp[i].staffId;
                    this.incidentStaffReport.lockedBy = this.incidentStaffReportTemp[i].lockedBy;
                    this.incidentStaffReport.reportTime = TimeFormat.parse(TimeFormat.format(this.incidentStaffReportTemp[i].reportTime));
                    this.incidentStaffReport.lockFlag = this.incidentStaffReportTemp[i].lockFlag;
                    this.incidentStaffReport.lockReferenceTime = this.incidentStaffReportTemp[i].lockReferenceTime;
                    if (this.incidentStaffReport.lockFlag == 'Y') {
                        this.flag = true;
                        this.reportTypeDisable = true;
                        this.incidentReportIdDisable = true;
                        this.reportDateDisable = true;
                        this.reportTimeDisable = true;
                        this.lockedFlagDisable = true;
                        this.visible = true;
                    } else {
                        this.flag = false;
                        this.reportTypeDisable = false;
                        this.incidentReportIdDisable = false;
                        this.reportDateDisable = this.staffIdLog ? false : true;
                        this.reportTimeDisable = this.staffIdLog ? false : true;
                        this.lockedFlagDisable = false;
                    } 
 if ((DateFormat.compareDateTime(DateFormat.getDate(  this.incidentStaffReport.lockReferenceTime),
  DateFormat.getDate(this.incidentStaffReportTemp[i].createDateTime)) !== 0) ||
                (this.lockedFlagDisable ))
               {
             
                        this.Appflag = true;
                        this.lockIncidentField =  true;
                    } else {
                        this.Appflag = false;
                        this.lockIncidentField =false ;
                    }
  
}     

                this.incidentStaffReportTempData = JSON.parse(JSON.stringify(this.incidentStaffReport));
            } else {
                this.incidentStaffReportTempData = new IncidentStaffReport();
            }
        });
    }

    clearQuery() {
        if (!this.flag) {
            this.staffempty = new IncidentStaffReport();
            this.staffempty.reportDate = DateFormat.getDate();
            this.staffempty.reportTime = TimeFormat.parse(TimeFormat.format(DateFormat.getDate()));
            this.incidentStaffReport = this.staffempty;
        }
    }

    getCommitStaffReport(event?) {
        this.staffReportCommitBean = new IncidentStaffReportCommitBean();
        this.incidentStaffReport.agencyIncidentId = this.agencyIncidentId;
        this.incidentStaffReport.staffId = this.staffId;
        this.incidentStaffReport.partySeq = this.incidentPartySeq;
        if (this.incidentStaffReport.reportType == null || this.incidentStaffReport.reportType == undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidstfrp.reporttypemust');
            this.show();
            return false;
        }

        if (!this.incidentStaffReport.reportDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidstfrp.datewarn');
            this.show();
            return false;

        }
        if (!this.incidentStaffReport.reportTime) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidstfrp.Timewarn');
            this.show();
            return false;

        }
        if (this.flag) {
            this.incidentStaffReport.lockFlag = 'Y';
        } else {
            this.incidentStaffReport.lockFlag = 'N';
        }
        if(this.flag){
            this.incidentStaffReport.repCompletFlag ='Y';
        }else {
            this.incidentStaffReport.repCompletFlag = 'N';
        }
        if (this.incidentStaffReportTempData && this.incidentStaffReportTempData.lockFlag !== 'Y' && this.flag) {
            this.incidentStaffReport.lockedBy = this.staffobj.staffId;
        }
        let startHours = DateFormat.getDate(this.incidentStaffReport.reportTime).getHours();
        let startMinutes = DateFormat.getDate(this.incidentStaffReport.reportTime).getMinutes();
        let startSeconds = DateFormat.getDate(this.incidentStaffReport.reportTime).getSeconds();
        this.incidentStaffReport.reportTime = DateFormat.getDate(DateFormat.getDate( this.incidentStaffReport.reportDate).setHours(startHours, startMinutes, 0, 0));
        
        this.listStaffReport.push(this.incidentStaffReport);

        if (this.listStaffReport) {
            for (let i = 0; i < this.listStaffReport.length; i++) {
                if (!this.listStaffReport[i].incidentReportId) {
                    this.staffReportCommitBean.insertList = this.listStaffReport;
                } else {
                    this.staffReportCommitBean.updateList = this.listStaffReport;
                }
            }
        }
        this.commonCommitBean.staffReportCommitList = this.staffReportCommitBean;
        if (event && event === 'append') {
            const staffIncident = this.oidstfrpservice.staffReportCommitData(this.staffReportCommitBean);
            staffIncident.subscribe(staffInvolvementdata => {
                if (staffInvolvementdata === 0) {
                    this.type = 'error';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    return;
                } else if (staffInvolvementdata === 2) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstfrp.recordnot');
                    this.show();
                    return;
                } else {
                    this.listStaffReport = [];
                    this.incidentReport.incidentReportId = staffInvolvementdata;

                    this.incidentStaffReport.incidentReportId = this.incidentReport.incidentReportId;
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    if (this.incidentStaffReport.incidentReportId) {
                        this.getStaffReportById();
                    }
                    setTimeout(() => {
                        if (this.incidentStaffReport.lockFlag === 'N' && this.incidentStaffReportTempData.lockFlag === 'Y') {
                            this.getCountDownTime();
                        }
                    }, 100);
                }

            });
        }
        return true;

    }

    onGridInsertOffforce = () => {
        this.EquCheck = true;
        let seq = 0;
        this.useOfForceRowData.forEach(e => {
            if (Number(e.listSeq) > seq) {
                seq = Number(e.listSeq);
            }
        });
        return {
            listSeq: seq + 1, ForceUsed: '', ForceDetail: '', edit: 'assets/icons/eoff_icons/edit_24x24_sm.png'
        };
    }


    onGridInsertOffEquipment = () => {
        this.EquCheck = true;
        return {
            EquipmentUsed: '', EquipmentDetail: '', edit: 'assets/icons/eoff_icons/edit_24x24_sm.png'
        };
    }

    StaffForceDetails() {
        this.StaffForceModel.agencyIncidentId = this.agencyIncidentId;
        this.StaffForceModel.listSeq = this.sequenceNumber;
        this.StaffForceModel.staffId = this.staffId;
        this.StaffForceModel.partySeq = this.incidentPartySeq;
        this.StaffForceModel.incidentReportId = this.dialog.data.data.incidentReportId;
        const serviceObj = this.oidstfrpservice.staffforceExecuteQuery(this.StaffForceModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.useOfForceRowData = [];
            } else {
                this.useOfForceRowData = data;
                this.useOfForceRowData.forEach((element) => {
                    element['edit'] = 'assets/icons/eoff_icons/edit_24x24_sm.png';
                    element.sequenceNumberTemp = element.listSeq;

                });
                this.StaffForceModel = data[0];
            }
        });

    }

    StaffEquipementDetails() {
        this.StaffEquipementModel.staffId = this.staffId;
        this.StaffEquipementModel.agencyIncidentId = this.agencyIncidentId;
        this.StaffEquipementModel.partySeq = this.incidentPartySeq;
        this.StaffEquipementModel.incidentReportId = this.dialog.data.data.incidentReportId;
        const serviceObj = this.oidstfrpservice.staffEquipementExecuteQuery(this.StaffEquipementModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.equipementRowData = [];
            } else {
                this.equipementRowData = data;
                this.equipementRowData.forEach((element) => {
                    element['edit'] = 'assets/icons/eoff_icons/edit_24x24_sm.png';
                    element.equipmentUsedTemp = element.equipmentUsed;


                });
                this.StaffEquipementModel = data[0];
            }
        });

    }

    onbackBtnClick = () => {
        this.incidentSearchService.setAgencyIncidentId(this.agencyIncidentId);
        this.location.back();
    }

    staffforceDatacommit(event) {

        for (let i = 0; i < this.useOfForceRowData.length; i++) {
            for (let j = 0; j < this.useOfForceRowData.length; j++) {
                if (i != j && this.useOfForceRowData[i].listSeq == this.useOfForceRowData[j].listSeq) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstfrp.uniqueSequence');
                    this.show();
                    return false;
                }
            }
        }
       
        this.StaffForceInsertList = [];
        this.StaffForceUpdatetList = [];
        this.StaffForceDeleteList = [];
        this.StaffForceInsertList = event.added;
        this.StaffForceUpdatetList = event.updated;
        this.StaffForceDeleteList = event.removed;
        if (this.StaffForceInsertList.length > 0) {
            for (let i = 0; i < this.StaffForceInsertList.length; i++) {
                if (this.StaffForceInsertList[i].listSeq < 0  ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstfrp.sequencenotnegative');
                    this.show();
                    return false;
                }
                if (this.StaffForceInsertList[i].listSeq == 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstfrp.seqmustnotbezero');
                    this.show();
                    return false;
                }
                if (!this.StaffForceInsertList[i].listSeq) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstfrp.sequencemust');
                    this.show();
                    return false;
                }
                if (this.StaffForceInsertList[i].listSeq  > 32767  ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstfrp.seqmustdoesnot');
                    this.show();
                    return false;
                }
                if (!this.StaffForceInsertList[i].forceUsed) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstfrp.forceusedmust');
                    this.show();
                    return false;
                }
                if (!this.StaffForceInsertList[i].reasonForceUsed) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstfrp.reasonforceusedmust');
                    this.show();
                    return false;
                }
                
                this.StaffForceInsertList[i].partySeq = this.incidentPartySeq;
                this.StaffForceInsertList[i].agencyIncidentId = this.agencyIncidentId;
                this.StaffForceInsertList[i].staffId = this.staffId;
                this.StaffForceInsertList[i].incidentReportId = this.dialog.data.data.incidentReportId;
            }
        }
        if (this.StaffForceUpdatetList.length > 0) {
            for (let i = 0; i < this.StaffForceUpdatetList.length; i++) {
                if (!this.StaffForceUpdatetList[i].forceUsed) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstfrp.forceusedmust');
                    this.show();
                    return false;
                }
                if (this.StaffForceUpdatetList[i].listSeq < 0  ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstfrp.sequencenotnegative');
                    this.show();
                    return false;
                }
                if (!this.StaffForceUpdatetList[i].reasonForceUsed) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstfrp.reasonforceusedmust');
                    this.show();
                    return false;
                }

                if (this.StaffForceUpdatetList[i].listSeq == 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstfrp.seqmustnotbezero');
                    this.show();
                    return false;
                }

                if (this.StaffForceUpdatetList[i].listSeq  > 32767  ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstfrp.seqmustdoesnot');
                    this.show();
                    return false;
                }
               
                this.StaffForceUpdatetList[i].agencyIncidentId = this.agencyIncidentId;
                this.StaffForceUpdatetList[i].staffId = this.staffId;
            }
        }
        if (this.StaffForceDeleteList.length > 0) {
            for (let i = 0; i < this.StaffForceDeleteList.length; i++) {
                this.StaffForceDeleteList[i].agencyIncidentId = this.agencyIncidentId;
                this.StaffForceDeleteList[i].staffId = this.staffId;
            }

        }
        this.StaffForceCommitBean.insertList = this.StaffForceInsertList;
        this.StaffForceCommitBean.updateList = this.StaffForceUpdatetList;
        this.StaffForceCommitBean.deleteList = this.StaffForceDeleteList;
        this.commonCommitBean.staffForceCommitList = this.StaffForceCommitBean;
        return true;
    }

    staffEquipmentCommitRow(event) {
        for (let i = 0; i < this.equipementRowData.length; i++) {
            for (let j = 0; j < this.equipementRowData.length; j++) {
                if (i != j && this.equipementRowData[i].equipmentUsed == this.equipementRowData[j].equipmentUsed) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstfrp.eqpalreadyexist');
                    this.show();
                    return false;
                }
            }
        }
        this.StaffEquipmentInsertList = [];
        this.StaffEquipmentUpdatetList = [];
        this.StaffEquipmentDeleteList = [];
        this.StaffEquipmentInsertList = event.added;
        this.StaffEquipmentUpdatetList = event.updated;
        this.StaffEquipmentDeleteList = event.removed;
        //This is commented because Party Seq needs to come from the parent screen and used as parameter in execute query .
        /* var maxparty = 1;
         if (event.added != null && event.added.length > 0) {
            for (let i = 0; i < this.equipementRowData.length; i++) {
                if ((this.equipementRowData[i].equipmentUsed == event.added[0].equipmentUsed) && (this.equipementRowData[i].partySeq > maxparty)) {
                    maxparty = this.equipementRowData[i].partySeq;
                }
            }
        } */

        if (this.StaffEquipmentInsertList.length > 0) {
            for (let i = 0; i < this.StaffEquipmentInsertList.length; i++) {
                if (!this.StaffEquipmentInsertList[i].equipmentUsed) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstfrp.equipmentusedneedsmust');
                    this.show();
                    return false;
                }
                this.StaffEquipmentInsertList[i].agencyIncidentId = this.agencyIncidentId;
                this.StaffEquipmentInsertList[i].staffId = this.staffId;
                this.StaffEquipmentInsertList[i].incidentReportId = this.dialog.data.data.incidentReportId;
                /*  if (maxparty == 1) {
                     this.StaffEquipmentInsertList[i].partySeq;
                 }
                 this.StaffEquipmentInsertList[i].partySeq = maxparty + 1; */
                this.StaffEquipmentInsertList[i].partySeq = this.incidentPartySeq;
            }
        }
        if (this.StaffEquipmentUpdatetList.length > 0) {
            for (let i = 0; i < this.StaffEquipmentUpdatetList.length; i++) {
                this.StaffEquipmentUpdatetList[i].agencyIncidentId = this.agencyIncidentId;
                this.StaffEquipmentUpdatetList[i].staffId = this.staffId;
            }
        }
        if (this.StaffEquipmentDeleteList.length > 0) {
            for (let i = 0; i < this.StaffEquipmentDeleteList.length; i++) {
                this.StaffEquipmentDeleteList[i].agencyIncidentId = this.agencyIncidentId;
                this.StaffEquipmentDeleteList[i].staffId = this.staffId;
            }
        }
        this.StaffEquipmentCommitBean.insertList = this.StaffEquipmentInsertList;
        this.StaffEquipmentCommitBean.updateList = this.StaffEquipmentUpdatetList;
        this.StaffEquipmentCommitBean.deleteList = this.StaffEquipmentDeleteList;
        this.commonCommitBean.staffEquipmentCommitList = this.StaffEquipmentCommitBean;
        return true;
    }

    commonSave() {
        this.commonCommitBean = new OidstfrpCommonCommitBean();
        const forceGridEvent = { added: [], updated: [], removed: [], offNadAdded: [], offNadUpdated: [] };
        const equipGridEvent = { added: [], updated: [], removed: [], offNadAdded: [], offNadUpdated: [] };
        let isChanged = false;
        if (this.readonlyReqiured && (this.incidentStaffReport.reportDetails === undefined || this.incidentStaffReport.reportDetails == null
            || this.incidentStaffReport.reportDetails.trim().length === 0)) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidstfrp.incidentdetailsrequired');
            this.show();
            return false;
        }
        if (this.completeChanged || JSON.stringify(this.incidentStaffReport) != JSON.stringify(this.incidentStaffReportTempData)) {
            if (!this.getCommitStaffReport()) {
                return;
            }
        }

        if ((DateFormat.compareDate(DateFormat.getDate( this.incidentStaffReport.reportDate), DateFormat.getDate( this.dialog.data.incidentDate)) === -1)){
            this.type = 'warn';
            this.message = this.translateService.translate('oidstfrp.reporteddateearliervalidation');
            this.show();
            return false;
        }

        if (this.forcegrid) {
            const added = [];
            this.forcegrid.addedMap.forEach((value, keys) => { isChanged = true; added.push(value); });
            const removed = [];
            this.forcegrid.removedMap.forEach((value, keys) => { isChanged = true; removed.push(value); });
            const updated = [];
            this.forcegrid.updatedMap.forEach((value, keys) => { isChanged = true; updated.push(value); });
            forceGridEvent.added = added;
            forceGridEvent.updated = updated;
            forceGridEvent.removed = removed;

            if (!this.staffforceDatacommit(forceGridEvent)) {
                return;
            }

        }

        if (this.equipmentgrid) {
            const added = [];
            this.equipmentgrid.addedMap.forEach((value, keys) => { isChanged = true; added.push(value); });
            const removed = [];
            this.equipmentgrid.removedMap.forEach((value, keys) => { isChanged = true; removed.push(value); });
            const updated = [];
            this.equipmentgrid.updatedMap.forEach((value, keys) => { isChanged = true; updated.push(value); });
            equipGridEvent.added = added;
            equipGridEvent.updated = updated;
            equipGridEvent.removed = removed;

            if (!this.staffEquipmentCommitRow(equipGridEvent)) {
                return;
            }
        }
        if ((this.listStaffReport && this.listStaffReport.length > 0) || isChanged) {
            this.staffReportCommonSave();
        }

    }

    staffReportCommonSave() {
        const serviceObj = this.oidstfrpservice.staffReportCommonSave(this.commonCommitBean);
        serviceObj.subscribe(data => {

            if (data === 0) {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            } else if (data === 2) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstfrp.recordnot');
                this.show();
                return;
            }
            else if (data === 3) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstfrp.seqalreadyexists'); 
                this.show();
                return;
            } 
            else if (data === 4) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstfrp.eqpalreadyexist'); 
                this.show();
                return;
            }  else if (data === 5) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstfrp.seqmustdoesnot'); 
                this.show();
                return;
            } else {
                this.completeChanged = false;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                if(this.incidentStaffReport.lockFlag === 'N' && this.incidentStaffReportTempData.lockFlag === 'Y'){
                    this.getCountDownTime();
                }
                if (this.listStaffReport && this.listStaffReport.length > 0) {
                    this.listStaffReport = [];
                    this.getStaffReportById();
                }
                if (this.StaffForceInsertList.length > 0 || this.StaffForceUpdatetList.length > 0 ||
                    this.StaffForceDeleteList.length > 0) {
                    this.StaffForceDetails();

                }
                if (this.StaffEquipmentInsertList.length > 0 || this.StaffEquipmentUpdatetList.length > 0 ||
                    this.StaffEquipmentDeleteList.length > 0) {
                    this.StaffEquipementDetails();
                }
            }
        });
    }

    get commonSaveDisable() {
        if(this.incidentStaffReport.lockFlag == 'Y' && !this.flagChange){
            return true;
        } 
        if (JSON.stringify(this.incidentStaffReport) != JSON.stringify(this.incidentStaffReportTempData)) {
            return false;
        } else if (this.forcegrid.addedMap.size > 0 || this.forcegrid.updatedMap.size > 0 ||
            this.forcegrid.removedMap.size > 0) {
            return false;
        } else if (this.equipmentgrid.addedMap.size > 0 || this.equipmentgrid.updatedMap.size > 0 ||
            this.equipmentgrid.removedMap.size > 0) {
            return false;
        }
        return true;
    }

    get getDis() {
        if (!this.enhanceStaff && (this.lockedFlagDisable || ((this.incidentStaffReport.reportType && this.incidentStaffReport.reportDetails) ? false : true))) {
            return true;
        }
        return false;
    }

    onGridClear = () => {
        this.StaffForceDetails();

        return true;

    }

    onButExitclick() {
        this.dialog.close(null);
    }

    private getTimeDifference() {
        this.getCountDown();
    }

    getCountDown() {
        var date = DateFormat.getDate();
        this.current = DateFormat.getDate(this.current.setSeconds(date.getSeconds(), 0));
        var diffMs = (this.current.getTime() - date.getTime()); // milliseconds between lockReferenceTime & currentTime
        if (diffMs > 0) {
            this.daysToDday = Math.floor(diffMs / 86400000); // days
            this.hoursToDday = Math.floor((diffMs % 86400000) / 3600000); // hours
            var min = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
            this.minutesToDday = min > 0 ? min - 1 : min;
            this.secondsToDday =  60 - date.getSeconds(); // seconds
            this.lockFlagChange = true;
            if(this.secondsToDday == 10 &&  this.minutesToDday == 0 && this.hoursToDday == 0 && (this.incidentStaffReport.lockFlag == 'N'|| this.flagChange)) {
                // this.type = 'warn';
                // this.message = this.translateService.translate('plese save the chages screen will be locked in 10 seconds'); 
                // this.show();
          const data = {
            label: this.translateService.translate('oidstfrp.screenwillbelocked'),
            okBtn: true,
          };
          this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {});
            }
        }
        else {
            this.hoursToDday = 0;
            this.minutesToDday = 0;
            this.secondsToDday = 0;
            this.lockStRpscreen();
        }
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    queryLaunchClick = (data) => {

        if(this.flag || !this.staffIdLog){ 
            return;
        }

        this.dialogService.openLinkDialog('/staffreportdetail', data, 80).subscribe(result => {
            if (result) {
                const node = this.forcegrid.gridOptions.api.getSelectedNodes().length && this.forcegrid.gridOptions.api.getSelectedNodes()[0];
                if (node) {
                    node.setDataValue('forceDetail', result);
                }
            }
        });
    }

    equipemntLaunchClick = (data) => {
        if(this.flag || !this.staffIdLog){ 
            return;
        }
        this.dialogService.openLinkDialog('/staffreportdetail', data, 80).subscribe(result => {
            if (result) {
                const node = this.equipmentgrid.gridOptions.api.getSelectedNodes().length && this.equipmentgrid.gridOptions.api.getSelectedNodes()[0];
                if (node) {
                    node.setDataValue('equipmentDetail', result);
                }
            }
        });
    }
    lockStRpscreen(){
        if((this.lockFlagChange &&( this.incidentStaffReport.lockFlag == 'N'|| this.flagChange)) || (this.lockFlagChange == undefined && this.incidentStaffReport.lockFlag == 'N')){
            this.lockFlagChange=false;
            this.stafftReportModel.lockFlag = 'Y';
            this.stafftReportModel.repCompletFlag = 'Y';
            this.stafftReportModel.agencyIncidentId= this.agencyIncidentId;
            this.stafftReportModel.incidentReportId = this.dialog.data.data.incidentReportId;
             const result=this.oidstfrpservice.updateLockflag(this.stafftReportModel);
             result.subscribe(data=>{
              if(data){
                this.getStaffReportById();
                this.StaffForceDetails();
                this.StaffEquipementDetails();
                // this.dialog.close(null);
              }
             })
      }
    }
}
