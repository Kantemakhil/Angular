import {BaseModel} from '@commonbeans/BaseModel'

export class SentenceAggregates extends BaseModel{   
   
    private _caseId:number;    
    private _offenderBookId: number;   
    private _sentenceSeq:number;    
    private _startDate: Date;    
    private _aggregateTerm: number;
    private _sentenceCalcType: string;
    private _remissionElg: string;
    private _sentenceTerm:string;
    
    private _aggregateAdjustDays: Date;    
    private _sed: Date;    
    private _daysToArdCrd: number;    
    private _ardCrdDate:Date;    
    private _hdcedCalculatedDate: Date;    
    
    private _etdCalculatedDate: Date;    
    private _mtdCalculatedDate: Date;   
    private _ltdCalculatedDate: Date;   
    private _ardCalculatedDate: Date;   
    private _crdCalculatedDate: Date;
    
    private _pedCalculatedDate: Date;    
    private _apdCalculatedDate: Date;    
    private _npdCalculatedDate: Date;    
    private _ledCalculatedDate: Date;   
    private _sedCalculatedDate: Date;
    
    private _prrdCalculatedDate: Date;    
    private _tariffCalculatedDate: Date;


    get caseId(): number { return this._caseId; }
    set caseId( caseId: number ) { this._caseId = caseId; }
    
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId( offenderBookId: number ) { this._offenderBookId = offenderBookId; }
    
    get sentenceSeq(): number { return this._sentenceSeq; }
    set sentenceSeq( sentenceSeq: number ) { this._sentenceSeq = sentenceSeq; }
    
    get startDate(): Date { return this._startDate; }
    set startDate( startDate: Date ) { this._startDate = startDate; }
    
    get aggregateTerm(): number { return this._aggregateTerm; }
    set aggregateTerm( aggregateTerm: number ) { this._aggregateTerm = aggregateTerm; }
    
    get aggregateAdjustDays(): Date { return this._aggregateAdjustDays; }
    set aggregateAdjustDays( aggregateAdjustDays: Date ) { this._aggregateAdjustDays = aggregateAdjustDays; }
    
    get sed(): Date { return this._sed; }
    set sed( sed: Date ) { this._sed = sed; }
    
    get daysToArdCrd(): number { return this._daysToArdCrd; }
    set daysToArdCrd( daysToArdCrd: number ) { this._daysToArdCrd = daysToArdCrd; }
    
    get ardCrdDate(): Date { return this._ardCrdDate; }
    set ardCrdDate( ardCrdDate: Date ) { this._ardCrdDate = ardCrdDate; }
    
    get hdcedCalculatedDate(): Date { return this._hdcedCalculatedDate; }
    set hdcedCalculatedDate( hdcedCalculatedDate: Date ) { this._hdcedCalculatedDate = hdcedCalculatedDate; }
    
    get etdCalculatedDate(): Date { return this._etdCalculatedDate; }
    set etdCalculatedDate( etdCalculatedDate: Date ) { this._etdCalculatedDate = etdCalculatedDate; }
    
    get mtdCalculatedDate(): Date { return this._mtdCalculatedDate; }
    set mtdCalculatedDate( mtdCalculatedDate: Date ) { this._mtdCalculatedDate = mtdCalculatedDate; }
    
    get ltdCalculatedDate(): Date { return this._ltdCalculatedDate; }
    set ltdCalculatedDate( ltdCalculatedDate: Date ) { this._ltdCalculatedDate = ltdCalculatedDate; }
    
    get ardCalculatedDate(): Date { return this._ardCalculatedDate; }
    set ardCalculatedDate( ardCalculatedDate: Date ) { this._ardCalculatedDate = ardCalculatedDate; }
    
    get crdCalculatedDate(): Date { return this._crdCalculatedDate; }
    set crdCalculatedDate( crdCalculatedDate: Date ) { this._crdCalculatedDate = crdCalculatedDate; }
    
    get pedCalculatedDate(): Date { return this._pedCalculatedDate; }
    set pedCalculatedDate( pedCalculatedDate: Date ) { this._pedCalculatedDate = pedCalculatedDate; }
    
    get apdCalculatedDate(): Date { return this._apdCalculatedDate; }
    set apdCalculatedDate( apdCalculatedDate: Date ) { this._apdCalculatedDate = apdCalculatedDate; }
    
    get npdCalculatedDate(): Date { return this._npdCalculatedDate; }
    set npdCalculatedDate( npdCalculatedDate: Date ) { this._npdCalculatedDate = npdCalculatedDate; }
    
    get ledCalculatedDate(): Date { return this._ledCalculatedDate; }
    set ledCalculatedDate( ledCalculatedDate: Date ) { this._ledCalculatedDate = ledCalculatedDate; }
    
    get sedCalculatedDate(): Date { return this._sedCalculatedDate; }
    set sedCalculatedDate( sedCalculatedDate: Date ) { this._sedCalculatedDate = sedCalculatedDate; }
    
    get prrdCalculatedDate(): Date { return this._prrdCalculatedDate; }
    set prrdCalculatedDate( prrdCalculatedDate: Date ) { this._prrdCalculatedDate = prrdCalculatedDate; }
    
    get tariffCalculatedDate(): Date { return this._tariffCalculatedDate; }
    set tariffCalculatedDate( tariffCalculatedDate: Date ) { this._tariffCalculatedDate = tariffCalculatedDate; }
    
    get sentenceCalcType(): string {return this._sentenceCalcType;}
    set sentenceCalcType(calType: string) {this._sentenceCalcType=calType;}
    
    get remissionElg(): string {return this._remissionElg;}
    set remissionElg(remEl: string) {this._remissionElg=remEl;}
    
    get sentenceTerm(): string {return this._sentenceTerm;}
    set sentenceTerm(sentenceTerm: string) {this._sentenceTerm=sentenceTerm;}
    
    
    
    toJSON(): any {
        return {
            
        'caseId': this._caseId,
        'offenderBookId': this._offenderBookId,
        'sentenceSeq': this._sentenceSeq,
        'startDate': this._startDate,
        'aggregateTerm': this._aggregateTerm,
        'aggregateAdjustDays': this._aggregateAdjustDays,
        'sed':  this. _sed,
        'daysToArdCrd': this._daysToArdCrd,
        'ardCrdDate':  this._ardCrdDate,      
        'hdcedCalculatedDate': this._hdcedCalculatedDate,
        'etdCalculatedDate':  this._etdCalculatedDate,
        'mtdCalculatedDate':  this._mtdCalculatedDate,
        'ltdCalculatedDate':  this._ltdCalculatedDate,
        'ardCalculatedDate': this._ardCalculatedDate,
        'crdCalculatedDate':  this._crdCalculatedDate,
        'pedCalculatedDate': this._pedCalculatedDate,
        'apdCalculatedDate': this._apdCalculatedDate,
        'npdCalculatedDate': this._npdCalculatedDate,
        'ledCalculatedDate': this._ledCalculatedDate,     
        'sedCalculatedDate': this._sedCalculatedDate, 
        'prrdCalculatedDate': this._prrdCalculatedDate,
        'tariffCalculatedDate': this._tariffCalculatedDate,        
        
        };
     }

}
