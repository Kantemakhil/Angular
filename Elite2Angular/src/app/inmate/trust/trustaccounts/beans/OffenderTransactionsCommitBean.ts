import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderTransactions } from '@inmate/trust/trustaccounts/beans/OffenderTransactions';
import { OmsRequests } from '@inmatetrustaccountsbeans/OmsRequests';
import { PrintReceiptsTmp } from '@cf/statements/beans/PrintReceiptsTmp';
import { OffFeeBillTransactions } from '@cf/deductions/beans/OffFeeBillTransactions';
import { offBillingStatements } from '@cf/offendertransactions/beans/offBillingStatements';

export class OffenderTransactionsCommitBean extends BaseModel {

    private _insertList: Array<OffenderTransactions>;
    private _deleteList: Array<OffenderTransactions>;
    private _updateList: Array<OffenderTransactions>;
    private _omsReqBean: OmsRequests;
    private _printRcptInsertList: Array<PrintReceiptsTmp>;
    private _offFeeUpdateList: Array<OffFeeBillTransactions>;
    private _prepaidAcntInsertList: Array<OffenderTransactions>;
    private _stmtInsertList: Array<offBillingStatements>;



    get insertList(): Array<OffenderTransactions> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderTransactions>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderTransactions> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderTransactions>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderTransactions> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderTransactions>) { this._updateList = pupdateList; }

    get omsReqBean(): OmsRequests { return this._omsReqBean; }

    set omsReqBean(pomsReqBean: OmsRequests) { this._omsReqBean = pomsReqBean; }

    get printRcptInsertList(): Array<PrintReceiptsTmp> { return this._printRcptInsertList; }

    set printRcptInsertList(pprintRcptInsertList: Array<PrintReceiptsTmp>) { this._printRcptInsertList = pprintRcptInsertList; }

    get offFeeUpdateList(): Array<OffFeeBillTransactions> { return this._offFeeUpdateList; }

    set offFeeUpdateList(poffFeeUpdateList: Array<OffFeeBillTransactions>) { this._offFeeUpdateList = poffFeeUpdateList; }

    get prepaidAcntInsertList(): Array<OffenderTransactions> { return this._prepaidAcntInsertList; }

    set prepaidAcntInsertList(value: Array<OffenderTransactions>) { this._prepaidAcntInsertList = value; }

    get stmtInsertList(): Array<offBillingStatements> { return this._stmtInsertList; }
    
    set stmtInsertList(pstmtInsertList: Array<offBillingStatements>) { this._stmtInsertList = pstmtInsertList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'omsReqBean': this._omsReqBean,
            'printRcptInsertList': this._printRcptInsertList,
            'offFeeUpdateList': this._offFeeUpdateList,
            'prepaidAcntInsertList': this._prepaidAcntInsertList,
            'stmtInsertList': this._stmtInsertList
        };
    }
}
