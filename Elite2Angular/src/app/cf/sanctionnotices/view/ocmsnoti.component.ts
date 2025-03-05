import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmsnotiService } from '../service/ocmsnoti.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { SanctionNotices } from '../beans/SanctionNotices';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { SanctionNoticesCommitBean } from '../beans/SanctionNoticesCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';


@Component({
    selector: 'app-ocmsnoti',
    templateUrl: './ocmsnoti.component.html'
})

export class OcmsnotiComponent implements OnInit {
    @ViewChild('grid', {static: true}) grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    sannotData: SanctionNotices[] = [];
    sannotDataTemp: SanctionNotices[] = [];
    sannotModel: SanctionNotices = new SanctionNotices();
    sanNotBean: SanctionNotices = new SanctionNotices();
    sannotIndex = 0;
    sannotInsertList: SanctionNotices[] = [];
    sannotUpdatetList: SanctionNotices[] = [];
    sannotDeleteList: SanctionNotices[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    retriveDisable: boolean;
    clearDisable: boolean;
    disabled: boolean;
    editable = true;
    sanNotColumnDef: any[];
    sanNotReadOnly = false;
    sannotCommitModel: SanctionNoticesCommitBean = new SanctionNoticesCommitBean();
    type: string;
    message: string;
    tableIndex: number;
    constructor(private ocmsnotiFactory: OcmsnotiService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.sanNotColumnDef = [];
    }
    ngOnInit() {
        this.clearDisable = true;
        this.retriveDisable = false;
        this.sannotExecuteQuery();
        this.sanNotColumnDef = [
            {
                fieldName: this.translateService.translate('ocmsnoti.sanctionnoticetype') + '*', field: 'sanctionNoticeCode',
                editable: true, width: 150, maxlength: 12, cellEditable: this.canAlertEdit, datatype: 'text', uppercase: 'false'
            },

            {
                fieldName: this.translateService.translate('ocmsnoti.sanctionnotice') + '*', field: 'description',
                editable: true, width: 150, maxlength: 40, cellEditable: this.canAlertEditForSanctioNotice, datatype: 'text',
                uppercase: 'false'
            },

            {
                fieldName: this.translateService.translate('ocmsnoti.issueperiod') + '*', field: 'lateDays', editable: true,
                width: 150, maxValue: '999999', strictFP: true, whole: true, datatype: 'number',
                cellEditable: this.canAlertEditForSanctioNotice
            },

            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },

            {
                fieldName: this.translateService.translate('common.seq') + '*', field: 'seqNum', editable: true,
                width: 150, maxValue: '999', strictFP: true, whole: true, datatype: 'number',
                cellEditable: this.canAlertEditForSanctioNotice
            },

            {
                fieldName: this.translateService.translate('ocmsnoti.updateallowed'), field: 'updateAllowedFlag', editable: true,
                width: 150, datatype: 'checkbox'
            },

            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                editable: false, width: 150, datatype: 'date'
            },
        ];
        let serviceObj;
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
        if (event.field === 'updateAllowedFlag') {
            if (event.data.createDatetime && event.data.updateAllowedFlag && !event.data.updateAllowed) {
                this.grid.setColumnData('updateAllowedFlag', rowIndex, false);
                this.show(this.translateService.translate('ocmsnoti.updateallowedflag'));
            }

        }
        rowdata.validated = true;
        return rowdata;

    }
     /**
     *  This function is used to enable/disable clear button
     */
    get clrBtnFlag() {
        if (this.sannotData.length === 0 && !this.sannotModel.sanctionNoticeCode &&
            !this.sannotModel.issuePeriod  && !this.sannotModel.description && this.sannotModel.issuePeriod !== 0 &&
            !this.sannotModel.seqNum && this.sannotModel.seqNum !== 0) {
            return true;
        } else {
            return false;
        }
    }
    get readeOnlyFields() {
        if (this.sannotData.length === 0) {
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
    sannotExecuteQuery() {
        this.sannotModel.lateDays = this.sannotModel.issuePeriod ;
        const sannotResult = this.ocmsnotiFactory.
            sanNotExecuteQuery(this.sannotModel);
        sannotResult.subscribe(sannotResultList => {
            if (sannotResultList.length === 0) {
                this.sannotData = [];
                this.show(this.translateService.translate('common.querycaused'));
                this.clearDisable = false;
            } else {
                this.sannotData = sannotResultList;
                sannotResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.updateAllowedFlag = element.updateAllowedFlag === 'Y' ? true : false;
                    element.updateAllowed = element.updateAllowedFlag ;

                });
                this.clearDisable = false;
                this.retriveDisable = true;
               // this.sannotModel = sannotResultList[0];
                this.tableIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    *
    */

    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    canAlertEditForSanctioNotice = (data: any, index: number, field: string): boolean => {
        if(data.createDatetime) {
        if (this.sanNotBean.updateAllowedFlag) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
    }
    onRowClickSanctionNotice(event) {
        if (event) {
            this.sanNotBean = event;

        }

    }
    ocmsnotiValidations() {
        const is = { valid: true };
        this.sannotData.forEach(data => {
            if (is.valid) {
                if (!data.sanctionNoticeCode || !data.sanctionNoticeCode.trim()) {
                    this.show('ocmsnoti.sanctionnoticetypemandetory', 'warn');
                    is.valid = false;
                    return;
                }
            }
            if (!data.description || !data.description.trim()) {
                this.show('ocmsnoti.sanctionnoticemandetory', 'warn');
                is.valid = false;
                return;
            }
            if (!data.lateDays  && data.lateDays !== 0) {
                this.show('ocmsnoti.issueperiodmandetory', 'warn');
                is.valid = false;
                return;
            }
            if (!data.seqNum && data.seqNum !== 0) {
                this.show('ocmsnoti.seq', 'warn');
                is.valid = false;
                return;
            }

        });
        return is.valid;
    }
    
    sannotclearQuery() {
        this.sannotData = [];
        this.sannotModel = new SanctionNotices();
        this.retriveDisable = false;
        this.clearDisable = true;
    }
    ocmsnotiSavesannotForm(event) {
        // TODO declare commit bean and add insert list to that object.
        if (!this.ocmsnotiValidations()) {
            return;
        }
        this.sannotInsertList = event.added;
        this.sannotUpdatetList = event.updated;
        this.sannotDeleteList = event.removed;
        this.sannotCommitModel.insertList = [];
        this.sannotCommitModel.updateList = [];
        this.sannotCommitModel.deleteList = [];
        if (this.sannotInsertList.length > 0 || this.sannotUpdatetList.length > 0) {
            for (let i = 0; i < this.sannotInsertList.length; i++) {
                this.sannotInsertList[i].activeFlag = this.sannotInsertList[i].activeFlag ? 'Y' : 'N';
                this.sannotInsertList[i].updateAllowedFlag = this.sannotInsertList[i].updateAllowedFlag ? 'Y' : 'N';
                this.sannotInsertList[i].createUserId = this.sessionManager.getId();
                this.sannotInsertList[i].modifyUserId = this.sessionManager.getId();
            }
            for (let i = 0; i < this.sannotUpdatetList.length; i++) {
                this.sannotUpdatetList[i].activeFlag = this.sannotUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.sannotUpdatetList[i].updateAllowedFlag = this.sannotUpdatetList[i].updateAllowedFlag ? 'Y' : 'N';
            }
            this.sannotCommitModel.insertList = this.sannotInsertList;
            this.sannotCommitModel.updateList = this.sannotUpdatetList;
        }
        const sannotSaveData = this.ocmsnotiFactory.sanNotCommit(this.sannotCommitModel);
        sannotSaveData.subscribe(data => {
            if (String(data.errorMessage).indexOf('SANCTION_NOTICES_PK') > 0 || String(data.errorMessage).indexOf('sanction_notices_pk') > 0) {
                this.message = this.translateService.translate('ocmsnoti.rowexists');
                this.show(this.message, 'warn');
                return;
            }
            if (data.sealFlag === '1') {
                this.show('common.addupdateremoverecordsuccess', 'success');
                 this.sannotExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed');
                return;
            }
        });



    }
    onGridInsert = () => {
        if (!this.ocmsnotiValidations()) {
                return false;
            }
            return {
                activeFlag: true,
                updateAllowedFlag: true

            };
        }
    onGridClear = () => {
        this.sannotExecuteQuery();
        return true;
    }
}
