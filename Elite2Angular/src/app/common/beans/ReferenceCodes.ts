import {BaseModel} from '@commonbeans/BaseModel';

export class ReferenceCodes extends BaseModel {

	private _activeFlag: string;
	private _createDatetime: Date;
	private _createUserId: string;
	private _description: string;
	private _expiredDate: Date;
	private _listSeq: number;
	private _modifyDatetime: Date;
	private _modifyUserId: string;
	private _newCode: string;
	private _parentCode: string;
	private _parentDomain: string;
	private _sealFlag: string;
	private _systemDataFlag: string;
	private _domain: string;
	private _code: string;
	private _staffId: number;
	private _lastName: string;
	private _firstName: string;
	private _middleName: string;
	private _updateFlag: string;
	private _updateReasonFlag: string;
    private _automaticFlag: string;
	private _length: number;
    private _lengthUnit: string;
	private _reportType: string;
	
	
	
	

	get lastName(): string { return this._lastName; }

	set lastName(plastName: string) { this._lastName = plastName; }

	get firstName(): string { return this._firstName; }

	set firstName(pfirstName: string) { this._firstName = pfirstName; }

	get middleName(): string { return this._middleName; }

	set middleName(pmiddleName: string) { this._middleName = pmiddleName; }

	get pstaffId(): number { return this._staffId; }

	set pstaffId(pstaffId: number) { this._staffId = pstaffId; }

	get activeFlag(): string { return this._activeFlag; }

	set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

	get createDatetime(): Date { return this._createDatetime; }

	set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime; }

	get createUserId(): string { return this._createUserId; }

	set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }

	get description(): string { return this._description; }

	set description(pdescription: string){ this._description = pdescription; }

	get expiredDate(): Date { return this._expiredDate; }

	set expiredDate(pexpiredDate: Date){ this._expiredDate = pexpiredDate; }

	get listSeq(): number { return this._listSeq; }

	set listSeq(plistSeq: number){ this._listSeq = plistSeq; }

	get modifyDatetime(): Date { return this._modifyDatetime; }

	set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime; }

	get modifyUserId(): string { return this._modifyUserId; }

	set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

	get newCode(): string { return this._newCode; }

	set newCode(pnewCode: string){ this._newCode = pnewCode; }

	get parentCode(): string { return this._parentCode; }

	set parentCode(pparentCode: string){ this._parentCode = pparentCode; }

	get parentDomain(): string { return this._parentDomain; }

	set parentDomain(pparentDomain: string){ this._parentDomain = pparentDomain; }

	get sealFlag(): string { return this._sealFlag; }

	set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }

	get systemDataFlag(): string { return this._systemDataFlag; }

	set systemDataFlag(psystemDataFlag: string){ this._systemDataFlag = psystemDataFlag; }

	get domain(): string { return this._domain; }

	set domain(pdomain: string){ this._domain = pdomain; }

	get code(): string { return this._code; }

	set code(pcode: string){ this._code = pcode; }

	get updateFlag(): string { return this._updateFlag; }

	set updateFlag(value: string) { this._updateFlag = value; }

	get updateReasonFlag(): string {return this._updateReasonFlag;}
	set updateReasonFlag(value: string) {this._updateReasonFlag = value;}

	public get automaticFlag(): string { return this._automaticFlag;}
	public set automaticFlag(value: string) {this._automaticFlag = value;}
	public get length(): number {return this._length;}
	public set length(value: number) {this._length = value;}
	public get lengthUnit(): string {return this._lengthUnit;}
	public set lengthUnit(value: string) {	this._lengthUnit = value;}
	public get reportType(): string {return this._reportType;}
	public set reportType(value: string) {this._reportType = value;}

	toJSON(): any {
		return {
			'activeFlag': this._activeFlag,
			'createDatetime': this._createDatetime,
			'createUserId': this._createUserId,
			'description': this._description,
			'expiredDate': this._expiredDate,
			'listSeq': this._listSeq,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'newCode': this._newCode,
			'parentCode': this._parentCode,
			'parentDomain': this._parentDomain,
			'sealFlag': this._sealFlag,
			'systemDataFlag': this._systemDataFlag,
			'domain': this._domain,
			'code': this._code,
			'lastName': this._lastName,
			'firstName': this._firstName,
			'middleName': this._middleName,
			'staffId': this._staffId,
			'updateFlag': this._updateFlag,
			'updateReasonFlag':this.updateReasonFlag,
			'automaticFlag':this._automaticFlag,
			'length' :this._length,
			'lengthUnit' : this._lengthUnit,
			'reportType' : this._reportType
		};
	}
}