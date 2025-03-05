import { BaseModel } from "@common/beans/BaseModel";
import { VisitTypeLimits } from "@inst/visits-management/maintenance/beans/VisitTypeLimits";

export class VisitTypeLimitsCommitBean extends BaseModel {
    private _insertList: Array<VisitTypeLimits>;
    private _updateList: Array<VisitTypeLimits>;
    private _deleteList: Array<VisitTypeLimits>;

    get insertList(): Array<VisitTypeLimits> { return this._insertList; }

    set insertList(pinsertList: Array<VisitTypeLimits>) { this._insertList = pinsertList; }

    get updateList(): Array<VisitTypeLimits> { return this._updateList; }

    set updateList(pupdateList: Array<VisitTypeLimits>) { this._updateList = pupdateList; }

    get deleteList(): Array<VisitTypeLimits> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VisitTypeLimits>) { this._deleteList = pdeleteList; }

    toJSON():
        any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList
        };
    }
}
