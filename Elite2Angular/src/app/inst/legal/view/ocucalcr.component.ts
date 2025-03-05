import {
    Component,
    OnInit
} from '@angular/core';

import { ViewChild } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { OcucalcrService } from "../service/ocucalcr.service";
import { SentenceCalculation } from "../beans/SentenceCalculation";
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { KeyDates } from "../beans/KeyDates";
import { KeyDatesService } from "../service/keyDates.service";


@Component( {
    selector: 'app-ocucalcr',
    templateUrl: './ocucalcr.component.html',
} )
export class OcucalcrComponent implements OnInit {
    ocucalcrColumndef:any[];
    msglist=[];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    calculationReasonUrl:string;
    staffName:string;
    sentenceCalc:SentenceCalculation = new SentenceCalculation();
    keyDatesData : KeyDates [] =[];
    parentScreenId:string="";
    notAllowCharacters = ['"','\\'];
    @ViewChild( 'dialog' , {static: true}) dialog: DialogComponent;
    
    constructor(private OcucalcrFactory : OcucalcrService, 
                public translateService: TranslateService,
                private keyDatesService: KeyDatesService) {
        
    }

    ngOnInit() {
        this.parentScreenId="ocucalcr";
        if ( this.dialog.data ) {
        }
        this.calculationReasonUrl='/ocucalcr/populateCalculationReasonList';
        this.populateStaffName();
        this.sentenceCalc.sentDate=DateFormat.getDate();
        this.sentenceCalc.sentTime=  DateFormat.getDate();
        this.sentenceCalc.offenderBookId=this.dialog.data.offenderBookId;
        this.keyDatesData=this.dialog.data;
     
    }
 
    calcReasonChange() {
        
    }
    
    populateStaffName() {
        const staffName = this.OcucalcrFactory.populateStaffName();
        staffName.subscribe(staffName => {
            if(staffName && staffName.indexOf(',') > -1 ){
                this.sentenceCalc.staffName = staffName.split(',').join(', ');
            }
            else{
                this.sentenceCalc.staffName = staffName;
            }
        });
    }
    
    calcExpDate() {
      setTimeout(() => {
        this.calcExpDateNext();
      },1000); 
    }


    calcExpDateNext() {

        if (this.sentenceCalc.calcCode == undefined || this.sentenceCalc.calcCode == null) {
            this.type = 'error';
            this.message = "Please enter " + this.translateService.translate('ocucalcr.calculationreason').toLowerCase();
            this.show();
            return;
        }

        if (this.sentenceCalc.calcCode != null) {

            this.dialog.close({
                staffName: this.sentenceCalc.staffName,
                calculationReason: this.sentenceCalc.calcCode,
                commentText: this.sentenceCalc.comment,
                calcCode: this.sentenceCalc.calcCode,
                sentDate: this.sentenceCalc.sentDate,
                sentTime: this.sentenceCalc.sentTime,

            });
        } else {
            this.dialog.close(null);
            return;
        }
    }

    insertKeyDatesHistory(keyDatesData) {
        
        const affectedRows = this.keyDatesService.updateKeyDates(this.parentScreenId,this.keyDatesData);
        affectedRows.subscribe(value => {
           if(value==1) {
               this.type = 'success';
               this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
               this.dialog.close(true);
               this.show();
               return;
           }else if(value==2) {
               
           }else if(value==-1) {
               
           }else {
               this.type = 'error';
               this.message = this.translateService.translate('common.addupdateremoverecordfailed');
               this.show();
               this.dialog.close(true);
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
      this.dialog.close(null);
    }
}
