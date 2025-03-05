export class OffenderTierTxnFeeAmounts {

    private _createDatetime: Date;
    private _createUserId: string;
    private _feeAmount: any;
    private _serialVersionUID: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _percentage: any;
    private _sealFlag: string;
    private _offenderDeductionId: number;
    private _fromAmount: any;
    private _toAmount: any;
    private _rowId: string;
    private _pFlag: string;
    private _overlapCount: number;
    private _frmOverlapFlag: boolean;
    private _toOverlapFlag: boolean;
    private _caseloadId: string;
    private _deductionType: string;

    get deductionType(): string { return this._deductionType; }
    set deductionType(pdeductionType: string) { this._deductionType = pdeductionType ; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId ; }
    get frmOverlapFlag(): boolean{ return this._frmOverlapFlag; }
    set frmOverlapFlag(pfrmOverlapFlag: boolean) { this._frmOverlapFlag = pfrmOverlapFlag ; }
    get toOverlapFlag(): boolean{ return this._toOverlapFlag; }
    set toOverlapFlag(ptoOverlapFlag: boolean) { this._toOverlapFlag = ptoOverlapFlag ; }
    get pFlag(): string { return this._pFlag; }
    set pFlag(ppFlag: string) { this._pFlag = ppFlag ; }
    get overlapCount(): number { return this._overlapCount; }
    set overlapCount(poverlapCount: number) { this._overlapCount = poverlapCount; }
    get rowId(): string { return this.rowId; }
    set rowId(prowId: string) { this.rowId = prowId; }
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime ; }
    get offenderDeductionId(): number { return this._offenderDeductionId; }
    set offenderDeductionId(poffenderDeductionId: number) { this._offenderDeductionId = poffenderDeductionId ;}
    get feeAmount(): any{ return this._feeAmount; }
    set feeAmount(pfeeAmount: any) { this._feeAmount = pfeeAmount ; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId ; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime ; }
    get percentage(): any { return this._percentage; }
    set percentage(ppercentage: any) { this._percentage = ppercentage ; }
    get fromAmount(): any { return this._fromAmount; }
    set fromAmount(pfromAmount: any){ this._fromAmount = pfromAmount ; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId ; }
    get toAmount(): any { return this._toAmount; }
    set toAmount(ptoAmount: any) { this._toAmount = ptoAmount ; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag ; }

toJSON(): any {
    return {
       'createDatetime': this._createDatetime,
       'offenderDeductionId': this._offenderDeductionId,
       'feeAmount': this._feeAmount,
       'serialVersionUID': this._serialVersionUID,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'percentage': this._percentage,
       'fromAmount': this._fromAmount,
       'modifyUserId': this._modifyUserId,
       'toAmount': this._toAmount,
       'sealFlag': this._sealFlag,
       'pFlag': this._pFlag,
       'overlapCount' : this._overlapCount,
       'frmOverlapFlag': this._frmOverlapFlag,
       'toOverlapFlag': this._toOverlapFlag,
       'caseloadId': this._caseloadId,
       'deductionType': this._deductionType,
        };
    }
}
