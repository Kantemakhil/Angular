import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { OcusofncService } from "../service/ocusofnc.service";
import { OffensesOutcome } from "../beans/OffensesOutcome";



@Component( {
    selector: 'app-ocusofnc',
    templateUrl: './ocusofnc.component.html',
} )
export class OcusofncComponent implements OnInit {
    
    ocusofncColumndef:any[];
    offenseDialogData:OffensesOutcome []=[];
    offensesOnSentenceDataModel:OffensesOutcome = new OffensesOutcome();
    msglist=[];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    disabled:boolean;
    selectedSentence : OffensesOutcome = new OffensesOutcome();
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    
    constructor(public translateService: TranslateService,
                private OcusofncFactory:OcusofncService) {
        
    }

    ngOnInit() {
         
        if ( this.dialog.data ) {}
        this.disabled = false;
        this.ocusofncColumndef = [
                                /*{
                                    fieldName: this.translateService.translate('ocdccases.apply'),
                                    field: 'apply', editable:true, width: 80,datatype:'checkbox'
                                },*/
                                {
                                    fieldName: this.translateService.translate('ocdccases.offense'),
                                    field: 'offenseDescription',editable:false, width: 230,
                                },
                               
                                {
                                    fieldName: this.translateService.translate('ocdccases.offenseDate'),
                                    field: 'offenseDate', editable:false, width: 150,datatype:'date'
                                },
                                {
                                    fieldName: this.translateService.translate('ocdccases.range'),
                                    field: 'range', editable:false, width: 150,datatype:'date'
                                },
                                {
                                    fieldName: this.translateService.translate('ocdccases.result'),
                                    field: 'result', editable: true, width: 220,
                                    data: 'row',dialogWidth: 80, height: 80
                                },
                                {
                                    fieldName: this.translateService.translate('ocdccases.disposition'),
                                    field: 'disposition', editable:false, width: 150
                                },
                                {
                                    fieldName: 'Charge Id',
                                    field: 'offenderChargeId', editable:false, width: 150
                                },

                            ];
        this.selectedSentence=this.dialog.data;
        this.fetchOffenses(this.selectedSentence);
        
       
    }
    
    
    fetchOffenses(selectedSentenceData) {
        const offensesdata = this.OcusofncFactory.fetechOffensesdialogData(selectedSentenceData);
        offensesdata.subscribe(list=> {
            this.offenseDialogData = list;
        });
    }
    
    onDialogRowClickEvent(event) {
        this.offensesOnSentenceDataModel.offenseDescription=event.offenseDescription;
        this.offensesOnSentenceDataModel.offenderChargeId=event.offenderChargeId;
    }
    
    processSelectedData() {
        if(this.dialog.data.offenseDescription==null) {
            this.dialog.close({offenseDescription:this.offensesOnSentenceDataModel.offenseDescription,
                               offenderChargeId:this.offensesOnSentenceDataModel.offenderChargeId,
                              });
        }else {
            this.dialog.close(null);
            this.type = 'warn';
            this.message = this.translateService.translate('common.addupdateremoverecordsnotallowed');
            this.show();
            return;
        }
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
