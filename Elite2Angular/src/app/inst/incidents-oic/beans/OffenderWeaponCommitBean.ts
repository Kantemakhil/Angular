import {BaseModel} from '@commonbeans/BaseModel';
import {OffenderWeapons} from '@instincidentsbeans/OffenderWeapons';

export class OffenderWeaponCommitBean extends BaseModel {

    private _insertList: Array<OffenderWeapons>;
    private _deleteList: Array<OffenderWeapons>;
    private _updateList: Array<OffenderWeapons>;

    get insertList(): Array<OffenderWeapons> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderWeapons>){ this._insertList = pinsertList; }

    get deleteList(): Array<OffenderWeapons> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderWeapons>){ this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderWeapons> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderWeapons>){ this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}