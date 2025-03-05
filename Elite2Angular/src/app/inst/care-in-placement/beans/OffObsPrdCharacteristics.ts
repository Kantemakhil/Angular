export class OffObsPrdCharacteristics {
    private _offenderBookId: number;
    private _obsPeriodId: number;
    private _observationType: string;
    private _characteristicsCode: string;
    private _startDate: Date;
    private _endReasonCode: string;
    private _endDate: Date;
    private _statusCode: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _startTime: Date;
    private _endTime: Date;
    private _frequency: number;
    private _obsPrdCharId: number;

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId ; }
    get obsPeriodId(): number { return this._obsPeriodId; }
    set obsPeriodId(pobsPeriodId: number) { this._obsPeriodId = pobsPeriodId ; }
    get observationType(): string { return this._observationType; }
    set observationType(pobservationType: string) { this._observationType = pobservationType ; }
    get characteristicsCode(): string { return this._characteristicsCode; }
    set characteristicsCode(pcharacteristicsCode: string) { this._characteristicsCode = pcharacteristicsCode ; }
    get startDate(): Date { return this._startDate; }
    set startDate(pstartDate: Date) { this._startDate = pstartDate ; }
    get endReasonCode(): string { return this._endReasonCode; }
    set endReasonCode(pendReasonCode: string) { this._endReasonCode = pendReasonCode ; }
    get endDate(): Date { return this._endDate; }
    set endDate(pendDate: Date) { this._endDate = pendDate ; }
    get statusCode(): string { return this._statusCode; }
    set statusCode(pstatusCode: string) { this._statusCode = pstatusCode ; }
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
    get startTime(): Date { return this._startTime; }
    set startTime(pstartTime: Date) { this._startTime = pstartTime ; }
    get endTime(): Date { return this._endTime; }
    set endTime(pendTime: Date) { this._endTime = pendTime ; }
    get frequency(): number { return this._frequency; }
    set frequency(pfrequency: number) { this._frequency = pfrequency ; }
    get obsPrdCharId(): number { return this._obsPrdCharId; }
    set obsPrdCharId(pobsPrdCharId: number) { this._obsPrdCharId = pobsPrdCharId ; }

    toJSON(): any {
        return {
        'offenderBookId': this._offenderBookId,
        'obsPeriodId': this._obsPeriodId,
        'observationType': this._observationType,
        'characteristicsCode': this._characteristicsCode,
        'createDatetime': this._createDatetime,
        'modifyDatetime': this._modifyDatetime,
        'createUserId': this._createUserId,
        'modifyUserId': this._modifyUserId,
        'endReasonCode': this._endReasonCode,
        'endDate': this._endDate,
        'startDate': this._startDate,
        'sealFlag': this._sealFlag,
        'statusCode': this._statusCode,
        'startTime': this._startTime,
        'endTime': this._endTime,
        'frequency': this._frequency,
        'obsPrdCharId': this._obsPrdCharId,
        };
    }
}
