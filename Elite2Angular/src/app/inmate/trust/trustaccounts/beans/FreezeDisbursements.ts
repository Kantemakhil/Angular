export class FreezeDisbursements {
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _accountCode: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _caseloadType: string;
    private _txnType: string;
    private _freezeFlag: string;
    private _sealFlag: string;
    private _accountName: string;
    private _txnUsage: string;
    private _txnDescription: string;
    private _reg: string;
    private _acCode: string;
    private _txnCode: string;


    get txnCode(): string { return this._txnCode; }
    set txnCode(ptxnCode: string) { this._txnCode = ptxnCode; }
    get acCode(): string { return this._acCode; }
    set acCode(pacCode: string) { this._acCode = pacCode; }
    get accountName(): string { return this._accountName; }
    set accountName(paccountName: string) { this._accountName = paccountName; }
    get txnUsage(): string { return this._txnUsage; }
    set txnUsage(ptxnUsage: string) { this._txnUsage = ptxnUsage; }
    get txnDescription(): string { return this._txnDescription; }
    set txnDescription(ptxnDescription: string) { this._txnDescription = ptxnDescription; }
    get reg(): string { return this._reg; }
    set reg(preg: string) { this._reg = preg; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get accountCode(): number { return this._accountCode; }
    set accountCode(paccountCode: number) { this._accountCode = paccountCode; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get caseloadType(): string { return this._caseloadType; }
    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }
    get txnType(): string { return this._txnType; }
    set txnType(ptxnType: string) { this._txnType = ptxnType; }
    get freezeFlag(): string { return this._freezeFlag; }
    set freezeFlag(pfreezeFlag: string) { this._freezeFlag = pfreezeFlag; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'accountCode': this._accountCode,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'caseloadType': this._caseloadType,
            'txnType': this._txnType,
            'freezeFlag': this._freezeFlag,
            'sealFlag': this._sealFlag,
            'accountName': this._accountName,
            'reg': this._reg,
            'txnDescription': this._txnDescription,
            'txnUsage': this._txnUsage,
            'acCode': this._acCode,
            txnCode: this._txnCode
        };
    }
}
