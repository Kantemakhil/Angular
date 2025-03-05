export class AgyLocTeamFunctions{

private _createUserId: string;
private _modifyDatetime: number;
private _agyLocTeamFunctionId: number;
private _modifyUserId: string;
private _overwrittenFlag: string;
private _createDatetime: number;
private _expiryDate: Date;
private _serialVersionUID: number;
private _teamId: number;
private _functionType: string;
private _sealFlag: string;
private _effectiveDate: Date;
private _activeFlag: string;
private _agencyLocation: number;

private _agyLocId: string;

private _teamIdDesc: string;

get teamIdDesc(): string{ return this._teamIdDesc; }
set teamIdDesc(pteamIdDesc: string){ this._teamIdDesc = pteamIdDesc ;}

get agyLocId(): string{ return this._agyLocId; }
set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}



get createUserId(): string{ return this._createUserId; }
set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
get modifyDatetime(): number{ return this._modifyDatetime; }
set modifyDatetime(pmodifyDatetime: number){ this._modifyDatetime = pmodifyDatetime ;}
get agyLocTeamFunctionId(): number{ return this._agyLocTeamFunctionId; }
set agyLocTeamFunctionId(pagyLocTeamFunctionId: number){ this._agyLocTeamFunctionId = pagyLocTeamFunctionId ;}
get modifyUserId(): string{ return this._modifyUserId; }
set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
get overwrittenFlag(): string{ return this._overwrittenFlag; }
set overwrittenFlag(poverwrittenFlag: string){ this._overwrittenFlag = poverwrittenFlag ;}
get createDatetime(): number{ return this._createDatetime; }
set createDatetime(pcreateDatetime: number){ this._createDatetime = pcreateDatetime ;}
get expiryDate(): Date{ return this._expiryDate; }
set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
get serialVersionUID(): number{ return this._serialVersionUID; }
set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
get teamId(): number{ return this._teamId; }
set teamId(pteamId: number){ this._teamId = pteamId ;}
get functionType(): string{ return this._functionType; }
set functionType(pfunctionType: string){ this._functionType = pfunctionType ;}
get sealFlag(): string{ return this._sealFlag; }
set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
get effectiveDate(): Date{ return this._effectiveDate; }
set effectiveDate(peffectiveDate: Date){ this._effectiveDate = peffectiveDate ;}
get activeFlag(): string{ return this._activeFlag; }
set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
get agencyLocation(): number{ return this._agencyLocation; }
set agencyLocation(pagencyLocation: number){ this._agencyLocation = pagencyLocation ;}

toJSON(): any {
return {
'createUserId': this._createUserId,
'modifyDatetime': this._modifyDatetime,
'agyLocTeamFunctionId': this._agyLocTeamFunctionId,
'modifyUserId': this._modifyUserId,
'overwrittenFlag': this._overwrittenFlag,
'createDatetime': this._createDatetime,
'expiryDate': this._expiryDate,
'serialVersionUID': this._serialVersionUID,
'teamId': this._teamId,
'functionType': this._functionType,
'sealFlag': this._sealFlag,
'effectiveDate': this._effectiveDate,
'activeFlag': this._activeFlag,
'agencyLocation': this._agencyLocation,
'agyLocId':this._agyLocId,
'teamIdDesc':this._teamIdDesc
};
}
}