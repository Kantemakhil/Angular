import { BaseModel } from './BaseModel';

export class MetaData extends BaseModel {

  
    private _label:string;
    private _value:any;


get label(): string { return this._label; }

set label( label: string ) { this._label = label; }

get value(): any { return this._value; }

set value( value: any ) { this._value = value; }

}