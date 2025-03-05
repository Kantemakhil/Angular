export class VOffenderTeamAssignHty {
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _assignDate: Date;
    private _offenderBookId: number;
    private _offenderTeamAssignHtyId: number;
    private _teamId: number;
    private _teamCode: string;
    private _functionType: string;
    private _teamDescription: string;
    private _functionTypeDesc: string;

    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get assignDate(): Date{ return this._assignDate; }
    set assignDate(passignDate: Date){ this._assignDate = passignDate ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get offenderTeamAssignHtyId(): number{ return this._offenderTeamAssignHtyId; }
    set offenderTeamAssignHtyId(poffenderTeamAssignHtyId: number){ this._offenderTeamAssignHtyId = poffenderTeamAssignHtyId ;}
    get teamId(): number{ return this._teamId; }
    set teamId(pteamId: number){ this._teamId = pteamId ;}
    get teamCode(): string{ return this._teamCode; }
    set teamCode(pteamCode: string){ this._teamCode = pteamCode ;}
    get functionType(): string{ return this._functionType; }
    set functionType(pfunctionType: string){ this._functionType = pfunctionType ;}
    get teamDescription(): string{ return this._teamDescription; }
    set teamDescription(pteamDescription: string){ this._teamDescription = pteamDescription ;}
    get functionTypeDesc(): string{ return this._functionTypeDesc; }
    set functionTypeDesc(pfunctionTypeDesc: string){ this._functionTypeDesc = pfunctionTypeDesc ;}

toJSON(): any {
    return { 
       'expiryDate': this._expiryDate,
       'serialVersionUID': this._serialVersionUID,
       'assignDate': this._assignDate,
       'offenderBookId': this._offenderBookId,
       'offenderTeamAssignHtyId': this._offenderTeamAssignHtyId,
       'teamId': this._teamId,
       'teamCode': this._teamCode,
       'functionType': this._functionType,
       'teamDescription': this._teamDescription,
       'functionTypeDesc': this._functionTypeDesc,
        };
    }  
}