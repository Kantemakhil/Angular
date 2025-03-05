import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderTrustTransfers } from '@inmatetrustaccountsbeans/OffenderTrustTransfers';

export class OffenderTrustTransfersCommitBean extends BaseModel {

private _insertList: Array<OffenderTrustTransfers>;
private _deleteList: Array<OffenderTrustTransfers>;
private _updateList: Array<OffenderTrustTransfers>;

get insertList(): Array<OffenderTrustTransfers> { return this._insertList; }

set insertList(pinsertList: Array<OffenderTrustTransfers>) { this._insertList = pinsertList; }

get deleteList(): Array<OffenderTrustTransfers> { return this._deleteList; }

set deleteList(pdeleteList: Array<OffenderTrustTransfers>) { this._deleteList = pdeleteList; }

get updateList(): Array<OffenderTrustTransfers> { return this._updateList; }

set updateList(pupdateList: Array<OffenderTrustTransfers>) { this._updateList = pupdateList; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList
};
}
}
