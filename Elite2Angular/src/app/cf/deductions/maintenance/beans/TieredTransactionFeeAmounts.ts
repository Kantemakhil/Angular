export class TieredTransactionFeeAmounts {
    private _createDatetime: Date;
    private _feeAmount: number;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _percentage: number;
    private _caseloadId: string;
    private _deductionType: string;
    private _fromAmount: number;
    private _modifyUserId: string;
    private _toAmount: number;
    private _sealFlag: string;
    private _returnValue: number;
    private _rowId: string;
    private _pFlag: string;
    private _overlapCount: number;
    private _frmOverlapFlag: boolean;
    private _toOverlapFlag: boolean;

    get frmOverlapFlag(): boolean{ return this._frmOverlapFlag; }
    set frmOverlapFlag(pfrmOverlapFlag: boolean) { this._frmOverlapFlag = pfrmOverlapFlag ; }
    get toOverlapFlag(): boolean{ return this._toOverlapFlag; }
    set toOverlapFlag(ptoOverlapFlag: boolean) { this._toOverlapFlag = ptoOverlapFlag ; }
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime ; }
    get feeAmount(): number { return this._feeAmount; }
    set feeAmount(pfeeAmount: number) { this._feeAmount = pfeeAmount ; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID ; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId ; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime ; }
    get percentage(): number { return this._percentage; }
    set percentage(ppercentage: number) { this._percentage = ppercentage ; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId ; }
    get deductionType(): string { return this._deductionType; }
    set deductionType(pdeductionType: string) { this._deductionType = pdeductionType ; }
    get fromAmount(): number { return this._fromAmount; }
    set fromAmount(pfromAmount: number) { this._fromAmount = pfromAmount ; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId ; }
    get toAmount(): number { return this._toAmount; }
    set toAmount(ptoAmount: number) { this._toAmount = ptoAmount ; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag ; }
    get returnValue(): number { return this._returnValue; }
    set returnValue(preturnValue: number) { this._returnValue = preturnValue; }
    get rowId(): string { return this._rowId; }
    set rowId(prowId: string) { this._rowId = prowId; }
    get pFlag(): string { return this._pFlag; }
    set pFlag(ppFlag: string) { this._pFlag = ppFlag ; }
    get overlapCount(): number { return this._overlapCount; }
    set overlapCount(poverlapCount: number) { this._overlapCount = poverlapCount; }
toJSON(): any {
    return { 
       'createDatetime': this._createDatetime,
       'feeAmount': this._feeAmount,
       'serialVersionUID': this._serialVersionUID,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'percentage': this._percentage,
       'caseloadId': this._caseloadId,
       'deductionType': this._deductionType,
       'fromAmount': this._fromAmount,
       'modifyUserId': this._modifyUserId,
       'toAmount': this._toAmount,
       'sealFlag': this._sealFlag,
       'returnValue': this._returnValue,
       'rowId': this._rowId,
       'pFlag': this._pFlag,
       'overlapCount' : this._overlapCount,
       'frmOverlapFlag': this._frmOverlapFlag,
       'toOverlapFlag': this._toOverlapFlag
        };
    }  
}
