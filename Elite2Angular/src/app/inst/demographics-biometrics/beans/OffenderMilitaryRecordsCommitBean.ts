import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderMilitaryRecords } from '@instdemographicsbeans/OffenderMilitaryRecords';

export class OffenderMilitaryRecordsCommitBean extends BaseModel {
    private _insertList: Array<OffenderMilitaryRecords>;
    private _deleteList: Array<OffenderMilitaryRecords>;
    private _updateList: Array<OffenderMilitaryRecords>;

    get insertList(): Array<OffenderMilitaryRecords> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderMilitaryRecords> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderMilitaryRecords> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderMilitaryRecords> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderMilitaryRecords> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderMilitaryRecords> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
