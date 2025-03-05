import { BaseModel } from "@common/beans/BaseModel";
import { ScheduleTripAssignments } from "./ScheduledTripAssignments";



export class ScheduleTripAssignmentsCommitBean extends BaseModel {

    private _insertList: Array<ScheduleTripAssignments>;
    private _deleteList: Array<ScheduleTripAssignments>;
    private _updateList: Array<ScheduleTripAssignments>;

    get insertList(): Array<ScheduleTripAssignments> { return this._insertList; }

    set insertList(pinsertList: Array<ScheduleTripAssignments>) { this._insertList = pinsertList; }

    get deleteList(): Array<ScheduleTripAssignments> { return this._deleteList; }

    set deleteList(pdeleteList: Array<ScheduleTripAssignments>) { this._deleteList = pdeleteList; }

    get updateList(): Array<ScheduleTripAssignments> { return this._updateList; }

    set updateList(pupdateList: Array<ScheduleTripAssignments>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}