export class CaseloadDeductionDetails {

    private _createDatetime: Date;
    private _createUserId: string;
    private _flatRate: number;
    private _listSeq: number;
    private _minimumTrustBalanceFlag: string;
    private _modifyDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _percentage: number;
    private _sealFlag: string;
    private _caseloadId: string;
    private _deductionType: string;
    private _receiptTxnType: string;
    private _offenderDeductionId: number;
    private _nbtModifyUserId: string;
    private _foFlag: string;
    private _dialogFlg: string;
    private _rowId: string;
    private _caseloadType: string;
    private _offenderFeeId: number;
    private _offenderBookId: number;
    private _receiptPercent: number;
    private _offFeeDedReceiptId: number;

    public get rowId(): string {
        return this._rowId;
    }
    public set rowId(value: string) {
        this._rowId = value;
    }
    get dialogFlg(): string { return this._dialogFlg; }
    set dialogFlg(pdialogFlg: string) { this._dialogFlg = pdialogFlg; }
    get foFlag(): string { return this._foFlag; }
    set foFlag(pfoFlag: string) { this._foFlag = pfoFlag; }
    get nbtModifyUserId(): string { return this._nbtModifyUserId; }
    set nbtModifyUserId(pnbtModifyUserId: string) { this._nbtModifyUserId = pnbtModifyUserId; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get flatRate(): number { return this._flatRate; }
    set flatRate(pflatRate: number) { this._flatRate = pflatRate; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get minimumTrustBalanceFlag(): string { return this._minimumTrustBalanceFlag; }
    set minimumTrustBalanceFlag(pminimumTrustBalanceFlag: string) { this._minimumTrustBalanceFlag = pminimumTrustBalanceFlag; }
    get modifyDate(): Date { return this._modifyDate; }
    set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get percentage(): number { return this._percentage; }
    set percentage(ppercentage: number) { this._percentage = ppercentage; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get deductionType(): string { return this._deductionType; }
    set deductionType(pdeductionType: string) { this._deductionType = pdeductionType; }
    get receiptTxnType(): string { return this._receiptTxnType; }
    set receiptTxnType(preceiptTxnType: string) { this._receiptTxnType = preceiptTxnType; }
    get offenderDeductionId(): number { return this._offenderDeductionId; }

    set offenderDeductionId(poffenderDeductionId: number) { this._offenderDeductionId = poffenderDeductionId; }
    get caseloadType(): string { return this._caseloadType; }
    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }

    get offenderFeeId(): number { return this._offenderFeeId; }
    set offenderFeeId(poffenderFeeId: number) { this._offenderFeeId = poffenderFeeId ; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get receiptPercent(): number { return this._receiptPercent; }
    set receiptPercent(preceiptPercent: number) { this._receiptPercent = preceiptPercent; }


    get offFeeDedReceiptId(): number { return this._offFeeDedReceiptId; }
    set offFeeDedReceiptId(poffFeeDedReceiptId: number) { this._offFeeDedReceiptId = poffFeeDedReceiptId; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'flatRate': this._flatRate,
            'listSeq': this._listSeq,
            'minimumTrustBalanceFlag': this._minimumTrustBalanceFlag,
            'modifyDate': this._modifyDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'percentage': this._percentage,
            'sealFlag': this._sealFlag,
            'caseloadId': this._caseloadId,
            'deductionType': this._deductionType,
            'receiptTxnType': this._receiptTxnType,
            'offenderDeductionId': this._offenderDeductionId,
            'nbtModifyUserId': this._nbtModifyUserId,
            'foFlag': this._foFlag,
            'dialogFlg' : this._dialogFlg,
            'rowId': this._rowId,
            'caseloadType': this._caseloadType,
            'offenderBookId': this._offenderBookId,
            'offenderFeeId': this._offenderFeeId,
            'receiptPercent':this._receiptPercent,
            'offFeeDedReceiptId': this._offFeeDedReceiptId

        };
    }
}
