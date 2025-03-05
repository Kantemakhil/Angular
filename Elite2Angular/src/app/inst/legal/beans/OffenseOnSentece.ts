import { BaseModel } from "@commonbeans/BaseModel";
import { OffenderSentences } from "../beans/OffenderSentences";


export class OffenseOnSentence extends BaseModel {
    
/*    private _offenses : Array<OffensesOutcome>;
    private _dialogData : Array<OffensesOutcome>

get offenses(): Array<OffensesOutcome> { return this._offenses; }

set offenses(offensesList: Array<OffensesOutcome>) { this._offenses = offensesList; }

get dialogData():Array<OffensesOutcome> { return this._dialogData; }

set dialogData(dialogData: Array<OffensesOutcome>) { this._dialogData = dialogData; }*/

    private _apply: string;
    private _offense: string;
    private _offenderChargeId:number;
    /*private _offenseType: string;
    private _plea: string;*/
    private _offenseDescription:string;
    private _offenseDate: Date;
    private _range: Date;
    private _result: string;
    private _flag: string;
    private _statuteCode: string;
    private _offenceCode: string;
    private _resultButton:string;
    private _offenderBookId:number;
    private _sentenceSeq:number;
    private _button: string;
    private _selectedSentenceData:OffenderSentences;

    get offenseDescription(): string { return this._offenseDescription; }
    
    set offenseDescription( offenseDescription: string ) { this._offenseDescription = offenseDescription; }

    get apply(): string { return this._apply; }
    
    set apply( apply: string ) { this._apply = apply; }
    
    get offense(): string { return this._offense; }
    
    set offense( offense: string ) { this._offense = offense; }
    
    get offenderChargeId(): number { return this._offenderChargeId; }

    set offenderChargeId( offenderChargeId: number ) { this._offenderChargeId = offenderChargeId; }
    
    get selectedSentenceData(): OffenderSentences { return this._selectedSentenceData; }
    
    set selectedSentenceData( selectedSentenceData: OffenderSentences ) { this._selectedSentenceData = selectedSentenceData; }
    
    get button(): string { return this._button; }

    set button( pbutton: string ) { this._button = pbutton; }
    /*get offenseType(): string { return this._offenseType; }
    
    set offenseType( offenseType: string ) { this._offenseType = offenseType; }
    
    get plea(): string { return this._plea; }
    
    set plea( plea: string ) { this._plea = plea; }
    */
    get offenseDate(): Date { return this._offenseDate; }
    
    set offenseDate( offenseDate: Date ) { this._offenseDate = offenseDate; }
    
    get range(): Date { return this._range; }
    
    set range( range: Date ) { this._range = range; }
    
    get result(): string { return this._result; }
    
    set result( result: string ) { this._result = result; }
    
    get flag(): string { return this._flag; }
    
    set flag( flag: string ) { this._flag = flag; }
    
    get statuteCode(): string { return this._statuteCode; }
    
    set statuteCode( statuteCode: string ) { this._statuteCode = statuteCode; }
    
    get offenceCode(): string { return this._offenceCode; }
    
    set offenceCode( offenceCode: string ) { this._offenceCode = offenceCode; }
    
    get resultButton(): string { return this._resultButton; }
    
    set resultButton( resultButton: string ) { this._resultButton = resultButton; }
    
    get offenderBookId(): number { return this._offenderBookId; }
    
    set offenderBookId( offenderBookId: number ) { this._offenderBookId = offenderBookId; }
    
    get sentenceSeq(): number { return this._sentenceSeq; }
    
    set sentenceSeq( sentenceSeq: number ) { this._sentenceSeq = sentenceSeq; }



    toJSON(): any {
    return {
        
    'apply': this._apply,
    'offense': this._offense,
    'offenderChargeId':this._offenderChargeId,
   /* 'offenseType':this._offenseType,
    'plea':this._plea,*/
    'offenseDate':this._offenseDate,
    'range': this._range,
    'result': this._result,
    'flag': this._flag,
    'statuteCode':this._statuteCode,
    'offenceCode':this._offenceCode,
    'offenderBookId':this._offenderBookId,
    'selectedSentenceData':this._selectedSentenceData,
    'button': this._button,
    'sentenceSeq':this._sentenceSeq,
    };
  } 
}