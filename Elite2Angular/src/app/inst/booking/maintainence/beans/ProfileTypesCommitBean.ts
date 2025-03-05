import { BaseModel } from '@commonbeans/BaseModel';	
import { ProfileTypes } from './ProfileTypes';
export class ProfileTypesCommitBean  extends BaseModel {
    private _insertList: Array<ProfileTypes>;
    private _deleteList: Array<ProfileTypes>;
    private _updateList: Array<ProfileTypes>;

    get insertList(): Array<ProfileTypes> { return this._insertList; }

    set insertList(pinsertList: Array<ProfileTypes>) { this._insertList = pinsertList; }

    get deleteList(): Array<ProfileTypes> { return this._deleteList; }

    set deleteList(pdeleteList: Array<ProfileTypes>) { this._deleteList = pdeleteList; }

    get updateList(): Array<ProfileTypes> { return this._updateList; }

    set updateList(pupdateList: Array<ProfileTypes>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}