import { AutomationQueryParameters } from '../beans/AutomationQueryParameters';

export class AutomationQueryParametersCommitBean {
    private _insertList: Array<AutomationQueryParameters>;
    private _deleteList: Array<AutomationQueryParameters>;
    private _updateList: Array<AutomationQueryParameters>;

    get insertList(): Array<AutomationQueryParameters> { return this._insertList; }

    set insertList(pinsertList: Array<AutomationQueryParameters>) { this._insertList = pinsertList; }

    get deleteList(): Array<AutomationQueryParameters> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AutomationQueryParameters>) { this._deleteList = pdeleteList; }

    get updateList(): Array<AutomationQueryParameters> { return this._updateList; }

    set updateList(pupdateList: Array<AutomationQueryParameters>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
