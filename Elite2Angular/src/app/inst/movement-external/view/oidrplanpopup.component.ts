import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidrplanService } from '@inst/movement-external/service/oidrplan.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { ReleasePlans } from '@inst/movement-external/beans/ReleasePlans';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';

@Component({
    selector: 'app-oidrplanpopup',
    templateUrl: './oidrplanpopup.component.html'
})
export class OidrplanpopupComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    releasePlans: ReleasePlans = new ReleasePlans();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    releasePlansTemp: ReleasePlans[] = [];
    chargeColumnDefpopup: any[];
    offBookId: any;
    caseLoadId: any;
    namesOption: any[] = [];
    rootOffenderId: any;
    okReadOnly: boolean;
    tableIndex = -1;
    constructor(private oidrplanFactory: OidrplanService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService) {
    }

    ngOnInit() {
        this.okReadOnly = true;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (this.vHeaderBlockModel.rootOffenderId) {
            this.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
        }
        this.chargeColumnDefpopup = [];
        this.chargeColumnDefpopup = [
            {
                fieldName: this.translateService.translate('oidrplan.address'), field: 'addr',
                editable: true, width: 500, filter: 'text', datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oidrplan.type'), field: 'description',
                editable: true, width: 500, datatype: 'text'
            },
        ];
        const staffmembersServiceObj = this.oidrplanFactory.rgProposedHousingRecordGroup(this.rootOffenderId);
        staffmembersServiceObj.subscribe(namesList => {
            this.releasePlansTemp = namesList;
            this.tableIndex = 0;
        });
    }
    onRowClickEvent(event) {
        this.releasePlans = event;
        this.releasePlans.proposedHousing = event.addr;
        this.okReadOnly = false;
    }
    getData(event) {
        this.dialog.close({
            proposedHousing: this.releasePlans.proposedHousing
        });
    }
    clearData() {
        this.dialog.close(null);
    }
}
