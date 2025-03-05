import { BaseModel } from './BaseModel'
export class ScheduledOffenders extends BaseModel {

    private _select: boolean;
    private _offenderId: number;
    private _name: string;
    private _startTime: Date;
    private _endTime: Date;
    private _offPresent :boolean;
    private _housing :string;
    private _linkedSentence :string;




    get select(): boolean { return this._select; }
    set select(pselect: boolean) { this._select = pselect; }

    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get name(): string { return this._name; }
    set name(pname: string) { this._name = pname; }

    get offPresent(): boolean { return this._offPresent; }
    set offPresent(poffPresent: boolean) { this._offPresent = poffPresent; }

    get startTime(): Date { return this._startTime; }
    set startTime(pstartTime: Date) { this._startTime = pstartTime; }

    get endTime(): Date { return this._endTime; }
    set endTime(pendTime: Date) { this._endTime = pendTime; }

    get housing(): string { return this._housing; }
    set housine(phousing: string) { this._housing = phousing; }

    get linkedSentence(): string { return this._linkedSentence; }
    set linkedSentence(plinkedSentence: string) { this._linkedSentence = plinkedSentence; }


    toJSON(): any {
        return {
            'select': this._select,
            'offenderId': this._offenderId,
            'name': this._name,
            'offPresent': this._offPresent,
            'startTime': this._startTime,
            'endTime': this._endTime,
            'housing' :this._housing,
            'linkedSentence' :this._linkedSentence,

        }
    };
}
