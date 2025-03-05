import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderEmTagDetails } from './OffenderEmTagDetails';


export class OffenderEmTagDetailsCommitBean extends BaseModel {

private _insertList: Array<OffenderEmTagDetails>;
private _deleteList: Array<OffenderEmTagDetails>;
private _updateList: Array<OffenderEmTagDetails>;

get insertList(): Array<OffenderEmTagDetails> { return this._insertList; }

set insertList(pinsertList: Array<OffenderEmTagDetails>) { this._insertList = pinsertList; }

get deleteList(): Array<OffenderEmTagDetails> { return this._deleteList; }

set deleteList(pdeleteList: Array<OffenderEmTagDetails>) { this._deleteList = pdeleteList; }

get updateList(): Array<OffenderEmTagDetails> { return this._updateList; }

set updateList(pupdateList: Array<OffenderEmTagDetails>) { this._updateList = pupdateList; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList
};
}
}
