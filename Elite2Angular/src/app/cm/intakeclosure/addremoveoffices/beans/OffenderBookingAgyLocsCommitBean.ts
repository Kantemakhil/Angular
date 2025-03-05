import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderBookingAgyLocs } from '@cmintakeclosureaddremoveoffices/OffenderBookingAgyLocs';

export class OffenderBookingAgyLocsCommitBean extends BaseModel {
    private _insertList: Array<OffenderBookingAgyLocs>;
    private _deleteList: Array<OffenderBookingAgyLocs>;
    private _updateList: Array<OffenderBookingAgyLocs>;

    get insertList(): Array<OffenderBookingAgyLocs> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderBookingAgyLocs> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderBookingAgyLocs> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderBookingAgyLocs> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderBookingAgyLocs> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderBookingAgyLocs> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
