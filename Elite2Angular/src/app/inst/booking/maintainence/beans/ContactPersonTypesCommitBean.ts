import { BaseModel } from '@commonbeans/BaseModel';
import { ContactPersonTypes } from './ContactPersonTypes';
export class ContactPersonTypesCommitBean extends BaseModel {
    private _insertList: Array<ContactPersonTypes>;
    private _deleteList: Array<ContactPersonTypes>;
    private _updateList: Array<ContactPersonTypes>;

    get insertList(): Array<ContactPersonTypes> { return this._insertList; }

    set insertList( pinsertList: Array<ContactPersonTypes> ) { this._insertList = pinsertList; }

    get deleteList(): Array<ContactPersonTypes> { return this._deleteList; }

    set deleteList( pdeleteList: Array<ContactPersonTypes> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<ContactPersonTypes> { return this._updateList; }

    set updateList( pupdateList: Array<ContactPersonTypes> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

}
