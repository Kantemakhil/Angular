import { RouteStopDetails } from "./RouteStopDetails";

export class RouteStopDetailsCommitBean {
    private _deleteList: Array<RouteStopDetails>;
    private _insertList: Array<RouteStopDetails>;
    private _updateList: Array<RouteStopDetails>;

    get deleteList(): Array<RouteStopDetails>{ return this._deleteList; }
    set deleteList(pdeleteList: Array<RouteStopDetails>){ this._deleteList = pdeleteList ;}
    get insertList(): Array<RouteStopDetails>{ return this._insertList; }
    set insertList(pinsertList: Array<RouteStopDetails>){ this._insertList = pinsertList ;}
    get updateList(): Array<RouteStopDetails>{ return this._updateList; }
    set updateList(pupdateList: Array<RouteStopDetails>){ this._updateList = pupdateList ;}

toJSON(): any {
    return { 
       'deleteList': this._deleteList,
       'insertList': this._insertList,
       'updateList': this._updateList,
        };
    } 
}