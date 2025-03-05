import { BaseModel } from "@common/beans/BaseModel";
import { PeriodicDetentionStatuses } from "./PeriodicDetentionStatuses";

export class PeriodicDetentionStatusesCommitBean extends BaseModel {

    private _insertList: Array<PeriodicDetentionStatuses>;
    private _deleteList: Array<PeriodicDetentionStatuses>;
    private _updateList: Array<PeriodicDetentionStatuses>;

    get insertList(): Array<PeriodicDetentionStatuses> { return this._insertList; }

    set insertList( pinsertList: Array<PeriodicDetentionStatuses> ) { this._insertList = pinsertList; }

    get deleteList(): Array<PeriodicDetentionStatuses> { return this._deleteList; }

    set deleteList( pdeleteList: Array<PeriodicDetentionStatuses> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<PeriodicDetentionStatuses> { return this._updateList; }

    set updateList( pupdateList: Array<PeriodicDetentionStatuses> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
