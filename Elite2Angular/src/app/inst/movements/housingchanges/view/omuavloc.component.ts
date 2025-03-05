import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OmuavlocService } from '../service/omuavloc.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CaseLoadAgencyLocations } from '@sa/admin/beans/CaseLoadAgencyLocations';
import { VLivUnits } from '@inst/movements/housingchanges/beans/VLivUnits';

@Component({
    selector: 'app-omuavloc',
    templateUrl: './omuavloc.component.html'
})

export class OmuavlocComponent implements OnInit {
    livunitModel: VLivUnits = new VLivUnits();
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    livunitData: VLivUnits[] = [];
    livunitDataTemp: VLivUnits[] = [];
    caseLoadAgyModel: CaseLoadAgencyLocations = new CaseLoadAgencyLocations();
    livunitIndex = -1;
    livunitInsertList: VLivUnits[] = [];
    livunitUpdatetList: VLivUnits[] = [];
    livunitDeleteList: VLivUnits[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    offCipDetailsColumnDef: any[];
    livUnitColumnDef: any[];
    bedAhColumnDef: any[];
    resBlColumnDef: any[];
    bedAhReadOnly = false;
    sysPflReadOnly = false;
    crtMvTmpReadOnly = false;
    offCipDetailsReadOnly = false;
    vOffBkgReadOnly = false;
    resBlReadOnly = false;
    cg$ctrlReadOnly = false;
    livUnitReadOnly = false;
    livUnitDescValue: string;
    constructor(private omuavlocFactory: OmuavlocService,
        private sessionManager: UserSessionManager,
        public translateService: TranslateService) {
        this.offCipDetailsColumnDef = [];
        this.livUnitColumnDef = [];
        this.bedAhColumnDef = [];
        this.resBlColumnDef = [];
    }
    ngOnInit() {
        this.offCipDetailsColumnDef = [
            { fieldName: 'Type*', field: 'nbtPlacementDesc', editable: false, width: 150 },
            { fieldName: 'Requested By*', field: 'nbtRequestedBy', editable: false, width: 150 },
            { fieldName: 'Reason*', field: 'nbtPlaceReasonDesc', editable: false, width: 150 },
            { fieldName: 'Facility*', field: 'nbtAgyLocDesc', editable: false, width: 150 },
            { fieldName: '', field: 'butReqStaff', editable: false, width: 150 },
            { fieldName: '', field: 'butPlacementType', editable: false, width: 150 },
            { fieldName: '', field: 'butPlacementReason', editable: false, width: 150 },
            { fieldName: '', field: 'butAgyLocId', editable: false, width: 150 },
        ];
        this.livUnitColumnDef = [
            { fieldName: this.translateService.translate('oumagloc.houselevel1'), field: 'level1Desc', editable: false, width: 150 },
            { fieldName: '', field: 'level1Code', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oumagloc.houselevel2'), field: 'level2Desc', editable: false, width: 150 },
            { fieldName: '', field: 'level2Code', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oumagloc.houselevel3'), field: 'level3Desc', editable: false, width: 150 },
            { fieldName: '', field: 'level3Code', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oumagloc.houselevel4'), field: 'level4Desc', editable: false, width: 150 },
            { fieldName: '', field: 'level4Code', editable: false, width: 150 },

        ];
        this.bedAhColumnDef = [
            { fieldName: '', field: 'dspLastName', editable: false, width: 150 },
            { fieldName: '', field: 'dspFirstName', editable: false, width: 150 },
            { fieldName: '', field: 'dspOffenderIdDisplay2', editable: false, width: 150 },
            { fieldName: '', field: 'butLivingUnitId', editable: false, width: 150 },
            { fieldName: 'Reason', field: 'dspDescription', editable: false, width: 150 },
            { fieldName: 'To Location*', field: 'cgnbtLivingUnitId2', editable: false, width: 150 },
            { fieldName: 'From Location', field: 'dspLivingUnitDescription', editable: false, width: 150 },
            { fieldName: '', field: 'dspOffenderIdDisplay', editable: false, width: 150 },
            { fieldName: '', field: 'dspDescription2', editable: false, width: 150 },
        ];
        this.resBlColumnDef = [
            { fieldName: '', field: 'agyLocId2', editable: false, width: 150 },
            { fieldName: '', field: 'butCommentText', editable: false, width: 150 },
            { fieldName: 'Until Date*', field: 'reserveUntilDate', editable: false, width: 150 },
            { fieldName: 'Comment', field: 'commentText', editable: false, width: 150 },
            { fieldName: '', field: 'agyLocId', editable: false, width: 150 },
            { fieldName: '', field: 'cgnbtOffenderId', editable: false, width: 150 },
            { fieldName: '', field: 'butOffenderId', editable: false, width: 150 },
            { fieldName: 'OC?', field: 'cgnbtCommentText', editable: false, width: 150 },
            { fieldName: '', field: 'cgnbtOffenderId2', editable: false, width: 150 },
            { fieldName: '', field: 'offenderId', editable: false, width: 150 },
            { fieldName: 'CB', field: 'cgnbtOffenderId3', editable: false, width: 150 },
            { fieldName: '', field: 'reserveBedId', editable: false, width: 150 },
            { fieldName: '', field: 'butLivingUnitId', editable: false, width: 150 },
            { fieldName: 'Location*', field: 'cgnbtLivingUnitId', editable: false, width: 150 },
            { fieldName: '', field: 'livingUnitId', editable: false, width: 150 },
            { fieldName: '', field: 'dspOffenderIdDisplay', editable: false, width: 150 },
        ];
        this.livunitExecuteQuery();
    }
    onPbOkclick() {
        this.livUnitDescValue = undefined;
        this.livUnitDescValue = this.livunitModel.agyLocId + '-' + this.livunitModel.level1Code;
        if (this.livunitModel.level2Code) {
            this.livUnitDescValue = this.livUnitDescValue + '-' + this.livunitModel.level2Code;
            if (this.livunitModel.level3Code) {
                this.livUnitDescValue = this.livUnitDescValue + '-' + this.livunitModel.level3Code;
                if (this.livunitModel.level4Code) {
                    this.livUnitDescValue = this.livUnitDescValue + '-' + this.livunitModel.level4Code;
                }
            }
        }
        if (this.livunitData.length === 0) {
            this.dialog.close({ cbFlag: false });

        } else {
            this.dialog.close({
                livingUnitDesc: this.livUnitDescValue,
                livingUnitId: this.livunitModel.livingUnitId
            });
        }
    }
    onPbCancelclick() {
        this.dialog.close(null);
    }
    onRowClicklivunit(event) {
        if (event) {
            this.livunitModel = new VLivUnits();
            this.livunitModel = event;
        }
    }
    ok() {

    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    livunitExecuteQuery() {
        this.caseLoadAgyModel.caseloadId = this.sessionManager.currentCaseLoad;
        if (this.dialog.data.agyLocId) {
            this.caseLoadAgyModel.agyLocId = this.dialog.data.agyLocId;
        } else {
            // this.caseLoadAgyModel.agyLocId = this.sessionManager.currentCaseLoad;
        }
        const livunitResult = this.omuavlocFactory.livUnitExecuteQuery(this.caseLoadAgyModel);
        livunitResult.subscribe(livunitResultList => {
            if (livunitResultList.length === 0) {
                this.livunitData = [];
                this.livunitIndex = -1;
            } else {
                this.livunitIndex = 0;
                this.livunitData = livunitResultList;
                this.livunitModel = livunitResultList[0];
            }
        });
    }


}
