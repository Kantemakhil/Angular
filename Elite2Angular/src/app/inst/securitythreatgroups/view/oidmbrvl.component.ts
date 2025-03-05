import { Component, OnInit, ViewChild } from '@angular/core';

import { TranslateService } from '@common/translate/translate.service';
import { OidmbrvlService } from '../service/oidmbrvl.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderStgDetails } from '@instSecurityThreatGroupsbeans/OffenderStgDetails';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OffenderStgDetailsCommitBean } from '@instSecurityThreatGroupsbeans/OffenderStgDetailsCommitBean';
import { DialogComponent } from '@ui-components/dialog/dialog.component';

@Component({
    selector: 'app-oidmbrvl',
    templateUrl: './oidmbrvl.component.html'
})

export class OidmbrvlComponent implements OnInit {
    msgs: any[] = [];
    @ViewChild('grid') grid: any;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    offenderstgdetailsData: OffenderStgDetails[] = [];
    offenderstgdetailsModel: OffenderStgDetails = new OffenderStgDetails();
    offenderstgdetailsInsertList: OffenderStgDetails[] = [];
    offenderstgdetailsCommitModel: OffenderStgDetailsCommitBean = new OffenderStgDetailsCommitBean();
    actionTitles: any;
    reasonTitles: any;
    offenderStgDetailsColumnDef: any[];
    data: any;
    selected = -1;
    retrieveFlag: boolean;
    constructor(private oidmbrvlFactory: OidmbrvlService,
        public translateService: TranslateService, public sessionManager: UserSessionManager) {
    }
    ngOnInit() {
        this.data = this.dialog && this.dialog.data ? this.dialog.data : {};
        this.retrieveFlag = false;
        this.actionTitles = { code: this.trMsg('oidmbrvl.actioncode'), description: this.trMsg('common.description') };
        this.reasonTitles = { code: this.trMsg('oidmbrvl.reasoncode'), description: this.trMsg('common.description') };
        this.offenderStgDetailsColumnDef = [
            { fieldName: this.trMsg('common.date', '*'), field: 'valDate', datatype: 'date', cellEditable: this.canCellEdit },
            {
                fieldName: this.trMsg('common.action', '*'), field: 'actionCode', datatype: 'lov', domain: 'STG_VAL_ACT',
                cellEditable: this.canCellEdit, editable: false, titles: this.actionTitles
            },
            {
                fieldName: this.trMsg('common.reason', '*'), field: 'reasonCode', datatype: 'lov', domain: 'MBR_VAL_RSN',
                cellEditable: this.canCellEdit, editable: false, titles: this.reasonTitles
            },
            {
                fieldName: this.trMsg('common.comment'), field: 'commentText', editable: false, cellEditable: this.canCellEdit,
                datatype: 'text', uppercase: 'false', maxlength: 999
            },
            { fieldName: this.trMsg('common.enteredby'), field: 'createUserId', editable: false, },
        ];
        this.offenderstgdetailsExecuteQuery();
    }
    gridInsert = () => {
        if (this.grid.addedMap && this.grid.addedMap.size > 0) {
            const added = [];
            this.grid.addedMap.forEach((v, k) => added.push(v));
            if (!this.gridValidation(added)) {
                return null;
            }
        }
        const record = new OffenderStgDetails();
        record.createUserId = this.sessionManager.getId();
        const sysdate = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
        record.valDate = sysdate;
        return record;
    }
    validateRow = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        /* if (event.newValue !== event.oldValue) {
            if (event.field === 'valDate' && event.newValue) {
                const valDate = DateFormat.getDate(event.newValue);
                if (DateFormat.compareDate(valDate, DateFormat.getDate()) > 0) {
                    this.show('oidmbrvl.validationdatemstbless');
                    this.grid.setColumnData(event.field, index, null);
                }
            }
        } */
        rowdata.validated = true;
        return rowdata;
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
    canCellEdit = (data: any, index: number, field: string) => {
        if (data.createDatetime) {
            return false;
        }
        return true;
    }
    onRowClickoffenderstgdetails(event) {
    }
    onButSaveclick() {
    }
    onButExitclick() {
    }
    ok() {
        this.offenderstgdetailsExecuteQuery(true);
    }
    no() {
        this.offenderstgdetailsModel = new OffenderStgDetails();
        this.offenderstgdetailsData = [];
        this.retrieveFlag = false;
    }
    cancel() {
    }

