import { BaseModel } from '@commonbeans/BaseModel';
import { CaseloadDeductionProfiles } from '@inmate/trust/checks/beans/CaseloadDeductionProfiles';

export class CaseloadDeductionProfilesCommitBean extends BaseModel {

    private _insertList: Array<CaseloadDeductionProfiles>;
    private _deleteList: Array<CaseloadDeductionProfiles>;
    private _updateList: Array<CaseloadDeductionProfiles>;

    get insertList(): Array<CaseloadDeductionProfiles> { return this._insertList; }

    set insertList(pinsertList: Array<CaseloadDeductionProfiles>) { this._insertList = pinsertList; }

    get deleteList(): Array<CaseloadDeductionProfiles> { return this._deleteList; }

    set deleteList(pdeleteList: Array<CaseloadDeductionProfiles>) { this._deleteList = pdeleteList; }

    get updateList(): Array<CaseloadDeductionProfiles> { return this._updateList; }

    set updateList(pupdateList: Array<CaseloadDeductionProfiles>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
