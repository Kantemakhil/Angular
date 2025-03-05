import { BaseModel } from '@commonbeans/BaseModel';
import { AgencyVisitDays } from '@inst/visits-management/maintenance/beans/AgencyVisitDays';

export class AgencyVisitDaysCommitBean extends BaseModel {
    private _insertList: Array<AgencyVisitDays>;
    private _deleteList: Array<AgencyVisitDays>;
    private _updateList: Array<AgencyVisitDays>;

    get insertList(): Array<AgencyVisitDays> { return this._insertList; }

    set insertList( pinsertList: Array<AgencyVisitDays> ) { this._insertList = pinsertList; }

    get deleteList(): Array<AgencyVisitDays> { return this._deleteList; }

    set deleteList( pdeleteList: Array<AgencyVisitDays> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<AgencyVisitDays> { return this._updateList; }

    set updateList( pupdateList: Array<AgencyVisitDays> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}