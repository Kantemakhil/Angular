import {
    Component, OnInit, OnDestroy, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdnoqueService } from '@inst/classification/service/ocdnoque.service';
import { VOffassAss } from '@inst/classification/beans/VOffassAss';
import { OffenderAssessments } from '@inst/classification/beans/OffenderAssessments';
import { OffenderAssessmentsCommitBean } from '@inst/classification/beans/OffenderAssessmentsCommitBean';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Location } from '@angular/common';
import { OidcnoteService } from '@inst/casemanagement/service/oidcnote.service';
import { OcdiplanService } from '../../casemanagement/service/ocdiplan.service';
import { InjectOffenderService } from '@core/service/inject-offender.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OidpactiService } from '@inst/institutional-activities/service/oidpacti.service';
import { OidmbrdtService } from '@inst/securitythreatgroups/service/oidmbrdt.service';
import { LovService } from '@core/ui-components/lov/lov.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { th } from 'date-fns/locale';
import { AssessmentSupervisions } from '../assessmentmaintenance/beans/AssessmentSupervisions';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { OiiclassService } from '../service/oiiclass.service';
import { OiiclassClassInquiry } from '../beans/OiiclassClassInquiry';


//  import required bean declarations

@Component({
    selector: 'app-ocdnoque',
    templateUrl: './ocdnoque.component.html'
})

