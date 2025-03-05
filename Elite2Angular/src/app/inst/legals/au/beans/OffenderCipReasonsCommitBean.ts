
import { OffenderCipReasons } from "@inst/legals/au/beans/OffenderCipReasons";
export class OffenderCipReasonsCommitBean {
    private _insertList: Array<OffenderCipReasons>;
    private _deleteList: Array<OffenderCipReasons>;
    private _updateList: Array<OffenderCipReasons>;

    get insertList(): Array<OffenderCipReasons> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderCipReasons>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderCipReasons> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderCipReasons>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderCipReasons> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderCipReasons>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
