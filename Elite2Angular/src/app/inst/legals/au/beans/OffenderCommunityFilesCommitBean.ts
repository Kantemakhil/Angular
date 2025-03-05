import { BaseModel } from "@common/beans/BaseModel";
import { OffenderCommunityFiles } from "./OffenderCommunityFiles";

export class OffenderCommunityFilesCommitBean extends BaseModel {
    private _deleteList: Array<OffenderCommunityFiles>;
    private _insertList: Array<OffenderCommunityFiles>;
    private _updateList: Array<OffenderCommunityFiles>;

    get deleteList(): Array<OffenderCommunityFiles> { return this._deleteList; }
    set deleteList(pdeleteList: Array<OffenderCommunityFiles>) { this._deleteList = pdeleteList; }
    get insertList(): Array<OffenderCommunityFiles>  { return this._insertList; }
    set insertList(pinsertList: Array<OffenderCommunityFiles> ) { this._insertList = pinsertList; }
    get updateList(): Array<OffenderCommunityFiles>  { return this._updateList; }
    set updateList(pupdateList: Array<OffenderCommunityFiles> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}
