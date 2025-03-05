import { BaseModel } from '@commonbeans/BaseModel';
import { MinimumPayableBalances } from '@inmate/trust/deductions/deductionsmaintenance/beans/MinimumPayableBalances';

export class MinimumPayableBalancesCommitBean extends BaseModel {

    private _insertList: Array<MinimumPayableBalances>;
    private _deleteList: Array<MinimumPayableBalances>;
    private _updateList: Array<MinimumPayableBalances>;

    get insertList(): Array<MinimumPayableBalances> { return this._insertList; }

    set insertList(pinsertList: Array<MinimumPayableBalances>) { this._insertList = pinsertList; }

    get deleteList(): Array<MinimumPayableBalances> { return this._deleteList; }

    set deleteList(pdeleteList: Array<MinimumPayableBalances>) { this._deleteList = pdeleteList; }

    get updateList(): Array<MinimumPayableBalances> { return this._updateList; }

    set updateList(pupdateList: Array<MinimumPayableBalances>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
