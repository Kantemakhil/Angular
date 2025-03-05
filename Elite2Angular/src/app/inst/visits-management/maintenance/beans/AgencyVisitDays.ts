import { BaseModel } from '@commonbeans/BaseModel';
export class AgencyVisitDays extends BaseModel {
    private _createDatetime: Date;
    private _createUserId: string;

    private _modifyDatetime: Date;

    private _modifyUserId: string;

    private _sealFlag: string;

    private _agyLocId: string;
    private _weekDay: string;
    private _returnValue:number;
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
    get returnValue(): number{ return this._returnValue; }
    set returnValue(preturnValue: number){ this._returnValue = preturnValue;}
    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'agyLocId': this._agyLocId,
            'weekDay': this._weekDay,
            'returnValue': this._returnValue,
        };
    }
}
