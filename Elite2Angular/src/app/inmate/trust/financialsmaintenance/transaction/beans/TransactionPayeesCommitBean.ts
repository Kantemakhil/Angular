import { BaseModel } from '@commonbeans/BaseModel';
import { TransactionPayees } from '@inmate/trust/financialsmaintenance/transaction/beans/TransactionPayees';

export class TransactionPayeesCommitBean extends BaseModel {
    private _insertList: Array<TransactionPayees>;
    private _deleteList: Array<TransactionPayees>;
    private _updateList: Array<TransactionPayees>;

    get insertList(): Array<TransactionPayees> { return this._insertList; }

    set insertList(pinsertList: Array<TransactionPayees>) { this._insertList = pinsertList; }

    get deleteList(): Array<TransactionPayees> { return this._deleteList; }

    set deleteList(pdeleteList: Array<TransactionPayees>) { this._deleteList = pdeleteList; }

    get updateList(): Array<TransactionPayees> { return this._updateList; }

    set updateList(pupdateList: Array<TransactionPayees>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
