import { Appeals } from "./Appeals";

export class AppealsCommitModel {
    private _insertList: Array<Appeals>;
    private _updateList: Array<Appeals>;
    private _deleteList: Array<Appeals>;

    get insertList(): Array<Appeals> { return this._insertList; }    
    set insertList( insert: Array<Appeals> ) { this._insertList = insert; }
    
    get updateList(): Array<Appeals> { return this._updateList; }    
    set updateList( update: Array<Appeals> ) { this._updateList = update; }
    
    get deleteList(): Array<Appeals> { return this._deleteList; }
    set deleteList( pdeleteList: Array<Appeals> ) { this._deleteList = pdeleteList; }
    
    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList
        };
    }
}