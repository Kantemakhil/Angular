import { BaseModel } from '@commonbeans/BaseModel';
import { CaseloadAccountPeriods } from '@inmate/trust/financialsmaintenance/transaction/beans/CaseloadAccountPeriods';

export class CaseloadAccountPeriodsCommitBean extends BaseModel {
    private _insertList: Array<CaseloadAccountPeriods>;
    private _deleteList: Array<CaseloadAccountPeriods>;
    private _updateList: Array<CaseloadAccountPeriods>;

    get insertList(): Array<CaseloadAccountPeriods> { return this._insertList; }

    set insertList(pinsertList: Array<CaseloadAccountPeriods>) { this._insertList = pinsertList; }

    get deleteList(): Array<CaseloadAccountPeriods> { return this._deleteList; }

    set deleteList(pdeleteList: Array<CaseloadAccountPeriods>) { this._deleteList = pdeleteList; }

    get updateList(): Array<CaseloadAccountPeriods> { return this._updateList; }

    set updateList(pupdateList: Array<CaseloadAccountPeriods>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
