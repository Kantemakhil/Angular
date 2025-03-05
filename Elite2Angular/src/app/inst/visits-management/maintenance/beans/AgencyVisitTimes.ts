import { BaseModel } from '@commonbeans/BaseModel';
export class AgencyVisitTimes extends BaseModel {
    private _activeFlag: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _endTime: Date;
    private _expiryDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _startTime: Date;
    private _agyLocId: string;
    private _weekDay: string;
    private _timeSlotSeq: string;
    private _returnValue:number;
    private _rowId: string;
    private _serverCode:number;

    get rowId(): string { return this._rowId; }
	set rowId(prowId: string) { this._rowId = prowId; }
    get returnValue(): number{ return this._returnValue; }
    set returnValue(preturnValue: number){ this._returnValue = preturnValue;}

    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) {
        this._createDatetime = pcreateDatetime;
    }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get endTime(): Date { return this._endTime; }
    set endTime(pendTime: Date) {
        this._endTime = pendTime;
    }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) {
    this._expiryDate = pexpiryDate; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) {
        this._modifyDatetime = pmodifyDatetime;
    }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get startTime(): Date { return this._startTime; }
    set startTime(pstartTime: Date) {
        this._startTime = pstartTime;
    }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    get weekDay(): string { return this._weekDay; }
    set weekDay(pweekDay: string) { this._weekDay = pweekDay; }
    get timeSlotSeq(): string { return this._timeSlotSeq; }
    set timeSlotSeq(ptimeSlotSeq: string) { this._timeSlotSeq = ptimeSlotSeq; }
    get serverCode(): number{ return this._serverCode; }
    set serverCode(pserverCode: number){ this._serverCode = pserverCode;}
    toJSON(): any {
        return {
            'activeFlag': this._activeFlag,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'endTime': this._endTime,
            'expiryDate': this._expiryDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'startTime': this._startTime,
            'agyLocId': this._agyLocId,
            'weekDay': this._weekDay,
            'timeSlotSeq': this._timeSlotSeq,
            'returnValue': this._returnValue,
            'rowId': this._rowId,
            'serverCode': this._serverCode,
        };
    }
}
