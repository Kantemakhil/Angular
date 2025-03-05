import { BaseModel } from "@common/beans/BaseModel";
import { AssignmentTransfers } from "./AssignmentTransfers";

export class AssignmentTransfersCommitBean extends BaseModel {


    private _deleteList: Array<AssignmentTransfers>;
    private _insertList: Array<AssignmentTransfers>;
    private _updateList: Array<AssignmentTransfers>;

    get deleteList(): Array<AssignmentTransfers> { return this._deleteList; }
    set deleteList(pdeleteList: Array<AssignmentTransfers>) { this._deleteList = pdeleteList; }
    get insertList(): Array<AssignmentTransfers> { return this._insertList; }
    set insertList(pinsertList: Array<AssignmentTransfers>) { this._insertList = pinsertList; }
    get updateList(): Array<AssignmentTransfers> { return this._updateList; }
    set updateList(pupdateList: Array<AssignmentTransfers>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}
