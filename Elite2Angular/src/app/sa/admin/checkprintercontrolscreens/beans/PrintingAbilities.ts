export class PrintingAbilities {
    private _createUserId: string;
    private _printerType: string;
    private _modifyDatetime: Date;
    private _setupFilename: string;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _listSeq: number;
    private _sealFlag: string;
    private _updateAllowedFlag: string;
    private _printFormatCode: string;
    private _activeFlag: string;

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get printerType(): string { return this._printerType; }
    set printerType(pprinterType: string) { this._printerType = pprinterType; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get setupFilename(): string { return this._setupFilename; }
    set setupFilename(psetupFilename: string) { this._setupFilename = psetupFilename; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get updateAllowedFlag(): string { return this._updateAllowedFlag; }
    set updateAllowedFlag(pupdateAllowedFlag: string) { this._updateAllowedFlag = pupdateAllowedFlag; }
    get printFormatCode(): string { return this._printFormatCode; }
    set printFormatCode(pprintFormatCode: string) { this._printFormatCode = pprintFormatCode; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'printerType': this._printerType,
            'modifyDatetime': this._modifyDatetime,
            'setupFilename': this._setupFilename,
            'modifyUserId': this._modifyUserId,
            'createDatetime': this._createDatetime,
            'expiryDate': this._expiryDate,
            'serialVersionUID': this._serialVersionUID,
            'listSeq': this._listSeq,
            'sealFlag': this._sealFlag,
            'updateAllowedFlag': this._updateAllowedFlag,
            'printFormatCode': this._printFormatCode,
            'activeFlag': this._activeFlag,
        };
    }
}
