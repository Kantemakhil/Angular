import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { SchedulerService } from '@core/ui-components/schedule/scheduler.service';
import { VOffenderAllSchedules } from '@inst/schedules/beans/VOffenderAllSchedules';
import { OidsiappService } from '@inst/schedules/service/oidsiapp.service';
import { OcrwapstReportBean } from '../beans/OcrwapstReportBean';
import { OffenderEmTagDetails } from '../beans/OffenderEmTagDetails';
import { OffenderEmTagDetailsCommitBean } from '../beans/OffenderEmTagDetailsCommitBean';
import { WeeklyActivityPlans } from '../beans/WeeklyActivityPlans';
import { WeeklyActivityPlansCommitBean } from '../beans/WeeklyActivityPlansCommitBean';
import { WeeklyActivityPlansHty } from '../beans/WeeklyActivityPlansHty';
import { WeeklyActivityPlansHtyCommitBean } from '../beans/WeeklyActivityPlansHtyCommitBean';
import { OweacplnService } from '../service/oweacpln.service';
// import required bean declarations

@Component({
    selector: 'app-oweacpln',
    templateUrl: './oweacpln.component.html'
})

export class OweacplnComponent implements OnInit, OnDestroy {

    @ViewChild('weeklyGrid', { static: true }) weeklyGrid: any;
    msgs: { message: any; type: any; }[];
    ctrlpsFromDate: any;
    type: string;
    message: string;
    ctrlpsToDate: any;
    emTag: any;
    emTagStrapSize: any;
    emdailyChargingStart: any;
    emdailyChargingEnd: any;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    weeklyActivityColumnDef: any[];
    weeklyActivityData: any[];
    weeklyActivityMavVersionData: any[];
    weeklyActivityDataTemp: any[];
    weeklyActivityIndex: any;
    ctrlpsFromDateReadOnly: boolean = false;
    searchDisabled: boolean = true;
    clearDisabled: boolean = true;
    offenderEmTagDetails: OffenderEmTagDetails = new OffenderEmTagDetails();
    offenderEmTagDetailsTemp: OffenderEmTagDetails = new OffenderEmTagDetails();
    offenderEmTagSearchDetails: OffenderEmTagDetails = new OffenderEmTagDetails();
    offenderEmTagDetailsInsertList: OffenderEmTagDetails[] = [];
    offenderEmTagDetailsUpdatetList: OffenderEmTagDetails[] = [];
    offenderEmTagDetailsDeleteList: OffenderEmTagDetails[] = [];
    offenderEmTagDetailsCommitBean: OffenderEmTagDetailsCommitBean = new OffenderEmTagDetailsCommitBean();

    weeklyActivityPlanInsertList: WeeklyActivityPlans[] = [];
    weeklyActivityPlanUpdatetList: WeeklyActivityPlans[] = [];
    weeklyActivityPlanUpdatetListTemp: WeeklyActivityPlans[] = [];
    weeklyActivityPlanInsertListTemp: WeeklyActivityPlans[] = [];
    weeklyActivityPlanDeleteList: WeeklyActivityPlans[] = [];
    weeklyActivityPlansCommitBean: WeeklyActivityPlansCommitBean = new WeeklyActivityPlansCommitBean();

    weeklyActivityPlanHtyInsertList: WeeklyActivityPlansHty[] = [];
    weeklyActivityPlanHtyCommentInsertList: WeeklyActivityPlansHty[] = [];
    weeklyActivityPlanHtyUpdatetList: WeeklyActivityPlansHty[] = [];
    weeklyActivityPlanHtyDeleteList: WeeklyActivityPlansHty[] = [];
    weeklyActivityPlansHtyCommitBean: WeeklyActivityPlansHtyCommitBean = new WeeklyActivityPlansHtyCommitBean();


    weeklyActivityPlansHtyModel: WeeklyActivityPlansHty = new WeeklyActivityPlansHty();

    weeklyActivityPlansModelTemp = new WeeklyActivityPlansHty();

