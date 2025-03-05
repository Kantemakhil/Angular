import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmisambService } from '../service/otmisamb.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { InstitutionMiniBalances } from '@inmate/trust/financialsmaintenance/subaccounts/beans/InstitutionMiniBalances';
import { InstitutionMiniBalancesCommitBean } from '@inmate/trust/financialsmaintenance/subaccounts/beans/InstitutionMiniBalancesCommitBean';


@Component({
    selector: 'app-otmisamb',
    templateUrl: './otmisamb.component.html'
})

export class OtmisambComponent implements OnInit {
    @ViewChild('instmnbalgrid', {static: true}) instmnbalgrid: any;
    tableIndex = -1;
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    instmnbalData: InstitutionMiniBalances[] = [];
    instmnbalDataTemp: InstitutionMiniBalances[] = [];
    instmnbalModel: InstitutionMiniBalances = new InstitutionMiniBalances();
    selectedModel: InstitutionMiniBalances = new InstitutionMiniBalances();
    instmnbalCommitModel: InstitutionMiniBalancesCommitBean = new InstitutionMiniBalancesCommitBean();
    instmnbalIndex: number;
    instmnbalInsertList: InstitutionMiniBalances[] = [];
    instmnbalUpdatetList: InstitutionMiniBalances[] = [];
    instmnbalDeleteList: InstitutionMiniBalances[] = [];
    instMnbalColumnDef: any[];
    caseloadLink = 'otmisamb/cgfkInstMnbalCaseloadIdRecordGroup';
    glAccnLink = 'otmisamb/cgfkInstMnbalAccountCodeRecordGroup';
    instUrl = 'otmisamb/cgfkInstMnbalAgyLocIdRecordGroup?caseloadId=';
    instLink: string;
    caseloadTitles = {
        code: this.trMsg('otmisamb.csldid'), caseloadType: this.trMsg('common.description'),
        listSeq: this.trMsg('otmisamb.seq')
    };
    instLocTitles = { code: this.trMsg('otmisamb.instloc'), agyLocId: this.trMsg('otmisamb.caseloadid') };
    glAcntTitles = {
        code: this.trMsg('otmisamb.glacnt'), subAccountType: this.trMsg('otmisamb.subacnt'),
        accountName: this.trMsg('common.description')
    };

