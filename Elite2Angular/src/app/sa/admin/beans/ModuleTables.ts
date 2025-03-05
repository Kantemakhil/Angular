export class ModuleTables {
    private _createDatetime: Date;
    private _moduleTabId: number;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _moduleName: string;
    private _objectName: string;
    private _sealFlag: string;
    private _auditFlag: string;
    private _moduleBlock: string;
    private _disableAuditFlag: string;
    private _tableComment: string;
    

    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get moduleTabId(): number{ return this._moduleTabId; }
    set moduleTabId(pmoduleTabId: number){ this._moduleTabId = pmoduleTabId ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get moduleName(): string{ return this._moduleName; }
    set moduleName(pmoduleName: string){ this._moduleName = pmoduleName ;}
    get objectName(): string{ return this._objectName; }
    set objectName(pobjectName: string){ this._objectName = pobjectName ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}

    get auditFlag(): string{ return this._auditFlag; }
    set auditFlag(pauditFlag: string){ this._auditFlag = pauditFlag ;}
    get moduleBlock(): string{ return this._moduleBlock; }
    set moduleBlock(pmoduleBlock: string){ this._moduleBlock = pmoduleBlock ;}
    get disableAuditFlag(): string{ return this._disableAuditFlag; }
    set disableAuditFlag(pdisableAuditFlag: string){ this._disableAuditFlag = pdisableAuditFlag ;}

    get tableComment(): string{ return this._tableComment; }
    set tableComment(ptableComment: string){ this._tableComment = ptableComment ;}

    


    private : string;
toJSON(): any {
    return { 
       'createDatetime': this._createDatetime,
       'moduleTabId': this._moduleTabId,
       'serialVersionUID': this._serialVersionUID,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'moduleName': this._moduleName,
       'objectName': this._objectName,
       'sealFlag': this._sealFlag,
       'auditFlag':this._auditFlag,
       'moduleBlock':this._moduleBlock,
       'disableAuditFlag':this._disableAuditFlag,
       'tableComment':this._tableComment
        };
    } 
}