import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { VOffassAss } from '@inst/classification/beans/VOffassAss';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OidcapprService } from '../service/oidcappr.service';
import { OffenderAssessments } from '@inst/classification/beans/OffenderAssessments';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderAssessmentsCommitBean } from '@inst/classification/beans/OffenderAssessmentsCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import {InjectOffenderService} from '@core/service/inject-offender.service';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-oidcappr',
    templateUrl: './oidcappr.component.html'
})

export class OidcapprComponent implements OnInit {
    offAssColumnDef: any[] = [];
    msgs: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    vOffAssData: VOffassAss[] = [];
    vOffAssAssModel: VOffassAss = new VOffassAss();
    vOffAssAssIndex = -1;
    offass1Model: OffenderAssessments = new OffenderAssessments();
    offass1ModelTemp: OffenderAssessments = new OffenderAssessments();
    offass1Index = 0;
    offAssCommitModel: OffenderAssessmentsCommitBean = new OffenderAssessmentsCommitBean();
    offass1UpdateList: OffenderAssessments[] = [];
    reviewCommitteCode: any;
    authorityTitle = { 'code': 'Committee', 'description': 'Description' };
    appDecisionTitle = { 'code': 'Approval Result', 'description': 'Description' };
    appResultTitles = { 'code': 'App Sec Level', 'description': 'Description' };
    appPlaceTitles = { 'code': 'App Placement:', 'description': 'Description' };
    evaluationResultCode: any;
    reviewSupLevelType: any;
    reviewPlaceAgyLocId: any;
    dateOfAppFlag: boolean;
    authorityFlag: boolean;
    commonFlag: boolean;
    appDecisionFlag: boolean;
    appResCommentFlag: boolean;
    appPlacementCommentFlag: boolean;
    appResultFlag: boolean;
    saveFlag: boolean;
    clearFlag: boolean;
    checkSaveFlag: boolean;
    evaluationResultCodeTemp: string;
    vHeaderBlockModelTemp: VHeaderBlock = new VHeaderBlock();
    evaluationDateTemp: any;
    nextReviewDateTemp: any;
    authorityReadOnly: boolean;
    checkDateFlag: boolean;
    nextDateFlag: boolean;
    initialData: any;
    offass1ModelTempTwo: OffenderAssessments = new OffenderAssessments(); 
    tabIndex: number;
    screenId = 'OIDCAPPR';
    constructor(private oidcapprFactory: OidcapprService,
        private sessionManager: UserSessionManager,
        public translateService: TranslateService,
        public osiosearFactory: OsiosearService,
        private offenderSearchService: OffenderSearchService, private injectOffenderService: InjectOffenderService,
        private eoffenderService: EoffenderService,private router: Router) {
            this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.offAssColumnDef = [];
    }
    ngOnInit() {
        this.nextDateFlag = false;
        this.checkDateFlag = false;
        this.authorityReadOnly = false;
        this.checkSaveFlag = false;
        this.dateOfAppFlag = true;
        this.authorityFlag = true;
        this.commonFlag = true;
        this.appDecisionFlag = true;
        this.appResCommentFlag = true;
        this.appPlacementCommentFlag = true;
        this.appResultFlag = false;
        this.saveFlag = true;
        this.clearFlag = true;
        this.reviewCommitteCode = 'oidcappr/cgfkOffAss1ReviewCommitteRecordGroup?caseLoadType='
            + this.sessionManager.currentCaseLoad;
        this.evaluationResultCode = 'oidcappr/cgfkOffAss1EvaluationResulRecordGroup';
        this.reviewPlaceAgyLocId = 'oidcappr/cgfkOffAss1ReviewPlaceAgyRecordGroup?caseLoadType='
            + this.sessionManager.currentCaseLoad;
        this.offAssColumnDef = [
            {
                fieldName: this.translateService.translate('common.date'), field: 'assessmentDate', datatype: 'date',
                editable: false, width: 150
            },
            { fieldName: this.translateService.translate('common.type'), field: 'assessmentTypeDesc', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.authority'), field: 'assessCommitteCode', editable: false,
                width: 150
            },
            { fieldName: this.translateService.translate('common.score'), field: 'score', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('oidcappr.calculated'), field: 'calcSupLevelType', datatype: 'text',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oidcappr.override'), field: 'overridedSupLevelType',  datatype: 'text',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oidcappr.approved'), field: 'reviewSupLevelType',  datatype: 'text',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oidcappr.approvalauthority'), field: 'reviewCommitteCode', datatype: 'text',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oidcappr.iwpdocument')
				, field: 'iwpButton', datatype: 'hyperlink',onLaunchClick: this.onEoffenderClick,
				editable: true, displayas: 'href', styleClass: 'file_copy',
				width: 50, data: 'row', updateField: 'row', modal: false,queryparam: 'SCREEN'
            }
        ];
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
    }
    /**
     * event is fired when click on row in search block
     * param offender
     */
    onOffenderChange(offender) {
        if (offender) {
            this.offass1Model = new OffenderAssessments();
            this.vHeaderBlockModel = offender;
            this.vOffAssAssModel = new VOffassAss();
            this.vOffAssAssModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offass1ModelTempTwo = new OffenderAssessments(); 
            this.vOffAssExecuteQuery();
        } else {
            this.vOffAssData = [];
            this.offass1Model = new OffenderAssessments();
            this.dateOfAppFlag = true;
            this.authorityFlag = true;
            this.commonFlag = true;
            this.appDecisionFlag = true;
            this.appResCommentFlag = true;
            this.appPlacementCommentFlag = true;
            this.appResultFlag = false;
            this.saveFlag = true;
            this.clearFlag = true;
            this.authorityReadOnly = false;
            this.checkDateFlag = false;
            this.nextDateFlag = false;
            this.offass1ModelTempTwo = new OffenderAssessments(); 
            this.vHeaderBlockModel =  new VHeaderBlock();
        }
    }
    /**
     * event is fired when click on row in the block of Assessment Recommendation Block.
     * param event
     * its calling offAss1ExecuteQuery() method
     */
    onRowClickofvAss(event) {
        if (event) {
            this.reviewSupLevelType = 'oidcappr/cgfkOffAss1ReviewSupLevelRecordGroup?assTypeId=' + event.assessmentTypeId;
            this.offass1ModelTemp = new OffenderAssessments();
            this.offass1ModelTemp.offenderBookId = event.offenderBookId;
            this.offass1ModelTemp.assessmentDate = event.assessmentDate;
            this.offass1ModelTemp.assessmentSeq = event.assessmentSeq;
            this.offass1ModelTemp.assessmentStatus = event.assessStatus;
            this.eoffenderService.selectedRowData=event;
            this.offAss1ExecuteQuery();
        } else {
            this.eoffenderService.selectedRowData=null;
        }
    }
    checkDateValue() {
        if (this.evaluationDateTemp !== this.offass1Model.evaluationDate) {
            if ((DateFormat.compareDate(DateFormat.getDate(this.offass1Model.evaluationDate), DateFormat.getDate())) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcappr.dateenteredmustbetheorpastdate');
                this.show();
                this.checkDateFlag = true;
                this.nextDateFlag = true;
                return;
            } else {
                this.checkDateFlag = false;
                this.nextDateFlag = false;
            }
            if ((DateFormat.compareDate(DateFormat.getDate(this.offass1Model.evaluationDate),
                DateFormat.getDate(this.offass1ModelTemp.assessmentDate))) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcappr.approvaldateshouldnotbelessthantheassessmentdate');
                this.show();
                this.checkDateFlag = true;
                return;
            } else {
                this.checkDateFlag = false;
            }
        }
        if (this.offass1Model.nextReviewDate && (this.nextReviewDateTemp !== this.offass1Model.nextReviewDate)) {
            if ((DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(this.offass1Model.nextReviewDate))) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcappr.dateenteredmustbethecurrentorfuturedate');
                this.show();
                this.checkDateFlag = true;
                return;
            } else {
                this.checkDateFlag = false;
            }
        }
    }
    checkingDateValidations() {
        this.checkDateValue();
    }
    /**
     * if this.offass1Model.evaluationDate value is null then DB date will be assigned when click on some fields in the block of Approval
     */
    setDefaultDate() {
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && this.vOffAssData.length > 0) {
            if (!this.offass1Model.evaluationDate) {
                this.offass1Model.evaluationDate = DateFormat.getDate();
            }
            // this.checkDateValue();
        }
    }
    /**
     *event is fired when  click on row in  Assessment Recommendation Block.
     */
    offAss1ExecuteQuery() {
        const offAssRes = this.oidcapprFactory.offAss1ExecuteQuery(this.offass1ModelTemp);
        offAssRes.subscribe(offAssResult => {
            if (offAssResult.length === 0) {
                this.checkSaveFlag = false;
                this.offass1Model = new OffenderAssessments();
            } else {
                this.offass1Model = new OffenderAssessments();
                this.offass1Model = offAssResult[0];
                this.evaluationResultCodeTemp = this.offass1Model.evaluationResultCode;
                if (!this.offass1Model.evaluationResultCode) {
                    this.appResCommentFlag = true;
                    this.appPlacementCommentFlag = true;
                    this.appResultFlag = false;
                } else if (this.offass1Model.evaluationResultCode === 'REJ' || this.offass1Model.evaluationResultCode === 'PEN') {
                    this.appResCommentFlag = true;
                    this.appResultFlag = false;

                } else {
                    this.appResultFlag = true;
                }
                if (this.offass1Model.reviewCommitteCode ) {
                    if(this.offass1Model.evaluationResultCode == 'PEN'){
                        this.appDecisionFlag = false;
                    }else{
                        this.appDecisionFlag = true;
                    }
                    this.appResCommentFlag = true;
                    this.authorityReadOnly = true;
                } else {
                    this.authorityReadOnly = false;
                    this.appDecisionFlag = false;
                    this.appResCommentFlag = false;
                }
                this.evaluationDateTemp = undefined;
                this.nextReviewDateTemp = undefined;
                this.evaluationDateTemp = this.offass1Model.evaluationDate;
                this.nextReviewDateTemp = this.offass1Model.nextReviewDate;
                this.checkSaveFlag = false;
                if(this.offass1Model.committeCommentText === null) {
                    this.offass1Model.committeCommentText = "";
                } 
                if(this.offass1Model.reviewPlacementText === null) {
                    this.offass1Model.reviewPlacementText = "";
                }
                if(this.offass1Model.reviewSupLevelText === null) {
                    this.offass1Model.reviewSupLevelText = "";
                }
                this.initialData = JSON.parse(JSON.stringify(this.offass1Model));
                this.offass1ModelTempTwo =  JSON.parse(JSON.stringify(this.offass1Model));

                if(this.offass1ModelTempTwo.evaluationResultCode === 'APP'){
                    this.appDecisionFlag = true;
                    this.appResCommentFlag = true;
                }
            }
        });

    }
    /**
     * event is fired when clcik save button in the block of Approval.
     * Used to update the data in Offender Assessments table.
     * throws some validation messages when conditons failed.
     */
    offAss1CommitQuery() {
        if ( this.offass1ModelTemp.assessmentStatus === 'D') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidcappr.draftassessmentcannotbeapproved');
            this.show();
            return;
        }
       // if (this.checkSaveFlag) {
         //   this.offAss1ExecuteQuery();
        //} else {
            if (!this.offass1Model.evaluationDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcappr.dateofapprovalmustbeentered');
                this.show();
                return;
            }
            if (this.evaluationDateTemp !== this.offass1Model.evaluationDate) {
                if ((DateFormat.compareDate(DateFormat.getDate(this.offass1Model.evaluationDate), DateFormat.getDate())) === 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcappr.dateenteredmustbetheorpastdate');
                    this.show();
                    return;
                }
                if ((DateFormat.compareDate(DateFormat.getDate(this.offass1Model.evaluationDate),
                    DateFormat.getDate(this.offass1ModelTemp.assessmentDate))) === -1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcappr.approvaldateshouldnotbelessthantheassessmentdate');
                    this.show();
                    return;
                }
            }
            if (!this.offass1Model.reviewCommitteCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcappr.authoritymustbeentered');
                this.show();
                return;
            }
            if (!this.offass1Model.evaluationResultCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcappr.approvaldecisionmustbeentered');
                this.show();
                return;
            }
            if (this.appResultFlag) {
                if (!this.offass1Model.reviewSupLevelType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcappr.approvedresultmustbeentered');
                    this.show();
                    return;
                }
            }
            if (this.offass1Model.nextReviewDate && (this.nextReviewDateTemp !== this.offass1Model.nextReviewDate)) {
                if ((DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(this.offass1Model.nextReviewDate))) === 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcappr.dateenteredmustbethecurrentorfuturedate');
                    this.show();
                    return;
                }
            }
            /* if (!this.offass1Model.evaluationResultCode) {
                this.offass1Model.evaluationResultCode = this.evaluationResultCodeTemp;
            } */
            if (this.offass1Model.evaluationResultCode === 'APP') {
                this.offass1Model.assessStatus = 'A';
            } else {
                if (this.offass1Model.evaluationResultCode === 'REJ') {
                    this.offass1Model.assessStatus = 'P';
                }
                //this.offass1Model.reviewSupLevelType = null;
            }
            const userName = this.sessionManager.getId();
            if (this.offass1Model.modifyUserId !== userName) {
                this.offass1Model.modifyUserId = userName;
            }
            this.offAssCommitModel.updateList = [];
            this.offass1UpdateList = [];
            this.offass1UpdateList.push(this.offass1Model);
            this.offAssCommitModel.updateList = this.offass1UpdateList;
            const offAssCom = this.oidcapprFactory.offAss1Commit(this.offAssCommitModel);
            offAssCom.subscribe(saveResult => {
                if (saveResult === 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    return;
                } else {
                    /*this.vHeaderBlockModelTemp = new VHeaderBlock();
                    this.vHeaderBlockModelTemp.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                    this.vHeaderBlockModelTemp.agyLocId = this.vHeaderBlockModel.agyLocId;
                    const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModelTemp);
                    
                    offbkGlobal.subscribe(list => {
                        if (list.length > 0) {
                            this.vHeaderBlockModel = list[0];
                        }
                    });*/
                    this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.saveFlag = true;
                    this.clearFlag = true;
                    this.vOffAssExecuteQuery();
                    this.offAss1ExecuteQuery();
                }

            });
       // }

    }
    /**
         * This event is fired and get the data from DB for Assessment Recmmendation block when vHeaderBlockModel has data.
         * param vOffAssAssModel
         */
    vOffAssExecuteQuery() {
        const vAssRes = this.oidcapprFactory.
            vOffAssExecuteQuery(this.vOffAssAssModel);
        vAssRes.subscribe(data => {
            this.vOffAssData = [];
            if (data.length === 0) {
                this.tabIndex = -1;
                this.dateOfAppFlag = true;
                this.authorityFlag = true;
                this.commonFlag = true;
                this.appDecisionFlag = true;
                this.appResCommentFlag = true;
                this.appPlacementCommentFlag = true;
                this.saveFlag = true;
                this.clearFlag = true;
                this.offass1Model = new OffenderAssessments();
            } else {
                this.tabIndex = 0;
                this.dateOfAppFlag = false;
                this.authorityFlag = false;
                this.commonFlag = false;
                this.appDecisionFlag = false;
                //this.appResCommentFlag = false;
                this.appPlacementCommentFlag = false;
                this.vOffAssData = data;
                this.vOffAssData.forEach(e=>{
                    if (e.assessStatus === 'D') {
                        e.score = undefined;
                    }
                    e['iwpButton'] = '';
                    e['SCREEN'] = this.screenId + "~" + "true" + "~" + e.assessmentSeq;
                });
                this.vOffAssAssIndex = 0;
                this.saveFlag = false;
                this.clearFlag = false;
            }
        });
    }
    /**
     * event is fired when change the dropdown value in Approval Decision field.
     */
    changeTheValueOfAppDecison(event) {
        if (event) {
            if (!this.offass1Model.evaluationDate) {
                this.offass1Model.evaluationDate = DateFormat.getDate();
            }
            if (event.code === 'REJ' || event.code === 'PEN') {
                this.offass1Model.reviewSupLevelType = undefined;
                this.offass1Model.reviewSupLevelText = undefined;
                this.offass1Model.reviewPlaceAgyLocId = undefined;
                this.offass1Model.reviewPlacementText = undefined;
                this.appResCommentFlag = true;
                this.appPlacementCommentFlag = true;
                this.appResultFlag = false;
            } else if(this.vOffAssData.length > 0 && event.code === 'APP'){
                this.appResCommentFlag = false;
                this.appPlacementCommentFlag = false;
                this.appResultFlag = true;
            }
            if(this.offass1Model.reviewCommitteCode === 'SYSTEM'){
                this.appResCommentFlag = true;
            }
            if(this.offass1Model.evaluationResultCode === 'APP' && this.offass1ModelTempTwo.evaluationResultCode === 'APP'  ){
                this.appResCommentFlag = true;
            }


        }
    }
    /**
     * event is fired when click on clear button in the block of Approval.
     * clears the data in the Approval Block.
     */
    clear() {
        this.checkSaveFlag = true;
        this.offass1Model.evaluationDate = this.initialData.evaluationDate;
        this.offass1Model.reviewCommitteCode = this.initialData.reviewCommitteCode;
        this.offass1Model.modifyUserId = this.initialData.modifyUserId;
        this.offass1Model.evaluationResultCode = this.initialData.evaluationResultCode;
        this.offass1Model.reviewSupLevelType = this.initialData.reviewSupLevelType;
        this.offass1Model.reviewSupLevelText = this.initialData.reviewSupLevelText;
        this.offass1Model.reviewPlaceAgyLocId = this.initialData.reviewPlaceAgyLocId;
        this.offass1Model.reviewPlacementText = this.initialData.reviewPlacementText;
        this.offass1Model.nextReviewDate = this.initialData.nextReviewDate;
        this.offass1Model.committeCommentText = this.initialData.committeCommentText;
    }
    /*
   * This method is used to show popup messages.
   */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    isClearDisable(){
        if(this.initialData) {
           var x = (
            this.offass1Model.evaluationDate == this.initialData.evaluationDate &&
            this.offass1Model.reviewCommitteCode == this.initialData.reviewCommitteCode &&
            this.offass1Model.modifyUserId == this.initialData.modifyUserId &&
            this.offass1Model.evaluationResultCode == this.initialData.evaluationResultCode &&
            this.offass1Model.reviewSupLevelType == this.initialData.reviewSupLevelType &&
            this.offass1Model.reviewSupLevelText == this.initialData.reviewSupLevelText &&
            this.offass1Model.reviewPlaceAgyLocId == this.initialData.reviewPlaceAgyLocId &&
            this.offass1Model.reviewPlacementText == this.initialData.reviewPlacementText &&
            this.offass1Model.nextReviewDate == this.initialData.nextReviewDate &&
            this.offass1Model.committeCommentText == this.initialData.committeCommentText);
            return x;
        }
        return true;
    }


    get saveBtnDisable() {
        if(!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId){
            return true;
        }
        if(this.offass1Model && this.offass1ModelTempTwo && JSON.stringify(this.offass1Model)===JSON.stringify(this.offass1ModelTempTwo)){
            return true;
        }else{
            return false;
        }
    }
    ngOnDestroy() {
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
    }
    onEoffenderClick = (data) => {
        this.eoffenderService.selectedRowData=data;
        this.router.navigate( ['/EOFFENDER'], { queryParams: { ['SCREEN'] : data['SCREEN'] } } );
     }

}
