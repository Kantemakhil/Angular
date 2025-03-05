export class PersonProfiles {
    private _displaySeq: number;
    private _createDatetime: Date;
    private _createUserId: String;
    private _profileType: String;
    private _modifyDatetime: Date;
    private _modifyUserId: String;
    private _profileCode: String;
    private _personId: number;
    private _profileComment: String;
    private _sealFlag: String;
    private _personProfileId: number;
    private _nbtProfileType: string;
    private _nbtProfileCode: string;

    get displaySeq(): number { return this._displaySeq; }
    set displaySeq(pdisplaySeq: number) { this._displaySeq = pdisplaySeq; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get createUserId(): String { return this._createUserId; }
    set createUserId(pcreateUserId: String) { this._createUserId = pcreateUserId; }
    get profileType(): String { return this._profileType; }
    set profileType(pprofileType: String) { this._profileType = pprofileType; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): String { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: String) { this._modifyUserId = pmodifyUserId; }
    get profileCode(): String { return this._profileCode; }
    set profileCode(pprofileCode: String) { this._profileCode = pprofileCode; }
    get personId(): number { return this._personId; }
    set personId(ppersonId: number) { this._personId = ppersonId; }
    get profileComment(): String { return this._profileComment; }
    set profileComment(pprofileComment: String) { this._profileComment = pprofileComment; }
    get sealFlag(): String { return this._sealFlag; }
    set sealFlag(psealFlag: String) { this._sealFlag = psealFlag; }
    get personProfileId(): number { return this._personProfileId; }
    set personProfileId(ppersonProfileId: number) { this._personProfileId = ppersonProfileId; }
    get nbtProfileType(): string { return this._nbtProfileType; }
    set nbtProfileType(pnbtProfileType: string) { this._nbtProfileType = pnbtProfileType; }
    get nbtProfileCode(): string { return this._nbtProfileCode; }
    set nbtProfileCode(pnbtProfileCode: string) { this._nbtProfileCode = pnbtProfileCode; }

    toJSON(): any {
        return {
            'displaySeq': this._displaySeq,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'profileType': this._profileType,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'profileCode': this._profileCode,
            'personId': this._personId,
            'profileComment': this._profileComment,
            'sealFlag': this._sealFlag,
            'personProfileId': this._personProfileId,
            'nbtProfileType': this._nbtProfileType,
            'nbtProfileCode': this._nbtProfileCode
        };
    }
}
