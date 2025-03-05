import { BaseModel } from '@commonbeans/BaseModel';
import { InterestedParties } from "../beans/InterestedParties";

export class InterestedPartiesCommitBean extends BaseModel{
    
    private _insertList: Array<InterestedParties>;
    private _updateList: Array<InterestedParties>;
    private _deleteList: Array<InterestedParties>;
    
    get insertList(): Array<InterestedParties> { return this._insertList; }    
    set insertList( insert: Array<InterestedParties> ) { this._insertList = insert; }
    
    get updateList(): Array<InterestedParties> { return this._updateList; }    
    set updateList( update: Array<InterestedParties> ) { this._updateList = update; }
    
    get deleteList(): Array<InterestedParties> { return this._deleteList; }
    set deleteList( pdeleteList: Array<InterestedParties> ) { this._deleteList = pdeleteList; }

toJSON(): any {
    return {
        'insertList': this._insertList,
        'updateList': this._updateList,
        'deleteList': this._deleteList
    };
}
}