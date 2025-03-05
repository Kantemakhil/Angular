import {
    Component,
    OnInit
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { TranslateService } from '@common/translate/translate.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OcdlegstService } from "../service/ocdlegst.service";
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { ActivatedRoute } from '@angular/router';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { CourtCase } from "../beans/CourtCase";
import { OcdccaseService } from "../service/ocdccase.service";
import { OffenderCasesCommitBean } from "../beans/OffenderCasesCommitBean";
import { Images } from "@commonbeans/Images";
import { OffenderSentences } from "../beans/OffenderSentences";
import { Condition } from "../beans/Condition";
import { OculegstService } from "../service/oculegst.service";
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component( {
    selector: 'app-occuccide',
    templateUrl: './ocdlegst.component.html',
    styleUrls: []
} )
export class OcdlegstComponent implements OnInit {
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
        }

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
    bailColumndef:any;
    caseId: any;
    bookId: number;
    chargeId: number;
    bailStatusCode: string;
    sentenceSeq:number;
    sentenceTermStartDate:any;
    cashFlag: any;
    createDate: Date;
    sentencesData : OffenderSentences[]=[];
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
    selectedSentenceRecord:OffenderSentences = new OffenderSentences();
    courtCasesInsertList : CourtCase[]=[];
    courtCasesUpdateList : CourtCase[] =[];
    seqNo: number;
    offenderCasesCommitModel : OffenderCasesCommitBean;    
    sentenceDataInsertList: OffenderSentences[] = [];
    sentenceDataUpdateList: OffenderSentences[] = [];
    conditionDataUpdateList: Condition[]=[];
    casePrefixInfo:string;
    casePreFix:string;
    caseTypecode:string;
    agyLocationCode:any;
    courtCaseCourt:string;
    caseStartDate:any;
    eventDate:any;
    nextEventDate:any;
    next_Event_Date:any;
    courtCaseId:number;
    disableLinkCase:boolean;
    btnCaseIdentifire:boolean;
    linkCaseData :CourtCase = new CourtCase();
    public selected = -1;
    public selectedOutcome=-1;
    public selectedSentence=-1;
    retrivedDate:any;
    updatedDate:any;
    retrivedNextEventDate:any;
    updatedNextEventDate:any;
    sentenceStartDate:any;
    termCodeLovUrl:string;
    termDataFlag:boolean;
    sentenceDataFlag:boolean;
    conditionColumndef:any[];
    conditonData:Condition[]=[];
    imageModel: Images = new Images();
    urlCondition = ""; 
    updateReasonUrl="";
    category:string;
    sentenceCalcType:string;
    statusflag:boolean=true;
    constructor(private OcdccaseFactory : OcdccaseService,
            private offenderSearchService: OffenderSearchService,
            public translateService: TranslateService,
            private sessionManager: UserSessionManager,
            private activatedRoute: ActivatedRoute,
            private osiosearchService: OsiosearService,
            private OcdlegstFactory: OcdlegstService,
            private service : OculegstService,
            private dialogService :DialogService) {
            this.offenderCasesCommitModel = new OffenderCasesCommitBean();          
            this.courtCasesInsertList = [];
            this.courtCasesUpdateList = []; 
            this.sentenceDataUpdateList = [];        
            this.termsColumndef=[];
            }
    
    ngOnInit() {
        this.statusflag=true;
        this.conditonData=[];
        this.disableLinkCase=true;       
        this.disabled=false;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender; 
        this.courtColumndef = [
                                 {
                                     fieldName: this.translateService.translate('ocdlegst.startDate'),
                                     field: 'beginDate', editable: false, width: 160,datatype:'date'
                                 },
                                 
                                 {
                                     fieldName: this.translateService.translate('ocdlegst.court'),
                                     field: 'agy_loc_id', editable: false, width: 180, datatype:'lov', link:'ocdccase/populateCourtData'
                                 },
                                 {
                                     fieldName: this.translateService.translate('ocdlegst.type'),
                                     field: 'caseType', editable: false, width: 150, datatype: 'lov', domain: 'LEG_CASE_TYP'
                                      
                                 },
                                 
                                 {
                                     fieldName: this.translateService.translate('ocdlegst.no'),
                                     field: "caseInfoNumber", editable: false, width: 130, maxlength:13
                                      
                                 },
                                                               
                                 {
                                     fieldName: this.translateService.translate('ocdlegst.status'),
                                     field: 'caseStatus', editable: false, width: 150,datatype:'lov', link:'ocdccase/populateCaseStatus'
                                 },
                                 
                                 {
                                     fieldName: this.translateService.translate('ocdlegst.reason'),
                                     field: 'statusUpdateReason', editable: false, width: 140, datatype:'lov',link:'ocdlegst/reasonUpdateStatus'
                                 },                                 
                                 {
                                     fieldName: this.translateService.translate('ocdlegst.lastupdate'),
                                     field: 'status_update_date', editable: false, width: 160,datatype:'date'
                      
                                 },
                                 {   fieldName: 'Update Status',
                                     field: 'orderRequestedFlag', editable: true, width: 140,datatype:'checkbox-link', link:'/OCULEGST', modal:true, updateField:'row',
                                     data: 'row',dialogWidth: '80%', height:'auto',styleClass:'report-popup-block', displayas:'href'
                                 }
                                 
                             ];
        
        this.sentenceColumndef = [
                                  {
                                      fieldName: this.translateService.translate( 'ocdlegst.line' ),
                                      field: 'line', editable: false, width: 100,

                                  },
                                  {
                                      fieldName: this.translateService.translate( 'oculegst.category' ),
                                      field: 'category', editable: false, required: true, width: 160, datatype: 'lov', link: 'ocdccase/populateSentencesCategory'

                                  },
                                  {
                                      fieldName: this.translateService.translate( 'ocdlegst.sentenceorder' ),
                                      field: 'sentenceCalcType', parentField: 'category', editable: false, required: false, width: 160, datatype: 'lov', link: 'ocdccase/populateSentencesType?category='

                                  },

                                  {
                                      fieldName: this.translateService.translate( 'ocdlegst.startDate' ),
                                      field: 'startDate', editable: false, width: 150, datatype: 'date'
                                  },

                                  {
                                      fieldName: this.translateService.translate( 'ocdlegst.expiryDate' ),
                                      field: 'expityDate', editable: false, width: 150, datatype: 'date'
                                  },

                                  {
                                      fieldName: this.translateService.translate( 'ocdlegst.status' ),
                                      field: 'status', editable: false, width: 150, datatype: 'lov', domain:'ACTIVE_TYPE'/*link: 'ocdccase/populateSentenceStatus'*/
                                  },
                                  {
                                      fieldName: this.translateService.translate( 'ocdlegst.reason' ),
                                      field: 'statusUpdateReason',parentField: 'sentenceCalcType', editable: false, width: 140, datatype: 'lov', link:'ocdlegst/statusReasonUpdateLov?sentenceCalcType='
                                  },
                                  {
                                      fieldName: this.translateService.translate( 'ocdlegst.lastupdate' ),
                                      field: 'statusUpdateDate', editable: false, width: 160, datatype: 'date'

                                  },
                                  {
                                      fieldName: this.translateService.translate( 'ocdlegst.statusupdate' ),
                                      field: 'orderRequestedFlag', editable: true, width: 140, datatype: 'checkbox-link', link: '/OCULEGSTSENT', modal: true, updateField: 'row',
                                      data: 'row', dialogWidth: '80%', height: 'auto', styleClass: 'report-popup-block', displayas: 'href'
                                  }

                              ];
        
        this.conditionColumndef = [

                                   {
                                       fieldName: this.translateService.translate('ocucondi.title'),
                                       field: 'conditionTypeCode', editable: false, width:180,datatype:'lov', link:'ocdlegst/getConditionsLov'
                                   },
                                 
                                   {
                                       fieldName: this.translateService.translate('ocucondi.length'),
                                       field: 'length', editable: false , width:150  
                                   },
                                   {
                                       fieldName: this.translateService.translate('ocucondi.unit'),
                                       field: 'lengthUnit', editable: false, width: 100, 
                                   },
                                   {
                                       fieldName: this.translateService.translate('ocucondi.startdate'),
                                       field: 'startDate', editable: false, width: 140, datatype: 'date'
                                   },
                                   {
                                       fieldName: this.translateService.translate('ocucondi.status'),
                                       field: 'conditionStatus', editable: false, width: 140 ,datatype:'lov',domain:'ACTIVE_TYPE'/*link:'ocdlegst/populateConditionStatus'*/
                                   },
                                   
                                   {
                                       fieldName: this.translateService.translate( 'ocucondi.reason' ),
                                       field: 'statusUpdateReason', editable: false, width: 150,datatype:'lov',link:'oculegst/reasonUpdateStatus'
                                   },
                                   
                                   {
                                       fieldName: this.translateService.translate( 'ocucondi.lastupdate' ),
                                       field: 'statusUpdateDate', editable: false, width: 160, datatype: 'date'

                                   },
                                   {
                                       fieldName: this.translateService.translate( 'ocdlegst.statusupdate' ),
                                       field: 'orderRequestedFlag', editable: true, width: 140, datatype: 'checkbox-link', link: '/OCULEGSTCOND', modal: true, updateField: 'row',
                                       data: 'row', dialogWidth: '80%', height: 'auto', styleClass: 'report-popup-block', displayas: 'href'
                                   }

                               ]; 
        
        if (!this.vHeaderBlockModel) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
        

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
                                    // this.show();
                                 }
                             });
                                
                 } 
                 else {
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
                     if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
                         this.type = 'warn';
                         this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
                        // this.show();
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
        }

    /*
    * Calling function to populate data in grid when offender changes
    */
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.courtCasesData = [];
            this.sentencesData=[];
            this.conditonData=[];
            this.ocdcCasesExecuteQuery();
            } else {
                this.courtCasesData = [];
                this.sentencesData=[];
                this.conditonData=[];
               
               
                }
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
                if(list.length==0)
                    return;
                else {                   
                   
                    }  
               });
        }        
  }
   
    onRowClickcourt(event) {
        this.disableLinkCase = false;
        this.btnCaseIdentifire = false;
        if(event.caseId!=null) {
            this.selectedCourtCase=event;
            this.selectedCourtCasesData=event;
        } else {}        
         this.courtCaseId=event.caseId;
         this.caseStartDate=event.beginDate;
         this.sentenceDataFlag=true; 
          /*********TO POPULATE SENTENCE DATA ON CLICK ****************/
        this.sentencesData = [];
        this.conditonData=[];
        this.populateOffenderSentenceData( event );
        

    }

     populateOffenderSentenceData( courtCase ) {
        const sentencesData = this.OcdccaseFactory.populateSentencesData( courtCase );
        sentencesData.subscribe( list => {
            for ( let i = 0; i < list.length; i++ ) {
            this.category=list[i].category;
            this.sentenceCalcType=list[i].sentenceCalcType;
            }
            this.sentencesData = list;
            this.selectedSentence = 0;
        });
     
    }


    updateSentencesDetails( event ) {
        this.sentenceDataUpdateList = event.updated;
        if ( this.sentenceDataUpdateList.length > 0 ) {
            for ( let i = 0; i < this.sentenceDataUpdateList.length; i++ ) {
                  if((this.sentenceDataUpdateList[i].category==='COMM')&&(this.sentenceDataUpdateList[i].sentenceCalcType==='PAR'||this.sentenceDataUpdateList[i].sentenceCalcType==='PROB')){
                      if(this.statusflag === true){
                         this.sentenceDataUpdateList[i].status = 'I';
                     }else{
                         this.type = 'error';
                         this.message = this.translateService.translate('ocdlegst.conditioninactive');
                         this.show();
                         this.populateOffenderSentenceData(this.selectedCourtCase);
                         return; 
                      }
                     }else{
                         this.sentenceDataUpdateList[i].status = 'A';               
                 }
                this.sentenceDataUpdateList[i].createDateTime = DateFormat.getDate();
                this.sentenceDataUpdateList[i].modifyDateTime = DateFormat.getDate();
                this.sentenceDataUpdateList[i].createUserId = this.sessionManager.getId();
                this.sentenceDataUpdateList[i].modifyUserId = this.sessionManager.getId();
            }

            const sentencesupdateData = this.OcdlegstFactory.updateSentencesData( this.sentenceDataUpdateList );
            sentencesupdateData.subscribe( list => {
                if ( list === 1 ) {
                    this.type = 'success';
                    this.message = this.translateService.translate( 'oculegst.saverecord' );
                    this.show();
                    this.populateOffenderSentenceData(this.selectedCourtCase);
                    return;
                } else {
                    this.type = 'error';
                    this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                    this.show();
                    return;
                }
               
            });
        }

    }

    onGridInsertSentence = () => {
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            return;
        }
        return {
            statusUpdateReason: '',
            statusUpdateComment: '',
            statusUpdateDate: '',
            statusUpdateStaffId: '',
            staffId: '',
            statusupdate_staff_id: ''

        }
    }
   
    
    //================= On Insert ==================================
    onGridInsert = () => {
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
            return;
            }
        return {
            statusUpdateReason : '',
            statusUpdateComment : '',
            statusUpdateDate : '',
            statusUpdateStaffId:'',
            }
        }

    saveCourtCases(event) {
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
            return;
            }
        this.courtCasesUpdateList = event.updated;        
        this.offenderCasesCommitModel.updateList = [];
        
        if(this.courtCasesUpdateList.length>0) {
            for(let i=0;i<this.courtCasesUpdateList.length;i++) {
            
            if(this.courtCasesUpdateList[i].caseStatus === null || this.courtCasesUpdateList[i].caseStatus === undefined){
                this.type = 'warn';
                this.message = this.translateService.translate('oddlegst.status.must');
                this.show();
                return;
            }
            
            this.courtCasesUpdateList[i].offenderBookId=this.vHeaderBlockModel.offenderBookId;
            this.courtCasesUpdateList[i].caseId = this.courtCaseId;
            const datePipe = new DatePipe('en-US');
            this.beginDate = datePipe.transform(this.courtCasesUpdateList[i].beginDate, 'yyyy/MM/dd');
            this.courtCasesUpdateList[i].beginDate = new Date(this.beginDate);
            if(this.courtCasesUpdateList[i].beginDate > this.sysDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('oddlegst.datenotbepostdated');
                this.show();
                return;
                }
                this.booking = new Date(this.vHeaderBlockModel.bookingBeginDate);
                this.beginDate = new Date(this.beginDate);
                if (this.booking > this.beginDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdccases.startdatecannotbeearlierthanbooking');
                    this.show();
                    return;
                    }
                 this.courtCasesUpdateList[i].creatDateTime = DateFormat.getDate();
                 this.courtCasesUpdateList[i].modifyDateTime = DateFormat.getDate();
                 this.courtCasesUpdateList[i].createUserId=this.sessionManager.getId();
                 this.courtCasesUpdateList[i].modifyUserId=this.sessionManager.getId();             
                 }
        this.offenderCasesCommitModel.updateList=this.courtCasesUpdateList;
        const courtCaseSaveData = this.OcdlegstFactory. getUpdateCaseReason(this.offenderCasesCommitModel);
        courtCaseSaveData.subscribe(caseSaveResult => {
            if (caseSaveResult === 1) {
                this.type = 'success';
                this.message = this.translateService.translate( 'oculegst.saverecord' );
                this.ocdcCasesExecuteQuery();
                this.show();
                return;
                } else {
                    this.type = 'error';
                    this.message = this.translateService.translate('ocdlegst.caseupadtefailmsg');
                    this.show();
                    this.ocdcCasesExecuteQuery();
                    return;
                    }
            });
      }
  
    }

    onGridInsertCondition = () => {
    if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
        this.type = 'warn';
        this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
        return;
    }
    return {
        statusUpdateReason: '',
        statusUpdateComment: '',
        statusUpdateDate: '',
        statusUpdateStaffId: '',
        staffId: '',
        statusupdate_staff_id: ''

    }
}
    onRowClicksentence(event){
        this.conditonData=[];
        this.populateCondition(event);
        this.selectedSentenceRecord=event;
        this.category = event.category;
        this.sentenceCalcType = event.sentenceCalcType;
    }
    
    populateCondition(event ){
        const conditonData = this.OcdlegstFactory.getConditionData(event);
        conditonData.subscribe(list =>{
            this.conditonData = list;
            this.selected=0;
            if(( this.conditonData.length > 0 ||this.category=='COMM')&&(this.sentenceCalcType=='PAR'||this.sentenceCalcType=='PROB')){
                for(let i = 0; i < this.conditonData.length; i++){
                   if( this.conditonData[i].conditionStatus === 'I'){
                       this.statusflag = true; 
                   } else{
                       this.statusflag = false; 
                   }
                }
            }
        }); 
    }
    updateConditionDetails(event) {
        this.conditionDataUpdateList = event.updated;
        if ( this.conditionDataUpdateList.length > 0 ) {
            for ( let i = 0; i < this.conditionDataUpdateList.length; i++ ) {
                this.conditionDataUpdateList[i].createDateTime = DateFormat.getDate();
                this.conditionDataUpdateList[i].modifyDateTime = DateFormat.getDate();
                this.conditionDataUpdateList[i].createUserId = this.sessionManager.getId();
                this.conditionDataUpdateList[i].modifyUserId = this.sessionManager.getId();
            }

            const conditionDataUpdateList = this.OcdlegstFactory.updateConditionData( this.conditionDataUpdateList );
            conditionDataUpdateList.subscribe( list => {
                if ( list === 1 ) {
                    this.type = 'success';
                    this.message = this.translateService.translate( 'oculegst.saverecord' );
                    this.show();
                    this.populateCondition(this.selectedSentenceRecord);
                    return;
                } else {
                    this.type = 'error';
                    this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                    this.show();
                    return;
                }
            });
        }

    }
}