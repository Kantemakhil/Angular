import { BaseModel } from "@common/beans/BaseModel";
import { VOffObservationPeriodsRes } from "./VOffObservationPeriodsRes";

export class VOffObservationPeriodsResCommitModel extends BaseModel {
    private _insertList: Array<VOffObservationPeriodsRes>;
private _deleteList: Array<VOffObservationPeriodsRes>;
private _updateList: Array<VOffObservationPeriodsRes>;

get insertList(): Array<VOffObservationPeriodsRes> { return this._insertList; }

set insertList(pinsertList: Array<VOffObservationPeriodsRes>) { this._insertList = pinsertList; }

get deleteList(): Array<VOffObservationPeriodsRes> { return this._deleteList; }

set deleteList(pdeleteList: Array<VOffObservationPeriodsRes>) { this._deleteList = pdeleteList; }

get updateList(): Array<VOffObservationPeriodsRes> { return this._updateList; }

set updateList(pupdateList: Array<VOffObservationPeriodsRes>) { this._updateList = pupdateList; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList
};
}
}