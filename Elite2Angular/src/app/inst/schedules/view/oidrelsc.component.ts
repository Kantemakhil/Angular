import {
    Component, OnInit, OnDestroy,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidrelscService } from '@inst/schedules/service/oidrelsc.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderReleaseDetails } from '@inst/schedules/beans/OffenderReleaseDetails';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderReleaseDetailsCommitBean } from '@inst/schedules/beans/OffenderReleaseDetailsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { WorkFlows } from '@inst/schedules/beans/WorkFlows';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { WorkFlowLogs } from '../../demographics-biometrics/beans/WorkFlowLogs';
import { WorkFlowLogsCommitBean } from '../../demographics-biometrics/beans/WorkFlowLogsCommitBean';
import { OcuverifService } from '../../demographics-biometrics/service/ocuverif.service';
import { Router } from '@angular/router';
import { OimrelscService } from '../maintenance/service/oimrelsc.service';
import { OcdalertService } from '@inst/demographics-biometrics/service/ocdalert.service';
import { TimeFormat } from '@core/ui-components/time/timeFormat';
// import required bean declarations

@Component({
    selector: 'app-oidrelsc',
    templateUrl: './oidrelsc.component.html'
})

export class OidrelscComponent implements OnInit, OnDestroy {
    @ViewChild('grid', {static: true}) grid: any;
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offreldetData: OffenderReleaseDetails[] = [];
    offreldetDataTemp: OffenderReleaseDetails[] = [];
    offreldetModel: OffenderReleaseDetails = new OffenderReleaseDetails();
    offreldetSearchModel: OffenderReleaseDetails = new OffenderReleaseDetails();
    namesearch: OffenderReleaseDetails = new OffenderReleaseDetails();
    workFlowModel: WorkFlows = new WorkFlows();
    workFlowChildModel: WorkFlows[] = [];
    offreldetIndex: Number = 0;
    offreldetInsertList: OffenderReleaseDetails[] = [];
    offreldetUpdatetList: OffenderReleaseDetails[] = [];
    offreldetUpdatetListTemp: OffenderReleaseDetails[] = [];
    offreldetDeleteList: OffenderReleaseDetails[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: Boolean = true;
    offRelDetColumnDef: any[];
   
    ctlReadOnly: Boolean = false;
    offRelDetReadOnly: Boolean = false;
    rgagylocationsRg: any[] = [];
    rgdatetypeRg: any[] = [];
    rgmovementreasonsRg: any[] = [];
    offreldetCommitModel: OffenderReleaseDetailsCommitBean = new OffenderReleaseDetailsCommitBean();
    tableIndex: number;
    message: string;
    type: string;
    disableSearchFields: boolean;
    retrievedisabled: boolean;
    clearDisabled: boolean;
    facilityLink: string;
    rgstaffnamecommRg: any[];
    saveDisabled: boolean;
    assesclearDisabled: boolean;
    workFlowModelVerify: WorkFlows;
    disableVerify: boolean;
    disableRelease: boolean;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    selectRecord: VHeaderBlock = new VHeaderBlock();
    retriveDisabled: boolean;
    namesReadOnly: boolean;
    verifyFlagDisable: boolean;
    workflModelTemp: WorkFlowLogs = new WorkFlowLogs();
    commitModel: WorkFlowLogsCommitBean = new WorkFlowLogsCommitBean();
    workflInsertList: WorkFlowLogs[] = [];
    verifiedFlag: boolean;
    commentDisable: boolean;
    exitLaunchBtn: boolean;
    commentText: string;

    keyDateColumnDef: any[];
    alertsColumnDef: any[];
    chargeIndColumnDef: any[];
    keyDateGridData: any[];
    alertsGridData: any[];
    chargeIndicatorGridData: any[];



    keyDatesGridMainData = [];
    alertsGridMainData = [];
    chargeIndicatorMainGridData = [];
    newKeyDateGridData: any[]=[];
    newAlertsGridData: any[] =[];
    newChargeIndicatorGridData: any[]=[];
    keyDatesListData: any[];
    keyDateDomain: string;
    chrgeIndDomain: string;
    chrgeIndListData: any[];
    keyDatesLink: string;
    gridData: any;
    mode: any;
    agyLovData: Map<string, string> = new Map<string, string>();
    public fields: Object = { text: 'description', value: 'code' };
    hideErd: boolean;
    isVerifyProcessing: boolean = false;
    currenDateTime: any;


    constructor(private oidrelscFactory: OidrelscService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService,
        private offenderSearchService: OffenderSearchService, private ocuverifFactory: OcuverifService,
        private router: Router, private oimrelscFactory: OimrelscService) {
        this.offRelDetColumnDef = [];
        this.keyDateColumnDef = [];
        this.alertsColumnDef = [];
        this.chargeIndColumnDef = [];
    }
    ngOnInit() {
        this.keyDateGridData= [];
        this.alertsGridData = [];
        this.chargeIndicatorGridData = [];
        this.saveDisabled = true;
        this.assesclearDisabled = true;
        this.disableSearchFields = false;
        this.disableVerify = true;
        this.disableRelease = true;
        this.retriveDisabled = false;
        this.clearDisabled = false;
        this.namesReadOnly = false;
        this.verifyFlagDisable = true;
        this.commentDisable = true;
        this.mode = 'CheckBox';
        this.facilityLink = '/oidrelsc/rgAgyLocationsRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.keyDatesLink = '/oidrelsc/rgKeyDatesRecordGroup';
        this.getERDHideShowValue();

       this.oidrelscFactory.rgAgyLocationsRecordGroup(this.sessionManager.currentCaseLoad).subscribe(data => {
			if (data.length === 0) {
                this.agyLovData = new Map<string, string>();
			} else {
				this.agyLovData = data;
			}
		});
        this.offreldetSearchModel.fromDate = DateFormat.getDate();
        this.offreldetSearchModel.toDate = DateFormat.getDate();

        this.offRelDetColumnDef = [
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay',
                editable: false, width: 250
            },
            { fieldName: this.translateService.translate('oidrelsc.name'), field: 'nbtName', editable: false, width: 250 },
            { fieldName: this.translateService.translate('oidrelsc.facility'), field: 'agyLocIdDesc', editable: false, width: 250 },
            { fieldName: this.translateService.translate('oidrelsc.alerts'), field: 'alertsData', editable: false, width: 250 },
            { fieldName: this.translateService.translate('oidrelsc.indicators'), field: 'indicatorsData', editable: false, width: 250 },
            {
                fieldName: this.translateService.translate('oidrelsc.confirmedreleasedate'), field: 'releaseDate'
                , editable: true, width: 250, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oidrelsc.releasereason'), field: 'movementReasonCode',
                editable: true, width: 200, datatype: 'lov', link: 'oidrelsc/rgMovementReasonsRecordGroup',source:'OUMEMOVE'
            },
            { fieldName: '', field: 'test', hide: true, datatype: 'text', uppercase: 'false', maxlength: 240 },
            {
                fieldName: ' ', field: 'verifybutton', datatype: 'launchbutton', editable: true, width: 100,
                data: 'row', updateField: 'row', modal: true, onLaunchClick: this.onVerifyClick, isDisable: this.isDisable
            },
            {
                fieldName: this.translateService.translate('oidrelsc.verified'),
                field: 'verifiedFlag', datatype: 'checkbox',width: 130, editable: false
            }
        ];
        this.keyDateColumnDef = [
            { fieldName: this.translateService.translate('oidrelsc.datetype'), field: 'dateTypeDescription', editable: false, width: 250, datatype: 'text' },
            {
                fieldName: this.translateService.translate('common.date'), field: 'dateValueNew'
                , editable: true, width: 250, datatype:'text'
            },
        ];

        this.alertsColumnDef = [
            { fieldName: this.translateService.translate('oidrelsc.alerttype'), field: 'alertTypeDescription', editable: false, width: 250 },
            { fieldName: this.translateService.translate('oidrelsc.alert'), field: 'alertCodeDescription', editable: false, width: 250 },
            {
                fieldName: this.translateService.translate('common.effectivedate'), field: 'alertDate'
                , editable: true, width: 250, datatype: 'date'
            },
        ];

        this.chargeIndColumnDef = [
            { fieldName: this.translateService.translate('oidrelsc.chargeindicator'), field: 'indicatorCodeDescription', editable: false, width: 250 },
        ];

        const cgfkAgylocidServiceObj = this.oidrelscFactory.rgAgyLocationsRecordGroup(this.sessionManager.currentCaseLoad);
        cgfkAgylocidServiceObj.subscribe(cgfkAgylocidList => {
            if (cgfkAgylocidList.length === 0) {
                this.rgstaffnamecommRg = [];
            } else {
                this.rgstaffnamecommRg = cgfkAgylocidList;
            }
        });
        this.keyDateDomain='KEY_DATES';
        const keyDateObj = this.oidrelscFactory.getKeyDatesDataLovData(this.keyDateDomain);
        keyDateObj.subscribe(data => {
            if (data.length === 0) {
                this.keyDatesListData = [];
            } else {
                this.keyDatesListData = data;
            }
        });

        if (this.oidrelscFactory.offreldetSearchModel && this.oidrelscFactory.isRedirect === true) {
            this.oidrelscFactory.isRedirect = false;
            this.offreldetSearchModel = this.oidrelscFactory.offreldetSearchModel;
            this.offreldetExecuteQuery();
        }
        //this.retrieveKeyDateGridData();
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }
    validateRow = (event) => {
        const rowdata = new ValidateRowReturn();
        return rowdata;
    }  /**
  * This function displays the messages
  */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowClickoffreldet(event) {
        if(this.isVerifyProcessing){
            return false;
        }
        if (event) {
            this.verifyFlagDisable = false;
            this.saveDisabled = true;
            this.commentDisable = event.createDatetime ? true : false;
            this.assesclearDisabled = true;
            this.offreldetModel = event;
            this.selectRecord.offenderBookId = this.offreldetModel.offenderBookId;
            this.commentText = this.offreldetModel.commentText;
            this.getHeaderDetails();
           // this.getSelectedOffender();
            this.offreldetModel.caseLoadId = this.sessionManager.currentCaseLoad;
            if (this.offreldetModel.createDatetime) {
                this.disableVerify = false;
                this.disableRelease = false;
            } else {
                this.disableVerify = true;
                this.disableRelease = true;
            }

            if (event.releaseDate){
                this.grid.requiredOn('movementReasonCode');
            } else {
                this.grid.requiredOff('movementReasonCode');
            }

        } else {
            this.commentText = undefined;
        }
        this.newKeyDateGridData = [];
        this.newAlertsGridData =[];
        this.newChargeIndicatorGridData =[];
       // let newKeyDateGridData = [];
       event.keyDateListObj && event.keyDateListObj.forEach(element => {
        this.keyDatesGridMainData && this.keyDatesGridMainData.forEach(elementOne => {
                if (element.dateType.toUpperCase() === elementOne.dateType.toUpperCase()) {                   
                    this.keyDatesListData && this.keyDatesListData.forEach(elementTwo => {
                        if(element.dateType.toUpperCase() === elementTwo.code.toUpperCase()) {
                            element.dateTypeDescription = elementTwo.description;
                            element.listSeq = elementOne.listSeq;  
                        }                           
                        });
                    element.dateValueNew = DateFormat.getDate(element.dateValue) + '' != 'Invalid Date' ? DateFormat.format(DateFormat.getDate(element.dateValue)): element.dateValue;
                    if (element.dateType.toUpperCase() === 'BOOKING_ERD' && this.hideErd) {
                        return;
                    }
                    this.newKeyDateGridData.push(element);                        
                }
            });
        });

        event.alertsList && event.alertsList.forEach(element => {
            this.alertsGridMainData && this.alertsGridMainData.forEach(elementOne => {
                if (element.alertType === elementOne.alertType && element.alertCode === elementOne.alertCode) {
                    element.alertTypeDescription = element.alertTypeDescription;
                    element.alertCodeDescription = element.alertCodeDescription;
                    element.listSeq = elementOne.listSeq;  
                        this.newAlertsGridData.push(element);
                }
            });
        });

        event.chargeIndData.forEach(element => {
            this.chargeIndicatorMainGridData.forEach(elementOne => {
                if (element.indicatorCode === elementOne.chargeIndicator) {                   
                        element.indicatorCodeDescription = element.indicatorCodeDescription;
                        element.listSeq = elementOne.listSeq; 
                        if(this.newChargeIndicatorGridData && this.newChargeIndicatorGridData.map(obj=> obj.indicatorCode).includes(element.indicatorCode)){
                        
                        } else {
                            this.newChargeIndicatorGridData.push(element);
                        }
                }
            });
        });

        this.keyDateGridData = this.newKeyDateGridData.sort((a,b) => this.compare(a,b));
        this.alertsGridData  = this.newAlertsGridData.sort((a,b) => this.compare(a,b));
        this.chargeIndicatorGridData  = this.newChargeIndicatorGridData.sort((a,b) => this.compare(a,b));

        /* this.keyDateGridData = this.newKeyDateGridData.sort((a,b) => a.listSeq && b.listSeq && a.listSeq.localeCompare(b.listSeq));
        this.alertsGridData  = this.newAlertsGridData.sort((a,b) => a.listSeq && b.listSeq && a.listSeq.localeCompare(b.listSeq));
        this.chargeIndicatorGridData  = this.newChargeIndicatorGridData.sort((a,b) => a.listSeq && b.listSeq && a.listSeq.localeCompare(b.listSeq)); */

    }
    getSelectedOffender = () => {
        const object = this.oidrelscFactory.getSelectedOffender(this.selectRecord);
        object.subscribe(data => {
            this.offenderSearchService.selectedOffender = data[0];

        });
    }
    cancel() {
        this.offreldetData = [];
        this.offreldetSearchModel = new OffenderReleaseDetails();
        this.offreldetModel = new OffenderReleaseDetails();
        this.assesclearDisabled = true;
        this.saveDisabled = true;
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.commentDisable = true;
        this.commentText = undefined;
        this.keyDateGridData = [];
        this.alertsGridData = [];
        this.chargeIndicatorGridData = [];
    }
    clearAssesFields() {
        this.commentText = this.offreldetModel.commentText;
        setTimeout(ele => {
            this.assesclearDisabled = true;
            this.saveDisabled = true;
        }, 5);
    }
    changeScreenCode(event) {
        if (event) {
            if (this.offreldetModel.createDatetime) {
                this.assesclearDisabled = false;
                this.saveDisabled = false;
            } else {
                this.assesclearDisabled = true;
                this.saveDisabled = true;
            }
            const index = this.offreldetData.indexOf(this.offreldetModel);
            this.grid.setColumnData('test', index, this.commentText);

        } else {
            this.assesclearDisabled = true;
            this.saveDisabled = true;
        }
    }
    onOffenderChange(offender) {
    }

