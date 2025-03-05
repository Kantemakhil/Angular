import {
    Component,
    OnInit
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { CourtCase } from "../beans/CourtCase";
import { CourtEvents } from "../beans/CourtEvents";
import { OcdccaseService } from "../service/ocdccase.service";
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OffenderSentences } from "../beans/OffenderSentences";
import { OffensesOutcome } from "../beans/OffensesOutcome";
import { SentenceTerms } from "../beans/SentenceTerms";
import { OffenderCasesCommitBean } from "../beans/OffenderCasesCommitBean";
import { OffenderCourtEventCommitBean } from "../beans/OffenderCourtEventCommitBean";
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OffenderBailDetails } from "../beans/OffenderBailDetails";
import { BailStatus } from "../beans/BailStatus";
import { BondType } from "../beans/BondType";
import { OffenderDetailsOffenses } from "../beans/OffenderDetailsOffenses";
import { BailDetailsCommitBean } from "../beans/BailDetailsCommitBean";
import { OffenseOnSentence } from "../beans/OffenseOnSentece";
import { SentenceCommitBean } from "../beans/SentenceCommitBean";
import { OffenderSentenceTermCommitBean } from "../beans/OffenderSentenceTermCommitBean";
import { OffensesOutcomeCommitBean } from "../beans/OffensesOutcomeCommitBean";
import { ActivatedRoute } from '@angular/router';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Images } from "@commonbeans/Images";
import { OcdclistService } from '@instlegalscreens/service/ocdclist.service';
import { OcusofncService } from "../service/ocusofnc.service";
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { SentenceCalculation } from "../beans/SentenceCalculation";
import { OcucalcrService } from "../service/ocucalcr.service";
import { SentenceDate } from "../beans/SentenceDate";
import { Router } from '@angular/router';
import { OidcnoteService } from '@inst/casemanagement/service/oidcnote.service';
import { Location } from '@angular/common';


@Component( {
    selector: 'app-ocdccase',
    templateUrl: './ocdccase.component.html',
    styleUrls: []
} )
export class OcdccaseComponent implements OnInit {
    message = ' Invalid.';
    type = 'error';
    disabled: boolean;
    msglist = [];
    sysDate: any;
    beginDate: any;
    booking: any;
    caseBeginDate: any;
    caseEventBeginDate: any;
    msgs: any[] = [];
    bailColumndef: any;
    bailBondColumndef:any;
    caseId: any;
    bookId: number;
    chargeId: number;
    bailStatusCode: string;
    sentenceSeq: number;
    sentenceTermStartDate: any;
    cashFlag: any;
    createDate: Date;
    selectedBailRow: OffenderBailDetails = new OffenderBailDetails();
    offenseDescription: string;
    sentenceDateUrl: string;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    courtColumndef: any[];
    courtEventColumndef: any[];
    offoutColumndef: any[];
    sentenceColumndef: any[];
    offencesSentenceTabColumndef: any[];
    termsColumndef: any[];
    courtCasesData: CourtCase[] = [];
    selectedCourtCase: CourtCase = new CourtCase();
    selectedCourtCasesData: CourtCase = new CourtCase();
    courtData: CourtCase[] = [];
    courtCaseModel: CourtCase = new CourtCase();
    courtEventData: CourtEvents[] = [];
    sentencesData: OffenderSentences[] = [];
    sentenceDataInsertList: OffenderSentences[] = [];
    sentenceDataUpdateList: OffenderSentences[] = [];
    sentenceTermInsertList: SentenceTerms[] = [];
    sentenceTermUpdateList: SentenceTerms[] = [];
    offencesOutcomedata: OffensesOutcome[] = [];
    offensesDialogdata: OffensesOutcome[] = [];
    offenseOnSentencedata: OffenseOnSentence = new OffenseOnSentence();
    selectedSentenceRecord: OffenderSentences = new OffenderSentences();
    termsData: SentenceTerms[] = [];
    casesInsertList: CourtCase[] = [];
    courtCasesInsertList: CourtCase[] = [];
    courtCasesUpdateList: CourtCase[] = [];
    eventInsertList: CourtEvents[] = [];
    courtEventInsertList: CourtEvents[] = [];
    courtEventUpdateList: CourtEvents[] = [];
    bailDetailsInsertList: OffenderBailDetails[] = [];
    bailDetailsUpdateList: OffenderBailDetails[] = [];
    bailDetailsDeleteList: OffenderBailDetails[] = [];
    bailBondDetails: OffenderBailDetails = new OffenderBailDetails();
    bailStatus: BailStatus[] = [];
    bailBondType: BondType[] = [];
    offenderOffenses: OffenderDetailsOffenses[] = [];
    bailDetails: OffenderBailDetails[] = [];
    bailBondDetailList:OffenderBailDetails[] = [];
    bailDetailsCommitBean: BailDetailsCommitBean;// = new BailDetailsCommitBean();
    seqNo: number;
    offenderCasesCommitModel: OffenderCasesCommitBean;
    offenderCourtEventCommitModel: OffenderCourtEventCommitBean;
    offenderSentenceCommitBean: SentenceCommitBean;
    offenderSentenceTermCommitBean: OffenderSentenceTermCommitBean;
    offensesOnSentenceCommitBean: OffensesOutcomeCommitBean;
    casePrefixInfo: string;
    casePreFix: string;
    caseTypecode: string;
    agyLocationCode: any;
    courtCaseCourt: string;
    caseStartDate: any;
    eventDate: any;
    nextEventDate: any;
    next_Event_Date: any;
    offensesData: OffensesOutcome[] = [];
    offensesOnSentenceInsertList: OffensesOutcome[] = [];
    courtCaseId: number;
    disableLinkCase: boolean;
    btnCaseIdentifire: boolean;
    linkCaseData: CourtCase = new CourtCase();
    public selected = -1;
    public selectedOutcome = -1;
    public selectedSentence = -1;
    retrivedDate: any;
    updatedDate: any;
    retrivedNextEventDate: any;
    updatedNextEventDate: any;
    sentenceStartDate: any;
    termCodeLovUrl: string;
    termDataFlag: boolean;
    sentenceDataFlag: boolean;
    imageModel: Images = new Images();
    exitLaunchBtn = false;
    offenseDialogData: OffensesOutcome[] = [];
    selectedrow: any[];
    outcomeInsertList: OffensesOutcome[] = [];
    offenceOutcomeInsertList: OffensesOutcome[] = [];
    offenceOutcomeUpdateList: OffensesOutcome[] = [];
    offenceOutcomeCommitBean: OffensesOutcomeCommitBean = new OffensesOutcomeCommitBean();
    courteventId: number;
    offenderBookId: number;
    offenseDate: any;
    range: any;
    selectedCourtEventId: number;
    firstCourtEvent: CourtEvents = new CourtEvents;
    selectedCourtEvent: CourtEvents = new CourtEvents;
    linkedCaseId: number;
    checkData: boolean = true;
    existingEventDate: any;
    selectedOffense: OffensesOutcome = new OffensesOutcome();
    sentenceDateLovUrl: string;
    selectedTerms = -1;
    selectedOffence = -1;
    matchValue: boolean;
    conflictFlag: boolean;
    conflictNumFlag: number = 0;
    conflictInsert: boolean = false;
    conflictCount: number;
    conflictExist: number = 0;
    courtEventConfilctData: CourtEvents[] = [];
    startDate: Date;
    newStartDate: Date;
    termsSatrtDate: Date;
    sentenceDate: SentenceDate[] = [];
    sentenceCalc: SentenceCalculation = new SentenceCalculation();
    btnDisable: boolean = false;
    rel_id = 0;
    singleCaseOnly = 0;
    onRowClickCount = 1;
    dummyEventId: number = 0;
    dummyOffenderChargeId: number = 0;
    validateDataFlag: boolean = true;
    rowIndex: number = 0;
    courtEventRowIndex: number = 0
    offenseRowIndex: number = 0;
    alertToSave: boolean = false;
    dummySentenceId: number = 0;
    dummyOffenseId: number = 0;
    dummyTermId: number = 0;
    dialogOpenFlag: boolean = false;
    sentenceRowIndex: number = 0;
    termRowIndex: number = 0;
    bailRowIndex: number = 0;
    selectedOutcomeResonCode: string;
    selectedTab: string = "Process1";
    hearingTime:any;
    offensesResultCodeData:any;
    tabMapping = new Map( [
        ["defaultOpen", "Process1"],
        ["sent", "Process2"],
        ["bail", "Process3"]
    ]
    );
    confirmationButton = false;
    backBtn: boolean;
    bailDetailsTemp: OffenderBailDetails[] = [];
    constructor( private OcdccaseFactory: OcdccaseService,
        private offenderSearchService: OffenderSearchService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private activatedRoute: ActivatedRoute,
        private osiosearchService: OsiosearService,
        private dialogService: DialogService,
        public ocdclistService: OcdclistService,
        private OcusofncFactory: OcusofncService,
        private OcucalcrFactory: OcucalcrService,
        private router: Router, private oidcnoteFactory: OidcnoteService,
        private location: Location ) {
        this.offenderCasesCommitModel = new OffenderCasesCommitBean();
        this.offenderCourtEventCommitModel = new OffenderCourtEventCommitBean();
        this.offenderSentenceCommitBean = new SentenceCommitBean();
        this.offenderSentenceTermCommitBean = new OffenderSentenceTermCommitBean();
        this.offensesOnSentenceCommitBean = new OffensesOutcomeCommitBean();
        this.courtCasesInsertList = [];
        this.courtCasesUpdateList = [];
        this.courtEventInsertList = [];
        this.courtEventUpdateList = [];
        this.offencesSentenceTabColumndef = [];
        this.sentenceDataInsertList = [];
        this.sentenceDataUpdateList = [];
        this.sentenceTermInsertList = [];
        this.sentenceTermUpdateList = [];
        this.offensesOnSentenceInsertList = [];
        this.termsColumndef = [];
        this.offenceOutcomeInsertList = [];
        this.offenceOutcomeUpdateList = [];
    }

    populateOffenses() {
        const offensesResultCodeData = this.OcdccaseFactory.offencesResultsCodes();
        offensesResultCodeData.subscribe(list => {
            this.offensesResultCodeData = list;
        });
        
    }
    
