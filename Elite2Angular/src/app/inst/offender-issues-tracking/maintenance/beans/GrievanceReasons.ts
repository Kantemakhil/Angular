export class GrievanceReasons {
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _grievReasonCode: string;
    private _modifyUserId: string;
    private _description: string;
    private _modifiedDatetime: Date;
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _modifiedUserId: string;
    private _grievType: string;
    private _listSeq: number;
    private _sealFlag: string;
    private _activeFlag: string;
    private _returnValue: number;
    private _deleteCountRecord: number;
    private _checkFlag: string;

    get checkFlag(): string { return this._checkFlag; }
    set checkFlag(pcheckFlag: string) { this._checkFlag = pcheckFlag; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get grievReasonCode(): string { return this._grievReasonCode; }
    set grievReasonCode(pgrievReasonCode: string) { this._grievReasonCode = pgrievReasonCode; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get modifiedDatetime(): Date { return this._modifiedDatetime; }
    set modifiedDatetime(pmodifiedDatetime: Date) { this._modifiedDatetime = pmodifiedDatetime; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get modifiedUserId(): string { return this._modifiedUserId; }
    set modifiedUserId(pmodifiedUserId: string) { this._modifiedUserId = pmodifiedUserId; }
    get grievType(): string { return this._grievType; }
    set grievType(pgrievType: string) { this._grievType = pgrievType; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get returnValue(): number { return this._returnValue; }
    set returnValue(preturnValue: number) { this._returnValue = preturnValue; }

    get deleteCountRecord(): number { return this._deleteCountRecord; }
    set deleteCountRecord(pdeleteCountRecord: number) { this._deleteCountRecord = pdeleteCountRecord; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'grievReasonCode': this._grievReasonCode,
            'modifyUserId': this._modifyUserId,
            'description': this._description,
            'modifiedDatetime': this._modifiedDatetime,
            'createDatetime': this._createDatetime,
            'expiryDate': this._expiryDate,
            'serialVersionUID': this._serialVersionUID,
            'modifiedUserId': this._modifiedUserId,
            'grievType': this._grievType,
            'listSeq': this._listSeq,
            'sealFlag': this._sealFlag,
            'activeFlag': this._activeFlag,
            'returnValue': this._returnValue,
            'deleteCountRecord': this._deleteCountRecord,
            'checkFlag': this._checkFlag,
        };
    }
}
