

export class CaseloadCurrentAccountsBase {
    private _payeePersonId: number;
    private _createUserId: string;
    private _accountCode: number;
    private _modifyDate: Date;
    private _modifyDatetime: Date;
    private _currentBalance: number;
    private _modifyUserId: string;
    private _caseloadType: string;
    private _createDatetime: Date;
    private _payeeCorporateId: number;
    private _routingNumber: number;
    private _serialVersionUID: number;
    private _bankAccountType: string;
    private _caseloadId: string;
    private _listSeq: number;
    private _bankAccountNumber: string;
    private _sealFlag: string;
    private _accountPartyType: string;
    private _corporateName: string;

    get payeePersonId(): number { return this._payeePersonId; }
    set payeePersonId(ppayeePersonId: number) { this._payeePersonId = ppayeePersonId; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get accountCode(): number { return this._accountCode; }
    set accountCode(paccountCode: number) { this._accountCode = paccountCode; }
    get modifyDate(): Date { return this._modifyDate; }
    set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get currentBalance(): number { return this._currentBalance; }
    set currentBalance(pcurrentBalance: number) { this._currentBalance = pcurrentBalance; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get caseloadType(): string { return this._caseloadType; }
    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get payeeCorporateId(): number { return this._payeeCorporateId; }
    set payeeCorporateId(ppayeeCorporateId: number) { this._payeeCorporateId = ppayeeCorporateId; }
    get routingNumber(): number { return this._routingNumber; }
    set routingNumber(proutingNumber: number) { this._routingNumber = proutingNumber; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get bankAccountType(): string { return this._bankAccountType; }
    set bankAccountType(pbankAccountType: string) { this._bankAccountType = pbankAccountType; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get bankAccountNumber(): string { return this._bankAccountNumber; }
    set bankAccountNumber(pbankAccountNumber: string) { this._bankAccountNumber = pbankAccountNumber; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get accountPartyType(): string { return this._accountPartyType; }
    set accountPartyType(paccountPartyType: string) { this._accountPartyType = paccountPartyType; }
    get corporateName(): string { return this._corporateName; }
    set corporateName(pcorporateName: string) { this._corporateName = pcorporateName; }

    toJSON(): any {
        return {
            'payeePersonId': this._payeePersonId,
            'createUserId': this._createUserId,
            'accountCode': this._accountCode,
            'modifyDate': this._modifyDate,
            'modifyDatetime': this._modifyDatetime,
            'currentBalance': this._currentBalance,
            'modifyUserId': this._modifyUserId,
            'caseloadType': this._caseloadType,
            'createDatetime': this._createDatetime,
            'payeeCorporateId': this._payeeCorporateId,
            'routingNumber': this._routingNumber,
            'serialVersionUID': this._serialVersionUID,
            'bankAccountType': this._bankAccountType,
            'caseloadId': this._caseloadId,
            'listSeq': this._listSeq,
            'bankAccountNumber': this._bankAccountNumber,
            'sealFlag': this._sealFlag,
            'accountPartyType': this._accountPartyType,
            'corporateName': this._corporateName,
        };
    }
}
