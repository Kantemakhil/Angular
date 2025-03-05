export class OffenderEmTagDetails {

    private _offenderBookId: number;
    private _emTagId: number;
    private _emTagStrapSize: string;
    private _emTagDailyChargingPeriod: string;
    private _modifyDatetime: Date;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyUserId: string;
    private _liReturn: number;
    private _emTagData: string;
    private _emTagStartTime:Date;
    private _emTagEndTime:Date;
    
    get emTagId(): number { return this._emTagId; }
    set emTagId(pemTagId: number) { this._emTagId = pemTagId; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get emTagStrapSize(): string { return this._emTagStrapSize; }
    set emTagStrapSize(pemTagStrapSize: string) { this._emTagStrapSize = pemTagStrapSize; }
    get emTagDailyChargingPeriod(): string { return this._emTagDailyChargingPeriod; }
    set emTagDailyChargingPeriod(pemTagDailyChargingPeriod: string) { this._emTagDailyChargingPeriod = pemTagDailyChargingPeriod; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get liReturn(): number { return this._liReturn; }
    set liReturn(pliReturn: number) { this._liReturn = pliReturn; }
    get emTagData(): string {return this._emTagData;}
    set emTagData(value: string) {this._emTagData = value;}


    get emTagStartTime(): Date{ return this._emTagStartTime; }
    set emTagStartTime(pemTagStartTime: Date){ this._emTagStartTime = pemTagStartTime ;}

    get emTagEndTime(): Date{ return this._emTagEndTime; }
    set emTagEndTime(pemTagEndTime: Date){ this._emTagEndTime = pemTagEndTime ;}
    
    toJSON(): any {
        return {

            'offenderBookId': this._offenderBookId,
            'emTagId': this._emTagId,
            'emTagStrapSize': this._emTagStrapSize,
            'emTagDailyChargingPeriod': this._emTagDailyChargingPeriod,
            'modifyUserId': this._modifyUserId,
            'createDateTime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'liReturn': this._liReturn,
            'emTagData': this._emTagData,
            'emTagStartTime': this._emTagStartTime,
            'emTagEndTime': this._emTagEndTime
        };
    }
}