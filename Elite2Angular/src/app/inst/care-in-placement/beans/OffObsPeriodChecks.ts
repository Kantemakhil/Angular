export class OffObsPeriodChecks {
    private _offenderBookId: number;
    private _obsPeriodId: number;
    private _checkId: number;
    private _checkDatetime: Date;
    private _userId: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _checkTime: Date;
    private _scheduleDatetime: Date;
    private _scheduleTime: Date;
    private _frequency: number;
    private _characteristicsCode: string;
    private _observationType: string;
    private _nextScheduleDate: Date;
    private _commentText: string;
    private _obsTypeVersionId: number;
    private _performingStaffId: number;
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId ; }
    get obsPeriodId(): number { return this._obsPeriodId; }
    set obsPeriodId(pobsPeriodId: number) { this._obsPeriodId = pobsPeriodId ; }
    get userId(): string { return this._userId; }
    set userId(puserId: string) { this._userId = puserId ; }
    get checkId(): number { return this._checkId; }
    set checkId(pcheckId: number) { this._checkId = pcheckId ; }
    get checkDatetime(): Date { return this._checkDatetime; }
    set checkDatetime(pcheckDatetime: Date) { this._checkDatetime = pcheckDatetime ; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime ; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId ; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime ; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId ; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag ; }
    get scheduleDatetime(): Date { return this._scheduleDatetime; }
    set scheduleDatetime(pscheduleDatetime: Date) { this._scheduleDatetime = pscheduleDatetime ; }
    get scheduleTime(): Date { return this._scheduleTime; }
    set scheduleTime(pscheduleTime: Date) { this._scheduleTime = pscheduleTime ; }
    get checkTime(): Date { return this._checkTime; }
    set checkTime(pcheckTime: Date) { this._checkTime = pcheckTime ; }
    get frequency(): number { return this._frequency; }
    set frequency(pfrequency: number) { this._frequency = pfrequency ; }
    get characteristicsCode(): string { return this._characteristicsCode; }
    set characteristicsCode(pcharacteristicsCode: string) { this._characteristicsCode = pcharacteristicsCode ; }
    get observationType(): string { return this._observationType; }
    set observationType(pobservationType: string) { this._observationType = pobservationType ; }


    get nextScheduleDate(): Date { return this._nextScheduleDate; }
    set nextScheduleDate(pnextScheduleDate: Date) { this._nextScheduleDate = pnextScheduleDate ; }


    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get obsTypeVersionId(): number{ return this._obsTypeVersionId; }
    set obsTypeVersionId(pobsTypeVersionId: number){ this._obsTypeVersionId = pobsTypeVersionId ;}

    get performingStaffId(): number { return this._performingStaffId; }
    set performingStaffId(pperformingStaffId: number) { this._performingStaffId = pperformingStaffId ; }

    toJSON(): any {
        return {
        'offenderBookId': this._offenderBookId,
        'obsPeriodId': this._obsPeriodId,
        'checkId': this._checkId,
        'checkDatetime': this._checkDatetime,
        'createDatetime': this._createDatetime,
        'modifyDatetime': this._modifyDatetime,
        'createUserId': this._createUserId,
        'modifyUserId': this._modifyUserId,
        'sealFlag': this._sealFlag,
        'checkTime': this._checkTime,
        'scheduleDatetime': this._scheduleDatetime,
        'scheduleTime': this._scheduleTime,
        'frequency': this._frequency,
        'characteristicsCode': this._characteristicsCode,
        'observationType': this._observationType,
        'nextScheduleDate': this._nextScheduleDate,
        'commentText': this._commentText,
        'obsTypeVersionId': this._obsTypeVersionId,
        'performingStaffId': this._performingStaffId
        };
    }
}
