import { BaseModel } from '@commonbeans/BaseModel'

export class OffenderHwd extends BaseModel {

    private _hwdId: number;
    private _offenderBookId: number;
    private _receivedDate: Date;
    private _issuingAgy: string;
    private _hwdType: string;
    private _hwdInfoId: string;
    private _startDate: Date;
    private _expiryDate: Date;
    private _bailAmount: number;
    private _probRevocFlag: string;
    private _hwdStatus: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _offenderId: number;
    private _agyLocId: string;
    private _expDate: Date;

    get expDate(): Date { return this._expDate; }

    set expDate(pexpDate: Date) { this._expDate = pexpDate; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(_modifyUserId: string) { this._modifyUserId = _modifyUserId; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get hwdStatus(): string { return this._hwdStatus; }

    set hwdStatus(phwdStatus: string) { this._hwdStatus = phwdStatus; }

    get probRevocFlag(): string { return this._probRevocFlag; }

    set probRevocFlag(pprobRevocFlag: string) { this._probRevocFlag = pprobRevocFlag; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get bailAmount(): number { return this._bailAmount; }

    set bailAmount(pbailAmount: number) { this._bailAmount = pbailAmount; }

    get startDate(): Date { return this._startDate; }

    set startDate(pstartDate: Date) { this._startDate = pstartDate; }

    get issuingAgy(): string { return this._issuingAgy; }

    set issuingAgy(pissuingAgy: string) { this._issuingAgy = pissuingAgy; }

    get hwdType(): string { return this._hwdType; }

    set hwdType(phwdType: string) { this._hwdType = phwdType; }

    get hwdInfoId(): string { return this._hwdInfoId; }

    set hwdInfoId(phwdInfoId: string) { this._hwdInfoId = phwdInfoId; }

    get receivedDate(): Date { return this._receivedDate; }

    set receivedDate(preceivedDate: Date) { this._receivedDate = preceivedDate; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get hwdId(): number { return this._hwdId; }

    set hwdId(_hwdId: number) { this._hwdId = _hwdId; }






    toJSON(): any {
        return {
            'hwdId': this._hwdId,
            'offenderBookId': this._offenderBookId,
            'receivedDate ': this._receivedDate,
            'issuingAgy': this._issuingAgy,
            'hwdType ': this._hwdType,
            'hwdInfoId': this._hwdInfoId,
            'startDate': this._startDate,
            'expiryDate': this._expiryDate,
            'bailAmount': this._bailAmount,
            'probRevocFlag': this._probRevocFlag,
            'hwdStatus': this._hwdStatus,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'offenderId': this._offenderId,
            'agyLocId' : this._agyLocId,
            'expDate': this._expDate
        };
    }
}
