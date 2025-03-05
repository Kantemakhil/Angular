import {BaseModel} from '@commonbeans/BaseModel';
import {Persons} from './Persons';

export class PersonsCommitBean extends BaseModel {

    private _insertList: Array<Persons>;
    private _deleteList: Array<Persons>;
    private _updateList: Array<Persons>;

    get insertList(): Array<Persons> { return this._insertList; }

    set insertList(pinsertList: Array<Persons>) { this._insertList = pinsertList; }

    get deleteList(): Array<Persons> { return this._deleteList; }

    set deleteList(pdeleteList: Array<Persons>) { this._deleteList = pdeleteList; }

    get updateList(): Array<Persons> { return this._updateList; }

    set updateList(pupdateList: Array<Persons>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
             'insertList': this._insertList,
             'deleteList': this._deleteList,
             'updateList': this._updateList
        };
    }
}
