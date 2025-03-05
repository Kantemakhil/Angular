import {BaseModel} from './BaseModel';
import {Images} from './Images';

export class ImagesCommitBean extends BaseModel {

	private _insertList: Array<Images>;
	private _deleteList: Array<Images>;
	private _updateList: Array<Images>;

	get insertList(): Array<Images> { return this._insertList; }

	set insertList(pinsertList: Array<Images>){ this._insertList = pinsertList; }

	get deleteList(): Array<Images> { return this._deleteList; }

	set deleteList(pdeleteList: Array<Images>){ this._deleteList = pdeleteList; }

	get updateList(): Array<Images> { return this._updateList; }

	set updateList(pupdateList: Array<Images>){ this._updateList = pupdateList; }

	toJSON(): any {
		return {
			'insertList': this._insertList,
			'deleteList': this._deleteList,
			'updateList': this._updateList
		};
	}
}