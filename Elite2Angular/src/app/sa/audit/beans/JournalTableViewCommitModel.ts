import { BaseModel } from '@commonbeans/BaseModel';
import { JournalTableView } from './JournalTableView';

export class JournalTableViewCommitModel extends BaseModel {

private _insertList: Array<JournalTableView>;
private _deleteList: Array<JournalTableView>;
private _updateList: Array<JournalTableView>;

get insertList(): Array<JournalTableView> { return this._insertList; }

set insertList(pinsertList: Array<JournalTableView>) { this._insertList = pinsertList; }

get deleteList(): Array<JournalTableView> { return this._deleteList; }

set deleteList(pdeleteList: Array<JournalTableView>) { this._deleteList = pdeleteList; }

get updateList(): Array<JournalTableView> { return this._updateList; }

set updateList(pupdateList: Array<JournalTableView>) { this._updateList = pupdateList; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList
};
}
}
