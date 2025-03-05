import { BaseModel } from '@commonbeans/BaseModel';
import { OicOffenceIndicators } from './OicOffenceIndicators';
export class OicOffenceIndicatorsCommitBean extends BaseModel {

    private _insertList: Array<OicOffenceIndicators>;
    private _deleteList: Array<OicOffenceIndicators>;
    private _updateList: Array<OicOffenceIndicators>;

    get insertList(): Array<OicOffenceIndicators> { return this._insertList; }

    set insertList(pinsertList: Array<OicOffenceIndicators>) { this._insertList = pinsertList; }

    get deleteList(): Array<OicOffenceIndicators> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OicOffenceIndicators>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OicOffenceIndicators> { return this._updateList; }

    set updateList(pupdateList: Array<OicOffenceIndicators>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}