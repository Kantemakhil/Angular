
import {
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MaintainTierLevels } from '@cm/communitysupervisiontiers/maintenance/beans/MaintainTierLevels'
import { MaintainTierLevelsCommitBean } from '@cm/communitysupervisiontiers/maintenance/beans/MaintainTierLevelsCommitBean'

import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { LovService } from '@core/ui-components/lov/lov.service';
import { OcmtirlvService } from '../service/ocmtirlv.service';

@Component({
    selector: 'app-ocmtirlv',
    templateUrl: './ocmtirlv.component.html'
})
export class OcmtirlvComponent implements OnInit {
    @ViewChild('grid', { static: true }) grid: any;
    tierLevelRowData: MaintainTierLevels[] = [];
    tierLevelModel: MaintainTierLevels = new MaintainTierLevels();
    tierLevelCommitModel: MaintainTierLevelsCommitBean = new MaintainTierLevelsCommitBean();
    offenderColumnDef: any[];
    tierLevelInsertList: MaintainTierLevels[] = [];
    tierLevelUpdateList: MaintainTierLevels[] = [];
    tierLevelDeleteList: MaintainTierLevels[] = [];
    message: string;
    type: string;
    msgs: any[] = [];
    msglist = [];
    constructor(public translateService: TranslateService, private ocmtirlvservice: OcmtirlvService,
        private lovService: LovService, public sessionManager: UserSessionManager) {
    }
    ngOnInit(): void {
        this.offenderColumnDef = [
            { fieldName: this.translateService.translate('ocmtirlv.code'), field: 'code', datatype: 'text', editable: true, required: true, maxlength: 12, cellEditable: this.codeCellEdit },
            {fieldName: this.translateService.translate('ocmtirlv.tierdescription'), field: 'description', datatype: 'text', editable: true, required: true ,uppercase: 'false',maxlength: 40 },
            { fieldName: this.translateService.translate('ocmtirlv.workloadvalue'), field: 'workloadValue', datatype: 'number', editable: true, maxValue: '999', strictFP: true, whole: true, required: true },
            { fieldName: this.translateService.translate('ocmtirlv.reviewdays'), field: 'reviewDays', datatype: 'number', editable: true, required: true, maxValue: '999', strictFP: true, whole: true},
            { fieldName: this.translateService.translate('ocmtirlv.defaultevents'), field: 'sBtn', datatype: 'hyperlink', displayas: 'href', styleClass: 'launch', dialogWidth: '80%', link: '/OCMTIDET', modal: true, data: 'row'   },
            { fieldName: this.translateService.translate('ocmtirlv.defaultintaketierflag'), field: 'defaultIntakeTierFlag', datatype: 'checkbox', editable: true },
            { fieldName: this.translateService.translate('ocmtirlv.sequence'), field: 'listSequence', datatype: 'number', editable: true, maxValue: '999', strictFP: true, whole: true },
            { fieldName: this.translateService.translate('ocmtirlv.active'), field: 'activeFlag', datatype: 'checkbox', editable: true },
            { fieldName: this.translateService.translate('ocmtirlv.expirydate'), field: 'expiryDate', datatype: 'date', editable: false },
            { fieldName: '', field: 'sealFlag', datatype: 'text', editable: true, hide : true },
        ];
        this.tierLevelExcecuteQuery();
    }

    tierLevelExcecuteQuery() {
        this.tierLevelModel.caseloadId = this.sessionManager.currentCaseLoad;
        const obj = this.ocmtirlvservice.tierLevelExecuteQuery(this.tierLevelModel);
        obj.subscribe(data => {
            if (data.length > 0) {
                this.tierLevelRowData = data;
                this.tierLevelRowData.forEach(e => {
                    e.activeFlag = e.activeFlag === 'Y' ? true : false;
                    e.defaultIntakeTierFlag = e.defaultIntakeTierFlag === 'Y' ? true : false;
                    e['sBtn'] = '';
                })
            } else {
                this.tierLevelRowData = [];
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
            }
        })
    }

