import { BaseModel } from '@commonbeans/BaseModel';
import { CheckListCategories } from '../beans/CheckListCategories';

export class CheckListCategoriesCommitBean extends BaseModel {
    private _insertList: Array<CheckListCategories>;
    private _deleteList: Array<CheckListCategories>;
    private _updateList: Array<CheckListCategories>;

    get insertList(): Array<CheckListCategories> { return this._insertList; }

    set insertList( pinsertList: Array<CheckListCategories> ) { this._insertList = pinsertList; }

    get deleteList(): Array<CheckListCategories> { return this._deleteList; }

    set deleteList( pdeleteList: Array<CheckListCategories> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<CheckListCategories> { return this._updateList; }

    set updateList( pupdateList: Array<CheckListCategories> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
