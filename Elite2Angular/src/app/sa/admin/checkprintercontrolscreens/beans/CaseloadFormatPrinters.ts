export class CaseloadFormatPrinters {
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _defaultPrinterId: string;
    private _printResourceId: string;
    private _modifyDatetime: Date;
    private _caseloadId: string;
    private _modifyUserId: string;
    private _printResourceFile: string;
    private _sealFlag: string;
    private _printFormatCode: string;
    private _returnValue: number;
    
    get returnValue(): number{ return this._returnValue; }
    set returnValue(preturnValue: number){ this._returnValue = preturnValue;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get defaultPrinterId(): string{ return this._defaultPrinterId; }
    set defaultPrinterId(pdefaultPrinterId: string){ this._defaultPrinterId = pdefaultPrinterId ;}
    get printResourceId(): string{ return this._printResourceId; }
    set printResourceId(pprintResourceId: string){ this._printResourceId = pprintResourceId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get caseloadId(): string{ return this._caseloadId; }
    set caseloadId(pcaseloadId: string){ this._caseloadId = pcaseloadId ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get printResourceFile(): string{ return this._printResourceFile; }
    set printResourceFile(pprintResourceFile: string){ this._printResourceFile = pprintResourceFile ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get printFormatCode(): string{ return this._printFormatCode; }
    set printFormatCode(pprintFormatCode: string){ this._printFormatCode = pprintFormatCode ;}

toJSON(): any {
    return { 
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'createUserId': this._createUserId,
       'defaultPrinterId': this._defaultPrinterId,
       'printResourceId': this._printResourceId,
       'modifyDatetime': this._modifyDatetime,
       'caseloadId': this._caseloadId,
       'modifyUserId': this._modifyUserId,
       'printResourceFile': this._printResourceFile,
       'sealFlag': this._sealFlag,
       'printFormatCode': this._printFormatCode,
       'returnValue': this._returnValue,
        };
    }  
}