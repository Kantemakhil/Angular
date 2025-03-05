import { BaseModel } from '@commonbeans/BaseModel';
import { TransactionTypes } from '@inmate/trust/checks/beans/TransactionTypes';

export class TransactionTypesCommitBean extends BaseModel {
    private _insertList: Array<TransactionTypes>;
    private _deleteList: Array<TransactionTypes>;
    private _updateList: Array<TransactionTypes>;

    get insertList(): Array<TransactionTypes> { return this._insertList; }

    set insertList(pinsertList: Array<TransactionTypes>) { this._insertList = pinsertList; }

    get deleteList(): Array<TransactionTypes> { return this._deleteList; }

    set deleteList(pdeleteList: Array<TransactionTypes>) { this._deleteList = pdeleteList; }

    get updateList(): Array<TransactionTypes> { return this._updateList; }

    set updateList(pupdateList: Array<TransactionTypes>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
