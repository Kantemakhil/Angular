import { BaseModel } from '@commonbeans/BaseModel';
import { CaseloadDeductionDetails } from '@inmate/trust/checks/beans//CaseloadDeductionDetails';

export class CaseloadDeductionDetailsCommitBean extends BaseModel {

    private _insertList: Array<CaseloadDeductionDetails>;
    private _deleteList: Array<CaseloadDeductionDetails>;
    private _updateList: Array<CaseloadDeductionDetails>;

    get insertList(): Array<CaseloadDeductionDetails> { return this._insertList; }

    set insertList(pinsertList: Array<CaseloadDeductionDetails>) { this._insertList = pinsertList; }

    get deleteList(): Array<CaseloadDeductionDetails> { return this._deleteList; }

    set deleteList(pdeleteList: Array<CaseloadDeductionDetails>) { this._deleteList = pdeleteList; }

    get updateList(): Array<CaseloadDeductionDetails> { return this._updateList; }

    set updateList(pupdateList: Array<CaseloadDeductionDetails>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
