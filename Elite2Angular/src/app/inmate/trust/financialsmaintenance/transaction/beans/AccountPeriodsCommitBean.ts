import { BaseModel } from '@commonbeans/BaseModel';
import { AccountPeriods } from '@inmate/beans/AccountPeriods';

export class AccountPeriodsCommitBean extends BaseModel {
    private _insertList: Array<AccountPeriods>;
    private _deleteList: Array<AccountPeriods>;
    private _updateList: Array<AccountPeriods>;

    get insertList(): Array<AccountPeriods> { return this._insertList; }

    set insertList(pinsertList: Array<AccountPeriods>) { this._insertList = pinsertList; }

    get deleteList(): Array<AccountPeriods> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AccountPeriods>) { this._deleteList = pdeleteList; }

    get updateList(): Array<AccountPeriods> { return this._updateList; }

    set updateList(pupdateList: Array<AccountPeriods>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
