import {BaseModel} from '@commonbeans/BaseModel';

export class OffenderCipDetails extends BaseModel {
    private _agyLocId: string;
    private _authByPerCode: string;
    private _authByPerName: string;
    private _commentText: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _duration: number;
    private _durationType: string;
    private _effectiveDate: Date;
    private _effectiveTime: Date;
    private _expiryDate: Date;
    private _expiryTime: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _placementReasonCode: string;
    private _placementType: string;
    private _relByPerCode: string;
    private _relByPerName: string;
    private _releaseDate: Date;
    private _releaseTime: Date;
    private _reqByPerCode: string;
    private _reviewDate: Date;
    private _sealFlag: string;
    private _offenderBookId: number;
    private _placementSeq: number;
    private _nbtDaysServed: number;
    private _nbtHoursServed: string;
    private _offenderId: number;
    private _offenderIdDisplay: string;

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get authByPerCode(): string { return this._authByPerCode; }

    set authByPerCode(pauthByPerCode: string) { this._authByPerCode = pauthByPerCode; }

    get authByPerName(): string { return this._authByPerName; }

    set authByPerName(pauthByPerName: string) { this._authByPerName = pauthByPerName; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get duration(): number { return this._duration; }

    set duration(pduration: number) { this._duration = pduration; }

    get durationType(): string { return this._durationType; }

    set durationType(pdurationType: string) { this._durationType = pdurationType; }

    get effectiveDate(): Date { return this._effectiveDate; }

    set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }

    get effectiveTime(): Date { return this._effectiveTime; }

    set effectiveTime(peffectiveTime: Date) { this._effectiveTime = peffectiveTime; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get expiryTime(): Date { return this._expiryTime; }

    set expiryTime(pexpiryTime: Date) { this._expiryTime = pexpiryTime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get placementReasonCode(): string { return this._placementReasonCode; }

    set placementReasonCode(pplacementReasonCode: string) { this._placementReasonCode = pplacementReasonCode; }

    get placementType(): string { return this._placementType; }

    set placementType(pplacementType: string) { this._placementType = pplacementType; }

    get relByPerCode(): string { return this._relByPerCode; }

    set relByPerCode(prelByPerCode: string) { this._relByPerCode = prelByPerCode; }

    get relByPerName(): string { return this._relByPerName; }

    set relByPerName(prelByPerName: string) { this._relByPerName = prelByPerName; }

    get releaseDate(): Date { return this._releaseDate; }

    set releaseDate(preleaseDate: Date) { this._releaseDate = preleaseDate; }

    get releaseTime(): Date { return this._releaseTime; }

    set releaseTime(preleaseTime: Date) { this._releaseTime = preleaseTime; }

    get reqByPerCode(): string { return this._reqByPerCode; }

    set reqByPerCode(preqByPerCode: string) { this._reqByPerCode = preqByPerCode; }

    get reviewDate(): Date { return this._reviewDate; }

    set reviewDate(previewDate: Date) { this._reviewDate = previewDate; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get placementSeq(): number { return this._placementSeq; }

    set placementSeq(pplacementSeq: number) { this._placementSeq = pplacementSeq; }

    get nbtDaysServed(): number { return this._nbtDaysServed; }

    set nbtDaysServed(pnbtDaysServed: number) { this._nbtDaysServed = pnbtDaysServed; }

    get nbtHoursServed(): string { return this._nbtHoursServed; }

    set nbtHoursServed(pnbtHoursServed: string) { this._nbtHoursServed = pnbtHoursServed; }

    get offenderId(): number { return this._offenderId; }

    set offenderId( poffenderId: number ) { this._offenderId = poffenderId; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay( poffenderIdDisplay: string ) { this._offenderIdDisplay = poffenderIdDisplay; }


    toJSON(): any {
        return {
            'agyLocId': this._agyLocId,
            'authByPerCode': this._authByPerCode,
            'authByPerName': this._authByPerName,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'duration': this._duration,
            'durationType': this._durationType,
            'effectiveDate': this._effectiveDate,
            'effectiveTime': this._effectiveTime,
            'expiryDate': this._expiryDate,
            'expiryTime': this._expiryTime,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'placementReasonCode': this._placementReasonCode,
            'placementType': this._placementType,
            'relByPerCode': this._relByPerCode,
            'relByPerName': this._relByPerName,
            'releaseDate': this._releaseDate,
            'releaseTime': this._releaseTime,
            'reqByPerCode': this._reqByPerCode,
            'reviewDate': this._reviewDate,
            'sealFlag': this._sealFlag,
            'offenderBookId': this._offenderBookId,
            'placementSeq': this._placementSeq,
            'nbtDaysServed' : this._nbtDaysServed,
            'nbtHoursServed' : this._nbtHoursServed,
            'offenderId': this._offenderId,
            'offenderIdDisplay': this._offenderIdDisplay,

        };
    }
}
