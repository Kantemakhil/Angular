import { BaseModel } from "@common/beans/BaseModel";
import { StaffLocationRoles } from "@sausersystemsecuritybeans/StaffLocationRoles";
import { OffenderBookings } from '@instdemographicsbeans/OffenderBookings';
import { StaffMembers } from '@inst/incidents-oic/beans/StaffMembers';

export class TransferBWOfficerCommitBean extends BaseModel {

  
	private _insertList: Array<OffenderBookings>;
	private _deleteList: Array<OffenderBookings>;
	private _updateList: Array<OffenderBookings>;
    private _staffupdateList: Array<StaffLocationRoles>;
    private  _staffMembers:StaffMembers;


	get insertList(): Array<OffenderBookings> { return this._insertList; }

	set insertList(pinsertList: Array<OffenderBookings>){ this._insertList = pinsertList; }

	get deleteList(): Array<OffenderBookings> { return this._deleteList; }

	set deleteList(pdeleteList: Array<OffenderBookings>){ this._deleteList = pdeleteList; }

	get updateList(): Array<OffenderBookings> { return this._updateList; }

	set updateList(pupdateList: Array<OffenderBookings>){ this._updateList = pupdateList; }

    get staffupdateList(): Array<StaffLocationRoles> { return this._staffupdateList; }

	set staffupdateList(pstaffupdateList: Array<StaffLocationRoles>){ this._staffupdateList = pstaffupdateList; }

    get staffMembers(): StaffMembers { return this._staffMembers; }

	set staffMembers(pstaffMembers: StaffMembers){ this._staffMembers = pstaffMembers; }


	toJSON(): any {
		return {
			'insertList': this._insertList,
			'deleteList': this._deleteList,
			'updateList': this._updateList,
            'staffupdateList': this._staffupdateList,
            'staffMembers':this._staffMembers
		};
	}

}