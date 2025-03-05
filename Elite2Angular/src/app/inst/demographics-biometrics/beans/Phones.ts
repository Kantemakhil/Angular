import {BaseModel} from '@commonbeans/BaseModel';

export class Phones extends BaseModel {

    private _phoneId: number;
    private _createDatetime: Date;
    private _createUserId: string;
    private _extNo: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _ownerClass: string;
    private _ownerCode: string;
    private _ownerId: number;
    private _ownerSeq: number;
    private _phoneNo: string;
    private _phoneType: string;
    private _format: string;
    private _sealFlag: string;

    get phoneId(): number { return this._phoneId; }

    set phoneId(pphoneId: number) { this._phoneId = pphoneId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get extNo(): string { return this._extNo; }

    set extNo(pextNo: string) { this._extNo = pextNo; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get ownerClass(): string { return this._ownerClass; }

    set ownerClass(pownerClass: string) { this._ownerClass = pownerClass; }

    get ownerCode(): string { return this._ownerCode; }

    set ownerCode(pownerCode: string) { this._ownerCode = pownerCode; }

    get ownerId(): number { return this._ownerId; }

    set ownerId(pownerId: number) { this._ownerId = pownerId; }

    get ownerSeq(): number { return this._ownerSeq; }

    set ownerSeq(pownerSeq: number) { this._ownerSeq = pownerSeq; }

    get phoneNo(): string { return this._phoneNo; }

    set phoneNo(pphoneNo: string) { this._phoneNo = pphoneNo; }

    get phoneType(): string { return this._phoneType; }

    set phoneType(pphoneType: string) { this._phoneType = pphoneType; }

    get format(): string { return this._format; }

    set format(format: string) { this._format = format; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    toJSON(): any {
        return {
             'phoneId': this._phoneId,
             'createDatetime': this._createDatetime,
             'createUserId': this._createUserId,
             'extNo': this._extNo,
             'modifyDatetime': this._modifyDatetime,
             'modifyUserId': this._modifyUserId,
             'ownerClass': this._ownerClass,
             'ownerCode': this._ownerCode,
             'ownerId': this._ownerId,
             'ownerSeq': this._ownerSeq,
             'phoneNo': this._phoneNo,
             'phoneType': this._phoneType,
             'format': this._format,
             'sealFlag': this._sealFlag
        };
    }
}
