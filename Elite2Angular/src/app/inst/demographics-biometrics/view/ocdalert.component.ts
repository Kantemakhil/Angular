import {
    Component,
    OnInit,
    ViewChild,
    OnDestroy
} from '@angular/core';
import {
    GridOptions
} from '@ag-grid-enterprise/all-modules';
import { Router } from '@angular/router';
import { TranslateService } from '@common/translate/translate.service';
import { OffenderAlerts } from '@instdemographicsbeans/OffenderAlerts';
import { OffenderAlertsCommitBean } from '@instdemographicsbeans/OffenderAlertsCommitBean';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OcdalertService } from '@inst/demographics-biometrics/service/ocdalert.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OidcnoteService } from '@inst/casemanagement/service/oidcnote.service';
import { OcuverifService } from '@inst/demographics-biometrics/service/ocuverif.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { WorkFlowLogs } from '@instdemographicsbeans/WorkFlowLogs';
import { OcdmworkService } from '@common/workspace/service/ocdmwork.service';
import { WorkFlowLogsCommitBean } from '@instdemographicsbeans/WorkFlowLogsCommitBean';
import {InjectOffenderService} from '@core/service/inject-offender.service';
import { OivctmngService } from '@inst/victimmanagement/service/oivctmng.service';
@Component({
    selector: 'app-ocdalert',
    templateUrl: './ocdalert.component.html'
})
export class OcdalertComponent implements OnInit, OnDestroy {
    @ViewChild('grid', {static: true}) grid: any;
    alertData: OffenderAlerts[] = [];
    alertDataDup: OffenderAlerts[];
    alertModel: OffenderAlerts = new OffenderAlerts();
    alertModelTemp: OffenderAlerts = new OffenderAlerts();
    alertCommitModel: OffenderAlertsCommitBean;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    alertbean: OffenderAlerts = new OffenderAlerts();
    alerts: any[];
    cgfkAlertdspdescription2Rg: any[];
    message = ' Invalid.';
    verified: string;
    verifiedCheck: boolean;
    dataTableSelect: boolean;

