import { BaseModel } from "../../../common/beans/BaseModel";

export class OffenderFineDefaults extends BaseModel {
    private _createUserId: string;
    private _creationUser: string;
    private _fieldName: string;
    private _code: string;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _modifyUserId: string;
    private _dateImposed: Date;
    private _reissueOrderFlag: string;
    private _imposingAgyLocId: string;
    private _totalProfCode: string;
    private _serialVersionUID: number;
    private _totalOtherAmount: number;
    private _totalOtherCode: string;
    private _totalPenaltyAmount: number;
    private _reportByDate: Date;
    private _sealFlag: string;
    private _totalCourtAmount: number;
    private _totalProfAmount: number;
    private _amount: number;
    private _totalPenaltyCode: string;
    private _creationDate: Date;
    private _sentenceSeq: number;
    private _createDatetime: Date;
    private _totalAmountOwing: number;
    private _totalVclAmount: number;
    private _totalCourtCode: string;
    private _totalVclCode: string;

    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get creationUser(): string{ return this._creationUser; }
    set creationUser(pcreationUser: string){ this._creationUser = pcreationUser ;}
    get fieldName(): string{ return this._fieldName; }
    set fieldName(pfieldName: string){ this._fieldName = pfieldName ;}
    get code(): string{ return this._code; }
    set code(pcode: string){ this._code = pcode ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get dateImposed(): Date{ return this._dateImposed; }
    set dateImposed(pdateImposed: Date){ this._dateImposed = pdateImposed ;}
    get reissueOrderFlag(): string{ return this._reissueOrderFlag; }
    set reissueOrderFlag(preissueOrderFlag: string){ this._reissueOrderFlag = preissueOrderFlag ;}
    get imposingAgyLocId(): string{ return this._imposingAgyLocId; }
    set imposingAgyLocId(pimposingAgyLocId: string){ this._imposingAgyLocId = pimposingAgyLocId ;}
    get totalProfCode(): string{ return this._totalProfCode; }
    set totalProfCode(ptotalProfCode: string){ this._totalProfCode = ptotalProfCode ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get totalOtherAmount(): number{ return this._totalOtherAmount; }
    set totalOtherAmount(ptotalOtherAmount: number){ this._totalOtherAmount = ptotalOtherAmount ;}
    get totalOtherCode(): string{ return this._totalOtherCode; }
    set totalOtherCode(ptotalOtherCode: string){ this._totalOtherCode = ptotalOtherCode ;}
    get totalPenaltyAmount(): number{ return this._totalPenaltyAmount; }
    set totalPenaltyAmount(ptotalPenaltyAmount: number){ this._totalPenaltyAmount = ptotalPenaltyAmount ;}
    get reportByDate(): Date{ return this._reportByDate; }
    set reportByDate(preportByDate: Date){ this._reportByDate = preportByDate ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get totalCourtAmount(): number{ return this._totalCourtAmount; }
    set totalCourtAmount(ptotalCourtAmount: number){ this._totalCourtAmount = ptotalCourtAmount ;}
    get totalProfAmount(): number{ return this._totalProfAmount; }
    set totalProfAmount(ptotalProfAmount: number){ this._totalProfAmount = ptotalProfAmount ;}
    get amount(): number{ return this._amount; }
    set amount(pamount: number){ this._amount = pamount ;}
    get totalPenaltyCode(): string{ return this._totalPenaltyCode; }
    set totalPenaltyCode(ptotalPenaltyCode: string){ this._totalPenaltyCode = ptotalPenaltyCode ;}
    get creationDate(): Date{ return this._creationDate; }
    set creationDate(pcreationDate: Date){ this._creationDate = pcreationDate ;}
    get sentenceSeq(): number{ return this._sentenceSeq; }
    set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get totalAmountOwing(): number{ return this._totalAmountOwing; }
    set totalAmountOwing(ptotalAmountOwing: number){ this._totalAmountOwing = ptotalAmountOwing ;}
    get totalVclAmount(): number{ return this._totalVclAmount; }
    set totalVclAmount(ptotalVclAmount: number){ this._totalVclAmount = ptotalVclAmount ;}
    get totalCourtCode(): string{ return this._totalCourtCode; }
    set totalCourtCode(ptotalCourtCode: string){ this._totalCourtCode = ptotalCourtCode ;}
    get totalVclCode(): string{ return this._totalVclCode; }
    set totalVclCode(ptotalVclCode: string){ this._totalVclCode = ptotalVclCode ;}

toJSON(): any {
    return { 
       'createUserId': this._createUserId,
       'creationUser': this._creationUser,
       'fieldName': this._fieldName,
       'code': this._code,
       'modifyDatetime': this._modifyDatetime,
       'offenderBookId': this._offenderBookId,
       'modifyUserId': this._modifyUserId,
       'dateImposed': this._dateImposed,
       'reissueOrderFlag': this._reissueOrderFlag,
       'imposingAgyLocId': this._imposingAgyLocId,
       'totalProfCode': this._totalProfCode,
       'serialVersionUID': this._serialVersionUID,
       'totalOtherAmount': this._totalOtherAmount,
       'totalOtherCode': this._totalOtherCode,
       'totalPenaltyAmount': this._totalPenaltyAmount,
       'reportByDate': this._reportByDate,
       'sealFlag': this._sealFlag,
       'totalCourtAmount': this._totalCourtAmount,
       'totalProfAmount': this._totalProfAmount,
       'amount': this._amount,
       'totalPenaltyCode': this._totalPenaltyCode,
       'creationDate': this._creationDate,
       'sentenceSeq': this._sentenceSeq,
       'createDatetime': this._createDatetime,
       'totalAmountOwing': this._totalAmountOwing,
       'totalVclAmount': this._totalVclAmount,
       'totalCourtCode': this._totalCourtCode,
       'totalVclCode': this._totalVclCode,
        };
    } 

}