import { BaseModel } from '@commonbeans/BaseModel';
import { RpOtherOccupants } from '@inst/inquiries/beans/RpOtherOccupants';
import { Addresses } from '@inst/demographics-biometrics/beans/Addresses';

export class RpOtherOccupantsCommitBean extends BaseModel {

    private _insertList: Array<RpOtherOccupants>;
    private _deleteList: Array<RpOtherOccupants>;
    private _updateList: Array<RpOtherOccupants>;
    private _addressesBean: Addresses;

    get insertList(): Array<RpOtherOccupants> { return this._insertList; }

    set insertList( pinsertList: Array<RpOtherOccupants> ) { this._insertList = pinsertList; }

    get deleteList(): Array<RpOtherOccupants> { return this._deleteList; }

    set deleteList( pdeleteList: Array<RpOtherOccupants> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<RpOtherOccupants> { return this._updateList; }

    set updateList( pupdateList: Array<RpOtherOccupants> ) { this._updateList = pupdateList; }

    get addressesBean(): Addresses { return this._addressesBean; }

    set addressesBean( paddressesBean: Addresses ) { this._addressesBean = paddressesBean; }


    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'addressesBean': this._addressesBean,
        };
    }
}
