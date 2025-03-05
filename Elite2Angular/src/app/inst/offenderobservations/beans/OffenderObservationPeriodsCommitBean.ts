import { BaseModel } from "@common/beans/BaseModel";
import { OffenderObservationPeriods } from "./OffenderObservationPeriods";

export class OffenderObservationPeriodsCommitBean extends BaseModel {
private _insertList: Array<OffenderObservationPeriods>;
    private _deleteList: Array<OffenderObservationPeriods>;
    private _updateList: Array<OffenderObservationPeriods>;

    get insertList(): Array<OffenderObservationPeriods> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderObservationPeriods> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderObservationPeriods> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderObservationPeriods> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderObservationPeriods> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderObservationPeriods> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
