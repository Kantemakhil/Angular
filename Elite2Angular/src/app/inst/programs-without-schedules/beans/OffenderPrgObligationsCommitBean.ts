import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderPrgObligations } from '@instprogramswithoutschedulesbeans/OffenderPrgObligations';

export class OffenderPrgObligationsCommitBean extends BaseModel {
    private _insertList: Array<OffenderPrgObligations>;
    private _deleteList: Array<OffenderPrgObligations>;
    private _updateList: Array<OffenderPrgObligations>;

    get insertList(): Array<OffenderPrgObligations> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderPrgObligations> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderPrgObligations> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderPrgObligations> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderPrgObligations> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderPrgObligations> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
