import { BaseModel } from "@common/beans/BaseModel";
import { OffObsCharacteristics } from "./OffObsCharacteristics";

export class OffObsCharacteristicsCommitBean extends BaseModel {


    private _insertList: Array<OffObsCharacteristics>;
    private _deleteList: Array<OffObsCharacteristics>;
    private _updateList: Array<OffObsCharacteristics>;


    get insertList(): Array<OffObsCharacteristics> { return this._insertList; }

    set insertList(pinsertList: Array<OffObsCharacteristics>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffObsCharacteristics> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffObsCharacteristics>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffObsCharacteristics> { return this._updateList; }

    set updateList(pupdateList: Array<OffObsCharacteristics>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

}
