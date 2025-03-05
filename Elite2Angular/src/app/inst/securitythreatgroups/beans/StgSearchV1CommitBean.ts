import { StgSearchV1 } from '@instSecurityThreatGroupsbeans/StgSearchV1';
import { BaseModel } from '@commonbeans/BaseModel';

export class StgSearchV1CommitBean extends BaseModel {
    private _insertList: Array<StgSearchV1>;
    private _deleteList: Array<StgSearchV1>;
    private _updateList: Array<StgSearchV1>;

    get insertList(): Array<StgSearchV1> { return this._insertList; }

    set insertList(pinsertList: Array<StgSearchV1>) { this._insertList = pinsertList; }

    get deleteList(): Array<StgSearchV1> { return this._deleteList; }

    set deleteList(pdeleteList: Array<StgSearchV1>) { this._deleteList = pdeleteList; }

    get updateList(): Array<StgSearchV1> { return this._updateList; }

    set updateList(pupdateList: Array<StgSearchV1>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
