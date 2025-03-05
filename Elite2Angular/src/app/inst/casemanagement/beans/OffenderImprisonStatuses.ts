export class OffenderImprisonStatuses {

    private _offenderBookId: number;
    private _imprisonStatusSeq: number;
    private _imprisonmentStatus: string;
    private _oldImprisonmentStatus: string;
    private _effectiveDate: Date;
    private _effectiveTime: Date;
    private _expiryDate: Date;
    private _agyLocId: string;
    private _createDate: Date;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _state: string;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _commentText: string;
    private _errorFlag: string;
    private _activeFlag: string;
    private _globalCaseloadId: string;

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get imprisonStatusSeq(): number { return this._imprisonStatusSeq; }
    set imprisonStatusSeq(pimprisonStatusSeq: number) { this._imprisonStatusSeq = pimprisonStatusSeq; }
    get imprisonmentStatus(): string { return this._imprisonmentStatus; }
    set imprisonmentStatus(pimprisonmentStatus: string) { this._imprisonmentStatus = pimprisonmentStatus; }
    get effectiveDate(): Date { return this._effectiveDate; }
    set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }
    get effectiveTime(): Date { return this._effectiveTime; }
    set effectiveTime(peffectiveTime: Date) { this._effectiveTime = peffectiveTime; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    get createDate(): Date { return this._createDate; }
    set createDate(pcreateDate: Date) { this._createDate = pcreateDate; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get errorFlag(): string { return this._errorFlag; }
    set errorFlag(perrorFlag: string) { this._errorFlag = perrorFlag; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get state(): string { return this._state; }
    set state(pstate: string) { this._state = pstate; }
    get globalCaseloadId(): string { return this._globalCaseloadId; }
    set globalCaseloadId(pglobalCaseloadId: string) { this._globalCaseloadId = pglobalCaseloadId; }
    get oldImprisonmentStatus(): string { return this._oldImprisonmentStatus; }
    set oldImprisonmentStatus(poldImprisonmentStatus: string) { this._oldImprisonmentStatus = poldImprisonmentStatus; }
    toJSON(): any {
        return {
            'offenderBookId': this._offenderBookId,
            'errorFlag': this._errorFlag,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'createDate': this._createDate,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'commentText': this._commentText,
            'state': this._state,
            'imprisonStatusSeq': this._imprisonStatusSeq,
            'imprisonmentStatus': this._imprisonmentStatus,
            'effectiveDate': this._effectiveDate,
            'effectiveTime': this._effectiveTime,
            'expiryDate': this._expiryDate,
            'agyLocId': this._agyLocId,
            'activeFlag': this._activeFlag,
            'globalCaseloadId': this._globalCaseloadId,
            'oldImprisonmentStatus': this._oldImprisonmentStatus
        };
    }
}
