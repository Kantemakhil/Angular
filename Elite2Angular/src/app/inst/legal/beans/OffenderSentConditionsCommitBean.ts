import { OffenderSentConditions } from "../../legal/beans/OffenderSentConditions";

export class OffenderSentConditionsCommitBean {
    private _deleteList: Array<OffenderSentConditions>;
    private _insertList: Array<OffenderSentConditions>;
    private _updateList: Array<OffenderSentConditions>;
    private _typedeleteList: Array<OffenderSentConditions>;

    get deleteList(): Array<OffenderSentConditions> { return this._deleteList; }
    set deleteList(pdeleteList: Array<OffenderSentConditions>) { this._deleteList = pdeleteList; }
    get insertList(): Array<OffenderSentConditions> { return this._insertList; }
    set insertList(pinsertList: Array<OffenderSentConditions>) { this._insertList = pinsertList; }
    get updateList(): Array<OffenderSentConditions> { return this._updateList; }
    set updateList(pupdateList: Array<OffenderSentConditions>) { this._updateList = pupdateList; }
    get typedeleteList(): Array<OffenderSentConditions> { return this._typedeleteList; }
    set typedeleteList(ptypedeleteList: Array<OffenderSentConditions>) { this._typedeleteList = ptypedeleteList; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
            'typedeleteList': this._typedeleteList
        };
    }
}
