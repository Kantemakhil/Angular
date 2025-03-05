import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiditranService } from '../service/oiditran.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CaseloadAdmOtherProfiles } from '@instmovementexternalbeans/CaseloadAdmOtherProfiles';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
// import required bean declarations

@Component({
    selector: 'app-oiditranagylocs',
    templateUrl: './oiditranagylocs.component.html'
})
export class OiditranagylocsComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    agyLocColumnDefs: any[];
    cgfkOffemtoagylocidRg: any[] = [];
    caseloadId: any;
    caseloadprofData: CaseloadAdmOtherProfiles [] = [];
    caseloadprofModel: CaseloadAdmOtherProfiles = new CaseloadAdmOtherProfiles();
    constructor(private oiditranFactory: OiditranService, private sessionManager: UserSessionManager ,
        public translateService: TranslateService) {
        this.agyLocColumnDefs = [];
    }

    ngOnInit() {
        this.agyLocColumnDefs = [
            { fieldName: this.translateService.translate('oiditran.agylocid'), field: 'agyLocId', editable: true, width: 200 },
            { fieldName: this.translateService.translate('common.agency'), field: 'description', width: 250, editable: true },
            { fieldName: this.translateService.translate('oiditran.bedlocation'), field: 'code', editable: true, width: 200 },
        ];
        this.caseloadId = this.sessionManager.currentCaseLoad;
        const cgfkOffemtoagylocidServiceObj = this.oiditranFactory.cgfkOffemtoagylocidRecordGroup(this.caseloadId);
        cgfkOffemtoagylocidServiceObj.subscribe(cgfkOffemtoagylocidList => {
            if (cgfkOffemtoagylocidList.length === 0) {
                this.caseloadprofData = [];
            } else {
                    this.caseloadprofData = cgfkOffemtoagylocidList;
            }
        });
    }


    onRowClickEvent(event) {
        this.caseloadprofModel = new CaseloadAdmOtherProfiles();
        this.caseloadprofModel = event;
   }

    getData() {
        this.dialog.close({location: this.caseloadprofModel.agyLocId,
            livUnitDesc: this.caseloadprofModel.dspDescription,
            livUnitCode: this.caseloadprofModel.code ,
            livUnitid: this.caseloadprofModel.livUnitId});
    }
    clearData() {
        this.dialog.close( null );
    }
}
