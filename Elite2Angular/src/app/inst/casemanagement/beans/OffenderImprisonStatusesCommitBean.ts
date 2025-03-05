import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderImprisonStatuses } from '@instCaseManagementbeans/OffenderImprisonStatuses';

export class OffenderImprisonStatusesCommitBean extends BaseModel {

    private _insertList: Array<OffenderImprisonStatuses>;
    private _deleteList: Array<OffenderImprisonStatuses>;
    private _updateList: Array<OffenderImprisonStatuses>;

    get insertList(): Array<OffenderImprisonStatuses> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderImprisonStatuses>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderImprisonStatuses> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderImprisonStatuses>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderImprisonStatuses> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderImprisonStatuses>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
