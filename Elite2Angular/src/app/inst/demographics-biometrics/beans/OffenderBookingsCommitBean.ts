import {BaseModel} from '@commonbeans/BaseModel';
import {OffenderBookings} from '@instdemographicsbeans/OffenderBookings';
import { TeamMembers } from '@cm/teams-workflow/beans/TeamMembers';

export class OffenderBookingsCommitBean extends BaseModel {

	private _insertList: Array<OffenderBookings>;
	private _deleteList: Array<OffenderBookings>;
	private _updateList: Array<OffenderBookings>;
	private _offdetUpdateList: Array<TeamMembers>; 
	

	get offdetUpdateList(): Array<TeamMembers> {
	   return this._offdetUpdateList;
   }
   set offdetUpdateList(value: Array<TeamMembers>) {
	   this._offdetUpdateList = value;
   }


	get insertList(): Array<OffenderBookings> { return this._insertList; }

	set insertList(pinsertList: Array<OffenderBookings>){ this._insertList = pinsertList; }

	get deleteList(): Array<OffenderBookings> { return this._deleteList; }

	set deleteList(pdeleteList: Array<OffenderBookings>){ this._deleteList = pdeleteList; }

	get updateList(): Array<OffenderBookings> { return this._updateList; }

	set updateList(pupdateList: Array<OffenderBookings>){ this._updateList = pupdateList; }

	toJSON(): any {
		return {
			'insertList': this._insertList,
			'deleteList': this._deleteList,
			'updateList': this._updateList,
			'offdetUpdateList':this._offdetUpdateList,
		};
	}
}