import { BaseModel } from './BaseModel';
export class VOffExm extends BaseModel {
    private _escortCode: string;
    private _offenderBookId: number;
    private _movementReasonCode: string;
    private _movementTime: Date;
    private _internalScheduleReasonCode: string;
    private _toCity: string;
    private _movementDate: Date;
    private _commentText: string;
    private _movementSeq: number;
    private _directionCode: string;
    private _toProvStatCode: string;
    private _inserted: number;
    private _fromAgyLocId: string;
    private _movementType: string;
    private _arrestAgencyLocId: string;
    private _reportingTime: Date;
    private _reportingDate: Date;
    private _escortText: string;
    private _internalScheduleType: string;
    private _toAgyLocId: string;
    private _fromCity: string;
    private _activeFlag: string;
    private _firstName: string;
    private _lastName: string;
    private _offenderIdDisplay: string;
    private _dspDescription:string;
    private _livUnitDesc:string;
    private _button:string;
    private _agyLocId:string;
    private _conformFlag:boolean;
    private _dspCommentText:string;
    private _livingUnitId:number;

    get livingUnitId(): number { return this._livingUnitId; }

    set livingUnitId( livingUnitId: number ) { this._livingUnitId = livingUnitId; }

    get button(): string { return this._button; }

    set button( pbutton: string ) { this.button = pbutton; }
    
    get dspCommentText(): string { return this._dspCommentText; }

    set dspCommentText( pdspCommentText: string ) { this.dspCommentText = pdspCommentText; }
    
    get conformFlag(): boolean { return this._conformFlag; }

    set conformFlag( pconformFlag: boolean ) { this.conformFlag = pconformFlag; }
    
    get agyLocId(): string { return this._agyLocId; }

    set agyLocId( pagyLocId: string ) { this.agyLocId = pagyLocId; }
    
    get livUnitDesc(): string { return this._livUnitDesc; }

    set livUnitDesc( plivUnitDesc: string ) { this.livUnitDesc = plivUnitDesc; }
    
    get dspDescription(): string { return this._dspDescription; }

    set dspDescription( pdspDescription: string ) { this.dspDescription = pdspDescription; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay( poffenderIdDisplay: string ) { this.offenderIdDisplay = poffenderIdDisplay; }
    
    get firstName(): string { return this._firstName; }

    set firstName( pfirstName: string ) { this.firstName = pfirstName; }

    get lastName(): string { return this._lastName; }

    set lastName( plastName: string ) { this.lastName = plastName; }

    get escortCode(): string { return this._escortCode; }

    set escortCode( pescortCode: string ) { this._escortCode = pescortCode; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }

    get movementReasonCode(): string { return this._movementReasonCode; }

    set movementReasonCode( pmovementReasonCode: string ) { this._movementReasonCode = pmovementReasonCode; }

    get movementTime(): Date { return this._movementTime; }

    set movementTime( pmovementTime: Date ) { this._movementTime = pmovementTime; }

    get internalScheduleReasonCode(): string { return this._internalScheduleReasonCode; }

    set internalScheduleReasonCode( pinternalScheduleReasonCode: string ) { this._internalScheduleReasonCode = pinternalScheduleReasonCode; }

    get toCity(): string { return this._toCity; }

    set toCity( ptoCity: string ) { this._toCity = ptoCity; }

    get movementDate(): Date { return this._movementDate; }

    set movementDate( pmovementDate: Date ) { this._movementDate = pmovementDate; }

    get commentText(): string { return this._commentText; }

    set commentText( pcommentText: string ) { this._commentText = pcommentText; }

    get movementSeq(): number { return this._movementSeq; }

    set movementSeq( pmovementSeq: number ) { this._movementSeq = pmovementSeq; }

    get directionCode(): string { return this._directionCode; }

    set directionCode( pdirectionCode: string ) { this._directionCode = pdirectionCode; }

    get toProvStatCode(): string { return this._toProvStatCode; }

    set toProvStatCode( ptoProvStatCode: string ) { this._toProvStatCode = ptoProvStatCode; }

    get inserted(): number { return this._inserted; }

    set inserted( pinserted: number ) { this._inserted = pinserted; }

    get fromAgyLocId(): string { return this._fromAgyLocId; }

    set fromAgyLocId( pfromAgyLocId: string ) { this._fromAgyLocId = pfromAgyLocId; }

    get movementType(): string { return this._movementType; }

    set movementType( pmovementType: string ) { this._movementType = pmovementType; }

    get arrestAgencyLocId(): string { return this._arrestAgencyLocId; }

    set arrestAgencyLocId( parrestAgencyLocId: string ) { this._arrestAgencyLocId = parrestAgencyLocId; }

    get reportingTime(): Date { return this._reportingTime; }

    set reportingTime( preportingTime: Date ) { this._reportingTime = preportingTime; }

    get reportingDate(): Date { return this._reportingDate; }

    set reportingDate( preportingDate: Date ) { this._reportingDate = preportingDate; }

    get escortText(): string { return this._escortText; }

    set escortText( pescortText: string ) { this._escortText = pescortText; }

    get internalScheduleType(): string { return this._internalScheduleType; }

    set internalScheduleType( pinternalScheduleType: string ) { this._internalScheduleType = pinternalScheduleType; }

    get toAgyLocId(): string { return this._toAgyLocId; }

    set toAgyLocId( ptoAgyLocId: string ) { this._toAgyLocId = ptoAgyLocId; }

    get fromCity(): string { return this._fromCity; }

    set fromCity( pfromCity: string ) { this._fromCity = pfromCity; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag( pactiveFlag: string ) { this._activeFlag = pactiveFlag; }


    toJSON(): any {
        return {
            'escortCode': this._escortCode,
            'offenderBookId': this._offenderBookId,
            'movementReasonCode': this._movementReasonCode,
            'movementTime': this._movementTime,
            'internalScheduleReasonCode': this._internalScheduleReasonCode,
            'toCity': this._toCity,
            'movementDate': this._movementDate,
            'commentText': this._commentText,
            'movementSeq': this._movementSeq,
            'directionCode': this._directionCode,
            'toProvStatCode': this._toProvStatCode,
            'inserted': this._inserted,
            'fromAgyLocId': this._fromAgyLocId,
            'movementType': this._movementType,
            'arrestAgencyLocId': this._arrestAgencyLocId,
            'reportingTime': this._reportingTime,
            'reportingDate': this._reportingDate,
            'escortText': this._escortText,
            'internalScheduleType': this._internalScheduleType,
            'toAgyLocId': this._toAgyLocId,
            'fromCity': this._fromCity,
            'activeFlag': this._activeFlag,
            'firstName' : this._firstName,
            'lastName' : this._lastName,
            'offenderIdDisplay' : this._offenderIdDisplay,
            'livUnitDesc' : this._livUnitDesc,
            'button' : this._button,
            'agyLocId' : this._agyLocId,
            'conformFlag' : this._conformFlag,
            'dspCommentText' : this._dspCommentText,
            'dspDescription' :this._dspDescription,
            'livingUnitId':this._livingUnitId
        };
    }
}
