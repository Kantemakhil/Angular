
import { BaseModel } from "@common/beans/BaseModel";
import { GrievanceTxns } from "./GrievanceTxns";

export class GrievanceTxnsCommitBean extends BaseModel {
    private _insertList: Array<GrievanceTxns>;
    private _deleteList: Array<GrievanceTxns>;
    private _updateList: Array<GrievanceTxns>;

    get insertList(): Array<GrievanceTxns> { return this._insertList; }

    set insertList( pinsertList: Array<GrievanceTxns> ) { this._insertList = pinsertList; }

    get deleteList(): Array<GrievanceTxns> { return this._deleteList; }

    set deleteList( pdeleteList: Array<GrievanceTxns> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<GrievanceTxns> { return this._updateList; }

    set updateList( pupdateList: Array<GrievanceTxns> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}