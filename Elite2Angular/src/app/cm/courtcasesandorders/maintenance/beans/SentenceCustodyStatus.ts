

export class SentenceCustodyStatus {
    private _activeFlag: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _description: string;
    private _expiryDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _sentenceType: string;
    private _sentenceCategory: string;
    private _sentenceCalcType: string;
    private _sentenceOrderStatus: string;
    private _custodyStatus: string;
    private _legalClass: string;
    private _sentenceOrderStatusTemp: string;
    private _sentenceCustodyStatusTemp: string;
    public get custodyStatus(): string {
        return this._custodyStatus;
    }
    public set custodyStatus(value: string) {
        this._custodyStatus = value;
    }
    public get legalClass(): string {
        return this._legalClass;
    }
    public set legalClass(value: string) {
        this._legalClass = value;
    }
    public get sentenceCustodyStatusTemp(): string {
        return this._sentenceCustodyStatusTemp;
    }
    public set sentenceCustodyStatusTemp(value: string) {
        this._sentenceCustodyStatusTemp = value;
    }
    public get sentenceOrderStatusTemp(): string {
        return this._sentenceOrderStatusTemp;
    }
    public set sentenceOrderStatusTemp(value: string) {
        this._sentenceOrderStatusTemp = value;
    }
    public get sentenceOrderStatus(): string {
        return this._sentenceOrderStatus;
    }
    public set sentenceOrderStatus(value: string) {
        this._sentenceOrderStatus = value;
    }



    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) {
        this._createDatetime = pcreateDatetime;
    }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }


    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) {
        this._expiryDate = pexpiryDate;
    }


    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) {
        this._modifyDatetime = pmodifyDatetime;
    }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }


    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get sentenceType(): string { return this._sentenceType; }
    set sentenceType(psentenceType: string) { this._sentenceType = psentenceType; }

    get sentenceCategory(): string { return this._sentenceCategory; }
    set sentenceCategory(psentenceCategory: string) { this._sentenceCategory = psentenceCategory; }

    get sentenceCalcType(): string { return this._sentenceCalcType; }
    set sentenceCalcType(psentenceCalcType: string) { this._sentenceCalcType = psentenceCalcType; }


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
            'sentenceType': this._sentenceType,
            'sentenceCategory': this._sentenceCategory,
            'sentenceCalcType': this._sentenceCalcType,
            'sentenceOrderStatus' :this.sentenceOrderStatus,
            'sentenceOrderStatusTemp' :this._sentenceOrderStatusTemp,
            'sentenceCustodyStatusTemp' :this._sentenceCustodyStatusTemp,
            'legalClass' :this._legalClass,
            'custodyStatus':this._custodyStatus
        };
    }
}
