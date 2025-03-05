import {
    Component,
    OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { ActivatedRoute } from '@angular/router';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Images } from "@commonbeans/Images";
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OcdclistService } from '@instlegalscreens/service/ocdclist.service';
import {OcucalcrService} from '../service/ocucalcr.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OidsenadService } from "../service/oidsenad.service";
import { SentenceAdjustment } from "../beans/SentenceAdjustment";
import { AdjustmentDetails } from "../beans/AdjustmentDetails"
import { AdjustmentDetailsCommitBean } from "../beans/AdjustmentDetailsCommitBean";
import { DialogService } from '@ui-components/dialog/dialog.service';
import { Adjustments } from "../beans/Adjustments";
import { AdjustCommitBean } from "../beans/AdjustCommitBean";
import { SentenceCalculation } from "../beans/SentenceCalculation";
@Component( {
    selector: 'app-oidsenad',
    templateUrl: './oidsenad.component.html',
    styleUrls: ['./oidsenad.component.scss']
} )
export class OidsenadComponent implements OnInit {
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    msgs: any[] = [];
    sysDate: any;
    sysDateFormat: any;
    fromDate:any;
    toDate:any;
    booking: any;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    public selected = -1;
    imageModel: Images = new Images();
    sentAdjustColumndef:any[];
    sentAdjustData: SentenceAdjustment[] = [];
    debitColumndef: any[];
    debitData:  AdjustmentDetails[]=[]; 
    disabled: boolean;
    debitCreditInsertList : AdjustmentDetails[]=[];
    debitCreditUpdateList : AdjustmentDetails[]=[];
    debitCreditDeleteList : AdjustmentDetails[]=[];
    selectedsentAdjustRecord:SentenceAdjustment = new SentenceAdjustment();
	sentenceCalc:SentenceCalculation = new SentenceCalculation();
    adjustmentDetailsCommitModel : AdjustmentDetailsCommitBean = new AdjustmentDetailsCommitBean();
    offenderBookId: any;
    postedDate:any;
    sentenceSeq:any;
    debitCreditFlag:boolean;
    keyDatesDisable:boolean;
    datediff:any;
    todate:any;
   numdays:any;
    newfromdate:any;
    newtodate:any;
    gridInsert: boolean;
    totaldays:number;
    adjustColumndef: any[];
    adjustData: Adjustments[]=[];
    adjustInsertList:Adjustments[]=[];
    adjustUpdateList:Adjustments[]=[];
    adjustDeleteList:Adjustments[]=[];
    adjustCommitBean:AdjustCommitBean = new AdjustCommitBean();
    selectedOffenderId:number = 0;
    fromdatedays:number;
    fromdatemonth:any;
    fromdateyear:any;
    todatestring:string;
    todatestringsplitted:string;
    daystobeadded:number;
    
   
    constructor( private offenderSearchService: OffenderSearchService, public translateService: TranslateService,public oidsenadService: OidsenadService,
        private sessionManager: UserSessionManager, public ocdclistService: OcdclistService, private activatedRoute: ActivatedRoute, private osiosearchService: OsiosearService,
        private dialogService :DialogService, private ocucalcrService: OcucalcrService)
    {
    }
    ngOnInit() {
        
        this.adjustData = [];
        this.adjustInsertList=[];
        this.adjustUpdateList=[];
        this.adjustDeleteList=[];
        this.disabled=false;
        
        if ( this.ocdclistService.selectedRow ) {
            this.ocdclistService.selectedRow = false;

        }
        this.keyDatesDisable=true;
        //this.disabled=false;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
        }
        this.sentAdjustColumndef = [
                                 {
                                     fieldName: this.translateService.translate( 'oidsenad.caseNumber' ), field: 'caseNumber', editable: false, width: 100
                                 },
                                 {
                                     fieldName: this.translateService.translate( 'oidsenad.offenseDescription' ),
                                     field: 'offenseCode', editable: false, width: 160, datatype:'lov', link:'ocuoffen/offencesAgainstOrders'
                                 },

                                 {
                                     fieldName: this.translateService.translate( 'oidsenad.seq' ),
                                     field: 'sentenceSeq', editable: false, width: 180
                                 },
                                 {
                                     fieldName: this.translateService.translate( 'oidsenad.sentenceType' ),
                                     field: 'sentenceCalcType', editable: false, width: 150

                                 },

                                 {
                                     fieldName: this.translateService.translate( 'oidsenad.sentenceStatus' ),
                                     field: 'sentenceStatus', editable: false, width: 160,datatype:'lov', link:'ocdccase/populateCaseStatus'

                                 }

                             ];
        this.debitColumndef = [
                                    {
                                        fieldName: this.translateService.translate( 'oidsenad.debitType' ),
                                        field: 'sentenceAdjustCode', editable: true, width: 150,datatype:'lov',link:'oidsenad/debitType',source:'OIMSREQS'
                                    },
                                    {
                                        fieldName: this.translateService.translate( 'oidsenad.postedDate' ),
                                        field: 'postedDate', editable: true, width: 160,datatype:'date'
                                    },

                                    {
                                        fieldName: this.translateService.translate( 'oidsenad.fromDate' ),
                                        field: 'fromDate', editable: true, width: 180, datatype:'date',
                                    },
                                    {
                                        fieldName: this.translateService.translate( 'oidsenad.todate' ),
                                        field: 'toDate', editable: true, width: 150,datatype:'date'

                                    },

                                    {
                                        fieldName: this.translateService.translate( 'oidsenad.days' ),
                                        field: 'days', editable: true, width: 160

                                    },
                                    {
                                        fieldName: this.translateService.translate( 'oidsenad.comment' ),
                                        field: 'comment', editable: true, width: 160
                                    }

                                ];
        
