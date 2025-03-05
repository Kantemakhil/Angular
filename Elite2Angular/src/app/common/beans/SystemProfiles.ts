import {BaseModel} from '@commonbeans/BaseModel';

export class SystemProfiles extends BaseModel {

	private _createDateTime: Date;
	private _createUserId: string;
	private _description: string;
	private _modifyDateTime: Date;
	private _modifyUserId: string;
	private _oldTableName: string;
	private _profileValue: string;
	private _profileValue2: string;
	private _sealFlag: string;
	private _profileType: string;
	private _profileCode: string;
	private _totalCollectedOne: string;
	private _totalOwingOne: string;
	private _totalDescriptionOne: string;

	get createDateTime(): Date { return this._createDateTime; }

	set createDateTime(pcreateDateTime: Date){ this._createDateTime = pcreateDateTime; }

	get createUserId(): string { return this._createUserId; }

	set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }

	get description(): string { return this._description; }

	set description(pdescription: string){ this._description = pdescription; }

	get modifyDateTime(): Date { return this._modifyDateTime; }

	set modifyDateTime(pmodifyDateTime: Date){ this._modifyDateTime = pmodifyDateTime; }

	get modifyUserId(): string { return this._modifyUserId; }

	set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

	get oldTableName(): string { return this._oldTableName; }

	set oldTableName(poldTableName: string){ this._oldTableName = poldTableName; }

	get profileValue(): string { return this._profileValue; }

	set profileValue(pprofileValue: string){ this._profileValue = pprofileValue; }

	get profileValue2(): string { return this._profileValue2; }

	set profileValue2(pprofileValue2: string){ this._profileValue2 = pprofileValue2; }

	get sealFlag(): string { return this._sealFlag; }

	set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }

	get profileType(): string { return this._profileType; }

	set profileType(pprofileType: string){ this._profileType = pprofileType; }

	get profileCode(): string { return this._profileCode; }

	set profileCode(pprofileCode: string){ this._profileCode = pprofileCode; }

	get totalCollectedOne(): string { return this._totalCollectedOne; }

	set totalCollectedOne(ptotalCollectedOne: string){ this._totalCollectedOne = ptotalCollectedOne; }

	get totalOwingOne(): string { return this._totalOwingOne; }

	set totalOwingOne(ptotalOwingOne: string){ this._totalOwingOne = ptotalOwingOne; }

	get totalDescriptionOne(): string { return this._totalDescriptionOne; }

	set totalDescriptionOne(ptotalDescriptionOne: string){ this._totalDescriptionOne = ptotalDescriptionOne; }

	toJSON(): any {
		return {
			'createDateTime': this._createDateTime,
			'createUserId': this._createUserId,
			'description': this._description,
			'modifyDateTime': this._modifyDateTime,
			'modifyUserId': this._modifyUserId,
			'oldTableName': this._oldTableName,
			'profileValue': this._profileValue,
			'profileValue2': this._profileValue2,
			'sealFlag': this._sealFlag,
			'profileType': this._profileType,
			'profileCode': this._profileCode,
			'totalCollectedOne': this._totalCollectedOne,
			'totalOwingOne': this._totalOwingOne,
			'totalDescriptionOne': this._totalDescriptionOne
		};
	}
}