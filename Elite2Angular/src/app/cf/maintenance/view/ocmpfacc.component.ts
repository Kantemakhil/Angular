import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OcmpfaccService } from '@cf/maintenance/service/ocmpfacc.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { FeeAccounts } from '@cf/maintenance/beans/FeeAccounts';
import { FeeAccountsCommitBean } from '@cf/maintenance/beans/FeeAccountsCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { AccountCodes } from '@inmate/trust/trustaccounts/beans/AccountCodes';
import { DeductionTypes } from '@inmate/trust/deductions/deductionsmaintenance/beans/DeductionTypes';
@Component({
    selector: 'app-ocmpfacc',
    templateUrl: './ocmpfacc.component.html'
})

export class OcmpfaccComponent implements OnInit {
    @ViewChild('grid', { static: true }) grid: any;
    msgs: any[] = [];
    selected = -1;
    feeaccData: FeeAccounts[] = [];
    feeAccModel: FeeAccounts = new FeeAccounts();
    feeAccCommitModel: FeeAccountsCommitBean = new FeeAccountsCommitBean();
    feeAccIndex: number;
    feeAccInsertList: FeeAccounts[] = [];
    feeAccUpdateList: FeeAccounts[] = [];
    feeAccDeleteList: FeeAccounts[] = [];
    accountlist:AccountCodes[]=[];
    feeCodesList:DeductionTypes []=[];
    display: boolean;
    feeAccColumnDef: any[];
    accountCodeTitles = { code : this.translateService.translate('ocmpfacc.subaccountcode'), accountName:this.translateService.translate('ocmpfacc.subaccountname')};
    feeCodeTitles={code : this.translateService.translate('ocmpfacc.feecode'),deductionDesc:this.translateService.translate('ocmpfacc.feecodename')};
    constructor(private ocmpfaccFactory: OcmpfaccService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
    }
    ngOnInit() {
        this.getAccountCode();
        this.getFeeCodes();
        this.feeAccountsExecuteQuery();
        
        this.feeAccColumnDef = [
            {
                fieldName: this.translateService.translate('ocmpfacc.subaccountcode'), field: 'accountCode', link: 'ocmpfacc/getAccCodes',
                editable: true, width: 150, datatype: 'lov', cellEditable: this.canCellEdit, required: true,titles : this.accountCodeTitles
            },
            {
                fieldName:this.translateService.translate('ocmpfacc.subaccountname'), field: 'accountCodeDesc', 
                editable: false, width: 150, datatype: 'text',
            },
            {
                fieldName: this.translateService.translate('ocmpfacc.feecode'), field: 'feeCode', editable: true, width: 150, datatype: 'lov',
                cellEditable: this.canCellEdit, link: 'ocmpfacc/getFeeCodes', required: true,titles : this.feeCodeTitles

            },
            {
                fieldName: this.translateService.translate('ocmpfacc.feecodename'), field: 'feeCodeDesc', editable: false, width: 150,datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocmpfacc.sequence'), field: 'listSeq', editable: true, width: 150,
                datatype: 'number', whole: true, required: true,  minValue: '1', maxValue: '999'
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', datatype: 'checkbox',
                editable: true, width: 150
            },
            { fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDatetime', editable: false, width: 150, datatype: 'date' },

        ];

    }
    getAccountCode(){
        const accountData = this.ocmpfaccFactory.getAccCodes();
        accountData.subscribe(data=>{
            if(data && data.length > 0){
                this.accountlist=data;
            }else{
                this.accountlist = [];
            }
        });

    }
    getFeeCodes(){
        const feeData =this.ocmpfaccFactory.getFeeCodes();
        feeData.subscribe(data=>{
            if(data && data.length > 0){
                this.feeCodesList=data;
            }else{
                this.feeCodesList = [];
            }
        });
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        }
        return false;
    }
    onOffenderChange(event) {

    }
    onRowClickFeeAcc(event) {
        if (event) {
        } else {
        }
    }
    validateRowData = (event) => {
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if(event.field==='accountCode'){
          if(event.data && event.data.accountCode){
            if(this.accountlist && this.accountlist.length > 0){
                let tempData = this.accountlist.filter(e => Number(e['code']) === Number(event.data.accountCode));
                this.grid.setColumnData('accountCodeDesc',index ,tempData[0].accountName);
            }else{
                this.grid.setColumnData('accountCodeDesc',index ,undefined);
            }
          }else{
            this.grid.setColumnData('accountCodeDesc',index ,undefined);
          }
          rowdata.validated = true;
          rowdata;
        }
        if(event.field==='feeCode'){
            if(event.data && event.data.feeCode){
              if(this.feeCodesList && this.feeCodesList.length > 0){
                  let tempData = this.feeCodesList.filter(e => (e['code']) === (event.data.feeCode));
                  this.grid.setColumnData('feeCodeDesc',index ,tempData[0].deductionDesc);
              }else{
                  this.grid.setColumnData('feeCodeDesc',index ,undefined);
              }
            }else{
              this.grid.setColumnData('feeCodeDesc',index ,undefined);
            }
            rowdata.validated = true;
            return rowdata;
          }
        if (event.field === 'activeFlag' && event.data.activeFlag) {
            this.grid.setColumnData('expiryDatetime', index, undefined);
            rowdata.validated = true;
            return rowdata;
        } else if (event.field === 'activeFlag' && !event.data.activeFlag) {
            this.grid.setColumnData('expiryDatetime', index, DateFormat.getDate());
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }
    onGridInsert = () => {
        return { activeFlag: true };
    }
    feeAccCommit(event) {
        this.feeAccCommitModel = new FeeAccountsCommitBean();
        this.feeAccInsertList = [];
        this.feeAccUpdateList = [];
        this.feeAccInsertList = event.added;
        this.feeAccUpdateList = event.updated;
        if (this.feeAccInsertList.length > 0 || this.feeAccUpdateList.length > 0) {
            for (let i = 0; i < this.feeAccInsertList.length; i++) {
                this.feeAccInsertList[i].recordDatetime = DateFormat.getDate();
                if (this.feeValidations(this.feeAccInsertList[i])) {
                    return;
                }
            }
            for (let i = 0; i < this.feeAccUpdateList.length; i++) {
                this.feeAccUpdateList[i].expiryDatetime = this.feeAccUpdateList[i].expiryDatetime != null ? DateFormat.getDate(DateFormat.getDate(this.feeAccUpdateList[i].expiryDatetime).setSeconds(0, 0)) : undefined;
                this.feeAccUpdateList[i].recordDatetime = this.feeAccUpdateList[i].recordDatetime != null ? DateFormat.getDate(DateFormat.getDate(this.feeAccUpdateList[i].recordDatetime).setSeconds(0, 0)) : undefined;
                if (this.feeValidations(this.feeAccUpdateList[i])) {
                    return;
                }
            }
        }
        this.feeAccCommitModel.insertList = this.feeAccInsertList;
        this.feeAccCommitModel.updateList = this.feeAccUpdateList;
        const feeAccSaveData = this.ocmpfaccFactory.feeAccountCommit(this.feeAccCommitModel);
        feeAccSaveData.subscribe(data => {
            if (data && data.sealFlag === "1"){
                // this.feeAccountsExecuteQuery();
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.feeAccountsExecuteQuery();
            } else if (data && data.sealFlag === "DUPLICATEDATA") {
                this.show(this.translateService.translate('ocmpfacc.subaccountcodefeecodealreadyexists'), 'warn');
                this.feeAccountsExecuteQuery();
                return;
            } else if (data && data.sealFlag === "DUPLICATESEQ") {
                this.show(this.translateService.translate('ocmpfacc.sequencealreadyexists'), 'warn');
                this.feeAccountsExecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                this.feeAccountsExecuteQuery();
            }

        });
    }
    feeValidations(event) {
        if (!event.accountCode) {
            this.show(this.translateService.translate('ocmpfacc.subaccountcodemustbeentered'), 'warn');
            return true;
        }
        if (!event.feeCode) {
            this.show(this.translateService.translate('ocmpfacc.feecodemustbeentered'), 'warn');
            return true;
        }
        if (!event.listSeq || event.listSeq === 0 || event.listSeq === '0') {
            this.show(this.translateService.translate('ocmpfacc.sequencemustbeentered'), 'warn');
            return true;
        }
    }
    feeAccountsExecuteQuery() {
        const feeAccData = this.ocmpfaccFactory.feeAccountsExecuteQuery();
        feeAccData.subscribe(data => {
            if (data.length === 0) {
                this.feeaccData = [];
                this.feeAccIndex = -1;
                this.show(this.translateService.translate('common.querycaused'), 'warn');
            } else {
                data.forEach(elemnt => {
                    elemnt.accountCode = String(elemnt.accountCode);
                    if (elemnt.expiryDatetime) {
                        elemnt.activeFlag = false;
                    } else {
                        elemnt.activeFlag = true;
                    }
                });
                this.feeaccData = data;
                this.feeAccIndex = 0;
            }
        });
    }
    OnGridClear = () => {
        this.feeAccountsExecuteQuery();
        return true;
    }
}
