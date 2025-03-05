import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmacprdService } from '../service/otmacprd.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AccountPeriods } from '@inmate/beans/AccountPeriods';
import { AccountPeriodsCommitBean } from '@inmate/trust/financialsmaintenance/transaction/beans/AccountPeriodsCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
    selector: 'app-otmacprd',
    templateUrl: './otmacprd.component.html'
})

export class OtmacprdComponent implements OnInit {

    @ViewChild('grid', {static: true}) grid: any;
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    acprdData: AccountPeriods[] = [];
    acprdDataTemp: AccountPeriods[] = [];
    acprdModel: AccountPeriods = new AccountPeriods();
    acprdCommitModel: AccountPeriodsCommitBean = new AccountPeriodsCommitBean();
    acprdInsertList: AccountPeriods[] = [];
    acprdUpdatetList: AccountPeriods[] = [];
    acprdDeleteList: AccountPeriods[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    acPrdColumnDef: any[];
    isRetrieveDis: boolean;
    isClearDis: boolean;
    accountPeriodId: number;
    type: string;
    parentId: number;
    tableIndex = -1;
    acntPrdIdExists: boolean;
    savedData: boolean;
    startDate: Date;
    endDate: Date;
    constructor(private otmacprdFactory: OtmacprdService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        // TODO initilize data members here..!
        this.acPrdColumnDef = [];
    }
    ngOnInit() {
        this.isRetrieveDis = false;
        this.isClearDis = true;
        this.savedData = false;
        this.acPrdColumnDef = [
            {
                fieldName: this.translateService.translate('otmacprd.accountperiodid') + '*', field: 'accountPeriodId',
                editable: true, width: 150, datatype: 'number', maxValue: 999999, whole: true, strictFP: true ,cellEditable: this.canCellEditAcountPeriod
            },
            {
                fieldName: this.translateService.translate('common.type') + '*', field: 'accountPeriodType',
                editable: true, width: 150, datatype: 'text', maxlength: 12
            },
            {
                fieldName: this.translateService.translate('common.startdate'), field: 'startDate', editable: true, width: 150,
                datatype: 'date', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('common.enddate'), field: 'endDate', editable: true, width: 150,
                datatype: 'date', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('otmacprd.parentid') + '*', field: 'parentAccountPeriodId', editable: true,
                width: 150, datatype: 'number', maxValue: 999999
            },
        ];
        this.acprdExecuteQuery();
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
    onRowClickacprd(event) {
        if (event) {
            this.acprdModel = event;
        } else {
            this.acprdModel = new AccountPeriods();
        }
    }
    canCellEdit = (data: any, index: number, field: string) => {
        if (data.accountPeriodType === 'YR') {
            return false;
        }
        return true;

    }
    canCellEditAcountPeriod = (data: any, index: number, field: string) => {
        if (data.createDateTime) {
            return false;
        }
        return true;
    }
    valueChnange(event) {
        if (event) {
            this.isRetrieveDis = false;

        }

    }
    ok() {
        this.acprdExecuteQuery();
    }
    no() {
    }
    cancel() {
        this.acprdData = [];
        this.isRetrieveDis = false;
        this.isClearDis = true;
        this.accountPeriodId = null;
        this.type = null;
        this.parentId = null;
        this.startDate = null;
        this.endDate = null;
    }
    validateRowData = (event) => {
        if (this.acntPrdIdExists) {
            this.acntPrdIdExists = true;
        } else {
            this.acntPrdIdExists = false;
        }
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;

        if (event.field === 'startDate' && event.oldValue !== event.newValue && event.newValue) {
            const is = { valid: true };
            for (const row of this.acprdData) {
                const subIndex = this.acprdData.indexOf(row);
                if (index !== subIndex) {
                    is.valid = this.dateBetween(event.newValue, row.startDate, row.endDate);
                    if (!is.valid) {
                        break;
                    }
                }
            }
            if (!is.valid) {
                this.grid.setColumnData('startDate', index, null);
            } else {
                this.grid.gridOptions.api.stopEditing();
                const aDate = DateFormat.getDate(event.newValue);
                const val = this.otmacprdFactory.duplicateOverlapDate(DateFormat.format(aDate));
                val.subscribe(count => {
                    if (count > 0) {
                        this.show(this.translateService.translate('otmacprd.thedateyouhave'));
                        this.grid.setColumnData('startDate', index, null);
                        this.grid.setColumnData('endDate', index, null);
                    } else {
                        const eDate = aDate;
                        eDate.setMonth(eDate.getMonth() + 1);
                        eDate.setDate(0);
                        this.grid.setColumnData('endDate', index, eDate);

                    }

                });

            }

        }
        if (event.field === 'endDate' && event.oldValue !== event.newValue && event.newValue) {
            if (event.data.endDate) {
                const sdate = DateFormat.getDate(event.data.startDate);
                const edate = DateFormat.getDate(event.data.endDate);
                if (DateFormat.compareDate(edate, sdate) === -1) {
                    this.grid.setColumnData('endDate', index, null);
                    this.show(this.translateService.translate('otmacprd.invalidcombination'));

                }

            }
            const is = { valid: true };
            for (const row of this.acprdData) {
                const subIndex = this.acprdData.indexOf(row);
                if (index !== subIndex) {
                    is.valid = this.dateBetween(event.newValue, row.startDate, row.endDate);
                    if (!is.valid) {
                        break;
                    }
                }
            }
            if (!is.valid) {
                this.grid.setColumnData('endDate', index, null);
            } else {
                this.grid.gridOptions.api.stopEditing();
                const aDate = DateFormat.getDate(event.newValue);
                const val = this.otmacprdFactory.duplicateOverlapDate(DateFormat.format(aDate));
                val.subscribe(count => {
                    if (count > 0) {
                        this.show(this.translateService.translate('otmacprd.thedateyouhave'));
                        this.grid.setColumnData('endDate', index, null);
                    }

                });

            }
        }
        if (event.field === 'accountPeriodId' && event.oldValue !== event.newValue && event.newValue) {
            if (event.data.accountPeriodId) {
                const duplicate = this.otmacprdFactory.duplicateAccountperiodId(event.data.accountPeriodId);
                duplicate.subscribe(periodExists => {
                    if (periodExists === 1) {
                        this.acntPrdIdExists = true;
                        this.show(this.translateService.translate('otmacprd.thisaccountperiodalready'));

                    } else {
                        this.acntPrdIdExists = false;
                    }

                });


            }

        }
        rowdata.validated = true;
        return rowdata;
    }

    dateBetween(actualDate, startDate, endDate) {
        const aDate = DateFormat.getDate(actualDate);
        const sDate = DateFormat.getDate(startDate);
        const eDate = DateFormat.getDate(endDate);
        if (!sDate || !eDate) {
            return true;
        }
        if (DateFormat.compareDate(aDate, sDate) > -1 && DateFormat.compareDate(aDate, eDate) < 1) {
            this.show(this.translateService.translate('otmacprd.thedateyouhave'));
            return false;
        } else {
            return true;
        }
    }
    onGridInsert = () => {
        if (this.acprdData.length > 0) {

            if (!this.acprdData[this.acprdData.length - 1].accountPeriodId) {
                this.show(this.translateService.translate('otmacprd.accountperiodmust'));
                return null;

            }
            if (!this.acprdData[this.acprdData.length - 1].accountPeriodType) {
                this.show(this.translateService.translate('otmacprd.typemustbe'));
                return null;

            }
            if (!this.acprdData[this.acprdData.length - 1].parentAccountPeriodId) {
                this.show(this.translateService.translate('otmacprd.parentidmustbe'));
                return null;

            }

        }
        return { accountPeriodId: '', accountPeriodType: 'MTH', startDate: '', endDate: '', parentAccountPeriodId: '' };

    }
    acprdExecuteQuery() {
        if (this.savedData) {
            this.accountPeriodId = null;
            this.type = null;
            this.parentId = null;
            this.startDate = null;
            this.endDate = null;
            this.savedData = false;
        }
        this.acprdModel = new AccountPeriods();
        if (this.accountPeriodId) {
            this.acprdModel.accountPeriodId = this.accountPeriodId;
        }
        if (this.type) {
            this.acprdModel.accountPeriodType = this.type;
        }
        if (this.startDate) {
            this.acprdModel.startDate = this.startDate;
        }
        if (this.endDate) {
            this.acprdModel.endDate = this.endDate;
        }
        if (this.parentId) {
            this.acprdModel.parentAccountPeriodId = this.parentId;
        }
        const acprdResult = this.otmacprdFactory.acPrdExecuteQuery(this.acprdModel);
        acprdResult.subscribe(data => {
            if (data.length === 0) {
                this.acprdData = [];
                this.isRetrieveDis = true;
                this.isClearDis = false;
                this.show(this.translateService.translate('common.querycaused'));
            } else {
                this.acprdData = data;
                this.acprdModel = data[0];
                this.isRetrieveDis = true;
                this.isClearDis = false;
                this.tableIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otmacprdSaveacprdForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.acprdInsertList = event.added;
        this.acprdUpdatetList = event.updated;
        this.acprdDeleteList = event.removed;
        this.acprdCommitModel.insertList = [];
        this.acprdCommitModel.updateList = [];
        this.acprdCommitModel.deleteList = [];

        // if (this.acntPrdIdExists) {
        //     this.show(this.translateService.translate('otmacprd.thisaccountperiodalready'));
        //     return;
        // }
        
        for (let i = 0; i < this.acprdData.length; i++) {
            for (let j = 0; j < this.acprdData.length; j++) {
                if (i != j && this.acprdData[i].accountPeriodId == this.acprdData[j].accountPeriodId) {
                    this.show(this.translateService.translate('otmacprd.thisaccountperiodalready'));
                    return false;
                }
            }
        }
        if (this.acprdInsertList.length > 0) {
            for (let i = 0; i < this.acprdInsertList.length; i++) {

                if (!this.acprdInsertList[i].accountPeriodId) {
                    this.show(this.translateService.translate('otmacprd.accountperiodmust'));
                    return;
                }
                if (!this.acprdInsertList[i].accountPeriodType) {
                    this.show(this.translateService.translate('otmacprd.typemustbe'));
                    return;
                }
                if (!this.acprdInsertList[i].parentAccountPeriodId) {
                    this.show(this.translateService.translate('otmacprd.parentidmustbe'));
                    return;
                }
                this.acprdInsertList[i].modifyDate = DateFormat.getDate();
                this.acprdInsertList[i].modifyUserId = this.sessionManager.getId();
                this.acprdInsertList[i].createUserId = this.sessionManager.getId();
                this.acprdInsertList[i].createDateTime = DateFormat.getDate();
            }
            this.acprdCommitModel.insertList = this.acprdInsertList;
        }
        if (this.acprdUpdatetList.length > 0) {
            for (let i = 0; i < this.acprdUpdatetList.length; i++) {

                if (!this.acprdUpdatetList[i].accountPeriodId) {
                    this.show(this.translateService.translate('otmacprd.accountperiodmust'));
                    return;

                }
                if (!this.acprdUpdatetList[i].accountPeriodType) {
                    this.show(this.translateService.translate('otmacprd.typemustbe'));
                    return;

                }
                if (!this.acprdUpdatetList[i].parentAccountPeriodId) {
                    this.show(this.translateService.translate('otmacprd.parentidmustbe'));
                    return;

                }
            }
            this.acprdCommitModel.updateList = this.acprdUpdatetList;
        }

        if (this.acprdDeleteList.length > 0) {
            for (let i = 0; i < this.acprdDeleteList.length; i++) {
            }
            this.acprdCommitModel.deleteList = this.acprdDeleteList;
        }
        const acprdSaveData = this.otmacprdFactory.acPrdCommit(this.acprdCommitModel);
        acprdSaveData.subscribe(data => {
            if (String(data) === '1') {
                this.savedData = true;
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.acprdExecuteQuery();
            } else if (String(data).includes('CSLD_AP_AC_PRD_F1')) {
                this.show(this.translateService.translate('otmacprd.cannotdeleteaccountperiods'));
                this.acprdExecuteQuery();
            } else if (String(data).includes('CSLD_AC_AC_PRD_F2')) {
                this.show(this.translateService.translate('otmacprd.cannotdeletecaseloadaccounts'));
                this.acprdExecuteQuery();
            } else if (String(data).includes('account_periods_pk')) {
                this.show(this.translateService.translate('otmacprd.duplicateaccountperiods'));
            } else if (String(data).includes('GL_TXN_AC_PRD_F2')) {
                this.show(this.translateService.translate('otmacprd.gltxnacprdf'));
                this.acprdExecuteQuery();
            } else if (String(data).includes('CM_CSLD_AP_AC_PRD_F1')) {
                this.show(this.translateService.translate('otmacprd.cmcsldapacprdf'));
                this.acprdExecuteQuery();
            } else if (String(data).includes('CM_CSLD_AC_AC_PRD_F2')) {
                this.show(this.translateService.translate('otmacprd.cmcsldacacprdf'));
            } else if (String(data).includes('AC_PRD_AC_PRD_F1')) {
                this.show(this.translateService.translate('otmacprd.acprdacprdf'));
                this.acprdExecuteQuery();
            } else if (String(data).includes('CSLD_CAT_AC_PRD_F2')) {
                this.show(this.translateService.translate('otmacprd.cannotdeleteaccount'));
                this.acprdExecuteQuery();
            }
             else if (String(data).includes('CSLD_CAT_AC_CODE_F1')) {
                this.show(this.translateService.translate('otmacprd.cannotdeleteaccount'));
                this.acprdExecuteQuery();
            } else if (String(data).includes('CSLD_CAB_AC_PRD_F1')) {
                this.show(this.translateService.translate('otmacprd.cannotdeleteaccincaseaccprdexists'));
                this.acprdExecuteQuery();
            } else if (String(data).includes('?')) {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
        });
    }
    isInsertable() {
        if ( this.accountPeriodId || this.type || this.parentId
            || this.startDate || this.endDate) {
            this.isClearDis = false;
        } else {
            this.isClearDis = true;
        }
    }


}
