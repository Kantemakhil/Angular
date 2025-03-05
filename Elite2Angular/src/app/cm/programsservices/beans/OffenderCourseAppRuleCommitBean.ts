import { BaseModel } from "@common/beans/BaseModel";
import { OffenderCourseApptRule } from "./OffenderCourseApptRule";

export class OffenderCourseApptRulesCommitBean extends BaseModel {
    private _insertList: Array<OffenderCourseApptRule>;
    public get insertList(): Array<OffenderCourseApptRule> {
        return this._insertList;
    }
    public set insertList(value: Array<OffenderCourseApptRule>) {
        this._insertList = value;
    }
    private _deleteList: Array<OffenderCourseApptRule>;
    public get deleteList(): Array<OffenderCourseApptRule> {
        return this._deleteList;
    }
    public set deleteList(value: Array<OffenderCourseApptRule>) {
        this._deleteList = value;
    }
    private _updateList: Array<OffenderCourseApptRule>;
    public get updateList(): Array<OffenderCourseApptRule> {
        return this._updateList;
    }
    public set updateList(value: Array<OffenderCourseApptRule>) {
        this._updateList = value;
    }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}