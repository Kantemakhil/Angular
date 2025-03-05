
export class LegalUpdateReasons {
    private _activeFlag: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _description: string;
    private _expiryDate: Date;
    private _listSeq: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _updateReasonCode: string;
    private _activeType: string;
    private _effectiveDate: Date; 
    private _reasonCategory: string;
    private _code: string;
    private _returnValue: number;
    private _deleteRecordCountData: number;

    private _nbtReasonCategory: string;
    private _nbtActiveType: string;

    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) {
    this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }


    get effectiveDate(): Date { return this._effectiveDate; }
    set effectiveDate(peffectiveDate: Date) {
    this._effectiveDate = peffectiveDate; }

        get updateReasonCode(): string { return this._updateReasonCode; }
        set updateReasonCode(pupdateReasonCode: string) { this._updateReasonCode = pupdateReasonCode; }

        get activeType(): string { return this._activeType; }
        set activeType(pactiveType: string) { this._activeType = pactiveType; }

        get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) {
    this._expiryDate = pexpiryDate; }
        

        get listSeq(): number { return this._listSeq; }
        set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

        get modifyDatetime(): Date { return this._modifyDatetime; }
        set modifyDatetime(pmodifyDatetime: Date) {
        this._modifyDatetime = pmodifyDatetime; }

        get modifyUserId(): string { return this._modifyUserId; }
        set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

        get reasonCategory(): string { return this._reasonCategory; }
        set reasonCategory(preasonCategory: string) { this._reasonCategory = preasonCategory; }

        get sealFlag(): string { return this._sealFlag; }
        set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

        get code(): string { return this._code; }
        set code(pcode: string) { this._code = pcode; }

        get nbtReasonCategory(): string { return this._nbtReasonCategory; }
        set nbtReasonCategory(pnbtReasonCategory: string) { this._nbtReasonCategory = pnbtReasonCategory; }

        get nbtActiveType(): string { return this._nbtActiveType; }
        set nbtActiveType(pnbtActiveType: string) { this._nbtActiveType = pnbtActiveType; }
        get returnValue(): number { return this._returnValue; }
        set returnValue(preturnValue: number) { this._returnValue = preturnValue; }
        get deleteRecordCountData(): number { return this._deleteRecordCountData; }
        set deleteRecordCountData(pdeleteRecordCountData: number) { this._deleteRecordCountData = pdeleteRecordCountData; }
    toJSON(): any {
        return {
            'activeFlag': this._activeFlag,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'description': this._description,
            'expiryDate': this._expiryDate,
            'updateReasonCode': this._updateReasonCode,
            'activeType': this._activeType,
            'effectiveDate': this._effectiveDate,
            'listSeq': this._listSeq,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'reasonCategory': this._reasonCategory,
            'sealFlag': this._sealFlag,
            'code': this._code,
            'nbtReasonCategory': this._nbtReasonCategory,
            'nbtActiveType': this._nbtActiveType,
            'returnValue': this._returnValue,
            'deleteRecordCountData': this._deleteRecordCountData,
        };
    }

}