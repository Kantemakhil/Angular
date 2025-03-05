import { BaseModel } from '@commonbeans/BaseModel';
import { PersonProfiles } from '@visitsbeans/PersonProfiles';

export class PersonProfilesCommitBean extends BaseModel {

    private _insertList: Array<PersonProfiles>;
    private _deleteList: Array<PersonProfiles>;
    private _updateList: Array<PersonProfiles>;

    get insertList(): Array<PersonProfiles> { return this._insertList; }

    set insertList(pinsertList: Array<PersonProfiles>) { this._insertList = pinsertList; }

    get deleteList(): Array<PersonProfiles> { return this._deleteList; }

    set deleteList(pdeleteList: Array<PersonProfiles>) { this._deleteList = pdeleteList; }

    get updateList(): Array<PersonProfiles> { return this._updateList; }

    set updateList(pupdateList: Array<PersonProfiles>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
