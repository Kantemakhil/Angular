import {BaseModel} from '@commonbeans/BaseModel'

export class HoldWarrentDetainer extends BaseModel {
    
    private _holdWarrentDetainerId : number;
    private _offenderBookId : number;
    private _receivedDate : Date;
    private _issuingAgyLocId : string;
    private _holdWarrentDetainerType : string  ;
    private _warrentNumber : string;
    private _startDate : Date;
    private _expiryDate : Date;
    private _bailAmount : number;
    private _probRevocFlag : string;
    private _holdWarrentDetainerTypeInfoIdStatus : string;
    private _createUserId : string;
    private _createDateTime : Date;
    private _modifyUserId : string ;
    private _modifyDateTime : Date;



get holdWarrentDetainerId(): number { return this._holdWarrentDetainerId; }

set holdWarrentDetainerId(holdWarrentDetainerId: number ) { this._holdWarrentDetainerId = holdWarrentDetainerId; }

get offenderBookId(): number { return this._offenderBookId; }

set offenderBookId( offenderBookId: number ) { this._offenderBookId = offenderBookId; }

get receivedDate(): Date{ return this._receivedDate; }

set receivedDate(receivedDate: Date ) { this._receivedDate = receivedDate; }

get issuingAgyLocId(): string { return this._issuingAgyLocId; }

set issuingAgyLocId(issuingAgyLocId: string ) { this._issuingAgyLocId = issuingAgyLocId; }

get holdWarrentDetainerType(): string { return this._holdWarrentDetainerType; }

set holdWarrentDetainerType(holdWarrentDetainerType: string ) { this._holdWarrentDetainerType = holdWarrentDetainerType; }

get warrentNumber(): string { return this._warrentNumber; }

set warrentNumber(warrentNumber: string ) { this._warrentNumber = warrentNumber; }

get startDate(): Date{ return this._startDate; }

set startDate(startDate: Date ) { this._startDate = startDate; }

get expiryDate(): Date{ return this._expiryDate; }

set expiryDate(expiryDate: Date ) { this._expiryDate = expiryDate; }

get bailAmount(): number { return this._bailAmount; }

set bailAmount(bailAmount: number ) { this._bailAmount = bailAmount; }

get probRevocFlag(): string { return this._probRevocFlag; }

set probRevocFlag( probRevocFlag: string ) { this._probRevocFlag = probRevocFlag; }

get holdWarrentDetainerTypeInfoIdStatus(): string { return this._holdWarrentDetainerTypeInfoIdStatus; }

set holdWarrentDetainerTypeInfoIdStatus( holdWarrentDetainerTypeInfoIdStatus: string ) { this._holdWarrentDetainerTypeInfoIdStatus = holdWarrentDetainerTypeInfoIdStatus; }

get modifyDateTime(): Date { return this._modifyDateTime; }

set modifyDateTime( modifyDateTime: Date ) { this._modifyDateTime = modifyDateTime; }

get createDateTime(): Date { return this._createDateTime; }

set createDateTime( createDateTime: Date ) { this._createDateTime = createDateTime; }

get modifyUserId(): string { return this._modifyUserId; }

set modifyUserId( modifyUserId: string ) { this._modifyUserId = modifyUserId; }

get createUserId(): string { return this._createUserId; }

set createUserId( createUserId: string ) { this._createUserId = createUserId; }



toJSON(): any {
    return {
        'holdWarrentDetainerId': this._holdWarrentDetainerId,
        'offenderBookId': this._offenderBookId,
        'receivedDate': this._receivedDate,
        'issuingAgyLocId': this._issuingAgyLocId,
        'holdWarrentDetainerType':this._holdWarrentDetainerType,
        'warrentNumber':this._warrentNumber,
        'startDate': this._startDate,
        'expiryDate': this._expiryDate,
        'bailAmount': this._bailAmount,
        'probRevocFlag': this._probRevocFlag,
        'holdWarrentDetainerTypeInfoIdStatus': this._holdWarrentDetainerTypeInfoIdStatus,
        'modifyDateTime': this._modifyDateTime,
        'modifyUserId':  this._modifyUserId,
        'createUserId': this._createUserId,
        'createDateTime':  this._createDateTime,
        
    };
}
}