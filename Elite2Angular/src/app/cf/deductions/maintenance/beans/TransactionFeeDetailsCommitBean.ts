import { BaseModel } from '@commonbeans/BaseModel';
import { TransactionFeeDetails } from './TransactionFeeDetails';
export class TransactionFeeDetailsCommitBean extends BaseModel {

    private _insertList: Array<TransactionFeeDetails>;
    private _deleteList: Array<TransactionFeeDetails>;
    private _updateList: Array<TransactionFeeDetails>;

    get insertList(): Array<TransactionFeeDetails> { return this._insertList; }

    set insertList(pinsertList: Array<TransactionFeeDetails>) { this._insertList = pinsertList; }

    get deleteList(): Array<TransactionFeeDetails> { return this._deleteList; }

    set deleteList(pdeleteList: Array<TransactionFeeDetails>) { this._deleteList = pdeleteList; }

    get updateList(): Array<TransactionFeeDetails> { return this._updateList; }

    set updateList(pupdateList: Array<TransactionFeeDetails>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
