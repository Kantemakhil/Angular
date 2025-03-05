import { BaseModel } from '@commonbeans/BaseModel';
import { LegalUpdateUsages } from './LegalUpdateUsages';

export class LegalUpdateUsagesCommitBean extends BaseModel {
    private _insertList: Array<LegalUpdateUsages>;
    private _deleteList: Array<LegalUpdateUsages>;
    private _updateList: Array<LegalUpdateUsages>;

    get insertList(): Array<LegalUpdateUsages> { return this._insertList; }

    set insertList( pinsertList: Array<LegalUpdateUsages> ) { this._insertList = pinsertList; }

    get deleteList(): Array<LegalUpdateUsages> { return this._deleteList; }

    set deleteList( pdeleteList: Array<LegalUpdateUsages> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<LegalUpdateUsages> { return this._updateList; }

    set updateList( pupdateList: Array<LegalUpdateUsages> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
