import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OffenderSearchService } from '@ui-components/search-block/offender-search.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { KeyDatesService } from "../service/keyDates.service";
import { KeyDates } from "../beans/KeyDates";
import { SentenceKeyDates } from "../beans/SentenceKeyDates";
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@ui-components/dialog/dialog.service';


@Component( {
    selector: 'key-Dates',
    templateUrl: './keyDates.component.html',
    styleUrls: []
} )

export class KeyDatesComponent implements OnInit {
    message = ' Invalid.';
    type = 'error';
    disabled: boolean;
    msglist = [];
    msgs: any[] = [];
    keydatesDef: any[];
    keyDatesData: KeyDates[]=[];
    updatedKeyDatesList: KeyDates[]=[];
    selectedkeyDateData: KeyDates= new KeyDates();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    sentenceKeydates : SentenceKeyDates = new SentenceKeyDates();
    keyFlag:boolean = false;
    disableVerify:boolean=true;
    parentScreenId:string="";
   // vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    
    constructor(public translateService: TranslateService,
            private keyDatesService: KeyDatesService,
            private offenderSearchService: OffenderSearchService,
            private sessionManager: UserSessionManager,
            private dialogService :DialogService
            ) {}
    ngOnInit(){
        this.keyDatesColumnDef();
     }
    @Input()
    set screenId(v:any) {
      this.parentScreenId=v;
   }
    
    keyDatesColumnDef() {
        this.keydatesDef=[
                          {
                              fieldName: this.translateService.translate('keydates.Keydate'),
                              field: 'keyDates', editable: false, width: 200,
                          },
                          {
                              fieldName: this.translateService.translate('keydates.calcdate'),
                              field: 'calculatedDate', cellEditable: this.canCalculatedDateEdit, editable: false, width: 200,datatype:'date' 
                          },
                        
                          {
                              fieldName: this.translateService.translate('keydates.overridedate'),
                              field: 'overrideDate', cellEditable: this.canDateEdit, editable: true, width: 200,datatype:'date'
                          },
                          ];
    }
    
    /*
     * Calling function to populate data in grid when offender changes
     */
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if ( offender ) {
            this.keydatesDef = [];
            this.populateKeyDates();

        } else {
            this.keydatesDef = [];
            this.keyDatesData=[];
            this.disableVerify=false;
        }
    }
    
    @Input()
    set selectedOffender(v:any) {
        if (v !== undefined && v !== this.vHeaderBlockModel) {
            this.vHeaderBlockModel = v;
            this.populateKeyDates();
        }else {
            this.keyDatesData=[];
        }
    }

    
    populateKeyDates(){
        const keydatesLabels = this.keyDatesService.fetchKeyDates(this.parentScreenId);
        keydatesLabels.subscribe(list=>{
            this.keyDatesData = list;
            for(let i=0;i<list.length;i++) {
                this.keyDatesData[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
            }
            const keyDates =  this.keyDatesService.populateKeyDates(this.parentScreenId,list);
            keyDates.subscribe(valueObj => {
                this.keyDatesData=valueObj;
                for(let i=0;i<this.keyDatesData.length;i++) {
                    if(this.keyDatesData[i].profileType2=="N") {
                        this.keyDatesData[i].calculatedDate=this.keyDatesData[i].overrideDate;
                        this.keyDatesData[i].overrideDate=null;
                    }
                }
            });
        });
    }
    
    onRowClickkeyDates(event) {
                this.disableVerify=true;
        this.selectedkeyDateData = event;
        }
    
    canDateEdit = (data: any, index: number, field: string): boolean => {
        
        if (this.selectedkeyDateData.profileType2==="N") {
            return false;
        } else {
            this.disableVerify=false;
            return true;
        }
    }
    
    canCalculatedDateEdit = (data: any, index: number, field: string): boolean => {
        
        if (this.selectedkeyDateData.profileType2==="N") {
            this.disableVerify=false;
            return true;
        } else {
            return false;
        }
    }
    
    openVerifyDialog(){
        this.dialogService.openLinkDialog( '/OCUCALCR', this.keyDatesData, 80).subscribe( result => {
             if ( result ) {
                 
                 for(let i=0;i<this.keyDatesData.length;i++) {
                     this.keyDatesData[i].calculationReason=result.calculationReason;
                     this.keyDatesData[i].staffName=result.staffName;
                     this.keyDatesData[i].commentText=result.commentText;
                         }            
                      }
                  });
              }
    
    updateKeyDates(event) {
        this.updatedKeyDatesList = event.updated;
        if(this.updatedKeyDatesList.length>0) {                
        for(let i=0;i<this.updatedKeyDatesList.length;i++) {
            for(let j=0;j<this.keyDatesData.length;j++) {
                this.keyDatesData[j].createDateTime=DateFormat.getDate();
                this.keyDatesData[j].createUserId=this.sessionManager.getId();
                if(this.updatedKeyDatesList[i].profileType===this.keyDatesData[j].profileType) {
                        this.keyDatesData[j].overrideDate=DateFormat.getDate(this.updatedKeyDatesList[i].overrideDate);
                        this.keyDatesData[j].calculatedDate=DateFormat.getDate(this.updatedKeyDatesList[i].calculatedDate);
                        
                    }
                }
            }
        }  

        const affectedRows = this.keyDatesService.updateKeyDates(this.parentScreenId,this.keyDatesData);
        affectedRows.subscribe(value => {
           if(value==1) {
               this.type = 'success';
               this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
               this.populateKeyDates();
               this.show();
               this.disableVerify=true;
               return;
           }else if(value==2) {
               
           }else if(value==-1) {
               
           }else {
               this.type = 'error';
               this.message = this.translateService.translate('common.addupdateremoverecordfailed');
               this.show();
               this.populateKeyDates();
               return;
           } 
        });
        
    }
    
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
        }
   
}