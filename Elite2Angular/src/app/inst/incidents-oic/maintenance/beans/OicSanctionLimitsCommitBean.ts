import { BaseModel } from '@commonbeans/BaseModel';
import { OicSanctionLimits } from './OicSanctionLimits';
export class OicSanctionLimitsCommitBean extends BaseModel {

    private _insertList: Array<OicSanctionLimits>;
    private _deleteList: Array<OicSanctionLimits>;
    private _updateList: Array<OicSanctionLimits>;

    get insertList(): Array<OicSanctionLimits> { return this._insertList; }

    set insertList(pinsertList: Array<OicSanctionLimits>) { this._insertList = pinsertList; }

    get deleteList(): Array<OicSanctionLimits> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OicSanctionLimits>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OicSanctionLimits> { return this._updateList; }

    set updateList(pupdateList: Array<OicSanctionLimits>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}