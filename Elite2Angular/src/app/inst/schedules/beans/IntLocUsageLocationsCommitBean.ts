import {BaseModel} from '@commonbeans/BaseModel';
import {IntLocUsageLocations} from '@instschedulebeans/IntLocUsageLocations';

export class IntLocUsageLocationsCommitBean extends BaseModel {

    private _insertList: Array<IntLocUsageLocations>;
    private _deleteList: Array<IntLocUsageLocations>;
    private _updateList: Array<IntLocUsageLocations>;

    get insertList(): Array<IntLocUsageLocations> { return this._insertList; }

    set insertList(pinsertList: Array<IntLocUsageLocations>) { this._insertList = pinsertList; }

    get deleteList(): Array<IntLocUsageLocations> { return this._deleteList; }

    set deleteList(pdeleteList: Array<IntLocUsageLocations>) { this._deleteList = pdeleteList; }

    get updateList(): Array<IntLocUsageLocations> { return this._updateList; }

    set updateList(pupdateList: Array<IntLocUsageLocations>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
