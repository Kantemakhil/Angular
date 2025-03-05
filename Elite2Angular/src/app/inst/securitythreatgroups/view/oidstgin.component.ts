
import {
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidstginService } from '../service/oidstgin.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { AgencyIncidents } from '../../incidents-oic/beans/AgencyIncidents';
import { AgencyIncidentParties } from '../../incidents-oic/beans/AgencyIncidentParties';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
@Component({
    selector: 'app-oidstgin',
    templateUrl: './oidstgin.component.html'
})

export class OidstginComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    msgs: any[] = [];
    agyincData: AgencyIncidents[] = [];
    agyincModel: AgencyIncidents = new AgencyIncidents();
    agyincIndex: number;
    agyincInsertList: AgencyIncidents[] = [];
    agyincUpdatetList: AgencyIncidents[] = [];
    agyincDeleteList: AgencyIncidents[] = [];
    agencyincidentpartiesData: AgencyIncidentParties[] = [];
    agencyincidentpartiesDataTemp: AgencyIncidentParties[] = [];
    agencyincidentpartiesModel: AgencyIncidentParties = new AgencyIncidentParties();
    agencyincidentpartiesIndex: number;
    agencyincidentpartiesInsertList: AgencyIncidentParties[] = [];
    agencyincidentpartiesUpdatetList: AgencyIncidentParties[] = [];
    agencyincidentpartiesDeleteList: AgencyIncidentParties[] = [];
    disabled: boolean;
    agyIncColumnDef: any[];
    agencyIncidentPartiesColumnDef: any[];
    tableIndex = -1;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    constructor(private oidstginFactory: OidstginService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService,
        public sessionManager: UserSessionManager,
        public dialogService: DialogService,
        private osiosearFactory: OsiosearService) {
        this.agyIncColumnDef = [];
        this.agencyIncidentPartiesColumnDef = [];
    }
    ngOnInit() {
        this.agyIncColumnDef = [
            { fieldName: this.trMsg('common.incident'), field: 'agencyIncidentId', editable: false, width: 150 },
            { fieldName: this.trMsg('common.date'), field: 'incidentDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.trMsg('common.time'), field: 'incidentTime', editable: false, width: 150, datatype: 'time' },
            { fieldName: this.trMsg('system-profile.inst-agency'), field: 'agyLocId', editable: false, width: 150 },
            { fieldName: this.trMsg('common.location'), field: 'levelCode', editable: false, width: 150 },
            { fieldName: this.trMsg('oidstgin.reportedby'), field: 'reportStaffIdAsCode', editable: false, width: 150 },
        ];
        this.agencyIncidentPartiesColumnDef = [
            { fieldName: this.trMsg('common.Orca2'), field: 'offenderIdDisplay', editable: false, width: 150 },
            { fieldName: this.trMsg('common.name'), field: 'lname', editable: false, width: 150 },
            { fieldName: this.trMsg('oidstgin.affiliation'), field: 'description', editable: false, width: 150 },
            {
                fieldName: this.trMsg('oidstgin.participation'), field: 'incidentRole', datatype: 'lov', domain: 'INC_OFF_PAR',
                editable: true, width: 150
            },
            {
                fieldName: this.trMsg('common.disposition'), field: 'actionCode', datatype: 'lov', domain: 'INC_DECISION',
                editable: false, width: 150
            },
            { fieldName: this.trMsg('common.date'), field: 'partyAddedDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.trMsg('common.oic'), field: 'oicIncidentId', editable: false, width: 150 },
            {
                fieldName: '', field: 'butGo', datatype: 'launchbutton', editable: false, width: 150,
                data: 'row', updateField: 'row', modal: true, onLaunchClick: this.openGo, dialogWidth: 80
            },
        ];
        this.agyincExecuteQuery();
    }
    /**
* This function displays the messages
*/
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    /**
  * This function navigate to another screen
  */
 openGo = (event) => {
    if (event.oicIncidentId) {
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel.offenderIdDisplay = event.offenderIdDisplay;
        this.vHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
        const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModel);
        offbkGlobal.subscribe(list => {
            if (list.length > 0) {
                this.vHeaderBlockModel = list[0];
                this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
            } else {
                this.vHeaderBlockModel = new VHeaderBlock();
                this.offenderSearchService.selectedOffender = undefined;
            }
            this.dialogService.openLinkDialog('/OIDOICUSDIALOG', event, 80).subscribe(result => {
                this.agencyincidentpartiesExecuteQuery();
            });
        });
        }

}
    /**
   * This function navigate to another screen
   */
    onGridInsert = () => {
        return { butGo: 'Go' };
    }
    /**
 *  This function will be executed when rowClicked event is
 * fired
 */
    onRowClickagyinc(event) {
        if (event) {
            this.agyincModel = event;
            this.agencyincidentpartiesModel = new AgencyIncidentParties();
            if (this.agyincModel.agencyIncidentId) {
                this.agencyincidentpartiesModel.agencyIncidentId = this.agyincModel.agencyIncidentId;
                this.agencyincidentpartiesExecuteQuery();
            }
        }
    }
    /**
*  This function will be executed when Exit event is
* fired
*/
    cancel() {
        this.dialog.close(null);
    }
    /**
*  This function will be executed when execute query call
*/
    agyincExecuteQuery() {
        this.sessionManager.currentCaseLoad = this.sessionManager.currentCaseLoad;
        this.agyincModel.agencyIncidentId = this.dialog.data.stgId;
        this.agyincModel.originatingForm = this.dialog.data.originatingForm;
        this.agyincModel.reportedStaffId = this.agyincModel.reportedStaffId;
        this.agyincModel.incidentDate = DateFormat.getDate();
        this.agyincModel.incidentTime = DateFormat.getDate();
        if (this.dialog.data.offenderBookId) {
            this.agyincModel.offenderBookId = this.dialog.data.offenderBookId;
        }
        const agyincResult = this.oidstginFactory.
            agyIncExecuteQuery(this.agyincModel);
        agyincResult.subscribe(data => {
            if (data.length === 0) {
                this.agyincData = [];
                return;
            } else {
                this.agyincData = data;
                this.tableIndex = 0;
            }
        });
    }
    /**
*  This function will be executed when execute query call
*/
    agencyincidentpartiesExecuteQuery() {
        this.agencyincidentpartiesModel.stgId = this.dialog.data.stgId;
        const agencyincidentpartiesResult = this.oidstginFactory.
            agencyIncidentPartiesExecuteQuery(this.agencyincidentpartiesModel);
        agencyincidentpartiesResult.subscribe(data => {
            if (data.length === 0) {
                this.agencyincidentpartiesData = [];
            } else {
                data.forEach(element => {
                    element['butGo'] = 'Go';
                });
                this.agencyincidentpartiesData = data;
            }
        });
    }
}
