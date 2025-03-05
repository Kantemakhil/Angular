import { BaseModel } from '@commonbeans/BaseModel';
import { SystemProfiles } from '@commonbeans/SystemProfiles';

export class SystemProfilesCommitBean extends BaseModel {

    private _insertList: Array<SystemProfiles>;
    private _deleteList: Array<SystemProfiles>;
    private _updateList: Array<SystemProfiles>;

    get insertList(): Array<SystemProfiles> { return this._insertList; }

    set insertList( pinsertList: Array<SystemProfiles> ) { this._insertList = pinsertList; }

    get deleteList(): Array<SystemProfiles> { return this._deleteList; }

    set deleteList( pdeleteList: Array<SystemProfiles> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<SystemProfiles> { return this._updateList; }

    set updateList( pupdateList: Array<SystemProfiles> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
