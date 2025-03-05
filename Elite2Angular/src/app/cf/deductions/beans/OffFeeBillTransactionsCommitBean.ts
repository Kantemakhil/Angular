import { BaseModel } from '@commonbeans/BaseModel';
import { OffFeeBillTransactions } from './OffFeeBillTransactions';
import { offBillingStatements } from '@cf/offendertransactions/beans/offBillingStatements';

export class OffFeeBillTransactionsCommitBean extends BaseModel {

    private _insertList: Array<OffFeeBillTransactions>;
    private _deleteList: Array<OffFeeBillTransactions>;
    private _updateList: Array<OffFeeBillTransactions>;
    private _stmtInsertList: Array<offBillingStatements>;

    get stmtInsertList(): Array<offBillingStatements> { return this._stmtInsertList; }
    
    set stmtInsertList(pstmtInsertList: Array<offBillingStatements>) { this._stmtInsertList = pstmtInsertList; }

    get insertList(): Array<OffFeeBillTransactions> { return this._insertList; }

    set insertList(pinsertList: Array<OffFeeBillTransactions>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffFeeBillTransactions> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffFeeBillTransactions>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffFeeBillTransactions> { return this._updateList; }

    set updateList(pupdateList: Array<OffFeeBillTransactions>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'stmtInsertList': this._stmtInsertList
        };
    }
}
