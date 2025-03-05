export class OffObsAddCheckDetails {
    private _offenderBookId: number;
    private _obsPeriodId: number;
    private _checkId: number;
    private _detailType: string;
    private _detail: string;
    private _detailDate: Date;
    private _reportedUser: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId ; }
    get obsPeriodId(): number { return this._obsPeriodId; }
    set obsPeriodId(pobsPeriodId: number) { this._obsPeriodId = pobsPeriodId ; }
    get checkId(): number { return this._checkId ; }
    set checkId(pcheckId: number) { this._checkId  = pcheckId  ; }
    get detailType(): string { return this._detailType ; }
    set detailType(pdetailType: string) { this._detailType = pdetailType ; }
    get detail(): string { return this._detail; }
    set detail(pdetail: string) { this._detail = pdetail ; }
    get detailDate(): Date { return this._detailDate; }
    set detailDate(pdetailDate: Date) { this._detailDate = pdetailDate ; }
    get reportedUser(): string { return this._reportedUser; }
    set reportedUser(preportedUser: string) { this._reportedUser = preportedUser ; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime ; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId ; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime ; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId ; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag ; }

    toJSON(): any {
        return {
        'offenderBookId': this._offenderBookId,
        'obsPeriodId': this._obsPeriodId,
        'checkId': this._checkId,
        'detailType': this._detailType,
        'createDatetime': this._createDatetime,
        'modifyDatetime': this._modifyDatetime,
        'createUserId': this._createUserId,
        'modifyUserId': this._modifyUserId,
        'detail': this._detail,
        'detailDate': this._detailDate,
        'reportedUser': this._reportedUser,
        'sealFlag': this._sealFlag,
        };
    }

}
