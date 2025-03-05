import {BaseModel} from '@commonbeans/BaseModel'

export class IdentifierType extends BaseModel{
    
    
    private _description: string ;    
    private _code: string;

    get description(): string { return this._description; }
    set description( description: string ) { this._description = description; }
    
    get code(): string { return this._code; }
    set code( code: string ) { this._code = code; }
}