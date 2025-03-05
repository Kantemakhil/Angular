import { WorkItems } from './WorkItems';
export class WorkItemsCommitBean {
    private _insertList: Array<WorkItems>;
    private _deleteList: Array<WorkItems>;
    private _updateList: Array<WorkItems>;

    get insertList(): Array<WorkItems> { return this._insertList; }

    set insertList(pinsertList: Array<WorkItems>) { this._insertList = pinsertList; }

    get deleteList(): Array<WorkItems> { return this._deleteList; }

    set deleteList(pdeleteList: Array<WorkItems>) { this._deleteList = pdeleteList; }

    get updateList(): Array<WorkItems> { return this._updateList; }

    set updateList(pupdateList: Array<WorkItems>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