export class OcdnoqueComponent implements OnInit, OnDestroy {
    @ViewChild('offasstabone', { static: true }) offasstabone: any;
    isSaveDiable: boolean = true;userName: any;
    overrideUderIdTemp: String;
    datefieldsReadonly = false;
    typeFlag = true;
    assessmentLink: string;
    //  Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offassData: VOffassAss[] = [];
    offassDataTemp: VOffassAss[] = [];
    offassModel: VOffassAss = new VOffassAss();
    offassBean: VOffassAss = new VOffassAss();
    offassBeanTemp: VOffassAss = new VOffassAss();
    offassIndex = 0;
    offassexistList: VOffassAss[] = [];
    offaEnableBtnList: VOffassAss[] = [];
    offassInsertList: VOffassAss[] = [];
    offassUpdatetList: VOffassAss[] = [];
    offassDeleteList: VOffassAss[] = [];
    offass1Data: OffenderAssessments[] = [];
    offass1DataTemp: OffenderAssessments[] = [];
    offass1Model: OffenderAssessments = new OffenderAssessments();
    offass1Modeldata: OffenderAssessments = new OffenderAssessments();
    ass1DbData: OffenderAssessments = new OffenderAssessments();
    offass1ModelTemp: OffenderAssessments = new OffenderAssessments();
    offass1ModelOne: OffenderAssessments = new OffenderAssessments();
    offass1Bean: OffenderAssessments = new OffenderAssessments();
    offass1Index = 0;
    offass1InsertList: OffenderAssessments[] = [];
    offass1UpdateList: OffenderAssessments[] = [];
    offass1DeleteList: OffenderAssessments[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offAssColumnDef: any[];
    offAssReadOnly = false;
    offAss1ReadOnly = false;
    rgassessmenttypeidRg: any[] = [];
    rgassesscommittecodeRg: any[] = [];
    rgagencylocationsRg: any[] = [];
    rgstaffmembersRg: any[] = [];
    rgoverridedsupleveltypeRg: any[] = [];
    rgplaceagylocidRg: any[] = [];
    rgoverridereasonRg: any[] = [];
    offass1CommitModel: OffenderAssessmentsCommitBean = new OffenderAssessmentsCommitBean();
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    overrideResultLink: any;
    selectedRow: number;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    vHeaderBlockModelTemp: VHeaderBlock = new VHeaderBlock();
    rgassessmenttypMap: Map<string, string> = new Map<string, string>();
    assesTypeIdMap: Map<string, string> = new Map<string, string>();
    assReadonly = true;
    detailsReadonly = true;
    overrideResultReadonly = true;
    overrideReasonReadonly = true;
    fieldsReadonly = true;
    assIdValue: any;
    reAssReadonly = true;
    disabledQnnaire = false;
    assessmentDateTemp: any;
    innerAssesmentDate: Date;
    assesmentTypeMap: Map<string, string> = new Map<string, string>();
    assesmentTypeFlag: Map<string, string> = new Map<string, string>();
    authTitles = { 'description': 'Authority' };
    overrideTitles = { 'description': 'Override' };
    prevAssDatevalue: any;
    assDatevalue: any;
    addFlag = false;
    exitLaunchBtn = false;
    assValue: any;
    backBtn = false;
    reAssDateReadOnly: Boolean;
    overrideReadOnly: Boolean = true;
    disabledSec: Boolean;
    overrideRecommReadonly: Boolean;
    assessmentdatecommReadonly: boolean;
    addBtnDisable: Boolean;
    enableInsertFlag: boolean = false;
    //saveBtnDisable : boolean = true;
    count: number;
    tempFalg: boolean = false;
    minScore: number;
    maxScore: number;
    assesmentId: number;
    assessmentSupervisionsList: AssessmentSupervisions[] = [];
    offass1ModelTempOne: OffenderAssessments = new OffenderAssessments();
    overridecommentDsbl : boolean = true;
    screenId = 'OCDNOQUE';
    assessmentInquiryParam: OiiclassClassInquiry = new OiiclassClassInquiry();
    parentcode:string;

    constructor(private ocdnoqueFactory: OcdnoqueService, public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService, public osiosearFactory: OsiosearService,
        private oidpactiFactory: OidpactiService, private router: Router, private lovService: LovService,
        private sessionManager: UserSessionManager, private location: Location, private oidcnoteFactory: OidcnoteService,
        private ocdiplanFactory: OcdiplanService,
        private activatedRoute: ActivatedRoute, private injectOffenderService: InjectOffenderService,
        private oidmbrdtFactory: OidmbrdtService,
        private oiiclassService :OiiclassService,
        private dialogService: DialogService,private eoffenderService: EoffenderService) {
        //  TODO initilize data members here..!
        this.offAssColumnDef = [];
    }
    ngOnInit() {
        this.parentcode=this.sessionManager.currentCaseLoadType
        this.getScoreRange();
        this.getUserName();
        this.assessmentdatecommReadonly = true;
        this.reAssDateReadOnly = true;
        this.disabledSec = true;
        this.disabledQnnaire = true;
        this.overrideRecommReadonly = true;
        this.reAssDateReadOnly = true;
        this.addBtnDisable = true;
        this.overrideReasonReadonly = true;
        if (this.oidcnoteFactory.exitFlag) {
            this.exitLaunchBtn = true;
            this.oidcnoteFactory.exitFlag = false;
        }
        this.addFlag = false;
        this.disabledQnnaire = false;
        this.assReadonly = true;
        this.reAssReadonly = true;
        this.detailsReadonly = true;
        this.overrideResultReadonly = true;
        this.fieldsReadonly = true;
        this.selectedRow = 0;
        this.vHeaderBlockModel = new VHeaderBlock();
        this.injectOffenderService.injectOffenderInService(this.activatedRoute);
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (this.oidpactiFactory.programId) {
            this.offassBean.programId = this.oidpactiFactory.programId;
           // this.assessmentLink = 'ocdnoque/rgAssessmentTypeIdRecordGroup?programid=' + this.offassBean.programId;
           this.assessmentLink ='ocdnoque/rgAssessmentTypeEVALRecordGroup';
            this.offassExitDataQuery();
        } else {
            this.assessmentLink = 'ocdnoque/rgAssessmentTypeIdRecordGroupWithoutProgramid';
        }
        if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId !== undefined) {
            this.fieldsReadonly = false;
            this.vHeaderBlockModel = this.vHeaderBlockModel;
            this.assReadonly = false;
            this.reAssReadonly = false;
            this.offassExecuteQuery();
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
        this.offAssColumnDef = [
            {
                fieldName: this.translateService.translate('common.type'), field: 'assessmentTypeCode', editable: true, cellEditable: this.assCellEdit,
                width: 200, datatype: 'lov', link: this.assessmentLink , required: true
            },
            {
                fieldName: this.translateService.translate('ocdnoque.questionnaire'), field: 'qBtn', datatype: 'hyperlink', displayas: 'href', styleClass: 'edit', width: 150, modal: true, data: 'row', onLaunchClick: this.onQnaireLaunchClick,
            },
            {
                fieldName: this.translateService.translate('ocdnoque.status'), field: 'assessmentStatus', editable: false, width: 200, datatype: 'lov', domain: 'ASSESS_STATS',
            },
            { fieldName: this.translateService.translate('ocdnoque.score'), field: 'score', editable: false, width: 120 },

            { fieldName: this.translateService.translate('ocdnoque.overrideScore'), field: 'overrideScore', datatype: 'number', width: 120, cellEditable: this.overrideScoreEditable },
            {
                fieldName: this.translateService.translate('ocdnoque.calculatedresult'), field: 'calcSupLevelType', editable: false, width: 200
            },
            {
                fieldName: this.translateService.translate('ocdnoque.approvedresult'), field: 'reviewSupLevelType', editable: false, width: 200
            },
            {
                fieldName: this.translateService.translate('ocdnoque.overrideresult'), field: 'overridedSupLevelType', editable: false, width: 170
            },
            {
                fieldName: this.translateService.translate('ocdnoque.sectiondetails'), field: 'sBtn', datatype: 'hyperlink', displayas: 'href', styleClass: 'launch', width: 150, link: '/OMUCLASS', modal: true, data: 'row', onLaunchClick: this.onSecLaunchClick,
            },
            {
                fieldName: this.translateService.translate('ocdnoque.iwpdocument')
				, field: 'iwpButton', datatype: 'hyperlink',onLaunchClick: this.onEoffenderClick,
				editable: true, displayas: 'href', styleClass: 'file_copy',
				width: 50, data: 'row', updateField: 'row', modal: false,queryparam: 'SCREEN'
            },
            { fieldName: '', field: 'medicalFlag', hide: true },
        ];
        const rgassessmenttypeidServiceObj = this.ocdnoqueFactory.rgAssessmentTypeIdRecordGroupWithoutProgramid();
        rgassessmenttypeidServiceObj.subscribe(rgassessmenttypeidList => {
            if (rgassessmenttypeidList.length === 0) {
                this.rgassessmenttypeidRg = [];
            } else {
                for (let i = 0; i < rgassessmenttypeidList.length; i++) {
                    this.rgassessmenttypeidRg.push({
                        'text': rgassessmenttypeidList[i].code + ' - ' +
                            rgassessmenttypeidList[i].description, 'id': rgassessmenttypeidList[i].code
                    });
                    this.rgassessmenttypMap.set(rgassessmenttypeidList[i].assessmentId, rgassessmenttypeidList[i].code);
                    this.assesTypeIdMap.set(rgassessmenttypeidList[i].code, rgassessmenttypeidList[i].assessmentId);
                    this.assesmentTypeMap.set(rgassessmenttypeidList[i].code, rgassessmenttypeidList[i].reviewCycleDays);
                    this.assesmentTypeFlag.set(rgassessmenttypeidList[i].code, rgassessmenttypeidList[i].requireApprovalFlag);
                }
            }
        });
        if (this.oidmbrdtFactory.assessmentFlag || this.oiiclassService.backButton) {
            this.backBtn = true;
            this.oiiclassService.backButton = false;
                this.assessmentInquiryParam =this.oiiclassService.searchParam;
                this.oiiclassService.searchParam =undefined;
                    }
        else{
            this.backBtn=false;
        }
    }

    onRowClickoffass(event) {
        if (event) {
            this.offassModel = event;
            this.eoffenderService.selectedRowData=event;
            this.assDatevalue = undefined;
            this.offassBeanTemp = event;
            this.assDatevalue = event.assessmentDate;
            if(event.assessmentStatus === 'D'){
                this.overridecommentDsbl = true;
            }else{
                this.overridecommentDsbl = false;
            }
            if (event.assessmentDate) {
                this.assessmentdatecommReadonly = true;
            }
            else {
                this.assessmentdatecommReadonly = false;
            }
            this.offass1Model.assessmentTypeCode = event.assessmentTypeCode;
            this.offass1ModelTempOne.overrideScore=event.overrideScore;
            if (!this.oidpactiFactory.programId && !this.reAssReadonly && this.oidmbrdtFactory.assessmentFlag) {
                this.lovService.clear(this.assessmentLink);
                this.assessmentLink = 'ocdnoque/rgAssessmentTypeIdRecordGroupWithoutProgramid';
            }
            this.overrideResultLink = 'ocdnoque/rgOverridedSupLevelTypeRecordGroup?assessmentId=' + event.assessmentTypeId;
            if (this.offassModel.offenderBookId && this.offassModel.assessmentSeq >= 0) {
                //this.offass1ExecuteQuery();
            }
            if (event.assessStatus === 'A' && event.requireApprovalFlag === 'N' && event.reviewSupLevelType != null && event.reviewSupLevelType != undefined && event.evaluationResultCode =="APP") {
                this.overrideResultReadonly = true;
            } else if (event.assessStatus === 'A' && event.requireApprovalFlag === 'Y' && event.evaluationResultCode =="APP") {
                this.overrideResultReadonly = true;
            } else {
                this.overrideResultReadonly = false;
            }
            this.offass1Modeldata.assessmentSeq = event.assessmentSeq;
            this.offass1Modeldata.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offass1ExecuteQuery();
        } else {
            this.overrideRecommReadonly = true;
            this.overrideResultLink = '';
            this.offass1Model.assessmentTypeCode = undefined;
            this.offassBeanTemp = new VOffassAss();
            this.assDatevalue = undefined;
            this.overrideReasonReadonly = true;
            this.eoffenderService.selectedRowData=null;
        }
    }

    set assesmentDate(passesmentDate: Date) {
        if (this.innerAssesmentDate !== passesmentDate) {
            passesmentDate = this.innerAssesmentDate;
            this.offass1Model.assessmentDate = this.innerAssesmentDate;
        }
    }
    getScoreRange() {
        const obj = this.ocdnoqueFactory.scoreRange();
        obj.subscribe(data => {
            if (data) {
                this.assessmentSupervisionsList = data;
            }
        })
    }

    get assesmentDate(): Date {
        return this.innerAssesmentDate;
    }
    onButQuestionclick() {
    }
    allowNumbers(event) {
    }
    onButSectionDetailclick() {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
        this.overrideRecommReadonly = true;
        this.overrideReadOnly = true;
        if (offender) {
            if (offender.offenderBookId) {
                this.assessmentdatecommReadonly = true;
                this.assReadonly = false;
                this.vHeaderBlockModel = offender;
                this.offassData = [];
                this.offassModel = new VOffassAss();
                this.offass1Model = new OffenderAssessments();
                this.ass1DbData = new OffenderAssessments();
                this.offassExecuteQuery();
                this.fieldsReadonly = false;
                this.reAssDateReadOnly = false;
                this.disabledSec = false;
                this.disabledQnnaire = false;
                this.overrideRecommReadonly = false;
                this.addBtnDisable = false;
                this.isSaveDiable = false;
                this.enableInsertFlag = true;
                this.offass1Model = new OffenderAssessments();
                this.overrideRecommReadonly = true;
                this.reAssDateReadOnly = true;

            }
        } else {
            this.vHeaderBlockModel = new VHeaderBlock();
            this.offassData = [];
            this.assReadonly = true;
            this.reAssReadonly = true;
            this.detailsReadonly = true;
            this.offass1Model = new OffenderAssessments();
            this.ass1DbData = new OffenderAssessments();
            this.overrideResultReadonly = true;
            this.offassModel = new VOffassAss();
            this.fieldsReadonly = true;
            this.reAssDateReadOnly = true;
            this.disabledSec = true;
            this.disabledQnnaire = true;
            this.overrideRecommReadonly = true;
            this.addBtnDisable = true;
            this.isSaveDiable = true;
            this.assDatevalue = undefined;
            this.enableInsertFlag = false;
            this.offass1Model = new OffenderAssessments();
            this.reAssDateReadOnly = true;
            this.assessmentdatecommReadonly = true;
            this.overrideReadOnly = true;
        }
    }
    onChangeAssessmentTypeEvent() {
        if (this.offass1Model.assessmentTypeCode) {
            this.offass1Bean.assessmentTypeId = Number(this.assesTypeIdMap.get(this.offass1Model.assessmentTypeCode));
            if (this.offass1Model.assessStatus !== 'A') {
                this.offass1Model.reqFlag = true;
            } else {
                this.offass1Model.reqFlag = false;
            }
            this.prevAssDatevalue = undefined;
            if (this.offassData.length > 0) {
                this.offass1Bean.assessmentTypeId = Number(this.assesTypeIdMap.get(this.offass1Model.assessmentTypeCode));
                this.showOffAssessmentDtls(this.offass1Bean);
                this.offass1Bean.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                const offassResult = this.ocdnoqueFactory.
                    getMaxAssessmentDateCur(this.offass1Bean);
                offassResult.subscribe(offassResultList => {
                    if (offassResultList) {
                        this.prevAssDatevalue = offassResultList;
                        this.prevAssDatevalue = DateFormat.getDate(this.prevAssDatevalue);
                    } else {
                        this.prevAssDatevalue = undefined;
                    }
                });
            }
        }


    }
    /**
     *To display messages
    */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    offassExecuteQuery() {
        this.offassModel = new VOffassAss();
        this.offassModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        if (this.oidpactiFactory.programId) {
            this.offassModel.programId = this.oidpactiFactory.programId;
        }
        const offassResult = this.ocdnoqueFactory.
            offAssExecuteQuery(this.offassModel);
        offassResult.subscribe(offassResultList => {
            if (offassResultList.length === 0) {
                this.overrideRecommReadonly = true;
                this.reAssDateReadOnly = true;
                this.offass1Model = new OffenderAssessments();
                this.ass1DbData = new OffenderAssessments();
                this.offassData = [];
                this.assReadonly = false;
                this.reAssReadonly = false;
                this.overrideResultReadonly = true;
                this.assDatevalue = undefined;
                this.defaultLovData();
            } else {
                this.overrideRecommReadonly = false;
                this.reAssDateReadOnly = false;
                this.assReadonly = true;
                this.selectedRow = 0;
                offassResultList.forEach(e => {
                    e['sBtn'] = '';
                    e['qBtn'] = '';
                    e['iwpButton'] = '';
                    e['SCREEN'] = this.screenId + "~" + "true" + "~" + e.assessmentSeq;
                    if (e.assessStatus === 'I' || e.assessStatus === 'D') {
                        e.assessmentStatus = 'D';
                    }
                    if (e.assessStatus === 'A' || e.assessStatus === 'P' || e.assessStatus === 'I') {
                        e.assessmentStatus = 'P';
                    }
                    if(e.assessmentStatus  === 'D'){
                        e.score = undefined;
                    }
                    if(e.assessStatus==='A' && e.requireApprovalFlag==='N'&& e.reviewSupLevelType!=null && e.reviewSupLevelType !=undefined){
                          this.overrideResultReadonly=true;
                    }
                });
                this.offassData = offassResultList;
            }
        });
    }

    onAssessDateClick(event) {
        this.assessmentDateTemp = DateFormat.getDate(event);
    }

    offass1ExecuteQuery() {
        this.addFlag = false;
        this.offass1Model = new OffenderAssessments();
        this.ass1DbData = new OffenderAssessments();
        this.offass1Model = this.offass1Modeldata;
        const offass1Result = this.ocdnoqueFactory.
            offAss1ExecuteQuery(this.offass1Model);
        offass1Result.subscribe(offass1ResultList => {
            if (offass1ResultList.length === 0) {
                this.offass1Data = [];
                this.ass1DbData = new OffenderAssessments();
                this.assReadonly = false;
                this.reAssReadonly = false;
                this.offass1ModelOne = new OffenderAssessments();
                this.defaultLovData();
            } else {
                this.assReadonly = true;
                offass1ResultList.forEach(e => {
                    e.assessorStaffId = e.assessStaffId;
                });
                this.offass1Data = offass1ResultList;
                this.ass1DbData = JSON.parse(JSON.stringify(offass1ResultList[0]));
                this.offass1Model = offass1ResultList[0];
                if (this.offass1Model.assessStatus === 'I' || this.offass1Model.assessStatus === 'D') {
                    this.offass1Model.assessmentDate = undefined;
                    //this.overridecommentDsbl = false;

                }
                this.offass1ModelOne = JSON.parse(JSON.stringify(offass1ResultList[0]));
                this.assIdValue = this.offass1Model.assessmentTypeId;
                const data = this.rgassessmenttypMap.get(this.assIdValue);
                this.datefieldsReadonly = false;
                if (this.offassModel.assessStatus !== 'I') {
                    if (this.offassModel.requireApprovalFlag === 'Y') {
                        this.reAssReadonly = false;
                        if (this.offassModel.reviewSupLevelType !== null) {
                            this.reAssReadonly = false;
                            this.fieldsReadonly = false;
                        } else {
                            this.reAssReadonly = true;
                            this.fieldsReadonly = true;
                            this.datefieldsReadonly = true;
                        }

                    } else {
                        this.reAssReadonly = true;
                    }

                } else {
                    this.reAssReadonly = false;
                    this.fieldsReadonly = false;
                }
                if (this.offassModel.assessStatus === 'A' && this.offassModel.requireApprovalFlag === 'Y' &&
                    this.offassModel.reviewSupLevelType !== null) {
                } else if (this.offassModel.requireApprovalFlag === 'Y' &&
                    this.offassModel.reviewSupLevelType === null) {
                    this.defaultLovData();
                }
                if (this.offass1Model.assessStatus !== 'A') {
                    this.offass1Model.reqFlag = true;
                    this.reAssReadonly = false;
                } else {
                    this.offass1Model.reqFlag = false;
                    this.reAssReadonly = true;
                }
                this.showOffAssessmentDtls(this.offass1Model);
                setTimeout(() => {
                    this.offass1Model.assessmentTypeCode = data;
                }, 1000
                );
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdnoqueSaveoffass1Form(assDate?, reAssDate?) {
        //this.offass1Model.assessmentDate = DateFormat.getDate();
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            return;
        }

        if (this.count == 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.datemustbeentervalidformat');
            this.show();
            this.offass1Model.assessmentDate = undefined;
            this.count = 0;
            return;
        }

        if (!this.offass1Model.assessmentTypeId && !this.offass1Model.assessmentTypeCode) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdnoque.assessmenttypemustbeentered');
            this.show();
            return;
        }
        this.assesmentId = this.offass1Model.assessmentTypeId;
        for (let i = 0; i < this.assessmentSupervisionsList.length; i++) {
            if (this.assessmentSupervisionsList[i].assessmentId === this.assesmentId) {
                this.minScore = this.assessmentSupervisionsList[i].miniScore;
                this.maxScore = this.assessmentSupervisionsList[i].maxScore;
            }
        }
       /*  if (!this.offass1Model.assessmentDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdnoque.submissiondatevalidation');
            this.show();
            return;
        } */

        if (!(this.offass1Model.offenderBookId && this.offass1Model.assessmentSeq)) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdnoque.youmustfilloutthequestionnaire');
            this.show();
            return;
        }
        //|| Number(this.maxScore)<Number(this.offass1Model.overrideScore)
        if (this.offass1ModelTempOne.overrideScore) {
            if (Number(this.offass1ModelTempOne.overrideScore) < (Number(this.minScore))) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdnoque.overrideScoreRange');
                this.message = this.message + ' ' + this.minScore + ' and ' + this.maxScore;
                this.show();
                return;
            }
            else if (Number(this.offass1ModelTempOne.overrideScore) > (Number(this.maxScore))) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdnoque.overrideScoreRange');
                this.message = this.message + ' ' + this.minScore + ' and ' + this.maxScore;
                this.show();
                return;
            }
            else if (!this.offass1Model.overridedSupLevelType) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdnoque.overrideResultValid');
                this.show();
                return;
            }
            /* else if (!this.offass1Model.overrideReason) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdnoque.overrideReasonValid');
                this.show();
                return;
            } */
        }

