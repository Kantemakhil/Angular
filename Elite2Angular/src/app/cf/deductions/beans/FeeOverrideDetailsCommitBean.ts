import { FeeOverrideDetails } from "./FeeOverrideDetails";

export class FeeOverrideDetailsCommitBean {
    private _insertList: Array<FeeOverrideDetails>;
    private _deleteList: Array<FeeOverrideDetails>;
    private _updateList: Array<FeeOverrideDetails>;

    get insertList(): Array<FeeOverrideDetails> { return this._insertList; }

    set insertList(pinsertList: Array<FeeOverrideDetails>) { this._insertList = pinsertList; }

    get deleteList(): Array<FeeOverrideDetails> { return this._deleteList; }

    set deleteList(pdeleteList: Array<FeeOverrideDetails>) { this._deleteList = pdeleteList; }

    get updateList(): Array<FeeOverrideDetails> { return this._updateList; }

    set updateList(pupdateList: Array<FeeOverrideDetails>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}