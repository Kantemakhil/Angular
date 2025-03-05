import { StgCaseNotes } from '@instSecurityThreatGroupsbeans/StgCaseNotes';
import { BaseModel } from '@commonbeans/BaseModel';

export class StgCaseNotesCommitBean extends BaseModel {

    private _insertList: Array<StgCaseNotes>;
    private _updateList: Array<StgCaseNotes>;
    private _deleteList: Array<StgCaseNotes>;

    get insertList(): Array<StgCaseNotes> { return this._insertList; }
    set insertList(insert: Array<StgCaseNotes>) { this._insertList = insert; }

    get updateList(): Array<StgCaseNotes> { return this._updateList; }
    set updateList(update: Array<StgCaseNotes>) { this._updateList = update; }

    get deleteList(): Array<StgCaseNotes> { return this._deleteList; }
    set deleteList(pdeleteList: Array<StgCaseNotes>) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList
        };
    }
}
