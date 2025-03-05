export class OicSanctionLimits {
    private _serialVersionUID: number;
    private _createUserId: string;
    private _maxDays: number;
    private _modifyDatetime: Date;
    private _oicHearingType: string;
    private _oicSanctionCode: string;
    private _compensationAmount: number;
    private _modifyUserId: string;
    private _description: string;
    private _sealFlag: string;
    private _createDatetime: Date;
    private _maxMonth: number;
    private _listSeq: number;
    private _rowId: string;
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get maxDays(): number{ return this._maxDays; }
    set maxDays(pmaxDays: number){ this._maxDays = pmaxDays ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get oicHearingType(): string{ return this._oicHearingType; }
    set oicHearingType(poicHearingType: string){ this._oicHearingType = poicHearingType ;}
    get oicSanctionCode(): string{ return this._oicSanctionCode; }
    set oicSanctionCode(poicSanctionCode: string){ this._oicSanctionCode = poicSanctionCode ;}
    get compensationAmount(): number{ return this._compensationAmount; }
    set compensationAmount(pcompensationAmount: number){ this._compensationAmount = pcompensationAmount ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get description(): string{ return this._description; }
    set description(pdescription: string){ this._description = pdescription ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get maxMonth(): number{ return this._maxMonth; }
    set maxMonth(pmaxMonth: number){ this._maxMonth = pmaxMonth ;}
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get rowId(): string { return this._rowId; }
	set rowId(prowId: string) { this._rowId = prowId; }
toJSON(): any {
    return { 
       'serialVersionUID': this._serialVersionUID,
       'createUserId': this._createUserId,
       'maxDays': this._maxDays,
       'modifyDatetime': this._modifyDatetime,
       'oicHearingType': this._oicHearingType,
       'oicSanctionCode': this._oicSanctionCode,
       'compensationAmount': this._compensationAmount,
       'modifyUserId': this._modifyUserId,
       'description': this._description,
       'sealFlag': this._sealFlag,
       'createDatetime': this._createDatetime,
       'maxMonth': this._maxMonth,
       'listSeq': this._listSeq,
       'rowId': this._rowId,
        };
    }  
}
