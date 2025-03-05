import { BaseModel } from "@common/beans/BaseModel";

export class StaffMembersV1 extends BaseModel {
    private _firstName: string;
    private _lastName: string;
    private _code: string;
    private _name: string;
    private _description: string;
    private _userId: string;
    private _staffId: number;

    get firstName(): string{ return this._firstName; }
    set firstName(pfirstName: string){ this._firstName = pfirstName ;}
    get lastName(): string{ return this._lastName; }
    set lastName(plastName: string){ this._lastName = plastName ;}
    get code(): string{ return this._code; }
    set code(pcode: string){ this._code = pcode ;}
    get name(): string{ return this._name; }
    set name(pname: string){ this._name = pname ;}
    get description(): string{ return this._description; }
    set description(pdescription: string){ this._description = pdescription ;}
    get userId(): string{ return this._userId; }
    set userId(puserId: string){ this._userId = puserId ;}
    get staffId(): number{ return this._staffId; }
    set staffId(pstaffId: number){ this._staffId = pstaffId ;}

toJSON(): any {
    return { 
       'firstName': this._firstName,
       'lastName': this._lastName,
       'code': this._code,
       'name': this._name,
       'description': this._description,
       'userId': this._userId,
       'staffId': this._staffId,
        };
    } 
}