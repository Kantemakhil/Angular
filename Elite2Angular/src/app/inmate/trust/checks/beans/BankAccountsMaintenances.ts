
// import { OffenderBookings } from './OffenderBookings';

export class BankAccountsMaintenances {
    private _accountCode: number;
    private _createUserId: string;
    private _clientId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _commentText: string;
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _caseloadId: string;
    private _originatorId: string;
    private _sealFlag: string;
    private _bkAccountDesc: string;
    private _activeFlag: string;

    get accountCode(): number { return this._accountCode; }
    set accountCode(paccountCode: number) { this._accountCode = paccountCode; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get clientId(): string { return this._clientId; }
    set clientId(pclientId: string) { this._clientId = pclientId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get originatorId(): string { return this._originatorId; }
    set originatorId(poriginatorId: string) { this._originatorId = poriginatorId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get bkAccountDesc(): string { return this._bkAccountDesc; }
    set bkAccountDesc(pbkAccountDesc: string) { this._bkAccountDesc = pbkAccountDesc; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    toJSON(): any {
        return {
            'accountCode': this._accountCode,
            'createUserId': this._createUserId,
            'clientId': this._clientId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'expiryDate': this._expiryDate,
            'serialVersionUID': this._serialVersionUID,
            'caseloadId': this._caseloadId,
            'originatorId': this._originatorId,
            'sealFlag': this._sealFlag,
            'bkAccountDesc': this._bkAccountDesc,
            'activeFlag': this._activeFlag,
        };
    }
}
