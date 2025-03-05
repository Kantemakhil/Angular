import { BaseModel } from '@commonbeans/BaseModel';
import { Adjustments } from "../beans/Adjustments";

export class AdjustCommitBean extends BaseModel{
    
    private _insertList: Array<Adjustments>;
    private _updateList: Array<Adjustments>;
    private _deleteList: Array<Adjustments>;
    
    get insertList(): Array<Adjustments> { return this._insertList; }    
    set insertList( insert: Array<Adjustments> ) { this._insertList = insert; }
    
    get updateList(): Array<Adjustments> { return this._updateList; }    
    set updateList( update: Array<Adjustments> ) { this._updateList = update; }
    
    get deleteList(): Array<Adjustments> { return this._deleteList; }
    set deleteList( pdeleteList: Array<Adjustments> ) { this._deleteList = pdeleteList; }

toJSON(): any {
    return {
        'insertList': this._insertList,
        'updateList': this._updateList,
        'deleteList': this._deleteList
    };
}
}