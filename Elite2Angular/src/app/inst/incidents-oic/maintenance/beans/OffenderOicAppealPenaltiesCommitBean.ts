import { OffenderOicAppealPenalties } from "./OffenderOicAppealPenalties";

export class OffenderOicAppealPenaltiesCommitBean {
    private _deleteList: Array<OffenderOicAppealPenalties>;
    private _insertList: Array<OffenderOicAppealPenalties>;
    private _updateList: Array<OffenderOicAppealPenalties>;

    get deleteList(): Array<OffenderOicAppealPenalties>{ return this._deleteList; }
    set deleteList(pdeleteList: Array<OffenderOicAppealPenalties>){ this._deleteList = pdeleteList ;}
    get insertList(): Array<OffenderOicAppealPenalties>{ return this._insertList; }
    set insertList(pinsertList: Array<OffenderOicAppealPenalties>){ this._insertList = pinsertList ;}
    get updateList(): Array<OffenderOicAppealPenalties>{ return this._updateList; }
    set updateList(pupdateList: Array<OffenderOicAppealPenalties>){ this._updateList = pupdateList ;}

toJSON(): any {
    return { 
       'deleteList': this._deleteList,
       'insertList': this._insertList,
       'updateList': this._updateList,
        };
    } 
}
