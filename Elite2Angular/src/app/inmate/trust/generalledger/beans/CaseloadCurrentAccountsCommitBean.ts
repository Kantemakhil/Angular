import { BaseModel } from '@commonbeans/BaseModel';
import { CaseloadCurrentAccounts } from '@inmatetrustgeneralledgerbeans/CaseloadCurrentAccounts';

export class CaseloadCurrentAccountsCommitBean extends BaseModel {

private _insertList: Array<CaseloadCurrentAccounts>;
private _deleteList: Array<CaseloadCurrentAccounts>;
private _updateList: Array<CaseloadCurrentAccounts>;

get insertList(): Array<CaseloadCurrentAccounts> { return this._insertList; }

set insertList(pinsertList: Array<CaseloadCurrentAccounts>) { this._insertList = pinsertList; }

get deleteList(): Array<CaseloadCurrentAccounts> { return this._deleteList; }

set deleteList(pdeleteList: Array<CaseloadCurrentAccounts>) { this._deleteList = pdeleteList; }

get updateList(): Array<CaseloadCurrentAccounts> { return this._updateList; }

set updateList(pupdateList: Array<CaseloadCurrentAccounts>) { this._updateList = pupdateList; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList
};
}
}
