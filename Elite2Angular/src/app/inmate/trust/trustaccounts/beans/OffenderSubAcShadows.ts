export class OffenderSubAcShadows {
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _balance: number;
    private _modifyDatetime: Date;
    private _caseloadId: string;
    private _modifyUserId: string;
    private _transferedAmount: number;
    private _trustAccountCode: string;
    private _offenderId: number;
    private _sealFlag: string;
    private _dspDescription: string;

	get dspDescription(): string { return this._dspDescription; }
    set dspDescription(pdspDescription: string) { this._dspDescription = pdspDescription; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get balance(): number { return this._balance; }
    set balance(pbalance: number) { this._balance = pbalance; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get transferedAmount(): number { return this._transferedAmount; }
    set transferedAmount(ptransferedAmount: number) { this._transferedAmount = ptransferedAmount; }
    get trustAccountCode(): string { return this._trustAccountCode; }
    set trustAccountCode(ptrustAccountCode: string) { this._trustAccountCode = ptrustAccountCode; }
    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'balance': this._balance,
            'modifyDatetime': this._modifyDatetime,
            'caseloadId': this._caseloadId,
            'modifyUserId': this._modifyUserId,
            'transferedAmount': this._transferedAmount,
            'trustAccountCode': this._trustAccountCode,
            'offenderId': this._offenderId,
			'sealFlag': this._sealFlag,
			'dspDescription': this._dspDescription
        };
    }
}