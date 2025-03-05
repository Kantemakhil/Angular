import { BaseModel } from '@commonbeans/BaseModel';
import { PersonEmployments } from '@instdemographicsbeans/PersonEmployments';

export class PersonEmploymentsCommitBean extends BaseModel {
    private _insertList: Array<PersonEmployments>;
    private _deleteList: Array<PersonEmployments>;
    private _updateList: Array<PersonEmployments>;

    get insertList(): Array<PersonEmployments> { return this._insertList; }

    set insertList( pinsertList: Array<PersonEmployments> ) { this._insertList = pinsertList; }

    get deleteList(): Array<PersonEmployments> { return this._deleteList; }

    set deleteList( pdeleteList: Array<PersonEmployments> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<PersonEmployments> { return this._updateList; }

    set updateList( pupdateList: Array<PersonEmployments> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
