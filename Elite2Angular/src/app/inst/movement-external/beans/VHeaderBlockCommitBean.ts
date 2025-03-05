import { BaseModel } from '@commonbeans/BaseModel';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';

export class VHeaderBlockCommitBean extends BaseModel {
    private _insertList: Array<VHeaderBlock>;
    private _deleteList: Array<VHeaderBlock>;
    private _updateList: Array<VHeaderBlock>;

    get insertList(): Array<VHeaderBlock> { return this._insertList; }

    set insertList( pinsertList: Array<VHeaderBlock> ) { this._insertList = pinsertList; }

    get deleteList(): Array<VHeaderBlock> { return this._deleteList; }

    set deleteList( pdeleteList: Array<VHeaderBlock> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<VHeaderBlock> { return this._updateList; }

    set updateList( pupdateList: Array<VHeaderBlock> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
 }