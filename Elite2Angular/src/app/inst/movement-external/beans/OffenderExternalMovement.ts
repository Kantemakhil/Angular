import {BaseModel} from '@commonbeans/BaseModel';
//import {MovementReason} from '@instmovementexternalbeans/MovementReason';
//import {OffenderBookings} from '@instmovementexternalbeans/OffenderBookings';

export class OffenderExternalMovement extends BaseModel {

    private _activeFlag: string;
    private _applicationDate: Date;
    private _applicationTime: Date;
    private _arrestAgencyLocId: string;
    private _commentText: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _directionCode: string;
    private _escortCode: string;
    private _escortText: string;
    private _eventId: number;
    private _fromAddressId: number;
    private _fromAgyLocId: string;
    private _fromCity: string;
    private _internalScheduleReasonCode: string;
    private _internalScheduleType: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _movementDate: Date;
    private _movementTime: Date;
    private _ojLocationCode: string;
    private _parentEventId: number;
    private _reportingDate: Date;
    private _reportingTime: Date;
    private _reportingTimeTemp: string;
    private _sealFlag: string;
    private _toAddressId: number;
    private _toAgyLocId: string;
    private _toCity: string;
    private _toCountryCode: string;
    private _toProvStatCode: string;
    private _offenderBookId: number;
    private _movementSeq: number;
    private _movementReasonCode: string;
//    private _movementReason: MovementReason;
//    private _offenderBookings: OffenderBookings;
    private _tempMovementTime: string;
    private _tempMovementDate: string;
    private _selectedReasonDescription: string;
    private _selectedCentreDescription: string;

    
   get selectedCentreDescription(): string { return this._selectedCentreDescription; }

    set selectedCentreDescription(pselectedCentreDescription: string) { this._selectedCentreDescription = pselectedCentreDescription; }
   
    get selectedReasonDescription(): string { return this._selectedReasonDescription; }

    set selectedReasonDescription(pselectedReasonDescription: string) { this._selectedReasonDescription = pselectedReasonDescription; }

    get movementReasonCode(): string { return this._movementReasonCode; }

    set movementReasonCode(pmovementReasonCode: string) { this._movementReasonCode = pmovementReasonCode; }
    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get applicationDate(): Date { return this._applicationDate; }

    set applicationDate(papplicationDate: Date) { this._applicationDate = papplicationDate; }

    get applicationTime(): Date { return this._applicationTime; }

    set applicationTime(papplicationTime: Date) { this._applicationTime = papplicationTime; }

    get arrestAgencyLocId(): string { return this._arrestAgencyLocId; }

