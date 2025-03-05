import {BaseModel} from '@commonbeans/BaseModel';

export class ProfileCodes extends BaseModel {

	private _activeFlag: string;
	private _createDatetime: Date;
	private _createUserId: string;
	private _description: string;
	private _expiryDate: Date;
	private _listSeq: number;
	private _modifiedDate: Date;
	private _modifyDatetime: Date;
	private _modifyUserId: string;
	private _sealFlag: string;
	private _updateAllowedFlag: string;
	private _userId: string;
	private _profileType: string;
	private _profileCode: string;

	get activeFlag(): string { return this._activeFlag; }

	set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag; }

	get createDatetime(): Date { return this._createDatetime; }

	set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime; }

	get createUserId(): string { return this._createUserId; }

	set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }

	get description(): string { return this._description; }

	set description(pdescription: string){ this._description = pdescription; }

	get expiryDate(): Date { return this._expiryDate; }

	set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate; }

	get listSeq(): number { return this._listSeq; }

	set listSeq(plistSeq: number){ this._listSeq = plistSeq; }

	get modifiedDate(): Date { return this._modifiedDate; }

	set modifiedDate(pmodifiedDate: Date){ this._modifiedDate = pmodifiedDate; }

	get modifyDatetime(): Date { return this._modifyDatetime; }

	set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime; }

	get modifyUserId(): string { return this._modifyUserId; }

	set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

	get sealFlag(): string { return this._sealFlag; }

	set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }

	get updateAllowedFlag(): string { return this._updateAllowedFlag; }

	set updateAllowedFlag(pupdateAllowedFlag: string){ this._updateAllowedFlag = pupdateAllowedFlag; }

	get userId(): string { return this._userId; }

	set userId(puserId: string){ this._userId = puserId; }

	get profileType(): string { return this._profileType; }

	set profileType(pprofileType: string){ this._profileType = pprofileType; }

	get profileCode(): string { return this._profileCode; }

	set profileCode(pprofileCode: string){ this._profileCode = pprofileCode; }

	toJSON(): any {
		return {
			'activeFlag': this._activeFlag,
			'createDatetime': this._createDatetime,
			'createUserId': this._createUserId,
			'description': this._description,
			'expiryDate': this._expiryDate,
			'listSeq': this._listSeq,
			'modifiedDate': this._modifiedDate,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'sealFlag': this._sealFlag,
			'updateAllowedFlag': this._updateAllowedFlag,
			'userId': this._userId,
			'profileType': this._profileType,
			'profileCode': this._profileCode
		};
	}
}