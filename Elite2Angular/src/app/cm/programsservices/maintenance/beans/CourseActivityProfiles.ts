export class CourseActivityProfiles {
	private _createDatetime: Date;
	private _serialVersionUID: number;
	private _createUserId: string;
	private _programProfileType: string;
	private _modifyDatetime: Date;
	private _programProfileCode: string;
	private _modifyUserId: string;
	private _crsActyId: number;
	private _sealFlag: string;

	get createDatetime(): Date { return this._createDatetime; }
	set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
	get serialVersionUID(): number { return this._serialVersionUID; }
	set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
	get createUserId(): string { return this._createUserId; }
	set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
	get programProfileType(): string { return this._programProfileType; }
	set programProfileType(pprogramProfileType: string) { this._programProfileType = pprogramProfileType; }
	get modifyDatetime(): Date { return this._modifyDatetime; }
	set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
	get programProfileCode(): string { return this._programProfileCode; }
	set programProfileCode(pprogramProfileCode: string) { this._programProfileCode = pprogramProfileCode; }
	get modifyUserId(): string { return this._modifyUserId; }
	set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
	get crsActyId(): number { return this._crsActyId; }
	set crsActyId(pcrsActyId: number) { this._crsActyId = pcrsActyId; }
	get sealFlag(): string { return this._sealFlag; }
	set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

	toJSON(): any {
		return {
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'createUserId': this._createUserId,
			'programProfileType': this._programProfileType,
			'modifyDatetime': this._modifyDatetime,
			'programProfileCode': this._programProfileCode,
			'modifyUserId': this._modifyUserId,
			'crsActyId': this._crsActyId,
			'sealFlag': this._sealFlag,
		};
	}
}