import {
    Component,
    OnInit,ViewChild
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
//import { DatePipe } from '@angular/common';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OcdccaseService } from "../service/ocdccase.service";
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ActivatedRoute } from '@angular/router';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Images } from "@commonbeans/Images";
import { OidhwdetService } from "../service/oidhwdet.service";
import { HoldWarrentDetainer } from "../beans/HoldWarrentDetainer";
import { HoldWarrentDetainerCommitBean } from "../beans/HoldWarrentDetainerCommitBean";
import { Charges } from "../beans/Charges";
import { HoldWarrentDetainerChargesCommitBean } from "../beans/HoldWarrentDetainerChargesCommitBean";
import { HoldsWarantsHistory } from "../beans/HoldsWarantsHistory";
import { HoldsWarantsHistoryCommitBean } from "../beans/HoldsWarantsHistoryCommitBean";
import { OcdlegloService } from '../service/ocdleglo.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';




@Component( {
    selector: 'app-oidhwdet',
    templateUrl: './oidhwdet.component.html',
    styleUrls: ['./oidhwdet.component.scss']

} )
export class OidhwdetComponent implements OnInit {
    @ViewChild('hwdGrid', {static: true}) hwdGrid: any;
    message = ' Invalid.';
    type = 'error';
    disabled: boolean;
    msglist = [];
    msgs: any[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    hwDetColumndef: any[];
    chargesColumndef: any[];
    historyColumndef:any[];
    hwdData : HoldWarrentDetainer[] = [];
    public selected = -1; 
    public selectedHistory=-1;
    imageModel: Images = new Images();
    insertedHwDetDataList : HoldWarrentDetainer []= [];
    updatedHwDetDataList : HoldWarrentDetainer []= [];
    deletedHwDetDataList : HoldWarrentDetainer []= [];   
    startDate:string;
    expDate:string;
    sysdate:Date;
    receivedDate:any;
    hwDetChargesData:Charges []=[];
    historyData: HoldsWarantsHistory []=[];
    hwDetChargesInsertList:Charges []=[];
    hwDetChargesUpdateList:Charges []=[];
    hwDetChargesDeleteList:Charges []=[];
    historyInsertList:HoldsWarantsHistory []=[];
    historyUpdateList:HoldsWarantsHistory []=[];
    historyDeleteList:HoldsWarantsHistory []=[];
    historyCommitBean:HoldsWarantsHistoryCommitBean = new HoldsWarantsHistoryCommitBean();   
    hwDetCommitBean: HoldWarrentDetainerCommitBean = new HoldWarrentDetainerCommitBean();
    hwDetChargesCommitBean: HoldWarrentDetainerChargesCommitBean = new HoldWarrentDetainerChargesCommitBean();
    selectedHWDetRecord:HoldWarrentDetainer = new HoldWarrentDetainer();
    historyGridShow:boolean=false;
    holdWarrentId:number;
    enableInsert: boolean;
    deleteOrderFlag: boolean = false;
    deleteWarrent = [];
    chargeInsert: boolean = false;
    historyInsert: boolean = false;
    chargeDelete: boolean = false;
    historyDelete: boolean = false;
    screenId = 'OIDHWDET';
    resetGrid:boolean = true;
    constructor(private OcdccaseFactory : OcdccaseService,
            private OidhwdetFactory : OidhwdetService,
            private offenderSearchService: OffenderSearchService,
            public translateService: TranslateService,
            private sessionManager: UserSessionManager,
            private activatedRoute: ActivatedRoute,
            private osiosearchService: OsiosearService,
            private ocdlegloFactory: OcdlegloService,
            private dialogService: DialogService
          ) {
            this.insertedHwDetDataList=[];
            this.hwDetChargesInsertList=[];
            }
    ngOnInit() {
        this.getStaffRoleDetails();
        this.disabled=false;
        this.enableInsert = false;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;  
        this.hwDetColumndef = [
                                 {
                                     fieldName: this.translateService.translate('oidhwdet.daterecieved'),
                                     field: 'receivedDate', editable: true, width: 160,datatype:'date'
                      
                                 },
                                 {
                                     fieldName: this.translateService.translate('oidhwdet.agency'),
                                     field: 'issuingAgyLocId', domain:'HWD_AGENCY',editable: true, width: 180, datatype:'lov'//, link:'ocdcCases/populateCourtData'
                                 },
                                 {
                                     fieldName: this.translateService.translate('oidhwdet.type'),
                                     field: 'holdWarrentDetainerType',domain:'HWD_TYPE', editable: true, width: 150, datatype: 'lov'//, domain: 'LEG_CASE_TYP'
                                      
                                 },
                                 
                                                    
                                 {
                                     fieldName: this.translateService.translate('oidhwdet.warrentnumber'),
                                     field: "warrentNumber", editable: true, width: 130, maxlength:13
                                      
                                 },
                                    
                                 {
                                     fieldName: this.translateService.translate('oidhwdet.startdate'),
                                     field: 'startDate', editable: true, width: 160,datatype:'date'
                      
                                 },
                                 
                                 {
                                     fieldName: this.translateService.translate('oidhwdet.expirydate'),
                                     field: 'expiryDate', editable: true, width: 160,datatype:'date'
                      
                                 },
                                 
                                 {
                                     fieldName:this.translateService.translate('oidhwdet.bailamount'), datatype:'number', strictFP: true, whole: true,
                                     field: 'bailAmount',  editable: true, required: true, width: 180,
                                 },
                                 
                                 {
                                     fieldName: this.translateService.translate('oidhwdet.probationrevocation'),
                                     field: 'probRevocFlag', editable: true, width: 140,datatype:'checkbox'
                                 },
                                 
                                
                                 {
                                     fieldName: this.translateService.translate('oidhwdet.status'),
                                     field: 'holdWarrentDetainerTypeInfoIdStatus', domain:'HWD_STATUS', editable: true, width: 150,datatype:'lov'
                                 },  
                                 {
                                    fieldName: this.translateService.translate('common.iwpdocument')
                                    , field: 'butIwp', datatype: 'hyperlink',link: '/EOFFENDER',
                                    editable: true, displayas: 'href', styleClass: 'file_copy',
                                    width: 50, data: 'row', updateField: 'row', modal: false,queryparam: 'SCREEN'
                                },                            
                                 
                             ];
        
        this.chargesColumndef = [
                               {
                                   fieldName: this.translateService.translate('oidhwdet.charge'),
                                   field: 'chargeCode',domain:'HWD_CHARGES', editable: true, required: true, width: 180,datatype:'lov'
                               },
                               {
                                   fieldName: this.translateService.translate('oidhwdet.comment'),
                                   field: 'chargeComment', editable: true, width: 240,
                               },
                               {
                                   fieldName: this.translateService.translate('oidhwdet.trieduntried'),
                                   field: 'triedUntried', domain:'HWD_TRIED',editable: true, width: 150,datatype:'lov'
                               },
                               {
                                   fieldName: this.translateService.translate('oidhwdet.status'),
                                   field: 'chargeStatus',domain:'HWD_CHRG_STS', editable: true, width: 170,datatype:'lov'
                               },
                               
                             ];
        this.historyColumndef = [
                                 
                                 {
                                     fieldName: this.translateService.translate('ocdccases.date'),
                                     field: 'eventDateTime', editable: true, width: 100,datatype:'date'
                                 },
                                 {
                                     fieldName: this.translateService.translate('ocdccases.time'),
                                     field: 'eventTime', editable: true, width: 100,datatype:'time'
                                 },
                                 {
                                     fieldName: this.translateService.translate('oidhwdet.event'),
                                     field: 'eventType', editable: true, width: 130, datatype:'lov', domain : 'HWD_EVENT'
                                 },                                
                                 {
                                     fieldName: this.translateService.translate('ocdccases.comment'),
                                     field: 'eventComment', editable: true, width: 130
                                 },
                             
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
             this.getBailMandatoryFlag();
        }
   

    /*
    * Calling function to populate data in grid when offender changes
    */
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        this.holdWarrentId = undefined;
        // this.enableInsert = true;
        if (offender) {
            this.enableInsert = true;
            this.hwdData = [];
            this.hwDetChargesData=[];
            this.historyData=[];
            this.oidhwdetExecuteQuery();
            } else {
                this.enableInsert = false;
                this.hwdData = [];
                this.hwDetChargesData=[];
                this.historyData=[];
                this.chargeInsert = false;
                this.historyInsert = false;
                this.chargeDelete = false;
                this.historyDelete = false;
                }
        }
    
    /*
     * To populate data in Court Case grid and correspondingly to Court Event Grid
     * */
    oidhwdetExecuteQuery() {
        this.chargeInsert = false;
        this.historyInsert = false;
        this.chargeDelete = false;
        this.historyDelete = false;
        if (this.vHeaderBlockModel.offenderBookId != null) {
            const searchhwDet = this.OidhwdetFactory.searchHoldWarrentDetainer(this.vHeaderBlockModel.offenderBookId);
            searchhwDet.subscribe(list=> {
                for ( let i = 0; i < list.length; i++ ) {
                    list[i].probRevocFlag = list[i].probRevocFlag === 'Y' ? true : false;
                    list[i]['butIwp']='';
                    list[i]['SCREEN'] = this.screenId + "~" + "true" + "~" + list[i]['holdWarrentDetainerId'];
			

                }
                this.hwdData = list;
                this.selected=0;
                if(list.length==0)
                    return;
                else {
                    }  
               });
        }        
  }
    onRowClickHoldWarrent(event) {
        this.selectedHWDetRecord = event;
        this.holdWarrentId = event.holdWarrentDetainerId;
        if(event != null && event.holdWarrentDetainerId!=null) {
            this.populateChargesData(event.holdWarrentDetainerId);
            this.populateHistoryData(event.holdWarrentDetainerId);
            this.chargeInsert = true;
            this.historyInsert = true;
            this.chargeDelete = true;
            this.historyDelete = true;
        } else {
            this.hwDetChargesData=[];
            this.historyData=[];
            this.chargeInsert = false;
            this.historyInsert = false;
            this.chargeDelete = false;
            this.historyDelete = false;
        }
       this.startTab();
   }
   
    /*
     * 
     *To populate Court Event Data with respect to clicked Court Case 
     * */
    populateChargesData(holdWarrentDetainerId) {
        const chargesData = this.OidhwdetFactory.searchCharges(holdWarrentDetainerId);
        chargesData.subscribe(chargesList=> {
            if(holdWarrentDetainerId == this.selectedHWDetRecord.holdWarrentDetainerId){
                this.hwDetChargesData=chargesList;
                this.selected=0;
            } else {
                this.hwDetChargesData=[];
            }
           });
    }
   
    /**
     * Populate History data
     */
    
    populateHistoryData(holdWarrentDetainerId) {  
        const chargesData = this.OidhwdetFactory.getHistory(holdWarrentDetainerId);
        chargesData.subscribe(historyList=> {      
            if(holdWarrentDetainerId == this.selectedHWDetRecord.holdWarrentDetainerId){
                this.historyData=historyList;
                for (let i = 0; i < this.historyData.length; i++) { 
                    this.historyData[i].eventTime = this.historyData[i].eventDateTime;
                }
                this.selectedHistory=0;   
            } else {
                this.historyData = [];
            }
           });
        
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
        
        if(processName === "Process1"){           
            this.populateChargesData(this.holdWarrentId);
        }
        
        if(processName === "Process2"){           
            this.populateHistoryData(this.holdWarrentId);
        }
        return false;
    }
    
    insertHoldWarrentDetainer(event){
        this.insertedHwDetDataList = event.added;
        this.updatedHwDetDataList = event.updated;
        this.deletedHwDetDataList = event.removed;
          if(this.insertedHwDetDataList.length > 0) {
              for(let i=0;i<this.insertedHwDetDataList.length;i++) {
              if(this.insertedHwDetDataList[i].receivedDate===null || this.insertedHwDetDataList[i].receivedDate === undefined) {
              this.type = 'warn';
              this.message = this.translateService.translate('oidhwdet.receiveddatemustbeenter');
              this.show();
              return;
                    }
              
              if(this.insertedHwDetDataList[i].issuingAgyLocId===null || this.insertedHwDetDataList[i].issuingAgyLocId === undefined) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('oidhwdet.agencymustbeenter');
                  this.show();
                  return;
                     }          
              if(this.insertedHwDetDataList[i].holdWarrentDetainerType==null || this.insertedHwDetDataList[i].holdWarrentDetainerType===undefined) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('oidhwdet.typemustbeenter');
                  this.show();
                  return;
                       }     
             
              if(this.insertedHwDetDataList[i].startDate!=null && this.insertedHwDetDataList[i].expiryDate!=null) {
                  if(DateFormat.compareDate(DateFormat.getDate(this.insertedHwDetDataList[i].startDate), DateFormat.getDate(this.insertedHwDetDataList[i].expiryDate))===1) {
                          this.type = 'warn';
                          this.message = this.translateService.translate('oidhwdet.expirydatecannotbebeforestartdate');
                          this.show();
                          return;
                      }
              
                   }
              
              if(this.insertedHwDetDataList[i].startDate!=null && this.insertedHwDetDataList[i].expiryDate!=null) {
              if(DateFormat.compareDate(DateFormat.getDate(this.insertedHwDetDataList[i].expiryDate), DateFormat.getDate(this.insertedHwDetDataList[i].startDate))=== -1) {
                      this.type = 'warn';
                      this.message = this.translateService.translate('oidhwdet.expirydatecannotbebeforestartdate');
                      this.show();
                      return;
                  }
          
               }
              
              this.insertedHwDetDataList[i].offenderBookId=this.vHeaderBlockModel.offenderBookId;
              const datePipe = new DatePipe('en-US');
              if(this.startDate!=null)
              {
              this.startDate = datePipe.transform(this.insertedHwDetDataList[i].startDate, 'yyyy/MM/dd');
              this.insertedHwDetDataList[i].startDate = new Date(this.startDate);
          }
              if(this.expDate!=null)
              {
              this.expDate = datePipe.transform(this.insertedHwDetDataList[i].expiryDate, 'yyyy/MM/dd');
              this.insertedHwDetDataList[i].expiryDate = new Date(this.expDate);
          }
              this.sysdate=DateFormat.getDate();
              if(this.insertedHwDetDataList[i].expiryDate!=null && (this.insertedHwDetDataList[i].expiryDate < this.insertedHwDetDataList[i].startDate)) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('ocupsrde.expirydatecannotbeearlierthanstartdate');
                  this.show();
                  return;
                          }
              if(this.insertedHwDetDataList[i].startDate!=null && this.insertedHwDetDataList[i].startDate > this.sysdate) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('ocupsrde.startdatecannotbegreaterthancurrentdate');
                  this.show();
                  return;
                          }
              if(this.insertedHwDetDataList[i].startDate!=null && this.insertedHwDetDataList[i].expiryDate!=null) {
                  if(DateFormat.compareDate(DateFormat.getDate(this.insertedHwDetDataList[i].startDate), DateFormat.getDate(this.insertedHwDetDataList[i].expiryDate))===1) {
                          this.type = 'warn';
                          this.message = this.translateService.translate('oidhwdet.expirydatecannotbebeforestartdate');
                          this.show();
                          return;
                      }
              
                   }
              
