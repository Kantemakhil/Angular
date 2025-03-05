export class AllAuditPolicies {
	private _pfFunction: string;
	private _policyText: string;
	private _policyName: string;
	private _upd: string;
	private _objectSchema: string;
	private _del: string;
	private _sealFlag: string;
	private _enabled: string;
	private _enableOrDisable: number;
	private _auditTrail: string;
	private _ins: string;
	private _policyColumnOptions: string;
	private _policyColumn: string;
	private _pfSchema: string;
	private _inserted: number;
	private _common: string;
	private _policyOwner: string;
	private _pfPackage: string;
	private _inherited: string;
	private _objectName: string;
	private _sel: string;

	get pfFunction(): string { return this._pfFunction; }
	set pfFunction(ppfFunction: string) { this._pfFunction = ppfFunction; }
	get policyText(): string { return this._policyText; }
	set policyText(ppolicyText: string) { this._policyText = ppolicyText; }
	get policyName(): string { return this._policyName; }
	set policyName(ppolicyName: string) { this._policyName = ppolicyName; }
	get upd(): string { return this._upd; }
	set upd(pupd: string) { this._upd = pupd; }
	get objectSchema(): string { return this._objectSchema; }
	set objectSchema(pobjectSchema: string) { this._objectSchema = pobjectSchema; }
	get del(): string { return this._del; }
	set del(pdel: string) { this._del = pdel; }
	get enabled(): string { return this._enabled; }
	set enabled(penabled: string) { this._enabled = penabled; }
	get enableOrDisable(): number { return this._enableOrDisable; }
	set enableOrDisable(penableOrDisable: number) { this._enableOrDisable = penableOrDisable; }
	get auditTrail(): string { return this._auditTrail; }
	set auditTrail(pauditTrail: string) { this._auditTrail = pauditTrail; }
	get ins(): string { return this._ins; }
	set ins(pins: string) { this._ins = pins; }
	get policyColumnOptions(): string { return this._policyColumnOptions; }
	set policyColumnOptions(ppolicyColumnOptions: string) { this._policyColumnOptions = ppolicyColumnOptions; }
	get policyColumn(): string { return this._policyColumn; }
	set policyColumn(ppolicyColumn: string) { this._policyColumn = ppolicyColumn; }
	get pfSchema(): string { return this._pfSchema; }
	set pfSchema(ppfSchema: string) { this._pfSchema = ppfSchema; }
	get inserted(): number { return this._inserted; }
	set inserted(pinserted: number) { this._inserted = pinserted; }
	get common(): string { return this._common; }
	set common(pcommon: string) { this._common = pcommon; }
	get policyOwner(): string { return this._policyOwner; }
	set policyOwner(ppolicyOwner: string) { this._policyOwner = ppolicyOwner; }
	get pfPackage(): string { return this._pfPackage; }
	set pfPackage(ppfPackage: string) { this._pfPackage = ppfPackage; }
	get inherited(): string { return this._inherited; }
	set inherited(pinherited: string) { this._inherited = pinherited; }
	get objectName(): string { return this._objectName; }
	set objectName(pobjectName: string) { this._objectName = pobjectName; }
	get sel(): string { return this._sel; }
	set sel(psel: string) { this._sel = psel; }
	get sealFlag(): string { return this._sealFlag; }
	set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

	toJSON(): any {
		return {
			'pfFunction': this._pfFunction,
			'policyText': this._policyText,
			'policyName': this._policyName,
			'upd': this._upd,
			'objectSchema': this._objectSchema,
			'del': this._del,
			'enabled': this._enabled,
			'auditTrail': this._auditTrail,
			'ins': this._ins,
			'policyColumnOptions': this._policyColumnOptions,
			'policyColumn': this._policyColumn,
			'pfSchema': this._pfSchema,
			'inserted': this._inserted,
			'common': this._common,
			'policyOwner': this._policyOwner,
			'pfPackage': this._pfPackage,
			'inherited': this._inherited,
			'objectName': this._objectName,
			'sel': this._sel,
			'sealFlag': this._sealFlag,
			'enableOrDisable': this._enableOrDisable,
		};
	}
}