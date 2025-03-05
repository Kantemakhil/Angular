import { BaseModel } from "@common/beans/BaseModel";
import { OffenceIndicators } from "./OffenceIndicators";

export class OffenceIndicatorCommitBean extends BaseModel{
    private _insertList: Array<OffenceIndicators>;
    private _deleteList: Array<OffenceIndicators>;
    private _updateList: Array<OffenceIndicators>;

    get insertList(): Array<OffenceIndicators> { return this._insertList; }

    set insertList( pinsertList: Array<OffenceIndicators> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenceIndicators> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenceIndicators> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenceIndicators> { return this._updateList; }

    set updateList( pupdateList: Array<OffenceIndicators> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}