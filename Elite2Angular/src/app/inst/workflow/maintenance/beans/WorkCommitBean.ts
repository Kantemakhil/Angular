import { Work } from './Work';
export class WorkCommitBean {
    private _insertList: Array<Work>;
    private _deleteList: Array<Work>;
    private _updateList: Array<Work>;

    get insertList(): Array<Work> { return this._insertList; }

    set insertList(pinsertList: Array<Work>) { this._insertList = pinsertList; }

    get deleteList(): Array<Work> { return this._deleteList; }

    set deleteList(pdeleteList: Array<Work>) { this._deleteList = pdeleteList; }

    get updateList(): Array<Work> { return this._updateList; }

    set updateList(pupdateList: Array<Work>) { this._updateList = pupdateList; }


    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}