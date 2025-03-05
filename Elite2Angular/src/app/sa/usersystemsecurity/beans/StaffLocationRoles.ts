export class StaffLocationRoles {
    private _createDatetime: Date;
    private _createUserId: string;
    private _hoursPerWeek: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _scheduleType: string;
    private _sealFlag: string;
    private _staffUnit: string;
    private _supervisorAgyLocId: string;
    private _supervisorFromDate: Date;
    private _supervisorPosition: string;
    private _supervisorRole: string;
    private _supervisorStaffId: number;
    private _toDate: Date;
    private _sacStaffId: number;
    private _calAgyLocId: string;
    private _fromDate: Date;
    private _position: string;
    private _role: string;
    private _listSeq: number;
    private _rowId: string;
    private _caseloadId: string;
    private _agyLocId: string;
    private _dspDescription: string;
    private _dspName: string;
	private _dspDescription5: string;
	private _dspDescription4: string;
	private _dspDescription3: string;
    private _sexCode: string;
    private _name: string;
    private _skillSubType: string;
    private _staffId: string;
    private _skillSubTypeFlag: string;
    private _noOffender: string;
    private _staffIdTemp: boolean;
    private _lastName: string;
    private _firstName: string;
    private _birthdate: Date;
    private _chkSelectOff: boolean;
    private _fteStatus: number;
    private _staffLocRoleId: number;
    
    



    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get hoursPerWeek(): string { return this._hoursPerWeek; }

    set hoursPerWeek(phoursPerWeek: string) { this._hoursPerWeek = phoursPerWeek; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get scheduleType(): string { return this._scheduleType; }

    set scheduleType(pcreateUserId: string) { this._scheduleType = pcreateUserId; }


    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get staffUnit(): string { return this._staffUnit; }

    set staffUnit(pstaffUnit: string) { this._staffUnit = pstaffUnit; }

    get supervisorAgyLocId(): string { return this._supervisorAgyLocId; }

    set supervisorAgyLocId(psupervisorAgyLocId: string) { this._supervisorAgyLocId = psupervisorAgyLocId; }

    get supervisorFromDate(): Date { return this._supervisorFromDate; }

    set supervisorFromDate(psupervisorFromDate: Date) { this._supervisorFromDate = psupervisorFromDate; }


    get supervisorPosition(): string { return this._supervisorPosition; }

    set supervisorPosition(psupervisorPosition: string) { this._supervisorPosition = psupervisorPosition; }

    get supervisorRole(): string { return this._supervisorRole; }

    set supervisorRole(psupervisorRole: string) { this._supervisorRole = psupervisorRole; }

    get supervisorStaffId(): number { return this._supervisorStaffId; }

    set supervisorStaffId(psupervisorStaffId: number) { this._supervisorStaffId = psupervisorStaffId; }

    get toDate(): Date { return this._toDate; }

    set toDate(ptoDate: Date) { this._toDate = ptoDate; }


    get calAgyLocId(): string { return this._calAgyLocId; }

    set calAgyLocId(pcalAgyLocId: string) { this._calAgyLocId = pcalAgyLocId; }

    get sacStaffId(): number { return this._sacStaffId; }

    set sacStaffId(psacStaffId: number) { this._sacStaffId = psacStaffId; }

    get fromDate(): Date { return this._fromDate; }

    set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }

    get position(): string { return this._position; }

    set position(pposition: string) { this._position = pposition; }

    get role(): string { return this._role; }

    set role(prole: string) { this._role = prole; }

    get rowId(): string { return this._rowId; }

    set rowId(prowId: string) { this._rowId = prowId; }

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get dspDescription(): string { return this._dspDescription; }

    set dspDescription(pdspDescription: string) { this._dspDescription = pdspDescription; }

    get dspName(): string { return this._dspName; }

    set dspName(pdspName: string) { this._dspName = pdspName; }

    get dspDescription5(): string { return this._dspDescription5; }

    set dspDescription5(pdspDescription5: string) { this._dspDescription5 = pdspDescription5; }

    get dspDescription4(): string { return this._dspDescription4; }

    set dspDescription4(pdspDescription4: string) { this._dspDescription4 = pdspDescription4; }

    get dspDescription3(): string { return this._dspDescription3; }

    set dspDescription3(pdspDescription3: string) { this._dspDescription3 = pdspDescription3; }

     get sexCode(): string { return this._sexCode; }

    set sexCode(psexCode: string) { this._sexCode = psexCode; }

    get skillSubType(): string { return this._skillSubType; }

    set skillSubType(pskillSubType: string) { this._skillSubType = pskillSubType; }

    get name(): string { return this._name; }

    set name(pname: string) { this._name = pname; }


    get staffId(): string { return this._staffId; }

    set staffId(pstaffId: string) { this._staffId = pstaffId; }

    get skillSubTypeFlag(): string { return this._skillSubTypeFlag; }

    set skillSubTypeFlag(pskillSubTypeFlag: string) { this._skillSubTypeFlag = pskillSubTypeFlag; }

    
    get noOffender(): string { return this._noOffender; }

    set noOffender(pnoOffender: string) { this._noOffender = pnoOffender; }

    get lastName(): string { return this._lastName; }

    set lastName(plastName: string) { this._lastName = plastName; }
    

    get staffIdTemp(): boolean { return this._staffIdTemp; }

    set staffIdTemp(pstaffIdTemp: boolean) { this._staffIdTemp = pstaffIdTemp; }

    get firstName(): string { return this._firstName; }

    set firstName(pfirstName: string) { this._firstName = pfirstName; }

    get birthdate(): Date { return this._birthdate; }

    set birthdate(pbirthdate: Date) { this._birthdate = pbirthdate; }

    get chkSelectOff(): boolean { return this._chkSelectOff; }

    set chkSelectOff(pchkSelectOff: boolean) { this._chkSelectOff = pchkSelectOff; }

    get fteStatus(): number { return this._fteStatus; }

    set fteStatus(value: number) { this._fteStatus = value; }

    get staffLocRoleId(): number { return this._staffLocRoleId; }

    set staffLocRoleId(value: number) { this._staffLocRoleId = value; }

    toJSON(): any {
        return {
            'hoursPerWeek': this._hoursPerWeek,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'scheduleType': this._scheduleType,
            'sealFlag': this._sealFlag,
            'staffUnit': this._staffUnit,
            'supervisorAgyLocId': this._supervisorAgyLocId,
            'supervisorFromDate': this._supervisorFromDate,
            'supervisorPosition': this._supervisorPosition,
            'supervisorRole': this._supervisorRole,
            'supervisorStaffId': this._supervisorStaffId,
            'toDate': this._toDate,
            'sacStaffId': this._sacStaffId,
            'calAgyLocId': this._calAgyLocId,
            'fromDate': this._fromDate,
            'position': this._position,
            'role': this._role,
            'listSeq': this._listSeq,
            'rowId': this._rowId,
            'caseloadId': this._caseloadId,
            'agyLocId': this._agyLocId,
            'dspDescription': this._dspDescription,
            'dspName': this._dspName,
            'dspDescription5': this._dspDescription5,
            'dspDescription4': this._dspDescription4,
            'dspDescription3': this._dspDescription3,
            'sexCode': this._sexCode,
            'name': this._name,
            'skillSubType': this._skillSubType,
            'staffId': this._staffId,
            'skillSubTypeFlag': this._skillSubTypeFlag,
            'noOffender': this._noOffender,
            'staffIdTemp': this._staffIdTemp,
            'lastName': this._lastName,
            'firstName': this._firstName,
            'birthdate': this._birthdate,
            'chkSelectOff': this._chkSelectOff,
            'fteStatus': this._fteStatus,
            'staffLocRoleId': this._staffLocRoleId
        };
    }
}

