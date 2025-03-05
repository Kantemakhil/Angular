import { CourseActivityAreas } from './CourseActivityAreas';
import { BaseModel } from './../../../../common/beans/BaseModel';
export class CourseActivityAreasCommitBean extends BaseModel {
    private _insertList: Array<CourseActivityAreas>;
    private _deleteList: Array<CourseActivityAreas>;
    private _updateList: Array<CourseActivityAreas>;
    get insertList(): Array<CourseActivityAreas> { return this._insertList; }

    set insertList(pinsertList: Array<CourseActivityAreas>) { this._insertList = pinsertList; }

    get deleteList(): Array<CourseActivityAreas> { return this._deleteList; }

    set deleteList(pdeleteList: Array<CourseActivityAreas>) { this._deleteList = pdeleteList; }

    get updateList(): Array<CourseActivityAreas> { return this._updateList; }

    set updateList(pupdateList: Array<CourseActivityAreas>) { this._updateList = pupdateList; }


    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}