import { BaseModel } from "@common/beans/BaseModel";
import { IwpTemplateModules } from '@inst/casemanagement/beans/IwpTemplateModules';

export class IwpTemplateModulesCommitBean extends BaseModel {
    private _insertList: Array<IwpTemplateModules>;
    private _deleteList: Array<IwpTemplateModules>;
    private _updateList: Array<IwpTemplateModules>;

    get insertList(): Array<IwpTemplateModules> { return this._insertList; }

    set insertList(pinsertList: Array<IwpTemplateModules>) { this._insertList = pinsertList; }

    get deleteList(): Array<IwpTemplateModules> { return this._deleteList; }

    set deleteList(pdeleteList: Array<IwpTemplateModules>) { this._deleteList = pdeleteList; }

    get updateList(): Array<IwpTemplateModules> { return this._updateList; }

    set updateList(pupdateList: Array<IwpTemplateModules>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
