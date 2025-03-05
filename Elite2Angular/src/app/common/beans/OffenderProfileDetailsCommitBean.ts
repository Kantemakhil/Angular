import {BaseModel} from './BaseModel';
import {OffenderProfileDetails} from './OffenderProfileDetails';

export class OffenderProfileDetailsCommitBean extends BaseModel {

	private _insertList: Array<OffenderProfileDetails>;
	private _deleteList: Array<OffenderProfileDetails>;
	private _updateList: Array<OffenderProfileDetails>;

	get insertList(): Array<OffenderProfileDetails> { return this._insertList; }

	set insertList(pinsertList: Array<OffenderProfileDetails>){ this._insertList = pinsertList; }

	get deleteList(): Array<OffenderProfileDetails> { return this._deleteList; }

	set deleteList(pdeleteList: Array<OffenderProfileDetails>){ this._deleteList = pdeleteList; }

	get updateList(): Array<OffenderProfileDetails> { return this._updateList; }

	set updateList(pupdateList: Array<OffenderProfileDetails>){ this._updateList = pupdateList; }

	toJSON(): any {
		return {
			'insertList': this._insertList,
			'deleteList': this._deleteList,
			'updateList': this._updateList
		};
	}
}