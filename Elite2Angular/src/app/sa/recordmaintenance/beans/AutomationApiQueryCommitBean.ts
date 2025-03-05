import { AutomationApiQuery } from './AutomationApiQuery';

export class AutomationApiQueryCommitBean {
    private _insertList: Array<AutomationApiQuery>;
    private _deleteList: Array<AutomationApiQuery>;
    private _updateList: Array<AutomationApiQuery>;

    get insertList(): Array<AutomationApiQuery> { return this._insertList; }

    set insertList(pinsertList: Array<AutomationApiQuery>) { this._insertList = pinsertList; }

    get deleteList(): Array<AutomationApiQuery> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AutomationApiQuery>) { this._deleteList = pdeleteList; }

    get updateList(): Array<AutomationApiQuery> { return this._updateList; }

    set updateList(pupdateList: Array<AutomationApiQuery>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}