import { BaseModel } from '@commonbeans/BaseModel';
import { IwpTemplateObjects } from '@inst/casemanagement/beans/IwpTemplateObjects';

export class IwpTemplateObjectsCommitBean extends BaseModel {

    private _insertList: Array<IwpTemplateObjects>;
    private _deleteList: Array<IwpTemplateObjects>;
    private _updateList: Array<IwpTemplateObjects>;

    get insertList(): Array<IwpTemplateObjects> { return this._insertList; }

    set insertList(pinsertList: Array<IwpTemplateObjects>) { this._insertList = pinsertList; }

    get deleteList(): Array<IwpTemplateObjects> { return this._deleteList; }

    set deleteList(pdeleteList: Array<IwpTemplateObjects>) { this._deleteList = pdeleteList; }

    get updateList(): Array<IwpTemplateObjects> { return this._updateList; }

    set updateList(pupdateList: Array<IwpTemplateObjects>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