    constructor(private otmisambFactory: OtmisambService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.instMnbalColumnDef = [];
    }
    ngOnInit() {

        this.instMnbalColumnDef = [
            {
                fieldName: this.trMsg('otmisamb.csldid', '*'), field: 'caseloadId', datatype: 'lov', link: this.caseloadLink,
                editable: true, titles: this.caseloadTitles, cellEditable: this.canCellEdit,source:'OUMACASE'
            },
            {
                fieldName: this.trMsg('otmisamb.instloc', '*'), field: 'agyLocId', datatype: 'lov', link: this.instUrl,
                parentField: 'caseloadId',source:'OUMAGLOC',
                titles: this.instLocTitles, editable: true, cellEditable: this.canCellEdit
            },
            {
                fieldName: this.trMsg('otmisamb.glacnt', '*'), field: 'accountCode', datatype: 'lov', link: this.glAccnLink, editable: true,
                titles: this.glAcntTitles, cellEditable: this.canCellEdit,source:'OCMCOACT'
            },

            {
                fieldName: this.trMsg('otmisamb.minbal'), field: 'minimumAccountBalance', editable: true,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true,
            },
            { fieldName: this.trMsg('otmisamb.indayslmt'), datatype: 'number', maxValue: 999, field: 'indDays',
             editable: true, whole: true },
        ];
        this.search();
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
    onRowClickinstmnbal(event) {
        if (event) {
            this.selectedModel = event;
        } else {
            this.selectedModel = new InstitutionMiniBalances();
        }
    }

    search() {
        const reqData = JSON.parse(JSON.stringify(this.instmnbalModel));
        reqData.accountCode = reqData.nbtAccountCode;
        this.instMnbalExecuteQuery(reqData);
    }
    onClear() {
        this.instmnbalModel = new InstitutionMiniBalances();
        this.instmnbalData = [];
    }

    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (event.field === 'caseloadId') {
             this.instmnbalgrid.setColumnData('agyLocId', rowIndex,undefined);
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;


    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otmisambSaveinstmnbalForm(event) {
        if (!this.isValidRecord(this.instmnbalData)) {
            return;
        }
        this.instmnbalInsertList = event.added;
        this.instmnbalUpdatetList = event.updated;
        this.instmnbalDeleteList = event.removed;
        this.instmnbalCommitModel.insertList = [];
        this.instmnbalCommitModel.updateList = [];
        this.instmnbalCommitModel.deleteList = [];

        if (this.instmnbalInsertList.length > 0) {
            this.instmnbalCommitModel.insertList = this.instmnbalInsertList;
        }
        if (this.instmnbalUpdatetList.length > 0) {
            this.instmnbalCommitModel.updateList = this.instmnbalUpdatetList;
        }
        if (this.instmnbalDeleteList.length > 0) {
            this.instmnbalCommitModel.deleteList = this.instmnbalDeleteList;
        }

        const instmnbalSaveData = this.otmisambFactory.instMnbalCommit(this.instmnbalCommitModel);
        instmnbalSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else if (data && String(data).includes('unique constraint')) {
                this.show('otmisamb.rowalreadyexist');
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
            this.instmnbalModel = new InstitutionMiniBalances();
            this.instMnbalExecuteQuery({});
        });
    }
    instMnbalExecuteQuery(param?) {
        this.tableIndex = -1;
        const reqParam = param ? param : {};
        this.otmisambFactory.instMnbalExecuteQuery(reqParam).subscribe(resData => {
            if (resData.length === 0) {
                this.instmnbalData = [];
                this.show('common.querycaused');
            } else {
                resData.forEach(ele => {
                    ele.accountCode = String(ele.accountCode);
                    this.tableIndex = 0;
                });
                this.instmnbalData = resData;
            }
        });
    }
    onCsldIdChange(event) {
        this.instmnbalModel.agyLocId = null;
        if (event) {
            this.instLink = this.instUrl + event.code;
        } else {
            this.instLink = this.instUrl;
        }
    }

    onCaseloadBlur() {
        if (!this.instmnbalModel.caseloadId) {
            this.instmnbalModel.caseloadId = this.instmnbalModel.caseloadId === '' ? undefined : '';
        }
    }

    onagyLocBlur() {
        if (!this.instmnbalModel.agyLocId) {
            this.instmnbalModel.agyLocId = this.instmnbalModel.agyLocId === '' ? undefined : '';
        }
    }

    onaccCodeBlur() {
        if (!this.instmnbalModel.nbtAccountCode) {
            this.instmnbalModel.nbtAccountCode = this.instmnbalModel.nbtAccountCode === '' ? undefined : '';
        }
    }

    get isDataAvaliable(): boolean {
        if (this.instmnbalData.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    get clearFlag(): boolean {
        if (this.instmnbalData.length > 0 || this.instmnbalModel.nbtAccountCode ||
            this.instmnbalModel.agyLocId || this.instmnbalModel.caseloadId) {
            return false;
        } else {
            return true;
        }
    }

    onGridInsert = () => {
        if (!this.isValidRecord(this.instmnbalData)) {
            return null;
        }
        return new InstitutionMiniBalances();
    }

    isValidRecord(list: any[]) {
        const is = { valid: true };
        if (list && Array.isArray(list)) {
            list.forEach(ele => {
                if (!ele.caseloadId) {
                    this.show('otmisamb.csldmstbentr');
                    is.valid = false;
                    return;
                }
                if (!ele.agyLocId) {
                    this.show('otmisamb.instlocmstbentr');
                    is.valid = false;
                    return;
                }
                if (!ele.accountCode) {
                    this.show('otmisamb.glacntmstbentr');
                    is.valid = false;
                    return;
                }
                // if (!ele.minimumAccountBalance && ele.minimumAccountBalance !== Number('0.00')) {
                //     this.show(this.translateService.translate('otmisamb.minbalmustbeentered'));
                //     is.valid = false;
                //     return;
                // }
                const isDupRecord = list.filter(dup => {
                    return ele.caseloadId === dup.caseloadId && ele.agyLocId === dup.agyLocId && ele.accountCode === dup.accountCode;
                });
                if (isDupRecord && isDupRecord.length > 1) {
                    this.show('otmisamb.rowalreadyexist');
                    is.valid = false;
                    return;
                }
            });
        }
        return is.valid;

    }

    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.createDatetime) {
            return false;
        }
        if (field === 'agyLocId' && !data.caseloadId) {
            return false;
        }
        return true;
    }

}



