export class OffenderTeamAssignments {
    private _createDatetime: Date;
    private _expiryDate: Date;
    
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _teamId: number;
    private _modifyUserId: string;
    private _assignmentDate: Date;
    private _functionType: string;
    private _sealFlag: string;
    private _teamIdDesc: string;
    private _teamCode: string;
    private _nbtActiveFlag: string;
    private _returnValue: number;
    private _serverCode:number;
    get serverCode(): number{ return this._serverCode; }
    set serverCode(pserverCode: number){ this._serverCode = pserverCode;}
    get nbtActiveFlag(): string{ return this._nbtActiveFlag; }
    set nbtActiveFlag(pnbtActiveFlag: string){ this._nbtActiveFlag = pnbtActiveFlag ;}
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get teamIdDesc(): string{ return this._teamIdDesc; }
    set teamIdDesc(pteamIdDesc: string){ this._teamIdDesc = pteamIdDesc ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get teamId(): number{ return this._teamId; }
    set teamId(pteamId: number){ this._teamId = pteamId ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get assignmentDate(): Date{ return this._assignmentDate; }
    set assignmentDate(passignmentDate: Date){ this._assignmentDate = passignmentDate ;}
    get functionType(): string{ return this._functionType; }
    set functionType(pfunctionType: string){ this._functionType = pfunctionType ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get teamCode(): string { return this._teamCode; }
    set teamCode(pteamCode: string) { this._teamCode = pteamCode; }
    get returnValue(): number{ return this._returnValue; }
    set returnValue(preturnValue: number){ this._returnValue = preturnValue ;}

toJSON(): any {
    return { 
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'offenderBookId': this._offenderBookId,
       'teamId': this._teamId,
       'modifyUserId': this._modifyUserId,
       'assignmentDate': this._assignmentDate,
       'functionType': this._functionType,
       'sealFlag': this._sealFlag,
       'teamIdDesc': this._teamIdDesc,
       'teamCode': this._teamCode,
       'nbtActiveFlag': this._nbtActiveFlag,
       'returnValue': this._returnValue,
       'serverCode': this._serverCode,
       'expiryDate': this._expiryDate,
        };
    }  
}