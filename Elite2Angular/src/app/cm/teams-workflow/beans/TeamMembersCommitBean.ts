import { BaseModel } from '@commonbeans/BaseModel';
import { TeamMembers } from '@cm/teams-workflow/beans/TeamMembers';

export class TeamMembersCommitBean extends BaseModel {

private _insertList: Array<TeamMembers>;
private _deleteList: Array<TeamMembers>;
private _updateList: Array<TeamMembers>;

get insertList(): Array<TeamMembers> { return this._insertList; }

set insertList(pinsertList: Array<TeamMembers>) { this._insertList = pinsertList; }

get deleteList(): Array<TeamMembers> { return this._deleteList; }

set deleteList(pdeleteList: Array<TeamMembers>) { this._deleteList = pdeleteList; }

get updateList(): Array<TeamMembers> { return this._updateList; }

set updateList(pupdateList: Array<TeamMembers>) { this._updateList = pupdateList; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList
};
}
}
