import {BaseModel} from '@commonbeans/BaseModel';

export class OffenderBailDetails extends BaseModel {
    
   
    private _bookId: number;    
    private _chargeId: number;
    private _bailBookId: number;    
    private _bailChargeId: number;
    private _bailStatus: string;    
    private _cashFlag: string;
    private _cashFlagCheck: boolean;
    private _cash: number;
    private _surety: number;    
    private _property: number;
    private _preferedDateTime: Date;
    private _time: Date;
    private _preferedBy: string;    
    private _method: string;
    private _commentText: string;
    private _BailDate: Date;    
    private _judge: string;
    private _receiptText: string;
    private _createDatetime: Date;    
    private _createUserId: string;
    private _modifyDateTime: Date;
    private _modifyUserId: string;
    private _action: string;  
    private _sealFlag: string;  
    private _offencesDec: string;
    private _seqNo: number;  
    private _commitFlag:string;

    private _bailType:string;
    private _selfAmount:number;
    private _amount:number;
    private _perfectedDatetime:Date;
    private _reviewDate:Date;
    private _suretyName1:string;
    private _suretyName1Address:string;
    private _suretyName2:string;
    private _suretyName2Address:string;
    private _eventDate:Date;
    private _receiptReferenceText:string;

    private _offenderBookId: number;
    private _eventId: number;
    private _caseId: number;

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId( offenderBookId: number ) { this._offenderBookId = offenderBookId; }

    get eventId(): number { return this._eventId; }
    set eventId( eventId: number ) { this._eventId = eventId; }

    get caseId(): number { return this._caseId; }
    set caseId(caseId: number ) { this._caseId = caseId; }

    get bailType(): string { return this._bailType; }
    set bailType( bailType: string ) { this._bailType = bailType; }

    get selfAmount(): number { return this._selfAmount; }
    set selfAmount( selfAmount: number ) { this._selfAmount = selfAmount; }

    get amount(): number { return this._amount; }
    set amount( amount: number ) { this._amount = amount; }

    get perfectedDatetime(): Date { return this._perfectedDatetime; }
    set perfectedDatetime( perfectedDatetime: Date ) { this._perfectedDatetime = perfectedDatetime; }

    get reviewDate(): Date { return this._reviewDate; }
    set reviewDate( reviewDate: Date ) { this._reviewDate = reviewDate; }

    get suretyName1(): string { return this._suretyName1; }
    set suretyName1( suretyName1: string ) { this._suretyName1 = suretyName1; }

    get suretyName1Address(): string { return this._suretyName1Address; }
    set suretyName1Address( suretyName1Address: string ) { this._suretyName1Address = suretyName1Address; }

    get suretyName2(): string { return this._suretyName2; }
    set suretyName2( suretyName2: string ) { this._suretyName2 = suretyName2; }

    get suretyName2Address(): string { return this._suretyName2Address; }
    set suretyName2Address( suretyName2Address: string ) { this._suretyName2Address = suretyName2Address; }

    get eventDate(): Date { return this._eventDate; }
    set eventDate( eventDate: Date ) { this._eventDate = eventDate; }

    get receiptReferenceText(): string { return this._receiptReferenceText; }
    set receiptReferenceText( receiptReferenceText: string ) { this._receiptReferenceText = receiptReferenceText; }

    get seqNo(): number { return this._seqNo; }
    set seqNo( seqNo: number ) { this._seqNo = seqNo; }

    get bookId(): number { return this._bookId; }
    set bookId( bookId: number ) { this._bookId = bookId; }
    
    get chargeId(): number { return this._chargeId; }
    set chargeId( chargeId: number ) { this._chargeId = chargeId; }
    
    get bailBookId(): number { return this._bailBookId; }
    set bailBookId( bailBookId: number ) { this._bailBookId = bailBookId; }
    
    get bailChargeId(): number { return this._bailChargeId; }
    set bailChargeId( bailChargeId: number ) { this._bailChargeId = bailChargeId; }
    
    get bailStatus(): string { return this._bailStatus; }
    set bailStatus( bailStatus: string ) { this._bailStatus = bailStatus; }
    
