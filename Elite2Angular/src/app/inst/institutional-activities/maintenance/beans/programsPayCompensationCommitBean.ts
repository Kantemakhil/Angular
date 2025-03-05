import { programsPayCompensationBean } from './programsPayCompensationBean';


export class programsPayCompensationCommitBean  {

    private _insertList: Array<programsPayCompensationBean>;
    private _deleteList: Array<programsPayCompensationBean>;
    private _updateList: Array<programsPayCompensationBean>;
    


    get insertList(): Array<programsPayCompensationBean> { return this._insertList; }

    set insertList(pinsertList: Array<programsPayCompensationBean>) { this._insertList = pinsertList; }

    get deleteList(): Array<programsPayCompensationBean> { return this._deleteList; }

    set deleteList(pdeleteList: Array<programsPayCompensationBean>) { this._deleteList = pdeleteList; }

    get updateList(): Array<programsPayCompensationBean> { return this._updateList; }

    set updateList(pupdateList: Array<programsPayCompensationBean>) { this._updateList = pupdateList; }
    
       toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
