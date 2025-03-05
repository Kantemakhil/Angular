import { BaseModel } from '@commonbeans/BaseModel';
import { OicOffences } from '../../beans/OicOffences';
export class OicOffencesCommitBean extends BaseModel {

    private _insertList: Array<OicOffences>;
    private _deleteList: Array<OicOffences>;
    private _updateList: Array<OicOffences>;

    get insertList(): Array<OicOffences> { return this._insertList; }

    set insertList(pinsertList: Array<OicOffences>) { this._insertList = pinsertList; }

    get deleteList(): Array<OicOffences> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OicOffences>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OicOffences> { return this._updateList; }

    set updateList(pupdateList: Array<OicOffences>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}