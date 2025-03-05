import { BaseModel } from './BaseModel';

export class SearchScheduleRecord extends BaseModel {

    private _sDate: Date;
    private _sTime: Date;
    private _sfacility: string;
    private _slivingUnit1: string;
    private _slivingUnit2: string;
    private _slivingUnit3: string;
    private _offenderId: string;
    private _offenderNameDisplay: string;

get sDate(): Date { return this._sDate ;}

set sDate(ssDate : Date) { this._sDate = ssDate;}

get sTime(): Date { return this._sTime;}

set sTime(ssTime : Date) { this._sTime = ssTime;}

get sFacility(): string { return this._sfacility;}

set sFacility(ssFacility : string) { this._sfacility = ssFacility;}

get slivingUnit1(): string { return this._slivingUnit1;}

set slivingUnit1(sslivingUnit1 : string) { this._slivingUnit1 = sslivingUnit1;}

get slivingUnit2(): string { return this._slivingUnit2 ;}

set slivingUnit2(sslivingUnit2 : string) { this._slivingUnit2 = sslivingUnit2;}

get slivingUnit3(): string { return this._slivingUnit3;}

set slivingUnit3(sslivingUnit3 : string) { this._slivingUnit3 = sslivingUnit3 ;}

get sOfferderId(): string { return this._offenderId ;}

set sOffenderId(ssOffender : string) { this._offenderId = ssOffender ;}

get offenderNameDisplay() : string {return this._offenderNameDisplay;}

set offenderNameDisplay(ssOffenderNameDisplay : string) { this._offenderNameDisplay = ssOffenderNameDisplay;}

toJSON(): any {
    return {
        
        'sDate':this._sDate,
        'sTime':this._sTime,
        'sfacility':this._sfacility,
        'slivingUnit1':this._slivingUnit1,
        'slivingUnit2':this._slivingUnit2,
        'slivingUnit3' :this._slivingUnit3,
        'offenderId'   :this._offenderId,
        'offenderNameDisplay':this._offenderNameDisplay,
        };
}

}