    get cashFlag(): string { return this._cashFlag; }
    set cashFlag( cashFlag: string ) { this._cashFlag = cashFlag; }

    get cashFlagCheck(): boolean { return this._cashFlagCheck; }
    set cashFlagCheck( cashFlagCheck: boolean ) { this._cashFlagCheck = cashFlagCheck; }
    
    get cash(): number { return this._cash; }
    set cash( cash: number ) { this._cash = cash; }
    
    get surety(): number { return this._surety; }
    set surety( surety: number ) { this._surety = surety; }
    
    get property(): number { return this._property; }
    set property( property: number ) { this._property = property; }
    
    get preferedDateTime(): Date { return this._preferedDateTime; }
    set preferedDateTime( preferedDateTime: Date ) { this._preferedDateTime = preferedDateTime; }
    
    get time(): Date { return this._time; }
    set time( time: Date ) { this._time= time; }
    
    get preferedBy(): string { return this._preferedBy; }
    set preferedBy( preferedBy: string ) { this._preferedBy = preferedBy; }
    
    get method(): string { return this._method; }
    set method( method: string ) { this._method = method; }
    
    get commentText(): string { return this._commentText; }
    set commentText( commentText: string ) { this._commentText = commentText; }
    
    get BailDate(): Date { return this._BailDate; }
    set BailDate( BailDate: Date ) { this._BailDate = BailDate; }
    
    get judge(): string { return this._judge; }
    set judge( judge: string ) { this._judge = judge; }
    
    get receiptText(): string { return this._receiptText; }
    set receiptText( receiptText: string ) { this._receiptText = receiptText; }
    
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime( createDatetime: Date ) { this._createDatetime = createDatetime; }
    
    get createUserId(): string { return this._createUserId; }
    set createUserId( createUserId: string ) { this._createUserId = createUserId; }
    
    get modifyDateTime(): Date { return this._modifyDateTime; }
    set modifyDateTime( modifyDateTime: Date ) { this._modifyDateTime = modifyDateTime; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId( modifyUserId: string ) { this._modifyUserId = modifyUserId; }
    
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag( sealFlag: string ) { this._sealFlag = sealFlag; }
    
    get action(): string { return this._action; }
    set action( action: string ) { this._action = action; }
    
    get offencesDec(): string { return this._offencesDec; }
    set offencesDec( offencesDec: string ) { this._offencesDec = offencesDec; }
    
    get commitFlag(): string { return this._commitFlag; }
    set commitFlag( commitFlag: string ) { this._commitFlag = commitFlag; }
    
    
    toJSON(): any {
        return {
            'bookId': this._bookId,
            'chargeId': this._chargeId,
            'bailStatus': this._bailStatus,
            'cashFlag': this._cashFlag,
            'cash':this._cash,
            'surety':this._surety,
            'property':this._property,
            'preferedDateTime':this._preferedDateTime,
            'modifyDateTime': this._modifyDateTime,
            'modifyUserId':  this._modifyUserId,
            'createUserId': this._createUserId,
            'createDatetime':  this._createDatetime,
            'method': this._method,
            'commentText': this._commentText,
            'BailDate':this._BailDate,
            'judge': this._judge,
            'receiptText': this._receiptText,
            'preferedBy':this._preferedBy,           
            'sealFlag': this._sealFlag,
            'action': this._action,
            'offencesDec': this._offencesDec,
            'seqNo': this._seqNo,
            'time': this._time,
            'commitFlag' : this._commitFlag,
            'bailType' : this._bailType,
            'selfAmount' : this._selfAmount,
            'perfectedDatetime' : this._perfectedDatetime,
            'suretyName1' : this._suretyName1,
            'suretyName1Address' : this._suretyName1Address,
            'suretyName2' : this._suretyName2,
            'suretyName2Address' : this._suretyName2Address,
            'reviewDate' : this._reviewDate,
            'amount' : this._amount,
            'eventDate' : this._eventDate,
            'receiptReferenceText' : this._receiptReferenceText,
            'offenderBookId' : this._offenderBookId,
            'eventId' : this._eventId,
            'caseId' : this._caseId
        };
    }
}