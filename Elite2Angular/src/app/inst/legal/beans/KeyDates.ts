import {BaseModel} from '@commonbeans/BaseModel';

export class KeyDates  extends BaseModel{
    private _keyDates: string ;
    private _profileType: string ;
    private _profileType2: string ;
    private _calculationDate: Date;
    private _calculatedDate: Date;
    private _overrideDate: Date;
    private _overridedFlag:boolean;
    private _offenderBookId: number;
    private _staffName : string;
    private _calculationReason : string;
    private _commentText : string;
    private _createUserId:string;
    private _createDateTime : Date;
    private _sentCalculationId: number;
    
    get keyDates(): string { return this._keyDates; }
    set keyDates( keyDates: string ) { this._keyDates = keyDates; }
    
    get profileType(): string { return this._profileType; }
    set profileType( profileType: string ) { this._profileType = profileType; }
    
    get profileType2(): string { return this._profileType2; }
    set profileType2( profileType2: string ) { this._profileType2 = profileType2; }
    
    get calculationDate(): Date { return this._calculationDate; }
    set calculationDate( calculationDate: Date ) { this._calculationDate = calculationDate; }
    
    get calculatedDate(): Date { return this._calculatedDate; }
    set calculatedDate( calculatedDate: Date ) { this._calculatedDate = calculatedDate; }
    
    get overrideDate(): Date { return this._overrideDate; }
    set overrideDate( overrideDate: Date ) { this._overrideDate = overrideDate; }
    
    get overridedFlag(): boolean { return this._overridedFlag; }
    set overridedFlag( overridedFlag: boolean ) { this._overridedFlag = overridedFlag; }
    
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId( offenderBookId: number ) { this._offenderBookId = offenderBookId; }
    
    get createDateTime(): Date { return this._createDateTime; }
    set createDateTime( createDateTime: Date ) { this._createDateTime = createDateTime; }
    
    get createUserId(): string { return this._createUserId; }
    set createUserId( createUserId: string ) { this._createUserId = createUserId; }
    
    get staffName(): string { return this._staffName; }
    set staffName( staffName: string ) { this._staffName = staffName; }
    
    get calculationReason(): string { return this._calculationReason; }
    set calculationReason( calculationReason: string ) { this._calculationReason = calculationReason; }
    
    get commentText(): string { return this._commentText; }
    set commentText( commentText: string ) { this._commentText = commentText; }
    
    get sentCalculationId(): number { return this._sentCalculationId; }
    set sentCalculationId( sentCalculationId: number ) { this._sentCalculationId = sentCalculationId; }
    
    toJSON(): any {
        return {
            'keyDates': this._keyDates,
            'calculationDate': this._calculationDate,
            'calculatedDate': this._calculatedDate,
            'overrideDate': this._overrideDate,
            'overridedFlag': this._overridedFlag,
            'profileType' : this._profileType,
            'profileType2' : this._profileType2,
            'offenderBookId': this._offenderBookId,
            'staffName':this._staffName,
            'calculationReason':this._calculationReason,
            'commentText':this._commentText,
            'createUserId': this._createUserId,
            'createDateTime':  this._createDateTime,
            'sentCalculationId': this._sentCalculationId
        };
    }
}