import {BaseModel} from '@commonbeans/BaseModel';
import { AgencyIncidents} from '@instincidentsbeans/AgencyIncidents';

export class AgencyIncidentsCommitBean extends BaseModel {

    private _insertList: Array<AgencyIncidents>;
    private _deleteList: Array<AgencyIncidents>;
    private _updateList: Array<AgencyIncidents>;

    get insertList(): Array<AgencyIncidents> { return this._insertList; }

    set insertList(pinsertList: Array<AgencyIncidents>){ this._insertList = pinsertList; }

    get deleteList(): Array<AgencyIncidents> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AgencyIncidents>){ this._deleteList = pdeleteList; }

    get updateList(): Array<AgencyIncidents> { return this._updateList; }

    set updateList(pupdateList: Array<AgencyIncidents>){ this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}