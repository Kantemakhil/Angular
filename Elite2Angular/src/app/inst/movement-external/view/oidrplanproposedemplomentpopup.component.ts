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
    selector: 'app-oidrplanproposedemplomentpopup',
    templateUrl: './oidrplanproposedemplomentpopup.component.html'
})
export class OidrplanproposedemplomentpopupComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    releasePlans: ReleasePlans = new ReleasePlans();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    releasePlansTemp: ReleasePlans[] = [];
    chargeColumnDefpopup: any[];
    offBookId: any;
    caseLoadId: any;
    namesOption: any[] = [];
    offenderBookId: any;
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
            this.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        }
        this.chargeColumnDefpopup = [];
        this.chargeColumnDefpopup = [
            {
                fieldName: this.translateService.translate('oidrplan.employment'), field: 'proposedEmployment',
                editable: true, width: 750, filter: 'text', datatype: 'text'
            },
        ];
        const releasePlansServiceObj = this.oidrplanFactory.rgProposedEmploymentRecordGroup(this.offenderBookId);
        releasePlansServiceObj.subscribe(namesList => {
            this.releasePlansTemp = namesList;
            this.tableIndex = 0;
        });
    }
    onRowClickEvent(event) {
        this.releasePlans = event;
        this.releasePlans.proposedEmployment = event.proposedEmployment;
        this.releasePlans.employSeq = event.employSeq;
        this.okReadOnly = false;
    }
    getData(event) {
        this.dialog.close({
            proposedEmployment: this.releasePlans.proposedEmployment, employSeq: this.releasePlans.employSeq
        });
    }
    clearData() {
        this.dialog.close(null);
    }
}
