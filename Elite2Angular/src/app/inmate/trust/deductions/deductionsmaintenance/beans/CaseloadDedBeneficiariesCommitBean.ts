import { BaseModel } from '@commonbeans/BaseModel';
import { CaseloadDedBeneficiaries } from '@inmate/trust/deductions/deductionsmaintenance/beans/CaseloadDedBeneficiaries';

export class CaseloadDedBeneficiariesCommitBean extends BaseModel {
    private _insertList: Array<CaseloadDedBeneficiaries>;
    private _deleteList: Array<CaseloadDedBeneficiaries>;
    private _updateList: Array<CaseloadDedBeneficiaries>;

    get insertList(): Array<CaseloadDedBeneficiaries> { return this._insertList; }

    set insertList(pinsertList: Array<CaseloadDedBeneficiaries>) { this._insertList = pinsertList; }

    get deleteList(): Array<CaseloadDedBeneficiaries> { return this._deleteList; }

    set deleteList(pdeleteList: Array<CaseloadDedBeneficiaries>) { this._deleteList = pdeleteList; }

    get updateList(): Array<CaseloadDedBeneficiaries> { return this._updateList; }

    set updateList(pupdateList: Array<CaseloadDedBeneficiaries>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
