import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderFreezeDisbursements } from '@inmatetrustaccountsbeans/OffenderFreezeDisbursements';

export class OffenderFreezeDisbursementsCommtBean extends BaseModel {

private _insertList: Array<OffenderFreezeDisbursements>;
private _deleteList: Array<OffenderFreezeDisbursements>;
private _updateList: Array<OffenderFreezeDisbursements>;

get insertList(): Array<OffenderFreezeDisbursements> { return this._insertList; }

set insertList(pinsertList: Array<OffenderFreezeDisbursements>) { this._insertList = pinsertList; }

get deleteList(): Array<OffenderFreezeDisbursements> { return this._deleteList; }

set deleteList(pdeleteList: Array<OffenderFreezeDisbursements>) { this._deleteList = pdeleteList; }

get updateList(): Array<OffenderFreezeDisbursements> { return this._updateList; }

set updateList(pupdateList: Array<OffenderFreezeDisbursements>) { this._updateList = pupdateList; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList
};
}
}
