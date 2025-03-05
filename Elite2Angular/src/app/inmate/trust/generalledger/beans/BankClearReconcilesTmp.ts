
export class BankClearReconcilesTmp {
    private _createUserId: string;
    private _referenceNo: number;
    private _modifyDatetime: Date;
    private _referenceNoType: string;
    private _modifyUserId: string;
    private _glEntrySeq: number;
    private _description: string;
    private _txnEntryAmount: number;
    private _txnEntryDate: Date;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _txnEntrySeq: number;
    private _caseloadId: string;
    private _sealFlag: string;
    private _txnPostUsage: string;
    private _txnId: number;
    private _accountCode: number;
    private _plusTxnEntryAmount: number;
    private _minusTxnEntryAmount: number;
    private _reconciledstmntbalance: string;
    private _trustbalance: string;
    private _differenceBal: string;
    private _cgNbtAccountCode: string;
    private _cgnbtBankStatementDate: Date;
    private _lastReconciledDate: Date;
    private _checkFlag: string;
    private _rowId: string;

    get checkFlag(): string { return this._checkFlag; }

    set checkFlag(pcheckFlag: string) { this._checkFlag = pcheckFlag; }

    get cgnbtBankStatementDate(): Date { return this._cgnbtBankStatementDate; }

    set cgnbtBankStatementDate(pcgnbtBankStatementDate: Date) { this._cgnbtBankStatementDate = pcgnbtBankStatementDate; }

    get lastReconciledDate(): Date { return this._lastReconciledDate; }

    set lastReconciledDate(plastReconciledDate: Date) { this._lastReconciledDate = plastReconciledDate; }

    get cgNbtAccountCode(): string { return this._cgNbtAccountCode; }

    set cgNbtAccountCode(pcgNbtAccountCode: string) { this._cgNbtAccountCode = pcgNbtAccountCode; }

    get reconciledstmntbalance(): string { return this._reconciledstmntbalance; }

    set reconciledstmntbalance(preconciledstmntbalance: string) { this._reconciledstmntbalance = preconciledstmntbalance; }

    get trustbalance(): string { return this._trustbalance; }

    set trustbalance(ptrustbalance: string) { this._trustbalance = ptrustbalance; }

    get differenceBal(): string { return this._differenceBal; }

    set differenceBal(pdifferenceBal: string) { this._differenceBal = pdifferenceBal; }

    get plusTxnEntryAmount(): number { return this._plusTxnEntryAmount; }

    set plusTxnEntryAmount(pplusTxnEntryAmount: number) { this._plusTxnEntryAmount = pplusTxnEntryAmount; }

    get minusTxnEntryAmount(): number { return this._minusTxnEntryAmount; }

    set minusTxnEntryAmount(pminusTxnEntryAmount: number) { this._minusTxnEntryAmount = pminusTxnEntryAmount; }

    get accountCode(): number { return this._accountCode; }

    set accountCode(paccountCode: number) { this._accountCode = paccountCode; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get referenceNo(): number { return this._referenceNo; }

    set referenceNo(preferenceNo: number) { this._referenceNo = preferenceNo; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get referenceNoType(): string { return this._referenceNoType; }

    set referenceNoType(preferenceNoType: string) { this._referenceNoType = preferenceNoType; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get glEntrySeq(): number { return this._glEntrySeq; }

    set glEntrySeq(pglEntrySeq: number) { this._glEntrySeq = pglEntrySeq; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get txnEntryAmount(): number { return this._txnEntryAmount; }

    set txnEntryAmount(ptxnEntryAmount: number) { this._txnEntryAmount = ptxnEntryAmount; }

    get txnEntryDate(): Date { return this._txnEntryDate; }

    set txnEntryDate(ptxnEntryDate: Date) { this._txnEntryDate = ptxnEntryDate; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get txnEntrySeq(): number { return this._txnEntrySeq; }

    set txnEntrySeq(ptxnEntrySeq: number) { this._txnEntrySeq = ptxnEntrySeq; }

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get txnPostUsage(): string { return this._txnPostUsage; }

    set txnPostUsage(ptxnPostUsage: string) { this._txnPostUsage = ptxnPostUsage; }

    get txnId(): number { return this._txnId; }

    set txnId(ptxnId: number) { this._txnId = ptxnId; }

    get rowId(): string { return this._rowId; }

    set rowId(prowId: string) { this._rowId = prowId; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'referenceNo': this._referenceNo,
            'modifyDatetime': this._modifyDatetime,
            'referenceNoType': this._referenceNoType,
            'modifyUserId': this._modifyUserId,
            'glEntrySeq': this._glEntrySeq,
            'description': this._description,
            'txnEntryAmount': this._txnEntryAmount,
            'txnEntryDate': this._txnEntryDate,
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'txnEntrySeq': this._txnEntrySeq,
            'caseloadId': this._caseloadId,
            'sealFlag': this._sealFlag,
            'txnPostUsage': this._txnPostUsage,
            'txnId': this._txnId,
            'accountCode' : this._accountCode,
            'plusTxnEntryAmount' : this._plusTxnEntryAmount,
            'minusTxnEntryAmount' : this._minusTxnEntryAmount,
            'reconciledstmntbalance': this._reconciledstmntbalance,
            'trustbalance': this._trustbalance,
            'differenceBal': this._differenceBal,
            'cgNbtAccountCode':  this._cgNbtAccountCode,
            'cgnbtBankStatementDate': this._cgnbtBankStatementDate,
            'lastReconciledDate': this._lastReconciledDate,
            'checkFlag': this._checkFlag,
            'rowId': this._rowId
        };
    }
}