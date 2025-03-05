import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderCaseNotes } from '@instCaseManagementbeans/OffenderCaseNotes';

export class OffenderCaseNotesCommitBean extends BaseModel {

    private _insertList: Array<OffenderCaseNotes>;
    private _deleteList: Array<OffenderCaseNotes>;
    private _updateList: Array<OffenderCaseNotes>;

    get insertList(): Array<OffenderCaseNotes> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderCaseNotes>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderCaseNotes> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderCaseNotes>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderCaseNotes> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderCaseNotes>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
