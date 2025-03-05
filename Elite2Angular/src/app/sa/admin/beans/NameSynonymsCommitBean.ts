import { BaseModel } from '@commonbeans/BaseModel';
import { NameSynonyms } from '@sa/admin/beans/NameSynonyms';

export class NameSynonymsCommitBean extends BaseModel {

    private _insertList: Array<NameSynonyms>;
    private _deleteList: Array<NameSynonyms>;
    private _updateList: Array<NameSynonyms>;


    get insertList(): Array<NameSynonyms> { return this._insertList; }

    set insertList( pinsertList: Array<NameSynonyms> ) { this._insertList = pinsertList; }

    get updateList(): Array<NameSynonyms> { return this._updateList; }

    set updateList( pupdateList: Array<NameSynonyms> ) { this._updateList = pupdateList; }

    get deleteList(): Array<NameSynonyms> { return this._deleteList; }

    set deleteList( pdeleteList: Array<NameSynonyms> ) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
