import { WorkTrigger } from './WorkTrigger';
export class WorkTriggerCommitBean {
    private _insertList: Array<WorkTrigger>;
    private _deleteList: Array<WorkTrigger>;
    private _updateList: Array<WorkTrigger>;

    get insertList(): Array<WorkTrigger> { return this._insertList; }

    set insertList(pinsertList: Array<WorkTrigger>) { this._insertList = pinsertList; }

    get deleteList(): Array<WorkTrigger> { return this._deleteList; }

    set deleteList(pdeleteList: Array<WorkTrigger>) { this._deleteList = pdeleteList; }

    get updateList(): Array<WorkTrigger> { return this._updateList; }

    set updateList(pupdateList: Array<WorkTrigger>) { this._updateList = pupdateList; }


    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}
