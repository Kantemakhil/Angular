import { BaseModel } from '@commonbeans/BaseModel';
export class OffenceIndicators extends BaseModel {

   
    private _offenceIndicatorId: Number;
    private _createDatetime: Date;
    private _createUserId: string;
    private _indicatorCode: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _offenceCode: string;
    
   // private _expiryDate: Date;
   
   
   
    
    private _sealFlag: string;
    private _statuteCode: string;
    private _offence: string;
    private _code: string;


    get offenceIndicatorId(): Number { return this._offenceIndicatorId; }
    set offenceIndicatorId(poffenceIndicatorId: Number) { this._offenceIndicatorId = poffenceIndicatorId; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }


    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }


    get indicatorCode(): string { return this._indicatorCode; }
    set indicatorCode(pindicatorCode: string) { this._indicatorCode = pindicatorCode; }
   

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }


    
    
    get offenceCode(): string { return this._offenceCode; }
    set offenceCode(poffenceCode: string) { this._offenceCode = poffenceCode; }   
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get statuteCode(): string { return this._statuteCode; }
    set statuteCode(pstatuteCode: string) { this._statuteCode = pstatuteCode; }
     get offence(): string { return this._offence; }
    set offence(poffence: string) { this._offence = poffence; } 
    get code(): string { return this._code; }
    set code(pcode: string) { this._code = pcode; }
    toJSON(): any {
        return {
            'offenceIndicatorId': this._offenceIndicatorId,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'indicatorCode': this._indicatorCode,             
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'offenceCode': this._offenceCode,          
            'sealFlag': this._sealFlag,
            'statuteCode': this._statuteCode,
            'offence': this._offence,
            'code': this._code
        };
    }
}
