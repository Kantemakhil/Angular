export class AgyLocFeedDetailsCommitBean {
    private _deleteList: number;
    private _insertList: number;
    private _updateList: number;

    get deleteList(): number{ return this._deleteList; }
    set deleteList(pdeleteList: number){ this._deleteList = pdeleteList ;}
    get insertList(): number{ return this._insertList; }
    set insertList(pinsertList: number){ this._insertList = pinsertList ;}
    get updateList(): number{ return this._updateList; }
    set updateList(pupdateList: number){ this._updateList = pupdateList ;}

toJSON(): any {
    return { 
       'deleteList': this._deleteList,
       'insertList': this._insertList,
       'updateList': this._updateList,
        };
    } 
}
