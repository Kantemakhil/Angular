import { BaseModel } from '@commonbeans/BaseModel';	
import { OidcoasiOffenderAssignments } from '@inst/workflow/managingworkassignments/beans/OidcoasiOffenderAssignments';
export class OidcoasiOffenderAssignmentsCommitBean  extends BaseModel {
    private _insertList: Array<OidcoasiOffenderAssignments>;
    private _deleteList: Array<OidcoasiOffenderAssignments>;
    private _updateList: Array<OidcoasiOffenderAssignments>;

    get insertList(): Array<OidcoasiOffenderAssignments> { return this._insertList; }

    set insertList(pinsertList: Array<OidcoasiOffenderAssignments>) { this._insertList = pinsertList; }

    get deleteList(): Array<OidcoasiOffenderAssignments> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OidcoasiOffenderAssignments>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OidcoasiOffenderAssignments> { return this._updateList; }

    set updateList(pupdateList: Array<OidcoasiOffenderAssignments>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}