import { BaseModel } from '@commonbeans/BaseModel';
export class KeyDates extends BaseModel {

    private _keyDate: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _listSeq: Number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
   

    get keyDate(): string { return this._keyDate; }
    set keyDate(pkeyDate: string) { this._keyDate = pkeyDate; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get listSeq(): Number { return this._listSeq; }
    set listSeq(plistSeq: Number) { this._listSeq = plistSeq; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    toJSON(): any {
        return {
            'keyDate': this._keyDate,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'listSeq': this._listSeq,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
        };
    }
}
