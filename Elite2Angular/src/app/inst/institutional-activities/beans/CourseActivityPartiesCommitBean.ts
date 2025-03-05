import { BaseModel } from '@commonbeans/BaseModel';
import { CourseActivityParties } from './CourseActivityParties';


export class CourseActivityPartiesCommitBean extends BaseModel {

    private _insertList: Array<CourseActivityParties>;
    private _deleteList: Array<CourseActivityParties>;
    private _updateList: Array<CourseActivityParties>;
    


    get insertList(): Array<CourseActivityParties> { return this._insertList; }

    set insertList(pinsertList: Array<CourseActivityParties>) { this._insertList = pinsertList; }

    get deleteList(): Array<CourseActivityParties> { return this._deleteList; }

    set deleteList(pdeleteList: Array<CourseActivityParties>) { this._deleteList = pdeleteList; }

    get updateList(): Array<CourseActivityParties> { return this._updateList; }

    set updateList(pupdateList: Array<CourseActivityParties>) { this._updateList = pupdateList; }
    
       toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
