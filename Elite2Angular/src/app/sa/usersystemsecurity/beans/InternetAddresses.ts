import {BaseModel} from '@commonbeans/BaseModel';

export class InternetAddresses extends BaseModel {

    private _internetAddressId: number;
    private _createDatetime: Date;
    private _createUserId: string;
    private _internetAddress: string;
    private _internetAddressClass: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _ownerClass: string;
    private _ownerCode: string;
    private _ownerId: number;
    private _ownerSeq: number;
    private _sealFlag: string;

    get internetAddressId(): number { return this._internetAddressId; }

    set internetAddressId(pinternetAddressId: number) { this._internetAddressId = pinternetAddressId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get internetAddress(): string { return this._internetAddress; }

    set internetAddress(pinternetAddress: string) { this._internetAddress = pinternetAddress; }

    get internetAddressClass(): string { return this._internetAddressClass; }

    set internetAddressClass(pinternetAddressClass: string) { this._internetAddressClass = pinternetAddressClass; }

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

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    toJSON(): any {
        return {
            'internetAddressId': this._internetAddressId,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'internetAddress': this._internetAddress,
            'internetAddressClass': this._internetAddressClass,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'ownerClass': this._ownerClass,
            'ownerCode': this._ownerCode,
            'ownerId': this._ownerId,
            'ownerSeq': this._ownerSeq,
            'sealFlag': this._sealFlag
        };
    }
}
