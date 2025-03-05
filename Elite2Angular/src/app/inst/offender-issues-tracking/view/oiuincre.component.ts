import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { AgencyIncidents } from '@instincidentsbeans/AgencyIncidents';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OidissueService } from '../service/oidissue.service';
//  import required bean declarations

@Component({
    selector: 'app-oiuincre',
    templateUrl: './oiuincre.component.html'
})

export class OiuincreComponent implements OnInit {
    //  Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    msgs: any[] = [];
    agencyincidentsData: AgencyIncidents[] = [];
    agencyincidentsDataTemp: AgencyIncidents[] = [];
    agencyincidentsModel: AgencyIncidents = new AgencyIncidents();
    agencyincidentsIndex = 0;
    agencyincidentsInsertList: AgencyIncidents[] = [];
    agencyincidentsUpdatetList: AgencyIncidents[] = [];
    agencyincidentsDeleteList: AgencyIncidents[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    rollListColumnDef: any[];
    subSamplColumnDef: any[];
    subTestColumnDef: any[];
    vOffRestColumnDef: any[];
    agencyIncidentsColumnDef: any[];
    rpOtherOccupantsColumnDef: any[];
    personsReadOnly = false;
    rpOtherOccupantsReadOnly = false;
    offReadOnly = false;
    vOffRestReadOnly = false;
    buttonReadOnly = false;
    subSamplReadOnly = false;
    subTestReadOnly = false;
    sysPflReadOnly = false;
    subLocCntReadOnly = false;
    cg$ctrlReadOnly = false;
    rollListReadOnly = false;
    agencyIncidentsReadOnly = false;
    incidentGridIndex: number;
    btnDisable:boolean;
    constructor(
        private oidissueFactory: OidissueService,
        public translateService: TranslateService) {
        //  TODO initilize data members here..!
        this.rollListColumnDef = [];
        this.subSamplColumnDef = [];
        this.subTestColumnDef = [];
        this.vOffRestColumnDef = [];
        this.agencyIncidentsColumnDef = [];
        this.rpOtherOccupantsColumnDef = [];
    }
    ngOnInit() {
        this.btnDisable = true;
        this.incidentGridIndex = 0;
        this.agencyincidentsExecuteQuery();
        this.agencyIncidentsColumnDef = [
            { fieldName: this.translateService.translate('oidincde.incident'), field: 'agencyIncidentId', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('oiuincre.incidentreport'), field: 'incidentDetails',
                editable: false, width: 500
            },
        ];
    }
    /*
     * This function executed when we select row in the grid
     */
    onRowClickagencyincidents(event) {
        this.agencyincidentsModel = new AgencyIncidents();
        if (event) {
            this.agencyincidentsModel = event;
        }

    }
    /*
     * This function executed when we click on Select button
     */
    onButSelectclick() {
        this.dialog.close({ agencyIncidentId: this.agencyincidentsModel.agencyIncidentId })
    }
    /*
     * This function executed to retrive the data in the grid
     */
    agencyincidentsExecuteQuery() {
        const rootOffenderId = this.dialog.data.rootOffenderId;
        const agencyincidentsResult = this.oidissueFactory.
            agencyIncidentsExecuteQuery(rootOffenderId);
        agencyincidentsResult.subscribe(agencyincidentsResultList => {
            if (agencyincidentsResultList.length === 0) {
                this.agencyincidentsData = [];
                this.btnDisable = true;
            } else {
                this.btnDisable=false;
                this.incidentGridIndex = 0;
                this.agencyincidentsData = agencyincidentsResultList;
                this.agencyincidentsModel = agencyincidentsResultList[0];
            }
        });
    }
 /*
     * This function executed when we click on Cancel button
     */
    butCancelWhenButtonPressedTrigger() {
        this.dialog.close(null);
    }

}
