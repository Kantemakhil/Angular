import { BaseModel } from "@common/beans/BaseModel";
import { OffenderFileTransactions } from "./OffenderFileTransactions";

export class OffenderFileTransactionsCommitBean extends BaseModel {
    private _deleteList: Array<OffenderFileTransactions>;
    private _insertList: Array<OffenderFileTransactions>;
    private _updateList: Array<OffenderFileTransactions>;

    get deleteList(): Array<OffenderFileTransactions> { return this._deleteList; }
    set deleteList(pdeleteList: Array<OffenderFileTransactions>) { this._deleteList = pdeleteList; }
    get insertList(): Array<OffenderFileTransactions> { return this._insertList; }
    set insertList(pinsertList: Array<OffenderFileTransactions>) { this._insertList = pinsertList; }
    get updateList(): Array<OffenderFileTransactions> { return this._updateList; }
    set updateList(pupdateList: Array<OffenderFileTransactions>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}