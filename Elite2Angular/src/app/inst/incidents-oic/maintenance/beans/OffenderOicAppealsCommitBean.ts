import { OffenderOicAppeals } from "./OffenderOicAppeals";

export class OffenderOicAppealsCommitBean {
    private _deleteList: Array<OffenderOicAppeals>;
    private _insertList: Array<OffenderOicAppeals>;
    private _updateList: Array<OffenderOicAppeals>;

    get deleteList(): Array<OffenderOicAppeals>{ return this._deleteList; }
    set deleteList(pdeleteList: Array<OffenderOicAppeals>){ this._deleteList = pdeleteList ;}
    get insertList(): Array<OffenderOicAppeals>{ return this._insertList; }
    set insertList(pinsertList: Array<OffenderOicAppeals>){ this._insertList = pinsertList ;}
    get updateList(): Array<OffenderOicAppeals>{ return this._updateList; }
    set updateList(pupdateList: Array<OffenderOicAppeals>){ this._updateList = pupdateList ;}

toJSON(): any {
    return { 
       'deleteList': this._deleteList,
       'insertList': this._insertList,
       'updateList': this._updateList,
        };
    } 
}