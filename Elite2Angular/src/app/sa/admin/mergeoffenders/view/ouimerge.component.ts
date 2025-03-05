import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OuimergeService } from '@sa/admin/mergeoffenders/service/ouimerge.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { MergeTransactions } from '@sa/admin/mergeoffenders/beans/MergeTransactions';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ouimerge',
    templateUrl: './ouimerge.component.html'
})

export class OuimergeComponent implements OnInit {
    msgs: any[] = [];
    transactionsData: MergeTransactions[] = [];
    transactionsModel: MergeTransactions = new MergeTransactions();
    mergeTransBean: MergeTransactions = new MergeTransactions();
    transactionsIndex = -1;
    display: boolean;
    transactionsColumnDef: any[];
    namesReadOnly: boolean;
    @ViewChild('grid', {static: true}) grid: any;
    constructor(private ouimergeFactory: OuimergeService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private router: Router) {
        this.transactionsColumnDef = [];
    }
    ngOnInit() {
        this.transactionsIndex = -1;
        this.namesReadOnly = false;
        this.transactionsColumnDef = [
            {
                fieldName: this.translateService.translate('common.startdate'), field: 'requestDate', editable: false, width: 150,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('common.time'), field: 'requestDate', editable: false, width: 150,
                datatype: 'time'
            },
            { fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName1',
             editable: false, width: 180 },
            { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName1', editable: false, width: 180 },
            { fieldName: this.translateService.translate('common.Orca2'), field: 'offenderIdDisplay1', editable: false, width: 180 },
            { fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName2', editable: false, width: 180 },
            { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName2', editable: false, width: 180 },
            { fieldName: this.translateService.translate('common.Orca2'), field: 'offenderIdDisplay2', editable: false, width: 180 },
            {
                fieldName: this.translateService.translate('ouimerge.transferedbookingno')
                , field: 'trnBookingNo', editable: false, width: 180
            },
        ];
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
     * This function is called to when clicked on Row in transaction grid
     */
    onRowClicktransactions(event) {
        if (event) {
            this.transactionsModel = event;
        }
    }
    /**
     * This function is called to when clicked on cancel   button to navigate to home screen
     */
    onButCancelclick() {
        this.router.navigate(['/home']);
    }
    /**
     * This function is called to when clicked on clear  button to clear the data in grid
     */
    onButClear() {
        this.namesReadOnly = false;
        this.transactionsData = [];
        this.mergeTransBean = new MergeTransactions();
        this.transactionsModel = new MergeTransactions();
    }
    /**
     * This function is called to when clicked on Retrive button to enable or disable
     */
    get rettBtnFlg() {
        if (this.transactionsData.length === 0 && this.mergeTransBean.requestDate && this.mergeTransBean.toDate) {
            return false;
        } else {
            return true;
        }
    }
    /**
     * This function is called to when clicked on clear  button
     */
    get clrBtnFlag() {
        if (this.transactionsData.length !== 0 || this.mergeTransBean.requestDate || this.mergeTransBean.toDate ||
            this.mergeTransBean.requestStatusCode || this.mergeTransBean.transactionSource) {
            return false;
        } else {
            return true;
        }
    }
    /**
     * This function is called to disable or enable  cancel button
     */
    get cancelBtnFlag() {
        if (this.transactionsModel && this.transactionsModel.requestStatusCode === 'Pending') {
            return false;
        } else {
            return true;
        }
    }
    /**
     * This function is called when clicked on launch buttons to open child screens
     */
    get launchBtnFlag() {
        if (this.transactionsModel && this.transactionsModel.requestDate) {
            return false;
        } else {
            return true;
        }
    }
    /**
     * This function is called when code is changed
     */
    onCodeChange() {
        if (!this.transactionsModel.requestStatusCode) {
            this.transactionsModel.requestStatusCode = this.transactionsModel.requestStatusCode === '' ? undefined : '';
        }
        if (!this.transactionsModel.transactionSource) {
            this.transactionsModel.transactionSource = this.transactionsModel.transactionSource === '' ? undefined : '';
        }
    }

    /**
     * This function is used to retrive the information 
     */
    transactionsExecuteQuery(fromdate?, todate?) {
        if (fromdate) {
            if (fromdate.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(fromdate.lastValue).indexOf('_') >= 0 && fromdate.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        if (todate) {
            if (todate.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(todate.lastValue).indexOf('_') >= 0 && todate.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        if (!this.mergeTransBean.requestDate || !this.mergeTransBean.toDate) {
            this.show(this.translateService.translate('ouimerge.pleaseenterdaterangeforquery'));
            return;
        }
        if (DateFormat.compareDate(this.mergeTransBean.requestDate, this.mergeTransBean.toDate) === 1) {
            this.show(this.translateService.translate('ouimerge.fromdatecannotbelaterthantodate'));
            return;
        }
        if (this.mergeTransBean.requestDate && this.mergeTransBean.toDate &&
            (DateFormat.compareDate(this.mergeTransBean.requestDate,
                this.mergeTransBean.toDate) === 1)) {
                this.show(this.translateService.translate('ouimerge.fromdatecannotlater'));
                return;
            }
        const transactionsResult = this.ouimergeFactory.
            transactionsExecuteQuery(this.mergeTransBean);
        transactionsResult.subscribe(transactionsResultList => {
            if (transactionsResultList.length === 0) {
                this.show(this.translateService.translate('common.querycaused'));
                this.transactionsData = [];
                this.namesReadOnly = false;
            } else {
                this.transactionsData = transactionsResultList;
                this.transactionsModel = transactionsResultList[0];
                this.transactionsIndex = 0;
                this.namesReadOnly = true;
            }
        });
    }
    getFromOffenderMargin() {
        let fromOffenderMargin = 0;
        if ( this.grid.columnApi ) {
            this.grid.columnApi.getAllDisplayedColumns().forEach( obj => {
                if ( ['requestDate', 'requestDate_1'].includes(obj.colId) ) {
                    fromOffenderMargin += obj.actualWidth;
                }
            });
        }
        return fromOffenderMargin + 15;

    }
    onFromDateBlur() {
        if (!this.mergeTransBean.requestDate) {
        this.mergeTransBean.requestDate = this.mergeTransBean.requestDate === null ? undefined : null;
        }
        
        }
        onToDateBlur() {
        if (!this.mergeTransBean.toDate) {
        this.mergeTransBean.toDate = this.mergeTransBean.toDate === null ? undefined : null;
        }
        }
    getToOffenderMargin(){
        let toOffenderMargin = 0;
        if ( this.grid.columnApi ) {
            this.grid.columnApi._getAllDisplayedColumns().forEach( obj => {
                if (['lastName1', 'firstName1', 'offenderIdDisplay1'].includes(obj.colId) ) {
                    toOffenderMargin += obj.actualWidth;
                }
            });
        }
        if ( toOffenderMargin ) {
            toOffenderMargin -= 115;
        }
        return toOffenderMargin;

    }
}
