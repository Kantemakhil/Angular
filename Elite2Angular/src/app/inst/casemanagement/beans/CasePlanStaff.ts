export class CasePlanStaff {

    private _casePlanStaffRoleId: number;
    private _staffCasePlanId: number;
    private _staffId: string;
    private _casePlanRole: string;
    private _activeFlag: any;
    private _startDate: Date;
    private _endDate: Date;
    private _cnOfficer: any;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _staffName: string;
    private _offenderBookId: Number;
    private _cpOwner: any; 
    private _operation: string;  
  
    public get casePlanStaffRoleId(): number {
        return this._casePlanStaffRoleId;
    }
    public set casePlanStaffRoleId(value: number) {
        this._casePlanStaffRoleId = value;
    }

    public get offenderBookId(): Number {
        return this._offenderBookId;
    }
    public set offenderBookId(value: Number) {
        this._offenderBookId = value;
    }

    private _casePlanId: Number;
    public get casePlanId(): Number {
        return this._casePlanId;
    }
    public set casePlanId(value: Number) {
        this._casePlanId = value;
    }


    public get staffName(): string {
        return this._staffName;
    }
    public set staffName(value: string) {
        this._staffName = value;
    }


    public get staffId(): string {
        return this._staffId;
    }
    public set staffId(value: string) {
        this._staffId = value;
    }
    public get cnOfficer(): any {
        return this._cnOfficer;
    }
    public set cnOfficer(value: any) {
        this._cnOfficer = value;
    }
    public get activeFlag(): any {
        return this._activeFlag;
    }
    public set activeFlag(value: any) {
        this._activeFlag = value;
    }
    public get staffCasePlanId(): number {
        return this._staffCasePlanId;
    }
    public set staffCasePlanId(value: number) {
        this._staffCasePlanId = value;
    }

    public get casePlanRole(): string {
        return this._casePlanRole;
    }
    public set casePlanRole(value: string) {
        this._casePlanRole = value;
    }

    public get startDate(): Date {
        return this._startDate;
    }
    public set startDate(value: Date) {
        this._startDate = value;
    }
    public get endDate(): Date {
        return this._endDate;
    }
    public set endDate(value: Date) {
        this._endDate = value;
    }

    public get createDatetime(): Date {
        return this._createDatetime;
    }
    public set createDatetime(value: Date) {
        this._createDatetime = value;
    }
    public get createUserId(): string {
        return this._createUserId;
    }
    public set createUserId(value: string) {
        this._createUserId = value;
    }
    public get modifyDatetime(): Date {
        return this._modifyDatetime;
    }
    public set modifyDatetime(value: Date) {
        this._modifyDatetime = value;
    }
    public get modifyUserId(): string {
        return this._modifyUserId;
    }
    public set modifyUserId(value: string) {
        this._modifyUserId = value;
    }
    public get sealFlag(): string {
        return this._sealFlag;
    }
    public set sealFlag(value: string) {
        this._sealFlag = value;
    }
    public get cpOwner(): any {
        return this._cpOwner;
    }
    public set cpOwner(value: any) {
        this._cpOwner = value;
    }
    
    public get operation(): string {
        return this._operation;
    }
    public set operation(value: string) {
        this._operation = value;
    }

    toJSON(): any {
        return {
            'casePlanStaffRoleId': this._casePlanStaffRoleId,
            'offenderbookid': this._offenderBookId,
            'staffCasePlanId': this._staffCasePlanId,
            'staffId': this._staffId,
            'casePlanRole': this._casePlanRole,
            'activeFlag': this._activeFlag,
            'startDate': this._startDate,
            'endDate': this._endDate,
            'cnOfficer': this._cnOfficer,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'staffName': this._staffName,
            'caseplanid': this._casePlanId,
            'cpOwner': this._cpOwner,
            'operation': this._operation
        };
    }
}