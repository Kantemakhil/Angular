import { FormsBuilderBean } from '@core/ui-components/dynamic-forms/forms-builder-bean';
import { BaseModel } from '@commonbeans/BaseModel';

export class OdynfrmCommitBean extends BaseModel {

    private _insertList: Array<FormsBuilderBean>;
    private _deleteList: Array<FormsBuilderBean>;
    private _updateList: Array<FormsBuilderBean>;

    get insertList(): Array<FormsBuilderBean> { return this._insertList; }

    set insertList(pinsertList: Array<FormsBuilderBean>) { this._insertList = pinsertList; }

    get deleteList(): Array<FormsBuilderBean> { return this._deleteList; }

    set deleteList(pdeleteList: Array<FormsBuilderBean>) { this._deleteList = pdeleteList; }

    get updateList(): Array<FormsBuilderBean> { return this._updateList; }

    set updateList(pupdateList: Array<FormsBuilderBean>) { this._updateList = pupdateList; }


    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
