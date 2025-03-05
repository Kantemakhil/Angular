import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderStgAffiliations } from './OffenderStgAffiliations';

export class OffenderStgAffiliationsCommitBean extends BaseModel {

    private _insertList: Array<OffenderStgAffiliations>;
    private _deleteList: Array<OffenderStgAffiliations>;
    private _updateList: Array<OffenderStgAffiliations>;

    get insertList(): Array<OffenderStgAffiliations> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderStgAffiliations> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderStgAffiliations> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderStgAffiliations> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderStgAffiliations> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderStgAffiliations> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
