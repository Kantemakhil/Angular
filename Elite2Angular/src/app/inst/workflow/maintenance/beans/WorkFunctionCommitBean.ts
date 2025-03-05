import { WorkFunction } from './WorkFunction';
export class WorkFunctionCommitBean {
    private _insertList: Array<WorkFunction>;
    private _deleteList: Array<WorkFunction>;
    private _updateList: Array<WorkFunction>;

    get insertList(): Array<WorkFunction> { return this._insertList; }

    set insertList(pinsertList: Array<WorkFunction>) { this._insertList = pinsertList; }

    get deleteList(): Array<WorkFunction> { return this._deleteList; }

    set deleteList(pdeleteList: Array<WorkFunction>) { this._deleteList = pdeleteList; }

    get updateList(): Array<WorkFunction> { return this._updateList; }

    set updateList(pupdateList: Array<WorkFunction>) { this._updateList = pupdateList; }


    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}