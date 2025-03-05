import { BaseModel } from '@commonbeans/BaseModel';
import { CheckListCategoryForms } from '../beans/CheckListCategoryForms';

export class CheckListCategoryFormsCommitBean extends BaseModel {
    private _insertList: Array<CheckListCategoryForms>;
    private _deleteList: Array<CheckListCategoryForms>;
    private _updateList: Array<CheckListCategoryForms>;

    get insertList(): Array<CheckListCategoryForms> { return this._insertList; }

    set insertList( pinsertList: Array<CheckListCategoryForms> ) { this._insertList = pinsertList; }

    get deleteList(): Array<CheckListCategoryForms> { return this._deleteList; }

    set deleteList( pdeleteList: Array<CheckListCategoryForms> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<CheckListCategoryForms> { return this._updateList; }

    set updateList( pupdateList: Array<CheckListCategoryForms> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
