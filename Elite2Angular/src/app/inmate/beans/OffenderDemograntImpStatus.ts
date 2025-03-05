export class OffenderDemograntImpStatus {
    private _createDatetime: Date ;
    private _createUserId: string;
    private _modifyDatetime: Date ;
    private _ineligibleImprisonmentStatus: string;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _demograntId: number;

    get createDatetime(): Date  { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date  { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }
    get ineligibleImprisonmentStatus(): string { return this._ineligibleImprisonmentStatus; }
    set ineligibleImprisonmentStatus(pineligibleImprisonmentStatus: string)
    { this._ineligibleImprisonmentStatus = pineligibleImprisonmentStatus; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get demograntId(): number { return this._demograntId; }
    set demograntId(pdemograntId: number) { this._demograntId = pdemograntId; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'ineligibleImprisonmentStatus': this._ineligibleImprisonmentStatus,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'demograntId': this._demograntId,
        };
    }
}