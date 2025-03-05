import { ModuleInsDashboardBean } from './ModuleInsDashboardBean';

export class ModuleInsDashboardCommitBean {
    private _insertList: Array<ModuleInsDashboardBean>;
    private _deleteList: Array<ModuleInsDashboardBean>;
    private _updateList: Array<ModuleInsDashboardBean>;

    get insertList(): Array<ModuleInsDashboardBean> { return this._insertList; }

    set insertList( pinsertList: Array<ModuleInsDashboardBean> ) { this._insertList = pinsertList; }

    get updateList(): Array<ModuleInsDashboardBean> { return this._updateList; }

    set updateList( pupdateList: Array<ModuleInsDashboardBean> ) { this._updateList = pupdateList; }

    get deleteList(): Array<ModuleInsDashboardBean> { return this._deleteList; }

    set deleteList( pdeleteList: Array<ModuleInsDashboardBean> ) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }

}