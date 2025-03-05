import { BaseModel } from '@common/beans/BaseModel';

export class StaffMembersV2 extends BaseModel {
    private _lastName: string;
    private _birthdate: Date;
    private _hoursPerWeek: number;
    private _role: string;
    private _userId: string;
    private _fromDate: Date;
    private _firstName: string;
    private _suspendedFlag: string;
    private _serialVersionUID: number;
    private _scheduleType: string;
    private _dateTo: Date;
    private _sacStaffId: number;
    private _staffName: string;
    private _calAgyLocId: string;
    private _position: string;

    get lastName(): string { return this._lastName; }
    set lastName(plastName: string) { this._lastName = plastName ; }
    get birthdate(): Date { return this._birthdate; }
    set birthdate(pbirthdate: Date) { this._birthdate = pbirthdate ; }
    get hoursPerWeek(): number { return this._hoursPerWeek; }
    set hoursPerWeek(phoursPerWeek: number) { this._hoursPerWeek = phoursPerWeek ; }
    get role(): string { return this._role; }
    set role(prole: string) { this._role = prole ; }
    get userId(): string { return this._userId; }
    set userId(puserId: string) { this._userId = puserId ; }
    get fromDate(): Date { return this._fromDate; }
    set fromDate(pfromDate: Date) { this._fromDate = pfromDate ; }
    get firstName(): string { return this._firstName; }
    set firstName(pfirstName: string) { this._firstName = pfirstName ; }
    get suspendedFlag(): string { return this._suspendedFlag; }
    set suspendedFlag(psuspendedFlag: string) { this._suspendedFlag = psuspendedFlag ; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID ; }
    get scheduleType(): string { return this._scheduleType; }
    set scheduleType(pscheduleType: string) { this._scheduleType = pscheduleType ; }
    get dateTo(): Date { return this._dateTo; }
    set dateTo(pdateTo: Date) { this._dateTo = pdateTo ; }
    get sacStaffId(): number { return this._sacStaffId; }
    set sacStaffId(psacStaffId: number) { this._sacStaffId = psacStaffId ; }
    get staffName(): string { return this._staffName; }
    set staffName(pstaffName: string) { this._staffName = pstaffName ; }
    get calAgyLocId(): string { return this._calAgyLocId; }
    set calAgyLocId(pcalAgyLocId: string) { this._calAgyLocId = pcalAgyLocId ; }
    get position(): string { return this._position; }
    set position(pposition: string) { this._position = pposition ; }

toJSON(): any {
    return {
       'lastName': this._lastName,
       'birthdate': this._birthdate,
       'hoursPerWeek': this._hoursPerWeek,
       'role': this._role,
       'userId': this._userId,
       'fromDate': this._fromDate,
       'firstName': this._firstName,
       'suspendedFlag': this._suspendedFlag,
       'serialVersionUID': this._serialVersionUID,
       'scheduleType': this._scheduleType,
       'dateTo': this._dateTo,
       'sacStaffId': this._sacStaffId,
       'staffName': this._staffName,
       'calAgyLocId': this._calAgyLocId,
       'position': this._position,
        };
    }
}
