export class WorkFlows {
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _workFlowId: number;
    private _objectCode: string;
    private _modifyDatetime: Date;
    private _objectSeq: number;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _objectId: number;
    private _returnValue: number;
    private _moduleName: string;
    private _createDate: Date;
    private _workActionCode: string;
    get createDate(): Date { return this._createDate; }
    set createDate(pcreateDate: Date) { this._createDate = pcreateDate; }
    get moduleName(): string { return this._moduleName; }
    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get workFlowId(): number { return this._workFlowId; }
    set workFlowId(pworkFlowId: number) { this._workFlowId = pworkFlowId; }
    get objectCode(): string { return this._objectCode; }
    set objectCode(pobjectCode: string) { this._objectCode = pobjectCode; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get objectSeq(): number { return this._objectSeq; }
    set objectSeq(pobjectSeq: number) { this._objectSeq = pobjectSeq; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get objectId(): number { return this._objectId; }
    set objectId(pobjectId: number) { this._objectId = pobjectId; }

    get returnValue(): number { return this._returnValue; }
    set returnValue(preturnValue: number) { this._returnValue = preturnValue; }
    get workActionCode(): string { return this._workActionCode; }
    set workActionCode( pworkActionCode: string ) { this._workActionCode = pworkActionCode; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'workFlowId': this._workFlowId,
            'objectCode': this._objectCode,
            'modifyDatetime': this._modifyDatetime,
            'objectSeq': this._objectSeq,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'objectId': this._objectId,
            'returnValue': this._returnValue,
            'moduleName': this._moduleName,
            'createDate': this._createDate,
            'workActionCode': this._workActionCode,
        };
    }
}
