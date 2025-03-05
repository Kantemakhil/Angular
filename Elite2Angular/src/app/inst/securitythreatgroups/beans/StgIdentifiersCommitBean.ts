 import { StgIdentifiers } from '@instSecurityThreatGroupsbeans/StgIdentifiers';
import { BaseModel } from '@commonbeans/BaseModel';
export class StgIdentifiersCommitBean extends BaseModel {

    private _insertList: Array<StgIdentifiers>;
    private _deleteList: Array<StgIdentifiers>;
    private _updateList: Array<StgIdentifiers>;

    get insertList(): Array<StgIdentifiers> { return this._insertList; }

    set insertList(pinsertList: Array<StgIdentifiers>) { this._insertList = pinsertList; }

    get deleteList(): Array<StgIdentifiers> { return this._deleteList; }

    set deleteList(pdeleteList: Array<StgIdentifiers>) { this._deleteList = pdeleteList; }

    get updateList(): Array<StgIdentifiers> { return this._updateList; }

    set updateList(pupdateList: Array<StgIdentifiers>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
