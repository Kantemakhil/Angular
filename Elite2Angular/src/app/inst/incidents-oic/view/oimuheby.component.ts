import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuoicheService } from '../service/ocuoiche.service';
import { StaffMembers } from '@instincidentsbeans/StaffMembers';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OicHearings } from '@instincidentsbeans/OicHearings';
import { OcuoicchService } from '../service/ocuoicch.service';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
    selector: 'app-oimuheby',
    templateUrl: './oimuheby.component.html'

})
export class OimuhebyComponent implements OnInit {
    oichearbyIndex: number;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    columnDefs: any[];
    partySeq: any;
    oichearModel: OicHearings = new OicHearings();
    translateLabel: any;
    staffModel: StaffMembers = new StaffMembers();
    staffData: StaffMembers[] = [];
    incidentDate: any;
    caseLoadId: any;
    constructor(private ocuoicheFactory: OcuoicheService, private sessionManager: UserSessionManager,
            public translateService: TranslateService, private ocuoicchFactory: OcuoicchService) {
        this.columnDefs = [];
    }

    ngOnInit() {
        this.columnDefs = [
            { fieldName: this.translateService.translate('common.lastname'), field: 'lastName', editable: true, width: 200 },
            { fieldName: this.translateService.translate('common.firstname'), field: 'firstName', width: 250, editable: true },
            { fieldName: this.translateService.translate('oidcount.staffid'), field: 'staffId', editable: true, width: 200 }
        ];

        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.staffModel = new StaffMembers();
        this.staffModel.workingCaseloadId = this.caseLoadId;
        const serviceObj = this.ocuoicheFactory.rgAgyIncpStaffIdRecordGroup( this.staffModel );
        serviceObj.subscribe( list1 => {
            if ( list1.length > 0 ) {
                this.staffData = list1;
                this.oichearbyIndex = 0;
            } else {
                this.staffData = [];
                this.oichearbyIndex = -1;
            }
        } );
    }

    onRowClickEvent(event) {
        this.oichearModel = new OicHearings();
        this.oichearModel.hearingStaffIdDes = event.lastName + ', ' + event.firstName;
        this.oichearModel.hearingStaffId = event.staffId;
   }
    getData() {
        this.dialog.close({hearingStaffIdDes: this.oichearModel.hearingStaffIdDes,
            hearingStaffId: this.oichearModel.hearingStaffId
        });
    }
    clearData() {
        this.dialog.close( null );
    }
}
