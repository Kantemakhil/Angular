import { BaseModel } from '@commonbeans/BaseModel';
import { AccountCodes } from '@inmate/trust/trustaccounts/beans/AccountCodes';

export class AccountCodesCommitBean extends BaseModel {
    private _insertList: Array<AccountCodes>;
    private _deleteList: Array<AccountCodes>;
    private _updateList: Array<AccountCodes>;

    get insertList(): Array<AccountCodes> { return this._insertList; }

    set insertList( pinsertList: Array<AccountCodes> ) { this._insertList = pinsertList; }

    get deleteList(): Array<AccountCodes> { return this._deleteList; }

    set deleteList( pdeleteList: Array<AccountCodes> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<AccountCodes> { return this._updateList; }

    set updateList( pupdateList: Array<AccountCodes> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