    weeklyActivityPlans: WeeklyActivityPlans = new WeeklyActivityPlans();
    weeklyActivityPlansTemp: WeeklyActivityPlans = new WeeklyActivityPlans();
    versionNo: number;
    weeklyActivityPlanHty: WeeklyActivityPlansHty[] = [];
    emTagStrapDsbl: boolean;
    emTagDailyChargingPeriodDsbl: boolean;
    commonButtonDsbl: boolean;
    versionBtnDsbl: boolean;
    enableInsertBtn: boolean;
    maxVersionNo: any;
    versionOptions: { code: number; description: number; }[];
    versionTitles = { code: 'Version No' }
    commentFinalise: any;
    amendCommentModel: WeeklyActivityPlans = new WeeklyActivityPlans();
    ocrwapstReportBean: OcrwapstReportBean = new OcrwapstReportBean();
    ocrwapstReportOffenderBean: OcrwapstReportBean = new OcrwapstReportBean();
    sendingListExclude: any;
    saveDisableFun: boolean;
    versionReadOnly: boolean = true;
    gridDelete: boolean = false;
    isFinalizeEnable: boolean;
    maxVersionNoTemp: any;
    htyMaxVersion: number;
    getMaximumVersionModel: WeeklyActivityPlans = new WeeklyActivityPlans();
    showSaveComment: boolean;
    weeklyActivityPlanHtyInserCommenttList: WeeklyActivityPlansHty[] = [];
    weeklyActivityPlanHtyInsertModel: WeeklyActivityPlansHty = new WeeklyActivityPlansHty();
    weeklyActivityPlansHtyCommentCommitBean: WeeklyActivityPlansHtyCommitBean = new WeeklyActivityPlansHtyCommitBean();
    enableFinalize: boolean;
    sendingList: any[];
    sendingListOffender: any[];
    backButton: boolean;
    conflictFlag = false;
    offcrsappBean: VOffenderAllSchedules = new VOffenderAllSchedules();
    populatedstaffName: any;
    disableGrid: boolean;
    labels:any;
    constructor(private oweacplnFactory: OweacplnService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private dialogService: DialogService, private router: Router, private schedularService: SchedulerService,private oidsiappFactory: OidsiappService) {
        this.weeklyActivityColumnDef = [];
    }
    ngOnInit() {
        this.labels = {};
        this.labels['serialLabel']=this.translateService.translate('oweacpln.serial');
        this.labels['dateLabel']=this.translateService.translate('oweacpln.date');
        this.labels['wapactivityLabel']=this.translateService.translate('oweacpln.wapactivity');
        this.labels['activityAddressLabel']=this.translateService.translate('oweacpln.activityaddress');
        this.labels['departTimeLabel']=this.translateService.translate('oweacpln.departtime');
        this.labels['activityStartLabel']=this.translateService.translate('oweacpln.activitystart');
        this.labels['activityFinishLabel']=this.translateService.translate('oweacpln.activityfinish');
        this.labels['returnTimeLabel']=this.translateService.translate('oweacpln.returntime');
        this.labels['modeOfTransportLabel']=this.translateService.translate('oweacpln.modeoftransport');
        this.labels['pidLabel']=this.translateService.translate('system-profile.off-id-code');
        this.labels['emtagLabel']=this.translateService.translate('oweacpln.emtag');
        this.labels['emtagStrapSizeLabel']=this.translateService.translate('oweacpln.emtagstrapsize');
        this.labels['commentLabel']=this.translateService.translate('common.comment');
        this.labels['titleLabel']=this.translateService.translate('oweacpln.weeklyactivityplanner');
        this.labels['reportCreatedLabel']=this.translateService.translate('oweapln.reportcreated');
        this.labels['createdLabel']=this.translateService.translate('oweapln.createdby');
        this.labels['offenderNameLabel']=this.translateService.translate('common.offendername');
        this.labels['offenderPhoneLabel']=this.translateService.translate('oweapln.offenderphone');
        this.labels['offenderAddressLabel']=this.translateService.translate('oweapln.offenderaddress');
        this.labels['weekLabel']=this.translateService.translate('oweapln.week');
        this.labels['wapVersionLabel']=this.translateService.translate('oweapln.wapversion');
        this.labels['emDailyChargingLabel']=this.translateService.translate('oweapln.emdailycharging');
        this.labels['scheduledActivitiesLabel']=this.translateService.translate('oweapln.scheduledactivities');
        
        if (this.schedularService.backBtnFlag) {
			this.backButton = true;
		 } else {
			this.backButton = false;
		 }
        this.ctrlpsFromDateReadOnly = true;
        this.emTagStrapDsbl = true;
        this.emTagDailyChargingPeriodDsbl = true;
        this.commonButtonDsbl = true;
        this.versionBtnDsbl = true;
        this.enableInsertBtn = false;
        this.commonButtonDsbl = true;
        this.weeklyActivityData = [];
        this.enableFinalize= false;
        this.screenAccessCheck()
        this.weeklyActivityColumnDef = [
            {
                fieldName: this.labels.serialLabel, field: 'serialNumber', datatype: 'number',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oweacpln.sysemgenerated'), field: 'systemGenerated', datatype: 'checkbox',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oweacpln.day'), field: 'day', datatype: 'text',
                editable: false, width: 150, uppercase: 'false',
            },

            {
                fieldName: this.labels.dateLabel,
                field: 'activityDate', editable: true, width: 150, datatype: 'date', cellEditable: this.commonCellEditable, required: true
            },

            {
                fieldName: this.translateService.translate('oweacpln.activity'), field: 'activity', datatype: 'text',
                editable: false, width: 150, uppercase: 'false', //cellEditable: this.commonCellEditable,
            },
            {
                fieldName: this.labels.wapactivityLabel, field: 'activityNew', datatype: 'lov',
                editable: true, width: 150, domain: 'WAP_ACTIVITY', cellEditable: this.commonCellEditable
            },
            {
                fieldName: this.labels.activityAddressLabel, field: 'activityAddress', datatype: 'text',
                editable: true, width: 150, uppercase: 'false', cellEditable: this.commonCellEditable, maxlength : 240
            },
            {
                fieldName: this.labels.departTimeLabel,cellEditable: this.disableForHistory,
                field: 'departStartTime', editable: true, width: 150, datatype: 'time'
            },
            {
                fieldName: this.labels.activityStartLabel, cellEditable: this.commonCellEditable,
                field: 'activityStart', editable: true, width: 150, datatype: 'time'
            },

            {
                fieldName: this.labels.activityFinishLabel, cellEditable: this.commonCellEditable,
                field: 'activityFinish', editable: true, width: 150, datatype: 'time'
            },
            {
                fieldName: this.labels.returnTimeLabel, cellEditable: this.disableForHistory,
                field: 'returnTime', editable: true, width: 150, datatype: 'time'
            },

            {
                fieldName: this.labels.modeOfTransportLabel, field: 'modeOfTransport', datatype: 'lov',
                editable: true, width: 150, domain: 'TA_TRANSPORT', cellEditable: this.disableForHistory,
            },
            /*  {
                 fieldName: this.translateService.translate('oweacpln.updateindicator'), field: 'updateIndicator', datatype: 'checkbox',
                 editable: false, width: 150
             }, */
            /* {
                fieldName: this.translateService.translate('oweacpln.updateindicator'), field: 'updateIndicator', datatype: 'lov',
                editable: true, width: 150, domain: 'WAP_UPD_IND', cellEditable: this.disableForHistory,
            }, */
            {
                fieldName: this.translateService.translate('oweacpln.notForOffenderFlag'), field: 'notForOffenderFlag', datatype: 'checkbox',
                 width: 150, cellEditable: this.disableForHistory,
            },

        ];
        this.populateLoggedStaffName();
    }

   commonCellEditable = (data: any, index: number, field: string): boolean => {
        if (field === 'activityNew') {
            if (data.systemGenerated) {
                return false;
            } 
            else if(this.versionNo === undefined || this.versionNo === this.maxVersionNo){
                    return true;
            }else {

                    return false;
            }
        }
       if (field === 'activityFinish') {

        if (data.systemGenerated && data.recordSource!='CE') {
            return false;
        } 
        else if(this.versionNo === undefined || this.versionNo === this.maxVersionNo){
            return true;
        }else {
            return false;
        }
       }
       if(field === 'activityAddress'){        
     if(this.versionNo === undefined || this.versionNo === this.maxVersionNo){
            return true;
    }
       }

        if (data.systemGenerated) {
            return false;
        } 
        else { 
            if(this.versionNo === undefined || this.versionNo === this.maxVersionNo)  {
                return true;
            }  else {
                return false;
            }     
        }

        
    }


    disableForHistory = (data: any, index: number, field: string): boolean => {

        if(this.versionNo === undefined || this.versionNo === this.maxVersionNo){
            return true;
        } else {
            return false;
        }      
    }

    onGridInsert = () => {
        if (this.weeklyActivityData.length > 0) {
            this.commonButtonDsbl = false
        } else {
            this.commonButtonDsbl = true
        }
        return true;
    }
    onOffenderChange(offender) {
        this.clear();
        if (offender) {
            this.vHeaderBlockModel = offender;
            this.searchDisabled = false;
            this.retrieveEmDetails();
            this.ctrlpsFromDateReadOnly = false;
            this.emTagStrapDsbl = false;
            this.emTagDailyChargingPeriodDsbl = false;
            this.enableInsertBtn = true;
            // this.commonButtonDsbl = false;
            this.saveDisableFun = false;
            this.versionReadOnly = false;
        }
    }

    clear() {
        this.vHeaderBlockModel = new VHeaderBlock();
        this.offenderEmTagDetails = new OffenderEmTagDetails();
        this.offenderEmTagDetailsTemp = new OffenderEmTagDetails();
        this.weeklyActivityData = [];
        this.ctrlpsFromDate = undefined;
        this.ctrlpsToDate = undefined;
        this.ctrlpsFromDateReadOnly = true;
        this.searchDisabled = true;
        this.clearDisabled = true;
        this.emTagStrapDsbl = true;
        this.emTagDailyChargingPeriodDsbl = true;
        this.enableInsertBtn = false;
        this.commonButtonDsbl = true;
        this.versionNo = undefined;
        this.weeklyActivityPlanHty = [];
        this.saveDisableFun = true;
        this.commentFinalise = undefined;
        this.versionReadOnly = true;
        this.enableFinalize= false;
        this.versionOptions=[];
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    ctrlpsFromDateChange(event) {
        if (event) {
            this.clearDisabled = false;
            if (DateFormat.getDate(this.ctrlpsFromDate).getDay() != 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oweacpln.onlymondayisallowedinfromdate');
                this.show(this.message);
                return;
            }
            let date1 = DateFormat.getDate(event).getTime();
            let toDate = DateFormat.getDate();
            var ms = date1 + (6 * 86400000);
            var endDate = new Date(ms);
            toDate = endDate;
            toDate.setHours(0, 0, 0, 0);
            this.ctrlpsToDate = toDate;
        }
        this.ctrlpsFromDate = event;
    }
    ctrlpsToDateChange(event) {
        this.ctrlpsToDate = event;
    }
    offSchSearch(cfd?, ctd?) {
        if (cfd) {
            if (cfd.lastValue === '0_/__/____') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.leapyearnotallowed');
                this.show(this.message);
                this.ctrlpsFromDate = undefined;
                return;
            }
            if (String(cfd.lastValue).indexOf('_') >= 0 && cfd.value === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdclogs.dateformate');
                this.show(this.message);
                this.ctrlpsFromDate = undefined;
                return;
            }
        }
        if (!this.ctrlpsFromDate || this.ctrlpsFromDate === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdclogs.eventdatetimemustbeentered');
            this.show(this.message);
            return;
        }
        if (DateFormat.getDate(this.ctrlpsFromDate).getDay() != 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('oweacpln.onlymondayisallowedinfromdate');
            this.show(this.message);
            return;
        }
        this.amendCommentModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.amendCommentModel.wapStartDate = this.ctrlpsFromDate;
        this.amendCommentModel.wapEndDate = this.ctrlpsToDate;
        this.amendWapCommentQuery(this.amendCommentModel);
        this.getWeeklyActivity();
    }

    amendWapCommentQuery(event) {
        const serviceObj = this.oweacplnFactory.amendWapComment(event).subscribe(data => {
            if (data) {
                if(data ==='notfound'){
                    this.commentFinalise = undefined;
                    this.showSaveComment = true;
                } else {
                    this.commentFinalise = data;
                    this.showSaveComment = false;
                }
            } else {
                this.commentFinalise = undefined;
                this.showSaveComment = true;
            }
        });
    }

    getWeeklyActivity() {
        const PayLoad = {};
        PayLoad['fromDate'] = this.ctrlpsFromDate;
        PayLoad['toDate'] = this.ctrlpsToDate;
        PayLoad['offenderBookId'] = this.vHeaderBlockModel.offenderBookId;
        // this.versionOptions = [];
        this.maxVersionNo = 0;
        const serviceObj = this.oweacplnFactory.getWeeklyActivity(PayLoad).subscribe(data => {
            if (data && data.length > 0) {
                this.isFinalizeEnable = false;
                this.enableFinalize= false;
                data.forEach((e, i) => {
                    e.systemGenerated = e.systemGenerated === 'Y' ? true : false;
                    e.notForOffenderFlag = e.notForOffenderFlag === 'Y' ? true : false;
                    if (!e.systemGenerated) {
                        e.activityNew = e.activity;
                        e.activity = undefined;
                    }
                    e.serialNumber = i + 1;
                    e.day = this.getDay(e.activityDate);
                    if (e.versionNo) {
                        this.maxVersionNo = e.versionNo;
                        this.maxVersionNoTemp = e.versionNo;
                    } else {
                        this.isFinalizeEnable = true;
                    }
                    if(e.finalized === 'N'){
                        this.enableFinalize= true;
                    } 
                });
                if (this.maxVersionNo && this.maxVersionNo > 0) {
                    let versionOptionsTemp = []
                    for (let i = 1; i <= this.maxVersionNo; i++) {
                        let o = { code: i, description: i };
                        versionOptionsTemp.push(o);
                    }
                    if(JSON.stringify(this.versionOptions) != JSON.stringify(versionOptionsTemp)){
                        setTimeout(() => {                          
                            this.versionOptions = JSON.parse(JSON.stringify(versionOptionsTemp));
                        }, 1);
                    }
                }
                this.getMaxVersionData(this.maxVersionNo);
                
                if(this.versionNo != this.maxVersionNo) {
                    this.versionNo =this.maxVersionNo;
                }
                this.weeklyActivityData = data;
                this.weeklyActivityDataTemp = JSON.parse(JSON.stringify(this.weeklyActivityData));
                this.weeklyActivityPlans = data[0];
                this.weeklyActivityIndex = 0;
                this.searchDisabled = true;
                this.ctrlpsFromDateReadOnly = true;
                this.clearDisabled = false;
                this.commonButtonDsbl = false;
                this.versionBtnDsbl = false;
            } else {
                this.versionNo = undefined;
                
                this.weeklyActivityData = [];
                this.weeklyActivityDataTemp = [];
                this.searchDisabled = false;
                this.clearDisabled = false;
                this.ctrlpsFromDateReadOnly = false;
                this.commonButtonDsbl = true;
                this.versionBtnDsbl = true;
                
                this.enableFinalize = false;
                this.getMaxHtyVersionData(PayLoad);
            }
        });
        
        this.getMaxHtyVersion(PayLoad);
    }

    getMaxHtyVersion(event) {
        const serviceObj = this.oweacplnFactory.getMaxHtyVersion(event).subscribe(data => {
            if (data) {
                this.htyMaxVersion = data;
            } else {
                this.htyMaxVersion = 0;
            }
        });
    }

    getMaxHtyVersionData(event) {
        const serviceObj = this.oweacplnFactory.getMaxHtyVersionData(event).subscribe(data => {
            if (data) {
                if (data && data > 0) {
                    let versionOptionsTemp = []
                    for (let i = 1; i <= data; i++) {
                        let o = { code: i, description: i };
                        versionOptionsTemp.push(o);
                    }
                    if(JSON.stringify(this.versionOptions) != JSON.stringify(versionOptionsTemp)){
                        setTimeout(() => {                          
                            this.versionOptions = JSON.parse(JSON.stringify(versionOptionsTemp));
                        }, 1);
                    }

                    //if(data != this.maxVersionNo) {
                        this.versionNo = data;
                       // this.maxVersionNo = data;
                    //}

                    setTimeout(() => {
                        this.maxVersionNo = data;;
                      }, 100);
                }
            } else {
                this.show('common.querycaused');
            }
        });
    }

    offSchSearchClear() {
        this.weeklyActivityData = [];
        this.ctrlpsFromDate = undefined;
        this.ctrlpsToDate = undefined;
        this.ctrlpsFromDateReadOnly = false;
        this.searchDisabled = false;
        this.clearDisabled = true;
        this.commonButtonDsbl = true;
        this.versionBtnDsbl = true;
        this.enableFinalize = false;
        this.commentFinalise = undefined;
        this.versionNo = undefined;
        this.amendCommentModel = new WeeklyActivityPlans();
        this.versionOptions = [];
        // this.offenderEmTagDetails = new OffenderEmTagDetails();
    }

    onRowClickweeklyActivity(event) {
        if (event) {
            this.weeklyActivityPlansModelTemp = event;
            if (!event.systemGenerated || event.systemGenerated === 'N' ) {
                if (event.weeklyActivityPlanId && (this.versionNo === this.maxVersionNo) && (!event.weeklyActivityPlanHtyId)) {
                    this.gridDelete = true;
                } else {
                    this.gridDelete = false;
                }
                this.weeklyGrid.requiredOn('activityNew');
                this.weeklyGrid.requiredOn('activityStart');
            } else {
                this.gridDelete = false;
                this.weeklyGrid.requiredOff('activityNew');
                this.weeklyGrid.requiredOff('activityStart');
            }
        } else {
            this.weeklyActivityPlansModelTemp = new WeeklyActivityPlansHty();
        }
    }

    validateRowData = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event && event.field === 'activityDate') {
            this.conflictEvent(event.data);
            if (event.data.activityDate && (DateFormat.compareDate(DateFormat.getDate(event.oldValue),DateFormat.getDate(event.newValue)) !=0)) {
                if(DateFormat.compareDate(DateFormat.getDate(event.data.activityDate),DateFormat.getDate()) < 0){
                    this.show('oweacpln.activitydategreterthanequal', 'warn');
                    this.weeklyGrid.setColumnData('activityDate', index, undefined);
                    rowdata.validated = true;
                    return rowdata;
                }
                else {
                    this.weeklyGrid.setColumnData('day', index, this.getDay(event.data.activityDate));
                    rowdata.validated = true;
                    return rowdata;
                }
            }          
            else {
                this.weeklyGrid.setColumnData('day', index, undefined);
                rowdata.validated = true;
                return rowdata;
            }
            
        }

        rowdata.validated = true;
        return rowdata;
    }

    weeklyActivityCommit(event) {
        this.weeklyActivityPlanInsertList = [];
        this.weeklyActivityPlanUpdatetList = [];
        this.weeklyActivityPlanInsertListTemp = [];
        this.weeklyActivityPlanUpdatetListTemp = [];
        this.weeklyActivityPlanDeleteList = event.removed;
        this.weeklyActivityPlanUpdatetListTemp = event.updated;
        this.weeklyActivityPlansCommitBean.insertList = [];
        this.weeklyActivityPlansCommitBean.updateList = [];
        this.weeklyActivityPlansCommitBean.deleteList = [];
        if (this.weeklyActivityData.length > 0) {
            for (let i = 0; i < this.weeklyActivityData.length; i++) {
                if (!this.weeklyActivityData[i].weeklyActivityPlanId) {
                    if (this.weeklyActivityData[i].systemGenerated) {
                        this.weeklyActivityData[i].activityId = this.weeklyActivityData[i].recordSource + '_' + this.weeklyActivityData[i].eventId;
                    }
                    this.weeklyActivityData[i].versionNo = this.htyMaxVersion + 1;
                    this.weeklyActivityData[i].finalized = 'N';
                    this.weeklyActivityPlanInsertList.push(this.weeklyActivityData[i]);
                } else {
                    if (this.weeklyActivityData[i].finalized === 'N') {
                        if (this.weeklyActivityData[i].versionNo === 1 && this.htyMaxVersion > 1) {
                            this.weeklyActivityData[i].versionNo = this.htyMaxVersion + 1;
                        }
                    } else {
                        this.weeklyActivityData[i].versionNo = this.htyMaxVersion + 1;
                    }
                    // this.weeklyActivityData[i].versionNo = this.weeklyActivityData[i].finalized === 'N' ? this.htyMaxVersion : this.htyMaxVersion + 1;
                    this.weeklyActivityData[i].finalized = 'N';
                    this.weeklyActivityData[i].activityId = this.weeklyActivityData[i].recordSource + '_' + this.weeklyActivityData[i].eventId;
                    this.weeklyActivityPlanUpdatetList.push(this.weeklyActivityData[i]);
                }
                this.weeklyActivityData[i].notForOffenderFlag = this.weeklyActivityData[i].notForOffenderFlag ? 'Y' : 'N';
            }
        }
        let tempData = this.weeklyActivityData.filter(e => e.finalized === 'Y');
        if (this.weeklyActivityPlanInsertList.length > 0 || this.weeklyActivityPlanUpdatetList.length > 0) {
            for (let i = 0; i < this.weeklyActivityPlanInsertList.length; i++) {
                if (!this.weeklyActivityPlanInsertList[i].activityDate) {
                    this.show('oweacpln.wapactivitydatemustbeentered', 'warn');
                    return;
                }

                if(!this.weeklyActivityPlanInsertList[i].systemGenerated && !this.weeklyActivityPlanInsertList[i].activityNew){
                    this.show('oweacpln.wapactivitynewtimemustbeentered', 'warn');
                    return;
                }

                if(!this.weeklyActivityPlanInsertList[i].systemGenerated && !this.weeklyActivityPlanInsertList[i].activityStart){
                    this.show('oweacpln.wapactivitystarttimemustbeentered', 'warn');
                    return;
                }
                if (!this.weeklyActivityPlanInsertList[i].systemGenerated && (DateFormat.compareDate(DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityDate), DateFormat.getDate()) < 0)) {
                    this.show('oweacpln.activitydategreterthanequal', 'warn');
                    return;
                }

                if ((DateFormat.compareDate(DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityDate), this.ctrlpsFromDate) < 0) ||
                    (DateFormat.compareDate(DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityDate), this.ctrlpsToDate) > 0)) {
                    this.show('Wap Activity Date must be between From Date [ ' + DateFormat.format(this.ctrlpsFromDate) + ' ] and To Date [ ' + DateFormat.format(this.ctrlpsToDate) + ' ]', 'warn');
                    return;
                }

                if (!this.weeklyActivityPlanInsertList[i].systemGenerated && !this.weeklyActivityPlanInsertList[i].activityNew) {
                    this.show('oweacpln.wapactivitymustbeentered', 'warn');
                    return;
                }
                if (this.weeklyActivityPlanInsertList[i].activityStart) {
                    this.weeklyActivityPlanInsertList[i].activityStart = DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityStart);
                    this.weeklyActivityPlanInsertList[i].activityStart = DateFormat.getDate(DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityStart).setDate(DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityDate).getDate()));
                    this.weeklyActivityPlanInsertList[i].activityStart = DateFormat.getDate(DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityStart).setMonth(DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityDate).getMonth()));
                    this.weeklyActivityPlanInsertList[i].activityStart = DateFormat.getDate(DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityStart).setFullYear(DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityDate).getFullYear()));
                }

                if (this.weeklyActivityPlanInsertList[i].activityFinish) {
                    this.weeklyActivityPlanInsertList[i].activityFinish = DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityFinish);
                    this.weeklyActivityPlanInsertList[i].activityFinish = DateFormat.getDate(DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityFinish).setDate(DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityDate).getDate()));
                    this.weeklyActivityPlanInsertList[i].activityFinish = DateFormat.getDate(DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityFinish).setMonth(DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityDate).getMonth()));
                    this.weeklyActivityPlanInsertList[i].activityFinish = DateFormat.getDate(DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityFinish).setFullYear(DateFormat.getDate(this.weeklyActivityPlanInsertList[i].activityDate).getFullYear()));
                }

                this.weeklyActivityPlanInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.weeklyActivityPlanInsertList[i].wapStartDate = this.ctrlpsFromDate;
                this.weeklyActivityPlanInsertList[i].wapEndDate = this.ctrlpsToDate;
                this.weeklyActivityPlansCommitBean.insertList = this.weeklyActivityPlanInsertList;
            }
            for (let i = 0; i < this.weeklyActivityPlanUpdatetList.length; i++) {

                if (!this.weeklyActivityPlanUpdatetList[i].activityDate) {
                    this.show('oweacpln.wapactivitydatemustbeentered', 'warn');
                    return;
                }
                if(!this.weeklyActivityPlanUpdatetList[i].systemGenerated && !this.weeklyActivityPlanUpdatetList[i].activityNew){
                    this.show('oweacpln.wapactivitynewtimemustbeentered', 'warn');
                    return;
                }
                if(!this.weeklyActivityPlanUpdatetList[i].systemGenerated && !this.weeklyActivityPlanUpdatetList[i].activityStart){
                    this.show('oweacpln.wapactivitystarttimemustbeentered', 'warn');
                    return;
                }
                /* for (let i = 0; i < this.weeklyActivityPlanUpdatetListTemp.length; i++) {
                if(this.weeklyActivityPlanUpdatetListTemp[i].weeklyActivityPlanId && this.weeklyActivityPlanUpdatetList[i].weeklyActivityPlanId){
                    if (!this.weeklyActivityPlanUpdatetList[i].systemGenerated && (DateFormat.compareDate(DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityDate), DateFormat.getDate()) < 0)) {
                        this.show('oweacpln.activitydategreterthanequal', 'warn');
                        return;
                    }
                } 
                }*/
                if ((DateFormat.compareDate(DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityDate), this.ctrlpsFromDate) < 0) ||
                    (DateFormat.compareDate(DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityDate), this.ctrlpsToDate) > 0)) {
                    this.show('Wap Activity Date must be between From Date [ ' + DateFormat.format(this.ctrlpsFromDate) + ' ] and To Date [ ' + DateFormat.format(this.ctrlpsToDate) + ' ]', 'warn');
                    return;
                }

                if (!this.weeklyActivityPlanUpdatetList[i].systemGenerated && !this.weeklyActivityPlanUpdatetList[i].activityNew) {
                    this.show('oweacpln.wapactivitymustbeentered', 'warn');
                    return;
                }

                if (this.weeklyActivityPlanUpdatetList[i].activityStart) {
                    this.weeklyActivityPlanUpdatetList[i].activityStart = DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityStart);
                    this.weeklyActivityPlanUpdatetList[i].activityStart = DateFormat.getDate(DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityStart).setDate(DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityDate).getDate()));
                    this.weeklyActivityPlanUpdatetList[i].activityStart = DateFormat.getDate(DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityStart).setMonth(DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityDate).getMonth()));
                    this.weeklyActivityPlanUpdatetList[i].activityStart = DateFormat.getDate(DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityStart).setFullYear(DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityDate).getFullYear()));
                }

                if (this.weeklyActivityPlanUpdatetList[i].activityFinish) {
                    this.weeklyActivityPlanUpdatetList[i].activityFinish = DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityFinish);
                    this.weeklyActivityPlanUpdatetList[i].activityFinish = DateFormat.getDate(DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityFinish).setDate(DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityDate).getDate()));
                    this.weeklyActivityPlanUpdatetList[i].activityFinish = DateFormat.getDate(DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityFinish).setMonth(DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityDate).getMonth()));
                    this.weeklyActivityPlanUpdatetList[i].activityFinish = DateFormat.getDate(DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityFinish).setFullYear(DateFormat.getDate(this.weeklyActivityPlanUpdatetList[i].activityDate).getFullYear()));
                }

                this.weeklyActivityPlanUpdatetList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.weeklyActivityPlanUpdatetList[i].wapStartDate = this.ctrlpsFromDate;
                this.weeklyActivityPlanUpdatetList[i].wapEndDate = this.ctrlpsToDate;
                if (!this.weeklyActivityPlanUpdatetList[i].systemGenerated || this.weeklyActivityPlanUpdatetList[i].systemGenerated === 'N') {
                    this.weeklyActivityPlanUpdatetList[i].activity = this.weeklyActivityPlanUpdatetList[i].activityNew;
                }
                this.weeklyActivityPlansCommitBean.updateList = this.weeklyActivityPlanUpdatetList;

            }
        }
        if (this.weeklyActivityPlanDeleteList.length > 0) {
            for (let i = 0; i < this.weeklyActivityPlanDeleteList.length; i++) {
                this.weeklyActivityPlanDeleteList[i].notForOffenderFlag = this.weeklyActivityPlanDeleteList[i].notForOffenderFlag ? 'Y' : 'N';
                this.weeklyActivityPlansCommitBean.deleteList = this.weeklyActivityPlanDeleteList;
                this.weeklyActivityPlansCommitBean.finalizedWap = this.enableFinalize ? 'Y':'N';
                this.weeklyActivityPlansCommitBean.wapStartDate = this.ctrlpsFromDate;
                this.weeklyActivityPlansCommitBean.wapEndDate = this.ctrlpsToDate;
            }
        }
        
        if(this.weeklyActivityPlansCommitBean.updateList.length > 0 || this.weeklyActivityPlansCommitBean.insertList.length > 0){
         if(this.htyMaxVersion === this.versionNo){
            const data = {
				label: this.translateService.translate('oweacpln.thisactionwillcreateanewversionoftheWeeklyactivityplanforthisweek'), yesBtn: true, noBtn: true
			};
			this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
				if (result) {
					this.finalSaveData();
				} else {
                    
                }
			});
		} else {
			this.finalSaveData();
		}
        } 
    }

 finalSaveData(){
    const weeklyActivityCommitData = this.oweacplnFactory.weeklyActivityCommit(this.weeklyActivityPlansCommitBean);
        weeklyActivityCommitData.subscribe(data => {
            if (data) {
                if (data[0] && data[0].liReturn === 1) {
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                    this.getWeeklyActivity()
                    return;
                } else {
                    this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                    this.getWeeklyActivity()
                    return;
                }
            }
        });
 }

    getDay(event) {
        let dayName = undefined;
        if (event) {
            let day = DateFormat.getDate(event).getDay();
            if (day === 1) {
                dayName = 'MON'
            } else if (day === 2) {
                dayName = 'TUE'
            } else if (day === 3) {
                dayName = 'WED'
            } else if (day === 4) {
                dayName = 'THU'
            } else if (day === 5) {
                dayName = 'FRI'
            } else if (day === 6) {
                dayName = 'SAT'
            } else if (day === 0) {
                dayName = 'SUN'
            }
        }
        return dayName;
    }

    saveEmDetails() {
        this.offenderEmTagDetailsCommitBean.insertList = [];
        this.offenderEmTagDetailsCommitBean.updateList = [];
        if (!this.offenderEmTagDetails.emTagData) {
            this.show(this.translateService.translate('oweacpln.emtagmustenter'), 'warn');
            return;
        }
        if (!this.offenderEmTagDetails.emTagStrapSize) {
            this.show(this.translateService.translate('oweacpln.emtagstrapsizemust'), 'warn');
            return;
        }
        if (!this.offenderEmTagDetails.emTagStartTime) {
            this.show(this.translateService.translate('oweacpln.emtagstartmustbeentered'), 'warn');
            return;
        }
        if (!this.offenderEmTagDetails.emTagEndTime) {
            this.show(this.translateService.translate('oweacpln.emtagendmustbeentered'), 'warn');
            return;
        }
        if (this.offenderEmTagDetails.emTagId) {
            this.offenderEmTagDetails.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offenderEmTagDetailsCommitBean.updateList.push(this.offenderEmTagDetails);
        } else {
            this.offenderEmTagDetails.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offenderEmTagDetailsCommitBean.insertList.push(this.offenderEmTagDetails);
        }

        const emDetailsCommit = this.oweacplnFactory.saveEmDetails(this.offenderEmTagDetailsCommitBean);
        emDetailsCommit.subscribe(data => {
            if (data) {
                if (data[0] && data[0].liReturn === 1) {
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                    this.retrieveEmDetails();
                    return;
                } else {
                    this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                    this.retrieveEmDetails();
                    return;
                }
            }
        });


    }
    retrieveEmDetails() {
        this.offenderEmTagSearchDetails.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const retrieveEmDetails = this.oweacplnFactory.retrieveEmDetails(this.offenderEmTagSearchDetails);
        retrieveEmDetails.subscribe(data => {
            if (data.length > 0) {
                this.offenderEmTagDetails = data[0];
                this.offenderEmTagDetails.emTagStartTime = DateFormat.getDate(this.offenderEmTagDetails.emTagStartTime);
                this.offenderEmTagDetails.emTagEndTime = DateFormat.getDate(this.offenderEmTagDetails.emTagEndTime);
                this.offenderEmTagDetailsTemp = JSON.parse(JSON.stringify(this.offenderEmTagDetails));
            } else {
                this.offenderEmTagDetails = new OffenderEmTagDetails();
                this.offenderEmTagDetailsTemp = new OffenderEmTagDetails();
            }
        });
    }

    offEmClear() {
        this.offenderEmTagDetails = new OffenderEmTagDetails();
        this.retrieveEmDetails();
        //this.offenderEmTagDetails = this.offenderEmTagDetailsTemp;
    }

    onSaveFinalise() {
        this.weeklyActivityPlanHtyInsertList = this.weeklyActivityData;
        this.weeklyActivityPlansHtyCommitBean.insertList = [];
        this.weeklyActivityPlansHtyCommitBean.updateList = [];
        this.weeklyActivityPlansHtyCommitBean.deleteList = [];
        if (this.weeklyActivityPlanHtyInsertList.length > 0) {
            for (let i = 0; i < this.weeklyActivityPlanHtyInsertList.length; i++) {
                if (!this.weeklyActivityPlanHtyInsertList[i].activityDate) {
                    this.show('oweacpln.wapactivitydatemustbeentered', 'warn');
                    return;
                }
                if (!this.weeklyActivityPlanHtyInsertList[i].weeklyActivityPlanId) {
                    this.show('oweacpln.savebeforefinalize', 'warn');
                    return;
                } 
                if (!this.weeklyActivityPlanHtyInsertList[i].systemGenerated) {
                    this.weeklyActivityPlanHtyInsertList[i].activity = this.weeklyActivityData[i].activityNew;
                }
                this.weeklyActivityPlanHtyInsertList[i].wapStartDate = this.ctrlpsFromDate;
                this.weeklyActivityPlanHtyInsertList[i].wapEndDate = this.ctrlpsToDate;
                this.weeklyActivityPlanHtyInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.weeklyActivityPlanHtyInsertList[i].comment = this.commentFinalise;
                this.weeklyActivityPlanHtyInsertList[i].notForOffenderFlag = this.weeklyActivityData[i].notForOffenderFlag ? 'Y' : 'N';
            }
            this.weeklyActivityPlansHtyCommitBean.insertList = this.weeklyActivityPlanHtyInsertList;
        }
        const weeklyActivityCommitData = this.oweacplnFactory.weeklyActivityHtyCommit(this.weeklyActivityPlansHtyCommitBean);
        weeklyActivityCommitData.subscribe(data => {
            if (data) {
                if (data[0] && data[0].liReturn === 1) {
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                    this.getWeeklyActivity()
                    return;
                } else {
                    this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                    this.getWeeklyActivity()
                    return;
                }
            }
        });
    }

    getWeeklyActivityHtyData() {
        this.weeklyActivityPlansHtyModel = new WeeklyActivityPlansHty();
        //this.weeklyActivityPlansHtyModel.weeklyActivityPlanId = this.weeklyActivityPlans.weeklyActivityPlanId;
        this.weeklyActivityPlansHtyModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.weeklyActivityPlansHtyModel.wapStartDate = this.ctrlpsFromDate;
        this.weeklyActivityPlansHtyModel.wapEndDate = this.ctrlpsToDate;
        this.weeklyActivityPlansHtyModel.versionNo = this.versionNo;
        this.oweacplnFactory.getWeeklyActivityHtyData(this.weeklyActivityPlansHtyModel).subscribe(data => {
            if (data) {
                this.weeklyActivityData = [];
                data.forEach((e, i) => {
                    e.systemGenerated = e.systemGenerated === 'Y' ? true : false;
                    e.notForOffenderFlag = e.notForOffenderFlag === 'Y' ? true : false;
                    e.day = this.getDay(e.activityDate);
                    e.serialNumber = i + 1;
                    if (!e.systemGenerated) {
                        e.activityNew = e.activity;
                        e.activity = undefined;
                    }

                });
                this.weeklyActivityData = data;
                this.weeklyActivityPlanHty = data;
                this.commonButtonDsbl = false;
                this.enableFinalize= false;
            } else {
                this.weeklyActivityData = [];
                this.commonButtonDsbl = true;

            }
        });

    }

    onPrintStaffCopy() {

    }

    onPrintOffenderCopy() {

    }

    

    clearDisableFun() {
        if (this.offenderEmTagDetails && (this.offenderEmTagDetails.emTagStrapSize != this.offenderEmTagDetails.emTagStrapSize)
            || (this.offenderEmTagDetails.emTagDailyChargingPeriod != this.offenderEmTagDetails.emTagDailyChargingPeriod)) {
            return true;
        } else {
            return false;
        }
    }

    versionChange(event) {
        if (event) {
            if (event != this.maxVersionNo) {
                this.getWeeklyActivityHtyData();
            } else {
                this.getWeeklyActivity();
            }
        }
    }
    bLaunchClick = () => {
        const dialogData = {
            modelData: event,
            offenderBookId: this.vHeaderBlockModel.offenderBookId,
            fromdate: this.ctrlpsFromDate,
            todate: this.ctrlpsToDate,
            comment: this.commentFinalise,
            screenTitle: 'WAP Comment',
            placeHolderName: 'Comment',
            existingCommentTextDetails: 'Existing WAP Comment',
            ammendCommentText: 'Append WAP Comment',
            gridName: 'WAP'
        };
        this.dialogService.openLinkDialog('OSANVICOMMENT', dialogData).subscribe(resData => {
            if (resData) {
                this.amendWapCommentQuery(this.amendCommentModel);
            }
        });
    }
    printStaffClick() {
        if (this.versionNo) {
            this.ocrwapstReportBean.caseloadId = this.sessionManager.currentCaseLoad;
            this.ocrwapstReportBean.wapStartDate = this.ctrlpsFromDate;
            this.ocrwapstReportBean.wapEndDate = this.ctrlpsToDate;
            this.sendingList = this.weeklyActivityData;
             this.sendingList.forEach((e) => {
                e.serialLabel=this.labels.serialLabel;
                e.dateLabel=this.labels.dateLabel;
                e.wapactivityLabel=this.labels.wapactivityLabel;
                e.activityAddressLabel=this.labels.activityAddressLabel;
                e.departTimeLabel=this.labels.departTimeLabel;
                e.activityStartLabel=this.labels.activityStartLabel;
                e.activityFinishLabel=this.labels.activityFinishLabel;
                e.returnTimeLabel=this.labels.returnTimeLabel;
                e.modeOfTransportLabel=this.labels.modeOfTransportLabel;
            }); 
            this.ocrwapstReportBean.scheduledActivitiesList = this.sendingList;
            this.ocrwapstReportBean.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.ocrwapstReportBean.emTagId = this.offenderEmTagDetails.emTagId;
            this.ocrwapstReportBean.emTagData = this.offenderEmTagDetails.emTagData;
            this.ocrwapstReportBean.emStrapSize = this.offenderEmTagDetails.emTagStrapSize;
            if(this.offenderEmTagDetails.emTagStartTime) {
                this.ocrwapstReportBean.emTagStartTime = DateFormat.getDate(this.offenderEmTagDetails.emTagStartTime);
            }
            if(this.offenderEmTagDetails.emTagEndTime) {
                this.ocrwapstReportBean.emTagEndTime = DateFormat.getDate(this.offenderEmTagDetails.emTagEndTime);
            }
            this.ocrwapstReportBean.wapVersion = String(this.versionNo);
            this.ocrwapstReportBean.comment = this.commentFinalise;
            this.ocrwapstReportBean.pidLabel=this.labels.pidLabel;
            this.ocrwapstReportBean.emtagLabel=this.labels.emtagLabel;
            this.ocrwapstReportBean.emtagStrapSizeLabel=this.labels.emtagStrapSizeLabel;
            this.ocrwapstReportBean.commentLabel=this.labels.commentLabel;
            this.ocrwapstReportBean.titleLabel=this.labels.titleLabel.toUpperCase();
            this.ocrwapstReportBean.reportCreatedLabel=this.labels.reportCreatedLabel;
            this.ocrwapstReportBean.createdLabel=this.labels.createdLabel;
            this.ocrwapstReportBean.offenderNameLabel=this.labels.offenderNameLabel;
            this.ocrwapstReportBean.offenderPhoneLabel=this.labels.offenderPhoneLabel;
            this.ocrwapstReportBean.offenderAddressLabel=this.labels.offenderAddressLabel;
            this.ocrwapstReportBean.weekLabel=this.labels.weekLabel;
            this.ocrwapstReportBean.wapVersionLabel=this.labels.wapVersionLabel;
            this.ocrwapstReportBean.emDailyChargingLabel=this.labels.emDailyChargingLabel;
            const offtxnSaveData = this.oweacplnFactory.printReportForStaff(this.ocrwapstReportBean);
            offtxnSaveData.subscribe(data => {
                if (data && data.length > 0 && data[0].report) {
                    this.openPdf(data[0].report);
                }
            });

        } else {
            this.show('oweacpln.savebeforeprint', 'warn');
        }
    }


    openPdf(base64str) {
        var binary = atob(base64str.replace(/\s/g, ''));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        var blob = new Blob([view], { type: "application/pdf" });
        var url = URL.createObjectURL(blob);
        window.open(url, "_blank");
    }

    printOffenderClick() {
        if (this.versionNo) {
            this.ocrwapstReportOffenderBean.caseloadId = this.sessionManager.currentCaseLoad;
            this.ocrwapstReportOffenderBean.wapStartDate = this.ctrlpsFromDate;
            this.ocrwapstReportOffenderBean.wapEndDate = this.ctrlpsToDate;
            this.sendingListOffender = this.weeklyActivityData;
            this.sendingListExclude = [];
            this.sendingListOffender.forEach((e, i) => {
                e.serialLabel=this.labels.serialLabel;
                e.dateLabel=this.labels.dateLabel;
                e.wapactivityLabel=this.labels.wapactivityLabel;
                e.activityAddressLabel=this.labels.activityAddressLabel;
                e.departTimeLabel=this.labels.departTimeLabel;
                e.activityStartLabel=this.labels.activityStartLabel;
                e.activityFinishLabel=this.labels.activityFinishLabel;
                e.returnTimeLabel=this.labels.returnTimeLabel;
                e.modeOfTransportLabel=this.labels.modeOfTransportLabel;
                /* if (!e.systemGenerated) {
                    e.activity = e.activityNew;
                } */
               // e.updateIndicator = e.updateIndicator ? "Y" : "N";
                if (!e.notForOffenderFlag) {
                    this.sendingListExclude.push(e);
                }
            });
            this.ocrwapstReportOffenderBean.scheduledActivitiesList = this.sendingListExclude;
            this.ocrwapstReportOffenderBean.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.ocrwapstReportOffenderBean.emTagId = this.offenderEmTagDetails.emTagId;
            this.ocrwapstReportOffenderBean.emStrapSize = this.offenderEmTagDetails.emTagStrapSize;
            this.ocrwapstReportOffenderBean.emDailyChargingPeriod = this.offenderEmTagDetails.emTagStrapSize;
            this.ocrwapstReportOffenderBean.wapVersion = String(this.versionNo);
            this.ocrwapstReportOffenderBean.pidLabel=this.labels.pidLabel;
            this.ocrwapstReportOffenderBean.titleLabel=this.labels.titleLabel.toUpperCase();
            this.ocrwapstReportOffenderBean.reportCreatedLabel=this.labels.reportCreatedLabel;
            this.ocrwapstReportOffenderBean.offenderNameLabel=this.labels.offenderNameLabel;
            this.ocrwapstReportOffenderBean.wapVersionLabel=this.labels.wapVersionLabel;
            this.ocrwapstReportOffenderBean.weekLabel=this.labels.weekLabel;
            this.ocrwapstReportOffenderBean.emDailyChargingLabel=this.labels.emDailyChargingLabel;
            this.ocrwapstReportOffenderBean.scheduledActivitiesLabel=this.labels.scheduledActivitiesLabel;
            const offtxnSaveData = this.oweacplnFactory.printReportForOffender(this.ocrwapstReportOffenderBean);
            offtxnSaveData.subscribe(data => {
                if (data && data.length > 0 && data[0].report) {
                    this.openPdf(data[0].report); 
                }
            });

        } else {
            this.show('oweacpln.savebeforeprint', 'warn');
        }
    }

    get diasablePrintStaffCopy() {
        if (this.weeklyActivityData.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    get diasableAmendComent() {
        if(this.screenAccessCheck()){
            return true;
        }
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && this.searchDisabled) {
            return false;
        } else {
            return true;
        }
    }

    get enableInsertBtnGrid() {
        if (this.ctrlpsFromDate && (this.versionNo === this.maxVersionNo || this.maxVersionNo === 0)) {
            return true;
        } else {
            return false;
        }
    }
get disableCopyOver(){
    if(this.screenAccessCheck()){
        return true;
    }
    if (this.ctrlpsFromDate) {
        return false;
    } else {
        return true;
    }
}
    get diasableOffEmClear() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return true;
        }

        if (JSON.stringify(this.offenderEmTagDetailsTemp) === JSON.stringify(this.offenderEmTagDetails)) {
            return true;
        } else {
            return false;
        }
    }

    get diasableOffEmSave() {
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return true;
        }

        if (JSON.stringify(this.offenderEmTagDetailsTemp) === JSON.stringify(this.offenderEmTagDetails)) {
            return false;
        } else {
            return true;
        }
    }

    get finaliseButtonDsbl() {
        if(this.screenAccessCheck()){
            return true;
        }
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId || !this.weeklyActivityData || this.weeklyActivityData.length === 0
            || !this.weeklyGrid || this.weeklyGrid.addedMap.size > 0 || this.weeklyGrid.updatedMap.size > 0 || this.weeklyGrid.removedMap.size > 0) {
            return true;
        }
        if (this.enableFinalize) {
            return false;
        }
        return true;
    }

    onGridClear = () => {
        if (this.versionNo === this.maxVersionNo) {
            this.getWeeklyActivity();
        } else {
            this.getWeeklyActivityHtyData();
        }
        return true;
    }

    getMaxVersionData(versionNo) {
        this.weeklyActivityPlansHtyModel = new WeeklyActivityPlansHty();
        if (versionNo) {
            this.weeklyActivityPlansHtyModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.weeklyActivityPlansHtyModel.wapStartDate = this.ctrlpsFromDate;
            this.weeklyActivityPlansHtyModel.wapEndDate = this.ctrlpsToDate;
            this.weeklyActivityPlansHtyModel.versionNo = versionNo;
            this.oweacplnFactory.getWeeklyActivityHtyMaxData(this.weeklyActivityPlansHtyModel).subscribe(data => {
                if (data) {
                    data.forEach((e, i) => {
                        let tempData = this.weeklyActivityData.filter(o => o.weeklyActivityPlanId === e.weeklyActivityPlanId);
                        if (tempData.length > 0) {
                            e.createDatetime = tempData[0].createDatetime;
                            e.createUserId = tempData[0].createUserId;
                            e.eventId = tempData[0].eventId;
                            e.modifyDatetime = tempData[0].modifyDatetime;
                            e.recordSource = tempData[0].recordSource;
                            e.wapEndDate = tempData[0].wapEndDate;
                            e.wapStartDate = tempData[0].wapStartDate;
                        }

                        e.systemGenerated = e.systemGenerated === 'Y' ? true : false;
                        e.notForOffenderFlag = e.notForOffenderFlag === 'Y' ? true : false;
                        e.day = this.getDay(e.activityDate);
                        e.serialNumber = i + 1;
                        if (!e.systemGenerated) {
                            e.activityNew = e.activity;
                            e.activity = undefined;
                        }
                    });
                    this.weeklyActivityMavVersionData = data;

                } else {
                    this.weeklyActivityMavVersionData = [];
                }
            });
        } else {
            this.weeklyActivityMavVersionData = [];
        }
    }

    saveComment() {
        this.weeklyActivityPlanHtyInserCommenttList = [];
        this.weeklyActivityPlanHtyCommentInsertList = [];
        this.weeklyActivityPlansHtyCommentCommitBean.updateList = [];
        this.weeklyActivityPlanHtyInsertModel =new WeeklyActivityPlansHty();
        this.weeklyActivityPlansHtyCommentCommitBean =new WeeklyActivityPlansHtyCommitBean();
        this.weeklyActivityPlanHtyInsertModel.wapStartDate = this.ctrlpsFromDate;
        this.weeklyActivityPlanHtyInsertModel.wapEndDate = this.ctrlpsToDate;
        if (!this.commentFinalise || String(this.commentFinalise).trim() === '') {
            this.show(this.translateService.translate('oweacpln.wapcommentmustbeentered'), 'warn');
            return;
        }
        let ammendCommentText = '';
        ammendCommentText = ' [' + this.populatedstaffName +
            ' save the WAP Comment on ' + DateFormat.updateServerDate() + ' ] ' +this.commentFinalise ;
        this.weeklyActivityPlanHtyInsertModel.comment = ammendCommentText;
        this.weeklyActivityPlanHtyInsertModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.weeklyActivityPlanHtyCommentInsertList.push(this.weeklyActivityPlanHtyInsertModel);

        this.weeklyActivityPlansHtyCommentCommitBean.updateList = this.weeklyActivityPlanHtyCommentInsertList;
        const data = this.oweacplnFactory.weeklyActivityCommentCommit(this.weeklyActivityPlansHtyCommentCommitBean);
        data.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.amendCommentModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.amendCommentModel.wapStartDate = this.ctrlpsFromDate;
                this.amendCommentModel.wapEndDate = this.ctrlpsToDate;
                this.amendWapCommentQuery(this.amendCommentModel);
                return;
            }
            else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.amendCommentModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.amendCommentModel.wapStartDate = this.ctrlpsFromDate;
                this.amendCommentModel.wapEndDate = this.ctrlpsToDate;
                this.amendWapCommentQuery(this.amendCommentModel);
                return;
            }
        });

    }

    onCopyOver(){
        const PayLoad = {};
        PayLoad['fromDate'] = this.ctrlpsFromDate;
        PayLoad['toDate'] = this.ctrlpsToDate;
        PayLoad['offenderBookId'] = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.oweacplnFactory.copyOverPreviousWeekData(PayLoad);
        serviceObj.subscribe(data => {
            if(data === 2){
                this.show('oweacpln.noschedulestocopy','warn');
            }else if(data === 0){
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'),'warn');
            }else{
                this.show(this.translateService.translate('oweacpln.copyoversuccess'),'success');
                this.getWeeklyActivity();
            }
            
        });
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

    conflictEvent(event) {
        this.conflictFlag = false;
        this.offcrsappBean.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offcrsappBean.eventDate= event.activityDate;
        const schConflictServiceObj = this.oidsiappFactory.checkScheduleConflict(this.offcrsappBean);
        schConflictServiceObj.subscribe(data => {
            if (data === 0) {
            } else {
                this.dialogService.openLinkDialog('/oiuscinq', this.offcrsappBean).subscribe(result => {
                    if (result !== null) {
                        this.conflictFlag = false;
                    } else {
                        this.conflictFlag = true;
                    }
                });
            }

        });
    }

    populateLoggedStaffName() {
        const staffName = this.oweacplnFactory.populateLoggedStaffName();
        staffName.subscribe(staffName => {
            if(staffName && staffName.indexOf(',') > -1 ){
                this.populatedstaffName = staffName.split(',').join(', ');
            }
            else{
                this.populatedstaffName = staffName;
            }
        });
    }
     screenAccessCheck(){
        let url=this.router.url.replace("/","");
        let screenRole = this.sessionManager.userRoles.roles[url];
                    const currentCaseLoadIdObj = this.sessionManager.caseLoads.filter(e => e.caseloadId === this.sessionManager.currentCaseLoad );
                    if(((currentCaseLoadIdObj[0] && currentCaseLoadIdObj[0].updateAllowedFlag === 'N') || screenRole !== 'full')) {
                        this.showSaveComment=false;
                        this.emTagStrapDsbl = true;
                        this.versionReadOnly = true;
                        this.disableGrid=true;
                        return true;
                    }
                    else{
                        this.disableGrid=false;
                        return false;
                    }
    }
}