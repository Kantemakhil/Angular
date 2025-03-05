import { BaseModel } from "@common/beans/BaseModel";

export class MostSeriousOffence extends BaseModel {
    private _termPeriod: string;
    private _serialVersionUID: number;
    private _endDate: Date;
    private _sentenceTermCode: string;
    private _sentenceSeq: number;
    private _startDate: Date;
    private _offenceDesc: string;
    private _complicityTypeDesc: string;
    private _intCnts: string;
    private _nbtEndDate: string;
    private _nbtStartDate: string;
    private _offenderBookId: number;
    private _mostSeriousSentenceSeq: number;
    private _initialCount: number;

    get initialCount(): number { return this._initialCount; }
    set initialCount(initialCount: number) { this._initialCount = initialCount; }
    get mostSeriousSentenceSeq(): number { return this._mostSeriousSentenceSeq; }
    set mostSeriousSentenceSeq(mostSeriousSentenceSeq: number) { this._mostSeriousSentenceSeq = mostSeriousSentenceSeq; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }
    get nbtEndDate(): string{ return this._nbtEndDate; }
    set nbtEndDate(nbtEndDate: string){ this._nbtEndDate = nbtEndDate ;}
    get nbtStartDate(): string{ return this._nbtStartDate; }
    set nbtStartDate(nbtStartDate: string){ this._nbtStartDate = nbtStartDate ;}
    get termPeriod(): string{ return this._termPeriod; }
    set termPeriod(ptermPeriod: string){ this._termPeriod = ptermPeriod ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get endDate(): Date{ return this._endDate; }
    set endDate(pendDate: Date){ this._endDate = pendDate ;}
    get sentenceTermCode(): string{ return this._sentenceTermCode; }
    set sentenceTermCode(psentenceTermCode: string){ this._sentenceTermCode = psentenceTermCode ;}
    get sentenceSeq(): number{ return this._sentenceSeq; }
    set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq ;}
    get startDate(): Date{ return this._startDate; }
    set startDate(pstartDate: Date){ this._startDate = pstartDate ;}
    get offenceDesc(): string{ return this._offenceDesc; }
    set offenceDesc(poffenceDesc: string){ this._offenceDesc = poffenceDesc ;}
    get complicityTypeDesc(): string{ return this._complicityTypeDesc; }
    set complicityTypeDesc(pcomplicityTypeDesc: string){ this._complicityTypeDesc = pcomplicityTypeDesc ;}
    get intCnts(): string{ return this._intCnts; }
    set intCnts(pintCnts: string){ this._intCnts = pintCnts ;}

toJSON(): any {
    return {
        'offenderBookId': this._offenderBookId,
       'termPeriod': this._termPeriod,
       'serialVersionUID': this._serialVersionUID,
       'endDate': this._endDate,
       'sentenceTermCode': this._sentenceTermCode,
       'sentenceSeq': this._sentenceSeq,
       'startDate': this._startDate,
       'offenceDesc': this._offenceDesc,
       'complicityTypeDesc': this._complicityTypeDesc,
       'intCnts': this._intCnts,
       'nbtEndDate': this._nbtEndDate,
       'nbtStartDate': this.nbtStartDate,
       'mostSeriousSentenceSeq': this._mostSeriousSentenceSeq,
       'initialCount': this._initialCount,
        };
    }
}
