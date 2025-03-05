import { BaseModel } from '@commonbeans/BaseModel';
import { VExtOwnershipTransfer } from '@cm/primaryofficeragentassignment/beans/VExtOwnershipTransfer';

export class VExtOwnershipTransferCommitBean extends BaseModel {

private _insertList: Array<VExtOwnershipTransfer>;
private _deleteList: Array<VExtOwnershipTransfer>;
private _updateList: Array<VExtOwnershipTransfer>;

get insertList(): Array<VExtOwnershipTransfer> { return this._insertList; }

set insertList(pinsertList: Array<VExtOwnershipTransfer>) { this._insertList = pinsertList; }

get deleteList(): Array<VExtOwnershipTransfer> { return this._deleteList; }

set deleteList(pdeleteList: Array<VExtOwnershipTransfer>) { this._deleteList = pdeleteList; }

get updateList(): Array<VExtOwnershipTransfer> { return this._updateList; }

set updateList(pupdateList: Array<VExtOwnershipTransfer>) { this._updateList = pupdateList; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList
};
}
}
