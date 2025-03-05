import { Component,
         OnInit,
         ViewChild } from '@angular/core';
import { OidincdeService } from '../service/oidincde.service';
import { TranslateService } from '@common/translate/translate.service';
import { OicOffences } from '@instincidentsbeans/OicOffences';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
@Component({
    selector: 'app-oidincdecharepopup',
    templateUrl: './oidincdeChargepopup.component.html'

})
export class OidincdeChargePopUpComponent implements OnInit {
         @ViewChild('dialog', {static: true}) dialog: DialogComponent;
         chargeColumnDefpopup: any[];
         startDate: any;
         endDate: any;
         oicOffences: OicOffences = new OicOffences();
         oicOffencesData: OicOffences[];
         evidenceDisposeText: any;
        date: any;
        selected:boolean=false;
        mounth: any;
       year: any;

     constructor(private oidincdeFactory: OidincdeService, public translateService: TranslateService) {
         this.startDate ;
         this.endDate = this.startDate;
         }
    
     ngOnInit() {
         this.oidincdeFactory.incidentDate = new Date();
         this.date = this.oidincdeFactory.incidentDate.getDate();
         this.mounth = this.oidincdeFactory.incidentDate.getMonth() + 1;
         this.year = this.oidincdeFactory.incidentDate.getFullYear();
//       this.startDate = this.oidincdeFactory.incidentDate.getDate() + '-' +this.oidincdeFactory.incidentDate.getMonth()+1 + '-' +
//       this.oidincdeFactory.incidentDate.getFullYear();
         this.startDate = this.date + '-' + this.mounth +  '-'+ this.year;
          this.endDate = this.startDate;
         
         this.chargeColumnDefpopup = [];
          this.chargeColumnDefpopup = [
            {
                fieldName: this.translateService.translate('common.code') + '*', field: 'findingCode',
                editable: true, width: 300, filter: 'text', datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oidincde.type'), field: 'oicOffenceType',
                editable: true, width: 300, datatype: 'text'
            },
              {
                fieldName: this.translateService.translate('oumacase.description'), field: 'reportText',
                editable: true, width: 400, datatype: 'text'
            },
            ]
         this.endDate = this.startDate;
          const agyincpartiesstaffResult = this.oidincdeFactory.
            oidincdergoicoffencecodesRecordGroup(this.startDate,this.endDate);
        agyincpartiesstaffResult.subscribe(agyincpartiesstaffResultLists => {
            if (agyincpartiesstaffResultLists.length === 0) {
                this.oicOffencesData = [];
            } else {
                this.oicOffencesData = agyincpartiesstaffResultLists; 
            }
        });
         }
     onRowClickEvent(event){
        this.selected=true;
        this.oicOffences.reportText = event.reportText;
        this.oicOffences.oicOffenceType = event.oicOffenceType;
        this.oicOffences.findingCode = event.findingCode;
        this.oidincdeFactory.chargeoicId = event.oicOffenceId;
        this.evidenceDisposeText = event.oicOffenceCategory;
        }
     getData() {
         if(this.selected){
        this.dialog.close({
            findingCode: this.oicOffences.findingCode,
            oicOffenceType: this.oicOffences.oicOffenceType,
            reportText: this.oicOffences.reportText,
            evidenceDisposeText: this.evidenceDisposeText,
        });
    }else{
        this.clearData();
    }
    }
    clearData(){
         this.oicOffences = new OicOffences();
         this.dialog.close( null );
        }
    }