import {BaseModel} from './BaseModel';
import {OffenderPhysicalAttributes} from './OffenderPhysicalAttributes';

export class OffenderPhysicalAttributesCommitBean extends BaseModel {

	private _insertList: Array<OffenderPhysicalAttributes>;
	private _deleteList: Array<OffenderPhysicalAttributes>;
	private _updateList: Array<OffenderPhysicalAttributes>;

	get insertList(): Array<OffenderPhysicalAttributes> { return this._insertList; }

	set insertList(pinsertList: Array<OffenderPhysicalAttributes>){ this._insertList = pinsertList; }

	get deleteList(): Array<OffenderPhysicalAttributes> { return this._deleteList; }

	set deleteList(pdeleteList: Array<OffenderPhysicalAttributes>){ this._deleteList = pdeleteList; }

	get updateList(): Array<OffenderPhysicalAttributes> { return this._updateList; }

	set updateList(pupdateList: Array<OffenderPhysicalAttributes>){ this._updateList = pupdateList; }

	toJSON(): any {
		return {
			'insertList': this._insertList,
			'deleteList': this._deleteList,
			'updateList': this._updateList
		};
	}
}