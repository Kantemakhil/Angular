import { programsPayBean } from './programsPayBean';


export class programsPayCommitBean  {

    private _insertList: Array<programsPayBean>;
    private _deleteList: Array<programsPayBean>;
    private _updateList: Array<programsPayBean>;
    


    get insertList(): Array<programsPayBean> { return this._insertList; }

    set insertList(pinsertList: Array<programsPayBean>) { this._insertList = pinsertList; }

    get deleteList(): Array<programsPayBean> { return this._deleteList; }

    set deleteList(pdeleteList: Array<programsPayBean>) { this._deleteList = pdeleteList; }

    get updateList(): Array<programsPayBean> { return this._updateList; }

    set updateList(pupdateList: Array<programsPayBean>) { this._updateList = pupdateList; }
    
       toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
