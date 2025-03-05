export class TransactionFeeDetails {
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDate: Date;
    private _receiptDeductionType: string;
    private _modifyDatetime: Date;
    private _caseloadId: string;
    private _deductionType: string;
    private _modifyUserId: string;
    private _listSeq: number;
    private _sealFlag: string;
    private _returnValue:number;
    private _rowId: string;
    get returnValue(): number{ return this._returnValue; }
    set returnValue(preturnValue: number){ this._returnValue = preturnValue;}

    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDate(): Date{ return this._modifyDate; }
    set modifyDate(pmodifyDate: Date){ this._modifyDate = pmodifyDate ;}
    get receiptDeductionType(): string{ return this._receiptDeductionType; }
    set receiptDeductionType(preceiptDeductionType: string){ this._receiptDeductionType = preceiptDeductionType ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get caseloadId(): string{ return this._caseloadId; }
    set caseloadId(pcaseloadId: string){ this._caseloadId = pcaseloadId ;}
    get deductionType(): string{ return this._deductionType; }
    set deductionType(pdeductionType: string){ this._deductionType = pdeductionType ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get listSeq(): number{ return this._listSeq; }
    set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get rowId(): string { return this._rowId; }
	set rowId(prowId: string) { this._rowId = prowId; }
toJSON(): any {
    return { 
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'createUserId': this._createUserId,
       'modifyDate': this._modifyDate,
       'receiptDeductionType': this._receiptDeductionType,
       'modifyDatetime': this._modifyDatetime,
       'caseloadId': this._caseloadId,
       'deductionType': this._deductionType,
       'modifyUserId': this._modifyUserId,
       'listSeq': this._listSeq,
       'sealFlag': this._sealFlag,
       'returnValue': this._returnValue,
       'rowId': this._rowId,
        };
    }  
}
