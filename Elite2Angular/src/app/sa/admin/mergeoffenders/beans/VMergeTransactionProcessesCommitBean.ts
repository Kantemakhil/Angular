
import { VMergeTransactionProcesses } from "./VMergeTransactionProcesses";
export class VMergeTransactionProcessesCommitBean {
    private _insertList: Array<VMergeTransactionProcesses>;
    private _deleteList: Array<VMergeTransactionProcesses>;
    private _updateList: Array<VMergeTransactionProcesses>;

    get insertList(): Array<VMergeTransactionProcesses> { return this._insertList; }

    set insertList(pinsertList: Array<VMergeTransactionProcesses>) { this._insertList = pinsertList; }

    get deleteList(): Array<VMergeTransactionProcesses> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VMergeTransactionProcesses>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VMergeTransactionProcesses> { return this._updateList; }

    set updateList(pupdateList: Array<VMergeTransactionProcesses>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
