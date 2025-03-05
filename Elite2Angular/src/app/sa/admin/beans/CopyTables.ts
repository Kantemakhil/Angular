export class CopyTables {
    private _colName: string;
    private _createUserId: string;
    private _modifyDatetime: number;
    private _movementReasonCode: string;
    private _modifyUserId: string;
    private _seqName: string;
    private _tableName: string;
    private _createDatetime: number;
    private _expiryDate: number;
    private _serialVersionUID: number;
    private _tableOperationCode: string;
    private _movementType: string;
    private _listSeq: number;
    private _parentTable: string;
    private _sealFlag: string;
    private _updateAllowedFlag: string;
    private _activeFlag: string;
    private _returnValue:number;


    get returnValue(): number{ return this._returnValue; }
    set returnValue(preturnValue: number){ this._returnValue = preturnValue;}

    get colName(): string{ return this._colName; }
    set colName(pcolName: string){ this._colName = pcolName ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): number{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: number){ this._modifyDatetime = pmodifyDatetime ;}
    get movementReasonCode(): string{ return this._movementReasonCode; }
    set movementReasonCode(pmovementReasonCode: string){ this._movementReasonCode = pmovementReasonCode ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get seqName(): string{ return this._seqName; }
    set seqName(pseqName: string){ this._seqName = pseqName ;}
    get tableName(): string{ return this._tableName; }
    set tableName(ptableName: string){ this._tableName = ptableName ;}
    get createDatetime(): number{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: number){ this._createDatetime = pcreateDatetime ;}
    get expiryDate(): number{ return this._expiryDate; }
    set expiryDate(pexpiryDate: number){ this._expiryDate = pexpiryDate ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get tableOperationCode(): string{ return this._tableOperationCode; }
    set tableOperationCode(ptableOperationCode: string){ this._tableOperationCode = ptableOperationCode ;}
    get movementType(): string{ return this._movementType; }
    set movementType(pmovementType: string){ this._movementType = pmovementType ;}
    get listSeq(): number{ return this._listSeq; }
    set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
    get parentTable(): string{ return this._parentTable; }
    set parentTable(pparentTable: string){ this._parentTable = pparentTable ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get updateAllowedFlag(): string{ return this._updateAllowedFlag; }
    set updateAllowedFlag(pupdateAllowedFlag: string){ this._updateAllowedFlag = pupdateAllowedFlag ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}

toJSON(): any {
    return { 
       'colName': this._colName,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'movementReasonCode': this._movementReasonCode,
       'modifyUserId': this._modifyUserId,
       'seqName': this._seqName,
       'tableName': this._tableName,
       'createDatetime': this._createDatetime,
       'expiryDate': this._expiryDate,
       'serialVersionUID': this._serialVersionUID,
       'tableOperationCode': this._tableOperationCode,
       'movementType': this._movementType,
       'listSeq': this._listSeq,
       'parentTable': this._parentTable,
       'sealFlag': this._sealFlag,
       'updateAllowedFlag': this._updateAllowedFlag,
       'activeFlag': this._activeFlag,
       'returnValue': this._returnValue,
        };
    } 
}
