
import { OffenderRequestCharges } from "./OffenderRequestCharges";
export class OffenderRequestChargesCommitBean {
    private _insertList: Array<OffenderRequestCharges>;
    private _deleteList: Array<OffenderRequestCharges>;
    private _updateList: Array<OffenderRequestCharges>;

    get insertList(): Array<OffenderRequestCharges> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderRequestCharges>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderRequestCharges> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderRequestCharges>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderRequestCharges> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderRequestCharges>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
