import { BaseModel } from '@commonbeans/BaseModel';
import { Offenders } from '@commonbeans/Offenders';

export class OffendersCommitBean extends BaseModel {

    private _insertList: Array<Offenders>;
    private _deleteList: Array<Offenders>;
    private _updateList: Array<Offenders>;
    private _offenderBookId: number;
    private _rootOffenderId: number;

    get insertList(): Array<Offenders> { return this._insertList; }

    set insertList( pinsertList: Array<Offenders> ) { this._insertList = pinsertList; }

    get deleteList(): Array<Offenders> { return this._deleteList; }

    set deleteList( pdeleteList: Array<Offenders> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<Offenders> { return this._updateList; }

    set updateList( pupdateList: Array<Offenders> ) { this._updateList = pupdateList; }

    get rootOffenderId(): number { return this._rootOffenderId; }

    set rootOffenderId( prootOffenderId: number ) { this._rootOffenderId = prootOffenderId; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'offenderBookId': this._offenderBookId,
            'rootOffenderId': this._rootOffenderId
        };
    }
}