 export class SentenceUpdateReasons{
    private _activeFlag: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _description: string;
    private _expiryDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _sentenceCategory: string;
    private _sentenceCalcType: string;
   private _legalClass: string;
    private _updateReasonCode: string;
private _nbtStatusDesc:string;
get legalClass(): string { return this._legalClass; }
    set legalClass(plegalClass: string) { this._legalClass = plegalClass; }

    get updateReasonCode(): string { return this._updateReasonCode; }
    set updateReasonCode(pupdateReasonCode: string) { this._updateReasonCode = pupdateReasonCode; }

    // private _sentenceTerms: Array<SentenceTerms>;
    // private _sentenceUpdateReasons: Array<SentenceUpdateReasons>;

    // private List<SentenceTerms> sentenceTerms;

// // bi-directional many-to-one association to SentenceUpdateReason
// private List<SentenceUpdateReasons> sentenceUpdateReasons;

    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) {
    this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }


    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) {
    this._expiryDate = pexpiryDate; }


        get modifyDatetime(): Date { return this._modifyDatetime; }
        set modifyDatetime(pmodifyDatetime: Date) {
        this._modifyDatetime = pmodifyDatetime; }

        get modifyUserId(): string { return this._modifyUserId; }
        set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }


        get sentenceCategory(): string { return this._sentenceCategory; }
        set sentenceCategory(psentenceCategory: string) { this._sentenceCategory = psentenceCategory; }

        get sentenceCalcType(): string { return this._sentenceCalcType; }
        set sentenceCalcType(psentenceCalcType: string) { this._sentenceCalcType = psentenceCalcType; }

        get nbtStatusDesc(): string { return this._nbtStatusDesc; }
        set nbtStatusDesc(pnbtStatusDesc: string) { this._nbtStatusDesc = pnbtStatusDesc; }

    toJSON(): any {
        return {
            'activeFlag': this._activeFlag,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'description': this._description,
            'expiryDate': this._expiryDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'sentenceCategory': this._sentenceCategory,
            'sentenceCalcType': this._sentenceCalcType,
            'legalClass':  this._legalClass,
            'updateReasonCode': this._updateReasonCode,
            'nbtStatusDesc': this._nbtStatusDesc,

        };
    }
}