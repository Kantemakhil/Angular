import { BaseModel } from '@commonbeans/BaseModel';
import { AgencyVisitTimes } from '@inst/visits-management/maintenance/beans/AgencyVisitTimes';

export class AgencyVisitTimesCommitBean extends BaseModel {
    private _insertList: Array<AgencyVisitTimes>;
    private _deleteList: Array<AgencyVisitTimes>;
    private _updateList: Array<AgencyVisitTimes>;

    get insertList(): Array<AgencyVisitTimes> { return this._insertList; }

    set insertList( pinsertList: Array<AgencyVisitTimes> ) { this._insertList = pinsertList; }

    get deleteList(): Array<AgencyVisitTimes> { return this._deleteList; }

    set deleteList( pdeleteList: Array<AgencyVisitTimes> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<AgencyVisitTimes> { return this._updateList; }

    set updateList( pupdateList: Array<AgencyVisitTimes> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}