import { BaseModel } from './BaseModel';

export class FileLimits extends BaseModel {

   
    private _profileValue: string;
    private _profileCode: string;
    

    get profileValue(): string { return this._profileValue; }

    set profileValue( profileValue: string ) { this._profileValue = profileValue; }

    get profileCode(): string { return this._profileCode; }

    set profileCode( profileCode: string ) { this._profileCode = profileCode; }

    toJSON(): any {
        return {
            
            'profileValue': this._profileValue,
            'profileCode': this._profileCode,
            
        };
    }
}