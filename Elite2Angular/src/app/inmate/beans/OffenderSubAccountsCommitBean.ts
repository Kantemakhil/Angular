import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderSubAccounts } from '@inmate/trust/trustaccounts/beans/OffenderSubAccounts';

export class OffenderSubAccountsCommitBean extends BaseModel {
	
	private _insertList: Array<OffenderSubAccounts>;
    private _deleteList: Array<OffenderSubAccounts>;
    private _updateList: Array<OffenderSubAccounts>;

    get insertList(): Array<OffenderSubAccounts> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderSubAccounts> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderSubAccounts> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderSubAccounts> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderSubAccounts> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderSubAccounts> ) { this._updateList = pupdateList; }

toJSON(): any {
    return {
        'insertList': this._insertList,
        'deleteList': this._deleteList,
        'updateList': this._updateList
    };
}
}