              if(this.insertedHwDetDataList[i].startDate!=null && this.insertedHwDetDataList[i].expiryDate!=null) {
                  if(DateFormat.compareDate(DateFormat.getDate(this.insertedHwDetDataList[i].expiryDate), DateFormat.getDate(this.insertedHwDetDataList[i].startDate))=== -1) {
                      this.type = 'warn';
                      this.message = this.translateService.translate('oidhwdet.expirydatecannotbebeforestartdate');
                      this.show();
                      return;
                  }
              }

              if ( Number(this.insertedHwDetDataList[i].bailAmount) < 0 ) {
                      this.type = 'warn';
                      this.message = this.translateService.translate('oidhwdet.mustbepossitiveinteger');
                      this.show();
                      return null;
                }

              this.insertedHwDetDataList[i].createDateTime = DateFormat.getDate();
              this.insertedHwDetDataList[i].modifyDateTime = DateFormat.getDate();
              this.insertedHwDetDataList[i].createUserId=this.sessionManager.getId();
              this.insertedHwDetDataList[i].modifyUserId=this.sessionManager.getId();
                      }
                  }
        if(this.updatedHwDetDataList.length>0) {
            
            for(let i=0;i<this.updatedHwDetDataList.length;i++) {
            if(this.updatedHwDetDataList[i].receivedDate===null || this.updatedHwDetDataList[i].receivedDate === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidhwdet.receiveddatemustbeenter');
            this.show();
            return;
                  }
            
            if(this.updatedHwDetDataList[i].issuingAgyLocId===null || this.updatedHwDetDataList[i].issuingAgyLocId === undefined) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidhwdet.agencymustbeenter');
                this.show();
                return;
                   }          
            if(this.updatedHwDetDataList[i].holdWarrentDetainerType==null || this.updatedHwDetDataList[i].holdWarrentDetainerType===undefined) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidhwdet.typemustbeenter');
                this.show();
                return;
                     }
            if(this.updatedHwDetDataList[i].receivedDate!=null) {
            this.updatedHwDetDataList[i].receivedDate=DateFormat.getDate( this.updatedHwDetDataList[i].receivedDate);
                
                }
            if(this.updatedHwDetDataList[i].startDate!=null) {
            this.updatedHwDetDataList[i].startDate=DateFormat.getDate( this.updatedHwDetDataList[i].startDate);
                
                }
            if(this.updatedHwDetDataList[i].expiryDate!=null) {
            this.updatedHwDetDataList[i].expiryDate=DateFormat.getDate( this.updatedHwDetDataList[i].expiryDate);
                
                }
            
            if(this.updatedHwDetDataList[i].startDate!=null && this.updatedHwDetDataList[i].expiryDate!=null) {
                if(DateFormat.compareDate(DateFormat.getDate(this.updatedHwDetDataList[i].startDate), DateFormat.getDate(this.updatedHwDetDataList[i].expiryDate))===1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidhwdet.expirydatecannotbebeforestartdate');
                    this.show();
                    return;
                }
        
             }
            
            if(this.updatedHwDetDataList[i].startDate!=null && this.updatedHwDetDataList[i].expiryDate!=null) {
                if(DateFormat.compareDate(DateFormat.getDate(this.updatedHwDetDataList[i].expiryDate), DateFormat.getDate(this.updatedHwDetDataList[i].startDate))=== -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidhwdet.expirydatecannotbebeforestartdate');
                this.show();
                return;
                }
            }
                       
            if ( Number(this.updatedHwDetDataList[i].bailAmount) < 0 ) {
                 this.type = 'warn';
                 this.message = this.translateService.translate('oidhwdet.mustbepossitiveinteger');
                 this.show();
                 return null;
            }
        
            this.updatedHwDetDataList[i].modifyDateTime=DateFormat.getDate();
            this.updatedHwDetDataList[i].modifyUserId=this.sessionManager.getId();
            }
        }
            
        if(this.deleteWarrent.length>0){
            this.deleteWarrent.forEach(ele => {
                this.deletedHwDetDataList.push(ele);
            })
        }
        this.hwDetCommitBean.insertList = this.insertedHwDetDataList;
        this.hwDetCommitBean.updateList = this.updatedHwDetDataList;
        this.hwDetCommitBean.deleteList = this.deletedHwDetDataList;
        const affetedRows = this.OidhwdetFactory.insertHwDetData(this.hwDetCommitBean);
        affetedRows.subscribe(value=>{ 
                    if (value === 1) {
                        this.type = 'success';
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.oidhwdetExecuteQuery();
                        this.show();
                        return;
                        } else {
                            this.type = 'error';
                            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                            this.oidhwdetExecuteQuery();
                            this.show();
                            return;
                            }
                    });               
          }
        onGridInsert = () => {
            this.hwDetChargesData=[];
            return {
                holdWarrentDetainerTypeInfoIdStatus:'A',
                receivedDate:DateFormat.getDate(),
                }
            }
    inserthwDetChargesRecords(event) {
        this.hwDetChargesInsertList = event.added;
        this.hwDetChargesUpdateList = event.updated;
        this.hwDetChargesDeleteList = event.removed;
        if(this.hwDetChargesInsertList.length > 0) {
            for(let i=0;i<this.hwDetChargesInsertList.length;i++) {
            if(this.hwDetChargesInsertList[i].chargeCode===null || this.hwDetChargesInsertList[i].chargeCode === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidhwdet.chargemustbeenter');
            this.show();
            return;
                  }
            
            this.hwDetChargesInsertList[i].holdWarrentDetainerId=this.selectedHWDetRecord.holdWarrentDetainerId;  // TO GET HWD ID
            this.hwDetChargesInsertList[i].createDateTime = DateFormat.getDate();
            this.hwDetChargesInsertList[i].modifyDateTime = DateFormat.getDate();
            this.hwDetChargesInsertList[i].createUserId=this.sessionManager.getId();
            this.hwDetChargesInsertList[i].modifyUserId=this.sessionManager.getId();
                    }
          }
            
            
       if(this.hwDetChargesUpdateList.length > 0) {
                for(let i=0;i<this.hwDetChargesUpdateList.length;i++) {
                if(this.hwDetChargesUpdateList[i].chargeCode===null || this.hwDetChargesUpdateList[i].chargeCode === undefined) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidhwdet.chargemustbeenter');
                this.show();
                return;
                      }
                this.hwDetChargesUpdateList[i].modifyDateTime = DateFormat.getDate();
                this.hwDetChargesUpdateList[i].modifyUserId=this.sessionManager.getId();
                   }
              }    
              if(this.hwDetChargesDeleteList.length > 0) {
              }
        this.hwDetChargesCommitBean.insertList = this.hwDetChargesInsertList;
        this.hwDetChargesCommitBean.updateList = this.hwDetChargesUpdateList;
        this.hwDetChargesCommitBean.deleteList = this.hwDetChargesDeleteList;        
        const affetedRows = this.OidhwdetFactory.insertUpdateDeleteHwdetCharges(this.hwDetChargesCommitBean);
        affetedRows.subscribe(value=>{
                    if (value === 1) {
                        this.type = 'success';
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.hwDetChargesInsertList=[];
                        this.populateChargesData(this.selectedHWDetRecord.holdWarrentDetainerId);
                        this.show();
                        return;
                        } else {
                            this.type = 'error';
                            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                            this.hwDetChargesInsertList=[];
                            this.populateChargesData(this.selectedHWDetRecord.holdWarrentDetainerId);
                            this.show();
                            return;
                            }
                    });
                }
            
    saveHistoryDetails(event){
        this.historyInsertList = event.added;
        this.historyUpdateList = event.updated;
        this.historyDeleteList = event.removed;
        if(this.historyInsertList.length > 0){
            for(let i=0; i<this.historyInsertList.length; i++){
            if(this.historyInsertList[i].eventDateTime===null || this.historyInsertList[i].eventDateTime === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidhwdet.datemustbeenter');
            this.show();
            return;
            }
            if(this.historyInsertList[i].eventTime===null || this.historyInsertList[i].eventTime === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidhwdet.datemustbeenter');
            this.show();
            return;
            }
            
            if(this.historyInsertList[i].eventType===null || this.historyInsertList[i].eventType === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidhwdet.eventmustbeenter');
            this.show();
            return;
            }
            const datePipe = new DatePipe('en-US');
            const nextEventTime = datePipe.transform( this.historyInsertList[i].eventTime, 'HH:mm' );
            const nextEventDateString = datePipe.transform( this.historyInsertList[i].eventDateTime, 'yyyy/MM/dd' );
            const nextEventHearingTime = new Date( nextEventDateString + ' ' + nextEventTime );
            this.historyInsertList[i].eventDateTime = nextEventHearingTime;
            
            this.historyInsertList[i].holdWarrentId=this.selectedHWDetRecord.holdWarrentDetainerId;  // TO GET HWD ID
            this.historyInsertList[i].createDateTime = DateFormat.getDate();
            this.historyInsertList[i].modifyDateTime = DateFormat.getDate();
            this.historyInsertList[i].createUserId=this.sessionManager.getId();
            this.historyInsertList[i].modifyUserId=this.sessionManager.getId();                    
            }
        }
           
            if(this.historyUpdateList.length > 0){
                for(let i=0; i<this.historyUpdateList.length; i++){          
                if(this.historyUpdateList[i].eventDateTime===null || this.historyUpdateList[i].eventDateTime === undefined) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidhwdet.datemustbeenter');
                this.show();
                return;
                }
                if(this.historyUpdateList[i].eventTime===null || this.historyUpdateList[i].eventTime === undefined) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidhwdet.datemustbeenter');
                this.show();
                return;
                }
                if(this.historyUpdateList[i].eventType===null || this.historyUpdateList[i].eventType === undefined) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidhwdet.eventmustbeenter');
                this.show();
                return;
                }
                
                const datePipe = new DatePipe('en-US');
                const nextEventTime = datePipe.transform( this.historyUpdateList[i].eventTime, 'HH:mm' );
                const nextEventDateString = datePipe.transform( this.historyUpdateList[i].eventDateTime, 'yyyy/MM/dd' );
                const nextEventHearingTime = new Date( nextEventDateString + ' ' + nextEventTime );
                this.historyUpdateList[i].eventDateTime = nextEventHearingTime;
                              
                this.historyUpdateList[i].modifyDateTime = DateFormat.getDate();
                this.historyUpdateList[i].modifyUserId=this.sessionManager.getId();
            }
            }
            
                if(this.historyDeleteList.length > 0){
                    
                }
            
            this.historyCommitBean.insertList = this.historyInsertList;
            this.historyCommitBean.updateList = this.historyUpdateList;
            this.historyCommitBean.deleteList = this.historyDeleteList;
            
            const affetedRows = this.OidhwdetFactory.insertUpdateDeleteHistoryRecord(this.historyCommitBean);
            affetedRows.subscribe(value=>{                        
                if (value === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.historyInsertList=[];
                    this.populateHistoryData(this.selectedHWDetRecord.holdWarrentDetainerId);
                    this.show();
                    return;
                    } else {
                        this.type = 'error';
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.historyInsertList=[];
                        this.populateHistoryData(this.selectedHWDetRecord.holdWarrentDetainerId);
                        this.show();
                        return;
                        }
            });
        }
            
            onHistoryInsert = () => {
                return {           
                    eventDateTime : DateFormat.getDate(),
                    eventTime: DateFormat.getDate(),
                    historyTime : DateFormat.getDate().getTime(),
                } 
            
            }
    
    getStaffRoleDetails() {
        this.ocdlegloFactory.getDeleteFlag('DEL_HWD').subscribe(data => {
            if (data && data == 'Y') {
                this.deleteOrderFlag = true;
            }
        });
    }

    onGridDelete = (row) => {
        if (this.historyData.length > 0 || this.hwDetChargesData.length > 0) {
            const data = {
                label: this.translateService.translate('oidhwdet.containschildrecords'), yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                if (result) {
                    this.holdWarrentId = undefined;
                    this.hwdGrid.gridOptions.api.applyTransaction({ remove: row });
                    this.hwdGrid.btnClearbtnDisable = false;
                    this.hwdGrid.btnSavebtnDisable = false;
                    this.historyData = [];
                    this.hwDetChargesData = [];
                    const index = this.hwdData.indexOf(row[0]);
                    this.hwdData.splice(index, 1);
                    this.deleteWarrent.push(row[0]);
                    if(this.hwdData.length==0){
                        this.historyInsert = false;
                        this.chargeInsert = false;
                    }
                } else {
                    return false;
                }
            })
        } else {
            if(this.hwdData.length==1){
                this.historyInsert = false;
                this.chargeInsert = false;
            }
            return  true;
        }
    }

    holdWarrantClear = () => {
        this.oidhwdetExecuteQuery();
        return true;
    }

    getBailMandatoryFlag() {
        this.OidhwdetFactory.getBailMandatorySetting("BAMHWD").subscribe(data => {
            let index = this.hwDetColumndef.findIndex( i => i.field == 'bailAmount')
            if (data === 'YES') {
                this.hwDetColumndef[index]['required'] = true;
            } else {
                this.hwDetColumndef[index]['required'] = false;
            }
            this.resetGrid = false;
            setTimeout(() => {
                this.resetGrid = true;
            }, 0);
        });
    }
    
 }