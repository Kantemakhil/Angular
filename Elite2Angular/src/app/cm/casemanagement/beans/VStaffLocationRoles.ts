
export class VStaffLocationRoles {
    private _lastName: string;
    private _birthdate: Date;
    private _role: string;
    private _hoursPerWeek: number;
    private _fromDate: Date;
    private _firstName: string;
    private _scheduleType: string;
    private _staffName: string;
    private _sacStaffId: number;
    private _dateTo: Date;
    private _calAgyLocId: string;
    private _position: string;
    private _status: string;
    private _description: string;
    private _code: number;

    get lastName(): string { return this._lastName; }
    set lastName(plastName: string) { this._lastName = plastName; }
    get birthdate(): Date { return this._birthdate; }
    set birthdate(pbirthdate: Date) { this._birthdate = pbirthdate; }
    get role(): string { return this._role; }
    set role(prole: string) { this._role = prole; }
    get hoursPerWeek(): number { return this._hoursPerWeek; }
    set hoursPerWeek(phoursPerWeek: number) { this._hoursPerWeek = phoursPerWeek; }
    get fromDate(): Date { return this._fromDate; }
    set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }
    get firstName(): string { return this._firstName; }
    set firstName(pfirstName: string) { this._firstName = pfirstName; }
    get scheduleType(): string { return this._scheduleType; }
    set scheduleType(pscheduleType: string) { this._scheduleType = pscheduleType; }
    get staffName(): string { return this._staffName; }
    set staffName(pstaffName: string) { this._staffName = pstaffName; }
    get sacStaffId(): number { return this._sacStaffId; }
    set sacStaffId(psacStaffId: number) { this._sacStaffId = psacStaffId; }
    get dateTo(): Date { return this._dateTo; }
    set dateTo(pdateTo: Date) { this._dateTo = pdateTo; }
    get calAgyLocId(): string { return this._calAgyLocId; }
    set calAgyLocId(pcalAgyLocId: string) { this._calAgyLocId = pcalAgyLocId; }
    get position(): string { return this._position; }
    set position(pposition: string) { this._position = pposition; }
    get status(): string { return this._status; }
    set status(pstatus: string) { this._status = pstatus; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get code(): number { return this._code; }
    set code(pcode: number) { this._code = pcode; }

    toJSON(): any {
        return {
            'lastName': this._lastName,
            'birthdate': this._birthdate,
            'role': this._role,
            'hoursPerWeek': this._hoursPerWeek,
            'fromDate': this._fromDate,
            'firstName': this._firstName,
            'scheduleType': this._scheduleType,
            'staffName': this._staffName,
            'sacStaffId': this._sacStaffId,
            'dateTo': this._dateTo,
            'calAgyLocId': this._calAgyLocId,
            'position': this._position,
            'status': this._status,
            'description': this._description,
            'code': this._code,
        };
    }
}