import { BaseModel } from '@commonbeans/BaseModel';
export class VOffenderScheduledTrips extends BaseModel {
    private _eventId: string;
    private _fromLocationDesc: string;
    private _eventSubType: string;
    private _offenderBookId: number;
    private _butAddOff: string;
    private _offenderIdDisplay: string;
    private _butRemOff: string;
    private _eventType: string;
    private _offenderFirstName: string;
    private _scheduledTripId: number;
    private _butNonAss: string;
    private _offenderLastName: string;
    private _eventStatus: string;
    private _agyLocId: string;
    private _startTime: number;
    private _toAgyLocId: string;
    private _eventDate: number;
    private _nonAsso: string;

    get eventId(): string { return this._eventId; }
    set eventId(peventId: string) { this._eventId = peventId; }
    get fromLocationDesc(): string { return this._fromLocationDesc; }
    set fromLocationDesc(pfromLocationDesc: string) { this._fromLocationDesc = pfromLocationDesc; }
    get eventSubType(): string { return this._eventSubType; }
    set eventSubType(peventSubType: string) { this._eventSubType = peventSubType; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get butAddOff(): string { return this._butAddOff; }
    set butAddOff(pbutAddOff: string) { this._butAddOff = pbutAddOff; }
    get offenderIdDisplay(): string { return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }
    get butRemOff(): string { return this._butRemOff; }
    set butRemOff(pbutRemOff: string) { this._butRemOff = pbutRemOff; }
    get eventType(): string { return this._eventType; }
    set eventType(peventType: string) { this._eventType = peventType; }
    get offenderFirstName(): string { return this._offenderFirstName; }
    set offenderFirstName(poffenderFirstName: string) { this._offenderFirstName = poffenderFirstName; }
    get scheduledTripId(): number { return this._scheduledTripId; }
    set scheduledTripId(pscheduledTripId: number) { this._scheduledTripId = pscheduledTripId; }
    get butNonAss(): string { return this._butNonAss; }
    set butNonAss(pbutNonAss: string) { this._butNonAss = pbutNonAss; }
    get offenderLastName(): string { return this._offenderLastName; }
    set offenderLastName(poffenderLastName: string) { this._offenderLastName = poffenderLastName; }
    get eventStatus(): string { return this._eventStatus; }
    set eventStatus(peventStatus: string) { this._eventStatus = peventStatus; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    get startTime(): number { return this._startTime; }
    set startTime(pstartTime: number) { this._startTime = pstartTime; }
    get toAgyLocId(): string { return this._toAgyLocId; }
    set toAgyLocId(ptoAgyLocId: string) { this._toAgyLocId = ptoAgyLocId; }
    get eventDate(): number { return this._eventDate; }
    set eventDate(peventDate: number) { this._eventDate = peventDate; }
    get nonAsso(): string { return this._nonAsso; }
    set nonAsso(pnonAsso: string) { this._nonAsso = pnonAsso; }

    toJSON(): any {
        return {
            'eventId': this._eventId,
            'fromLocationDesc': this._fromLocationDesc,
            'eventSubType': this._eventSubType,
            'offenderBookId': this._offenderBookId,
            'butAddOff': this._butAddOff,
            'offenderIdDisplay': this._offenderIdDisplay,
            'butRemOff': this._butRemOff,
            'eventType': this._eventType,
            'offenderFirstName': this._offenderFirstName,
            'scheduledTripId': this._scheduledTripId,
            'butNonAss': this._butNonAss,
            'offenderLastName': this._offenderLastName,
            'eventStatus': this._eventStatus,
            'agyLocId': this._agyLocId,
            'startTime': this._startTime,
            'toAgyLocId': this._toAgyLocId,
            'eventDate': this._eventDate,
            'nonAsso': this._nonAsso,
        };
    }

}