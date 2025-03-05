export class MinimumPayableBalances {

    private _accountCode: number;
    private _createDatetime: Date;
    private _createUserId: string;
    private _minPayAmount: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _dspAccountName: string;
    private _caseloadType: string;

    get caseloadType(): string {
        return this._caseloadType;
    }

    set caseloadType(pcaseloadType: string) {
        this._caseloadType = pcaseloadType;
    }

    get accountCode(): number {
        return this._accountCode;
    }

    set accountCode(paccountCode: number) {
        this._accountCode = paccountCode;
    }

    get createDatetime(): Date {
        return this._createDatetime;
    }

    set createDatetime(pcreateDatetime: Date) {
        this._createDatetime = pcreateDatetime;
    }
    get createUserId(): string {
        return this._createUserId;
    }

    set createUserId(pcreateUserId: string) {
        this._createUserId = pcreateUserId;
    }
    get minPayAmount(): number {
        return this._minPayAmount;
    }

    set minPayAmount(pminPayAmount: number) {
        this._minPayAmount = pminPayAmount;
    }
    get modifyDatetime(): Date {
        return this._modifyDatetime;
    }

    set modifyDatetime(pmodifyDatetime: Date) {
        this._modifyDatetime = pmodifyDatetime;
    }
    get modifyUserId(): string {
        return this._modifyUserId;
    }

    set modifyUserId(pmodifyUserId: string) {
        this._modifyUserId = pmodifyUserId;
    }
    get sealFlag(): string {
        return this._sealFlag;
    }

    set sealFlag(psealFlag: string) {
        this._sealFlag = psealFlag;
    }
    get dspAccountName(): string {
        return this._dspAccountName;
    }

    set dspAccountName(pdspAccountName: string) {
        this._dspAccountName = pdspAccountName;
    }

    toJSON(): any {
        return {
            'accountCode': this._accountCode,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'minPayAmount': this._minPayAmount,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'dspAccountName': this._dspAccountName,
            'caseloadType': this._caseloadType
        };
    }

}
