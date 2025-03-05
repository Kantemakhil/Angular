import { BaseModel } from '@commonbeans/BaseModel';
import { TxnOpsInvalidAccounts } from '@inmate/trust/financialsmaintenance/transaction/beans/TxnOpsInvalidAccounts';

export class TxnOpsInvalidAccountsCommitBean extends BaseModel {
    private _insertList: Array<TxnOpsInvalidAccounts>;
    private _deleteList: Array<TxnOpsInvalidAccounts>;
    private _updateList: Array<TxnOpsInvalidAccounts>;

    get insertList(): Array<TxnOpsInvalidAccounts> { return this._insertList; }

    set insertList(pinsertList: Array<TxnOpsInvalidAccounts>) { this._insertList = pinsertList; }

    get deleteList(): Array<TxnOpsInvalidAccounts> { return this._deleteList; }

    set deleteList(pdeleteList: Array<TxnOpsInvalidAccounts>) { this._deleteList = pdeleteList; }

    get updateList(): Array<TxnOpsInvalidAccounts> { return this._updateList; }

    set updateList(pupdateList: Array<TxnOpsInvalidAccounts>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
