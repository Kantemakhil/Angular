import { OffenderBailConditions } from "./OffenderBailConditions";

export class OffenderBailConditionscommitBean {
    private _deleteList: Array<OffenderBailConditions>;
    private _insertList: Array<OffenderBailConditions>;
    private _updateList: Array<OffenderBailConditions>;

    get deleteList(): Array<OffenderBailConditions> { return this._deleteList; }
    set deleteList(pdeleteList: Array<OffenderBailConditions>) { this._deleteList = pdeleteList; }
    get insertList(): Array<OffenderBailConditions> { return this._insertList; }
    set insertList(pinsertList: Array<OffenderBailConditions>) { this._insertList = pinsertList; }
    get updateList(): Array<OffenderBailConditions> { return this._updateList; }
    set updateList(pupdateList: Array<OffenderBailConditions>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}