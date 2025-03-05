export class IwpBookmarks {
    private _bookmarkName: string;

	private  _activeFlag: string;

	private  _bookmarkType: string;

	private  _createDatetime: Date;

	private  _createUserId: string;

	private  _dateCreated: Date;

	private  _description: string;

	private  _expiryDate: Date;

	private  _modifyDatetime: Date;

	private  _modifyUserId: string;

	private  _sealFlag: string;

	private  _sqlText: string;

	private  _sqlVerifiedFlag: string;

    private  _userCreated: string;
    

    get bookmarkName(): string { return this._bookmarkName; }
    set bookmarkName(pbookmarkName: string) { this._bookmarkName = pbookmarkName; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }


    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get bookmarkType(): string { return this._bookmarkType; }
    set bookmarkType(pbookmarkType: string) { this._bookmarkType = pbookmarkType; }

    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }

    get dateCreated(): Date { return this._dateCreated; }
    set dateCreated(pdateCreated: Date) { this._dateCreated = pdateCreated; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }


    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get sqlText(): string { return this._sqlText; }
    set sqlText(psqlText: string) { this._sqlText = psqlText; }

    get sqlVerifiedFlag(): string { return this._sqlVerifiedFlag; }
    set sqlVerifiedFlag(psqlVerifiedFlag: string) { this._sqlVerifiedFlag = psqlVerifiedFlag; }

    get userCreated(): string { return this._userCreated; }
    set userCreated(puserCreated: string) { this._userCreated = puserCreated; }



    toJSON(): any {
        return {
            'bookmarkName': this._bookmarkName,
            'activeFlag': this._activeFlag,
            'bookmarkType': this._bookmarkType,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'dateCreated': this._dateCreated,
            'description': this._description,
            'expiryDate': this._expiryDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'sqlText': this._sqlText,
            'sqlVerifiedFlag': this._sqlVerifiedFlag,
            'userCreated': this._userCreated,

        };
    }
}
