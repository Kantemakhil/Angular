import { BaseModel } from '@commonbeans/BaseModel';
import { PersonIdentifiers} from '@instdemographicsbeans/PersonIdentifiers';

export class PersonIdentifiersCommitBean extends BaseModel {
    private _insertList: Array<PersonIdentifiers>;
    private _deleteList: Array<PersonIdentifiers>;
    private _updateList: Array<PersonIdentifiers>;

    get insertList(): Array<PersonIdentifiers> { return this._insertList; }

    set insertList( pinsertList: Array<PersonIdentifiers> ) { this._insertList = pinsertList; }

    get deleteList(): Array<PersonIdentifiers> { return this._deleteList; }

    set deleteList( pdeleteList: Array<PersonIdentifiers> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<PersonIdentifiers> { return this._updateList; }

    set updateList( pupdateList: Array<PersonIdentifiers> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
