import { BaseModel } from '@commonbeans/BaseModel';
import { WeeklyActivityPlansHty } from './WeeklyActivityPlansHty';


export class WeeklyActivityPlansHtyCommitBean extends BaseModel {

private _insertList: Array<WeeklyActivityPlansHty>;
private _deleteList: Array<WeeklyActivityPlansHty>;
private _updateList: Array<WeeklyActivityPlansHty>;

get insertList(): Array<WeeklyActivityPlansHty> { return this._insertList; }

set insertList(pinsertList: Array<WeeklyActivityPlansHty>) { this._insertList = pinsertList; }

get deleteList(): Array<WeeklyActivityPlansHty> { return this._deleteList; }

set deleteList(pdeleteList: Array<WeeklyActivityPlansHty>) { this._deleteList = pdeleteList; }

get updateList(): Array<WeeklyActivityPlansHty> { return this._updateList; }

set updateList(pupdateList: Array<WeeklyActivityPlansHty>) { this._updateList = pupdateList; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList
};
}
}
