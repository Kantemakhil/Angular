
import { BaseModel } from '@commonbeans/BaseModel';
import { CaseloadAdmOtherProfiles } from '@inst/movement-external/beans/CaseloadAdmOtherProfiles';
export class CaseloadAdmOtherProfilesCommitBean extends BaseModel {
    private _insertList: Array<CaseloadAdmOtherProfiles>;
    private _deleteList: Array<CaseloadAdmOtherProfiles>;
    private _updateList: Array<CaseloadAdmOtherProfiles>;

    get insertList(): Array<CaseloadAdmOtherProfiles> { return this._insertList; }

    set insertList(pinsertList: Array<CaseloadAdmOtherProfiles>) { this._insertList = pinsertList; }

    get deleteList(): Array<CaseloadAdmOtherProfiles> { return this._deleteList; }

    set deleteList(pdeleteList: Array<CaseloadAdmOtherProfiles>) { this._deleteList = pdeleteList; }

    get updateList(): Array<CaseloadAdmOtherProfiles> { return this._updateList; }

    set updateList(pupdateList: Array<CaseloadAdmOtherProfiles>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}