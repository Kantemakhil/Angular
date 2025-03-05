export class Work {
    private _createUserId: string;
    private _code: string;
    private _emailBody: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _moduleName: string;
    private _caseloadType: string;
    private _emailSubject: string;
    private _workId: number;
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _workType: string;
    private _workflowType: string;
    private _sealFlag: string;
    private _manualCloseFlag: string;
    private _manualSelectFlag: string;
    private _workSubType: string;
    private _activeFlag: string;
    private _casenoteFlag: number;
    private _caseNoteText: string;
    private _roleId: number;
    private _createFlag: any;
    private _viewFlag: any;
    public get roleId(): number {
        return this._roleId;
    }
    public set roleId(value: number) {
        this._roleId = value;
    }
   
    public get createFlag(): any {
        return this._createFlag;
    }
    public set createFlag(value: any) {
        this._createFlag = value;
    }
   
    public get viewFlag(): any {
        return this._viewFlag;
    }
    public set viewFlag(value: any) {
        this._viewFlag = value;
    }

    get casenoteFlag(): number { return this._casenoteFlag; }

    set casenoteFlag(pcasenoteFlag: number) { this._casenoteFlag = pcasenoteFlag; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get code(): string { return this._code; }

    set code(pcode: string) { this._code = pcode; }

    get emailBody(): string { return this._emailBody; }

    set emailBody(pemailBody: string) { this._emailBody = pemailBody; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get moduleName(): string { return this._moduleName; }

    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }

    get caseloadType(): string { return this._caseloadType; }

    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }

    get emailSubject(): string { return this._emailSubject; }

    set emailSubject(pemailSubject: string) { this._emailSubject = pemailSubject; }

    get workId(): number { return this._workId; }

    set workId(pworkId: number) { this._workId = pworkId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get workType(): string { return this._workType; }

    set workType(pworkType: string) { this._workType = pworkType; }

    get workflowType(): string { return this._workflowType; }

    set workflowType(pworkflowType: string) { this._workflowType = pworkflowType; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get manualCloseFlag(): string { return this._manualCloseFlag; }

    set manualCloseFlag(pmanualCloseFlag: string) { this._manualCloseFlag = pmanualCloseFlag; }

    get manualSelectFlag(): string { return this._manualSelectFlag; }

    set manualSelectFlag(pmanualSelectFlag: string) { this._manualSelectFlag = pmanualSelectFlag; }

    get workSubType(): string { return this._workSubType; }

    set workSubType(pworkSubType: string) { this._workSubType = pworkSubType; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }


    get caseNoteText(): string { return this._caseNoteText; }

    set caseNoteText(pcaseNoteText: string) { this._caseNoteText = pcaseNoteText; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'code': this._code,
            'emailBody': this._emailBody,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'moduleName': this._moduleName,
            'caseloadType': this._caseloadType,
            'emailSubject': this._emailSubject,
            'workId': this._workId,
            'createDatetime': this._createDatetime,
            'expiryDate': this._expiryDate,
            'serialVersionUID': this._serialVersionUID,
            'workType': this._workType,
            'workflowType': this._workflowType,
            'sealFlag': this._sealFlag,
            'manualCloseFlag': this._manualCloseFlag,
            'manualSelectFlag': this._manualSelectFlag,
            'workSubType': this._workSubType,
            'activeFlag': this._activeFlag,
            'casenoteFlag': this._casenoteFlag,
            'caseNoteText': this._caseNoteText,
            'roleId': this._roleId,
            'createFlag': this._createFlag,
            'viewFlag': this._viewFlag
        };
    }
}
