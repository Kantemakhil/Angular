import { BaseModel } from '@commonbeans/BaseModel';
import { AgencyVisitSlots } from '@inst/visits-management/maintenance/beans/AgencyVisitSlots';

export class AgencyVisitSlotsCommitBean extends BaseModel {
    private _insertList: Array<AgencyVisitSlots>;
    private _deleteList: Array<AgencyVisitSlots>;
    private _updateList: Array<AgencyVisitSlots>;

    get insertList(): Array<AgencyVisitSlots> { return this._insertList; }

    set insertList( pinsertList: Array<AgencyVisitSlots> ) { this._insertList = pinsertList; }

    get deleteList(): Array<AgencyVisitSlots> { return this._deleteList; }

    set deleteList( pdeleteList: Array<AgencyVisitSlots> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<AgencyVisitSlots> { return this._updateList; }

    set updateList( pupdateList: Array<AgencyVisitSlots> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}