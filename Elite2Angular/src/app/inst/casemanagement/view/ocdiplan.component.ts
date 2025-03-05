import { Location } from '@angular/common';
import {
    Component, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { CasePlans } from '@inst/casemanagement/beans/CasePlans';
import { CasePlansCommitBean } from '@inst/casemanagement/beans/CasePlansCommitBean';
import { OffApV1 } from '@inst/casemanagement/beans/OffApV1';
import { OffApV1CommitBean } from '@inst/casemanagement/beans/OffApV1CommitBean';
import { OffApV2 } from '@inst/casemanagement/beans/OffApV2';
import { OffApV2CommitBean } from '@inst/casemanagement/beans/OffApV2CommitBean';
import { OffenderCaseConditions } from '@inst/casemanagement/beans/OffenderCaseConditions';
import { OffenderCaseConditionsCommitBean } from '@inst/casemanagement/beans/OffenderCaseConditionsCommitBean';
import { OffenderCriminogenicNeeds } from '@inst/casemanagement/beans/OffenderCriminogenicNeeds';
import { OffenderCriminogenicNeedsCommitBean } from '@inst/casemanagement/beans/OffenderCriminogenicNeedsCommitBean';
import { VSummaryCasePlans } from '@inst/casemanagement/beans/VSummaryCasePlans';
import { OcdiplanService } from '@inst/casemanagement/service/ocdiplan.service';
import { OciiplanService } from '@inst/casemanagement/service/ociiplan.service';
import { OidcnoteService } from '@inst/casemanagement/service/oidcnote.service';
import { OcuverifService } from '@inst/demographics-biometrics/service/ocuverif.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OcustfasService } from '../service/ocustfas.service';
import { CasePlanStaff } from '../beans/CasePlanStaff';


@Component({
    selector: 'app-ocdiplan',
    templateUrl: './ocdiplan.component.html'
})

export class OcdiplanComponent implements OnInit, OnDestroy {
    agyLocId: any;
    agyLocIdTemp: any;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    @ViewChild('grid') grid: any;
    @ViewChild('offactionplansv1Grid', { static: true }) offactionplansv1Grid: any;
    @ViewChild('offActionPlnV2Grid', { static: true }) offActionPlnV2Grid: any;

    casePlanRow = 0;
    caseplansData = [];
    eDate: Date;
    lDate: Date;
    verifDis: boolean;
    cellEditableFlag: boolean;
    casplnCommitModel: CasePlansCommitBean = new CasePlansCommitBean();
    offcasecondsCommitModel: OffenderCaseConditionsCommitBean = new OffenderCaseConditionsCommitBean();
    offactionplansv2CommitModel: OffApV2CommitBean = new OffApV2CommitBean();
    offactionplansv1CommitModel: OffApV1CommitBean = new OffApV1CommitBean();
    offcrineedsCommitModel: OffenderCriminogenicNeedsCommitBean = new OffenderCriminogenicNeedsCommitBean();
    criNeedInsert: boolean;
    criNeedUpdate: boolean;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    summCasePlanColumnDef: any[];
    offcasCondsColumnDef: any[];
    tabDisabled: boolean;
    actionName: string;
    lovModel: any[];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    casplnData: CasePlans[] = [];
    casplnDataTemp: CasePlans[] = [];
    casplnModel: CasePlans = new CasePlans();
    casplnIndex = -1;
    casplnInsertList: CasePlans[] = [];
    casplnUpdatetList: CasePlans[] = [];
    casplnDeleteList: CasePlans[] = [];
    offcrineedsData: OffenderCriminogenicNeeds[] = [];
    offcrineedsDataTemp: OffenderCriminogenicNeeds[] = [];
    offcrineedsModel: OffenderCriminogenicNeeds = new OffenderCriminogenicNeeds();
    offcrineedsIndex = -1;
    offcrineedsInsertList: OffenderCriminogenicNeeds[] = [];
    offcrineedsUpdatetList: OffenderCriminogenicNeeds[] = [];
    offcrineedsDeleteList: OffenderCriminogenicNeeds[] = [];
    offactionplansv1Data: OffApV1[] = [];
    offactionplansv1DataTemp: OffApV1[] = [];
    offactionplansv1Model: OffApV1 = new OffApV1();
    offactionplansv1Index = -1;
    offactionplansv1InsertList: OffApV1[] = [];
    offactionplansv1UpdatetList: OffApV1[] = [];
    offactionplansv1DeleteList: OffApV1[] = [];
    offcasecondsData: OffenderCaseConditions[] = [];
    offcasecondsDataTemp: OffenderCaseConditions[] = [];
    offcasecondsModel: OffenderCaseConditions = new OffenderCaseConditions();
    offcasecondsIndex = -1;
    offcasecondsInsertList: OffenderCaseConditions[] = [];
    offcasecondsUpdatetList: OffenderCaseConditions[] = [];
    offcasecondsDeleteList: OffenderCaseConditions[] = [];
    offactionplansv2Data: OffApV2[] = [];
    offactionplansv2DataTemp: OffApV2[] = [];
    offactionplansv2Model: OffApV2 = new OffApV2();
    offactionplansv2Index = -1;
    offactionplansv2InsertList: OffApV2[] = [];
    offactionplansv2UpdatetList: OffApV2[] = [];
    offactionplansv2DeleteList: OffApV2[] = [];
    vsummarycaseplanData: VSummaryCasePlans[] = [];
    vsummarycaseplanDataTemp: VSummaryCasePlans[] = [];
    vsummarycaseplanModel: VSummaryCasePlans = new VSummaryCasePlans();
    vsummarycaseplanIndex = -1;
    vsummarycaseplanInsertList: VSummaryCasePlans[] = [];
    vsummarycaseplanUpdatetList: VSummaryCasePlans[] = [];
    vsummarycaseplanDeleteList: VSummaryCasePlans[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    casPlnColumnDef: any[];
    offCriNeedsColumnDef: any[];
    offActionPlnV1ColumnDef: any[];
    offActionPlnV2ColumnDef: any[];
    casPlnReadOnly: boolean;
    buttonBlockReadOnly: boolean;
    offCriNeedsReadOnly: boolean;
    offTextReadonly: boolean;
    nbtCriNeedsDatetimeReadOnly: boolean;
    rgcaseplanassRg: any[] = [];
    rgcaseinfoRg: any[] = [];
    cgfkCasplndspdescriptionRg: any[] = [];
    cgfkCasplndspdescription4Rg: any[] = [];
    cgfkCasplndspstaffnameRg: any[] = [];
    rgcrimneedsstsRg: any[] = [];
    rgcaseworkRg: any[] = [];
    rgprgcategoryRg: any[] = [];
    rgprogramidRg: any[] = [];
    rgprogramid2Rg: any[] = [];
    staffAssingDisabled: boolean;
    exitLaunchBtn = false;
    caseNoteDisabled = true;
    assesmentsDisabled = true;
    offActionPlnV1Insert = false;
    offActionPlnV5Insert = false;
    offActionPlnV2Insert = false;
    instCalAgyLocIdDescTemp: any;
    agyLocDescription: string;
    caseplansModel: CasePlans = new CasePlans();
    caseplansModelTemp: CasePlans = new CasePlans();
    caseplansModelTempTwo: CasePlans = new CasePlans();
    caseplansCommitModel: CasePlansCommitBean = new CasePlansCommitBean();
    caseplansInsertList: CasePlans[] = [];
    caseplansUpdateList: CasePlans[] = [];
    caseplansDeleteList: CasePlans[] = [];
    caseplanstaff: CasePlanStaff = new CasePlanStaff();
    caseplanstaffTemp: CasePlanStaff = new CasePlanStaff();
    csePlnInsert: Boolean = false;
    reqReviewFlag:Boolean;
    resulitData: Array<CasePlanStaff> = [];
    conditionPlanAction:boolean;
    userName:String;
    userIdList: any[];
    userIdListCpOwn : any[];
    staffobj: any;
    cromoGenicDelete: any;
    cromoGenicInsert: boolean;
    cromoGenicPlanOfAction1: boolean;
    cromoGenicPlanOfActTwo: boolean;
    caseloadtype: string;
    constructor(private ocdiplanFactory: OcdiplanService, private ocustfasFactory: OcustfasService,
        private ociiplanFactory: OciiplanService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager, public dialogService: DialogService,
        private offenderSearchService: OffenderSearchService, private ocuverifFactory: OcuverifService,
        private router: Router, private oidcnoteFactory: OidcnoteService, private location: Location) {
        this.casPlnColumnDef = [];
        this.offCriNeedsColumnDef = [];
        this.offActionPlnV1ColumnDef = [];
        this.offActionPlnV2ColumnDef = [];
        this.offcasCondsColumnDef = [];
        this.summCasePlanColumnDef = [];
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    }
    ngOnInit() {
        this.staffobj=this.sessionManager.userSessionDetails().staff;
        this.caseloadtype = this.sessionManager.currentCaseLoadType;
        if (this.ociiplanFactory.caseplansData && this.ociiplanFactory.caseplansData.length > 0) {
            this.caseplansData = this.ociiplanFactory.caseplansData;
            this.ociiplanFactory.caseplansData = [];
            this.casePlanRow = this.ociiplanFactory.selectedRow;
            this.ociiplanFactory.selectedRow = 0;
            this.exitLaunchBtn = true;
            if (this.ociiplanFactory.butExitCasePlanFlag) {
                this.ocdiplanFactory.butExitCasePlanFlag = true;
            } else {
                this.ocdiplanFactory.butExitCasePlanFlag = false;
            }
        }
        if (this.oidcnoteFactory.butExitCasePlanFlag) {
            this.exitLaunchBtn = true;
            this.oidcnoteFactory.butExitCasePlanFlag = false;
            this.ocdiplanFactory.butExitCasePlanFlag = true;
            this.ociiplanFactory.butExitCasePlanFlag = false;

        }
        if (this.oidcnoteFactory.exitCaseNoteFlag) {
            this.exitLaunchBtn = true;
            this.caseNoteDisabled = true;
        }
        if (this.ocdiplanFactory.ocdnoqueFlag) {
            this.exitLaunchBtn = this.ocdiplanFactory.previousExitFlag;
            this.caseNoteDisabled = this.ocdiplanFactory.butExitFlag;
        }
        if (this.ocdiplanFactory.ocdnoqueFlag && !this.offenderSearchService.selectedOffender) {
            this.caseNoteDisabled = true;
            this.ocdiplanFactory.ocdnoqueFlag = false;
        }
        this.tabDisabled = false;
        this.offTextReadonly = true;
        this.verifDis = true;
       
          this.casPlnColumnDef = [
            {
                fieldName: this.translateService.translate('ocdiplan.createdate'), field: 'startDate', datatype: 'date',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.status'), field: 'casePlanStatusDesc',
                editable: false, width: 150, domain: 'CASEPLAN_STS', datatype: 'lov'
            },
            {
                fieldName: this.translateService.translate('ocdiplan.custodiallocation'), field: 'custodialLocation', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('ocdiplan.custodialOfficer'), field: 'officer', editable: false,
                width: 300
            },
            
            {
                fieldName: this.translateService.translate('ocdiplan.custodialOfficer'), field: 'custOfficer', datatype: 'hyperlink', displayas: 'href',
                dialogWidth: '80%', styleClass: 'launch', editable: true, width: 100,
                data: 'row', updateField: 'row', modal: true, height: 90, onLaunchClick: this.asnLaunchClick, type: ''
            },
            {
                fieldName: this.translateService.translate('ocdiplan.communitylocation'), field: 'calAgyLocIdDesc',
                editable: false, width: 150,
            },
            {
                fieldName: this.translateService.translate('ocdiplan.communityofficer'), field: 'communityStaffName', editable: false,
                width: 300
            },

            {
                fieldName: this.translateService.translate('ocdiplan.supervision'), field: 'supervisionLevelDesc', editable: false,
                width: 150,  datatype: 'text',  uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('ociiplan.nextreviewdate'), field: 'nextReviewDate',
                datatype: 'date',editable: true,width: 150
            },
            {
                fieldName: this.translateService.translate('common.verified'), field: 'verifiedFlag', editable: false, datatype: 'checkbox',
                width: 150
            },
            {
                fieldName: this.translateService.translate('common.sealFlag'), field: 'sealFlag', editable: false, datatype: 'checkbox',
                width: 150,hide:true
            },
        ];
        this.offCriNeedsColumnDef = [
            {
                fieldName: this.translateService.translate('ocdiplan.assessedriskneed') + '*', field: 'assessedNeedCode',
                datatype: 'lov', domain: 'CASEPLAN_ASS',
                editable: true, width: 150, cellEditable: this.canRowCellEdit
            },
            {
                fieldName: this.translateService.translate('common.objective'), field: 'objective', editable: true,
                width: 300, cellEditable: this.canRowCellEdit, maxlength: 240,
            },
            {
                fieldName: this.translateService.translate('ocdiplan.targetdate'), field: 'targetDate', editable: true, datatype: 'date',
                width: 150, cellEditable: this.canRowCellEdit
            },
            {
                fieldName: this.translateService.translate('common.status') + '*', field: 'statusCode', datatype: 'lov',
                domain: 'CP_FACT_STS', editable: true, width: 150, cellEditable: this.canRowCellEdit
            },
            {
                fieldName: this.translateService.translate('common.enddate'), field: 'endDate', editable: true, datatype: 'date',
                width: 150, cellEditable: this.canRowCellEdit
            },
            {
                fieldName:'', field: 'casePlanId', editable: false, datatype: 'number',hide:true
            },
        ];
        this.offActionPlnV1ColumnDef = [
            {
                fieldName: this.translateService.translate('common.no'), field: 'offActionPlanId', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.casework-stp') + '*', field: 'caseworkType', editable: true,
                width: 150,
                datatype: 'lov', domain: 'CASEPLAN_STP', cellEditable: this.canCellEditCaseWork
            },
            {
                fieldName: this.translateService.translate('common.category'), field: 'programCategory', editable: true,
                datatype: 'lov', domain: 'PLAN_ACT_PRG',
                // link: 'ocdiplan/rgPrgCategoryRecordGroup',
                width: 150, cellEditable: this.canRowCellEdit
            },
            {
                fieldName: this.translateService.translate('common.program'), field: 'programDesc', editable: true,
                width: 150, datatype: 'lov', source: 'OCMSERVI',
                link: 'ocdiplan/rgProgramIdRecordGroup?programCategory=', parentField: 'programCategory', cellEditable: this.canRowCellEdit
            },
            {
                fieldName: this.translateService.translate('common.notes'), field: 'notes', editable: true, width: 150,
                cellEditable: this.canRowCellEdit
            },
            {
                fieldName: this.translateService.translate('common.startdate'), field: 'startDate', editable: true, datatype: 'date',
                width: 150, cellEditable: this.canRowCellEdit
            },
            {
                fieldName: this.translateService.translate('common.enddate'), field: 'endDate', editable: true, datatype: 'date',
                width: 150, cellEditable: this.canRowCellEdit
            },
        ];
        this.offActionPlnV2ColumnDef = [
            {
                fieldName: this.translateService.translate('common.no'), field: 'offActionPlanId', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.casework-stp') + '*', field: 'caseworkType',
                editable: true, width: 150,
                datatype: 'lov', domain: 'CASEPLAN_STP', cellEditable: this.canCellEditCaseWork
            },
            {
                fieldName: this.translateService.translate('common.category'), field: 'programCategory', editable: true,
                datatype: 'lov',
                link: 'ocdiplan/rgPrgCategoryRecordGroup', width: 150, cellEditable: this.canRowCellEdit
            },
            {
                fieldName: this.translateService.translate('common.program'), field: 'programDesc', editable: true,
                width: 150, datatype: 'lov',
                link: 'ocdiplan/rgProgramIdRecordGroup?programCategory=', parentField: 'programCategory',
                cellEditable: this.canRowCellEdit
            },
            {
                fieldName: this.translateService.translate('common.notes'), field: 'notes', editable: true, width: 150,
                cellEditable: this.canRowCellEdit
            },
            {
                fieldName: this.translateService.translate('common.startdate'), field: 'startDate', editable: true, datatype: 'date',
                width: 150, cellEditable: this.canRowCellEdit
            },
            {
                fieldName: this.translateService.translate('common.enddate'), field: 'endDate', editable: true,
                datatype: 'date',
                width: 150, cellEditable: this.canRowCellEdit
            },
        ];
        this.offcasCondsColumnDef = [
            {
                fieldName: this.translateService.translate('common.conditions'), field: 'commConditionCode', editable: false, width: 150,

            },
            { fieldName: '', field: 'description', editable: false, width: 150, },
            {
                fieldName: this.translateService.translate('common.length'), field: 'length', editable: false, width: 150,

            },
            { fieldName: 'Unit', field: 'lengthUnit', editable: false, width: 150, },
            {
                fieldName: this.translateService.translate('common.startdate'), field: 'startDate', editable: false,
                datatype: 'date', width: 150,
            },
            {
                fieldName: this.translateService.translate('common.enddate'), field: 'endDate', editable: false, datatype: 'date',
                width: 150
            },
            {
                fieldName: this.translateService.translate('common.status'), field: 'conditionStatus',
                editable: false, width: 150, datatype: 'lov', link: 'ocmpconf/rgOrderStatus?orderType=COND'
            },
            {
                fieldName: this.translateService.translate('common.objective'), field: 'objective',
                cellEditable: this.canRowCellEdit, width: 150, datatype: 'text', maxlength: 240, uppercase: false
            },
            {
                fieldName: this.translateService.translate('ocdiplan.team'), field: 'teamName',
                editable: false, width: 150, datatype: 'text', uppercase: false
            },
            {
                fieldName: this.translateService.translate('ocdiplan.Officer'), field: 'staffName',
                editable: false, width: 150, datatype: 'text', uppercase: false
            }

        ];
        this.summCasePlanColumnDef = [
            { fieldName: this.translateService.translate('common.issue'), field: 'issue', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.type'), field: 'type', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('system-profile.casework-stp'), field: 'caseworkTypeDesc',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.program'), field: 'programDesc', editable: false,
                width: 150
            },
            { fieldName: this.translateService.translate('common.notes'), field: 'notes', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.startdate'), field: 'startDate', editable: false,
                datatype: 'date', width: 150
            },
            {
                fieldName: this.translateService.translate('common.enddate'), field: 'endDate', editable: false,
                datatype: 'date', width: 150
            },
        ];
        this.getUserName()
        if (!this.vHeaderBlockModel) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
    }

    getAgencyLocInfo(selectedOffender) {
        this.agyLocId = undefined;
        let allowAgencyLocations = this.offenderSearchService.allowAgencies;
        let selectedOffenderAgencyLoc = selectedOffender.agyLocId;
        if(allowAgencyLocations.includes(selectedOffenderAgencyLoc)){
            this.agyLocId = selectedOffenderAgencyLoc;
        }
        else{
            this.agyLocId = selectedOffender.intakeAgyLocId;
        }
        const agyLocIdServiceObj = this.ocustfasFactory.agencyLocations(this.agyLocId);
        agyLocIdServiceObj.subscribe(agyLocDescription => {
            if (agyLocDescription) {
                this.agyLocDescription = agyLocDescription;
            } else {
                this.agyLocDescription = undefined;
            }
        });
    }
    onRowClickCasPln(event) {
        if (event) {
            this.casplnModel = event;
            this.casplnModel.casePlanId=event.casePlanId;
            this.reqReviewFlag = (event.casePlanStatusDesc === 'ACTIVE') ? ((event.reviewFlag === 'ENT' && event.workFlowStatus === 'COMP') ? true : false) : false;
            this.verifDis = (event.casePlanStatusDesc === 'ACTIVE') ? false : true;
            this.offcrineedsData = [];
            this.offactionplansv1Data = [];
            this.offcasecondsData = [];
            this.offactionplansv2Data = [];
            this.vsummarycaseplanData = [];
            this.getUserIdOfAssignedStaff(event);
            this.getUserIdOfAssignedStaffForCpOwn(event);
            this.insertUpdateFlagQuery();
            this.offcrineedsExecuteQuery();
            this.offCaseCondsExecuteQuery();
            this.vsummarycaseplanExecuteQuery();
	    this.cromoGenicInsert = this.cromoGenicInsertFun();
        }
    }

    insertUpdateFlagQuery() {
        this.casplnModel.userId = this.sessionManager.getId();
        const insertUpdateFlagObj = this.ocdiplanFactory.insertUpdateFlagQuery(this.casplnModel);
        insertUpdateFlagObj.subscribe(data => {
            if (data === 1) {
                //  this.cellEditableFlag = true;
                this.offActionPlnV1Insert = true;
                this.criNeedInsert = true;
                this.criNeedUpdate = true;
                this.verifDis = false;
            } else {
                // this.cellEditableFlag = false;
                // this.offActionPlnV1Insert = false;
                // this.criNeedInsert = false;
                //  this.criNeedUpdate = false;
                // this.verifDis = true;
            }
        });
    }
    onRowClickCasCond(event) {
        this.offactionplansv2Data = [];
        if (event) {
            this.offcasecondsModel = event;
            this.offcasecondsModel.latestDatetime = DateFormat.getDate(this.offcasecondsModel.latestDatetime);
            this.offActionPlnV2Insert = this.conditionPlanAction;
            this.offactionplansv2ExecuteQuery();
            
        }
    }

    canRowCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.casePlanStatusDesc !== 'Closed' && this.cromoGenicInsertFun() ) {
            return true;
        } else {
            return false;
        }

    }
    canRowCellReviewEdit = (data: any, index: number, field: string): boolean => {
        if (data.creationDate){
            return false;
        } else {
            return true;
        }

    }
    canCellEditCaseWork = (data: any, index: number, field: string): boolean => {
        if (this.cromoGenicInsertFun()) {
            return true;
        } else {

            return false;
        }

    }
    onRowClickSumCasePlan(event) {

    }

    onRowClickActionPlnV1(event) {
        if(event){
            this.offactionplansv1Model =event;
        } else {
            this.offactionplansv1Model =new OffApV1();
        }
        this.cromoGenicPlanOfAction1= this.cromoGenicPlanOfAction1Fun();
    }

    onRowClickActionPlnV2(event) {
        if(event){
            this.offactionplansv2Model =event;
        }  else {
            this.offactionplansv2Model =new OffApV2();
        }
        this.cromoGenicPlanOfActTwo = this.cromoGenicPlanOfActTwoFun();
    }

    allowNumbers(event) {
    }
    onRowClickoffCriNeeds(event) {
        this.offcrineedsModel = new OffenderCriminogenicNeeds();
        this.offactionplansv1Data = [];
        if (event) {
            this.offcrineedsModel = event;
            this.offcrineedsModel.latestDate = DateFormat.getDate(this.offcrineedsModel.latestDate);
            this.offactionplansv1ExecuteQuery();
            if ((this.offcrineedsData.length > 0) && this.offcrineedsModel.rowId && this.offActionPlnV1Insert) {
                this.offActionPlnV5Insert = true;
            } else {
                this.offActionPlnV5Insert = false;
            }
        } else {
            this.offActionPlnV5Insert = false;
        }
        this.cromoGenicDelete = this.cromoGenicDeleteFun();
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
        this.resulitData=[];
        if (offender) {
            this.getAgencyLocInfo(offender);
            this.assesmentsDisabled = false;
            if (this.oidcnoteFactory.exitCaseNoteFlag) {
                this.exitLaunchBtn = true;
                this.caseNoteDisabled = true;
            } else if (this.ocdiplanFactory.ocdnoqueFlag) {
                this.exitLaunchBtn = this.ocdiplanFactory.previousExitFlag;
                this.caseNoteDisabled = this.ocdiplanFactory.butExitFlag;
                this.ocdiplanFactory.ocdnoqueFlag = false;
            } else {
                this.caseNoteDisabled = false;
            }
            this.offcrineedsData = [];
            this.offactionplansv1Data = [];
            this.casplnData = [];
            this.casplnModel = new CasePlans();
            if (offender.offenderBookId) {
                this.vHeaderBlockModel = offender;
                if (this.sessionManager.currentCaseLoadType === 'COMM') { // this.sessionManager.currentCaseLoadType === 'COMM'
                    this.csePlnInsert = false;
                } else {
                    this.csePlnInsert = true;
                }
                this.verifDis = true;
                this.ocdiplanexecuteQuery();
                this.vsummarycaseplanExecuteQuery();
                this.criNeedInsert = true;
                this.criNeedUpdate = true;
                //this.csePlnInsert = true;
            }
        } else {
            this.vHeaderBlockModel = new VHeaderBlock();
            this.verifDis = true;
            this.casplnData = [];
            this.offcrineedsData = [];
            this.offactionplansv1Data = [];
            this.offcasecondsData = [];
            this.offactionplansv2Data = [];
            this.vsummarycaseplanData = [];
            this.criNeedInsert = false;
            this.criNeedUpdate = false;
            this.caseNoteDisabled = true;
            this.assesmentsDisabled = true;
            this.ocdiplanFactory.ocdnoqueFlag = false;
            //this.csePlnInsert=false;
        }
    }

    afterStaffAssignDlgClosed(event) {
        this.ocdiplanexecuteQuery();
        this.vsummarycaseplanExecuteQuery();
    }

    /**
     * This function displays the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }


    /**
     *  This function will be executed when commit event is
    * fired
    */

    /**
     *  This function will be executed when commit event is
    * fired
    */
    updateCasePlanFromVerif(event) {
        this.casplnInsertList = [];
        this.casplnInsertList.push(event);
        this.casplnCommitModel.updateList = [];
        if (this.casplnInsertList.length > 0) {
            this.casplnCommitModel.insertList = this.casplnInsertList;
        }
        const casplnSaveData = this.ocdiplanFactory.casPlnCommit(this.casplnCommitModel);
        casplnSaveData.subscribe(data => {
            if (data === 1) {
                this.ocdiplanexecuteQuery();
            } else {
                this.ocdiplanexecuteQuery();
            }
        });
    }
    // execute query
    ocdiplanexecuteQuery() {
        this.casplnModel = new CasePlans();
        this.casplnModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        if (this.casplnModel.offenderBookId) {
            const serviceObj = this.ocdiplanFactory.casPlnExecuteQuery(this.casplnModel);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                    this.casplnData = [];
                    this.casplnIndex = -1;
                    this.casplnModel = null;
                    this.cellEditableFlag=true;
                } else {
                    for (let i = 0; i < data.length; i++) {
                        data[i].custOfficer = '';
                        data[i].verifiedFlag = (data[i].verifiedFlag === 'Y') ? 'Y' : undefined;

                    }
                    this.casplnData = data;
                    this.cellEditableFlag=false;
                    this.resulitData=[];
                    this.casplnIndex = 0;
                    this.casplnModel = this.casplnData[0];
                    this.offcrineedsExecuteQuery();
                    this.offCaseCondsExecuteQuery();
                }
            });
        }
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdiplanSaveoffcrineedsForm(event) {
        this.offcrineedsInsertList = event.added;
        this.offcrineedsUpdatetList = event.updated;
        this.offcrineedsCommitModel.insertList = [];
        this.offcrineedsCommitModel.updateList = [];
        this.offcrineedsCommitModel.deleteList = [];
        if (this.offcrineedsInsertList.length > 0 || this.offcrineedsUpdatetList.length > 0) {
            for (let i = 0; i < this.offcrineedsInsertList.length; i++) {
                if (!this.offcrineedsInsertList[i].offenderBookId) {
                    this.offcrineedsInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                    this.offcrineedsInsertList[i].casePlanId = this.casplnModel.casePlanId;
                }
                if (!this.offcrineedsInsertList[i].casePlanId) {
                    this.offcrineedsInsertList[i].casePlanId = this.casplnModel.casePlanId;
                }
                if (!this.offcrineedsInsertList[i].assessedNeedCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdiplan.assessedriskneedmustbeentered');
                    this.show();
                    return;
                }
                if (!this.offcrineedsInsertList[i].statusCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdiplan.statusfieldmustbeentered');
                    this.show();
                    return;
                }
                if (this.offcrineedsInsertList[i].targetDate) {
                    if (DateFormat.compareDate(this.offcrineedsInsertList[i].targetDate, DateFormat.getDate()) === -1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplan.targetdatecannotbelessthancurrentdate');
                        this.show();
                        return;
                    }
                }
                if (this.offcrineedsInsertList[i].endDate) {
                    if (DateFormat.compareDate(this.offcrineedsInsertList[i].endDate, DateFormat.getDate()) === -1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthancurrentdate');
                        this.show();
                        return;
                    }
                }
            }
            for (let i = 0; i < this.offcrineedsUpdatetList.length; i++) {
                if (!this.offcrineedsUpdatetList[i].assessedNeedCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdiplan.assessedriskneedmustbeentered');
                    this.show();
                    return;
                }
                if (!this.offcrineedsUpdatetList[i].statusCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdiplan.statusfieldmustbeentered');
                    this.show();
                    return;
                }
                if (this.offcrineedsUpdatetList[i].targetDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.offcrineedsUpdatetList[i].targetDate), DateFormat.getDate()) === -1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplan.targetdatecannotbelessthancurrentdate');
                        this.show();
                        return;
                    }
                }
                if (this.offcrineedsUpdatetList[i].endDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.offcrineedsUpdatetList[i].endDate), DateFormat.getDate()) === -1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthancurrentdate');
                        this.show();
                        return;
                    }
                }
            }
            this.offcrineedsCommitModel.insertList = this.offcrineedsInsertList;
            this.offcrineedsCommitModel.updateList = this.offcrineedsUpdatetList;
        }
        if (this.offcrineedsDeleteList.length > 0) {
            for (let i = 0; i < this.offcrineedsDeleteList.length; i++) {
            }
            this.offcrineedsCommitModel.deleteList = this.offcrineedsDeleteList;
        }
        const offcrineedsSaveData = this.ocdiplanFactory.offCriNeedsCommit(this.offcrineedsCommitModel);
        offcrineedsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.ocdiplanexecuteQuery();
                this.offcrineedsExecuteQuery();
                this.vsummarycaseplanExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    // execute query
    offcrineedsExecuteQuery() {
        this.offcrineedsModel = new OffenderCriminogenicNeeds();
        this.offcrineedsModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offcrineedsModel.casePlanId = this.casplnModel.casePlanId;
        if (this.offcrineedsModel.offenderBookId != null || this.offcrineedsModel.casePlanId != null ||
            this.offcrineedsModel.assessedNeedCode != null) {
            const serviceObj = this.ocdiplanFactory.offCriNeedsExecuteQuery(this.offcrineedsModel);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                    this.offcrineedsData = [];
                } else {
                    this.offcrineedsData = data;
                    this.offcrineedsIndex = 0;
                    this.offcrineedsModel = this.offcrineedsData[0];
                    this.offactionplansv1ExecuteQuery();
                }
            });
        }
    }

    offactionplansv1ExecuteQuery() {
        this.offactionplansv1Model = new OffApV1();
        this.offactionplansv1Model.offCrimNeedId = this.offcrineedsModel.offCrimNeedId;
        if (this.offactionplansv1Model.offCrimNeedId) {
            const offactionplansv1Result = this.ocdiplanFactory.offActionPlansV1ExecuteQuery(this.offactionplansv1Model);
            offactionplansv1Result.subscribe(offactionplansv1ResultList => {
                if (offactionplansv1ResultList.length === 0) {
                    this.offactionplansv1Data = [];
                } else {
                    this.offactionplansv1Data = offactionplansv1ResultList;
                    this.offactionplansv1Index = 0;
                    this.offactionplansv1Model = offactionplansv1ResultList[0];
                }
            });
        }
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdiplanSaveoffactionplansv1Form(event) {
        this.offactionplansv1InsertList = event.added;
        this.offactionplansv1UpdatetList = event.updated;
        this.offactionplansv1DeleteList = event.removed;
        this.offactionplansv1CommitModel.insertList = [];
        this.offactionplansv1CommitModel.updateList = [];
        this.offactionplansv1CommitModel.deleteList = [];
        if (this.offactionplansv1InsertList.length > 0 || this.offactionplansv1UpdatetList.length > 0) {
            for (let i = 0; i < this.offactionplansv1InsertList.length; i++) {
                if (!this.offactionplansv1InsertList[i].caseworkType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.caseworkmust');
                    this.show();
                    return;
                }
                if (!this.offactionplansv1InsertList[i].offCrimNeedId) {
                    this.offactionplansv1InsertList[i].offCrimNeedId = this.offcrineedsModel.offCrimNeedId;
                }
                const startdate = DateFormat.getDate(this.offactionplansv1InsertList[i].startDate);
                const endDate = DateFormat.getDate(this.offactionplansv1InsertList[i].endDate);
                const newDate = DateFormat.getDate();
                if (this.offactionplansv1InsertList[i].endDate) {
                    if (startdate && DateFormat.compareDate(endDate, startdate) === -1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthenstartdate');
                        this.show();
                        return;
                    }
                    if (DateFormat.compareDate(endDate, newDate) === -1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthancurrentdate');
                        this.show();
                        return;
                    }
                }
                if (this.offactionplansv1InsertList[i].programDesc) {
                    this.offactionplansv1InsertList[i].programId = Number(this.offactionplansv1InsertList[i].programDesc);
                }
                if ((this.offactionplansv1InsertList[i].programCategory && !this.offactionplansv1InsertList[i].programId) ||
                    (!this.offactionplansv1InsertList[i].programCategory && this.offactionplansv1InsertList[i].programId)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdiplan.pleaseentereitherbothcategoryandprogramornoneofthem');
                    this.show();
                    return;
                }
            }
            for (let i = 0; i < this.offactionplansv1UpdatetList.length; i++) {
                if (!this.offactionplansv1UpdatetList[i].caseworkType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.caseworkmust');
                    this.show();
                    return;
                }
                if (this.offactionplansv1UpdatetList[i].programDesc) {
                    this.offactionplansv1UpdatetList[i].programId = Number(this.offactionplansv1UpdatetList[i].programDesc);
                }
                const startdate = DateFormat.getDate(this.offactionplansv1UpdatetList[i].startDate);
                const endDate = DateFormat.getDate(this.offactionplansv1UpdatetList[i].endDate);
                const newDate = DateFormat.getDate();
                if (this.offactionplansv1UpdatetList[i].endDate) {
                    if (startdate && DateFormat.compareDate(endDate, startdate) === -1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthenstartdate');
                        this.show();
                        return;
                    }
                    if (DateFormat.compareDate(endDate, newDate) === -1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthancurrentdate');
                        this.show();
                        return;
                    }
                }
                if ((this.offactionplansv1UpdatetList[i].programCategory && !this.offactionplansv1UpdatetList[i].programId) ||
                    (!this.offactionplansv1UpdatetList[i].programCategory && this.offactionplansv1UpdatetList[i].programId)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdiplan.pleaseentereitherbothcategoryandprogramornoneofthem');
                    this.show();
                    return;
                }
            }
            this.offactionplansv1CommitModel.insertList = this.offactionplansv1InsertList;
            this.offactionplansv1CommitModel.updateList = this.offactionplansv1UpdatetList;
        }
        if (this.offactionplansv1DeleteList.length > 0) {
            for (let i = 0; i < this.offactionplansv1DeleteList.length; i++) {
            }
            this.offactionplansv1CommitModel.deleteList = this.offactionplansv1DeleteList;
        }
        const offactionplansv1SaveData = this.ocdiplanFactory.offActionPlansV1Commit(this.offactionplansv1CommitModel);
        offactionplansv1SaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offactionplansv1ExecuteQuery();
                this.vsummarycaseplanExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }

    /**
    *  This function will be executed when commit event is
    * fired
    */
    ocdiplanSaveoffcasecondsForm(event) {
        this.offcasecondsUpdatetList = event.updated;
        this.offcasecondsCommitModel.insertList = [];
        this.offcasecondsCommitModel.updateList = [];
        this.offcasecondsCommitModel.deleteList = [];
        if (this.offcasecondsInsertList.length > 0 || this.offcasecondsUpdatetList.length > 0) {
            for (let i = 0; i < this.offcasecondsInsertList.length; i++) {
            }
            for (let i = 0; i < this.offcasecondsUpdatetList.length; i++) {
            }
            this.offcasecondsCommitModel.insertList = this.offcasecondsInsertList;
            this.offcasecondsCommitModel.updateList = this.offcasecondsUpdatetList;
        }
        if (this.offcasecondsDeleteList.length > 0) {
            for (let i = 0; i < this.offcasecondsDeleteList.length; i++) {
            }
            this.offcasecondsCommitModel.deleteList = this.offcasecondsDeleteList;
        }
        const offcasecondsSaveData = this.ocdiplanFactory.offCaseCondsCommit(this.offcasecondsCommitModel);
        offcasecondsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offCaseCondsExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    // execute query
    offCaseCondsExecuteQuery() {
        this.offcasecondsModel = new OffenderCaseConditions();
        this.offcasecondsModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offcasecondsModel.casePlanId = this.casplnModel.casePlanId;
        // Need to send status for knowing which records to insert or not this.offcasecondsModel.stat
        this.offcasecondsModel.casePlanStatusDesc = this.casplnModel.casePlanStatusDesc;
        if (this.offcasecondsModel.casePlanId || this.offcasecondsModel.offenderBookId) {
            const serviceObj = this.ocdiplanFactory.offCaseCondsExecuteQuery(this.offcasecondsModel);
            serviceObj.subscribe(data => {
                if (data.length === 0) {

                } else {                 
                    this.offcasecondsData = data;
                    this.offcasecondsModel = this.offcasecondsData[0];
                    this.offactionplansv2ExecuteQuery();
                }
            });
        }
    }

    offactionplansv2ExecuteQuery() {
        this.offactionplansv2Model = new OffApV2();
        this.offactionplansv2Model.offCaseCondId = this.offcasecondsModel.offCaseCondId;
        const offactionplansv2Result = this.ocdiplanFactory.offActionPlansV2ExecuteQuery(this.offactionplansv2Model);
        offactionplansv2Result.subscribe(offactionplansv2ResultList => {
            if (offactionplansv2ResultList.length === 0) {
                this.offactionplansv2Data = [];
            } else {
                this.offactionplansv2Data = offactionplansv2ResultList;
                this.offactionplansv2Model = offactionplansv2ResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdiplanSaveoffactionplansv2Form(event) {
        this.offactionplansv2InsertList = event.added;
        this.offactionplansv2UpdatetList = event.updated;
        this.offactionplansv2DeleteList = event.removed;
        this.offactionplansv2CommitModel.insertList = [];
        this.offactionplansv2CommitModel.updateList = [];
        this.offactionplansv2CommitModel.deleteList = [];
        if (this.offactionplansv2InsertList.length > 0 || this.offactionplansv2UpdatetList.length > 0) {
            for (let i = 0; i < this.offactionplansv2InsertList.length; i++) {
                if (!this.offactionplansv2InsertList[i].caseworkType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.caseworkmust');
                    this.show();
                    return;
                }
                if (!this.offactionplansv2InsertList[i].offCaseCondId) {
                    this.offactionplansv2InsertList[i].offCaseCondId = this.offcasecondsModel.offCaseCondId;
                }
                if (this.offactionplansv2InsertList[i].programDesc) {
                    this.offactionplansv2InsertList[i].programId = Number(this.offactionplansv2InsertList[i].programDesc);
                }
                const startDate = DateFormat.getDate(this.offactionplansv2InsertList[i].startDate);
                const endDate = DateFormat.getDate(this.offactionplansv2InsertList[i].endDate);
                const newDate = DateFormat.getDate();
                if (this.offactionplansv2InsertList[i].endDate) {
                    if (DateFormat.compareDate(endDate, startDate) === -1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthenstartdate');
                        this.show();
                        return;
                    }
                    if (DateFormat.compareDate(endDate, newDate) === -1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthancurrentdate');
                        this.show();
                        return;
                    }
                }
                if ((this.offactionplansv2InsertList[i].programCategory && !this.offactionplansv2InsertList[i].programDesc) ||
                    (!this.offactionplansv2InsertList[i].programCategory && this.offactionplansv2InsertList[i].programDesc)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdiplan.pleaseentereitherbothcategoryandprogramornoneofthem');
                    this.show();
                    return;
                }
            }
            for (let i = 0; i < this.offactionplansv2UpdatetList.length; i++) {
                if (this.offactionplansv2UpdatetList[i].programDesc) {
                    this.offactionplansv2UpdatetList[i].programId = Number(this.offactionplansv2UpdatetList[i].programDesc);
                }
                const startDate = DateFormat.getDate(this.offactionplansv2UpdatetList[i].startDate);
                const endDate = DateFormat.getDate(this.offactionplansv2UpdatetList[i].endDate);
                const newDate = DateFormat.getDate();
                if (this.offactionplansv2UpdatetList[i].endDate) {
                    if (startDate && DateFormat.compareDate(endDate, startDate) === -1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthenstartdate');
                        this.show();
                        return;
                    }
                    if (DateFormat.compareDate(endDate, newDate) === -1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthancurrentdate');
                        this.show();
                        return;
                    }
                }
                if ((this.offactionplansv2UpdatetList[i].programCategory && !this.offactionplansv2UpdatetList[i].programDesc) ||
                    (!this.offactionplansv2UpdatetList[i].programCategory && this.offactionplansv2UpdatetList[i].programDesc)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdiplan.pleaseentereitherbothcategoryandprogramornoneofthem');
                    this.show();
                    return;
                }
            }
            this.offactionplansv2CommitModel.insertList = this.offactionplansv2InsertList;
            this.offactionplansv2CommitModel.updateList = this.offactionplansv2UpdatetList;
        }
        if (this.offactionplansv2DeleteList.length > 0) {
            for (let i = 0; i < this.offactionplansv2DeleteList.length; i++) {
            }
            this.offactionplansv2CommitModel.deleteList = this.offactionplansv2DeleteList;
        }
        const offactionplansv2SaveData = this.ocdiplanFactory.offActionPlansV2Commit(this.offactionplansv2CommitModel);
        offactionplansv2SaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offactionplansv2ExecuteQuery();
                this.vsummarycaseplanExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }

    vsummarycaseplanExecuteQuery() {
        this.vsummarycaseplanModel = new VSummaryCasePlans();
        this.vsummarycaseplanModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.vsummarycaseplanModel.casePlanId = this.casplnModel.casePlanId;
        const vsummarycaseplanResult = this.ocdiplanFactory.vSummaryCasePlanExecuteQuery(this.vsummarycaseplanModel);
        vsummarycaseplanResult.subscribe(vsummarycaseplanResultList => {
            if (vsummarycaseplanResultList.length === 0) {
                this.vsummarycaseplanData = [];
            } else {
                this.vsummarycaseplanData = vsummarycaseplanResultList;
                this.vsummarycaseplanIndex = 0;
                this.vsummarycaseplanModel = vsummarycaseplanResultList[0];
            }
        });
    }

    onCriNeedsInsert = () => {
        return {
            casePlanId : this.casplnModel.casePlanId
        };

    }

    onActionInsert = () => {
        /*    if (!this.cellEditableFlag) {
               return;
           } else { */
        if ((this.offcrineedsData.length > 0) && this.offcrineedsModel.rowId) {
        } else {
            return;
        }
        return {};

    }

    onActionPlanInsert = () => {
        if (this.offcasecondsData.length > 0) {
        } else {
            return;
        }
        return {};
    }

    onButVerificationClick = () => {
        /* if (!this.cellEditableFlag) {
            return false;
        } else { */
        const workLogResult = this.ocdiplanFactory.workFlowExecuteQuery(this.casplnModel);
        workLogResult.subscribe(workResultList => {
            if (workResultList.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuverif.verificationmessage');
                this.show();
            } else {
                for (let i = 0; i < workResultList.length; i++) {
                    if (workResultList[i].createDate) {
                        workResultList[i].createDate = DateFormat.getDate(workResultList[i].createDate);
                        workResultList[i].status = workResultList[i].workFlowStatus
                        workResultList[i]['rowId'] = i;

                    }
                }
                workResultList['queryMode'] = true;
                workResultList['casePlanId'] = this.casplnModel.casePlanId;
                workResultList['offenderBookId'] = this.casplnModel.offenderBookId;
                workResultList['verifyCheckFlag'] = this.casplnModel.verifiedFlag;
                workResultList['userName']=this.userName;
                workResultList['agyLocId'] = this.casplnModel.agyLocId;
                workResultList['screenId'] = 'OCDIPLAN';
                this.dialogService.openLinkDialog('/OCUVERIF', workResultList, 50).subscribe(result => {
                    if (result) {
                        this.casplnModel.verifiedFlag = 'Y';
                        this.updateCasePlanFromVerif(this.casplnModel);
                    }else{
                        this.ocdiplanexecuteQuery();
                    }
                    this.onverifyBtnClosed(result);
                });
                // return true;
            }
        });
        //  }
    }

    onverifyBtnClosed(event) {
    }

    validateCrimData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'targetDate' && event.newValue !== event.oldValue) {
            if (DateFormat.compareDate(event.data.targetDate, DateFormat.getDate()) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdiplan.targetdatecannotbelessthancurrentdate');
                this.show();
                rowdata.validated = false;
                return rowdata;
            }
        } else if (event.field === 'endDate' && event.newValue !== event.oldValue) {
            if (DateFormat.compareDate(event.data.endDate, DateFormat.getDate()) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthancurrentdate');
                this.show();
                rowdata.validated = false;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    validateCrimActionData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        const startDate = DateFormat.getDate(event.data.startDate);
        const endDate = DateFormat.getDate(event.data.endDate);
        const newDate = DateFormat.getDate();
        if (event.field === 'programCategory') {
            this.offactionplansv1Grid.setColumnData('programDesc', index, undefined);
        }
        if (event.field === 'endDate' && event.newValue !== event.oldValue) {
            if (startDate && DateFormat.compareDate(endDate, startDate) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthenstartdate');
                this.show();
                rowdata.validated = true;
                return rowdata;
            }
            if (DateFormat.compareDate(endDate, newDate) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthancurrentdate');
                this.show();
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    validateCaseData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'endDate' && event.newValue !== event.oldValue && event.data.startDate) {
            if (DateFormat.compareDate(event.data.endDate, event.data.startDate) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthenstartdate');
                this.show();
                rowdata.validated = false;
                return rowdata;
            }
        } else if (event.field === 'endDate' && event.newValue !== event.oldValue) {
            if (DateFormat.compareDate(event.data.endDate, DateFormat.getDate()) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthancurrentdate');
                this.show();
                rowdata.validated = false;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    validateCaseCondData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        const startDate = DateFormat.getDate(event.data.startDate);
        const endDate = DateFormat.getDate(event.data.endDate);
        const newDate = DateFormat.getDate();
        if (event.field === 'programCategory') {
            this.offActionPlnV2Grid.setColumnData('programDesc', index, undefined);
        }
        if (event.field === 'endDate' && event.newValue !== event.oldValue) {
            if (startDate && DateFormat.compareDate(endDate, startDate) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthenstartdate');
                this.show();
                rowdata.validated = false;
                return rowdata;
            }
            if (DateFormat.compareDate(endDate, newDate) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdiplan.enddatecannotbelessthancurrentdate');
                this.show();
                rowdata.validated = false;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    validateCasPlnData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'nextReviewDate' && event.newValue !== event.oldValue) {
            if ((DateFormat.compareDate(event.data.nextReviewDate, DateFormat.getDate()) === -1) || (DateFormat.compareDate(event.data.nextReviewDate, DateFormat.getDate()) === 0)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdiplan.nextreviewvalidation');
                this.show();
                rowdata.validated = false;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    onExitBtnClick = () => {
        this.ociiplanFactory.caseplansData = this.caseplansData;
        this.ociiplanFactory.selectedRow = this.casePlanRow;
        if (this.ociiplanFactory.butExitCasePlanFlag) {
            this.ociiplanFactory.butExitCasePlanFlag = false;
        }
        this.oidcnoteFactory.exitCaseNoteFlag = undefined;
        this.ocdiplanFactory.routeUrl = undefined;
        this.location.back();
    }
    onOidcnoteClick = () => {
        if (this.sessionManager.currentCaseLoadType === 'COMM') {
            this.router.navigate(['/OCDCLOGS']);
        } else {
            this.ocdiplanFactory.oidcnoteExitFlag = true;
            this.ocdiplanFactory.routeUrl = this.router.url;
            this.router.navigate(['/OIDCNOTE']);
        }
        return true;
    }
    onLaunchClick = () => {
        this.oidcnoteFactory.exitFlag = true;
        this.ocdiplanFactory.previousExitFlag = this.exitLaunchBtn;
        this.ocdiplanFactory.butExitFlag = this.caseNoteDisabled;
        this.ocdiplanFactory.ocdnoqueFlag = false;
        return true;
    }

    onCasPlnInsert = () => {
        if(this.vHeaderBlockModel.agyLocId === 'OUT' || this.vHeaderBlockModel.agyLocId === 'TRN'){
            this.type = 'warn';
            this.message = this.translateService.translate('ocdiplan.offenderisnotassignedtoalocation');
            this.show();
            return; 
        }
        this.csePlnInsert=false;
        return {
            custodialLocation: this.agyLocDescription, startDate: DateFormat.getDate(), custOfficer: '',
        };
    }

    asnLaunchClick = (data) => {
        if (this.sessionManager.currentCaseLoadType === 'INST' && ( !data.caseloadType  || data.caseloadType!=='COMM')) {
            data.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            data['agyLocId'] = this.agyLocId;
            if (!this.csePlnInsert && (this.resulitData.length > 0)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdiplan.onlyoneCasePlanatatime');
                this.show();
                return;
            } else {
                const node = this.grid.gridOptions.api.getSelectedNodes().length && this.grid.gridOptions.api.getSelectedNodes()[0];
                const rowIndex = node.rowIndex;
                this.dialogService.openLinkDialog('/OCDIPLAC', data, 80).subscribe(result => {
                    if (result !== null) {
                        this.grid.setColumnData('officer', rowIndex, undefined);
                        this.resulitData = [];
                        this.csePlnInsert = false;
                        this.resulitData = result.data;
                        var cpOwnerCount = 0;
                        for (let i = 0; i < this.resulitData.length; i++) {                      
                         if(this.resulitData[i].cpOwner === 'Y'){
                             cpOwnerCount ++;
                             this.caseplanstaffTemp = this.resulitData[i];
                         }                          
                        }

                        if(cpOwnerCount > 1){
                            this.grid.setColumnData('officer', rowIndex, 'Multiple Officers');
                            //this.caseplanstaffTemp = this.resulitData[j];
                            this.refreshGridSize();
                        } else {
                            for (let j = 0; j < this.resulitData.length; j++) {
                            if (this.resulitData[j].cpOwner === 'Y') {
                                this.grid.setColumnData('officer', rowIndex, this.resulitData[j].staffName);
                                this.caseplanstaffTemp = this.resulitData[j];
                                this.refreshGridSize();
                                break;
                            }
                        }
                    }
                    } else {
                    }
                });
            }
        }
    }

    refreshGridSize() {
        var eGridDiv = document.querySelector('#caspln') as HTMLElement;
        let size = '1000px';
        eGridDiv.style.setProperty('width', size);
        setTimeout(() => {
            eGridDiv.style.removeProperty('width');
        }, 0);
    }

    ocustfasSavecaseplansForm(event) {
        this.caseplansInsertList = [];
        this.caseplansUpdateList = [];
        this.caseplansDeleteList = [];
        this.caseplansInsertList = event.added;
        this.caseplansCommitModel.updateList = [];
       // this.caseplansUpdateList=event.updated;


        if (this.caseplansInsertList.length > 0) {
            for (let i = 0; i < this.caseplansInsertList.length; i++) {
                this.caseplansInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.caseplansInsertList[i].casePlanStatus = 'ACTIVE';
                this.caseplansInsertList[i].instCalAgyLocId = this.offenderSearchService.selectedOffender.agyLocId;
                this.caseplansInsertList[i].createDateTime = DateFormat.getDate();
                this.caseplansInsertList[i].createUserId = this.sessionManager.getId();
                this.caseplansInsertList[i].creationDate = DateFormat.getDate();
                this.caseplansInsertList[i].creationUser = this.sessionManager.getId();
                this.caseplansInsertList[i].caseloadType = this.offenderSearchService.selectedOffender.agyLocType;
                this.caseplansInsertList[i].agyLocId = this.offenderSearchService.selectedOffender.agyLocId;
                //this.caseplansInsertList[i].startDate = DateFormat.getDate(this.caseplanstaffTemp.startDate);
                this.caseplansInsertList[i].role = this.caseplansModelTempTwo.role;
                this.caseplansInsertList[i].userId = this.caseplansModelTempTwo.userId;
               // this.caseplansInsertList[i].fromDate = DateFormat.getDate(this.caseplansModelTempTwo.startDate);

               //this.caseplansInsertList[i].sacStaffId = Number(this.caseplanstaffTemp.staffId);
                this.caseplansInsertList[i].calAgyLocId = this.offenderSearchService.selectedOffender.agyLocId;
                this.caseplansInsertList[i].supervisionLevelDesc = this.vHeaderBlockModel.offSupLevel;
                if(this.resulitData && this.resulitData.length>0)
                for(let i=0;i<this.resulitData.length;i++){
                    if(this.resulitData[i].activeFlag==='Y'){
                        this.resulitData[i].endDate=null;
                    }
                }
                this.caseplansInsertList[i].list = this.resulitData
              if(this.sessionManager.currentCaseLoadType==='INST'){
                this.caseplansInsertList[i].calAgyLocId=null;
              }else{
                this.caseplansInsertList[i].instCalAgyLocId =null;
              }
                if (!this.caseplansInsertList[i].officer) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('You must assign one CP owner');
                    this.show();
                    return;
                }
                if(this.caseplansInsertList[i].officer){

                }
            }
            this.caseplansCommitModel.insertList = this.caseplansInsertList;
            if (!this.casplnModel == null) {
                //this.caseplansCommitModel.updateList.push(this.casplnModel)
            }
        }
        if(this.caseplansInsertList.length===0)
        this.caseplansUpdateList.push(this.casplnModel);
        else
        this.caseplansUpdateList=[];

        if(this.caseplansUpdateList.length>0){
            if(this.resulitData && this.resulitData.length>0)
            for(let i=0;i<this.resulitData.length;i++){
                if(this.resulitData[i].activeFlag==='Y'){
                    this.resulitData[i].endDate=null;
                }
            }
            this.caseplansUpdateList[0].list=this.resulitData;
            //this.caseplansUpdateList[0].sacStaffId=Number(this.caseplanstaffTemp.staffId);
            this.caseplansCommitModel.updateList=this.caseplansUpdateList;
            this.caseplansCommitModel.insertList=[];
        }

        const caseplansSaveData = this.ocustfasFactory.casePlansCommit(this.caseplansCommitModel);
        caseplansSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.csePlnInsert = true;
                this.offActionPlnV1Insert = true;
                this.resulitData=[];
                this.ocdiplanexecuteQuery();
                return;
            } else {
                if(data ===  9){
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdipan.securitylevelcodedefinedinsystemprofiles');
                    this.show();
                    return;
                }
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }
    caseplansExecuteQuery() {
        const caseplansResult = this.ocustfasFactory.casePlansExecuteQuery(this.casplnModel.offenderBookId);
        caseplansResult.subscribe(data => {
            if (data.length === 0) {
                this.caseplansData = [];

                this.caseplansModelTemp = null;
            } else {
                this.caseplansData = data;
                this.caseplansModelTemp = data[0];
            }
        });
    }
    onClear = () => {
        this.csePlnInsert = true;
        this.resulitData=[];
        return true;
    }
    onGridClear = () => {
        return true;
    }
    ngOnDestroy(): void {
        this.oidcnoteFactory.exitCaseNoteFlag = undefined;
        this.ocdiplanFactory.routeUrl = undefined;
    }


    getUserName() {
        this.ocdiplanFactory.getUserName(this.sessionManager['userSession'].id).subscribe(data => {
            this.userName = data;
        });
    }

    getUserIdOfAssignedStaff(event) {
        const caseplansResult = this.ocdiplanFactory.getUserIdOfAssignedStaff(this.casplnModel);
        caseplansResult.subscribe(data => {
            this.userIdList = data;
            if (event && event.casePlanStatusDesc === 'ACTIVE' && event.creationDate && (this.userIdList.includes(this.sessionManager['userSession'].id) || event.casePlanUserId === this.sessionManager['userSession'].id) && event.caseloadType === this.sessionManager.currentCaseLoadType) {
                this.offActionPlnV1Insert = true;
                this.offActionPlnV5Insert = true;
                this.conditionPlanAction = true;
            }
            else {
                this.offActionPlnV1Insert = false;
                this.offActionPlnV5Insert = false;
                this.offActionPlnV2Insert = false;
                this.conditionPlanAction = false;
            }
        });
    }

    getUserIdOfAssignedStaffForCpOwn(event) {
        const caseplansResult = this.ocdiplanFactory.getUserIdOfAssignedStaffForCpOwn(this.casplnModel);
        caseplansResult.subscribe(data => {
            this.userIdListCpOwn = data;
        });
    }
	cromoGenicInsertFun (){
        if(this.casplnModel && this.casplnModel.casePlanId && this.staffobj ) {
            if((this.casplnModel.casePlanStatusDesc && this.casplnModel.casePlanStatusDesc.toUpperCase() !== 'CLOSED') && (this.caseloadtype === 'INST' && this.casplnModel.staffIdList && this.casplnModel.staffIdList.includes(this.staffobj.staffId)) || (this.caseloadtype === 'COMM' && this.staffobj.staffId === this.casplnModel.sacStaffId)){
                return true;
            } else {
                return false; 
            }
           
        } else {
            return false; 
        }
    }
    
     cromoGenicDeleteFun(){
        if(this.casplnModel && this.offcrineedsModel && this.casplnModel.casePlanId && this.staffobj && this.offcrineedsModel.createDatetime) {
            if((this.casplnModel.casePlanStatusDesc && this.casplnModel.casePlanStatusDesc.toUpperCase() !== 'CLOSED') && (this.caseloadtype === 'INST' && this.casplnModel.staffIdList && this.casplnModel.staffIdList.includes(this.staffobj.staffId)) || (this.caseloadtype === 'COMM' && this.staffobj.staffId === this.casplnModel.sacStaffId)){
                return true;
            } else {
                return false; 
            }
           
        } else {
            return false; 
        }
    }

     cromoGenicPlanOfActTwoFun(){
        if(this.casplnModel && this.offactionplansv2Model && this.casplnModel.casePlanId && this.staffobj && this.offactionplansv2Model.offActionPlanId) {
            if((this.casplnModel.casePlanStatusDesc && this.casplnModel.casePlanStatusDesc.toUpperCase() !== 'CLOSED') && (this.caseloadtype === 'INST' && this.casplnModel.staffIdList && this.casplnModel.staffIdList.includes(this.staffobj.staffId)) || (this.caseloadtype === 'COMM' && this.staffobj.staffId === this.casplnModel.sacStaffId)){
                return true;
            } else {
                return false; 
            }       
        } else {
            return false; 
        }
    }

     cromoGenicPlanOfAction1Fun(){
        if(this.casplnModel && this.offactionplansv1Model && this.casplnModel.casePlanId && this.staffobj && this.offactionplansv1Model.offActionPlanId) {
            if((this.casplnModel.casePlanStatusDesc && this.casplnModel.casePlanStatusDesc.toUpperCase() !== 'CLOSED') && (this.caseloadtype === 'INST' && this.casplnModel.staffIdList && this.casplnModel.staffIdList.includes(this.staffobj.staffId)) || (this.caseloadtype === 'COMM' && this.staffobj.staffId === this.casplnModel.sacStaffId)){
                return true;
            } else {
                return false; 
            }       
        } else {
            return false; 
        }
    }

    get verifDisable (){
        if(this.casplnModel && this.casplnModel.casePlanId && this.staffobj ) {
            if((this.casplnModel.casePlanStatusDesc && this.casplnModel.casePlanStatusDesc.toUpperCase() !== 'CLOSED') && (this.caseloadtype === 'INST' && this.casplnModel.staffIdList && this.casplnModel.staffIdList.includes(this.staffobj.staffId)) || (this.caseloadtype === 'COMM' && this.staffobj.staffId === this.casplnModel.sacStaffId)){
                return false;
            } else {
                return true; 
            }
           
        } else {
            return true; 
        }
    }
}