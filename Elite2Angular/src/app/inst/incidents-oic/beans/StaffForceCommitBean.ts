import {StaffForce} from '@instincidentsbeans/StaffForce';
import { BaseModel } from '@commonbeans/BaseModel';
export class StaffForceCommitBean extends BaseModel {

    private _insertList: Array<StaffForce>;
    private _deleteList: Array<StaffForce>;
    private _updateList: Array<StaffForce>;

    get insertList(): Array<StaffForce> { return this._insertList; }

    set insertList(pinsertList: Array<StaffForce>){ this._insertList = pinsertList; }

    get deleteList(): Array<StaffForce> { return this._deleteList; }

    set deleteList(pdeleteList: Array<StaffForce>){ this._deleteList = pdeleteList; }

    get updateList(): Array<StaffForce> { return this._updateList; }

    set updateList(pupdateList: Array<StaffForce>){ this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}