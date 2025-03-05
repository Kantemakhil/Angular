import {BaseModel} from '@commonbeans/BaseModel';
import {AgencyLocations} from './AgencyLocations';

export class AgencyLocationsCommitBean extends BaseModel {

    private _insertList: Array<AgencyLocations>;
    private _deleteList: Array<AgencyLocations>;
    private _updateList: Array<AgencyLocations>;

    get insertList(): Array<AgencyLocations> { return this._insertList; }

    set insertList(pinsertList: Array<AgencyLocations>) { this._insertList = pinsertList; }

    get deleteList(): Array<AgencyLocations> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AgencyLocations>) { this._deleteList = pdeleteList; }

    get updateList(): Array<AgencyLocations> { return this._updateList; }

    set updateList(pupdateList: Array<AgencyLocations>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
