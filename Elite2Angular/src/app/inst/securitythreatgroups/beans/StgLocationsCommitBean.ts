import { StgLocations } from '@instSecurityThreatGroupsbeans/StgLocations';
import { BaseModel } from '@commonbeans/BaseModel';

export class StgLocationsCommitBean extends BaseModel {
    private _insertList: Array<StgLocations>;
    private _deleteList: Array<StgLocations>;
    private _updateList: Array<StgLocations>;

    get insertList(): Array<StgLocations> { return this._insertList; }

    set insertList(pinsertList: Array<StgLocations>) { this._insertList = pinsertList; }

    get deleteList(): Array<StgLocations> { return this._deleteList; }

    set deleteList(pdeleteList: Array<StgLocations>) { this._deleteList = pdeleteList; }

    get updateList(): Array<StgLocations> { return this._updateList; }

    set updateList(pupdateList: Array<StgLocations>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
