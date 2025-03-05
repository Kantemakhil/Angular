import { ActionApi } from './ActionApi';

export class ActionApiCommitBean {
    private _insertList: Array<ActionApi>;
    private _deleteList: Array<ActionApi>;
    private _updateList: Array<ActionApi>;

    get insertList(): Array<ActionApi> { return this._insertList; }

    set insertList(pinsertList: Array<ActionApi>) { this._insertList = pinsertList; }

    get deleteList(): Array<ActionApi> { return this._deleteList; }

    set deleteList(pdeleteList: Array<ActionApi>) { this._deleteList = pdeleteList; }

    get updateList(): Array<ActionApi> { return this._updateList; }

    set updateList(pupdateList: Array<ActionApi>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
