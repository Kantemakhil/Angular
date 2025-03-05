import {BaseModel} from '@commonbeans/BaseModel'

export class SentenceCalculation extends BaseModel {

    private _offenderBookId:number;
    private _staffId:number;
    private _sentDate:Date;
    private _sentTime:Date;
    private _calcCode:string;
    private _comment:string;
    private _staffName:string;

get offenderBookId(): number { return this._offenderBookId; }

set offenderBookId( offenderBookId: number ) { this._offenderBookId = offenderBookId; }

get staffId(): number { return this._staffId; }

set staffId( staffId: number ) { this._staffId = staffId; }

get sentDate(): Date { return this._sentDate; }

set sentDate( sentDate: Date ) { this._sentDate = sentDate; }

get sentTime(): Date { return this._sentTime; }

set sentTime( sentTime: Date ) { this._sentTime = sentTime; }

get calcCode(): string { return this._calcCode; }

set calcCode( calcCode: string ) { this._calcCode = calcCode; }

get comment(): string { return this._comment; }

set comment( comment: string ) { this._comment = comment; }

get staffName(): string { return this._staffName; }

set staffName( staffName: string ) { this._staffName = staffName; }



    toJSON(): any {
        return {
    
            'staffName': this._staffName,
            'sentDate' : this._sentDate,
            'sentTime' : this._sentTime,
            'calcCode' : this._calcCode,
            'comment'  : this._comment,
            'offenderBookId':this._offenderBookId,
        };     
}
    
}