import {
    Component, OnInit, ViewChild
} from '@angular/core';

import { TranslateService } from '@common/translate/translate.service';
import { OcuoicheService } from '../service/ocuoiche.service';
import { OicHearingResults } from '@instincidentsbeans/OicHearingResults';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OidoicusService } from '../service/oidoicus.service';
import { OcuoicchService } from '../service/ocuoicch.service';
import { OicOffences } from '@instincidentsbeans/OicOffences';
import { VOicIncidents } from '@instoicbeans/VOicIncidents';
// import required bean declarations

@Component({
    selector: 'app-Oimoicoidialog',
    templateUrl: './Oimoicoidialog.component.html'

})
export class OimoicoidialogComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    columnDefs: any[];  
    partySeq: any;
    translateLabel: any;
    voicinciData: VOicIncidents = new VOicIncidents();
    oichearresModel: OicHearingResults = new OicHearingResults();
    oichearresData: OicHearingResults[] = [];
    vOicIncidentsModel: VOicIncidents = new VOicIncidents();
    oicOffencesData: OicOffences[] = [];
    incidentDate: any;
    constructor(private ocuoicheFactory: OcuoicheService, private oidoicusFactory: OidoicusService,
            public translateService: TranslateService, private ocuoicchFactory: OcuoicchService) {
        this.columnDefs = [];
    }

    ngOnInit() {
        this.columnDefs = [
            { fieldName: this.translateService.translate('common.code'), field: 'oicOffenceCode', editable: true, width: 200 },
            { fieldName: this.translateService.translate('ocuoiche.offensedescription'), field: 'description', width: 250, editable: true },
            { fieldName: this.translateService.translate('common.type'), field: 'oicOffenceType', editable: true, width: 200 },
            { fieldName: this.translateService.translate('common.category'), field: 'oicOffenceCategory', editable: true, width: 150 },
        ];
        this.oichearresModel = this.dialog.data;
        this.incidentDate = new Date( this.dialog.data.incidentDate );
        this.vOicIncidentsModel = new VOicIncidents();
        this.vOicIncidentsModel.incidentDate = this.incidentDate;
        const serviceObj = this.ocuoicchFactory.rgOffenceCodeRecordGroup( this.vOicIncidentsModel );
        serviceObj.subscribe( list1 => {
            this.oicOffencesData = list1;
        } );
    }

    onRowClickEvent(event) {
        this.oichearresModel = new OicHearingResults();
        this.oichearresModel.resultOicOffenceCode = event.oicOffenceCode;
        this.oichearresModel.typeResult = event.oicOffenceType;
        this.oichearresModel.chargeDescriptionResult = event.description;
        this.oichearresModel.oicResultOffenceId = event.oicOffenceId;
   }
    getData() {
        this.dialog.close({resultOicOffenceCode: this.oichearresModel.resultOicOffenceCode,
            typeResult: this.oichearresModel.typeResult,
            chargeDescriptionResult: this.oichearresModel.chargeDescriptionResult,
            oicResultOffenceId: this.oichearresModel.oicResultOffenceId });
    }
    clearData() {
        this.dialog.close( null );
    }
}
