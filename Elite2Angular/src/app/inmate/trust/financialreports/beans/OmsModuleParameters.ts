export class OmsModuleParameters {
    private _parameterType: string;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _moduleName: string;
    private _parameterLovSelect: string;
    private _parameterName: string;
    private _parameterCode: string;
    private _commentText: string;
    private _parameterLovTitle: string;
    private _parameterDomain: string;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _parameterSeq: number;
    private _parameterLovGroup: string;
    private _optionalFlag: string;
    private _multivalueFlag: string;
    private _sealFlag: string;
    private _reportApplnCode: string;

    get parameterType(): string { return this._parameterType; }
    set parameterType(pparameterType: string) { this._parameterType = pparameterType; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get moduleName(): string { return this._moduleName; }
    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }
    get parameterLovSelect(): string { return this._parameterLovSelect; }
    set parameterLovSelect(pparameterLovSelect: string) { this._parameterLovSelect = pparameterLovSelect; }
    get parameterName(): string { return this._parameterName; }
    set parameterName(pparameterName: string) { this._parameterName = pparameterName; }
    get parameterCode(): string { return this._parameterCode; }
    set parameterCode(pparameterCode: string) { this._parameterCode = pparameterCode; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get parameterLovTitle(): string { return this._parameterLovTitle; }
    set parameterLovTitle(pparameterLovTitle: string) { this._parameterLovTitle = pparameterLovTitle; }
    get parameterDomain(): string { return this._parameterDomain; }
    set parameterDomain(pparameterDomain: string) { this._parameterDomain = pparameterDomain; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get parameterSeq(): number { return this._parameterSeq; }
    set parameterSeq(pparameterSeq: number) { this._parameterSeq = pparameterSeq; }
    get parameterLovGroup(): string { return this._parameterLovGroup; }
    set parameterLovGroup(pparameterLovGroup: string) { this._parameterLovGroup = pparameterLovGroup; }
    get optionalFlag(): string { return this._optionalFlag; }
    set optionalFlag(poptionalFlag: string) { this._optionalFlag = poptionalFlag; }
    get multivalueFlag(): string { return this._multivalueFlag; }
    set multivalueFlag(pmultivalueFlag: string) { this._multivalueFlag = pmultivalueFlag; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get reportApplnCode(): string { return this._reportApplnCode; }
    set reportApplnCode(preportApplnCode: string) { this._reportApplnCode = preportApplnCode; }

    toJSON(): any {
        return {
            'parameterType': this._parameterType,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'moduleName': this._moduleName,
            'parameterLovSelect': this._parameterLovSelect,
            'parameterName': this._parameterName,
            'parameterCode': this._parameterCode,
            'commentText': this._commentText,
            'parameterLovTitle': this._parameterLovTitle,
            'parameterDomain': this._parameterDomain,
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'parameterSeq': this._parameterSeq,
            'parameterLovGroup': this._parameterLovGroup,
            'optionalFlag': this._optionalFlag,
            'multivalueFlag': this._multivalueFlag,
            'sealFlag': this._sealFlag,
            'reportApplnCode': this._reportApplnCode,
        };
    }
}