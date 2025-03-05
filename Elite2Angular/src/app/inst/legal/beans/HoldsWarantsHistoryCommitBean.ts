import { BaseModel } from '@commonbeans/BaseModel';
import { HoldsWarantsHistory } from "../beans/HoldsWarantsHistory";

export class HoldsWarantsHistoryCommitBean extends BaseModel{
    
    private _insertList: Array<HoldsWarantsHistory>;
    private _updateList: Array<HoldsWarantsHistory>;
    private _deleteList: Array<HoldsWarantsHistory>;


    get insertList(): Array<HoldsWarantsHistory> { return this._insertList; }
    
    set insertList( pinsertList: Array<HoldsWarantsHistory> ) { this._insertList = pinsertList; }
    
    get updateList(): Array<HoldsWarantsHistory> { return this._updateList; }
    
    set updateList( pupdateList: Array<HoldsWarantsHistory> ) { this._updateList = pupdateList; }
    
    get deleteList(): Array<HoldsWarantsHistory> { return this._deleteList; }
    
    set deleteList( pdeleteList: Array<HoldsWarantsHistory> ) { this._deleteList = pdeleteList; }



toJSON(): any {
    return {
        'insertList': this._insertList,
        'updateList': this._updateList,
        'deleteList': this._deleteList,
    };
}
}