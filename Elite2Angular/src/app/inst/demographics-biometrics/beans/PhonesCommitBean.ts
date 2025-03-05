import {BaseModel} from '@commonbeans/BaseModel';
import {Phones} from './Phones';

export class PhonesCommitBean extends BaseModel {

    private _insertList: Array<Phones>;
    private _deleteList: Array<Phones>;
    private _updateList: Array<Phones>;

    get insertList(): Array<Phones> { return this._insertList; }

    set insertList(pinsertList: Array<Phones>) { this._insertList = pinsertList; }

    get deleteList(): Array<Phones> { return this._deleteList; }

    set deleteList(pdeleteList: Array<Phones>) { this._deleteList = pdeleteList; }

    get updateList(): Array<Phones> { return this._updateList; }

    set updateList(pupdateList: Array<Phones>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
             'insertList': this._insertList,
             'deleteList': this._deleteList,
             'updateList': this._updateList
        };
    }
}