    set arrestAgencyLocId(parrestAgencyLocId: string) { this._arrestAgencyLocId = parrestAgencyLocId; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get directionCode(): string { return this._directionCode; }

    set directionCode(pdirectionCode: string) { this._directionCode = pdirectionCode; }

    get escortCode(): string { return this._escortCode; }

    set escortCode(pescortCode: string) { this._escortCode = pescortCode; }

    get escortText(): string { return this._escortText; }

    set escortText(pescortText: string) { this._escortText = pescortText; }

    get eventId(): number { return this._eventId; }

    set eventId(peventId: number) { this._eventId = peventId; }

    get fromAddressId(): number { return this._fromAddressId; }

    set fromAddressId(pfromAddressId: number) { this._fromAddressId = pfromAddressId; }

    get fromAgyLocId(): string { return this._fromAgyLocId; }

    set fromAgyLocId(pfromAgyLocId: string) { this._fromAgyLocId = pfromAgyLocId; }

    get fromCity(): string { return this._fromCity; }

    set fromCity(pfromCity: string) { this._fromCity = pfromCity; }

    get internalScheduleReasonCode(): string { return this._internalScheduleReasonCode; }

    set internalScheduleReasonCode(pinternalScheduleReasonCode: string) { this._internalScheduleReasonCode = pinternalScheduleReasonCode; }

    get internalScheduleType(): string { return this._internalScheduleType; }

    set internalScheduleType(pinternalScheduleType: string) { this._internalScheduleType = pinternalScheduleType; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get movementDate(): Date { return this._movementDate; }

    set movementDate(pmovementDate: Date) { this._movementDate = pmovementDate; }

    get movementTime(): Date { return this._movementTime; }

    set movementTime(pmovementTime: Date) { this._movementTime = pmovementTime; }

    get ojLocationCode(): string { return this._ojLocationCode; }

    set ojLocationCode(pojLocationCode: string) { this._ojLocationCode = pojLocationCode; }

    get parentEventId(): number { return this._parentEventId; }

    set parentEventId(pparentEventId: number) { this._parentEventId = pparentEventId; }

    get reportingDate(): Date { return this._reportingDate; }

    set reportingDate(preportingDate: Date) { this._reportingDate = preportingDate; }

    get reportingTime(): Date { return this._reportingTime; }

    set reportingTime(preportingTime: Date) { this._reportingTime = preportingTime; }
    
    get reportingTimeTemp(): string { return this._reportingTimeTemp; }

    set reportingTimeTemp(preportingTimeTemp: string) { this._reportingTimeTemp = preportingTimeTemp; }


    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get toAddressId(): number { return this._toAddressId; }

    set toAddressId(ptoAddressId: number) { this._toAddressId = ptoAddressId; }

    get toAgyLocId(): string { return this._toAgyLocId; }

    set toAgyLocId(ptoAgyLocId: string) { this._toAgyLocId = ptoAgyLocId; }

    get toCity(): string { return this._toCity; }

    set toCity(ptoCity: string) { this._toCity = ptoCity; }

    get toCountryCode(): string { return this._toCountryCode; }

    set toCountryCode(ptoCountryCode: string) { this._toCountryCode = ptoCountryCode; }

    get toProvStatCode(): string { return this._toProvStatCode; }

    set toProvStatCode(ptoProvStatCode: string) { this._toProvStatCode = ptoProvStatCode; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get movementSeq(): number { return this._movementSeq; }

    set movementSeq(pmovementSeq: number) { this._movementSeq = pmovementSeq; }

//    get movementReason(): MovementReason { return this._movementReason; }
//
//    set movementReason(pmovementReason: MovementReason) { this._movementReason = pmovementReason; }
//
//    get offenderBookings(): OffenderBookings { return this._offenderBookings; }
//
//    set offenderBookings(poffenderBookings: OffenderBookings) { this._offenderBookings = poffenderBookings; }

    get tempMovementTime(): string { return this._tempMovementTime; }

    set tempMovementTime(ptempMovementTime: string) { this._tempMovementTime = ptempMovementTime; }
    get tempMovementDate(): string { return this._tempMovementDate; }

    set tempMovementDate(ptempMovementDate: string) { this._tempMovementDate = ptempMovementDate; }

    toJSON(): any {
        return {
            'activeFlag': this._activeFlag,
            'applicationDate': this._applicationDate,
            'applicationTime': this._applicationTime,
            'arrestAgencyLocId': this._arrestAgencyLocId,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'directionCode': this._directionCode,
            'escortCode': this._escortCode,
            'escortText': this._escortText,
            'eventId': this._eventId,
            'fromAddressId': this._fromAddressId,
            'fromAgyLocId': this._fromAgyLocId,
            'fromCity': this._fromCity,
            'internalScheduleReasonCode': this._internalScheduleReasonCode,
            'internalScheduleType': this._internalScheduleType,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'movementDate': this._movementDate,
            'movementTime': this._movementTime,
            'ojLocationCode': this._ojLocationCode,
            'parentEventId': this._parentEventId,
            'reportingDate': this._reportingDate,
            'reportingTime': this._reportingTime,
            'reportingTimeTemp': this._reportingTimeTemp,
            'sealFlag': this._sealFlag,
            'toAddressId': this._toAddressId,
            'toAgyLocId': this._toAgyLocId,
            'toCity': this._toCity,
            'toCountryCode': this._toCountryCode,
            'toProvStatCode': this._toProvStatCode,
            'offenderBookId': this._offenderBookId,
            'movementSeq': this._movementSeq,
//            'movementReason': this._movementReason,
//            'offenderBookings': this._offenderBookings,
            'selectedReasonDescription': this._selectedReasonDescription,
            'selectedCentreDescription':this._selectedCentreDescription,
            'movementReasonCode' : this._movementReasonCode
        };
    }
}