    seOffenderIdDisplay(event) {
        if (event) {
            this.offreldetSearchModel.offenderIdDisplay = event.offenderIdDisplay;
            this.offreldetSearchModel.offenderBookId = event.offenderBookId;
        } else {
            this.offreldetSearchModel.offenderIdDisplay = undefined;
            this.offreldetSearchModel.offenderBookId = undefined;
        }
    }
    onGridClear = () => {
        this.offreldetExecuteQuery();
        return true;
      }
    offreldetExecuteQuery(date?, dateOne?) {
        if (this.offreldetSearchModel.fromDate === undefined || this.offreldetSearchModel.fromDate===null) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrelsc.fromdatemandatoryvalidation');
            this.show(this.message);
            return;
        }
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        if (this.offreldetSearchModel.toDate === undefined || this.offreldetSearchModel.toDate===null) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrelsc.todatemandatoryvalidation');
            this.show(this.message);
            return;
        }
        if (dateOne) {
            if (dateOne.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(dateOne.lastValue).indexOf('_') >= 0 && dateOne.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        if (!this.offreldetSearchModel.facilityList || this.offreldetSearchModel.facilityList.length==0) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrelsc.facilitymandatory');
            this.show(this.message);
            return;
        }
        if (this.offreldetSearchModel.fromDate && this.offreldetSearchModel.toDate &&
            (DateFormat.compareDate(this.offreldetSearchModel.fromDate,
                this.offreldetSearchModel.toDate) === 1)) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrelsc.fromdategreatervalidation');
            this.show(this.message);
            return;
        }
        if (this.offreldetSearchModel.offenderIdDisplay) {
            this.offreldetSearchModel.caseLoadId = this.sessionManager.currentCaseLoad;
            /* if (this.offreldetSearchModel.offenderIdDisplay) {
                for (let i = Number(String(this.offreldetSearchModel.offenderIdDisplay).length); i < 10; i++) {
                    this.offreldetSearchModel.offenderIdDisplay = '0' + this.offreldetSearchModel.offenderIdDisplay;
                }
            } */
            const object = this.oidrelscFactory.validateOffenderDisplayId(this.offreldetSearchModel);
            object.subscribe(data => {
                if (data.offenderBookId === undefined || data.offenderBookId === null || data.offenderBookId === 0) {
                    this.message = this.translateService.translate('oidrelsc.novalidoffender');
                    this.message = String(this.message).replace('%offenderId%', this.offreldetSearchModel.offenderIdDisplay);
                    this.show(this.message, 'warn');
                } else {
                    this.offreldetSearchModel.offenderBookId = data.offenderBookId;
                    if(this.offreldetSearchModel.fromDate){
                        const value = DateFormat.parse(DateFormat.format(this.offreldetSearchModel.fromDate));
                        this.offreldetSearchModel.fromDate = value;
                    }
                    if(this.offreldetSearchModel.toDate){
                        const value = DateFormat.parse(DateFormat.format(this.offreldetSearchModel.toDate));
                        this.offreldetSearchModel.toDate = value;
                    }
                    const offreldetResult = this.oidrelscFactory.offRelDetExecuteQuery(this.offreldetSearchModel);
                    offreldetResult.subscribe(offreldetResultList => {
                        if (offreldetResultList.length === 0) {
                            this.offreldetData = [];
                            this.retriveDisabled = false;
                            this.namesReadOnly = false;
                            this.show('common.querycaused');

                        } else {
                            offreldetResultList.forEach(element => {
                                element.verifiedFlag = element.verifiedFlag === 'Y' ? true : false;
                                element.verifiedFlagBolean = element.verifiedFlag;
                                element.commentTextTemp = element.commentText;
                                element.releaseDateTemp = element.releaseDate;
                            });
                            this.offreldetData = offreldetResultList;
                            this.offreldetData.forEach(element => {
                                element['verifybutton'] = this.translateService.translate('oidrelsc.verifyButton');
                            });
                            this.offreldetModel = offreldetResultList[0];
                            this.tableIndex = 0;
                            this.retriveDisabled = true;
                            this.clearDisabled = false;
                            this.namesReadOnly = true;
                        }
                    });
                }
            });
        } else {
            if(this.offreldetSearchModel.fromDate){
                const value = DateFormat.parse(DateFormat.format(this.offreldetSearchModel.fromDate));
                this.offreldetSearchModel.fromDate = value;
            }
            if(this.offreldetSearchModel.toDate){
                const value = DateFormat.parse(DateFormat.format(this.offreldetSearchModel.toDate));
                this.offreldetSearchModel.toDate = value;
            }
            const offreldetResult = this.oidrelscFactory.offRelDetExecuteQuery(this.offreldetSearchModel);
            offreldetResult.subscribe(offreldetResultList => {
                if (offreldetResultList.length === 0) {
                    this.offreldetData = [];
                    this.retriveDisabled = false;
                    this.namesReadOnly = false;
                    this.show('common.querycaused');
                } else {
                    offreldetResultList.forEach(element => {
                        element.verifiedFlag = element.verifiedFlag === 'Y' ? true : false;
                        element.verifiedFlagBolean = element.verifiedFlag;
                        element.commentTextTemp = element.commentText;
                        element.releaseDateTemp = element.releaseDate;
                    });
                    this.offreldetData = offreldetResultList;
                    this.offreldetData.forEach(element => {
                        element['verifybutton'] = this.translateService.translate('oidrelsc.verifyButton');
                    });
                    this.offreldetModel = offreldetResultList[0];
                    this.tableIndex = 0;
                    this.retriveDisabled = true;
                    this.clearDisabled = false;
                    this.namesReadOnly = true;
                }
            });
        }
       this.retrieveKeyDateGridData();
    }

    isInsertable(date?, dateOne?) {
        if(this.offreldetSearchModel.fromDate){
            const value = DateFormat.parse(DateFormat.format(this.offreldetSearchModel.fromDate));
            this.offreldetSearchModel.fromDate = value;
        }
        if(this.offreldetSearchModel.toDate){
            const value = DateFormat.parse(DateFormat.format(this.offreldetSearchModel.toDate));
            this.offreldetSearchModel.toDate = value;
        }
        if (this.offreldetSearchModel.fromDate || this.offreldetSearchModel.toDate || this.offreldetSearchModel.facility
            || this.offreldetSearchModel.dateType || this.offreldetSearchModel.offenderIdDisplay) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
        if (date) {
            this.clearDisabled = false;
        }
    }
    onReleaseClick = () => {
        if (!this.offreldetModel.verifiedFlag) {
            this.show(this.translateService.translate('oidrelsc.releasebuttonmandatory'), 'warn');
            return false;
        } else {
            this.exitLaunchBtn = true;
            this.router.navigate(['/OIDRELEA']);
        }
    }

    onVerifyClick = () => {
        if(this.isVerifyProcessing){
            return false;
        }
        if (!this.offreldetModel.offenderBookId) {
            this.isVerifyProcessing = false;
            this.show(this.translateService.translate('oidrelsc.verifybuttonmandatory'), 'warn');
            return false;
        } else {
            this.isVerifyProcessing = true;
            this.InsetWorkFlow();
        }
    }
    InsetWorkFlow = () => {
        this.workFlowModel = new WorkFlows();
        this.workFlowModel.objectCode = 'RELEASE';
        this.workFlowModel.objectId = this.offreldetModel.offenderBookId;
        this.workFlowModel.createDate = DateFormat.getDate();
        const object = this.oidrelscFactory.InsetWorkFlow(this.workFlowModel);
        object.subscribe(data => {
            this.verifyButton();

        });
    }
    verifyButton = () => {
        this.workFlowModel = new WorkFlows();
        this.workFlowModel.objectCode = 'RELEASE';
        this.workFlowModel.createDate = DateFormat.getDate();
        this.workFlowModel.objectId = this.offreldetModel.offenderBookId;
        const object = this.oidrelscFactory.verifyButton(this.workFlowModel);
        object.subscribe(data => {
            if (data && data[0].returnValue > 0) {
                if (this.offreldetModel.verifiedFlag === 'false') {
                    this.offreldetModel.verifiedFlag = 'true';
                }
            }
            if (data.length > 0) {
                this.workFlowModelVerify = new WorkFlows();
                this.workFlowModelVerify = data[0];
              
            const workLogResult = this.ocuverifFactory.workFlExecuteQuery(this.workFlowModelVerify);
            workLogResult.subscribe(workResultList => {
                if (workResultList.length === 0) {
                    this.isVerifyProcessing = false;
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuverif.verificationmessage');
                    //this.show();
                } else {
                    for (let i = 0; i < workResultList.length; i++) {
                        if (workResultList[i].createDate) {
                            workResultList[i].createDate = DateFormat.getDate(workResultList[i].createDate);
                        }
                    }
                    this.isVerifyProcessing = false;
                    this.dialogService.openLinkDialog('/OCUVERIF', workResultList, 50).subscribe(result => {
                        this.onverifyBtnClosed(result);
                    });
                }
            });
            }

        });
    }
    onverifyBtnClosed(event) {
        if (event) {
            this.workflModelTemp = event.workflModelTemp;
            if (this.workflModelTemp) {
                this.verifiedFlag   = true;
                if(!this.offreldetModel.verifiedFlagBolean){
                    this.workflInsertList = [];
                    this.workflModelTemp.nbtOffenderBookId = this.offreldetModel.offenderBookId;
                    this.workflModelTemp.nbtAlertSeq = this.offreldetModel.eventId;
                    this.workflInsertList.push(this.workflModelTemp);
                    this.workflModelTemp.createUserId = this.sessionManager.getId();
                    this.commitModel.insertList = this.workflInsertList;
                    const workflResult = this.oidrelscFactory.workFlCommit(this.commitModel);
                    workflResult.subscribe(saveResult => {
                        if (saveResult === 1) {
                            this.offreldetModel.verifiedFlagBolean   = this.verifiedFlag;
                             const index = this.offreldetData.indexOf(this.offreldetModel);
                             this.offreldetData[index].verifiedFlag = this.offreldetModel.verifiedFlag;
                             this.onButtonVerifySave();
                        }
                    });
                } 
            }
        }
    }
    validateReleaseRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'releaseDate') {
            if (event.data.createDatetime &&
                DateFormat.compareDate(DateFormat.getDate(event.oldValue), DateFormat.getDate(event.newValue)) !== 0) {
                const date = DateFormat.getDate(event.data.releaseDate);
                if (DateFormat.compareDate(DateFormat.getDate(), date) === 1) {
                    this.show(this.translateService.translate('oidrelsc.releasedategreatervalid'), 'warn');
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            if(!event.newValue && event.oldValue && (event.data.verifiedFlag || event.data.verifiedFlagBolean)){
             let    dlgData = {
                    heading: 'Warning',
                    label: this.translateService.translate('oidrelsc.confirmedreleasedateisverified'),
                    yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 50).subscribe(result => {
                    if(!result){
                        const index = this.offreldetData.indexOf(this.offreldetModel);
                        this.grid.setColumnData('releaseDate',index,event.oldValue);
                    }
                    else { 
                        const index = this.offreldetData.indexOf(this.offreldetModel);
                        this.grid.setColumnData('verifiedFlag', index, false);
                    }
                });
            }
            if (event.data.releaseDate){
                this.grid.requiredOn('movementReasonCode');
            } else {
                this.grid.requiredOff('movementReasonCode');
            }
        }
        if (event.field === 'releaseDate' || event.field=='movementReasonCode') { 
            if (event.newValue && event.oldValue &&  event.newValue != event.oldValue) { 
                this.grid.setColumnData('verifiedFlag', rowIndex, false);
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    onButtonSave() {
        this.offreldetInsertList = [];
        this.offreldetUpdatetList = [];
        this.offreldetDeleteList = [];
        this.offreldetCommitModel.updateList = [];
        this.offreldetCommitModel.insertList = [];
        this.offreldetCommitModel.deleteList = [];
        this.offreldetModel.commentText = this.commentText;
        this.offreldetUpdatetList.push(this.offreldetModel);
        for (let i = 0; i < this.offreldetUpdatetList.length; i++) {
            const date = DateFormat.getDate(this.offreldetUpdatetList[i].releaseDate);
            if (DateFormat.compareDate(DateFormat.getDate(), date) === 1) {
                this.show(this.translateService.translate('oidrelsc.releasedategreatervalid'), 'warn');
                return;
            }
            // this.verifiedFlag = this.offreldetModel.verifiedFlag === 'Y' ? true : false;
            this.offreldetUpdatetList[i].verifiedFlag = this.offreldetUpdatetList[i].verifiedFlagBolean ? 'Y' : 'N';
            // this.offreldetUpdatetList[i].verifiedFlag = this.offreldetUpdatetList[i].verifiedFlag ? 'Y' : 'N';
            this.offreldetCommitModel.updateList = this.offreldetUpdatetList;
        }
        const offreldetSaveData = this.oidrelscFactory.offRelDetCommit(this.offreldetCommitModel);
        offreldetSaveData.subscribe(data => {

            if (String(data[0].errorMessage).indexOf('OFFENDER_RELEASE_DETAILS_PK') > 0) {
                this.show(this.translateService.translate('oidrelsc.primarykeyviolate'), 'warn');
                return;
            }
            if (data[0] && data[0].returnValue === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.saveDisabled = true;
                this.assesclearDisabled = true;
               // this.offreldetExecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                return;
            }

        });
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidrelscSaveoffreldetForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.offreldetInsertList = [];
        this.offreldetUpdatetListTemp = [];
        this.offreldetDeleteList = [];
        this.offreldetUpdatetList = [];
        
        this.offreldetInsertList = event.added;
        this.offreldetUpdatetListTemp = event.updated;
        this.offreldetDeleteList = event.removed;
        this.offreldetCommitModel.insertList = [];
        this.offreldetCommitModel.updateList = [];
        this.offreldetCommitModel.deleteList = [];

        this.offreldetUpdatetListTemp.forEach(element => {
            if(element.dataExistFlag === 'N'){
                this.offreldetInsertList.push(element);
            } else {
                this.offreldetUpdatetList.push(element);
            }           
        });
        
        if (this.offreldetInsertList.length > 0 || this.offreldetUpdatetList.length > 0) {
            for (let i = 0; i < this.offreldetInsertList.length; i++) {
                const userSession = this.sessionManager.userSessionDetails();
                if (this.commentText)
                    this.offreldetInsertList[i].commentText = " [" + userSession.staff.firstName + " " + userSession.staff.lastName + " " + DateFormat.updateServerDate() + "]" + " " + this.commentText;
                else
                    this.offreldetInsertList[i].commentText = this.commentText;
                const date = DateFormat.getDate(this.offreldetInsertList[i].releaseDate);
                const date1 = DateFormat.getDate(this.offreldetInsertList[i].releaseDateTemp);
                /* if(!this.offreldetInsertList[i].releaseDate){
                    this.show(this.translateService.translate('oidrelsc.confirmedreleasedatemustbeentered'), 'warn');
                    return;
                } */

                if (date && DateFormat.compareDate(DateFormat.getDate(), date) === 1) {
                    this.show(this.translateService.translate('oidrelsc.releasedategreatervalid'), 'warn');
                    return;
                }
                if (!(this.offreldetInsertList[i].movementReasonCode) && this.offreldetInsertList[i].releaseDate) {
                    this.show(this.translateService.translate('oidrelsc.releaseReasonMandatory'), 'warn');
                    return;
                }
                this.offreldetInsertList[i].verifiedFlag = this.offreldetInsertList[i].verifiedFlag ? 'Y' : 'N';
                if(date && date1){
                    if (DateFormat.compareDate(date1, date) !== 0) {
                        this.offreldetInsertList[i].verifiedFlag ='N';
                    }
                }
                this.offreldetInsertList[i].movementType = 'REL';
                this.offreldetInsertList[i].eventStatus ='SCH';
                this.offreldetCommitModel.insertList = this.offreldetInsertList;
            }
            for (let i = 0; i < this.offreldetUpdatetList.length; i++) {
                this.offreldetUpdatetList[i].commentText = this.commentText;
                this.offreldetUpdatetList[i].verifyPopUpCloseFlag ='N';
                const date = DateFormat.getDate(this.offreldetUpdatetList[i].releaseDate);
                const date1 = DateFormat.getDate(this.offreldetUpdatetList[i].releaseDateTemp);
                
                /* if(!this.offreldetUpdatetList[i].releaseDate){
                    this.show(this.translateService.translate('oidrelsc.confirmedreleasedatemustbeentered'), 'warn');
                    return;
                } */
                if (DateFormat.compareDate(DateFormat.getDate(), date) === 1) {
                    this.show(this.translateService.translate('oidrelsc.releasedategreatervalid'), 'warn');
                    return;
                }
                if (!(this.offreldetUpdatetList[i].movementReasonCode) && this.offreldetUpdatetList[i].releaseDate) {
                    this.show(this.translateService.translate('oidrelsc.releaseReasonMandatory'), 'warn');
                    return;
                }
                this.offreldetUpdatetList[i].verifiedFlag = this.offreldetUpdatetList[i].verifiedFlag ? 'Y' : 'N';
                // if(date && date1){
                //     if (DateFormat.compareDate(date1, date) !== 0) {
                //         this.offreldetUpdatetList[i].verifiedFlag ='N';
                //     }
                // }
                this.offreldetCommitModel.updateList = this.offreldetUpdatetList;
            }

        }
        if (this.offreldetDeleteList.length > 0) {
            for (let i = 0; i < this.offreldetDeleteList.length; i++) {
                this.offreldetCommitModel.deleteList = this.offreldetDeleteList;
            }
        }
        const offreldetSaveData = this.oidrelscFactory.offRelDetCommit(this.offreldetCommitModel);
        offreldetSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('OFFENDER_RELEASE_DETAILS_PK') > 0) {
                this.show(this.translateService.translate('oidrelsc.primarykeyviolate'), 'warn');
                return;
            }
            if (data[0] && data[0].returnValue === 1) {
                this.offreldetExecuteQuery();
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.saveDisabled = true;
                this.assesclearDisabled = true;
                return;
            } else {
                this.offreldetExecuteQuery();
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                return;
            }
        });
    }
    validateDates() {
        if (this.offreldetSearchModel.fromDate && this.offreldetSearchModel.toDate && (DateFormat.compareDate
            (this.offreldetSearchModel.fromDate, this.offreldetSearchModel.toDate) === 1)) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocidocum.datesvalidationmsg');
            this.show(this.message);
            return;
        }
    }
    ngOnDestroy() {
        if (this.vHeaderBlockModel.offenderBookId) {
            this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
            this.offenderSearchService.selectedOffender.errorMessage = this.offreldetModel.movementReasonCode;
            this.offenderSearchService.selectedOffender.currDate = this.offreldetModel.releaseDate;
            this.offenderSearchService.selectedOffender.nbtNonAssVProceed = 'Y';
            this.oidrelscFactory.offreldetSearchModel = this.offreldetSearchModel;
            localStorage.setItem('offreldetModel', this.offreldetModel.commentText);
        }
    }
   getHeaderDetails = ()  => {
       this.offreldetModel['agyLocId'] = this.sessionManager.currentCaseLoad;
       this.offreldetModel['caseloadId'] = this.sessionManager.currentCaseLoad;
       const offbkGlobal = this.oidrelscFactory.offbkgGlobalQuery(this.offreldetModel);
       offbkGlobal.subscribe(list => {
           if (list.length > 0) {
               this.vHeaderBlockModel = list[0];
               this.namesearch = this.offreldetModel;
               this.vHeaderBlockModel.releaseConfirmFlag = this.offreldetModel['verifiedFlagBolean'];
           } else {
           }
       });
   }
   onFacilitySelected(event) {
    if (event) {
        this.offreldetSearchModel.facilityList = event;
    }
}