    offenderstgdetailsExecuteQuery(retBtn?) {
        this.selected = -1;
        this.offenderstgdetailsModel.offenderBookId = this.data.offenderBookId;
        this.offenderstgdetailsModel.stgSeq = this.data.stgSeq;
        const offenderstgdetailsResult = this.oidmbrvlFactory.
            offenderStgDetailsExecuteQuery(this.offenderstgdetailsModel);
        offenderstgdetailsResult.subscribe(offenderstgdetailsResultList => {
            if (offenderstgdetailsResultList.length === 0) {
                this.offenderstgdetailsData = [];
                this.retrieveFlag = false;
                if (retBtn) {
                    this.show('common.querycaused');
                }
            } else {
                offenderstgdetailsResultList.forEach(element => {
                    element.valDate = DateFormat.getDate(element.valDate);
                });
                this.retrieveFlag = true;
                this.offenderstgdetailsData = offenderstgdetailsResultList;
                this.selected = 0;
            }
        });
    }
    valDateBlur() {
        if (!this.offenderstgdetailsModel.valDate) {
            setTimeout(() => {
                this.offenderstgdetailsModel.valDate = this.offenderstgdetailsModel.valDate === null ? undefined : null;
            }, 50);
        }
    }
    actionBlur() {
        if (!this.offenderstgdetailsModel.actionCode) {
            this.offenderstgdetailsModel.actionCode = this.offenderstgdetailsModel.actionCode === undefined ? '' : undefined;
        }
    }
    reasonBlur() {
        if (!this.offenderstgdetailsModel.reasonCode) {
            this.offenderstgdetailsModel.reasonCode = this.offenderstgdetailsModel.reasonCode === undefined ? '' : undefined;
        }
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidmbrvlSaveoffenderstgdetailsForm(event) {
        if (!this.gridValidation(event.added)) {
            return null;
        }
        this.offenderstgdetailsInsertList = event.added;
        this.offenderstgdetailsCommitModel.insertList = [];
        this.offenderstgdetailsInsertList.forEach(ele => {
            ele.offenderBookId = this.data.offenderBookId;
            ele.stgSeq = this.data.stgSeq;
        });
        this.offenderstgdetailsCommitModel.insertList = this.offenderstgdetailsInsertList;

        const offenderstgdetailsSaveData = this.oidmbrvlFactory.offenderStgDetailsCommit(this.offenderstgdetailsCommitModel);
        offenderstgdetailsSaveData.subscribe(data => {
            if (data === 1) {
                this.offenderstgdetailsModel = new OffenderStgDetails();
                this.offenderstgdetailsExecuteQuery();
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
        });
    }

    gridValidation(list: any[]) {
        const is = { valid: true };
        if (list && Array.isArray(list)) {
            list.forEach(data => {
                if (is.valid) {
                    if (!data.valDate) {
                        this.show('common.datemustbeentereddate');
                        is.valid = false;
                        return;
                    }
                    const valDate = DateFormat.getDate(data.valDate);
                    if (DateFormat.compareDate(valDate, DateFormat.getDate()) > 0) {
                        this.show('oidmbrvl.validationdatemstbless');
                        is.valid = false;
                        return;
                    }
                    if (!data.actionCode) {
                        this.show('oidmbrvl.actionmstbentr');
                        is.valid = false;
                        return;
                    }
                    if (!data.reasonCode) {
                        this.show('oidmbrvl.reasonmstbeenter');
                        is.valid = false;
                        return;
                    }

                }
            });
        } else {
            is.valid = false;
        }
        return is.valid;

    }
    get clearFlag() {
        if (!this.offenderstgdetailsModel.valDate && !this.offenderstgdetailsModel.actionCode &&
            !this.offenderstgdetailsModel.reasonCode && !this.offenderstgdetailsModel.commentText &&
            this.offenderstgdetailsData.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    get isReadyOnly() {
        if (this.offenderstgdetailsData.length > 0) {
            return true;
        } else {
            return false;
        }
    }


}
