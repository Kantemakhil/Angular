import { BaseModel } from '@commonbeans/BaseModel'
export class SentenceHistory extends BaseModel {
    private _date: Date;
    private _time: string;
    private _calculationReason: string;
    private _staffName: string;
    private _comment: string;
    private _offenderBookId: number;
    private _userId: string;
    private _staffId: number;
    private _offenderSentCalculationId:number;

   





    get date(): Date { return this._date; }

    set date( date: Date ) { this._date = date; }

    get time(): string { return this._time; }

    set time( time: string ) { this._time = time; }

    get calculationReason(): string { return this._calculationReason; }

    set calculationReason( calculationReason: string ) { this._calculationReason = calculationReason; }

    get staffName(): string { return this._staffName; }

    set staffName( staffName: string ) { this._staffName = staffName; }

    get comment(): string { return this._comment; }

    set comment( comment: string ) { this._comment = comment; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId( offenderBookId: number ) { this._offenderBookId = offenderBookId; }

    get userId(): string { return this._userId; }

    set userId( userId: string ) { this._userId = userId; }

    get staffId(): number { return this._staffId; }

    set staffId( staffId: number ) { this._staffId = staffId; }
    
    get offenderSentCalculationId(): number { return this._offenderSentCalculationId; }

    set offenderSentCalculationId( offenderSentCalculationId: number ) { this._offenderSentCalculationId = offenderSentCalculationId; }

   
    toJSON(): any {
        return {
            'offenderBookId': this._offenderBookId,
            'date': this._date,
            'time': this._time,
            'calculationReason': this._calculationReason,
            'staffName': this._staffName,
            'comment': this._comment,
            'userId': this._userId,
            'staffId': this._staffId,
            'offenderSentCalculationId':this._offenderSentCalculationId
          
        }
    }
}



