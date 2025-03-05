import { BaseModel } from '@commonbeans/BaseModel';
import { CaseLoadAgencyLocations } from './CaseLoadAgencyLocations';


export class CaseLoadAgencyLocationsCommitBean extends BaseModel {

    private _insertList: Array<CaseLoadAgencyLocations>;
    private _deleteList: Array<CaseLoadAgencyLocations>;
    private _updateList: Array<CaseLoadAgencyLocations>;

    get insertList(): Array<CaseLoadAgencyLocations> { return this._insertList; }

    set insertList( pinsertList: Array<CaseLoadAgencyLocations> ) { this._insertList = pinsertList; }

    get deleteList(): Array<CaseLoadAgencyLocations> { return this._deleteList; }

    set deleteList( pdeleteList: Array<CaseLoadAgencyLocations> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<CaseLoadAgencyLocations> { return this._updateList; }

    set updateList( pupdateList: Array<CaseLoadAgencyLocations> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

}
