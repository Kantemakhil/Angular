import { BaseModel } from '@commonbeans/BaseModel';
import { Holds } from "../beans/Holds";

export class HoldsCommitBean extends BaseModel {
    
    private _insertList: Array<Holds>;
    private _updateList: Array<Holds>;
    private _deleteList: Array<Holds>;

get insertList(): Array<Holds> { return this._insertList; }

set insertList( pinsertList: Array<Holds> ) { this._insertList = pinsertList; }

get updateList(): Array<Holds> { return this._updateList; }

set updateList( pupdateList: Array<Holds> ) { this._updateList = pupdateList; }

get deleteList(): Array<Holds> { return this._deleteList; }

set deleteList( pdeleteList: Array<Holds> ) { this._deleteList = pdeleteList; }


toJSON(): any {
    return {
        'insertList': this._insertList,
        'updateList': this._updateList,
        'deleteList': this._deleteList
    };
}
    
}