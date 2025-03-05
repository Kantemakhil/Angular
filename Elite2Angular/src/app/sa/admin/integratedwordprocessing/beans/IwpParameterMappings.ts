export class IwpParameterMappings {
    private _mappingId: number;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _fieldName: string;
    private _documentContextFlag: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _templateModuleId: number;
    private _bookmarkName: string;
    private _parameterName: string;
    private _dataType: string;

    get dataType(): string { return this._dataType; }

    set dataType(pdataType: string) { this._dataType = pdataType; }

    get bookmarkName(): string { return this._bookmarkName; }

    set bookmarkName(pbookmarkName: string) { this._bookmarkName = pbookmarkName; }

    get parameterName(): string { return this._parameterName; }

    set parameterName(pparameterName: string) { this._parameterName = pparameterName; }

    get templateModuleId(): number { return this._templateModuleId; }

    set templateModuleId(ptemplateModuleId: number) { this._templateModuleId = ptemplateModuleId; }

    get mappingId(): number { return this._mappingId; }

    set mappingId(pmappingId: number) { this._mappingId = pmappingId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get fieldName(): string { return this._fieldName; }

    set fieldName(pfieldName: string) { this._fieldName = pfieldName; }

    get documentContextFlag(): string { return this._documentContextFlag; }

    set documentContextFlag(pdocumentContextFlag: string) { this._documentContextFlag = pdocumentContextFlag; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }


    toJSON(): any {
        return {
            'mappingId': this._mappingId,
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'fieldName': this._fieldName,
            'documentContextFlag': this._documentContextFlag,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'templateModuleId': this._templateModuleId,
            'bookmarkName': this._bookmarkName,
            'parameterName': this._parameterName,
            'dataType': this._dataType
        };
    }
}
