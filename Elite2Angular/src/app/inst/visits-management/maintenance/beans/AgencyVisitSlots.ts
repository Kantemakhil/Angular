import { BaseModel } from '@commonbeans/BaseModel';
export class AgencyVisitSlots extends BaseModel {
    private _agencyVisitSlotId: number;
    private _internalLocationId: number;
    private _createDatetime: Date;
    private _createUserId: string;
    private _maxAdults: number;
    private _maxGroups: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _agyLocId: string;
    private _weekDay: string;
    private _timeSlotSeq: string;
    private _pCapacity: string;
    private _nbtLocationDesc: string;
    private _returnValue:number;
    private _serverCode:number;
    private _startTime: Date;
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) {
        this._createDatetime = pcreateDatetime;
    }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) {
        this._modifyDatetime = pmodifyDatetime;
    }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    get weekDay(): string { return this._weekDay; }
    set weekDay(pweekDay: string) { this._weekDay = pweekDay; }

    get agencyVisitSlotId(): number { return this._agencyVisitSlotId; }
    set agencyVisitSlotId(pagencyVisitSlotId: number) { this._agencyVisitSlotId = pagencyVisitSlotId; }

    get maxAdults(): number { return this._maxAdults; }

    set maxAdults(pmaxAdults: number) { this._maxAdults = pmaxAdults; }

    get maxGroups(): number { return this._maxGroups; }

    set maxGroups(pmaxGroups: number) { this._maxGroups = pmaxGroups; }
    get timeSlotSeq(): string { return this._timeSlotSeq; }
    set timeSlotSeq(ptimeSlotSeq: string) { this._timeSlotSeq = ptimeSlotSeq; }
    get pCapacity(): string { return this._pCapacity; }
    set pCapacity(ppCapacity: string) { this._pCapacity = ppCapacity; }
    get internalLocationId(): number { return this._internalLocationId; }

    set internalLocationId(pinternalLocationId: number) { this._internalLocationId = pinternalLocationId; }
    get nbtLocationDesc(): string { return this._nbtLocationDesc; }
    set nbtLocationDesc(pnbtLocationDesc: string) { this._nbtLocationDesc = pnbtLocationDesc; }
    get returnValue(): number{ return this._returnValue; }
    set returnValue(preturnValue: number){ this._returnValue = preturnValue;}
    get serverCode(): number{ return this._serverCode; }
    set serverCode(pserverCode: number){ this._serverCode = pserverCode;}
    get startTime(): Date { return this._startTime; }
    set startTime(pstartTime: Date) {
        this._startTime = pstartTime;
    }
    toJSON(): any {
        return {
            'agencyVisitSlotId': this._agencyVisitSlotId,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'maxAdults': this._maxAdults,
            'maxGroups': this._maxGroups,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'agyLocId': this._agyLocId,
            'weekDay': this._weekDay,
            'timeSlotSeq': this._timeSlotSeq,
            'pCapacity': this._pCapacity,
            'internalLocationId': this._internalLocationId,
            'nbtLocationDesc': this._nbtLocationDesc,
            'returnValue': this._returnValue,
            'serverCode': this._serverCode,
            'startTime': this._startTime,
        };
    }
}
