import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Statutes } from '../beans/Statutes';
import { OimstatuService } from '../service/oimstatu.service';
import { StatutesCommitBean } from '../beans/StatutesCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
    selector: 'app-oimstatu',
    templateUrl: './oimstatu.component.html'
})

export class OimstatuComponent implements OnInit {
    // Variable declaration
    @ViewChild('grid') grid: any;
    msgs: any[] = [];
    statData: Statutes[] = [];
    statutesSearchModel: Statutes = new Statutes();
    statModel: Statutes = new Statutes();
    statCommitModel: StatutesCommitBean = new StatutesCommitBean();
    statInsertList: Statutes[] = [];
    statUpdatetList: Statutes[] = [];
    statDeleteList: Statutes[] = [];
    statColumnDef: any[];
    type: string;
    message: string;
    msglist: any[];
    retrievedisabled: boolean;
    clearDisabled: boolean;
    disableSearchFields: boolean;
    statutesGridInsert: boolean;
    statutesGridDelete: boolean;
    tableIndex = -1;
    lovTitles = {
        code: this.translateService.translate('oimstatu.legis'),
        description: this.translateService.translate('common.description')
    };
    constructor(private oimstatuFactory: OimstatuService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        // TODO initilize data members here..!
        this.statColumnDef = [];
    }
    ngOnInit() {
        this.retrievedisabled = false;
        this.clearDisabled = true;
        this.statutesGridInsert = false;
        this.statutesGridDelete = false;
        this.disableSearchFields = false;
        this.statColumnDef = [
            {
                fieldName: this.translateService.translate('oimstatu.id') + '*', field: 'statuteCode', editable: true, width: 150,
                datatype: 'text', maxlength: 12
            },
            {
                fieldName: this.translateService.translate('common.description') + '*', field: 'description', editable: true, width: 150,
                datatype: 'text', uppercase: 'false', maxlength: 150
            },
            {
                fieldName: this.translateService.translate('oimstatu.legislativeBody') + '*', field: 'legislatingBodyCode',
                editable: true, width: 150, datatype: 'lov', domain: 'LEGISL_BODY', titles: this.lovTitles
            },
            {
                fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', editable: true, width: 100,
                maxValue: '999', strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
                datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
                width: 150, datatype: 'date'
            },
        ];
    }

    isInsertable(date?) {
        if ((this.statutesSearchModel.statuteCode || this.statutesSearchModel.description
            || this.statutesSearchModel.legislatingBodyCode || this.statutesSearchModel.listSeq
            || this.statutesSearchModel.activeFlag || this.statutesSearchModel.expiryDate) || this.disableSearchFields) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
        if (date) {
            this.clearDisabled = false;
        }
    }
    /** 
   * This function displays the messages
   */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    cancel() {
        this.retrievedisabled = false;
        this.disableSearchFields = false;
        this.clearDisabled = true;
        this.statutesGridDelete = false;
        this.statutesSearchModel = new Statutes();
        this.statData = [];
    }

    statExecuteQuery(date?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.leapyearnotallowed');
                this.show();
                this.clearDisabled = false;
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show();
                this.clearDisabled = false;
                return;
            }
        }
        this.statutesGridInsert = true;
        const statResult = this.oimstatuFactory.
            statExecuteQuery(this.statutesSearchModel);
        statResult.subscribe(statResultList => {
            if (statResultList.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycausedReEnter');
                this.show();
                this.statData = [];
                this.statutesSearchModel = new Statutes();
                this.clearDisabled = true;
                this.retrievedisabled = false;
            } else {
                this.disableSearchFields = true;
                this.statutesGridDelete = true;
                this.retrievedisabled = true;
                this.clearDisabled = false;
                statResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.statData = statResultList;
                this.tableIndex = 0;

            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oimstatuSavestatForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.statInsertList = event.added;
        this.statUpdatetList = event.updated;
        this.statDeleteList = event.removed;
        this.statCommitModel.insertList = [];
        this.statCommitModel.updateList = [];
        this.statCommitModel.deleteList = [];
        if (this.statInsertList.length > 0 || this.statUpdatetList.length > 0) {
            for (let i = 0; i < this.statInsertList.length; i++) {
                if (!this.statInsertList[i].statuteCode || !this.statInsertList[i].statuteCode.trim()) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimstatu.idMustBeEnter');
                    this.show();
                    return;
                }
                if (!this.statInsertList[i].description || !this.statInsertList[i].description.trim()) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.descriptionmustbeentered');
                    this.show();
                    return;
                }
                if (!this.statInsertList[i].legislatingBodyCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimstatu.legislativeMustBeEnter');
                    this.show();
                    return;
                }
                this.statInsertList[i].activeFlag = this.statInsertList[i].activeFlag ? 'Y' : 'N';
                this.statInsertList[i].updateAllowedFlag = 'Y';
                this.statCommitModel.insertList = this.statInsertList;
            }
            for (let i = 0; i < this.statUpdatetList.length; i++) {
                this.statUpdatetList[i].activeFlag = this.statUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.statCommitModel.updateList = this.statUpdatetList;
            }
        }
        if (this.statDeleteList.length > 0) {
            for (let i = 0; i < this.statDeleteList.length; i++) {
                this.statDeleteList[i].activeFlag = this.statDeleteList[i].activeFlag ? 'Y' : 'N';
                this.statCommitModel.deleteList = this.statDeleteList;
            }
        }
        const statSaveData = this.oimstatuFactory.statCommit(this.statCommitModel);
        statSaveData.subscribe(data => {
            if (data[0].statuteCode && String(data[0].statuteCode) === '2292' && data[0].sealFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimstatu.canNotDelete').replace('%table%', data[0].sealFlag);
                this.show();
                return;
            } else if (data[0].statuteCode && String(data[0].statuteCode) === '2291' && data[0].sealFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimstatu.canNotUpdate').replace('%table%', data[0].sealFlag);
                this.show();
                return;
            }
            if (String(data[0].errorMessage).indexOf('STATUTES_PK') > 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimstatu.rowAlreadyExists');
                this.show();
            } else if (data[0] && data[0].sealFlag === '1') {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.statExecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });

    }

    onGridInsert = () => {
        for (let i = 0; i < this.statData.length; i++) {
            if (!this.statData[i].statuteCode || !this.statData[i].statuteCode.trim()) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimstatu.idMustBeEnter');
                this.show();
                return;
            }
            if (!this.statData[i].description || !this.statData[i].description.trim()) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.descriptionmustbeentered');
                this.show();
                return;
            }
            if (!this.statData[i].legislatingBodyCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimstatu.legislativeMustBeEnter');
                this.show();
                return;
            }
        }
        return {
            activeFlag: 'Y'
        };
    }

    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.grid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.grid.setColumnData('expiryDate', rowIndex,
                    DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'statuteCode') {
            for (let i = 0; i < this.statData.length; i++) {
                for (let j = 0; j < this.statData.length; j++) {
                    if (i !== j && this.statData[i].statuteCode === this.statData[j].statuteCode) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oimstatu.rowAlreadyExists');
                        this.show();
                        return;
                    }
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    onGridClear = () => {
        this.statExecuteQuery();
        return true;
    }
}
