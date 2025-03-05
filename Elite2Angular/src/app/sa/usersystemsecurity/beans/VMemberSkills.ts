export class VMemberSkills {
    private _firstName: string;
    private _lastName: string;
    private _serialVersionUID: number;
    private _sexCode: string;
    private _role: string;
    private _scheduleType: string;
    private _agyLocId: string;
    private _position: string;
    private _staffId: number;
    private _status: string;
    private _skillType: string;
	private _subType: string;
	private _city: string;
	private _agencyLocationType: string;
    private _nomsRegionCode: string;
    
    get firstName(): string{ return this._firstName; }
    set firstName(pfirstName: string){ this._firstName = pfirstName ;}
    get lastName(): string{ return this._lastName; }
    set lastName(plastName: string){ this._lastName = plastName ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get sexCode(): string{ return this._sexCode; }
    set sexCode(psexCode: string){ this._sexCode = psexCode ;}
    get role(): string{ return this._role; }
    set role(prole: string){ this._role = prole ;}
    get scheduleType(): string{ return this._scheduleType; }
    set scheduleType(pscheduleType: string){ this._scheduleType = pscheduleType ;}
    get agyLocId(): string{ return this._agyLocId; }
    set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
    get position(): string{ return this._position; }
    set position(pposition: string){ this._position = pposition ;}
    get staffId(): number{ return this._staffId; }
    set staffId(pstaffId: number){ this._staffId = pstaffId ;}
    get status(): string{ return this._status; }
    set status(pstatus: string){ this._status = pstatus ;}

    get skillType(): string{ return this._skillType; }
    set skillType(pskillType: string){ this._skillType = pskillType ;}
    get subType(): string{ return this._subType; }
    set subType(psubType: string){ this._subType = psubType ;}
    get city(): string{ return this._city; }
    set city(pcity: string){ this._city = pcity ;}
    get agencyLocationType(): string{ return this._agencyLocationType; }
    set agencyLocationType(pagencyLocationType: string){ this._agencyLocationType = pagencyLocationType ;}
    get nomsRegionCode(): string{ return this._nomsRegionCode; }
    set nomsRegionCode(pnomsRegionCode: string){ this._nomsRegionCode = pnomsRegionCode ;}

toJSON(): any {
    return { 
       'firstName': this._firstName,
       'lastName': this._lastName,
       'serialVersionUID': this._serialVersionUID,
       'sexCode': this._sexCode,
       'role': this._role,
       'scheduleType': this._scheduleType,
       'agyLocId': this._agyLocId,
       'position': this._position,
       'staffId': this._staffId,
       'status': this._status,
       'skillType': this._skillType,
       'subType': this._subType,
       'city': this._city,
       'agencyLocationType': this._agencyLocationType,
       'nomsRegionCode': this._nomsRegionCode,
        };
    }  
}