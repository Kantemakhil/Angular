import { BaseModel } from "@common/beans/BaseModel";

export  class VCbSentTerms extends  BaseModel {

    private _sentenceExpiryDate: Date;
    private _aggregateFlag: string;
    private _offenderBookId: number;
    private _endDate: Date;
    private _convictionDate: Date;
    private _statuteCode: string;
    private _paroleSupervision: string;
    private _termPeriod: string;
    private _serialVersionUID: number;
    private _offenceCode: string;
    private _sentenceTermCode: string;
    private _startTime: Date;
    private _chargeSeq: string;
    private _sentenceStartDate: Date;
    private _sentenceCategory: string;
    private _ovrStartDate: Date;
    private _sentenceCalcType: string;
    private _probableReleaseDate: Date;
    private _version: number;
    private _sentenceSeq: number;
    private _chargeInfoNumber: string;
    private _sentenceStatus: string;
    private _ovrEndDate: Date;
    private _termSeq: number;
    private _offenderId: number;
    private _endTime: Date;
    private _startDate: Date;
    private _message: string;
    private _selectFlag: string;
    private _lMinSd: Date;
    private _lMaxEd: Date;
    private _lNewDate: Date;
    private _lBtsDays: number;
    private _offBalCalcId: number;
    private _selectFlagCheck: boolean;

