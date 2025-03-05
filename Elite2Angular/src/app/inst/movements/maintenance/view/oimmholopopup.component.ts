import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { ReleasePlans } from '@inst/movement-external/beans/ReleasePlans';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OimmholoService } from '@inst/movements/maintenance/service/oimmholo.service';

@Component({
    selector: 'app-oimmholopopup',
    templateUrl: './oimmholopopup.component.html'
})
export class OimmholopopupComponent implements OnInit {
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
    changeDisabled: boolean;
    commentText: any;
    constructor(private oimmholoFactory: OimmholoService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService) {
    }

    ngOnInit() {
        this.okReadOnly = true;
        this.changeDisabled = true;
        if (this.dialog.data.data) {
            this.commentText = this.dialog.data.data;
        }
        if (this.dialog.data.bata) {
            this.commentText = this.dialog.data.bata;
        }
        const staffmembersServiceObj = this.oimmholoFactory.checkInheritAttributes(this.dialog.data.livingUnitId);
        staffmembersServiceObj.subscribe(data => {
            if (data > 0 && this.dialog.data.activeFlag) {
                this.changeDisabled = false;
            } else {
                this.changeDisabled = true;
            }
        });
    }
    getData() {
        const dataObj = this.oimmholoFactory.butChangeEvent(this.dialog.data);
        dataObj.subscribe(data => {
            this.dialog.close(null);
        });
    }
    clearData() {
        this.dialog.close(null);
    }
}
