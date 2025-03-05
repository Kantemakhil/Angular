
export class CaseloadAdmAlertProfiles {
    private _createUserId: string;
    private _alertType: string;
    private _alertCode: string;
    private _messageNumber: number;
    private _modifyUserId: string;
    private _errorMessage: string;
    private _rootOffenderId: number;
    private _createDatetime: Date;
    private _inserted: number;
    private _modifyDatetime: Date;
    private _applnCode: string;
    private _caseloadId: string;
    private _sealFlag: string;
    private _messNum: string;
    private _rowId:string;
	private _messageText: string;
    

    get rowId(): string { return this._rowId; }
    set rowId(prowId: string) { this._rowId = prowId; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get alertType(): string { return this._alertType; }
    set alertType(palertType: string) { this._alertType = palertType; }
    get alertCode(): string { return this._alertCode; }
    set alertCode(palertCode: string) { this._alertCode = palertCode; }
    get messageNumber(): number { return this._messageNumber; }
    set messageNumber(pmessageNumber: number) { this._messageNumber = pmessageNumber; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get errorMessage(): string { return this._errorMessage; }
    set errorMessage(perrorMessage: string) { this._errorMessage = perrorMessage; }
    get rootOffenderId(): number { return this._rootOffenderId; }
    set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get inserted(): number { return this._inserted; }
    set inserted(pinserted: number) { this._inserted = pinserted; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get applnCode(): string { return this._applnCode; }
    set applnCode(papplnCode: string) { this._applnCode = papplnCode; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get messNum(): string { return this._messNum; }
    set messNum(pmessNum: string) { this._messNum = pmessNum; }
    public get messageText(): string { return this._messageText;  }
    public set messageText(value: string) { this._messageText = value;}

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'alertType': this._alertType,
            'alertCode': this._alertCode,
            'messageNumber': this._messageNumber,
            'modifyUserId': this._modifyUserId,
            'errorMessage': this._errorMessage,
            'rootOffenderId': this._rootOffenderId,
            'createDatetime': this._createDatetime,
            'inserted': this._inserted,
            'modifyDatetime': this._modifyDatetime,
            'applnCode': this._applnCode,
            'caseloadId': this._caseloadId,
            'sealFlag': this._sealFlag,
            'messNum': this._messNum,
            'rowId': this._rowId,
            'messageText': this._messageText
        };
    }
}