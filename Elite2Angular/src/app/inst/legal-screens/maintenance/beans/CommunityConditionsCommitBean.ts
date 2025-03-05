import { BaseModel } from '@commonbeans/BaseModel';
import { CommunityConditions } from './CommunityConditions';


export class CommunityConditionsCommitBean extends BaseModel {
    private _insertList: Array<CommunityConditions>;
    private _deleteList: Array<CommunityConditions>;
    private _updateList: Array<CommunityConditions>;

    get insertList(): Array<CommunityConditions> { return this._insertList; }

    set insertList( pinsertList: Array<CommunityConditions> ) { this._insertList = pinsertList; }

    get deleteList(): Array<CommunityConditions> { return this._deleteList; }

    set deleteList( pdeleteList: Array<CommunityConditions> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<CommunityConditions> { return this._updateList; }

    set updateList( pupdateList: Array<CommunityConditions> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
