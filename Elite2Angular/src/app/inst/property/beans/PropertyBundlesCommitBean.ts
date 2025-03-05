import { BaseModel } from '@commonbeans/BaseModel';
import { PropertyBundles } from './PropertyBundles';

export class PropertyBundlesCommitBean extends BaseModel {

	private _insertList: Array<PropertyBundles>;
	private _deleteList: Array<PropertyBundles>;
	private _updateList: Array<PropertyBundles>;

	get insertList(): Array<PropertyBundles> { return this._insertList; }

	set insertList(pinsertList: Array<PropertyBundles>) { this._insertList = pinsertList; }

	get deleteList(): Array<PropertyBundles> { return this._deleteList; }

	set deleteList(pdeleteList: Array<PropertyBundles>) { this._deleteList = pdeleteList; }

	get updateList(): Array<PropertyBundles> { return this._updateList; }

	set updateList(pupdateList: Array<PropertyBundles>) { this._updateList = pupdateList; }

	toJSON(): any {
		return {
			'insertList': this._insertList,
			'deleteList': this._deleteList,
			'updateList': this._updateList
		};
	}
}   