import { BaseModel } from '@commonbeans/BaseModel';
import { TagWorkflowAdmQueryTeamTasks } from './TagWorkflowAdmQueryTeamTasks';
export class TagWorkflowAdmQueryTeamTasksCommitBean extends BaseModel {
    private _insertList: Array<TagWorkflowAdmQueryTeamTasks>;
    private _deleteList: Array<TagWorkflowAdmQueryTeamTasks>;
    private _updateList: Array<TagWorkflowAdmQueryTeamTasks>;

    get insertList(): Array<TagWorkflowAdmQueryTeamTasks> { return this._insertList; }

    set insertList(pinsertList: Array<TagWorkflowAdmQueryTeamTasks>) { this._insertList = pinsertList; }

    get deleteList(): Array<TagWorkflowAdmQueryTeamTasks> { return this._deleteList; }

    set deleteList(pdeleteList: Array<TagWorkflowAdmQueryTeamTasks>) { this._deleteList = pdeleteList; }

    get updateList(): Array<TagWorkflowAdmQueryTeamTasks> { return this._updateList; }

    set updateList(pupdateList: Array<TagWorkflowAdmQueryTeamTasks>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

}