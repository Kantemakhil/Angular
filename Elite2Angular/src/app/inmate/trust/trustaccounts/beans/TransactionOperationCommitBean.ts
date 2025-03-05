import { BaseModel } from '@commonbeans/BaseModel';
import { TransactionOperation } from '@inmate/trust/trustaccounts/beans/TransactionOperation';

export class TransactionOperationCommitBean extends BaseModel {
    private _insertList: Array<TransactionOperation>;
    private _deleteList: Array<TransactionOperation>;
    private _updateList: Array<TransactionOperation>;

    get insertList(): Array<TransactionOperation> { return this._insertList; }

    set insertList( pinsertList: Array<TransactionOperation> ) { this._insertList = pinsertList; }

    get deleteList(): Array<TransactionOperation> { return this._deleteList; }

    set deleteList( pdeleteList: Array<TransactionOperation> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<TransactionOperation> { return this._updateList; }

    set updateList( pupdateList: Array<TransactionOperation> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
