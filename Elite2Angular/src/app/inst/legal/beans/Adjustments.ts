import {BaseModel} from '@commonbeans/BaseModel'

export class Adjustments extends BaseModel{
    
    private _keyDatesAdjustId:number;
    
    private _offenderBookId:number;
    
    private _sentenceAdjustCode:string;
    
    private _adjustFromDate:Date;
    
    private _adjustToDate:Date;
    
    private _adjustDays:number;
    
    private _adjustStatus:string;
    
    private _commentText:string;
    
    private _adjustDate:Date;
    
    private _createDateTime:Date;
    
    private _createUserId:string;
    
    private _modifyDateTime:Date;
    
    private _modifyUserId:string;
    
    private _sealFlag:string;

    get keyDatesAdjustId(): number { return this._keyDatesAdjustId; }
    set keyDatesAdjustId(keyDatesAdjustId: number ) { this._keyDatesAdjustId = keyDatesAdjustId; }
    
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(offenderBookId: number ) { this._offenderBookId = offenderBookId; }
    
    get sentenceAdjustCode(): string { return this._sentenceAdjustCode; }
    set sentenceAdjustCode(sentenceAdjustCode: string ) { this._sentenceAdjustCode = sentenceAdjustCode; }
    
    get adjustFromDate(): Date { return this._adjustFromDate; }
    set adjustFromDate(adjustFromDate: Date ) { this._adjustFromDate = adjustFromDate; }
    
    get adjustToDate(): Date { return this._adjustToDate; }
    set adjustToDate(adjustToDate: Date ) { this._adjustToDate = adjustToDate; }
    
    get adjustDays(): number { return this._adjustDays; }
    set adjustDays(adjustDays: number ) { this._adjustDays = adjustDays; }
    
    get adjustStatus(): string { return this._adjustStatus; }
    set adjustStatus(adjustStatus: string ) { this._adjustStatus = adjustStatus; }
    
    get commentText(): string { return this._commentText; }
    set commentText(commentText: string ) { this._commentText = commentText; }
    
    get adjustDate(): Date { return this._adjustDate; }
    set adjustDate(adjustDate: Date ) { this._adjustDate = adjustDate; }
    
    get createDateTime(): Date { return this._createDateTime; }
    set createDateTime(createDateTime: Date ) { this._createDateTime = createDateTime; }
    
    get createUserId(): string { return this._createUserId; }
    set createUserId(createUserId: string ) { this._createUserId = createUserId; }
    
    get modifyDateTime(): Date { return this._modifyDateTime; }
    set modifyDateTime(modifyDateTime: Date ) { this._modifyDateTime = modifyDateTime; }
    
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(modifyUserId: string ) { this._modifyUserId = modifyUserId; }
    
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(sealFlag: string ) { this._sealFlag = sealFlag; }
    
    toJSON(): any {
        return {
            
            'keyDatesAdjustId': this._keyDatesAdjustId,
            'offenderBookId': this._offenderBookId,
            'sentenceAdjustCode': this._sentenceAdjustCode,
            'adjustFromDate': this._adjustFromDate,
            'adjustToDate': this._adjustToDate,
            'adjustDays': this._adjustDays,
            'adjustStatus': this._adjustStatus,
            'commentText': this._commentText,
            'adjustDate': this._adjustDate,
            'createDateTime': this._createDateTime,
            'createUserId': this._createUserId,
            'modifyDateTime': this._modifyDateTime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
        
        };
     }

}