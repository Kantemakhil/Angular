
export class CaseloadCurrentAccounts {
    private _accountCode: number;

    private _accountPartyType: string;

    private _accountPeriodId: number;

    private _bankAccountNumber: string;

    private _bankAccountType: string;

    private _caseloadId: string;

    private _currentBalance: number;

    private _listSeq: number;

    private _modifyDate: Date;

    private _modifyUserId: string;

    private _payeeCorporateId: number;

    private _payeePersonId: number;

    private _routingNumber: number;

    private _dspTxnPostingType: string;

    private _globalCaseloadType: string;

    get dspTxnPostingType(): string { return this._dspTxnPostingType; }
    set dspTxnPostingType(pdspTxnPostingType: string) { this._dspTxnPostingType = pdspTxnPostingType; }
    get globalCaseloadType(): string { return this._globalCaseloadType; }
    set globalCaseloadType(pglobalCaseloadType: string) { this._globalCaseloadType = pglobalCaseloadType; }
    get accountPartyType(): string { return this._accountPartyType; }
    set accountPartyType(paccountPartyType: string) { this._accountPartyType = paccountPartyType; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get payeeCorporateId(): number { return this._payeeCorporateId; }
    set payeeCorporateId(ppayeeCorporateId: number) { this._payeeCorporateId = ppayeeCorporateId; }
    get accountPeriodId(): number { return this._accountPeriodId; }
    set accountPeriodId(paccountPeriodId: number) { this._accountPeriodId = paccountPeriodId; }
    get currentBalance(): number { return this._currentBalance; }
    set currentBalance(pcurrentBalance: number) { this._currentBalance = pcurrentBalance; }
    get modifyDate(): Date { return this._modifyDate; }
    set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }
    get payeePersonId(): number { return this._payeePersonId; }
    set payeePersonId(ppayeePersonId: number) { this._payeePersonId = ppayeePersonId; }
    get routingNumber(): number { return this._routingNumber; }
    set routingNumber(proutingNumber: number) { this._routingNumber = proutingNumber; }
    get accountCode(): number { return this._accountCode; }
    set accountCode(paccountCode: number) { this._accountCode = paccountCode; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get bankAccountNumber(): string { return this._bankAccountNumber; }
    set bankAccountNumber(pbankAccountNumber: string) { this._bankAccountNumber = pbankAccountNumber; }
    get bankAccountType(): string { return this._bankAccountType; }
    set bankAccountType(pbankAccountType: string) { this._bankAccountType = pbankAccountType; }
    toJSON(): any {
        return {
            'accountPartyType': this._accountPartyType,
            'listSeq': this._listSeq,
            'payeeCorporateId': this._payeeCorporateId,
            'accountPeriodId': this._accountPeriodId,
            'currentBalance': this._currentBalance,
            'modifyDate': this._modifyDate,
            'payeePersonId': this._payeePersonId,
            'routingNumber': this._routingNumber,
            'accountCode': this._accountCode,
            'caseloadId': this._caseloadId,
            'modifyUserId': this._modifyUserId,
            'bankAccountNumber': this._bankAccountNumber,
            'bankAccountType': this._bankAccountType,
            'globalCaseloadType': this._globalCaseloadType,
            'dspTxnPostingType': this._dspTxnPostingType
            };
        }

}
