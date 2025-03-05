export class OffenderBookingAgyLocs {

    private _additionTime: Date;

    private _createDatetime: Date;

    private _createUserId: string;

    private _modifyDatetime: Date;

    private _modifyUserId: string;

    private _offenderStatus: string;

    private _ptrId: number;

    private _reasonCode: string;

    private _removalComment: string;

    private _removedDate: Date;

    private _removedReasonCode: string;

    private _sealFlag: string;

    private _offenderBookId: number;

    private _caseloadId: string;

    private _agyLocId: string;

    private _additionDate: Date;

    private _additionComment: string;

    private _agyLocDescription: string;

    private _reasonCodeDesc: string;

    private _make: string;

    private _removedDateTemp: Date;

    get removedDateTemp(): Date { return this._removedDateTemp; }
    set removedDateTemp(premovedDateTemp: Date) { this._removedDateTemp = premovedDateTemp; }

    get reasonCodeDesc(): string { return this._reasonCodeDesc; }
    set reasonCodeDesc(preasonCodeDesc: string) { this._reasonCodeDesc = preasonCodeDesc; }

    get agyLocDescription(): string { return this._agyLocDescription; }
    set agyLocDescription(pagyLocDescription: string) { this._agyLocDescription = pagyLocDescription; }

    get additionDate(): Date { return this._additionDate; }
    set additionDate(padditionDate: Date) { this._additionDate = padditionDate; }

    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get removedReasonCode(): string { return this._removedReasonCode; }
    set removedReasonCode(premovedReasonCode: string) { this._removedReasonCode = premovedReasonCode; }

    get removedDate(): Date { return this._removedDate; }
    set removedDate(premovedDate: Date) { this._removedDate = premovedDate; }

    get removalComment(): string { return this._removalComment; }
    set removalComment(premovalComment: string) { this._removalComment = premovalComment; }

    get reasonCode(): string { return this._reasonCode; }
    set reasonCode(preasonCode: string) { this._reasonCode = preasonCode; }

    get ptrId(): number { return this._ptrId; }
    set ptrId(pptrId: number) { this._ptrId = pptrId; }

    get offenderStatus(): string { return this._offenderStatus; }
    set offenderStatus(poffenderStatus: string) { this._offenderStatus = poffenderStatus; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) {
    this._createUserId = pcreateUserId; }

    get additionTime(): Date { return this._additionTime; }
    set additionTime(padditionTime: Date) {
    this._additionTime = padditionTime; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) {
    this._createDatetime = pcreateDatetime; }

    get additionComment(): string { return this._additionComment; }
    set additionComment(padditionComment: string) {
    this._additionComment = padditionComment; }

    get make(): string { return this._make; }
    set make(pmake: string) {
    this._make = pmake; }




    toJSON(): any {
        return {
            'additionTime': this._additionTime,
            'additionComment': this._additionComment,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'offenderStatus': this._offenderStatus,
            'ptrId': this._ptrId,
            'reasonCode': this._reasonCode,
            'removalComment': this._removalComment,
            'removedDate': this._removedDate,
            'removedReasonCode': this._removedReasonCode,
            'sealFlag': this._sealFlag,
            'offenderBookId': this._offenderBookId,
            'caseloadId': this._caseloadId,
            'agyLocId': this._agyLocId,
            'additionDate': this._additionDate,
            'agyLocDescription' : this._agyLocDescription,
            'reasonCodeDesc': this._reasonCodeDesc,
            'make': this._make,

        };
    }
}
