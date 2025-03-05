

import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderTeamAssignments } from './OffenderTeamAssignments';



export class OffenderTeamAssignmentsCommitBean extends BaseModel {

    private _insertList: Array<OffenderTeamAssignments>;
    private _deleteList: Array<OffenderTeamAssignments>;
    private _updateList: Array<OffenderTeamAssignments>;

    get insertList(): Array<OffenderTeamAssignments> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderTeamAssignments> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderTeamAssignments> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderTeamAssignments> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderTeamAssignments> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderTeamAssignments> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

}
