import {
    Component,
    OnInit
} from '@angular/core';
import { ViewChild } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { OcucondiService } from '../service/ocucondi.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OffenderSentConditionsCommitBean } from '@inst/legal/beans/OffenderSentConditionsCommitBean';
import { OffenderSentConditions } from '@inst/legal/beans/OffenderSentConditions';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/dynamic-alpine-grid/dynamic-alpine-grid.component';
@Component({
    selector: 'app-ocudcond',
    templateUrl: './ocudcond.component.html',
    styleUrls: ['ocuucond.component.scss']
})

export class OcudcondComponent implements OnInit {
    @ViewChild('grid', { static: false }) grid: any;
    conditionColumndef: any[];
    conditionText = '';
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    conditionGridData = [];
    offcondCommitModel: OffenderSentConditionsCommitBean = new OffenderSentConditionsCommitBean();
    offenderSentConditionId: number = 0;
    orderType: string = '';
    offSentdeleteRecord: OffenderSentConditions[] = [];
    programIdMap: Map<string, number> = new Map<string, number>();
    condCategory: any;
    parentOrderType = '';
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;

    constructor(
        public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        private dialogService: DialogService,
        private service: OcucondiService,
    ) { }

    ngOnInit() {
        if (this.dialog.data && this.dialog.data.data && this.dialog.data.data.length > 0) {
            this.conditionGridData = this.dialog.data.data;
        }
        if (this.dialog.data && this.dialog.data.orderType) {
            this.parentOrderType = this.dialog.data.orderType;
        }
        this.conditionGridColumnDef();
        this.getProgramId();
        this.getCondCategory();
    }

    conditionGridColumnDef() {
        this.conditionColumndef = [
            {
                fieldName: this.translateService.translate(''), required: false,
                field: 'select', editable: true, datatype: 'checkbox',
            },
            {
                fieldName: this.translateService.translate('ocudcond.conditioncategory'), required: false,
                field: 'categoryType', editable: false, width: 150, datatype: 'lov', domain: 'COM_CON_CAT'
            },
            {
                fieldName: this.translateService.translate('ocudcond.description'), required: false,
                field: 'requirement', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocudcond.length'), required: false,
                field: 'length', editable: false, width: 150, datatype: 'number', minValue: 1, strictFP: true, whole: true,
            },
            {
                fieldName: this.translateService.translate('ocudcond.unit'),
                field: 'lengthUnit', editable: false, width: 150, datatype: 'lov', domain: 'COND_UNIT'
            },
            {
                fieldName: this.translateService.translate('ocudcond.startDate'), required: false,
                field: 'startDate', editable: false, width: 150, datatype: 'date',
            },
            {
                fieldName: this.translateService.translate('ocudcond.endDate'), required: false,
                field: 'expiryDate', editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocudcond.programreferral'),
                field: 'program', editable: false,
                width: 150, datatype: 'text', hide: false,
            },
            {
                fieldName: this.translateService.translate('ocudcond.status'), required: false,
                field: 'conditionStatus', editable: false, width: 150, datatype: 'lov', link: 'ocmpconf/rgOrderStatus?orderType=COND', source: 'OCMSTATS'
            },
            {
                fieldName: this.translateService.translate('ocudcond.legalTextofCondition'),
                field: 'longCommentText', editable: false, width: 150, datatype: 'text',
                hide: true, externalColumn: true
            },
        ];
    }

    getCondCategory() {
        this.service.getCondCategory(this.sessionManager.getId(), 'OCUCONDI').subscribe(data => {
            if (data) {
                this.condCategory = data
                this.conditionGridData.forEach(obj => {
                    if (obj["programMethod"] != 'ACP') {
                        const fiteredCat = this.condCategory.filter(obj => obj.code == obj["programMethod"]);
                        if (fiteredCat && fiteredCat.length > 0) {
                            obj['program'] = fiteredCat[0].description;
                        }
                    }
                });
            }
        });
    }

    delete() {
        if (!this.validation()) {
            return false;
        }
        this.offSentdeleteRecord = [];
        this.grid.updatedMap.forEach(
            (v: any, k: number) => {
                if (v.select) {
                    this.offSentdeleteRecord.push(v);
                }
            }
        );
        let ordersMappings = [{
            'displayNo': this.dialog.data.selectedOrder.displayNo,
            'operation': 'U'
        }];
        this.offcondCommitModel.deleteList = this.offSentdeleteRecord;
        if (this.offSentdeleteRecord && this.offSentdeleteRecord.length == 0) {
            return false;
        }
        this.offcondCommitModel.deleteList[0].orderOperations =  JSON.stringify(ordersMappings);
        const affetedRows = this.service.offSentConCommit(this.offcondCommitModel);
        affetedRows.subscribe(data => {
            if (data && data === 'success') {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.type = 'success';
                this.show();
                this.dialog.close(null);
            } else if (data && data === 'fail') {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            } else {
                const msg = this.translateService.translate('ocucondi.recordcannotdeleted');
                this.message = String(msg).replace('%tablename%', data);
                this.type = 'warn';
                this.show();
            }
        });
    }

    getProgramId() {
        const serviceObj = this.service.
            getProgram();
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else {
                data.forEach(ele => {
                    this.programIdMap.set(ele.code, ele.id);
                });
            }
        });
    }

    onRowClickCondition(event) {
        if (event && event.longCommentText) {
            this.conditionText = event.longCommentText;
        }
        else {
            this.conditionText = '';
        }
    }

    validation() {
        for (let i = 0; i < this.conditionGridData.length; i++) {
            if (this.conditionGridData[i]['select']) {
                if (this.conditionGridData[i]['planOfActionFlag'] == 'Y') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocudcond.thisconditionhascaseplan');
                    this.show();
                    return false;
                }
                if (this.conditionGridData[i]['commProjAllocFlag'] == 'Y') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocudcond.thisconditionhasunpaidworkrecord');
                    this.show();
                }
            }
        }
        return true
    }

    validateCondition = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'select' && event.newValue) {
            if (event.data.planOfActionFlag == 'Y') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocudcond.thisconditionhascaseplan');
                this.show();
                rowdata.validated = false;
                return rowdata;
            }
            if (event.data.commProjAllocFlag == 'Y') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocudcond.thisconditionhasunpaidworkrecord');
                this.show();
                rowdata.validated = false;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    get delBtnDisabled() {
        for (let i = 0; i < this.conditionGridData.length; i++) {
            if (this.conditionGridData[i]['select']) {
                return false;
            }
        }
        return true;
    }

    close() {
        this.dialog.close(null);
    }
}
