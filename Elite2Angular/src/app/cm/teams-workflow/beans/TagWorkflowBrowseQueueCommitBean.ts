import { BaseModel } from '@commonbeans/BaseModel';
import { TagWorkflowBrowseQueue } from '@cm/teams-workflow/beans/TagWorkflowBrowseQueue';

export class TagWorkflowBrowseQueueCommitBean extends BaseModel {

private _insertList: Array<TagWorkflowBrowseQueue>;
private _deleteList: Array<TagWorkflowBrowseQueue>;
private _updateList: Array<TagWorkflowBrowseQueue>;

get insertList(): Array<TagWorkflowBrowseQueue> { return this._insertList; }

set insertList(pinsertList: Array<TagWorkflowBrowseQueue>) { this._insertList = pinsertList; }

get deleteList(): Array<TagWorkflowBrowseQueue> { return this._deleteList; }

set deleteList(pdeleteList: Array<TagWorkflowBrowseQueue>) { this._deleteList = pdeleteList; }

get updateList(): Array<TagWorkflowBrowseQueue> { return this._updateList; }

set updateList(pupdateList: Array<TagWorkflowBrowseQueue>) { this._updateList = pupdateList; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList
};
}
}
