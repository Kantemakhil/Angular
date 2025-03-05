
import { MergeTransactionProcesses } from "./MergeTransactionProcesses";
export class MergeTransactionProcessesCommitBean {
    private _insertList: Array<MergeTransactionProcesses>;
    private _deleteList: Array<MergeTransactionProcesses>;
    private _updateList: Array<MergeTransactionProcesses>;

    get insertList(): Array<MergeTransactionProcesses> { return this._insertList; }

    set insertList(pinsertList: Array<MergeTransactionProcesses>) { this._insertList = pinsertList; }

    get deleteList(): Array<MergeTransactionProcesses> { return this._deleteList; }

    set deleteList(pdeleteList: Array<MergeTransactionProcesses>) { this._deleteList = pdeleteList; }

    get updateList(): Array<MergeTransactionProcesses> { return this._updateList; }

    set updateList(pupdateList: Array<MergeTransactionProcesses>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
