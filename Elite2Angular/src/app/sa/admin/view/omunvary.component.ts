import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OmunvaryService } from '../service/omunvary.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { NameSynonyms } from '@sa/admin/beans/NameSynonyms';
import { NameSynonymsCommitBean } from '@sa/admin/beans/NameSynonymsCommitBean';

@Component({
    selector: 'app-omunvary',
    templateUrl: './omunvary.component.html'
})

export class OmunvaryComponent implements OnInit {
    msgs: any[] = [];
    nameSynonymsData: NameSynonyms[] = [];
    nameSynonymsSaveData: NameSynonyms[] = [];
    nameSynonymsModel: NameSynonyms = new NameSynonyms();
    nameSynonymsBean: NameSynonyms = new NameSynonyms();
    nameSynonymsIndex = -1;
    nameSynonymsInsertList: NameSynonyms[] = [];
    nameSynonymsUpdateList: NameSynonyms[] = [];
    nameSynonymsDeleteList: NameSynonyms[] = [];
    nameSynonymsCommitModel: NameSynonymsCommitBean = new NameSynonymsCommitBean();
    display: boolean;
    nameSynonymsColumnDef: any[];
    @ViewChild('grid', {static: true}) grid: any;
    constructor(private omunvaryFactory: OmunvaryService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.nameSynonymsColumnDef = [];
    }
    ngOnInit() {
        this.nameSynonymsIndex = -1;
        this.nameSynonymsExecuteQuery();
        this.nameSynonymsColumnDef = [
            {
                fieldName: this.translateService.translate('common.name') + '*', field: 'baseName', editable: true, width: 50,
                maxlength: 35, datatype: 'text', uppercase: true, cellEditable: this.cellEditEevnt
            },
            {
                fieldName: this.translateService.translate('omunvary.namevariation') + '*', field: 'name', editable: true, width: 50,
                maxlength: 35, datatype: 'text', uppercase: true, cellEditable: this.cellEditEevnt
            },
            { fieldName: '', field: 'hideValue', hide: true },
        ];
    }
    cellEditEevnt = (data: any, index: number, field: string): boolean => {
        if (this.nameSynonymsBean && this.nameSynonymsBean.createDatetime) {
            return false;
        }
        return true;
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
    onButClear() {
        this.nameSynonymsData = [];
        this.nameSynonymsModel = new NameSynonyms();
        this.nameSynonymsBean = new NameSynonyms();
    }
    /**
*  This function is used to enable/disable Retrive button
*/
    get rettBtnFlg() {
        if (this.nameSynonymsData.length === 0) {
            return false;
        } else {
            return true;
        }
    }
    get readeOnlyFields() {
        if (this.nameSynonymsData.length === 0) {
            return false;
        } else {
            return true;
        }
    }
    /**
     *  This function is used to enable/disable clear button
     */
    get clrBtnFlag() {
        if (this.nameSynonymsData.length === 0 && !this.nameSynonymsModel.name &&
            !this.nameSynonymsModel.baseName) {
            return true;
        } else {
            return false;
        }
    }
    get gridDelBtn() {
        if (!this.nameSynonymsBean.createDatetime) {
            return false;
        }
        return true;
    }
    get gridInsBtn() {
        if (this.nameSynonymsModel.name && this.nameSynonymsModel.name.replace(/\s/g, '') ||
            this.nameSynonymsModel.baseName && this.nameSynonymsModel.baseName.replace(/\s/g, '')) {
            return false;
        }
        return true;
    }
    onRowClickEvent(event) {
        if (event) {
            this.nameSynonymsBean = event;
        }
    }
    onGridInsert = () => {
        this.nameSynonymsSaveData = [];
        this.grid.addedMap.forEach(
            (v: any, k: number) => {
                this.nameSynonymsSaveData.push(v);
            }
        );
        this.grid.updatedMap.forEach(
            (v: any, k: number) => {
                this.nameSynonymsSaveData.push(v);
            }
        );
        this.grid.removedMap.forEach(
            (v: any, k: number) => {
                this.nameSynonymsSaveData.push(v);
            }
        );
        for (let i = 0; i < this.nameSynonymsSaveData.length; i++) {
            if (this.validationEvent(this.nameSynonymsSaveData[i])) {
                return;
            }
        }
        return { baseName: this.nameSynonymsBean.baseName };
    }

    nameSynonymsExecuteQuery() {
        const nameSynonymsResult = this.omunvaryFactory.
            nameSynonymsExecuteQuery(this.nameSynonymsModel);
        nameSynonymsResult.subscribe(nameSynonymsResultList => {
            if (nameSynonymsResultList.length === 0) {
                this.nameSynonymsData = [];
                this.nameSynonymsIndex = -1;
                this.show(this.translateService.translate('common.querycaused'));
            } else {
                this.nameSynonymsData = nameSynonymsResultList;
                this.nameSynonymsIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fields
    */
    omunvarySavenameSynonymsForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.nameSynonymsInsertList = event.added;
        this.nameSynonymsUpdateList = event.updated;
        this.nameSynonymsDeleteList = event.removed;
        this.nameSynonymsCommitModel.insertList = [];
        this.nameSynonymsCommitModel.updateList = [];
        this.nameSynonymsCommitModel.deleteList = [];
        if (this.nameSynonymsInsertList.length > 0) {
            for (let i = 0; i < this.nameSynonymsInsertList.length; i++) {
                if (this.validationEvent(this.nameSynonymsInsertList[i])) {
                    return;
                }
            }
            this.nameSynonymsCommitModel.insertList = this.nameSynonymsInsertList;
        }
        if (this.nameSynonymsDeleteList.length > 0) {
            for (let i = 0; i < this.nameSynonymsDeleteList.length; i++) {
                if (this.validationEvent(this.nameSynonymsDeleteList[i])) {
                    return;
                }
            }
            this.nameSynonymsCommitModel.deleteList = this.nameSynonymsDeleteList;
        }
        const nameSynonymsSaveData = this.omunvaryFactory.nameSynonymsCommit(this.nameSynonymsCommitModel);
        nameSynonymsSaveData.subscribe(data => {
            if (data === '1' || data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.nameSynonymsExecuteQuery();
            } else if (data.length > 2) {
                this.show(this.translateService.translate('omunvary.rowalreadyexists').replace('%tablename%', data));
                this.nameSynonymsExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
            }
        });
    }
    validationEvent(event) {
        if (!event.baseName) {
            this.show(this.translateService.translate('common.namemustbeentered'), 'warn');
            return true;
        }
        if (!event.name) {
            this.show(this.translateService.translate('omunvary.namevariationmustbeentered'), 'warn');
            return true;
        }
    }

}
