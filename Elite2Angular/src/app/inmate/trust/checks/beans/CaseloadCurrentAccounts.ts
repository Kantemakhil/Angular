export class CaseloadCurrentAccounts {
    private _payeePersonId: number;
    private _dspTxnPostingType: string;
    private _accountPeriodId: number;
    private _accountCode: number;
    private _modifyDate: Date;
    private _currentBalance: number;
    private _modifyUserId: string;
    private _payeeCorporateId: number;
    private _routingNumber: number;
    private _serialVersionUID: number;
    private _bankAccountType: string;
    private _caseloadId: string;
    private _listSeq: number;
    private _bankAccountNumber: string;
    private _globalCaseloadType: string;
    private _accountPartyType: string;
    private _accountName: string;

    get payeePersonId(): number { return this._payeePersonId; }
    set payeePersonId(ppayeePersonId: number) { this._payeePersonId = ppayeePersonId; }
    get dspTxnPostingType(): string { return this._dspTxnPostingType; }
    set dspTxnPostingType(pdspTxnPostingType: string) { this._dspTxnPostingType = pdspTxnPostingType; }
    get accountPeriodId(): number { return this._accountPeriodId; }
    set accountPeriodId(paccountPeriodId: number) { this._accountPeriodId = paccountPeriodId; }
    get accountCode(): number { return this._accountCode; }
    set accountCode(paccountCode: number) { this._accountCode = paccountCode; }
    get modifyDate(): Date { return this._modifyDate; }
    set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }
    get currentBalance(): number { return this._currentBalance; }
    set currentBalance(pcurrentBalance: number) { this._currentBalance = pcurrentBalance; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
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
    get globalCaseloadType(): string { return this._globalCaseloadType; }
    set globalCaseloadType(pglobalCaseloadType: string) { this._globalCaseloadType = pglobalCaseloadType; }
    get accountPartyType(): string { return this._accountPartyType; }
    set accountPartyType(paccountPartyType: string) { this._accountPartyType = paccountPartyType; }
    get accountName(): string { return this._accountName; }
    set accountName(paccountName: string) { this._accountName = paccountName; }

    toJSON(): any {
        return {
            'payeePersonId': this._payeePersonId,
            'dspTxnPostingType': this._dspTxnPostingType,
            'accountPeriodId': this._accountPeriodId,
            'accountCode': this._accountCode,
            'modifyDate': this._modifyDate,
            'currentBalance': this._currentBalance,
            'modifyUserId': this._modifyUserId,
            'payeeCorporateId': this._payeeCorporateId,
            'routingNumber': this._routingNumber,
            'serialVersionUID': this._serialVersionUID,
            'bankAccountType': this._bankAccountType,
            'caseloadId': this._caseloadId,
            'listSeq': this._listSeq,
            'bankAccountNumber': this._bankAccountNumber,
            'globalCaseloadType': this._globalCaseloadType,
            'accountPartyType': this._accountPartyType,
            'accountName': this._accountName,
        };
    }
}
