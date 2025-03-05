import {BaseModel} from '@commonbeans/BaseModel'

export class AssignReport extends BaseModel {

    private _functionType:string;
    private _teamResponsible: string;
    private _teamName: string;
    private _lastName: string;
    private _firstName: string;
    
get functionType(): string { return this._functionType; }

set functionType(functionType: string ) { this._functionType = functionType; }

get teamResponsible(): string { return this._teamResponsible; }

set teamResponsible(teamResponsible: string ) { this._teamResponsible = teamResponsible; }

get teamName(): string { return this._teamName; }

set teamName(teamName: string ) { this._teamName = teamName; }

get lastName(): string { return this._lastName; }

set lastName(lastName: string ) { this._lastName = lastName; }

get firstName(): string { return this._firstName; }

set firstName(firstName: string ) { this._firstName = firstName; }

toJSON(): any {
    return {
        
        'functionType': this._functionType,
        'teamResponsible': this._teamResponsible,
        'teamName': this._teamName,
        'lastName': this._lastName,
        'firstName': this._firstName,
        
    
    };
 }

}

