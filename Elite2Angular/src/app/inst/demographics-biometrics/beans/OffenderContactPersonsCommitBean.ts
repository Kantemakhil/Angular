import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderContactPersons } from '@inst/demographics-biometrics/beans/OffenderContactPersons';

export class OffenderContactPersonsCommitBean extends BaseModel {
    private _insertList: Array<OffenderContactPersons>;
    private _deleteList: Array<OffenderContactPersons>;
    private _updateList: Array<OffenderContactPersons>;

    get insertList(): Array<OffenderContactPersons> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderContactPersons> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderContactPersons> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderContactPersons> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderContactPersons> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderContactPersons> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