        if(this.offass1Model.overridedSupLevelType && !this.offass1Model.overrideReason){
            this.type = 'warn';
            this.message = this.translateService.translate('ocdnoque.overrideReasonValid');
            this.show();
            return;

        }

        /* if (this.offassModel.requireApprovalFlag === 'N' && this.offassModel.assessmentStatus !== 'D') {
            if (this.offass1Model.overridedSupLevelType !== this.offass1ModelOne.overridedSupLevelType ||
                this.offass1Model.overrideReason !== this.offass1ModelOne.overrideReason ||
                this.offass1Model.placeAgyLocId !== this.offass1ModelOne.placeAgyLocId ||
                this.offass1Model.overrideCommentText !== this.offass1ModelOne.overrideCommentText) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdnoque.preventedfromoverriddenapproval');
                this.show();
                return;
            }
        } */

        if (this.offassModel.assessmentStatus === 'D') {
            if (this.offass1Model.overridedSupLevelType || this.offass1Model.overrideReason) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdnoque.draftassessmentcannotbeoverridden');
                this.show();
                return;
            }
        }

        if (assDate) {
            if (assDate.lastValue === '0_/__/____') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.leapyearnotallowed');
                this.show();
                return;
            }
            if (String(assDate.lastValue).indexOf('_') >= 0 && assDate.value === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show();
                return;
            }
        }
        if (reAssDate) {
            if (reAssDate.lastValue === '0_/__/____') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.leapyearnotallowed');
                this.show();
                return;
            }
            if (String(reAssDate.lastValue).indexOf('_') >= 0 && reAssDate.value === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show();
                return;
            }
        }

        /* if (!this.offass1Model.assessmentDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdnoque.submissiondatevalidation');
            this.show();
            return;
        } */
        if ((DateFormat.compareDate(
            DateFormat.getDate(this.offass1Model.assessmentDate), DateFormat.getDate()) === 1)) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdnoque.greaterassessmentdatevalidation');
            this.show();
            return;
        }
        if (this.offass1Model.nextReviewDate) {
            if ((DateFormat.compareDate(DateFormat.getDate(this.offass1Model.assessmentDate),
                DateFormat.getDate(this.offass1Model.nextReviewDate)) !== -1)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdnoque.reassessmentdatevalidation');
                this.show();
                return;
            }
        }
        if (this.offass1Model.reviewSupLevelType !== null && this.offass1Model.reviewSupLevelType !== undefined) {
            this.offass1Model.reviewSupLevelType = this.offass1Model.overridedSupLevelType;
        }
        this.offass1UpdateList = [];
        this.offass1CommitModel.insertList = [];
        this.offass1CommitModel.updateList = [];
        this.offass1CommitModel.deleteList = [];

        if (this.offass1Model.assessmentCreateLocation === "") {
            this.offass1Model.assessmentCreateLocation = undefined;
        }
        if (this.offass1Model.assessCommitteCode === "") {
            this.offass1Model.assessCommitteCode = undefined;
        }
        if (this.offass1Model.overridedSupLevelType === "") {
            this.offass1Model.overridedSupLevelType = undefined;
        }
        if (this.offass1Model.overrideReason === "") {
            this.offass1Model.overrideReason = undefined;
        }
        if (this.offass1Model.placeAgyLocId === "") {
            this.offass1Model.placeAgyLocId = undefined;
        }

        this.offass1Model.overrideScore = this.offass1ModelTempOne.overrideScore;
        this.offass1UpdateList.push(this.offass1Model);
        this.offass1CommitModel.updateList = this.offass1UpdateList;
        const offass1SaveData = this.ocdnoqueFactory.offAss1Commit(this.offass1CommitModel);
        offass1SaveData.subscribe(data => {
            if (data === 1) {
                this.addFlag = false;
                this.vHeaderBlockModelTemp = new VHeaderBlock();
                this.vHeaderBlockModelTemp.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                this.vHeaderBlockModelTemp.agyLocId = this.sessionManager.currentCaseLoad;
                const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModelTemp);
                offbkGlobal.subscribe(list => {
                    if (list.length > 0) {
                        this.vHeaderBlockModel = list[0];
                        this.offassExecuteQuery();
                    }
                });
                this.offass1ModelTempOne.overrideScore=undefined;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    ocdnoqueClearoffass1Form() {
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            return;
        } else {
            this.offass1Model = new OffenderAssessments();
            this.offass1Model.assessmentDate = DateFormat.getDate();
            this.ass1DbData = new OffenderAssessments();
            this.ass1DbData.assessmentDate = DateFormat.getDate();
            this.overrideResultReadonly = true;
            this.assReadonly = false;
            this.reAssReadonly = false;
            this.fieldsReadonly = false;
            this.addFlag = false;
        }
        this.defaultLovData();
    }
    ocdnoqueAddoffass1Form(assDate?, reAssDate?) {
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            return;
        } else {
            if (this.offass1Model.offenderBookId !== undefined && this.offass1Model.assessmentSeq !== undefined) {
                if (assDate) {
                    if (assDate.lastValue === '0_/__/____') {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.leapyearnotallowed');
                        this.show();
                        return;
                    }
                    if (String(assDate.lastValue).indexOf('_') >= 0 && assDate.value === null) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.datemustbeentervalidformat');
                        this.show();
                        return;
                    }
                }
                if (reAssDate) {
                    if (reAssDate.lastValue === '0_/__/____') {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.leapyearnotallowed');
                        this.show();
                        return;
                    }
                    if (String(reAssDate.lastValue).indexOf('_') >= 0 && reAssDate.value === null) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.datemustbeentervalidformat');
                        this.show();
                        return;
                    }
                }
               /*  if (!this.offass1Model.assessmentDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdnoque.submissiondatevalidation');
                    this.show();
                    return;
                } */
                if ((DateFormat.compareDate(
                    DateFormat.getDate(this.offass1Model.assessmentDate), DateFormat.getDate()) === 1)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdnoque.greaterassessmentdatevalidation');
                    this.show();
                    return;
                }
                if (this.offass1Model.nextReviewDate) {
                    if ((DateFormat.compareDate(DateFormat.getDate(this.offass1Model.assessmentDate),
                        DateFormat.getDate(this.offass1Model.nextReviewDate)) !== -1)) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdnoque.reassessmentdatevalidation');
                        this.show();
                        return;
                    }
                }
            }
            if (this.offass1Model.offenderBookId === undefined && this.offass1Model.assessmentSeq === undefined && this.addFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdnoque.pleasecompleteandcommitquestionaire');
                this.show();
                return;
            }
            this.offass1Model = new OffenderAssessments();
            this.offass1Model.assessmentDate = DateFormat.getDate();
            this.ass1DbData = new OffenderAssessments();
            this.ass1DbData.assessmentDate = DateFormat.getDate();
            this.overrideResultReadonly = true;
            this.assReadonly = false;
            this.reAssReadonly = false;
            this.fieldsReadonly = false;
            this.offass1ModelTemp = new OffenderAssessments();
            this.offass1ModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            const offassgetSeqData = this.ocdnoqueFactory.offAss1PreInsert(this.offass1ModelTemp);
            offassgetSeqData.subscribe(data => {
                if (data === undefined) {
                } else {
                    this.addFlag = true;
                    this.offass1ModelTemp = new OffenderAssessments();
                    this.offass1ModelTemp.assessmentSeq = data;
                }
            });
        }
    }
    ocdnoqueClickClear(assDate?, reAssDate?) {
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            return;
        } else {
            this.offass1Model = new OffenderAssessments();
            this.offass1Model.assessmentDate = DateFormat.getDate();
            this.ass1DbData = new OffenderAssessments();
            this.ass1DbData.assessmentDate = DateFormat.getDate();
            this.overrideResultReadonly = true;
            this.assReadonly = false;
            this.reAssReadonly = false;
            this.fieldsReadonly = false;
            this.offass1ModelTemp = new OffenderAssessments();
            this.offass1ModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            const offassgetSeqData = this.ocdnoqueFactory.offAss1PreInsert(this.offass1ModelTemp);
            offassgetSeqData.subscribe(data => {
                if (data === undefined) {
                } else {
                    this.addFlag = true;
                    this.offass1ModelTemp = new OffenderAssessments();
                    this.offass1ModelTemp.assessmentSeq = data;
                }
            });
        }
    }
    afterQnaireDlgClosed(event) {
        this.addFlag = false;
        this.offassExecuteQuery();
    }
    /**
     *  This function will be executed when we click on questionnaire button
     *
     */
    onQnaireLaunchClick = (event) => {
        this.offass1Model.assessmentStatus = event.assessmentStatus === 'D' ? 'Draft' : 'Submitted';
        if(this.offass1Model.assessmentStatus === 'D' || this.offass1Model.assessmentStatus === 'Draft'){
            this.offass1Model.assessmentDate = undefined;
        } else {
            this.offass1Model.assessmentDate = DateFormat.getDate();
        }

        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            return false;
        }
        if (this.count == 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.datemustbeentervalidformat');
            this.show();
            this.offass1Model.assessmentDate = undefined;
            this.count = 0;
            return;
        }
        if (event.assessmentStatus != 'D') {
            this.offass1Model.reqFlag = true;
        } else {
            this.offass1Model.reqFlag = false;
        }
        if (!event.assessmentTypeCode) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdnoque.assessmenttypemustbeentered');
            this.show();
            return;
        }
       /*  if (!this.offass1Model.assessmentDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdnoque.submissiondatevalidation');
            this.show();
            return;
        } */
        if (DateFormat.compareDate(DateFormat.getDate(this.assDatevalue), DateFormat.getDate(this.offass1Model.assessmentDate)) !== 0) {
            if ((DateFormat.compareDate(
                DateFormat.getDate(this.offass1Model.assessmentDate), DateFormat.getDate()) === 1)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdnoque.greaterassessmentdatevalidation');
                this.show();
                return;
            }
        }
        if (this.prevAssDatevalue) {
            if ((DateFormat.compareDate(
                DateFormat.getDate(this.prevAssDatevalue), DateFormat.getDate(this.offass1Model.assessmentDate)) === 1)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdnoque.reassessmentprevdatevalidation');
                this.show();
                return;
            }
        }
        if (this.offass1Model.nextReviewDate) {
            if ((DateFormat.compareDate(DateFormat.getDate(this.offass1Model.assessmentDate),
                DateFormat.getDate(this.offass1Model.nextReviewDate)) !== -1)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdnoque.reassessmentdatevalidation');
                this.show();
                return;
            }
        }
        if (event.assessmentTypeCode && this.offass1Model.assessmentSeq === undefined) {
            this.offass1Model.reqFlag = true;
            this.offass1Model.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            if (this.offassData.length === 0 && this.offassexistList.length > 0 && this.oidpactiFactory.programId) {
                this.offass1Model.assessmentSeq = this.offassexistList.length;
            } else if (this.offassData.length === 0) {
                this.offass1Model.assessmentSeq = 1;
            } else {
                this.offass1Model.assessmentSeq = this.offassData.length;
            }
            this.offass1Model.assessmentTypeId = Number(this.assesTypeIdMap.get(event.assessmentTypeCode));
           
            const reviewCycleDays = Number(this.assesmentTypeMap.get(event.assessmentTypeCode));
            this.offass1Model.reviewCycleDays = reviewCycleDays;
            if (reviewCycleDays > 0) {
                this.offass1Model.nextReviewDate = undefined;
                if(this.offass1Model.assessmentDate){
                    this.offass1Model.assessmentDate = DateFormat.getDate(this.offass1Model.assessmentDate);
                    const nextReviewDate = this.offass1Model.assessmentDate.getTime() + (24 * 60 * 60 * 1000 * reviewCycleDays);
                    this.offass1Model.nextReviewDate = DateFormat.getDate(nextReviewDate);
                }
            }

        } else if (event.assessmentTypeCode) {
            this.offass1Model.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offass1Model.assessmentSeq = (this.offassModel.assessmentSeq === undefined) ? 0 : this.offassModel.assessmentSeq;
            this.offass1Model.assessmentTypeId = Number(this.assesTypeIdMap.get(event.assessmentTypeCode));
            const reviewCycleDays = Number(this.assesmentTypeMap.get(event.assessmentTypeCode));
            this.offass1Model.reviewCycleDays = reviewCycleDays;
            if (reviewCycleDays > 0) {
                this.offass1Model.nextReviewDate = undefined;
                if(this.offass1Model.assessmentDate){
                    this.offass1Model.assessmentDate = DateFormat.getDate(this.offass1Model.assessmentDate);
                    const nextReviewDate = this.offass1Model.assessmentDate.getTime() + (24 * 60 * 60 * 1000 * reviewCycleDays);
                    this.offass1Model.nextReviewDate = DateFormat.getDate(nextReviewDate);
                }
            }
        }
        if (event.assessmentSeq) {
            this.offass1Model.assessmentSeq = event.assessmentSeq;
        }
        this.offass1Model.offenderBookId = this.vHeaderBlockModel.offenderBookId;
       
        this.offass1Model['offenderId'] = this.vHeaderBlockModel.offenderId;
        this.offass1Model.assessmentTypeId = Number(this.assesTypeIdMap.get(event.assessmentTypeCode));
        this.dialogService.openLinkDialog('OCUNOQUE', this.offass1Model, 80).subscribe(result => {
            if (result.resultFlag) {
                this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                this.offassExecuteQuery();
            }
        });
        return true;
    }
    /**
     *  This function will be executed when we click on questionnaire button
     *
     */
    onSecLaunchClick = () => {
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            return false;
        }
        return true;
    }
    onExitBtnClick = () => {
        this.ocdiplanFactory.ocdnoqueFlag = true;
        this.oidcnoteFactory.tempFlag = true;
        this.location.back();
    }
    /**
     * event is fired when change the value of Override result.
     * Current user is assigned to overrideUserId.
     * @param event
     */
    changeTheValueOfOverrideResult(event) {
        if (event) {
            this.overrideUderIdTemp = this.userName;
            this.offass1Model.overrideUserId = this.sessionManager.getId();
            if(this.offass1Model.assessStatus !== 'A'){
                this.overrideReasonReadonly=false;
                this.offass1Model.overrideReason=undefined;
                this.overrideReadOnly=false;
            }
           
        } else {
            this.overrideUderIdTemp = undefined;
            this.offass1Model.overrideUserId = undefined;
            this.offass1Model.overrideReason=undefined;
            this.overrideReasonReadonly=true;
            this.overrideReadOnly=true;
            this.offass1Model.overrideCommentText = undefined;

        }

    }
    ngOnDestroy() {
        this.oidcnoteFactory.exitFlag = undefined;
        this.oidpactiFactory.programId = undefined;
        this.oidmbrdtFactory.assessmentFlag = false;
        this.backBtn = false;
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
    }
    onbackBtnClick = () => {
        if (this.oidmbrdtFactory.assessmentFlag ) {
            this.oidmbrdtFactory.assessmentFlag = false;
            this.backBtn = false;
            this.location.back();
        }
        else if(this.assessmentInquiryParam){
            this.oiiclassService.backButton = true;
            this.oiiclassService.searchParam = this.assessmentInquiryParam;
            this.router.navigate(['/OIICLASS']);
            
        }
    }
    defaultLovData() {
        if (!this.oidpactiFactory.programId && this.oidmbrdtFactory.assessmentFlag) {
            this.lovService.clear(this.assessmentLink);
            this.assessmentLink = 'ocdnoque/rgAssessmentTypeIdRecordGroupWithoutProgramidClear';
        }
    }

    showOffAssessmentDtls(event) {
        const getTypeCount = this.ocdnoqueFactory.offAssPostQuery(event);
        getTypeCount.subscribe(count => {
            if (count === 0) {
                this.typeFlag = true;
            } else {
                this.typeFlag = false;
            }
        });
    }

    offassExitDataQuery() {
        this.offassModel = new VOffassAss();
        this.offassModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const existResult = this.ocdnoqueFactory.
            offAssExecuteQuery(this.offassModel);
        existResult.subscribe(existList => {
            if (existList.length === 0) {
                this.offassexistList = [];
            } else {
                this.offassexistList = [] = existList;
            }
        });
    }

    assessmentTypeCode() {
        if (!this.offass1Model.assessmentTypeCode) {
            this.offass1Model.assessmentTypeCode = this.offass1Model.assessmentTypeCode === '' ? undefined : '';
        }
    }

    assessCommitteCode() {
        if (!this.offass1Model.assessCommitteCode) {
            this.offass1Model.assessCommitteCode = this.offass1Model.assessCommitteCode === '' ? undefined : '';
            this.offasstabone.setColumnData('medicalFlag', 0, "");
        } else {
            this.offasstabone.setColumnData('medicalFlag', 0, "");
        }
    }
    assessmentCreateLocation() {
        if (!this.offass1Model.assessmentCreateLocation) {
            this.offass1Model.assessmentCreateLocation = this.offass1Model.assessmentCreateLocation === '' ? undefined : '';
            this.offasstabone.setColumnData('medicalFlag', 0, "");
        } else {
            this.offasstabone.setColumnData('medicalFlag', 0, "");
        }
    }
    assessorStaffId() {
        if (!this.offass1Model.assessorStaffId) {
            this.offass1Model.assessorStaffId = this.offass1Model.assessorStaffId === '' ? undefined : '';
            this.offasstabone.setColumnData('medicalFlag', 0, "");
        } else {
            this.offasstabone.setColumnData('medicalFlag', 0, "");
        }
    }
    overridedSupLevelType() {
        if (!this.offass1Model.overridedSupLevelType) {
            this.offass1Model.overridedSupLevelType = this.offass1Model.overridedSupLevelType === '' ? undefined : '';
            this.offasstabone.setColumnData('medicalFlag', 0, "");
             this.overrideReasonReadonly=true;
        } else {
            this.offasstabone.setColumnData('medicalFlag', 0, "");
            if(this.offass1Model.assessStatus !== 'A'){
                this.overrideReasonReadonly=false;
            }
        }
    }
    overrideReason() {
        if (!this.offass1Model.overrideReason) {
            this.offass1Model.overrideReason = this.offass1Model.overrideReason === '' ? undefined : '';
            this.offasstabone.setColumnData('medicalFlag', 0, "");
        } else {
            this.offasstabone.setColumnData('medicalFlag', 0, "");
        }
    }
    placeAgyLocId() {
        if (!this.offass1Model.placeAgyLocId) {
            this.offass1Model.placeAgyLocId = this.offass1Model.placeAgyLocId === '' ? undefined : '';
            this.offasstabone.setColumnData('medicalFlag', 0, "");
        } else {
            this.offasstabone.setColumnData('medicalFlag', 0, "");
        }
    }
    onQuationInsert = () => {
        if (this.offassData.length > 0 && !this.offassData[(this.offassData.length - 1)].assessmentDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdnoque.pleasecompleteandcommitquestionaire');
            this.show();
            return;
        }
        this.assessmentdatecommReadonly = false;
        this.overrideRecommReadonly = false;
        this.reAssDateReadOnly = false;
        this.assDatevalue = undefined;
        this.offass1Modeldata = new OffenderAssessments();
        this.overrideResultReadonly = true;
        this.offass1ExecuteQuery();
        return {
            sBtn: '', qBtn: '', assessmentStatus: 'D',
        };
    }

    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = this.offassData.indexOf(event.data);
        if (event.field === 'assessmentTypeCode') {
            if (event.data && event.data.assessmentTypeCode) {
                this.offass1ModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offass1Model.assessmentTypeCode = event.data.assessmentTypeCode;
                this.offass1Model.assessmentTypeId = Number(this.assesTypeIdMap.get(event.data.assessmentTypeCode));
                this.showOffAssessmentDtls(this.offass1Model);
                this.getMaxAssessmentDate();
                this.offass1ModelTemp.assessmentStatus = 'D';
            } else {
                this.offass1Model.assessmentTypeCode = undefined;
            }
            this.overrideResultReadonly = true;
        }
        if (event.field === 'overrideScore') {
            if (event.data.overrideScore)
                this.offass1ModelTempOne.overrideScore = Number(event.data.overrideScore);
            else
                this.offass1ModelTempOne.overrideScore = null;
        }
        rowdata.validated = true;
        return rowdata;
    }

    getMaxAssessmentDate() {
        this.offass1Bean.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offass1Bean.assessmentTypeId = Number(this.assesTypeIdMap.get(this.offass1Model.assessmentTypeCode));
        const offassResult = this.ocdnoqueFactory.
            getMaxAssessmentDateCur(this.offass1Bean);
        offassResult.subscribe(offassResultList => {
            if (offassResultList && offassResultList.trim() !== '') {
                this.prevAssDatevalue = offassResultList;
                this.prevAssDatevalue = DateFormat.getDate(this.prevAssDatevalue);
            } else {
                this.prevAssDatevalue = undefined;
            }
        });
    }
    assCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.assessStatus) {
            return false;
        } else {
            return true;
        }
    }
    overrideScoreEditable = (data: any, index: number, field: string): boolean => {
        if (data.score || data.score === 0) {
            return true;
        }
        return false;
    }
    isOverrideCommentDbl(event) {
        if (event && this.offass1Model.overrideCommentText != event.overrideCommentText) {
            const index = this.offassData.indexOf(this.offassBeanTemp);
            this.offasstabone.setColumnData('medicalFlag', 0, event);
        }
    }

    isAssmtCommntDsbl(event) {
        if (event && this.offass1Model.assessCommentText != event.assessCommentText) {
            const index = this.offassData.indexOf(this.offassBeanTemp);
            this.offasstabone.setColumnData('medicalFlag', 0, event);
        }
    }

    isPlaceAgyLocIdDbl(event) {
        if (event && this.offass1Model.placeAgyLocId != this.offassBeanTemp.placeAgyLocId) {
            if (event) {
                const index = this.offassData.indexOf(this.offassBeanTemp);
                this.offasstabone.setColumnData('medicalFlag', 0, event);
            }
        }
    }
    isOverridedSupLevelTypeDbl(event) {
        if (event && this.offass1Model.overridedSupLevelType != this.offass1ModelOne.overridedSupLevelType) {
            if (event) {
                const index = this.offassData.indexOf(this.offassBeanTemp);
                this.offasstabone.setColumnData('medicalFlag', 0, event);
            }
            this.overrideReasonReadonly = false;
        } else {
            this.offass1Model.overrideReason = undefined;
            this.overrideReasonReadonly = true;
        }
    }

    isAssessorStaffIdeDbl(event) {
        if (event && this.offass1Model.assessorStaffId != this.offass1ModelOne.assessorStaffId) {
            if (event) {
                const index = this.offassData.indexOf(this.offassBeanTemp);
                this.offasstabone.setColumnData('medicalFlag', 0, event);
            }
        }
    }

    isAuthorityDbl(event) {
        if (event && this.offass1Model.assessCommitteCode != this.offass1ModelOne.assessCommitteCode) {
            if (event) {
                const index = this.offassData.indexOf(this.offassBeanTemp);
                this.offasstabone.setColumnData('medicalFlag', 0, event);
            }
        }
    }

    isAssessmentCreateLocationDbl(event) {
        if (event && this.offass1Model.assessmentCreateLocation != this.offass1ModelOne.assessmentCreateLocation) {
            if (event) {
                const index = this.offassData.indexOf(this.offassBeanTemp);
                this.offasstabone.setColumnData('medicalFlag', 0, event);
            }
        }
    }

    isAssessmentDateDbl(event) {
        if (event && this.offass1Model.assessmentDate != this.offass1ModelOne.assessmentDate) {
            if (event) {
                const index = this.offassData.indexOf(this.offassBeanTemp);
                this.offasstabone.setColumnData('medicalFlag', 0, event);
            }
        }
    }

    isNextReviewDateDbl(event) {
        if (event && this.offass1Model.nextReviewDate != this.offass1ModelOne.nextReviewDate) {
            if (event) {
                const index = this.offassData.indexOf(this.offassBeanTemp);
                this.offasstabone.setColumnData('medicalFlag', 0, event);
            }
        }
    }

    isOverrideReasonDbl(event) {
        if (event && this.offass1Model.overrideReason != this.offass1ModelOne.overrideReason) {
            if (event) {
                const index = this.offassData.indexOf(this.offassBeanTemp);
                this.offasstabone.setColumnData('medicalFlag', 0, event);
            }
        }
    }

    get saveBtnDisable() {
        if ((this.offasstabone.updatedMap.size > 0) || (this.offasstabone.addedMap.size > 0)) {
            return false;
        } else {
            return true;
        }
    }

    onClearingGrid = () => {
        this.assessmentdatecommReadonly = true;
        this.offassExecuteQuery();
    }

    assessDateOnBlur(assDate) {
        if (assDate) {
            if (String(assDate.lastValue).indexOf('_') >= 0 && assDate.value === null) {
                this.count = 1;
                return;
            }
        }
    }
    reassDateeOnBlur(reassDate) {
        if (reassDate.lastValue !== "") {
            this.offasstabone.setColumnData('medicalFlag', 0, "");
        } else {
            this.offasstabone.setColumnData('medicalFlag', 0, "");
        }
        
    }

    getUserName() {
        this.ocdnoqueFactory.getUserNameByCreatedUserId(this.sessionManager.getId()).subscribe(data => {
            this.userName = data;
        });
    }
    onEoffenderClick = (data) => {
        this.eoffenderService.selectedRowData=data;
        this.router.navigate( ['/EOFFENDER'], { queryParams: { ['SCREEN'] : data['SCREEN'] } } );
     }
}

