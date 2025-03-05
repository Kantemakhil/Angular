export class OffenderMailLog {

    private _offenderBookId: number;
    private _inoutMailType: string;
    private _logDate: Date;
    private _mailAddressId: number;
    private _mailType: string;
    private _statusCode: string;
    private _alertCode: string;
    private _commentText: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyUserId: string;
    private _modifyDatetime: Date;
    private _sealFlag: string;
    private _contactType: any;
    private _contactName: any;
    private _contactAddress: any;
    private _activeFlag: string;
	private _personId: number;
	private _corporateId: number;
    private _logSeq: number;

    get contactType(): any { return this._contactType; }
    set contactType(value: any) { this._contactType = value; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get logDate(): Date { return this._logDate; }
    set logDate(plogDate: Date) { this._logDate = plogDate; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get inoutMailType(): string { return this._inoutMailType; }
    set inoutMailType(pinoutMailType: string) { this._inoutMailType = pinoutMailType; }
    get mailAddressId(): number { return this._mailAddressId; }
    set mailAddressId(pmailAddressId: number) { this._mailAddressId = pmailAddressId; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get mailType(): string { return this._mailType; }
    set mailType(pmailType: string) { this._mailType = pmailType; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get contactAddress(): any { return this._contactAddress; }
    set contactAddress(value: any) { this._contactAddress = value; }
    get contactName(): any { return this._contactName; }
    set contactName(value: any) { this._contactName = value; }
    get statusCode(): string { return this._statusCode; }
    set statusCode(value: string) { this._statusCode = value; }
    get alertCode(): string { return this._alertCode; }
    set alertCode(value: string) { this._alertCode = value; }
    get personId(): number { return this._personId; }
    set personId(value: number) { this._personId = value; }
    get corporateId(): number { return this._corporateId; }
    set corporateId(value: number) { this._corporateId = value; }
    public get logSeq(): number { return this._logSeq;}
    public set logSeq(value: number) { this._logSeq = value;}

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'logDate': this._logDate,
            'offenderBookId': this._offenderBookId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'inoutMailType': this._inoutMailType,
            'mailAddressId': this._mailAddressId,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'mailType': this._mailType,
            'sealFlag': this._sealFlag,
            'activeFlag': this._activeFlag,
            'contactType': this._contactType,
            'contactName': this._contactName,
            'statusCode': this._statusCode,
            'contactAddress': this._contactAddress,
            'alertCode': this._alertCode,
            'personId': this._personId,
            'corporateId': this._corporateId,
            'logSeq': this._logSeq
        };
    }
}