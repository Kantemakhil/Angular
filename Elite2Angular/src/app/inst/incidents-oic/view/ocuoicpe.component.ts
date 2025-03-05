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
import { AgencyIncidentCharges } from '@instincidentsbeans/AgencyIncidentCharges';

@Component({
    selector: 'app-ocuoicpe',
    templateUrl: './ocuoicpe.component.html'

})
export class OcuoicpeComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    columnDefs: any[];
    partySeq: any;
    translateLabel: any;
    voicinciData: VOicIncidents = new VOicIncidents();
    oichearresModel: OicHearingResults = new OicHearingResults();
    agyincichgData: AgencyIncidentCharges [] = [];
    oichearresData: OicHearingResults[] = [];
    vOicIncidentsModel: VOicIncidents = new VOicIncidents();
    agyincichgModel: AgencyIncidentCharges = new AgencyIncidentCharges();
    oicOffencesData: OicOffences[] = [];
    
    incidentDate: any;
    constructor(private ocuoicheFactory: OcuoicheService, private oidoicusFactory: OidoicusService,
            public translateService: TranslateService, private ocuoicchFactory: OcuoicchService) {
        this.columnDefs = [];
    }

    ngOnInit() {
        this.columnDefs = [
                           { fieldName: this.translateService.translate('common.paragraph'), field: 'oicOffenceCode',
                            editable: true, width: 200 },
                           { fieldName: this.translateService.translate('common.type'), field: 'oicOffenceType',
                            editable: true, width: 200 },
                           { fieldName: this.translateService.translate('common.description'), field: 'description', width: 250,
                            editable: true },
                            { fieldName: this.translateService.translate('ocuoiche.offenceid'), field: '', width: 250,
                                editable: true },
                            
                       ];
        this.incidentDate = new Date(this.dialog.data.incidentDate);
        this.vOicIncidentsModel = new VOicIncidents();
        this.vOicIncidentsModel.agencyIncidentId = this.dialog.data.agencyIncidentId;
        this.vOicIncidentsModel.partySeq = this.dialog.data.partySeq;
        this.vOicIncidentsModel.incidentDate =  this.incidentDate;
        const incidentChargesResult = this.ocuoicheFactory.rgIncidentChargesRecordGroup(this.vOicIncidentsModel);
        incidentChargesResult.subscribe(incichgResultList => {
            this.oicOffencesData = incichgResultList;
          });
    }

    agyincichgExecuteQuery() {
        this.agyincichgModel = new AgencyIncidentCharges();
        this.agyincichgModel.agencyIncidentId =   this.dialog.data.agencyIncidentId;
                 const agyincichgResult = this.ocuoicchFactory.agyInciChgExecuteQuery(this.agyincichgModel);
                 agyincichgResult.subscribe(agyincichgResultList => {
                        this.agyincichgData = agyincichgResultList;
                });
            }

    onRowClickagyincichg(event) {
        this.oichearresModel = new OicHearingResults();
        this.oichearresModel.oicOffenceCode = event.oicOffenceCode;
        this.oichearresModel.type = event.oicOffenceType;
        this.oichearresModel.chargeDescription = event.description;
        this.oichearresModel.oicOffenceId = event.oicOffenceId;
        this.oichearresModel.chargeSeq = event.chargeSeq;
    }
    getData() {
        this.dialog.close({oicOffenceCode: this.oichearresModel.oicOffenceCode,
            chargeSeq: this.oichearresModel.chargeSeq,
            type: this.oichearresModel.type,
            chargeDescription: this.oichearresModel.chargeDescription,
            oicOffenceId: this.oichearresModel.oicOffenceId});
    }
    clearData() {
        this.dialog.close( null );
    }
}
