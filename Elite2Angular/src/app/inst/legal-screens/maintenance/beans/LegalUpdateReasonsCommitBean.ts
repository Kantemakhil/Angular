import { BaseModel } from '@commonbeans/BaseModel';
import { LegalUpdateReasons } from './LegalUpdateReasons';

export class LegalUpdateReasonsCommitBean extends BaseModel {
    private _insertList: Array<LegalUpdateReasons>;
    private _deleteList: Array<LegalUpdateReasons>;
    private _updateList: Array<LegalUpdateReasons>;

    get insertList(): Array<LegalUpdateReasons> { return this._insertList; }

    set insertList( pinsertList: Array<LegalUpdateReasons> ) { this._insertList = pinsertList; }

    get deleteList(): Array<LegalUpdateReasons> { return this._deleteList; }

    set deleteList( pdeleteList: Array<LegalUpdateReasons> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<LegalUpdateReasons> { return this._updateList; }

    set updateList( pupdateList: Array<LegalUpdateReasons> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
