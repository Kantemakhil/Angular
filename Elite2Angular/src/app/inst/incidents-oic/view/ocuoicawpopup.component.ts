import { Component,
         OnInit,
         ViewChild } from '@angular/core';
import { OcuoicawService } from '../service/ocuoicaw.service';
import { OffenderOicSanctions } from '@instoicbeans/OffenderOicSanctions';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
@Component({
    selector: 'app-ocuoicawpopup',
    templateUrl: './ocuoicawpopup.component.html'

})
export class OcuoicawPopUpComponent implements OnInit {
   @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    columnDefsocupopup: any[];
    rgothersanctionsRg: OffenderOicSanctions[] = [];
    oicsancModelTemp: OffenderOicSanctions = new OffenderOicSanctions();
    oicsancTemp: OffenderOicSanctions = new OffenderOicSanctions();
    oicsancTempmodal: OffenderOicSanctions = new OffenderOicSanctions();
    offenderBookId: number;
    sanctionSeq: number;
    oicsancTempModel: OffenderOicSanctions[] = [];
    okflag: boolean = true;
    savefalg: boolean = true;
    selected = -1;
    constructor(private ocuoicawFactory: OcuoicawService, public translateService: TranslateService) {
    }
    ngOnInit() {
        this.dialog.data;
        this.sanctionSeq = this.dialog.data.sanctionSeq;
          this.columnDefsocupopup = [
            {
                fieldName: this.translateService.translate('ocuoicaw.line'), field: 'consecutiveSanctionSeq',
                editable: true, width: 160, filter: 'text', pinned: true, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocuoicaw.adjudication'), field: 'oicIncidentId',
                editable: true, width: 180, datatype: 'text',
            },
            {
                fieldName: this.translateService.translate('ocuoicaw.paragraph'), field: 'oicOffenceCode',
                editable: true, width: 160, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocuoicaw.type'), field: 'oicOffenceType',
                editable: true, width: 200, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocuoicaw.description') , field: 'description',
                editable: true, width: 200, datatype: 'text'
            },
            { fieldName: this.translateService.translate('ocuoicaw.hearingdate'), field: 'hearingDate',
              editable: true, width: 200, datatype: 'date' },
             { fieldName: this.translateService.translate('ocuoicaw.hearingtime'), field: 'hearingTime',
              editable: true, width: 200, datatype: 'time' }

        ];
          this.oicsancModelTemp.offenderBookId = this.ocuoicawFactory.offBookID;
          this.oicsancModelTemp.sanctionSeq = this.dialog.data.sanctionSeq;
          this.selected = -1;
          this.executeQuery();  
        }

    executeQuery(){
        const serviceObj = this.ocuoicawFactory.
        rgOtherSanctionsRecordGroup(this.oicsancModelTemp);
    serviceObj.subscribe(list1 => {
        if (list1.length === 0) {
            this.rgothersanctionsRg = [];
        } else {
            this.oicsancTempModel = this.ocuoicawFactory.oicsancDataTemp;
            // for (let i = 0; i < list1.length; i++) {
            //      if ( this.dialog.data.consecutiveSanctionSeq == null || this.dialog.data.consecutiveSanctionSeq === undefined ) {
                    
            //         }  else if ( this.dialog.data.consecutiveSanctionSeq === list1[i].consecutiveSanctionSeq ) {
            //         //  list1[i] = null;
            //          this.rgothersanctionsRg = list1[i];
            //          this.oicsancTempmodal = list1[0];
            //         } else {
            //           this.rgothersanctionsRg = list1;
            //           this.oicsancTempmodal = list1[0];
            //          }
            //     }
                 this.rgothersanctionsRg = list1;
                 this.oicsancTempmodal = list1[0];
        }
        });
        }
    onRowClickEvent(event) {
        this.okflag = false;
        if(event){
            this.oicsancTemp = event;
        }
        }
    getData() {
        this.dialog.close({
            consecutiveSanctionSeq: this.oicsancTemp.consecutiveSanctionSeq,
            oicIncidentId: this.oicsancTemp.oicIncidentId,
            savefalg: this.savefalg,
        });
    }
    clearData() {
         this.dialog.close( { savefalg: this.savefalg,});
        }
  }
