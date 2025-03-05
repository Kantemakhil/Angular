import { BaseModel } from '@commonbeans/BaseModel';

export class BankReconAudits extends BaseModel {
    private _bookOutstandingCount: number;
    private _createUserId: string;
    private _clearingDiscrepancy: number;
    private _closingBookBalance: number;
    private _bookOutstandingAmount: number;
    private _modifyUserId: string;
    private _glOpenBal: number;
    private _adjustmentGlNumber: number;
    private _amntPlusComment: string;
    private _bankClearedCount: number;
    private _serialVersionUID: number;
    private _bankUnpostedCount: number;
    private _balanceDiscrepancy: number;
    private _amntPlusAdj: number;
    private _sealFlag: string;
    private _createDate: Date;
    private _adjustmentComment: string;
    private _bookClearedCount: number;
    private _adjBookBal: number;
    private _amntLessAdj: number;
    private _bankBalance: number;
    private _bankStatementStatus: string;
    private _reconId: number;
    private _reconDatetime: Date;
    private _createDateTime: Date;
    private _amntLessComment: string;
    private _modifyDateTime: Date;
    private _bankClearedAmount: number;
    private _closingBankBalance: number;
    private _listSeq: number;
    private _bankStatementDate: Date;
    private _bankUnpostedAmount: number;
    private _reconUserId: string;
    private _bookClearedAmount: number;
    private _status: string;
    private _accountCode: number;
    private _caseloadId: string;

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get accountCode(): number { return this._accountCode; }

    set accountCode(paccountCode: number) { this._accountCode = paccountCode; }

    get bookOutstandingCount(): number { return this._bookOutstandingCount; }

