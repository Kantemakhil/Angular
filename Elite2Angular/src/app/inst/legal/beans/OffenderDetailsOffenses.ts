import {BaseModel} from '@commonbeans/BaseModel';

export class OffenderDetailsOffenses extends BaseModel {
    
   
   
    private _seqNo: number;
    private _caseId: number;
    private _bookingId: number;
    private _chargeId: number;  
    private _description: string;
    private _code: string;
    private  _statuteCode: string;

    get seqNo(): number { return this._seqNo; }
    set seqNo( seqNo: number ) { this._seqNo = seqNo; }
        
    get caseId(): number { return this._caseId; }
    set caseId( caseId: number ) { this._caseId = caseId; }

    get bookingId(): number { return this._bookingId; }
    set bookingId( bookingId: number ) { this._bookingId = bookingId; }
    
    get chargeId(): number { return this._chargeId; }
    set chargeId( chargeId: number ) { this._chargeId = chargeId; }

    get description(): string { return this._description; }
    set description( description: string ) { this._description = description; }
    
    get code(): string { return this._code; }
    set code( code: string ) { this._code = code; }
    
    get statuteCode(): string { return this._statuteCode; }
    set statuteCode( statuteCode: string ) { this._statuteCode = statuteCode; }

}