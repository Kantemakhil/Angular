import {BaseModel} from '@commonbeans/BaseModel';
import {OffenderIdentifyingMark} from './OffenderIdentifyingMark';

export class OffenderIdentifyingMarksCommitBean extends BaseModel {

	private _insertList: Array<OffenderIdentifyingMark>;
	private _deleteList: Array<OffenderIdentifyingMark>;
	private _updateList: Array<OffenderIdentifyingMark>;

	get insertList(): Array<OffenderIdentifyingMark> { return this._insertList; }

	set insertList(pinsertList: Array<OffenderIdentifyingMark>){ this._insertList = pinsertList; }

	get deleteList(): Array<OffenderIdentifyingMark> { return this._deleteList; }

	set deleteList(pdeleteList: Array<OffenderIdentifyingMark>){ this._deleteList = pdeleteList; }

	get updateList(): Array<OffenderIdentifyingMark> { return this._updateList; }

	set updateList(pupdateList: Array<OffenderIdentifyingMark>){ this._updateList = pupdateList; }

	toJSON(): any {
		return {
			'insertList': this._insertList,
			'deleteList': this._deleteList,
			'updateList': this._updateList
		};
	}
}