//enhancements

retrieveKeyDateGridData() {
    const form_identifiers = {};
    const retData = {
        relSchSettingType: 'KEY_DATE',
    }
    this.oimrelscFactory.retrieveGridData(retData).subscribe((data: any) => {
        this.keyDatesGridMainData = [];
        this.alertsGridMainData = [];
        this.chargeIndicatorMainGridData = [];
        
        data.forEach(element => {
            if (element.relSchSettingType === 'KEY_DATE') {
                if (element && element.relSchSettingValue) {
                    this.tableIndex = 0;
                    this.keyDatesGridMainData = (JSON.parse(element.relSchSettingValue));
                } else {
                    this.keyDatesGridMainData = [];
                }
            }
            if (element.relSchSettingType === 'ALERTS') {
                if (element && element.relSchSettingValue) {
                    
                    this.alertsGridMainData = (JSON.parse(element.relSchSettingValue));
                } else {
                    this.alertsGridMainData = [];
                }
            }

            if (element.relSchSettingType === 'CHARGE_IND') {
                if (element && element.relSchSettingValue) {
                    this.chargeIndicatorMainGridData = (JSON.parse(element.relSchSettingValue));
                } else {
                    this.chargeIndicatorMainGridData = [];
                }
            }

        });

    })

}
get disableVerifyRelease(){
    if(this.offreldetModel.createDatetime){
        return false;
    } else {
        return true;
    }
}

