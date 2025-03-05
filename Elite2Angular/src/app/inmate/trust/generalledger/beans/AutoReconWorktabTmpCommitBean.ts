import { BaseModel } from '@commonbeans/BaseModel';
import { AutoReconWorktabTmp } from '@inmatetrustgeneralledgerbeans/AutoReconWorktabTmp';

export class AutoReconWorktabTmpCommitBean extends BaseModel {

private _insertList: Array<AutoReconWorktabTmp>;
private _deleteList: Array<AutoReconWorktabTmp>;
private _updateList: Array<AutoReconWorktabTmp>;

get insertList(): Array<AutoReconWorktabTmp> { return this._insertList; }

set insertList(pinsertList: Array<AutoReconWorktabTmp>) { this._insertList = pinsertList; }

get deleteList(): Array<AutoReconWorktabTmp> { return this._deleteList; }

set deleteList(pdeleteList: Array<AutoReconWorktabTmp>) { this._deleteList = pdeleteList; }

get updateList(): Array<AutoReconWorktabTmp> { return this._updateList; }

set updateList(pupdateList: Array<AutoReconWorktabTmp>) { this._updateList = pupdateList; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList
};
}
}
