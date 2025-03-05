export class GrievanceTypes {
    private _createUserId: string;
    private _code: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _description: string;
    private _modifiedDatetime: Date;
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _inserted: number;
    private _grievType: string;
    private _modifiedUserId: string;
    private _staffInvolvedFlag: string;
    private _listSeq: number;
    private _sealFlag: string;
    private _activeFlag: string;
    private _returnValue: number;
    private _roleId: number;
    private _createFlag: any;
    private _viewFlag: any;
    private _isSaved: string;

    

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get code(): string { return this._code; }
    set code(pcode: string) { this._code = pcode; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get modifiedDatetime(): Date { return this._modifiedDatetime; }
    set modifiedDatetime(pmodifiedDatetime: Date) { this._modifiedDatetime = pmodifiedDatetime; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get inserted(): number { return this._inserted; }
    set inserted(pinserted: number) { this._inserted = pinserted; }
    get grievType(): string { return this._grievType; }
    set grievType(pgrievType: string) { this._grievType = pgrievType; }
    get modifiedUserId(): string { return this._modifiedUserId; }
    set modifiedUserId(pmodifiedUserId: string) { this._modifiedUserId = pmodifiedUserId; }
    get staffInvolvedFlag(): string { return this._staffInvolvedFlag; }
    set staffInvolvedFlag(pstaffInvolvedFlag: string) { this._staffInvolvedFlag = pstaffInvolvedFlag; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get returnValue(): number { return this._returnValue; }
    set returnValue(preturnValue: number) { this._returnValue = preturnValue; }
    get isSaved(): string { return this._isSaved; }
    set isSaved(pisSaved: string) { this._isSaved = pisSaved; }
    public get roleId(): number { return this._roleId; }
    public set roleId(value: number) {this._roleId = value;}
    public get createFlag(): any {return this._createFlag;}
    public set createFlag(value: any) {this._createFlag = value;}
    public get viewFlag(): any { return this._viewFlag;}
    public set viewFlag(value: any) { this._viewFlag = value;}

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'code': this._code,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'description': this._description,
            'modifiedDatetime': this._modifiedDatetime,
            'expiryDate': this._expiryDate,
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'inserted': this._inserted,
            'grievType': this._grievType,
            'modifiedUserId': this._modifiedUserId,
            'staffInvolvedFlag': this._staffInvolvedFlag,
            'listSeq': this._listSeq,
            'sealFlag': this._sealFlag,
            'activeFlag': this._activeFlag,
            'returnValue': this._returnValue,
            'roleId': this._roleId,
            'createFlag': this._createFlag,
            'viewFlag': this._viewFlag,
            'isSaved': this._isSaved
        };
    }
}
