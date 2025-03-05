import { BaseModel } from '@commonbeans/BaseModel';

export class OffExternalAccountBalances extends BaseModel {
    private _accountBalanceId:number;
	private _offenderBookId:number;
    private _rootOffenderId: number;
    private _accountType:string;
    private _balance:number;
    private _lastChanged:Date;
    private _accountDetails:string;
    private _createUserId: string;
    private _accountCode: number;
    private _createDatetime: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;


    get accountBalanceId(): number { return this._accountBalanceId; }
    set accountBalanceId(paccountCode: number) { this._accountBalanceId = paccountCode; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(paccountCode: number) { this._offenderBookId = paccountCode; }
    get accountDetails(): string { return this._accountDetails; }
    set accountDetails(pcreateUserId: string) { this._accountDetails = pcreateUserId; }
    get balance(): number { return this._balance; }
    set balance(paccountCode: number) { this._balance = paccountCode; }
    get accountType(): string { return this._accountType; }
    set accountType(pcreateUserId: string) { this._accountType = pcreateUserId; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get accountCode(): number { return this._accountCode; }
    set accountCode(paccountCode: number) { this._accountCode = paccountCode; }
    get rootOffenderId(): number { return this._rootOffenderId; }
    set rootOffenderId(paccountCode: number) { this._rootOffenderId = paccountCode; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get lastChanged(): Date { return this._lastChanged; }
    set lastChanged(pmodifyDatetime: Date) { this._lastChanged = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get sealFlag() { return this._sealFlag }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'accountCode': this._accountCode,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'createDatetime': this._createDatetime,
            'sealFlag': this._sealFlag,
            'rootOffenderId':this._rootOffenderId,
            'accountType':this._accountType,
            'balance':this._balance,
            'lastModified':this._lastChanged,
            'accountDetails':this._accountDetails,
            'accountBalanceId':this._accountBalanceId,
            'offenderBookId': this._offenderBookId
        };
    }
}
