export class IwpBookmarkParameters {
    private  _activeFlag: string;
	private  _createDatetime: Date;
	private  _createUserId: string;
	private  _dateCreated: Date;
	private  _description: string;
	private  _modifyDatetime: Date;
	private  _modifyUserId: string;
	private  _parameterDataType: string;
	private  _parameterType: string;
	private  _sealFlag: string;
	private  _userCreated: string;	
	private  _parameterName: string;
    private  _bookmarkName: string;
    private  _moduleBlockCode: string;
    private  _field: string;
    

    get moduleBlockCode(): string { return this._moduleBlockCode; }
    set moduleBlockCode(pmoduleBlockCode: string) { this._moduleBlockCode = pmoduleBlockCode; }

    get field(): string { return this._field; }
    set field(pfield: string) { this._field = pfield; }


    get bookmarkName(): string { return this._bookmarkName; }
    set bookmarkName(pbookmarkName: string) { this._bookmarkName = pbookmarkName; }

    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get dateCreated(): Date { return this._dateCreated; }
    set dateCreated(pdateCreated: Date) { this._dateCreated = pdateCreated; }

    get parameterName(): string { return this._parameterName; }
    set parameterName(pparameterName: string) { this._parameterName = pparameterName; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get userCreated(): string { return this._userCreated; }
    set userCreated(puserCreated: string) { this._userCreated = puserCreated; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get parameterType(): string { return this._parameterType; }
    set parameterType(pparameterType: string) { this._parameterType = pparameterType; }

    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }

    get parameterDataType(): string { return this._parameterDataType; }
    set parameterDataType(pparameterDataType: string) { this._parameterDataType = pparameterDataType; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    

    toJSON(): any {
        return {
            'bookmarkName': this._bookmarkName,
            'activeFlag': this._activeFlag,
            'modifyUserId': this._modifyUserId,
            'parameterDataType': this._parameterDataType,
            'description': this._description,
            'parameterType': this._parameterType,
            'modifyDatetime': this._modifyDatetime,
            'sealFlag': this._sealFlag,
            'createUserId': this._createUserId,
            'userCreated': this._userCreated,
            'createDatetime': this._createDatetime,
            'parameterName': this._parameterName,
            'dateCreated': this._dateCreated,
            'moduleBlockCode':this._moduleBlockCode,
            'field':this._field


        };
    }
}
