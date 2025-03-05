import { DmnProcess } from './DmnProcess';

export class DmnProcessCommitBean{
    private _insertList: Array<DmnProcess>;
    private _deleteList: Array<DmnProcess>;
    private _updateList: Array<DmnProcess>;
    private _sourceModule: string;


    get insertList(): Array<DmnProcess> { return this._insertList; }

    set insertList(pinsertList: Array<DmnProcess>) { this._insertList = pinsertList; }

    get deleteList(): Array<DmnProcess> { return this._deleteList; }

    set deleteList(pdeleteList: Array<DmnProcess>) { this._deleteList = pdeleteList; }

    get updateList(): Array<DmnProcess> { return this._updateList; }

    set updateList(pupdateList: Array<DmnProcess>) { this._updateList = pupdateList; }

    get sourceModule(): string { return  this._sourceModule; }
    set sourceModule(psourceModule: string) { this._sourceModule = psourceModule; }
    

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'sourceModule':this._sourceModule
        };
    }
}
