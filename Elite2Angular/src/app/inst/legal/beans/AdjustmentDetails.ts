import { BaseModel } from '@commonbeans/BaseModel'
export class AdjustmentDetails extends BaseModel {
    private _offenderSentenceAdjustId: number;
    private _sentenceAdjustCode: string;
    private _fromDate: Date;
    private _toDate: Date;
    private _days: number;
    private _comment:string;
    private _offenderBookId: number;
    private _postedDate: Date;
    private _modifyDateTime: Date;
    private _modifyUserId: string;
    private _createUserId: string;
    private _createDateTime: Date;
    private _sentenceSeq: number;
    private _offenceDate: Date;

get offenderBookId(): number { return this._offenderBookId; }

set offenderBookId( offenderBookId: number ) { this._offenderBookId = offenderBookId; }

get offenderSentenceAdjustId(): number { return this._offenderSentenceAdjustId; }

set offenderSentenceAdjustId( offenderSentenceAdjustId: number ) { this._offenderSentenceAdjustId = offenderSentenceAdjustId; }

get sentenceAdjustCode(): string { return this._sentenceAdjustCode; }

set sentenceAdjustCode( sentenceAdjustCode: string ) { this._sentenceAdjustCode = sentenceAdjustCode; }

get fromDate(): Date { return this._fromDate; }

set fromDate( fromDate: Date ) { this._fromDate = fromDate; }

get toDate(): Date { return this._toDate; }

set toDate( toDate: Date ) { this._toDate = toDate; }

get days(): number { return this._days; }

set days( days: number ) { this._days = days; }

get comment(): string { return this._comment; }

set comment( comment: string ) { this._comment = comment; }

get postedDate(): Date { return this._postedDate; }

set postedDate( postedDate: Date ) { this._postedDate = postedDate; }

get modifyDateTime(): Date { return this._modifyDateTime; }

set modifyDateTime( modifyDateTime: Date ) { this._modifyDateTime = modifyDateTime; }

get createDateTime(): Date { return this._createDateTime; }

set createDateTime( createDateTime: Date ) { this._createDateTime = createDateTime; }

get modifyUserId(): string { return this._modifyUserId; }

set modifyUserId( modifyUserId: string ) { this._modifyUserId = modifyUserId; }

get createUserId(): string { return this._createUserId; }

set createUserId( createUserId: string ) { this._createUserId = createUserId; }

get sentenceSeq(): number { return this._sentenceSeq; }

set sentenceSeq( sentenceSeq: number ) { this._sentenceSeq = sentenceSeq; }

get offenceDate(): Date { return this._offenceDate; }

set offenceDate( offenceDate: Date ) { this._offenceDate = offenceDate; }

toJSON(): any {
    return {
        'offenderBookId': this._offenderBookId,
        'offenderSentenceAdjustId': this._offenderSentenceAdjustId,
        'sentenceAdjustCode': this._sentenceAdjustCode,
        'fromDate': this._fromDate,
        'toDate': this._toDate,
        'days': this._days,
        'comment':this._comment,
        'postedDate':this._postedDate,
        'createUserId': this._createUserId,
        'createDateTime': this._createDateTime,
        'modifyDateTime': this._modifyDateTime,
        'modifyUserId': this._modifyUserId,
        'sentenceSeq':this._sentenceSeq,
        'offenceDate':this._offenceDate

    }
}
}


