export class GrievanceTxns {
    private _createUserId: string;
    private _code: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _description: string;
    private _txnType: string;
    private _igRspFlag: string;
    private _offRspFlag: string;
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _inserted: number;
    private _grievType: string;
    private _daysRespond: number;
    private _listSeq: number;
    private _docRspFlag: string;
    private _sealFlag: string;
    private _activeFlag: string;
    private _returnValue: number;
    private _deleteRecordCount: number;
    private _reasonsTabSecurity: string;
    private _txnTabSecurity: string;
    private _checkFlag: string;
    private _offFlag: string;
    private _agyFlag: string;
    private _supFlag: string;

    get offFlag(): string { return this._offFlag; }
    set offFlag(poffFlag: string) { this._offFlag = poffFlag; }

    get agyFlag(): string { return this._agyFlag; }
    set agyFlag(pagyFlag: string) { this._agyFlag = pagyFlag; }

    get supFlag(): string { return this._supFlag; }
    set supFlag(psupFlag: string) { this._supFlag = psupFlag; }

    get checkFlag(): string { return this._checkFlag; }
    set checkFlag(pcheckFlag: string) { this._checkFlag = pcheckFlag; }

    get reasonsTabSecurity(): string { return this._reasonsTabSecurity; }
    set reasonsTabSecurity(preasonsTabSecurity: string) { this._reasonsTabSecurity = preasonsTabSecurity; }
    get txnTabSecurity(): string { return this._txnTabSecurity; }
    set txnTabSecurity(ptxnTabSecurity: string) { this._txnTabSecurity = ptxnTabSecurity; }

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
    get txnType(): string { return this._txnType; }
    set txnType(ptxnType: string) { this._txnType = ptxnType; }
    get igRspFlag(): string { return this._igRspFlag; }
    set igRspFlag(pigRspFlag: string) { this._igRspFlag = pigRspFlag; }
    get offRspFlag(): string { return this._offRspFlag; }
    set offRspFlag(poffRspFlag: string) { this._offRspFlag = poffRspFlag; }
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
    get daysRespond(): number { return this._daysRespond; }
    set daysRespond(pdaysRespond: number) { this._daysRespond = pdaysRespond; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get docRspFlag(): string { return this._docRspFlag; }
    set docRspFlag(pdocRspFlag: string) { this._docRspFlag = pdocRspFlag; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get returnValue(): number { return this._returnValue; }
    set returnValue(preturnValue: number) { this._returnValue = preturnValue; }
    get deleteRecordCount(): number { return this._deleteRecordCount; }
    set deleteRecordCount(pdeleteRecordCount: number) { this._deleteRecordCount = pdeleteRecordCount; }
    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'code': this._code,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'description': this._description,
            'txnType': this._txnType,
            'igRspFlag': this._igRspFlag,
            'offRspFlag': this._offRspFlag,
            'expiryDate': this._expiryDate,
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'inserted': this._inserted,
            'grievType': this._grievType,
            'daysRespond': this._daysRespond,
            'listSeq': this._listSeq,
            'docRspFlag': this._docRspFlag,
            'sealFlag': this._sealFlag,
            'activeFlag': this._activeFlag,
            'returnValue': this._returnValue,
            'deleteRecordCount': this._deleteRecordCount,
            'reasonsTabSecurity': this._reasonsTabSecurity,
            'txnTabSecurity': this._txnTabSecurity,
            'checkFlag': this._checkFlag,
            'offFlag': this._offFlag,
            'agyFlag': this._agyFlag,
            'supFlag': this._supFlag,
        };
    }
}
