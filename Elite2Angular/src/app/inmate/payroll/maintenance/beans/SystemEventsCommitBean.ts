import { BaseModel } from '@commonbeans/BaseModel';	
import { SystemEvents } from '@inmate/payroll/maintenance/beans/SystemEvents';
export class SystemEventsCommitBean  extends BaseModel {
    private _insertList: Array<SystemEvents>;
    private _deleteList: Array<SystemEvents>;
    private _updateList: Array<SystemEvents>;

    get insertList(): Array<SystemEvents> { return this._insertList; }

    set insertList(pinsertList: Array<SystemEvents>) { this._insertList = pinsertList; }

    get deleteList(): Array<SystemEvents> { return this._deleteList; }

    set deleteList(pdeleteList: Array<SystemEvents>) { this._deleteList = pdeleteList; }

    get updateList(): Array<SystemEvents> { return this._updateList; }

    set updateList(pupdateList: Array<SystemEvents>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}