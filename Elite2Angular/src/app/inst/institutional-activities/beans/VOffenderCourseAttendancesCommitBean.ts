import { BaseModel } from "@common/beans/BaseModel";
import { VOffenderCourseAttendances } from "./VOffenderCourseAttendances";

export class VOffenderCourseAttendancesCommitBean extends BaseModel {

    private _insertList: Array<VOffenderCourseAttendances>;
    private _deleteList: Array<VOffenderCourseAttendances>;
    private _updateList: Array<VOffenderCourseAttendances>;

    get insertList(): Array<VOffenderCourseAttendances> { return this._insertList; }

    set insertList(pinsertList: Array<VOffenderCourseAttendances>) { this._insertList = pinsertList; }

    get deleteList(): Array<VOffenderCourseAttendances> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VOffenderCourseAttendances>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VOffenderCourseAttendances> { return this._updateList; }

    set updateList(pupdateList: Array<VOffenderCourseAttendances>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }

}
