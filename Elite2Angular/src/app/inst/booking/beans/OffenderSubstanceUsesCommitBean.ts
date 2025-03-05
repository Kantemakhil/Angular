import { OffenderSubstanceUses } from "@inst/booking/beans/OffenderSubstanceUses";

export class OffenderSubstanceUsesCommitBean {

    private _insertList: Array<OffenderSubstanceUses>;
    private _deleteList: Array<OffenderSubstanceUses>;
    private _updateList: Array<OffenderSubstanceUses>;

    get insertList(): Array<OffenderSubstanceUses> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderSubstanceUses>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderSubstanceUses> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderSubstanceUses>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderSubstanceUses> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderSubstanceUses>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}