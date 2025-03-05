import { BaseModel } from '@commonbeans/BaseModel';
import { AgencyInternalLocations } from '@inst/incidents-oic/beans/AgencyInternalLocations';

export class AgencyInternalLocationsCommitBean extends BaseModel {
    private _insertList: Array<AgencyInternalLocations>;
    private _deleteList: Array<AgencyInternalLocations>;
    private _updateList: Array<AgencyInternalLocations>;

    get insertList(): Array<AgencyInternalLocations> { return this._insertList; }

    set insertList( pinsertList: Array<AgencyInternalLocations> ) { this._insertList = pinsertList; }

    get deleteList(): Array<AgencyInternalLocations> { return this._deleteList; }

    set deleteList( pdeleteList: Array<AgencyInternalLocations> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<AgencyInternalLocations> { return this._updateList; }

    set updateList( pupdateList: Array<AgencyInternalLocations> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
