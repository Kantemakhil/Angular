import { BaseModel } from '@commonbeans/BaseModel';
import { WorkflowScreens } from './WorkflowScreens';




export class WfScreensCommitBean extends BaseModel {
    private _insertList: Array<WorkflowScreens>;
    private _deleteList: Array<WorkflowScreens>;
    private _updateList: Array<WorkflowScreens>;

    get insertList(): Array<WorkflowScreens> { return this._insertList; }

    set insertList( pinsertList: Array<WorkflowScreens> ) { this._insertList = pinsertList; }

    get deleteList(): Array<WorkflowScreens> { return this._deleteList; }

    set deleteList( pdeleteList: Array<WorkflowScreens> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<WorkflowScreens> { return this._updateList; }

    set updateList( pupdateList: Array<WorkflowScreens> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
