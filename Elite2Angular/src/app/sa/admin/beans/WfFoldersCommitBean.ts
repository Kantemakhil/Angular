import { BaseModel } from '@commonbeans/BaseModel';
import { WorkflowFolders } from './WorkflowFolders';




export class WfFoldersCommitBean extends BaseModel {
    private _insertList: Array<WorkflowFolders>;
    private _deleteList: Array<WorkflowFolders>;
    private _updateList: Array<WorkflowFolders>;

    get insertList(): Array<WorkflowFolders> { return this._insertList; }

    set insertList( pinsertList: Array<WorkflowFolders> ) { this._insertList = pinsertList; }

    get deleteList(): Array<WorkflowFolders> { return this._deleteList; }

    set deleteList( pdeleteList: Array<WorkflowFolders> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<WorkflowFolders> { return this._updateList; }

    set updateList( pupdateList: Array<WorkflowFolders> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
