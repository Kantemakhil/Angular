import { BaseModel } from '@commonbeans/BaseModel';
import { VAssOffNeeds } from './VAssOffNeeds';


export class VAssOffNeedsCommitBean extends BaseModel {
    private _insertList: Array<VAssOffNeeds>;
    private _deleteList: Array<VAssOffNeeds>;
    private _updateList: Array<VAssOffNeeds>;

    get insertList(): Array<VAssOffNeeds> { return this._insertList; }

    set insertList( pinsertList: Array<VAssOffNeeds> ) { this._insertList = pinsertList; }

    get deleteList(): Array<VAssOffNeeds> { return this._deleteList; }

    set deleteList( pdeleteList: Array<VAssOffNeeds> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<VAssOffNeeds> { return this._updateList; }

    set updateList( pupdateList: Array<VAssOffNeeds> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}