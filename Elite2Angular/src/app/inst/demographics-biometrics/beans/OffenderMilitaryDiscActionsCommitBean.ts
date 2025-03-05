import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderMilitaryDiscActions } from '@instdemographicsbeans/OffenderMilitaryDiscActions';

export class OffenderMilitaryDiscActionsCommitBean extends BaseModel {
    private _insertList: Array<OffenderMilitaryDiscActions>;
    private _deleteList: Array<OffenderMilitaryDiscActions>;
    private _updateList: Array<OffenderMilitaryDiscActions>;

    get insertList(): Array<OffenderMilitaryDiscActions> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderMilitaryDiscActions> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderMilitaryDiscActions> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderMilitaryDiscActions> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderMilitaryDiscActions> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderMilitaryDiscActions> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
