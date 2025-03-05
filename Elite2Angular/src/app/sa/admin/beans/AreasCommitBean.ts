

import { BaseModel } from '@commonbeans/BaseModel';
import { Areas } from './Areas';


export class AreasCommitBean extends BaseModel {

    private _insertList: Array<Areas>;
    private _deleteList: Array<Areas>;
    private _updateList: Array<Areas>;

    get insertList(): Array<Areas> { return this._insertList; }

    set insertList( pinsertList: Array<Areas> ) { this._insertList = pinsertList; }

    get deleteList(): Array<Areas> { return this._deleteList; }

    set deleteList( pdeleteList: Array<Areas> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<Areas> { return this._updateList; }

    set updateList( pupdateList: Array<Areas> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

}