    get offBalCalcId(): number{ return this._offBalCalcId; }
    set offBalCalcId(poffBalCalcId: number){ this._offBalCalcId = poffBalCalcId;}
    get lBtsDays(): number{ return this._lBtsDays; }
    set lBtsDays(plBtsDays: number){ this._lBtsDays = plBtsDays ;}
    get lMinSd(): Date{ return this._lMinSd; }
    set lMinSd(plMinSd: Date){ this._lMinSd = plMinSd ;}
    get lMaxEd(): Date{ return this._lMaxEd; }
    set lMaxEd(plMaxEd: Date){ this._lMaxEd = plMaxEd ;}
    get lNewDate(): Date{ return this._lNewDate; }
    set lNewDate(plNewDate: Date){ this._lNewDate = plNewDate ;}
    get selectFlag(): string{ return this._selectFlag; }
    set selectFlag(pselectFlag: string){ this._selectFlag = pselectFlag ;}
    get message(): string{ return this._message; }
    set message(pmessage: string){ this._message = pmessage ;}
    get sentenceExpiryDate(): Date{ return this._sentenceExpiryDate; }
    set sentenceExpiryDate(psentenceExpiryDate: Date){ this._sentenceExpiryDate = psentenceExpiryDate ;}
    get aggregateFlag(): string{ return this._aggregateFlag; }
    set aggregateFlag(paggregateFlag: string){ this._aggregateFlag = paggregateFlag ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get endDate(): Date{ return this._endDate; }
    set endDate(pendDate: Date){ this._endDate = pendDate ;}
    get convictionDate(): Date{ return this._convictionDate; }
    set convictionDate(pconvictionDate: Date){ this._convictionDate = pconvictionDate ;}
    get statuteCode(): string{ return this._statuteCode; }
    set statuteCode(pstatuteCode: string){ this._statuteCode = pstatuteCode ;}
    get paroleSupervision(): string{ return this._paroleSupervision; }
    set paroleSupervision(pparoleSupervision: string){ this._paroleSupervision = pparoleSupervision ;}
    get termPeriod(): string{ return this._termPeriod; }
    set termPeriod(ptermPeriod: string){ this._termPeriod = ptermPeriod ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get offenceCode(): string{ return this._offenceCode; }
    set offenceCode(poffenceCode: string){ this._offenceCode = poffenceCode ;}
    get sentenceTermCode(): string{ return this._sentenceTermCode; }
    set sentenceTermCode(psentenceTermCode: string){ this._sentenceTermCode = psentenceTermCode ;}
    get startTime(): Date{ return this._startTime; }
    set startTime(pstartTime: Date){ this._startTime = pstartTime ;}
    get chargeSeq(): string{ return this._chargeSeq; }
    set chargeSeq(pchargeSeq: string){ this._chargeSeq = pchargeSeq ;}
    get sentenceStartDate(): Date{ return this._sentenceStartDate; }
    set sentenceStartDate(psentenceStartDate: Date){ this._sentenceStartDate = psentenceStartDate ;}
    get sentenceCategory(): string{ return this._sentenceCategory; }
    set sentenceCategory(psentenceCategory: string){ this._sentenceCategory = psentenceCategory ;}
    get ovrStartDate(): Date{ return this._ovrStartDate; }
    set ovrStartDate(povrStartDate: Date){ this._ovrStartDate = povrStartDate ;}
    get sentenceCalcType(): string{ return this._sentenceCalcType; }
    set sentenceCalcType(psentenceCalcType: string){ this._sentenceCalcType = psentenceCalcType ;}
    get probableReleaseDate(): Date{ return this._probableReleaseDate; }
    set probableReleaseDate(pprobableReleaseDate: Date){ this._probableReleaseDate = pprobableReleaseDate ;}
    get version(): number{ return this._version; }
    set version(pversion: number){ this._version = pversion ;}
    get sentenceSeq(): number{ return this._sentenceSeq; }
    set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq ;}
    get chargeInfoNumber(): string{ return this._chargeInfoNumber; }
    set chargeInfoNumber(pchargeInfoNumber: string){ this._chargeInfoNumber = pchargeInfoNumber ;}
    get sentenceStatus(): string{ return this._sentenceStatus; }
    set sentenceStatus(psentenceStatus: string){ this._sentenceStatus = psentenceStatus ;}
    get ovrEndDate(): Date{ return this._ovrEndDate; }
    set ovrEndDate(povrEndDate: Date){ this._ovrEndDate = povrEndDate ;}
    get termSeq(): number{ return this._termSeq; }
    set termSeq(ptermSeq: number){ this._termSeq = ptermSeq ;}
    get offenderId(): number{ return this._offenderId; }
    set offenderId(poffenderId: number){ this._offenderId = poffenderId ;}
    get endTime(): Date{ return this._endTime; }
    set endTime(pendTime: Date){ this._endTime = pendTime ;}
    get startDate(): Date{ return this._startDate; }
    set startDate(pstartDate: Date){ this._startDate = pstartDate ;}
    get selectFlagCheck(): boolean{ return this._selectFlagCheck; }
    set selectFlagCheck(pselectFlagCheck: boolean){ this._selectFlagCheck = pselectFlagCheck ;}

toJSON(): any {
    return { 
       'sentenceExpiryDate': this._sentenceExpiryDate,
       'aggregateFlag': this._aggregateFlag,
       'offenderBookId': this._offenderBookId,
       'endDate': this._endDate,
       'convictionDate': this._convictionDate,
       'statuteCode': this._statuteCode,
       'paroleSupervision': this._paroleSupervision,
       'termPeriod': this._termPeriod,
       'serialVersionUID': this._serialVersionUID,
       'offenceCode': this._offenceCode,
       'sentenceTermCode': this._sentenceTermCode,
       'startTime': this._startTime,
       'chargeSeq': this._chargeSeq,
       'sentenceStartDate': this._sentenceStartDate,
       'sentenceCategory': this._sentenceCategory,
       'ovrStartDate': this._ovrStartDate,
       'sentenceCalcType': this._sentenceCalcType,
       'probableReleaseDate': this._probableReleaseDate,
       'version': this._version,
       'sentenceSeq': this._sentenceSeq,
       'chargeInfoNumber': this._chargeInfoNumber,
       'sentenceStatus': this._sentenceStatus,
       'ovrEndDate': this._ovrEndDate,
       'termSeq': this._termSeq,
       'offenderId': this._offenderId,
       'endTime': this._endTime,
       'startDate': this._startDate,
       'message': this._message,
       'selectFlag': this._selectFlag,
       'lMinSd': this._lMinSd,
       'lMaxEd': this._lMaxEd,
       'lNewDate': this._lNewDate,
       'lBtsDays': this._lBtsDays,
       'offBalCalcId': this._offBalCalcId,
       'selectFlagCheck': this._selectFlagCheck,
        };
    } 
}
