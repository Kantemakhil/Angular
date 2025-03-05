import { BaseModel } from '@commonbeans/BaseModel';
import { PriorHistory } from "../beans/PriorHistory";
export class PriorHistoryCommitBean extends BaseModel {
    private _insertList: Array<PriorHistory>;
    private _updateList: Array<PriorHistory>;
    private _deleteList: Array<PriorHistory>;

    get insertList(): Array<PriorHistory> { return this._insertList; }

    set insertList( pinsertList: Array<PriorHistory> ) { this._insertList = pinsertList; }

    get updateList(): Array<PriorHistory> { return this._updateList; }

    set updateList( pupdateList: Array<PriorHistory> ) { this._updateList = pupdateList; }
    
    get deleteList(): Array<PriorHistory> { return this._deleteList; }

    set deleteList( pdeleteList: Array<PriorHistory> ) { this._deleteList = pdeleteList; }
    

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList':this._deleteList,
        };
    }
}