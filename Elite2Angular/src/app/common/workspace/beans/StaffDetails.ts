export class StaffDetails {

private _fromDate: Date;
private _lastName: string;
private _firstName: string;
private _serialVersionUID: number;
private _role: string;
private _teamMemberId: string;
private _staffName: string;
private _position: string;
private _staffId: number;

private _agencyLocationType: string;
private _agyLocId: string;
private _staffStatus: string;
private _areaCode: string;
private _toDate: Date;
private _scheduleType: string;
private _hoursPerWeek: number;
private _agyLocType: string;
get toDate(): Date { return this._toDate; }
set toDate(ptoDate: Date) { this._toDate = ptoDate; }
get agencyLocationType(): string { return this._agencyLocationType; }
set agencyLocationType(pagencyLocationType: string) { this._agencyLocationType = pagencyLocationType; }
get agyLocId(): string { return this._agyLocId; }
set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
get staffStatus(): string { return this._staffStatus; }
set staffStatus(pstaffStatus: string) { this._staffStatus = pstaffStatus; }
get areaCode(): string { return this._areaCode; }
set areaCode(pareaCode: string) { this._areaCode = pareaCode; }


get fromDate(): Date { return this._fromDate; }
set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }
get lastName(): string { return this._lastName; }
set lastName(plastName: string) { this._lastName = plastName; }
get firstName(): string { return this._firstName; }
set firstName(pfirstName: string) { this._firstName = pfirstName; }
get serialVersionUID(): number { return this._serialVersionUID; }
set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
get role(): string { return this._role; }
set role(prole: string) { this._role = prole; }
get teamMemberId(): string { return this._teamMemberId; }
set teamMemberId(pteamMemberId: string) { this._teamMemberId = pteamMemberId; }
get staffName(): string { return this._staffName; }
set staffName(pstaffName: string) { this._staffName = pstaffName; }
get position(): string { return this._position; }
set position(pposition: string) { this._position = pposition; }
get staffId(): number { return this._staffId; }
set staffId(pstaffId: number) { this._staffId = pstaffId; }
get hoursPerWeek(): number { return this._hoursPerWeek; }

set hoursPerWeek(phoursPerWeek: number) { this._hoursPerWeek = phoursPerWeek; }

get scheduleType(): string { return this._scheduleType; }
set scheduleType(pscheduleType: string) { this._scheduleType = pscheduleType; }//_agyLocType


get agyLocType(): string { return this._agyLocType; }
set agyLocType(pagyLocType: string) { this._agyLocType = pagyLocType; }
toJSON(): any {
return {
'fromDate': this._fromDate,
'lastName': this._lastName,
'firstName': this._firstName,
'serialVersionUID': this._serialVersionUID,
'role': this._role,
'teamMemberId': this._teamMemberId,
'staffName': this._staffName,
'position': this._position,
'staffId': this._staffId,
'toDate': this._toDate,
'agencyLocationType': this._agencyLocationType,
'agyLocId': this._agyLocId,
'staffStatus': this._staffStatus,
'areaCode': this._areaCode,
'hoursPerWeek': this._hoursPerWeek,
'scheduleType': this._scheduleType,
'agyLocType' : this._agyLocType,
};
}
}