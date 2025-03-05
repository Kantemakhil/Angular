import { BaseModel } from "../../../common/beans/BaseModel";

export class OffenderSentenceTermsHty extends BaseModel{
    private _createUserId: string;
    private _hours: number;
    private _months: number;
    private _weeks: number;
    private _endDate: Date;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _modifyUserId: string;
    private _lifeSentenceFlag: string;
    private _years: number;
    private _sentenceSeq: number;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _termSeq: number;
    private _days: number;
    private _sentenceTermCode: string;
    private _sealFlag: string;
    private _startDate: Date;
    private _paroleSupervision: string;
    private _startTime: Date;
    private _endTime: Date;
    private _workHours: number;
    private _attendenceHours: number;
    private _sentenceEventId: number;
    private _totalHours: number;
    private  _isEnableSave: boolean;
    

    get isEnableSave(): boolean{ return this._isEnableSave; }
    set isEnableSave(pisEnableSave: boolean){ this._isEnableSave = pisEnableSave ;}
    get totalHours(): number{ return this._totalHours; }
    set totalHours(ptotalHours: number){ this._totalHours = ptotalHours ;}
    get sentenceEventId(): number{ return this._sentenceEventId; }
      set sentenceEventId(psentenceEventId: number){ this._sentenceEventId = psentenceEventId ;}
  
    get workHours(): number { return this._workHours; }
  
    set workHours(pworkHours: number) { this._workHours = pworkHours; }
  
    get attendenceHours(): number { return this._attendenceHours; }
  
    set attendenceHours(pattendenceHours: number) { this._attendenceHours = pattendenceHours; }
  
    get endTime(): Date { return this._endTime; }
  
    set endTime(pendTime: Date) { this._endTime = pendTime; }
  
    get startTime(): Date { return this._startTime; }
  
    set startTime(pstartTime: Date) { this._startTime = pstartTime; }
  
    get paroleSupervision(): string { return this._paroleSupervision; }
  
    set paroleSupervision(pparoleSupervision: string) { this._paroleSupervision = pparoleSupervision; }
  
    get createUserId(): string { return this._createUserId; }
  
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
  
    get hours(): number { return this._hours; }
  
    set hours(phours: number) { this._hours = phours; }
  
    get months(): number { return this._months; }
  
    set months(pmonths: number) { this._months = pmonths; }
  
    get weeks(): number { return this._weeks; }
  
    set weeks(pweeks: number) { this._weeks = pweeks; }
  
    get endDate(): Date { return this._endDate; }
  
    set endDate(pendDate: Date) { this._endDate = pendDate; }
  
    get modifyDatetime(): Date { return this._modifyDatetime; }
  
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
  
    get offenderBookId(): number { return this._offenderBookId; }
  
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
  
    get modifyUserId(): string { return this._modifyUserId; }
  
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
  
    get lifeSentenceFlag(): string { return this._lifeSentenceFlag; }
  
    set lifeSentenceFlag(plifeSentenceFlag: string) { this._lifeSentenceFlag = plifeSentenceFlag; }
  
    get years(): number { return this._years; }
  
    set years(pyears: number) { this._years = pyears; }
  
    get sentenceSeq(): number { return this._sentenceSeq; }
  
    set sentenceSeq(psentenceSeq: number) { this._sentenceSeq = psentenceSeq; }
  
    get createDatetime(): Date { return this._createDatetime; }
  
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
  
    get serialVersionUID(): number { return this._serialVersionUID; }
  
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
  
    get termSeq(): number { return this._termSeq; }
  
    set termSeq(ptermSeq: number) { this._termSeq = ptermSeq; }
  
    get days(): number { return this._days; }
  
    set days(pdays: number) { this._days = pdays; }
  
    get sentenceTermCode(): string { return this._sentenceTermCode; }
  
    set sentenceTermCode(psentenceTermCode: string) { this._sentenceTermCode = psentenceTermCode; }
  
    get sealFlag(): string { return this._sealFlag; }
  
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
  
    get startDate(): Date { return this._startDate; }
  
    set startDate(pstartDate: Date) { this._startDate = pstartDate; }
  
  
    toJSON(): any {
      return {
        'createUserId': this._createUserId,
        'hours': this._hours,
        'months': this._months,
        'weeks': this._weeks,
        'endDate': this._endDate,
        'modifyDatetime': this._modifyDatetime,
        'offenderBookId': this._offenderBookId,
        'modifyUserId': this._modifyUserId,
        'lifeSentenceFlag': this._lifeSentenceFlag,
        'years': this._years,
        'sentenceSeq': this._sentenceSeq,
        'createDatetime': this._createDatetime,
        'serialVersionUID': this._serialVersionUID,
        'termSeq': this._termSeq,
        'days': this._days,
        'sentenceTermCode': this._sentenceTermCode,
        'sealFlag': this._sealFlag,
        'startDate': this._startDate,
        'paroleSupervision': this._paroleSupervision,
        'startTime': this._startTime,
        'endTime': this._endTime,
        'attendenceHours': this._attendenceHours,
        'workHours': this._workHours,
        'sentenceEventId':this._sentenceEventId,
        'totalHours':this._totalHours,
        'isEnableSave':this._isEnableSave
      };
    }

    
}