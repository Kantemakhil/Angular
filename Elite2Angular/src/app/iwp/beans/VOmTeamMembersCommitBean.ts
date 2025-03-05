import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderBookings } from '@inst/demographics-biometrics/beans/OffenderBookings';
import { ExtOwnershipTransfer } from './ExtOwnershipTransfer';
import { VOmTeamMembers } from './VOmTeamMembers';

export class VOmTeamMembersCommitBean extends BaseModel {

    private _insertList: Array<VOmTeamMembers>;
    private _deleteList: Array<VOmTeamMembers>;
    private _updateList: Array<VOmTeamMembers>;

    private _offbkg1UpdatetList: Array<OffenderBookings>;


    private _extotUpdatetList: Array<ExtOwnershipTransfer>;




    get insertList(): Array<VOmTeamMembers> { return this._insertList; }

    set insertList(pinsertList: Array<VOmTeamMembers>) { this._insertList = pinsertList; }

    get deleteList(): Array<VOmTeamMembers> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VOmTeamMembers>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VOmTeamMembers> { return this._updateList; }

    set updateList(pupdateList: Array<VOmTeamMembers>) { this._updateList = pupdateList; }

    get offbkg1UpdatetList(): Array<OffenderBookings> { return this._offbkg1UpdatetList; }
    set offbkg1UpdatetList(value: Array<OffenderBookings>) { this._offbkg1UpdatetList = value; }

    get extotUpdatetList(): Array<ExtOwnershipTransfer> { return this._extotUpdatetList; }
    set extotUpdatetList(value: Array<ExtOwnershipTransfer>) { this._extotUpdatetList = value; }



    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'extotUpdatetList': this._extotUpdatetList,
            'offbkg1UpdatetList': this._offbkg1UpdatetList,

        };
    }
}
