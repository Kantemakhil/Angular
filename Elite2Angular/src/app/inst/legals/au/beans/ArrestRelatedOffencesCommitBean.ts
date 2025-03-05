import { BaseModel } from "@common/beans/BaseModel";
import { ArrestRelatedOffences } from "./ArrestRelatedOffences";

export class ArrestRelatedOffencesCommitBean extends BaseModel {

    private _deleteList: Array<ArrestRelatedOffences>;
    private _insertList: Array<ArrestRelatedOffences>;
    private _updateList: Array<ArrestRelatedOffences>;

    get deleteList(): Array<ArrestRelatedOffences> { return this._deleteList; }
    set deleteList(pdeleteList: Array<ArrestRelatedOffences>) { this._deleteList = pdeleteList; }
    get insertList(): Array<ArrestRelatedOffences> { return this._insertList; }
    set insertList(pinsertList: Array<ArrestRelatedOffences>) { this._insertList = pinsertList; }
    get updateList(): Array<ArrestRelatedOffences> { return this._updateList; }
    set updateList(pupdateList: Array<ArrestRelatedOffences>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}