        this.adjustColumndef = [
                                {
                                    fieldName: this.translateService.translate( 'oidsenad.adjtype' ),
                                    field: 'sentenceAdjustCode', editable: true, width: 100,datatype:'lov',link:'/oidsenad/populateAdjustTypeLov',source:'OIMSREQS'
                                },
                                {
                                    fieldName: this.translateService.translate( 'oidsenad.postedDate' ),
                                    field: 'adjustDate', editable: true, width: 160,datatype:'date'
                                },

                                {
                                    fieldName: this.translateService.translate( 'oidsenad.fromDateAdj' ),
                                    field: 'adjustFromDate', editable: true, width: 180,datatype:'date', required: true
                                },
                                {
                                    fieldName: this.translateService.translate( 'oidsenad.todate' ),
                                    field: 'adjustToDate', editable: true, width: 150,datatype:'date'

                                },

                                {
                                    fieldName: this.translateService.translate( 'oidsenad.days' ),
                                    field: 'adjustDays', editable: true, width: 160

                                },
                                {
                                    fieldName: this.translateService.translate( 'oidsenad.comment' ),
                                    field: 'commentText', editable: true, width: 160
                                }

                            ];
      
    }
    /*
     * Calling function to populate data in grid when offender changes
     */
    onOffenderChange(offender) {
       
        this.vHeaderBlockModel = offender;
        if ( offender ) {
            this.sentAdjustColumndef = [];
            this.populateSentAdjustment();
           // this.disabled=false;
           
        } else {
            this.sentAdjustColumndef = [];
            //this.disabled=true;
            this.debitData=[];
            this.sentAdjustData=[];
            this.debitColumndef=[];
            this.keyDatesDisable=true;
            this.gridInsert = false;
            
        }
    }
    onRowClicksentAdjustEvent(event) {
        
        this.selectedsentAdjustRecord = event;
        this.offenderBookId=event.offenderBookId;
        this.sentenceSeq=event.sentenceSeq;
        this.populateDebitCredit(this.selectedsentAdjustRecord);
        this.populateAdjustGrid(event.offenderBookId);
        this.selectedOffenderId = event.offenderBookId;
       this.startTab();
      // this.disabled=false;
   }
    
    onGridInsert = () => {
        this.keyDatesDisable=true;
        return {
            postedDate:DateFormat.getDate(),
            }
        }
    /*
     * TO show messages on the screen*/
    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }
    populateSentAdjustment(){
        this.sentAdjustData=[];
        if ( this.vHeaderBlockModel.offenderBookId != null ) {
            let queryParams = {
                offenderBookId: this.vHeaderBlockModel.offenderBookId
            }
        const sentAdjustData = this.oidsenadService.populateSentAdjustment(queryParams);
            sentAdjustData.subscribe( list => {
                this.sentAdjustData = list;
                this.selected=0;
                if(this.sentAdjustData.length>0) {
                   // this.disabled=false;
                    this.keyDatesDisable=false;
                }
//                else
//                    {this.disabled=true;}
            });
           
    }
    else {
        this.sentAdjustData=[];
    }}
    populateDebitCredit(obj){
        this.debitData=[];
        const debitData = this.oidsenadService.populateDebitCredit(obj);
            debitData.subscribe( list => {
                this.debitData = list;
                this.selected=0;
            });
            this.gridInsert = true;
           // this.disabled=false;
            
    }
    
    populateAdjustGrid(offenderBookingId){
        this.debitData=[];
        const debitData = this.oidsenadService.populateAdjustGrid(offenderBookingId);
            debitData.subscribe( list => {               
               this.adjustData = list;              
            });
    }
    
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
        
        if(processName === "Process1"){    // this method for add class of tabcolor turned green after complited.
            this.debitCreditFlag=true;
            document.getElementById("Process1").style.display = "block"; 
            document.getElementById("Process2").style.display = "none";
            this.populateDebitCredit(this.selectedsentAdjustRecord);
            this.populateAdjustGrid(this.selectedOffenderId);
        }
        
        if(processName === "Process2"){           
            document.getElementById("Process1").style.display = "none"; 
            document.getElementById("Process2").style.display = "block";
            this.populateAdjustGrid(this.selectedOffenderId);
            this.populateDebitCredit(this.selectedsentAdjustRecord);
        }
        
        return false;
    }
    launchSentenceCalcDialog() {
        this.dialogService.openLinkDialog( '/OCUCALCR', this.vHeaderBlockModel, 80).subscribe( result => {
            if ( result ) {
	
                //Call sentence Calcualation package
								this.sentenceCalc = result;
								this.sentenceCalc.offenderBookId = this.vHeaderBlockModel.offenderBookId;
								this.ocucalcrService.calExpDate(this.sentenceCalc).subscribe(calcResult=> {
									if(calcResult) {
										this.type = 'success';
	                                	this.populateDebitCredit(this.selectedsentAdjustRecord);
	                                	this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
	                                	this.show();
	                            		return;
									}
									 
								}); 
               
                }
            });
    }
   
    autoCalculateDays = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if( event.field === 'toDate') {
            if(event.data.fromDate){
            for (let i = 0; i < this.debitData.length; i++) {
            if ( event.newValue === this.debitData[i].toDate) {
                rowdata.validated = true;
                this.newfromdate=new Date(this.debitData[i].fromDate);
                this.newtodate=new Date(this.debitData[i].toDate);
                if(DateFormat.compareDate(DateFormat.getDate(this.newtodate), DateFormat.getDate(this.newfromdate))=== -1) {
                    
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidsenad.fromdatecannotbegreaterthantodate');
                    this.show();
                    return rowdata;
                }
                else
                    {
                this.datediff=Math.floor(this.newtodate-this.newfromdate);
                this.totaldays=((this.datediff)/1000/60/60/24)+1;
               this.debitData[i].days=this.totaldays;
                rowdata.data = {days:  this.totaldays};
                return rowdata;
                
                }}
            }}
          }
        if(event.field==='days')
            {
            if(event.data.fromDate){
            for (let i = 0; i < this.debitData.length; i++) {
                if ( event.newValue === this.debitData[i].days) {
                    this.todatestring=event.newValue;
                    this.totaldays= +this.todatestring;
                    this.daystobeadded=this.totaldays-1;
                    rowdata.validated = true;
                    this.newfromdate=DateFormat.getDate(event.data.fromDate);
                    this.fromdatedays=this.newfromdate.getDate();
                    this.fromdatemonth=this.newfromdate.getMonth();
                    this.fromdateyear=this.newfromdate.getFullYear();
                    this.newtodate=new Date(this.fromdateyear, this.fromdatemonth,this.fromdatedays+this.daystobeadded);
                    this.debitData[i].toDate=this.newtodate;
                    rowdata.data = {
                            toDate:  this.newtodate};
                    return rowdata;
                }
            }}}
        if(event.field==='fromDate')
        {
            if(event.data.toDate){
        for (let i = 0; i < this.debitData.length; i++) {
            if ( event.newValue === this.debitData[i].fromDate) {
                rowdata.validated = true;
                this.newfromdate=new Date(this.debitData[i].fromDate);
                this.newtodate=new Date(this.debitData[i].toDate);
                if(DateFormat.compareDate(DateFormat.getDate(this.newtodate), DateFormat.getDate(this.newfromdate))=== -1) {
                    
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidsenad.fromdatecannotbegreaterthantodate');
                    this.show();
                    return rowdata;
                }
                else
                    {
                this.datediff=Math.floor(this.newtodate-this.newfromdate);
                this.totaldays=((this.datediff)/1000/60/60/24)+1;
               this.debitData[i].days=this.totaldays;
                rowdata.data = {days:  this.totaldays};
                return rowdata;
                
                }
            }
        }}
            else if(event.data.days){
                for (let i = 0; i < this.debitData.length; i++) {
                    if ( event.newValue === this.debitData[i].fromDate) {
                        rowdata.validated = true;
                        this.todatestring=event.data.days;
                        this.totaldays= +this.todatestring;
                        this.daystobeadded=this.totaldays-1;
                        rowdata.validated = true;
                        this.newfromdate=DateFormat.getDate(event.data.fromDate);
                        this.fromdatedays=this.newfromdate.getDate();
                        this.fromdatemonth=this.newfromdate.getMonth();
                        this.fromdateyear=this.newfromdate.getFullYear();
                        this.newtodate=new Date(this.fromdateyear, this.fromdatemonth,this.fromdatedays+this.daystobeadded);
                        this.debitData[i].toDate=this.newtodate;
                        rowdata.data = {
                                toDate:  this.newtodate};
                        return rowdata;
                    }
                }}     
        }
        rowdata.validated = true;
        return rowdata;
       
    } 
    
    autoCalculateDaysAdjust = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex; 
        if( event.field === 'adjustToDate') {
            if(event.data.adjustFromDate){
            for (let i = 0; i < this.adjustData.length; i++) {
            if ( event.newValue === this.adjustData[i].adjustToDate) {
                rowdata.validated = true;
                this.newfromdate=new Date(this.adjustData[i].adjustFromDate);
                this.newtodate=new Date(this.adjustData[i].adjustToDate);
                if(DateFormat.compareDate(DateFormat.getDate(this.newtodate), DateFormat.getDate(this.newfromdate))=== -1) {
                    
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidsenad.fromdatecannotbegreaterthantodate');
                    this.show();
                    return rowdata;
                }
                else
                    {
                this.datediff=Math.floor(this.newtodate-this.newfromdate);
                this.totaldays=((this.datediff)/1000/60/60/24)+1;
               this.adjustData[i].adjustDays=this.totaldays;
                rowdata.data = {adjustDays:  this.totaldays};
                return rowdata;
                
                }}
            }}
          }
        if(event.field==='adjustDays')
            {
            if(event.data.adjustFromDate){
            for (let i = 0; i < this.adjustData.length; i++) {
                if ( event.newValue === this.adjustData[i].adjustDays) {
                    this.todatestring=event.newValue;
                    this.totaldays= +this.todatestring;
                    this.daystobeadded=this.totaldays-1;
                    rowdata.validated = true;
                    this.newfromdate=DateFormat.getDate(event.data.adjustFromDate);
                    this.fromdatedays=this.newfromdate.getDate();
                    this.fromdatemonth=this.newfromdate.getMonth();
                    this.fromdateyear=this.newfromdate.getFullYear();
                    this.newtodate=new Date(this.fromdateyear, this.fromdatemonth,this.fromdatedays+this.daystobeadded);
                    this.adjustData[i].adjustToDate=this.newtodate;
                    rowdata.data = {
                            adjustToDate:  this.newtodate};
                    return rowdata;
                }
            }}}
        if(event.field==='adjustFromDate')
        {
            
            if(event.data.adjustToDate){
                for (let i = 0; i < this.adjustData.length; i++) {
                    if ( event.newValue === this.adjustData[i].adjustFromDate) {
                        rowdata.validated = true;
                        this.newfromdate=new Date(this.adjustData[i].adjustFromDate);
                        this.newtodate=new Date(this.adjustData[i].adjustToDate);
                        if(DateFormat.compareDate(DateFormat.getDate(this.newtodate), DateFormat.getDate(this.newfromdate))=== -1) {
                            
                            this.type = 'warn';
                            this.message = this.translateService.translate('oidsenad.fromdatecannotbegreaterthantodate');
                            this.show();
                            return rowdata;
                        }
                        else
                            {
                        this.datediff=Math.floor(this.newtodate-this.newfromdate);
                        this.totaldays=((this.datediff)/1000/60/60/24)+1;
                       this.adjustData[i].adjustDays=this.totaldays;
                        rowdata.data = {adjustDays:  this.totaldays};
                        return rowdata;
                        
                        }
                    }
                }}
            else if(event.data.adjustDays){
                for (let i = 0; i < this.adjustData.length; i++) {
                    if ( event.newValue === this.adjustData[i].adjustFromDate) {
                        rowdata.validated = true;
                        this.todatestring=event.data.adjustDays;
                        this.totaldays= +this.todatestring;
                        this.daystobeadded=this.totaldays-1;
                        rowdata.validated = true;
                        this.newfromdate=DateFormat.getDate(event.data.adjustFromDate);
                        this.fromdatedays=this.newfromdate.getDate();
                        this.fromdatemonth=this.newfromdate.getMonth();
                        this.fromdateyear=this.newfromdate.getFullYear();
                        this.newtodate=new Date(this.fromdateyear, this.fromdatemonth,this.fromdatedays+this.daystobeadded);
                        this.adjustData[i].adjustToDate=this.newtodate;
                        rowdata.data = {
                                adjustToDate:  this.newtodate};
                        return rowdata;
                    }
                }}  }  
        
        rowdata.validated = true;
        return rowdata;
       
    } 
    
    commitDebitCreditRecord(event){
            this.keyDatesDisable=false;
        this.debitCreditInsertList=event.added;
        this.debitCreditUpdateList=event.updated;
        this.debitCreditDeleteList=event.removed;
        this.adjustmentDetailsCommitModel.insertList = [];
        this.adjustmentDetailsCommitModel.updateList = [];
        this.sysDate = DateFormat.getDate();
        if(this.debitCreditInsertList.length>0) {
        for(let i=0;i<this.debitCreditInsertList.length;i++) {
        if(this.debitCreditInsertList[i].sentenceAdjustCode===null || this.debitCreditInsertList[i].sentenceAdjustCode === undefined) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidsenad.debitmustbeentered');
        this.show();
        return;
        }
        if(!this.debitCreditInsertList[i].days) {
        this.type = 'warn';
        this.message = this.translateService.translate('oidsenad.daysmustbeentered');
        this.show();
        return;
        }
        
        if(this.debitCreditInsertList[i].fromDate!=null && this.debitCreditInsertList[i].toDate!=null) {
        if(DateFormat.compareDate(DateFormat.getDate(this.debitCreditInsertList[i].toDate), DateFormat.getDate(this.debitCreditInsertList[i].fromDate))=== -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidsenad.fromdatecannotbegreaterthantodate');
                this.show();
                return;
            }
    
         }
        if(this.debitCreditInsertList[i].fromDate!=null && this.debitCreditInsertList[i].offenceDate!=null) {
        if(DateFormat.compareDate(DateFormat.getDate(this.debitCreditInsertList[i].fromDate), DateFormat.getDate(this.debitCreditInsertList[i].offenceDate))=== -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidsenad.adjustfromdatecannotbebeforeoffencedate');
                this.show();
                return;
            }
    
         }
        this.debitCreditInsertList[i].createDateTime = DateFormat.getDate();
        this.debitCreditInsertList[i].modifyDateTime = DateFormat.getDate();
        this.debitCreditInsertList[i].createUserId = this.sessionManager.getId();
        this.debitCreditInsertList[i].modifyUserId = this.sessionManager.getId();
        this.debitCreditInsertList[i].offenderBookId=this.offenderBookId;
        this.debitCreditInsertList[i].sentenceSeq=this.sentenceSeq;
        
       }}
        if( this.debitCreditUpdateList.length>0 ) {
            for ( let i = 0; i < this.debitCreditUpdateList.length; i++ ) {
                this.debitCreditUpdateList[i].offenderBookId = this.offenderBookId;
                this.debitCreditUpdateList[i].sentenceSeq=this.sentenceSeq;
                if(this.debitCreditUpdateList[i].sentenceAdjustCode===null || this.debitCreditUpdateList[i].sentenceAdjustCode === undefined) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidsenad.debitmustbeentered');
                    this.show();
                    return;
                    }
                    if(!this.debitCreditUpdateList[i].days) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidsenad.daysmustbeentered');
                    this.show();
                    return;
                    }
                    
                    if(this.debitCreditUpdateList[i].fromDate!=null && this.debitCreditUpdateList[i].toDate!=null) {
                    if(DateFormat.compareDate(DateFormat.getDate(this.debitCreditUpdateList[i].toDate), DateFormat.getDate(this.debitCreditUpdateList[i].fromDate))=== -1) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('oidsenad.fromdatecannotbegreaterthantodate');
                            this.show();
                            return;
                        }
                
                     }  
                    if(this.debitCreditUpdateList[i].fromDate!=null && this.debitCreditUpdateList[i].offenceDate!=null) {
                        if(DateFormat.compareDate(DateFormat.getDate(this.debitCreditUpdateList[i].fromDate), DateFormat.getDate(this.debitCreditUpdateList[i].offenceDate))=== -1) {
                                this.type = 'warn';
                                this.message = this.translateService.translate('oidsenad.adjustfromdatecannotbebeforeoffencedate');
                                this.show();
                                return;
                            }
                    
                         }
                    if(this.debitCreditUpdateList[i].postedDate!=null) {
                        this.debitCreditUpdateList[i].postedDate=DateFormat.getDate( this.debitCreditUpdateList[i].postedDate);
                            
                            }
                this.debitCreditUpdateList[i].createDateTime = DateFormat.getDate();
                this.debitCreditUpdateList[i].modifyDateTime = DateFormat.getDate();
                this.debitCreditUpdateList[i].createUserId = this.sessionManager.getId();
                this.debitCreditUpdateList[i].modifyUserId = this.sessionManager.getId();
               
            }
        }    
        this.adjustmentDetailsCommitModel.insertList = this.debitCreditInsertList;
        this.adjustmentDetailsCommitModel.updateList = this.debitCreditUpdateList;
        this.adjustmentDetailsCommitModel.deleteList = this.debitCreditDeleteList;
        const debitCreditSaveData = this.oidsenadService.insertDebitCreditRecord( this.adjustmentDetailsCommitModel );
        debitCreditSaveData.subscribe( debitCreditSaveResult => {
            if ( debitCreditSaveResult === 1 ) {
                 this.keyDatesDisable=false;
                this.launchSentenceCalcDialog();
               
                
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.show();
                return;
            }
        } );
}
        
        
        
        saveAdjustData(event){
           
            this.adjustInsertList=event.added;
            this.adjustUpdateList=event.updated;
            this.adjustDeleteList=event.removed;
            
           if(this.adjustInsertList.length > 0){            
                for(let i=0; i<this.adjustInsertList.length; i++){
                
                if(this.adjustInsertList[i].adjustFromDate === null || this.adjustInsertList[i].adjustFromDate === undefined){
                this.type = 'warn';
                this.message =this.translateService.translate('oidsenad.fromdatemustbeentered');                
                this.show();
                return;
            }
                
                if(!this.adjustInsertList[i].adjustDays){
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidsenad.daysmustbeentered');                
                    this.show();
                    return;
                }
                
                if(this.adjustInsertList[i].adjustFromDate > this.adjustInsertList[i].adjustToDate){
                    this.type = 'warn';
                    this.message = this.translateService.translate('oedsenad.fdate.less.todate');
                    this.show();
                    return;
                }
                
                if(this.adjustInsertList[i].adjustFromDate < this.vHeaderBlockModel.bookingBeginDate){
                    this.type = 'error';               
                    this.message = this.translateService.translate('oedsenad.fromdate.lt.bookdate');
                    this.show();
                    return;
                }           
                
                this.adjustInsertList[i].offenderBookId = this.selectedOffenderId;
                this.adjustInsertList[i].createDateTime = DateFormat.getDate();            
                this.adjustInsertList[i].createUserId=this.sessionManager.getId();           
            }
            }
            
            if(this.adjustUpdateList.length > 0){
                for(let i=0; i<this.adjustUpdateList.length; i++){
                
                if(this.adjustUpdateList[i].adjustFromDate === null || this.adjustUpdateList[i].adjustFromDate === undefined ){
                this.type = 'warn';
                this.message = this.translateService.translate('oidsenad.fromdatemustbeentered');               
                this.show();
                return;
            }
                
                if(!this.adjustUpdateList[i].adjustDays){
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidsenad.daysmustbeentered');               
                    this.show();
                    return;
                }
                
                if(this.adjustUpdateList[i].adjustFromDate > this.adjustUpdateList[i].adjustToDate){
                    this.type = 'warn';                
                    this.message = this.translateService.translate('oedsenad.fdate.less.todate');
                    this.show();
                    return;
                }
                
                if(this.adjustUpdateList[i].adjustFromDate < this.vHeaderBlockModel.bookingBeginDate){
                    this.type = 'warn';                
                    this.message = this.translateService.translate('oedsenad.fromdate.lt.bookdate');
                    this.show();
                    return;
                }  
                  
                    this.adjustUpdateList[i].createUserId=this.sessionManager.getId();
                    this.adjustUpdateList[i].modifyDateTime = DateFormat.getDate(); 
                    this.adjustUpdateList[i].modifyUserId=this.sessionManager.getId();
                }
            }
            
            if(this.adjustDeleteList.length > 0){
                    this.adjustCommitBean.deleteList = this.adjustDeleteList; 
            }  
                this.adjustCommitBean.insertList = this.adjustInsertList;
                this.adjustCommitBean.updateList = this.adjustUpdateList;                   
                
                const adjustSaveData = this.oidsenadService.updateAdjustRecord(this.adjustCommitBean);
                adjustSaveData.subscribe(eventSaveResult => { 
                  
                    if(eventSaveResult === 2){                        
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidsenad.child.record.exist');
                        this.show();
                        return;
                        }
                    
                    if(eventSaveResult === 1){
                        this.launchSentenceCalDialog();                      
                    }else{
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.show();
                        return;
                    }
                    
                  
                });
                    
                    
        }
                
                onAdjustGridInsert = () => {
                    return {
                        'adjustDate':DateFormat.getDate(),
                    }
                    
                }
                
                launchSentenceCalDialog() {
                    this.dialogService.openLinkDialog( '/OCUCALCR',this.vHeaderBlockModel, 80).subscribe( result => {
                        if ( result ) {
								//Call sentence Calcualation package
								this.sentenceCalc = result;
								this.sentenceCalc.offenderBookId = this.vHeaderBlockModel.offenderBookId;
								this.ocucalcrService.calExpDate(this.sentenceCalc).subscribe(calcResult=> {
									if(calcResult) {
										this.type = 'success';
	                                	this.populateAdjustGrid(this.selectedOffenderId);
	                                	this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
	                                	this.show();
	                            		return;
									}
									 
								});
                                               
                            }
                        else
                            {
                                this.dialogService.dialog.closeAll();                            
                            }
                        });
                }
}
   
