import { BaseModel } from '@commonbeans/BaseModel';	
import { ProfileCategories } from './ProfileCategories';
export class ProfileCategoriesCommitBean  extends BaseModel {
    private _insertList: Array<ProfileCategories>;
    private _deleteList: Array<ProfileCategories>;
    private _updateList: Array<ProfileCategories>;

    get insertList(): Array<ProfileCategories> { return this._insertList; }

    set insertList(pinsertList: Array<ProfileCategories>) { this._insertList = pinsertList; }

    get deleteList(): Array<ProfileCategories> { return this._deleteList; }

    set deleteList(pdeleteList: Array<ProfileCategories>) { this._deleteList = pdeleteList; }

    get updateList(): Array<ProfileCategories> { return this._updateList; }

    set updateList(pupdateList: Array<ProfileCategories>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}