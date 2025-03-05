import { OffenderSubstanceDetails } from "@inst/booking/beans/OffenderSubstanceDetails";

export class OffenderSubstanceDetailsCommitBean {

    private _insertList: Array<OffenderSubstanceDetails>;
    private _deleteList: Array<OffenderSubstanceDetails>;
    private _updateList: Array<OffenderSubstanceDetails>;

    get insertList(): Array<OffenderSubstanceDetails> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderSubstanceDetails>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderSubstanceDetails> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderSubstanceDetails>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderSubstanceDetails> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderSubstanceDetails>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
    
}