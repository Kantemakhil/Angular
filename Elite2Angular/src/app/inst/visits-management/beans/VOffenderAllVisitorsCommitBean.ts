import { BaseModel } from '@commonbeans/BaseModel';
import { VOffenderAllVisitors } from '@visitsbeans/VOffenderAllVisitors';

export class VOffenderAllVisitorsCommitBean extends BaseModel {

    private _insertList: Array<VOffenderAllVisitors>;
    private _deleteList: Array<VOffenderAllVisitors>;
    private _updateList: Array<VOffenderAllVisitors>;

    get insertList(): Array<VOffenderAllVisitors> { return this._insertList; }

    set insertList(pinsertList: Array<VOffenderAllVisitors>) { this._insertList = pinsertList; }

    get deleteList(): Array<VOffenderAllVisitors> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VOffenderAllVisitors>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VOffenderAllVisitors> { return this._updateList; }

    set updateList(pupdateList: Array<VOffenderAllVisitors>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
