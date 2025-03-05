import { BaseModel } from "@common/beans/BaseModel";
import { OffenderReleaseDetails } from "./OffenderReleaseDetails";


export class OffenderReleaseDetailsCommitBean extends BaseModel {

    private _insertList: Array<OffenderReleaseDetails>;
    private _deleteList: Array<OffenderReleaseDetails>;
    private _updateList: Array<OffenderReleaseDetails>;

    get insertList(): Array<OffenderReleaseDetails> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderReleaseDetails>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderReleaseDetails> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderReleaseDetails>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderReleaseDetails> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderReleaseDetails>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
