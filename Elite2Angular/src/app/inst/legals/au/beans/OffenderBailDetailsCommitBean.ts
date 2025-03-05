import { OffenderBailDetails } from "@inst/legal/beans/OffenderBailDetails";

export class OffenderBailDetailsCommitBean {
    private _deleteList: Array<OffenderBailDetails>;
    private _insertList: Array<OffenderBailDetails>;
    private _updateList: Array<OffenderBailDetails>;

    get deleteList(): Array<OffenderBailDetails> { return this._deleteList; }
    set deleteList(pdeleteList: Array<OffenderBailDetails>) { this._deleteList = pdeleteList; }
    get insertList(): Array<OffenderBailDetails> { return this._insertList; }
    set insertList(pinsertList: Array<OffenderBailDetails>) { this._insertList = pinsertList; }
    get updateList(): Array<OffenderBailDetails> { return this._updateList; }
    set updateList(pupdateList: Array<OffenderBailDetails>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}