export class IwpTemplateRoles {
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _roleCode: string;
    private _modifyUserId: string;
    private _roleName: string;
    private _sealFlag: string;
    private _templateId: number;

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get roleCode(): string { return this._roleCode; }

    set roleCode(proleCode: string) { this._roleCode = proleCode; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get roleName(): string { return this._roleName; }

    set roleName(proleName: string) { this._roleName = proleName; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get templateId(): number { return this._templateId; }

    set templateId(ptemplateId: number) { this._templateId = ptemplateId; }


    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'roleCode': this._roleCode,
            'modifyUserId': this._modifyUserId,
            'roleName': this._roleName,
            'sealFlag': this._sealFlag,
            'templateId': this._templateId,
        };
    }
}
