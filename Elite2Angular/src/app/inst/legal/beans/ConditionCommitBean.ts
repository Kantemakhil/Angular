import { BaseModel } from '@commonbeans/BaseModel';
import { Condition } from "../beans/Condition";

export class ConditionCommitBean extends BaseModel{
   private _insertList: Array<Condition>;
private _updateList: Array<Condition>;
private _deleteList: Array<Condition>;

get insertList(): Array<Condition> { return this._insertList; }
set insertList( pinsertList: Array<Condition> ) { this._insertList = pinsertList; }

get updateList(): Array<Condition> { return this._updateList; }
set updateList( pupdateList: Array<Condition> ) { this._updateList = pupdateList; }

get deleteList(): Array<Condition> { return this._deleteList; }
set deleteList( pdeleteList: Array<Condition> ) { this._deleteList = pdeleteList; }

toJSON(): any {
    return {
        'insertList': this._insertList,
        'updateList': this._updateList,
        'deleteList': this._deleteList
    };
}

}