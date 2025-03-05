import { ModuleTabColumns } from "./ModuleTabColumns";

export class ModuleTabColumnsCommitBean {
    private _insertList: Array<ModuleTabColumns>;
    private _deleteList: Array<ModuleTabColumns>;
    private _updateList: Array<ModuleTabColumns>;


    get insertList(): Array<ModuleTabColumns> { return this._insertList; }

    set insertList( pinsertList: Array<ModuleTabColumns> ) { this._insertList = pinsertList; }

    get updateList(): Array<ModuleTabColumns> { return this._updateList; }

    set updateList( pupdateList: Array<ModuleTabColumns> ) { this._updateList = pupdateList; }

    get deleteList(): Array<ModuleTabColumns> { return this._deleteList; }

    set deleteList( pdeleteList: Array<ModuleTabColumns> ) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}