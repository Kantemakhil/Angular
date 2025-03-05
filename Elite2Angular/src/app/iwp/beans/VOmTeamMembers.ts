import { BaseModel } from "@common/beans/BaseModel";

export class VOmTeamMembers extends BaseModel {
    private _fromDate: Date;
    private _firstName: string;
    private _lastName: string;
    private _sexCode: string;
    private _role: string;
    private _scheduleType: string;
    private _scheduleTypeDesc: string;
    private _staffName: string;
    private _calAgyLocId: string;
    private _position: string;
    private _staffId: number;
    private _nbtNoOffender: number;
    private _nbtStaffId: string;
    private _nbtSkillSubType2: string;
    private _offenderBookId: number;
    private _agyLocId: string;
    private _subTypeFlag: boolean;
    private _omTeamFlag: boolean;

    private _sealFlag: string;
    private _count: number;
    private _createUserId: string;
    private _remainingWlUnits: number;
    private _staffLocRoleId: number;
    


    

    
    


    

    get fromDate(): Date { return this._fromDate; }
    set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }
    get firstName(): string { return this._firstName; }
    set firstName(pfirstName: string) { this._firstName = pfirstName; }
    get lastName(): string { return this._lastName; }
    set lastName(plastName: string) { this._lastName = plastName; }
    get sexCode(): string { return this._sexCode; }
    set sexCode(psexCode: string) { this._sexCode = psexCode; }
    get role(): string { return this._role; }
    set role(prole: string) { this._role = prole; }
    get scheduleType(): string { return this._scheduleType; }
    set scheduleType(pscheduleType: string) { this._scheduleType = pscheduleType; }
    get scheduleTypeDesc(): string { return this._scheduleTypeDesc; }
    set scheduleTypeDesc(pscheduleTypeDesc: string) { this._scheduleTypeDesc = pscheduleTypeDesc; }
    get staffName(): string { return this._staffName; }
    set staffName(pstaffName: string) { this._staffName = pstaffName; }
    get calAgyLocId(): string { return this._calAgyLocId; }
    set calAgyLocId(pcalAgyLocId: string) { this._calAgyLocId = pcalAgyLocId; }
    get position(): string { return this._position; }
    set position(pposition: string) { this._position = pposition; }
    get nbtNoOffender(): number { return this._nbtNoOffender; }
    set nbtNoOffender(pnbtNoOffender: number) { this._nbtNoOffender = pnbtNoOffender; }
    get nbtStaffId(): string { return this._nbtStaffId; }
    set nbtStaffId(pnbtStaffId: string) { this._nbtStaffId = pnbtStaffId; }
    get nbtSkillSubType2(): string { return this._nbtSkillSubType2; }
    set nbtSkillSubType2(pnbtSkillSubType2: string) { this._nbtSkillSubType2 = pnbtSkillSubType2; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
     get staffId(): number { return this._staffId; }
     set staffId(value: number) { this._staffId = value; }

     get agyLocId(): string { return this._agyLocId; }
     set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

     get subTypeFlag(): boolean { return this._subTypeFlag; }
     set subTypeFlag(psubTypeFlag: boolean) { this._subTypeFlag = psubTypeFlag; }

     get omTeamFlag(): boolean { return this._omTeamFlag; }
     set omTeamFlag(pomTeamFlag: boolean) { this._omTeamFlag = pomTeamFlag; }
     get sealFlag(): string { return this._sealFlag; }
     set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

     get count(): number { return this._count; }
     set count(pcount: number) { this._count = pcount; } 

     get createUserId(): string { return this._createUserId; }
     set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    public get remainingWlUnits(): number { return this._remainingWlUnits; }
    public set remainingWlUnits(value: number) { this._remainingWlUnits = value; }
     
    public get staffLocRoleId(): number { return this._staffLocRoleId; }
    public set staffLocRoleId(value: number) { this._staffLocRoleId = value; }

     

     

     


    


    




    toJSON(): any {
        return {
            'fromDate': this._fromDate,
            'firstName': this._firstName,
            'lastName': this._lastName,
            'sexCode': this._sexCode,
            'role': this._role,
            'scheduleType': this._scheduleType,
            'scheduleTypeDesc': this._scheduleTypeDesc,
            'staffName': this._staffName,
            'calAgyLocId': this._calAgyLocId,
            'position': this._position,
            'staffId': this._staffId,
            'nbtNoOffender' : this._nbtNoOffender,
             'nbtStaffId': this._nbtStaffId,
             'nbtSkillSubType2': this._nbtSkillSubType2,
             'offenderBookId': this._offenderBookId,
            'agyLocId': this._agyLocId,
            'subTypeFlag' : this._subTypeFlag,
            'omTeamFlag' : this._omTeamFlag,
            'sealFlag' :this._sealFlag,
            'count' :this._count,
            '_createUserId' : this._createUserId,
            'remainingWlUnits': this._remainingWlUnits,
            'staffLocRoleId': this._staffLocRoleId
        };
    }
}
