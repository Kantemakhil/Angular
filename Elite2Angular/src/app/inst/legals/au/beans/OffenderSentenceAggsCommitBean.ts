import { BaseModel } from "@common/beans/BaseModel";
import { OffenderSentenceAggs } from "./OffenderSentenceAggs";

export class OffenderSentenceAggsCommitBean extends BaseModel {
    private _insertList: Array<OffenderSentenceAggs>;
    private _deleteList: Array<OffenderSentenceAggs>;
    private _updateList: Array<OffenderSentenceAggs>;

    get insertList(): Array<OffenderSentenceAggs> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderSentenceAggs>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderSentenceAggs> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderSentenceAggs>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderSentenceAggs> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderSentenceAggs>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}