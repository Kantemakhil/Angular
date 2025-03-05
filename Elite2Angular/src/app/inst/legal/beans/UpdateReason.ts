import {BaseModel} from '@commonbeans/BaseModel';

export class UpdateReason extends BaseModel{
    
    private _description: string ;    
    private _code: string;
    private _status: string;
    private _category: string;
    
    get description(): string { return this._description; }
    set description( description: string ) { this._description = description; }
    
    get code(): string { return this._code; }
    set code( code: string ) { this._code = code; }
    
    get status(): string { return this._status; }
    set status( status: string ) { this._status = status; }
    
    get category(): string { return this._category; }
    set category( category: string ) { this._category = category; }
    
    toJSON(): any {
        return {            
        'description': this._description,
        'code': this._code,
        'category': this._category,
        'staus': this._status
        };
     }
}