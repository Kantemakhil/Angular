
export class AutoReconWorktabTmp {

    private _accountCode: number;
    private _caseloadId: string;
    private _bankTypeCode: number;
    private _bankStatementDate: Date;
    private _bankTxnAmount: number;
    private _currentBalance: number;
    private _bankCustomerRefNum: string;
    private _createUserId: string;
    private _modifyUserId: string;
    private _modifyDateTime: Date;
    private _createDateTime: Date;
    private _sealFlag: string;

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get accountCode(): number { return this._accountCode ; }

    set accountCode( paccountCode: number ) { this._accountCode = paccountCode; }

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId( pcaseloadId: string ) { this._caseloadId = pcaseloadId; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId ; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime( pmodifyDateTime: Date ) { this._modifyDateTime = pmodifyDateTime; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime( pcreateDateTime: Date ) { this._createDateTime = pcreateDateTime; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get bankTypeCode(): number { return this._bankTypeCode; }

    set bankTypeCode(pbankTypeCode: number) { this._bankTypeCode = pbankTypeCode; }

    get bankStatementDate(): Date { return this._bankStatementDate; }

    set bankStatementDate( pbankStatementDate: Date ) { this._bankStatementDate = pbankStatementDate; }

    get bankTxnAmount(): number { return this._bankTxnAmount; }

    set bankTxnAmount(pbankTxnAmount: number) { this._bankTxnAmount = pbankTxnAmount; }

    get bankCustomerRefNum(): string { return this._bankCustomerRefNum; }

    set bankCustomerRefNum( pbankCustomerRefNum: string ) { this._bankCustomerRefNum = pbankCustomerRefNum; }

    toJSON(): any {
        return {
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'createUserId': this._createUserId,
            'modifyDateTime': this._modifyDateTime,
            'caseloadId': this._caseloadId,
            'accountCode': this._accountCode,
            'createDateTime': this._createDateTime,
            'bankStatementDate': this._bankStatementDate,
            'bankTxnAmount': this._bankTxnAmount,
            'bankTypeCode': this._bankTypeCode,
            'bankCustomerRefNum': this._bankCustomerRefNum,
        };
    }
}
