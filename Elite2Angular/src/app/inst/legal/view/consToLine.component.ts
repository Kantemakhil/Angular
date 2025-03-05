import {
    Component,
    OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OcdccaseService } from "../service/ocdccase.service";
import { OffenderSentences } from "../beans/OffenderSentences";


@Component( {
    selector: 'consToLine',
    templateUrl: './consToLine.component.html'
} )

export class ConsToLineComponent implements OnInit {
    consecutiveLov: any;
    consToLineCoumndef:any[];
    disabled:boolean;
    msglist=[];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    public selected=-1;
    consToLineData: OffenderSentences[]=[];
    selectedSentenceRecord:OffenderSentences = new OffenderSentences();
    isDeletable:boolean=false;
  @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    constructor(public translateService: TranslateService,private OcdccaseFactory : OcdccaseService,
            ) {
    
}
    ngOnInit(){
        if ( this.dialog.data ) {
            if(this.dialog.data.consecutiveToLine==undefined && this.dialog.data.consecutiveToLine==null) {
                this.isDeletable = false;
            } else {
                this.isDeletable = true;
            }
        }
        this.disabled = false;
        this.consToLineCoumndef = [
                                   {
                                       fieldName: this.translateService.translate('consToLine.line'),
                                       field: 'line', editable:true, width: 160,
                                   },
                                   {
                                       fieldName: this.translateService.translate('consToLine.code'),
                                       field: 'code', editable:false, width: 150
                                   },
                                   {
                                       fieldName: this.translateService.translate('consToLine.description'),
                                       field: 'description', editable:false, width: 150, maxWidth: 500, wrapText: true,
                                   },
                                   {
                                       fieldName: this.translateService.translate('consToLine.caseInfoNumber'),
                                       field: 'caseInfoNumber', editable: true, width: 220,
                                      
                                   },
                                   {
                                       fieldName: this.translateService.translate('consToLine.expiryDate'),
                                       field: 'expiryDate', editable:false, width: 150,datatype:'date'
                                },

                            ];
        
        
       this.populateConsToLine();
    }
    
    populateConsToLine(){
        let lineSeq = 0;
        if(this.dialog.data.line) {
           lineSeq = this.dialog.data.line; 
        }
        const consecutiveLovData = this.OcdccaseFactory.consecutiveToLine(this.dialog.data.offenderBookId,lineSeq);
        consecutiveLovData.subscribe(result=>{
            this.consToLineData = result;
            
        });
        
    }
    onDialogRowClickEvent(event) {
        this.selectedSentenceRecord.consecutiveToLine=event.sentenceSeq;
       
    }
    
    removeSentence() {
        /*if(!this.dialog.data.consecutiveToLine) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'Please select sentence record');
            this.show();
        }*/
        
        this.dialog.close({consecutiveToLine:null});
    }
    
    processSelectedData() {
        if(!this.selectedSentenceRecord.consecutiveToLine) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'Please select sentence record');
            this.show();
        } else {
            this.dialog.close({consecutiveToLine:this.selectedSentenceRecord.consecutiveToLine});
        }
        
        
        /*if(this.dialog.data.consecutiveToLine==undefined && this.dialog.data.consecutiveToLine==null) {
            this.dialog.close({consecutiveToLine:this.selectedSentenceRecord.consecutiveToLine
         });
        }else {
            this.dialog.close(null);
            return;
        }*/
    }
    
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
        }
    
    cancel(): void {
        this.dialog.close(null);
      }
 }