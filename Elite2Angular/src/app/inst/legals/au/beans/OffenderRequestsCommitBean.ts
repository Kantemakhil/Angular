
import { OffenderRequests } from "./OffenderRequests";
export class OffenderRequestsCommitBean {
    private _insertList: Array<OffenderRequests>;
    private _deleteList: Array<OffenderRequests>;
    private _updateList: Array<OffenderRequests>;

    get insertList(): Array<OffenderRequests> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderRequests>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderRequests> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderRequests>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderRequests> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderRequests>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
