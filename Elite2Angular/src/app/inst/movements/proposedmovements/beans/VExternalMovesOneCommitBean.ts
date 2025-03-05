import { VExternalMovesOne } from "./VExternalMovesOne";
export class VExternalMovesOneCommitBean {
    private _insertList: Array<VExternalMovesOne>;
    private _deleteList: Array<VExternalMovesOne>;
    private _updateList: Array<VExternalMovesOne>;

    get insertList(): Array<VExternalMovesOne> { return this._insertList; }

    set insertList(pinsertList: Array<VExternalMovesOne>) { this._insertList = pinsertList; }

    get deleteList(): Array<VExternalMovesOne> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VExternalMovesOne>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VExternalMovesOne> { return this._updateList; }

    set updateList(pupdateList: Array<VExternalMovesOne>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };

    }
}