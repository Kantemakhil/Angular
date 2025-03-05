import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiufsoffService } from '../service/oiufsoff.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OiufsoffGetGeneralOffenders } from '@inmate/trust/financialreports/beans/OiufsoffGetGeneralOffenders';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogComponent } from '@ui-components/dialog/dialog.component';

@Component({
    selector: 'app-oiufsoff',
    templateUrl: './oiufsoff.component.html'
})

export class OiufsoffComponent implements OnInit {
    voffbkgData: any[] = [];
    offsubmitData: any[] = [];
    voffbkgModel: OiufsoffGetGeneralOffenders = new OiufsoffGetGeneralOffenders();
    voffbkgModelData: OiufsoffGetGeneralOffenders = new OiufsoffGetGeneralOffenders();
    offSubmitColumnDef: any[] = [];
    vOffBkgColumnDef: any[] = [];
    groupOptions: any[] = [];
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('gridSubmit', {static: true}) gridSubmit: any;
    @ViewChild('grid', {static: true}) grid: any;
    caseloadId: string;
    facilityLink: string;
    housingOneLink: string;
    housingTwoLink: string;
    housingThreeLink: string;
    facilityTitle: any;
    housingOneTitle: any;
    housingTwoTitle: any;
    housingThreeTitle: any;
    tableIndex = -1;
    clearDisable: boolean;
    selectDisable: boolean;
    submitDisable: boolean;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    selectFlag: boolean;
    constructor(private oiufsoffFactory: OiufsoffService,
        public sessionManager: UserSessionManager,
        public translateService: TranslateService) {
    }
    ngOnInit() {
        this.clearDisable = true;
        this.selectDisable = true;
        this.submitDisable = true;
        this.caseloadId = this.sessionManager.currentCaseLoad;
        this.facilityLink = `oiufsoff/cgfkAgyLocIdRecordGroup?caselaodId=${this.caseloadId}`;
        this.facilityTitle = { 'description': this.translateService.translate('common.description') };
        this.housingOneTitle = { 'description': this.translateService.translate('oiufsoff.levelonedescription') };
        this.housingTwoTitle = { 'description': this.translateService.translate('oiufsoff.leveltwodescription') };
        this.housingThreeTitle = { 'description': this.translateService.translate('oiufsoff.levelthreedescription') };
        this.offSubmitColumnDef = [
            {
                fieldName: this.translateService.translate('common.remove'), field: 'nbtRemove', datatype: 'checkbox',
                editable: true, width: 150
            },
            { fieldName: this.translateService.translate('osiosear.Orca2'), field: 'offenderIdDisplay', editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.name-given-2'), field: 'middleName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.location'), field: 'prisonLocation', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('oiufsoff.activetrustaccount'), field: 'nbtActvTrustFlag', editable: false,
                datatype: 'checkbox', width: 150
            },
        ];
        this.vOffBkgColumnDef = [
            {
                fieldName: this.translateService.translate('common.select'), field: 'nbtSelect', datatype: 'checkbox',
                editable: true, width: 150
            },
            { fieldName: this.translateService.translate('ID#'), field: 'offenderIdDisplay', editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.name-given-2'), field: 'middleName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.location'), field: 'prisonLocation', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('oiufsoff.activetrustaccount'), field: 'nbtActvTrustFlag',
                datatype: 'checkbox', editable: false, width: 150
            },

        ];
        this.groupOptions = [
            { 'id': 'A', 'text': this.translateService.translate('oiufsoff.activeoffenders') },
            { 'id': 'N', 'text': this.translateService.translate('oiufsoff.inactiveoffenders') },
            { 'id': '', 'text': this.translateService.translate('oiufsoff.alloffenders') }
        ];
        this.voffbkgModel.pActiveFlag = 'A';
    }
    onFacilityChange(event) {

        if (event) {
            this.housingOneLink = `oiufsoff/cgfkHousingLevelOneRecordGroup?agyLocId=${event.code}`;
        } else {
            this.housingOneLink = null;
        }
    }
    onHousingOneChange(event) {

        if (event) {
            this.housingTwoLink =
                `oiufsoff/cgfkHousingLevelTwoRecordGroup?agyLocId=${this.voffbkgModel.pAgyLocId}&parentLivingUnitId=${event.code}`;
        } else {
            this.housingTwoLink = null;
        }
    }
    onHousingTwoChange(event) {

        if (event) {
            this.housingThreeLink =
                `oiufsoff/cgfkHousingLevelThreeRecordGroup?agyLocId=${this.voffbkgModel.pAgyLocId}&parentLivingUnitId=${event.code}`;
        } else {
            this.housingThreeLink = null;
        }
    }
    onRowClickvoffbkg(event) {
    }
    onRowClickoffsubmit(event) {
        if (event) {
            this.voffbkgModelData = event;
        }
    }
    selectAllData() {
        const removeRowData = JSON.parse(JSON.stringify(this.offsubmitData));
        removeRowData.push(...this.voffbkgData);
        setTimeout(ele => {
            this.offsubmitData = removeRowData;
            this.submitDisable = false;
        }, 100);
        const rowData = JSON.parse(JSON.stringify(this.voffbkgData));
        rowData.forEach(ele => {
            ele.nbtSelect = 'Y';
        });
        setTimeout(ele => {
            this.voffbkgData = rowData;
        }, 100);
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    no() {
        this.voffbkgModel = new OiufsoffGetGeneralOffenders();
        this.voffbkgModelData = new OiufsoffGetGeneralOffenders();
        this.offsubmitData = [];
        this.voffbkgData = [];
        this.voffbkgModel.pActiveFlag = 'A';
        this.submitDisable = true;
        this.clearDisable = true;
        this.selectDisable = true;
        this.selectFlag = false;
        this.voffbkgModel.pAgyLocId = this.voffbkgModel.pAgyLocId === undefined ? '' : undefined;
        this.voffbkgModel.dspLvOneId = this.voffbkgModel.dspLvOneId === undefined ? '' : undefined;
      // this.voffbkgModel.dspLvTwoId = this.voffbkgModel.dspLvTwoId === undefined ? '' : undefined;
        //this.voffbkgModel.dspLvThreeId = this.voffbkgModel.dspLvThreeId === undefined ? '' : undefined;
    }
    voffbkgExecuteQuery() {
        if (this.voffbkgModel.pAgyLocId && this.voffbkgModel.dspLvOneId) {
            this.selectDisable = false;
        } else {
            this.selectDisable = true;
        }
        if (this.voffbkgModel.pOffenderIdDisplay) {
            for (let i = Number(String(this.voffbkgModel.pOffenderIdDisplay).length); i < 10; i++) {
                this.voffbkgModel.pOffenderIdDisplay = '0' + this.voffbkgModel.pOffenderIdDisplay;
            }
        }
        this.voffbkgModel.pCaseloadId = this.caseloadId;
        this.voffbkgModel.pReportApplnCode = this.dialog.data.reportApplnCode;
        this.voffbkgModel.pLv1Id = this.voffbkgModel.dspLvOneId ? Number(this.voffbkgModel.dspLvOneId) : null;
        this.voffbkgModel.pLv2Id = this.voffbkgModel.dspLvTwoId ? Number(this.voffbkgModel.dspLvTwoId) : null;
        this.voffbkgModel.pLv3Id = this.voffbkgModel.dspLvThreeId ? Number(this.voffbkgModel.dspLvThreeId) : null;
        const voffbkgResult = this.oiufsoffFactory.
            vOffBkgExecuteQuery(this.voffbkgModel);
        voffbkgResult.subscribe(voffbkgResultList => {
            if (voffbkgResultList.length === 0) {
                this.voffbkgData = [];
                this.selectDisable = true;
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                return;
            } else {
                const record = { index: 0 };
                voffbkgResultList.forEach(ele => {
                    ele.nbtActvTrustFlag = ele.nbtActvTrustFlag === 'Y' ? 'Y' : null;
                    ele.index = record.index;
                    record.index++;
                });
                this.voffbkgData = voffbkgResultList;
                this.clearDisable = false;
            }
        });
    }
    resultValidate = (event) => {
        if (event && event.field === 'nbtSelect' && event.newValue) {
            const index = event.rowIndex;
            const gridRowData = JSON.parse(JSON.stringify(this.voffbkgData));
            gridRowData.splice(index, 1);
            const data = JSON.parse(JSON.stringify(this.offsubmitData));
            const eventdata = event.data;
            eventdata.nbtSelect = null;
            data.push(eventdata);
            setTimeout(ele => {
                this.offsubmitData = data;
                this.voffbkgData = gridRowData;
                this.submitDisable = false;
                this.tableIndex = 0;
            }, 100);
        }
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        return rowdata;
    }
    offenderValidate = (event) => {
        const rowdata = new ValidateRowReturn();
        if (event && event.field === 'nbtRemove') {
            const index = event.rowIndex;
            const gridRowData = JSON.parse(JSON.stringify(this.offsubmitData));
            gridRowData.splice(index, 1);
            const data = JSON.parse(JSON.stringify(this.voffbkgData));
            const eventdata = event.data;
            eventdata.nbtRemove = null;
            data.splice(event.data.index, 0, eventdata);
            setTimeout(ele => {
                this.voffbkgData = data;
                this.offsubmitData = gridRowData;
                if (this.offsubmitData.length === 0) {
                    this.submitDisable = true;
                } else {
                    this.submitDisable = false;
                }
            }, 100);
        }
        rowdata.validated = true;
        return rowdata;
    }
    onActiveFlagChange(event) {
        this.voffbkgModel.pAgyLocId = '';
        this.voffbkgModel.dspLvOneId = '';
        this.voffbkgModel.dspLvTwoId = '';
        this.voffbkgModel.dspLvThreeId = '';
        if (event.value !== 'A') {
            this.housingOneLink = 'NoLink';
            this.housingTwoLink = 'NoLink';
            this.housingThreeLink = 'NoLink';
        }
    }
    facilityBlur(event) {
        if (!event) {
            this.voffbkgModel.pAgyLocId = this.voffbkgModel.pAgyLocId === undefined ? '' : undefined;
        }
    }
    livingOneBlur(event) {
        if (!event) {
            this.voffbkgModel.dspLvOneId = this.voffbkgModel.dspLvOneId === undefined ? '' : undefined;
        }
    }
    livingTwoBlur(event) {
        if (!event) {
            this.voffbkgModel.dspLvTwoId = this.voffbkgModel.dspLvTwoId === undefined ? '' : undefined;
        }
    }
    livingThreeBlur(event) {
        if (!event) {
            this.voffbkgModel.dspLvThreeId = this.voffbkgModel.dspLvThreeId === undefined ? '' : undefined;
        }
    }
    facilityFlag(event): boolean {
        if (event && event.options && event.options.length <= 0) {
            return true;
        }
        if (this.voffbkgModel.pActiveFlag !== 'A') {
            return true;
        }
        return false;
    }
    livingOneFlag(event): boolean {
        if (event && event.options && event.options.length <= 0) {
            return true;
        }
        if (this.voffbkgModel.pActiveFlag !== 'A') {
            return true;
        }
        if (!this.voffbkgModel.pAgyLocId) {
            return true;
        }
        return false;
    }
    livingTwoFlag(event): boolean {
        if (event && event.options && event.options.length <= 0) {
            return true;
        }
        if (this.voffbkgModel.pActiveFlag !== 'A') {
            return true;
        }
        if (!this.voffbkgModel.pAgyLocId || !this.voffbkgModel.dspLvOneId) {
            return true;
        }
        return false;
    }
    livingThreeFlag(event): boolean {
        if (event && event.options && event.options.length <= 0) {
            return true;
        }
        if (this.voffbkgModel.pActiveFlag !== 'A') {
            return true;
        }
        if (!this.voffbkgModel.pAgyLocId || !this.voffbkgModel.dspLvOneId || !this.voffbkgModel.dspLvTwoId) {
            return true;
        }
        return false;
    }
    ok() {
        this.dialog.close({
            accountCode: this.offsubmitData
        });
    }
    isInsertable() {
        if (this.voffbkgModel.pOffenderIdDisplay || this.voffbkgModel.pLastName || this.voffbkgModel.pFirstName
            || this.voffbkgModel.pMiddleName || this.voffbkgModel.pAgyLocId || this.voffbkgModel.dspLvOneId
            || this.voffbkgModel.dspLvTwoId || this.voffbkgModel.dspLvThreeId) {
            this.clearDisable = false;
        } else {
            this.clearDisable = true;
        }
    }
}
