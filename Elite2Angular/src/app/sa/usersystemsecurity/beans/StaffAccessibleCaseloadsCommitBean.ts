import { BaseModel } from '@commonbeans/BaseModel';
import { StaffAccessibleCaseloads } from './StaffAccessibleCaseloads';


export class StaffAccessibleCaseloadsCommitBean extends BaseModel {

    private _insertList: Array<StaffAccessibleCaseloads>;
    private _deleteList: Array<StaffAccessibleCaseloads>;
    private _updateList: Array<StaffAccessibleCaseloads>;

    get insertList(): Array<StaffAccessibleCaseloads> { return this._insertList; }

    set insertList( pinsertList: Array<StaffAccessibleCaseloads> ) { this._insertList = pinsertList; }

    get deleteList(): Array<StaffAccessibleCaseloads> { return this._deleteList; }

    set deleteList( pdeleteList: Array<StaffAccessibleCaseloads> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<StaffAccessibleCaseloads> { return this._updateList; }

    set updateList( pupdateList: Array<StaffAccessibleCaseloads> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

}
