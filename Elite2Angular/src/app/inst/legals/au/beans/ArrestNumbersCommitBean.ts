import { BaseModel } from "@common/beans/BaseModel";
import { ArrestNumbers } from "./ArrestNumbers";

export class ArrestNumbersCommitBean extends BaseModel {

    private _deleteList: Array<ArrestNumbers>;
    private _insertList: Array<ArrestNumbers>;
    private _updateList: Array<ArrestNumbers>;

    get deleteList(): Array<ArrestNumbers> { return this._deleteList; }
    set deleteList(pdeleteList: Array<ArrestNumbers>) { this._deleteList = pdeleteList; }
    get insertList(): Array<ArrestNumbers> { return this._insertList; }
    set insertList(pinsertList: Array<ArrestNumbers>) { this._insertList = pinsertList; }
    get updateList(): Array<ArrestNumbers> { return this._updateList; }
    set updateList(pupdateList: Array<ArrestNumbers>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}
