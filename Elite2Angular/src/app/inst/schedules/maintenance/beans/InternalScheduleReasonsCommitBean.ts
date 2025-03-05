import { BaseModel } from "@common/beans/BaseModel";
import { InternalScheduleReasons } from "@inst/schedules/maintenance/beans/InternalScheduleReasons";

export class InternalScheduleReasonsCommitBean extends BaseModel {

    private _insertList: Array<InternalScheduleReasons>;
    private _deleteList: Array<InternalScheduleReasons>;
    private _updateList: Array<InternalScheduleReasons>;

    get insertList(): Array<InternalScheduleReasons> { return this._insertList; }

    set insertList(pinsertList: Array<InternalScheduleReasons>) { this._insertList = pinsertList; }

    get deleteList(): Array<InternalScheduleReasons> { return this._deleteList; }

    set deleteList(pdeleteList: Array<InternalScheduleReasons>) { this._deleteList = pdeleteList; }

    get updateList(): Array<InternalScheduleReasons> { return this._updateList; }

    set updateList(pupdateList: Array<InternalScheduleReasons>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}