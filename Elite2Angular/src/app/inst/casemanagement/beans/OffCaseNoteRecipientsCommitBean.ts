import { BaseModel } from '@commonbeans/BaseModel';
import { OffCaseNoteRecipients } from '@instCaseManagementbeans/OffCaseNoteRecipients';

export class OffCaseNoteRecipientsCommitBean extends BaseModel {

    private _insertList: Array<OffCaseNoteRecipients>;
    private _deleteList: Array<OffCaseNoteRecipients>;
    private _updateList: Array<OffCaseNoteRecipients>;

    get insertList(): Array<OffCaseNoteRecipients> { return this._insertList; }

    set insertList(pinsertList: Array<OffCaseNoteRecipients>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffCaseNoteRecipients> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffCaseNoteRecipients>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffCaseNoteRecipients> { return this._updateList; }

    set updateList(pupdateList: Array<OffCaseNoteRecipients>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