    type = 'error';
    msglist = [];
    alertDate: any;
    expiryDate: any;
    index: number;
    msgs: any[] = [];
    disabled: boolean;
    datatype: any;
    date: Date;
    totalVal: number;
    alertColumnDefs: any[];
    gridOptions: GridOptions;
    translateLabel: any;
    alertInsertList: OffenderAlerts[] = [];
    alertUpdateList: OffenderAlerts[] = [];
    alertDeleteList: OffenderAlerts[] = [];
    dateValue: any;
    disabledFlag: boolean;
    expiryDateValue: any;
    verifiedFlag: boolean;
    alertIndex: number;
    booking: any;
    alertyear: any;
    savedisabled: boolean;
    caseLoadId: string;
    bookingDate: any;
    statusOption: any[] = [];
    alertInsert: boolean;
    tableIndex = -1;
    sysDateRg: any[] = [];
    sysDateTemp: Date;
    exitLaunchBtn = false;
    alertDelete: boolean;
    flag = false;
    clearDisable: boolean;
    workflModelTemp: WorkFlowLogs = new WorkFlowLogs();
    workflInsertList: WorkFlowLogs[] = [];
    commitModel: WorkFlowLogsCommitBean = new WorkFlowLogsCommitBean();
    effectiveFlag: boolean;
    expiryFlag: boolean;
    authorizePersonTextTemp: any;
    commentTextTemp: any;
    alertDeteteFlag:string;
    alertCodeFlag:string;
    verifyDisable: boolean;
    tempBooleanFlag:boolean=false;
    vctRcrdIndexVal: number;
    linkedOffIndexVal : number;
    constructor(private ocdalertFactory: OcdalertService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService,
        private sessionManager: UserSessionManager,
        private oidcnoteFactory: OidcnoteService,
        private ocuverifFactory: OcuverifService,
        private router: Router,
        public dialogService: DialogService,
        private osiosearFactory: OsiosearService,
        private ocdmworkFactory: OcdmworkService, private injectOffenderService: InjectOffenderService, private oivctmngFactory: OivctmngService) {
        this.alertCommitModel = new OffenderAlertsCommitBean();
        this.alerts = [];
        this.alertInsertList = [];
        this.alertUpdateList = [];
        this.alertDeleteList = [];
        this.cgfkAlertdspdescription2Rg = [];
        this.alertData = [];
        this.index = 0;
        this.msgs = [];
        this.datatype = [];
        this.verifiedCheck = false;
        this.dataTableSelect = true;
        this.gridOptions = <GridOptions>{
            editType: 'fullRow',
            enableSorting: true,
            enableFilter: true,
            floatingFilter: true,
            rowSelection: 'single',
            onCellValueChanged: function (event) {
                
            }
        };
    }
    onGridReady(event) {
    }
    ngOnInit() {
        if (this.oidcnoteFactory.launchFlag || this.ocdmworkFactory.exitFlag || this.oivctmngFactory.exitFlag) {
            if (this.ocdmworkFactory.vHeaderBlockServiceObj) {
                this.offenderSearchService.selectedOffender = this.ocdmworkFactory.vHeaderBlockServiceObj;
                this.ocdmworkFactory.vHeaderBlockServiceObj = new VHeaderBlock();
            }
            this.exitLaunchBtn = true;
        }
        this.selectedOffenderfromUrl();
        this.effectiveFlag = false;
        this.expiryFlag =  false;
        this.flag = false;
        this.disabledFlag = true;
        this.savedisabled = true;
        this.disabled = false;
        this.clearDisable = true;
        this.getOptionList();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender; 
        this.verifyDisable = true;
        this.alertColumnDefs = [
            {
                fieldName: this.translateService.translate('ocdalert.alerttype'), field: 'alertType', editable: true,
                cellEditable: this.canAlertEdit, required: true, datatype: 'lov', /*link: 'ocdalert/cgfklkpAlertAlertRefCodes'*/
                domain:'ALERT', width: 220,
                optionWidth: 300, maxlength: 12, codeTitle: 'Alert Type'
            },
            {
                fieldName: this.translateService.translate('ocdalert.alert'), field: 'alertCode', editable: true,
                cellEditable: this.canAlertEdit, required: true, datatype: 'lov', domain: 'ALERT_CODE',
                parentField: 'alertType', width: 220, optionWidth: 300, maxlength: 12, codeTitle: 'Alert'
            },
            {
                fieldName: this.translateService.translate('ocdalert.status'), field: 'alertStatus', datatype: 'text',
                options: this.statusOption, editable: false, width: 220
            },
            {
                fieldName: this.translateService.translate('ocdalert.effectivedate'), field: 'alertDate', editable: true,
                datatype: 'date', required: true, width: 220
            },
            {
                fieldName: this.translateService.translate('ocdalert.expirydate'), field: 'expiryDate', editable: true,
                datatype: 'date', width: 220
            },
            {
                fieldName: this.translateService.translate('ocdalert.caseloadtype'), field: 'caseloadType', editable: false, width: 150
            },
            {
                fieldName: '', field: 'alertType', hide: true
            },
        ];
        const serviceObj2 = this.ocdalertFactory.cgwhenNewFormInstancec();
        serviceObj2.subscribe(sysDateList => {
            if (sysDateList.length === 0) {
                return;
            } else {
                this.sysDateTemp = sysDateList[0].sysDate;
            }
        });
        if (!this.vHeaderBlockModel) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
        const alertChecking = this.ocdalertFactory.alertDeleteChecking(); 
        alertChecking.subscribe(data=>{
            this.alertDeteteFlag=data;
        }); 

        const alertCode = this.ocdalertFactory.alertCodechecking(); 
        alertCode.subscribe(data=>{
            this.alertCodeFlag=data;
        });
    }
    selectedOffenderfromUrl(){
        let usrl = this.router.url;
        let selectedOffenderBookId = usrl.split('=')[1];
        if (selectedOffenderBookId){
            this.vHeaderBlockModel = new VHeaderBlock();
            this.vHeaderBlockModel.offenderBookId = Number(selectedOffenderBookId);
            this.vHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
            const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModel);
            offbkGlobal.subscribe(list => {
                console.log(list);
                if (list.length > 0) {
                    this.vHeaderBlockModel = list[0];
                    this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                } else {
                    this.vHeaderBlockModel = new VHeaderBlock();
                    this.offenderSearchService.selectedOffender = undefined;
                }
            });
        }
    }
    getOptionList() {
        const optionList = this.ocdalertFactory.findAlertStatusList();
        optionList.subscribe(list => {
            list.forEach(listval => {
                this.statusOption.push({ 'id': listval, 'text': listval });
            });
        });
    }

    onOffenderChange(offender) {
        this.alertData = [];
        this.verifyDisable = true;
        this.verifiedCheck = false;
        this.authorizePersonTextTemp = undefined;
        this.commentTextTemp = undefined;
        this.disabledFlag = true;
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.ocdalertExecuteQuery();
        } else {
            this.alertData = [];
            this.alertbean = new OffenderAlerts();

            this.alertInsert = false;
            this.clearDisable = true;
            this.savedisabled = true;
        }
    }

    onRowClickalert(event) {
        if (event) {
            this.disabledFlag = false;
            this.disabled = false;
            this.verifiedCheck = false;
            if (event.verifiedFlag === 'Y') {
                this.verifiedCheck = true;
            } else {
                this.verifiedCheck = false;
            }
            if (event.offenderBookId) {
                this.savedisabled = true;
                this.alertDelete = true;
            } else {
                this.savedisabled = true;
                this.alertDelete = false;
            }
            /**
             * validations for Details Block
             */
            // if (event.alertStatus === 'INACTIVE' || event.alertStatus === 'ACTIVE') {
            //     this.disabledFlag = false;
            // } else {
            //     this.disabledFlag = true;
            // }
            this.alertModel = event;
            /* if (this.alertModel.commentText || this.alertModel.authorizePersonText) {
                this.clearDisable = false;
            } else {
                this.clearDisable = true;
            } */
            this.alertbean = new OffenderAlerts();
            this.alertbean = event;
            this.authorizePersonTextTemp = this.alertModel.authorizePersonText;
            this.commentTextTemp = this.alertModel.commentText;

        }
    }
    onDelete= () => {
    
       if(this.alertDeteteFlag=="N"){
        this.type = 'warn';
        this.message = this.translateService.translate('common.youcannotdeletethisrecord');
        this.show();
        return false;
       }
  
    return true;

    }
    cancel() {
        // this.alertbean = new OffenderAlerts();
        this.authorizePersonTextTemp = this.alertModel.authorizePersonText;
        this.commentTextTemp = this.alertModel.commentText;
        this.savedisabled = true;
        this.clearDisable = true;
        /* if (this.alertModel.commentText || this.alertModel.authorizePersonText) {
            this.savedisabled = false;
        } else {
            this.savedisabled = true;
        } */
    }
    /**  This function fires when user clicks on validation button */
    onVerificationBtnclick = () => {
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            return false;
        }
        this.verifyDisable = true;
        this.workFlExecuteQuery();

    }

    workFlExecuteQuery() {
        if (this.alertModel.offenderBookId && this.alertModel.alertSeq && this.alertModel.alertSeq > 0) {
            const workLogResult = this.ocuverifFactory.workFlExecuteQuery(this.alertModel);
            workLogResult.subscribe(workResultList => {
                if (workResultList.length === 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuverif.verificationmessage');
                    this.show();
                    this.verifyDisable = false;
                } else {
                    this.verifyDisable = false;
                    for (let i = 0; i < workResultList.length; i++) {
                        if (workResultList[i].createDate) {
                            workResultList[i].createDate = DateFormat.getDate(workResultList[i].createDate);
                        }
                    }
                    this.dialogService.openLinkDialog('/OCUVERIF', workResultList, 80).subscribe(result => {
                        this.onverifyBtnClosed(result);
                    });
                }
            });
        } else if (this.alertModel.alertType) {
            this.verifyDisable = false;
            this.type = 'warn';
            this.message = this.translateService.translate('This form has outstanding changes to commit');
            this.show();
        } else {
            this.verifyDisable = false;
            this.type = 'warn';
            this.message = this.translateService.translate('ocuverif.verificationmessage');
            this.show();
        }
    }
    onverifyBtnClosed(event) {
        if (event) {
            this.workflModelTemp = event.workflModelTemp;
            if (this.workflModelTemp) {
                this.workflInsertList = [];
                this.workflModelTemp.nbtOffenderBookId = this.alertModel.offenderBookId;
                this.workflModelTemp.nbtAlertSeq = this.alertModel.alertSeq;
                this.workflInsertList.push(this.workflModelTemp);
                this.workflModelTemp.createUserId = this.sessionManager.getId();
                this.commitModel.insertList = this.workflInsertList;
                const workflResult = this.ocdalertFactory.workFlCommit(this.commitModel);
                workflResult.subscribe(saveResult => {
                    if (saveResult === 1) {
                        this.ocdalertExecuteQuery();
                    }
                });
            }
        }
    }
    ocdalertExecuteQuery() {
        this.disabledFlag = false;
        this.disabled = false;
        this.verifiedCheck = false;
        this.alertModel = new OffenderAlerts();
        this.alertModel.commentText = '';
        this.alertModel.authorizePersonText = '';
        this.alertModel.alertDate = DateFormat.getDate(this.alertModel.alertDate);
        this.alertModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.alertModel.activeFlag = this.vHeaderBlockModel.activeFlag;
        this.alertModel.expiryDate = null;
        if (this.vHeaderBlockModel.offenderBookId != null) {
            const queryParams = {
                offenderBookId: this.vHeaderBlockModel.offenderBookId,
                activeFlag: this.vHeaderBlockModel.activeFlag
            };
            const alertResult = this.ocdalertFactory.alertExecuteQuery(queryParams);
            alertResult.subscribe(list => {
                for (let i = 0; i < list.length; i++) {
                    const currentDate = DateFormat.getDate();
                    list[i].alertDate = DateFormat.getDate(list[i].alertDate);
                    if (list[i].expiryDate) {
                        list[i].expiryDate = DateFormat.getDate(list[i].expiryDate);
                    }
                }
                this.alertData = list;
                this.alertIndex = this.alertData.length;
                this.alertModel = list[0];
                this.verifiedCheck = false;
                this.disabled = false;
                this.alertInsert = true;
                if (this.alertData[0]) {
                    this.alertModel = this.alertData[0];
                    this.verifyDisable = false;
                } else {
                    this.disabledFlag = true;
                    this.alertModel = new OffenderAlerts();
                    this.alertModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                    this.verifyDisable = true;
                }
                if (this.flag) {
                    this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                    /*this.alertModel.agyLocId = this.sessionManager.currentCaseLoad;
                    const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.alertModel);
                    offbkGlobal.subscribe(headerList => {
                        if (headerList.length > 0) {
                            this.offenderSearchService.selectedOffender = headerList[0];
                            this.flag = false;
                        }
                    });*/
                    this.flag = false;
                }
                this.tableIndex = 0;
            });
        }
    }

    /**
     * updation of Details Block
     */
    onButSave() {
        this.alertUpdateList = [];
        this.alertCommitModel.updateList = [];
        this.alertCommitModel.insertList = [];
        const currentDate = DateFormat.getDate();
        this.alertModel.alertDate = DateFormat.getDate(this.alertModel.alertDate);
        /* if(this.alertbean.authorizePersonText){
            this.alertModel.authorizePersonText=this.alertbean.authorizePersonText;
        }
        if(this.alertbean.commentText){
            this.alertModel.commentText=this.alertbean.commentText;
        } */
        this.alertModel.authorizePersonText=this.authorizePersonTextTemp;
        this.alertModel.commentText=this.commentTextTemp;
        if (this.alertModel.expiryDate) {
            this.alertModel.expiryDate = DateFormat.getDate(this.alertModel.expiryDate);
        }
        this.alertUpdateList.push(this.alertModel);
        this.alertCommitModel.updateList = this.alertUpdateList;
        if (!this.alertData[this.alertData.length - 1].offenderBookId) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdalert.pleasesavetheaboverecords');
            this.show();
            this.savedisabled = true;
            return;
         }
        if (!this.savedisabled) {
            const alertSaveData = this.ocdalertFactory.alertCommit(this.alertCommitModel);
            alertSaveData.subscribe(alertSaveResult => {
                if (alertSaveResult === 1) {
                    this.savedisabled = true;
                    this.clearDisable =true;
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    return;
                }
            });
        }
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdalertSavealertForm(event) {
        const validation = { repeat: 0, validate: true };
        this.alertData.forEach(element => {
            validation.repeat = 0;
            this.alertData.forEach(data => {
                if (element.alertStatus !== 'INACTIVE' && data.alertStatus !== 'INACTIVE') {
                    if (data.alertType === element.alertType && data.alertCode === element.alertCode) {
                        validation.repeat++;
                    }
                    if (validation.repeat > 1) {
                        validation.validate = false;
                        return;
                    }
                }
            });
        });
        if (!validation.validate) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdalert.alertalreadyexistsforthisoffender');
            this.show();
            this.alertModel.caseloadType = this.vHeaderBlockModel.agyLocType;
            this.grid.prepareAgColumnDef();
            return;
        }

        for (const added of event.added) {
            this.alertData.pop();
        }
        for (const alertModel of this.alertData) {
            for (const added of event.added) {
                if (added.alertDate) {
                    this.date = added.alertDate;
                    added.alertDate = DateFormat.getDate(added.alertDate);
                    if (alertModel.alertStatus === 'ACTIVE' && alertModel.alertType === added.alertType
                        && alertModel.alertCode === added.alertCode) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdalert.alertalreadyexistswithsamedaterangeforthisoffender');
                        this.show();
                        this.alertData.push(added);
                        return;
                    }
                    if (alertModel.alertStatus === 'INACTIVE' && alertModel.alertType === added.alertType
                        && alertModel.alertCode === added.alertCode &&
                        (DateFormat.compareDate(alertModel.expiryDate, added.alertDate)) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdalert.alertalreadyexistswithsamedaterangeforthisoffender');
                        this.show();
                        this.alertData.push(added);
                        return;
                    }
                    if (alertModel.alertStatus === 'ACTIVE' && alertModel.alertType === added.alertType
                        && alertModel.alertCode === added.alertCode && alertModel.expiryDate === added.expiryDate) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdalert.alertalreadyexistsforthisoffender');
                        this.show();
                        this.alertData.push(added);
                        return;
                    }
                    this.alertModel.alertDate = DateFormat.getDate(added.alertDate);
                }
            }
        }
        this.alertInsertList = event.added;
        this.alertUpdateList = event.updated;
        this.alertDeleteList = event.removed;
        this.alertCommitModel.insertList = [];
        this.alertCommitModel.updateList = [];
        this.alertCommitModel.deleteList = [];
        if (this.alertInsertList.length > 0 || this.alertUpdateList.length > 0) {
            for (let i = 0; i < this.alertInsertList.length; i++) {
                if (this.alertInsertList[i].alertType === null || this.alertInsertList[i].alertType === undefined
                    || this.alertInsertList[i].alertType === '') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdalert.alerttypemustbeentered');
                    this.show();
                    return;
                }
                if(this.alertCodeFlag=="N"){
                    if(DateFormat.compareDate(DateFormat.getDate(this.alertInsertList[i].alertDate),DateFormat.getDate())==-1){
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdalert.effectivedatecannotbeearlierthanthecurrentdate');
                        this.show();
                        return ;
                    }
                   }
                if (this.alertInsertList[i].alertCode === null || this.alertInsertList[i].alertCode === undefined
                    || this.alertInsertList[i].alertCode === '') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdalert.alertcodemustbeentered');
                    this.show();
                    return;
                }
                if (this.alertInsertList[i].alertDate === null || this.alertInsertList[i].alertDate === undefined) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdalert.alertdatemustbeentered');
                    this.show();
                    return;
                }
                this.alertInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.alertInsertList[i].rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
                if (this.verified === 'Y') {
                    this.verifiedCheck = true;
                }
                if (this.alertInsertList[i].alertTypeDes !== undefined || this.alertInsertList[i].alertCodeDes !== undefined) {
                    this.alertInsertList[i].alertType = this.alertInsertList[i].alertTypeDes;
                    this.alertInsertList[i].alertCode = this.alertInsertList[i].alertCodeDes;
                }
                this.booking = DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate);
                this.bookingDate = DateFormat.format(this.vHeaderBlockModel.bookingBeginDate);
                this.alertDate = DateFormat.getDate(this.alertInsertList[i].alertDate);
                if (DateFormat.compareDate(this.booking, this.alertDate) === 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdalert.effectivedatecannotbeearlierthanbookingbegindate')
                        + ':' + '' + this.bookingDate;
                    this.show();
                    return;
                }
                if (this.alertInsertList[i].expiryDate) {
                    if (DateFormat.compareDate(this.alertInsertList[i].alertDate, this.alertInsertList[i].expiryDate) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdalert.expirydatecannot');
                        this.show();
                        return;
                    }
                    if (DateFormat.compareDate(this.alertInsertList[i].alertDate, this.alertInsertList[i].expiryDate) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdalert.effectivedatecannotbegreaterthantheexpirydate');
                        this.show();
                        return;
                    }
                }
                this.alertInsertList[i].authorizePersonText=this.authorizePersonTextTemp;
                this.alertInsertList[i].commentText=this.commentTextTemp;
                this.alertInsertList[i].createDate = DateFormat.getDate();
                this.alertInsertList[i].createUserId = this.sessionManager.getId();
                this.alertInsertList[i].modifyUserId = this.sessionManager.getId();
                this.alertInsertList[i].createDatetime = DateFormat.getDate();
                this.alertInsertList[i].modifyDatetime = DateFormat.getDate();
                const currentDate = DateFormat.getDate();
                if (this.alertInsertList[i].alertStatus === undefined || this.alertInsertList[i].alertStatus === '') {
                    this.alertInsertList[i].alertStatus = 'ACTIVE';
                }
                if (this.alertInsertList[i].expiryDate < DateFormat.getDate()) {
                    this.alertInsertList[i].alertStatus = 'INACTIVE';
                }
                if (this.alertInsertList[i].verifiedFlag === undefined) {
                    this.alertInsertList[i].verifiedFlag = 'N';
                }
                this.alertInsertList[i].caseloadType = this.sessionManager.currentCaseLoadType;
            }
            for (let i = 0; i < this.alertUpdateList.length; i++) {
                this.alertUpdateList[i].authorizePersonText=this.authorizePersonTextTemp;
                this.alertUpdateList[i].commentText=this.commentTextTemp;
                if (this.alertUpdateList[i].alertDate === null || this.alertUpdateList[i].alertDate === undefined) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdalert.alertdatemustbeentered');
                    this.show();
                    return;
                }
                if(this.alertCodeFlag=="N"){
                    if(DateFormat.compareDate(DateFormat.getDate(this.alertUpdateList[i].alertDate),DateFormat.getDate())==-1){
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdalert.effectivedatecannotbeearlierthanthecurrentdate');
                        this.show();
                        return ;
                    }
                   }
                if ((this.alertUpdateList[i].expiryDate !== null || this.alertUpdateList[i].expiryDate !== undefined) ||
                    (this.alertUpdateList[i].alertDate !== null || this.alertUpdateList[i].alertDate !== undefined)) {
                    this.alertUpdateList[i].alertDate = DateFormat.getDate(this.alertUpdateList[i].alertDate);
                    if (this.alertUpdateList[i].expiryDate) {
                        this.alertUpdateList[i].expiryDate = DateFormat.getDate(this.alertUpdateList[i].expiryDate);
                    }
                    this.booking = DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate);
                    this.bookingDate = DateFormat.format(this.vHeaderBlockModel.bookingBeginDate);
                    this.alertDate = DateFormat.getDate(this.alertUpdateList[i].alertDate);
                    if (this.effectiveFlag) {
                    if (DateFormat.compareDate(this.booking , this.alertDate ) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdalert.effectivedatecannotbeearlierthanbookingbegindate')
                            + ':' + '' + this.bookingDate;
                        this.show();
                        return;
                    }
                }
            }
                if (this.alertUpdateList[i].expiryDate) {
                    if (DateFormat.compareDate(this.alertUpdateList[i].alertDate, this.alertUpdateList[i].expiryDate) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdalert.expirydatecannot');
                        this.show();
                        return;
                    }
                    if (DateFormat.compareDate(this.alertUpdateList[i].alertDate, this.alertUpdateList[i].expiryDate) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdalert.effectivedatecannotbegreaterthantheexpirydate');
                        this.show();
                        return;
                    }
                }
            }
        }
        if (this.alertDeleteList.length > 0) {
            for (let i = 0; i < this.alertDeleteList.length; i++) {
                this.alertDeleteList[i].alertDate = DateFormat.getDate(this.alertDeleteList[i].alertDate);
                this.alertDeleteList[i].expiryDate = DateFormat.getDate(this.alertDeleteList[i].expiryDate);
            }
        }
        if (this.alertModel.alertType) {
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleaseclickaddbuttontoinsertnewrecord');
            this.show();
            return;
        }
        this.alertCommitModel.deleteList = this.alertDeleteList;
        this.alertCommitModel.insertList = this.alertInsertList;
        this.alertCommitModel.updateList = this.alertUpdateList;
        const alertSaveData = this.ocdalertFactory.alertCommit(this.alertCommitModel);
        alertSaveData.subscribe(alertSaveResult => {
            if (alertSaveResult && String(alertSaveResult).indexOf('ORA-00001') > 0) {
                if (String(alertSaveResult).indexOf('ALERTS_PK') > 0) {
                    this.type = 'error';
                    this.message = this.translateService.translate('common.rowexistsalreadywithsameoffenderbookidalertseq');
                    this.show();
                }
                if (String(alertSaveResult).indexOf('OFF_ALERT_UK1') > 0) {
                    this.type = 'error';
                    this.message = this.translateService.translate('common.rowexistsalreadywithsameeffectivedateoffenderbookidalerttype');
                    this.show();
                }
            }
            if (alertSaveResult === 1) {
                this.savedisabled = true;
                if (event.removed.length > 0) {
                }
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.flag = true;
                this.ocdalertExecuteQuery();
                return;
            } else {
                this.savedisabled = true;
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.flag = false;
                this.ocdalertExecuteQuery();
                return;
            }
        });
        return true;
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onGridInsert = () => {
        for (let i = 0; i < this.alertData.length; i++) {
            if (!this.alertData[i].alertType) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdalert.alerttypemustbeentered');
                this.show();
                return;
            }
            if (!this.alertData[i].alertCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdalert.alertcodemustbeentered');
                this.show();
                return;
            }
            if (!this.alertData[i].alertDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdalert.alertdatemustbeentered');
                this.show();
                return;
            }
        }
        for (let x = 0; x < this.alertData.length; x++) {
            for (let y = 0; y < this.alertData.length; y++) {
                if (x !== y) {
                    if (this.alertData[x].alertType === this.alertData[y].alertType &&
                        this.alertData[x].alertCode === this.alertData[y].alertCode &&
                        this.alertData[x].alertStatus === this.alertData[y].alertStatus && this.alertData[y].alertStatus == 'ACTIVE') {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdalert.alertalreadyexistswithsamedaterangeforthisoffender');
                        this.show();
                        return;
                    }
                }
            }
        }
        if (!this.sysDateTemp) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdalert.norowintablesys');
            this.show();
            return;
        }
        return { alertDate: DateFormat.getDate() };
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.offenderBookId) {
            return true;
        } else {
            return false;
        }
    }
    isInsertable() {
        this.savedisabled = false;
        this.clearDisable = false;
        /* if (this.alertbean.authorizePersonText || this.alertbean.commentText) {
            this.savedisabled = false;
            this.clearDisable = false;
        } else {
            this.savedisabled = false;
            this.clearDisable = true;
        } */
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        if (event.field === 'alertType' && event.newData !== event.oldData && !event.oldData) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdalert.noprimarykeyrowfoundforvalueinalerttype');
            this.show();
            return;
        }
        if (event.field === 'alertCode' && event.newData !== event.oldData && !event.oldData) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdalert.noprimarykeyrowfoundforvalueinalertcode');
            this.show();
            return;
        }
        if (event.field === 'alertDate' && event.newValue !== event.oldValue && event.data.offenderBookId) {
            this.effectiveFlag = true;
            // this.expiryFlag = false;
        }
        if (event.field === 'expirydate' && event.newValue !== event.oldValue && event.data.offenderBookId) {
            // this.effectiveFlag = true;
            this.expiryFlag = true;
        }
        if(this.alertCodeFlag=="N"){
        if(DateFormat.compareDate(DateFormat.getDate(event.data.alertDate),DateFormat.getDate())==-1){
            this.type = 'warn';
            this.message = this.translateService.translate('ocdalert.effectivedatecannotbeearlierthanthecurrentdate');
            this.show();
            return rowdata;
        }
       }
        return rowdata;
    }
    onExitBtnClick = () => {
        if (this.ocdmworkFactory.exitFlag) {
            this.ocdmworkFactory.vHeaderBlockServiceObj = undefined;
            this.ocdmworkFactory.exitFlag = false;
            this.router.navigate(['/OCDMWORK']);
        } else if (this.oidcnoteFactory.launchFlag) {
            this.oidcnoteFactory.launchFlag = false;
            this.router.navigate(['/OIDCNOTE']);
        }else if(this.oivctmngFactory.exitFlag){
            this.oivctmngFactory.exitFlag = false;
            this.ocdalertFactory.vctRcrdIndexVal = this.oivctmngFactory.indexPos;
            this.ocdalertFactory.linkedOffIndexVal = this.oivctmngFactory.linkedOffIndexPos;
            this.oivctmngFactory.tempFlag = true;
            this.oivctmngFactory.tempFlag2 = true;
            this.router.navigate(['/OIVCTMNG']);
        }
        return true;
    }
    ngOnDestroy(): void {
        this.ocdmworkFactory.vHeaderBlockServiceObj = undefined;
        this.ocdmworkFactory.exitFlag = false;
        this.oidcnoteFactory.launchFlag = false;
    }
}
