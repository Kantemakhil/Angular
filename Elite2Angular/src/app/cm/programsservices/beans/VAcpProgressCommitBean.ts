import { BaseModel } from "@common/beans/BaseModel";
import { VAcpProgress } from "./VAcpProgress";

export class VAcpProgressCommitBean extends BaseModel {
    private _insertList: Array<VAcpProgress>;
    private _deleteList: Array<VAcpProgress>;
    private _updateList: Array<VAcpProgress>;
    get insertList(): Array<VAcpProgress> { return this._insertList; }

    set insertList(pinsertList: Array<VAcpProgress>) { this._insertList = pinsertList; }

    get deleteList(): Array<VAcpProgress> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VAcpProgress>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VAcpProgress> { return this._updateList; }

    set updateList(pupdateList: Array<VAcpProgress>) { this._updateList = pupdateList; }


    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
