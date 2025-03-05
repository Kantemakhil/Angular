import { BaseModel } from '@commonbeans/BaseModel';	
import { Statutes } from './Statutes';
export class StatutesCommitBean  extends BaseModel {
    private _insertList: Array<Statutes>;
    private _deleteList: Array<Statutes>;
    private _updateList: Array<Statutes>;

    get insertList(): Array<Statutes> { return this._insertList; }

    set insertList(pinsertList: Array<Statutes>) { this._insertList = pinsertList; }

    get deleteList(): Array<Statutes> { return this._deleteList; }

    set deleteList(pdeleteList: Array<Statutes>) { this._deleteList = pdeleteList; }

    get updateList(): Array<Statutes> { return this._updateList; }

    set updateList(pupdateList: Array<Statutes>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}