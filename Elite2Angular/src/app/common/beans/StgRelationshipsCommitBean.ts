import {BaseModel} from './BaseModel';
import { StgRelationships } from '@commonbeans/StgRelationships';

export class StgRelationshipsCommitBean extends BaseModel {

    private _insertList: Array<StgRelationships>;
    private _deleteList: Array<StgRelationships>;
    private _updateList: Array<StgRelationships>;

    get insertList(): Array<StgRelationships> { return this._insertList; }

    set insertList(pinsertList: Array<StgRelationships>) { this._insertList = pinsertList; }

    get deleteList(): Array<StgRelationships> { return this._deleteList; }

    set deleteList(pdeleteList: Array<StgRelationships>) { this._deleteList = pdeleteList; }

    get updateList():  Array<StgRelationships> { return this._updateList; }

    set updateList(pupdateList:  Array<StgRelationships>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
