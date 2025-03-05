import { BaseModel } from "@common/beans/BaseModel";
import { OffenderObservationTypes } from "./OffenderObservationTypes";

export class OffenderObservationTypesCommitBean extends BaseModel {
    private _insertList: Array<OffenderObservationTypes>;
    private _deleteList: Array<OffenderObservationTypes>;
    private _updateList: Array<OffenderObservationTypes>;


    get insertList(): Array<OffenderObservationTypes> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderObservationTypes>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderObservationTypes> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderObservationTypes>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderObservationTypes> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderObservationTypes>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

}
