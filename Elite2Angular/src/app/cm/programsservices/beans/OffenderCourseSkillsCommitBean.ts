import { BaseModel } from "@common/beans/BaseModel";
import { VOffenderCourseEvents } from "@inst/institutional-activities/beans/VOffenderCourseEvents";
import { OffenderCourseSkills } from "./OffenderCourseSkills";

export class OffenderCourseSkillsCommitBean extends BaseModel {
    private _insertList: Array<OffenderCourseSkills>;
    private _deleteList: Array<OffenderCourseSkills>;
    private _updateList: Array<OffenderCourseSkills>;
    get insertList(): Array<OffenderCourseSkills> { return this._insertList; }
    private _eventUpdateList: Array<VOffenderCourseEvents>;

    get eventUpdateList(): Array<VOffenderCourseEvents> { return this._eventUpdateList; }
    set eventUpdateList(value: Array<VOffenderCourseEvents>) { this._eventUpdateList = value; }

    set insertList(pinsertList: Array<OffenderCourseSkills>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderCourseSkills> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderCourseSkills>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderCourseSkills> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderCourseSkills>) { this._updateList = pupdateList; }


    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'eventUpdateList': this._eventUpdateList
        };
    }
}