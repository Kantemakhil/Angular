import { OffenderSentenceAdjustment } from "../beans/OffenderSentenceAdjustment";
export class OffenderParoleEvent{
	
	private _offenderBookId: number;
    private _paroleEventId: number;
    private _eventDate: Date;
    private _paroleEvent: string;
    private _comment: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _listOffenderSentenceAdjustment : Array<OffenderSentenceAdjustment>;
    private _recordFlag:string;
	private _calcReason: string;
    
    get offenderBookId(): number { return this._offenderBookId; }

	set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }
	
	get paroleEventId(): number { return this._paroleEventId; }

	set paroleEventId(paroleEventId: number) { this._paroleEventId = paroleEventId; }
	
	get eventDate(): Date { return this._eventDate; }

	set eventDate(eventDate: Date) { this._eventDate = eventDate; }
	
	get paroleEvent(): string { return this._paroleEvent; }

	set paroleEvent(paroleEvent: string) { this._paroleEvent = paroleEvent; }
	
	get comment(): string { return this._comment; }

	set comment(comment: string) { this._comment = comment; }
	
	get createDatetime(): Date { return this._createDatetime; }

	set createDatetime(createDatetime: Date) { this._createDatetime = createDatetime; }

	get createUserId(): string { return this._createUserId; }

	set createUserId(createUserId: string) { this._createUserId = createUserId; }

	get modifyDatetime(): Date { return this._modifyDatetime; }

	set modifyDatetime(modifyDatetime: Date) { this._modifyDatetime = modifyDatetime; }

	get modifyUserId(): string { return this._modifyUserId; }

	set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }
	
	get listOffenderSentenceAdjustment(): Array<OffenderSentenceAdjustment> { return this._listOffenderSentenceAdjustment; }    
    set listOffenderSentenceAdjustment( listOffenderSentenceAdjustment: Array<OffenderSentenceAdjustment> ) { this._listOffenderSentenceAdjustment = listOffenderSentenceAdjustment; }
    
    get recordFlag(): string { return this._recordFlag; }

	set recordFlag(recordFlag: string) { this._recordFlag = recordFlag; }

	get calcReason(): string { return this._calcReason; }

	set calcReason(value: string) { this._calcReason = value; }
	
	
	 toJSON(): any {
	        return {
	            'offenderBookId': this._offenderBookId,
	            'paroleEventId': this._paroleEventId,
	            'eventDate': this._eventDate,
	            'paroleEvent': this._paroleEvent,
	            'comment': this._comment,
	            'createDateTime': this._createDatetime,
	            'createUserId': this._createUserId,
	            'modifyDatetime': this._modifyDatetime,
	            'modifyUserId': this._modifyUserId,
	            'OffenderSentenceAdjustment': this._listOffenderSentenceAdjustment,
	            'recordFlag': this._recordFlag,
				'calcReason': this._calcReason
	        };
	    }
	
}