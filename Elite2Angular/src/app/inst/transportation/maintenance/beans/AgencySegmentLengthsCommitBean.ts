import { BaseModel } from "@common/beans/BaseModel";
import { AgencySegmentLengths } from "./AgencySegmentLengths";


export class AgencysegmentlengthsCommitBean extends BaseModel {

    private _insertList: Array<AgencySegmentLengths>;
    private _deleteList: Array<AgencySegmentLengths>;
    private _updateList: Array<AgencySegmentLengths>;

    get insertList(): Array<AgencySegmentLengths> { return this._insertList; }

    set insertList(pinsertList: Array<AgencySegmentLengths>) { this._insertList = pinsertList; }

    get deleteList(): Array<AgencySegmentLengths> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AgencySegmentLengths>) { this._deleteList = pdeleteList; }

    get updateList(): Array<AgencySegmentLengths> { return this._updateList; }

    set updateList(pupdateList: Array<AgencySegmentLengths>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}