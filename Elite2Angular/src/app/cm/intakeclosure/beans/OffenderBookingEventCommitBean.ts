import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderBookingEvent } from '@cm/intakeclosure/beans/OffenderBookingEvent';
import {OffenderResidence} from '@cm/intakeclosure/beans/OffenderResidence';
export class OffenderBookingEventCommitBean extends BaseModel {
    private _insertList: Array<OffenderBookingEvent>;
    private _deleteList: Array<OffenderBookingEvent>;
    private _updateList: Array<OffenderBookingEvent>;
    private _reportInsertList: Array<OffenderResidence>;
    get insertList(): Array<OffenderBookingEvent> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderBookingEvent>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderBookingEvent> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderBookingEvent>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderBookingEvent> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderBookingEvent>) { this._updateList = pupdateList; }

    get reportInsertList(): Array<OffenderResidence> { return this._reportInsertList; }

    set reportInsertList(preportInsertList: Array<OffenderResidence>) { this._reportInsertList = preportInsertList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'reportInsertList': this._reportInsertList
        };
    }
}