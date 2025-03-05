import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimsatypService } from '@inst/legal-screens/maintenance/service/oimsatyp.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { SentenceAdjustment } from '@inst/legal/beans/SentenceAdjustment';
import { SentenceAdjustmentCommitBean } from '@inst/legal-screens/maintenance/beans/SentenceAdjustmentCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-oimsatyp',
    templateUrl: './oimsatyp.component.html'
})

export class OimsatypComponent implements OnInit {
    @ViewChild('grid') grid: any;
    msgs: any[] = [];
    sentenceAdjustmentsData: SentenceAdjustment[] = [];
    gridInsertList: SentenceAdjustment[] = [];
    sentenceAdjustmentModel: SentenceAdjustment = new SentenceAdjustment();
    sentenceAdjustmentModelBean: SentenceAdjustment = new SentenceAdjustment();
    sentenceAdjustmentIndex = -1;
    sentenceAdjustmentInsertList: SentenceAdjustment[] = [];
    sentenceAdjustmentUpdateList: SentenceAdjustment[] = [];
    sentenceAdjustmentDeleteList: SentenceAdjustment[] = [];
    sentenceAdjustmentColumnDef: any[];
    sentenceAdjustmentCommitModel: SentenceAdjustmentCommitBean = new SentenceAdjustmentCommitBean();
    lovTitles = { 'description': this.translateService.translate('common.usagecode'), 'code': this.translateService.translate('common.usagecode') };
    editFlag = false;
    constructor(private oimsatypFactory: OimsatypService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.sentenceAdjustmentColumnDef = [];
    }
    ngOnInit() {
        this.sentenceAdjustmentModel = new SentenceAdjustment();
        this.sentenceAdjustmentModel.usageCode = undefined;
        this.sentenceAdjustmentIndex = -1;
        this.onButClear();
        this.sentenceAdjustmentColumnDef = [
            {
                fieldName: this.translateService.translate('common.type') + '*', field: 'sentenceAdjustCode', editable: true, width: 150,
                datatype: 'text', maxlength: 12, uppercase: 'true', cellEditable: this.canCelledit
            },
            {
                fieldName: this.translateService.translate('common.description') + '*', field: 'description', editable: true,datatype: 'text',
                width: 150, maxlength: 80 , uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('common.debit') + '*', field: 'debitCreditCode', editable: true, width: 150,
                domain: 'AC_TXN_POST', datatype: 'lov', titles: {
                    code: this.translateService.translate('common.debit'),
                    description: this.translateService.translate('common.debit')
                }
            },
            {
                fieldName: this.translateService.translate('common.usagecode') + '*', field: 'usageCode', editable: true, width: 150,
                domain: 'USG_CODE', datatype: 'lov', titles: {
                    code: this.translateService.translate('common.usagecode'),
                    description: this.translateService.translate('common.usagecode')
                }
            },
            {
                fieldName: this.translateService.translate('common.act') + '*', field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox'
            },
            { fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150, datatype: 'date' },
        ];
        this.sentenceAdjustmentExecuteQuery();
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
    /**
    * event is fired when try to edit the some fields in the grid.
    */
    canCelledit = (data: any, index: number, field: string, originalIndex: number): boolean => {
        if (data.createDatetime) {
            return false;
        }
        return true;
    }
    onButClear() {
        this.sentenceAdjustmentsData = [];
        this.sentenceAdjustmentModel = new SentenceAdjustment();
        if (!this.sentenceAdjustmentModel.usageCode) {
            this.sentenceAdjustmentModel.usageCode = this.sentenceAdjustmentModel.usageCode === '' ? undefined : '';
        }
    }
    /**
  *  This function is used to enable/disable Retrive button
  */
    get rettBtnFlg() {
        if (this.sentenceAdjustmentModel.sentenceAdjustCode ||
            this.sentenceAdjustmentModel.usageCode || this.sentenceAdjustmentModel.activeFlag ||
            this.sentenceAdjustmentModel.expiryDate) {
            return false;
        }
        if (this.sentenceAdjustmentsData.length === 0) {
            return false;
        } else {
            return true;
        }
    }
    get readeOnlyFields() {
        if (this.sentenceAdjustmentsData.length === 0) {
            return false;
        } else {
            return true;
        }
    }
    isEditable (event) {
        if (event) {
            if (event.lastValue === '' || event.lastValue === null) {
                this.editFlag = false;
            } else {
                this.editFlag = true;
            }
        }
    }
    get gridInsBtn() {
        if (this.sentenceAdjustmentModel.sentenceAdjustCode ||
            this.sentenceAdjustmentModel.usageCode || this.sentenceAdjustmentModel.activeFlag ||
            this.sentenceAdjustmentModel.expiryDate || this.editFlag) {
            return false;
        }
        return true;
    }
    /**
     *  This function is used to enable/disable clesr button
     */
    get clrBtnFlag() {
        if (this.sentenceAdjustmentModel.sentenceAdjustCode ||
            this.sentenceAdjustmentModel.usageCode || this.sentenceAdjustmentModel.activeFlag ||
            this.sentenceAdjustmentModel.expiryDate) {
            return false;
        }
        if (this.sentenceAdjustmentsData.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    onCodeChange() {
        if (!this.sentenceAdjustmentModel.usageCode) {
            this.sentenceAdjustmentModel.usageCode = this.sentenceAdjustmentModel.usageCode === '' ? undefined : '';
        }
    }
    get gridDelBtn() {
        if (!this.sentenceAdjustmentModelBean.createDatetime) {
            return false;
        }
        return true;
    }
    onRowClickEvent(event) {
        if (event) {
            this.sentenceAdjustmentModelBean = event;
        }
    }
    sentenceAdjustmentExecuteQuery(date?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        if (!this.sentenceAdjustmentModel.usageCode) {
            this.sentenceAdjustmentModel.usageCode = this.sentenceAdjustmentModel.usageCode === '' ? undefined : '';
        }
        const SentenceAdjustmentResult = this.oimsatypFactory.
            sentenceAdjustmentsExecuteQuery(this.sentenceAdjustmentModel);
        SentenceAdjustmentResult.subscribe(SentenceAdjustmentResultList => {
            if (SentenceAdjustmentResultList.length === 0) {
                this.sentenceAdjustmentsData = [];
                this.sentenceAdjustmentIndex = -1;
                this.show(this.translateService.translate('common.querycaused'));
                this.sentenceAdjustmentModel = new SentenceAdjustment();
            } else {
                SentenceAdjustmentResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.sentenceAdjustmentsData = SentenceAdjustmentResultList;
                this.sentenceAdjustmentIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oimsatypSaveSentenceAdjustmentForm(event) {
        this.sentenceAdjustmentInsertList = event.added;
        this.sentenceAdjustmentUpdateList = event.updated;
        this.sentenceAdjustmentDeleteList = event.removed;
        this.sentenceAdjustmentCommitModel.insertList = [];
        this.sentenceAdjustmentCommitModel.updateList = [];
        this.sentenceAdjustmentCommitModel.deleteList = [];
        if (this.sentenceAdjustmentInsertList.length > 0 || this.sentenceAdjustmentUpdateList.length > 0) {
            for (let i = 0; i < this.sentenceAdjustmentInsertList.length; i++) {
                if (!this.gridValidations(this.sentenceAdjustmentInsertList[i])) {
                    return;
                }
                // if (!this.sentenceAdjustmentInsertList[i].activeFlag) {
                //     this.show(this.translateService.translate('oimsatyp.youcannotunchecktheactfornewentry'));
                //     return;
                // }
                //this.sentenceAdjustmentInsertList[i].activeFlag = 'Y';
                this.sentenceAdjustmentInsertList[i].activeFlag=this.sentenceAdjustmentInsertList[i].activeFlag? 'Y' :'N';
            }
            for (let i = 0; i < this.sentenceAdjustmentUpdateList.length; i++) {
                if (!this.gridValidations(this.sentenceAdjustmentUpdateList[i])) {
                    return;
                }
                // if (this.sentenceAdjustmentUpdateList[i].activeFlag) {
                //     this.sentenceAdjustmentUpdateList[i].activeFlag = 'Y';
                // } else {
                //     this.sentenceAdjustmentUpdateList[i].activeFlag = 'N';
                // }
                this.sentenceAdjustmentUpdateList[i].activeFlag=this.sentenceAdjustmentUpdateList[i].activeFlag? 'Y' :'N';
            }
            this.sentenceAdjustmentCommitModel.insertList = this.sentenceAdjustmentInsertList;
            this.sentenceAdjustmentCommitModel.updateList = this.sentenceAdjustmentUpdateList;
        }
        if (this.sentenceAdjustmentDeleteList.length > 0) {
            for (let i = 0; i < this.sentenceAdjustmentDeleteList.length; i++) {
            }
            this.sentenceAdjustmentCommitModel.deleteList = this.sentenceAdjustmentDeleteList;
        }
        const SentenceAdjustmentSaveData = this.oimsatypFactory.sentenceAdjustmentsCommit(this.sentenceAdjustmentCommitModel);
        SentenceAdjustmentSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.sentenceAdjustmentExecuteQuery();
            } else if (data === 2) {
                this.show(this.translateService.translate('oimsatyp.rowexistsalreadywithsametype'), 'warn');
            }  else if (data === 18) {
                this.show(this.translateService.translate('oimsatyp.childsexists'), 'warn');
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
            }
        });
    }
    /**
     *  This function will be executed when we edit grid row data under Housing Locations Block
     */
    validateRowData = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.grid.setColumnData('activeFlag', index, true);
                this.grid.setColumnData('expiryDate', index, undefined);
                rowdata.validated = true;
                return rowdata;
            } else {
                this.grid.setColumnData('activeFlag', index, event.data.activeFlag);
                this.grid.setColumnData('expiryDate', index, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    onGridClear = () => {
        this.sentenceAdjustmentExecuteQuery();
        return true;
    }
    /*
        *  This event is used to insert the data in Internal Locations Block.
        */
    onGridInsert = () => {
        this.gridInsertList = [];
        this.grid.addedMap.forEach(
            (v: any, k: number) => {
                this.gridInsertList.push(v);
            }
        );
        if (this.gridInsertList.length > 0) {
            for (let i = 0; i < this.gridInsertList.length; i++) {
                if (!this.gridValidations(this.gridInsertList[i])) {
                    return;
                }
            }
        }
        return { activeFlag: true };
    }
    gridValidations(event) {
        if (event.sentenceAdjustCode) {
            event.sentenceAdjustCode = event.sentenceAdjustCode.replace(/\s/g, '');
        }
        if (!event.sentenceAdjustCode) {
            this.show(this.translateService.translate('common.typemustbeentered'));
            return false;
        }
        if (!event.description) {
            this.show(this.translateService.translate('common.descriptionmustbeentered'));
            return false;
        }
        if (!event.debitCreditCode) {
            this.show(this.translateService.translate('oimsatyp.debitcreditmustbeentered'));
            return false;
        }
        if (!event.usageCode) {
            this.show(this.translateService.translate('oimsatyp.usagecodemustbe'));
            return false;
        }
        return true;
    }
}
