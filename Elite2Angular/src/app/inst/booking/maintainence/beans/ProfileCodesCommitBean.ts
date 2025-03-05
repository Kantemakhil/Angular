import { BaseModel } from '@commonbeans/BaseModel';	
import { ProfileCodes } from '@instdemographicsbeans/ProfileCodes';
export class ProfileCodesCommitBean  extends BaseModel {
    private _insertList: Array<ProfileCodes>;
    private _deleteList: Array<ProfileCodes>;
    private _updateList: Array<ProfileCodes>;

    get insertList(): Array<ProfileCodes> { return this._insertList; }

    set insertList(pinsertList: Array<ProfileCodes>) { this._insertList = pinsertList; }

    get deleteList(): Array<ProfileCodes> { return this._deleteList; }

    set deleteList(pdeleteList: Array<ProfileCodes>) { this._deleteList = pdeleteList; }

    get updateList(): Array<ProfileCodes> { return this._updateList; }

    set updateList(pupdateList: Array<ProfileCodes>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}