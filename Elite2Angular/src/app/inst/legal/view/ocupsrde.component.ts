import {
    Component,
    OnInit,ViewChild
} from '@angular/core';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DatePipe } from '@angular/common';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OcdccaseService } from "../service/ocdccase.service";
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { TranslateService } from '@common/translate/translate.service';
import { CourtReport } from "../beans/CourtReport";
import { OcupsrdeService } from "../service/ocupsrde.service";
import { AssignReport } from "../beans/AssignReport";
import { CourtReportCommitBean } from "../beans/CourtReportCommitBean";
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-ocupsrde',
    templateUrl: './ocupsrde.component.html',
  })
  export class OcupsrdeComponent implements OnInit {
    msglist=[];
    message = ' Invalid.';
    public selected=-1;
    disabled:boolean;
    type = 'error';
    msgs: any[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    functionTypeUrl:string;
    workflowId:number;
    eventId:number;
    comments:string;
    caseId:number;
    agyLocId:string;
    offenderBookId:number;
    areaTypeUrl:string;
    areaUrl:string;
    teamResponsibleUrl:string;
    staffDetailsUrl:string;
    staffDetailsUrlLov:string;
    hearingDate:any;
    courtDate:any;
    nextEventhearingDate:any;
    dateRequested:any;
    dueDate:any;
    preInsertedOrderId:number;
    statusDesc:string;
    insertedCourtDate:any;
    sysdate:any;
    reportColumndef:any[];
    assignReportColumndef:any[];
    courtReportData : CourtReport[] = [];
    assignReportdata :AssignReport[]=[];
    insertedCourtReport:CourtReport[] = [];
    courtAssignReport:CourtReport=new CourtReport();
    selectedCourtReport:CourtReport = new CourtReport();
    updatedCourtReportList:CourtReport[]=[];
    deletedcourtReportList:CourtReport[]=[];
    courtReportCommitBean: CourtReportCommitBean = new CourtReportCommitBean();
    staffTitles:any;
    remandsColumndefList:boolean=false;
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('reportGrid', { static: true }) reportGrid: any;
    disableSaveButton: boolean;
    moduleName : string;
    
constructor(private sessionManager: UserSessionManager,
        private OcdccaseFactory : OcdccaseService,
        private OcupsrdeFactory:OcupsrdeService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService){
    this.reportColumndef =[];
    this.assignReportColumndef=[];
    
}
    ngOnInit() {
        this.disabled = false;
        this.disableSaveButton = true;
        if ( this.dialog.data ) {}
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.functionTypeUrl='ocupsrde/populateFunctionType';
        this.reportColumndef = [
                                 {
                                     fieldName: this.translateService.translate('ocupsrde.reporttype'),
                                     field: 'reportType', editable:true, width: 200, datatype:'lov', link:'ocupsrde/populateReportType',source:'OIMCRTOR'
                      
                                 },
                                
                                 {
                                     fieldName: this.translateService.translate('ocupsrde.court'),
                                     field: 'agyLocId',editable:true, width: 150 , datatype:'lov', link:'ocuholds/populateCourtData',source:'OUMAGLOC'
                                 },
                                
                                 
                                 {
                                     fieldName: this.translateService.translate('ocupsrde.daterequested'),
                                     field: "dateRequested", editable:true, width: 180, datatype: 'date'
                                      
                                 },
                                                               
                                 {
                                     fieldName: this.translateService.translate('ocupsrde.datedue'),
                                     field: 'dueDate', editable:true, width: 150,  datatype: 'date'
                                 },
                                 
                                 {
                                     fieldName: this.translateService.translate('ocupsrde.dateofcompletion'),
                                     field: 'dateOfCompletion', editable:true,  width: 180,datatype:'date'
                                 },
                                 {
                                     fieldName: this.translateService.translate('ocupsrde.status'),
                                     field: 'status', domain:'PSR_STATUS', datatype:'lov',  editable:false, width: 180 
                                 },
                                 {
                                     fieldName: this.translateService.translate('ocupsrde.nr'),
                                     field: 'nonReportFlag', editable:true, width: 150 , datatype: 'checkbox'//, link:'ocuholds/populateHoldStatus'
                                 },
                                 { fieldName: '', field: 'comments', editable: false, width: 150, hide: true },
                                 
                             ];
              
    
        this.populateCourtReport();
        this.caseId=this.dialog.data.caseId;
        this.eventId=this.dialog.data.eventId;
        this.courtDate=this.dialog.data.eventDate;
        this.offenderBookId=this.dialog.data.offenderBookId;
        this.offenderBookId=this.dialog.data.offenderBookId;
        this.areaTypeUrl='ocupsrde/populateAreaType';
        
        this.staffTitles =  {lastName: 'GivenName', 
                            position: 'Position',
                            role: 'Role',
                            fromDate: 'From Date',
                            //teamMemberId:'Team Member Id'
                                };
        
    }
    
   //******* Function used to Fetch holds data ****
    populateCourtReport() {
        
        const courtReport = this.OcdccaseFactory.populateCourtReport(this.dialog.data.eventId);
        courtReport.subscribe( list => {
            
            for ( let i = 0; i < list.length; i++ ) {
                list[i].nr = list[i].nr === 'Y' ? true : false;
            }   
            this.courtReportData = list;
            this.selected=0;
            this.selectedCourtReport=list[0];
            this.courtAssignReport.comments=this.selectedCourtReport.comments;
            });
        }
    
    onRowCourtReportClick(event) {
       this.selectedCourtReport = event;
       this.courtAssignReport.comments=this.selectedCourtReport.comments;
    if (this.selectedCourtReport.orderId) {
        this.disableSaveButton = false;
    } else {
        this.disableSaveButton = true;
    }
       
    }
    onCommentTextInsert(event) {
		const index = this.courtReportData.indexOf(this.selectedCourtReport);
		this.reportGrid.setColumnData('comments', index, event);
    }
    
   
    onGridInsert = () =>  {
        const orderIdValue = this.OcupsrdeFactory.generateOrderId();
        orderIdValue.subscribe(value => {
        this.preInsertedOrderId=value;
        });  
        
        return {
            "agyLocId": this.dialog.data.agyLocId,
            "dateRequested": this.dialog.data.eventDate,
            "dueDate": this.dialog.data.nextEventDate,
            "status":"UN_ALLOCATED",
            
        }
    }
    
    getReportStatusDesciption(status) {
        const statusDesciption = this.OcupsrdeFactory.getStatusDesc(status);
        statusDesciption.subscribe(desc => {
            this.statusDesc=desc; 
        });
    }
    moduleChange(event){
        if(event){
            this.courtAssignReport.sourceName=event.code;
        }
        
    }
    onfnTypeChange(event) {
        this.courtAssignReport.teamId=null;
        this.courtAssignReport.workType=event.description;
        if(this.courtAssignReport.functionType && this.courtAssignReport.area) {
               this.areaCodeChange();
        }
    }
    
    areaTypeChange() {
        this.courtAssignReport.area = null;
        if (this.courtAssignReport.areaType) {
            this.areaUrl = 'ocupsrde/populateArea?areaType=' + this.courtAssignReport.areaType;
        }
    }
    
    areaCodeChange() {
         
        this.courtAssignReport.teamId=null;
        if (this.courtAssignReport.area) { 
            this.teamResponsibleUrl='ocupsrde/populateTeamResponsible?area='+this.courtAssignReport.area+'&category='+this.courtAssignReport.functionType;
        }
    }
    
    onTeamChange() {
        this.courtAssignReport.teamMemberId=null;
        if (this.courtAssignReport.teamId) {
            this.staffDetailsUrl='/ocupsrde/populateStaffDetails?teamId='+this.courtAssignReport.teamId;   
            this.staffDetailsUrlLov='/ocupsrde/populateStaffLovDetails?teamId='+this.courtAssignReport.teamId;
            }
    }
  
  // **this method is used to insert or update new record in holds*** 
  insertCourtReport(event){
      this.insertedCourtReport = event.added;
      this.updatedCourtReportList=  event.updated;
         
          
          for(let i=0;i<this.insertedCourtReport.length;i++) {
          if(this.insertedCourtReport[i].reportType===null || this.insertedCourtReport[i].reportType === undefined) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocupsrde.reporttypemustbeenter');
          this.show();
          return;
          }
          
          if(this.insertedCourtReport[i].agyLocId===null || this.insertedCourtReport[i].agyLocId === undefined) {
              this.type = 'warn';
              this.message = this.translateService.translate('ocupsrde.courtmustbeenter');
              this.show();
              return;
          }          
          if(this.insertedCourtReport[i].dateRequested==null || this.insertedCourtReport[i].dateRequested===undefined) {
              this.type = 'warn';
              this.message = this.translateService.translate('ocupsrde.daterequestmustbeenter');
              this.show();
              return;
          }          
          if(this.insertedCourtReport[i].dueDate==null || this.insertedCourtReport[i].dueDate===undefined) {
              this.type = 'warn';
              this.message = this.translateService.translate('ocupsrde.duedatemustbeenter');
              this.show();
              return;
          }
          if(this.insertedCourtReport[i].dateOfCompletion!=null && this.insertedCourtReport[i].dueDate!=null) {
              this.type = 'warn';
              this.message = this.translateService.translate('ocupsrde.duedateinsertionnootallowed');
              this.show();
              return;
          }
          if(this.insertedCourtReport[i].nbtReportStatus=="IN PROGRESS") {
              this.type = 'warn';
              this.message = this.translateService.translate('ocupsrde.insertionnotallowed');
              this.show();
              return;
          }
          if (this.caseId) {
              this.insertedCourtReport[i].caseId=this.caseId;
          }
          this.insertedCourtReport[i].eventId=this.eventId;
          this.insertedCourtReport[i].offenderBookId=this.offenderBookId;
          this.insertedCourtReport[i].orderId=this.preInsertedOrderId;
          const datePipe = new DatePipe('en-US');
          this.dateRequested = datePipe.transform(this.insertedCourtReport[i].dateRequested, 'yyyy/MM/dd');
          this.insertedCourtReport[i].dateRequested = new Date(this.dateRequested);
          this.dueDate = datePipe.transform(this.insertedCourtReport[i].dueDate, 'yyyy/MM/dd');
          this.insertedCourtReport[i].dueDate = new Date(this.dueDate);
          this.sysdate=DateFormat.getDate();
          if(this.insertedCourtReport[i].dueDate!=null && this.insertedCourtReport[i].dueDate < this.sysdate && this.insertedCourtReport[i].dueDate < this.insertedCourtReport[i].dateRequested ) {
              this.type = 'warn';
              this.message = this.translateService.translate('ocupsrde.dateduecannotbeearlierthancurrentdateanddateofrequested');
              this.show();
              return;
          }
          if(this.insertedCourtReport[i].dateRequested!=null && this.insertedCourtReport[i].dateRequested > this.sysdate) {
              this.type = 'warn';
              this.message = this.translateService.translate('ocupsrde.daterequestedcannotbegreaterthancurrentdate');
              this.show();
              return;
          }
          this.insertedCourtDate = datePipe.transform(this.courtDate, 'yyyy/MM/dd');
          this.insertedCourtReport[i].courtDate = new Date(this.insertedCourtDate);
          this.insertedCourtReport[i].createDateTime = DateFormat.getDate();
          this.insertedCourtReport[i].modifyDateTime = DateFormat.getDate();
          this.insertedCourtReport[i].createUserId=this.sessionManager.getId();
          this.insertedCourtReport[i].modifyUserId=this.sessionManager.getId();
          this.insertedCourtReport[i].nonReportFlag="N";
  }
          
      if(this.updatedCourtReportList.length>0) {
              for(let i=0;i<this.updatedCourtReportList.length;i++) {
              if(this.updatedCourtReportList[i].agyLocId!=null) {
              this.type = 'warn';
              this.message = this.translateService.translate('ocupsrde.fieldisprotectedagainstupdate');
              this.populateCourtReport();
              this.show();
              return;
          }          
          if(this.insertedCourtReport[i].dateRequested!=null) {
              this.type = 'warn';
              this.message = this.translateService.translate('ocupsrde.fieldisprotectedagainstupdate');
              this.populateCourtReport();
              this.show();
              return;
          }          
          if(this.insertedCourtReport[i].dueDate!=null) {
              this.type = 'warn';
              this.message = this.translateService.translate('ocupsrde.fieldisprotectedagainstupdate');
              this.populateCourtReport();
              this.show();
              return;
          }
          if(this.insertedCourtReport[i].dateOfCompletion!=null) {
              this.type = 'warn';
              this.message = this.translateService.translate('ocupsrde.fieldisprotectedagainstupdate');
              this.populateCourtReport();
              this.show();
              return;
          }
          if(this.insertedCourtReport[i].nbtReportStatus!=null) {
              this.type = 'warn';
              this.message = this.translateService.translate('ocupsrde.fieldisprotectedagainstupdate');
              this.populateCourtReport();
              this.show();
              return;
          }
              
              
              
              this.updatedCourtReportList[i].createDateTime = DateFormat.getDate();
              this.updatedCourtReportList[i].modifyDateTime = DateFormat.getDate();
              this.updatedCourtReportList[i].createUserId=this.sessionManager.getId();
              this.updatedCourtReportList[i].modifyUserId=this.sessionManager.getId();
              if (this.caseId) {
              this.updatedCourtReportList[i].caseId=this.caseId;
              }
              this.updatedCourtReportList[i].eventId=this.eventId;
              this.updatedCourtReportList[i].offenderBookId=this.offenderBookId;
              }
              }
               
      this.courtReportCommitBean.insertList = this.insertedCourtReport;
      //this.courtReportCommitBean.updateList = this.updatedCourtReportList;
      //this.courtReportCommitBean.deleteList = this.deletedcourtReportList;
              const isReportExist = this.OcupsrdeFactory.isReportExist(this.insertedCourtReport);
              isReportExist.subscribe(value=> {
                  if(value==true) {
                      this.type = 'warn';
                      this.message = this.translateService.translate('ocupsrde.reportdetailsalreadyexists');
                      this.show();
                      return;
                      }else {
      const affetedRows = this.OcupsrdeFactory.insertNewCourtReport(this.courtReportCommitBean);
      affetedRows.subscribe(value=>{ 
                  if (value === 1) {
                      this.type = 'success';
                      this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                      this.populateCourtReport();
                      this.show();
                      return;
                      } else {
                          this.type = 'error';
                          this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                          this.show();
                          return;
                          }
                 
      });
                      }
                  }); 
  }

onButtonSave() {
    if(this.selectedCourtReport.workflowId!=null) {
        this.type = 'error';
        this.message = this.translateService.translate('ocupsrde.assignreportdetailsalreadypresentforselectedreport');
        this.show();
        return;  
    }
    if(!this.courtAssignReport.sourceName) {
        this.type = 'warn';
        this.message = this.translateService.translate('osuntask.modulenamemust');
        this.show();
        return;  
    }
    this.courtAssignReport.dateRequested=this.selectedCourtReport.dateRequested;
    this.courtAssignReport.dueDate=this.selectedCourtReport.dueDate;
    this.courtAssignReport.orderId=this.selectedCourtReport.orderId;
    this.courtAssignReport.offenderId=this.vHeaderBlockModel.offenderId;
    this.courtAssignReport.offenderBookId=this.offenderBookId;
    this.courtAssignReport.assignmentDate=new Date();
    this.courtAssignReport.assignmentDate=new Date();
    const datePipe = new DatePipe('en-US');
    this.dateRequested = datePipe.transform(this.selectedCourtReport.dateRequested, 'yyyy/MM/dd');
    this.courtAssignReport.dateRequested = new Date(this.dateRequested);
    this.dueDate = datePipe.transform(this.selectedCourtReport.dueDate, 'yyyy/MM/dd');
    this.courtAssignReport.dueDate = new Date(this.dueDate);
    this.courtAssignReport.createUserId = this.sessionManager.getId();
    
    const insertassigneeFlag = this.OcupsrdeFactory.insertAssignReport(this.courtAssignReport);
    insertassigneeFlag.subscribe(flag=> {
        if(flag==1) {
            this.type = 'success';
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.populateCourtReport();
            this.courtAssignReport= new CourtReport();
            this.show();
            return;
        }else {
            this.type = 'error';
            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
            this.show();
            return;
        }
       
    });
}
  

show() {
      this.msglist = [];
      this.msglist.push({ message: this.message, type: this.type });
      this.msgs = [...this.msglist];
      }
    
cancel(): void {
    let orderRequestedFlag = false;
    if(this.courtReportData != null && this.courtReportData.length > 0) {
        orderRequestedFlag = true;
    } 
    this.dialog.close({
        orderRequestedFlag: orderRequestedFlag,
    });
  }


 /*  get disableSaveButton () {
      if (this.selectedCourtReport.createDateTime) {
          return false;
      } else {
        return true;
      }
  } */
}
