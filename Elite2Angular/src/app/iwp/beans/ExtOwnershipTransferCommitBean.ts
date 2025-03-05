import { BaseModel } from "@common/beans/BaseModel";
import { ExtOwnershipTransfer } from "../beans/ExtOwnershipTransfer";

export class ExtOwnershipTransferCommitBean extends BaseModel {
    private _insertList: Array<ExtOwnershipTransfer>;
    private _deleteList: Array<ExtOwnershipTransfer>;
    private _updateList: Array<ExtOwnershipTransfer>;

    get insertList(): Array<ExtOwnershipTransfer> { return this._insertList; }

    set insertList(pinsertList: Array<ExtOwnershipTransfer>) { this._insertList = pinsertList; }

    get deleteList(): Array<ExtOwnershipTransfer> { return this._deleteList; }

    set deleteList(pdeleteList: Array<ExtOwnershipTransfer>) { this._deleteList = pdeleteList; }

    get updateList(): Array<ExtOwnershipTransfer> { return this._updateList; }

    set updateList(pupdateList: Array<ExtOwnershipTransfer>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}