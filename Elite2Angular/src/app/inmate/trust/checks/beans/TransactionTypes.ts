export class TransactionTypes {
    private _createUserId: string;
    private _code: string;
    private _modifyDate: Date;
    private _manualInvoiceFlag: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _errorMessage: string;
    private _description: string;
    private _txnType: string;
    private _caseloadType: string;
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _inserted: number;
    private _grossNetFlag: string;
    private _allCaseloadFlag: string;
    private _creditObligationType: string;
    private _listSeq: number;
    private _days: number;
    private _txnUsage: string;
    private _updateAllowedFlag: string;
    private _sealFlag: string;
    private _activeFlag: string;

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get code(): string { return this._code; }
    set code(pcode: string) { this._code = pcode; }
    get modifyDate(): Date { return this._modifyDate; }
    set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }
    get manualInvoiceFlag(): string { return this._manualInvoiceFlag; }
    set manualInvoiceFlag(pmanualInvoiceFlag: string) { this._manualInvoiceFlag = pmanualInvoiceFlag; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get errorMessage(): string { return this._errorMessage; }
    set errorMessage(perrorMessage: string) { this._errorMessage = perrorMessage; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get txnType(): string { return this._txnType; }
    set txnType(ptxnType: string) { this._txnType = ptxnType; }
    get caseloadType(): string { return this._caseloadType; }
    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get inserted(): number { return this._inserted; }
    set inserted(pinserted: number) { this._inserted = pinserted; }
    get grossNetFlag(): string { return this._grossNetFlag; }
    set grossNetFlag(pgrossNetFlag: string) { this._grossNetFlag = pgrossNetFlag; }
    get allCaseloadFlag(): string { return this._allCaseloadFlag; }
    set allCaseloadFlag(pallCaseloadFlag: string) { this._allCaseloadFlag = pallCaseloadFlag; }
    get creditObligationType(): string { return this._creditObligationType; }
    set creditObligationType(pcreditObligationType: string) { this._creditObligationType = pcreditObligationType; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get days(): number { return this._days; }
    set days(pdays: number) { this._days = pdays; }
    get txnUsage(): string { return this._txnUsage; }
    set txnUsage(ptxnUsage: string) { this._txnUsage = ptxnUsage; }
    get updateAllowedFlag(): string { return this._updateAllowedFlag; }
    set updateAllowedFlag(pupdateAllowedFlag: string) { this._updateAllowedFlag = pupdateAllowedFlag; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'code': this._code,
            'modifyDate': this._modifyDate,
            'manualInvoiceFlag': this._manualInvoiceFlag,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'errorMessage': this._errorMessage,
            'description': this._description,
            'txnType': this._txnType,
            'caseloadType': this._caseloadType,
            'expiryDate': this._expiryDate,
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'inserted': this._inserted,
            'grossNetFlag': this._grossNetFlag,
            'allCaseloadFlag': this._allCaseloadFlag,
            'creditObligationType': this._creditObligationType,
            'listSeq': this._listSeq,
            'days': this._days,
            'txnUsage': this._txnUsage,
            'updateAllowedFlag': this._updateAllowedFlag,
            'sealFlag': this._sealFlag,
            'activeFlag': this._activeFlag,
        };
    }
}
