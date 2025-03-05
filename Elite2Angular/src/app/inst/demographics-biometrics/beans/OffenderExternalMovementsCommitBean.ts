import {BaseModel} from '@commonbeans/BaseModel';
import {OffenderExternalMovements} from '@instdemographicsbeans/OffenderExternalMovements';

export class OffenderExternalMovementsCommitBean extends BaseModel {

	private _insertList: Array<OffenderExternalMovements>;
	private _deleteList: Array<OffenderExternalMovements>;
	private _updateList: Array<OffenderExternalMovements>;

	get insertList(): Array<OffenderExternalMovements> { return this._insertList; }

	set insertList(pinsertList: Array<OffenderExternalMovements>){ this._insertList = pinsertList; }

	get deleteList(): Array<OffenderExternalMovements> { return this._deleteList; }

	set deleteList(pdeleteList: Array<OffenderExternalMovements>){ this._deleteList = pdeleteList; }

	get updateList(): Array<OffenderExternalMovements> { return this._updateList; }

	set updateList(pupdateList: Array<OffenderExternalMovements>){ this._updateList = pupdateList; }

	toJSON(): any {
		return {
			'insertList': this._insertList,
			'deleteList': this._deleteList,
			'updateList': this._updateList
		};
	}
}