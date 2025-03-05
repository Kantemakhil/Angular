import { Routes } from "./Routes";

export class RoutesCommitBean {
    private _deleteList: Array<Routes>;
    private _insertList: Array<Routes>;
    private _updateList: Array<Routes>;

    get deleteList(): Array<Routes>{ return this._deleteList; }
    set deleteList(pdeleteList: Array<Routes>){ this._deleteList = pdeleteList ;}
    get insertList(): Array<Routes>{ return this._insertList; }
    set insertList(pinsertList: Array<Routes>){ this._insertList = pinsertList ;}
    get updateList(): Array<Routes>{ return this._updateList; }
    set updateList(pupdateList: Array<Routes>){ this._updateList = pupdateList ;}

toJSON(): any {
    return { 
       'deleteList': this._deleteList,
       'insertList': this._insertList,
       'updateList': this._updateList,
        };
    } 
}