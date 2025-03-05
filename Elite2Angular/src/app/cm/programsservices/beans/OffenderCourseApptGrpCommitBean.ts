import { BaseModel } from "@common/beans/BaseModel";
import { OffenderProgramProfiles } from "@instprogramswithoutschedulesbeans/OffenderProgramProfiles";
import { OffenderCourseApptGrp } from "./OffenderCourseApptGrp";
import { OffenderCourseApptRule } from "./OffenderCourseApptRule";


export class OffenderCourseApptGrpCommitBean extends BaseModel {
    private _insertList: Array<OffenderCourseApptGrp>;
    private _updateList: Array<OffenderCourseApptGrp>;
    private _deleteList: Array<OffenderCourseApptGrp>;
    private _offschInsertList: Array<OffenderCourseApptRule>;
    private _offschUpdateList: Array<OffenderCourseApptRule>;
    private _offschDeleteList: Array<OffenderCourseApptRule>;
    private _updateOffPrgList: Array<OffenderProgramProfiles>;
    public get updateOffPrgList(): Array<OffenderProgramProfiles> {
        return this._updateOffPrgList;
    }
    public set updateOffPrgList(value: Array<OffenderProgramProfiles>) {
        this._updateOffPrgList = value;
    }

    public get offschInsertList(): Array<OffenderCourseApptRule> {
        return this._offschInsertList;
    }
    public set offschInsertList(value: Array<OffenderCourseApptRule>) {
        this._offschInsertList = value;
    }
    public get offschDeleteList(): Array<OffenderCourseApptRule> {
        return this._offschDeleteList;
    }
    public set offschDeleteList(value: Array<OffenderCourseApptRule>) {
        this._offschDeleteList = value;
    }
    public get offschUpdateList(): Array<OffenderCourseApptRule> {
        return this._offschUpdateList;
    }
    public set offschUpdateList(value: Array<OffenderCourseApptRule>) {
        this._offschUpdateList = value;
    }


    public get insertList(): Array<OffenderCourseApptGrp> {
        return this._insertList;
    }
    public set insertList(value: Array<OffenderCourseApptGrp>) {
        this._insertList = value;
    }

    public get deleteList(): Array<OffenderCourseApptGrp> {
        return this._deleteList;
    }
    public set deleteList(value: Array<OffenderCourseApptGrp>) {
        this._deleteList = value;
    }

    public get updateList(): Array<OffenderCourseApptGrp> {
        return this._updateList;
    }
    public set updateList(value: Array<OffenderCourseApptGrp>) {
        this._updateList = value;
    }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'offschUpdateList': this._offschUpdateList,
            'offschInsertList': this._offschInsertList,
            'offschDeleteList': this._offschDeleteList,
            'updateOffPrgList':this._updateOffPrgList 
        };
    }
}
