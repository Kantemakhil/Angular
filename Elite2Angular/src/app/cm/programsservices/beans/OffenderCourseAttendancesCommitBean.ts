import { BaseModel } from "@common/beans/BaseModel";
import { OffenderCourseAttendance } from "./OffenderCourseAttendance";

import { CourseSchedules } from '@inst/institutional-activities/maintenance/beans/CourseSchedules';

export class OffenderCourseAttendancesCommitBean extends BaseModel {
    private _insertList: Array<OffenderCourseAttendance>;
    public get insertList(): Array<OffenderCourseAttendance> {
        return this._insertList;
    }
    public set insertList(value: Array<OffenderCourseAttendance>) {
        this._insertList = value;
    }
    private _deleteList: Array<OffenderCourseAttendance>;
    public get deleteList(): Array<OffenderCourseAttendance> {
        return this._deleteList;
    }
    public set deleteList(value: Array<OffenderCourseAttendance>) {
        this._deleteList = value;
    }
    private _updateList: Array<OffenderCourseAttendance>;
    public get updateList(): Array<OffenderCourseAttendance> {
        return this._updateList;
    }
    public set updateList(value: Array<OffenderCourseAttendance>) {
        this._updateList = value;
    }
    private  _courseSchedules:CourseSchedules;

    get courseSchedules(): CourseSchedules { return this._courseSchedules; }

	set courseSchedules(pcourseSchedules: CourseSchedules){ this._courseSchedules = pcourseSchedules; }

  

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'courseSchedules':this._courseSchedules
        };
    }
}