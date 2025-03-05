import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderTrustAccounts } from '@inmatetrustaccountsbeans/OffenderTrustAccounts';

export class OffenderTrustAccountsCommitBean extends BaseModel {

private _insertList: Array<OffenderTrustAccounts>;
private _deleteList: Array<OffenderTrustAccounts>;
private _updateList: Array<OffenderTrustAccounts>;

get insertList(): Array<OffenderTrustAccounts> { return this._insertList; }

set insertList(pinsertList: Array<OffenderTrustAccounts>) { this._insertList = pinsertList; }

get deleteList(): Array<OffenderTrustAccounts> { return this._deleteList; }

set deleteList(pdeleteList: Array<OffenderTrustAccounts>) { this._deleteList = pdeleteList; }

get updateList(): Array<OffenderTrustAccounts> { return this._updateList; }

set updateList(pupdateList: Array<OffenderTrustAccounts>) { this._updateList = pupdateList; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList
};
}
}
