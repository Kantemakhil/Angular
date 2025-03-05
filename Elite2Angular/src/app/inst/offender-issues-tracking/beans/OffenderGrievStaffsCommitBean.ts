import { BaseModel } from "@common/beans/BaseModel";
import { OffenderGrievStaffs } from "./OffenderGrievStaffs";

export class OffenderGrievStaffsCommitBean extends BaseModel {
    private _insertList: Array<OffenderGrievStaffs>;
    private _deleteList: Array<OffenderGrievStaffs>;
    private _updateList: Array<OffenderGrievStaffs>;

    get insertList(): Array<OffenderGrievStaffs> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderGrievStaffs>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderGrievStaffs> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderGrievStaffs>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderGrievStaffs> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderGrievStaffs>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}