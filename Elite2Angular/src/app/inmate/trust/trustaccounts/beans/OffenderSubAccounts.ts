
export class OffenderSubAccounts {
    private _createUserId: string;
    private _modifyDate: Date;
    private _modifyDatetime: Date;
    private _lastTxnId: number;
    private _modifyUserId: string;
    private _indDate: Date;
    private _trustAccountCode: number;
    private _holdBalance: number;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _indDays: number;
    private _balance: number;
    private _minimumBalance: number;
    private _caseloadId: string;
    private _listSeq: number;
    private _offenderId: number;
    private _sealFlag: string;
    private _subAccountType: string;
    private _description: string;
    private _drvAvailableBalance: number;
    private _daysRemain: number;
    private _offenderBookId: number;
    private _informationNumber: string;
   
    get daysRemain(): number { return this._daysRemain; }

    set daysRemain(pdaysRemain: number) { this._daysRemain = pdaysRemain; }

    get drvAvailableBalance(): number { return this._drvAvailableBalance; }

    set drvAvailableBalance(pdrvAvailableBalance: number) { this._drvAvailableBalance = pdrvAvailableBalance; }
    get subAccountType(): string { return this._subAccountType; }

    set subAccountType(psubAccountType: string) { this._subAccountType = psubAccountType; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDate(): Date { return this._modifyDate; }

    set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get lastTxnId(): number { return this._lastTxnId; }

    set lastTxnId(plastTxnId: number) { this._lastTxnId = plastTxnId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get indDate(): Date { return this._indDate; }

    set indDate(pindDate: Date) { this._indDate = pindDate; }

    get trustAccountCode(): number { return this._trustAccountCode; }

    set trustAccountCode(ptrustAccountCode: number) { this._trustAccountCode = ptrustAccountCode; }

    get holdBalance(): number { return this._holdBalance; }

    set holdBalance(pholdBalance: number) { this._holdBalance = pholdBalance; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get indDays(): number { return this._indDays; }

    set indDays(pindDays: number) { this._indDays = pindDays; }

    get balance(): number { return this._balance; }

    set balance(pbalance: number) { this._balance = pbalance; }

    get minimumBalance(): number { return this._minimumBalance; }

    set minimumBalance(pminimumBalance: number) { this._minimumBalance = pminimumBalance; }

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get informationNumber(): string { return  this._informationNumber; }

    set informationNumber(pinformationNumber: string) { this._informationNumber = pinformationNumber; }


    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'modifyDate': this._modifyDate,
            'modifyDatetime': this._modifyDatetime,
            'lastTxnId': this._lastTxnId,
            'modifyUserId': this._modifyUserId,
            'indDate': this._indDate,
            'trustAccountCode': this._trustAccountCode,
            'holdBalance': this._holdBalance,
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'indDays': this._indDays,
            'balance': this._balance,
            'minimumBalance': this._minimumBalance,
            'caseloadId': this._caseloadId,
            'listSeq': this._listSeq,
            'offenderId': this._offenderId,
            'sealFlag': this._sealFlag,
            'offenderBookId': this._offenderBookId,
            'description': this._description,
            'informationNumber': this._informationNumber
        };
    }
}
