import { BaseModel } from "@common/beans/BaseModel";
import { FeeAccounts } from "./FeeAccounts";

export class FeeAccountsCommitBean extends BaseModel {
    private _insertList: Array<FeeAccounts>;
    private _deleteList: Array<FeeAccounts>;
    private _updateList: Array<FeeAccounts>;

    get insertList(): Array<FeeAccounts> { return this._insertList; }

    set insertList( pinsertList: Array<FeeAccounts> ) { this._insertList = pinsertList; }

    get deleteList(): Array<FeeAccounts> { return this._deleteList; }

    set deleteList( pdeleteList: Array<FeeAccounts> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<FeeAccounts> { return this._updateList; }

    set updateList( pupdateList: Array<FeeAccounts> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}