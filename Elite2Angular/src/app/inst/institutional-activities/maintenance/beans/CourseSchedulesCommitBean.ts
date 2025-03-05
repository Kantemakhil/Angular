import { BaseModel } from '@commonbeans/BaseModel';
import { CourseSchedules } from './CourseSchedules';


export class CourseSchedulesCommitBean extends BaseModel {

    private _insertList: Array<CourseSchedules>;
    private _deleteList: Array<CourseSchedules>;
    private _updateList: Array<CourseSchedules>;
    


    get insertList(): Array<CourseSchedules> { return this._insertList; }

    set insertList(pinsertList: Array<CourseSchedules>) { this._insertList = pinsertList; }

    get deleteList(): Array<CourseSchedules> { return this._deleteList; }

    set deleteList(pdeleteList: Array<CourseSchedules>) { this._deleteList = pdeleteList; }

    get updateList(): Array<CourseSchedules> { return this._updateList; }

    set updateList(pupdateList: Array<CourseSchedules>) { this._updateList = pupdateList; }
    
       toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
