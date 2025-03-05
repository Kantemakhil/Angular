import { BaseModel } from '@commonbeans/BaseModel';
import { Remitters } from '@inmatetrustaccountsbeans/Remitters';

export class RemittersCommitBean extends BaseModel {

    private _insertList: Array<Remitters>;
    private _deleteList: Array<Remitters>;
    private _updateList: Array<Remitters>;

    get insertList(): Array<Remitters> { return this._insertList; }

    set insertList( pinsertList: Array<Remitters> ) { this._insertList = pinsertList; }

    get deleteList(): Array<Remitters> { return this._deleteList; }

    set deleteList( pdeleteList: Array<Remitters> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<Remitters> { return this._updateList; }

    set updateList( pupdateList: Array<Remitters> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
