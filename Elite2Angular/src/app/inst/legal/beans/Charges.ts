import {BaseModel} from '@commonbeans/BaseModel'

export class Charges extends BaseModel {
    
    private _holdWarrentDetainerId : number;
    private _holdWarrentDetainerChargeId : number;
    private _chargeCode : string;
    private _chargeComment : string;
    private _triedUntried : string;
    private _chargeStatus : string;
    private _createUserId : string;
    private _createDateTime : Date;
    private _modifyUserId : string ;
    private _modifyDateTime : Date;



get holdWarrentDetainerId(): number { return this._holdWarrentDetainerId; }

set holdWarrentDetainerId(holdWarrentDetainerId: number ) { this._holdWarrentDetainerId = holdWarrentDetainerId; }

get holdWarrentDetainerChargeId(): number { return this._holdWarrentDetainerChargeId; }

set holdWarrentDetainerChargeId( holdWarrentDetainerChargeId: number ) { this._holdWarrentDetainerChargeId = holdWarrentDetainerChargeId; }

get chargeCode(): string { return this._chargeCode; }

set chargeCode(chargeCode: string ) { this._chargeCode = chargeCode; }

get chargeComment(): string { return this._chargeComment; }

set chargeComment(chargeComment: string ) { this._chargeComment = chargeComment; }

get triedUntried(): string { return this._triedUntried; }

set triedUntried(triedUntried: string ) { this._triedUntried = triedUntried; }

get chargeStatus(): string { return this._chargeStatus; }

set chargeStatus( chargeStatus: string ) { this._chargeStatus = chargeStatus; }

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
        'holdWarrentDetainerChargeId': this._holdWarrentDetainerChargeId,
        'chargeCode': this._chargeCode,
        'chargeComment': this._chargeComment,
        'triedUntried':this._triedUntried,
        'chargeStatus':this._chargeStatus,
        'modifyDateTime': this._modifyDateTime,
        'modifyUserId':  this._modifyUserId,
        'createUserId': this._createUserId,
        'createDateTime':  this._createDateTime,
        
    };
}
}