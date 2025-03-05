import { OffenderOicAppealIncidents } from "./OffenderOicAppealIncidents";

export class OffenderOicAppealIncidentsCommitBean {
    private _deleteList: Array<OffenderOicAppealIncidents>;
    private _insertList: Array<OffenderOicAppealIncidents>;
    private _updateList: Array<OffenderOicAppealIncidents>;

    get deleteList(): Array<OffenderOicAppealIncidents>{ return this._deleteList; }
    set deleteList(pdeleteList: Array<OffenderOicAppealIncidents>){ this._deleteList = pdeleteList ;}
    get insertList(): Array<OffenderOicAppealIncidents>{ return this._insertList; }
    set insertList(pinsertList: Array<OffenderOicAppealIncidents>){ this._insertList = pinsertList ;}
    get updateList(): Array<OffenderOicAppealIncidents>{ return this._updateList; }
    set updateList(pupdateList: Array<OffenderOicAppealIncidents>){ this._updateList = pupdateList ;}

toJSON(): any {
    return { 
       'deleteList': this._deleteList,
       'insertList': this._insertList,
       'updateList': this._updateList,
        };
    } 
}