import { BaseModel } from "@common/beans/BaseModel";
import { VisitCycleLimits } from "@inst/visits-management/maintenance/beans/VisitCycleLimits";

export class VisitCycleLimitsCommitBean extends BaseModel {
    private _insertList: Array<VisitCycleLimits>;
    private _updateList: Array<VisitCycleLimits>;
    private _deleteList: Array<VisitCycleLimits>;

    get insertList(): Array<VisitCycleLimits> { return this._insertList; }

    set insertList(pinsertList: Array<VisitCycleLimits>) { this._insertList = pinsertList; }

    get updateList(): Array<VisitCycleLimits> { return this._updateList; }

    set updateList(pupdateList: Array<VisitCycleLimits>) { this._updateList = pupdateList; }

    get deleteList(): Array<VisitCycleLimits> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VisitCycleLimits>) { this._deleteList = pdeleteList; }

    toJSON():
        any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList
        };
    }
}
