import { BaseModel } from '@commonbeans/BaseModel';

export class PropertyBundles extends BaseModel {

	private _groupId: string;

	private _groupName: string;

	private _propertySeq: number;

	private _caseloadId: string;

	private _activeFlag: string;

	private _expiryDate: Date;

	private _createUserId: string;

	private _modifyUserId: string;

	private _createDateTime: Date;

	private _modifyDateTime: Date;

	get groupId(): string { return this._groupId; }
	set groupId(groupId: string) { this._groupId = groupId; }

	get groupName(): string { return this._groupName; }
	set groupName(groupName: string) { this._groupName = groupName; }

	get propertySeq(): number { return this._propertySeq; }
	set propertySeq(propertySeq: number) { this._propertySeq = propertySeq; }

	get caseloadId(): string { return this._caseloadId; }
	set caseloadId(caseloadId: string) { this._caseloadId = caseloadId; }

	get activeFlag(): string { return this._activeFlag; }
	set activeFlag(activeFlag: string) { this._activeFlag = activeFlag; }

	get expiryDate(): Date { return this._expiryDate; }
	set expiryDate(expiryDate: Date) { this._expiryDate = expiryDate; }

	get createUserId(): string { return this._createUserId; }
	set createUserId(createUserId: string) { this._createUserId = createUserId; }

	get modifyUserId(): string { return this._modifyUserId; }
	set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }

	get createDateTime(): Date { return this._createDateTime; }
	set createDateTime(createDateTime: Date) { this._createDateTime = createDateTime; }

	get modifyDateTime(): Date { return this._modifyDateTime; }
	set modifyDateTime(modifyDateTime: Date) { this._modifyDateTime = modifyDateTime; }

	toJSON(): any {
		return {
			'groupId': this._activeFlag,
			'groupName': this._groupName,
			'propertySeq': this._propertySeq,
			'caseloadId': this._caseloadId,
			'activeFlag': this._activeFlag,
			'expiryDate': this._expiryDate,
			'createDatetime': this._createDateTime,
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDateTime,
			'modifyUserId': this._modifyUserId
		};
	}

}	