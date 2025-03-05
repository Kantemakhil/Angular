import { BaseModel } from '@commonbeans/BaseModel';

export class OicHearings extends BaseModel {
    private _eventId: number;
    private _scheduleTime: number;
    private _visitJusticeText: string;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _hearingDate: Date;
    private _hearingDateTmp: Date;
    private _tapeNumber: string;
    private _modifyUserId: string;
    private _commentText: string;
    private _hearingTime: Date;
    private _hearingTimeTemp: string;
    private _createDatetime: Date;
    private _oicHearingType: string;
    private _oicHearingId: number;
    private _hearingStaffId: number;
    private _eventStatus: string;
    private _oicIncidentId: number;
    private _scheduleDate: number;
    private _sealFlag: string;
    private _internalLocationId: number;
    private _representativeText: string;
    private _oicHearingDisable: boolean;
    private _oicNoticeDisable: boolean;
    private _oicHearingTypeDes: string;
    private _internalLocationIdDes: string;
    private _hearingStaffIdDes: string;
    private _hearByBtn: string;
    private _offenderBookId: number;
    private _listSeq: number;
    
    get offenderBookId(): number { return this.offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get oicHearingDisable(): boolean { return this._oicHearingDisable; }

    set oicHearingDisable(poicHearingDisable: boolean) { this._oicHearingDisable = poicHearingDisable; }

    get oicNoticeDisable(): boolean { return this._oicNoticeDisable; }

    set oicNoticeDisable(poicNoticeDisable: boolean) { this._oicNoticeDisable = poicNoticeDisable; }

    get eventId(): number { return this._eventId; }

    set eventId(peventId: number) { this._eventId = peventId; }

    get scheduleTime(): number { return this._scheduleTime; }

    set scheduleTime(pscheduleTime: number) { this._scheduleTime = pscheduleTime; }

    get visitJusticeText(): string { return this._visitJusticeText; }

    set visitJusticeText(pvisitJusticeText: string) { this._visitJusticeText = pvisitJusticeText; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get hearingDate(): Date { return this._hearingDate; }

    set hearingDate(phearingDate: Date) { this._hearingDate = phearingDate; }

    get hearingDateTmp(): Date { return this._hearingDateTmp; }

    set hearingDateTmp(phearingDateTmp: Date) { this._hearingDateTmp = phearingDateTmp; }

    get tapeNumber(): string { return this._tapeNumber; }

    set tapeNumber(ptapeNumber: string) { this._tapeNumber = ptapeNumber; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get hearingTime(): Date { return this._hearingTime; }

    set hearingTime(phearingTime: Date) { this._hearingTime = phearingTime; }

    get hearingTimeTemp(): string { return this._hearingTimeTemp; }

    set hearingTimeTemp(phearingTimeTemp: string) { this._hearingTimeTemp = phearingTimeTemp; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get oicHearingType(): string { return this._oicHearingType; }

    set oicHearingType(poicHearingType: string) { this._oicHearingType = poicHearingType; }

    get oicHearingId(): number { return this._oicHearingId; }

    set oicHearingId(poicHearingId: number) { this._oicHearingId = poicHearingId; }

    get hearingStaffId(): number { return this._hearingStaffId; }

    set hearingStaffId(phearingStaffId: number) { this._hearingStaffId = phearingStaffId; }

    get eventStatus(): string { return this._eventStatus; }

    set eventStatus(peventStatus: string) { this._eventStatus = peventStatus; }

    get oicIncidentId(): number { return this._oicIncidentId; }

    set oicIncidentId(poicIncidentId: number) { this._oicIncidentId = poicIncidentId; }

    get scheduleDate(): number { return this._scheduleDate; }

    set scheduleDate(pscheduleDate: number) { this._scheduleDate = pscheduleDate; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get internalLocationId(): number { return this._internalLocationId; }

    set internalLocationId(pinternalLocationId: number) { this._internalLocationId = pinternalLocationId; }

    get representativeText(): string { return this._representativeText; }

    set representativeText(prepresentativeText: string) { this._representativeText = prepresentativeText; }

    get oicHearingTypeDes(): string { return this._oicHearingTypeDes; }

    set oicHearingTypeDes(poicHearingTypeDes: string) { this._oicHearingTypeDes = poicHearingTypeDes; }

    get internalLocationIdDes(): string { return this._internalLocationIdDes; }

    set internalLocationIdDes(pinternalLocationIdDes: string) { this._internalLocationIdDes = pinternalLocationIdDes; }

    get hearingStaffIdDes(): string { return this._hearingStaffIdDes; }

    set hearingStaffIdDes(phearingStaffIdDes: string) { this._hearingStaffIdDes = phearingStaffIdDes; }

    get hearByBtn(): string { return this._hearByBtn; }

    set hearByBtn(phearByBtn: string) { this._hearByBtn = phearByBtn; }

    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    toJSON(): any {
        return {
            'eventId': this._eventId,
            'scheduleTime': this._scheduleTime,
            'visitJusticeText': this._visitJusticeText,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'hearingDate': this._hearingDate,
            'tapeNumber': this._tapeNumber,
            'modifyUserId': this._modifyUserId,
            'commentText': this._commentText,
            'hearingTime': this._hearingTime,
            'createDatetime': this._createDatetime,
            'oicHearingType': this._oicHearingType,
            'oicHearingId': this._oicHearingId,
            'hearingStaffId': this._hearingStaffId,
            'eventStatus': this._eventStatus,
            'oicIncidentId': this._oicIncidentId,
            'scheduleDate': this._scheduleDate,
            'sealFlag': this._sealFlag,
            'internalLocationId': this._internalLocationId,
            'representativeText': this._representativeText,
            'oicHearingTypeDes': this._oicHearingTypeDes,
            'internalLocationIdDes': this._internalLocationIdDes,
            'hearingStaffIdDes': this._hearingStaffIdDes,
            'hearByBtn': this._hearByBtn,
            'offenderBookId': this._offenderBookId,
            'listSeq': this._listSeq
        };
    }
}
