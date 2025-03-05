export class WorkIwpTemplate {
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _listSeq: number;
    private _sealFlag: string;
    private _templateId: number;
    private _workId: number;
    private _activeFlag: string;
    private _templateIdVal: string;

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get templateId(): number { return this._templateId; }

    set templateId(ptemplateId: number) { this._templateId = ptemplateId; }

    get workId(): number { return this._workId; }

    set workId(pworkId: number) { this._workId = pworkId; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

   get templateIdVal(): string { return this._templateIdVal; }

    set templateIdVal(ptemplateIdVal: string) { this._templateIdVal = ptemplateIdVal; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'expiryDate': this._expiryDate,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'listSeq': this._listSeq,
            'sealFlag': this._sealFlag,
            'templateId': this._templateId,
            'workId': this._workId,
            'activeFlag': this._activeFlag,
            'templateIdVal': this._templateIdVal,
        };
    }
}
