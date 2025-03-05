import { BaseModel } from "../../../../common/beans/BaseModel";

export class ScheduledTripParameters extends BaseModel {
    private _tripCode: string;
    private _weekNo: number;
    private _weekNoTemp: number;
    private _sunday: string;
    private _monday: string;
    private _tuesday: string;
    private _wednesday: string;
    private _thursday: string;
    private _friday: string;
    private _saturday: string;
    private _estDepartureTime: Date;
    private _createDatetime: Date;
    private _modifyDatetime: Date;
    private _sealFlag: string;
    private _createUserId: string;
    private _vMdate: Date;
    private _modifyUserId: string;
    private _startDate: Date;
    private _endDate: Date;
    


    
    get tripCode(): string { return this._tripCode; }
    set tripCode(value: string) { this._tripCode = value; }
    get weekNo(): number { return this._weekNo; }
    set weekNo(value: number) { this._weekNo = value; }
    get sunday(): string { return this._sunday; }
    set sunday(value: string) { this._sunday = value; }
    get monday(): string { return this._monday; }
    set monday(value: string) { this._monday = value; }
    get tuesday(): string { return this._tuesday; }
    set tuesday(value: string) { this._tuesday = value; }
    get wednesday(): string { return this._wednesday; }
    set wednesday(value: string) { this._wednesday = value; }
    get thursday(): string { return this._thursday; }
    set thursday(value: string) { this._thursday = value; }
    get friday(): string { return this._friday; }
    set friday(value: string) { this._friday = value; }
    get saturday(): string { return this._saturday; }
    set saturday(value: string) { this._saturday = value; }
    get estDepartureTime(): Date {return this._estDepartureTime;}
    set estDepartureTime(value: Date) {this._estDepartureTime = value;}
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(value: Date) { this._createDatetime = value; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(value: Date) { this._modifyDatetime = value; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(value: string) { this._sealFlag = value; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(value: string) { this._createUserId = value; }
    get vMdate(): Date {return this._vMdate;}
    set vMdate(value: Date) {this._vMdate = value;}
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(value: string) { this._modifyUserId = value; }

    get endDate(): Date {
        return this._endDate;
    }
    set endDate(value: Date) {
        this._endDate = value;
    }

    get startDate(): Date {
        return this._startDate;
    }
    set startDate(value: Date) {
        this._startDate = value;
    }
    get weekNoTemp(): number {
        return this._weekNoTemp;
    }
    set weekNoTemp(value: number) {
        this._weekNoTemp = value;
    }

    toJSON(): any {
        return {
            'saturday': this._saturday,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'thursday': this._thursday,
            'createDatetime': this._createDatetime,
            'sunday': this._sunday,
            'tuesday': this._tuesday,
            'tripCode': this._tripCode,
            'wednesday': this._wednesday,
            'friday': this._friday,
            'weekNo': this._weekNo,
            'sealFlag': this._sealFlag,
            'estDepartureTime': this._estDepartureTime,
            'vMdate': this._vMdate,
            'monday': this._monday,
            'startDate' : this._startDate,
            'endDate' : this._endDate,
            'weekNoTemp' : this._weekNoTemp
        };
    }
}