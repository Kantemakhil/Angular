import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuoicchService } from '../service/ocuoicch.service';
import { AgencyIncidentCharges } from '@instincidentsbeans/AgencyIncidentCharges';
import { OicOffences } from '@instincidentsbeans/OicOffences';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { VOicIncidents } from '@instoicbeans/VOicIncidents';
// import required bean declarations

@Component({
    selector: 'app-oimoicmpdialog',
    templateUrl: './oimoicmpdialog.component.html'

})
export class OimoicmpdialogComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    chargesColumnDefs: any[];
    agencyIncidentChargesModel: AgencyIncidentCharges = new AgencyIncidentCharges();
    oicOffencesData: OicOffences[] = [];
    incidentDate: any;
    vOicIncidentsModel: VOicIncidents = new VOicIncidents();
    constructor(private ocuoicchFactory: OcuoicchService, public translateService: TranslateService) {
        this.chargesColumnDefs = [];
    }

    ngOnInit() {
        this.incidentDate = new Date(this.dialog.data.incidentDate);
       this.vOicIncidentsModel = new VOicIncidents();
       this.vOicIncidentsModel.incidentDate = this.incidentDate;
        this.chargesColumnDefs = [
                           { fieldName: this.translateService.translate('ocuoicch.code'),
                              field: 'oicOffenceCode', editable: true, width: 200 },
                           { fieldName: this.translateService.translate('common.offence-description'),
                              field: 'description', width: 250, editable: true },
                           { fieldName: this.translateService.translate('common.type'),
                              field: 'oicOffenceType', editable: true, width: 300 },
                           { fieldName: this.translateService.translate('common.category'),
                              field: 'oicOffenceCategory', editable: true, width: 200 },
                       ];

        const serviceObj1 = this.ocuoicchFactory.rgOffenceCodeRecordGroup(this.vOicIncidentsModel);
      serviceObj1.subscribe(list1 => {
          this.oicOffencesData = list1;
     });
    }

    onRowClickEvent(event) {
        this.agencyIncidentChargesModel = new AgencyIncidentCharges();
        this.agencyIncidentChargesModel.chargedOicOffenceCode = event.oicOffenceCode;
        this.agencyIncidentChargesModel.offenceType = event.oicOffenceType;
        this.agencyIncidentChargesModel.offenceDesc = event.description;
        this.agencyIncidentChargesModel.dspCategory = event.oicOffenceCategory;
        this.agencyIncidentChargesModel.chargedOicOffenceId = event.oicOffenceId;
    }

    processResult() {
        if ( this.agencyIncidentChargesModel.chargedOicOffenceId ) {
                this.dialog.close({chargedOicOffenceCode: this.agencyIncidentChargesModel.chargedOicOffenceCode,
                offenceType: this.agencyIncidentChargesModel.offenceType, offenceDesc: this.agencyIncidentChargesModel.offenceDesc,
                dspCategory: this.agencyIncidentChargesModel.dspCategory,
                chargedOicOffenceId: this.agencyIncidentChargesModel.chargedOicOffenceId});
        } else {
            this.dialog.close(null);
        }

    }
    clearData() {
        this.dialog.close(null);
    }
}