    set bookOutstandingCount(pbookOutstandingCount: number) { this._bookOutstandingCount = pbookOutstandingCount; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get clearingDiscrepancy(): number { return this._clearingDiscrepancy; }

    set clearingDiscrepancy(pclearingDiscrepancy: number) { this._clearingDiscrepancy = pclearingDiscrepancy; }

    get closingBookBalance(): number { return this._closingBookBalance; }

    set closingBookBalance(pclosingBookBalance: number) { this._closingBookBalance = pclosingBookBalance; }

    get bookOutstandingAmount(): number { return this._bookOutstandingAmount; }

    set bookOutstandingAmount(pbookOutstandingAmount: number) { this._bookOutstandingAmount = pbookOutstandingAmount; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get glOpenBal(): number { return this._glOpenBal; }

    set glOpenBal(pglOpenBal: number) { this._glOpenBal = pglOpenBal; }

    get adjustmentGlNumber(): number { return this._adjustmentGlNumber; }

    set adjustmentGlNumber(padjustmentGlNumber: number) { this._adjustmentGlNumber = padjustmentGlNumber; }

    get amntPlusComment(): string { return this._amntPlusComment; }

    set amntPlusComment(pamntPlusComment: string) { this._amntPlusComment = pamntPlusComment; }

    get bankClearedCount(): number { return this._bankClearedCount; }

    set bankClearedCount(pbankClearedCount: number) { this._bankClearedCount = pbankClearedCount; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get bankUnpostedCount(): number { return this._bankUnpostedCount; }

    set bankUnpostedCount(pbankUnpostedCount: number) { this._bankUnpostedCount = pbankUnpostedCount; }

    get balanceDiscrepancy(): number { return this._balanceDiscrepancy; }

    set balanceDiscrepancy(pbalanceDiscrepancy: number) { this._balanceDiscrepancy = pbalanceDiscrepancy; }

    get amntPlusAdj(): number { return this._amntPlusAdj; }

    set amntPlusAdj(pamntPlusAdj: number) { this._amntPlusAdj = pamntPlusAdj; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get createDate(): Date { return this._createDate; }

    set createDate(pcreateDate: Date) { this._createDate = pcreateDate; }

    get adjustmentComment(): string { return this._adjustmentComment; }

    set adjustmentComment(padjustmentComment: string) { this._adjustmentComment = padjustmentComment; }

    get bookClearedCount(): number { return this._bookClearedCount; }

    set bookClearedCount(pbookClearedCount: number) { this._bookClearedCount = pbookClearedCount; }

    get adjBookBal(): number { return this._adjBookBal; }

    set adjBookBal(padjBookBal: number) { this._adjBookBal = padjBookBal; }

    get amntLessAdj(): number { return this._amntLessAdj; }

    set amntLessAdj(pamntLessAdj: number) { this._amntLessAdj = pamntLessAdj; }

    get bankBalance(): number { return this._bankBalance; }

    set bankBalance(pbankBalance: number) { this._bankBalance = pbankBalance; }

    get bankStatementStatus(): string { return this._bankStatementStatus; }

    set bankStatementStatus(pbankStatementStatus: string) { this._bankStatementStatus = pbankStatementStatus; }

    get reconId(): number { return this._reconId; }

    set reconId(preconId: number) { this._reconId = preconId; }

    get reconDatetime(): Date { return this._reconDatetime; }

    set reconDatetime(preconDatetime: Date) { this._reconDatetime = preconDatetime; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }

    get amntLessComment(): string { return this._amntLessComment; }

    set amntLessComment(pamntLessComment: string) { this._amntLessComment = pamntLessComment; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

    get bankClearedAmount(): number { return this._bankClearedAmount; }

    set bankClearedAmount(pbankClearedAmount: number) { this._bankClearedAmount = pbankClearedAmount; }

    get closingBankBalance(): number { return this._closingBankBalance; }

    set closingBankBalance(pclosingBankBalance: number) { this._closingBankBalance = pclosingBankBalance; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get bankStatementDate(): Date { return this._bankStatementDate; }

    set bankStatementDate(pbankStatementDate: Date) { this._bankStatementDate = pbankStatementDate; }

    get bankUnpostedAmount(): number { return this._bankUnpostedAmount; }

    set bankUnpostedAmount(pbankUnpostedAmount: number) { this._bankUnpostedAmount = pbankUnpostedAmount; }

    get reconUserId(): string { return this._reconUserId; }

    set reconUserId(preconUserId: string) { this._reconUserId = preconUserId; }

    get bookClearedAmount(): number { return this._bookClearedAmount; }

    set bookClearedAmount(pbookClearedAmount: number) { this._bookClearedAmount = pbookClearedAmount; }

    get status(): string { return this._status; }

    set status(pstatus: string) { this._status = pstatus; }


    toJSON(): any {
        return {
            'bookOutstandingCount': this._bookOutstandingCount,
            'createUserId': this._createUserId,
            'clearingDiscrepancy': this._clearingDiscrepancy,
            'closingBookBalance': this._closingBookBalance,
            'bookOutstandingAmount': this._bookOutstandingAmount,
            'modifyUserId': this._modifyUserId,
            'glOpenBal': this._glOpenBal,
            'adjustmentGlNumber': this._adjustmentGlNumber,
            'amntPlusComment': this._amntPlusComment,
            'bankClearedCount': this._bankClearedCount,
            'serialVersionUID': this._serialVersionUID,
            'bankUnpostedCount': this._bankUnpostedCount,
            'balanceDiscrepancy': this._balanceDiscrepancy,
            'amntPlusAdj': this._amntPlusAdj,
            'sealFlag': this._sealFlag,
            'createDate': this._createDate,
            'adjustmentComment': this._adjustmentComment,
            'bookClearedCount': this._bookClearedCount,
            'adjBookBal': this._adjBookBal,
            'amntLessAdj': this._amntLessAdj,
            'bankBalance': this._bankBalance,
            'bankStatementStatus': this._bankStatementStatus,
            'reconId': this._reconId,
            'reconDatetime': this._reconDatetime,
            'createDateTime': this._createDateTime,
            'amntLessComment': this._amntLessComment,
            'modifyDateTime': this._modifyDateTime,
            'bankClearedAmount': this._bankClearedAmount,
            'closingBankBalance': this._closingBankBalance,
            'listSeq': this._listSeq,
            'bankStatementDate': this._bankStatementDate,
            'bankUnpostedAmount': this._bankUnpostedAmount,
            'reconUserId': this._reconUserId,
            'bookClearedAmount': this._bookClearedAmount,
            'status': this._status,
            'accountCode': this._accountCode,
            'caseloadId': this._caseloadId
        };
    }
}
