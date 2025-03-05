import { CourseActivities } from '@instprogramswithoutschedulesbeans/CourseActivities';
import { BaseModel } from '@commonbeans/BaseModel';
   export class CourseActivitiesCommitBean extends BaseModel {
       private _deleteList: Array<CourseActivities>;
       private _serialVersionUID: number;
       private _insertList: Array<CourseActivities>;
       private _updateList: Array<CourseActivities>;

       get deleteList(): Array<CourseActivities> { return  this._deleteList; }

       set deleteList(pdeleteList: Array<CourseActivities>) { this._deleteList = pdeleteList; }

       get serialVersionUID(): number { return  this._serialVersionUID; }

       set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

       get insertList(): Array<CourseActivities> { return  this._insertList; }

       set insertList(pinsertList: Array<CourseActivities>) { this._insertList = pinsertList; }

       get updateList(): Array<CourseActivities> { return  this._updateList; }

       set updateList(pupdateList: Array<CourseActivities>) { this._updateList = pupdateList; }


    toJSON(): any  {
       return {
         'deleteList': this._deleteList,
         'serialVersionUID': this._serialVersionUID,
         'insertList': this._insertList,
         'updateList': this._updateList,
          };
       }
 }
