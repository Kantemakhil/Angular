import { BaseModel } from '@commonbeans/BaseModel';
import { TieredTransactionFeeAmounts } from './TieredTransactionFeeAmounts';
export class TieredTransactionFeeAmountsCommitBean extends BaseModel {

    private _insertList: Array<TieredTransactionFeeAmounts>;
    private _deleteList: Array<TieredTransactionFeeAmounts>;
    private _updateList: Array<TieredTransactionFeeAmounts>;

    get insertList(): Array<TieredTransactionFeeAmounts> { return this._insertList; }

    set insertList(pinsertList: Array<TieredTransactionFeeAmounts>) { this._insertList = pinsertList; }

    get deleteList(): Array<TieredTransactionFeeAmounts> { return this._deleteList; }

    set deleteList(pdeleteList: Array<TieredTransactionFeeAmounts>) { this._deleteList = pdeleteList; }

    get updateList(): Array<TieredTransactionFeeAmounts> { return this._updateList; }

    set updateList(pupdateList: Array<TieredTransactionFeeAmounts>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
