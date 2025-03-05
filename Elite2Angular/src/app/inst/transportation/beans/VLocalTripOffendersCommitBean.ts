
import { BaseModel } from "@common/beans/BaseModel";
import { VLocalTripOffenders } from '@inst/transportation/beans/VLocalTripOffenders';
export class VLocalTripOffendersCommitBean extends BaseModel {

    private _insertList: Array<VLocalTripOffenders>;
    private _deleteList: Array<VLocalTripOffenders>;
    private _updateList: Array<VLocalTripOffenders>;

    get insertList(): Array<VLocalTripOffenders> { return this._insertList; }

    set insertList(pinsertList: Array<VLocalTripOffenders>) { this._insertList = pinsertList; }

    get deleteList(): Array<VLocalTripOffenders> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VLocalTripOffenders>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VLocalTripOffenders> { return this._updateList; }

    set updateList(pupdateList: Array<VLocalTripOffenders>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
