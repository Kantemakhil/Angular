import { BaseModel } from '@commonbeans/BaseModel';
import { VOffContactPersons } from '@visitsbeans/VOffContactPersons';

export class VOffContactPersonsCommitBean extends BaseModel {

    private _insertList: Array<VOffContactPersons>;
    private _deleteList: Array<VOffContactPersons>;
    private _updateList: Array<VOffContactPersons>;

    get insertList(): Array<VOffContactPersons> { return this._insertList; }

    set insertList(pinsertList: Array<VOffContactPersons>) { this._insertList = pinsertList; }

    get deleteList(): Array<VOffContactPersons> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VOffContactPersons>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VOffContactPersons> { return this._updateList; }

    set updateList(pupdateList: Array<VOffContactPersons>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
