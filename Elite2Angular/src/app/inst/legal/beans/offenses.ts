import { BaseModel } from "@commonbeans/BaseModel";

export class Offenses extends BaseModel {
    
    private _description: string;
    private _code: string;
    private _category: string;
    private _disposition:string;
    private _offenseStatus:string;
    private _outcomeReasonCode: string;
    private _statuteCode: string;
    

get description(): string { return this._description; }

set description( description: string ) { this._description = description; }

get code(): string { return this._code; }

set code( code: string ) { this._code = code; }

get category(): string { return this._category; }

set category( category: string ) { this._category = category; }

get disposition(): string { return this._disposition; }

set disposition( disposition: string ) { this._disposition = disposition; }

get offenseStatus(): string { return this._offenseStatus; }

set offenseStatus( offenseStatus: string ) { this._offenseStatus = offenseStatus; }

get outcomeReasonCode(): string { return this._outcomeReasonCode; }

set outcomeReasonCode(poutcomeReasonCode: string){ this._outcomeReasonCode = poutcomeReasonCode; }

get statuteCode(): string { return this._statuteCode; }

set statuteCode(statuteCode: string) { this._statuteCode = statuteCode; }


toJSON(): any {
    return {
        
    'code':this._code,
    'description':this._description,
    'disposition':this._disposition,
    'offenseStatus':this._offenseStatus,
    'statuteCode': this._statuteCode,
    };
} 

}

