
export class ScreenWorkFlow  {

	private _workFlowCode: string;
	private _moduleName: string;
	private _modifyDatetime: Date;
	private _description: string;
	private _caseLoadType: string;
	private _workSeq: number;
	private _toolTip: string;

	get workFlowCode(): string { return this._workFlowCode; }

	set workFlowCode(pworkFlowCode: string){ this._workFlowCode = pworkFlowCode; }

	get moduleName(): string { return this._moduleName; }

	set moduleName(pmoduleName: string){ this._moduleName = pmoduleName; }

	get modifyDatetime(): Date { return this._modifyDatetime; }

	set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime; }

	get description(): string { return this._description; }

	set description(pdescription: string){ this._description = pdescription; }

	get caseLoadType(): string { return this._caseLoadType; }

	set caseLoadType(pcaseLoadType: string){ this._caseLoadType = pcaseLoadType; }

	get workSeq(): number { return this._workSeq; }

	set workSeq(pworkSeq: number){ this._workSeq = pworkSeq; }

	get toolTip(): string { return this._toolTip; }

	set toolTip(ptoolTip: string){ this._toolTip = ptoolTip; }

	toJSON(): any {
		return {
			'workFlowCode': this._workFlowCode,
			'moduleName': this._moduleName,
			'modifyDatetime': this._modifyDatetime,
			'description': this._description,
			'caseLoadType': this._caseLoadType,
			'workSeq': this._workSeq,
			'toolTip': this._toolTip,
		};
	}
}