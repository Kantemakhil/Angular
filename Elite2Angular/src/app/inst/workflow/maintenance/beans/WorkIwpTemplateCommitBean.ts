import { WorkIwpTemplate } from './WorkIwpTemplate';
export class WorkIwpTemplateCommitBean {
    private _insertList: Array<WorkIwpTemplate>;
    private _deleteList: Array<WorkIwpTemplate>;
    private _updateList: Array<WorkIwpTemplate>;

    get insertList(): Array<WorkIwpTemplate> { return this._insertList; }

    set insertList(pinsertList: Array<WorkIwpTemplate>) { this._insertList = pinsertList; }

    get deleteList(): Array<WorkIwpTemplate> { return this._deleteList; }

    set deleteList(pdeleteList: Array<WorkIwpTemplate>) { this._deleteList = pdeleteList; }

    get updateList(): Array<WorkIwpTemplate> { return this._updateList; }

    set updateList(pupdateList: Array<WorkIwpTemplate>) { this._updateList = pupdateList; }


    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}