    ngOnInit() {
     if (this.OcdccaseFactory.exitFlag) {
            this.backBtn = true;
        }
        if ( this.ocdclistService.selectedRow ) {
            this.ocdclistService.selectedRow = false;
            this.exitLaunchBtn = true;
        }
        if ( this.oidcnoteFactory.exitFlag ) {
            this.exitLaunchBtn = true;
            this.oidcnoteFactory.exitFlag = false;
        }
        this.populateOffenses();
        this.disableLinkCase = true;
        this.btnCaseIdentifire = true
        this.disabled = false;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.courtColumndef = [
            {
                fieldName: this.translateService.translate( 'ocdccases.line' ), field: 'case_Seq', editable: false, width: 100,
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.startdate' ),
                field: 'beginDate', editable: true, width: 160, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.court' ),
                field: 'agy_loc_id', editable: true, width: 180, datatype: 'lov', link: 'ocdccase/populateCourtData',source:'OUMAGLOC'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.type' ), required: true,
                field: 'caseType', editable: true, width: 150, datatype: 'lov', domain: 'LEG_CASE_TYP'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.doc' ),
                field: 'caseInfoPrefix', editable: true, width: 130, datatype: 'lov', parentField: 'caseType', link: 'ocdccase/preInsertCasePrefixInfo?caseType='
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.no' ),
                field: "caseInfoNumber", editable: true, width: 130, maxlength: 13, datatype: 'text',
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.courtstatus' ),
                field: 'caseStatus', editable: false, width: 150, datatype: 'lov', link: 'ocdccase/populateCaseStatus'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.linkedcase' ),
                field: 'linkCaseSeq', editable: false, width: 140
            },
        ];

        this.courtEventColumndef = [
            {
                fieldName: this.translateService.translate( 'ocdccases.date' ),
                field: 'eventDate', editable: true, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.time' ),
                field: 'startTime', editable: true, width: 100, datatype: 'time', cellEditable: this.checkConflictFlag
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.court' ),
                field: 'agyLocId', editable: true, width: 150, datatype: 'lov', link: 'ocdccase/populateCourtData'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.hearingtype' ),
                field: 'hearingType', editable: true, width: 170, datatype: 'lov',domain:'MOVE_RSN' /*link: 'ocdccase/populateHearingTypeData'*/, cellEditable: this.canCheckConflict
            },

            {
                fieldName: this.translateService.translate( 'ocdccases.outcome' ),
                field: 'outcomeReasonCode', editable: false, width: 210, datatype: 'lov', link: 'ocdccase/populateOutcomeData'
            },
            {
                fieldName: '',
                field: 'outcomeLaunchButton', editable: true, width: 220, datatype: 'launchbutton', link: '/OUMORCOD', modal: true, updateField: 'row',
                data: 'row', dialogWidth: '80'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.nextevent' ),
                field: 'nextEventDate', editable: true, width: 130, datatype: 'date'
            },

            {
                fieldName: this.translateService.translate( 'ocdccases.startTime' ),
                field: 'nextEventStartTime', editable: true, width: 100, datatype: 'time'
            },

            {
                fieldName: this.translateService.translate( 'ocdccases.hold' ),
                field: 'holdFlag', editable: true, width: 140, datatype: 'checkbox', modal: true,
                data: 'row', height: 'auto', 
            },
            {
                fieldName: '',
                field: 'holdFlagL', editable: true, width: 140, datatype: 'launchbutton', link: '/OCUHOLDS', modal: true,
                data: 'row', dialogWidth: '80', height: 'auto', styleClass: 'hold-popup-block', displayas: 'href', updateField: 'row',
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.report' ),
                field: 'orderRequestedFlag', editable: true, width: 140, datatype: 'checkbox', modal: true,
                data: 'row', height: 'auto',  
            },
            {
                fieldName: '',
                field: 'orderRequestedFlagL', editable: true, width: 140,datatype: 'launchbutton', link: '/OCUPSRDE', modal: true,
                data: 'row', dialogWidth: '80', height: 'auto', displayas: 'href', updateField: 'row'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.comment' ),
                field: 'commentText', editable: true, width: 130
            },


        ];
        this.offoutColumndef = [
            {
                fieldName: this.translateService.translate( 'ocdccases.apply' ),
                field: 'apply', editable: true, width: 160, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.offense' ),
                field: 'offenceCode', editable: true, width: 230, datatype: 'lov', link: 'ocuoffen/offencesAgainstOrders'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.offenseType' ),required:true,
                field: 'offenseType', parentField: 'offenceCode', editable: true, width: 180, datatype: 'lov', link: 'ocdccase/populateOffenseType?offenceCode=',source:'OIMOFFEN'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.plea' ),
                field: 'plea', editable: true, width: 150, datatype: 'lov',domain:'PLEA_STATUS'/* link: 'ocdccase/populatePleaData'*/
            },

            {
                fieldName: this.translateService.translate( 'ocdccases.offenseDate' ),
                field: 'offenseDate', editable: true, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.range' ),
                field: 'range', editable: true, width: 150, datatype: 'date'
            },

            {
                fieldName: this.translateService.translate( 'ocdccases.result' ),
                field: 'resultcode1', editable: false, width: 210, datatype: 'lov', link: 'ocdccase/populateOutcomeData'
            },

            {
                fieldName: '',
                field: 'outcomeLaunchButton', editable: true, width: 220, datatype: 'launchbutton', link: '/OUMORCOD', modal: true, updateField: 'row',
                data: 'row', dialogWidth: '80'
            },


            {
                fieldName: this.translateService.translate( 'ocdccases.disposition' ),
                field: 'disposition', editable: true, width: 150, datatype: 'lov', domain: 'OFF_RESULT'
            },

        ];
        
        
        this.bailBondColumndef = [
                                    {
                                        fieldName: this.translateService.translate('ocdccases.bailDate'),required:true,
                                        field: 'preferedDateTime', editable: true, width: 150, datatype: 'date'
                                    
                                    },
                                    {
                                        fieldName: this.translateService.translate('ocdccases.bail.time'),required:true,
                                        field: 'preferedDateTime', editable: true, width: 100, datatype: 'time'
                                    },
                                    {
                                        fieldName: this.translateService.translate('ocdccases.paidby'),required:true,
                                        field: 'preferedBy', editable: true, width: 200
                                    },
                                    {
                                        fieldName: this.translateService.translate('ocdccases.type'),required:true,
                                        field: 'method', editable: true, width: 180, 
                                        datatype: 'lov',domain:'BAIL_TYPE' /* link: 'ocdccase/bondType'*/
                                    },
                                    {
                                        fieldName: this.translateService.translate('ocdccases.receiptnumber'),
                                        field: 'receiptText', editable: true, width: 140
                                    },
                                    {
                                        fieldName: this.translateService.translate('ocdccases.comments'),
                                        field: 'commentText', editable: true, width: 200
                                    }
                                 ];
        
        this.bailColumndef = [
            {
                fieldName: this.translateService.translate( 'ocdccases.bail.detail.offense' ),
                field: 'offencesDec', editable: false, width: 160

            },
            {
                fieldName: this.translateService.translate( 'ocdccases.bail.detail.bailstatus' ),
                field: 'bailStatus', editable: true, width: 180, datatype: 'lov',domain:'BAIL_STS' /* link: 'ocdccase/bailStatus'*/
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.bail.detail.date' ),
                field: 'BailDate', editable: true, width: 150, datatype: 'date'

            },
            {
                fieldName: this.translateService.translate( 'ocdccases.bail.detail.cashonly' ),
                field: 'cashFlagCheck', editable: true, width: 150, datatype: 'checkbox'

            },

            {
                fieldName: this.translateService.translate( 'ocdccases.bail.detail.cash' ),
                field: 'cash', editable: true, width: 130, datatype: 'number', maxlength: 600,minValue:1,format: '1.2-2',strictFP: true, whole: true, maxValue: 999999999.99

            },

            {
                fieldName: this.translateService.translate( 'ocdccases.bail.detail.surety' ),
                field: "surety", editable: true, width: 130, datatype: 'number', maxlength: 600,minValue:1,format: '1.2-2',strictFP: true, whole: true, maxValue: 999999999.99

            },


            {
                fieldName: this.translateService.translate( 'ocdccases.bail.detail.property' ),
                field: 'property', editable: true, width: 150, datatype: 'number', maxlength: 600,minValue:1,format: '1.2-2',strictFP: true, whole: true, maxValue: 999999999.99
            },

            {
                fieldName: this.translateService.translate( 'ocdccases.bail.detail.judge' ),
                field: 'judge', editable: true, width: 140
            }


        ];

        this.activatedRoute.queryParams.subscribe( params => {
            let offenderid = +params['offenderId'];
            if ( offenderid ) {
                let vHead = new VHeaderBlock();
                vHead.offenderId = offenderid;
                vHead.agyLocId = this.sessionManager.currentCaseLoad;
                this.offenderSearchService.selectedOffender = undefined;
                const offbkGlobal = this.osiosearchService.offbkgGlobalQuery( vHead );
                offbkGlobal.subscribe( list => {
                    if ( list.length > 0 ) {
                        this.vHeaderBlockModel = list[0];
                        if ( list[0].imageId != null ) {
                            this.imageModel.imageId = list[0].imageId;
                            this.osiosearchService.imageExecuteQuery( this.imageModel ).subscribe( imageData => {
                                this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                            } );
                        }
                        this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;

                    } else {
                        this.offenderSearchService.selectedOffender = undefined;
                    }
                    if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
                        this.type = 'warn';
                        this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
                        this.show();
                    }
                } );

            }
            else {
                this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
                if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
                    this.show();
                }
            }

        } );
        this.populateOffenderOffensesStatus();
        this.populateOffenderBondType();
        this.OcdccaseFactory.getHearingTime().subscribe(result=>{
            this.hearingTime = result.profileValue;
        });;
        const caseType = this.OcdccaseFactory.getPreInsertCaseType();
        caseType.subscribe( caseType => {
            this.caseTypecode = caseType;
        } );

        this.offensesDialogGrid();
    }

    /*
    * Calling function to populate data in grid when offender changes
    */
    onOffenderChange( offender ) {
        this.vHeaderBlockModel = offender;
        if ( offender ) {
            this.courtCasesData = [];
            this.courtEventData = [];
            this.offencesOutcomedata = [];
            this.sentencesData = [];
            this.offensesData = [];
            this.termsData = [];
            this.bailDetails = [];
            this.rel_id = 0;
            this.ocdcCasesExecuteQuery();
            this.populateBailDetails( this.vHeaderBlockModel.offenderBookId );
        } else {
            this.courtCasesData = [];
            this.courtEventData = [];
            this.offencesOutcomedata = [];
            this.sentencesData = [];
            this.offensesData = [];
            this.termsData = [];
            this.bailDetails = [];
            this.rel_id = 0;
        }
    }

    populateSentenceGrid() {
        this.sentenceColumndef = [
            {
                fieldName: this.translateService.translate( 'ocdccases.line' ),
                field: 'line', editable: false, width: 100,

            },
            {
                fieldName: this.translateService.translate( 'ocdccases.category' ),
                field: 'category', editable: true, required: true, width: 160, datatype: 'lov', link: 'ocdccase/populateSentencesCategory',
                cellEditable: this.canCategoryEdit,source:'OIMSREQS'

            },
            {
                fieldName: this.translateService.translate( 'ocdccases.sentence' ),
                field: 'sentenceCalcType', parentField: 'category', editable: true, required: true, width: 160, datatype: 'lov', link: 'ocdccase/populateSentencesType?category=',
                cellEditable: this.canCategoryEdit,source:'OIMSREQS'

            },
            {
                fieldName: this.translateService.translate('ocdccases.fineamount'),
                field: 'fineAmount', editable: true,  datatype: 'number', width:180 ,maxlength: 600,minValue:1,format: '1.2-2',strictFP: true, whole: true, maxValue: 999999999.99
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.consequtivetoLine' ),
                field: 'consecutiveToLine', editable: false, width: 200,
                
             },
             {
                 fieldName: '',
                 field: 'button', editable: false, datatype: 'launchbutton', link: '/consToLine', updateField: 'row', modal: true, data: 'row', width: 200, dialogWidth: '80%',
                 onLaunchClick: this.canButtonEditable, parentField: 'category',
             },
            {
                fieldName: this.translateService.translate( 'ocdccases.sentencedate' ),
                field: 'orderId', editable: true, width: 180, datatype: 'lov', parentField: 'caseId', link: 'ocdccase/populateSentenceDate?caseId=', required: true

            },
            {
                fieldName: this.translateService.translate( 'ocdccases.startdate' ),
                field: 'startDate', editable: true, width: 150, datatype: 'date', required: true
            },

            {
                fieldName: this.translateService.translate( 'ocdccases.expirydate' ),
                field: 'expiryDate', editable: false, width: 150, datatype: 'date'
            },

            {
                fieldName: this.translateService.translate( 'ocdccases.status' ),
                field: 'status', editable: false, width: 150, datatype: 'lov',domain:'ACTIVE_TYPE'/* link: 'ocdccase/populateSentenceStatus'*/
            },
        ];
    }
    termGridFormation() {
        this.termsColumndef = [

            {
                fieldName: this.translateService.translate( 'ocdccases.termsgridcolumn' ),
                field: 'sentenceTermCode', editable: true, width: 150, datatype: 'lov', link: this.termCodeLovUrl,source:'OIMSREQS'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.startdate' ),
                field: 'startDate', editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.year' ),
                field: 'years', editable: true, width: 120
            },
            {
                fieldName: this.translateService.translate( 'ocdccases.month' ),
                field: 'months', editable: true, width: 120
            },

           /*  {
                fieldName: this.translateService.translate( 'ocdccases.week' ),
                field: 'weeks', editable: true, width: 120
            },

            {
                fieldName: this.translateService.translate( 'ocdccases.days' ),
                field: 'days', editable: true, width: 120
            },

            {
                fieldName: this.translateService.translate( 'ocdccases.hours' ),
                field: 'hours', editable: true, width: 120
            }, */

            {
                fieldName: this.translateService.translate( 'ocdccases.expirydate' ),
                field: 'expiryDate', editable: true, width: 150, datatype: 'date'
            },
        ];

    }
    offensesDialogGrid() {

        this.offencesSentenceTabColumndef = [
            {
                fieldName: this.translateService.translate( 'ocdccases.offense' ),
                field: 'offenseDescription', editable: false, width: 300, datatype: 'text', required:true,
            },
            {
                fieldName: '',
                field: 'button', editable: false, datatype: 'launchbutton', link: '/OCUSOFNC', updateField: 'row', modal: true, data: 'row', width: 200, dialogWidth: '70', height: '40%'
            },

        ];
    }

    /*
     * To populate data in Court Case grid and correspondingly to Court Event Grid
     * */
    ocdcCasesExecuteQuery() {
        if ( this.vHeaderBlockModel.offenderBookId != null ) {
            let queryParams = {
                offenderBookId: this.vHeaderBlockModel.offenderBookId
            }
            const searchCourtCases = this.OcdccaseFactory.searchCourtCases( queryParams );
            searchCourtCases.subscribe( list => {
                this.courtCasesData = list;
                this.selected = 0;
                this.selectedCourtCase = list[0];
                this.courtCaseCourt = list[0].agy_loc_id;
                this.courtCaseId = list[0].caseId;
            } );
            if ( this.courtCasesData.length == 0 )
                return;
            else {
                this.populateCourtEventData( this.courtCaseId );
            }

        }
    }
    /*
     * 
     *To populate Court Event Data with respect to clicked Court Case 
     * */
    populateCourtEventData( caseId ) {

        const searchCourtEventData = this.OcdccaseFactory.searchCourtEvent( caseId );
        searchCourtEventData.subscribe( eventList => {
            for ( let i = 0; i < eventList.length; i++ ) {
                eventList[i].holdFlag = eventList[i].holdFlag === 'Y' ? true : false;
                eventList[i].holdDetails = 'Hold Details';
                eventList[i].orderRequestedFlag = eventList[i].orderRequestedFlag === 'Y' ? true : false;
                eventList[i].courtReport = 'Court Report';
                eventList[i].preExistedEventDate = eventList[i].nextEventDate;
                eventList[i].outcomeLaunchButton = "...";
                eventList[i].orderRequestedFlagL = "...";
                eventList[i].holdFlagL = "...";
                
            }
            this.courtEventData = eventList;
            this.selectedCourtCase.courtEventList = this.courtEventData;
            this.firstCourtEvent = eventList[0];
            if ( this.courtEventData.length > 0 ) {
                /**TO POPULATE OFFENSEOUTCOME DATA
                 */
                this.populateOffensesOutcomeData( this.firstCourtEvent );
            } else {
                this.offencesOutcomedata = [];
            }
            this.selected = 0;
        } );
    }

    populateOffensesOutcomeData( CourtEvent ) {
        const offencesOutcomedata = this.OcdccaseFactory.searchOffensesOutcome( CourtEvent );
        offencesOutcomedata.subscribe( offencesOutcomelist => {
            for ( let i = 0; i < offencesOutcomelist.length; i++ ) {
                offencesOutcomelist[i].eventId = CourtEvent.eventId;
                if ( offencesOutcomelist[i].resultcode1 === "null" ) {
                    offencesOutcomelist[i].resultcode1 = '';
                    offencesOutcomelist[i].outcomeLaunchButton = '...';
                    offencesOutcomelist[i].disposition = '';
                } else {
                    offencesOutcomelist[i].resultcode1 = offencesOutcomelist[i].resultcode1;
                    offencesOutcomelist[i].outcomeLaunchButton = '...';
                }
                if(offencesOutcomelist[i].disposition === "null") {
                    offencesOutcomelist[i].disposition = '';
                }
            }
            this.offencesOutcomedata = offencesOutcomelist;
            this.selectedCourtEvent.offenseOutcomeList = this.offencesOutcomedata;
            this.selectedOutcome = 0;
            this.offensesDialogdata = offencesOutcomelist;
        } );
    }

    onRowClickcourt( event ) {
        this.dummyEventId = 0;
        this.disableLinkCase = false;
        this.btnCaseIdentifire = false;
        this.selectedCourtCase = event;
        this.selectedCourtCasesData = event;
        this.linkedCaseId = event.combinedCaseId;
        //this.startTab();
        if ( event.caseId != null && ( event.courtEventList == null && event.courtEventList == undefined || event.courtEventList.length == 0 ) ) {
            this.populateCourtEventData( event.caseId );
        } else if ( ( event.dummyCaseId != null || event.caseId != null ) && ( event.courtEventList != null && event.courtEventList != undefined && event.courtEventList.length > 0 ) ) {
            this.courtEventData = event.courtEventList;
        } else {
            this.courtEventData = [];
            this.offencesOutcomedata = [];
        }
        this.sentenceDataFlag = false;
        this.courtCaseId = event.caseId;
        this.caseStartDate = event.beginDate;
        this.sentenceDateLovUrl = "ocdccase/populateSentenceDate?caseId=" + this.courtCaseId;
        this.startTab();
        this.populateOffenderOffenses( event.caseId );

    }

    /*
     * TO POPULATE OFFENCES OUTCOME DATA ON CLICK
     *  */

    onRowClickCourtEvent( event ) {
        if ( event.eventId != null && ( event.offenseOutcomeList == null && event.offenseOutcomeList == undefined || event.offenseOutcomeList.length == 0 ) ) {
            this.populateOffensesOutcomeData( event );
        } else if ( ( event.dummyEventId != null || event.eventId != null ) && ( event.offenseOutcomeList != null && event.offenseOutcomeList != undefined && event.offenseOutcomeList.length > 0 ) ) {
            this.offencesOutcomedata = event.offenseOutcomeList;
        } else {
            this.offencesOutcomedata = [];
        }
        this.selectedCourtEventId = event.eventId;
        this.selectedCourtEvent = event;
        this.selectedOutcomeResonCode = event.outcomeResonCode;
    }

    populateOffenderSentenceDataWhenNoSave( courtCase ) {
        
        if ( courtCase.caseId != null ) {
            this.sentencesData = [];
            this.offensesData = [];
            this.termsData = [];
            const sentencesData = this.OcdccaseFactory.populateSentencesData( courtCase );
            sentencesData.subscribe( list => {
                this.sentencesData = list;
                if ( this.sentencesData.length > 0 ) {
                    this.selectedSentence = 0;
                }

                for ( let i = 0; i < this.sentencesData.length; i++ ) {
                    this.sentencesData[i].button = '...';
                    this.sentencesData[i].lineTemp = this.sentencesData[i].line;
                }
                if ( this.sentencesData.length > 0 ) {
                    this.checkData = false;
                } else {
                    this.checkData = true;
                }
                this.selectedCourtCase.sentencesList = this.sentencesData;
            } );
        } 
    }
    
    
    
    
    
    populateOffenderSentenceData( courtCase ) {
        
        if ( courtCase.caseId != null && ( courtCase.sentencesList == null && courtCase.sentencesList == undefined || courtCase.sentencesList.length == 0 ) ) {
            this.sentencesData = [];
            this.offensesData = [];
            this.termsData = [];
            const sentencesData = this.OcdccaseFactory.populateSentencesData( courtCase );
            sentencesData.subscribe( list => {
                this.sentencesData = list;
                if ( this.sentencesData.length > 0 ) {
                    this.selectedSentence = 0;
                }
                for ( let i = 0; i < this.sentencesData.length; i++ ) {
                    this.sentencesData[i].button = '...';
                    this.sentencesData[i].lineTemp = this.sentencesData[i].line;
                }
                if ( this.sentencesData.length > 0 ) {
                    this.checkData = false;
                } else {
                    this.checkData = true;
                }
                this.selectedCourtCase.sentencesList = this.sentencesData;
            } );
        } else {
            this.sentencesData = courtCase.sentencesList;
            this.offensesData = this.selectedSentenceRecord.offensesOnSentenceList;
            this.termsData = this.selectedSentenceRecord.sentenceTermList;
        }
    }

    populateSentenceDateLov() {
        const sentenceDate = this.OcdccaseFactory.populateSentenceDateLov( this.courtCaseId );
        sentenceDate.subscribe( list => {
            this.sentenceDate = list;
        } );
    }

    onRowClickOffensesOutcome( event ) {
        this.selectedOffense = event;
    }

    /**
     *TO POPULATE TERMS DATA ON SENTENCE CLICK
     */

    onRowClicksentence( event ) {
        this.selectedSentenceRecord = event;
        this.dialogOpenFlag = false;
        if ( event && ( event.line != null && ( event.offensesOnSentenceList == null || event.offensesOnSentenceList == undefined || event.offensesOnSentenceList.length == 0 )
            && ( event.sentenceTermList == null || event.sentenceTermList == undefined || event.sentenceTermList.length == 0 ))) {
            this.fetchOffenses( this.selectedSentenceRecord );
            this.fetchOffensesOnSentence( this.selectedSentenceRecord );
            this.termCodeLovUrl = 'ocdccase/populateSentenceTermCodeLov?sentenceCalcType=' + this.selectedSentenceRecord.sentenceCalcType + '&sentenceCategory=' + this.selectedSentenceRecord.category;
            this.termDataFlag = true;
            this.termGridFormation();
            this.populateOffenderSentenceTermData( event );
        } else if (event && ( event.dummySentenceId != null || event.line != null ) &&
            ( event.offensesOnSentenceList != null && event.offensesOnSentenceList != undefined &&
                event.offensesOnSentenceList.length > 0 ) ) {
            this.offensesData = event.offensesOnSentenceList;
            if ( event.sentenceTermList != null && event.sentenceTermList != undefined && event.sentenceTermList.length > 0 ) {
                this.termDataFlag = true;
                this.termGridFormation();
                this.termsData = event.sentenceTermList;
            } else {
                this.termsData = [];
            }

        } else {
            this.offensesData = [];
            this.termsData = [];
        }
    }

    fetchOffensesOnSentence( selectedSentence ) {
        const offenseOnSentencedata = this.OcdccaseFactory.populateOffenses( selectedSentence );
        offenseOnSentencedata.subscribe( offenses => {

            this.offensesData = offenses;
            for ( let i = 0; i < this.offensesData.length; i++ ) {
                this.offensesData[i].button = '...';
            }
            this.selectedSentenceRecord.offensesOnSentenceList = this.offensesData;
            this.selectedCourtCase.sentencesList = this.sentencesData;
        } );

    }

    fetchOffenses( selectedSentenceData ) {
        const offensesdata = this.OcusofncFactory.fetechOffensesdialogData( selectedSentenceData );
        offensesdata.subscribe( list => {
            this.offenseDialogData = list;
            this.selectedOffence = 0;
        } );
    }
    StartDateOnSentence = ( event ) => {
        const rowIndex = event.rowIndex;
        this.populateSentenceDateLov();
        const rowdata = new ValidateRowReturn();
        if ( event.field === 'orderId' ) {
            for ( let i = 0; i < this.sentenceDate.length; i++ ) {
                if ( this.sentenceDate[i].code == event.data.orderId ) {
                    rowdata.validated = true;
                    this.newStartDate = DateFormat.parse( this.sentenceDate[i].description );
                }
            }
            this.selectedSentenceRecord.startDate = this.newStartDate;
            rowdata.data = { startDate: this.newStartDate };
            return rowdata;

        }
        if(event.newValue != event.oldValue) {
            this.selectedSentenceRecord.openCalcReasonPopUp = true; 
        }
        rowdata.validated = true;
        return rowdata;
    }

    OffensesOnSentence = ( event ) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if ( event.field === 'offenseDescription' ) {
            for ( let i = 0; i < this.offenseDialogData.length; i++ ) {
                if ( event.newValue === this.offenseDialogData[i].offenseDescription ) {
                    rowdata.validated = true;
                    rowdata.data = {
                        offenseDescription: this.offenseDialogData[i].offenseDescription,
                        offenderChargeId: this.offenseDialogData[i].offenderChargeId
                    };
                    return rowdata;
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    populateOffenderSentenceTermData( selectedSentenceRecord ) {
        const termsdata = this.OcdccaseFactory.populateTermsData( selectedSentenceRecord );
        termsdata.subscribe( list => {
            this.termsData = list;
            this.selectedTerms = 0;
            this.selectedSentenceRecord.sentenceTermList = this.termsData;
            this.selectedCourtCase.sentencesList = this.sentencesData;
        } );
    }

    onOffensesGridInsert = () => {
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
            return;
        }
        if ( this.selectedCourtCase.linkCaseSeq > 0 ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.addupdateremoverecordsnotallowed' );
            this.show();
            return;
        }

        if ( this.selectedCourtCase.caseId == null || this.selectedCourtCase.caseId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.insertofoffendersentchargesmustbeincontextofsentences' );
            this.show();
            return;

        }
        
        
        let tempOffense = [];
        if(this.offensesDialogdata.length >= this.offensesData.length) {
            for ( let i = 0; i < this.offensesDialogdata.length; i++ ) {
                for ( let j = 0; j < this.offensesData.length; j++ ) {
                    if(this.offensesDialogdata[i].offenderChargeId === this.offensesData[j].offenderChargeId) {
                        tempOffense.push(this.offensesDialogdata[i].offenderChargeId);
                    }
                }
            }
            if(tempOffense.length === this.offensesDialogdata.length) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'There is no charge left.' );
                this.show();
                return;
                //There is no charge to add.
            }
        }
        
        
        this.dummyOffenseId = this.dummyOffenseId + 1;
        return {
            'button': '...',
            'offenseDescription': null,
            'offenderChargeId': null,
            'offenderBookId': this.selectedSentenceRecord.offenderBookId,
            'sentenceSeq': this.selectedSentenceRecord.line,
            'dummyOffenseId': this.dummyOffenseId,
            'sentenceCalcType': this.selectedSentenceRecord.sentenceCalcType,
            'sentenceType': this.selectedSentenceRecord.sentenceType,
            'category': this.selectedSentenceRecord.category,
            'caseId': this.courtCaseId,
        };
    }

    onRowClickoffout( event ) {
    }

    /*To Save or update court case
     * 
     */
    saveCourtCases( event ) {
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
            return;
        }
        this.courtCasesInsertList = event.added;
        this.courtCasesUpdateList = event.updated;
        this.offenderCasesCommitModel.insertList = [];
        this.offenderCasesCommitModel.updateList = [];
        this.sysDate = DateFormat.getDate();

        if ( this.courtCasesInsertList.length > 0 ) {
            for ( let i = 0; i < this.courtCasesInsertList.length; i++ ) {
                if ( this.courtCasesInsertList[i].beginDate === null || this.courtCasesInsertList[i].beginDate === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.startdatemustbeenter' );
                    this.show();
                    return;
                }
                if ( this.courtCasesInsertList[i].agy_loc_id === null || this.courtCasesInsertList[i].agy_loc_id === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.courtmustbeentered' );
                    this.show();
                    return;
                }
                if ( this.courtCasesInsertList[i].caseType === null || this.courtCasesInsertList[i].caseType === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.typemustbeentered' );
                    this.show();
                    return;
                }
                this.courtCasesInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                const datePipe = new DatePipe( 'en-US' );
                this.beginDate = DateFormat.getDate( this.courtCasesInsertList[i].beginDate );
                this.courtCasesInsertList[i].beginDate = DateFormat.getDate( this.courtCasesInsertList[i].beginDate );
                if ( DateFormat.compareDate( this.courtCasesInsertList[i].beginDate, this.sysDate ) === 1 ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.startdatecannotbepostdated' );
                    this.show();
                    return;
                }
                this.booking = DateFormat.getDate( this.vHeaderBlockModel.bookingBeginDate );
                if ( DateFormat.compareDate( this.booking, this.beginDate ) === 1 ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.startdatecannotbeearlierthanbooking' );
                    this.show();
                    return;
                }
                this.courtCasesInsertList[i].creatDateTime = DateFormat.getDate();
                this.courtCasesInsertList[i].modifyDateTime = DateFormat.getDate();
                this.courtCasesInsertList[i].createUserId = this.sessionManager.getId();
                this.courtCasesInsertList[i].modifyUserId = this.sessionManager.getId();
            }
        }
        if ( this.courtCasesUpdateList.length > 0 ) {
            for ( let i = 0; i < this.courtCasesUpdateList.length; i++ ) {
                this.courtCasesUpdateList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                const datePipe = new DatePipe( 'en-US' );
                this.beginDate = datePipe.transform( this.courtCasesUpdateList[i].beginDate, 'yyyy/MM/dd' );
                this.courtCasesUpdateList[i].beginDate = new Date( this.beginDate );
                if ( this.courtCasesUpdateList[i].beginDate > this.sysDate ) {
                    this.type = 'warn';
                    this.message = 'Case Date Cannot Be Postdated';
                    this.show();
                    return;
                }
                this.booking = new Date( this.vHeaderBlockModel.bookingBeginDate );
                this.beginDate = new Date( this.beginDate );
                if ( this.booking > this.beginDate ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.startdatecannotbeearlierthanbooking' );
                    this.show();
                    return;
                }
                if ( this.courtCasesUpdateList[i].linkCaseSeq > 0 ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'common.addupdateremoverecordsnotallowed' );
                    this.show();
                    this.ocdcCasesExecuteQuery();
                    return;
                }
                this.courtCasesUpdateList[i].creatDateTime = DateFormat.getDate();
                this.courtCasesUpdateList[i].modifyDateTime = DateFormat.getDate();
                this.courtCasesUpdateList[i].createUserId = this.sessionManager.getId();
                this.courtCasesUpdateList[i].modifyUserId = this.sessionManager.getId();
            }
        }
        this.offenderCasesCommitModel.insertList = this.courtCasesInsertList;
        this.offenderCasesCommitModel.updateList = this.courtCasesUpdateList;
        const courtCaseSaveData = this.OcdccaseFactory.newCourtCase( this.offenderCasesCommitModel );
        courtCaseSaveData.subscribe( caseSaveResult => {
            if ( caseSaveResult === 1 ) {
                this.type = 'success';
                this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                this.ocdcCasesExecuteQuery();
                this.show();
                return;
            } else {
                this.type = 'error';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.show();
                return;
            }
        } );
    }
    /*
     * return Pre-Inserted value on data Insertion
     * 
     */
    onGridInsert = () => {
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
            return;
        }
        this.courtEventData = [];
        this.offencesOutcomedata = [];
        this.sentencesData = [];
        this.rel_id = this.rel_id + 1;
        return {
            caseStatus: 'A',
            caseType: this.caseTypecode,
            caseInfoPrefix: this.casePreFix,
            beginDate: DateFormat.getDate(),
            dummyCaseId: this.rel_id,
            creatDateTime: DateFormat.getDate(),
            modifyDateTime: DateFormat.getDate(),
            createUserId: this.sessionManager.getId(),
            modifyUserId: this.sessionManager.getId(),
            offenderBookId: this.vHeaderBlockModel.offenderBookId,
            dummyEventId: this.dummyEventId,
        }
    }

    onEventGridInsert = () => {
        this.conflictInsert = true;
        this.conflictNumFlag = 0;
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
            return;
        }

        if ( this.selectedCourtCase == null || this.selectedCourtCase === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.courtcasemustbeenter' );
            this.show();
            return;
        }
        this.offencesOutcomedata = [];
        if ( this.selectedCourtCase.dummyEventId == null || this.selectedCourtCase.dummyEventId === undefined ) {
            this.selectedCourtCase.dummyEventId = 0;
        }
        this.selectedCourtCase.dummyEventId = this.selectedCourtCase.dummyEventId + 1;
        return {
            eventDate: DateFormat.getDate(),
            agyLocId: this.selectedCourtCase.agy_loc_id,
            //startTime: new Date( "2016-05-24T09:30:00" ).getTime(),
            startTime: TimeFormat.parse(this.hearingTime,DateFormat.getDate()),
            caseId: this.selectedCourtCase.caseId,
            createDateTime: DateFormat.getDate(),
            modifyDateTime: DateFormat.getDate(),
            createUserId: this.sessionManager.getId(),
            modifyUserId: this.sessionManager.getId(),
            offenderBookId: this.vHeaderBlockModel.offenderBookId,
            dummyEventId: this.selectedCourtCase.dummyEventId,
            dummyOffenderChargeId: this.dummyOffenderChargeId,
            'outcomeLaunchButton': '...',
            outcomeReasonCode: " "
        }
    }

    /**
     * Save Court Event
     * */
    saveCourtEvents( event ) {
        this.conflictNumFlag = 0;
        this.courtEventConfilctData = [];
        if ( this.conflictExist == 1 ) {
            for ( let i = 0; i < this.courtEventData.length - 1; i++ ) {
                this.courtEventConfilctData.push( this.courtEventData[i] );
            }
            this.dialogService.openLinkDialog( '/oiuscinq', this.courtEventConfilctData ).subscribe( result => {
                if ( !result ) {
                    this.disabled = false;
                    this.conflictNumFlag = 0;
                    this.populateCourtEventData( this.selectedCourtCase.caseId );
                } else {
                    this.disabled = false;
                }
            } );
            return;
        }
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
            return;
        }
        this.courtEventInsertList = event.added;
        this.courtEventUpdateList = event.updated;
        this.offenderCourtEventCommitModel.insertList = [];
        this.offenderCourtEventCommitModel.updateList = [];
        this.sysDate = DateFormat.getDate();

        if ( this.courtEventInsertList.length > 0 ) {
            for ( let i = 0; i < this.courtEventInsertList.length; i++ ) {
                if ( this.courtEventInsertList[i].eventDate === null || this.courtEventInsertList[i].eventDate === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.datemustbeentered' );
                    this.show();
                    return;
                }
                if ( this.courtEventInsertList[i].agyLocId === null || this.courtEventInsertList[i].agyLocId === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.courtmustbeentered' );
                    this.show();
                    return;
                }
                if ( this.courtEventInsertList[i].startTime === null || this.courtEventInsertList[i].startTime === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.timemustbeentered' );
                    this.show();
                    return;
                }
                if ( this.courtEventInsertList[i].hearingType === null || this.courtEventInsertList[i].hearingType === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.hearingtypemustbeentered' );
                    this.show();
                    return;
                }
                if ( ( this.courtEventInsertList[i].nextEventDate === undefined || this.courtEventInsertList[i].nextEventDate === null ) && this.courtEventInsertList[i].nextEventStartTime != null ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.nexteventdatemustbeenteredwithtime' );
                    this.show();
                    return;
                }
                if ( new Date( this.courtEventInsertList[i].nextEventDate ) < new Date( this.courtEventInsertList[i].eventDate ) ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.nexteventdatecannotbeearlierthanexistingdate' );
                    this.show();
                    return;
                }
                this.courtEventInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                const datePipe = new DatePipe( 'en-US' );
                const time = datePipe.transform( this.courtEventInsertList[i].startTime, 'HH:mm' );

                const String = datePipe.transform( this.courtEventInsertList[i].eventDate, 'yyyy/MM/dd' );
                this.eventDate = datePipe.transform( this.courtEventInsertList[i].eventDate, 'yyyy/MM/dd' );
                const hearingTime = new Date( String + ' ' + time );
                this.courtEventInsertList[i].startTime = hearingTime;
                // this.courtEventInsertList[i].eventDate = new Date(this.eventDate);

                if ( this.courtEventInsertList[i].nextEventStartTime != null ) {
                    const nextEventTime = datePipe.transform( this.courtEventInsertList[i].nextEventStartTime, 'HH:mm' );
                    const nextEventDateString = datePipe.transform( this.courtEventInsertList[i].nextEventDate, 'yyyy/MM/dd' );
                    const nextEventHearingTime = new Date( nextEventDateString + ' ' + nextEventTime );
                    this.courtEventInsertList[i].nextEventStartTime = nextEventHearingTime;
                }
                if ( this.courtEventInsertList[i].nextEventStartTime == null && this.courtEventInsertList[i].nextEventDate != null ) {
                    const nextEventDateString = datePipe.transform( this.courtEventInsertList[i].nextEventDate, 'yyyy/MM/dd' );
                    const nextEventHearingTime = new Date( nextEventDateString + ' ' + '09:30' );
                    this.courtEventInsertList[i].nextEventStartTime = nextEventHearingTime;
                }
                if ( this.courtEventInsertList[i].nextEventDate != null ) {
                    //this.nextEventDate = datePipe.transform(this.courtEventInsertList[i].nextEventDate, 'yyyy/MM/dd');
                    this.courtEventInsertList[i].nextEventDate = DateFormat.getDate( this.nextEventDate );
                }
                this.courtEventInsertList[i].caseId = this.courtCaseId;
                this.courtEventInsertList[i].createDateTime = DateFormat.getDate();
                this.courtEventInsertList[i].modifyDateTime = DateFormat.getDate();
                this.courtEventInsertList[i].createUserId = this.sessionManager.getId();
                this.courtEventInsertList[i].modifyUserId = this.sessionManager.getId();
            }
        }
        if ( this.courtEventUpdateList.length > 0 ) {
            this.conflictNumFlag = 0;
            if ( this.selectedCourtCase.linkCaseSeq > 0 ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.addupdateremoverecordsnotallowed' );
                this.show();
                this.populateCourtEventData( this.selectedCourtCase.caseId );
                return;
            }
            if ( this.linkedCaseId != null ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.addupdateremoverecordsnotallowed' );
                this.show();
                return;

            }
            for ( let i = 0; i < this.courtEventUpdateList.length; i++ ) {
                if ( this.courtEventUpdateList[i].eventDate === null || this.courtEventUpdateList[i].eventDate === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.datemustbeentered' );
                    this.show();
                    return;
                }
                if ( this.courtEventUpdateList[i].agyLocId === null || this.courtEventUpdateList[i].agyLocId === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.courtmustbeentered' );
                    this.show();
                    return;
                }
                if ( this.courtEventUpdateList[i].startTime === null || this.courtEventUpdateList[i].startTime === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.timemustbeentered' );
                    this.show();
                    return;
                }
                if ( this.courtEventUpdateList[i].hearingType === null || this.courtEventUpdateList[i].hearingType === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.hearingtypemustbeentered' );
                    this.show();
                    return;
                }
                if ( ( this.courtEventUpdateList[i].nextEventDate === undefined || this.courtEventUpdateList[i].nextEventDate === null ) && this.courtEventUpdateList[i].nextEventStartTime != null ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.nexteventdatemustbeenteredwithtime' );
                    this.show();
                    return;
                }
                this.caseBeginDate = DateFormat.getDate( this.caseStartDate );
                this.caseEventBeginDate = DateFormat.getDate( this.courtEventUpdateList[i].eventDate );
                if ( this.caseBeginDate > this.caseEventBeginDate ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.eventdatecannotbeearlierthancasestartdate' );
                    this.show();
                    return;
                }
                if ( this.courtEventUpdateList[i].nextEventDate != null ) {
                    if ( new Date( this.courtEventUpdateList[i].nextEventDate ) < new Date( this.courtEventUpdateList[i].eventDate ) ) {
                        this.type = 'warn';
                        this.message = this.translateService.translate( 'ocdccases.nexteventdatecannotbeearlierthanexistingdate' );
                        this.show();
                        return;
                    }
                }
                this.courtEventUpdateList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                const datePipe = new DatePipe( 'en-US' );
                const time = datePipe.transform( this.courtEventUpdateList[i].startTime, 'HH:mm' );
                const String = datePipe.transform( this.courtEventUpdateList[i].eventDate, 'yyyy/MM/dd' );
                this.eventDate = datePipe.transform( this.courtEventUpdateList[i].eventDate, 'yyyy/MM/dd' );
                //this.existingEventDate=datePipe.transform(this.selectedCourtEvent.eventDate, 'yyyy/MM/dd');
                const hearingTime = new Date( String + ' ' + time );
                this.courtEventUpdateList[i].startTime = hearingTime;
                this.courtEventUpdateList[i].eventDate = DateFormat.getDate( this.courtEventUpdateList[i].eventDate );

                if ( this.courtEventUpdateList[i].nextEventStartTime != null ) {
                    const nextEventTime = datePipe.transform( this.courtEventUpdateList[i].nextEventStartTime, 'HH:mm' );
                    const nextEventDateString = datePipe.transform( this.courtEventUpdateList[i].nextEventDate, 'yyyy/MM/dd' );
                    const nextEventHearingTime = new Date( nextEventDateString + ' ' + nextEventTime );
                    this.courtEventUpdateList[i].nextEventStartTime = nextEventHearingTime;
                }
                if ( this.courtEventUpdateList[i].nextEventStartTime == null && this.courtEventUpdateList[i].nextEventDate != null ) {
                    const nextEventDateString = datePipe.transform( this.courtEventUpdateList[i].nextEventDate, 'yyyy/MM/dd' );
                    const nextEventHearingTime = new Date( nextEventDateString + ' ' + '09:30' );
                    this.courtEventUpdateList[i].nextEventStartTime = nextEventHearingTime;
                }
                if ( this.courtEventUpdateList[i].nextEventDate != null ) {
                    //this.nextEventDate = datePipe.transform(this.courtEventUpdateList[i].nextEventDate, 'yyyy/MM/dd');
                    this.courtEventUpdateList[i].nextEventDate = DateFormat.getDate( this.courtEventUpdateList[i].nextEventDate );
                }
                if ( this.courtEventUpdateList[i].eventDate != this.existingEventDate ) {
                    const updateOrder = this.OcdccaseFactory.updateOrder( this.courtEventUpdateList[i] );
                    updateOrder.subscribe( value => {
                        if ( value === 1 ) {
                            this.type = 'success';
                            this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                            this.show();
                        } else {
                            this.type = 'error';
                            this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                            this.show();
                        }
                    } );
                }
                this.courtEventUpdateList[i].caseId = this.courtCaseId;
                this.courtEventUpdateList[i].createDateTime = DateFormat.getDate();
                this.courtEventUpdateList[i].modifyDateTime = DateFormat.getDate();
                this.courtEventUpdateList[i].createUserId = this.sessionManager.getId();
                this.courtEventUpdateList[i].modifyUserId = this.sessionManager.getId();
            }
        }
        this.offenderCourtEventCommitModel.insertList = this.courtEventInsertList;
        this.offenderCourtEventCommitModel.updateList = this.courtEventUpdateList;
        this.offenderCourtEventCommitModel.selectedCourtcase = this.selectedCourtCase;
        const courtEventSaveData = this.OcdccaseFactory.newCourtEvent( this.offenderCourtEventCommitModel );
        courtEventSaveData.subscribe( eventSaveResult => {
            if ( eventSaveResult === 1 ) {
                this.type = 'success';
                this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                this.populateCourtEventData( this.selectedCourtCase.caseId );
                this.populateOffenderSentenceData( this.selectedCourtCase );
                this.populateOffenderSentenceData( this.selectedCourtCase );
                this.show();
                return;
            } else {
                this.type = 'error';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.populateCourtEventData( this.selectedCourtCase.caseId );
                this.populateOffenderSentenceData( this.selectedCourtCase );
                this.show();
                return;
            }
        } );
    }
    /*
    * TO show messages on the screen*/
    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }

    openLinkDialog() {
        this.dialogService.openLinkDialog( '/OCULCASE', this.selectedCourtCasesData, 990 ).subscribe( result => {
            if ( result ) {

                const addrDeleteData = this.ocdcCasesExecuteQuery();

            }
        } );
    }

    /**
     * populate OffenderDetails offenses
     */
    populateOffenderOffenses( caseId ) {
        const baildetailsGrid = this.OcdccaseFactory.populateOffenderOffences( caseId );
        baildetailsGrid.subscribe( data => {
            this.offenderOffenses = data;
        } );
    }

    /**
     * populate OffenderDetails BondType
     */
    populateOffenderBondType() {
        this.OcdccaseFactory.populateBondype().subscribe( data => {
            this.bailBondType = data;
        } );
    }

    /**
     * populste OffenderDetails offensesStatus
     */
    populateOffenderOffensesStatus() {
        this.OcdccaseFactory.populateBailStatus().subscribe( data => {
            this.bailStatus = data;
        } );
    }

    insertBailDetailsRecord( event ) {
        this.bailDetailsInsertList = event.added;
        this.bailDetailsUpdateList = event.updated;
        this.bailDetailsDeleteList = event.removed;

        if ( this.bailDetailsDeleteList.length > 0 ) {
            this.type = 'error';
            this.message = this.translateService.translate( 'Can not delete this record' );
            this.show();
            return;
        }

        if ( this.bailDetailsUpdateList.length > 0 ) {
            for ( let i = 0; i < this.bailDetailsUpdateList.length; i++ ) {
                if ( this.selectedCourtCase.linkCaseSeq > 0 ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'common.addupdateremoverecordsnotallowed' );
                    this.show();
                    this.populateBailDetails( this.vHeaderBlockModel.offenderBookId );
                    return;
                }
                if ( this.bailDetailsUpdateList[i].bailStatus == null || this.bailDetailsUpdateList[i].bailStatus === undefined ) {
                    this.type = 'success';
                    this.message = this.translateService.translate( 'ocdccases.bailstatusmustbeenter' );
                    this.show();
                    return;
                }

                if ( isNaN( this.bailDetailsUpdateList[i].cash ) ) {
                    this.type = 'error';
                    this.message = this.translateService.translate( 'ocdccases.csaenomustbeenter' );
                    this.show();
                    return;
                }
                if ( isNaN( this.bailDetailsUpdateList[i].surety ) ) {
                    this.type = 'error';
                    this.message = this.translateService.translate( 'ocdccases.valueinsurety' );
                    this.show();
                    return;
                }
                if ( isNaN( this.bailDetailsUpdateList[i].property ) ) {
                    this.type = 'error';
                    this.message = this.translateService.translate( 'ocdccases.valueinproperty' );
                    this.show();
                    return;
                }
                const datePipe = new DatePipe( 'en-US' );
                const createdateTime = datePipe.transform( this.bailDetailsUpdateList[i].createDatetime, 'yyyy/MM/dd' );
                this.bailDetailsUpdateList[i].createDatetime = new Date( createdateTime );
                /*if ( this.bailDetailsUpdateList[i].cashFlag ) {
                    this.bailDetailsUpdateList[i].cashFlag = "Y";
                } else {
                    this.bailDetailsUpdateList[i].cashFlag = "N";
                }*/
                if ( this.bailDetailsUpdateList[i].BailDate != null ) {
                    const bailDate = datePipe.transform( this.bailDetailsUpdateList[i].BailDate, 'yyyy/MM/dd' );
                    this.bailDetailsUpdateList[i].BailDate = new Date( bailDate );
                }
                if ( this.bailDetailsUpdateList[i].bailBookId == null ) {
                    this.bailDetailsUpdateList[i].action = 'I';
                } else {
                    this.bailDetailsUpdateList[i].action = 'U';
                }
            }
        }
        this.bailDetailsCommitBean = new BailDetailsCommitBean();
        this.bailDetailsCommitBean.updateList = this.bailDetailsUpdateList
        const affetedRows = this.OcdccaseFactory.insestBailDetails( this.bailDetailsCommitBean );
        affetedRows.subscribe( list => {
            if ( list == 1 ) {
                this.type = 'success';
                this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                this.populateBailDetails( this.vHeaderBlockModel.offenderBookId );
                this.show();
                return;
            } else {
                this.type = 'error';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.show();
                return;
            }
        } );

    }

    onRowClickbail( event ) {
        this.bailBondDetailList = [];
        if ( event != undefined ) {
            this.selectedBailRow = event;
            this.bailBondDetailList.push(this.selectedBailRow);
        }
            /*if ( this.selectedBailRow.preferedDateTime != undefined && this.selectedBailRow.preferedDateTime != null ) {
                this.selectedBailRow.preferedDateTime = DateFormat.getDate( this.selectedBailRow.preferedDateTime );

                const datePipe = new DatePipe( 'en-US' );
                const nextEventTime = datePipe.transform( this.selectedBailRow.preferedDateTime, 'HH:mm' );
                if ( nextEventTime === "00:00" ) {
                    this.selectedBailRow.time = DateFormat.serverDate;
                } else {
                    this.selectedBailRow.time = this.selectedBailRow.preferedDateTime;
                }
            } else {
                this.bailBondDetails = new OffenderBailDetails();
                this.selectedBailRow.time = DateFormat.getDate();
            }
            this.bailBondDetails.preferedBy = this.selectedBailRow.preferedBy;
            this.bailBondDetails.method = this.selectedBailRow.method;
            this.bailBondDetails.commentText = this.selectedBailRow.commentText;
            this.bailBondDetails.receiptText = this.selectedBailRow.receiptText;
        } else {
            this.bailBondDetails = new OffenderBailDetails();
            this.bailBondDetails.time = DateFormat.serverDate;
            this.bailBondDetails.bailStatus = this.selectedBailRow.bailStatus;
        }*/

    }

    insertBailBondRecord() {
        if ( this.selectedCourtCase.linkCaseSeq > 0 ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.addupdateremoverecordsnotallowed' );
            this.populateBailDetails( this.vHeaderBlockModel.offenderBookId );
            this.show();
            return;
        }
        else {
            const datePipe = new DatePipe( 'en-US' );
            this.bailBondDetails.chargeId
            const bailTime = datePipe.transform( this.bailBondDetails.time, 'HH:mm' );
            const prefetchedDateTime = datePipe.transform( this.bailBondDetails.preferedDateTime, 'yyyy/MM/dd' );
            const nextEventHearingTime = new Date( prefetchedDateTime + ' ' + bailTime );
            this.bailBondDetails.preferedDateTime = nextEventHearingTime;
            this.bailBondDetails.bookId = this.selectedBailRow.bailBookId;
            this.bailBondDetails.chargeId = this.selectedBailRow.bailChargeId;
            this.bailBondDetails.bailStatus = this.selectedBailRow.bailStatus;
            this.bailBondDetails.cashFlag = this.selectedBailRow.cashFlag;
            const afterGet = this.OcdccaseFactory.insestBailBondDetails( this.bailBondDetails );
            afterGet.subscribe( data => {
                if ( data == 1 ) {
                    this.type = 'success';
                    this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                    this.populateBailDetails( this.vHeaderBlockModel.offenderBookId );
                    this.show();
                    return;
                } else {
                    this.type = 'error';
                    this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                    this.show();
                    return;
                }
            } );
        }
    }

    populateBailDetails( bookId ) {
        this.OcdccaseFactory.populateAllBailDetails( bookId, this.selectedCourtCase.caseId ).subscribe( data => {
            for ( let i = 0; i < data.length; i++ ) {
                data[i].cashFlagCheck = data[i].cashFlag === 'Y' ? true : false;
            }
            this.bailDetails = data;
            this.bailDetailsTemp = JSON.parse(JSON.stringify(data));
            this.selectedCourtCase.bailDetailsList = this.bailDetails;
            this.selected = 0;
        } );
    }

    onSentenceRowInsert = () => {
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
            return;
        }
        if ( this.selectedCourtCase.linkCaseSeq > 0 ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.addupdateremoverecordsnotallowed' );
            this.show();
            return;
        }
        if ( this.selectedCourtCase.caseId == null || this.selectedCourtCase.caseId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.courtcasemustbeenter' );
            this.show();
            return;

        }
        this.dummySentenceId = this.dummySentenceId + 1;
        return {
            'caseId': this.courtCaseId,
            'status': 'A',
            'button':'...',
            'consecutiveToLine':null,
            'dummySentenceId': this.dummySentenceId,
            'offenderBookId': this.vHeaderBlockModel.offenderBookId,
            'createDatetime': DateFormat.getDate(),
            'modifyDateTime': DateFormat.getDate(),
            'createUserId': this.sessionManager.getId(),
            'modifyUserId': this.sessionManager.getId(),
            'lineTemp':0
        }
           
        
    }

    saveSentencesDetails( event ) {
        this.sentenceDataInsertList = event.added;
        this.sentenceDataUpdateList = event.updated;
        for ( let i = 0; i < this.sentenceDataInsertList.length; i++ ) {
            if ( this.sentenceDataInsertList[i].category === null || this.sentenceDataInsertList[i].category === undefined ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.categorymustbeenter' );
                this.show();
                return;
            }
            if ( this.sentenceDataInsertList[i].sentenceCalcType === null || this.sentenceDataInsertList[i].sentenceCalcType === undefined ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.sentencemustbeenter' );
                this.show();
                return;
            }
            if ( this.sentenceDataInsertList[i].orderId == null || this.sentenceDataInsertList[i].orderId === undefined ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.sentencedatemustbeenter' );
                this.show();
                return;
            }
            if ( this.sentenceDataInsertList[i].startDate == null || this.sentenceDataInsertList[i].startDate === undefined ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.startdatemustbeenter' );
                this.show();
                return;
            }
            if ( this.sentenceDataInsertList[i].startDate === undefined ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.startdatemudtbeentered' );
                this.show();
                return;
            }
            const datePipe = new DatePipe( 'en-US' );
            this.sentenceStartDate = datePipe.transform( this.sentenceDataInsertList[i].startDate, 'yyyy/MM/dd' );
            this.sentenceDataInsertList[i].startDate = new Date( this.sentenceStartDate );
            this.sysDate = DateFormat.getDate();

            if ( this.sentenceDataInsertList[i].startDate > this.sysDate ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.startdatecannotbegreaterthancurrentdate' );
                this.show();
                return;
            }
            this.sentenceDataInsertList[i].caseId = this.courtCaseId;
            this.sentenceDataInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.sentenceDataInsertList[i].createDatetime = DateFormat.getDate();
            this.sentenceDataInsertList[i].modifyDateTime = DateFormat.getDate();
            this.sentenceDataInsertList[i].createUserId = this.sessionManager.getId();
            this.sentenceDataInsertList[i].modifyUserId = this.sessionManager.getId();
        }
        if ( this.sentenceDataUpdateList.length > 0 ) {
            for ( let i = 0; i < this.sentenceDataUpdateList.length; i++ ) {

                if ( this.sentenceDataUpdateList[i].fineAmount < 0 ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.fineamountnotlesszero' );
                    this.show();
                    return;
                }
                if ( this.sentenceDataUpdateList[i].startDate == null || this.sentenceDataUpdateList[i].startDate === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.startdatemustbeenter' );
                    this.show();
                    return;
                }
                if ( this.sentenceDataUpdateList[i].startDate === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.startdatemudtbeentered' );
                    this.show();
                    return;
                }
                const datePipe = new DatePipe( 'en-US' );
                this.sentenceStartDate = datePipe.transform( this.sentenceDataUpdateList[i].startDate, 'yyyy/MM/dd' );
                this.sentenceDataUpdateList[i].startDate = new Date( this.sentenceStartDate );
                this.sysDate = DateFormat.getDate();

                if ( this.sentenceDataUpdateList[i].startDate > this.sysDate ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.startdatecannotbegreaterthancurrentdate' );
                    this.show();
                    return;
                }
                this.sentenceDataUpdateList[i].modifyDateTime = DateFormat.getDate();
                this.sentenceDataUpdateList[i].modifyUserId = this.sessionManager.getId();
            }
        }
        this.offenderSentenceCommitBean.insertList = this.sentenceDataInsertList;
        this.offenderSentenceCommitBean.updateList = this.sentenceDataUpdateList;
        const affetedRows = this.OcdccaseFactory.insertOffenderSentenceDetails( this.offenderSentenceCommitBean );
        affetedRows.subscribe( value => {
            if ( value === 1 ) {
                this.type = 'success';
                this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                this.populateOffenderSentenceData( this.selectedCourtCase );
                this.show();
                return;
            } else {
                this.type = 'error';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.show();
                return;
            }

        } );
    }

    launchSentenceCalcDialog() {
        this.dialogService.openLinkDialog( '/OCUCALCR', this.vHeaderBlockModel, 80).subscribe( result => {
            if ( result ) {
                this.sentenceCalc.sentDate = DateFormat.getDate();
                this.sentenceCalc.sentTime = DateFormat.getDate();
                this.sentenceCalc.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.sentenceCalc.staffName = result.staffName;
                this.sentenceCalc.calcCode = result.calculationReason;
                this.sentenceCalc.comment = result.commentText;
                const successFlag = this.OcucalcrFactory.calExpDate( this.sentenceCalc );
                successFlag.subscribe( flag => {
                    if ( flag = 'T' ) {
                        this.populateOffenderSentenceData( this.selectedCourtCase );
                        this.populateOffenderSentenceTermData( this.selectedSentenceRecord );
                        this.type = 'success';
                        this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                        this.show();
                        return;
                    } else {
                        this.type = 'error';
                        this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                        this.show();
                        return;
                    }
                } );
            }     
        } );
    }


    checkConflictFlag = ( data: any, index: number, field: string ): boolean => {
        this.matchValue = false;
        this.courtEventConfilctData = [];
        this.conflictCount = 0;
        if ( this.conflictNumFlag === 0 ) {
            this.conflictNumFlag++;
            for ( let i = 0; i < this.courtEventData.length - 1; i++ ) {
                if ( DateFormat.compareDate( DateFormat.getDate( this.courtEventData[i].eventDate ), DateFormat.getDate( data.eventDate ) ) == 0 ) {
                    if ( DateFormat.compareTime( DateFormat.getDate( this.courtEventData[i].startTime ), DateFormat.getDate( data.startTime ) ) == 0 ) {
                        ++this.conflictCount;
                        this.conflictExist = 1;
                        this.courtEventConfilctData.push( this.courtEventData[i] );
                    }
                }
            }

            if ( this.conflictInsert === true && this.conflictCount > 0 ) {
                this.matchValue = true;
            }
            if ( this.conflictInsert === false && this.conflictCount >= 2 ) {
                this.matchValue = true;
            }
            this.conflictInsert = false;
            if ( this.matchValue == true ) {
                this.dialogService.openLinkDialog( '/oiuscinq', this.courtEventConfilctData ).subscribe( result => {
                    if ( !result ) {
                        this.disabled = true;
                        this.conflictNumFlag = 0;
                        this.populateCourtEventData( this.selectedCourtCase.caseId );
                    } else {
                        this.disabled = false;
                    }
                } );
            }
        }
        return true;
    }

    canCheckConflict = ( data: any, index: number, field: string ): boolean => {
        for ( let i = 0; i < this.courtEventData.length - 1; i++ ) {
            if ( DateFormat.compareDate( DateFormat.getDate( this.courtEventData[i].eventDate ), DateFormat.getDate( data.eventDate ) ) == 0 ) {
                if ( DateFormat.compareTime( DateFormat.getDate( this.courtEventData[i].startTime ), DateFormat.getDate( data.startTime ) ) == 0 ) {
                    ++this.conflictCount;
                    this.conflictExist = 1;
                }
            }
        }
        return true;
    }

    saveSentenceTermDetails( event ) {
        this.sentenceTermInsertList = event.added;
        this.sentenceTermUpdateList = event.updated;
        for ( let i = 0; i < this.sentenceTermInsertList.length; i++ ) {
            if ( this.sentenceTermInsertList[i].sentenceTermCode === null || this.sentenceTermInsertList[i].sentenceTermCode === undefined ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.termmustbeenter' );
                this.show();
                return;
            }

            if ( this.sentenceTermInsertList[i].startDate === null || this.sentenceTermInsertList[i].startDate === undefined ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.startdatemustbeenter' );
                this.show();
                return;
            }
            if ( !this.sentenceTermInsertList[i].years && !this.sentenceTermInsertList[i].months && !this.sentenceTermInsertList[i].weeks && !this.sentenceTermInsertList[i].days && !this.sentenceTermInsertList[i].hours ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.eitheryearsmonthsdaysneedstobeentered' );
                this.show();
                return;
            }
            this.sentenceTermInsertList[i].sentenceSeq = this.sentenceSeq;
            this.sentenceTermInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
            const datePipe = new DatePipe( 'en-US' );
            this.sentenceTermStartDate = datePipe.transform( this.sentenceTermInsertList[i].startDate, 'yyyy/MM/dd' );
            this.sentenceTermInsertList[i].startDate = new Date( this.sentenceTermStartDate );
            this.sentenceTermInsertList[i].createDateTime = DateFormat.getDate();
            this.sentenceTermInsertList[i].modifyDateTime = DateFormat.getDate();
            this.sentenceTermInsertList[i].createUserId = this.sessionManager.getId();
            this.sentenceTermInsertList[i].modifyUserId = this.sessionManager.getId();
        }

        if ( this.sentenceTermUpdateList.length > 0 ) {
            for ( let i = 0; i < this.sentenceTermUpdateList.length; i++ ) {
                if ( this.selectedCourtCase.linkCaseSeq > 0 ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'common.addupdateremoverecordsnotallowed' );
                    this.show();
                    this.populateOffenderSentenceTermData( this.selectedSentenceRecord );
                    return;
                }
                if ( this.sentenceTermUpdateList[i].sentenceTermCode == null && this.sentenceTermUpdateList[i].sentenceTermCode == undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.termmustbeenter' );
                    this.show();
                    return;
                }
                if ( this.sentenceTermUpdateList[i].startDate == null && this.sentenceTermUpdateList[i].startDate == undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.startdatemustbeenter' );
                    this.show();
                    return;
                }
                if ( !this.sentenceTermUpdateList[i].years && !this.sentenceTermUpdateList[i].months && !this.sentenceTermUpdateList[i].weeks && !this.sentenceTermUpdateList[i].days && !this.sentenceTermUpdateList[i].hours ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.eitheryearsmonthsdaysneedstobeentered' );
                    this.show();
                    return;
                }
                this.sentenceTermUpdateList[i].modifyDateTime = DateFormat.getDate();
                this.sentenceTermUpdateList[i].modifyUserId = this.sessionManager.getId();
            }
        }
        this.offenderSentenceTermCommitBean.insertList = this.sentenceTermInsertList;
        this.offenderSentenceTermCommitBean.updateList = this.sentenceTermUpdateList;
        const affetedRows = this.OcdccaseFactory.insertOffenderSentenceTermDetails( this.offenderSentenceTermCommitBean );
        affetedRows.subscribe( value => {
            if ( value === 1 ) {

                this.launchSentenceCalcDialog();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.show();
                return;
            }
        } );
    }

    saveOffensesOnSentences( event ) {
        this.offensesOnSentenceInsertList = event.added;
        for ( let i = 0; i < this.offensesOnSentenceInsertList.length; i++ ) {
            this.offensesOnSentenceInsertList[i].offenderBookId = this.selectedSentenceRecord.offenderBookId;
            this.offensesOnSentenceInsertList[i].sentenceSeq = this.selectedSentenceRecord.line;

        }
        this.offensesOnSentenceCommitBean.insertList = this.offensesOnSentenceInsertList;
        const affetedRows = this.OcdccaseFactory.insertOffensesOnSentencing( this.offensesOnSentenceCommitBean );
        affetedRows.subscribe( value => {
            if ( value === 1 ) {
                this.type = 'success';
                this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                this.populateOffenderSentenceData( this.selectedCourtCase );
                this.show();
                return;

            } else {
                this.type = 'error';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.show();
                return;
            }
        } );

    }

    onTermGridInsert = () => {
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
            return;
        }
        if ( this.selectedCourtCase.linkCaseSeq > 0 ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.addupdateremoverecordsnotallowed' );
            this.show();
            return;
        }
        this.termDataFlag = true;
        this.termsSatrtDate = this.selectedSentenceRecord.startDate;
        this.dummyTermId = this.dummyTermId + 1;
        return {
            startDate: DateFormat.getDate( this.termsSatrtDate ),
            'year': '',
            sentenceSeq: this.selectedSentenceRecord.line,
            offenderBookId: this.vHeaderBlockModel.offenderBookId,
            createDateTime: DateFormat.getDate(),
            modifyDateTime: DateFormat.getDate(),
            createUserId: this.sessionManager.getId(),
            modifyUserId: this.sessionManager.getId(),
            dummyTermId: this.dummyTermId,
        }
    }

    canButtonEditable = ( data: any, index: number, field: string ): boolean => {
        /*if ( data.category === "SENT" ) {
            return true;
        } else {
            return false;
        }*/
        return true;
    }

    startTab() {
        this.tabMapping.forEach(( k, v ) => {
            if ( k == this.selectedTab ) {
                document.getElementById( v ).click();
                document.getElementById( k ).style.display = "block";
            } else {
                document.getElementById( k ).style.display = "none";
            }

        } );
    }

    openProcess( evt, processName ) {
        this.selectedTab = processName;
        // Declare all variables
        var i, tabcontent, tablinks;
        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName( "tabcontent" );
        for ( i = 0; i < tabcontent.length; i++ ) {
            tabcontent[i].style.display = "none";
        }
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName( "tablinks" );
        for ( i = 0; i < tablinks.length; i++ ) {
            tablinks[i].className = tablinks[i].className.replace( "active", "" );
        }

        // Show the current tab, and add an "active" class to the link that opened the tab
        document.getElementById( processName ).style.display = "block";
        evt.currentTarget.className += " active";
        if ( processName === 'Process1' ) {    // this method for add class of tabcolor turned green after complited.
            this.sentenceDataFlag = false;
            this.alertToSave = false;
            this.checkAlertToSaveForTab2();
            if ( this.alertToSave ) {
                const Dialogdata = {
                    label: this.translateService.translate( 'ocdccases.doyouwanttosavetheexisteddata' ), yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog( '/oiddecasconfirmbox', Dialogdata, 60 ).subscribe( result => {
                    if ( result ) {
                        this.onSave( result );
                    } else {
                        this.populateSentenceGrid();
                        this.populateOffenderSentenceDataWhenNoSave( this.selectedCourtCase );
                    }
                } );
            }
        }

        if ( processName === 'Process2' ) {    // this method for add class of tabcolor turned green after complited.
            this.alertToSave = false;
            this.checkAlertToSaveForTab1();
            if ( this.alertToSave ) {
                const Dialogdata = {
                    label: this.translateService.translate( 'ocdccases.doyouwanttosavetheexisteddata' ), yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog( '/oiddecasconfirmbox', Dialogdata, 60 ).subscribe( result => {
                    if ( result ) {
                        this.onSave( result );
                        this.ocdcCasesExecuteQuery();
                    } else {
                        this.ocdcCasesExecuteQuery();
                    }
                } );
            }
            this.sentenceDateLovUrl = "ocdcCases/populateSentenceDate?caseId=" + this.courtCaseId;
            this.sentenceDataFlag = true;
            if ( this.termsData == undefined || this.termsData == null || this.termsData.length == 0 ) {
                this.termDataFlag = false;
            }
            this.populateSentenceGrid();
            this.populateOffenderSentenceData( this.selectedCourtCase );
        }
        if ( processName === 'Process3' ) {
            this.alertToSave = false;
            this.checkAlertToSaveForTab1();
            this.checkAlertToSaveForTab2();
            if ( this.alertToSave ) {
                const Dialogdata = {
                    label: this.translateService.translate( 'ocdccases.doyouwanttosavetheexisteddata' ), yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog( '/oiddecasconfirmbox', Dialogdata, 60 ).subscribe( result => {
                    if ( result ) {
                        this.onSave( result );
                    } else {
                        this.ocdcCasesExecuteQuery();
                        this.populateSentenceGrid();
                        this.populateOffenderSentenceDataWhenNoSave( this.selectedCourtCase );
                    }
                } );
            }

            this.populateBailDetails( this.vHeaderBlockModel.offenderBookId );
        }
        return false;
    }
    
    checkAlertToSaveForTab1() {
        for ( let i = 0; i < this.courtCasesData.length; i++ ) {
            if ( this.courtCasesData[i].commitFlag == "i" || this.courtCasesData[i].commitFlag == "u" ) {
                this.alertToSave = true;
            }
            if ( this.courtCasesData[i].courtEventList != undefined || this.courtCasesData[i].courtEventList != null ) {
                for ( let j = 0; j < this.courtCasesData[i].courtEventList.length; j++ ) {
                    if ( this.courtCasesData[i].courtEventList[j].commitFlag == "i" || this.courtCasesData[i].courtEventList[j].commitFlag == "u" ) {
                        this.alertToSave = true;
                    }
                    if ( this.courtCasesData[i].courtEventList[j].offenseOutcomeList != undefined || this.courtCasesData[i].courtEventList[j].offenseOutcomeList != null ) {
                        for ( let k = 0; k < this.courtCasesData[i].courtEventList[j].offenseOutcomeList.length; k++ ) {
                            if ( this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k].commitFlag == "i" || this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k].commitFlag == "u" ) {
                                this.alertToSave = true;
                            }
                        }
                    }
                }
            }
        }
    }

    checkAlertToSaveForTab2() {
        for ( let i = 0; i < this.sentencesData.length; i++ ) {
            if ( this.sentencesData[i].commitFlag != null && this.sentencesData[i].commitFlag == "i" || this.sentencesData[i].commitFlag == "u" ) {
                this.alertToSave = true;
            }
            if ( this.sentencesData[i].offensesOnSentenceList != undefined || this.sentencesData[i].offensesOnSentenceList != null ) {
                for ( let j = 0; j < this.sentencesData[i].offensesOnSentenceList.length; j++ ) {
                    if ( this.sentencesData[i].offensesOnSentenceList[j].commitFlag != null || this.sentencesData[i].offensesOnSentenceList[j].commitFlag != undefined ) {
                        if ( this.sentencesData[i].offensesOnSentenceList[j].commitFlag == "i" || this.sentencesData[i].offensesOnSentenceList[j].commitFlag == "u" ) {
                            this.alertToSave = true;
                        }
                    }
                }
            }
            if ( this.sentencesData[i].sentenceTermList != undefined || this.sentencesData[i].sentenceTermList != null ) {
                for ( let k = 0; k < this.sentencesData[i].sentenceTermList.length; k++ ) {
                    if ( this.sentencesData[i].sentenceTermList[k].commitFlag != null || this.sentencesData[i].sentenceTermList[k].commitFlag != undefined ) {
                        if ( this.sentencesData[i].sentenceTermList[k].commitFlag == "i" || this.sentencesData[i].sentenceTermList[k].commitFlag == "u" ) {
                            this.alertToSave = true;
                        }
                    }
                }
            }
        }
    }

    /**
        To insert offenses
        */

    insertOffenceOut( event ) {
        this.offenceOutcomeInsertList = event.added;
        this.offenceOutcomeUpdateList = event.updated;


        for ( let i = 0; i < this.offenceOutcomeInsertList.length; i++ ) {
            if ( this.offenceOutcomeInsertList[i].offenceCode === null || this.offenceOutcomeInsertList[i].offenceCode === undefined ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.offensemustbethere' );
                this.show();
                return;
            }

            if ( this.offenceOutcomeInsertList[i].offenseType === null || this.offenceOutcomeInsertList[i].offenseType === undefined ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.offensetypemustbethere' );
                this.show();
                return;
            }
            if ( this.offenceOutcomeInsertList[i].chargeStatus == "ACTIVE" ) {
                this.offenceOutcomeInsertList[i].chargeStatus = "A";

            }
            this.offenceOutcomeInsertList[i].caseId = this.selectedCourtCase.caseId;
            this.offenceOutcomeInsertList[i].chargeStatus = "A"
            this.offenceOutcomeInsertList[i].resultcode1indicator = this.offenceOutcomeInsertList[i].disposition;
            this.offenceOutcomeInsertList[i].eventId = this.selectedCourtEventId;
            this.offenceOutcomeInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
            const datePipe = new DatePipe( 'en-US' );
            this.sysDate = DateFormat.getDate();
            if ( this.offenceOutcomeInsertList[i].offenseDate != null ) {
                this.offenseDate = datePipe.transform( this.offenceOutcomeInsertList[i].offenseDate, 'yyyy/MM/dd' );
                this.offenceOutcomeInsertList[i].offenseDate = new Date( this.offenseDate );

            }
            if ( this.offenceOutcomeInsertList[i].range != null ) {
                this.range = datePipe.transform( this.offenceOutcomeInsertList[i].range, 'yyyy/MM/dd' );
                this.offenceOutcomeInsertList[i].range = new Date( this.range );
            }

            if ( this.offenceOutcomeInsertList[i].offenseDate > this.sysDate ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.offensedatecannotbegreater' );
                this.show();
                return;
            }

            if ( this.offenceOutcomeInsertList[i].range > this.sysDate ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.rangedatecannotbegreater' );
                this.show();
                return;
            }

            if ( this.offenceOutcomeInsertList[i].offenseDate != null && this.offenceOutcomeInsertList[i].range != null ) {
                if ( this.offenceOutcomeInsertList[i].range < this.offenceOutcomeInsertList[i].offenseDate ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.rangecannotbepriortooffensedate' );
                    this.show();
                    return;
                }
            }

            this.offenceOutcomeInsertList[i].createDateTime = DateFormat.getDate();
            this.offenceOutcomeInsertList[i].modifyDateTime = DateFormat.getDate();
            this.offenceOutcomeInsertList[i].createUserId = this.sessionManager.getId();
            this.offenceOutcomeInsertList[i].modifyUserId = this.sessionManager.getId();
        }

        if ( this.offenceOutcomeUpdateList.length > 0 ) {

            for ( let i = 0; i < this.offenceOutcomeUpdateList.length; i++ ) {
                if ( this.selectedCourtCase.linkCaseSeq > 0 ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'common.addupdateremoverecordsnotallowed' );
                    this.show();
                    this.populateOffensesOutcomeData( this.selectedCourtEvent );
                    return;
                }
                if ( this.offenceOutcomeUpdateList[i].offenceCode === null || this.offenceOutcomeUpdateList[i].offenceCode === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.offensemustbethere' );
                    this.show();
                    return;
                }

                if ( this.offenceOutcomeUpdateList[i].offenseType === null || this.offenceOutcomeUpdateList[i].offenseType === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.offensetypemustbethere' );
                    this.show();
                    return;
                }

                const datePipe = new DatePipe( 'en-US' );
                if ( this.offenceOutcomeUpdateList[i].offenseDate != null ) {
                    this.offenseDate = datePipe.transform( this.offenceOutcomeUpdateList[i].offenseDate, 'yyyy/MM/dd' );
                    this.offenceOutcomeUpdateList[i].offenseDate = new Date( this.offenseDate );

                }
                if ( this.offenceOutcomeUpdateList[i].range != null ) {
                    this.range = datePipe.transform( this.offenceOutcomeUpdateList[i].range, 'yyyy/MM/dd' );
                    this.offenceOutcomeUpdateList[i].range = new Date( this.range );
                }

                if ( this.offenceOutcomeUpdateList[i].offenseDate != null && this.offenceOutcomeUpdateList[i].range != null ) {
                    if ( this.offenceOutcomeUpdateList[i].range < this.offenceOutcomeUpdateList[i].offenseDate ) {
                        this.type = 'warn';
                        this.message = this.translateService.translate( 'ocdccases.rangecannotbepriortooffensedate' );
                        this.show();
                        return;
                    }
                }

                this.offenceOutcomeUpdateList[i].eventId = this.selectedCourtEventId;
                this.offenceOutcomeUpdateList[i].caseId = this.selectedCourtCase.caseId;
                this.offenceOutcomeUpdateList[i].chargeStatus = "A"
                this.offenceOutcomeUpdateList[i].resultcode1indicator = this.offenceOutcomeUpdateList[i].disposition;
                this.offenceOutcomeUpdateList[i].modifyDateTime = DateFormat.getDate();
                this.offenceOutcomeUpdateList[i].modifyUserId = this.sessionManager.getId();
            }
        }

        this.offenceOutcomeCommitBean.insertList = this.offenceOutcomeInsertList;
        this.offenceOutcomeCommitBean.updateList = this.offenceOutcomeUpdateList;
        const affetedRows = this.OcdccaseFactory.insertOffenceOutcome( this.offenceOutcomeCommitBean );
        affetedRows.subscribe( value => {
            if ( value === 1 ) {
                this.type = 'success';
                this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                this.populateOffensesOutcomeData( this.selectedCourtEvent );
                this.show();
                return;
            } else {
                this.type = 'error';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.show();
                return;
            }

        } );
        return;
    }

    onOffenseOutcomeGridInsert = () => {
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
            return;
        }
        if ( this.courtEventData.length == 0 ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.courteventmustbeenter' );
            this.show();
            return;
        }
        if ( this.selectedCourtEvent.dummyOffenderChargeId == null || this.selectedCourtEvent.dummyOffenderChargeId == undefined ) {
            this.selectedCourtEvent.dummyOffenderChargeId = 0;
        }
        this.selectedCourtEvent.dummyOffenderChargeId = this.selectedCourtEvent.dummyOffenderChargeId + 1;
        
        if(!this.selectedCourtEvent.resultcode1 && (this.selectedCourtEvent.outcomeReasonCode && !(" " == this.selectedCourtEvent.outcomeReasonCode))) {
            for(let i =0; i < this.offensesResultCodeData.length; i++) {
                
                if(this.selectedCourtEvent.outcomeReasonCode === this.offensesResultCodeData[i].code) {
                    let offenseOutcome = this.offensesResultCodeData[i];
                    return {
                        'apply':true,
                        'resultcode1': offenseOutcome.code,
                        'outcomeLaunchButton': '...',
                        'disposition': offenseOutcome.disposition,
                        'chargeStatus': offenseOutcome.chargeStatus,
                        'outcomeReasonCode': offenseOutcome.code,
                        'caseId': this.selectedCourtCase.caseId,
                        'eventId': this.selectedCourtEvent.eventId,
                        'createDateTime': DateFormat.getDate(),
                        'modifyDateTime': DateFormat.getDate(),
                        'createUserId': this.sessionManager.getId(),
                        'modifyUserId': this.sessionManager.getId(),
                        'offenderBookId': this.vHeaderBlockModel.offenderBookId,
                        'dummyOffenderChargeId': this.selectedCourtEvent.dummyOffenderChargeId
                    };
                }
            }
        } else {
            return {
                'apply':true,
                'resultcode1': this.selectedCourtEvent.resultcode1,
                'outcomeLaunchButton': '...',
                'disposition': this.selectedCourtEvent.disposition,
                'chargeStatus': this.selectedCourtEvent.chargeStatus,
                'outcomeReasonCode': this.selectedCourtEvent.outcomeReasonCode,
                'caseId': this.selectedCourtCase.caseId,
                'eventId': this.selectedCourtEvent.eventId,
                'createDateTime': DateFormat.getDate(),
                'modifyDateTime': DateFormat.getDate(),
                'createUserId': this.sessionManager.getId(),
                'modifyUserId': this.sessionManager.getId(),
                'offenderBookId': this.vHeaderBlockModel.offenderBookId,
                'dummyOffenderChargeId': this.selectedCourtEvent.dummyOffenderChargeId
            }
        }
    }

    offenderCharges = () => {
    }

    addedCases( event ) {
        this.btnDisable = false;
    }

    addedEvents( event ) {
        if ( this.selectedCourtCase.courtEventList == undefined ) {
            this.selectedCourtCase.courtEventList = [];
        }
        if ( this.selectedCourtCase.courtEventList.length == 0 ) {
            this.selectedCourtCase.courtEventList = this.courtEventData;
        }
        this.btnDisable = false;
    }

    addedOffensesOutcome( event ) {
        if ( this.selectedCourtEvent.offenseOutcomeList == undefined ) {
            this.selectedCourtEvent.offenseOutcomeList = [];
        }
        if ( this.selectedCourtEvent.offenseOutcomeList.length == 0 ) {
            this.selectedCourtEvent.offenseOutcomeList = this.offencesOutcomedata;
        }
        this.btnDisable = false;
    }

    addedSentences( event ) {
        this.termDataFlag = false;
        if ( this.sentencesData == undefined ) {
            this.sentencesData = [];
            this.selectedCourtCase.sentencesList = this.sentencesData;
        } else {
            this.selectedCourtCase.sentencesList = this.sentencesData;
        }
    }

    updatedSentences( event ) {
        if ( this.selectedSentenceRecord.sentenceCalcType != undefined && this.selectedSentenceRecord.category != undefined ) {
            this.termCodeLovUrl = 'ocdccase/populateSentenceTermCodeLov?sentenceCalcType=' + this.selectedSentenceRecord.sentenceCalcType + '&sentenceCategory=' + this.selectedSentenceRecord.category;
            this.termDataFlag = true;
            this.termGridFormation();
        } else {
            this.termDataFlag = false;
        }
        for ( let i = 0; i < this.sentencesData.length; i++ ) {
            if ( event.updated.line ) {
                if ( this.sentencesData[i].line == event.updated.line ) {
                    this.sentencesData[i].commitFlag = "u";
                }
            } else if ( this.sentencesData[i].dummySentenceId != null && ( this.sentencesData[i].dummySentenceId == event.updated.dummySentenceId ) ) {
                this.sentencesData[i] = event.updated;
                this.sentencesData[i].commitFlag = "i";
            }
        }
    }

    addedOffensesOnSentence( event ) {
        if ( this.offensesData == undefined ) {
            this.offensesData = [];
            this.selectedSentenceRecord.offensesOnSentenceList = this.offensesData;
        } else {
            this.selectedSentenceRecord.offensesOnSentenceList = this.offensesData;
        }
    }

    updatedOffensesOnSentence( event ) {
        for ( let i = 0; i < this.selectedSentenceRecord.offensesOnSentenceList.length; i++ ) {
            if ( event.updated.dummyOffenseId == this.selectedSentenceRecord.offensesOnSentenceList[i].dummyOffenseId ) {
                this.selectedSentenceRecord.offensesOnSentenceList[i] = event.updated;
                this.selectedSentenceRecord.offensesOnSentenceList[i].commitFlag = "i";
            }
        }
    }

    addedTerm( event ) {
        if ( this.termsData == undefined ) {
            this.termsData = [];
            this.selectedSentenceRecord.sentenceTermList = this.termsData;
            this.dialogOpenFlag = false;
        } else {
            this.selectedSentenceRecord.sentenceTermList = this.termsData;
            this.dialogOpenFlag = false;
        }
    }

    updatedTerm( event ) {
        for ( let j = 0; j < this.selectedSentenceRecord.sentenceTermList.length; j++ ) {
            if ( event.updated.termSeq == null || event.updated.termSeq === undefined ) {
                if ( event.updated.dummyTermId == this.selectedSentenceRecord.sentenceTermList[j].dummyTermId ) {
                    this.selectedSentenceRecord.sentenceTermList[j].commitFlag = "i";
                    this.selectedSentenceRecord.sentenceTermList[j] = event.updated;
                    if ( !this.dialogOpenFlag ) {
                        /*if ( event.updated.years || event.updated.months || event.updated.weeks || event.updated.days || event.updated.hours ) {
                            this.dialogService.openLinkDialog( '/OCUCALCR', this.vHeaderBlockModel, 990 ).subscribe( result => {
                                if ( result ) {
                                    this.dialogOpenFlag = true;
                                    this.sentenceCalc.sentDate = DateFormat.getDate();
                                    this.sentenceCalc.sentTime = DateFormat.getDate();
                                    this.sentenceCalc.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                                    this.sentenceCalc.staffName = result.staffName;
                                    this.sentenceCalc.calcCode = result.calculationReason;
                                    this.sentenceCalc.comment = result.commentText;
                                    this.selectedSentenceRecord.sentenceTermList[j].sentenceCalculation = this.sentenceCalc;
                                }
                            } );
                        }*/
                    }
                }

            } else if ( event.updated.termSeq != null && ( this.selectedSentenceRecord.sentenceTermList[j].termSeq === event.updated.termSeq ) ) {
                this.selectedSentenceRecord.sentenceTermList[j] = event.updated;
                this.selectedSentenceRecord.sentenceTermList[j].commitFlag = "u";
                /*if ( event.updated.years || event.updated.months || event.updated.weeks || event.updated.days || event.updated.hours ) {
                    this.dialogService.openLinkDialog( '/OCUCALCR', this.vHeaderBlockModel, 990 ).subscribe( result => {
                        if ( result ) {
                            this.dialogOpenFlag = true;
                            this.sentenceCalc.sentDate = DateFormat.getDate();
                            this.sentenceCalc.sentTime = DateFormat.getDate();
                            this.sentenceCalc.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                            this.sentenceCalc.staffName = result.staffName;
                            this.sentenceCalc.calcCode = result.calculationReason;
                            this.sentenceCalc.comment = result.commentText;
                            this.selectedSentenceRecord.sentenceTermList[j].commitFlag = "u";
                            this.selectedSentenceRecord.sentenceTermList[j].sentenceCalculation = this.sentenceCalc;
                        }
                    } );
                }*/
            }
        }
    }

    updatedBailDetail( event ) {
        for ( let i = 0; i < this.selectedCourtCase.bailDetailsList.length; i++ ) {
            if ( event.updated.chargeId == this.selectedCourtCase.bailDetailsList[i].chargeId ) {
                /*if ( event.updated.cashFlag && event.updated.cashFlag !== "N") {
                    event.updated.cashFlag = "Y";
                } else {
                    event.updated.cashFlag = "N";
                }*/
                if ( event.updated.BailDate != null ) {
                    this.selectedCourtCase.bailDetailsList[i].BailDate = DateFormat.getDate( this.selectedCourtCase.bailDetailsList[i].BailDate );
                }

                if ( event.updated.bailBookId == null ) {
                    event.updated.action = "I";
                } else {
                    event.updated.action = "U";
                }
                this.selectedCourtCase.bailDetailsList[i].createUserId = this.sessionManager.getId();
                this.selectedCourtCase.bailDetailsList[i].modifyUserId = this.sessionManager.getId();
                this.selectedCourtCase.bailDetailsList[i] = event.updated;
                
                this.selectedCourtCase.bailDetailsList[i].commitFlag = "u";
            }
        }
    }
    updatedBailBondDetail(event) {
        this.selectedBailRow.preferedDateTime = event.updated.preferedDateTime;
        this.selectedBailRow.time = event.updated.time;
        this.selectedBailRow.preferedBy = event.updated.preferedBy;
        this.selectedBailRow.method= event.updated.method;
        this.selectedBailRow.receiptText = event.updated.receiptText;
        this.selectedBailRow.commentText = event.updated.commentText;
        this.selectedBailRow.createUserId = this.sessionManager.getId();
        this.selectedBailRow.modifyUserId = this.sessionManager.getId();
        
        if ( event.updated.bailBookId == null ) {
          this.selectedBailRow.action = "I";
        } else {
          this.selectedBailRow.action = "U";
        }
        this.selectedBailRow.commitFlag = "u";
        
    }
    clearBailBondDetails = ()=> {
        let bondDetails = new OffenderBailDetails();
        this.bailDetailsTemp.forEach(element => {
            if(element.seqNo === this.selectedBailRow.seqNo) {
                bondDetails = element;
            }
        });
        this.selectedBailRow.preferedDateTime = bondDetails.preferedDateTime;
        this.selectedBailRow.time = bondDetails.time;
        this.selectedBailRow.preferedBy = bondDetails.preferedBy;
        this.selectedBailRow.method= bondDetails.method;
        this.selectedBailRow.receiptText = bondDetails.receiptText;
        this.selectedBailRow.commentText = bondDetails.commentText;
        this.selectedBailRow.createUserId = bondDetails.createUserId;
        this.selectedBailRow.modifyUserId = bondDetails.modifyUserId;
        this.bailBondDetailList = [];
        this.bailBondDetailList.push(this.selectedBailRow);
    }
    updatedCases( event ) {
        for ( let i = 0; i < this.courtCasesData.length; i++ ) {
            if ( event.updated.caseId ) {
                if ( this.courtCasesData[i].caseId == event.updated.caseId ) {
                    this.courtCasesData[i].commitFlag = "u";
                }
            } else if ( this.courtCasesData[i].dummyCaseId != null && ( this.courtCasesData[i].dummyCaseId == event.updated.dummyCaseId ) ) {
                this.courtCasesData[i] = event.updated;
                this.courtCasesData[i].commitFlag = "i";
            }
        }
        if ( this.courtEventUpdateList.length > 0 ) {
            this.singleCommit( event );
            return;
        }

        if ( this.offenceOutcomeUpdateList.length > 0 ) {
            this.singleCommit( event );
            return;
        }
        this.courtCasesUpdateList = event.updated;
        this.btnDisable = false;
    }

    updatedEvents( event ) {
        for ( let i = 0; i < this.selectedCourtCase.courtEventList.length; i++ ) {
            if ( event.updated.eventId == null || event.updated.eventId === undefined ) {
                if ( event.updated.dummyEventId == this.selectedCourtCase.courtEventList[i].dummyEventId ) {
                    this.selectedCourtCase.courtEventList[i] = event.updated;
                    this.selectedCourtCase.courtEventList[i].commitFlag = "i";
                }

            } else if ( event.updated.eventId != null && ( this.selectedCourtCase.courtEventList[i].eventId === event.updated.eventId ) ) {
                this.selectedCourtCase.courtEventList[i] = event.updated;
                this.selectedCourtCase.courtEventList[i].commitFlag = "u";
            }
        }
        this.btnDisable = false;
    }

    updatedOutcomes( event ) {
        for ( let i = 0; i < this.selectedCourtEvent.offenseOutcomeList.length; i++ ) {
            if ( event.updated.offenderChargeId == null || event.updated.offenderChargeId === undefined ) {
                if ( event.updated.dummyOffenderChargeId == this.selectedCourtEvent.offenseOutcomeList[i].dummyOffenderChargeId ) {
                    this.selectedCourtEvent.offenseOutcomeList[i] = event.updated;
                    this.selectedCourtEvent.offenseOutcomeList[i].commitFlag = "i";
                }

            } else if ( event.updated.offenderChargeId != null && ( this.selectedCourtEvent.offenseOutcomeList[i].offenderChargeId === event.updated.offenderChargeId ) ) {
                this.selectedCourtEvent.offenseOutcomeList[i] = event.updated;
                this.selectedCourtEvent.offenseOutcomeList[i].commitFlag = "u";
            }
        }
        this.btnDisable = false;
    }
    clearedCases( event ) {
        this.courtCasesData = this.courtCasesData;
    }
    clearedEvents( event ) {
        this.selectedCourtCase.courtEventList = this.courtEventData;
    }
    clearedOffenses( event ) {
        this.selectedCourtEvent.offenseOutcomeList = this.offencesOutcomedata;
    }
    clearedSentences( event ) {
        this.selectedCourtCase.sentencesList = this.sentencesData;
    }
    clearedOffenseOnSentence( event ) {
        this.selectedSentenceRecord.offensesOnSentenceList = this.offensesData;
        this.selectedCourtCase.sentencesList = this.sentencesData;
    }
    clearedTerms( event ) {
        this.selectedSentenceRecord.sentenceTermList = this.termsData;
        this.selectedCourtCase.sentencesList = this.sentencesData;
    }
    singleCommit( event ) {
        if ( this.courtEventInsertList.length == 0 && this.courtEventUpdateList.length == 0 && this.offenceOutcomeInsertList.length == 0 && this.offenceOutcomeUpdateList.length == 0 ) {
            this.singleCaseOnly = 1;
            if ( this.courtCasesInsertList.length > 0 ) {
                this.courtCasesInsertList[0].eventInsertList = [];
            }
            this.saveOffenderCases();
            return;
        }

        if ( this.courtEventInsertList.length > 0 && this.courtCasesInsertList.length > 0 ) {
            this.courtCasesInsertList[0].eventInsertList = this.courtEventInsertList;
            if ( this.offenceOutcomeInsertList.length == 0 ) {
                this.courtEventInsertList[0].offenseOutcomeInsertList = [];
            }
        }

        if ( ( this.courtEventInsertList.length > 0 || this.courtEventUpdateList.length > 0 ) && this.courtCasesInsertList.length == 0 ) {
            if ( this.offenceOutcomeInsertList.length == 0 ) {
                if ( this.courtEventInsertList.length > 0 ) {
                    this.courtEventInsertList[0].offenseOutcomeInsertList = [];
                }
            }
            this.SaveOffenderCourtEvents();
            return;
        }
        if ( ( this.offenceOutcomeInsertList.length > 0 || this.offenceOutcomeUpdateList.length > 0 ) && this.courtCasesInsertList.length == 0 && this.courtEventInsertList.length == 0 ) {
            this.saveOffensesOutcome();
            return;
        }
        this.saveOffenderCases();
    }
    saveOffenderCases() {
        this.offenderCasesCommitModel.insertList = [];
        this.offenderCasesCommitModel.updateList = [];
        this.sysDate = DateFormat.getDate();
        if ( this.courtCasesInsertList.length > 0 ) {
            for ( let i = 0; i < this.courtCasesInsertList.length; i++ ) {
                if ( this.courtCasesInsertList[i].beginDate === null || this.courtCasesInsertList[i].beginDate === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.startdatemustbeenter' );
                    this.show();
                    return;
                }
                if ( this.courtCasesInsertList[i].agy_loc_id === null || this.courtCasesInsertList[i].agy_loc_id === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.courtmustbeentered' );
                    this.show();
                    return;
                }
                if ( this.courtCasesInsertList[i].caseType === null || this.courtCasesInsertList[i].caseType === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.typemustbeentered' );
                    this.show();
                    return;
                }

                this.courtCasesInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                const datePipe = new DatePipe( 'en-US' );
                this.beginDate = DateFormat.getDate( this.courtCasesInsertList[i].beginDate );
                this.courtCasesInsertList[i].beginDate = DateFormat.getDate( this.courtCasesInsertList[i].beginDate );
                if ( DateFormat.compareDate( this.courtCasesInsertList[i].beginDate, this.sysDate ) === 1 ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.startdatecannotbepostdated' );
                    this.show();
                    return;
                }
                this.booking = DateFormat.getDate( this.vHeaderBlockModel.bookingBeginDate );
                if ( DateFormat.compareDate( this.booking, this.beginDate ) === 1 ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.startdatecannotbeearlierthanbooking' );
                    this.show();
                    return;
                }
                this.courtCasesInsertList[i].creatDateTime = DateFormat.getDate();
                this.courtCasesInsertList[i].modifyDateTime = DateFormat.getDate();
                this.courtCasesInsertList[i].createUserId = this.sessionManager.getId();
                this.courtCasesInsertList[i].modifyUserId = this.sessionManager.getId();
            }
        }

        if ( this.courtCasesUpdateList.length > 0 ) {
            for ( let i = 0; i < this.courtCasesUpdateList.length; i++ ) {
                this.courtCasesUpdateList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                const datePipe = new DatePipe( 'en-US' );
                this.beginDate = datePipe.transform( this.courtCasesUpdateList[i].beginDate, 'yyyy/MM/dd' );
                this.courtCasesUpdateList[i].beginDate = new Date( this.beginDate );
                if ( this.courtCasesUpdateList[i].linkCaseSeq > 0 ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.updatenotallowed' );
                    this.show();
                    this.ocdcCasesExecuteQuery();
                    return;
                }
                if ( this.courtCasesUpdateList[i].beginDate > this.sysDate ) {
                    this.type = 'warn';
                    this.message = 'Case Date Cannot Be Postdated';
                    this.show();
                    return;
                }
                this.booking = new Date( this.vHeaderBlockModel.bookingBeginDate );
                this.beginDate = new Date( this.beginDate );
                if ( this.booking > this.beginDate ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.startdatecannotbeearlierthanbooking' );
                    this.show();
                    return;
                }
                this.courtCasesUpdateList[i].creatDateTime = DateFormat.getDate();
                this.courtCasesUpdateList[i].modifyDateTime = DateFormat.getDate();
                this.courtCasesUpdateList[i].createUserId = this.sessionManager.getId();
                this.courtCasesUpdateList[i].modifyUserId = this.sessionManager.getId();
            }
        }
        this.offenderCasesCommitModel.insertList = this.courtCasesInsertList;
        this.offenderCasesCommitModel.updateList = this.courtCasesUpdateList;
        const courtCaseSaveData = this.OcdccaseFactory.newCourtCase( this.offenderCasesCommitModel );
        courtCaseSaveData.subscribe( caseSaveResult => {
            if ( caseSaveResult === 1 ) {
                if ( this.singleCaseOnly == 1 ) {
                    this.type = 'success';
                    this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                    this.show();
                    this.rel_id = 0;
                    this.courtCasesInsertList = [];
                    this.courtCasesUpdateList = [];
                    this.courtEventInsertList = [];
                    this.ocdcCasesExecuteQuery();
                    return;
                }
                if ( this.courtCasesInsertList[0].eventInsertList.length == 1 || this.courtEventUpdateList.length > 0 ) {
                    this.SaveOffenderCourtEvents();
                    return;
                }
            } else {
                this.type = 'error';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.show();
                this.rel_id = 0;
                this.courtCasesInsertList = [];
                this.courtEventInsertList = [];
                this.offenceOutcomeInsertList = [];
                this.ocdcCasesExecuteQuery();
                return;
            }
        } );
    }

    SaveOffenderCourtEvents() {
        this.offenderCourtEventCommitModel.insertList = [];
        this.offenderCourtEventCommitModel.updateList = [];
        this.sysDate = DateFormat.getDate();
        if ( this.courtEventInsertList.length > 0 ) {
            for ( let i = 0; i < this.courtEventInsertList.length; i++ ) {

                if ( this.courtEventInsertList[i].eventDate === null || this.courtEventInsertList[i].eventDate === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.datemustbeentered' );
                    this.show();
                    return;
                }
                if ( this.courtEventInsertList[i].agyLocId === null || this.courtEventInsertList[i].agyLocId === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.courtmustbeentered' );
                    this.show();
                    return;
                }
                if ( this.courtEventInsertList[i].startTime === null || this.courtEventInsertList[i].startTime === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.timemustbeentered' );
                    this.show();
                    return;
                }
                if ( this.courtEventInsertList[i].hearingType === null || this.courtEventInsertList[i].hearingType === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.hearingtypemustbeentered' );
                    this.show();
                    return;
                }
                if ( ( this.courtEventInsertList[i].nextEventDate === undefined || this.courtEventInsertList[i].nextEventDate === null ) && this.courtEventInsertList[i].nextEventStartTime != null ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.nexteventdatemustbeenteredwithtime' );
                    this.show();
                    return;
                }

                if ( new Date( this.courtEventInsertList[i].nextEventDate ) < new Date( this.courtEventInsertList[i].eventDate ) ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.nexteventdatecannotbeearlierthanexistingdate' );
                    this.show();
                    return;
                }
                this.courtEventInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                const datePipe = new DatePipe( 'en-US' );
                const time = datePipe.transform( this.courtEventInsertList[i].startTime, 'HH:mm' );
                const String = datePipe.transform( this.courtEventInsertList[i].eventDate, 'yyyy/MM/dd' );
                this.eventDate = datePipe.transform( this.courtEventInsertList[i].eventDate, 'yyyy/MM/dd' );
                const hearingTime = new Date( String + ' ' + time );
                this.courtEventInsertList[i].startTime = hearingTime;
                this.courtEventInsertList[i].eventDate = new Date( this.eventDate );
                if ( this.courtEventInsertList[i].nextEventStartTime != null ) {
                    const nextEventTime = datePipe.transform( this.courtEventInsertList[i].nextEventStartTime, 'HH:mm' );
                    const nextEventDateString = datePipe.transform( this.courtEventInsertList[i].nextEventDate, 'yyyy/MM/dd' );
                    const nextEventHearingTime = new Date( nextEventDateString + ' ' + nextEventTime );
                    this.courtEventInsertList[i].nextEventStartTime = nextEventHearingTime;
                }
                if ( this.courtEventInsertList[i].nextEventStartTime == null && this.courtEventInsertList[i].nextEventDate != null ) {
                    const nextEventDateString = datePipe.transform( this.courtEventInsertList[i].nextEventDate, 'yyyy/MM/dd' );
                    const nextEventHearingTime = new Date( nextEventDateString + ' ' + '09:30' );
                    this.courtEventInsertList[i].nextEventStartTime = nextEventHearingTime;
                }
                if ( this.courtEventInsertList[i].nextEventDate != null ) {
                    this.nextEventDate = datePipe.transform( this.courtEventInsertList[i].nextEventDate, 'yyyy/MM/dd' );
                    this.courtEventInsertList[i].nextEventDate = new Date( this.nextEventDate );
                }
                if ( this.selectedCourtCase.caseId > 1 ) {
                    this.courtEventInsertList[i].caseId = this.selectedCourtCase.caseId;
                }

                this.courtEventInsertList[i].createDateTime = DateFormat.getDate();
                this.courtEventInsertList[i].modifyDateTime = DateFormat.getDate();
                this.courtEventInsertList[i].createUserId = this.sessionManager.getId();
                this.courtEventInsertList[i].modifyUserId = this.sessionManager.getId();
            }
        }

        if ( this.courtEventUpdateList.length > 0 ) {
            if ( this.linkedCaseId != null ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.addupdateremoverecordsnotallowed' );
                this.show();
                return;

            }
            for ( let i = 0; i < this.courtEventUpdateList.length; i++ ) {
                if ( this.courtEventUpdateList[i].eventDate === null || this.courtEventUpdateList[i].eventDate === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.datemustbeentered' );
                    this.show();
                    return;
                }
                if ( this.courtEventUpdateList[i].agyLocId === null || this.courtEventUpdateList[i].agyLocId === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.courtmustbeentered' );
                    this.show();
                    return;
                }
                if ( this.courtEventUpdateList[i].startTime === null || this.courtEventUpdateList[i].startTime === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.timemustbeentered' );
                    this.show();
                    return;
                }
                if ( this.courtEventUpdateList[i].hearingType === null || this.courtEventUpdateList[i].hearingType === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.hearingtypemustbeentered' );
                    this.show();
                    return;
                }
                if ( ( this.courtEventUpdateList[i].nextEventDate === undefined || this.courtEventUpdateList[i].nextEventDate === null ) && this.courtEventUpdateList[i].nextEventStartTime != null ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.nexteventdatemustbeenteredwithtime' );
                    this.show();
                    return;
                }
                this.caseBeginDate = DateFormat.getDate( this.caseStartDate );
                this.caseEventBeginDate = DateFormat.getDate( this.courtEventUpdateList[i].eventDate );
                if ( this.caseBeginDate > this.caseEventBeginDate ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.eventdatecannotbeearlierthancasestartdate' );
                    this.show();
                    return;
                }
                if ( this.courtEventUpdateList[i].nextEventDate != null ) {
                    if ( new Date( this.courtEventUpdateList[i].nextEventDate ) < new Date( this.courtEventUpdateList[i].eventDate ) ) {
                        this.type = 'warn';
                        this.message = this.translateService.translate( 'ocdccases.nexteventdatecannotbeearlierthanexistingdate' );
                        this.show();
                        return;
                    }
                }
                this.courtEventUpdateList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                const datePipe = new DatePipe( 'en-US' );
                const time = datePipe.transform( this.courtEventUpdateList[i].startTime, 'HH:mm' );
                const String = datePipe.transform( this.courtEventUpdateList[i].eventDate, 'yyyy/MM/dd' );
                this.eventDate = datePipe.transform( this.courtEventUpdateList[i].eventDate, 'yyyy/MM/dd' );
                this.existingEventDate = datePipe.transform( this.selectedCourtEvent.eventDate, 'yyyy/MM/dd' );
                const hearingTime = new Date( String + ' ' + time );
                this.courtEventUpdateList[i].startTime = hearingTime;
                this.courtEventUpdateList[i].eventDate = new Date( this.eventDate );

                if ( this.courtEventUpdateList[i].nextEventStartTime != null ) {
                    const nextEventTime = datePipe.transform( this.courtEventUpdateList[i].nextEventStartTime, 'HH:mm' );
                    const nextEventDateString = datePipe.transform( this.courtEventUpdateList[i].nextEventDate, 'yyyy/MM/dd' );
                    const nextEventHearingTime = new Date( nextEventDateString + ' ' + nextEventTime );
                    this.courtEventUpdateList[i].nextEventStartTime = nextEventHearingTime;
                }
                if ( this.courtEventUpdateList[i].nextEventStartTime == null && this.courtEventUpdateList[i].nextEventDate != null ) {
                    const nextEventDateString = datePipe.transform( this.courtEventUpdateList[i].nextEventDate, 'yyyy/MM/dd' );
                    const nextEventHearingTime = new Date( nextEventDateString + ' ' + '09:30' );
                    this.courtEventUpdateList[i].nextEventStartTime = nextEventHearingTime;
                }
                if ( this.courtEventUpdateList[i].nextEventDate != null ) {
                    this.nextEventDate = datePipe.transform( this.courtEventUpdateList[i].nextEventDate, 'yyyy/MM/dd' );
                    this.courtEventUpdateList[i].nextEventDate = new Date( this.nextEventDate );
                }
                if ( this.courtEventUpdateList[i].eventDate != this.existingEventDate ) {
                    const updateOrder = this.OcdccaseFactory.updateOrder( this.courtEventUpdateList[i] );
                    updateOrder.subscribe( value => {
                        if ( value === 1 ) {
                            this.type = 'success';
                            this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                            this.show();
                        } else {
                            this.type = 'error';
                            this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                            this.show();
                        }
                    } );
                }
                this.courtEventUpdateList[i].caseId = this.courtCaseId;
                this.courtEventUpdateList[i].createDateTime = DateFormat.getDate();
                this.courtEventUpdateList[i].modifyDateTime = DateFormat.getDate();
                this.courtEventUpdateList[i].createUserId = this.sessionManager.getId();
                this.courtEventUpdateList[i].modifyUserId = this.sessionManager.getId();
            }
        }
        this.offenderCourtEventCommitModel.insertList = this.courtEventInsertList;
        this.offenderCourtEventCommitModel.updateList = this.courtEventUpdateList;
        this.offenderCourtEventCommitModel.selectedCourtcase = this.selectedCourtCase;

        const courtEventSaveData = this.OcdccaseFactory.newCourtEvent( this.offenderCourtEventCommitModel );
        courtEventSaveData.subscribe( eventSaveResult => {
            if ( eventSaveResult === 1 ) {
                if ( this.courtEventInsertList.length > 0 || this.courtEventUpdateList.length > 0 ) {
                    if ( this.courtEventInsertList.length > 0 ) {
                        if ( this.courtEventInsertList[0].offenseOutcomeInsertList.length == 1 ) {
                            this.saveOffensesOutcome();
                            return;
                        } else {
                            this.type = 'success';
                            this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                            this.show();
                            this.rel_id = 0;
                            this.courtCasesInsertList = [];
                            this.courtEventInsertList = [];
                            this.courtEventUpdateList = [];
                            this.ocdcCasesExecuteQuery();
                            return;
                        }
                    } else {
                        this.type = 'success';
                        this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                        this.show();
                        this.rel_id = 0;
                        this.courtCasesInsertList = [];
                        this.courtEventInsertList = [];
                        this.courtEventUpdateList = [];
                        this.ocdcCasesExecuteQuery();
                        return;
                    }
                }
            } else if ( eventSaveResult == 2 ) {
                const Dialogdata = {
                    label: this.translateService.translate( 'ocdccase.thiscourtisinactive' ), yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog( '/oiddecasconfirmbox', Dialogdata, 60 ).subscribe( result => {
                    if ( result ) {

                    } else {
                        this.populateCourtEventData( this.courtCaseId );
                    }
                } );
            } else {
                this.type = 'error';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.populateCourtEventData( this.selectedCourtCase.caseId );
                this.populateOffenderSentenceData( this.selectedCourtCase );
                this.show();
                this.rel_id = 0;
                this.courtCasesInsertList = [];
                this.courtEventInsertList = [];
                this.offenceOutcomeInsertList = [];
                this.ocdcCasesExecuteQuery();
                return;
            }
        } );
    }

    saveOffensesOutcome() {
        for ( let i = 0; i < this.offenceOutcomeInsertList.length; i++ ) {
            if ( this.offenceOutcomeInsertList[i].offenceCode === null || this.offenceOutcomeInsertList[i].offenceCode === undefined ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.offensemustbethere' );
                this.show();
                return;
            }

            if ( this.offenceOutcomeInsertList[i].offenseType === null || this.offenceOutcomeInsertList[i].offenseType === undefined ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.courteventmustbeenter' );
                this.show();
                return;
            }

            if ( this.offenceOutcomeInsertList[i].chargeStatus == "ACTIVE" ) {
                this.offenceOutcomeInsertList[i].chargeStatus = "A";

            }
            this.offenceOutcomeInsertList[i].chargeStatus = "A"
            this.offenceOutcomeInsertList[i].resultcode1indicator = this.offenceOutcomeInsertList[i].disposition;
            this.offenceOutcomeInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
            const datePipe = new DatePipe( 'en-US' );
            this.sysDate = DateFormat.getDate();
            if ( this.offenceOutcomeInsertList[i].offenseDate != null ) {
                this.offenseDate = datePipe.transform( this.offenceOutcomeInsertList[i].offenseDate, 'yyyy/MM/dd' );
                this.offenceOutcomeInsertList[i].offenseDate = new Date( this.offenseDate );

            }
            if ( this.offenceOutcomeInsertList[i].range != null ) {
                this.range = datePipe.transform( this.offenceOutcomeInsertList[i].range, 'yyyy/MM/dd' );
                this.offenceOutcomeInsertList[i].range = new Date( this.range );
            }

            if ( this.offenceOutcomeInsertList[i].offenseDate > this.sysDate ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.offensedatecannotbegreater' );
                this.show();
                return;
            }

            if ( this.offenceOutcomeInsertList[i].range > this.sysDate ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdccases.rangedatecannotbegreater' );
                this.show();
                return;
            }

            if ( this.offenceOutcomeInsertList[i].offenseDate != null && this.offenceOutcomeInsertList[i].range != null ) {
                if ( this.offenceOutcomeInsertList[i].range < this.offenceOutcomeInsertList[i].offenseDate ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.rangecannotbepriortooffensedate' );
                    this.show();
                    return;
                }
            }
            if ( this.selectedCourtCase.caseId > 1 ) {
                this.offenceOutcomeInsertList[i].caseId = this.selectedCourtCase.caseId;
            }
            if ( this.selectedCourtEvent.eventId > 1 ) {
                this.offenceOutcomeInsertList[i].eventId = this.selectedCourtEvent.eventId;
            }
            this.offenceOutcomeInsertList[i].createDateTime = DateFormat.getDate();
            this.offenceOutcomeInsertList[i].modifyDateTime = DateFormat.getDate();
            this.offenceOutcomeInsertList[i].createUserId = this.sessionManager.getId();
            this.offenceOutcomeInsertList[i].modifyUserId = this.sessionManager.getId();
        }
        if ( this.offenceOutcomeUpdateList.length > 0 ) {
            for ( let i = 0; i < this.offenceOutcomeUpdateList.length; i++ ) {
                if ( this.offenceOutcomeUpdateList[i].offenceCode === null || this.offenceOutcomeUpdateList[i].offenceCode === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.offensemustbethere' );
                    this.show();
                    return;
                }

                if ( this.offenceOutcomeUpdateList[i].offenseType === null || this.offenceOutcomeUpdateList[i].offenseType === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdccases.offensetypemustbethere' );
                    this.show();
                    return;
                }

                const datePipe = new DatePipe( 'en-US' );
                if ( this.offenceOutcomeUpdateList[i].offenseDate != null ) {
                    this.offenseDate = datePipe.transform( this.offenceOutcomeUpdateList[i].offenseDate, 'yyyy/MM/dd' );
                    this.offenceOutcomeUpdateList[i].offenseDate = new Date( this.offenseDate );

                }
                if ( this.offenceOutcomeUpdateList[i].range != null ) {
                    this.range = datePipe.transform( this.offenceOutcomeUpdateList[i].range, 'yyyy/MM/dd' );
                    this.offenceOutcomeUpdateList[i].range = new Date( this.range );
                }

                if ( this.offenceOutcomeUpdateList[i].offenseDate != null && this.offenceOutcomeUpdateList[i].range != null ) {
                    if ( this.offenceOutcomeUpdateList[i].range < this.offenceOutcomeUpdateList[i].offenseDate ) {
                        this.type = 'warn';
                        this.message = this.translateService.translate( 'ocdccases.rangecannotbepriortooffensedate' );
                        this.show();
                        return;
                    }
                }
                this.offenceOutcomeUpdateList[i].eventId = this.selectedCourtEventId;
                this.offenceOutcomeUpdateList[i].chargeStatus = "A"
                this.offenceOutcomeUpdateList[i].resultcode1indicator = this.offenceOutcomeUpdateList[i].disposition;
                this.offenceOutcomeUpdateList[i].modifyDateTime = DateFormat.getDate();
                this.offenceOutcomeUpdateList[i].modifyUserId = this.sessionManager.getId();
            }
        }


        this.offenceOutcomeCommitBean.insertList = this.offenceOutcomeInsertList;
        this.offenceOutcomeCommitBean.updateList = this.offenceOutcomeUpdateList;
        const affetedRows = this.OcdccaseFactory.insertOffenceOutcome( this.offenceOutcomeCommitBean );
        affetedRows.subscribe( value => {
            if ( value === 1 ) {
                this.type = 'success';
                this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                this.show();
                this.rel_id = 0;
                this.courtCasesInsertList = [];
                this.courtEventInsertList = [];
                this.offenceOutcomeInsertList = [];
                this.offenceOutcomeUpdateList = [];
                this.ocdcCasesExecuteQuery();
                this.btnDisable = false;
            } else {
                this.type = 'error';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.show();
                this.rel_id = 0;
                this.courtCasesInsertList = [];
                this.courtEventInsertList = [];
                this.offenceOutcomeInsertList = [];
                this.ocdcCasesExecuteQuery();
                this.btnDisable = false;
                return;
            }
        } );
    }

    onSingleSave( event ) {
        if ( this.courtEventInsertList.length == 0 && this.courtEventUpdateList.length == 0 && this.offenceOutcomeInsertList.length == 0 && this.offenceOutcomeUpdateList.length == 0 ) {
            this.singleCaseOnly = 1;
            if ( this.courtCasesInsertList.length > 0 ) {
                this.courtCasesInsertList[0].eventInsertList = [];
            }
            this.saveOffenderCases();
            return;
        }
        if ( this.courtEventInsertList.length > 0 && this.courtCasesInsertList.length > 0 ) {
            this.courtCasesInsertList[0].eventInsertList = this.courtEventInsertList;
            this.courtEventInsertList[0].offenseOutcomeInsertList = [];
        }
        if ( this.offenceOutcomeInsertList.length > 0 && this.courtEventInsertList.length > 0 ) {
            this.courtEventInsertList[0].offenseOutcomeInsertList = this.offenceOutcomeInsertList;
        }
        this.singleCommit( event );
        return;
    }
    validateCourtCase( courtCase ) {
        this.validateDataFlag = true;
        this.sysDate = DateFormat.getDate();
        if ( courtCase.beginDate === null || courtCase.beginDate === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.startdatemustbeenter' );
            this.validateDataFlag = false;
            this.show();
            return;
        }
        if ( courtCase.agy_loc_id === null || courtCase.agy_loc_id === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.courtmustbeentered' );
            this.validateDataFlag = false;
            this.show();
            return;
        }
        if ( courtCase.caseType === null || courtCase.caseType === undefined ) {
            this.type = 'warn';
            this.validateDataFlag = false;
            this.message = this.translateService.translate( 'ocdccases.typemustbeentered' );
            this.show();
            return;
        }
        /*const datePipe = new DatePipe( 'en-US' );
        this.beginDate = DateFormat.getDate( courtCase.beginDate );
        courtCase.beginDate = DateFormat.getDate( courtCase.beginDate );
        if ( DateFormat.compareDate( courtCase.beginDate, this.sysDate ) === 1 ) {
            this.type = 'warn';
            this.validateDataFlag = false;
            this.message = this.translateService.translate( 'ocdccases.startdatecannotbepostdated' );
            return;
        }
        this.booking = DateFormat.getDate( this.vHeaderBlockModel.bookingBeginDate );
        if ( DateFormat.compareDate( this.booking, this.beginDate ) === 1 ) {
            this.type = 'warn';
            this.validateDataFlag = false;
            this.message = this.translateService.translate( 'ocdccases.startdatecannotbeearlierthanbooking' );
            return;
        }*/
    }
    validateCourtEvent( courtEvent ) {
        this.sysDate = DateFormat.getDate();
        this.validateDataFlag = true;
        if ( courtEvent.eventDate === null || courtEvent.eventDate === undefined ) {
            this.type = 'warn';
            this.validateDataFlag = false;
            this.message = this.translateService.translate( 'ocdccases.datemustbeentered' );
            return;
        }
        if ( courtEvent.agyLocId === null || courtEvent.agyLocId === undefined ) {
            this.type = 'warn';
            this.validateDataFlag = false;
            this.message = this.translateService.translate( 'ocdccases.courtmustbeentered' );
            return;
        }
        if ( courtEvent.startTime === null || courtEvent.startTime === undefined ) {
            this.type = 'warn';
            this.validateDataFlag = false;
            this.message = this.translateService.translate( 'ocdccases.timemustbeentered' );
            return;
        }
        if ( courtEvent.hearingType === null || courtEvent.hearingType === undefined ) {
            this.type = 'warn';
            this.validateDataFlag = false;
            this.message = this.translateService.translate( 'ocdccases.hearingtypemustbeentered' );
            return;
        }
        if ( ( courtEvent.nextEventDate === undefined || courtEvent.nextEventDate === null ) && courtEvent.nextEventStartTime != null ) {
            this.type = 'warn';
            this.validateDataFlag = false;
            this.message = this.translateService.translate( 'ocdccases.nexteventdatemustbeenteredwithtime' );
            return;
        }

        this.caseBeginDate = DateFormat.getDate( this.selectedCourtCase.beginDate );
        this.caseEventBeginDate = DateFormat.getDate( courtEvent.eventDate );
        if ( DateFormat.compareDate( this.caseBeginDate, this.caseEventBeginDate ) === 1 ) {
            this.type = 'warn';
            this.validateDataFlag = false;
            this.message = this.translateService.translate( 'ocdccases.eventdatecannotbeearlierthancasestartdate' );
            return;
        }
        courtEvent.startTime = TimeFormat.parse(TimeFormat.format(courtEvent.startTime),courtEvent.eventDate);
        if ( courtEvent.nextEventDate != null ) {
            courtEvent.nextEventDate = DateFormat.getDate( courtEvent.nextEventDate );
            courtEvent.eventDate = DateFormat.getDate( courtEvent.eventDate );
            if ( DateFormat.compareDate( courtEvent.nextEventDate, courtEvent.eventDate ) === -1 ) {
                this.type = 'warn';
                this.validateDataFlag = false;
                this.message = this.translateService.translate( 'ocdccases.nexteventdatecannotbeearlierthanexistingdate' );
                return;
            }
        }
    }

    validateOffense( offenceOutcome ) {
        this.validateDataFlag = true;
        if ( offenceOutcome.offenceCode === null || offenceOutcome.offenceCode === undefined ) {
            this.type = 'warn';
            this.validateDataFlag = false;
            this.message = this.translateService.translate( 'ocdccases.offensemustbethere' );
            return;
        }

        if ( offenceOutcome.offenseType === null || offenceOutcome.offenseType === undefined ) {
            this.type = 'warn';
            this.validateDataFlag = false;
            this.message = this.translateService.translate( 'ocdccases.offensetypemustbethere' );
            return;
        }
        if ( offenceOutcome.chargeStatus == null || offenceOutcome.chargeStatus == undefined || offenceOutcome.chargeStatus.toUpperCase() == "ACTIVE" ) {
            offenceOutcome.chargeStatus = "A";

        }
        const datePipe = new DatePipe( 'en-US' );
        this.sysDate = DateFormat.getDate();
        if ( offenceOutcome.offenseDate != null ) {
            offenceOutcome.offenseDate = DateFormat.getDate( offenceOutcome.offenseDate );
            if ( DateFormat.compareDate( offenceOutcome.offenseDate, this.sysDate ) === 1 ) {
                this.type = 'warn';
                this.validateDataFlag = false;
                this.message = this.translateService.translate( 'ocdccases.offensedatecannotbegreater' );
                return;
            }
        }
        if ( offenceOutcome.range != null ) {
            offenceOutcome.range = DateFormat.getDate( offenceOutcome.range );
            if ( DateFormat.compareDate( offenceOutcome.range, this.sysDate ) === 1 ) {
                this.type = 'warn';
                this.validateDataFlag = false;
                this.message = this.translateService.translate( 'ocdccases.rangedatecannotbegreater' );
                return;
            }
        }

        if ( offenceOutcome.offenseDate != null && offenceOutcome.range != null ) {
            if ( DateFormat.compareDate( offenceOutcome.range, offenceOutcome.offenseDate ) === -1 ) {
                this.type = 'warn';
                this.validateDataFlag = false;
                this.message = this.translateService.translate( 'ocdccases.rangecannotbepriortooffensedate' );
                return;
            }
        }

    }

    validateSentence( sentenceRecord ) {
        this.validateDataFlag = true;
        if ( sentenceRecord.category === null || sentenceRecord.category === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.categorymustbeenter' );
            this.validateDataFlag = false;
            return;
        }
        if ( sentenceRecord.sentenceCalcType === null || sentenceRecord.sentenceCalcType === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.sentencemustbeenter' );
            this.validateDataFlag = false;
            return;
        }
        if ( sentenceRecord.orderId == null || sentenceRecord.orderId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.sentencedatemustbeenter' );
            this.validateDataFlag = false;
            return;
        }

        if ( sentenceRecord.startDate == null || sentenceRecord.startDate === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.startdatemustbeenter' );
            this.validateDataFlag = false;
            return;
        }

        if ( sentenceRecord.startDate === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.startdatemudtbeentered' );
            this.validateDataFlag = false;
            return;

        }

        /*const datePipe = new DatePipe( 'en-US' );
        this.sentenceStartDate = datePipe.transform( sentenceRecord.startDate, 'yyyy/MM/dd' );
        sentenceRecord.startDate = new Date( this.sentenceStartDate );
        this.sysDate = DateFormat.getDate();

        if ( sentenceRecord.startDate > this.sysDate ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.startdatecannotbegreaterthancurrentdate' );
            this.validateDataFlag = false;
            return;
        }*/

        if ( sentenceRecord.fineAmount < 0 != null && sentenceRecord.fineAmount < 0 ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.fineamountnotlesszero' );
            this.validateDataFlag = false;
            return;
        }
    }

    validateSentenceTerm( term ) {
        this.validateDataFlag = true;
        if ( term.sentenceTermCode === null || term.sentenceTermCode === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.termmustbeenter' );
            this.validateDataFlag = false;
            return;
        }

        if ( term.startDate === null || term.startDate === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.startdatemustbeenter' );
            this.validateDataFlag = false;
            return;
        }
        if ( !term.years && !term.months && !term.weeks && !term.days && !term.hours ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdccases.eitheryearsmonthsdaysneedstobeentered' );
            this.validateDataFlag = false;
            return;
        }
    }

    validateBailDetails( bailDetails ) {
        this.validateDataFlag = true;
        if ( this.selectedCourtCase.linkCaseSeq > 0 ) {
            this.type = 'error';
            this.message = this.translateService.translate( 'common.addupdateremoverecordsnotallowed' );
            this.validateDataFlag = false;
            return;
        }
        if ( bailDetails.bailStatus == null || bailDetails.bailStatus === undefined ) {
            this.type = 'error';
            this.message = this.translateService.translate( 'ocdccases.bailstatusmustbeenter' );
            this.validateDataFlag = false;
            return;
        }

        if ( isNaN( bailDetails.cash ) ) {
            this.type = 'error';
            this.message = this.translateService.translate( 'ocdccase.cashvalueinno' );
            this.validateDataFlag = false;
            return;
        }
        if ( isNaN( bailDetails.surety ) ) {
            this.type = 'error';
            this.message = this.translateService.translate( 'ocdccase.valueinsurety' );
            this.validateDataFlag = false;
            return;
        }
        if ( isNaN( bailDetails.property ) ) {
            this.type = 'error';
            this.message = this.message = this.translateService.translate( 'ocdccase.valueinproperty' );
            this.validateDataFlag = false;
            return;
        }
    }
    validateBailBond( bailBond ) {
        if (!bailBond.preferedDateTime  && !bailBond.preferedBy  && !bailBond.method 
                && !bailBond.receiptText && !bailBond.commentText ) {
            return;
        }
        if ( this.selectedCourtCase.linkCaseSeq > 0 ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.addupdateremoverecordsnotallowed' );
            this.populateBailDetails( this.vHeaderBlockModel.offenderBookId );
            this.validateDataFlag = false;
            return;
        } else if (bailBond.preferedDateTime == null) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'Please enter prefered date and time' );
            this.validateDataFlag = false;
            return;
        } else if (bailBond.preferedBy == null) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'Please enter paid by' );
            this.validateDataFlag = false;
            return;
        } else if (bailBond.method == null) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'Please enter method' );
            this.validateDataFlag = false;
            return;
        } else {
            const datePipe = new DatePipe( 'en-US' );
            this.bailBondDetails.chargeId
            const bailTime = datePipe.transform( bailBond.time, 'HH:mm' );
            const prefetchedDateTime = datePipe.transform( bailBond.preferedDateTime, 'yyyy/MM/dd' );
            const preferedDateTime = new Date( prefetchedDateTime + ' ' + bailTime );
            this.bailBondDetails.preferedDateTime = preferedDateTime;

        }
    }
    verifyDataModified() {
        for ( let i = 0; i < this.courtCasesData.length; i++ ) {
            if(this.courtCasesData[i].commitFlag != null && this.courtCasesData[i].commitFlag != undefined && 
                 (this.courtCasesData[i].commitFlag == "i" || this.courtCasesData[i].commitFlag == "u")   ) {
                return true;
            }  else if (this.courtCasesData[i].courtEventList != null ) {
                for ( let j = 0; j < this.courtCasesData[i].courtEventList.length; j++ ) {
                    if(this.courtCasesData[i].courtEventList[j].commitFlag != null && this.courtCasesData[i].courtEventList[j].commitFlag != undefined && 
                        (this.courtCasesData[i].courtEventList[j].commitFlag == "i" || this.courtCasesData[i].courtEventList[j].commitFlag == "u")   ) {
                        return true;
                    } else if (this.courtCasesData[i].courtEventList[j].offenseOutcomeList != null ) {
                        for ( let k = 0; k < this.courtCasesData[i].courtEventList[j].offenseOutcomeList.length; k++ ) {
                            if(this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k].commitFlag != null && this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k].commitFlag != undefined && 
                                (this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k].commitFlag == "i" || this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k].commitFlag == "u")   ) {
                                return true;
                            }
                        }
                }
            }
            
            }
            if ( this.courtCasesData[i].sentencesList != null ) {
                for ( let m = 0; m < this.courtCasesData[i].sentencesList.length; m++ ) {
                    if ( this.courtCasesData[i].sentencesList[m].commitFlag != null && this.courtCasesData[i].sentencesList[m].commitFlag != undefined &&
                            (this.courtCasesData[i].sentencesList[m].commitFlag == "i" || this.courtCasesData[i].sentencesList[m].commitFlag == "u")) {
                        return true;
                    }   
                    if (this.courtCasesData[i].sentencesList[m].sentenceTermList != null ) {
                        for ( let k = 0; k < this.courtCasesData[i].sentencesList[m].sentenceTermList.length; k++ ) {
                            if(this.courtCasesData[i].sentencesList[m].sentenceTermList[k].commitFlag != null && this.courtCasesData[i].sentencesList[m].sentenceTermList[k].commitFlag != undefined && 
                                (this.courtCasesData[i].sentencesList[m].sentenceTermList[k].commitFlag == "i" || this.courtCasesData[i].sentencesList[m].sentenceTermList[k].commitFlag == "u")   ) {
                                return true;
                            }
                        }
                    } 
                    if (this.courtCasesData[i].sentencesList[m].offensesOnSentenceList != null ) {
                        for ( let p = 0; p < this.courtCasesData[i].sentencesList[m].offensesOnSentenceList.length; p++ ) {
                            if(this.courtCasesData[i].sentencesList[m].offensesOnSentenceList[p].commitFlag != null && this.courtCasesData[i].sentencesList[m].offensesOnSentenceList[p].commitFlag != undefined && 
                                (this.courtCasesData[i].sentencesList[m].offensesOnSentenceList[p].commitFlag == "i" || this.courtCasesData[i].sentencesList[m].offensesOnSentenceList[p].commitFlag == "u")   ) {
                                return true;
                            }
                        }
                    } 
                }
            }
            if(this.courtCasesData[i].bailDetailsList != null) {
                for ( let bd = 0; bd < this.courtCasesData[i].bailDetailsList.length; bd++ ) {
                    if ( this.courtCasesData[i].bailDetailsList[bd].commitFlag != null && this.courtCasesData[i].bailDetailsList[bd].commitFlag != undefined &&
                            (this.courtCasesData[i].bailDetailsList[bd].commitFlag == "i" || this.courtCasesData[i].bailDetailsList[bd].commitFlag == "u")) {
                        return true;
                    }
                }
                
            }
        }
        return false;
    }
    
    checkCalculateReason () {
        let openPopup = false;
        for ( let i = 0; i < this.courtCasesData.length; i++ ) {
            if ( this.courtCasesData[i].sentencesList != null ) {
                for ( let m = 0; m < this.courtCasesData[i].sentencesList.length; m++ ) {
                    //New Sentence added or 
                    if(this.courtCasesData[i].sentencesList[m].openCalcReasonPopUp) {
                        openPopup = true;
                    }
                       
                    if (this.courtCasesData[i].sentencesList[m].sentenceTermList != null ) {
                        for ( let k = 0; k < this.courtCasesData[i].sentencesList[m].sentenceTermList.length; k++ ) {
                            if(this.courtCasesData[i].sentencesList[m].sentenceTermList[k].commitFlag != null && this.courtCasesData[i].sentencesList[m].sentenceTermList[k].commitFlag != undefined && 
                                (this.courtCasesData[i].sentencesList[m].sentenceTermList[k].commitFlag == "i" || this.courtCasesData[i].sentencesList[m].sentenceTermList[k].commitFlag == "u")   ) {
                                let sentenceTermList = this.courtCasesData[i].sentencesList[m].sentenceTermList[k];
                                if ( sentenceTermList.years || sentenceTermList.months || sentenceTermList.weeks || sentenceTermList.days || sentenceTermList.hours ) {
                                    openPopup = true;
                                    this.courtCasesData[i].sentencesList[m].openCalcReasonPopUp=true;
                                }
                            }
                        } 
                    }
                }
            }
        }
        
        if(openPopup) {
            this.dialogService.openLinkDialog( '/OCUCALCR', this.vHeaderBlockModel, 80).subscribe( result => {
                if ( result ) {
                    this.dialogOpenFlag = true;
                    this.sentenceCalc.sentDate = DateFormat.getDate();
                    this.sentenceCalc.sentTime = DateFormat.getDate();
                    this.sentenceCalc.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                    this.sentenceCalc.staffName = result.staffName;
                    this.sentenceCalc.calcCode = result.calculationReason;
                    this.sentenceCalc.comment = result.commentText;
                    
                    for ( let i = 0; i < this.courtCasesData.length; i++ ) {
                        if ( this.courtCasesData[i].sentencesList != null ) {
                            for ( let m = 0; m < this.courtCasesData[i].sentencesList.length; m++ ) {
                                
                                if(this.courtCasesData[i].sentencesList[m].openCalcReasonPopUp) {
                                    if(this.courtCasesData[i].sentencesList[m].commitFlag == null || this.courtCasesData[i].sentencesList[m].commitFlag == undefined ) {
                                        this.courtCasesData[i].sentencesList[m].commitFlag = "u";
                                    }
                                    this.courtCasesData[i].sentencesList[m].sentenceCalculation = this.sentenceCalc;
                                }
                                /*   
                                if (this.courtCasesData[i].sentencesList[m].sentenceTermList != null ) {
                                    for ( let k = 0; k < this.courtCasesData[i].sentencesList[m].sentenceTermList.length; k++ ) {
                                        
                                        //It is added to trigger calculation
                                        if (k==0 && this.courtCasesData[i].sentencesList[m].openCalcReasonPopUp) {
                                            if(this.courtCasesData[i].sentencesList[m].sentenceTermList[k].commitFlag == null || this.courtCasesData[i].sentencesList[m].sentenceTermList[k].commitFlag == undefined ) {
                                                this.courtCasesData[i].sentencesList[m].sentenceTermList[k].commitFlag = "u";
                                            }
                                            this.courtCasesData[i].sentencesList[m].sentenceTermList[k].sentenceCalculation = this.sentenceCalc;
                                        }
                                        
                                        if(this.courtCasesData[i].sentencesList[m].sentenceTermList[k].commitFlag != null && this.courtCasesData[i].sentencesList[m].sentenceTermList[k].commitFlag != undefined && 
                                            (this.courtCasesData[i].sentencesList[m].sentenceTermList[k].commitFlag == "i" || this.courtCasesData[i].sentencesList[m].sentenceTermList[k].commitFlag == "u")   ) {
                                            let sentenceTermList = this.courtCasesData[i].sentencesList[m].sentenceTermList[k];
                                            if ( sentenceTermList.years || sentenceTermList.months || sentenceTermList.weeks || sentenceTermList.days || sentenceTermList.hours ) {
                                                sentenceTermList.sentenceCalculation = this.sentenceCalc;
                                            }
                                        } 
                                    } 
                                    
                                }*/
                            }
                            
                        }
                    }
                    this.saveAllLegalDetails();
                }
            } );
        } else {
            this.saveAllLegalDetails();
        }
    }
    
    onSave( event ) {
        if(!this.verifyDataModified()) {
            this.type = 'warn';
            this.message = "No data has been modified";
            this.show();
            
            return; 
        }
        for ( let i = 0; i < this.courtCasesData.length; i++ ) {
            this.validateCourtCase( this.courtCasesData[i] );
            if ( this.courtCasesData[i].commitFlag != null || this.courtCasesData[i].commitFlag != undefined ) {
                if ( this.courtCasesData[i].commitFlag == "i" ) {
                    if ( !this.validateDataFlag ) {
                        this.rowIndex = i + 1;
                        const datePipe = new DatePipe( 'en-US' );
                        if ( this.courtCasesData[i].beginDate != null ) {
                            this.message = this.message + " " + this.translateService.translate( 'ocdccase.foracasewith' ) + " " + datePipe.transform( this.courtCasesData[i].beginDate, 'dd/MM/yyyy' );

                        } else {
                            this.message = this.translateService.translate( 'ocdccase.caseline' ) + " " + this.rowIndex + " : " + this.message;
                        }
                        this.show();
                        return;

                    }
                } else {
                    //this.validateCourtCase( this.courtCasesData[i] );
                    if ( !this.validateDataFlag ) {
                        this.rowIndex = i + 1;
                        const datePipe = new DatePipe( 'en-US' );
                        if ( this.courtCasesData[i].beginDate != null ) {
                            this.message = this.message + " " + this.translateService.translate( 'ocdccase.foracasewith' ) + " " + datePipe.transform( this.courtCasesData[i].beginDate, 'dd/MM/yyyy' );

                        } else {
                            this.message = this.translateService.translate( 'ocdccase.caseline' ) + " " + this.rowIndex + " : " + this.message;
                        }
                        this.show();
                        return;
                    }
                }
            }
            if ( this.courtCasesData[i].courtEventList != null ) {
                for ( let j = 0; j < this.courtCasesData[i].courtEventList.length; j++ ) {
                    if ( this.courtCasesData[i].courtEventList[j].commitFlag != null || this.courtCasesData[i].courtEventList[j].commitFlag != undefined ) {
                        if ( this.courtCasesData[i].courtEventList[j].commitFlag == "i" ) {
                            this.validateCourtEvent( this.courtCasesData[i].courtEventList[j] );
                            if ( !this.validateDataFlag ) {
                                this.rowIndex = i + 1;
                                this.courtEventRowIndex = j + 1;
                                const datePipe = new DatePipe( 'en-US' );
                                if ( this.courtCasesData[i].courtEventList[j].eventDate != null ) {
                                    this.message = this.message + " " + this.translateService.translate( 'ocdccase.foreventdate' ) + " " + datePipe.transform( this.courtCasesData[i].courtEventList[j].eventDate, 'dd/MM/yyyy' );

                                } else {
                                    this.message = this.translateService.translate( 'ocdccase.caseline' ) + " " + this.rowIndex + " , " + " " + this.translateService.translate( 'ocdccase.eventline' ) + " " + this.courtEventRowIndex + " : " + this.message;
                                }
                                this.show();
                                return;
                            }
                        } else {
                            this.validateCourtEvent( this.courtCasesData[i].courtEventList[j] );
                            if ( !this.validateDataFlag ) {
                                this.rowIndex = i + 1;
                                this.courtEventRowIndex = j + 1;
                                const datePipe = new DatePipe( 'en-US' );
                                if ( this.courtCasesData[i].courtEventList[j].eventDate != null ) {
                                    this.message = this.message + " " + this.translateService.translate( 'ocdccase.foreventdate' ) + " " + datePipe.transform( this.courtCasesData[i].courtEventList[j].eventDate, 'dd/MM/yyyy' );
                                } else {
                                    this.message = this.translateService.translate( 'ocdccase.caseline' ) + " " + this.rowIndex + " , " + " " + this.translateService.translate( 'ocdccase.eventline' ) + " " + this.courtEventRowIndex + " : " + this.message;
                                }
                                this.show();
                                return;
                            }
                        }
                    }
                    if ( this.courtCasesData[i].courtEventList[j].offenseOutcomeList != null ) {
                        for ( let k = 0; k < this.courtCasesData[i].courtEventList[j].offenseOutcomeList.length; k++ ) {
                            if ( this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k].commitFlag != null || this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k].commitFlag != undefined ) {
                                if ( this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k].commitFlag == "i" && this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k].apply) {
                                    this.validateOffense( this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k] );
                                    if ( !this.validateDataFlag ) {
                                        this.rowIndex = i + 1;
                                        this.courtEventRowIndex = j + 1;
                                        this.offenseRowIndex = k + 1;
                                        const datePipe = new DatePipe( 'en-US' );
                                        this.message = this.message + " " + this.translateService.translate( 'ocdccase.forcourteventdate' ) + " " + datePipe.transform( this.courtCasesData[i].courtEventList[j].eventDate, 'dd/MM/yyyy' ) + " at Line " + this.offenseRowIndex;
                                        this.show();
                                        return;
                                    }
                                } else {
                                    this.validateOffense( this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k] );
                                    if ( !this.validateDataFlag ) {
                                        this.rowIndex = i + 1;
                                        this.courtEventRowIndex = j + 1;
                                        this.offenseRowIndex = k + 1;
                                        const datePipe = new DatePipe( 'en-US' );
                                        this.message = this.message + " " + this.translateService.translate( 'ocdccase.forcourteventdate' ) + " " + datePipe.transform( this.courtCasesData[i].courtEventList[j].eventDate, 'dd/MM/yyyy' ) + " at Line " + this.offenseRowIndex;
                                        this.show();
                                        return;
                                    }
                                }
                            }
                        }
                        // Remove offences which apply check box is not checked
                        if ( this.courtCasesData[i].courtEventList[j].offenseOutcomeList != null ) {
                            let tempOffenseOutcomeList = [];
                            for ( let k = 0; k < this.courtCasesData[i].courtEventList[j].offenseOutcomeList.length; k++ ) {
                                if ( !this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k].apply) {
                                    //tempOffenseOutcomeList.push(this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k]);
                                    if (this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k].commitFlag != "i" ) {
                                        this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k].commitFlag = "d" ;
                                        tempOffenseOutcomeList.push(this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k]);
                                    }
                                } else {
                                    tempOffenseOutcomeList.push(this.courtCasesData[i].courtEventList[j].offenseOutcomeList[k]);
                                }
                            }
                            this.courtCasesData[i].courtEventList[j].offenseOutcomeList = tempOffenseOutcomeList;
                        }
                        
                    }
                    if ( this.courtCasesData[i].sentencesList != null ) {
                        for ( let m = 0; m < this.courtCasesData[i].sentencesList.length; m++ ) {
                            if ( this.courtCasesData[i].sentencesList[m].commitFlag != null || this.courtCasesData[i].sentencesList[m].commitFlag != undefined ) {
                                if ( this.courtCasesData[i].sentencesList[m].commitFlag == "i" ) {
                                    this.validateSentence( this.courtCasesData[i].sentencesList[m] );
                                    if ( !this.validateDataFlag ) {
                                        this.rowIndex = i + 1;
                                        this.sentenceRowIndex = m + 1;
                                        const datePipe = new DatePipe( 'en-US' );
                                        if ( this.courtCasesData[i].sentencesList[m].startDate != null ) {
                                            this.message = this.message + " " + this.translateService.translate( 'ocdccase.forasentencedate' ) + " " + datePipe.transform( this.courtCasesData[i].sentencesList[m].startDate, 'dd/MM/yyyy' ) + " at Line " + this.sentenceRowIndex;
                                        } else {
                                            this.message = this.message + " " + this.translateService.translate( 'ocdccase.forasentencedate' ) + " " + this.sentenceRowIndex;
                                        }
                                        this.show();
                                        return;
                                    }
                                } else {
                                    this.validateSentence( this.courtCasesData[i].sentencesList[m] );
                                    if ( !this.validateDataFlag ) {
                                        this.rowIndex = i + 1;
                                        this.sentenceRowIndex = m + 1;
                                        const datePipe = new DatePipe( 'en-US' );
                                        if ( this.courtCasesData[i].sentencesList[m].startDate != null ) {
                                            this.message = this.message + " " + this.translateService.translate( 'ocdccase.forasentencedate' ) + " " + datePipe.transform( this.courtCasesData[i].sentencesList[m].startDate, 'dd/MM/yyyy' ) + " at Line " + this.sentenceRowIndex;
                                        } else {
                                            this.message = this.message + " " + this.translateService.translate( 'ocdccase.forasentencedate' ) + " " + this.sentenceRowIndex;
                                        }
                                        this.show();
                                        return;
                                    }
                                }
                            }
                            
                            if (this.courtCasesData[i].sentencesList[m].offensesOnSentenceList != null ) {
                                for ( let p = 0; p < this.courtCasesData[i].sentencesList[m].offensesOnSentenceList.length; p++ ) {
                                    if(this.courtCasesData[i].sentencesList[m].offensesOnSentenceList[p].offenseDescription == null || this.courtCasesData[i].sentencesList[m].offensesOnSentenceList[p].offenseDescription == undefined ) {
                                        this.message = "Offense can not be blank on Sentence Tab";
                                        this.type = "warn";
                                        this.show();
                                        
                                        return ;
                                    }
                                }
                            }
                            
                            
                            
                            if ( this.courtCasesData[i].sentencesList[m].sentenceTermList != null && this.courtCasesData[i].sentencesList[m].sentenceTermList.length > 0 ) {
                                for ( let n = 0; n < this.courtCasesData[i].sentencesList[m].sentenceTermList.length; n++ ) {
                                    this.validateSentenceTerm( this.courtCasesData[i].sentencesList[m].sentenceTermList[n] );
                                    if ( !this.validateDataFlag ) {
                                        this.rowIndex = i + 1;
                                        this.termRowIndex = n + 1;
                                        const datePipe = new DatePipe( 'en-US' );
                                        if ( this.courtCasesData[i].sentencesList[m].sentenceTermList[n].startDate != null ) {
                                            this.message = this.message + " " + this.translateService.translate( 'ocdccase.fortermsdate' ) + " " + datePipe.transform( this.courtCasesData[i].sentencesList[m].sentenceTermList[n].startDate, 'dd/MM/yyyy' ) + " at Line " + this.termRowIndex;
                                        } else {
                                            this.message = this.message + " " + this.translateService.translate( 'ocdccase.termsline' ) + " " + this.termRowIndex;
                                        }
                                        this.show();
                                        return;
                                    }
                                }
                            }
                        }
                        
                    }
                    
                    if ( this.courtCasesData[i].bailDetailsList != null ) {
                        for ( let o = 0; o < this.courtCasesData[i].bailDetailsList.length; o++ ) {
                            this.courtCasesData[i].bailDetailsList[o].cashFlag = this.courtCasesData[i].bailDetailsList[o].cashFlagCheck ? 'Y' : 'N';
                            
                            if ( this.courtCasesData[i].bailDetailsList[o].commitFlag != null && this.courtCasesData[i].bailDetailsList[o].commitFlag != undefined ) {
                                if ( this.courtCasesData[i].bailDetailsList[o].commitFlag == "u" ) {
                                    this.validateBailDetails( this.courtCasesData[i].bailDetailsList[o] );
                                    if ( !this.validateDataFlag ) {
                                        this.bailRowIndex = o + 1;
                                        const datePipe = new DatePipe( 'en-US' );
                                        if ( this.courtCasesData[i].bailDetailsList[o].BailDate != null ) {
                                            this.message = this.message + " " + this.translateService.translate( 'ocdccase.forbaildate' ) + " " + datePipe.transform( this.courtCasesData[i].bailDetailsList[o].BailDate, 'dd/MM/yyyy' ) + " at Line " + this.bailRowIndex;
                                        } else {
                                            this.message = this.message + " " + this.translateService.translate( 'ocdccase.forbaillines' ) + " " + this.bailRowIndex;
                                        }
                                        this.show();
                                        return;
                                    }
                                }
                            }
                            if ( this.courtCasesData[i].bailDetailsList[o] != null ) {
                                this.validateBailBond( this.courtCasesData[i].bailDetailsList[o] );
                                if(!this.validateDataFlag) {
                                    this.bailRowIndex = o + 1;
                                    const datePipe = new DatePipe( 'en-US' );
                                    if ( this.courtCasesData[i].bailDetailsList[o].BailDate != null ) {
                                        this.message = this.message + " " + this.translateService.translate( 'ocdccase.forbaildate' ) + " " + datePipe.transform( this.courtCasesData[i].bailDetailsList[o].BailDate, 'dd/MM/yyyy' ) + " at Line " + this.bailRowIndex;
                                    } else {
                                        this.message = this.message + " " + this.translateService.translate( 'ocdccase.forbaillines' ) + " " + this.bailRowIndex;
                                    }
                                    this.show();
                                    return;
                                }
                                if ( this.courtCasesData[i].bailDetailsList[o].preferedDateTime != null && this.courtCasesData[i].bailDetailsList[o].time != null ) {
                                    const datePipe = new DatePipe( 'en-US' );
                                    const bailTime = datePipe.transform( this.courtCasesData[i].bailDetailsList[o].time, 'HH:mm' );
                                    const prefetchedDateTime = datePipe.transform( this.courtCasesData[i].bailDetailsList[o].preferedDateTime, 'yyyy/MM/dd' );
                                    const preferedDateTime = new Date( prefetchedDateTime + ' ' + bailTime );
                                    //this.courtCasesData[i].bailDetailsList[o].preferedDateTime = preferedDateTime;
                                }
                                this.courtCasesData[i].bailDetailsList[o].createUserId = this.sessionManager.getId();
                                
                            }
                        }
                    }
                }
            }
        }
        if ( this.validateDataFlag ) {
            this.checkCalculateReason();
        }
    }
    
    saveAllLegalDetails() {
        const affetedRows = this.OcdccaseFactory.commitCases( this.courtCasesData );
        affetedRows.subscribe( value => {
            if ( value == 1 ) {
                this.type = 'success';
                this.validateDataFlag = true;
                this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );

                if ( this.selectedTab == "Process1" ) {
                    
                    
                    if(this.alertToSave) {
                        this.selectedCourtCase.sentencesList = [];
                        this.populateOffenderSentenceData( this.selectedCourtCase );
                    } else {
                        this.ocdcCasesExecuteQuery();
                    }
                } else if ( this.selectedTab == "Process2" ) {
                    if ( this.selectedCourtCase.caseId == null || this.selectedCourtCase.caseId === undefined ) {
                        this.ocdcCasesExecuteQuery();
                    }
                    this.selectedCourtCase.sentencesList = [];
                    this.populateOffenderSentenceData( this.selectedCourtCase );
                } else if ( this.selectedTab == "Process3" ) {
                    this.populateBailDetails( this.vHeaderBlockModel.offenderBookId );
                }
                this.alertToSave = false;
                this.show();
                return;
            } else {
                this.type = 'error';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.show();
            }
        } );
    }

    onExitBtnClick = () => {
        this.oidcnoteFactory.tempFlag = true;
        this.location.back();
    }

    onbackBtnClick = () => {
        if (this.OcdccaseFactory.exitFlag) {
            this.backBtn = false;
            this.OcdccaseFactory.exitFlag = false;
            this.router.navigate(['/OCDENFOR']);
        }
    }
  canCategoryEdit = (data: any, index: number, field: string): boolean => {
        if (!data.line) {
            return true;
        } else {
            return false;
        }
    }
}
