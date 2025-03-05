import {
    Component,
    OnInit
} from '@angular/core';

import { ViewChild } from '@angular/core';
import { UserSessionManager } from '@core/classes/userSessionManager';
//import { OicuccideService } from "../service/OcuccideService";
import { CaseIdentifiers } from "../beans/CaseIdentifiers";
import { IdentifierType } from "../beans/IdentifierType";
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { CaseIdentifierCommitBean } from "../beans/CaseIdentifierCommitBean";
import { TranslateService } from '@common/translate/translate.service';
import { OicuccideService } from "../service/ocuccide.service";
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component( {
    selector: 'app-occuccide',
    templateUrl: './ocuccide.component.html',
    styleUrls: []
} )
export class OcuccideComponent implements OnInit {
    caseIdentifire: CaseIdentifiers[]=[];
    caseType: IdentifierType[]=[];
    caseId:number;
    caseIdentifierColumndef:any[];
    checkIndex: number;
    checkTestInsert: boolean;
    checkTestUpdate: boolean;
    msglist=[];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    disabled:boolean;
    beforeUpdateRecord: CaseIdentifiers[] = [];
    insertedRecord : CaseIdentifiers[] = [];
    updatedRecord : CaseIdentifiers[] = [];
    deleteRecord: CaseIdentifiers[] = [];
    public selected= -1;
    caseIdentifierCommitBean: CaseIdentifierCommitBean = new CaseIdentifierCommitBean();
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    
    constructor(private service : OicuccideService,
            public translateService: TranslateService,
            private sessionManager: UserSessionManager) {
        
    }

    ngOnInit() {
        
        if ( this.dialog.data ) {}
        this.disabled = false;
        this.caseId=this.dialog.data.caseId;
        this.populateIdentifires();
        this.populateIdentifireType();       
        this.insertedRecord = [];
        this.updatedRecord = [];
        this.deleteRecord =  [];
        
        this.caseIdentifierColumndef = [

            {
                fieldName: this.translateService.translate('ocuccide.type'),
                field: 'type', editable: true, width: 300, datatype: 'lov',domain:'CASE_ID_TYPE'/* link: 'ocuccide/identifierType'*/
            },
            {
                fieldName: this.translateService.translate('ocuccide.number'),
                field: 'number',datatype: 'text',uppercase: 'false', editable: true, width: 500 
            },
        ];
       
    }
    
    
    populateIdentifireType() {
        
        const caseType = this.service.identefireType().subscribe(type=>{
            this.caseType = type;
            this.selected=0;
        });
    } 
    
    populateIdentifires() {
        
           this.service.identifires(this.caseId).subscribe(data=>{
            this.caseIdentifire=data;
            for (var i = 0, len = data.length; i < len; i++) {
                this.beforeUpdateRecord[i] = Object.assign({},data[i]);
            }             
        });
    }
    
    insertIndentifierRecord( event ) {
                
        this.insertedRecord = event.added;
        this.updatedRecord = event.updated;
        this.deleteRecord = event.removed;        
        
       
        if ( this.insertedRecord.length > 0 ) {
            for ( let i = 0; i < this.insertedRecord.length; i++ ) {
                if(this.insertedRecord[i].type===null || this.insertedRecord[i].type===undefined) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuccide.typemustbeentered');
                    this.show();
                    return;
                }
                if(this.insertedRecord[i].number===null || this.insertedRecord[i].number===undefined || this.insertedRecord[i].number==="") {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuccide.numbermustbeentered');
                    this.show();
                    return;
                }
                this.insertedRecord[i].caseId = this.caseId;
                this.insertedRecord[i].createDateTime = DateFormat.getDate();
                this.insertedRecord[i].modifyDateTime = DateFormat.getDate();
                this.insertedRecord[i].createUserId = this.sessionManager.getId();
                this.insertedRecord[i].modifyUserId = this.sessionManager.getId();               
            }           
            for ( let i = 0; i < this.beforeUpdateRecord.length; i++ ) {
                for ( let j = 0; j < this.insertedRecord.length; j++ ) {
                    if ( this.insertedRecord[j].type == this.beforeUpdateRecord[i].type && this.insertedRecord[j].number == this.beforeUpdateRecord[i].number ) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocuccide.alert.record.exist');
                        this.show();
                        return;
                    }

                }
            }
        }
        
        if(this.updatedRecord.length>0) {
            for(let i=0;i<this.updatedRecord.length;i++) {
            
            if(this.updatedRecord[i].type===null || this.updatedRecord[i].type===undefined || this.updatedRecord[i].type=="") {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuccide.typemustbeentered');
            this.show();
            return;
        }
        if(this.updatedRecord[i].number===null || this.updatedRecord[i].number===undefined || this.updatedRecord[i].number=="") {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuccide.numbermustbeentered');
            this.show();
            return;
        }
            this.updatedRecord[i].caseId=this.caseId;
            this.updatedRecord[i].createDateTime = DateFormat.getDate();
            this.updatedRecord[i].modifyDateTime = DateFormat.getDate();        
            
            this.updatedRecord[i].oldType = this.beforeUpdateRecord[this.updatedRecord[i].seqNumber].type;
            this.updatedRecord[i].oldNumber = this.beforeUpdateRecord[this.updatedRecord[i].seqNumber].number;
            } 
            
            for ( let i = 0; i < this.beforeUpdateRecord.length; i++ ) {
            for ( let j = 0; j < this.updatedRecord.length; j++ ) {
                if ( this.updatedRecord[j].type == this.beforeUpdateRecord[i].type && this.updatedRecord[j].number == this.beforeUpdateRecord[i].number ) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocuccide.alert.record.exist');
                            this.show();
                            return;
                }

            }
        }
        }   
        this.caseIdentifierCommitBean.insertList = this.insertedRecord;
        this.caseIdentifierCommitBean.updateList = this.updatedRecord;
        this.caseIdentifierCommitBean.deleteList = this.deleteRecord;
        const affetedRows = this.service.insertIdentifierData( this.caseIdentifierCommitBean );

        affetedRows.subscribe( list => {
            this.populateIdentifires();
            
            if(list.length > 0){
                this.type = 'success';
                this.message = this.translateService.translate('ocuccide.alert.msg');
                this.show();
                return;
            }
        } );            
    }
    
    onGridInsert = () =>  {       
        return {            
        }
    }
    
    cancel(): void {
        this.dialog.close(null);
      }

    onGridDelete = () => {
        return true;
    }
    
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
        }
}
