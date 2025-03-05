import { BaseModel } from "@common/beans/BaseModel";
import { CourseScheduleRules } from "./CourseScheduleRules";
import { CourseActivities } from "@instprogramswithoutschedulesbeans/CourseActivities";

export class CourseScheduleRulesCommitBean extends BaseModel {
    private _deleteList: Array<CourseScheduleRules>;
    private _serialVersionUID: number;
    private _insertList: Array<CourseScheduleRules>;
    private _updateList: Array<CourseScheduleRules>;
    private _actUpdate: Array<CourseActivities>;

    get deleteList(): Array<CourseScheduleRules> { return  this._deleteList; }

       set deleteList(pdeleteList: Array<CourseScheduleRules>) { this._deleteList = pdeleteList; }

       get serialVersionUID(): number { return  this._serialVersionUID; }

       set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

       get insertList(): Array<CourseScheduleRules> { return  this._insertList; }

       set insertList(pinsertList: Array<CourseScheduleRules>) { this._insertList = pinsertList; }

       get updateList(): Array<CourseScheduleRules> { return  this._updateList; }

       set updateList(pupdateList: Array<CourseScheduleRules>) { this._updateList = pupdateList; }

       get actUpdate(): Array<CourseActivities> { return  this._actUpdate; }

       set actUpdate(pactUpdate: Array<CourseActivities>) { this._actUpdate = pactUpdate; }


    toJSON(): any  {
       return {
         'deleteList': this._deleteList,
         'serialVersionUID': this._serialVersionUID,
         'insertList': this._insertList,
         'updateList': this._updateList,
         'actUpdate': this._actUpdate,
          };
       }

}