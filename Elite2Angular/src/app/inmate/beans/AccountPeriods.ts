export class AccountPeriods {
    private _accountPeriodId: number;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDate: Date;
    private _modifyDateTime: Date;
    private _accountPeriodType: string;
    private _endDate: Date;
    private _modifyUserId: string;
    private _listSeq: number;
    private _sealFlag: string;
    private _startDate: Date;
    private _createDateTime: Date;
    private _parentAccountPeriodId: number;


     get parentAccountPeriodId(): number { return this._parentAccountPeriodId; }

     set parentAccountPeriodId(pparentAccountPeriodId: number) { this._parentAccountPeriodId = pparentAccountPeriodId; }

    get accountPeriodId(): number { return this._accountPeriodId; }

    set accountPeriodId(paccountPeriodId: number) { this._accountPeriodId = paccountPeriodId; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDate(): Date { return this._modifyDate; }

    set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

    get accountPeriodType(): string { return this._accountPeriodType; }

    set accountPeriodType(paccountPeriodType: string) { this._accountPeriodType = paccountPeriodType; }

    get endDate(): Date { return this._endDate; }

    set endDate(pendDate: Date) { this._endDate = pendDate; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get startDate(): Date { return this._startDate; }

    set startDate(pstartDate: Date) { this._startDate = pstartDate; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }


    toJSON(): any {
        return {
            'accountPeriodId': this._accountPeriodId,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'modifyDate': this._modifyDate,
            'modifyDateTime': this._modifyDateTime,
            'accountPeriodType': this._accountPeriodType,
            'endDate': this._endDate,
            'modifyUserId': this._modifyUserId,
            'listSeq': this._listSeq,
            'sealFlag': this._sealFlag,
            'startDate': this._startDate,
               'createDateTime': this._createDateTime,
               'parentAccountPeriodId' : this._parentAccountPeriodId
        };
    }
}
