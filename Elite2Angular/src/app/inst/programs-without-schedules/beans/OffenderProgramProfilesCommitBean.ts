import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderProgramProfiles } from '@instprogramswithoutschedulesbeans/OffenderProgramProfiles';

export class OffenderProgramProfilesCommitBean extends BaseModel {
    private _insertList: Array<OffenderProgramProfiles>;
    private _deleteList: Array<OffenderProgramProfiles>;
    private _updateList: Array<OffenderProgramProfiles>;
     private _updateWaitList: Array<OffenderProgramProfiles>;

    get insertList(): Array<OffenderProgramProfiles> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderProgramProfiles> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderProgramProfiles> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderProgramProfiles> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderProgramProfiles> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderProgramProfiles> ) { this._updateList = pupdateList; }

    get updateWaitList(): Array<OffenderProgramProfiles> { return this._updateWaitList; }

    set updateWaitList( pupdateWaitList: Array<OffenderProgramProfiles> ) { this._updateWaitList = pupdateWaitList; }


    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
             'updateWaitList': this._updateWaitList,
        };
    }
}
