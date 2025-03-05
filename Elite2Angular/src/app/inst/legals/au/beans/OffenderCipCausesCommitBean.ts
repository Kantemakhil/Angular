
import { OffenderCipCauses } from "@inst/legals/au/beans/OffenderCipCauses";
export class OffenderCipCausesCommitBean {
    private _insertList: Array<OffenderCipCauses>;
    private _deleteList: Array<OffenderCipCauses>;
    private _updateList: Array<OffenderCipCauses>;

    get insertList(): Array<OffenderCipCauses> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderCipCauses>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderCipCauses> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderCipCauses>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderCipCauses> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderCipCauses>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