compare( a, b ) {
    if ( Number(a.listSeq) < Number(b.listSeq)){
      return -1;
    }
    if ( Number(a.listSeq) > Number(b.listSeq)){
      return 1;
    }
    return 0;
  }


  onButtonVerifySave() {
    this.offreldetInsertList = [];
    this.offreldetUpdatetList = [];
    this.offreldetDeleteList = [];
    this.offreldetCommitModel.updateList = [];
    this.offreldetCommitModel.insertList = [];
    this.offreldetCommitModel.deleteList = [];
    this.offreldetModel.commentText = this.commentText;
    this.offreldetUpdatetList.push(this.offreldetModel);
    for (let i = 0; i < this.offreldetUpdatetList.length; i++) {
        const date = DateFormat.getDate(this.offreldetUpdatetList[i].releaseDate);
        if (DateFormat.compareDate(DateFormat.getDate(), date) === 1) {
            this.show(this.translateService.translate('oidrelsc.releasedategreatervalid'), 'warn');
            return;
        }
        this.offreldetUpdatetList[i].verifyPopUpCloseFlag = 'Y';
        this.offreldetUpdatetList[i].verifiedFlag = this.offreldetUpdatetList[i].verifiedFlagBolean ? 'Y' : 'N';
        this.offreldetCommitModel.updateList = this.offreldetUpdatetList;
    }
    const offreldetSaveData = this.oidrelscFactory.offRelDetCommit(this.offreldetCommitModel);
    offreldetSaveData.subscribe(data => {

        if (String(data[0].errorMessage).indexOf('OFFENDER_RELEASE_DETAILS_PK') > 0) {
            this.show(this.translateService.translate('oidrelsc.primarykeyviolate'), 'warn');
            return;
        }
        if (data[0] && data[0].returnValue === 1) {
            this.saveDisabled = true;
            this.assesclearDisabled = true;
            this.offreldetExecuteQuery();
            return;
        } else {
            this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            return;
        }

    });
}

