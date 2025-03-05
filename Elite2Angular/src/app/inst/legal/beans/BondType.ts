import {BaseModel} from '@commonbeans/BaseModel';

export class BondType extends BaseModel{
   
    private _description: string ;    
    private _code: string;
    private _condition:string;
    private _categoryTypeCode;
    private _category;
    private _conditionCode;

    get description(): string { return this._description; }
    set description( description: string ) { this._description = description; }
    
    get code(): string { return this._code; }
    set code( code: string ) { this._code = code; }
    
    get condition(): string { return this._condition; }
    set condition( condition: string ) { this._condition = condition; }
    
    get categoryTypeCode(): string { return this._categoryTypeCode; }
    set categoryTypeCode( categoryTypeCode: string ) { this._categoryTypeCode = categoryTypeCode; }
    
    get category(): string { return this._category; }
    set category( category: string ) { this._category = category; }
    
    get conditionCode(): string { return this._conditionCode; }
    set conditionCode( conditionCode: string ) { this._conditionCode = conditionCode; }
}