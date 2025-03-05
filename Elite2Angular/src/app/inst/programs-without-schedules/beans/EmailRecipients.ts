import { BaseModel } from '@commonbeans/BaseModel';
export class EmailRecipients extends BaseModel {
    private _internetAddress: string;
    private _toAddress: string;
    private _ccAddress: string;
    private _bccAddress: string;
    private _internetAddressClass: string;
    private _nbtEmailTo: boolean;
    private _nbtEmailCc: boolean;
    private _nbtEmailBcc: boolean;
    private _emailId: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _ownerId: number;

    get ownerId(): number { return this._ownerId; }
    set ownerId(ownerId: number) { this._ownerId = ownerId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(modifyDatetime: Date) { this._modifyDatetime = modifyDatetime; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(createDatetime: Date) { this._createDatetime = createDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(createUserId: string) { this._createUserId = createUserId; }

    get emailId(): number { return this._emailId; }
    set emailId(emailId: number) { this._emailId = emailId; }

    get internetAddress(): string { return this._internetAddress; }
    set internetAddress(internetAddress: string) { this._internetAddress = internetAddress; }

    get toAddress(): string { return this._toAddress; }
    set toAddress(toAddress: string) { this._toAddress = toAddress; }

    get ccAddress(): string { return this._ccAddress; }
    set ccAddress(ccAddress: string) { this._ccAddress = ccAddress; }

    get bccAddress(): string { return this._bccAddress; }
    set bccAddress(bccAddress: string) { this._bccAddress = bccAddress; }

    get internetAddressClass(): string { return this._internetAddressClass; }
    set internetAddressClass(internetAddressClass: string) { this._internetAddressClass = internetAddressClass; }

    get nbtEmailTo(): boolean { return this._nbtEmailTo; }
    set nbtEmailTo(nbtEmailTo: boolean) { this._nbtEmailTo = nbtEmailTo; }


    get nbtEmailCc(): boolean { return this._nbtEmailCc; }
    set nbtEmailCc(nbtEmailCc: boolean) { this._nbtEmailCc = nbtEmailCc; }


    get nbtEmailBcc(): boolean { return this._nbtEmailBcc; }
    set nbtEmailBcc(nbtEmailBcc: boolean) { this._nbtEmailBcc = nbtEmailBcc; }



    toJSON(): any {
        return {
            'internetAddress': this._internetAddress,
            'toAddress': this._toAddress,
            'ccAddress': this._ccAddress,
            'bccAddress': this._bccAddress,
            'internetAddressClass': this._internetAddressClass,
            'nbtEmailTo': this._nbtEmailTo,
            'nbtEmailCc': this._nbtEmailCc,
            'nbtEmailBcc': this._nbtEmailBcc,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'emailId': this._emailId,
            'ownerId': this._ownerId,
        };
    }
}