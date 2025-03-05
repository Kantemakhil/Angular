import {StaffEquipment} from '@instincidentsbeans/StaffEquipment';
import { BaseModel } from '@commonbeans/BaseModel';
export class StaffEquipmentCommitBean extends BaseModel {

    private _insertList: Array<StaffEquipment>;
    private _deleteList: Array<StaffEquipment>;
    private _updateList: Array<StaffEquipment>;

    get insertList(): Array<StaffEquipment> { return this._insertList; }

    set insertList(pinsertList: Array<StaffEquipment>){ this._insertList = pinsertList; }

    get deleteList(): Array<StaffEquipment> { return this._deleteList; }

    set deleteList(pdeleteList: Array<StaffEquipment>){ this._deleteList = pdeleteList; }

    get updateList(): Array<StaffEquipment> { return this._updateList; }

    set updateList(pupdateList: Array<StaffEquipment>){ this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}