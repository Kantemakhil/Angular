export class Statutes {
	private _statuteCode: string;
	private _activeFlag: string;
	private _createDatetime: Date;
	private _createUserId: string;
	private _description: string;
	private _expiryDate: Date;
	private _legislatingBodyCode: string;
	private _listSeq: number;
	private _modifyDatetime: Date;
	private _modifyUserId: string;
	private _serialVersionUID: number;
	private _sealFlag: string;
	private _updateAllowedFlag: string;
	private _rowId: string;

	get rowId(): string { return this._rowId; }
	set rowId(prowId: string) { this._rowId = prowId; }
	get createUserId(): string { return this._createUserId; }
	set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
	get modifyDatetime(): Date { return this._modifyDatetime; }
	set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
	get modifyUserId(): string { return this._modifyUserId; }
	set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
	get description(): string { return this._description; }
	set description(pdescription: string) { this._description = pdescription; }
	get statuteCode(): string { return this._statuteCode; }
	set statuteCode(pstatuteCode: string) { this._statuteCode = pstatuteCode; }
	get createDatetime(): Date { return this._createDatetime; }
	set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
	get expiryDate(): Date { return this._expiryDate; }
	set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
	get serialVersionUID(): number { return this._serialVersionUID; }
	set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
	get listSeq(): number { return this._listSeq; }
	set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
	get sealFlag(): string { return this._sealFlag; }
	set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
	get updateAllowedFlag(): string { return this._updateAllowedFlag; }
	set updateAllowedFlag(pupdateAllowedFlag: string) { this._updateAllowedFlag = pupdateAllowedFlag; }
	get activeFlag(): string { return this._activeFlag; }
	set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
	get legislatingBodyCode(): string { return this._legislatingBodyCode; }
	set legislatingBodyCode(plegislatingBodyCode: string) { this._legislatingBodyCode = plegislatingBodyCode; }

	toJSON(): any {
		return {
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'description': this._description,
			'statuteCode': this._statuteCode,
			'createDatetime': this._createDatetime,
			'expiryDate': this._expiryDate,
			'serialVersionUID': this._serialVersionUID,
			'listSeq': this._listSeq,
			'sealFlag': this._sealFlag,
			'updateAllowedFlag': this._updateAllowedFlag,
			'activeFlag': this._activeFlag,
			'legislatingBodyCode': this._legislatingBodyCode,
			'rowId': this._rowId,
		};
	}
}