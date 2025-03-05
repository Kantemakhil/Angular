import { BaseModel } from '@commonbeans/BaseModel';
import { PropertyBundleItems } from './PropertyBundleItems';

export class PropertyBundleItemsCommitBean extends BaseModel {

	private _insertList: Array<PropertyBundleItems>;
	private _deleteList: Array<PropertyBundleItems>;
	private _updateList: Array<PropertyBundleItems>;

	get insertList(): Array<PropertyBundleItems> { return this._insertList; }

	set insertList(pinsertList: Array<PropertyBundleItems>) { this._insertList = pinsertList; }

	get deleteList(): Array<PropertyBundleItems> { return this._deleteList; }

	set deleteList(pdeleteList: Array<PropertyBundleItems>) { this._deleteList = pdeleteList; }

	get updateList(): Array<PropertyBundleItems> { return this._updateList; }

	set updateList(pupdateList: Array<PropertyBundleItems>) { this._updateList = pupdateList; }

	toJSON(): any {
		return {
			'insertList': this._insertList,
			'deleteList': this._deleteList,
			'updateList': this._updateList
		};
	}
}   