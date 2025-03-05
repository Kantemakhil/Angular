import {BaseModel} from '@commonbeans/BaseModel';
import {OffenderIndSchedules} from '@instschedulebeans/OffenderIndSchedules';

export class OffenderIndSchedulesCommitBean extends BaseModel {

    private _insertList: Array<OffenderIndSchedules>;
    private _deleteList: Array<OffenderIndSchedules>;
    private _updateList: Array<OffenderIndSchedules>;
    private _agyUpdateList: Array<OffenderIndSchedules>;


    get insertList(): Array<OffenderIndSchedules> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderIndSchedules>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderIndSchedules> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderIndSchedules>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderIndSchedules> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderIndSchedules>) { this._updateList = pupdateList; }

    get agyUpdateList(): Array<OffenderIndSchedules> {return this._agyUpdateList;}

    set agyUpdateList(value: Array<OffenderIndSchedules>) {this._agyUpdateList = value;}

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'agyUpdateList':this._agyUpdateList,
        };
    }
}
