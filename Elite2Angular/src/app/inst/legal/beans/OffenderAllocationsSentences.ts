export class OffenderAllocationsSentences {
    private _formInfoJson: string;
    private _lastName: string;
    private _firstName: string;
    private _commenceType: string;
    private _no: number;
    private _serialVersionUID: number;
    private _offenderBookId: number;
    private _offenderIdDisplay: string;
    private _caseLoadId: string;
    private _matter: string;
    private _teamCode: string;
    private _agyLocId: string;
    private _teamMemberId: number;
    private _staffId: number;
    private _teamId: number;
    private _conTransferId: number;
    private _offenderSentConditionId: number;
    private _intakeAgyLocId: string;
    private _condtionExists: boolean;
    private _conditionsExistsInBoth: boolean;

   
    get formInfoJson(): string{ return this._formInfoJson; }
    set formInfoJson(pformInfoJson: string){ this._formInfoJson = pformInfoJson ;}
    get lastName(): string{ return this._lastName; }
    set lastName(plastName: string){ this._lastName = plastName ;}
    get firstName(): string{ return this._firstName; }
    set firstName(pfirstName: string){ this._firstName = pfirstName ;}
    get commenceType(): string{ return this._commenceType; }
    set commenceType(pcommenceType: string){ this._commenceType = pcommenceType ;}
    get no(): number{ return this._no; }
    set no(pno: number){ this._no = pno ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get offenderIdDisplay(): string{ return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay ;}
    get caseLoadId(): string{ return this._caseLoadId; }
    set caseLoadId(pcaseLoadId: string){ this._caseLoadId = pcaseLoadId ;}
    get matter(): string{ return this._matter; }
    set matter(pmatter: string){ this._matter = pmatter ;}
    get teamCode(): string{ return this._teamCode; }
    set teamCode(pteamCode: string){ this._teamCode = pteamCode ;}
    get teamMemberId(): number{ return this._teamMemberId; }
	set teamMemberId(pteamMemberId: number){ this._teamMemberId = pteamMemberId ;}
    get teamId(): number{ return this._teamId; }
	set teamId(pteamId: number){ this._teamId = pteamId ;}
    get agyLocId(): string{ return this._agyLocId; }
	set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
    get staffId(): number{ return this._staffId; }
	set staffId(pstaffId: number){ this._staffId = pstaffId ;}
    get conTransferId(): number{ return this._conTransferId; }
	set conTransferId(pconTransferId: number){ this._conTransferId = pconTransferId ;}
    get offenderSentConditionId(): number{ return this._offenderSentConditionId; }
	set offenderSentConditionId(poffenderSentConditionId: number){ this._offenderSentConditionId = poffenderSentConditionId ;}
    get intakeAgyLocId(): string { return this._intakeAgyLocId; }
    set intakeAgyLocId(value: string) { this._intakeAgyLocId = value; }
    get condtionExists(): boolean { return this._condtionExists; }
    set condtionExists(value: boolean) { this._condtionExists = value; }
    get conditionsExistsInBoth(): boolean { return this._conditionsExistsInBoth; }
    set conditionsExistsInBoth(value: boolean) { this._conditionsExistsInBoth = value; }
toJSON(): any {
    return { 
       'formInfoJson': this._formInfoJson,
       'lastName': this._lastName,
       'firstName': this._firstName,
       'commenceType': this._commenceType,
       'no': this._no,
       'serialVersionUID': this._serialVersionUID,
       'offenderBookId': this._offenderBookId,
       'offenderIdDisplay': this._offenderIdDisplay,
       'caseLoadId': this._caseLoadId,
       'matter': this._matter,
       'teamCode': this._teamCode,
       'teamMemberId': this._teamMemberId,
       'teamId': this._teamId,
       'agyLocId': this._agyLocId,
       'staffId': this._staffId,
       'conTransferId': this._conTransferId,
       'offenderSentConditionId': this._offenderSentConditionId,
       'intakeAgyLocId': this._intakeAgyLocId,
       'condtionExists': this._condtionExists,
       'conditionsExistsInBoth': this._conditionsExistsInBoth
        };
    } 
}