onButtonSaveGrid(){

    //this.offenderObservationTypesSaveCommitBean = new OffenderObservationTypesSaveCommitBean();
    const observationTypeGridData = { added: [], updated: [], removed: [], offNadAdded: [], offNadUpdated: [] };
    let isChanged = false;
    if (this.grid) {
        const added = [];
        this.grid.addedMap.forEach((value, keys) => { isChanged = true; added.push(value); });
        const removed = [];
        this.grid.removedMap.forEach((value, keys) => { isChanged = true; removed.push(value); });
        const updated = [];
        this.grid.updatedMap.forEach((value, keys) => { isChanged = true; updated.push(value); });
        observationTypeGridData.added = added;
        observationTypeGridData.updated = updated;
        observationTypeGridData.removed = removed;       
    }

    this.oidrelscSaveoffreldetForm(observationTypeGridData);
}

get saveSingelDisabled(){
    if(this.grid.updatedMap.size > 0 || this.offreldetModel.commentText!= this.commentText){
        return false;
    } else {
        return true; 
    }

}
getERDHideShowValue (){
    this.oidrelscFactory.getErdHideShowValue("DERD").subscribe(data => {
      if(data==='YES'){
       this.hideErd=false;
      } else {
        this.hideErd=true;
      }
        });
  }
  isDisable = (data, index) => {
    return !data.releaseDate; 
  }
  
    appendReportDialog() {
        this.offreldetModel['screenId'] = 'OIDRELSC';
        const userSession = this.sessionManager.userSessionDetails();
        const resData = " [" + userSession.staff.firstName + " " + userSession.staff.lastName + " " + DateFormat.updateServerDate() + "] ";
        this.offreldetModel.commentText = (this.offreldetModel.commentText != null) ? this.offreldetModel.commentText + resData : resData;
    this.dialogService.openLinkDialog( '/OIUIRAME', this.offreldetModel, 60 ).subscribe( result => {
            this.offreldetExecuteQuery();  
    } );
}   
}



