import { BaseModel } from '@commonbeans/BaseModel';

export class UpdateUser extends BaseModel {
    
    
    private _staffId: number;    
    private _lastName: string;   
    private _firstName: string;

get staffId(): number { return this._staffId; }
set staffId( id: number ) { this._staffId = id; }

get lastName(): string { return this._lastName; }
set lastName( lname: string ) { this._lastName = lname; }

get firstName(): string { return this._firstName; }
set firstName( lname: string ) { this._firstName = lname; }

toJSON(): any {
    return {
        'istaffId': this._staffId,
        'lastName': this._lastName,
        'firstName': this._firstName
    };
}
}