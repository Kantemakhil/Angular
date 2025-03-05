import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
// import { OidtpritService } from '../service/oidtprit.service';
import { OcustfasService } from '@inst/casemanagement/service/ocustfas.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CasePlans } from '@instCaseManagementbeans/CasePlans';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
@Component({
    selector: 'app-ocustfaspopup',
    templateUrl: './ocustfaspopup.component.html'
})
export class OcustfaspopupComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    casePlans: CasePlans = new CasePlans();
    casePlansTemp: CasePlans[] = [];
    chargeColumnDefpopup: any[];
    offBookId: any;
    caseLoadId: any;
    namesOption: any[] = [];
    constructor(private ocustfasFactory: OcustfasService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService,
        private sessionManager: UserSessionManager) {
    }

    ngOnInit() {
        this.caseLoadId = this.offenderSearchService.selectedOffender.agyLocId;
        this.chargeColumnDefpopup = [];
        this.chargeColumnDefpopup = [
            {
                fieldName: this.translateService.translate('common.officer'), field: 'officer',
                editable: true, width: 500, filter: 'text', datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('common.role'), field: 'role',
                editable: true, width: 500, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('common.position'), field: 'position',
                editable: true, width: 500, datatype: 'text'
            },
        ];
        const staffmembersServiceObj = this.ocustfasFactory.rgStaffNameRecordGroup(this.caseLoadId);
        staffmembersServiceObj.subscribe(namesList => {
            this.casePlansTemp = namesList;
        });
    }
    onRowClickEvent(event) {
        this.casePlans = event;
        this.casePlans.firstName = event.firstName;
        this.casePlans.lastName = event.lastName;
        this.casePlans.userId = event.userId;
        this.casePlans.officer = event.officer;
        this.casePlans.instPosition = event.position;
        this.casePlans.instRole = event.role;
    }
    getData(event) {
        this.dialog.close({
            firstName: this.casePlans.firstName, userId: this.casePlans.userId,
            lastName: this.casePlans.lastName, officer: this.casePlans.officer,
            instPosition: this.casePlans.instPosition, instRole: this.casePlans.instRole
        });
    }
    clearData() {
        this.dialog.close(null);
    }
}
