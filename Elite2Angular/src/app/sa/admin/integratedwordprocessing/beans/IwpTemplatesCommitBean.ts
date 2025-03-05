import { BaseModel } from "@common/beans/BaseModel";
import { IwpTemplates } from '@inst/casemanagement/beans/IwpTemplates';

export class IwpTemplatesCommitBean extends BaseModel {
    private _insertList: Array<IwpTemplates>;
    private _deleteList: Array<IwpTemplates>;
    private _updateList: Array<IwpTemplates>;

    get insertList(): Array<IwpTemplates> { return this._insertList; }

    set insertList(pinsertList: Array<IwpTemplates>) { this._insertList = pinsertList; }

    get deleteList(): Array<IwpTemplates> { return this._deleteList; }

    set deleteList(pdeleteList: Array<IwpTemplates>) { this._deleteList = pdeleteList; }

    get updateList(): Array<IwpTemplates> { return this._updateList; }

    set updateList(pupdateList: Array<IwpTemplates>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
