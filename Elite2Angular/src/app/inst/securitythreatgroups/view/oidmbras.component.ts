import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidmbrasService } from '../service/oidmbras.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderStgAssociations } from '@instSecurityThreatGroupsbeans/OffenderStgAssociations';
import { OffenderStgAssociationsCommitBean } from '@instSecurityThreatGroupsbeans/OffenderStgAssociationsCommitBean';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn, GridComponent } from '@core/ui-components/grid/grid.component';

@Component({
    selector: 'app-oidmbras',
    templateUrl: './oidmbras.component.html'
})

export class OidmbrasComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('grid') grid: GridComponent;
    msgs: any[] = [];
    offenderstgassociationsData: OffenderStgAssociations[] = [];
    offenderstgassociationsModel: OffenderStgAssociations = new OffenderStgAssociations();
    offenderStgAssociationsCommitModel: OffenderStgAssociationsCommitBean = new OffenderStgAssociationsCommitBean();
    offenderstgassociationsInsertList: OffenderStgAssociations[] = [];
    offenderstgassociationsUpdateList: OffenderStgAssociations[] = [];
    offenderstgassociationsDeleteList: OffenderStgAssociations[] = [];
    offenderStgAssociationsColumnDef: any[];
    selectIndex = -1;
    stgDelete: boolean;
    titles = { 'description': this.trMsg('common.descriptioncaps'), 'code': this.trMsg('common.codecaps') };
    valueChangeFlag: boolean;
    clearDisabled: boolean;
    savedisabled: boolean;
    index: any;
    commentText: string;
    constructor(private oidmbrasFactory: OidmbrasService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.offenderStgAssociationsColumnDef = [];
    }
    ngOnInit() {
        this.stgDelete = false;
        this.clearDisabled = true;
        this.savedisabled = true;
        this.offenderStgAssociationsColumnDef = [
            { fieldName: this.trMsg('common.date') + '*', field: 'effectiveDate', datatype: 'date', editable: false, width: 150 },
            {
                fieldName: this.trMsg('common.group') + '*', field: 'groupCode', editable: true, width: 150,
                maxlength: 300, cellEditable: this.canGrievanceDateEdit, datatype: 'text', uppercase: 'false'
            },
            {
                fieldName: this.trMsg('common.reason') + '*', field: 'reasonCode', datatype: 'lov', titles: this.titles,
                domain: 'MBR_AFF_RSN', editable: true, width: 150, cellEditable: this.canGrievanceDateEdit
            },
            { fieldName: this.trMsg('common.enteredby'), field: 'createUserId', editable: false, width: 150 },
            { fieldName: this.trMsg('common.active'), field: 'activeFlag', datatype: 'checkbox', editable: true, width: 150 },
            { fieldName: this.trMsg('common.expirydate'), field: 'expiryDate', datatype: 'date', editable: false, width: 150 },
            { fieldName: this.trMsg('oidmbras.expiredby'), field: 'expiredBy', maxlength: 32, editable: false, width: 150 },
            { fieldName: '', field: 'commentText', hide: true },
        ];
        this.offenderstgassociationsExecuteQuery();
    }
    canGrievanceDateEdit = (data: any, index: number, field: string): boolean => {
        if (data.stgSeq) {
            return false;
        } else {
            return true;
        }
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
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    onRowClickoffenderstgassociations(event) {
        if (event) {
            this.offenderstgassociationsModel = event;
            this.index = this.offenderstgassociationsData.indexOf(event);
            this.savedisabled = true;
            if (!this.offenderstgassociationsModel.stgSeq) {
                this.stgDelete = false;
                this.valueChangeFlag = false;
            } else {
                this.stgDelete = true;
                this.valueChangeFlag = true;
            }
            if (!this.offenderstgassociationsModel.commentText) {
                this.clearDisabled = true;
            } else {
                this.clearDisabled = false;
            }
            this.commentText = event.commentText;
        } else {
            this.commentText = null;
        }
    }
    cancel() {
        this.dialog.close(null);
    }
    isInsertable() {
        if (this.offenderstgassociationsModel.commentText) {
            if (this.offenderstgassociationsModel.stgSeq) {
                this.savedisabled = false;
            } else {
                this.savedisabled = true;
            }
            this.clearDisabled = false;
        } else {
            this.savedisabled = false;
            this.clearDisabled = true;
        }
    }
    offenderstgassociationsExecuteQuery() {
        this.offenderstgassociationsModel.offenderBookId = this.dialog.data.offenderBookId;
        const offenderstgassociationsResult = this.oidmbrasFactory.
            offenderStgAssociationsExecuteQuery(this.offenderstgassociationsModel);
        offenderstgassociationsResult.subscribe(data => {
            if (data.length === 0) {
                this.offenderstgassociationsData = [];
                this.offenderstgassociationsModel = new OffenderStgAssociations();
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.offenderstgassociationsData = data;
                this.valueChangeFlag = false;
                this.selectIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidmbrasSaveoffenderstgassociationsForm(event) {
        if (!this.oidmbrasValidations()) {
            return;
        }
        this.offenderstgassociationsInsertList = event.added;
        this.offenderstgassociationsUpdateList = event.updated;
        this.offenderstgassociationsDeleteList = event.removed;
        this.offenderStgAssociationsCommitModel.insertList = [];
        this.offenderStgAssociationsCommitModel.updateList = [];
        this.offenderStgAssociationsCommitModel.deleteList = [];
        if (this.offenderstgassociationsInsertList.length > 0 || this.offenderstgassociationsUpdateList.length > 0) {
            for (let i = 0; i < this.offenderstgassociationsInsertList.length; i++) {
                this.offenderstgassociationsInsertList[i].offenderBookId = this.dialog.data.offenderBookId;
                this.offenderstgassociationsInsertList[i].createUserId = this.sessionManager.getId();
                this.offenderstgassociationsInsertList[i].createDatetime = DateFormat.getDate();
                this.offenderstgassociationsInsertList[i].activeFlag =
                    this.offenderstgassociationsInsertList[i].activeFlag ? 'Y' : 'N';
                this.offenderStgAssociationsCommitModel.insertList = this.offenderstgassociationsInsertList;
            }
            for (let i = 0; i < this.offenderstgassociationsUpdateList.length; i++) {
                this.offenderstgassociationsUpdateList[i].activeFlag =
                    this.offenderstgassociationsUpdateList[i].activeFlag ? 'Y' : 'N';
                this.offenderStgAssociationsCommitModel.updateList = this.offenderstgassociationsUpdateList;
            }
        }
        if (this.offenderstgassociationsDeleteList.length > 0) {
            for (let i = 0; i < this.offenderstgassociationsDeleteList.length; i++) {
                this.offenderstgassociationsDeleteList[i].activeFlag =
                    this.offenderstgassociationsDeleteList[i].activeFlag ? 'Y' : 'N';
                this.offenderStgAssociationsCommitModel.deleteList = this.offenderstgassociationsDeleteList;
            }
        }
        const offenderstgassociationsSaveData = this.oidmbrasFactory.offenderStgAssociationsCommit(this.offenderStgAssociationsCommitModel);
        offenderstgassociationsSaveData.subscribe(data => {
            if (data === 1) {
                this.savedisabled = true;
                this.clearDisabled = true;
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.offenderstgassociationsExecuteQuery();
                return;
            } else {
                this.savedisabled = true;
                this.clearDisabled = true;
                this.show('common.addupdateremoverecordfailed');
                this.offenderstgassociationsExecuteQuery();
                return;
            }
        });
    }
    oidmbrasValidations() {
        const is = { valid: true };
        this.offenderstgassociationsData.forEach(data => {
            if (is.valid) {
                if (!data.groupCode) {
                    this.show('oidmbras.groupmustbeentered');
                    is.valid = false;
                    return;
                }
                if (!data.reasonCode) {
                    this.show('common.reasonmustbeentered');
                    is.valid = false;
                    return;
                }
            }
        });
        return is.valid;
    }
    onGridInsert = () => {
        if (!this.oidmbrasValidations()) {
            return;
        }
        return { effectiveDate: DateFormat.getDate(), createUserId: this.sessionManager.getId(), activeFlag: true };
    }
    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        const index = event.rowIndex;
        if (event.newValue !== event.oldValue) {
            if (event.field === 'activeFlag') {
                setTimeout(ele => {
                    this.grid.setColumnData('expiredBy', index, !event.newValue ? this.sessionManager.getId() : null);
                    this.grid.setColumnData('expiryDate', index, !event.newValue ? DateFormat.getDate() : null);
                }, 100);
            }
        }
        return rowdata;
    }
    onGridDelete = () => {
        this.commentText = null;
        return true;
    }
    valueChange() {
        setTimeout(ele => {
            this.grid.setColumnData('commentText', this.index, this.commentText);
        }, 50);
    }
    onGridClear = () => {
        this.commentText = null;
        return true;
    }
}

