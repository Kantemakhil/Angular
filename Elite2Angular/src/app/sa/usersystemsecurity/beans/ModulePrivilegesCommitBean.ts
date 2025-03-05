import { BaseModel } from '@commonbeans/BaseModel';
import { ModulePrivileges } from '@sausersystemsecuritybeans/ModulePrivileges';

export class ModulePrivilegesCommitBean extends BaseModel {
    private _insertList: Array<ModulePrivileges>;
    private _deleteList: Array<ModulePrivileges>;
    private _updateList: Array<ModulePrivileges>;

    get insertList(): Array<ModulePrivileges> { return this._insertList; }

    set insertList( pinsertList: Array<ModulePrivileges> ) { this._insertList = pinsertList; }

    get deleteList(): Array<ModulePrivileges> { return this._deleteList; }

    set deleteList( pdeleteList: Array<ModulePrivileges> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<ModulePrivileges> { return this._updateList; }

    set updateList( pupdateList: Array<ModulePrivileges> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }


}
