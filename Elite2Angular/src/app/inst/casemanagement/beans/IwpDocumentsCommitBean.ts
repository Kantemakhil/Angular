import { BaseModel } from '@commonbeans/BaseModel';
import { IwpDocuments } from '@inst/casemanagement/beans/IwpDocuments';

export class IwpDocumentsCommitBean extends BaseModel {

private _insertList: Array<IwpDocuments>;
private _deleteList: Array<IwpDocuments>;
private _updateList: Array<IwpDocuments>;

get insertList(): Array<IwpDocuments> { return this._insertList; }

set insertList(pinsertList: Array<IwpDocuments>) { this._insertList = pinsertList; }

get deleteList(): Array<IwpDocuments> { return this._deleteList; }

set deleteList(pdeleteList: Array<IwpDocuments>) { this._deleteList = pdeleteList; }

get updateList(): Array<IwpDocuments> { return this._updateList; }

set updateList(pupdateList: Array<IwpDocuments>) { this._updateList = pupdateList; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList
};
}
}
