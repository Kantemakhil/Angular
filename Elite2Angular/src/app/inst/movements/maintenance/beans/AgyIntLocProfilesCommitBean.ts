import {BaseModel} from '@commonbeans/BaseModel';
import {AgyIntLocProfiles} from '@inst/movements/maintenance/beans/AgyIntLocProfiles';

export class AgyIntLocProfilesCommitBean extends BaseModel {

    private _insertList: Array<AgyIntLocProfiles>;
    private _deleteList: Array<AgyIntLocProfiles>;
    private _updateList: Array<AgyIntLocProfiles>;

    get insertList(): Array<AgyIntLocProfiles> { return this._insertList; }

    set insertList(pinsertList: Array<AgyIntLocProfiles>) { this._insertList = pinsertList; }

    get deleteList(): Array<AgyIntLocProfiles> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AgyIntLocProfiles>) { this._deleteList = pdeleteList; }

    get updateList(): Array<AgyIntLocProfiles> { return this._updateList; }

    set updateList(pupdateList: Array<AgyIntLocProfiles>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
