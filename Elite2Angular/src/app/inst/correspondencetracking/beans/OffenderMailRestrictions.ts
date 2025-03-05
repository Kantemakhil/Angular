export class OffenderMailRestrictions {

    private _offenderBookId: number;
    private _restrictionSeq: number;
    private _restrictioAddressId: number;
    private _restrictionType: string;
    private _startDate: Date;
    private _endDate: Date;
    private _activeFlag: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyUserId: string;
    private _modifyDatetime: Date;
    private _sealFlag: string;
    private _contactType: any;
    private _contactName: any;
    private _contactAddress: any;
    private _commentText: string;
    private _personId: number;
	private _corporateId: number;
    


    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get restrictionType(): string { return this._restrictionType; }
    set restrictionType(prestrictionType: string) { this._restrictionType = prestrictionType; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get endDate(): Date { return this._endDate; }
    set endDate(pendDate: Date) { this._endDate = pendDate; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get restrictioAddressId(): number { return this._restrictioAddressId; }
    set restrictioAddressId(prestrictioAddressId: number) { this._restrictioAddressId = prestrictioAddressId; }
    get restrictionSeq(): number { return this._restrictionSeq; }
    set restrictionSeq(prestrictionSeq: number) { this._restrictionSeq = prestrictionSeq; }
    get startDate(): Date { return this._startDate; }
    set startDate(pstartDate: Date) { this._startDate = pstartDate; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get contactAddress(): any { return this._contactAddress; }
    set contactAddress(value: any) { this._contactAddress = value; }
    get contactName(): any { return this._contactName; }
    set contactName(value: any) { this._contactName = value; }
    get contactType(): any { return this._contactType; }
    set contactType(value: any) { this._contactType = value; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get personId(): number { return this._personId; }
    set personId(value: number) { this._personId = value; }
    get corporateId(): number { return this._corporateId; }
    set corporateId(value: number) { this._corporateId = value; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'restrictionType': this._restrictionType,
            'offenderBookId': this._offenderBookId,
            'endDate': this._endDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'restrictioAddressId': this._restrictioAddressId,
            'restrictionSeq': this._restrictionSeq,
            'startDate': this._startDate,
            'activeFlag': this._activeFlag,
            'contactType': this._contactType,
            'contactName': this._contactName,
            'contactAddress': this._contactAddress,
            'sealFlag': this._sealFlag,
            'commentText': this._commentText,
            'personId': this._personId,
            'corporateId': this._corporateId
        };
    }
}