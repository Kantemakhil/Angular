import { BaseModel } from '@commonbeans/BaseModel';
export class ScheduleTripAssignments extends BaseModel {
    private _lastName: string;
    private _firstName: string;
    private _butExit: string;
    private _staffId: number;

    get lastName(): string{ return this._lastName; }
    set lastName(plastName: string){ this._lastName = plastName ;}
    get firstName(): string{ return this._firstName; }
    set firstName(pfirstName: string){ this._firstName = pfirstName ;}
    get butExit(): string{ return this._butExit; }
    set butExit(pbutExit: string){ this._butExit = pbutExit ;}
    get staffId(): number{ return this._staffId; }
    set staffId(pstaffId: number){ this._staffId = pstaffId ;}

toJSON(): any {
    return { 
       'lastName': this._lastName,
       'firstName': this._firstName,
       'butExit': this._butExit,
       'staffId': this._staffId,
        };
    } 
}
