import {
    Component,
    OnInit,ViewChild
} from '@angular/core';
import { Holds } from "../beans/Holds";
import { HoldsCommitBean } from "../beans/HoldsCommitBean";
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OcdccaseService } from "../service/ocdccase.service";
import { OrderType } from "../beans/OrderType";
import { OcuholdsService } from "../service/ocuholds.service";
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-ocuholds',
    templateUrl: './ocuholds.component.html',
    styleUrls: []
  })
  export class OcuholdsComponent implements OnInit {
    msglist=[];
    message = ' Invalid.';
    disabled:boolean;
    type = 'error';
    msgs: any[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    remandsColumndef:any[];
    holdDataModel : Holds = new Holds();
    holdData : Holds[] = [];
    orderType: OrderType[] = [];
    holdeCommitBean: HoldsCommitBean = new HoldsCommitBean();
    remandsColumndefList:boolean=false;
    insertedHoldData : Holds[] = [];
    updatedHoldData : Holds[] = [];
    deletedHoldList: Holds[] = [];
    custodyDays: number;
    delresponse:number;
    id:string;
    caseId:number;
    eventId:number;
    offenderBookId:number;
    public selected = -1;
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    
constructor(private sessionManager: UserSessionManager,
        private OcdccaseFactory : OcdccaseService,
        private OcuholdsFactory:OcuholdsService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService){
    this.remandsColumndef =[];
    
}
    ngOnInit() {
        this.disabled = false;
        if ( this.dialog.data ) {}
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.insertedHoldData = [];
        this.updatedHoldData =[];
        this.deletedHoldList =[];
        if ( this.dialog.data ) {}
        this.remandsColumndef = [
                                 {
                                     fieldName: this.translateService.translate('ocuholds.ordertype'),
                                     cellEditable: this.canOrderEdit,field: 'orderType', editable:true, width: 150, datatype:'lov', link:'ocuholds/orderType',source:'OCUHOLDS'
                      
                                 },
                                
                                 {
                                     fieldName: this.translateService.translate('ocuholds.court'),datatype: 'lov', link:'ocuholds/populateCourtData',
                                     field: 'issuingAgyLocId',editable:false, width: 180
                                 },
                                
                                 
                                 {
                                     fieldName: this.translateService.translate('ocuholds.orderdate'),
                                     field: "orderDate", editable:false, width: 150, datatype: 'date'
                                      
                                 },
                                                               
                                 {
                                     fieldName: this.translateService.translate('ocuholds.expirydate'),
                                     field: 'expiryDate', editable:false, width: 150,  datatype: 'date'
                                 },
                                 
                                 {
                                     fieldName: this.translateService.translate('ocuholds.comment'),
                                     field: 'commentText', editable:true, uppercase: 'false', width: 150,datatype:'text'
                                 },
                                 {
                                     fieldName: this.translateService.translate('ocuholds.orderstatus'),
                                     field: 'orderStatus', editable:true, width: 150 , datatype: 'lov',/* link:'ocuholds/populateHoldStatus'*/domain:'HOLD_STATUS'
                                 },
                                 
                             ];
    
        this.populateHoldsData();
        this.caseId=this.dialog.data.caseId;
        this.eventId=this.dialog.data.eventId;
        this.offenderBookId=this.dialog.data.offenderBookId;
    }
    
   //******* Function used to Fetch holds data ****
    populateHoldsData() {
        const holdData = this.OcdccaseFactory.populateHoldsData(this.dialog.data.eventId);
        holdData.subscribe( list => {
            this.holdData = list;
            this.remandsColumndefList = true;
            this.selected=0;
        } );
    } 
    
    onGridInsert = () =>  {
        return {
            "issuingAgyLocId": this.dialog.data.agyLocId,
            "orderDate": this.dialog.data.eventDate,
            "orderStatus": "A",
        }
    }
  
  // **this method is used to insert or update new record in holds*** 
  insertHoldData(event){
      this.insertedHoldData= event.added;
      this.updatedHoldData=  event.updated;
      this.deletedHoldList = event.removed;
      
      if(this.insertedHoldData.length>0) {
          
          for(let i=0;i<this.insertedHoldData.length;i++) {
              if (this.insertedHoldData[i].orderType === undefined) {
                  this.type = 'warn';
                  this.message = this.translateService.translate( 'ocuholds.ordertypemsg' );
                  this.show();
                  return;
      }
          this.insertedHoldData[i].createDateTime = DateFormat.getDate();
          this.insertedHoldData[i].modifyDateTime = DateFormat.getDate();
          this.insertedHoldData[i].caseId=this.caseId;
          this.insertedHoldData[i].eventId=this.eventId;
          this.insertedHoldData[i].offenderBookId=this.offenderBookId;
          }
          }
      if(this.updatedHoldData.length>0) {
              for(let i=0;i<this.updatedHoldData.length;i++) {
              this.updatedHoldData[i].createDateTime = DateFormat.getDate();
              this.updatedHoldData[i].modifyDateTime = DateFormat.getDate();
              this.updatedHoldData[i].caseId=this.caseId;
              this.updatedHoldData[i].eventId=this.eventId;
              this.updatedHoldData[i].offenderBookId=this.offenderBookId;
              }
              }    
      this.holdeCommitBean.insertList = this.insertedHoldData;
      this.holdeCommitBean.updateList = this.updatedHoldData;
      this.holdeCommitBean.deleteList = this.deletedHoldList;
      const affetedRows = this.OcuholdsFactory.insertHoldData(this.holdeCommitBean);
      affetedRows.subscribe(list=>{
                  if (list === 0) {
                      this.type = 'success';
                      this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                      this.show();
                  this.populateHoldsData();
                      return;
                  }else {
                      this.type = 'error';
                      this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                      this.show();
                      return;
                      }
      });
      return;
  }
  
show() {
      this.msglist = [];
      this.msglist.push({ message: this.message, type: this.type });
      this.msgs = [...this.msglist];
      }
    
cancel(): void {
    let holdFlag = false;
    if(this.holdData != null && this.holdData.length > 0) {
        holdFlag = true;
    } 
    this.dialog.close({
        holdFlag: holdFlag,
    });
  } 

onGridDelete = () => {
    return true;
}

canOrderEdit = (data: any, index: number, field: string): boolean => {
    if ((field === 'orderType') && !data.offenderBookId) {
        return true;
    } else {
        return false;
    }
} 

}