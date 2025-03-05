
export class OffenderObligationHty {
    private _offenderDeductionId: number;
    private _informationNumber: string;
    private _createUserId: string;
    private _modifyUserId: string;
    private _modifiedDateTime: Date;
    private _modifiedUserId: string;
    private _modifyDateTime: number;
    private _createDateTime: number;
    private _sealFlag: string;
    private _deductionSeq: number;
    private _adjustedAmount: number;
    private _maxTotalAmount: number;
    private _deductionType: string;

    get modifiedUserId(): string { return this._modifiedUserId; }

    set modifiedUserId( pmodifiedUserId: string ) { this._modifiedUserId = pmodifiedUserId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get offenderDeductionId(): number { return this._offenderDeductionId ; }

    set offenderDeductionId( poffenderDeductionId: number ) { this._offenderDeductionId = poffenderDeductionId; }

    get informationNumber(): string { return this._informationNumber; }

    set informationNumber( pinformationNumber: string ) { this._informationNumber = pinformationNumber; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId ; }

    get modifiedDateTime(): Date { return this._modifiedDateTime; }

    set modifiedDateTime( pmodifiedDateTime: Date ) { this._modifiedDateTime = pmodifiedDateTime; }

    get modifyDateTime(): number { return this._modifyDateTime; }

    set modifyDateTime( pmodifyDateTime: number ) { this._modifyDateTime = pmodifyDateTime; }

    get createDateTime(): number { return this._createDateTime; }

    set createDateTime( pcreateDateTime: number ) { this._createDateTime = pcreateDateTime; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get deductionSeq(): number { return this._deductionSeq; }

    set deductionSeq(pdeductionSeq: number) { this._deductionSeq = pdeductionSeq; }

    get adjustedAmount(): number { return this._adjustedAmount; }

    set adjustedAmount(padjustedAmount: number) { this._adjustedAmount = padjustedAmount; }

    get maxTotalAmount(): number { return this._maxTotalAmount; }

    set maxTotalAmount(pmaxTotalAmount: number) { this._maxTotalAmount = pmaxTotalAmount; }

    get deductionType(): string { return this._deductionType; }

    set deductionType( pdeductionType: string ) { this._deductionType = pdeductionType; }

    toJSON(): any {
        return {
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'modifiedDateTime': this._modifiedDateTime,
            'modifiedUserId': this._modifiedUserId,
            'createUserId': this._createUserId,
            'modifyDateTime': this._modifyDateTime,
            'informationNumber': this._informationNumber,
            'offenderDeductionId': this._offenderDeductionId,
            'createDateTime': this._createDateTime,
            'adjustedAmount': this._adjustedAmount,
            'deductionSeq': this._deductionSeq,
            'maxTotalAmount': this._maxTotalAmount,
            'deductionType': this._deductionType,
        };
    }
}

