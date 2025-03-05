import { BaseModel } from '@commonbeans/BaseModel';
import { CaseloadAdmAlertProfiles } from './CaseloadAdmAlertProfiles';
export class CaseloadAdmAlertProfilesCommitBean extends BaseModel {
    private _insertList: Array<CaseloadAdmAlertProfiles>;
    private _deleteList: Array<CaseloadAdmAlertProfiles>;
    private _updateList: Array<CaseloadAdmAlertProfiles>;

    get insertList(): Array<CaseloadAdmAlertProfiles> { return this._insertList; }

    set insertList( pinsertList: Array<CaseloadAdmAlertProfiles> ) { this._insertList = pinsertList; }

    get deleteList(): Array<CaseloadAdmAlertProfiles> { return this._deleteList; }

    set deleteList( pdeleteList: Array<CaseloadAdmAlertProfiles> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<CaseloadAdmAlertProfiles> { return this._updateList; }

    set updateList( pupdateList: Array<CaseloadAdmAlertProfiles> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}