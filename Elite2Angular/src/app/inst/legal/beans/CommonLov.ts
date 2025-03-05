import {BaseModel} from '@commonbeans/BaseModel';

export class CommonLov extends BaseModel{
    
    private _description: string ;    
    private _code: string;
    private _method: string;
    private _id: number;

    get description(): string { return this._description; }
    set description( description: string ) { this._description = description; }
    
    get code(): string { return this._code; }
    set code( code: string ) { this._code = code; }
    
    get method(): string { return this._method; }
    set method( method: string ) { this._method = method; }
    
    get id(): number { return this._id; }
    set id( id: number ) { this._id = id; }
}