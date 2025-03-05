import { BaseModel } from "@common/beans/BaseModel";
import { OffObsAddDetails } from "./OffObsAddDetails";

export class OffObsAddDetailsCommitBean extends BaseModel {
    private _insertList: Array<OffObsAddDetails>;
    private _deleteList: Array<OffObsAddDetails>;
    private _updateList: Array<OffObsAddDetails>;


    get insertList(): Array<OffObsAddDetails> { return this._insertList; }

    set insertList(pinsertList: Array<OffObsAddDetails>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffObsAddDetails> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffObsAddDetails>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffObsAddDetails> { return this._updateList; }

    set updateList(pupdateList: Array<OffObsAddDetails>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
