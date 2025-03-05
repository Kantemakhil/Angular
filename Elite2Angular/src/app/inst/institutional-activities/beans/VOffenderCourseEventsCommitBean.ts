import { BaseModel } from '@commonbeans/BaseModel';
import { VOffenderCourseEvents } from './VOffenderCourseEvents';


export class VOffenderCourseEventsCommitBean extends BaseModel {

    private _insertList: Array<VOffenderCourseEvents>;
    private _deleteList: Array<VOffenderCourseEvents>;
    private _updateList: Array<VOffenderCourseEvents>;

    get insertList(): Array<VOffenderCourseEvents> { return this._insertList; }

    set insertList(pinsertList: Array<VOffenderCourseEvents>) { this._insertList = pinsertList; }

    get deleteList(): Array<VOffenderCourseEvents> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VOffenderCourseEvents>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VOffenderCourseEvents> { return this._updateList; }

    set updateList(pupdateList: Array<VOffenderCourseEvents>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
