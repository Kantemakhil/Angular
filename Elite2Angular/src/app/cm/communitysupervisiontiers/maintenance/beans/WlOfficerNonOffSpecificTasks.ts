export class WlOfficerNonOffSpecificTasks {
    private _staffId: number;
    private _agyLocId: string;
    private _fromDate: Date;
    private _staffPosition: string;
    private _staffRole: string;
    private _workloadTaskType: string;
    private _units: number;
    private _activeFlag: string;
    private _sealFlag: String;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _defaultTask: string;
    private _availableUnits: number;
    private _staffLocRoleId: number;

    public get staffId(): number { return this._staffId; }
    public set staffId(pstaffId: number) { this._staffId = pstaffId; }

    public get agyLocId(): string { return this._agyLocId; }
    public set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    public get staffRole(): string { return this._staffRole; }
    public set staffRole(value: string) { this._staffRole = value; }

    public get fromDate(): Date { return this._fromDate; }
    public set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }

    public get staffPosition(): string { return this._staffPosition; }
    public set staffPosition(value: string) { this._staffPosition = value; }

    public get workloadTaskType(): string { return this._workloadTaskType; }
    public set workloadTaskType(value: string) { this._workloadTaskType = value; }

    public get units(): number { return this._units; }
    public set units(value: number) { this._units = value; }

    public get activeFlag(): string { return this._activeFlag; }
    public set activeFlag(value: string) { this._activeFlag = value; }

    public get createDatetime(): Date { return this._createDatetime; }
    public set createDatetime(value: Date) { this._createDatetime = value; }

    public get modifyUserId(): string { return this._modifyUserId; }
    public set modifyUserId(value: string) { this._modifyUserId = value; }

    public get modifyDatetime(): Date { return this._modifyDatetime; }
    public set modifyDatetime(value: Date) { this._modifyDatetime = value; }

    public get createUserId(): string { return this._createUserId; }
    public set createUserId(value: string) { this._createUserId = value; }

    public get sealFlag(): String { return this._sealFlag; }
    public set sealFlag(value: String) { this._sealFlag = value; }

    public get defaultTask(): string { return this._defaultTask; }
    public set defaultTask(value: string) { this._defaultTask = value; }

    public get availableUnits(): number { return this._availableUnits; }
    public set availableUnits(value: number) { this._availableUnits = value; }

    public get staffLocRoleId(): number { return this._staffLocRoleId; }
    public set staffLocRoleId(value: number) { this._staffLocRoleId = value; }

    toJSON(): any {
        return {
            'staffId': this._staffId,
            'agyLocId': this._agyLocId,
            'staffRole': this._staffRole,
            'fromDate': this._fromDate,
            'staffPosition': this._staffPosition,
            'workloadTaskType': this._workloadTaskType,
            'units': this._units,
            'activeFlag': this._activeFlag,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'createDatetime': this._createDatetime,
            'sealFlag': this._sealFlag,
            'defaultTask': this._defaultTask,
            'availableUnits':this._availableUnits,
            'staffLocRoleId': this._staffLocRoleId
        }
    }
}