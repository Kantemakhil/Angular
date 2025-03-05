import {
    Component,
    OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';

import { UserSessionManager } from '@core/classes/userSessionManager';
import { CourtCase } from "../beans/CourtCase";
import { CourtEvents } from "../beans/CourtEvents";
import { OcdccaseService } from "../service/ocdccase.service";
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OffenderSentences } from "../beans/OffenderSentences";
import { OffensesOutcome } from "../beans/OffensesOutcome";
import { SentenceTerms } from "../beans/SentenceTerms";
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OffenderBailDetails } from "../beans/OffenderBailDetails";
import { OffenderDetailsOffenses } from "../beans/OffenderDetailsOffenses";
import { BailDetailsCommitBean } from "../beans/BailDetailsCommitBean";
import { OffenseOnSentence } from "../beans/OffenseOnSentece";
import { ActivatedRoute } from '@angular/router';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Images } from "@commonbeans/Images";
import { OcusofncService } from "../service/ocusofnc.service";
import { OiddecasService } from "../service/oiddecas.service";
import { Condition } from "../beans/Condition";




@Component( {
    selector: 'app-oiddecas',
    templateUrl: './oiddecas.component.html',
    styleUrls: ['./oiddecas.component.scss']
} )
export class OiddecasComponent implements OnInit {
    message = ' Invalid.';
    type = 'error';
    disabled: boolean;
    msglist = [];
    msgs: any[] = [];
    caseId: any;
    bookId: number;
    chargeId: number;
    sentenceSeq:number;
    cashFlag: any;
    selectedBailRow:OffenderBailDetails = new OffenderBailDetails();
    offenseDescription: string;
    sentenceDateUrl:string;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    courtColumndef: any[];
    courtEventColumndef: any[];
    offoutColumndef: any[];
    sentenceColumndef:any[];
    offencesSentenceTabColumndef:any[];
    termsColumndef:any[];
    courtCasesData : CourtCase[] = [];
    selectedCourtCase:CourtCase = new CourtCase();
    selectedCourtCasesData : CourtCase = new CourtCase();
    courtData:CourtCase[] = [];
    courtCaseModel : CourtCase = new CourtCase();
    courtEventData : CourtEvents[] = [];
    courtEventDataExisted:CourtEvents[] = [];
    sentencesData : OffenderSentences[]=[];
    offencesOutcomedata : OffensesOutcome[]=[];
    offensesDialogdata:OffensesOutcome[]=[];
    offenseOnSentencedata : OffenseOnSentence = new OffenseOnSentence();
    selectedSentenceRecord:OffenderSentences = new OffenderSentences();
    termsData : SentenceTerms[]=[];
    offenderOffenses: OffenderDetailsOffenses[] = [];
    bailDetailsCommitBean: BailDetailsCommitBean;// = new BailDetailsCommitBean();
    seqNo: number;
    casePrefixInfo:string;
    casePreFix:string;
    caseTypecode:string;
    agyLocationCode:any;
    courtCaseCourt:string;
    caseStartDate:any;
    eventDate:any;
    nextEventDate:any;
    next_Event_Date:any;
    offensesData:OffensesOutcome[]=[];
    offensesOnSentenceInsertList:OffensesOutcome[]=[];
    courtCaseId:number;   
    public selected = -1;
    public selectedOutcome=-1;
    public selectedSentence=-1;
    termCodeLovUrl:string;
    termDataFlag:boolean;
    sentenceDataFlag:boolean;
    imageModel: Images = new Images();
    offenseDialogData:OffensesOutcome []=[];
    courtCasesDeleteList : CourtCase[] =[];
    courtEventsDeleteList : CourtEvents[]=[];
    offensesDeleteList : OffensesOutcome [] = [];
    dataExistedFlag:boolean;
    isLinkedCase:boolean;
    isSentence:boolean;
    offenseDeletedFlag:boolean;
    firstCourtEvent:CourtEvents = new CourtEvents;
    conditionGridData : Condition[]=[];
    conditionColumndef:any[];
    conditionDataExist:boolean=false;
    valid_delete:string;
    deleteSentenceChargesList:OffensesOutcome[]=[];
    deleteSuccess:number;
    deletedSentenceList:OffenderSentences[]=[];
    deletedConditionList:Condition[]=[];
    public selectedOffence = -1;
    constructor(private OcdccaseFactory : OcdccaseService,
            private offenderSearchService: OffenderSearchService,
            public translateService: TranslateService,
            private sessionManager: UserSessionManager,
            private activatedRoute: ActivatedRoute,
            private osiosearchService: OsiosearService,
            private dialogService :DialogService,
            private OcusofncFactory:OcusofncService,
            private OiddecasFactory:OiddecasService
          ) {
            this.courtCasesDeleteList=[];     
            this.offencesSentenceTabColumndef=[];
            this.termsColumndef=[];
            this.courtEventDataExisted=[];
            }
    ngOnInit() {
        //this.startTab();
       
        this.disabled=false;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;  
        this.courtColumndef = [
                                 {
                                     fieldName:this.translateService.translate('oiddecas.line'), field: 'case_Seq', editable: false, width:100,
                      
                                 },
                                 {
                                     fieldName: this.translateService.translate('oiddecas.startdate'),
                                     field: 'beginDate', editable: false, width: 160,datatype:'date'
                      
                                 },
                                 
                                
                                 {
                                     fieldName: this.translateService.translate('oiddecas.court'),
                                     field: 'agy_loc_id', editable: false, width: 180, datatype:'lov', link:'ocdccase/populateCourtData'
                                 },
                                 {
                                     fieldName: this.translateService.translate('oiddecas.type'),
                                     field: 'caseType', editable: false, width: 150, datatype: 'lov', domain: 'LEG_CASE_TYP'
                                      
                                 },
                                 
                                 {
                                     fieldName: this.translateService.translate('oiddecas.doc'),
                                     field: "caseInfoPrefix", editable: false, width: 130
                                      
                                 },
                                 
                                 {
                                     fieldName: this.translateService.translate('oiddecas.no'),
                                     field: "caseInfoNumber", editable: false, width: 130, maxlength:13
                                      
                                 },
                                                               
                                
                                 {
                                     fieldName: this.translateService.translate('oiddecas.status'),
                                     field: 'caseStatus', editable: false, width: 150,datatype:'lov', link:'ocdccase/populateCaseStatus'
                                 },
                                 
                                 {
                                     fieldName: this.translateService.translate('oiddecas.linkedcase'),
                                     field: 'linkCaseSeq', editable: false, width: 140
                                 },
                                 
                                 
                             ];
        
        this.courtEventColumndef = [
                               {
                                   fieldName: this.translateService.translate('oiddecas.date'),
                                   field: 'eventDate', editable: false, width: 150,datatype:'date'
                               },
                               {
                                   fieldName: this.translateService.translate('oiddecas.time'),
                                   field: 'startTime', editable: false, width: 100,datatype:'time'
                               },
                               {
                                   fieldName: this.translateService.translate('oiddecas.court'),
                                   field: 'agyLocId', editable: false, width: 150,datatype:'lov', link:'ocdccase/populateCourtData'
                               },
                               {
                                   fieldName: this.translateService.translate('oiddecas.hearingtype'),
                                   field: 'hearingType', editable: false, width: 170,datatype:'lov', domain:'MOVE_RSN'/*link:'ocdccase/populateHearingTypeData'*/
                               },
                               
                               {
                                   fieldName: this.translateService.translate('oiddecas.outcome'),
                                   field: 'outcomeReasonCode', editable: false, width: 210,datatype:'lov', link:'ocdccase/populateOutcomeData'
                               },
                               {
                                   fieldName: this.translateService.translate('oiddecas.nextevent'),
                                   field: 'nextEventDate', editable: false, width: 130,datatype:'date'
                               },
                                                              
                               {
                                   fieldName: this.translateService.translate('oiddecas.time'),
                                   field: 'nextEventStartTime', editable: false, width: 100,datatype:'time'
                               },
                              
                               {
                                   fieldName: this.translateService.translate('ocdccases.hold'),
                                   field: 'holdFlag', editable: false, width: 140,datatype:'checkbox-link', link:'/OCUHOLDS', modal:true,
                                   data: 'row',dialogWidth: '80%', height:'auto',//styleClass:'hold-popup-block', displayas:'href'
                               },
                              {
                                   fieldName: this.translateService.translate('ocdccases.report'),
                                   field: 'orderRequestedFlag', editable: false, width: 140,datatype:'checkbox-link', link:'/OCUPSRDE', modal:true,
                                   data: 'row',dialogWidth: '80%', height:'auto',//styleClass:'report-popup-block', displayas:'href'
                               },
                               {
                                   fieldName: this.translateService.translate('oiddecas.comment'),
                                   field: 'commentText', editable: false, width: 130
                               },


                           ];
        this.offoutColumndef = [
                               {
                                   fieldName: this.translateService.translate('oiddecas.apply'),
                                   field: 'apply', editable:false, width: 160,datatype:'checkbox'
                               },
                               {
                                   fieldName: this.translateService.translate('oiddecas.offense'),
                                   field: 'offenceCode',editable:false, width: 230,datatype:'lov', link:'ocuoffen/offencesAgainstOrders'/*datatype:'launchbutton',link:'/OCUOFFEN', modal:true,
                                   data: 'row',dialogWidth: '50%', height: '80%'*/
                               },
                               {
                                   fieldName: this.translateService.translate('oiddecas.offenseType'),
                                   field: 'offenseType', editable:false, width: 180, datatype:'lov', link:'ocdccase/populateOffenseType'
                               },
                               {
                                   fieldName: this.translateService.translate('oiddecas.plea'),
                                   field: 'plea', editable:false, width: 150,datatype:'lov',domain:'PLEA_STATUS'/* link:'ocdccase/populatePleaData'*/
                               },
                               
                               {
                                   fieldName: this.translateService.translate('oiddecas.offenseDate'),
                                   field: 'offenseDate', editable:false, width: 150,datatype:'date'
                               },
                               {
                                   fieldName: this.translateService.translate('oiddecas.range'),
                                   field: 'range', editable:false, width: 150,datatype:'date'
                               },
                                                              
                               {
                                   fieldName: this.translateService.translate('oiddecas.result'),
                                   field: 'resultcode1desc', editable:false, width: 150
                               },
                               
                               {
                                   fieldName: this.translateService.translate('oiddecas.disposition'),
                                   field: 'disposition', editable:false, width: 150
                               },

                           ];
 
        this.conditionColumndef = [
                                  {
                                       fieldName: this.translateService.translate('ocucondi.description'),
                                       field: 'description', editable: false, width: 150,
                                   },
                                   {
                                       fieldName: this.translateService.translate('ocucondi.length'),
                                       field: 'length', editable: false, width: 130 
                                   },
                                   {
                                       fieldName: this.translateService.translate('ocucondi.unit'),
                                       field: 'lengthUnit', editable: false, width: 130
                                   },
                                   {
                                       fieldName: this.translateService.translate('ocucondi.startdate'),
                                       field: 'startDate', editable: false, width: 130, datatype: 'date'
                                   },
                                   {
                                       fieldName: this.translateService.translate('ocucondi.status'),
                                       field: 'status', editable: false,  width: 130
                                   },
                                   {
                                       fieldName: this.translateService.translate('ocucondi.comment'),
                                       field: 'commentText', editable: false,  width: 210
                                   }
                                   
                               ];
 
        this.activatedRoute.queryParams.subscribe(params => {
            let offenderid = +params['offenderId']; 
                 if(offenderid) {
                             let vHead = new VHeaderBlock();
                             vHead.offenderId = offenderid;
                             this.offenderSearchService.selectedOffender = undefined;
                             const offbkGlobal =this.osiosearchService.offbkgGlobalQuery(vHead);
                             offbkGlobal.subscribe(list => {
                                 if (list.length > 0) {
                                     this.vHeaderBlockModel = list[0];
                                     if ( list[0].imageId != null ) {
                                         this.imageModel.imageId = list[0].imageId;
                                         this.osiosearchService.imageExecuteQuery( this.imageModel ).subscribe( imageData => {
                                             this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                                     });     
                                     }
                                     this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                                     
                                 } else {
                                     this.offenderSearchService.selectedOffender = undefined;
                                 }
                                 if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
                                     this.type = 'warn';
                                     this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
                                     this.show();
                                 }
                             });
                                
                 } 
                 else {
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
                     if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
                         this.type = 'warn';
                         this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
                         this.show();
                     }
                 }
                     
             });
        
        const caseType = this.OcdccaseFactory.getPreInsertCaseType();
        caseType.subscribe(caseType => {
            this.caseTypecode = caseType;       
                    const preInsertPrefix = this.OcdccaseFactory.preInsertCaseprefix(caseType);
                    preInsertPrefix.subscribe(preInsertPrefix => {    
                    this.casePreFix = preInsertPrefix;
                    });
                });
        
        //this.populateSentenceGrid();
        this.offensesDialogGrid();
        }

    /*
    * Calling function to populate data in grid when offender changes
    */
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.courtCasesData = [];
            this.courtEventData=[];
            this.offencesOutcomedata=[];
            this.sentencesData=[];
            this.offensesData=[];
            this.termsData=[];
            this.ocdcCasesExecuteQuery();
            } else {
                this.courtCasesData = [];
                this.courtEventData=[];
                this.offencesOutcomedata=[];
                this.sentencesData=[];
                this.offensesData=[];
                this.termsData=[];
               
                }
        }
    
    populateSentenceGrid() {
        this.sentenceColumndef = [
                                  {
                                      fieldName: this.translateService.translate('ocdccases.line'),
                                      field: 'line', editable: false, width: 100,
                                  
                                  },
                                  {
                                      fieldName: this.translateService.translate('oculegst.category'),
                                      field: 'category',  editable: false, required: true, width: 160,datatype:'lov', link:'ocdccase/populateSentencesCategory'
                                  
                                  },
                                  {
                                      fieldName: this.translateService.translate('ocdccases.sentences'),
                                      field: 'sentenceCalcType', parentField:'category', editable: false, required: true,  width: 160 , datatype:'lov', link:'ocdccase/populateSentencesType?category='
                                  
                                  },
                                  
                                  {
                                      fieldName:this.translateService.translate('ocdccases.fineamount'),
                                      field: 'fineAmount',  editable: false, required: false, width: 180,
                                  },
                                  {
                                      fieldName:this.translateService.translate('ocdccases.consequtivetoLine'),
                                      field: 'consecutiveToLine ', editable: false, width:200, 
                                       
                                  },
                                  
                                  {
                                      fieldName:this.translateService.translate('ocdccases.sentencedates'),
                                      field: 'orderId', parentField:'caseId',  editable: false, width: 180, datatype:'lov',link:'ocdccase/populateSentenceDate?caseId='
                                      
                                  },
                                  {
                                      fieldName: this.translateService.translate('ocdccases.startdates'),
                                      field: 'startDate', editable: false, width: 150, datatype:'date'//,link:this.sentenceDateUrl
                                  },
                                  
                                  {
                                      fieldName: this.translateService.translate('ocdccases.expirydate'),
                                      field: 'expityDate', editable: false, width: 150,datatype:'date'
                                  },
                                  
                                  {
                                      fieldName: this.translateService.translate('ocdccases.status'),
                                      field: 'status', editable: false, width: 150,datatype:'lov',domain:'ACTIVE_TYPE'/*link:'ocdccase/populateSentenceStatus'*/
                                  },
                              ];
    }
    termGridFormation() {
        this.termsColumndef = [

                               {
                                   fieldName: this.translateService.translate('ocdccases.terms'),
                                   field: 'sentenceTermCode', editable: false, width: 150, datatype:'lov', link:this.termCodeLovUrl
                               },

                               {
                                   fieldName: this.translateService.translate('ocdccases.startdate'),
                                   field: 'startDate', editable: false, width: 150, datatype: 'date'
                               },

                               {
                                   fieldName: this.translateService.translate('ocdccases.year'),
                                   field: 'year', editable: false, width: 120
                               },
                               {
                                   fieldName: this.translateService.translate('ocdccases.month'),
                                   field: 'month', editable: false, width: 120
                               },

                               {
                                   fieldName: this.translateService.translate('ocdccases.week'),
                                   field: 'week', editable: false, width: 120
                               },

                               {
                                   fieldName: this.translateService.translate('ocdccases.days'),
                                   field: 'days', editable: false, width: 120
                               },

                               {
                                   fieldName: this.translateService.translate('ocdccases.hours'),
                                   field: 'hours', editable: false, width: 120
                               },

                               {
                                   fieldName: this.translateService.translate('ocdccases.expirydate'),
                                   field: 'expiryDate', editable: false, width: 150, datatype: 'date'
                               },
                           ];

    }
    offensesDialogGrid() {
        
        this.offencesSentenceTabColumndef = [
                                             {
                                                 fieldName: this.translateService.translate('ocdccases.offenses'),
                                                 field: 'offenseDescription', editable: false, width: 200,
                                             },
                                             {
                                                 fieldName: this.translateService.translate('oiddecas.plea'),
                                                 field: 'plea', editable:false, width: 150,datatype:'lov', domain:'PLEA_STATUS'/* link:'ocdccase/populatePleaData'*/
                                             },
                                             {
                                                 fieldName: this.translateService.translate('oiddecas.propertyvalue'),
                                                 field: 'propertyValue', editable:false, width: 150
                                             },                                             
                                             
                                             {
                                                 fieldName: this.translateService.translate('oiddecas.offenseDate'),
                                                 field: 'offenseDate', editable:false, width: 150,datatype:'date'
                                             },
                                             {
                                                 fieldName: this.translateService.translate('oiddecas.range'),
                                                 field: 'range', editable:false, width: 150,datatype:'date'
                                             },
                                             
                                             ];
    }

    /*
     * To populate data in Court Case grid and correspondingly to Court Event Grid
     * */
    ocdcCasesExecuteQuery() {
        if (this.vHeaderBlockModel.offenderBookId != null) {
            let queryParams = {
                    offenderBookId: this.vHeaderBlockModel.offenderBookId
                    }
            const searchCourtCases = this.OcdccaseFactory.searchCourtCases(queryParams);
            searchCourtCases.subscribe(list=> {
                this.courtCasesData = list;
                this.selected=0;
                this.courtCaseCourt=list[0].agy_loc_id;
                this.courtCaseId=list[0].caseId;
            });
                if(this.courtCasesData.length==0)
                    return;
                else {
                    this.populateCourtEventData(this.courtCaseId);
                }
                   
        }        
  }
    /*
     * 
     *To populate Court Event Data with respect to clicked Court Case 
     * */
    populateCourtEventData(caseId) {
        const searchCourtEventData = this.OcdccaseFactory.searchCourtEvent(caseId);
        searchCourtEventData.subscribe(eventList=> {
            for ( let i = 0; i < eventList.length; i++ ) {
                eventList[i].holdFlag = eventList[i].holdFlag === 'Y' ? true : false;
                eventList[i].holdDetails='Hold Details';
                eventList[i].orderRequestedFlag = eventList[i].orderRequestedFlag === 'Y' ? true : false;
                eventList[i].courtReport='Court Report';
                eventList[i].preExistedEventDate=eventList[i].nextEventDate;
            }
            this.courtEventData = eventList;
            this.firstCourtEvent=eventList[0];
            this.selected=0;
        });
            if(this.courtEventData.length>0) {
                /*********TO POPULATE OFFENSEOUTCOME DATA*****************************/
                this.populateOffensesOutcomeData(this.firstCourtEvent);  
            } else {
                this.offencesOutcomedata=[];
            }
        }
    
    populateOffensesOutcomeData(firstCourtEvent) {
        const offencesOutcomedata = this.OcdccaseFactory.searchOffensesOutcome(firstCourtEvent);
                offencesOutcomedata.subscribe(offencesOutcomelist=>{
                    for ( let i = 0; i < offencesOutcomelist.length; i++ ) {
                if(offencesOutcomelist[i].resultcode1desc=== "null") {
                    offencesOutcomelist[i].resultcode1desc='';
                            offencesOutcomelist[i].disposition='';
                        }
                      }
                    this.offencesOutcomedata = offencesOutcomelist;
                    this.selectedOutcome=0;
           // this.offensesDialogdata=offencesOutcomelist;
                    });
        }
    
    
    onRowClickcourt(event) {
        if(event.caseId!=null) {
            this.selectedCourtCase=event;
            this.selectedCourtCasesData=event;
          //  this.linkedCaseId=event.combinedCaseId;
            this.populateCourtEventData(event.caseId);
        } else {
            this.courtEventData=[];
            this.offencesOutcomedata=[];
        }
         this.courtCaseId=event.caseId;
         this.caseStartDate=event.beginDate;
         this.sentenceDataFlag=true;
         this.populateSentenceGrid();
        /*********TO POPULATE SENTENCE DATA ON CLICK ****************/
        this.sentencesData=[]; 
        this.offensesData=[];
        this.termsData=[];
        this.courtCaseModel=event;
        this.populateOffenderSentenceData(event);
        
       this.startTab();
   }
   
    /***** TO POPULATE OFFENCES OUTCOME DATA ON CLICK */
   onRowClickCourtEvent(event)
   {   if(event.eventId!=null) {
       this.populateOffensesOutcomeData(event);
       } else {
           this.offencesOutcomedata=[];
       }
   /*this.selectedCourtEventId=event.eventId;
   this.selectedCourtEvent=event;*/
   }
   
   populateOffenderSentenceData(courtCase) {
       const sentencesData = this.OcdccaseFactory.populateSentencesData(courtCase);
       sentencesData.subscribe(list=>{
           
       this.sentencesData = list;
       this.selectedSentence=0;
       });
   }
    
    /************ TO POPULATE TERMS DATA ON SENTENCE CLICK****************** */
    onRowClicksentence(event) {
        this.selectedSentenceRecord = event;
        this.sentenceSeq=event.line;
        this.termCodeLovUrl='ocdccase/populateSentenceTermCodeLov?sentenceCalcType='+this.selectedSentenceRecord.sentenceCalcType+'&sentenceCategory='+this.selectedSentenceRecord.category;
        this.termDataFlag=true;
        this.termGridFormation();
        this.populateOffenderSentenceTermData(event);
        this.termGridFormation();
        this.populateOffenseOnSentenceData(event);
        this.populateConditionsData(event);
        }
    
    populateOffenseOnSentenceData(sentence) {
       const offenseOnSentencedata = this.OiddecasFactory.populateOffensesOnSentence(sentence);
        offenseOnSentencedata.subscribe(offenses=>{
          this.offensesData=offenses;
        this.selectedOffence=0;
          for(let i=0;i<this.offensesData.length;i++) {
             if(this.offensesData[i].propertyValue=="0") {
                 this.offensesData[i].propertyValue="";
                 }
              }
          });
        }
          
    populateConditionsData(sentence) {
         const conditionsOnSentencedata = this.OiddecasFactory.populateConditionsData(sentence);
         conditionsOnSentencedata.subscribe(conditions=>{
             
          this.conditionGridData=conditions;
          if(this.conditionGridData.length>0) {
              this.conditionDataExist=true;
          }
           for(let i=0;i<this.conditionGridData.length;i++) {
               if(this.conditionGridData[i].lengthUnit=="null") {
                   this.conditionGridData[i].lengthUnit="";
                   }
               if(this.conditionGridData[i].status=="null") {
               this.conditionGridData[i].status="";
                   }
               if(this.conditionGridData[i].commentText=="null") {
               this.conditionGridData[i].commentText="";
                   }
                 }
          });
      }
        
   populateOffenderSentenceTermData(selectedSentenceRecord) {
          const termsdata = this.OcdccaseFactory.populateTermsData(selectedSentenceRecord);
          termsdata.subscribe(list=>{
              this.termsData = list;
          });
        }
          
   onOffensesGridInsert = () => {
              return {
                  button: '...',
                  selectedSentenceData:this.selectedSentenceRecord,
                  offenseDescription:null,
                  offenderChargeId:null,                  
                      };
                  
          }
    

   onRowClickoffout(event) {
       
   }

   show() {
       this.msglist = [];
       this.msglist.push({ message: this.message, type: this.type });
       this.msgs = [...this.msglist];
       }
  
    
    //======================= new Tab js code ==========================================
    startTab() {
        document.getElementById("defaultOpen").click();
        document.getElementById("Process1").style.display = "block";
        document.getElementById("Process2").style.display = "none";
    }
    
    openProcess(evt, processName) {
        // Declare all variables
        var i, tabcontent, tablinks;
        
        // Get all elements with class="tabcontent" and hide them
          tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace("active", "");
        }

     // Show the current tab, and add an "active" class to the link that opened the tab
        document.getElementById(processName).style.display = "block";
        evt.currentTarget.className += " active";        
        
        if(processName === "Process2"){           
            this.populateOffenderSentenceData(this.courtCaseModel);
        }
        
        return false;
    }
    
    commitCourtCasesRecord(event) {
        this.courtCasesDeleteList=event.removed;
        if(this.courtCasesDeleteList.length > 0) {
            for(let i=0;i<this.courtCasesDeleteList.length;i++) {
                this.checkCourtEventExisted(this.courtCasesDeleteList[i]);   
            }
         }
        
    }
        
    checkCourtEventExisted(courtCasesDeleteList) {
            
        const searchCourtEventData = this.OcdccaseFactory.searchCourtEvent(courtCasesDeleteList.caseId);
        searchCourtEventData.subscribe(eventList=> {
            this.courtEventDataExisted = eventList;
            if(this.courtEventDataExisted.length==0) {
                      
                const Dialogdata = {
                        label: this.translateService.translate('oiddecas.confirmwhennoeventavailable'), yesBtn: true, noBtn: true
                      };
                      this.dialogService.openLinkDialog('/oiddecasconfirmbox', Dialogdata, 60).subscribe(result => {
                        if (result) {
                                  this.deleteChildToCourtCases(courtCasesDeleteList);
                        }else {
                            this.ocdcCasesExecuteQuery();
                        }
                      });  
               
            }else {
                this.type = 'warn';
                this.message = this.translateService.translate('oiddecas.courtcasecannotdelete');
                this.show();
                this.ocdcCasesExecuteQuery();
                return;
            }
            });
        }
            
            deleteChildToCourtCases(deletedCourtCase) {
                const deletedChildCases = this.OiddecasFactory.deleteChildToCourtCases(deletedCourtCase);
                deletedChildCases.subscribe(value=>{
                    
                    if (value === 1) {
                        this.okToDeleteRecord(deletedCourtCase.caseId,"OFFENDER_CASES","CASE_ID",null,"OMS_OWNER");
                   } else {
                       this.type = 'success';
                       this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                       this.show();
                       return;
                       }
                });
            }
            
       okToDeleteRecord(keyCode,tableName,columnName,excludeTable,owner) {
                const deleteRecord = this.OiddecasFactory.okToDeleteRecord(keyCode,tableName,columnName,excludeTable,owner);
                deleteRecord.subscribe(value => {
                    if (value === 1) {
                        
                        const affectedRows = this.OiddecasFactory.deleteOffenderCourtCases(this.courtCasesDeleteList[0]);
                        affectedRows.subscribe(value=>{
                            if (value === 1) {
                                this.type = 'success';
                                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                                this.ocdcCasesExecuteQuery();
                                this.show();
                                return;
                                
                                } else {
                                    this.type = 'error';
                                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                                    this.ocdcCasesExecuteQuery();
                                    this.show();
                                    return;
                                    }
                            });
                        
                   } else {
                       this.type = 'warn';
                       this.message = this.translateService.translate('oiddecas.courtcasecannotdelete');
                       this.ocdcCasesExecuteQuery();
                       this.show();
                       return;
                     }
                 });
            }
    
    
        
    
    
    commitCourtEventsRecord(event) {
        this.courtEventsDeleteList=event.removed;
        if(this.courtEventsDeleteList.length > 0) {
            for(let i=0;i<this.courtEventsDeleteList.length;i++) {
                this.checkOffensesExisted(this.courtEventsDeleteList[i]);   
            }
         }
        
    }
            
            checkOffensesExisted(deletedCourtEvents) {
            const searchCourtEventData = this.OcdccaseFactory.searchOffensesOutcome(deletedCourtEvents);
            searchCourtEventData.subscribe(offensesList=> {
                this.offencesOutcomedata = offensesList;
                if(this.offencesOutcomedata.length==0) {
                    const Dialogdata = {
                            label: this.translateService.translate('oiddecas.confirmeventdelete'), yesBtn: true, noBtn: true
                          };
                          this.dialogService.openLinkDialog('/oiddecasconfirmbox', Dialogdata, 60).subscribe(result => {
                            if (result) {
                                this.deleteOffenderCourtEvents(deletedCourtEvents);
                            }else {
                                this.populateCourtEventData(this.courtCaseId);
                            }
                          });  
                   
                }else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oiddecas.eventrecordcannotdelete');
                    this.show();
                    this.populateCourtEventData(this.courtCaseId);
                    return;
                }
                });
            
        }
        
        deleteOffenderCourtEvents(deletedCourtEvents) {
            const deletedRows = this.OiddecasFactory.deleteOffenderCourtEvents(deletedCourtEvents);
            deletedRows.subscribe(value=>{
                if (value === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.populateCourtEventData(this.selectedCourtCase.caseId);
                    this.show();
                    return;
                    
                    } else {
                        this.type = 'error';
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.populateCourtEventData(this.selectedCourtCase.caseId);
                        this.show();
                        return;
                        }
            });
        }
        
        commitCourtOffensesRecord(event) {
            this.offensesDeleteList=event.removed;
            if(this.offensesDeleteList.length > 0) {
                for(let i=0;i<this.offensesDeleteList.length;i++) {
                    this.isLinkedCaseExist(this.offensesDeleteList[i]);
                }
             }
        }
                
       isLinkedCaseExist(deletedOffenses) {
                    const isExist = this.OiddecasFactory.isLinkedCaseExist(deletedOffenses.offenderChargeId);
                    isExist.subscribe(value => {
                    this.isLinkedCase = value;
                    if(this.isLinkedCase==false) {
                        this.isSentenceAttached(deletedOffenses);
                    }else {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oiddecas.islinkedcaseexistpleaseunlink');
                        this.populateCourtEventData(this.selectedCourtCase.caseId);
                        this.show();
                        return;
                    }
                    });
                }
            
       isSentenceAttached(deletedOffense) {
           const isSentenceExist = this.OiddecasFactory.isSentenceAttached(deletedOffense);
           isSentenceExist.subscribe(value => {
           this.isSentence = value;
           if(this.isSentence==true) {
               this.type = 'warn';
               this.message = this.translateService.translate('oiddecas.issentattached');
               this.populateCourtEventData(this.selectedCourtCase.caseId);
               this.show();
               return;
           }else {
               this.deleteOffenderOffenses(deletedOffense);
           }
           });
       }
       
       deleteOffenderOffenses(deletedOffense) {
           const offenseDeleted = this.OiddecasFactory.deleteOffenderOffenses(deletedOffense);
           offenseDeleted.subscribe(value => {
           if(value==1) {
               this.type = 'success';
               this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
               this.populateCourtEventData(this.selectedCourtCase.caseId);
               this.show();
               return;
           }else {
               this.type = 'error';
               this.message = this.translateService.translate('oiddecas.addupdateremoverecordfailed');
               this.populateCourtEventData(this.selectedCourtCase.caseId);
               this.show();
               return;
           }
       });
      }
       
       saveSentencesRecords(event) {  
           this.deletedSentenceList=event.removed;
                 if(this.deletedSentenceList.length>0) {
                     for(let i=0;i<this.deletedSentenceList.length;i++) {
                     this.okToModifySentenceRecord("<OFFENDER_BOOK_ID=>"+this.deletedSentenceList[i].offenderBookId+">/<SENTENCE_SEQ=>"+this.deletedSentenceList[i].line+">/","OFFENDER_SENTENCES", "OFFENDER_BOOK_ID,SENTENCE_SEQ", null, "OMS_OWNER")
                     }
                 }     
             }
                 
      okToModifySentenceRecord(keyString,tableName,columnName,excludeTable, owner) {     
          const deleteRecord = this.OiddecasFactory.okToModifyRecord(keyString,tableName,columnName,excludeTable,owner);
          deleteRecord.subscribe(value => {
              if (value === 1) {
                  const affectedRows = this.OiddecasFactory.deleteSentenceData(this.deletedSentenceList[0]);
                  affectedRows.subscribe(value=>{
                      if (value === 1) {
                          this.type = 'success';
                          this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                          this.populateOffenderSentenceData(this.selectedCourtCase);
                          this.show();
                          return;
                          
                          } else {
                              this.type = 'error';
                              this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                              this.populateOffenderSentenceData(this.selectedCourtCase);
                              this.show();
                              return;
                              }
                      });
              }else {
                  
                  this.type = 'warn';
                  this.message = this.translateService.translate('oiddecas.courtcasecannotdelete');
                  this.populateOffenderSentenceData(this.selectedCourtCase);
                  this.show();
                  return;                
              }
            
        });
      }
       
       saveOffensesOnSentencesRecords(event) {
           this.deleteSentenceChargesList = event.removed;
           if(this.deleteSentenceChargesList.length > 0) {
               for(let i=0;i<this.deleteSentenceChargesList.length;i++) {
                   this.isConsecSentenceExists(this.deleteSentenceChargesList[i]);
                  
                  }
                }
              }
       
       isConsecSentenceExists(sentCharges) {
           const isConsecSent = this.OiddecasFactory.isConsecSentenceExists(sentCharges)
           isConsecSent.subscribe(value => {
               if(value) {
                   this.type = 'warn';
                   this.message = this.translateService.translate('oiddecas.consecsentenceexist');
                   this.populateOffenseOnSentenceData(this.selectedSentence);
                   this.show();
                   return;
               }else if(this.conditionDataExist) {
                   this.type = 'warn';
                   this.message = this.translateService.translate('oiddecas.conditionexist');
                   this.populateOffenseOnSentenceData(this.selectedSentence);
                   this.show();
                   return;
               }else {
                   
                   this.checkAtleastOnceOffenseExist(sentCharges);
               }
           });
       }
       
       checkAtleastOnceOffenseExist(sentCharges) {
           
           if(this.offensesData.length==0) {
               const Dialogdata = {
               label: this.translateService.translate('oiddecas.atleastonceoffenseattached'), yesBtn: true, noBtn: true
               };
                      this.dialogService.openLinkDialog('/oiddecasconfirmbox', Dialogdata, 60).subscribe(result => {
               if (result) {
                   this.isSentAdjustAttached(sentCharges);
               }else {
                   this.populateOffenseOnSentenceData(this.selectedSentenceRecord);
                   }
                });  
            }else {
                
                this.valid_delete="N";
                this.deleteSentenceCharge(sentCharges);
            }
           
       }
       
       isSentAdjustAttached(sentCharges) {
           const isSentenceAdjust = this.OiddecasFactory.isSentAdjustAttached(sentCharges)
           isSentenceAdjust.subscribe(value => {
           if(value) {
               
                   const Dialogdata = {
                           label: this.translateService.translate('oiddecas.adjustmentattachedtosentence'), yesBtn: true, noBtn: true
                         };
                         this.dialogService.openLinkDialog('/oiddecasconfirmbox', Dialogdata, 60).subscribe(result => {
                           if (result) {
                               this.valid_delete="Y";
                           }else {
                               this.populateOffenseOnSentenceData(this.selectedSentenceRecord);
                           }
                         });
                         
                         this.deleteSentenceCharge(sentCharges);
               }else {
                   
                   this.valid_delete="Y";
                   this.deleteSentenceCharge(sentCharges);
               }
           
           });      
       }
       
       
       deleteSentenceCharge(sentCharges) {
           
           if(this.valid_delete=="Y") {
               
               const deleteSentCharge = this.OiddecasFactory.deleteOffensesOnSentence(sentCharges).subscribe(value => {
                   if(value==1) {
                       
                       this.okToModifyRecord("<OFFENDER_BOOK_ID=>"+sentCharges.offenderBookId+">/<SENTENCE_SEQ=>"+sentCharges.sentenceSeq+">/","OFFENDER_SENTENCES", "OFFENDER_BOOK_ID,SENTENCE_SEQ", null, "OMS_OWNER")
                   }else {
                       this.type = 'error';
                       this.message = this.translateService.translate('oiddecas.addupdateremoverecordfailed');
                       this.populateOffenseOnSentenceData(this.selectedSentenceRecord);
                       this.show();
                       return;
                   }
                      if(this.selectedSentenceRecord.sentenceCalcType=="A/FINE") {
                           const deleteFineSentence = this.OiddecasFactory.deleteFineSentence(sentCharges).subscribe(fineDelvalue => {
                           this.deleteSuccess=fineDelvalue;
                           });
                        }
                    });
              }else {
                  
                  const deleteSentCharge = this.OiddecasFactory.deleteSentenceCharges(sentCharges).subscribe(value => {
                      if(value==1) {
                          
                          this.type = 'success';
                          this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                          this.populateOffenseOnSentenceData(this.selectedSentenceRecord);
                          this.show();
                          return;
                      }else {
                          this.type = 'error';
                          this.message = this.translateService.translate('oiddecas.addupdateremoverecordfailed');
                          this.populateOffenseOnSentenceData(this.selectedSentenceRecord);
                          this.show();
                          return;
                      }
                  });
              }
            }
       
     okToModifyRecord(keyString,tableName,columnName,excludeTable, owner) {
         
         const deleteRecord = this.OiddecasFactory.okToModifyRecord(keyString,tableName,columnName,excludeTable,owner);
         deleteRecord.subscribe(value => {
             
             if (value === 1) {
                 
                 const affectedRows = this.OiddecasFactory.deleteSentences(this.deleteSentenceChargesList[0]);
                 affectedRows.subscribe(value=>{
                     
                     if (value === 1) {
                         this.type = 'success';
                         this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                         this.populateOffenderSentenceData(this.selectedCourtCase);
                         this.show();
                         return;
                         
                         } else {
                             this.type = 'error';
                             this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                             this.populateOffenderSentenceData(this.selectedCourtCase);
                             this.show();
                             return;
                             }
                     });
             }else {
                 
                 this.type = 'warn';
                 this.message = this.translateService.translate('oiddecas.courtcasecannotdelete');
                 this.populateOffenderSentenceData(this.selectedCourtCase);
                 this.show();
                 return;                
             }
           
       });
     }
             
     commitConditionRecord(event) {
         this.deletedConditionList=event.removed;
         if(this.deletedConditionList.length>0) {
             for(let i=0;i<this.deletedConditionList.length;i++) {
                 this.okToDeleteConditionRecord(this.deletedConditionList[i].offenderSentConditionId,"OFFENDER_SENT_CONDITIONS","OFFENDER_SENT_CONDITION_ID",null,"OMS_OWNER");
              }
         }
         
     }
     
     okToDeleteConditionRecord(keyCode,tableName,columnName,excludeTable,owner) {
         const deleteRecord = this.OiddecasFactory.okToDeleteRecord(keyCode,tableName,columnName,excludeTable,owner);
         deleteRecord.subscribe(value => {
             if (value === 1) {
                 const affectedRows = this.OiddecasFactory.deleteConditionsRecord(this.deletedConditionList[0]);
                 affectedRows.subscribe(value=>{
                     if (value === 1) {
                         this.type = 'success';
                         this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                         this.populateConditionsData(this.selectedSentenceRecord);
                         this.show();
                         return;
                         
                         } else {
                             this.type = 'error';
                             this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                             this.populateConditionsData(this.selectedSentenceRecord);
                             this.show();
                             return;
                             }
                     });
                 
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('oiddecas.cannotdeletecondition');
                this.ocdcCasesExecuteQuery();
               this.show();
               return;
           }
       });
      }
    
 }