    tierLevelSavesForm(event) {
        for (let i = 0; i < this.tierLevelRowData.length; i++) {
            const duplicate = this.tierLevelRowData.filter(e => e.code == this.tierLevelRowData[i].code);
            if (duplicate.length > 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmtirlv.codealreadyexists');
                this.show();
                return;
            }
        }
        const duplicate = this.tierLevelRowData.filter(e => e.defaultIntakeTierFlag);
       /*  if (duplicate.length === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmtirlv.defaultintaketierflagmustbeentered');
            this.show();
            return;
        } */
        if (duplicate.length > 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmtirlv.onlyonedefaultintaketierflagshouldbeactive');
            this.show();
            return;
        }
        this.tierLevelInsertList = event.added;
        this.tierLevelUpdateList = event.updated;
        this.tierLevelDeleteList = event.removed;

        this.tierLevelCommitModel.insertList = [];
        this.tierLevelCommitModel.updateList = [];
        this.tierLevelCommitModel.deleteList = [];

        if (this.tierLevelInsertList.length > 0 || this.tierLevelUpdateList.length > 0 || this.tierLevelDeleteList.length > 0) {
            for (let i = 0; i < this.tierLevelInsertList.length; i++) {
                if (this.tierLevelInsertList[i].activeFlag) {
                    this.tierLevelInsertList[i].activeFlag = 'Y';
                    this.tierLevelInsertList[i].caseloadId = this.sessionManager.currentCaseLoad;
                    this.tierLevelInsertList[i].expiryDate = null;
                } else {
                    this.tierLevelInsertList[i].activeFlag = 'N';
                    this.tierLevelInsertList[i].expiryDate = DateFormat.getDate();
                }
                this.tierLevelInsertList[i].defaultIntakeTierFlag = this.tierLevelInsertList[i].defaultIntakeTierFlag ? 'Y' : 'N';
                this.tierLevelInsertList[i].sealFlag = undefined;
                this.tierLevelCommitModel.insertList = this.tierLevelInsertList;
            }

            for (let i = 0; i < this.tierLevelUpdateList.length; i++) {
                if (this.tierLevelUpdateList[i].activeFlag) {
                    this.tierLevelUpdateList[i].activeFlag = 'Y';
                    this.tierLevelUpdateList[i].expiryDate = null;
                } else {
                    this.tierLevelUpdateList[i].activeFlag = 'N';
                    this.tierLevelUpdateList[i].expiryDate = DateFormat.getDate();
                }
                this.tierLevelUpdateList[i].defaultIntakeTierFlag = this.tierLevelUpdateList[i].defaultIntakeTierFlag ? 'Y' : 'N';
                this.tierLevelUpdateList[i].sealFlag = undefined;
                this.tierLevelCommitModel.updateList = this.tierLevelUpdateList;
            }

            for (let i = 0; i < this.tierLevelDeleteList.length; i++) {
                this.tierLevelDeleteList[i].createDatetime = DateFormat.getDate(this.tierLevelDeleteList[i].createDatetime);
                this.tierLevelDeleteList[i].modifyDatetime = DateFormat.getDate(this.tierLevelDeleteList[i].modifyDatetime);
                this.tierLevelDeleteList[i].expiryDate = DateFormat.getDate(this.tierLevelDeleteList[i].expiryDate);
                this.tierLevelCommitModel.deleteList = this.tierLevelDeleteList;
            }
        }

        const assAnsSaveData = this.ocmtirlvservice.tierLevelCommit(this.tierLevelCommitModel);
        assAnsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.tierLevelExcecuteQuery();
                return;
            }else if(data === 3){
                this.type = 'warn';
                this.message = this.translateService.translate('common.cannotdeletemasterchildrecord');
                this.show();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });

    }

    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (event.field === 'activeFlag') {
            if (!event.data.activeFlag && event.data.defaultIntakeTierFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmtirlv.youcannotdactivedfltinttierflagrecord');
                this.show();
                return;
            } else if (event.field === 'activeFlag' && !(event.data.activeFlag)) {
                this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
            } else {
                this.grid.setColumnData('expiryDate', rowIndex, undefined);
            }
            rowdata.validated = true;
            return rowdata;
        }

        if (event.field === 'defaultIntakeTierFlag') {
            if (event.data.defaultIntakeTierFlag && !event.data.activeFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocmtirlv.youcannotassigninactrecdefintaktierflag');
                this.show();
                return;
            }
        }
        if (event.field === 'defaultIntakeTierFlag') {
            if ( event.data.defaultIntakeTierFlag) {
                this.grid.setColumnData('sealFlag', rowIndex,"true");
            } else {
                this.grid.setColumnData('sealFlag', rowIndex, undefined);
            }
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }

    codeCellEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    codeCellEditComm = (data: any, index: number, field: string): boolean => {
        if (data.editableBtn > 0) {
            return false;
        } else {
            return true;
        }
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    tierLevelInsert = () => {
        return { activeFlag: true }
    }


}