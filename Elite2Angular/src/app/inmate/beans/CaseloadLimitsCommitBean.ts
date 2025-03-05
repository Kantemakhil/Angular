import { BaseModel } from '@commonbeans/BaseModel';
import { CaseloadLimits } from '@inmate/beans/CaseloadLimits';

export class CaseloadLimitsCommitBean extends BaseModel {
    private _insertList: Array<CaseloadLimits>;
    private _deleteList: Array<CaseloadLimits>;
    private _updateList: Array<CaseloadLimits>;

    get insertList(): Array<CaseloadLimits> { return this._insertList; }

    set insertList( pinsertList: Array<CaseloadLimits> ) { this._insertList = pinsertList; }

    get deleteList(): Array<CaseloadLimits> { return this._deleteList; }

    set deleteList( pdeleteList: Array<CaseloadLimits> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<CaseloadLimits> { return this._updateList; }

    set updateList( pupdateList: Array<CaseloadLimits> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
