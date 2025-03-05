import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
// import required bean declarations
import { AgencyIncidents } from '@instincidentsbeans/AgencyIncidents';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OidincdeService } from '../service/oidincde.service';
@Component({
    selector: 'app-oiiinlog',
    templateUrl: './oiiinlogpopup.component.html'
})

export class OiiinlogpopupComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    agencyincdModel: AgencyIncidents = new AgencyIncidents();
    agencyincdData: AgencyIncidents[] = [];
    constructor(private service: OidincdeService,
            public translateService: TranslateService) { }
    ngOnInit() {
        this.oiiinlogpopupExecuteQuery();
    }
    cancel() {
        this.dialog.close(true);

    }
    oiiinlogpopupExecuteQuery() {
        this.agencyincdModel.agencyIncidentId = this.dialog.data.agencyIncidentId;
        const serviceObj = this.service.agencyIncidentsExecuteQuery(this.agencyincdModel);
        serviceObj.subscribe(data => {
            if (data) {
                this.agencyincdData = data;
                this.agencyincdModel.incidentDetails = this.agencyincdData[0].incidentDetails;
            } else {

            }
        });
    }
}
