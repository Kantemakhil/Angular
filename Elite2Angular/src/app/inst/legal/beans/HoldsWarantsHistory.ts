import {BaseModel} from '@commonbeans/BaseModel'

export class HoldsWarantsHistory extends BaseModel{
    
    
    private _holdWarrentId: number;    
   
    private _holdWarrentDetainerHistoryId:number; 
    
    private _eventType:string;
    
    private _eventComment:string;
    
    private _createUserId:string;
    
    private _modifyUserId:string;
    
    private _sealFlag:string;
    
    private _eventDateTime: Date;

    private _eventTime: Date;
    
    private _createDateTime: Date;
    
    private _modifyDateTime: Date;

    private _historyTime: Date;

    get holdWarrentId(): number { return this._holdWarrentId; }
    set holdWarrentId( holdWarrentId: number ) { this._holdWarrentId = holdWarrentId; }
    
    get holdWarrentDetainerHistoryId(): number { return this._holdWarrentDetainerHistoryId; }
    set holdWarrentDetainerHistoryId( holdWarrentDetainerHistoryId: number ) { this._holdWarrentDetainerHistoryId = holdWarrentDetainerHistoryId; }
    

    get sealFlag(): string { return this._sealFlag; }
    set sealFlag( sealFlag: string ) { this._sealFlag = sealFlag; }
    
    get eventComment(): string { return this._eventComment; }
    set eventComment( eventComment: string ) { this._eventComment = eventComment; }
    
    get createUserId(): string { return this._createUserId; }
    set createUserId( createUserId: string ) { this._createUserId = createUserId; }
    
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId( modifyUserId: string ) { this._modifyUserId = modifyUserId; }
    
    get eventType(): string { return this._eventType; }
    set eventType( eventType: string ) { this._eventType = eventType; }
    
    
    get eventDateTime(): Date { return this._eventDateTime; }
    set eventDateTime( eventDateTime: Date ) { this._eventDateTime = eventDateTime; }
    
    get createDateTime(): Date { return this._createDateTime; }
    set createDateTime( createDateTime: Date ) { this._createDateTime = createDateTime; }
    
    get modifyDateTime(): Date { return this._modifyDateTime; }
    set modifyDateTime( modifyDateTime: Date ) { this._modifyDateTime = modifyDateTime; }
    
    get historyTime(): Date { return this._historyTime; }
    set historyTime( historyTime: Date ) { this._historyTime = historyTime; }  
    
    get eventTime(): Date {return this._eventTime;}
    set eventTime(eventTime) {this._eventTime = eventTime;}
    
    
    toJSON(): any {
        return {
            
            'holdWarrentId': this._holdWarrentId,
            'holdWarrentDetainerHistoryId': this._holdWarrentDetainerHistoryId,
            'sealFlag': this._sealFlag,
            'eventComment': this._eventComment,
            'createUserId': this._createUserId,
            'modifyUserId': this._modifyUserId,
            'eventType': this._eventType,
            'eventDateTime': this._eventDateTime,
            'createDateTime': this._createDateTime,
            'modifyDateTime': this._modifyDateTime,
            'historyTime': this._historyTime,            
        };
     }
}